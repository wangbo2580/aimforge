'use client';

// 统计页面

import Header from '@/components/layout/Header';
import { useGameStore, useStats } from '@/store/game-store';
import { useTranslation } from '@/lib/i18n';
import { TrainingType } from '@/types/game';

export default function StatsPage() {
  const { trainingHistory } = useGameStore();
  const { getStatsByType, getTotalStats } = useStats();
  const { t } = useTranslation();

  const totalStats = getTotalStats();

  const trainingTypes: { type: TrainingType; nameKey: 'mode_gridshot' | 'mode_tracking' | 'mode_flicking'; color: string }[] = [
    { type: 'gridshot', nameKey: 'mode_gridshot', color: 'text-red-400' },
    { type: 'tracking', nameKey: 'mode_tracking', color: 'text-blue-400' },
    { type: 'flicking', nameKey: 'mode_flicking', color: 'text-purple-400' },
  ];

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">{t('stats_title')}</h1>

          {/* 总体统计 */}
          {totalStats ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-800 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-white">
                  {totalStats.totalSessions}
                </div>
                <div className="text-sm text-gray-400">{t('stats_total_sessions')}</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-white">
                  {totalStats.totalScore.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">{t('stats_total_score')}</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-white">
                  {totalStats.avgAccuracy.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-400">{t('stats_avg_accuracy')}</div>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-white">
                  {totalStats.avgReactionTime.toFixed(0)}ms
                </div>
                <div className="text-sm text-gray-400">{t('stats_avg_reaction')}</div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-xl p-8 text-center mb-8">
              <p className="text-gray-400">{t('stats_no_data')}</p>
              <p className="text-sm text-gray-500 mt-2">{t('stats_no_data_hint')}</p>
            </div>
          )}

          {/* 分类统计 */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {trainingTypes.map(({ type, nameKey, color }) => {
              const stats = getStatsByType(type);
              return (
                <div key={type} className="bg-gray-800 rounded-xl p-4">
                  <h3 className={`text-lg font-semibold ${color} mb-3`}>{t(nameKey)}</h3>
                  {stats ? (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t('stats_total_sessions')}</span>
                        <span className="text-white">{stats.totalSessions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t('stats_best_score')}</span>
                        <span className="text-white">{stats.bestScore}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t('stats_avg_accuracy')}</span>
                        <span className="text-white">{stats.avgAccuracy.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">{t('stats_avg_reaction')}</span>
                        <span className="text-white">{stats.avgReactionTime.toFixed(0)}ms</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">{t('stats_no_data')}</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* 历史记录 */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">{t('stats_recent')}</h3>

            {trainingHistory.length > 0 ? (
              <div className="space-y-2">
                {trainingHistory.slice(0, 20).map((record, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-sm font-medium ${
                          record.trainingType === 'gridshot'
                            ? 'text-red-400'
                            : record.trainingType === 'tracking'
                            ? 'text-blue-400'
                            : 'text-purple-400'
                        }`}
                      >
                        {record.trainingType.charAt(0).toUpperCase() +
                          record.trainingType.slice(1)}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {formatDate(record.timestamp)}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <span className="text-white">
                        <span className="text-gray-400">{t('result_score')}: </span>
                        {record.score}
                      </span>
                      <span className="text-white">
                        <span className="text-gray-400">{t('result_accuracy')}: </span>
                        {record.accuracy.toFixed(1)}%
                      </span>
                      {record.avgReactionTime > 0 && (
                        <span className="text-white hidden md:inline">
                          <span className="text-gray-400">{t('stats_avg_reaction')}: </span>
                          {record.avgReactionTime}ms
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">{t('stats_no_data')}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
