import { Metadata } from 'next';
import CrosshairsClient from './CrosshairsClient';
import { crosshairs } from '@/data/crosshairs';

export const metadata: Metadata = {
  title: 'CS2 Crosshair Codes — Copy / Paste Pro Player Crosshairs',
  description: 's1mple, donk, ZywOo, NiKo, m0NESY and 25+ more. Copy a CS2 crosshair code with one click and paste it straight into your game. Includes dot crosshairs, CSGO-compatible codes, and an import guide.',
  keywords: [
    's1mple crosshair',
    'cs2 crosshair codes',
    'csgo crosshair codes',
    'csgo dot crosshair copy paste',
    'cs2 dot crosshair code',
    'crosshair codes copy paste',
    'pro crosshair cs2',
    'cs2 crosshair',
    'cs2 funny crosshair codes',
    'cs2 crosshair import',
  ],
  alternates: {
    canonical: '/crosshairs',
  },
  openGraph: {
    title: 'CS2 Crosshair Codes — Pro Player Crosshairs (Copy / Paste)',
    description: 'Copy s1mple, donk, ZywOo, NiKo crosshair codes in one click. CSGO codes work too. Includes dot crosshairs and a full import guide.',
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I copy and paste a crosshair code in CS2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Click the "Copy Code" button next to any crosshair. Then open CS2, go to Settings → Game → Crosshair → Share or Import, paste the code, and click Import. You can also open the console (~) and type cl_crosshair_sharecode "YOUR_CODE".',
      },
    },
    {
      '@type': 'Question',
      name: 'What crosshair do most CS2 pros use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most CS2 professionals use small, static crosshairs in green or cyan. The most common style is a thin cross with a small gap and no dot. Players like s1mple, donk, and ZywOo all use variations of this classic setup.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do CSGO crosshair codes work in CS2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. CS2 uses the same crosshair share code format as CS:GO. Any CSGO crosshair code starting with "CSGO-" will work in CS2. Simply import it the same way through Settings or the console.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best crosshair for beginners?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For beginners, a small static green crosshair with a center dot is a good starting point. It provides clear visibility without being distracting. Try the "Classic Static" or "Simple Dot" options from our community collection, then adjust from there as you develop your preference.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.cs2practice.com/' },
    { '@type': 'ListItem', position: 2, name: 'Crosshair Codes', item: 'https://www.cs2practice.com/crosshairs' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to import a CS2 crosshair code',
  description: 'Copy a share code from this page and paste it into CS2 to get the same crosshair as a pro player.',
  totalTime: 'PT1M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Copy the code',
      text: 'Click the green Copy button next to any crosshair on this page. The share code is now on your clipboard.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Open CS2 settings',
      text: 'Launch CS2 and open Settings → Game → Crosshair from the main menu.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Open the import dialog',
      text: 'Click the Share or Import button at the top of the crosshair settings panel.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Paste and import',
      text: 'Paste the code with Ctrl+V and click Import. The crosshair preview updates immediately.',
    },
  ],
};

// ItemList of all crosshair codes — helps Google understand this is a structured list page
const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  numberOfItems: crosshairs.length,
  itemListElement: crosshairs.slice(0, 30).map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.player ? `${c.player} crosshair code (${c.team ?? 'CS2'})` : `${c.name} crosshair code`,
    description: c.description ?? `${c.name} CS2 crosshair share code, copy / paste ready.`,
  })),
};

export default function CrosshairsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <CrosshairsClient />
    </>
  );
}
