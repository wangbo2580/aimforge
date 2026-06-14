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
  userAgent?: string;
  viewport?: string;
  trainingMode?: string;
  score?: number;
  accuracy?: number;
  duration?: number;
  sessionsSaved?: number;
  localRuns?: number;
  selectedOption?: string;
  inputMode?: string;
  aimEngine?: string;
  calibrationMultiplier?: number;
  routineId?: string;
  routineStepId?: string;
  routineStepName?: string;
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

  return {
    source,
    page: window.location.pathname,
    userAgent: window.navigator.userAgent,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
  };
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
