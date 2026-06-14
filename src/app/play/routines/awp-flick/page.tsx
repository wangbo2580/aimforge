import { Metadata } from 'next';
import WarmupClient from '@/components/play/WarmupClient';
import { AWP_FLICK_ROUTINE_ID } from '@/lib/training-routines';

export const metadata: Metadata = {
  title: 'CS2 AWP Flick Routine | CS2 Practice',
  description:
    'A guided CS2 AWP flick routine for far angle snaps, click discipline, and close reaction practice.',
  alternates: { canonical: '/play/routines/awp-flick' },
};

export default function AwpFlickRoutinePage() {
  return <WarmupClient routineId={AWP_FLICK_ROUTINE_ID} />;
}
