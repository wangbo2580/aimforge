'use client';

import { trackEvent } from './analytics';

export type FeedbackCategory =
  | 'bug'
  | 'aim_feels_off'
  | 'lag_or_controls'
  | 'missing_feature'
  | 'stats_confusing'
  | 'data_issue'
  | 'positive'
  | 'retention_reason'
  | 'other';

export interface FeedbackContext {
  source: string;
  page?: string;
  sessionId?: string;
  runId?: string;
  timestamp?: string;
  userAgent?: string;
  viewport?: string;
  trainingMode?: string;
  score?: number;
  accuracy?: number;
  duration?: number;
  targetSize?: string;
  targetCount?: number;
  movePattern?: string;
  speed?: string;
  targetDistance?: string;
  sessionsSaved?: number;
  localRuns?: number;
  selectedOption?: string;
  inputMode?: string;
  aimEngine?: string;
  calibrationMultiplier?: number;
  sensitivityGame?: string;
  sensitivity?: number;
  dpi?: number;
  cm360?: number;
  routineId?: string;
  routineStepId?: string;
  routineStepName?: string;
  weakMode?: string;
  role?: string;
  priceOption?: string;
}

export interface FeedbackPayload {
  category: FeedbackCategory;
  message: string;
  email?: string;
  context: FeedbackContext;
}

function getBrowserContext(source: string): FeedbackContext {
  if (typeof window === 'undefined') {
    return { source };
  }

  const sessionId = getFeedbackSessionId();

  return {
    source,
    page: window.location.pathname,
    sessionId,
    runId: createFeedbackRunId(sessionId),
    timestamp: new Date().toISOString(),
    userAgent: window.navigator.userAgent,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
  };
}

function getFeedbackSessionId() {
  const storageKey = 'cs2practice-feedback-session-id';
  const existing = window.localStorage.getItem(storageKey);
  if (existing) return existing;

  const id =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `session-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  window.localStorage.setItem(storageKey, id);
  return id;
}

function createFeedbackRunId(sessionId: string) {
  const suffix =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${sessionId.slice(0, 8)}-${Date.now()}-${suffix}`;
}

export function buildFeedbackContext(
  source: string,
  context: Partial<FeedbackContext> = {}
): FeedbackContext {
  return {
    ...getBrowserContext(source),
    ...context,
    source,
  };
}

export async function submitFeedback(payload: FeedbackPayload): Promise<boolean> {
  const response = await fetch('/api/notify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'feedback',
      data: payload,
    }),
  });

  const ok = response.ok;

  trackEvent(ok ? 'feedback_submit' : 'feedback_submit_error', {
    category: payload.category,
    source: payload.context.source,
    selected_option: payload.context.selectedOption,
    has_email: Boolean(payload.email),
  });

  return ok;
}
