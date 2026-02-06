import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sensitivity Converter - CS2, Valorant, Apex, OW2 | CS2 Practice',
  description: 'Free sensitivity converter for FPS games. Convert your mouse sensitivity between CS2, Valorant, Apex Legends, Overwatch 2, Fortnite, R6 Siege, and more.',
  keywords: [
    'sensitivity converter',
    'cs2 to valorant sensitivity',
    'valorant to cs2 sens',
    'apex sensitivity converter',
    'overwatch sensitivity calculator',
    'mouse sensitivity converter',
    'fps sensitivity calculator',
    'cm/360 calculator',
  ],
  openGraph: {
    title: 'FPS Sensitivity Converter',
    description: 'Convert mouse sensitivity between CS2, Valorant, Apex, OW2, and more FPS games.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
