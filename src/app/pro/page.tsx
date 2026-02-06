import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import ProPlayersContent from '@/components/pages/ProPlayersContent';
import { proPlayers, featuredPlayers } from '@/data/pro-players';

export const metadata: Metadata = {
  title: 'CS2 Pro Player Settings - Sensitivity, Crosshair, Gear | CS2 Practice',
  description: 'Complete list of CS2 professional player settings including sensitivity, DPI, crosshair codes, and gaming gear. Copy pro settings and practice with the same setup.',
  keywords: ['cs2 pro settings', 'pro player sensitivity', 'cs2 crosshair codes', 'pro gaming gear', 's1mple settings', 'zywoo settings'],
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
