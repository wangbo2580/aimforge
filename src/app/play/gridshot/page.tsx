import { Metadata } from 'next';
import Link from 'next/link';
import GridshotClient from '@/components/play/GridshotClient';
import TrackedLink from '@/components/ui/TrackedLink';

export const metadata: Metadata = {
  title: 'CS2 Gridshot Online — Free Aim Trainer, No Download',
  description:
    'Play Gridshot online in a free CS2 aim trainer. No download—practice click timing and accuracy with raw input and cm/360 calibration.',
  keywords: [
    'gridshot online',
    'online gridshot',
    'gridshot trainer',
    'cs2 trainer online',
    'aim trainer cs2',
    'aim trainer valorant',
    'reaction time training',
    'click accuracy',
    'free aim trainer',
  ],
  alternates: { canonical: '/play/gridshot' },
  openGraph: {
    title: 'Gridshot Online — Free CS2 Aim Trainer',
    description:
      'Click static targets to build reaction time and click accuracy. Browser-based, no download, with CS2-style cm/360 calibration.',
    url: '/play/gridshot',
    type: 'website',
  },
};

export default function GridshotPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can I play Gridshot online without Aim Lab?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. This Gridshot-style drill runs directly in a desktop browser with no game or trainer download.',
        },
      },
      {
        '@type': 'Question',
        name: 'What should I focus on in Gridshot?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Prioritize clean, accurate clicks and controlled movement. Increase speed only after your accuracy is stable.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <GridshotClient />

      {/* SEO content below the fold */}
      <article className="bg-gray-950 px-4 py-16 border-t border-gray-800">
        <div className="container mx-auto max-w-3xl text-gray-300 space-y-8">
          <header>
            <h2 className="text-3xl font-bold text-white mb-3">CS2 Gridshot Online</h2>
            <p className="text-gray-400">
              The simplest aim drill, and probably the most useful one if you&apos;re stuck.
            </p>
          </header>

          <section>
            <p>
              Gridshot is the simplest aim drill there is. Static targets pop up at random spots
              on a grid, you click them. That&apos;s it. No moving targets, no recoil, no spray
              patterns. Just the clean version of what your hand has to do when someone&apos;s
              head appears in your crosshair on a peek.
            </p>
            <p className="mt-3">
              It&apos;s worth doing because most CS2 kills are exactly that: a head appears at a
              known angle, you click once or twice, fight&apos;s over. Spray transfers, flicks,
              tracking matter too, but they&apos;re refinements on top of the basic &quot;see
              head, click head&quot; reflex. If your gridshot is bad, the rest of your aim is
              built on sand.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">Using this trainer</h3>
            <p>
              Open the settings panel and put in your in-game CS2 (or Valorant) sensitivity and
              DPI. The trainer converts it to cm/360° and shows the active mouse input mode before
              you start. Misses cost you accuracy, hits give you score. 30-second sessions by
              default but you can change duration, target size, and target count in the side panel.
            </p>
            <p className="mt-3">
              If your sensitivity in-game is something weird, the converter in{' '}
              <Link href="/tools/sensitivity-converter" className="text-blue-400 hover:underline">
                tools
              </Link>{' '}
              will sort it out.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">What actually works</h3>
            <p>
              Warm up before ranked, don&apos;t grind. 5 minutes is plenty, an hour is
              counterproductive. Your accuracy drops as you get tired and you&apos;re just
              training bad habits. Accuracy first, speed second, always. A 200ms reaction with
              80% hit rate beats 100ms with 50% hit rate, every time.
            </p>
            <p className="mt-3">
              Keep your wrist loose. Tense aim wobbles. If you&apos;ve been gripping the mouse
              for an hour, take a break.
            </p>
            <p className="mt-3">
              If you change sensitivity, give it two weeks before you decide. The first week
              feels bad with any new sens. The second week is when you can tell if it actually
              fits.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">After this</h3>
            <p>
              Pair gridshot with{' '}
              <Link href="/play/tracking" className="text-blue-400 hover:underline">
                tracking
              </Link>{' '}
              (for spray transfers) and{' '}
              <Link href="/play/flicking" className="text-blue-400 hover:underline">
                flicking
              </Link>{' '}
              (for snap aim) and you&apos;ve got a complete warm-up. If you want a starting
              sensitivity, copy a{' '}
              <Link href="/pro" className="text-blue-400 hover:underline">
                pro player&apos;s setup
              </Link>
              . There&apos;s no point inventing one from scratch.
            </p>
            <TrackedLink
              href="/play/quick-warmup"
              eventName="content_to_training_click"
              eventParams={{ source_page: 'gridshot', destination: 'quick_warmup' }}
              className="mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-500"
            >
              Continue with the 90-second warm-up
            </TrackedLink>
          </section>
        </div>
      </article>
    </>
  );
}
