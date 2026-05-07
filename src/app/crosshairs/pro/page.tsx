import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { crosshairs } from '@/data/crosshairs';
import ProCrosshairList from './ProCrosshairList';

export const metadata: Metadata = {
  title: 'CS2 Pro Player Crosshair Codes — s1mple, donk, ZywOo, NiKo',
  description:
    'Every CS2 pro crosshair code in one list — copy in one click and paste straight into the game. Includes the actual sensitivity, DPI and team for each player so you can copy the full setup, not just the crosshair.',
  keywords: [
    'pro crosshair cs2',
    'cs2 pro crosshair',
    'cs2 pro crosshairs',
    'pro cs2 crosshairs',
    'csgo pro crosshair',
    'cs go pro crosshair',
    'csgo pro players config',
    'cs2 pro player settings',
    'cs2 pros crosshairs',
  ],
  alternates: {
    canonical: '/crosshairs/pro',
  },
  openGraph: {
    title: 'CS2 Pro Player Crosshair Codes — Copy / Paste',
    description: 'Every pro crosshair (s1mple, donk, ZywOo, NiKo, m0NESY...) with the share code, plus their full settings.',
    type: 'website',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.cs2practice.com/' },
    { '@type': 'ListItem', position: 2, name: 'Crosshair Codes', item: 'https://www.cs2practice.com/crosshairs' },
    { '@type': 'ListItem', position: 3, name: 'Pro Player Crosshairs', item: 'https://www.cs2practice.com/crosshairs/pro' },
  ],
};

export default function ProCrosshairsPage() {
  const proCrosshairs = crosshairs.filter((c) => c.category === 'pro');

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: proCrosshairs.length,
    itemListElement: proCrosshairs.slice(0, 30).map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${c.player} crosshair code (${c.team})`,
      description: c.description ?? `${c.player} CS2 crosshair share code from ${c.team}.`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            {/* Breadcrumbs */}
            <nav className="text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-gray-300">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/crosshairs" className="hover:text-gray-300">Crosshair Codes</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-300">Pro Players</span>
            </nav>

            {/* Hero */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                CS2 pro player crosshair codes
              </h1>
              <p className="text-lg text-gray-400">
                {proCrosshairs.length} pro crosshairs you can copy in one click. CSGO codes work
                in CS2 — same format. Click through any name to see that player&apos;s full
                settings (sens, DPI, mouse, monitor).
              </p>
            </header>

            {/* Why copy a pro crosshair */}
            <section className="space-y-4 mb-12 text-gray-300">
              <h2 className="text-2xl font-bold text-white">Should you copy a pro crosshair?</h2>
              <p>
                Short answer: yes, as a starting point. The pros didn&apos;t arrive at their
                crosshair through pure preference — most landed on something close to a small
                static cross with a tiny gap because that&apos;s what works best across the maps
                they actually play. Starting from one of those is a faster path than building
                yours from scratch.
              </p>
              <p>
                Long answer: don&apos;t worship the exact code. Color and size matter much more
                than gap value or outline thickness. Pick a code that looks roughly right, copy
                it, and adjust the color to whatever stands out on the maps you queue. After a
                week or two of play, you&apos;ll know if you need bigger or smaller.
              </p>
            </section>

            {/* Crosshair grid */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                All pro crosshair codes ({proCrosshairs.length})
              </h2>
              <ProCrosshairList items={proCrosshairs} />
            </section>

            {/* Common patterns */}
            <section className="space-y-4 mb-12 text-gray-300">
              <h2 className="text-2xl font-bold text-white">Patterns across the pro scene</h2>
              <p>
                If you scroll through the codes above, a few patterns jump out.
              </p>
              <p>
                <strong className="text-white">Static beats dynamic, every time.</strong> Almost
                every pro disabled dynamic crosshair styles years ago. Dynamic crosshairs move
                during recoil and movement, which gives you false feedback about where your
                bullets actually go in CS2&apos;s netcode. Style 4 (Classic Static) is the
                default move.
              </p>
              <p>
                <strong className="text-white">Small over large.</strong> Most pro crosshairs are
                noticeably smaller than the CS2 default. The reasoning: a small crosshair forces
                better crosshair placement because you can see if it&apos;s on the head or off it,
                with no in-between &quot;close enough&quot;.
              </p>
              <p>
                <strong className="text-white">Cyan, green, and pink dominate.</strong> Red gets
                eaten by Inferno and Mirage. White disappears against bright walls. Cyan and green
                contrast well across most maps. Pink works for players who want something different
                without sacrificing visibility (m0NESY is the obvious example).
              </p>
              <p>
                <strong className="text-white">No outline, no center dot.</strong> Most run a clean
                cross — outline off, dot off, gap somewhere between -2 and 2. The exception is
                AWPers, who sometimes add a center dot for the long-distance lineup.
              </p>
            </section>

            {/* Featured players */}
            <section className="space-y-6 mb-12 text-gray-300">
              <h2 className="text-2xl font-bold text-white">The most copied crosshairs</h2>
              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">s1mple</h3>
                  <p>
                    Tiny static cyan, no dot, small gap. Possibly the most-copied crosshair in
                    CS history. If you&apos;re unsure where to start, start here.{' '}
                    <Link href="/pro/s1mple" className="text-blue-400 hover:underline">
                      Full settings →
                    </Link>
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">donk</h3>
                  <p>
                    Cyan, almost a pure dot. Comes with the disclaimer that he could probably hit
                    shots through any crosshair, so the code is more of a vibe than an upgrade.{' '}
                    <Link href="/pro/donk" className="text-blue-400 hover:underline">
                      Full settings →
                    </Link>
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">ZywOo</h3>
                  <p>
                    Small green static. The classic Vitality look that&apos;s barely changed in
                    years. Works for both rifle and AWP, which is why aspiring AWPers gravitate
                    here.{' '}
                    <Link href="/pro/zywoo" className="text-blue-400 hover:underline">
                      Full settings →
                    </Link>
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">NiKo</h3>
                  <p>
                    Slightly bigger than s1mple, still small overall, green. Good middle ground
                    if a tiny static crosshair feels too aggressive for you.{' '}
                    <Link href="/pro/niko" className="text-blue-400 hover:underline">
                      Full settings →
                    </Link>
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">m0NESY</h3>
                  <p>
                    Small pink. The pink stands out hard against most map textures and is
                    surprisingly easy to track at long range.{' '}
                    <Link href="/pro/m0nesy" className="text-blue-400 hover:underline">
                      Full settings →
                    </Link>
                  </p>
                </div>
              </div>
            </section>

            {/* Import help */}
            <section className="space-y-3 mb-12 text-gray-300">
              <h2 className="text-2xl font-bold text-white">How to import a crosshair code</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Click the green Copy button on any card above.</li>
                <li>Open CS2 → Settings → Game → Crosshair.</li>
                <li>Click <strong className="text-white">Share or Import</strong> at the top of the panel.</li>
                <li>Paste (Ctrl+V) and hit Import. The preview updates instantly.</li>
              </ol>
              <p className="text-sm text-gray-400">
                Faster path: open the console with <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-xs">~</kbd> and run{' '}
                <code className="text-green-400">cl_crosshair_sharecode &quot;CSGO-XXXXX-...&quot;</code>.
              </p>
            </section>

            {/* Internal links */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Related</h2>
              <ul className="space-y-2 text-gray-300">
                <li>
                  →{' '}
                  <Link href="/crosshairs" className="text-blue-400 hover:underline">
                    Full crosshair codes library
                  </Link>{' '}
                  (pro + community + minimal + dot)
                </li>
                <li>
                  →{' '}
                  <Link href="/crosshairs/dot" className="text-blue-400 hover:underline">
                    CS2 dot crosshair codes
                  </Link>
                </li>
                <li>
                  →{' '}
                  <Link href="/pro" className="text-blue-400 hover:underline">
                    All pro player full settings
                  </Link>{' '}
                  (sens, DPI, gear)
                </li>
                <li>
                  →{' '}
                  <Link href="/play" className="text-blue-400 hover:underline">
                    Free CS2 aim trainer
                  </Link>{' '}
                  (test your new crosshair)
                </li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
