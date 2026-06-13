'use client';

// 训练结果展示组件 (F005)

import Link from 'next/link';
import { TrainingResult } from '@/types/game';
import { useTranslation } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';
import { useGameStore } from '@/store/game-store';

// 导流到已变现内容页（/pro Amazon 联盟、/crosshairs Adsterra）+ GA 事件埋点，
// 用于衡量「训练页 → 变现内容页」导流效果（复盘实验 #2）。
function trackContentCta(target: 'pro' | 'crosshairs') {
  trackEvent('content_cta_click', {
    cta_location: 'result_screen',
    cta_target: target,
  });
}

interface ResultScreenProps {
  result: TrainingResult;
  onRestart: () => void;
  onBack: () => void;
}

export default function ResultScreen({ result, onRestart, onBack }: ResultScreenProps) {
  const { t } = useTranslation();
  const trainingHistory = useGameStore((state) => state.trainingHistory);

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

  const getGrade = (accuracy: number): { grade: string; color: string } => {
    if (accuracy >= 95) return { grade: 'S', color: 'text-yellow-400' };
    if (accuracy >= 90) return { grade: 'A', color: 'text-green-400' };
    if (accuracy >= 80) return { grade: 'B', color: 'text-blue-400' };
    if (accuracy >= 70) return { grade: 'C', color: 'text-purple-400' };
    if (accuracy >= 60) return { grade: 'D', color: 'text-orange-400' };
    return { grade: 'F', color: 'text-red-400' };
  };

  const { grade, color } = getGrade(result.accuracy);

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

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/90">
      <div className="bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4 shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* 标题 */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">{t('result_complete')}</h2>
          <p className="text-gray-400">{getTrainingTypeLabel(result.trainingType)}</p>
        </div>

        {/* 评级 */}
        <div className="text-center mb-8">
          <div className={`text-8xl font-black ${color}`}>{grade}</div>
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

        {/* 留存实验：把一次训练变成下一次训练的入口。 */}
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
