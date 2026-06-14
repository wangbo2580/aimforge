'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import { trackEvent } from '@/lib/analytics';
import { getDailyChallenge, readWarmupProgress, WarmupProgress } from '@/lib/training-routines';
import { useTranslation } from '@/lib/i18n';

export default function PlayClient() {
  const { t } = useTranslation();
  const [warmupProgress, setWarmupProgress] = useState<WarmupProgress>({
    completions: 0,
    streak: 0,
    lastCompletedDate: null,
  });
  const dailyChallenge = getDailyChallenge();

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setWarmupProgress(readWarmupProgress());
    }, 0);

    return () => window.clearTimeout(timerId);
  }, []);

  const trainingModes = [
    {
      id: 'gridshot',
      nameKey: 'mode_gridshot' as const,
      descKey: 'mode_gridshot_desc' as const,
      color: 'from-red-500 to-orange-500',
      icon: 'G',
      statsKeys: ['result_avg_reaction', 'result_accuracy', 'result_score'] as const,
    },
    {
      id: 'tracking',
      nameKey: 'mode_tracking' as const,
      descKey: 'mode_tracking_desc' as const,
      color: 'from-blue-500 to-cyan-500',
      icon: 'T',
      statsKeys: ['result_accuracy', 'game_time', 'result_score'] as const,
    },
    {
      id: 'flicking',
      nameKey: 'mode_flicking' as const,
      descKey: 'mode_flicking_desc' as const,
      color: 'from-purple-500 to-pink-500',
      icon: 'F',
      statsKeys: ['result_avg_reaction', 'result_accuracy', 'result_score'] as const,
    },
  ];

  const tips = [
    'Use the 5-minute warm-up before ranked instead of grinding one drill for too long.',
    'If raw input is unavailable, treat results as browser practice rather than a CS2 benchmark.',
    'Repeat the weakest drill once if the warm-up diagnosis calls it out.',
    'Keep the same sensitivity for several days before judging whether it fits.',
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto">
          <section className="mx-auto mb-10 max-w-5xl">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <Link
                href="/play/warmup"
                onClick={() =>
                  trackEvent('warmup_cta_click', {
                    source: 'play_hub_primary',
                    streak: warmupProgress.streak,
                    completions: warmupProgress.completions,
                  })
                }
                className="group rounded-lg border border-blue-500/30 bg-blue-500/10 p-6 transition-colors hover:border-blue-400 hover:bg-blue-500/15"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">
                  Recommended
                </p>
                <h1 className="mt-2 text-4xl font-black text-white">5-minute CS2 warm-up</h1>
                <p className="mt-3 max-w-2xl text-gray-300">
                  Gridshot, Tracking, and Flicking in one guided flow. Finish with a diagnosis,
                  input confidence, and a local streak so users have a reason to come back tomorrow.
                </p>
                <div className="mt-5 flex flex-wrap gap-3 text-sm">
                  <span className="rounded bg-gray-950/70 px-3 py-1 text-gray-200">2m Gridshot</span>
                  <span className="rounded bg-gray-950/70 px-3 py-1 text-gray-200">2m Tracking</span>
                  <span className="rounded bg-gray-950/70 px-3 py-1 text-gray-200">1m Flicking</span>
                </div>
                <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-blue-500">
                  Start warm-up
                  <span aria-hidden>→</span>
                </div>
              </Link>

              <div className="rounded-lg bg-gray-800 p-6">
                <p className="text-sm font-semibold text-white">Your warm-up habit</p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-gray-900 p-4">
                    <div className="text-xs text-gray-400">Streak</div>
                    <div className="mt-2 text-3xl font-bold text-white">{warmupProgress.streak}</div>
                  </div>
                  <div className="rounded-lg bg-gray-900 p-4">
                    <div className="text-xs text-gray-400">Completed</div>
                    <div className="mt-2 text-3xl font-bold text-white">
                      {warmupProgress.completions}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-400">
                  No account needed. This is stored locally in the browser and is meant to test
                  whether users return for a repeatable warm-up.
                </p>
                <div className="mt-5 rounded-lg border border-green-500/30 bg-green-500/10 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-green-300">
                    Daily challenge
                  </p>
                  <h2 className="mt-1 text-sm font-bold text-white">{dailyChallenge.title}</h2>
                  <p className="mt-1 text-xs text-gray-400">{dailyChallenge.target}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Link
                href="/play/quick-warmup"
                onClick={() =>
                  trackEvent('warmup_cta_click', {
                    source: 'play_hub_quick',
                    routine_id: 'cs2-90-second-quick-warmup',
                  })
                }
                className="rounded-lg border border-gray-700 bg-gray-800 px-5 py-4 text-sm font-semibold text-white transition-colors hover:border-blue-500 hover:bg-gray-700"
              >
                Try 90-second quick warm-up
              </Link>
              <Link
                href="/stats"
                className="rounded-lg border border-gray-700 bg-gray-800 px-5 py-4 text-sm font-semibold text-white transition-colors hover:border-blue-500 hover:bg-gray-700"
              >
                View progress & diagnosis
              </Link>
            </div>
          </section>

          <h2 className="text-2xl font-bold text-center mb-3">{t('play_title')}</h2>
          <p className="text-gray-400 text-center mb-8 max-w-xl mx-auto">
            {t('play_subtitle')}
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {trainingModes.map((mode) => (
              <Link
                key={mode.id}
                href={`/play/${mode.id}`}
                onClick={() =>
                  trackEvent('mode_select', {
                    mode: mode.id,
                    source: 'play_hub',
                  })
                }
                className="group overflow-hidden rounded-lg bg-gray-800 transition-all hover:ring-2 hover:ring-blue-500"
              >
                <div
                  className={`h-24 bg-gradient-to-br ${mode.color} flex items-center justify-center`}
                >
                  <span className="text-4xl font-black text-white">{mode.icon}</span>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 transition-colors group-hover:text-blue-400">
                    {t(mode.nameKey)}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{t(mode.descKey)}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {mode.statsKeys.map((statKey) => (
                      <span
                        key={statKey}
                        className="rounded bg-gray-700 px-2 py-1 text-xs text-gray-300"
                      >
                        {t(statKey)}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 font-medium group-hover:underline">
                      {t('play_start')}
                    </span>
                    <span className="text-blue-400 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-14 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold text-center mb-5">{t('play_tips')}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {tips.map((tip) => (
                <div key={tip} className="rounded-lg bg-gray-800/50 p-4 text-sm text-gray-300">
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
