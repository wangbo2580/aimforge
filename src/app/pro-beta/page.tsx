import { Metadata } from 'next';
import FounderBetaClient from './FounderBetaClient';

export const metadata: Metadata = {
  title: 'AI Coach Pro Founder Beta | CS2 Practice',
  description:
    'Join the CS2 Practice AI Coach Pro Founder Beta waitlist and help shape personal warm-up plans, progress reports, and adaptive routines.',
  alternates: { canonical: '/pro-beta' },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ProBetaPage() {
  return <FounderBetaClient />;
}
