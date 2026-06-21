import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import CopyButton from '@/components/ui/CopyButton';

export const metadata: Metadata = {
  title: 'CS2 Scroll Wheel Jump Bind (Bunny Hop Setup, 2026)',
  description:
    'Bind jump to your mouse scroll wheel for bunny-hop strafe jumps and consistent jumpthrows in CS2. Up, down, or both — works on Valve official matchmaking and Premier.',
  keywords: [
    'how to bind jump to scroll wheel cs2',
    'how to bind scroll wheel to jump cs2',
    'cs2 scroll wheel jump bind',
    'cs2 bunny hop bind',
    'cs2 mwheelup jump',
    'bhop bind cs2',
    'scroll wheel bunny hop cs2',
  ],
  alternates: { canonical: '/commands/scroll-wheel-jump-bind' },
  openGraph: {
    title: 'CS2 Scroll Wheel Jump Bind — Bunny Hop Setup',
    description:
      'The scroll wheel jump bind every CS2 player uses for bunny hopping and consistent strafe jumps. Up, down, or both — fully legal on Valve matchmaking.',
    url: '/commands/scroll-wheel-jump-bind',
    type: 'article',
  },
};

const BIND_UP = 'bind "mwheelup" "+jump"';
const BIND_DOWN = 'bind "mwheeldown" "+jump"';
const BIND_BOTH = `bind "mwheelup" "+jump"
bind "mwheeldown" "+jump"`;
const BIND_SPACE_TOO = `bind "space" "+jump"
bind "mwheelup" "+jump"
bind "mwheeldown" "+jump"`;

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'CS2 Scroll Wheel Jump Bind (Bunny Hop Setup)',
  description:
    'Step-by-step guide for binding jump to the mouse scroll wheel in CS2, including bunny hop usage, jumpthrow pairing, autoexec setup, and matchmaking legality.',
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
    '@id': 'https://www.cs2practice.com/commands/scroll-wheel-jump-bind',
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
      name: 'Scroll Wheel Jump Bind',
      item: 'https://www.cs2practice.com/commands/scroll-wheel-jump-bind',
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
          trackingParams={{ command: 'scroll-wheel-jump-bind' }}
        />
      </div>
    </div>
  );
}

export default function ScrollWheelJumpBindPage() {
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
            <span className="text-white">Scroll Wheel Jump Bind</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              CS2 Scroll Wheel Jump Bind (Bunny Hop Setup)
            </h1>
            <p className="text-gray-400 text-lg">
              Bind jump to the scroll wheel so you can mash it during bunny hops and never miss the
              jump frame. Three variants and the autoexec setup for permanent use.
            </p>
          </header>

          <div className="prose-invert text-gray-300 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Pick your variant</h2>
              <p>
                Three common setups depending on how aggressive you want the bind:
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-2">Scroll up only (the conservative pick)</h3>
              <CodeBlock code={BIND_UP} label="Wheel up = jump" />
              <p>
                Hooks scroll-up to jump. Spacebar stays as your normal jump. This is the setup most
                CS players land on because scrolling down still scrolls weapon selection like normal.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-2">Scroll down only</h3>
              <CodeBlock code={BIND_DOWN} label="Wheel down = jump" />
              <p>
                Same idea, opposite direction. Personal preference — some players find scrolling
                down more ergonomic with their thumb.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-2">Both directions (the bhop pick)</h3>
              <CodeBlock code={BIND_BOTH} label="Both directions = jump" />
              <p>
                Both wheel directions trigger jump. Now you can spam the wheel in either direction
                during a bunny hop and almost every flick will register a jump. This is what most
                players who actually bhop competitively use. The trade-off is you lose scroll-based
                weapon switching, so you&apos;ll need to use number keys 1/2/3 for weapon select.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Why this bind exists</h2>
              <p>
                CS2&apos;s jump mechanic only registers if you press jump on a specific frame — the
                tick where you&apos;re still on the ground after the previous land. Miss that frame
                and you stand still for a millisecond before the next jump, which is enough to
                completely kill bunny-hop momentum.
              </p>
              <p className="mt-3">
                The scroll wheel solves this by giving you ~10 jump presses in the time it takes to
                press spacebar once. Doesn&apos;t matter that 9 of them miss the frame; the one that
                catches it makes your hop succeed. The bind is the difference between landing a
                consistent surf-style movement and standing still like a target dummy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Keep spacebar too</h2>
              <CodeBlock code={BIND_SPACE_TOO} label="Recommended — both options available" />
              <p>
                There&apos;s no reason to remove spacebar. Keep it as the default jump for normal
                play, and use the wheel only when you specifically need bunny hops, jumpthrows, or
                tricky elevation jumps like the boost spot on Mirage palace.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Put it in autoexec.cfg</h2>
              <p>
                Console binds disappear when CS2 restarts. To make the scroll wheel jump permanent,
                add it to your{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">autoexec.cfg</code>.{' '}
                <Link href="/commands/bind-say-message#permanent" className="text-blue-400 hover:underline">
                  Full autoexec.cfg setup is here
                </Link>{' '}
                if you don&apos;t have one yet.
              </p>
              <p className="mt-3">
                One line of bind, save the file, restart CS2 once, and your scroll wheel is jump
                from the main menu onwards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">How to use it for bunny hopping</h2>
              <ol className="list-decimal pl-6 space-y-2 mt-3">
                <li>
                  Hold W to start moving forward, then strafe A or D to angle 45° to one side.
                </li>
                <li>
                  Jump (spacebar or wheel) and, while in the air, swap the strafe direction (W +
                  opposite strafe).
                </li>
                <li>
                  As you land, spam the scroll wheel. The next jump fires the moment you touch
                  ground.
                </li>
                <li>Repeat 3-5 times to maintain momentum.</li>
              </ol>
              <p className="mt-4">
                Don&apos;t try to bhop in ranked rounds without practice. You&apos;ll slip off
                ledges and lose 1v1s standing still. Practice on{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">kz_</code> community
                maps first, then bring the technique back into ranked once it&apos;s muscle memory.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">For jumpthrows specifically</h2>
              <p>
                The scroll wheel jump is also useful for setting up{' '}
                <Link href="/commands/jumpthrow-bind" className="text-blue-400 hover:underline">
                  jumpthrows
                </Link>{' '}
                on tricky elevation lineups. Some Mirage smokes require jumping from a specific
                bench or window ledge, and the wheel makes hitting the exact frame much easier than
                spacebar timing.
              </p>
              <p className="mt-3">
                Pros usually have both binds: a dedicated jumpthrow on a side mouse button (for the
                pin-release combo) and a scroll wheel jump (for the elevation start).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Troubleshooting</h2>
              <ol className="list-decimal pl-6 space-y-3 mt-3">
                <li>
                  <strong className="text-white">Bind doesn&apos;t fire.</strong> The most common
                  cause is the in-game settings menu re-binding scroll wheel to something else (like
                  weapon select). Check Settings → Keyboard / Mouse and unbind any default scroll
                  wheel actions.
                </li>
                <li>
                  <strong className="text-white">Bunny hop still fails.</strong> The bind helps with
                  the jump frame, but you also need to strafe-mouse-look correctly. If you&apos;re
                  jumping with the wheel and still losing speed, the issue is your air-strafing, not
                  the bind. Watch a kz_ tutorial.
                </li>
                <li>
                  <strong className="text-white">Worried about VAC.</strong> Don&apos;t be. Scroll
                  wheel jump is a vanilla CS2 keybind. Pros use it. It works on Valve official
                  matchmaking, Premier, FaceIt, every server. Anti-cheat systems target the{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_autobunnyhopping 1</code>{' '}
                  cheat command (which only works with{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_cheats 1</code>{' '}
                  on private servers), not standard binds.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">What to bind next</h2>
              <p>
                The two binds that pair best with scroll wheel jump:{' '}
                <Link href="/commands/jumpthrow-bind" className="text-blue-400 hover:underline">
                  jumpthrow
                </Link>{' '}
                (for grenade lineups, often combined with a wheel-start) and{' '}
                <Link href="/commands/plant-bomb-bind" className="text-blue-400 hover:underline">
                  plant bomb on a mouse button
                </Link>{' '}
                (so you can plant from off-angles without un-aiming). All three together cover the
                core mobility and clutch binds pros run.
              </p>
              <p className="mt-3">
                See{' '}
                <Link href="/pro" className="text-blue-400 hover:underline">
                  30 pro player configs
                </Link>{' '}
                for the full bind setups people actually use in tier-1 matches.
              </p>
            </section>
          </div>

          <aside className="mt-16 pt-8 border-t border-gray-800">
            <h2 className="text-lg font-bold text-white mb-4">Related commands</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/commands/jumpthrow-bind" className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors block">
                <h3 className="font-bold text-white mb-1">Jumpthrow bind</h3>
                <p className="text-sm text-gray-400">Consistent smoke and grenade lineups.</p>
              </Link>
              <Link href="/commands/plant-bomb-bind" className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors block">
                <h3 className="font-bold text-white mb-1">Plant bomb bind</h3>
                <p className="text-sm text-gray-400">Never miss the plant click in a clutch.</p>
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
