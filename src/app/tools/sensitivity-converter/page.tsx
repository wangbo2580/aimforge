import { Metadata } from 'next';
import SensitivityConverterClient from './SensitivityConverterClient';

export const metadata: Metadata = {
  title: 'Sensitivity Converter - CS2, Valorant, Apex, OW2 | CS2 Practice',
  description: 'Free mouse sensitivity converter for CS2, Valorant, Apex Legends, Overwatch 2, Fortnite, R6 Siege and more. Convert your sensitivity between FPS games using cm/360. Keep your muscle memory across games.',
  keywords: ['sensitivity converter', 'cs2 sensitivity converter', 'valorant sensitivity converter', 'mouse sensitivity calculator', 'cm/360 calculator', 'fps sensitivity converter', 'cs2 to valorant sensitivity'],
  alternates: {
    canonical: '/tools/sensitivity-converter',
  },
  openGraph: {
    title: 'FPS Sensitivity Converter - CS2, Valorant, Apex & More',
    description: 'Convert mouse sensitivity between CS2, Valorant, Apex, OW2 and more. Free cm/360 calculator.',
    type: 'website',
  },
};

export default function SensitivityConverterPage() {
  return <SensitivityConverterClient />;
}
