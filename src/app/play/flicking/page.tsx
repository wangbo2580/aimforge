import { Metadata } from 'next';
import Link from 'next/link';
import FlickingClient from '@/components/play/FlickingClient';

export const metadata: Metadata = {
  title: 'Flicking Aim Trainer - Free Online | CS2 Practice',
  description:
    'Free Flicking aim trainer for CS2 and Valorant. Snap to targets at random angles to build AWP-style flick accuracy and speed. Calibrated to your in-game sensitivity.',
  keywords: [
    'flick trainer',
    'flicking aim',
    'cs2 awp practice',
    'valorant operator practice',
    'snap aim trainer',
    'free aim trainer',
  ],
  alternates: { canonical: '/play/flicking' },
  openGraph: {
    title: 'Flicking Aim Trainer - Free Online | CS2 Practice',
    description:
      'Snap to targets to build flick accuracy and speed. Calibrated to your CS2/Valorant sensitivity.',
    url: '/play/flicking',
    type: 'website',
  },
};

export default function FlickingPage() {
  return (
    <>
      <FlickingClient />

      {/* SEO content below the fold */}
      <article className="bg-gray-950 px-4 py-16 border-t border-gray-800">
        <div className="container mx-auto max-w-3xl text-gray-300 space-y-8">
          <header>
            <h2 className="text-3xl font-bold text-white mb-3">
              About Flicking Aim Training
            </h2>
            <p className="text-gray-400">
              Flicks are the high-skill aim mechanic behind the most highlight-reel kills in CS2
              and Valorant. Here&apos;s how to train them.
            </p>
          </header>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">What is a flick?</h3>
            <p>
              A flick is a fast, single mouse motion to a target away from your crosshair, usually
              committed in under 200 milliseconds. It&apos;s the mechanic behind AWP one-shots in
              CS2, Operator picks in Valorant, and any clutch revenge angle where you don&apos;t
              have time to slowly track over.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">
              Why flicks matter in CS2 and Valorant
            </h3>
            <p>
              Roughly half of pro AWP kills are flicks &mdash; pre-aiming a corner and snapping to a
              head when the model appears. Even rifle players need flicks for bait peeks and revenge
              angles. Building flick muscle memory in a controlled environment is much faster than
              in deathmatch, where you&apos;re also dealing with movement, recoil, and decision
              making at the same time.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">How to use this trainer</h3>
            <p>
              Targets spawn at random positions around the screen. You have a short window to flick
              to them and click. Calibrate your sensitivity in the side panel first &mdash; flicks
              rely heavily on muscle memory tied to a specific cm/360°, so changing sensitivity
              breaks the muscle memory you&apos;ve already built. Pick a sens you&apos;re committed
              to and stick with it for at least two weeks before judging.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">Tips for flicking</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                Use your shoulder and elbow for large flicks, not just the wrist. Wrist-only flicks
                cap out around 90&deg;.
              </li>
              <li>Practice flicks in both directions equally; most players have a strong side.</li>
              <li>
                After hitting the flick, hold your crosshair on target for a beat. This trains
                follow-through and prevents over-flicking.
              </li>
              <li>Slow down. A 90% accurate slow flick beats a 40% fast flick every time.</li>
              <li>
                AWP players: try the smaller target sizes. Operator players in Valorant: stay on
                medium &mdash; matches the head hitbox better.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">
              Pair this with the rest of the routine
            </h3>
            <p>
              Flicking is one part of a complete warm-up. Most players combine it with{' '}
              <Link href="/play/gridshot" className="text-blue-400 hover:underline">
                Gridshot
              </Link>{' '}
              for click-timing and{' '}
              <Link href="/play/tracking" className="text-blue-400 hover:underline">
                Tracking
              </Link>{' '}
              for spray transfers. To copy a pro&apos;s exact sensitivity setup, browse our{' '}
              <Link href="/pro" className="text-blue-400 hover:underline">
                pro player settings database
              </Link>
              .
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
