'use client';

import Link from 'next/link';
import { useEffect, useMemo, useSyncExternalStore } from 'react';
import { TrainingResult, TrainingType } from '@/types/game';
import { trackEvent } from '@/lib/analytics';
import {
  buildTrainingPlan,
  startTrainingPlan,
  TRAINING_PLAN_CHANGE_EVENT,
  TRAINING_PLAN_STORAGE_KEY,
  TrainingPlanState,
} from '@/lib/training-plan';

interface SevenDayPlanProps {
  history: TrainingResult[];
  weakMode?: TrainingType;
}

export default function SevenDayPlan({
  history,
  weakMode = 'gridshot',
}: SevenDayPlanProps) {
  const stateSnapshot = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener('storage', onStoreChange);
      window.addEventListener(TRAINING_PLAN_CHANGE_EVENT, onStoreChange);
      return () => {
        window.removeEventListener('storage', onStoreChange);
        window.removeEventListener(TRAINING_PLAN_CHANGE_EVENT, onStoreChange);
      };
    },
    () => window.localStorage.getItem(TRAINING_PLAN_STORAGE_KEY),
    () => null
  );
  const state = useMemo(() => {
    if (!stateSnapshot) return null;
    try {
      const parsed = JSON.parse(stateSnapshot) as TrainingPlanState;
      return Number.isFinite(parsed.startedAt) ? parsed : null;
    } catch {
      return null;
    }
  }, [stateSnapshot]);

  useEffect(() => {
    trackEvent('training_plan_view', {
      plan_started: Boolean(state),
      sessions_saved: history.length,
    });
  }, [history.length, state]);

  const days = useMemo(
    () => buildTrainingPlan(history, state, weakMode),
    [history, state, weakMode]
  );
  const completedCount = days.filter((day) => day.completed).length;

  const handleStart = () => {
    startTrainingPlan();
    trackEvent('training_plan_start', {
      weak_mode: weakMode,
      sessions_saved: history.length,
    });
  };

  return (
    <section
      id="seven-day-plan"
      className="mb-8 scroll-mt-24 rounded-xl border border-purple-500/30 bg-purple-500/10 p-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-purple-300">
            7-session training plan
          </p>
          <h2 className="mt-2 text-2xl font-bold text-white">
            Turn random drills into a repeatable week
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-gray-300">
            Progress is saved in this browser and updates automatically when you finish
            qualifying drills.
          </p>
        </div>
        {state ? (
          <div className="min-w-32 rounded-lg bg-gray-950/60 px-4 py-3 text-center">
            <div className="text-2xl font-black text-white">{completedCount}/7</div>
            <div className="text-xs text-gray-400">sessions complete</div>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleStart}
            className="rounded-lg bg-purple-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-purple-500"
          >
            Start my 7-session plan
          </button>
        )}
      </div>

      <div className="mt-6 grid gap-3">
        {days.map((day) => (
          <div
            key={day.id}
            className={`rounded-lg border p-4 ${
              day.completed
                ? 'border-green-500/30 bg-green-500/10'
                : 'border-gray-700 bg-gray-950/40'
            }`}
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                    day.completed
                      ? 'bg-green-500 text-gray-950'
                      : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  {day.completed ? '✓' : day.day}
                </div>
                <div>
                  <h3 className="font-bold text-white">{day.title}</h3>
                  <p className="mt-1 text-sm text-gray-400">{day.description}</p>
                  <p className="mt-1 text-xs text-gray-500">{day.target}</p>
                </div>
              </div>
              <Link
                href={day.href}
                onClick={() =>
                  trackEvent('training_plan_day_click', {
                    plan_day: day.day,
                    plan_task: day.id,
                    completed: day.completed,
                    weak_mode: weakMode,
                  })
                }
                className="shrink-0 rounded-lg bg-gray-800 px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-gray-700"
              >
                {day.completed ? 'Run again' : state ? 'Start session' : 'Preview'}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
