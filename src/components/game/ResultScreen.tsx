'use client';

// 训练结果展示组件 (F005)

import { TrainingResult } from '@/types/game';
import { useTranslation } from '@/lib/i18n';

interface ResultScreenProps {
  result: TrainingResult;
  onRestart: () => void;
  onBack: () => void;
}

export default function ResultScreen({ result, onRestart, onBack }: ResultScreenProps) {
  const { t } = useTranslation();

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

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/90">
      <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
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
