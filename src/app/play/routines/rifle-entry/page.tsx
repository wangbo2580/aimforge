import { Metadata } from 'next';
import WarmupClient from '@/components/play/WarmupClient';
import { RIFLE_ENTRY_ROUTINE_ID } from '@/lib/training-routines';

export const metadata: Metadata = {
  title: 'CS2 Rifle Entry Routine | CS2 Practice',
  description:
    'A guided CS2 rifle entry routine for first-bullet timing, strafe correction, and target reset practice.',
  alternates: { canonical: '/play/routines/rifle-entry' },
};

export default function RifleEntryRoutinePage() {
  return <WarmupClient routineId={RIFLE_ENTRY_ROUTINE_ID} />;
}
