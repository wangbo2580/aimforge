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
            <h2 className="text-3xl font-bold text-white mb-3">About Gridshot</h2>
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
              DPI. The trainer matches your real cm/360°, so anything you build here transfers
              directly. Click the canvas to start. Misses cost you accuracy, hits give you score.
              30-second sessions by default but you can change duration, target size, and target
              count in the side panel.
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
          </section>
        </div>
      </article>
    </>
  );
}
