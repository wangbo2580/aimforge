import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { commands } from '@/data/commands';
import TrackedLink from '@/components/ui/TrackedLink';

export const metadata: Metadata = {
  title: 'CS2 Commands & Binds — Copy-Paste Setups for Console and Autoexec',
  description:
    'Practical CS2 bind and console command guides. Jumpthrow, plant bomb, scroll wheel jump, fps_max, bhop, noclip, ESP and the full sv_cheats list — copy-paste setups with autoexec instructions and pro usage notes.',
  keywords: [
    'cs2 commands',
    'cs2 binds',
    'cs2 console commands',
    'cs2 bind generator',
    'cs2 autoexec',
    'cs2 keybinds',
    'cs2 practice commands',
    'cs2 sv_cheats',
    'cs2 bhop commands',
  ],
  alternates: { canonical: '/commands' },
  openGraph: {
    title: 'CS2 Commands & Binds Hub',
    description:
      'Copy-paste CS2 binds and console commands — jumpthrow, plant bomb, scroll wheel jump, bhop, noclip, ESP, fps_max, sv_cheats list. Autoexec setup included.',
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
  const legalCommands = commands.filter((command) =>
    ['jumpthrow-bind', 'plant-bomb-bind', 'scroll-wheel-jump-bind', 'fps-max-bind', 'bind-say-message'].includes(command.slug)
  );
  const practiceCommands = commands.filter((command) =>
    ['cheats-commands-list', 'noclip-bind', 'bhop-console', 'esp-command-practice'].includes(command.slug)
  );

  const renderCommandCard = (cmd: (typeof commands)[number]) => {
    const cat = categoryLabels[cmd.category] ?? categoryLabels.bind;
    const diff = difficultyLabels[cmd.difficulty] ?? difficultyLabels.beginner;
    return (
      <TrackedLink
        key={cmd.slug}
        href={`/commands/${cmd.slug}`}
        eventName="hub_item_click"
        eventParams={{ hub: 'commands', item: cmd.slug, category: cmd.category }}
        className="group block rounded-2xl bg-gray-800 p-6 transition-all hover:bg-gray-700 hover:ring-2 hover:ring-blue-500"
      >
        <div className="mb-3 flex items-center gap-2">
          <span className={`rounded px-2 py-1 text-xs font-medium ${cat.color}`}>{cat.label}</span>
          <span className={`text-xs font-medium ${diff.color}`}>{diff.label}</span>
        </div>
        <h3 className="text-xl font-bold transition-colors group-hover:text-blue-400">{cmd.title}</h3>
        <p className="mt-2 text-sm text-gray-400">{cmd.description}</p>
        <p className="mt-4 text-xs text-gray-500">Target query: {cmd.primaryKeyword}</p>
      </TrackedLink>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-3">CS2 Commands, Binds &amp; Practice Configs</h1>
            <p className="text-gray-400 text-lg max-w-2xl">
              Copy-paste configs for the binds and console commands every CS2 player ends up
              setting. Jumpthrow, plant bomb, scroll wheel jump, fps_max, bhop, noclip, ESP, and the
              full sv_cheats reference — each page is a single command done well, with autoexec
              instructions so it survives a restart.
            </p>
          </header>

          <section className="mb-12 grid gap-4 md:grid-cols-3">
            <TrackedLink
              href="/commands/jumpthrow-bind"
              eventName="hub_path_click"
              eventParams={{ hub: 'commands', path: 'essential_binds' }}
              className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-5 hover:border-blue-400"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-blue-300">Play online</span>
              <h2 className="mt-2 text-xl font-bold text-white">Matchmaking-legal binds</h2>
              <p className="mt-2 text-sm text-gray-400">Jumpthrow, plant, scroll jump, FPS cap, and chat binds.</p>
            </TrackedLink>
            <TrackedLink
              href="/commands/cheats-commands-list"
              eventName="hub_path_click"
              eventParams={{ hub: 'commands', path: 'practice_server' }}
              className="rounded-xl border border-green-500/30 bg-green-500/10 p-5 hover:border-green-400"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-green-300">Private server</span>
              <h2 className="mt-2 text-xl font-bold text-white">Practice commands</h2>
              <p className="mt-2 text-sm text-gray-400">Noclip, grenade trajectory, bhop, infinite ammo, and visibility.</p>
            </TrackedLink>
            <TrackedLink
              href="/play/quick-warmup"
              eventName="content_to_training_click"
              eventParams={{ source_page: 'commands_hub', destination: 'quick_warmup' }}
              className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-5 hover:border-purple-400"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-purple-300">Mechanics</span>
              <h2 className="mt-2 text-xl font-bold text-white">Warm up after setup</h2>
              <p className="mt-2 text-sm text-gray-400">Commands improve repetition; the 90-second routine prepares your aim.</p>
            </TrackedLink>
          </section>

          <section className="mb-12">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">Official servers</p>
              <h2 className="mt-1 text-2xl font-bold text-white">Essential CS2 binds</h2>
              <p className="mt-2 text-sm text-gray-400">Safe for Premier, Competitive, FaceIt, and normal matchmaking.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">{legalCommands.map(renderCommandCard)}</div>
          </section>

          <section className="mb-16">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-green-300">Private servers only</p>
              <h2 className="mt-1 text-2xl font-bold text-white">Practice-server commands</h2>
              <p className="mt-2 text-sm text-gray-400">These require server control or `sv_cheats 1`; they do not work in matchmaking.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">{practiceCommands.map(renderCommandCard)}</div>
          </section>

          {/* SEO Content */}
          <article className="border-t border-gray-800 pt-12 text-gray-300 space-y-8 max-w-3xl">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Two kinds of commands: matchmaking-legal and practice-only</h2>
              <p>
                CS2 has hundreds of console commands. They split cleanly into two groups, and which
                group a command lives in changes everything about how you use it.
              </p>
              <p className="mt-3">
                <strong className="text-white">Matchmaking-legal binds</strong> are the ones every
                pro config includes. Jumpthrow, plant bomb, scroll wheel jump, chat callouts,
                fps_max — they use vanilla CS2 commands, work on Premier, Competitive, FaceIt, ESEA
                and pro tournaments, and you can put them in your autoexec to survive a restart.
                They fix timing and muscle-memory problems your hands can&apos;t solve.
              </p>
              <p className="mt-3">
                <strong className="text-white">Practice-only commands</strong> require{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_cheats 1</code>{' '}
                and only run on private servers. Noclip, bhop, ESP, infinite ammo, grenade
                trajectory. Useless in real games, but the fastest way to learn lineups, off-angles,
                and movement tech is on a practice server with these enabled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">The binds most players set up first</h2>
              <p>
                Rough order of how much they change your rounds:
              </p>
              <ol className="list-decimal pl-6 space-y-3 mt-3">
                <li>
                  <Link href="/commands/jumpthrow-bind" className="text-blue-400 hover:underline font-medium">
                    Jumpthrow bind
                  </Link>{' '}
                  — pixel-consistent smoke lineups. Probably the highest-impact single bind in CS2.
                </li>
                <li>
                  <Link href="/commands/plant-bomb-bind" className="text-blue-400 hover:underline font-medium">
                    Plant bomb bind
                  </Link>{' '}
                  — never miss the plant in a 1v1 retake. Pairs with full buy binds.
                </li>
                <li>
                  <Link href="/commands/scroll-wheel-jump-bind" className="text-blue-400 hover:underline font-medium">
                    Scroll wheel jump
                  </Link>{' '}
                  — catches the jump frame spacebar timing misses. Required for bhop too.
                </li>
                <li>
                  <Link href="/commands/fps-max-bind" className="text-blue-400 hover:underline font-medium">
                    fps_max setup
                  </Link>{' '}
                  — cap your frame rate to your monitor refresh, uncap it for benchmarks. Quietly
                  fixes screen tearing and input judder.
                </li>
                <li>
                  <Link href="/commands/bind-say-message" className="text-blue-400 hover:underline font-medium">
                    Chat message binds
                  </Link>{' '}
                  — one-keystroke callouts for &ldquo;rotate B&rdquo;, &ldquo;need util&rdquo;, end-of-match
                  gg.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Practice-server commands (sv_cheats 1)</h2>
              <p>
                For learning the map and lineups on a private server with bots:
              </p>
              <ul className="list-disc pl-6 space-y-3 mt-3">
                <li>
                  <Link href="/commands/cheats-commands-list" className="text-blue-400 hover:underline font-medium">
                    Full sv_cheats commands list
                  </Link>{' '}
                  — the master reference. Buddha (replaces god), noclip, infinite ammo, impact
                  markers, grenade trajectory, the lot.
                </li>
                <li>
                  <Link href="/commands/noclip-bind" className="text-blue-400 hover:underline font-medium">
                    Noclip bind
                  </Link>{' '}
                  — fly through walls to learn smoke lineups 5x faster. Pair with grenade trajectory
                  and rethrow for a tight feedback loop.
                </li>
                <li>
                  <Link href="/commands/bhop-console" className="text-blue-400 hover:underline font-medium">
                    Bhop console commands
                  </Link>{' '}
                  — sv_enablebunnyhopping, sv_staminajumpcost, sv_airaccelerate. Default-speed and
                  unrestricted presets.
                </li>
                <li>
                  <Link href="/commands/esp-command-practice" className="text-blue-400 hover:underline font-medium">
                    ESP / see-through-walls
                  </Link>{' '}
                  — <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">ent_skeleton</code>{' '}
                  is the CS2 replacement for the old r_drawothermodels 2. Use it to drill off-angle
                  pre-aim.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">CS2 removed some classic commands. Here&apos;s the new equivalents.</h2>
              <p>
                If you searched for a wallhack or god-mode command and the console said &ldquo;Unknown
                command&rdquo;, that&apos;s because Source 2 deleted a handful of CS:GO-era commands.
                Replacements:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">god</code> →{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">buddha 1</code>{' '}
                  (you take damage but don&apos;t die)
                </li>
                <li>
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">r_drawothermodels 2</code> →{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">ent_skeleton</code>{' '}
                  or <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">toggle r_aoproxy_show 0 1</code>
                </li>
                <li>
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">enable_skeleton_draw</code>{' '}
                  → also <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">ent_skeleton</code>
                </li>
              </ul>
              <p className="mt-3">
                The{' '}
                <Link href="/commands/cheats-commands-list" className="text-blue-400 hover:underline">
                  sv_cheats list
                </Link>{' '}
                page goes through each removed-and-replaced pair with the current syntax.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">All matchmaking-legal binds work on official servers</h2>
              <p>
                Every bind under the &ldquo;set up first&rdquo; section uses vanilla CS2 commands. None of
                them touch{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_cheats 1</code>{' '}
                or any of the practice-only commands. They&apos;re legal on Valve official
                matchmaking, Premier, FaceIt, ESEA, and every pro tournament. Pros use them. You
                won&apos;t get VAC-banned.
              </p>
              <p className="mt-3">
                The practice-server commands (noclip, bhop, ESP, full sv_cheats list) are blocked
                server-side on matchmaking — the flags are locked to 0, so trying to use them
                silently does nothing rather than triggering a ban. They&apos;re tools Valve
                explicitly provides for learning the map.
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
