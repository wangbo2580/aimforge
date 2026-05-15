import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { commands } from '@/data/commands';

export const metadata: Metadata = {
  title: 'CS2 Commands & Binds — Copy-Paste Setups for Console and Autoexec',
  description:
    'Practical CS2 bind and console command guides. Jumpthrow, plant bomb, scroll wheel jump, chat callouts — copy-paste setups with autoexec instructions and pro usage notes.',
  keywords: [
    'cs2 commands',
    'cs2 binds',
    'cs2 console commands',
    'cs2 bind generator',
    'cs2 autoexec',
    'cs2 keybinds',
    'cs2 practice commands',
  ],
  alternates: { canonical: '/commands' },
  openGraph: {
    title: 'CS2 Commands & Binds Hub',
    description:
      'Copy-paste CS2 binds for jumpthrow, plant bomb, scroll wheel jump and chat callouts. Autoexec setup included.',
    url: '/commands',
    type: 'website',
  },
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: commands.map((cmd, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    url: `https://www.cs2practice.com/commands/${cmd.slug}`,
    name: cmd.title,
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.cs2practice.com/' },
    { '@type': 'ListItem', position: 2, name: 'Commands', item: 'https://www.cs2practice.com/commands' },
  ],
};

const categoryLabels: Record<string, { label: string; color: string }> = {
  bind: { label: 'Bind', color: 'bg-blue-600/20 text-blue-400' },
  console: { label: 'Console', color: 'bg-purple-600/20 text-purple-400' },
  practice: { label: 'Practice', color: 'bg-green-600/20 text-green-400' },
};

const difficultyLabels: Record<string, { label: string; color: string }> = {
  beginner: { label: 'Beginner', color: 'text-green-400' },
  intermediate: { label: 'Intermediate', color: 'text-yellow-400' },
  advanced: { label: 'Advanced', color: 'text-orange-400' },
};

export default function CommandsHubPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-3">CS2 Commands &amp; Binds</h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Copy-paste configs for the binds every CS2 player ends up making. Jumpthrow, plant
              bomb, scroll wheel jump, chat callouts — each page is a single command done well, with
              autoexec instructions so it survives a restart.
            </p>
          </header>

          {/* Commands Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {commands.map((cmd) => {
              const cat = categoryLabels[cmd.category] ?? categoryLabels.bind;
              const diff = difficultyLabels[cmd.difficulty] ?? difficultyLabels.beginner;
              return (
                <Link
                  key={cmd.slug}
                  href={`/commands/${cmd.slug}`}
                  className="group bg-gray-800 rounded-2xl p-6 hover:ring-2 hover:ring-blue-500 transition-all hover:bg-gray-750 block"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${cat.color}`}>
                      {cat.label}
                    </span>
                    <span className={`text-xs font-medium ${diff.color}`}>
                      {diff.label}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                    {cmd.title}
                  </h2>
                  <p className="text-gray-400 text-sm">{cmd.description}</p>
                </Link>
              );
            })}
          </div>

          {/* SEO Content */}
          <article className="border-t border-gray-800 pt-12 text-gray-300 space-y-8 max-w-3xl">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Why binds matter (and which ones actually do)</h2>
              <p>
                CS2 has hundreds of console commands and bindable keys. Most of them are noise.
                The four pages here cover the binds that real CS2 players make within their first 50
                hours — the ones every pro config includes and that fix specific real problems in
                ranked play.
              </p>
              <p className="mt-3">
                The pattern: each bind solves a timing or muscle-memory problem that you can&apos;t
                solve by being more careful. A jumpthrow makes a smoke land in the exact same pixel
                every time, because your hand can&apos;t. A plant bomb bind plants without firing
                your gun, because you can&apos;t hold E and not panic-shoot when someone peeks. A
                scroll wheel jump catches the jump frame your spacebar timing misses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">The four binds most players make first</h2>
              <p>
                In rough order of how much they change your rounds:
              </p>
              <ol className="list-decimal pl-6 space-y-3 mt-3">
                <li>
                  <Link href="/commands/jumpthrow-bind" className="text-blue-400 hover:underline font-medium">
                    Jumpthrow bind
                  </Link>{' '}
                  — the moment your smoke lineups become reliable, your default-plant rounds improve
                  massively. Probably the highest-impact single bind in CS2.
                </li>
                <li>
                  <Link href="/commands/plant-bomb-bind" className="text-blue-400 hover:underline font-medium">
                    Plant bomb bind
                  </Link>{' '}
                  — pairs with the numpad buy bind set. Saves you maybe 1-2 lost clutches per ranked
                  session.
                </li>
                <li>
                  <Link href="/commands/scroll-wheel-jump-bind" className="text-blue-400 hover:underline font-medium">
                    Scroll wheel jump
                  </Link>{' '}
                  — for bunny hopping, surf-style escapes, and getting up to off-angle elevation
                  spots without missing the jump frame.
                </li>
                <li>
                  <Link href="/commands/bind-say-message" className="text-blue-400 hover:underline font-medium">
                    Chat message binds
                  </Link>{' '}
                  — lowest mechanical impact but fastest setup. One-keystroke callouts for &ldquo;rotate
                  B&rdquo;, &ldquo;need util&rdquo;, &ldquo;low HP&rdquo; and the obligatory gg.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">All binds work on official matchmaking</h2>
              <p>
                Every bind on these pages uses vanilla CS2 commands. None of them touch{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_cheats 1</code>{' '}
                or any of the practice-only commands that get gated to private servers. They&apos;re
                legal on Valve official matchmaking, Premier, FaceIt, ESEA, and every pro tournament.
                Pros use them. You won&apos;t get VAC-banned.
              </p>
              <p className="mt-3">
                The only matchmaking-restricted commands are the practice helpers like{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_grenade_trajectory</code>{' '}
                (shows the path of a thrown grenade) and{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_infinite_ammo</code>.
                Those only work on offline practice with{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_cheats 1</code>.
                Standard binds aren&apos;t in that category.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Pair them with the right sensitivity</h2>
              <p>
                Binds compensate for timing problems. They don&apos;t fix aim. If your spray
                transfer is bad because your sensitivity is too high, no bind will save you — start
                with the{' '}
                <Link href="/tools/sensitivity-converter" className="text-blue-400 hover:underline">
                  sensitivity converter
                </Link>{' '}
                or copy a{' '}
                <Link href="/pro" className="text-blue-400 hover:underline">
                  pro player&apos;s full config
                </Link>{' '}
                instead.
              </p>
              <p className="mt-3">
                And once you have the binds and the sensitivity dialed in, the gap left is raw
                mechanics. The{' '}
                <Link href="/play" className="text-blue-400 hover:underline">
                  aim trainer
                </Link>{' '}
                covers that side.
              </p>
            </section>
          </article>
        </div>
      </main>
    </div>
  );
}
