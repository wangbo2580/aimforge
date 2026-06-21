'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import { trackEvent } from '@/lib/analytics';
import { buildFeedbackContext, submitFeedback } from '@/lib/feedback';

const PRICE_OPTIONS = ['$4.99/month', '$7.99/month', '$9.99/month', 'Not ready to pay yet'];

const GOAL_OPTIONS = [
  'Personal 7-day warm-up plan',
  'Weekly progress and weak-point report',
  'Role-based routines for rifler / AWPer',
  'Cloud training history across devices',
];

export default function FounderBetaClient() {
  const [email, setEmail] = useState('');
  const [price, setPrice] = useState(PRICE_OPTIONS[1]);
  const [goal, setGoal] = useState(GOAL_OPTIONS[0]);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    trackEvent('pro_beta_view', { source: 'pro_beta_page' });
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;

    setStatus('sending');
    trackEvent('pro_beta_join_attempt', {
      price_option: price,
      primary_goal: goal,
    });

    try {
      const success = await submitFeedback({
        category: 'missing_feature',
        email: email.trim(),
        message: `AI Coach Pro Founder Beta waitlist. Price: ${price}. Primary goal: ${goal}.`,
        context: buildFeedbackContext('pro_beta_waitlist', {
          selectedOption: `${price} | ${goal}`,
        }),
      });

      setStatus(success ? 'success' : 'error');
      trackEvent('pro_beta_join', {
        success,
        price_option: price,
        primary_goal: goal,
      });
    } catch {
      setStatus('error');
      trackEvent('pro_beta_join', {
        success: false,
        price_option: price,
        primary_goal: goal,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <Link href="/play/warmup" className="text-sm text-gray-400 hover:text-white">
          ← Back to AI Coach
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section>
            <p className="text-sm font-semibold uppercase tracking-wide text-yellow-300">
              Founder Beta
            </p>
            <h1 className="mt-3 text-4xl font-black text-white md:text-5xl">
              Turn every warm-up into a personal improvement plan
            </h1>
            <p className="mt-5 text-lg leading-8 text-gray-300">
              AI Coach Pro is not available for purchase yet. We are inviting a small first group
              to validate the plan, price, and features before building the full subscription.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {GOAL_OPTIONS.map((item) => (
                <div key={item} className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                  <div className="text-lg font-bold text-white">{item}</div>
                  <p className="mt-2 text-sm text-gray-400">
                    Designed around repeatable progress, not a one-off score screen.
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-blue-500/30 bg-blue-500/10 p-5">
              <h2 className="font-bold text-white">What Founder members would get first</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-300">
                <li>Early access and direct influence over the roadmap.</li>
                <li>Founder pricing before a public subscription launch.</li>
                <li>A clear cancellation and refund policy before any payment is taken.</li>
              </ul>
            </div>
          </section>

          <aside className="h-fit rounded-2xl border border-gray-700 bg-gray-900 p-6 lg:sticky lg:top-6">
            <h2 className="text-2xl font-bold text-white">Join the waitlist</h2>
            <p className="mt-2 text-sm text-gray-400">
              No payment today. Your answers decide whether the full subscription should be built.
            </p>

            {status === 'success' ? (
              <div className="mt-6 rounded-xl border border-green-500/30 bg-green-500/10 p-5">
                <p className="font-bold text-green-200">You are on the Founder Beta list.</p>
                <p className="mt-2 text-sm text-gray-300">
                  We will contact you before any paid access opens.
                </p>
                <Link
                  href="/play/quick-warmup"
                  className="mt-5 inline-flex rounded-lg bg-green-600 px-4 py-2.5 font-semibold text-white hover:bg-green-500"
                >
                  Run another 90-second check
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <label className="block">
                  <span className="text-sm font-medium text-gray-200">Email</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-gray-200">
                    What monthly price feels reasonable?
                  </span>
                  <select
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                  >
                    {PRICE_OPTIONS.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-medium text-gray-200">
                    Which result matters most?
                  </span>
                  <select
                    value={goal}
                    onChange={(event) => setGoal(event.target.value)}
                    className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                  >
                    {GOAL_OPTIONS.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full rounded-lg bg-yellow-500 px-5 py-3 font-bold text-gray-950 transition-colors hover:bg-yellow-400 disabled:opacity-60"
                >
                  {status === 'sending' ? 'Joining...' : 'Join Founder Beta'}
                </button>
                {status === 'error' && (
                  <p className="text-sm text-red-300">
                    We could not save your request. Please try again.
                  </p>
                )}
                <p className="text-xs leading-5 text-gray-500">
                  We only use this email to contact you about AI Coach Pro. No payment information
                  is collected on this page.
                </p>
              </form>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}
