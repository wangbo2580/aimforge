'use client';

import Link from 'next/link';
import Header from '@/components/layout/Header';
import { useTranslation } from '@/lib/i18n';

export default function Home() {
  const { t } = useTranslation();

  const trainingModes = [
    {
      id: 'gridshot',
      nameKey: 'mode_gridshot' as const,
      descKey: 'mode_gridshot_desc' as const,
      color: 'from-red-500 to-orange-500',
      icon: '🎯',
    },
    {
      id: 'tracking',
      nameKey: 'mode_tracking' as const,
      descKey: 'mode_tracking_desc' as const,
      color: 'from-blue-500 to-cyan-500',
      icon: '👁️',
    },
    {
      id: 'flicking',
      nameKey: 'mode_flicking' as const,
      descKey: 'mode_flicking_desc' as const,
      color: 'from-purple-500 to-pink-500',
      icon: '⚡',
    },
  ];

  const features = [
    { titleKey: 'feature_free' as const, descKey: 'feature_free_desc' as const, icon: '💰' },
    { titleKey: 'feature_sensitivity' as const, descKey: 'feature_sensitivity_desc' as const, icon: '🎮' },
    { titleKey: 'feature_no_download' as const, descKey: 'feature_no_download_desc' as const, icon: '🌐' },
    { titleKey: 'feature_local' as const, descKey: 'feature_local_desc' as const, icon: '💾' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {t('home_title')}
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              {t('home_subtitle')}
            </p>
            <Link
              href="/play"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-lg font-semibold transition-colors"
            >
              {t('home_start')}
              <svg
                className="w-5 h-5"
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
            </Link>
          </div>
        </section>

        {/* Training Modes */}
        <section className="py-16 px-4 bg-gray-900/50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t('home_training_modes')}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {trainingModes.map((mode) => (
                <Link
                  key={mode.id}
                  href={`/play/${mode.id}`}
                  className="group bg-gray-800 rounded-2xl p-6 hover:bg-gray-750 transition-all hover:scale-[1.02] hover:shadow-xl"
                >
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center text-3xl mb-4`}
                  >
                    {mode.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                    {t(mode.nameKey)}
                  </h3>
                  <p className="text-gray-400">{t(mode.descKey)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t('home_why_choose')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <div key={i} className="bg-gray-800/50 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{t(feature.titleKey)}</h3>
                  <p className="text-sm text-gray-400">{t(feature.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          <p>AimForge - Free FPS Aim Trainer</p>
          <p className="mt-2">{t('footer_tagline')}</p>
        </div>
      </footer>
    </div>
  );
}
