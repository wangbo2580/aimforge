import { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';

export const metadata: Metadata = {
  title: 'CS2 Practice - Free Online FPS Aim Trainer',
  description: 'Free online aim trainer for CS2, Valorant and other FPS games. Practice Gridshot, Tracking and Flicking with your exact in-game sensitivity. 30+ pro player settings, 100+ crosshair codes, sensitivity converter. No download required.',
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

export default function Home() {
  return <HomeClient />;
}
