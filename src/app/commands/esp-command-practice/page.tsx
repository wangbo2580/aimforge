import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import CopyButton from '@/components/ui/CopyButton';

export const metadata: Metadata = {
  title: 'CS2 ESP Command: See Through Walls in Practice Servers (2026)',
  description:
    'The CS2 commands that show enemy or bot positions through walls on practice servers. ent_skeleton for skeleton wireframes, r_aoproxy_show as a fallback, and what to use now that r_drawothermodels was removed from Source 2.',
  keywords: [
    'cs2 esp command',
    'cs2 wallhack command',
    'cs2 see through walls command',
    'ent_skeleton cs2',
    'r_drawothermodels cs2',
    'cs2 practice wallhack',
    'sv_cheats wallhack',
  ],
  alternates: { canonical: '/commands/esp-command-practice' },
  openGraph: {
    title: 'CS2 ESP / Wallhack Command for Practice Servers',
    description:
      'ent_skeleton replaces r_drawothermodels 2 in CS2. Use it to learn off-angles, common holds, and pre-aim positions on a bot server. Legal on private servers only.',
    url: '/commands/esp-command-practice',
    type: 'article',
  },
};

const PRIMARY_BLOCK = `sv_cheats 1
ent_skeleton`;

const TARGETED_BLOCK = `sv_cheats 1
ent_text player
ent_skeleton player`;

const AOPROXY_BLOCK = `sv_cheats 1
toggle r_aoproxy_show 0 1`;

const CLEAR_BLOCK = `ent_clear_debug_overlays`;

const PRACTICE_LOOP = `// Off-angle practice config
sv_cheats 1
bot_kick
bot_add_t
bot_add_ct
bot_freeze 1
mp_warmup_end
mp_freezetime 0
mp_respawn_on_death_t 1
mp_respawn_on_death_ct 1
ent_skeleton
bind "p" "ent_clear_debug_overlays"`;

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'CS2 ESP Command: See Through Walls in Practice Servers',
  description:
    'Step-by-step guide for the CS2 commands that show player positions through walls on a private practice server. Covers ent_skeleton, the r_drawothermodels removal in Source 2, and a full off-angle drill setup.',
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
    '@id': 'https://www.cs2practice.com/commands/esp-command-practice',
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
      name: 'ESP Command for Practice',
      item: 'https://www.cs2practice.com/commands/esp-command-practice',
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
          trackingParams={{ command: 'esp-command-practice' }}
        />
      </div>
    </div>
  );
}

export default function EspCommandPracticePage() {
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
            <span className="text-white">ESP Command for Practice</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              CS2 ESP Command: See Through Walls in Practice Servers
            </h1>
            <p className="text-gray-400 text-lg">
              The replacement for the old{' '}
              <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400 text-base">r_drawothermodels 2</code>{' '}
              wallhack. Works on private servers with sv_cheats 1, useful for learning off-angles
              and pre-aim positions.
            </p>
          </header>

          <div className="prose-invert text-gray-300 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">The command (copy this)</h2>
              <CodeBlock code={PRIMARY_BLOCK} label="Paste into console on a private server" />
              <p>
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">ent_skeleton</code>{' '}
                draws a skeleton wireframe through walls for every player entity in the world, bots
                included. You see the exact bone structure — head, spine, hips, limbs — which is
                often more useful than full-model ESP because the skeleton lines up with the actual
                hitbox the server is checking.
              </p>
              <p className="mt-3">
                <strong className="text-white">Important:</strong> the command toggles. Type it once
                to enable, type it again to disable. Or bind{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">ent_clear_debug_overlays</code>{' '}
                to a key for an instant clear:
              </p>
              <CodeBlock code={CLEAR_BLOCK} label="Clear the wireframe overlay" />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Why r_drawothermodels 2 doesn&apos;t work anymore</h2>
              <p>
                If you searched for CS2 wallhack commands, you probably found{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">r_drawothermodels 2</code>{' '}
                in old guides. That was the CS:GO command — it forced enemy models to render as
                neon-bright wireframes through walls. Source 2 removed it.
              </p>
              <p className="mt-3">
                Valve also removed{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">enable_skeleton_draw</code>{' '}
                — another old-engine variant that some guides still reference. Neither one works in
                CS2. If you paste them into the console you&apos;ll either get &ldquo;Unknown command&rdquo;
                or a silent no-op.
              </p>
              <p className="mt-3">
                The official replacement is{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">ent_skeleton</code>.
                It&apos;s a debug overlay command (same family as ent_text and ent_messages), not a
                renderer toggle, which is why the syntax and behavior is different from
                r_drawothermodels.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Target a single player by entity ID</h2>
              <p>
                Plain <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">ent_skeleton</code>{' '}
                lights up every player at once. On a 5v5 bot setup that&apos;s ten skeletons —
                useful for crowd-control practice, overwhelming for learning a single off-angle.
                Narrow it down:
              </p>
              <CodeBlock code={TARGETED_BLOCK} label="Skeleton only for player entities" />
              <p className="mt-3">
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">ent_text player</code>{' '}
                first prints the entity ID and class for every player on the server. From there you
                can target a specific bot by its numeric ID — useful when you only want to see one
                bot at a time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Fallback: r_aoproxy_show</h2>
              <CodeBlock code={AOPROXY_BLOCK} label="Outline-style alternative" />
              <p>
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">r_aoproxy_show</code>{' '}
                draws debug boxes around the ambient occlusion proxies in the world. For players,
                that produces a coarse boxy outline through walls — less precise than the skeleton
                but visible at longer distances. Some players prefer it because the visual is
                cleaner.
              </p>
              <p className="mt-3">
                Use whichever style your eyes adjust to faster. The skeleton is more accurate, the
                AO proxy is easier to spot at a glance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Off-angle practice loop</h2>
              <p>
                The reason you use this command on a practice server: not to cheat, but to learn
                where the human eye should be looking. Set up a quick drill:
              </p>
              <CodeBlock code={PRACTICE_LOOP} label="Off-angle / pre-aim drill setup" />
              <ol className="list-decimal pl-6 space-y-2 mt-3">
                <li>
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">bot_freeze 1</code>{' '}
                  freezes bots wherever they spawn — they don&apos;t walk or rotate, which is the
                  whole point. Real games are won by knowing the off-angles, not by reaction speed.
                </li>
                <li>Walk through a common contested zone (Mirage palace, Inferno apartments).</li>
                <li>
                  Without looking at the skeleton, pre-aim where you think a bot is most likely to
                  hold from.
                </li>
                <li>
                  After you commit to the pre-aim,{' '}
                  <strong className="text-white">then</strong> let the skeleton confirm whether you
                  were right.
                </li>
                <li>
                  Press <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">P</code>{' '}
                  (bound above to{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">ent_clear_debug_overlays</code>) to
                  hide skeletons, rotate to a different position, and repeat.
                </li>
              </ol>
              <p className="mt-4">
                The training value is in pre-aiming{' '}
                <strong className="text-white">before</strong> the ESP confirms — using it as
                feedback, not as a constant overlay. If you leave skeletons on the whole match you
                build the habit of looking at the wireframe, which doesn&apos;t transfer to real
                games.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">VAC, Faceit, and matchmaking</h2>
              <p>
                Same answer as every other sv_cheats command:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong className="text-white">Premier / Competitive / Casual / Deathmatch:</strong>{' '}
                  sv_cheats is locked at 0. The command silently fails. No VAC ban for trying — the
                  flag rejection is server-side.
                </li>
                <li>
                  <strong className="text-white">Faceit / ESEA / pro tournaments:</strong> Same —
                  cheats locked. Plus those clients have their own anti-cheat layer that flags any
                  injected wallhack, but the in-engine{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">ent_skeleton</code>{' '}
                  is rejected before it gets that far.
                </li>
                <li>
                  <strong className="text-white">Private server / workshop maps with sv_cheats 1:</strong>{' '}
                  Works as documented. No VAC implication. Valve provided the command on purpose.
                </li>
              </ul>
              <p className="mt-4">
                The command exists for level designers and demo analysts. Using it on a practice
                server is the same legal status as using <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">noclip</code>:
                allowed where sv_cheats is allowed, blocked everywhere else, no ban risk on either
                side.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">When it doesn&apos;t work</h2>
              <ol className="list-decimal pl-6 space-y-3 mt-3">
                <li>
                  <strong className="text-white">&ldquo;Unknown command: r_drawothermodels&rdquo;.</strong>{' '}
                  Right — that command was removed. Use{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">ent_skeleton</code>{' '}
                  instead.
                </li>
                <li>
                  <strong className="text-white">ent_skeleton runs but nothing shows.</strong>{' '}
                  Either there are no bots / players in the server (the command needs entities to
                  draw on), or sv_cheats is still 0. Type{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_cheats</code>{' '}
                  with no value to check.
                </li>
                <li>
                  <strong className="text-white">Skeletons drawing on yourself.</strong> Yes — by
                  design the overlay covers all player entities including your own. You won&apos;t
                  see your own skeleton unless you third-person view{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">thirdperson</code>{' '}
                  but the entity is still there.
                </li>
                <li>
                  <strong className="text-white">Wireframe persists after match restart.</strong>{' '}
                  The debug overlay is client-side and survives map changes. Run{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">ent_clear_debug_overlays</code>{' '}
                  to wipe it.
                </li>
                <li>
                  <strong className="text-white">Bound to a key but nothing happens.</strong> Make
                  sure the bind syntax is{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">bind &quot;k&quot; &quot;ent_skeleton&quot;</code>{' '}
                  with both arguments in quotes. Single-quoted or unquoted versions can fail
                  silently.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">What pairs well with this</h2>
              <p>
                ESP commands give you visual feedback on positioning, which is most useful when
                you&apos;re also moving freely.{' '}
                <Link href="/commands/noclip-bind" className="text-blue-400 hover:underline">
                  The noclip bind
                </Link>{' '}
                lets you fly to common holding spots, drop in, and check whether your pre-aim was
                pointed at the right pixel. And if you&apos;re drilling crosshair placement at a
                specific spot,{' '}
                <Link href="/commands/cheats-commands-list" className="text-blue-400 hover:underline">
                  the wider sv_cheats list
                </Link>{' '}
                covers the bot freeze, infinite ammo, and impact-marker commands you&apos;ll want
                running at the same time.
              </p>
              <p className="mt-3">
                For raw aim that holds up once you find the angle, run a session on the trainer
                — try{' '}
                <Link href="/play/flicking" className="text-blue-400 hover:underline">
                  flick training
                </Link>{' '}
                if you&apos;re cleaning up off-angle reactions, or{' '}
                <Link href="/play/tracking" className="text-blue-400 hover:underline">
                  tracking
                </Link>{' '}
                if it&apos;s the swing-out shots that miss. Make sure to use{' '}
                <Link href="/tools/sensitivity-converter" className="text-blue-400 hover:underline">
                  your matched CS2 sensitivity
                </Link>{' '}
                so the muscle memory transfers cleanly.
              </p>
            </section>
          </div>

          <aside className="mt-16 pt-8 border-t border-gray-800">
            <h2 className="text-lg font-bold text-white mb-4">Related commands</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/commands/cheats-commands-list" className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors block">
                <h3 className="font-bold text-white mb-1">Full sv_cheats commands list</h3>
                <p className="text-sm text-gray-400">Every practice-server command.</p>
              </Link>
              <Link href="/commands/noclip-bind" className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors block">
                <h3 className="font-bold text-white mb-1">Noclip bind</h3>
                <p className="text-sm text-gray-400">Fly to off-angle spots to test pre-aim.</p>
              </Link>
              <Link href="/commands/bhop-console" className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors block">
                <h3 className="font-bold text-white mb-1">Bhop console commands</h3>
                <p className="text-sm text-gray-400">Bunny hop setup for movement practice.</p>
              </Link>
            </div>
          </aside>
        </article>
      </main>
    </div>
  );
}
