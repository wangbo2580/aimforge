import { Metadata } from 'next';
import Link from 'next/link';
import PlayClient from '@/components/play/PlayClient';

export const metadata: Metadata = {
  title: 'Free CS2 Aim Trainer Online — AI Warm-Up, Gridshot & Tracking',
  description:
    'Browser-based CS2 aim trainer, free, no download. Run a 5-minute or 90-second AI warm-up, or train Gridshot, Tracking, and Flicking with CS2-style cm/360 calibration.',
  keywords: [
    'cs2 aim trainer online',
    'cs2 aim training online',
    'cs2 aim practice online',
    'free cs2 aim trainer',
    'online aim trainer',
    'gridshot',
    'tracking',
    'flicking',
    'valorant aim trainer',
  ],
  alternates: { canonical: '/play' },
  openGraph: {
    title: 'Free CS2 Aim Trainer Online — AI Warm-Up, Gridshot & Tracking',
    description:
      'Browser-based, no download. Guided CS2 warm-ups with AI diagnosis plus Gridshot, Tracking, and Flicking modes.',
    url: '/play',
    type: 'website',
  },
};

export default function PlayPage() {
  return (
    <>
      <PlayClient />

      {/* SEO content below the fold */}
      <article className="bg-gray-950 px-4 py-16 border-t border-gray-800">
        <div className="container mx-auto max-w-3xl text-gray-300 space-y-8">
          <header>
            <h2 className="text-3xl font-bold text-white mb-3">
              Why aim training matters (and when it doesn&apos;t)
            </h2>
            <p className="text-gray-400">
              A 5-minute warm-up before ranked is the single highest-ROI habit in CS2. Aim trainers
              get a bad reputation because people grind them like they&apos;re the game, which
              they&apos;re not.
            </p>
          </header>

          <section>
            <p>
              The honest take: aim training works for warming up cold hands, and for fixing specific
              broken habits you&apos;ve identified in your own play. It does not work as a
              substitute for actually playing CS2. The pro players who stream aim trainer sessions
              do them for 5-15 minutes before queueing, not for two hours of solo grinding.
            </p>
            <p className="mt-3">
              If you&apos;re Eagle or below, your aim is probably fine and your real problem is
              positioning, utility usage, or game sense — things no aim trainer fixes. Above MGE,
              you&apos;ll start seeing rounds you lose specifically because your raw mechanics
              dropped a duel you should have won. That&apos;s where aim training stops being optional.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">Which mode does what</h3>
            <p>
              If you only want to warm up before ranked, start with the{' '}
              <Link href="/play/warmup" className="text-blue-400 hover:underline font-medium">
                5-minute CS2 warm-up
              </Link>
              . It combines all three drills and ends with a weak-point diagnosis. The individual
              modes are still useful when you already know what needs extra work.
            </p>
            <ul className="list-disc pl-6 space-y-3 mt-3">
              <li>
                <Link href="/play/gridshot" className="text-blue-400 hover:underline font-medium">
                  Gridshot
                </Link>{' '}
                — static targets, click them. Trains the &ldquo;head appears, click head&rdquo;
                reflex that drives most CS2 kills. Where to start if you&apos;re not sure what to fix.
              </li>
              <li>
                <Link href="/play/tracking" className="text-blue-400 hover:underline font-medium">
                  Tracking
                </Link>{' '}
                — moving targets, hold your crosshair on them. Trains the smooth muscle control
                you need to spray-transfer between two enemies or to follow a runner past a smoke.
              </li>
              <li>
                <Link href="/play/flicking" className="text-blue-400 hover:underline font-medium">
                  Flicking
                </Link>{' '}
                — sudden target spawns, snap to them. Trains the quick wrist or arm flick you need
                for AWP shots and instant pre-aim adjustments when an enemy isn&apos;t exactly where
                you expected.
              </li>
            </ul>
            <p className="mt-4">
              If you don&apos;t know which to fix, watch your own demos for two rounds. The kind of
              fights you keep losing tells you which mechanic is the weak one.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">CS2-style sensitivity calibration</h3>
            <p>
              The trainer starts from your CS2 (or Valorant) cm/360°, then shows whether raw mouse
              input, standard Pointer Lock, or browser fallback is active. Open the settings panel
              inside any mode, type in your sensitivity and DPI, then use browser calibration if the
              feel needs a small adjustment.
            </p>
            <p className="mt-3">
              Sensitivity on a weird number? The{' '}
              <Link href="/tools/sensitivity-converter" className="text-blue-400 hover:underline">
                sensitivity converter
              </Link>{' '}
              handles CS2 ↔ Valorant, Apex, Overwatch 2, and back. Don&apos;t guess at the
              conversion — they&apos;re not the simple multiplier most people think they are.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">A 5-minute warm-up that actually works</h3>
            <p>
              Two minutes of Gridshot, two minutes of Tracking, one minute of Flicking. That&apos;s
              the routine. Don&apos;t aim for high scores, aim for warm hands. The accuracy you have
              after five minutes is the accuracy you&apos;ll bring into your first ranked round —
              your tenth round score on the trainer is irrelevant.
            </p>
            <p className="mt-3">
              If your scores get worse the longer you train in one session, stop. You&apos;re tired
              and you&apos;re training bad habits. Take a break, come back later. The whole point of
              warming up is to be sharp for the actual game.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">Want to start with a pro&apos;s setup?</h3>
            <p>
              There&apos;s no reason to invent a sensitivity from scratch when 30 pro players have
              already done the work for you. Copy a sensitivity and{' '}
              <Link href="/crosshairs" className="text-blue-400 hover:underline">
                crosshair code
              </Link>{' '}
              from someone who plays your role —{' '}
              <Link href="/pro/s1mple" className="text-blue-400 hover:underline">
                s1mple
              </Link>{' '}
              if you flex roles, an AWPer like{' '}
              <Link href="/pro/zywoo" className="text-blue-400 hover:underline">
                ZywOo
              </Link>{' '}
              or{' '}
              <Link href="/pro/m0nesy" className="text-blue-400 hover:underline">
                m0NESY
              </Link>{' '}
              if you snipe, a mechanical rifler like{' '}
              <Link href="/pro/niko" className="text-blue-400 hover:underline">
                NiKo
              </Link>{' '}
              if you prefer slower precision. Then tune from there based on what feels off.
            </p>
            <p className="mt-3">
              See the full{' '}
              <Link href="/pro" className="text-blue-400 hover:underline">
                pro player database
              </Link>{' '}
              for 30 setups including mouse, monitor, and exact crosshair codes — or{' '}
              <Link href="/tools/crosshair-generator" className="text-blue-400 hover:underline">
                build your own crosshair
              </Link>{' '}
              and tweak a pro&apos;s code from there.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
