'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Header from '@/components/layout/Header';
import GameCanvas from '@/components/game/GameCanvas';
import SensitivityConfig from '@/components/game/SensitivityConfig';
import { trackEvent } from '@/lib/analytics';
import { AimCoachDiagnosis, AimCoachInput, buildLocalAimCoachDiagnosis } from '@/lib/aim-coach';
import { buildFeedbackContext, submitFeedback } from '@/lib/feedback';
import {
  CS2_WARMUP_ROUTINE_ID,
  getAdaptiveStepConfig,
  getDailyChallenge,
  getRoutineById,
  getRoutineDuration,
  getWarmupSummary,
  readWarmupProgress,
  recordWarmupCompletion,
  WarmupProgress,
} from '@/lib/training-routines';
import { useGameStore } from '@/store/game-store';
import { TrainingResult } from '@/types/game';

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return remainder === 0 ? `${minutes} min` : `${minutes}:${String(remainder).padStart(2, '0')}`;
}

function getInputBadge(result: TrainingResult) {
  if (result.inputMode === 'raw') {
    return {
      label: 'Raw input',
      detail: 'Best browser confidence for CS2-style mouse movement',
      className: 'border-green-500/30 bg-green-500/10 text-green-200',
    };
  }

  if (result.inputMode === 'pointer-lock') {
    return {
      label: 'Pointer lock',
      detail: 'Mouse was captured, but raw input was not confirmed',
      className: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-100',
    };
  }

  return {
    label: 'Fallback',
    detail: 'Browser cursor mode was used, so this run may feel less like CS2',
    className: 'border-red-500/30 bg-red-500/10 text-red-100',
  };
}

function getStepPerformanceLabel(result: TrainingResult) {
  if (result.accuracy >= 90 && result.misses <= Math.max(3, result.hits * 0.15)) return 'Clean run';
  if (result.accuracy >= 75) return 'Usable warm-up';
  return 'Needs another pass';
}

interface WarmupClientProps {
  routineId?: string;
}

export default function WarmupClient({ routineId = CS2_WARMUP_ROUTINE_ID }: WarmupClientProps) {
  const updateTrainingConfig = useGameStore((state) => state.updateTrainingConfig);
  const trainingHistory = useGameStore((state) => state.trainingHistory);
  const [activeIndex, setActiveIndex] = useState(0);
  const [results, setResults] = useState<TrainingResult[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [progress, setProgress] = useState<WarmupProgress>({
    completions: 0,
    streak: 0,
    lastCompletedDate: null,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [aiDiagnosis, setAiDiagnosis] = useState<AimCoachDiagnosis | null>(null);
  const [aiStatus, setAiStatus] = useState<'idle' | 'loading' | 'ready' | 'fallback'>('idle');
  const [interestStatus, setInterestStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const [stepReviewResult, setStepReviewResult] = useState<TrainingResult | null>(null);
  const resultsRef = useRef<TrainingResult[]>([]);
  const finishRecordedRef = useRef(false);

  const routine = useMemo(() => getRoutineById(routineId), [routineId]);
  const routineSteps = routine.steps;
  const activeStep = routineSteps[activeIndex];
  const adaptiveConfig = useMemo(
    () => getAdaptiveStepConfig(activeStep, results),
    [activeStep, results]
  );
  const totalDuration = getRoutineDuration(routineSteps);
  const summary = useMemo(() => getWarmupSummary(results), [results]);
  const dailyChallenge = useMemo(() => getDailyChallenge(), []);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setProgress(readWarmupProgress());
    }, 0);

    trackEvent('warmup_view', {
      routine_id: routine.id,
      total_duration: totalDuration,
    });

    return () => window.clearTimeout(timerId);
  }, [routine.id, totalDuration]);

  useEffect(() => {
    updateTrainingConfig(adaptiveConfig);
    trackEvent('warmup_step_view', {
      routine_id: routine.id,
      step_id: activeStep.id,
      step_index: activeIndex + 1,
      mode: activeStep.type,
      adaptive_target_size: adaptiveConfig.targetSize,
      adaptive_speed: adaptiveConfig.speed,
      adaptive_distance: adaptiveConfig.targetDistance,
    });
  }, [activeIndex, activeStep, adaptiveConfig, routine.id, updateTrainingConfig]);

  const handleComplete = useCallback(
    (result: TrainingResult) => {
      const resultWithRoutine = {
        ...result,
        routineId: routine.id,
        routineStepId: activeStep.id,
        routineStepName: activeStep.name,
      };
      const nextResults = [
        ...resultsRef.current.filter((item) => item.routineStepId !== activeStep.id),
        resultWithRoutine,
      ];
      resultsRef.current = nextResults;
      setResults(nextResults);
      setStepReviewResult(resultWithRoutine);
      trackEvent('warmup_step_complete', {
        routine_id: routine.id,
        step_id: activeStep.id,
        step_index: activeIndex + 1,
        mode: activeStep.type,
        score: result.score,
        accuracy: Number(result.accuracy.toFixed(1)),
        input_mode: result.inputMode,
      });
    },
    [activeIndex, activeStep, routine.id]
  );

  const finishWarmup = useCallback(() => {
    setIsFinished(true);

    if (!finishRecordedRef.current) {
      finishRecordedRef.current = true;
      const nextProgress = recordWarmupCompletion();
      setProgress(nextProgress);

      const currentSummary = getWarmupSummary(resultsRef.current);
      trackEvent('warmup_complete', {
        routine_id: routine.id,
        avg_accuracy: Number(currentSummary.avgAccuracy.toFixed(1)),
        avg_score: Math.round(currentSummary.avgScore),
        weak_mode: currentSummary.weakMode,
        raw_input_runs: currentSummary.rawInputRuns,
        streak: nextProgress.streak,
      });
    }
  }, [routine.id]);

  const continueRoutine = useCallback(() => {
    setStepReviewResult(null);

    if (activeIndex >= routineSteps.length - 1) {
      finishWarmup();
      return;
    }

    setActiveIndex((index) => index + 1);
  }, [activeIndex, finishWarmup, routineSteps.length]);

  const repeatStep = useCallback(() => {
    setStepReviewResult(null);
    trackEvent('warmup_step_repeat', {
      routine_id: routine.id,
      step_id: activeStep.id,
      step_index: activeIndex + 1,
      mode: activeStep.type,
    });
  }, [activeIndex, activeStep, routine.id]);

  const restartWarmup = () => {
    resultsRef.current = [];
    finishRecordedRef.current = false;
    setResults([]);
    setIsFinished(false);
    setActiveIndex(0);
    setAiDiagnosis(null);
    setAiStatus('idle');
    setInterestStatus('idle');
    setShareStatus('idle');
    setStepReviewResult(null);
    trackEvent('warmup_restart', {
      routine_id: routine.id,
    });
  };

  useEffect(() => {
    if (!isFinished || results.length === 0) return;

    const input: AimCoachInput = {
      routineId: routine.id,
      routineLabel: routine.label,
      results,
      summary,
      localRuns: trainingHistory.length,
      streak: progress.streak,
    };

    const controller = new AbortController();
    const timerId = window.setTimeout(() => {
      setAiDiagnosis(buildLocalAimCoachDiagnosis(input));
      setAiStatus('loading');

      fetch('/api/aim-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
        signal: controller.signal,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.diagnosis) {
            setAiDiagnosis(data.diagnosis);
            setAiStatus(data.usedFallback ? 'fallback' : 'ready');
            trackEvent('ai_coach_result', {
              routine_id: routine.id,
              source: data.diagnosis.source,
              used_fallback: Boolean(data.usedFallback),
              model: data.diagnosis.model,
            });
          } else {
            setAiStatus('fallback');
          }
        })
        .catch((error) => {
          if (error?.name !== 'AbortError') {
            setAiStatus('fallback');
          }
        });
    }, 0);

    return () => {
      window.clearTimeout(timerId);
      controller.abort();
    };
  }, [isFinished, progress.streak, results, routine.id, routine.label, summary, trainingHistory.length]);

  const handleShareSummary = async () => {
    setShareStatus('idle');
    const text = [
      `CS2 Practice ${routine.label}`,
      `Avg accuracy: ${summary.avgAccuracy.toFixed(1)}%`,
      `Weakest signal: ${summary.weakModeLabel}`,
      `AI Coach: ${aiDiagnosis?.headline ?? summary.recommendation}`,
      'https://www.cs2practice.com/play/warmup',
    ].join('\n');

    trackEvent('warmup_share_click', {
      routine_id: routine.id,
      weak_mode: summary.weakMode,
    });

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CS2 Practice warm-up',
          text,
        });
        setShareStatus('copied');
        return;
      } catch {
        // Fall back to clipboard when the share sheet is cancelled or unavailable.
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      setShareStatus('copied');
    } catch {
      setShareStatus('error');
    }
  };

  const downloadShareCard = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.fillStyle = '#020617';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#1d4ed8';
    context.fillRect(0, 0, canvas.width, 14);
    context.fillStyle = '#ffffff';
    context.font = '700 54px Arial';
    context.fillText('CS2 Practice Warm-up', 70, 110);
    context.font = '700 86px Arial';
    context.fillText(`${summary.avgAccuracy.toFixed(1)}%`, 70, 250);
    context.font = '400 30px Arial';
    context.fillStyle = '#94a3b8';
    context.fillText('Average accuracy', 78, 295);
    context.fillStyle = '#ffffff';
    context.font = '700 42px Arial';
    context.fillText(`Weakest signal: ${summary.weakModeLabel}`, 70, 390);
    context.font = '400 28px Arial';
    context.fillStyle = '#cbd5e1';
    context.fillText(aiDiagnosis?.headline ?? summary.recommendation, 70, 450, 1040);
    context.fillStyle = '#60a5fa';
    context.font = '700 26px Arial';
    context.fillText('cs2practice.com/play/warmup', 70, 565);

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'cs2practice-warmup-card.png';
    link.click();

    trackEvent('warmup_share_card_download', {
      routine_id: routine.id,
      weak_mode: summary.weakMode,
    });
  };

  const handleProInterest = async () => {
    setInterestStatus('sending');
    try {
      const success = await submitFeedback({
        category: 'missing_feature',
        message: 'I want AI Coach Pro: personal warm-up plan, weekly progress report, and role-based CS2 routines.',
        context: buildFeedbackContext('ai_coach_pro_interest', {
          routineId: routine.id,
          selectedOption: 'ai_coach_pro',
          sessionsSaved: trainingHistory.length,
          localRuns: trainingHistory.length,
        }),
      });
      setInterestStatus(success ? 'success' : 'error');
      trackEvent('ai_coach_pro_interest', {
        routine_id: routine.id,
        success,
      });
    } catch {
      setInterestStatus('error');
    }
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-gray-950">
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-10">
          <div className="mb-8">
            <Link href="/play" className="text-sm text-gray-400 transition-colors hover:text-white">
              Back to training
            </Link>
            <h1 className="mt-3 text-4xl font-black text-white">Warm-up complete</h1>
            <p className="mt-3 max-w-2xl text-gray-400">
              AI Coach turns this from a score screen into a next-step plan: what felt solid,
              what looked weak, and what to repeat before queueing.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-gray-800 p-5">
              <div className="text-sm text-gray-400">Avg accuracy</div>
              <div className="mt-2 text-3xl font-bold text-white">
                {summary.avgAccuracy.toFixed(1)}%
              </div>
            </div>
            <div className="rounded-lg bg-gray-800 p-5">
              <div className="text-sm text-gray-400">Avg score</div>
              <div className="mt-2 text-3xl font-bold text-white">
                {Math.round(summary.avgScore)}
              </div>
            </div>
            <div className="rounded-lg bg-gray-800 p-5">
              <div className="text-sm text-gray-400">Weakest signal</div>
              <div className="mt-2 text-2xl font-bold text-white">{summary.weakModeLabel}</div>
            </div>
            <div className="rounded-lg bg-gray-800 p-5">
              <div className="text-sm text-gray-400">Warm-up streak</div>
              <div className="mt-2 text-3xl font-bold text-white">{progress.streak} day</div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">
                AI Aim Coach
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold text-white">
                  {aiDiagnosis?.headline ?? summary.recommendation}
                </h2>
                <span className="rounded bg-gray-950/70 px-2 py-1 text-xs font-semibold text-blue-200">
                  {aiStatus === 'ready'
                    ? 'AI'
                    : aiStatus === 'loading'
                    ? 'AI loading'
                    : 'Local coach'}
                </span>
              </div>
              <p className="mt-3 text-sm text-gray-300">
                {aiDiagnosis?.diagnosis ?? summary.recommendation}
              </p>
              <div className="mt-4 rounded-lg bg-gray-950/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Next drill
                </p>
                <p className="mt-1 text-sm text-white">
                  {aiDiagnosis?.nextDrill ?? summary.recommendation}
                </p>
              </div>
              <p className="mt-3 text-xs text-gray-400">
                {aiDiagnosis?.caution ??
                  `Raw input was active in ${summary.rawInputRuns}/${results.length} steps.`}
              </p>
            </section>

            <section className="rounded-lg bg-gray-800 p-6">
              <p className="text-sm font-semibold text-white">Routine progress</p>
              <div className="mt-4 space-y-3">
                {routineSteps.map((step) => {
                  const result = results.find((item) => item.routineStepId === step.id);
                  return (
                    <div key={step.id} className="flex items-center justify-between gap-4 text-sm">
                      <div>
                        <div className="font-medium text-white">{step.name}</div>
                        <div className="text-gray-500">{step.focus}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-white">{result?.score ?? '-'}</div>
                        <div className="text-gray-500">
                          {result ? `${result.accuracy.toFixed(1)}%` : '-'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <section className="rounded-lg bg-gray-800 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-green-300">
                Daily challenge
              </p>
              <h2 className="mt-2 text-xl font-bold text-white">{dailyChallenge.title}</h2>
              <p className="mt-2 text-sm text-gray-400">{dailyChallenge.description}</p>
              <div className="mt-4 rounded bg-gray-900 px-3 py-2 text-sm font-semibold text-white">
                {dailyChallenge.target}
              </div>
            </section>

            <section className="rounded-lg bg-gray-800 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-300">
                Share card
              </p>
              <h2 className="mt-2 text-xl font-bold text-white">Share today&apos;s warm-up</h2>
              <p className="mt-2 text-sm text-gray-400">
                Use this for lightweight growth before adding public leaderboards.
              </p>
              <div className="mt-4 grid gap-2">
                <button
                  type="button"
                  onClick={handleShareSummary}
                  className="rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
                >
                  {shareStatus === 'copied' ? 'Summary copied' : 'Share / copy summary'}
                </button>
                {shareStatus === 'error' && (
                  <p className="text-xs text-red-300">Could not copy the summary in this browser.</p>
                )}
                <button
                  type="button"
                  onClick={downloadShareCard}
                  className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
                >
                  Download score card
                </button>
              </div>
            </section>

            <section className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-yellow-300">
                AI Coach Pro
              </p>
              <h2 className="mt-2 text-xl font-bold text-white">Want a personal warm-up plan?</h2>
              <p className="mt-2 text-sm text-gray-300">
                Coming next: weekly AI report, role-based CS2 routines, and adaptive plans based
                on your recent weak points.
              </p>
              <button
                type="button"
                onClick={handleProInterest}
                disabled={interestStatus === 'sending' || interestStatus === 'success'}
                className="mt-4 w-full rounded-lg bg-yellow-500 px-4 py-2.5 text-sm font-bold text-gray-950 transition-colors hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {interestStatus === 'success'
                  ? 'Interest recorded'
                  : interestStatus === 'sending'
                  ? 'Recording...'
                  : 'I want this'}
              </button>
              {interestStatus === 'error' && (
                <p className="mt-2 text-xs text-red-300">Could not record this. Try again later.</p>
              )}
            </section>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={restartWarmup}
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              Run warm-up again
            </button>
            <Link
              href="/stats"
              className="rounded-lg bg-gray-800 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-gray-700"
            >
              View saved progress
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-950">
      <div className="flex h-full flex-col">
        <header className="border-b border-gray-800 bg-gray-900">
          <div className="flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
            <div>
              <Link href="/play" className="text-sm text-gray-400 transition-colors hover:text-white">
                Back
              </Link>
              <div className="mt-1 flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-bold text-white">{routine.label}</h1>
                <span className="rounded bg-blue-500/15 px-2 py-1 text-xs font-semibold text-blue-200">
                  Step {activeIndex + 1}/{routineSteps.length}
                </span>
                <span className="text-sm text-gray-400">{formatDuration(totalDuration)}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowSettings((value) => !value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                showSettings
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {showSettings ? 'Hide settings' : 'Show settings'}
            </button>
          </div>
          <div className="grid border-t border-gray-800 md:grid-cols-3">
            {routineSteps.map((step, index) => (
              <div
                key={step.id}
                className={`border-b-2 px-4 py-3 ${
                  index === activeIndex
                    ? 'border-blue-400 bg-blue-500/10'
                    : index < activeIndex
                    ? 'border-green-400 bg-green-500/5'
                    : 'border-transparent bg-gray-900'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-white">{step.name}</div>
                  <div className="text-xs text-gray-400">{formatDuration(step.duration)}</div>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {index === activeIndex ? step.reason : step.focus}
                </div>
              </div>
            ))}
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          <main className="relative flex-1 overflow-hidden">
            {stepReviewResult ? (
              <div className="flex h-full items-center justify-center overflow-y-auto bg-gray-950 px-4 py-8">
                <section className="w-full max-w-4xl rounded-lg border border-gray-800 bg-gray-900 p-5 shadow-2xl md:p-7">
                  <div className="flex flex-col gap-4 border-b border-gray-800 pb-5 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">
                        Step {activeIndex + 1}/{routineSteps.length} complete
                      </p>
                      <h2 className="mt-2 text-3xl font-black text-white">{activeStep.name}</h2>
                      <p className="mt-2 max-w-2xl text-sm text-gray-400">{activeStep.reason}</p>
                    </div>
                    <div className="rounded-lg bg-gray-950 px-4 py-3 text-left md:text-right">
                      <div className="text-xs text-gray-500">Result</div>
                      <div className="mt-1 text-xl font-bold text-white">
                        {getStepPerformanceLabel(stepReviewResult)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-4">
                    <div className="rounded-lg bg-gray-800 p-4">
                      <div className="text-xs text-gray-500">Score</div>
                      <div className="mt-2 text-3xl font-black text-white">{stepReviewResult.score}</div>
                    </div>
                    <div className="rounded-lg bg-gray-800 p-4">
                      <div className="text-xs text-gray-500">Accuracy</div>
                      <div className="mt-2 text-3xl font-black text-white">
                        {stepReviewResult.accuracy.toFixed(1)}%
                      </div>
                    </div>
                    <div className="rounded-lg bg-gray-800 p-4">
                      <div className="text-xs text-gray-500">Misses</div>
                      <div className="mt-2 text-3xl font-black text-white">{stepReviewResult.misses}</div>
                    </div>
                    <div className="rounded-lg bg-gray-800 p-4">
                      <div className="text-xs text-gray-500">
                        {stepReviewResult.avgReactionTime > 0 ? 'Avg reaction' : 'Hits'}
                      </div>
                      <div className="mt-2 text-3xl font-black text-white">
                        {stepReviewResult.avgReactionTime > 0
                          ? `${stepReviewResult.avgReactionTime}ms`
                          : stepReviewResult.hits}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
                    {(() => {
                      const inputBadge = getInputBadge(stepReviewResult);
                      return (
                        <div className={`rounded-lg border p-4 ${inputBadge.className}`}>
                          <p className="text-sm font-bold">{inputBadge.label}</p>
                          <p className="mt-1 text-sm opacity-85">{inputBadge.detail}</p>
                        </div>
                      );
                    })()}

                    <div className="rounded-lg border border-blue-500/25 bg-blue-500/10 p-4">
                      <p className="text-sm font-bold text-blue-200">
                        {activeIndex >= routineSteps.length - 1
                          ? 'Ready for your complete diagnosis'
                          : `Next: ${routineSteps[activeIndex + 1].name}`}
                      </p>
                      <p className="mt-1 text-sm text-gray-300">
                        {activeIndex >= routineSteps.length - 1
                          ? 'Finish the routine to get the AI Coach summary, weakest signal, and next drill.'
                          : routineSteps[activeIndex + 1].reason}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={repeatStep}
                      className="rounded-lg bg-gray-800 px-5 py-3 text-sm font-semibold text-gray-200 transition-colors hover:bg-gray-700"
                    >
                      Repeat this step
                    </button>
                    <button
                      type="button"
                      onClick={continueRoutine}
                      className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-500"
                    >
                      {activeIndex >= routineSteps.length - 1
                        ? 'Show complete diagnosis'
                        : `Continue to ${routineSteps[activeIndex + 1].shortName}`}
                    </button>
                  </div>
                </section>
              </div>
            ) : (
              <GameCanvas
                key={activeStep.id}
                trainingType={activeStep.type}
                onComplete={handleComplete}
                renderResultScreen={false}
                routineContext={{
                  routineId: routine.id,
                  stepId: activeStep.id,
                  stepName: activeStep.name,
                  label:
                    activeIndex >= routineSteps.length - 1
                      ? 'Show complete warm-up diagnosis'
                      : `Next: ${routineSteps[activeIndex + 1].name}`,
                  isLastStep: activeIndex >= routineSteps.length - 1,
                  onContinue: continueRoutine,
                }}
              />
            )}
          </main>

          {showSettings && (
            <aside className="w-80 overflow-y-auto border-l border-gray-800 bg-gray-900 p-4">
              <SensitivityConfig />
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
