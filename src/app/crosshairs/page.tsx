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
    title: 'CS2 Crosshair Codes - 100+ Pro & Community Crosshairs',
    description: 'Copy pro player crosshair codes for CS2. s1mple, ZywOo, donk, NiKo and more. One-click copy, paste directly in CS2.',
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
      <CrosshairsClient />
    </>
  );
}
