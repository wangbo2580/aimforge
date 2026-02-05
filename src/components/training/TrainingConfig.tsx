'use client';

// 训练配置组件

import { useGameStore } from '@/store/game-store';
import { TargetSize, TrackingPattern, Speed, TrainingType } from '@/types/game';

interface TrainingConfigProps {
  trainingType: TrainingType;
}

export default function TrainingConfig({ trainingType }: TrainingConfigProps) {
  const { trainingConfig, updateTrainingConfig } = useGameStore();

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">训练配置</h3>

      {/* 时长 */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <label className="text-sm text-gray-400">训练时长</label>
          <span className="text-sm text-white font-medium">{trainingConfig.duration}秒</span>
        </div>
        <div className="flex gap-2">
          {[15, 30, 60, 120].map((duration) => (
            <button
              key={duration}
              onClick={() => updateTrainingConfig({ duration })}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                trainingConfig.duration === duration
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {duration}s
            </button>
          ))}
        </div>
      </div>

      {/* 目标大小 */}
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2">目标大小</label>
        <div className="flex gap-2">
          {(['small', 'medium', 'large'] as TargetSize[]).map((size) => (
            <button
              key={size}
              onClick={() => updateTrainingConfig({ targetSize: size })}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                trainingConfig.targetSize === size
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {size === 'small' ? '小' : size === 'medium' ? '中' : '大'}
            </button>
          ))}
        </div>
      </div>

      {/* Gridshot 专属配置 */}
      {trainingType === 'gridshot' && (
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <label className="text-sm text-gray-400">同时目标数</label>
            <span className="text-sm text-white font-medium">{trainingConfig.targetCount}</span>
          </div>
          <div className="flex gap-2">
            {[1, 3, 5].map((count) => (
              <button
                key={count}
                onClick={() => updateTrainingConfig({ targetCount: count })}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  trainingConfig.targetCount === count
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {count}个
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tracking 专属配置 */}
      {trainingType === 'tracking' && (
        <>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">移动模式</label>
            <div className="grid grid-cols-2 gap-2">
              {(['strafe', 'linear', 'curve', 'random'] as TrackingPattern[]).map((pattern) => (
                <button
                  key={pattern}
                  onClick={() => updateTrainingConfig({ movePattern: pattern })}
                  className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                    trainingConfig.movePattern === pattern
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {pattern === 'strafe'
                    ? '左右闪避'
                    : pattern === 'linear'
                    ? '直线'
                    : pattern === 'curve'
                    ? '曲线'
                    : '随机'}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">移动速度</label>
            <div className="flex gap-2">
              {(['slow', 'medium', 'fast'] as Speed[]).map((speed) => (
                <button
                  key={speed}
                  onClick={() => updateTrainingConfig({ speed })}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    trainingConfig.speed === speed
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {speed === 'slow' ? '慢' : speed === 'medium' ? '中' : '快'}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Flicking 专属配置 */}
      {trainingType === 'flicking' && (
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">目标距离</label>
          <div className="flex gap-2">
            {(['close', 'medium', 'far'] as const).map((distance) => (
              <button
                key={distance}
                onClick={() => updateTrainingConfig({ targetDistance: distance })}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  trainingConfig.targetDistance === distance
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {distance === 'close' ? '近' : distance === 'medium' ? '中' : '远'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
