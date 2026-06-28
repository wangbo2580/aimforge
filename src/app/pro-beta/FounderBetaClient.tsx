'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import { trackEvent } from '@/lib/analytics';
import { buildFeedbackContext, submitFeedback } from '@/lib/feedback';

const PRICE_OPTIONS = [
  {
    value: '$4.99/mo Founder Beta',
    label: '$4.99/mo',
    name: 'Founder Beta',
    detail: 'Early access price if the first paid cohort opens.',
  },
  {
    value: '$7.99/mo Standard Pro',
    label: '$7.99/mo',
    name: 'Standard Pro',
    detail: 'Likely public subscription price after validation.',
  },
  {
    value: '$19 one-time 4-week plan',
    label: '$19',
    name: 'One-time plan',
    detail: 'A 4-week plan for players who dislike subscriptions.',
  },
  {
    value: 'Interested but not ready to pay',
    label: '$0',
    name: 'Not ready yet',
    detail: 'Useful signal if you want the feature but not a paid plan.',
  },
] as const;

const GOAL_OPTIONS = [
  'Personal 7-day warm-up plan',
  'Weekly progress and weak-point report',
  'Role-based routines for rifler / AWPer',
  'Cloud training history across devices',
];

const SAMPLE_REPORT = [
  { label: 'Weakest signal', value: 'Tracking control', tone: 'text-yellow-200' },
  { label: 'Next drill', value: '2 min smooth tracking + 30 sec flick reset', tone: 'text-blue-200' },
  { label: 'Weekly goal', value: '+8% control score before FACEIT queue', tone: 'text-green-200' },
];

function cleanTrackingParam(value: string | null, fallback: string) {
  if (!value) return fallback;
  const cleaned = value.slice(0, 80);
  return /^[a-z0-9_-]+$/i.test(cleaned) ? cleaned : fallback;
}

export default function FounderBetaClient() {
  const searchParams = useSearchParams();
  const source = cleanTrackingParam(searchParams.get('source'), 'direct');
  const weakMode = cleanTrackingParam(searchParams.get('weak_mode'), 'unknown');
  const role = cleanTrackingParam(searchParams.get('role'), 'not_selected');
  const [email, setEmail] = useState('');
  const [price, setPrice] = useState<string>(PRICE_OPTIONS[0].value);
  const [goal, setGoal] = useState(GOAL_OPTIONS[0]);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    trackEvent('pro_beta_view', {
      source,
      weak_mode: weakMode,
      selected_role: role,
    });
  }, [role, source, weakMode]);

  const handlePriceSelect = (nextPrice: string) => {
    setPrice(nextPrice);
    trackEvent('pro_beta_price_select', {
      price_option: nextPrice,
      source,
      weak_mode: weakMode,
      selected_role: role,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;

    setStatus('sending');
    trackEvent('pro_beta_join_attempt', {
      price_option: price,
      primary_goal: goal,
      source,
      weak_mode: weakMode,
      selected_role: role,
    });

    try {
      const success = await submitFeedback({
        category: 'missing_feature',
        email: email.trim(),
        message: `AI Coach Pro Founder Beta waitlist. Price: ${price}. Primary goal: ${goal}. Source: ${source}. Weak mode: ${weakMode}. Role: ${role}.`,
        context: buildFeedbackContext('pro_beta_waitlist', {
          selectedOption: `${price} | ${goal}`,
          routineId: 'ai-coach-pro-beta',
          source,
          weakMode,
          role,
          priceOption: price,
        }),
      });

      setStatus(success ? 'success' : 'error');
      if (success) {
        trackEvent('pro_beta_email_submit', {
          price_option: price,
          primary_goal: goal,
          source,
          weak_mode: weakMode,
          selected_role: role,
        });
      }
      trackEvent('pro_beta_join', {
        success,
        price_option: price,
        primary_goal: goal,
        source,
        weak_mode: weakMode,
        selected_role: role,
      });
    } catch {
      setStatus('error');
      trackEvent('pro_beta_join', {
        success: false,
        price_option: price,
        primary_goal: goal,
        source,
        weak_mode: weakMode,
        selected_role: role,
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
              Turn every CS2 warm-up into a weekly improvement plan
            </h1>
            <p className="mt-5 text-lg leading-8 text-gray-300">
              AI Coach Pro is not available for purchase yet. This Founder Beta validates the
              price, report format, and role-based routines before a full subscription is built.
            </p>

            <div className="mt-8 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-yellow-300">
                    Proposed launch price
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-white">$4.99/mo Founder Beta</h2>
                  <p className="mt-2 text-sm text-gray-300">
                    If enough players join, the public price is expected to move toward $7.99/mo.
                  </p>
                </div>
                <div className="rounded-xl bg-gray-950/60 px-4 py-3 text-sm text-gray-300">
                  No payment today. No card. Just intent.
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {PRICE_OPTIONS.slice(0, 3).map((option) => (
                <div key={option.value} className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                  <div className="text-sm font-semibold text-gray-400">{option.name}</div>
                  <div className="mt-2 text-3xl font-black text-white">{option.label}</div>
                  <p className="mt-2 text-sm text-gray-400">{option.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {GOAL_OPTIONS.slice(0, 3).map((item) => (
                <div key={item} className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                  <div className="text-lg font-bold text-white">{item}</div>
                  <p className="mt-2 text-sm text-gray-400">
                    Designed around repeatable progress, not a one-off score screen.
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-blue-500/30 bg-blue-500/10 p-5">
              <h2 className="font-bold text-white">Sample weekly report preview</h2>
              <div className="mt-4 grid gap-3">
                {SAMPLE_REPORT.map((item) => (
                  <div key={item.label} className="rounded-lg bg-gray-950/60 p-4">
                    <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {item.label}
                    </div>
                    <div className={`mt-1 font-bold ${item.tone}`}>{item.value}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-300">
                Founder members would help decide whether weekly reports should be more like a
                coach note, a training checklist, or a progress dashboard.
              </p>
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
                    onChange={(event) => handlePriceSelect(event.target.value)}
                    className="mt-2 w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none focus:border-blue-500"
                  >
                    {PRICE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.value}
                      </option>
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
