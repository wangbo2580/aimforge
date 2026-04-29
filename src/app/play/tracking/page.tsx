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
            <h2 className="text-3xl font-bold text-white mb-3">About Tracking</h2>
            <p className="text-gray-400">
              The boring twin of flicking. Nobody puts tracking clips in highlight reels. Wins
              you actual rounds though.
            </p>
          </header>

          <section>
            <p>
              Tracking is the boring twin of flicking. Nobody puts tracking clips in highlight
              reels. But it&apos;s what wins you actual rounds: holding aim on someone who&apos;s
              strafing while you spray, transferring to the second guy after the first one drops,
              keeping the crosshair on a Jett who just dashed.
            </p>
            <p className="mt-3">
              The mechanic is different from gridshot. Gridshot is one decisive click. Tracking
              is a continuous loop: predict where the target&apos;s heading, adjust, predict
              again, adjust again. You&apos;re never &quot;done&quot;, you&apos;re always
              correcting.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">Using this trainer</h3>
            <p>
              Set your in-game sensitivity in the side panel. Click the canvas to start. The
              target moves and you score by keeping your crosshair on it. Four movement patterns:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>
                <strong>Strafe</strong> &ndash; left/right peeking, the most common scenario in
                CS2 and Valorant
              </li>
              <li>
                <strong>Linear</strong> &ndash; predictable, useful for warm-up
              </li>
              <li>
                <strong>Curve</strong> &ndash; smooth direction changes, harder
              </li>
              <li>
                <strong>Random</strong> &ndash; unpredictable, closest to actual jiggle-peekers
              </li>
            </ul>
            <p className="mt-3">
              Start with strafe, get used to the feel, then move to curve and random when you
              stop missing.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">
              Sensitivity matters more here than for clicks
            </h3>
            <p>
              If your sensitivity is too high, you can&apos;t track. You&apos;ll constantly
              overshoot. Most people with bad tracking think they need more practice. They
              don&apos;t. They need a lower sens. Try dropping DPI by a third before you blame
              your hand.
            </p>
            <p className="mt-3">
              Anticipation beats reaction. If you wait until the target moves to react,
              you&apos;re already behind. Watch the target&apos;s pattern, predict where
              it&apos;s going, move there a beat early.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">Pairs well with</h3>
            <p>
              <Link href="/play/gridshot" className="text-blue-400 hover:underline">
                Gridshot
              </Link>{' '}
              for the click side,{' '}
              <Link href="/play/flicking" className="text-blue-400 hover:underline">
                flicking
              </Link>{' '}
              for snap aim. None of these alone is enough. Most pros do all three for 60-90
              seconds before queueing.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
