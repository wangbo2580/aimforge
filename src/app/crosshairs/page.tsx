import { Metadata } from 'next';
import CrosshairsClient from './CrosshairsClient';

export const metadata: Metadata = {
  title: 'CS2 Crosshair Codes - Pro Player Crosshairs | CS2 Practice',
  description: 'Copy CS2 crosshair codes from 30+ pro players including s1mple, ZywOo, donk, NiKo, m0NESY. One-click copy and paste into CS2. Free crosshair library with dot, classic, minimal styles.',
  keywords: ['cs2 crosshair codes', 'csgo crosshair codes', 'cs2 crosshair', 'crosshair codes copy paste', 'pro crosshair cs2', 'cs2 dot crosshair', 'best cs2 crosshair'],
  alternates: {
    canonical: '/crosshairs',
  },
  openGraph: {
    title: 'CS2 Crosshair Codes - 50+ Pro & Community Crosshairs',
    description: 'Copy pro player crosshair codes for CS2. s1mple, ZywOo, donk, NiKo and more. One-click copy, paste directly in CS2.',
    type: 'website',
  },
};

export default function CrosshairsPage() {
  return <CrosshairsClient />;
}
