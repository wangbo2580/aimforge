import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import FeedbackButton from '@/components/FeedbackButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CS2 Practice - Free Online FPS Aim Trainer',
  description: 'Free online aim trainer for CS2, Valorant and other FPS games. Practice gridshot, tracking and flicking with your exact in-game sensitivity. No download required.',
  keywords: ['aim trainer', 'CS2', 'Valorant', 'FPS', 'gridshot', 'tracking', 'flicking', 'sensitivity', 'free', 'online'],
  openGraph: {
    title: 'CS2 Practice - Free Online FPS Aim Trainer',
    description: 'Practice your aim with CS2/Valorant sensitivity sync. Gridshot, Tracking, Flicking modes. Free, no download.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CS2 Practice - Free Online FPS Aim Trainer',
    description: 'Practice your aim with CS2/Valorant sensitivity sync. Free, no download.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950 text-white antialiased`}>
        <GoogleAnalytics />
        <Providers>
          {children}
          <FeedbackButton />
        </Providers>
      </body>
    </html>
  );
}
