import { Metadata } from 'next';
import { Suspense } from 'react';
import FounderBetaClient from './FounderBetaClient';

export const metadata: Metadata = {
  title: 'AI Coach Pro Founder Beta | CS2 Practice',
  description:
    'Join the CS2 Practice AI Coach Pro Founder Beta waitlist and help validate $4.99/mo personal warm-up plans, weekly progress reports, and role-based CS2 routines.',
  alternates: { canonical: '/pro-beta' },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ProBetaPage() {
  return (
    <Suspense fallback={null}>
      <FounderBetaClient />
    </Suspense>
  );
}
