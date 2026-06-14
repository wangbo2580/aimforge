import { Metadata } from 'next';
import Link from 'next/link';
import WarmupClient from '@/components/play/WarmupClient';

export const metadata: Metadata = {
  title: '5-Minute CS2 Warm-Up Routine — AI Aim Coach',
  description:
    'Run a 5-minute browser-based CS2 warm-up: Gridshot for click timing, Tracking for control, and Flicking for snap aim. Includes AI diagnosis and streak tracking.',
  keywords: [
    'cs2 warmup routine',
    'cs2 aim warmup',
    '5 minute aim routine',
    'cs2 aim trainer online',
    'online aim warmup',
    'gridshot tracking flicking',
  ],
  alternates: { canonical: '/play/warmup' },
  openGraph: {
    title: '5-Minute CS2 Warm-Up Routine — AI Aim Coach',
    description:
      'Gridshot, Tracking, and Flicking in one no-download CS2-style warm-up flow with AI diagnosis.',
    url: '/play/warmup',
    type: 'website',
  },
};

export default function WarmupPage() {
  return (
    <>
      <WarmupClient />

      <article className="bg-gray-950 px-4 py-16 border-t border-gray-800">
        <div className="container mx-auto max-w-3xl text-gray-300 space-y-8">
          <header>
            <h2 className="text-3xl font-bold text-white mb-3">Why this CS2 warm-up is 5 minutes</h2>
            <p className="text-gray-400">
              The goal is to enter your first ranked round awake, not to set an aim-trainer high score.
            </p>
          </header>

          <section>
            <p>
              This routine combines three short drills: Gridshot for clean click timing, Tracking
              for smooth crosshair control, and Flicking for snap confidence. It is intentionally
              short because long aim-trainer sessions often train fatigue instead of match-ready aim.
            </p>
            <p className="mt-3">
              The final diagnosis is based on the weakest signal from the routine. If one step
              drops below the others, repeat that drill once before queueing. If all three feel
              stable, close the browser and play CS2.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">What to check before starting</h3>
            <p>
              Open settings inside the routine and set your CS2 sensitivity and mouse DPI. The
              trainer uses CS2-style cm/360 calibration and reports whether raw input, Pointer
              Lock, or browser fallback was used. Raw input gives the highest confidence in the
              browser; fallback mode is useful for access, but should not be treated as a CS2-feel
              benchmark.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-3">After the routine</h3>
            <p>
              Check the saved progress page after a few days. One run is a warm-up. Several runs
              show whether accuracy, reaction time, or a specific drill is becoming the recurring
              weak point.
            </p>
            <p className="mt-3">
              You can also copy a starting setup from the{' '}
              <Link href="/pro" className="text-blue-400 hover:underline">
                CS2 pro settings database
              </Link>{' '}
              before running the routine.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}
