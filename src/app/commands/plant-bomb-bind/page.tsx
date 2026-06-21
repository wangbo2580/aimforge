import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import CopyButton from '@/components/ui/CopyButton';
import TrackedLink from '@/components/ui/TrackedLink';

export const metadata: Metadata = {
  title: 'CS2 Plant Bomb Bind: Copy-Paste Command (2026)',
  description:
    'Copy the CS2 plant bomb bind for MOUSE5, V, C, or another key. Includes the simple command, safer alias version, autoexec setup, and fixes.',
  keywords: [
    'plant bomb bind on cs2',
    'cs2 plant bomb bind',
    'cs2 buy binds',
    'cs2 buy bind generator',
    'buy binds in cs2',
    'cs2 plant bind mouse',
    'cs2 numpad buy binds',
  ],
  alternates: { canonical: '/commands/plant-bomb-bind' },
  openGraph: {
    title: 'CS2 Plant Bomb Bind — Copy-Paste Command',
    description:
      'Copy a CS2 plant bomb bind for a mouse button or keyboard key, then make it permanent in autoexec.cfg.',
    url: '/commands/plant-bomb-bind',
    type: 'article',
  },
};

const PLANT_BIND = `bind "MOUSE5" "+plant"
alias "+plant" "+use; -attack"
alias "-plant" "-use"`;

const PLANT_BIND_SIMPLE = `bind "MOUSE5" "+use"`;

const BUY_BINDS_FULL = `// Defuser + armor + util (CT save)
bind "kp_0" "buy defuser; buy vesthelm;"

// Full T economy round
bind "kp_1" "buy ak47; buy vesthelm; buy hegrenade; buy smokegrenade; buy flashbang; buy flashbang;"

// Full CT economy round
bind "kp_2" "buy m4a1; buy vesthelm; buy hegrenade; buy smokegrenade; buy flashbang; buy flashbang;"

// AWP + sidearm setup
bind "kp_3" "buy awp; buy vesthelm; buy flashbang; buy smokegrenade;"

// Armor + util only (force)
bind "kp_4" "buy vesthelm; buy hegrenade; buy flashbang; buy smokegrenade;"

// Deagle + armor (force-buy round)
bind "kp_5" "buy deagle; buy vesthelm;"

// Just armor
bind "kp_6" "buy vesthelm;"

// SMG round
bind "kp_7" "buy mp9; buy vesthelm; buy flashbang;"  // CT
bind "kp_8" "buy mac10; buy vesthelm; buy flashbang;" // T`;

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'CS2 Plant Bomb Bind and Buy Binds Setup',
  description:
    'Step-by-step guide for binding the bomb plant to a key in CS2, plus a complete copy-paste buy bind generator for typical T-side and CT-side economy rounds.',
  datePublished: '2026-05-15',
  dateModified: '2026-06-21',
  author: {
    '@type': 'Organization',
    name: 'CS2 Practice',
    url: 'https://www.cs2practice.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'CS2 Practice',
    url: 'https://www.cs2practice.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.cs2practice.com/logo-512.png',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.cs2practice.com/commands/plant-bomb-bind',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the CS2 plant bomb bind command?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use bind "MOUSE5" "+use" for a simple plant bind. Replace MOUSE5 with another key such as V, C, or MOUSE3.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I make a CS2 plant bind permanent?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Add the bind to autoexec.cfg and make sure CS2 executes that file when the game starts.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can a plant bomb bind cause a VAC ban?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A normal one-key bind using built-in CS2 console commands is not a cheat and does not modify the game client.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.cs2practice.com/' },
    { '@type': 'ListItem', position: 2, name: 'Commands', item: 'https://www.cs2practice.com/commands' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Plant Bomb Bind',
      item: 'https://www.cs2practice.com/commands/plant-bomb-bind',
    },
  ],
};

function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div className="bg-gray-900 rounded-lg p-4 my-4 border border-gray-800">
      {label && <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide">{label}</div>}
      <div className="flex items-start justify-between gap-3">
        <pre className="text-green-400 text-sm overflow-x-auto flex-1 whitespace-pre-wrap break-all font-mono">
          {code}
        </pre>
        <CopyButton
          text={code}
          trackingEvent="copy_command"
          trackingParams={{ command: 'plant-bomb-bind' }}
        />
      </div>
    </div>
  );
}

export default function PlantBombBindPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Header />

      <main className="flex-1 py-12 px-4">
        <article className="container mx-auto max-w-3xl">
          <nav className="mb-6 text-sm">
            <Link href="/commands" className="text-gray-400 hover:text-white">
              Commands
            </Link>
            <span className="text-gray-600 mx-2">/</span>
            <span className="text-white">Plant Bomb & Buy Binds</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              CS2 Plant Bomb Bind: Copy-Paste Command
            </h1>
            <p className="text-gray-400 text-lg">
              Bind planting to MOUSE5, V, C, or another key. Start with the one-line command below,
              then use the safer alias version if you want planting to release attack automatically.
            </p>
          </header>

          <div className="prose-invert text-gray-300 space-y-8">
            <section className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
                Short answer
              </p>
              <p className="mt-2 text-white">
                Open the CS2 console and paste <code className="rounded bg-gray-950 px-2 py-1 text-green-400">bind &quot;MOUSE5&quot; &quot;+use&quot;</code>.
                Replace MOUSE5 with your preferred key.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Plant bomb bind (copy this)</h2>
              <CodeBlock code={PLANT_BIND} label="Recommended — won't accidentally shoot" />
              <p>
                That hooks the side mouse button (MOUSE5) to a plant action. The alias releases
                left-click while pressing use, so you can&apos;t accidentally shoot the bomb out of
                your hand while planting. Most pros set this up specifically for clutch rounds where
                you&apos;re holding an angle and need to plant without un-aiming.
              </p>
              <p className="mt-3">
                Don&apos;t have a side mouse button? Use{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">mouse3</code>{' '}
                (scroll click), <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">v</code>, or{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">c</code>. Avoid the
                jumpthrow key — having both on the same button gets messy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Simpler version (no alias)</h2>
              <CodeBlock code={PLANT_BIND_SIMPLE} label="One-line, but can shoot if you forget to release attack" />
              <p>
                If you don&apos;t want the alias complication, just bind a key to{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">+use</code>. This is
                what the default E key does too. The trade-off: if you&apos;re holding left-click on
                a gun when you press it, the gun keeps firing while you plant, which can give your
                position away.
              </p>
              <p className="mt-3">
                The alias version above prevents that. For ranked above MGE, take the extra two
                lines.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Full numpad buy binds (copy-paste)</h2>
              <p>
                The other half of why people set up plant binds: numpad buy binds. One key per
                typical buy, so the first 8 seconds of the round are spent looking at the map
                instead of clicking through a buy menu.
              </p>
              <CodeBlock code={BUY_BINDS_FULL} label="Full numpad mapping (T and CT)" />
              <p className="mt-3">A few notes:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">buy vesthelm</code>{' '}
                  buys both kevlar and helmet if you have $1000+, kevlar only if you have $650-999.
                  Don&apos;t need a separate &ldquo;just kevlar&rdquo; bind.
                </li>
                <li>
                  The semicolons matter. Each command runs in order, so put the gun first
                  (you&apos;ll always afford it) and utility last (skipped if you&apos;re short).
                </li>
                <li>
                  Buys silently fail if you&apos;re outside the buy zone, out of money, or out of
                  the buy time. They don&apos;t throw errors. So missing a buy usually means you
                  ran a round-1 bind on round 2 with less cash.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Put everything in autoexec.cfg</h2>
              <p>
                A bind typed straight into the console resets when CS2 restarts. To make the plant
                bind and buy binds permanent, drop them into your{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">autoexec.cfg</code> file.{' '}
                <Link href="/commands/bind-say-message#permanent" className="text-blue-400 hover:underline">
                  Here&apos;s how to make autoexec.cfg if you don&apos;t have one yet
                </Link>
                .
              </p>
              <p className="mt-3">
                Most pros&apos; configs are 30-60 lines of binds. You don&apos;t need to start with
                that much — the plant bind, the buy binds, a{' '}
                <Link href="/commands/jumpthrow-bind" className="text-blue-400 hover:underline">
                  jumpthrow
                </Link>
                , and 2-3{' '}
                <Link href="/commands/bind-say-message" className="text-blue-400 hover:underline">
                  chat callouts
                </Link>{' '}
                is plenty for ranked.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">When the plant bind doesn&apos;t work</h2>
              <ol className="list-decimal pl-6 space-y-3 mt-3">
                <li>
                  <strong className="text-white">You&apos;re not in the bomb zone.</strong> The bind
                  only invokes <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">+use</code>; it can&apos;t
                  override the requirement that you actually be on the target site. Listen for the
                  &ldquo;you&apos;re in the bomb zone&rdquo; chime before pressing it.
                </li>
                <li>
                  <strong className="text-white">You&apos;re moving.</strong> Planting requires
                  standing still. If you&apos;re strafing for an off-angle plant, you have to fully
                  stop first. The bind doesn&apos;t help with that.
                </li>
                <li>
                  <strong className="text-white">Your buy bind fires the wrong gun.</strong> Check
                  your team in CS2 (T or CT). Buy commands like{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">buy ak47</code> silently fail if
                  you&apos;re on CT (and vice versa for M4). Have separate T and CT buy binds, or use
                  the universal versions Valve added (<code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">buy
                  rifle</code> picks the team-appropriate weapon).
                </li>
                <li>
                  <strong className="text-white">Legality.</strong> Plant and buy binds are vanilla
                  CS2 features. Pros use them in every official tournament. They will not get you
                  VAC-banned.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">What to bind next</h2>
              <p>
                The two binds that pair well with plant and buy binds:{' '}
                <Link href="/commands/jumpthrow-bind" className="text-blue-400 hover:underline">
                  jumpthrow
                </Link>{' '}
                (pixel-consistent smoke lineups, especially for the lurker who throws map smokes from
                spawn) and a{' '}
                <Link href="/commands/scroll-wheel-jump-bind" className="text-blue-400 hover:underline">
                  scroll wheel jump
                </Link>{' '}
                (for surf-style bhops and getting up to off-angle plant spots like the Mirage
                window).
              </p>
              <p className="mt-3">
                Want to copy a full pro config? The{' '}
                <Link href="/pro" className="text-blue-400 hover:underline">
                  pro player database
                </Link>{' '}
                has 30 setups including their binds, mouse, monitor and exact in-game settings.
              </p>
            </section>

            <section className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-6">
              <h2 className="text-2xl font-bold text-white">Warm up before your next match</h2>
              <p className="mt-2 text-gray-300">
                Run the 90-second quick warm-up after changing binds so the new key does not distract
                you during the first live round.
              </p>
              <TrackedLink
                href="/play/quick-warmup"
                eventName="content_to_training_click"
                eventParams={{ source_page: 'plant_bomb_bind', destination: 'quick_warmup' }}
                className="mt-4 inline-flex rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-purple-500"
              >
                Start the 90-second warm-up
              </TrackedLink>
            </section>
          </div>

          <aside className="mt-16 pt-8 border-t border-gray-800">
            <h2 className="text-lg font-bold text-white mb-4">Related commands</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/commands/jumpthrow-bind" className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors block">
                <h3 className="font-bold text-white mb-1">Jumpthrow bind</h3>
                <p className="text-sm text-gray-400">Consistent smoke and grenade lineups.</p>
              </Link>
              <Link href="/commands/scroll-wheel-jump-bind" className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors block">
                <h3 className="font-bold text-white mb-1">Scroll wheel jump bind</h3>
                <p className="text-sm text-gray-400">Bunny hop and consistent strafe jumps.</p>
              </Link>
              <Link href="/commands/bind-say-message" className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors block">
                <h3 className="font-bold text-white mb-1">Bind a chat message</h3>
                <p className="text-sm text-gray-400">Tactical callouts on a single key.</p>
              </Link>
            </div>
          </aside>
        </article>
      </main>
    </div>
  );
}
