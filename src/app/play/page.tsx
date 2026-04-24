import { Metadata } from 'next';
import PlayClient from '@/components/play/PlayClient';

export const metadata: Metadata = {
  title: 'Aim Training Modes — Gridshot, Tracking, Flicking | CS2 Practice',
  description:
    'Pick a free aim training mode: Gridshot for click accuracy, Tracking for mouse smoothness, Flicking for snap aim. Calibrated to your CS2 or Valorant sensitivity.',
  keywords: [
    'aim training modes',
    'gridshot',
    'tracking',
    'flicking',
    'cs2 aim trainer',
    'valorant aim trainer',
  ],
  alternates: { canonical: '/play' },
  openGraph: {
    title: 'Aim Training Modes — Gridshot, Tracking, Flicking | CS2 Practice',
    description:
      'Pick a training mode: Gridshot, Tracking, or Flicking. Free, browser-based, calibrated to your CS2/Valorant sensitivity.',
    url: '/play',
    type: 'website',
  },
};

export default function PlayPage() {
  return <PlayClient />;
}
