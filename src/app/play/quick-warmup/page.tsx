import { Metadata } from 'next';
import Link from 'next/link';
import WarmupClient from '@/components/play/WarmupClient';
import { CS2_QUICK_WARMUP_ROUTINE_ID } from '@/lib/training-routines';

export const metadata: Metadata = {
  title: '90-Second CS2 Quick Warm-Up — Online Aim Trainer',
  description:
    'A short CS2 aim warm-up for first-time visitors or quick ranked prep: 30 seconds each of Gridshot, Tracking, and Flicking with AI diagnosis.',
  keywords: [
    'cs2 quick warmup',
    '90 second aim trainer',
    'cs2 aim warmup online',
    'quick aim warmup',
    'free cs2 aim trainer',
  ],
  alternates: { canonical: '/play/quick-warmup' },
  openGraph: {
    title: '90-Second CS2 Quick Warm-Up',
    description:
      'A fast no-download CS2-style warm-up with Gridshot, Tracking, Flicking, and AI diagnosis.',
    url: '/play/quick-warmup',
    type: 'website',
  },
};

export default function QuickWarmupPage() {
  return (
    <>
      <WarmupClient routineId={CS2_QUICK_WARMUP_ROUTINE_ID} />

      <article className="bg-gray-950 px-4 py-16 border-t border-gray-800">
        <div className="container mx-auto max-w-3xl text-gray-300 space-y-8">
          <header>
            <h2 className="text-3xl font-bold text-white mb-3">Why a 90-second warm-up exists</h2>
            <p className="text-gray-400">
              Some players will not commit to five minutes on the first visit. This version gives
              them the same structure with a much lower completion barrier.
            </p>
          </header>

          <section>
            <p>
              The quick warm-up runs three 30-second checks: click rhythm, tracking control, and
              flick confidence. It is not meant to replace a full practice session. It exists to
              answer one question fast: what feels cold right now?
            </p>
            <p className="mt-3">
              If the quick routine finds a weak point, run the full{' '}
              <Link href="/play/warmup" className="text-blue-400 hover:underline">
                5-minute CS2 warm-up
              </Link>{' '}
              or repeat the weakest drill once before queueing.
            </p>
          </section>
        </div>
      </article>
    </>
  );
}

