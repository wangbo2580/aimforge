import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CS2 Crosshair Codes - Pro Player Crosshairs | CS2 Practice',
  description: 'Best CS2 crosshair codes from pro players like s1mple, ZywOo, NiKo, donk. One-click copy, ready to import. Popular and minimal crosshairs included.',
  keywords: [
    'cs2 crosshair codes',
    'cs2 crosshair',
    's1mple crosshair',
    'zywoo crosshair',
    'niko crosshair',
    'pro crosshair cs2',
    'best cs2 crosshair',
    'crosshair code cs2',
  ],
  openGraph: {
    title: 'CS2 Crosshair Codes - Pro Player Crosshairs',
    description: 'Copy pro player crosshairs: s1mple, ZywOo, NiKo, donk, and more.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
