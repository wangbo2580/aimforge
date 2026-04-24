import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings | CS2 Practice',
  description: 'Configure sensitivity, DPI, sound, crosshair color, and other personal preferences for the CS2 Practice aim trainer.',
  alternates: { canonical: '/settings' },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
