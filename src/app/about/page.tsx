import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'About | CS2 Practice',
  description: 'About CS2 Practice - a free browser-based aim trainer built for CS2 and FPS players who just want to practice without the bloat.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold mb-8">About CS2 Practice</h1>

          <div className="prose prose-invert prose-gray max-w-none space-y-6">

            <section>
              <h2 className="text-xl font-semibold mb-3">Why this exists</h2>
              <p className="text-gray-300">
                I play CS2. A lot. And like most people trying to get better, I went through the usual
                aim trainer options &mdash; Aim Lab, Kovaak&apos;s, 3D Aim Trainer, you name it.
              </p>
              <p className="text-gray-300 mt-3">
                Aim Lab wanted me to create an account, pick a &quot;journey&quot;, watch a tutorial, customize my
                profile, and wade through a bunch of menus before I could click a single target. Kovaak&apos;s
                costs money and lives on Steam. 3D Aim Trainer is decent but feels kind of dated.
              </p>
              <p className="text-gray-300 mt-3">
                All I wanted was to open a page, set my sensitivity, and start shooting targets. So I built that.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">What CS2 Practice is</h2>
              <p className="text-gray-300">
                A free, browser-based aim trainer. No account, no download, no subscription.
                Open the page, pick a mode, train. Your settings and stats stay in your browser&apos;s local storage.
              </p>
              <p className="text-gray-300 mt-3">
                Current features:
              </p>
              <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                <li>Three training modes: Gridshot, Tracking, and Flicking</li>
                <li>Sensitivity sync for CS2, Valorant, Apex, and Overwatch 2</li>
                <li>A sensitivity converter if you switch between games</li>
                <li>Pro player settings database &mdash; s1mple, ZywOo, donk, NiKo, m0NESY, and more</li>
                <li>CS2 crosshair code library with one-click copy</li>
                <li>Local stats tracking so you can see if you&apos;re actually improving</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">How it&apos;s built</h2>
              <p className="text-gray-300">
                CS2 Practice runs on Next.js and uses the HTML Canvas API for rendering the training modes.
                Everything runs client-side &mdash; there&apos;s no server processing your clicks or storing your data.
                The site is hosted on Vercel with edge caching for fast load times worldwide.
              </p>
              <p className="text-gray-300 mt-3">
                It&apos;s a side project. I work on it when I have time, which usually means after a frustrating
                session of getting one-tapped on Mirage.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">What it&apos;s not</h2>
              <p className="text-gray-300">
                This isn&apos;t trying to replace Aim Lab or Kovaak&apos;s. Those are full-featured desktop
                applications with years of development behind them. CS2 Practice is a lightweight alternative for
                people who want quick, focused practice sessions without the overhead.
              </p>
              <p className="text-gray-300 mt-3">
                A browser will never match the input latency of a native desktop app. If you&apos;re a semi-pro
                grinding 2 hours of aim training daily, a dedicated tool is probably the better choice.
                But if you want a 5-minute warm-up before hopping into ranked, this does the job.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Pro settings &amp; crosshairs</h2>
              <p className="text-gray-300">
                The pro player settings are sourced from official team pages, player streams, and community
                databases like prosettings.net and liquipedia. I try to keep them up to date, but players change
                their configs all the time. If you spot something outdated,{' '}
                <Link href="/contact" className="text-blue-400 hover:underline">let me know</Link>.
              </p>
              <p className="text-gray-300 mt-3">
                The crosshair codes are collected from pro players, community favorites, and popular presets
                shared on Reddit and Steam forums. Every code is tested in CS2 before being added.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Privacy</h2>
              <p className="text-gray-300">
                Your training data stays on your device. I use Google Analytics to see which pages people
                visit and that&apos;s about it. No tracking pixels, no selling data, no dark patterns.
                Full details on the{' '}
                <Link href="/privacy" className="text-blue-400 hover:underline">privacy policy</Link> page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Feedback</h2>
              <p className="text-gray-300">
                If you run into a bug, have a feature idea, or just want to tell me my crosshair
                collection is missing your favorite pro &mdash; hit the feedback button in the bottom-right
                corner or head to the{' '}
                <Link href="/contact" className="text-blue-400 hover:underline">contact page</Link>.
              </p>
            </section>

          </div>

          <div className="mt-12 pt-8 border-t border-gray-800">
            <Link href="/" className="text-blue-400 hover:underline">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
