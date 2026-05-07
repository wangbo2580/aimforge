import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { crosshairs } from '@/data/crosshairs';
import DotCrosshairList from './DotCrosshairList';

export const metadata: Metadata = {
  title: 'CS2 Dot Crosshair Codes — Copy / Paste (CSGO Compatible)',
  description:
    'Pure dot CS2 crosshair codes ready to copy-paste. CSGO-format codes work in CS2 too. Includes pro dot crosshairs (donk style), how to make one from scratch, and when a dot actually helps your aim.',
  keywords: [
    'csgo dot crosshair copy paste',
    'cs2 dot crosshair',
    'cs2 dot crosshair code',
    'cs2 dot crosshair codes',
    'csgo dot crosshair',
    'csgo dot crosshair code',
    'dot crosshair cs2',
    'cs go crosshair dot',
    'cs2 simple dot crosshair',
  ],
  alternates: {
    canonical: '/crosshairs/dot',
  },
  openGraph: {
    title: 'CS2 Dot Crosshair Codes — Copy / Paste',
    description: 'Pure dot crosshair share codes for CS2 (and CSGO). One-click copy. Includes donk-style and how to build one yourself.',
    type: 'website',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.cs2practice.com/' },
    { '@type': 'ListItem', position: 2, name: 'Crosshair Codes', item: 'https://www.cs2practice.com/crosshairs' },
    { '@type': 'ListItem', position: 3, name: 'Dot Crosshairs', item: 'https://www.cs2practice.com/crosshairs/dot' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to set up a dot crosshair in CS2 from scratch',
  description: 'Configure a pure dot crosshair in CS2 settings without using a share code.',
  totalTime: 'PT2M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Open crosshair settings',
      text: 'Go to Settings → Game → Crosshair in the CS2 main menu.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Set length to 0',
      text: 'Set Length to 0 to remove the four crosshair lines.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Enable center dot',
      text: 'Toggle Center Dot ON. Set the dot size between 1 and 2.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Disable dynamic recoil',
      text: 'Set Style to Classic Static (number 4). Dynamic styles will move the dot when shooting.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Pick a contrasting color',
      text: 'Cyan or pink works best across most maps. Avoid green if you play a lot of cs_office.',
    },
  ],
};

export default function DotCrosshairsPage() {
  // Filter to dot category, plus any non-dot crosshairs whose description mentions "dot"
  const dotCrosshairs = crosshairs.filter(
    (c) =>
      c.category === 'dot' ||
      (c.description?.toLowerCase().includes('dot') ?? false),
  );

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: dotCrosshairs.length,
    itemListElement: dotCrosshairs.slice(0, 20).map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.player ? `${c.player} dot crosshair code` : `${c.name} dot crosshair`,
      description: c.description ?? `${c.name} CS2 dot crosshair share code, copy / paste ready.`,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12 px-4">
          <div className="container mx-auto max-w-3xl">
            {/* Breadcrumbs */}
            <nav className="text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-gray-300">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/crosshairs" className="hover:text-gray-300">Crosshair Codes</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-300">Dot</span>
            </nav>

            {/* Hero */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                CS2 dot crosshair codes
              </h1>
              <p className="text-lg text-gray-400">
                Copy a pure dot, paste into CS2. CSGO codes work in CS2 too — same format,
                no conversion needed.
              </p>
            </header>

            {/* Why a dot */}
            <section className="space-y-4 mb-12 text-gray-300">
              <h2 className="text-2xl font-bold text-white">Why people use a dot</h2>
              <p>
                A dot is the smallest possible crosshair. No lines, no gap, no outline — just one
                pixel cluster telling you where the bullets go. Two reasons people switch:
              </p>
              <p>
                <strong className="text-white">Less visual clutter.</strong> When you peek a corner,
                a regular crosshair&apos;s lines can hide the head you&apos;re trying to hit. A dot
                doesn&apos;t. You can see the entire enemy outline.
              </p>
              <p>
                <strong className="text-white">It forces good crosshair placement.</strong> A big
                crosshair makes you sloppy because the lines &quot;point&quot; at heads even when
                they&apos;re not really on heads. With a dot, either you&apos;re on the head or
                you&apos;re not. There&apos;s no in-between.
              </p>
              <p>
                Downsides: spray transfer feels weirder at first because you lose the visual
                guides through recoil. Most people adjust within two weeks. If after two weeks
                you&apos;re still missing more than before — switch back. There&apos;s no rule
                that pros use dots so you should too. donk and a couple of others run dots, but
                most pros still use a thin cross.
              </p>
            </section>

            {/* Crosshair grid */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                Dot crosshair codes ({dotCrosshairs.length})
              </h2>
              {dotCrosshairs.length > 0 ? (
                <DotCrosshairList items={dotCrosshairs} />
              ) : (
                <p className="text-gray-400">
                  No dot crosshairs in the library yet — see the{' '}
                  <Link href="/crosshairs" className="text-blue-400 hover:underline">
                    full crosshair list
                  </Link>{' '}
                  and filter by Dot.
                </p>
              )}
            </section>

            {/* How to make from scratch */}
            <section className="space-y-4 mb-12 text-gray-300">
              <h2 className="text-2xl font-bold text-white">Build a dot crosshair from scratch</h2>
              <p>
                Don&apos;t want to use a share code? Here&apos;s the manual version. Takes about
                two minutes.
              </p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Settings → Game → Crosshair.</li>
                <li>Set <strong className="text-white">Length</strong> to <code className="text-green-400">0</code>. The four lines disappear.</li>
                <li>Toggle <strong className="text-white">Center Dot</strong> ON.</li>
                <li>Set the <strong className="text-white">Dot Size</strong> between 1 and 2. Anything bigger looks like a square.</li>
                <li>Set <strong className="text-white">Style</strong> to <em>Classic Static</em>. Dynamic styles will pulse the dot during recoil, which defeats the point.</li>
                <li>Pick a color. Cyan and pink contrast well across most maps. Skip green unless you only play cs_office.</li>
              </ol>
              <p className="text-sm text-gray-400">
                Console version: open <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-xs">~</kbd> and run{' '}
                <code className="text-green-400">cl_crosshairsize 0; cl_crosshairdot 1; cl_crosshairgap -2; cl_crosshair_drawoutline 0</code>.
              </p>
            </section>

            {/* CSGO vs CS2 compatibility */}
            <section className="space-y-3 mb-12 text-gray-300">
              <h2 className="text-2xl font-bold text-white">CSGO dot crosshair codes in CS2</h2>
              <p>
                Every code on this page starts with <code className="text-green-400">CSGO-</code>.
                That&apos;s deliberate — Valve kept the same share code format in CS2 so legacy
                codes still work. If you&apos;re searching for &quot;csgo dot crosshair copy
                paste&quot;, you&apos;ve already got what you need above. The CSGO prefix doesn&apos;t
                need to be changed.
              </p>
              <p>
                One caveat: some CS2-specific options (like the recoil-aware crosshair toggle) aren&apos;t
                stored in the share code. If your imported dot looks slightly different from the
                preview, check that <code className="text-green-400">crosshair_recoil</code> is
                disabled and that <code className="text-green-400">cl_crosshairstyle</code> is 4.
              </p>
            </section>

            {/* When a dot is the wrong call */}
            <section className="space-y-3 mb-12 text-gray-300">
              <h2 className="text-2xl font-bold text-white">When a dot is the wrong choice</h2>
              <p>
                A dot is great for short to mid-range duels where you can place it on a head before
                the fight starts. It struggles in two situations.
              </p>
              <p>
                <strong className="text-white">Long-range AWP duels on dark backgrounds.</strong>
                {' '}A single pixel dot is genuinely hard to see against the deep blacks on Nuke
                catwalk or Inferno banana shadows. A small cross with a center dot gives you
                contrast lines without the lines being big enough to hide a head.
              </p>
              <p>
                <strong className="text-white">Spray transfers across multiple targets.</strong>
                {' '}If you&apos;re used to using crosshair lines to gauge how much your spray has
                drifted, a dot removes that reference. You&apos;ll spray slightly worse for the
                first week or two while your hand recalibrates.
              </p>
              <p>
                If either of these matter for your role, try the small static cross with a center
                dot instead — it&apos;s the compromise most CS pros land on.
              </p>
            </section>

            {/* Internal links */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Related</h2>
              <ul className="space-y-2 text-gray-300">
                <li>
                  →{' '}
                  <Link href="/crosshairs" className="text-blue-400 hover:underline">
                    Full CS2 crosshair codes library
                  </Link>{' '}
                  (all styles, including pro / classic / minimal)
                </li>
                <li>
                  →{' '}
                  <Link href="/pro/donk" className="text-blue-400 hover:underline">
                    donk&apos;s full settings
                  </Link>{' '}
                  (his actual crosshair, sensitivity, mouse, monitor)
                </li>
                <li>
                  →{' '}
                  <Link href="/pro" className="text-blue-400 hover:underline">
                    All pro player setups
                  </Link>
                </li>
                <li>
                  →{' '}
                  <Link href="/play" className="text-blue-400 hover:underline">
                    Free CS2 aim trainer
                  </Link>{' '}
                  (try your new crosshair on Gridshot)
                </li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
