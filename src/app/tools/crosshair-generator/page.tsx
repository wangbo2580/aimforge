import { Metadata } from 'next';
import CrosshairGeneratorClient from './CrosshairGeneratorClient';

export const metadata: Metadata = {
  title: 'CS2 Crosshair Generator - Live Preview & Share Code | CS2 Practice',
  description:
    'Free CS2 crosshair generator with live preview. Customize style, size, thickness, gap, color, dot and outline, then copy a share code that imports straight into Counter-Strike 2. Load pro player crosshairs and edit them.',
  keywords: [
    'cs2 crosshair generator',
    'crosshair generator',
    'cs2 crosshair maker',
    'counter-strike 2 crosshair generator',
    'crosshair code generator',
    'cs2 crosshair editor',
    'create cs2 crosshair',
  ],
  alternates: {
    canonical: '/tools/crosshair-generator',
  },
  openGraph: {
    title: 'CS2 Crosshair Generator — Live Preview & Share Code',
    description: 'Build a custom CS2 crosshair with live preview and copy a ready-to-import share code. Edit pro player crosshairs too.',
    type: 'website',
    url: 'https://www.cs2practice.com/tools/crosshair-generator',
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'CS2 Crosshair Generator',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web',
  url: 'https://www.cs2practice.com/tools/crosshair-generator',
  description:
    'Free in-browser CS2 crosshair generator with live preview and instant share-code export.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a CS2 crosshair code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A CSGO- share code is a compact encoding of every crosshair setting (style, size, thickness, gap, color, dot and outline). Anyone can paste it into CS2 to instantly load the exact same crosshair.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I import a crosshair code in CS2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Open Settings → Crosshair, click Share or Import, paste the code, and press Import. The crosshair applies immediately.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are the codes generated here valid?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Codes are built with the same checksummed algorithm CS2 uses, and the generator has been verified to round-trip real pro crosshair codes exactly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I copy a pro player crosshair?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the "Load a Pro Crosshair" buttons to start from a pro setup, then tweak any setting and copy the new code.',
      },
    },
  ],
};

export default function CrosshairGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CrosshairGeneratorClient />
    </>
  );
}
