import { Metadata } from 'next';
import Link from 'next/link';
import TrackingClient from '@/components/play/TrackingClient';

export const metadata: Metadata = {
  title: 'Tracking Aim Trainer - Free Online | CS2 Practice',
  description:
    'Free Tracking aim trainer for CS2 and Valorant. Track moving targets across strafe, linear, curve, and random patterns. Calibrated to your in-game sensitivity.',
  keywords: [
    'tracking trainer',
    'tracking aim',
    'cs2 spray transfer',
    'valorant tracking',
    'mouse smoothness',
    'free aim trainer',
  ],
  alternates: { canonical: '/play/tracking' },
  openGraph: {
    title: 'Tracking Aim Trainer - Free Online | CS2 Practice',
    description:
      'Track moving targets to build mouse control and smoothness. Calibrated to your CS2/Valorant sensitivity.',
    url: '/play/tracking',
    type: 'website',
  },
};

export default function TrackingPage() {
  return (
    <>
      <TrackingClient />

      {/* SEO content below the fold */}
      <article className="bg-gray-950 px-4 py-16 border-t border-gray-800">
        <div className="container mx-auto max-w-3xl text-gray-300 space-y-8">
          <header>
            <h2 className="text-3xl font-bold text-white mb-3">
              About Tracking Aim Training
            </h2>
            <p className="text-gray-400">
              Tracking is the difference between winning a duel and getting one-tapped on the
              re-peek. Here&apos;s how to train it.
            </p>
          </header>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">What is tracking?</h3>
            <p>
              Tracking is the skill of keeping your crosshair on a moving target with consistent
              micro-corrections. In Valorant it shows up against Jett dashes and Raze satchels; in
              CS2 it&apos;s mostly used for spray transfers and maintaining aim on jiggle-peekers.
              Unlike clicking drills, tracking is a continuous loop: predict, adjust, predict,
              adjust.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">
              How tracking practice transfers in-game
            </h3>
            <p>
              Targets in this trainer move with strafe, linear, curve, and random patterns. The
              strafe pattern mimics player A/D peeking &mdash; the most common scenario you&apos;ll
              face in CS2 and Valorant. Spending 5 minutes a day on tracking improves your spray
              accuracy at mid-range significantly more than spending 20 minutes spraying a wall in
              CS2&apos;s offline mode, because you&apos;re training the actual movement pattern your
              hand needs to make against a real opponent.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">How to use this trainer</h3>
            <p>
              Set your in-game sensitivity in the side panel &mdash; the trainer will match your
              cm/360° so your muscle memory transfers directly. Click the canvas to start tracking;
              the target moves continuously and you score by keeping your crosshair on it. Try the
              strafe pattern first, then move to curve and random patterns once you&apos;re
              comfortable. Each session runs 30 seconds by default, which is enough to push
              fatigue without burning your accuracy.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">Tips for tracking</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                A lower sensitivity (cm/360 of 30+) usually helps tracking; if you can&apos;t keep
                up, try lowering DPI rather than in-game sens.
              </li>
              <li>
                Don&apos;t fight your own movement. Anticipate the target&apos;s next position
                instead of reacting to where it is now.
              </li>
              <li>Headphones help. Sound feedback reinforces hits during the flow.</li>
              <li>
                If you&apos;re overshooting, your sensitivity is probably too high for your tracking
                style. Drop it 10% and re-test.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">
              Build a complete aim warm-up
            </h3>
            <p>
              Tracking pairs naturally with{' '}
              <Link href="/play/gridshot" className="text-blue-400 hover:underline">
                Gridshot
              </Link>{' '}
              (clicks) and{' '}
              <Link href="/play/flicking" className="text-blue-400 hover:underline">
                Flicking
              </Link>{' '}
              (snap aim). Most pros run 60 seconds of each before queueing. For more depth on
              warm-up routines and aim fundamentals, see our{' '}
              <Link href="/guides" className="text-blue-400 hover:underline">
                aim training guides
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
