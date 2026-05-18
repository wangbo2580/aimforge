import { Metadata } from 'next';
import Link from 'next/link';
import CrosshairsClient from './CrosshairsClient';
import { crosshairs } from '@/data/crosshairs';

export const metadata: Metadata = {
  title: 'CS2 Crosshair Codes — Copy / Paste Pro Player Crosshairs',
  description: 's1mple, donk, ZywOo, NiKo, m0NESY and 25+ more. Copy a CS2 crosshair code with one click and paste it straight into your game. Includes dot crosshairs, CSGO-compatible codes, and an import guide.',
  keywords: [
    's1mple crosshair',
    'cs2 crosshair codes',
    'csgo crosshair codes',
    'csgo dot crosshair copy paste',
    'cs2 dot crosshair code',
    'crosshair codes copy paste',
    'pro crosshair cs2',
    'cs2 crosshair',
    'cs2 funny crosshair codes',
    'cs2 crosshair import',
  ],
  alternates: {
    canonical: '/crosshairs',
  },
  openGraph: {
    title: 'CS2 Crosshair Codes — Pro Player Crosshairs (Copy / Paste)',
    description: 'Copy s1mple, donk, ZywOo, NiKo crosshair codes in one click. CSGO codes work too. Includes dot crosshairs and a full import guide.',
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I copy and paste a crosshair code in CS2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Click the "Copy Code" button next to any crosshair. Then open CS2, go to Settings → Game → Crosshair → Share or Import, paste the code, and click Import. You can also open the console (~) and type cl_crosshair_sharecode "YOUR_CODE".',
      },
    },
    {
      '@type': 'Question',
      name: 'What crosshair do most CS2 pros use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most CS2 professionals use small, static crosshairs in green or cyan. The most common style is a thin cross with a small gap and no dot. Players like s1mple, donk, and ZywOo all use variations of this classic setup.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do CSGO crosshair codes work in CS2?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. CS2 uses the same crosshair share code format as CS:GO. Any CSGO crosshair code starting with "CSGO-" will work in CS2. Simply import it the same way through Settings or the console.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best crosshair for beginners?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For beginners, a small static green crosshair with a center dot is a good starting point. It provides clear visibility without being distracting. Try the "Classic Static" or "Simple Dot" options from our community collection, then adjust from there as you develop your preference.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.cs2practice.com/' },
    { '@type': 'ListItem', position: 2, name: 'Crosshair Codes', item: 'https://www.cs2practice.com/crosshairs' },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to import a CS2 crosshair code',
  description: 'Copy a share code from this page and paste it into CS2 to get the same crosshair as a pro player.',
  totalTime: 'PT1M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Copy the code',
      text: 'Click the green Copy button next to any crosshair on this page. The share code is now on your clipboard.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Open CS2 settings',
      text: 'Launch CS2 and open Settings → Game → Crosshair from the main menu.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Open the import dialog',
      text: 'Click the Share or Import button at the top of the crosshair settings panel.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Paste and import',
      text: 'Paste the code with Ctrl+V and click Import. The crosshair preview updates immediately.',
    },
  ],
};

// ItemList of all crosshair codes — helps Google understand this is a structured list page
const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  numberOfItems: crosshairs.length,
  itemListElement: crosshairs.slice(0, 30).map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.player ? `${c.player} crosshair code (${c.team ?? 'CS2'})` : `${c.name} crosshair code`,
    description: c.description ?? `${c.name} CS2 crosshair share code, copy / paste ready.`,
  })),
};

export default function CrosshairsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
      <CrosshairsClient />

      {/* SEO Article — server-rendered for crawlers */}
      <article className="container mx-auto max-w-3xl px-4 py-16 border-t border-gray-800 text-gray-300 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">How crosshair share codes work in CS2</h2>
          <p>
            A CS2 crosshair share code is a string like{' '}
            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400 text-sm">CSGO-xxx-xxx-xxx-xxx-xxx</code>{' '}
            that encodes every setting in your crosshair into 25 characters: size, thickness, gap,
            outline width, color (including custom RGB), dot toggle, dynamic-vs-static behavior, and
            the alpha. Pasting the string into CS2 replaces all of those at once. No need to copy a
            screenshot and eyeball it.
          </p>
          <p className="mt-3">
            Valve kept the format identical between CS:GO and CS2 — both engines decode the same
            code into the same crosshair. That means any code you see on an old CS:GO video, an
            old-school crosshair generator, or a pro&apos;s 2018 stream still works today. Just
            import and go.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">Three ways to import a code</h2>
          <ol className="list-decimal pl-6 space-y-3 mt-3">
            <li>
              <strong className="text-white">Settings menu (easiest).</strong> Launch CS2 → Settings
              → Game → Crosshair. Hit the Share / Import button at the top, paste your code,
              import. The preview window updates immediately.
            </li>
            <li>
              <strong className="text-white">Console one-liner.</strong> Open console with the{' '}
              <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">~</code> key and
              type{' '}
              <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">cl_crosshair_sharecode &quot;YOUR_CODE&quot;</code>.
              Don&apos;t forget the quotes around the code itself.
            </li>
            <li>
              <strong className="text-white">Autoexec.cfg (permanent).</strong> Put the console
              command into your{' '}
              <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">autoexec.cfg</code>{' '}
              file. The crosshair loads on every game start. Useful if you have multiple machines
              syncing via cloud and want the same crosshair everywhere. The{' '}
              <Link href="/commands/bind-say-message#permanent" className="text-blue-400 hover:underline">
                autoexec setup guide
              </Link>{' '}
              covers where the file lives and how to create one if you don&apos;t already have it.
            </li>
          </ol>
          <p className="mt-4">
            If you don&apos;t see the Share / Import button in your settings menu, check that
            you&apos;re running the current CS2 client — the button was added in a 2024 update and
            old installs without recent patches don&apos;t have it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">What makes a crosshair work for you</h2>
          <p>
            Most CS2 pros use{' '}
            <strong className="text-white">small, static, thin crosshairs in green or cyan</strong>
            . The reasoning is consistent across players: the smaller the crosshair, the less it
            obscures the pixel you&apos;re trying to shoot; static means no animation distracts you
            on recoil; green/cyan stays visible against every map&apos;s color palette (de_inferno
            wood, de_mirage stone, de_ancient green-jungle).
          </p>
          <p className="mt-3">
            There are exceptions, and they reveal what each player optimizes for:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <strong className="text-white">Pure dot crosshairs</strong> — favored by AWPers
              because the unscoped peek-shot relies on a single-pixel anchor point. The cross lines
              are just clutter for them.
            </li>
            <li>
              <strong className="text-white">Red or yellow crosshairs</strong> — chosen by a small
              minority who play with high monitor brightness and find that green washes out on
              specific maps. Not a recommendation, just a calibration choice.
            </li>
            <li>
              <strong className="text-white">Crosshairs with an outline</strong> — slightly heavier
              visually, but visible against any color background. Useful for streamers who play in
              brighter lighting than typical tournament booths.
            </li>
            <li>
              <strong className="text-white">Slightly thicker crosshairs</strong> (thickness 1 vs
              0.5) — used by players who fight at longer ranges (AWPers, lurkers) where the
              thinnest pixel-perfect crosshair vanishes against terrain detail.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">Copying a pro crosshair vs building your own</h2>
          <p>
            Copying a pro&apos;s exact code is the fastest way to land on a competitive crosshair
            without weeks of tuning. That&apos;s most of the value of this page: you skip the
            crosshair generators that give you 200 sliders and start from a known-good baseline.
          </p>
          <p className="mt-3">
            But after a week of using a pro crosshair, most players adjust one or two things. The
            tweaks that come up most often: opening or closing the center gap (depends on whether
            you prefer to see the muzzle of the gun or the pixel beneath), turning the center dot
            on or off, and shifting size up or down by one increment. Make one change at a time and
            give it 10-20 ranked rounds before judging — the brain takes a while to adjust to a new
            crosshair before its &ldquo;feel&rdquo; settles.
          </p>
          <p className="mt-3">
            If you&apos;re not sure where to start, try one of the small static green ones from a
            CT-side specialist (NiKo, ZywOo) for general use, or a pure dot from an AWPer (s1mple,
            m0NESY) if you mainly play AWP. The full pro list, including their sensitivities, gear
            and analysis, is on the{' '}
            <Link href="/pro" className="text-blue-400 hover:underline">
              pro settings page
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">What to do once your crosshair is dialed in</h2>
          <p>
            A good crosshair removes a distraction. It doesn&apos;t add aim. Once it&apos;s set,
            the next things to look at:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              <strong className="text-white">Sensitivity.</strong> If your wrist or arm is doing
              extra work to track an enemy after the crosshair change, the sens is fighting you.
              Use the{' '}
              <Link href="/tools/sensitivity-converter" className="text-blue-400 hover:underline">
                sensitivity converter
              </Link>{' '}
              to match cm/360° if you switched from another game, or read what a pro at your
              playstyle uses on the{' '}
              <Link href="/pro" className="text-blue-400 hover:underline">
                pro settings page
              </Link>
              .
            </li>
            <li>
              <strong className="text-white">Aim trainer benchmark.</strong> Run a session of{' '}
              <Link href="/play/gridshot" className="text-blue-400 hover:underline">
                gridshot
              </Link>
              ,{' '}
              <Link href="/play/tracking" className="text-blue-400 hover:underline">
                tracking
              </Link>
              , and{' '}
              <Link href="/play/flicking" className="text-blue-400 hover:underline">
                flicking
              </Link>{' '}
              right after you change crosshair, and another a week later. If your numbers dropped
              and stayed dropped, the crosshair isn&apos;t for you — revert.
            </li>
            <li>
              <strong className="text-white">Core binds.</strong> A jumpthrow bind and a plant
              bind do more for rank progress than spending another week on crosshair tuning. Setup
              guides in the{' '}
              <Link href="/commands" className="text-blue-400 hover:underline">
                commands hub
              </Link>
              .
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">Crosshair settings the share code does and doesn&apos;t cover</h2>
          <p>
            The share code encodes the crosshair itself. It doesn&apos;t encode:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>
              Your viewmodel — gun position on screen, FOV, the &ldquo;left hand&rdquo; toggle.
              These live in{' '}
              <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">viewmodel_*</code>{' '}
              console commands and need a separate setup.
            </li>
            <li>
              Crosshair behavior on weapon switch (the{' '}
              <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">cl_crosshairstyle</code>{' '}
              command). Most pros use 4 (static, no recoil bloom) or 5 (static, with bloom). 4 is
              the modern default.
            </li>
            <li>
              The HUD color and HUD scale — those are in the Game settings menu, separate from the
              crosshair.
            </li>
          </ul>
          <p className="mt-3">
            If your pasted crosshair looks correct but behavior feels off (e.g. it expands when you
            shoot), check{' '}
            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">cl_crosshairstyle</code>{' '}
            in console — that one isn&apos;t part of the share code.
          </p>
        </section>
      </article>
    </>
  );
}
