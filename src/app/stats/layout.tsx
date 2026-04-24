import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Training Stats | CS2 Practice',
  description: 'View your personal aim training statistics — sessions, accuracy, reaction time. Stored locally in your browser.',
  alternates: { canonical: '/stats' },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
