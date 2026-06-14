import { TrainingResult } from '@/types/game';

export interface AimCoachInput {
  routineId?: string;
  routineLabel?: string;
  results: TrainingResult[];
  summary: {
    avgAccuracy: number;
    avgScore: number;
    avgReaction: number;
    rawInputRuns: number;
    weakMode: string;
    weakModeLabel: string;
    recommendation: string;
  };
  localRuns?: number;
  streak?: number;
}

export interface AimCoachDiagnosis {
  source: 'local' | 'ai';
  headline: string;
  diagnosis: string;
  nextDrill: string;
  caution: string;
  confidence: 'high' | 'medium' | 'low';
  model?: string;
}

function getAccuracyTrend(results: TrainingResult[]) {
  if (results.length < 2) return 'not enough history';
  const first = results[0].accuracy;
  const last = results[results.length - 1].accuracy;
  if (last - first >= 5) return 'accuracy improved through the routine';
  if (first - last >= 5) return 'accuracy dropped through the routine';
  return 'accuracy stayed stable through the routine';
}

export function buildLocalAimCoachDiagnosis(input: AimCoachInput): AimCoachDiagnosis {
  const { summary, results } = input;
  const lowInputConfidence = summary.rawInputRuns < Math.max(1, Math.ceil(results.length / 2));
  const trend = getAccuracyTrend(results);

  const weakModeCopy =
    summary.weakMode === 'tracking'
      ? {
          headline: 'Tracking control needs the most attention today',
          diagnosis:
            'Your click timing is usable, but the weakest signal was smooth target control. That usually means your hand is warm enough to click, but not settled enough for spray transfers or moving targets.',
          nextDrill: 'Repeat Tracking once at medium speed. Aim for stable contact before chasing score.',
        }
      : summary.weakMode === 'flicking'
      ? {
          headline: 'Flick confidence is the weak point today',
          diagnosis:
            'Your routine points to unstable snap aim. The likely issue is moving too quickly before the crosshair has settled on target.',
          nextDrill: 'Repeat Flicking once with accuracy-first pacing. Slow the first half down, then speed up only if accuracy stays above 80%.',
        }
      : {
          headline: 'Click rhythm is the weak point today',
          diagnosis:
            'Your warm-up suggests the basic see-target-click-target rhythm is not fully stable yet. This should be fixed before adding harder movement.',
          nextDrill: 'Repeat Gridshot once with clean timing. Do not rush misses; make the next click deliberate.',
        };

  return {
    source: 'local',
    headline: weakModeCopy.headline,
    diagnosis: `${weakModeCopy.diagnosis} ${trend}.`,
    nextDrill: weakModeCopy.nextDrill,
    caution: lowInputConfidence
      ? 'Input confidence was limited. Treat this as a browser practice result, not a precise CS2 hand-feel benchmark.'
      : 'Input confidence looked acceptable for a browser trainer. Keep the same sensitivity for a few days before changing it.',
    confidence: lowInputConfidence ? 'medium' : 'high',
  };
}

export function buildAimCoachPrompt(input: AimCoachInput) {
  const compactResults = input.results.map((result) => ({
    mode: result.trainingType,
    step: result.routineStepName,
    score: result.score,
    accuracy: Number(result.accuracy.toFixed(1)),
    avgReactionTime: result.avgReactionTime,
    hits: result.hits,
    misses: result.misses,
    duration: result.duration,
    inputMode: result.inputMode,
    aimEngine: result.aimEngine,
  }));

  return [
    'You are an AI warm-up coach for a browser-based CS2-style aim trainer.',
    'Give a concise, honest diagnosis based only on the provided drill data.',
    'Do not claim to know the user CS2 rank, match performance, recoil skill, game sense, or real in-game improvement.',
    'Mention input confidence if raw input was not active for most runs.',
    'Return strict JSON with keys: headline, diagnosis, nextDrill, caution, confidence.',
    'confidence must be high, medium, or low.',
    '',
    JSON.stringify(
      {
        routineId: input.routineId,
        routineLabel: input.routineLabel,
        summary: input.summary,
        localRuns: input.localRuns,
        streak: input.streak,
        results: compactResults,
      },
      null,
      2
    ),
  ].join('\n');
}

