import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import CopyButton from '@/components/ui/CopyButton';

export const metadata: Metadata = {
  title: 'CS2 Jumpthrow Bind: One-Key Setup for Consistent Throws',
  description:
    'The jumpthrow bind every pro uses for pixel-consistent smoke and grenade lineups in CS2. Single-key version, two-key version, autoexec setup, and what to do when it stops working.',
  keywords: [
    'cs2 jumpthrow bind',
    'jumpthrow bind cs2',
    'cs2 jump throw bind',
    'how to bind jumpthrow cs2',
    'w how to bind jumpthrow cs2',
    'jump throw bind alias cs2',
    'cs2 nade bind',
  ],
  alternates: { canonical: '/commands/jumpthrow-bind' },
  openGraph: {
    title: 'CS2 Jumpthrow Bind — One-Key Pro Setup',
    description:
      'Get pixel-consistent grenade lineups in CS2. The alias + bind setup every pro uses, plus the two-key version and the autoexec file path so it survives a restart.',
    url: '/commands/jumpthrow-bind',
    type: 'article',
  },
};

const ONE_KEY_BIND = `alias "+jumpthrow" "+jump;-attack;-attack2"
alias "-jumpthrow" "-jump"
bind "MOUSE3" "+jumpthrow"`;

const TWO_KEY_BIND = `alias "+jumpaction" "+jump"
alias "-jumpaction" "-jump"
bind "MOUSE3" "+jumpaction"`;

const AUTOEXEC_FULL = `// Jumpthrow bind — one-key version
alias "+jumpthrow" "+jump;-attack;-attack2"
alias "-jumpthrow" "-jump"
bind "MOUSE3" "+jumpthrow"

// Optional: bind a second key for safety
bind "v" "+jumpthrow"`;

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'CS2 Jumpthrow Bind: One-Key Setup for Consistent Throws',
  description:
    'Step-by-step guide for setting up a jumpthrow bind in CS2. Covers the one-key and two-key alias methods, autoexec.cfg for permanent use, and matchmaking legality.',
  datePublished: '2026-05-15',
  dateModified: '2026-05-15',
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
    '@id': 'https://www.cs2practice.com/commands/jumpthrow-bind',
  },
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
      name: 'Jumpthrow Bind',
      item: 'https://www.cs2practice.com/commands/jumpthrow-bind',
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
          trackingParams={{ command: 'jumpthrow-bind' }}
        />
      </div>
    </div>
  );
}

export default function JumpthrowBindPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />

      <main className="flex-1 py-12 px-4">
        <article className="container mx-auto max-w-3xl">
          <nav className="mb-6 text-sm">
            <Link href="/commands" className="text-gray-400 hover:text-white">
              Commands
            </Link>
            <span className="text-gray-600 mx-2">/</span>
            <span className="text-white">Jumpthrow Bind</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              CS2 Jumpthrow Bind: One-Key Setup for Consistent Throws
            </h1>
            <p className="text-gray-400 text-lg">
              The bind every pro uses to make smoke and grenade lineups land in the exact same spot
              every time.
            </p>
          </header>

          <div className="prose-invert text-gray-300 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">One-key version (copy this)</h2>
              <CodeBlock code={ONE_KEY_BIND} label="Paste into console or autoexec.cfg" />
              <p>
                That hooks MOUSE3 (the scroll wheel click) to a jumpthrow. To use it: pull the
                grenade pin by holding left-click, then press MOUSE3. The bind jumps and releases the
                grenade for you at the exact same point in the jump every single time. Which is the
                whole point — your timing as a human is not consistent enough to land smoke lineups
                without it.
              </p>
              <p className="mt-3">
                MOUSE3 is the most common key for this. If your mouse doesn&apos;t have a scroll
                click, use <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">v</code>,
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">alt</code>, or any
                key that isn&apos;t already mapped to something. Don&apos;t use spacebar — you want
                normal jumping to stay normal.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Why this version (and what the alias does)</h2>
              <p>
                The <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">alias</code>{' '}
                command creates a custom name for a sequence of commands. So{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">+jumpthrow</code>{' '}
                becomes shorthand for &ldquo;jump and release both attack buttons&rdquo;.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">+jump</code> —
                  press the jump key
                </li>
                <li>
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">-attack</code> —
                  release left-click (the grenade flies)
                </li>
                <li>
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">-attack2</code> —
                  release right-click (for the alternative throws like the under-arm short toss)
                </li>
              </ul>
              <p className="mt-4">
                The matching <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">-jumpthrow</code>{' '}
                runs when you release the key and resets the jump state. Both lines are required —
                skip the release and the bind only fires correctly every other press.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Two-key version (the pro variant)</h2>
              <CodeBlock code={TWO_KEY_BIND} label="Jump-only, you release attack manually" />
              <p>
                Some pros prefer a version where the bind only handles the jump, and you release
                left-click yourself. The argument is that your manual timing on the release lets you
                control short-throws vs. long-throws on the same lineup.
              </p>
              <p className="mt-3">
                In practice, the one-key version is more forgiving and works for 95% of lineups. The
                two-key version is for people who already learned grenade timing back in CS:GO and
                want the muscle memory back. If you&apos;re starting fresh, use the one-key.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Put it in autoexec.cfg</h2>
              <p>
                A bind typed into the console only lasts that session. To make it permanent, drop the
                alias and bind into your{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">autoexec.cfg</code>:
              </p>
              <CodeBlock
                code={`Steam\\steamapps\\common\\Counter-Strike Global Offensive\\game\\csgo\\cfg\\autoexec.cfg`}
                label="File path"
              />
              <CodeBlock code={AUTOEXEC_FULL} label="autoexec.cfg contents" />
              <p>
                If you don&apos;t already have one,{' '}
                <Link href="/commands/bind-say-message#permanent" className="text-blue-400 hover:underline">
                  here&apos;s how to make autoexec.cfg
                </Link>
                . Save, restart CS2 once, and the jumpthrow is live forever after.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">How to actually use it on a smoke lineup</h2>
              <ol className="list-decimal pl-6 space-y-2 mt-3">
                <li>Stand at the lineup&apos;s starting position.</li>
                <li>Pull out the smoke (or HE / flash / molotov) with the appropriate key.</li>
                <li>Aim at the lineup target — usually a corner of a roof or a specific pixel.</li>
                <li>
                  <strong className="text-white">Hold left-click to pull the pin.</strong> Don&apos;t
                  release yet.
                </li>
                <li>
                  While still holding left-click, press your jumpthrow key (MOUSE3). The bind
                  releases the grenade at the apex.
                </li>
              </ol>
              <p className="mt-4">
                Most lineup guides assume you have this bind set up. If you watch a pro demo doing a
                Mirage Window smoke and they hold for a beat then click a button, that&apos;s the
                jumpthrow.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">When it doesn&apos;t work</h2>
              <ol className="list-decimal pl-6 space-y-3 mt-3">
                <li>
                  <strong className="text-white">Aliases not loading.</strong> Valve removed the old
                  in-game <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">alias</code> command from
                  the console at one point, then put a version back. If a console-typed alias doesn&apos;t
                  stick, drop it into autoexec.cfg instead and restart — autoexec aliases still work.
                </li>
                <li>
                  <strong className="text-white">Bind fires on the wrong key.</strong> Make sure
                  MOUSE3 (or whatever you chose) isn&apos;t bound to something else in the in-game
                  settings menu. The settings menu binds override your autoexec on load.
                </li>
                <li>
                  <strong className="text-white">Throws inconsistent anyway.</strong> Check
                  you&apos;re actually standing still when you press it. A jumpthrow during a
                  strafe-jump lands somewhere completely different — that&apos;s a separate bind
                  technique called a &ldquo;running jumpthrow&rdquo;.
                </li>
                <li>
                  <strong className="text-white">Worried about VAC.</strong> Don&apos;t be. The
                  jumpthrow bind uses vanilla CS2 commands. It&apos;s legal on Premier, Valve
                  matchmaking, FaceIt, ESEA, and every pro tournament. Most pro configs include it.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">What to bind next</h2>
              <p>
                Two other binds most CS2 players set up after their jumpthrow:{' '}
                <Link href="/commands/scroll-wheel-jump-bind" className="text-blue-400 hover:underline">
                  scroll wheel jump
                </Link>{' '}
                (for bunny-hopping and consistent surf-style jumps) and{' '}
                <Link href="/commands/plant-bomb-bind" className="text-blue-400 hover:underline">
                  plant bomb on a wheel-down
                </Link>{' '}
                (so you never miss the plant in a 1v1 retake). Both pages have copy-paste configs.
              </p>
              <p className="mt-3">
                Want to see the full bind setup pros use? Their{' '}
                <Link href="/pro" className="text-blue-400 hover:underline">
                  complete configs are over in the pro database
                </Link>
                , including jumpthrow keys and full autoexec contents for 30 players.
              </p>
            </section>
          </div>

          <aside className="mt-16 pt-8 border-t border-gray-800">
            <h2 className="text-lg font-bold text-white mb-4">Related commands</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/commands/plant-bomb-bind" className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors block">
                <h3 className="font-bold text-white mb-1">Plant bomb bind</h3>
                <p className="text-sm text-gray-400">Never miss the plant click in a clutch.</p>
              </Link>
              <Link href="/commands/scroll-wheel-jump-bind" className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors block">
                <h3 className="font-bold text-white mb-1">Scroll wheel jump bind</h3>
                <p className="text-sm text-gray-400">Bunny hop and consistent strafe jumps.</p>
              </Link>
              <Link href="/commands/bind-say-message" className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors block">
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
