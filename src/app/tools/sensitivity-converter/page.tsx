'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import { games, calculateCm360, convertSensitivity, getGameList } from '@/lib/sensitivity-converter';
import { useTranslation } from '@/lib/i18n';

export default function SensitivityConverterPage() {
  const { t } = useTranslation();
  const gameList = getGameList();

  const [fromGame, setFromGame] = useState('cs2');
  const [dpi, setDpi] = useState(800);
  const [sensitivity, setSensitivity] = useState(games.cs2.defaultSens);

  // 计算 cm/360 和所有游戏的转换结果
  const results = useMemo(() => {
    const cm360 = calculateCm360(sensitivity, dpi, fromGame);

    const conversions = gameList.map(game => ({
      game,
      sensitivity: game.id === fromGame
        ? sensitivity
        : convertSensitivity(fromGame, game.id, sensitivity, dpi),
    }));

    return { cm360, conversions };
  }, [fromGame, dpi, sensitivity, gameList]);

  // 切换源游戏时更新默认灵敏度
  const handleFromGameChange = (gameId: string) => {
    setFromGame(gameId);
    setSensitivity(games[gameId].defaultSens);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('sens_title')}
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('sens_subtitle')}
            </p>
          </div>

          {/* Input Section */}
          <div className="bg-gray-800 rounded-2xl p-6 md:p-8 mb-8">
            <h2 className="text-lg font-bold mb-6">{t('sens_current_settings')}</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Source Game */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">{t('sens_game')}</label>
                <select
                  value={fromGame}
                  onChange={(e) => handleFromGameChange(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                >
                  {gameList.map(game => (
                    <option key={game.id} value={game.id}>{game.name}</option>
                  ))}
                </select>
              </div>

              {/* DPI */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">{t('sens_mouse_dpi')}</label>
                <input
                  type="number"
                  value={dpi}
                  onChange={(e) => setDpi(parseInt(e.target.value) || 800)}
                  min={100}
                  max={16000}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Sensitivity */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  {t('sens_sensitivity')}
                  <span className="text-gray-500 ml-1">
                    ({games[fromGame].minSens} - {games[fromGame].maxSens})
                  </span>
                </label>
                <input
                  type="number"
                  value={sensitivity}
                  onChange={(e) => setSensitivity(parseFloat(e.target.value) || 1)}
                  min={games[fromGame].minSens}
                  max={games[fromGame].maxSens}
                  step={0.01}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* cm/360 Result */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">{t('sens_your_cm360')}</span>
                <span className="text-3xl font-bold text-blue-400">
                  {results.cm360.toFixed(2)} cm
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {t('sens_cm360_desc')}
              </p>
            </div>
          </div>

          {/* Conversion Results */}
          <div className="bg-gray-800 rounded-2xl p-6 md:p-8 mb-8">
            <h2 className="text-lg font-bold mb-6">{t('sens_converted')}</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {results.conversions.map(({ game, sensitivity: sens }) => (
                <div
                  key={game.id}
                  className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                    game.id === fromGame
                      ? 'bg-blue-600/20 border border-blue-500/50'
                      : 'bg-gray-900/50 hover:bg-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getGameIcon(game.id)}</span>
                    <div>
                      <div className="font-medium text-white">{game.shortName}</div>
                      <div className="text-xs text-gray-500">{game.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xl font-bold ${game.id === fromGame ? 'text-blue-400' : 'text-white'}`}>
                      {sens.toFixed(3)}
                    </div>
                    {game.id === fromGame && (
                      <div className="text-xs text-blue-400">{t('sens_current')}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common DPI Presets */}
          <div className="bg-gray-800 rounded-2xl p-6 md:p-8 mb-8">
            <h2 className="text-lg font-bold mb-4">{t('sens_quick_dpi')}</h2>
            <div className="flex flex-wrap gap-2">
              {[400, 800, 1600, 3200].map(d => (
                <button
                  key={d}
                  onClick={() => setDpi(d)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    dpi === d
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {d} DPI
                </button>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-gray-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-lg font-bold mb-4">{t('sens_how_it_works')}</h2>
            <div className="prose prose-invert prose-sm max-w-none">
              <p className="text-gray-400">
                {t('sens_explanation')}
              </p>
              <p className="text-gray-400 mt-4">
                {t('sens_muscle_memory')}
              </p>
              <h3 className="text-white mt-6 mb-2">{t('sens_recommended')}</h3>
              <ul className="text-gray-400 space-y-1">
                <li><strong className="text-white">20-30 cm:</strong> {t('sens_high')}</li>
                <li><strong className="text-white">30-45 cm:</strong> {t('sens_medium')}</li>
                <li><strong className="text-white">45-60+ cm:</strong> {t('sens_low')}</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// 游戏图标
function getGameIcon(gameId: string): string {
  const icons: Record<string, string> = {
    cs2: '🔫',
    valorant: '🎯',
    apex: '🦁',
    overwatch: '🦸',
    fortnite: '🏗️',
    r6: '🛡️',
    pubg: '🍳',
    cod: '💀',
  };
  return icons[gameId] || '🎮';
}
