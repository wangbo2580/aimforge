import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import CopyButton from '@/components/ui/CopyButton';

export const metadata: Metadata = {
  title: 'How to Bind a Chat Message to a Key in CS2 (Step-by-Step)',
  description:
    'Bind any chat message to any key in CS2. Plant calls, smoke reminders, end-of-match GG — one keystroke away. Copy-paste setup with autoexec instructions and troubleshooting.',
  keywords: [
    'how to bind a keybind to a message cs2',
    'cs2 bind say message',
    'cs2 chat bind',
    'bind say_team cs2',
    'cs2 message bind',
    'cs2 keybind chat',
    'autoexec cs2 say',
  ],
  alternates: { canonical: '/commands/bind-say-message' },
  openGraph: {
    title: 'CS2 Bind a Chat Message to a Key — Full Setup Guide',
    description:
      'Hook any phrase ("Smoke A!", "Plant default", "gg wp") to any key. Console one-liner, autoexec for permanent use, plus the gotchas Notepad introduces.',
    url: '/commands/bind-say-message',
    type: 'article',
  },
};

const QUICK_BIND = 'bind "f1" "say_team Smoke incoming!"';

const AUTOEXEC_EXAMPLE = `bind "f1" "say Plant the bomb!"
bind "f2" "say_team Smoke A!"
bind "f3" "say_team Need utility"`;

const TACTICAL_BINDS = `bind "f1" "say_team Rotate B"
bind "f2" "say_team Smoke A"
bind "f3" "say_team Flash main"
bind "f4" "say_team I'm low HP"`;

const POSTPLANT_BINDS = `bind "f5" "say_team Plant default A"
bind "f6" "say_team Plant for cross"`;

const GG_BIND = 'bind "kp_enter" "say gg wp"';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'How to Bind a Chat Message to a Key in CS2',
  description:
    'Step-by-step guide for binding chat messages to any key in CS2, including console one-liners, autoexec.cfg setup, and common troubleshooting.',
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
    '@id': 'https://www.cs2practice.com/commands/bind-say-message',
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
      name: 'Bind a Chat Message to a Key',
      item: 'https://www.cs2practice.com/commands/bind-say-message',
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
          trackingParams={{ command: 'bind-say-message' }}
        />
      </div>
    </div>
  );
}

export default function BindSayMessagePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />

      <main className="flex-1 py-12 px-4">
        <article className="container mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <Link href="/commands" className="text-gray-400 hover:text-white">
              Commands
            </Link>
            <span className="text-gray-600 mx-2">/</span>
            <span className="text-white">Bind a Chat Message</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              How to Bind a Chat Message to a Key in CS2
            </h1>
            <p className="text-gray-400 text-lg">
              Plant calls, smoke reminders, classic end-of-match GG — all one keystroke away.
            </p>
          </header>

          <div className="prose-invert text-gray-300 space-y-8">
            {/* Quick start */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Quick bind (copy this)</h2>
              <CodeBlock code={QUICK_BIND} label="Console one-liner" />
              <p>
                That hooks F1 to a team-only message saying &ldquo;Smoke incoming!&rdquo;. Open the
                console with the <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">~</code>{' '}
                key, paste, press Enter. Done for this session. To make it survive a restart, jump
                down to the <a href="#permanent" className="text-blue-400 hover:underline">autoexec section</a> below.
              </p>
              <p className="mt-3 text-sm text-gray-500">
                Don&apos;t have the console enabled yet? Settings → Game → Enable Developer Console
                → Yes. The <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">~</code>{' '}
                key opens it (the one above Tab).
              </p>
            </section>

            {/* Syntax */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">The bind syntax</h2>
              <p>The pattern is always the same:</p>
              <CodeBlock code={`bind "[key]" "[command]"`} label="General format" />
              <p>For chat messages, the command is one of two:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">say</code> —
                  sends to everyone in the match (your team and theirs)
                </li>
                <li>
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">say_team</code> —
                  sends to your team only
                </li>
              </ul>
              <p className="mt-4">
                So <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">bind &quot;f2&quot; &quot;say_team Need backup A!&quot;</code> hooks
                F2 to a team-only callout. <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">bind &quot;kp_5&quot; &quot;say gg&quot;</code> hooks
                numpad-5 to a public &ldquo;gg&rdquo;.
              </p>
              <p className="mt-3">
                Almost any key with a name works: function keys (<code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">f1</code>–
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">f12</code>), letters, mouse buttons
                (<code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">mouse1</code>–
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">mouse5</code>), numpad
                (<code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">kp_0</code>–
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">kp_9</code>,
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">kp_enter</code>), and ones you never
                use anyway like <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">capslock</code> or
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">scrolllock</code>.
              </p>
            </section>

            {/* Permanent setup */}
            <section id="permanent">
              <h2 className="text-2xl font-bold text-white mb-3">Where to put it for permanent use</h2>
              <p>
                A bind typed straight into the console only lasts that game session. Restart CS2 and
                it&apos;s gone. The standard fix is to drop your binds into{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">autoexec.cfg</code>, which CS2 loads
                automatically every time the game starts.
              </p>
              <p className="mt-3">The file lives here:</p>
              <CodeBlock
                code={`Steam\\steamapps\\common\\Counter-Strike Global Offensive\\game\\csgo\\cfg\\autoexec.cfg`}
                label="autoexec.cfg path"
              />
              <p>
                If the folder doesn&apos;t already have an autoexec.cfg, make one. Open Notepad,
                paste your binds, save as <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">autoexec.cfg</code>{' '}
                (set the file type to <em>All Files</em>, not .txt — Notepad will silently append .txt otherwise).
              </p>
              <CodeBlock code={AUTOEXEC_EXAMPLE} label="Example autoexec contents" />
              <p>
                Save, restart CS2, and the binds are live from the main menu onwards. No console
                needed each game.
              </p>
            </section>

            {/* Common use cases */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Common bind ideas</h2>

              <h3 className="text-lg font-semibold text-white mt-6 mb-2">Tactical callouts (the useful ones)</h3>
              <CodeBlock code={TACTICAL_BINDS} />

              <h3 className="text-lg font-semibold text-white mt-6 mb-2">Post-plant setups</h3>
              <CodeBlock code={POSTPLANT_BINDS} />

              <h3 className="text-lg font-semibold text-white mt-6 mb-2">End-of-match GG</h3>
              <CodeBlock code={GG_BIND} label="Sends from the score screen" />
              <p>
                Useful if the round ended while you&apos;re busy rotating and you don&apos;t want to
                miss the GG window.
              </p>

              <p className="mt-6 text-gray-400">
                One warning: don&apos;t go overboard. Bind a dozen messages and you&apos;ll forget
                which key does what mid-clutch, then spam &ldquo;Plant default A&rdquo; while
                defusing on B. Three or four binds you actually remember beats fifteen you
                don&apos;t.
              </p>
            </section>

            {/* Troubleshooting */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">When the bind doesn&apos;t work</h2>
              <p>If you paste the bind and pressing the key does nothing:</p>
              <ol className="list-decimal pl-6 space-y-3 mt-3">
                <li>
                  <strong className="text-white">Check the quotes.</strong> They have to be straight
                  ASCII quotes (<code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">&quot;</code>),
                  not curly &ldquo;smart quotes&rdquo;. Notepad and Word sometimes auto-replace them when
                  you paste, which silently breaks the bind. If you&apos;re editing autoexec.cfg, use
                  Notepad++ or VS Code instead of Word.
                </li>
                <li>
                  <strong className="text-white">Look for a competing keybind.</strong> If F1 is
                  already bound to a CS2 action in the in-game settings menu, your bind gets
                  overwritten when settings load. Re-check after restarting and unbind the conflict.
                </li>
                <li>
                  <strong className="text-white">Make sure the chat command itself works.</strong>{' '}
                  Type <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">say_team test</code> directly
                  in the console. If nothing appears in chat, the server might have chat disabled
                  (rare on Valve official matchmaking, common on some community servers).
                </li>
              </ol>
              <p className="mt-4">
                The bind itself is a vanilla CS2 feature. It works on Valve official matchmaking,
                FaceIt, ESEA, every community server. You don&apos;t need{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_cheats 1</code>{' '}
                and it&apos;s never going to get you VAC-banned.
              </p>
            </section>

            {/* What to bind next */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">What to bind next</h2>
              <p>
                Now that you&apos;ve got messages on keys, the two binds most pros set up next are{' '}
                <Link href="/commands/jumpthrow-bind" className="text-blue-400 hover:underline">
                  jumpthrow
                </Link>{' '}
                (for pixel-perfect smoke and grenade lineups) and{' '}
                <Link href="/commands/plant-bomb-bind" className="text-blue-400 hover:underline">
                  plant bomb on a wheel-down
                </Link>{' '}
                (so you never fumble the plant click in a 1v1 retake). Both have specific quirks
                worth a quick page.
              </p>
              <p className="mt-3">
                Want to see what your favorite pro&apos;s entire config looks like? Their{' '}
                <Link href="/pro" className="text-blue-400 hover:underline">
                  full settings and binds
                </Link>{' '}
                are over in the pro database.
              </p>
            </section>
          </div>

          {/* Related */}
          <aside className="mt-16 pt-8 border-t border-gray-800">
            <h2 className="text-lg font-bold text-white mb-4">Related commands</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/commands/jumpthrow-bind"
                className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors block"
              >
                <h3 className="font-bold text-white mb-1">Jumpthrow bind</h3>
                <p className="text-sm text-gray-400">Consistent smoke and grenade lineups.</p>
              </Link>
              <Link
                href="/commands/plant-bomb-bind"
                className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors block"
              >
                <h3 className="font-bold text-white mb-1">Plant bomb bind</h3>
                <p className="text-sm text-gray-400">Never miss the plant click in a clutch.</p>
              </Link>
              <Link
                href="/commands/scroll-wheel-jump-bind"
                className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors block"
              >
                <h3 className="font-bold text-white mb-1">Scroll wheel jump bind</h3>
                <p className="text-sm text-gray-400">Bunny hop and consistent strafe jumps.</p>
              </Link>
            </div>
          </aside>
        </article>
      </main>
    </div>
  );
}
