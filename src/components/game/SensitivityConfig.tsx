'use client';

// 敏感度配置组件 (F004)

import { useState } from 'react';
import { useGameStore } from '@/store/game-store';
import { calculateCm360, formatCm360, PRESET_CONFIGS } from '@/lib/sensitivity';
import { SensitivityConfig as SensitivityConfigType } from '@/types/game';
import { useTranslation } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';

export default function SensitivityConfig() {
  const { settings, updateSettings } = useGameStore();
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [measuredCm, setMeasuredCm] = useState(10);
  const [measuredDegrees, setMeasuredDegrees] = useState(90);
  const { t } = useTranslation();

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
    trackEvent('sensitivity_saved', {
      field: 'game',
      game,
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
    trackEvent('sensitivity_saved', {
      field: 'sensitivity',
      game: sensitivity.game,
      value,
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
    trackEvent('sensitivity_saved', {
      field: 'dpi',
      game: sensitivity.game,
      value,
    });
    setActivePreset(null);
  };

  const handlePresetSelect = (presetName: string) => {
    const preset = PRESET_CONFIGS[presetName];
    if (preset) {
      updateSettings({
        sensitivity: {
          ...preset,
          calibrationMultiplier: 1,
        },
      });
      trackEvent('sensitivity_saved', {
        field: 'preset',
        game: preset.game,
        preset: presetName,
      });
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
    trackEvent('sensitivity_saved', {
      field: 'cm360',
      game: 'custom',
      value,
    });
    setActivePreset(null);
  };

  const handleCalibrationChange = (value: number) => {
    updateSettings({
      sensitivity: {
        ...sensitivity,
        calibrationMultiplier: value,
      },
    });
    trackEvent('sensitivity_saved', {
      field: 'calibration_multiplier',
      game: sensitivity.game,
      value,
    });
  };

  const applyFeelNudge = (direction: 'too-fast' | 'too-slow') => {
    const currentMultiplier = sensitivity.calibrationMultiplier ?? 1;
    const nextMultiplier =
      direction === 'too-fast'
        ? Math.max(0.7, currentMultiplier - 0.03)
        : Math.min(1.3, currentMultiplier + 0.03);
    const roundedMultiplier = Number(nextMultiplier.toFixed(2));

    handleCalibrationChange(roundedMultiplier);
    trackEvent('calibration_feel_adjust', {
      direction,
      previous_multiplier: Number(currentMultiplier.toFixed(2)),
      calibration_multiplier: roundedMultiplier,
      target_cm360: Number(cm360.toFixed(1)),
      game: sensitivity.game,
      sensitivity: sensitivity.sensitivity,
      dpi: sensitivity.dpi,
    });
  };

  const applyCalibrationWizard = () => {
    if (measuredCm <= 0 || measuredDegrees <= 0) return;

    const observedCm360 = (measuredCm * 360) / measuredDegrees;
    const currentMultiplier = sensitivity.calibrationMultiplier ?? 1;
    const nextMultiplier = Math.max(
      0.7,
      Math.min(1.3, currentMultiplier * (observedCm360 / cm360))
    );

    handleCalibrationChange(Number(nextMultiplier.toFixed(2)));
    trackEvent('calibration_wizard_apply', {
      measured_cm: measuredCm,
      measured_degrees: measuredDegrees,
      observed_cm360: Number(observedCm360.toFixed(1)),
      target_cm360: Number(cm360.toFixed(1)),
      calibration_multiplier: Number(nextMultiplier.toFixed(2)),
    });
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">{t('settings_sensitivity')}</h3>

      {/* 游戏选择 */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">{t('settings_game')}</label>
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
              {game === 'cs2' ? 'CS2' : game === 'valorant' ? 'Valorant' : t('settings_custom')}
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
              <label className="text-sm text-gray-400">{t('settings_game_sens')}</label>
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
              <label className="text-sm text-gray-400">{t('settings_dpi')}</label>
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
            <label className="block text-sm text-gray-400 mb-2">{t('settings_presets')}</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(PRESET_CONFIGS)
                .filter(([, config]) => config.game === sensitivity.game)
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
            <label className="text-sm text-gray-400">{t('settings_cm360')}</label>
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
            <span>10cm ({t('cm360_fast')})</span>
            <span>30cm</span>
            <span>80cm ({t('cm360_slow')})</span>
          </div>
        </div>
      )}

      {/* cm/360 显示 */}
      <div className="bg-gray-700/50 rounded-lg p-4 text-center">
        <div className="text-2xl font-bold text-blue-400">{formatCm360(cm360)}</div>
        <div className="text-sm text-gray-400 mt-1">
          {cm360 < 20
            ? t('cm360_high')
            : cm360 < 40
            ? t('cm360_medium')
            : t('cm360_low')}
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-green-500/30 bg-green-500/10 p-4">
        <p className="text-sm font-semibold text-white">CS2 feel check</p>
        <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs leading-5 text-gray-300">
          <li>Confirm your CS2 sensitivity and DPI above.</li>
          <li>Run a short Gridshot or warm-up step with raw input active.</li>
          <li>If the trainer feels off, use one nudge below, then test again.</li>
        </ol>
      </div>

      <div className="mt-4 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
        <div className="mb-3 flex items-start justify-between gap-4">
          <div>
            <label className="text-sm font-semibold text-white">Browser calibration</label>
            <p className="mt-1 text-xs text-gray-400">
              Fine-tune the browser trainer after entering your CS2 sensitivity. Use this when the mouse feels faster or slower than CS2.
            </p>
          </div>
          <span className="shrink-0 rounded bg-gray-950/70 px-2 py-1 text-sm font-semibold text-blue-200">
            {(sensitivity.calibrationMultiplier ?? 1).toFixed(2)}x
          </span>
        </div>
        <input
          type="range"
          min="0.7"
          max="1.3"
          step="0.01"
          value={sensitivity.calibrationMultiplier ?? 1}
          onChange={(e) => handleCalibrationChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div className="mt-1 flex justify-between text-xs text-gray-500">
          <span>Slower</span>
          <span>CS2-style baseline</span>
          <span>Faster</span>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => applyFeelNudge('too-fast')}
            className="rounded-lg border border-gray-600 bg-gray-950/60 px-3 py-2 text-sm font-semibold text-white transition-colors hover:border-blue-400 hover:bg-gray-900"
          >
            Feels too fast
          </button>
          <button
            type="button"
            onClick={() => applyFeelNudge('too-slow')}
            className="rounded-lg border border-gray-600 bg-gray-950/60 px-3 py-2 text-sm font-semibold text-white transition-colors hover:border-blue-400 hover:bg-gray-900"
          >
            Feels too slow
          </button>
        </div>
        <p className="mt-3 text-xs leading-5 text-gray-400">
          Each nudge changes browser calibration by 3%. Stop once the first 30 seconds feels stable.
        </p>
      </div>

      <div className="mt-4 rounded-lg border border-gray-700 bg-gray-900/70 p-4">
        <p className="text-sm font-semibold text-white">Calibration helper</p>
        <p className="mt-1 text-xs text-gray-400">
          Move your mouse a measured distance in the trainer, estimate the turn angle, then apply a correction. This keeps calibration honest without claiming a perfect CS2 replica.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="text-xs text-gray-400">
            Mouse moved (cm)
            <input
              type="number"
              min="1"
              max="80"
              value={measuredCm}
              onChange={(event) => setMeasuredCm(Number(event.target.value))}
              className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </label>
          <label className="text-xs text-gray-400">
            Trainer turned (degrees)
            <input
              type="number"
              min="1"
              max="360"
              value={measuredDegrees}
              onChange={(event) => setMeasuredDegrees(Number(event.target.value))}
              className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={applyCalibrationWizard}
          className="mt-3 w-full rounded-lg bg-gray-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-600"
        >
          Apply measured correction
        </button>
      </div>
    </div>
  );
}
