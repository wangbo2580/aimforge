import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import GuidesContent from '@/components/pages/GuidesContent';
import { guides } from '@/data/guides';

export const metadata: Metadata = {
  title: 'CS2 Aim Training Guides & Tips | CS2 Practice',
  description: 'Learn how to improve your aim in CS2 with our comprehensive guides. From beginner fundamentals to advanced techniques.',
  keywords: [
    'cs2 aim guide',
    'how to aim cs2',
    'cs2 training guide',
    'improve aim fps',
    'cs2 sensitivity guide',
    'aim training tips',
  ],
};

export default function GuidesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <GuidesContent guides={guides} />
      </main>
    </div>
  );
}
