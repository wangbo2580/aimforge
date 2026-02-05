'use client';

import Link from 'next/link';
import Header from '@/components/layout/Header';
import { useTranslation } from '@/lib/i18n';

export default function PlayPage() {
  const { t } = useTranslation();

  const trainingModes = [
    {
      id: 'gridshot',
      nameKey: 'mode_gridshot' as const,
      descKey: 'mode_gridshot_desc' as const,
      color: 'from-red-500 to-orange-500',
      icon: '🎯',
      statsKeys: ['result_avg_reaction', 'result_accuracy', 'result_score'] as const,
    },
    {
      id: 'tracking',
      nameKey: 'mode_tracking' as const,
      descKey: 'mode_tracking_desc' as const,
      color: 'from-blue-500 to-cyan-500',
      icon: '👁️',
      statsKeys: ['result_accuracy', 'game_time', 'result_score'] as const,
    },
    {
      id: 'flicking',
      nameKey: 'mode_flicking' as const,
      descKey: 'mode_flicking_desc' as const,
      color: 'from-purple-500 to-pink-500',
      icon: '⚡',
      statsKeys: ['result_avg_reaction', 'result_accuracy', 'result_score'] as const,
    },
  ];

  const tips = [
    'tip_1' as const,
    'tip_2' as const,
    'tip_3' as const,
    'tip_4' as const,
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">{t('play_title')}</h1>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            {t('play_subtitle')}
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {trainingModes.map((mode) => (
              <Link
                key={mode.id}
                href={`/play/${mode.id}`}
                className="group bg-gray-800 rounded-2xl overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all hover:scale-[1.02]"
              >
                {/* Header */}
                <div
                  className={`h-32 bg-gradient-to-br ${mode.color} flex items-center justify-center`}
                >
                  <span className="text-6xl">{mode.icon}</span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                    {t(mode.nameKey)}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4">{t(mode.descKey)}</p>

                  {/* Stats Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mode.statsKeys.map((statKey) => (
                      <span
                        key={statKey}
                        className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300"
                      >
                        {t(statKey)}
                      </span>
                    ))}
                  </div>

                  {/* Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 font-medium group-hover:underline">
                      {t('play_start')}
                    </span>
                    <svg
                      className="w-5 h-5 text-blue-400 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Tips */}
          <div className="mt-16 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-center mb-6">{t('play_tips')}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {tips.map((tipKey, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-gray-800/50 rounded-lg p-4"
                >
                  <span className="text-green-400 text-lg">✓</span>
                  <span className="text-gray-300 text-sm">{t(tipKey)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
