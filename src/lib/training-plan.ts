import { TrainingResult, TrainingType } from '@/types/game';
import {
  AWP_FLICK_ROUTINE_ID,
  CS2_QUICK_WARMUP_ROUTINE_ID,
  CS2_WARMUP_ROUTINE_ID,
  RIFLE_ENTRY_ROUTINE_ID,
  SPRAY_TRANSFER_ROUTINE_ID,
} from '@/lib/training-routines';

export const TRAINING_PLAN_STORAGE_KEY = 'cs2practice-7-day-plan';
export const TRAINING_PLAN_CHANGE_EVENT = 'cs2practice-training-plan-change';

export interface TrainingPlanState {
  startedAt: number;
}

export interface TrainingPlanDay {
  id: string;
  day: number;
  title: string;
  description: string;
  target: string;
  href: string;
  completed: boolean;
}

const ROLE_ROUTINE_IDS = new Set([
  RIFLE_ENTRY_ROUTINE_ID,
  AWP_FLICK_ROUTINE_ID,
  SPRAY_TRANSFER_ROUTINE_ID,
]);

export function readTrainingPlanState(): TrainingPlanState | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(TRAINING_PLAN_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as TrainingPlanState;
    return Number.isFinite(parsed.startedAt) ? parsed : null;
  } catch {
    return null;
  }
}

export function startTrainingPlan(): TrainingPlanState {
  const state = { startedAt: Date.now() };
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(TRAINING_PLAN_STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new Event(TRAINING_PLAN_CHANGE_EVENT));
  }
  return state;
}

function standaloneRuns(history: TrainingResult[], type: TrainingType) {
  return history.filter((result) => result.trainingType === type && !result.routineId);
}

export function buildTrainingPlan(
  history: TrainingResult[],
  state: TrainingPlanState | null,
  weakMode: TrainingType = 'gridshot'
): TrainingPlanDay[] {
  const eligible = state
    ? history.filter((result) => result.timestamp >= state.startedAt)
    : [];
  const quickRuns = eligible.filter(
    (result) => result.routineId === CS2_QUICK_WARMUP_ROUTINE_ID
  );
  const fullWarmupRuns = eligible.filter(
    (result) => result.routineId === CS2_WARMUP_ROUTINE_ID
  );
  const roleRuns = eligible.filter(
    (result) => result.routineId && ROLE_ROUTINE_IDS.has(result.routineId)
  );
  const weakModeRuns = standaloneRuns(eligible, weakMode);

  return [
    {
      id: 'baseline',
      day: 1,
      title: 'Set a baseline',
      description: 'Run the 90-second warm-up once without changing sensitivity.',
      target: 'Complete all 3 quick warm-up drills',
      href: '/play/quick-warmup',
      completed: quickRuns.length >= 3,
    },
    {
      id: 'precision',
      day: 2,
      title: 'Precision before speed',
      description: 'Slow down and make every click deliberate.',
      target: 'Finish one standalone Gridshot run',
      href: '/play/gridshot',
      completed: standaloneRuns(eligible, 'gridshot').length >= 1,
    },
    {
      id: 'control',
      day: 3,
      title: 'Build smooth control',
      description: 'Keep the crosshair connected instead of over-correcting.',
      target: 'Finish one standalone Tracking run',
      href: '/play/tracking',
      completed: standaloneRuns(eligible, 'tracking').length >= 1,
    },
    {
      id: 'flick',
      day: 4,
      title: 'Add controlled flicks',
      description: 'Prioritize stopping on target before clicking.',
      target: 'Finish one standalone Flicking run',
      href: '/play/flicking',
      completed: standaloneRuns(eligible, 'flicking').length >= 1,
    },
    {
      id: 'role',
      day: 5,
      title: 'Train for your role',
      description: 'Use a guided routine that matches a real CS2 engagement pattern.',
      target: 'Complete any role-based routine',
      href: '/play/routines/rifle-entry',
      completed: roleRuns.length >= 3,
    },
    {
      id: 'weakness',
      day: 6,
      title: `Repeat your weak point`,
      description: `Your recent weak mode is ${weakMode}. Repeat it while staying consistent.`,
      target: `Complete 2 standalone ${weakMode} runs`,
      href: `/play/${weakMode}`,
      completed: weakModeRuns.length >= 2,
    },
    {
      id: 'full-routine',
      day: 7,
      title: 'Finish the full warm-up',
      description: 'Put precision, control, and speed together in one session.',
      target: 'Complete the full guided warm-up',
      href: '/play/warmup',
      completed: fullWarmupRuns.length >= 3,
    },
  ];
}
