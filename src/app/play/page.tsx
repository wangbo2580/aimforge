import { Metadata } from 'next';
import PlayClient from '@/components/play/PlayClient';

export const metadata: Metadata = {
  title: 'Free CS2 Aim Trainer Online — Gridshot, Tracking & Flicking',
  description:
    'Browser-based CS2 aim trainer, free, no download. Gridshot for clicking, Tracking for smoothness, Flicking for snaps. Calibrated to your real in-game sensitivity.',
  keywords: [
    'cs2 aim trainer online',
    'cs2 aim training online',
    'cs2 aim practice online',
    'free cs2 aim trainer',
    'online aim trainer',
    'gridshot',
    'tracking',
    'flicking',
    'valorant aim trainer',
  ],
  alternates: { canonical: '/play' },
  openGraph: {
    title: 'Free CS2 Aim Trainer Online — Gridshot, Tracking & Flicking',
    description:
      'Browser-based, no download. Three modes — Gridshot, Tracking, Flicking — calibrated to your real CS2/Valorant sensitivity.',
    url: '/play',
    type: 'website',
  },
};

export default function PlayPage() {
  return <PlayClient />;
}
