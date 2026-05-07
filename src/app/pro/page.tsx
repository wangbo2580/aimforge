import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import ProPlayersContent from '@/components/pages/ProPlayersContent';
import { proPlayers, featuredPlayers } from '@/data/pro-players';

export const metadata: Metadata = {
  title: 'CS2 Pro Settings — Sensitivity, DPI, Crosshair Codes (30+ Players)',
  description:
    'What CS2 pros actually play with: sens, DPI, cm/360°, crosshair share code, mouse, keyboard, monitor. s1mple, donk, ZywOo, NiKo, m0NESY and 25+ more, kept current.',
  keywords: [
    'cs2 pro settings',
    'pro settings cs2',
    'pro players settings',
    'cs2 pro player settings',
    'cs2 pro players settings',
    'pro player sensitivity',
    'cs2 pro sensitivity',
    'cs2 pros peripherals',
    's1mple settings',
    'zywoo settings',
    'donk settings',
    'm0nesy settings',
    'cs2 crosshair codes',
  ],
  alternates: { canonical: '/pro' },
  openGraph: {
    title: 'CS2 Pro Settings — Sens, DPI, Crosshair (30+ Players)',
    description: 'Live setups for s1mple, donk, ZywOo, NiKo, m0NESY and more — sens, DPI, crosshair share code and full gear.',
    type: 'website',
  },
};

export default function ProPlayersPage() {
  const featured = proPlayers.filter(p => featuredPlayers.includes(p.slug));
  const others = proPlayers.filter(p => !featuredPlayers.includes(p.slug));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <ProPlayersContent featured={featured} others={others} />
      </main>
    </div>
  );
}
