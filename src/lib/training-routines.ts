import { TrainingConfig, TrainingResult, TrainingType } from '@/types/game';

export interface TrainingRoutineStep {
  id: string;
  name: string;
  shortName: string;
  type: TrainingType;
  duration: number;
  focus: string;
  reason: string;
  config: Partial<TrainingConfig>;
}

export const CS2_WARMUP_ROUTINE_ID = 'cs2-5-minute-warmup';
export const CS2_QUICK_WARMUP_ROUTINE_ID = 'cs2-90-second-quick-warmup';

export const CS2_WARMUP_STEPS: TrainingRoutineStep[] = [
  {
    id: 'gridshot-rhythm',
    name: 'Gridshot rhythm',
    shortName: 'Gridshot',
    type: 'gridshot',
    duration: 120,
    focus: 'first-bullet timing',
    reason: 'Build clean click timing before adding movement or long flicks.',
    config: {
      duration: 120,
      targetSize: 'medium',
      targetCount: 3,
    },
  },
  {
    id: 'tracking-control',
    name: 'Tracking control',
    shortName: 'Tracking',
    type: 'tracking',
    duration: 120,
    focus: 'smooth correction',
    reason: 'Warm up spray-transfer control and small crosshair corrections.',
    config: {
      duration: 120,
      targetSize: 'medium',
      movePattern: 'strafe',
      speed: 'medium',
    },
  },
  {
    id: 'flicking-finish',
    name: 'Flicking finish',
    shortName: 'Flicking',
    type: 'flicking',
    duration: 60,
    focus: 'snap confidence',
    reason: 'Finish with short, sharp snaps so the first ranked duel does not feel cold.',
    config: {
      duration: 60,
      targetSize: 'medium',
      targetDistance: 'medium',
    },
  },
];

export const CS2_QUICK_WARMUP_STEPS: TrainingRoutineStep[] = [
  {
    id: 'quick-gridshot-rhythm',
    name: 'Quick Gridshot',
    shortName: 'Gridshot',
    type: 'gridshot',
    duration: 30,
    focus: 'click timing check',
    reason: 'A short rhythm check for players who want the lowest-friction first run.',
    config: {
      duration: 30,
      targetSize: 'medium',
      targetCount: 3,
    },
  },
  {
    id: 'quick-tracking-control',
    name: 'Quick Tracking',
    shortName: 'Tracking',
    type: 'tracking',
    duration: 30,
    focus: 'smoothness check',
    reason: 'A short control check to catch cold-hand tracking before ranked.',
    config: {
      duration: 30,
      targetSize: 'medium',
      movePattern: 'strafe',
      speed: 'medium',
    },
  },
  {
    id: 'quick-flicking-finish',
    name: 'Quick Flicking',
    shortName: 'Flicking',
    type: 'flicking',
    duration: 30,
    focus: 'snap check',
    reason: 'A short snap check before moving into CS2.',
    config: {
      duration: 30,
      targetSize: 'medium',
      targetDistance: 'medium',
    },
  },
];

export function getRoutineById(routineId: string) {
  if (routineId === CS2_QUICK_WARMUP_ROUTINE_ID) {
    return {
      id: CS2_QUICK_WARMUP_ROUTINE_ID,
      label: '90-second quick warm-up',
      steps: CS2_QUICK_WARMUP_STEPS,
    };
  }

  return {
    id: CS2_WARMUP_ROUTINE_ID,
    label: '5-minute CS2 warm-up',
    steps: CS2_WARMUP_STEPS,
  };
}

function average(values: number[]) {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function getRoutineDuration(steps = CS2_WARMUP_STEPS) {
  return steps.reduce((sum, step) => sum + step.duration, 0);
}

export function getAdaptiveStepConfig(
  step: TrainingRoutineStep,
  previousResults: TrainingResult[]
): Partial<TrainingConfig> {
  const previous = previousResults[previousResults.length - 1];
  if (!previous) return step.config;

  const nextConfig: Partial<TrainingConfig> = { ...step.config };

  if (previous.accuracy >= 90 && previous.misses <= Math.max(1, previous.hits * 0.12)) {
    nextConfig.targetSize = 'small';
    if (step.type === 'tracking') nextConfig.speed = 'fast';
    if (step.type === 'flicking') nextConfig.targetDistance = 'far';
    if (step.type === 'gridshot') nextConfig.targetCount = 5;
  } else if (previous.accuracy < 70 || previous.misses > previous.hits * 0.5) {
    nextConfig.targetSize = 'large';
    if (step.type === 'tracking') nextConfig.speed = 'slow';
    if (step.type === 'flicking') nextConfig.targetDistance = 'close';
    if (step.type === 'gridshot') nextConfig.targetCount = 1;
  }

  return nextConfig;
}

export function getWarmupSummary(results: TrainingResult[]) {
  const avgAccuracy = average(results.map((result) => result.accuracy));
  const avgScore = average(results.map((result) => result.score));
  const reactionResults = results.filter((result) => result.avgReactionTime > 0);
  const avgReaction = average(reactionResults.map((result) => result.avgReactionTime));
  const rawInputRuns = results.filter((result) => result.inputMode === 'raw').length;

  const weakResult = [...results].sort((a, b) => {
    const aScore = a.accuracy * 0.7 + Math.min(a.score / 10, 100) * 0.3;
    const bScore = b.accuracy * 0.7 + Math.min(b.score / 10, 100) * 0.3;
    return aScore - bScore;
  })[0];

  const weakMode = weakResult?.trainingType ?? 'gridshot';
  const weakModeLabel = weakResult?.routineStepName ?? weakMode;

  const recommendation =
    weakMode === 'tracking'
      ? 'Your tracking was the weakest signal today. Add one extra Tracking run before queueing.'
      : weakMode === 'flicking'
      ? 'Your flick finish was the weakest signal today. Repeat Flicking once with accuracy-first pacing.'
      : 'Your click rhythm was the weakest signal today. Repeat Gridshot once before switching to CS2.';

  return {
    avgAccuracy,
    avgScore,
    avgReaction,
    rawInputRuns,
    weakMode,
    weakModeLabel,
    recommendation,
  };
}

export interface WarmupProgress {
  completions: number;
  streak: number;
  lastCompletedDate: string | null;
}

const STORAGE_KEY = 'cs2practice-warmup-progress';

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getYesterdayKey(todayKey: string) {
  const date = new Date(`${todayKey}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() - 1);
  return date.toISOString().slice(0, 10);
}

export function readWarmupProgress(): WarmupProgress {
  if (typeof window === 'undefined') {
    return { completions: 0, streak: 0, lastCompletedDate: null };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completions: 0, streak: 0, lastCompletedDate: null };
    const parsed = JSON.parse(raw) as Partial<WarmupProgress>;
    return {
      completions: parsed.completions ?? 0,
      streak: parsed.streak ?? 0,
      lastCompletedDate: parsed.lastCompletedDate ?? null,
    };
  } catch {
    return { completions: 0, streak: 0, lastCompletedDate: null };
  }
}

export function recordWarmupCompletion(): WarmupProgress {
  const current = readWarmupProgress();
  const todayKey = getTodayKey();

  if (current.lastCompletedDate === todayKey) {
    return current;
  }

  const yesterdayKey = getYesterdayKey(todayKey);
  const nextProgress: WarmupProgress = {
    completions: current.completions + 1,
    streak: current.lastCompletedDate === yesterdayKey ? current.streak + 1 : 1,
    lastCompletedDate: todayKey,
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProgress));
  return nextProgress;
}

export function getDailyChallenge(date = new Date()) {
  const daySeed = Math.floor(date.getTime() / 86_400_000);
  const challenges = [
    {
      id: 'accuracy-first',
      title: 'Accuracy-first day',
      description: 'Finish any warm-up with 80%+ average accuracy. Ignore score until accuracy is stable.',
      target: '80% avg accuracy',
    },
    {
      id: 'raw-input-check',
      title: 'Input confidence day',
      description: 'Complete a warm-up with raw input active for most steps.',
      target: 'Raw input on 2+ steps',
    },
    {
      id: 'tracking-extra',
      title: 'Tracking control day',
      description: 'Complete the warm-up, then repeat Tracking once if it is your weakest signal.',
      target: 'One extra Tracking run',
    },
    {
      id: 'no-rush-flicks',
      title: 'No-rush flick day',
      description: 'Keep Flicking accuracy above 75% before trying to speed up.',
      target: '75%+ Flicking accuracy',
    },
  ];

  return challenges[daySeed % challenges.length];
}
