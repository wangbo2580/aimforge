import { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';

export const metadata: Metadata = {
  title: 'CS2 Practice - Free Online FPS Aim Trainer',
  description: 'Free online aim trainer for CS2, Valorant and other FPS games. Run a 5-minute or 90-second CS2 warm-up with AI diagnosis, or practice Gridshot, Tracking and Flicking. No download required.',
  keywords: ['aim trainer', 'cs2 aim trainer', 'fps aim trainer', 'valorant aim trainer', 'aim training online', 'cs2 practice', 'free aim trainer', 'gridshot', 'crosshair codes cs2', 'pro settings cs2'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'CS2 Practice - Free Online FPS Aim Trainer',
    description: 'Free aim trainer with CS2/Valorant sensitivity sync. Gridshot, Tracking, Flicking modes. 30+ pro settings, 100+ crosshair codes. No download.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CS2 Practice - Free Online FPS Aim Trainer',
    description: 'Free aim trainer with CS2/Valorant sensitivity sync. No download required.',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'CS2 Practice',
  url: 'https://www.cs2practice.com',
  description: 'Free online FPS aim trainer with CS2/Valorant sensitivity sync, pro player settings database, and crosshair code library.',
  publisher: {
    '@type': 'Organization',
    name: 'CS2 Practice',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.cs2practice.com/logo-512.png',
    },
  },
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CS2 Practice',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: 'Free browser-based aim trainer for CS2 and Valorant. Run a warm-up with AI diagnosis or practice Gridshot, Tracking, and Flicking with transparent browser calibration.',
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <HomeClient />
    </>
  );
}
