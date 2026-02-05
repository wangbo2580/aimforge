import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AimForge - FPS Aim Trainer',
  description: 'Free online aim trainer for CS2, Valorant and other FPS games. Practice gridshot, tracking and flicking with your exact in-game sensitivity.',
  keywords: ['aim trainer', 'CS2', 'Valorant', 'FPS', 'gridshot', 'tracking', 'flicking', 'sensitivity'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950 text-white antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
