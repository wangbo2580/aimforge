import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import CopyButton from '@/components/ui/CopyButton';

export const metadata: Metadata = {
  title: 'CS2 fps_max Bind & Settings: Cap Your Frame Rate the Right Way',
  description:
    'How to bind fps_max in CS2, the right values for different monitor refresh rates, and why uncapped FPS can actually hurt your aim. Plus the bind for menu vs in-game caps.',
  keywords: [
    'how to bind fps max cs2',
    'cs2 fps_max command',
    'cs2 fps max bind',
    'cs2 frame rate cap',
    'cs2 fps menu vs game',
    'fps_max_menu cs2',
  ],
  alternates: { canonical: '/commands/fps-max-bind' },
  openGraph: {
    title: 'CS2 fps_max Bind — Frame Rate Cap That Doesn\'t Hurt Aim',
    description:
      'Bind fps_max in CS2 to swap between menu cap and in-game cap. Plus the right value for your refresh rate and the reason uncapped FPS makes your aim worse.',
    url: '/commands/fps-max-bind',
    type: 'article',
  },
};

const FPS_MAX_BASIC = 'fps_max 400';
const FPS_MAX_MENU = `fps_max 400
fps_max_menu 120`;
const FPS_BIND_TOGGLE = `bind "f6" "incrementvar fps_max 0 999 200"`;
const AUTOEXEC_FULL = `// FPS cap for 240Hz monitors
fps_max 400
fps_max_menu 120

// Quick toggle bind (200 fps step)
bind "f6" "incrementvar fps_max 0 999 200"`;

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'CS2 fps_max Bind & Settings',
  description:
    'How to set and bind the fps_max command in CS2 for stable frame rates, plus the menu cap and the right values per refresh rate.',
  datePublished: '2026-05-18',
  dateModified: '2026-05-18',
  author: {
    '@type': 'Organization',
    name: 'CS2 Practice',
    url: 'https://www.cs2practice.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'CS2 Practice',
    url: 'https://www.cs2practice.com',
    logo: { '@type': 'ImageObject', url: 'https://www.cs2practice.com/logo-512.png' },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.cs2practice.com/commands/fps-max-bind',
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
      name: 'fps_max Bind',
      item: 'https://www.cs2practice.com/commands/fps-max-bind',
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
          trackingParams={{ command: 'fps-max-bind' }}
        />
      </div>
    </div>
  );
}

export default function FpsMaxBindPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />

      <main className="flex-1 py-12 px-4">
        <article className="container mx-auto max-w-3xl">
          <nav className="mb-6 text-sm">
            <Link href="/commands" className="text-gray-400 hover:text-white">Commands</Link>
            <span className="text-gray-600 mx-2">/</span>
            <span className="text-white">fps_max Bind</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              CS2 fps_max Bind &amp; Settings
            </h1>
            <p className="text-gray-400 text-lg">
              How to cap your CS2 frame rate the right way, why uncapped FPS hurts aim, and the
              bind for toggling between high and low caps.
            </p>
          </header>

          <div className="prose-invert text-gray-300 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">The basic command</h2>
              <CodeBlock code={FPS_MAX_BASIC} label="Type into console" />
              <p>
                That caps your in-game frame rate at 400. The default for CS2 is{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">fps_max 400</code>{' '}
                already, so unless you changed it, you don&apos;t need to set it. Where this matters
                is if your PC can actually push 500+ FPS — uncapped, the frame time becomes uneven,
                and the input latency gets worse, not better.
              </p>
              <p className="mt-3">
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">fps_max 0</code>{' '}
                removes the cap entirely. Pros generally don&apos;t do this. Capping at a stable
                number your hardware comfortably exceeds gives smoother frame times and lower
                effective latency than uncapping.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">The right value for your monitor</h2>
              <p>
                The rule of thumb: cap at roughly 3× your monitor&apos;s refresh rate, but only if
                your PC can actually maintain it. Going higher gives diminishing returns.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong className="text-white">60 Hz monitor:</strong>{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">fps_max 240</code> is plenty
                </li>
                <li>
                  <strong className="text-white">144 Hz monitor:</strong>{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">fps_max 400</code> (the default, leave it)
                </li>
                <li>
                  <strong className="text-white">240 Hz monitor:</strong>{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">fps_max 600</code> if your hardware sustains it
                </li>
                <li>
                  <strong className="text-white">360 Hz monitor:</strong>{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">fps_max 800-1000</code>
                </li>
              </ul>
              <p className="mt-4">
                If your PC dips below the cap during fights (smoke + flashes + 5v5 spam), set the
                cap to something your PC clears with headroom even in the worst-case round.
                Stable 300 FPS beats unstable 500-and-occasionally-180.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">The menu cap (saves your GPU)</h2>
              <CodeBlock code={FPS_MAX_MENU} label="Cap in-game at 400, menu at 120" />
              <p>
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">fps_max_menu 120</code>{' '}
                caps the main menu and lobby screens at a low number. Your GPU otherwise renders the
                menu at full speed, which is wasted power and heat for a static screen. 120 is plenty
                smooth for menu navigation.
              </p>
              <p className="mt-3">
                Laptop players especially want this — uncapped menu can hit 800 FPS, run the fan at
                full speed, and warm the chassis for no benefit. Cap the menu, save the battery, the
                in-game cap kicks in once you load a map.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Bind for quick toggle</h2>
              <CodeBlock code={FPS_BIND_TOGGLE} label="F6 cycles fps_max 0 → 200 → 400 → 600 → 800 → 0..." />
              <p>
                Useful for testing the difference yourself. Press F6 a few times during a deathmatch
                round and feel which setting gives you the most stable aim. Most people land on
                somewhere between 300-600.
              </p>
              <p className="mt-3">
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">incrementvar</code>{' '}
                is the CS2 command for cycling a console variable through a range with a fixed step.
                Replace 200 with a smaller number if you want finer steps.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Put it in autoexec.cfg</h2>
              <p>
                Console-typed{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">fps_max</code>{' '}
                actually persists between sessions in CS2 (unlike most binds, which don&apos;t). But
                if you also want the menu cap and a bind on a key, drop everything into{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">autoexec.cfg</code>.
                Path and setup details are on the{' '}
                <Link href="/commands/bind-say-message#permanent" className="text-blue-400 hover:underline">
                  bind say message page
                </Link>
                .
              </p>
              <CodeBlock code={AUTOEXEC_FULL} label="autoexec.cfg block" />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Common questions</h2>

              <h3 className="text-lg font-semibold text-white mt-6 mb-2">Why not just use fps_max 0?</h3>
              <p>
                Uncapped FPS sounds better but creates uneven frame times. Frame 1 takes 1.2ms,
                frame 2 takes 1.8ms, frame 3 takes 0.9ms — your mouse input lands in different
                frame windows, which makes your aim feel inconsistent. A stable cap your PC clears
                gives uniform frame times and a more predictable input pipeline.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-2">Does fps_max affect competitive integrity?</h3>
              <p>
                No.{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">fps_max</code>{' '}
                is a vanilla CS2 command. Pros use it. It works on Valve Premier matchmaking, FaceIt,
                ESEA, every tournament. There&apos;s nothing to worry about VAC-wise.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-2">What about vsync and g-sync?</h3>
              <p>
                vsync should stay off in CS2 — it adds input latency. G-sync / FreeSync is fine if
                your monitor supports it; cap{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">fps_max</code>{' '}
                to ~3 below your refresh rate (so 237 on a 240 Hz monitor) to keep G-sync engaged
                instead of switching to vsync at the high end.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">What to bind next</h2>
              <p>
                Performance settings pair well with{' '}
                <Link href="/commands/scroll-wheel-jump-bind" className="text-blue-400 hover:underline">
                  scroll wheel jump
                </Link>{' '}
                (consistent jump frames depend on stable FPS) and{' '}
                <Link href="/commands/jumpthrow-bind" className="text-blue-400 hover:underline">
                  jumpthrow bind
                </Link>{' '}
                (smoke lineups land slightly different at different frame rates, capping fixes
                inconsistency).
              </p>
              <p className="mt-3">
                Full pro configs including{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">fps_max</code>{' '}
                values are in the{' '}
                <Link href="/pro" className="text-blue-400 hover:underline">
                  pro player database
                </Link>
                .
              </p>
            </section>
          </div>

          <aside className="mt-16 pt-8 border-t border-gray-800">
            <h2 className="text-lg font-bold text-white mb-4">Related commands</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/commands/bhop-console" className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors block">
                <h3 className="font-bold text-white mb-1">bhop console commands</h3>
                <p className="text-sm text-gray-400">Bunny hop on private servers.</p>
              </Link>
              <Link href="/commands/noclip-bind" className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors block">
                <h3 className="font-bold text-white mb-1">noclip bind</h3>
                <p className="text-sm text-gray-400">Free fly for lineup practice.</p>
              </Link>
              <Link href="/commands/cheats-commands-list" className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors block">
                <h3 className="font-bold text-white mb-1">sv_cheats command list</h3>
                <p className="text-sm text-gray-400">Practice-only command reference.</p>
              </Link>
            </div>
          </aside>
        </article>
      </main>
    </div>
  );
}
