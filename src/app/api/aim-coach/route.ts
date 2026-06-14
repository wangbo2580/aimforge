import { NextRequest, NextResponse } from 'next/server';
import {
  AimCoachDiagnosis,
  AimCoachInput,
  buildAimCoachPrompt,
  buildLocalAimCoachDiagnosis,
} from '@/lib/aim-coach';

const DEFAULT_MODEL = 'deepseek/deepseek-v4-flash';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

function parseJsonObject(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
}

function normalizeDiagnosis(
  data: Partial<AimCoachDiagnosis> | null,
  fallback: AimCoachDiagnosis,
  model: string
): AimCoachDiagnosis {
  if (!data) return fallback;

  return {
    source: 'ai',
    headline: data.headline || fallback.headline,
    diagnosis: data.diagnosis || fallback.diagnosis,
    nextDrill: data.nextDrill || fallback.nextDrill,
    caution: data.caution || fallback.caution,
    confidence:
      data.confidence === 'high' || data.confidence === 'medium' || data.confidence === 'low'
        ? data.confidence
        : fallback.confidence,
    model,
  };
}

export async function POST(request: NextRequest) {
  let input: AimCoachInput;

  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const fallback = buildLocalAimCoachDiagnosis(input);
  const apiKey = process.env.OPENROUTER_API_KEY;
  const model = process.env.AI_COACH_MODEL || DEFAULT_MODEL;

  if (!apiKey) {
    return NextResponse.json({
      diagnosis: fallback,
      usedFallback: true,
      reason: 'OPENROUTER_API_KEY not configured',
    });
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10_000);
    const response = await (async () => {
      try {
        return await fetch(OPENROUTER_URL, {
          method: 'POST',
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://www.cs2practice.com',
            'X-Title': 'CS2 Practice AI Aim Coach',
          },
          body: JSON.stringify({
            model,
            messages: [
              {
                role: 'system',
                content:
                  'You write short, accurate aim-training diagnostics. You avoid overclaiming and return valid JSON only.',
              },
              {
                role: 'user',
                content: buildAimCoachPrompt(input),
              },
            ],
            temperature: 0.3,
            max_tokens: 420,
            response_format: { type: 'json_object' },
          }),
        });
      } finally {
        clearTimeout(timeoutId);
      }
    })();

    if (!response.ok) {
      return NextResponse.json({
        diagnosis: fallback,
        usedFallback: true,
        reason: `AI request failed: ${response.status}`,
      });
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;
    const parsed = typeof content === 'string' ? parseJsonObject(content) : null;

    return NextResponse.json({
      diagnosis: normalizeDiagnosis(parsed, fallback, model),
      usedFallback: false,
    });
  } catch (error) {
    console.error('AI coach error:', error);
    return NextResponse.json({
      diagnosis: fallback,
      usedFallback: true,
      reason: 'AI request error',
    });
  }
}
