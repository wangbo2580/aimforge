'use client';

import Link from 'next/link';
import Header from '@/components/layout/Header';
import { useTranslation } from '@/lib/i18n';

export default function HomeClient() {
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

        {/* Resources */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t('resources_title')}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/pro" className="group bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors">
                <div className="text-3xl mb-3">⭐</div>
                <h3 className="font-bold mb-1 group-hover:text-blue-400">{t('resources_pro')}</h3>
                <p className="text-sm text-gray-400">{t('resources_pro_desc')}</p>
              </Link>
              <Link href="/crosshairs" className="group bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-bold mb-1 group-hover:text-blue-400">{t('resources_crosshair')}</h3>
                <p className="text-sm text-gray-400">{t('resources_crosshair_desc')}</p>
              </Link>
              <Link href="/tools/sensitivity-converter" className="group bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors">
                <div className="text-3xl mb-3">🔄</div>
                <h3 className="font-bold mb-1 group-hover:text-blue-400">{t('resources_sens')}</h3>
                <p className="text-sm text-gray-400">{t('resources_sens_desc')}</p>
              </Link>
              <Link href="/guides" className="group bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors">
                <div className="text-3xl mb-3">📚</div>
                <h3 className="font-bold mb-1 group-hover:text-blue-400">{t('resources_guides')}</h3>
                <p className="text-sm text-gray-400">{t('resources_guides_desc')}</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 bg-gray-900/50">
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

        {/* SEO content */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl text-gray-300 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Why aim training works (when it does)
              </h2>
              <p>
                Aiming in CS2 is a stack of small skills: see the target, snap to it, click.
                Sounds simple, but in a real match you&apos;re also worrying about position,
                economy, what your team&apos;s doing, whether the angle is even safe. The
                mechanical part gets buried under everything else, and you can&apos;t separate
                it out to fix it.
              </p>
              <p className="mt-3">
                That&apos;s what a trainer does. It strips out the position, the strategy, the
                team chat, leaves just the click. Hand learns the click, then you put the click
                back into a real game and the rest is easier.
              </p>
              <p className="mt-3">
                It mostly helps when you&apos;re below MG / Gold Nova, where mechanical errors
                decide most rounds. Above Eagle, your aim is probably fine and your problem is
                somewhere else (positioning, utility, comms). 10-15 minutes a day is the sweet
                spot for most people. More than that and you&apos;re either a pro or wasting
                your time.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Which mode does what</h2>
              <p>Three modes here, each fixes a different problem:</p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>
                  <Link href="/play/gridshot" className="text-blue-400 hover:underline font-semibold">
                    Gridshot
                  </Link>{' '}
                  &ndash; clicking on stationary heads. Fix this if you keep losing first-bullet
                  duels on peeks.
                </li>
                <li>
                  <Link href="/play/tracking" className="text-blue-400 hover:underline font-semibold">
                    Tracking
                  </Link>{' '}
                  &ndash; keeping aim on moving targets. Fix this if your sprays go everywhere
                  except the head.
                </li>
                <li>
                  <Link href="/play/flicking" className="text-blue-400 hover:underline font-semibold">
                    Flicking
                  </Link>{' '}
                  &ndash; snapping to off-angle targets. Fix this if you keep undershooting
                  flicks or your AWP timing is off.
                </li>
              </ul>
              <p className="mt-3">
                Most people benefit from all three rotated for a minute each before queueing.
                Long sessions don&apos;t help. Past 30 minutes you&apos;re training fatigue
                habits, not aim.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Why this exists</h2>
              <p>
                Aim Lab and Kovaak&apos;s are good, just heavy. Aim Lab makes you create an
                account, pick a &quot;journey&quot;, and sit through tutorials before you click
                anything. Kovaak&apos;s is paid and lives on Steam. Both are overkill if you just
                want a 5-minute warm-up before ranked.
              </p>
              <p className="mt-3">
                This site is the opposite. Open it, set your sens, click targets, close the tab.
                Stats save in your browser. No account, no upload, nothing leaves your device.
                If you want to copy a pro&apos;s exact setup, the{' '}
                <Link href="/pro" className="text-blue-400 hover:underline">
                  pro database
                </Link>{' '}
                has 30+ players with full configs and one-click apply.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="container mx-auto text-center text-gray-500 text-sm">
          <p>CS2 Practice - Free FPS Aim Trainer</p>
          <p className="mt-2">{t('footer_tagline')}</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/about" className="hover:text-gray-300 transition-colors">
              {t('footer_about')}
            </Link>
            <Link href="/contact" className="hover:text-gray-300 transition-colors">
              {t('footer_contact')}
            </Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">
              {t('footer_terms')}
            </Link>
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">
              {t('footer_privacy')}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
