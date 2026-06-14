'use client';

// 训练结果展示组件 (F005)

import Link from 'next/link';
import { useState } from 'react';
import { TrainingResult } from '@/types/game';
import { useTranslation } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';
import { useGameStore } from '@/store/game-store';
import {
  buildFeedbackContext,
  FeedbackCategory,
  submitFeedback,
} from '@/lib/feedback';

// 导流到已变现内容页（/pro Amazon 联盟、/crosshairs Adsterra）+ GA 事件埋点，
// 用于衡量「训练页 → 变现内容页」导流效果（复盘实验 #2）。
function trackContentCta(target: 'pro' | 'crosshairs') {
  trackEvent('content_cta_click', {
    cta_location: 'result_screen',
    cta_target: target,
  });
}

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function gradeFromScore(score: number): { grade: string; color: string; band: string } {
  if (score >= 95) return { grade: 'S', color: 'text-yellow-400', band: 'Elite' };
  if (score >= 90) return { grade: 'A', color: 'text-green-400', band: 'Strong' };
  if (score >= 80) return { grade: 'B', color: 'text-blue-400', band: 'Solid' };
  if (score >= 70) return { grade: 'C', color: 'text-purple-400', band: 'Developing' };
  if (score >= 60) return { grade: 'D', color: 'text-orange-400', band: 'Unstable' };
  return { grade: 'F', color: 'text-red-400', band: 'Needs work' };
}

interface ResultScreenProps {
  result: TrainingResult;
  onRestart: () => void;
  onBack: () => void;
  routineAction?: {
    label: string;
    description: string;
    onClick: () => void;
  };
  hideRoutineRecommendation?: boolean;
}

export default function ResultScreen({
  result,
  onRestart,
  onBack,
  routineAction,
  hideRoutineRecommendation = false,
}: ResultScreenProps) {
  const { t } = useTranslation();
  const trainingHistory = useGameStore((state) => state.trainingHistory);
  const [quickFeedback, setQuickFeedback] = useState<string | null>(null);
  const [quickNote, setQuickNote] = useState('');
  const [quickStatus, setQuickStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [retentionAnswer, setRetentionAnswer] = useState<string | null>(null);
  const [retentionStatus, setRetentionStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const previousSameMode = trainingHistory.filter(
    (record) =>
      record.trainingType === result.trainingType &&
      record.timestamp !== result.timestamp
  );
  const previousBest =
    previousSameMode.length > 0
      ? Math.max(...previousSameMode.map((record) => record.score))
      : null;
  const bestDelta = previousBest === null ? null : result.score - previousBest;

  const getTrainingTypeLabel = (type: string) => {
    switch (type) {
      case 'gridshot':
        return t('mode_gridshot');
      case 'tracking':
        return t('mode_tracking');
      case 'flicking':
        return t('mode_flicking');
      default:
        return type;
    }
  };

  const hitsPerSecond = result.duration > 0 ? result.hits / result.duration : 0;
  const precisionScore = clampScore(result.accuracy);
  const speedScore = clampScore(
    result.avgReactionTime > 0
      ? ((650 - result.avgReactionTime) / 350) * 100
      : (hitsPerSecond / 1.5) * 100
  );
  const controlScore = clampScore(
    result.trainingType === 'tracking'
      ? result.accuracy
      : result.totalTargets > 0
      ? 100 - (result.misses / result.totalTargets) * 120
      : result.accuracy
  );
  const drillScore = clampScore(
    result.trainingType === 'tracking'
      ? precisionScore * 0.65 + controlScore * 0.35
      : result.trainingType === 'flicking'
      ? precisionScore * 0.55 + speedScore * 0.3 + controlScore * 0.15
      : precisionScore * 0.5 + speedScore * 0.35 + controlScore * 0.15
  );
  const { grade, color, band } = gradeFromScore(drillScore);

  const weakestMetric =
    [
      { label: 'precision', score: precisionScore },
      { label: result.trainingType === 'tracking' ? 'control uptime' : 'speed', score: speedScore },
      { label: 'miss control', score: controlScore },
    ].sort((a, b) => a.score - b.score)[0]?.label ?? 'precision';

  const gradeReason =
    result.trainingType === 'tracking'
      ? `This tracking grade weighs time-on-target most heavily. Your weakest signal was ${weakestMetric}.`
      : `This ${result.trainingType} grade weighs precision first, then speed and miss control. Your weakest signal was ${weakestMetric}.`;

  const getNextDrill = () => {
    if (result.accuracy < 75) {
      return {
        type: result.trainingType,
        label: getTrainingTypeLabel(result.trainingType),
        reason: t('routine_reason_precision'),
        isSameMode: true,
      };
    }

    if (result.trainingType === 'tracking') {
      return {
        type: 'flicking',
        label: t('mode_flicking'),
        reason: t('routine_reason_flicking'),
        isSameMode: false,
      };
    }

    if (result.trainingType === 'flicking') {
      return {
        type: 'gridshot',
        label: t('mode_gridshot'),
        reason: t('routine_reason_gridshot'),
        isSameMode: false,
      };
    }

    return {
      type: 'tracking',
      label: t('mode_tracking'),
      reason: t('routine_reason_tracking'),
      isSameMode: false,
    };
  };

  const nextDrill = getNextDrill();

  const trackRoutineContinue = () => {
    trackEvent('routine_continue_click', {
      from_mode: result.trainingType,
      next_mode: nextDrill.type,
      score: result.score,
      accuracy: Number(result.accuracy.toFixed(1)),
      best_delta: bestDelta ?? 0,
    });
  };

  const trackStatsView = () => {
    trackEvent('stats_view_click', {
      source: 'result_screen',
      mode: result.trainingType,
      sessions_saved: trainingHistory.length,
    });
  };

  const feedbackContext = (source: string, selectedOption?: string) =>
    buildFeedbackContext(source, {
      trainingMode: result.trainingType,
      score: result.score,
      accuracy: Number(result.accuracy.toFixed(1)),
      duration: result.duration,
      sessionsSaved: trainingHistory.length,
      localRuns: trainingHistory.length,
      selectedOption,
      inputMode: result.inputMode,
      aimEngine: result.aimEngine,
      calibrationMultiplier: result.calibrationMultiplier,
      routineId: result.routineId,
      routineStepId: result.routineStepId,
      routineStepName: result.routineStepName,
    });

  const quickFeedbackOptions: {
    value: string;
    label: string;
    category: FeedbackCategory;
    message: string;
  }[] = [
    {
      value: 'good',
      label: t('quick_feedback_good'),
      category: 'positive',
      message: 'The drill felt good.',
    },
    {
      value: 'too_easy',
      label: t('quick_feedback_too_easy'),
      category: 'missing_feature',
      message: 'The drill felt too easy.',
    },
    {
      value: 'too_hard',
      label: t('quick_feedback_too_hard'),
      category: 'missing_feature',
      message: 'The drill felt too hard.',
    },
    {
      value: 'laggy',
      label: t('quick_feedback_laggy'),
      category: 'lag_or_controls',
      message: 'The drill felt laggy or choppy.',
    },
    {
      value: 'aim_wrong',
      label: t('quick_feedback_aim_wrong'),
      category: 'aim_feels_off',
      message: 'Aim or sensitivity felt wrong.',
    },
    {
      value: 'want_progress',
      label: t('quick_feedback_progress'),
      category: 'stats_confusing',
      message: 'I want better progress tracking.',
    },
  ];

  const retentionOptions = [
    { value: 'daily_warmup_plan', label: t('retention_daily_plan') },
    { value: 'progress_chart', label: t('retention_progress_chart') },
    { value: 'leaderboard', label: t('retention_leaderboard') },
    { value: 'shareable_score_card', label: t('retention_share_card') },
    { value: 'more_drills', label: t('retention_more_drills') },
    { value: 'better_cs2_sensitivity', label: t('retention_better_sens') },
    { value: 'pro_routines', label: t('retention_pro_routines') },
    { value: 'one_time_use', label: t('retention_one_time') },
  ];

  const handleQuickFeedback = async (option: typeof quickFeedbackOptions[number]) => {
    setQuickFeedback(option.value);
    setQuickStatus('sending');

    try {
      const success = await submitFeedback({
        category: option.category,
        message: quickNote.trim()
          ? `${option.message}\n\nNote: ${quickNote.trim()}`
          : option.message,
        context: feedbackContext('result_screen_quick_feedback', option.value),
      });

      setQuickStatus(success ? 'success' : 'error');
    } catch {
      setQuickStatus('error');
    }
  };

  const handleRetentionFeedback = async (option: typeof retentionOptions[number]) => {
    setRetentionAnswer(option.value);
    setRetentionStatus('sending');

    try {
      const success = await submitFeedback({
        category: 'retention_reason',
        message: `What would make me come back tomorrow: ${option.value}`,
        context: feedbackContext('result_screen_retention_question', option.value),
      });

      setRetentionStatus(success ? 'success' : 'error');
    } catch {
      setRetentionStatus('error');
    }
  };

  return (
    <div className="absolute inset-0 overflow-y-auto bg-gray-950/95 px-4 py-6">
      <div className="mx-auto w-full max-w-4xl rounded-lg border border-gray-800 bg-gray-900 p-5 shadow-2xl md:p-7">
        {/* 标题 */}
        <div className="mb-6 flex flex-col gap-4 border-b border-gray-800 pb-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">
              {getTrainingTypeLabel(result.trainingType)}
            </p>
            <h2 className="mt-2 text-3xl font-black text-white">{t('result_complete')}</h2>
            <p className="mt-2 max-w-xl text-sm text-gray-400">
              This is a drill score for this browser session, not a CS2 rank.
            </p>
          </div>
          <div className="rounded-lg bg-gray-950 px-4 py-3 text-left md:text-right">
            <div className="text-xs text-gray-500">Drill score</div>
            <div className="mt-1 text-2xl font-black text-white">{drillScore}/100</div>
          </div>
        </div>

        {/* 评级 */}
        <div className="mb-6 rounded-lg border border-gray-800 bg-gray-950/60 p-5 text-center">
          <div className={`text-7xl font-black ${color}`}>{grade}</div>
          <div className="mt-1 text-sm font-semibold text-white">Drill Grade: {band}</div>
          <p className="mx-auto mt-2 max-w-xl text-xs text-gray-400">{gradeReason}</p>
        </div>

        <div className="mb-6 rounded-lg border border-gray-800 bg-gray-950/60 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">Why this grade?</p>
              <p className="mt-1 text-xs text-gray-400">
                S 95+, A 90-94, B 80-89, C 70-79, D 60-69, F below 60.
              </p>
            </div>
            <span className="rounded bg-gray-950 px-2 py-1 text-sm font-bold text-gray-200">
              {drillScore}/100
            </span>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              { label: 'Precision', value: precisionScore, hint: `${result.accuracy.toFixed(1)}% accuracy` },
              {
                label: result.trainingType === 'tracking' ? 'Control' : 'Speed',
                value: result.trainingType === 'tracking' ? controlScore : speedScore,
                hint:
                  result.trainingType === 'tracking'
                    ? 'time on target'
                    : result.avgReactionTime > 0
                    ? `${result.avgReactionTime}ms avg`
                    : `${hitsPerSecond.toFixed(2)} hits/s`,
              },
              { label: 'Miss control', value: controlScore, hint: `${result.misses} misses` },
            ].map((metric) => (
              <div key={metric.label} className="rounded-lg bg-gray-800/80 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-gray-300">{metric.label}</span>
                  <span className="font-semibold text-white">{metric.value}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-700">
                  <div
                    className="h-full rounded-full bg-blue-400"
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
                <div className="mt-1 text-xs text-gray-500">{metric.hint}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 rounded-lg border border-gray-700 bg-gray-900/70 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white">Mouse input confidence</p>
              <p className="mt-1 text-xs text-gray-400">
                {result.inputMode === 'raw'
                  ? 'Raw mouse input was active for this run.'
                  : result.inputMode === 'pointer-lock'
                  ? 'Pointer Lock was active, but raw input was not confirmed.'
                  : 'Browser fallback was used; this run may not feel like CS2.'}
              </p>
            </div>
            <span
              className={`shrink-0 rounded px-2 py-1 text-xs font-semibold ${
                result.inputMode === 'raw'
                  ? 'bg-green-500/15 text-green-300'
                  : result.inputMode === 'pointer-lock'
                  ? 'bg-yellow-500/15 text-yellow-200'
                  : 'bg-red-500/15 text-red-200'
              }`}
            >
              {result.inputMode === 'raw'
                ? 'Raw'
                : result.inputMode === 'pointer-lock'
                ? 'Pointer Lock'
                : 'Fallback'}
            </span>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            Aim model: {result.aimEngine === 'angular' ? 'CS2-like angular' : 'cursor'} · Browser calibration: {(result.calibrationMultiplier ?? 1).toFixed(2)}x
          </div>
        </div>

        {/* 主要数据 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-white">{result.score}</div>
            <div className="text-sm text-gray-400">{t('result_score')}</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-white">{result.accuracy.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">{t('result_accuracy')}</div>
          </div>
        </div>

        {/* 详细数据 */}
        <div className="space-y-3 mb-8">
          {result.avgReactionTime > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{t('result_avg_reaction')}</span>
              <span className="text-white font-medium">{result.avgReactionTime}ms</span>
            </div>
          )}
          {result.bestReactionTime > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{t('result_best_reaction')}</span>
              <span className="text-green-400 font-medium">{result.bestReactionTime}ms</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">{t('result_hits')}</span>
            <span className="text-white font-medium">
              {result.hits}/{result.totalTargets}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">{t('result_duration')}</span>
            <span className="text-white font-medium">{result.duration}s</span>
          </div>
        </div>

        {routineAction && (
          <div className="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-green-300">
              Warm-up routine
            </p>
            <h3 className="mt-1 text-lg font-bold text-white">{routineAction.description}</h3>
            <p className="mt-2 text-sm text-gray-300">
              Keep the flow going while your hand is warm. The full summary comes after the last step.
            </p>
            <button
              type="button"
              onClick={routineAction.onClick}
              className="mt-4 w-full rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-500"
            >
              {routineAction.label}
            </button>
          </div>
        )}

        {/* 留存实验：把一次训练变成下一次训练的入口。 */}
        {!hideRoutineRecommendation && (
          <div className="mb-6 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">
                  {t('routine_title')}
                </p>
                <h3 className="mt-1 text-lg font-bold text-white">{nextDrill.label}</h3>
              </div>
              <div className="rounded-lg bg-gray-950/60 px-3 py-2 text-right">
                <div className="text-xs text-gray-400">{t('routine_best_delta')}</div>
                <div
                  className={`text-sm font-bold ${
                    bestDelta === null
                      ? 'text-gray-300'
                      : bestDelta >= 0
                      ? 'text-green-400'
                      : 'text-orange-300'
                  }`}
                >
                  {bestDelta === null
                    ? t('routine_first_run')
                    : `${bestDelta >= 0 ? '+' : ''}${bestDelta}`}
                </div>
              </div>
            </div>
            <p className="mb-4 text-sm text-gray-300">{nextDrill.reason}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {nextDrill.isSameMode ? (
                <button
                  onClick={() => {
                    trackRoutineContinue();
                    onRestart();
                  }}
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
                >
                  {t('routine_continue')}
                </button>
              ) : (
                <Link
                  href={`/play/${nextDrill.type}`}
                  onClick={trackRoutineContinue}
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-500"
                >
                  {t('routine_continue')}
                </Link>
              )}
              <Link
                href="/stats"
                onClick={trackStatsView}
                className="rounded-lg bg-gray-700 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-gray-600"
              >
                {t('routine_view_progress')}
              </Link>
            </div>
          </div>
        )}

        {/* 结果页微反馈：刚用完工具时收集真实手感。 */}
        <div className="mb-6 rounded-lg border border-gray-700 bg-gray-900/70 p-4">
          <div className="mb-3">
            <p className="text-sm font-semibold text-white">{t('quick_feedback_title')}</p>
            <p className="mt-1 text-xs text-gray-400">{t('quick_feedback_subtitle')}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {quickFeedbackOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleQuickFeedback(option)}
                disabled={quickStatus === 'sending'}
                className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                  quickFeedback === option.value
                    ? 'border-green-500 bg-green-500/15 text-white'
                    : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-500'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <textarea
            value={quickNote}
            onChange={(e) => setQuickNote(e.target.value)}
            placeholder={t('quick_feedback_note')}
            rows={2}
            className="mt-3 w-full resize-none rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          />
          {quickStatus === 'success' && (
            <p className="mt-2 text-xs text-green-400">{t('quick_feedback_thanks')}</p>
          )}
          {quickStatus === 'error' && (
            <p className="mt-2 text-xs text-red-400">{t('quick_feedback_error')}</p>
          )}
        </div>

        {trainingHistory.length >= 2 && (
          <div className="mb-6 rounded-lg border border-purple-500/30 bg-purple-500/10 p-4">
            <p className="text-sm font-semibold text-white">{t('retention_question_title')}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {retentionOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleRetentionFeedback(option)}
                  disabled={retentionStatus === 'sending'}
                  className={`rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
                    retentionAnswer === option.value
                      ? 'border-purple-400 bg-purple-500/20 text-white'
                      : 'border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {retentionStatus === 'success' && (
              <p className="mt-2 text-xs text-green-400">{t('quick_feedback_thanks')}</p>
            )}
          </div>
        )}

        {/* 导流：刚练完瞄准的用户 → 抄 pro 设置/准星（已变现内容页）。
            放在结算屏 = 全训练页覆盖 + 每回合一次 + 自然停顿。 */}
        <div className="mb-6 rounded-lg border border-gray-700 bg-gray-700/30 p-4">
          <p className="mb-3 text-center text-sm font-medium text-gray-300">
            {t('result_cta_title')}
          </p>
          <div className="space-y-2">
            <Link
              href="/pro"
              onClick={() => trackContentCta('pro')}
              className="flex items-center justify-between rounded-lg bg-gray-700/60 px-4 py-2.5 text-sm text-white transition-colors hover:bg-gray-700"
            >
              <span>⭐ {t('result_cta_pro')}</span>
              <span className="text-blue-400">→</span>
            </Link>
            <Link
              href="/crosshairs"
              onClick={() => trackContentCta('crosshairs')}
              className="flex items-center justify-between rounded-lg bg-gray-700/60 px-4 py-2.5 text-sm text-white transition-colors hover:bg-gray-700"
            >
              <span>🎯 {t('result_cta_crosshair')}</span>
              <span className="text-blue-400">→</span>
            </Link>
          </div>
        </div>

        {/* 按钮 */}
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 py-3 px-6 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            {t('result_back')}
          </button>
          <button
            onClick={onRestart}
            className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium"
          >
            {t('result_restart')}
          </button>
        </div>
      </div>
    </div>
  );
}
