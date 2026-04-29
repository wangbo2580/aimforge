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
            <h2 className="text-3xl font-bold text-white mb-3">About Flicking</h2>
            <p className="text-gray-400">
              The most satisfying thing in FPS, also the easiest to do badly.
            </p>
          </header>

          <section>
            <p>
              A flick is a single fast mouse motion to a target that wasn&apos;t where you were
              aiming. It&apos;s how AWP one-taps happen. It&apos;s how you turn around and get
              the guy behind you. It&apos;s the most satisfying thing in FPS and also the easiest
              to do badly.
            </p>
            <p className="mt-3">
              The trick is committing. Half-flicks always undershoot. You decide where the target
              is, you move there, you shoot when you arrive. Three decisions, made fast. If any
              of them are mushy, the flick fails.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">Using this trainer</h3>
            <p>
              Targets spawn at random spots around the screen. You have a short window to get
              there and click. Calibrate your sensitivity in the side panel before you start,
              because flicks live and die by muscle memory tied to a specific cm/360°. Changing
              sens mid-session destroys the muscle memory you&apos;ve built.
            </p>
            <p className="mt-3">
              This is where committing to a sens for a few weeks actually matters. You can&apos;t
              flick well at a sensitivity you swap every other day.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">Things that help</h3>
            <p>
              Use your shoulder for big flicks, not just the wrist. Wrist-only caps out around
              90 degrees and forces you to constantly reposition the mouse on the pad. For
              anything bigger, your forearm does the work.
            </p>
            <p className="mt-3">
              Practice both directions. Most people have a strong side, usually right-to-left for
              right-handed players, and have to drill the weak side specifically.
            </p>
            <p className="mt-3">
              After you hit the flick, hold the crosshair on target for a beat. This is
              follow-through. Without it, you over-flick past targets even when your initial
              movement was right.
            </p>
            <p className="mt-3">
              If you&apos;re an AWPer, drop the target size to small. The smaller hitbox forces
              you to be precise. Operator players in Valorant: medium is fine, head hitbox is a
              bit wider in that game.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">After this</h3>
            <p>
              Combine with{' '}
              <Link href="/play/gridshot" className="text-blue-400 hover:underline">
                gridshot
              </Link>{' '}
              and{' '}
              <Link href="/play/tracking" className="text-blue-400 hover:underline">
                tracking
              </Link>{' '}
              for a full warm-up. Curious what sens AWPers actually use? The{' '}
              <Link href="/pro" className="text-blue-400 hover:underline">
                pro database
              </Link>{' '}
              has every Major-winning setup.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
