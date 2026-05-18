import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import CopyButton from '@/components/ui/CopyButton';

export const metadata: Metadata = {
  title: 'CS2 Noclip Bind: Fly Through Maps for Lineup Practice',
  description:
    'Bind noclip to a key in CS2 so you can fly through walls to practice grenade lineups, learn callouts, and set up bot scenarios. Single-key toggle, plus pairings with grenade trajectory and rethrow.',
  keywords: [
    'cs2 noclip bind',
    'noclip bind cs2',
    'cs2 noclip command',
    'bind noclip key cs2',
    'noclip cs2 practice',
    'cs2 fly through walls',
  ],
  alternates: { canonical: '/commands/noclip-bind' },
  openGraph: {
    title: 'CS2 Noclip Bind — Fly to Lineup Spots in Practice',
    description:
      'The console command setup that lets you teleport-fly to any spot on the map. Bind it to a single key, pair it with grenade trajectory, and learn smokes 5x faster.',
    url: '/commands/noclip-bind',
    type: 'article',
  },
};

const QUICK_BIND = `sv_cheats 1
bind "n" "noclip"`;

const PRACTICE_BLOCK = `// Practice server one-liner
sv_cheats 1
mp_warmup_end
mp_freezetime 0
sv_infinite_ammo 1
sv_grenade_trajectory_prac_pipreview 1
sv_grenade_trajectory_time_spectator 4
bind "n" "noclip"
bind "h" "give weapon_hegrenade; give weapon_smokegrenade; give weapon_flashbang; give weapon_molotov; give weapon_decoy"
bind "j" "sv_rethrow_last_grenade"`;

const TOGGLE_VARIANT = `alias "noclip_on" "noclip; alias noclip_toggle noclip_off"
alias "noclip_off" "noclip; alias noclip_toggle noclip_on"
alias "noclip_toggle" "noclip_on"
bind "n" "noclip_toggle"`;

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'CS2 Noclip Bind: Fly Through Maps for Lineup Practice',
  description:
    'Step-by-step setup for binding noclip to a key in CS2. Covers the simple toggle bind, the full lineup-practice config, and the cheat flag every server needs.',
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
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.cs2practice.com/logo-512.png',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.cs2practice.com/commands/noclip-bind',
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
      name: 'Noclip Bind',
      item: 'https://www.cs2practice.com/commands/noclip-bind',
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
          trackingParams={{ command: 'noclip-bind' }}
        />
      </div>
    </div>
  );
}

export default function NoclipBindPage() {
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
            <span className="text-white">Noclip Bind</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              CS2 Noclip Bind: Fly Through Maps for Lineup Practice
            </h1>
            <p className="text-gray-400 text-lg">
              Bind noclip to a single key so you can teleport-fly to any smoke spot, callout, or
              angle on the map. The fastest way to learn lineups.
            </p>
          </header>

          <div className="prose-invert text-gray-300 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Quick bind (copy this)</h2>
              <CodeBlock code={QUICK_BIND} label="Paste into console on a practice server" />
              <p>
                Press <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">N</code> to
                toggle noclip on and off. While it&apos;s on you walk through walls, fly straight up
                with the jump key, and drop straight down with crouch. Mouse look controls the
                direction you&apos;re flying.
              </p>
              <p className="mt-3">
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">N</code> is the
                most common choice because it&apos;s out of the way of WASD and weapon-switch keys.
                Pick anything that isn&apos;t already mapped — <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">b</code>,{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">v</code>, or a
                spare mouse button all work fine.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Why sv_cheats 1 is required</h2>
              <p>
                Noclip is a cheat command. Valve has it locked behind{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_cheats 1</code>,
                which only the server host can flip. That means:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong className="text-white">Premier and Competitive matchmaking:</strong>{' '}
                  Can&apos;t enable it. The server-side flag is locked to 0 and your bind silently
                  fails when you press the key.
                </li>
                <li>
                  <strong className="text-white">Casual and Deathmatch:</strong> Same — locked
                  server-side.
                </li>
                <li>
                  <strong className="text-white">Private server with bots:</strong> Works. Start a
                  workshop map or any official map locally, type{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_cheats 1</code>{' '}
                  once, and noclip is unlocked for the whole session.
                </li>
                <li>
                  <strong className="text-white">Community workshop &ldquo;practice config&rdquo; maps:</strong>{' '}
                  Already have sv_cheats 1 baked in. Look for maps tagged &ldquo;Yprac&rdquo; or
                  &ldquo;1v1&rdquo; in the workshop.
                </li>
              </ul>
              <p className="mt-4">
                The bind is harmless to keep in your autoexec — it just won&apos;t do anything when
                cheats are off. No VAC risk, no anti-cheat flags. The command is part of vanilla
                Source 2.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Full lineup-practice config</h2>
              <p>
                Noclip alone gets you flying, but the real workflow for learning a smoke lineup is
                noclip + grenade trajectory + rethrow. Paste this whole block into the console of a
                private server:
              </p>
              <CodeBlock code={PRACTICE_BLOCK} label="One-shot practice config" />
              <p className="mt-3">
                That gives you:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">N</code> —
                  toggle fly mode to inspect the lineup
                </li>
                <li>
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">H</code> —
                  give yourself a full grenade kit
                </li>
                <li>
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">J</code> —
                  rethrow your last grenade from the exact same position and aim
                </li>
                <li>
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_grenade_trajectory_prac_pipreview 1</code>{' '}
                  — picture-in-picture preview while you&apos;re lining up the throw
                </li>
              </ul>
              <p className="mt-4">
                The rethrow command is the killer feature. Throw a smoke, fly out to see where it
                landed, fly back, press J — it replays the exact throw. No more measuring crosshair
                placement by squinting at YouTube.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">A real lineup practice loop</h2>
              <ol className="list-decimal pl-6 space-y-2 mt-3">
                <li>Load a competitive map locally — Mirage, Inferno, Ancient, Dust 2.</li>
                <li>Paste the practice config block above into console.</li>
                <li>Pick a lineup you want to learn (e.g. T-spawn jungle smoke on Mirage).</li>
                <li>Stand at the marked position, aim at the marked spot, press your jumpthrow.</li>
                <li>Press <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">N</code> to fly out and check if the smoke landed where it should.</li>
                <li>Press <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">N</code> again to drop back to ground, then <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">J</code> to retry the exact same throw.</li>
                <li>Adjust crosshair pixel-by-pixel until the trajectory line lands clean.</li>
                <li>Memorize the alignment landmark — usually a corner of a roof, a sign, or a specific texture seam.</li>
              </ol>
              <p className="mt-4">
                You can drill ten lineups in twenty minutes this way. Compare that to deathmatching
                until you randomly spawn near a smoke spot.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Toggle variant (only if you want it)</h2>
              <CodeBlock code={TOGGLE_VARIANT} label="Explicit on/off toggle with alias" />
              <p>
                The simple <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">bind &quot;n&quot; &quot;noclip&quot;</code>{' '}
                already toggles — pressing it once enables, pressing again disables. The alias
                version is only useful if you&apos;re scripting something more complex, like
                combining noclip with a hint message or a sound cue. For 99% of players the one-line
                version is enough.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">When it doesn&apos;t work</h2>
              <ol className="list-decimal pl-6 space-y-3 mt-3">
                <li>
                  <strong className="text-white">Bind fires but nothing happens.</strong>{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_cheats</code>{' '}
                  is still 0 on the server. Check it with{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_cheats</code>{' '}
                  (no value, just the command name) in console. If it returns 0, you&apos;re on a
                  Valve matchmaking server and noclip is permanently disabled there.
                </li>
                <li>
                  <strong className="text-white">Flying is way too slow / too fast.</strong> Tweak{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_noclipspeed</code>{' '}
                  (default 5). Set it to 8 for fast traversal on big maps, 2 for fine-grained
                  positioning near a lineup target.
                </li>
                <li>
                  <strong className="text-white">No collision after disabling.</strong> Press{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">N</code> again
                  while standing on solid ground. Trying to disable noclip while floating in mid-air
                  sometimes leaves you stuck — disable on the floor.
                </li>
                <li>
                  <strong className="text-white">Server says &ldquo;Unknown command: noclip&rdquo;.</strong>{' '}
                  You&apos;re on a server type where the command was stripped out entirely. Workshop
                  surf and bhop servers sometimes do this. Switch to a vanilla practice config map.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">What to learn after this</h2>
              <p>
                Noclip pairs well with two other practice setups. The first is{' '}
                <Link href="/commands/cheats-commands-list" className="text-blue-400 hover:underline">
                  the full sv_cheats commands list
                </Link>{' '}
                — show impacts, infinite ammo, bot freeze, and the wallhack/ESP-style commands for
                vision-checking your own crosshair placement. The second is{' '}
                <Link href="/commands/jumpthrow-bind" className="text-blue-400 hover:underline">
                  the jumpthrow bind
                </Link>
                , because noclip without a jumpthrow means your smoke lineups will still vary by 30
                pixels every throw.
              </p>
              <p className="mt-3">
                And once your lineups are dialed, the aim has to keep up. Run a few{' '}
                <Link href="/play/gridshot" className="text-blue-400 hover:underline">
                  gridshot
                </Link>{' '}
                or{' '}
                <Link href="/play/flicking" className="text-blue-400 hover:underline">
                  flick training
                </Link>{' '}
                sessions on the same sensitivity you actually queue with — there&apos;s a sensitivity
                converter on the site if you don&apos;t have a number for CS2 yet.
              </p>
            </section>
          </div>

          <aside className="mt-16 pt-8 border-t border-gray-800">
            <h2 className="text-lg font-bold text-white mb-4">Related commands</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/commands/cheats-commands-list" className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors block">
                <h3 className="font-bold text-white mb-1">Full sv_cheats commands list</h3>
                <p className="text-sm text-gray-400">Every useful practice-server command.</p>
              </Link>
              <Link href="/commands/jumpthrow-bind" className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors block">
                <h3 className="font-bold text-white mb-1">Jumpthrow bind</h3>
                <p className="text-sm text-gray-400">Pixel-consistent smoke lineups.</p>
              </Link>
              <Link href="/commands/scroll-wheel-jump-bind" className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors block">
                <h3 className="font-bold text-white mb-1">Scroll wheel jump bind</h3>
                <p className="text-sm text-gray-400">Bunny hop and consistent jumps.</p>
              </Link>
            </div>
          </aside>
        </article>
      </main>
    </div>
  );
}
