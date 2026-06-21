import { Metadata } from 'next';
import Link from 'next/link';
import FlickingClient from '@/components/play/FlickingClient';
import TrackedLink from '@/components/ui/TrackedLink';

export const metadata: Metadata = {
  title: 'CS2 Flick Trainer Online — Free AWP Aim Practice',
  description:
    'Practice CS2 flick aim and AWP snap shots in a free browser trainer. No download, with random-angle targets, raw input, and cm/360 calibration.',
  keywords: [
    'flick trainer',
    'flicking trainer online',
    'flicking aim',
    'cs2 awp practice',
    'cs2 flick practice',
    'valorant operator practice',
    'snap aim trainer',
    'free aim trainer',
  ],
  alternates: { canonical: '/play/flicking' },
  openGraph: {
    title: 'Flicking Trainer Online — Free CS2 Flick Practice',
    description:
      'Snap to random-angle targets to build AWP-style flick accuracy. Browser-based, no download, with CS2-style cm/360 calibration.',
    url: '/play/flicking',
    type: 'website',
  },
};

export default function FlickingPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long should I practice flicking for CS2?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use short focused blocks of about 3 to 5 minutes, prioritizing accurate stops on the target before increasing speed.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does this CS2 flick trainer require a download?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The trainer runs in a desktop browser and supports sensitivity and cm/360 calibration.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FlickingClient />

      {/* SEO content below the fold */}
      <article className="bg-gray-950 px-4 py-16 border-t border-gray-800">
        <div className="container mx-auto max-w-3xl text-gray-300 space-y-8">
          <header>
            <h2 className="text-3xl font-bold text-white mb-3">CS2 Flick Training Online</h2>
            <p className="text-gray-400">
              Practice fast target acquisition for AWP shots, off-angle clears, and sudden target switches.
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
            <TrackedLink
              href="/play/quick-warmup"
              eventName="content_to_training_click"
              eventParams={{ source_page: 'flicking', destination: 'quick_warmup' }}
              className="mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-500"
            >
              Add flicking to a 90-second warm-up
            </TrackedLink>
          </section>
        </div>
      </article>
    </>
  );
}
