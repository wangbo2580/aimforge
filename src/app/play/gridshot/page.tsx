import { Metadata } from 'next';
import Link from 'next/link';
import GridshotClient from '@/components/play/GridshotClient';

export const metadata: Metadata = {
  title: 'Gridshot Aim Trainer - Free Online | CS2 Practice',
  description:
    'Free Gridshot aim trainer for CS2 and Valorant. Click static targets at random positions to build reaction time and click accuracy. Calibrated to your in-game sensitivity.',
  keywords: [
    'gridshot',
    'gridshot trainer',
    'aim trainer cs2',
    'aim trainer valorant',
    'reaction time training',
    'click accuracy',
    'free aim trainer',
  ],
  alternates: { canonical: '/play/gridshot' },
  openGraph: {
    title: 'Gridshot Aim Trainer - Free Online | CS2 Practice',
    description:
      'Click static targets to build reaction time and click accuracy. Calibrated to your CS2/Valorant sensitivity.',
    url: '/play/gridshot',
    type: 'website',
  },
};

export default function GridshotPage() {
  return (
    <>
      <GridshotClient />

      {/* SEO content below the fold */}
      <article className="bg-gray-950 px-4 py-16 border-t border-gray-800">
        <div className="container mx-auto max-w-3xl text-gray-300 space-y-8">
          <header>
            <h2 className="text-3xl font-bold text-white mb-3">
              About Gridshot Aim Training
            </h2>
            <p className="text-gray-400">
              Everything you need to know about the most fundamental aim training drill — and how
              to use this trainer effectively.
            </p>
          </header>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">What is Gridshot?</h3>
            <p>
              Gridshot is the most fundamental aim training drill. Static targets appear in random
              positions on a grid; your job is to click them as fast as possible while staying
              accurate. It builds the muscle memory you use for one-tap kills, peeking pre-aimed
              angles, and quick decision-making in CS2, Valorant, and other tactical FPS games.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">
              How Gridshot improves your CS2 aim
            </h3>
            <p>
              Most kills in CS2 come from one or two quick clicks at someone&apos;s head from a
              known angle. Gridshot directly trains that movement: identify the target, snap to it,
              click. After a few weeks of regular practice, players typically notice their initial
              peek reaction time drops by 20&ndash;40 ms, and spray transfers feel more decisive.
              The drill isolates raw target acquisition from movement and recoil, so improvements
              transfer cleanly into ranked matches.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">How to use this trainer</h3>
            <p>
              Open the settings panel and enter your in-game CS2 (or Valorant) sensitivity and
              mouse DPI. The training canvas is calibrated to match your real in-game cm/360°, so
              the muscle memory you build here transfers directly. Click the canvas to start.
              Targets disappear when hit; misses cost accuracy. Default sessions run 30 seconds, but
              you can adjust target size, count, and duration in the side panel.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">
              Tips for getting the most out of Gridshot
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Warm up for 2&ndash;3 minutes before ranked matches; don&apos;t grind hour-long sessions.</li>
              <li>
                Focus on accuracy first, speed second &mdash; clicking 80% accurate at 200 ms is
                more useful than 50% at 100 ms.
              </li>
              <li>Keep your wrist relaxed. Tense aim is unstable aim.</li>
              <li>
                If you change sensitivity, expect 1&ndash;2 weeks of dropped performance before
                muscle memory adapts. Don&apos;t flip-flop.
              </li>
              <li>
                Pair Gridshot with our{' '}
                <Link href="/play/tracking" className="text-blue-400 hover:underline">
                  Tracking
                </Link>{' '}
                and{' '}
                <Link href="/play/flicking" className="text-blue-400 hover:underline">
                  Flicking
                </Link>{' '}
                drills for a complete warm-up routine.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">
              Want to train like the pros?
            </h3>
            <p>
              Browse our{' '}
              <Link href="/pro" className="text-blue-400 hover:underline">
                pro player settings database
              </Link>{' '}
              for the exact sensitivity, DPI, and crosshair codes used by s1mple, ZywOo, NiKo,
              donk, and 30+ other CS2 pros &mdash; then apply their settings here and train with
              the same muscle memory they use in tournaments.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
