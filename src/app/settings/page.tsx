'use client';

// 设置页面

import Header from '@/components/layout/Header';
import SensitivityConfig from '@/components/game/SensitivityConfig';
import { useGameStore } from '@/store/game-store';
import { useTranslation } from '@/lib/i18n';
import { LanguageSelector } from '@/components/layout/LanguageSwitcher';

export default function SettingsPage() {
  const { settings, updateSettings, clearHistory } = useGameStore();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-4xl font-bold mb-8">{t('settings_title')}</h1>

          <div className="space-y-6">
            {/* 语言设置 */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Language / 语言</h3>
              <LanguageSelector />
            </div>

            {/* 敏感度设置 */}
            <SensitivityConfig />

            {/* 游戏设置 */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">{t('settings_title')}</h3>

              {/* 声音 */}
              <div className="flex items-center justify-between py-3 border-b border-gray-700">
                <div>
                  <div className="text-white font-medium">{t('settings_sound')}</div>
                  <div className="text-sm text-gray-400">{t('settings_sound_desc')}</div>
                </div>
                <button
                  onClick={() =>
                    updateSettings({ soundEnabled: !settings.soundEnabled })
                  }
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    settings.soundEnabled ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                      settings.soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              {/* 准星颜色 */}
              <div className="flex items-center justify-between py-3 border-b border-gray-700">
                <div>
                  <div className="text-white font-medium">{t('settings_crosshair_color')}</div>
                  <div className="text-sm text-gray-400">{t('settings_crosshair_color_desc')}</div>
                </div>
                <input
                  type="color"
                  value={settings.crosshairColor}
                  onChange={(e) =>
                    updateSettings({ crosshairColor: e.target.value })
                  }
                  className="w-10 h-10 rounded cursor-pointer"
                />
              </div>

              {/* 准星大小 */}
              <div className="py-3">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-white font-medium">{t('settings_crosshair_size')}</div>
                    <div className="text-sm text-gray-400">{t('settings_crosshair_size_desc')}</div>
                  </div>
                  <span className="text-white font-medium">
                    {settings.crosshairSize}px
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="25"
                  value={settings.crosshairSize}
                  onChange={(e) =>
                    updateSettings({ crosshairSize: parseInt(e.target.value) })
                  }
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* 数据管理 */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">{t('settings_data')}</h3>

              <div className="flex items-center justify-between py-3">
                <div>
                  <div className="text-white font-medium">{t('settings_clear')}</div>
                  <div className="text-sm text-gray-400">
                    {t('settings_clear_desc')}
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (confirm(t('settings_clear_confirm'))) {
                      clearHistory();
                    }
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  {t('settings_clear_btn')}
                </button>
              </div>
            </div>

            {/* 关于 */}
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">{t('settings_about')}</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>
                  <span className="text-white">AimForge</span> - Free FPS Aim Trainer
                </p>
                <p>{t('settings_version')}: 1.0.0</p>
                <p>{t('settings_local_note')}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
