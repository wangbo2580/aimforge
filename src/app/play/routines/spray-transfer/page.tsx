import { Metadata } from 'next';
import WarmupClient from '@/components/play/WarmupClient';
import { SPRAY_TRANSFER_ROUTINE_ID } from '@/lib/training-routines';

export const metadata: Metadata = {
  title: 'CS2 Spray Transfer Routine | CS2 Practice',
  description:
    'A guided CS2 spray transfer routine for strafe tracking, target switching, and unstable correction practice.',
  alternates: { canonical: '/play/routines/spray-transfer' },
};

export default function SprayTransferRoutinePage() {
  return <WarmupClient routineId={SPRAY_TRANSFER_ROUTINE_ID} />;
}
