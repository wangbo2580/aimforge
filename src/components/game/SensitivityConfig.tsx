'use client';

// 敏感度配置组件 (F004)

import { useState } from 'react';
import { useGameStore } from '@/store/game-store';
import { calculateCm360, formatCm360, PRESET_CONFIGS } from '@/lib/sensitivity';
import { SensitivityConfig as SensitivityConfigType } from '@/types/game';

export default function SensitivityConfig() {
  const { settings, updateSettings } = useGameStore();
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const sensitivity = settings.sensitivity;
  const cm360 = calculateCm360(sensitivity);

  const handleGameChange = (game: SensitivityConfigType['game']) => {
    updateSettings({
      sensitivity: {
        ...sensitivity,
        game,
        mYaw: game === 'cs2' ? 0.022 : undefined,
      },
    });
    setActivePreset(null);
  };

  const handleSensitivityChange = (value: number) => {
    updateSettings({
      sensitivity: {
        ...sensitivity,
        sensitivity: value,
      },
    });
    setActivePreset(null);
  };

  const handleDpiChange = (value: number) => {
    updateSettings({
      sensitivity: {
        ...sensitivity,
        dpi: value,
      },
    });
    setActivePreset(null);
  };

  const handlePresetSelect = (presetName: string) => {
    const preset = PRESET_CONFIGS[presetName];
    if (preset) {
      updateSettings({ sensitivity: preset });
      setActivePreset(presetName);
    }
  };

  const handleCustomCm360Change = (value: number) => {
    updateSettings({
      sensitivity: {
        ...sensitivity,
        game: 'custom',
        cm360: value,
      },
    });
    setActivePreset(null);
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">敏感度设置</h3>

      {/* 游戏选择 */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">游戏</label>
        <div className="flex gap-2">
          {(['cs2', 'valorant', 'custom'] as const).map((game) => (
            <button
              key={game}
              onClick={() => handleGameChange(game)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                sensitivity.game === game
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {game === 'cs2' ? 'CS2' : game === 'valorant' ? 'Valorant' : '自定义'}
            </button>
          ))}
        </div>
      </div>

      {/* 游戏设置 */}
      {sensitivity.game !== 'custom' && (
        <>
          {/* 灵敏度 */}
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-400">游戏内灵敏度</label>
              <span className="text-sm text-white font-medium">{sensitivity.sensitivity}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.01"
              value={sensitivity.sensitivity}
              onChange={(e) => handleSensitivityChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* DPI */}
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-400">鼠标 DPI</label>
              <span className="text-sm text-white font-medium">{sensitivity.dpi}</span>
            </div>
            <input
              type="range"
              min="100"
              max="3200"
              step="50"
              value={sensitivity.dpi}
              onChange={(e) => handleDpiChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>100</span>
              <span>800</span>
              <span>1600</span>
              <span>3200</span>
            </div>
          </div>

          {/* 职业选手预设 */}
          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">职业选手预设</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(PRESET_CONFIGS)
                .filter(([_, config]) => config.game === sensitivity.game)
                .map(([name]) => (
                  <button
                    key={name}
                    onClick={() => handlePresetSelect(name)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      activePreset === name
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {name}
                  </button>
                ))}
            </div>
          </div>
        </>
      )}

      {/* 自定义 cm/360 */}
      {sensitivity.game === 'custom' && (
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <label className="text-sm text-gray-400">cm/360</label>
            <span className="text-sm text-white font-medium">{sensitivity.cm360 || 30}</span>
          </div>
          <input
            type="range"
            min="10"
            max="80"
            step="1"
            value={sensitivity.cm360 || 30}
            onChange={(e) => handleCustomCm360Change(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>10cm (快)</span>
            <span>30cm</span>
            <span>80cm (慢)</span>
          </div>
        </div>
      )}

      {/* cm/360 显示 */}
      <div className="bg-gray-700/50 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-blue-400">{formatCm360(cm360)}</div>
        <div className="text-sm text-gray-400 mt-1">
          {cm360 < 20
            ? '高敏感度 (适合近距离、追踪)'
            : cm360 < 40
            ? '中等敏感度 (均衡)'
            : '低敏感度 (适合远距离、精确瞄准)'}
        </div>
      </div>
    </div>
  );
}
