import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import CopyButton from '@/components/ui/CopyButton';
import ContentTrainingCTA from '@/components/growth/ContentTrainingCTA';

export const metadata: Metadata = {
  title: 'CS2 sv_cheats Commands: Full Practice-Only Reference (2026)',
  description:
    'Every CS2 sv_cheats command worth knowing — noclip, buddha (replaces god), give weapon, infinite ammo, grenade trajectory, show impacts. Plus why these only work on private servers and what changed from CS:GO.',
  keywords: [
    'best console commands for cs2',
    'cs2 sv_cheats commands',
    'cs2 cheat commands list',
    'cs2 practice commands',
    'cs2 buddha command',
    'cs2 god mode command',
    'cs2 give weapon command',
  ],
  alternates: { canonical: '/commands/cheats-commands-list' },
  openGraph: {
    title: 'CS2 sv_cheats Commands — Full Practice Reference',
    description:
      'The full list of practice-only commands worth knowing in CS2 (2026 update). Covers buddha (replaces god), noclip, infinite ammo, grenade trajectory.',
    url: '/commands/cheats-commands-list',
    type: 'article',
  },
};

const ENABLE_CHEATS = 'sv_cheats 1';
const PRACTICE_BLOCK = `sv_cheats 1
sv_infinite_ammo 1
sv_showimpacts 1
sv_grenade_trajectory_prac_pipreview 1
ammo_grenade_limit_total 5
mp_warmup_end
mp_restartgame 1`;
const GIVE_WEAPONS = `give weapon_ak47
give weapon_m4a1
give weapon_awp
give weapon_deagle
give weapon_hegrenade
give weapon_smokegrenade
give weapon_flashbang
give weapon_molotov`;
const BUDDHA_VS_GOD = `// In CS:GO this was: god
// In CS2 the equivalent is:
buddha 1`;

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'CS2 sv_cheats Commands: Full Practice-Only Reference',
  description:
    'Complete reference of practice-only CS2 console commands, including the buddha command that replaced god, noclip, give weapon, grenade trajectory and show impacts.',
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
    '@id': 'https://www.cs2practice.com/commands/cheats-commands-list',
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
      name: 'sv_cheats Command List',
      item: 'https://www.cs2practice.com/commands/cheats-commands-list',
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
          trackingParams={{ command: 'cheats-commands-list' }}
        />
      </div>
    </div>
  );
}

export default function CheatsCommandsListPage() {
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
            <span className="text-white">sv_cheats Command List</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              CS2 sv_cheats Commands: Full Practice-Only Reference
            </h1>
            <p className="text-gray-400 text-lg">
              Every CS2 console command worth knowing for solo practice. None of these work on Valve
              matchmaking — they&apos;re for offline maps, private servers, and aim training routines.
            </p>
          </header>

          <div className="prose-invert text-gray-300 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Step 1: Enable cheats</h2>
              <CodeBlock code={ENABLE_CHEATS} label="Required before any cheat command works" />
              <p>
                Every command on this page needs{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_cheats 1</code>{' '}
                first. It only works on offline maps (loaded via{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">map de_mirage</code>{' '}
                in the console) and on private community servers. Try it on Valve matchmaking or
                Premier and the console will tell you &ldquo;Can&apos;t use cheats on a server that
                is not a private/local game.&rdquo;
              </p>
              <p className="mt-3">
                None of these get you VAC-banned. They&apos;re built into the game by Valve for
                exactly this practice use case. The anti-cheat targets external programs and
                modified clients, not the built-in <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_cheats</code>{' '}
                system.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Player state</h2>

              <h3 className="text-lg font-semibold text-white mt-6 mb-2">buddha 1 (replaces god mode)</h3>
              <CodeBlock code={BUDDHA_VS_GOD} label="CS2 changed the syntax" />
              <p>
                In CS:GO the command was{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">god</code>. In CS2
                it&apos;s <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">buddha 1</code>{' '}
                — your HP can drop down to 1 but never below, so you can&apos;t actually die. Useful for
                practicing spray patterns at point-blank without resetting the map. To turn it off,{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">buddha 0</code>.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-2">noclip</h3>
              <p>
                Toggle fly-mode. Type{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">noclip</code>{' '}
                once to fly, again to land. Combined with{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_grenade_trajectory</code>,
                it&apos;s the standard setup for learning smoke lineups. Full setup is on the{' '}
                <Link href="/commands/noclip-bind" className="text-blue-400 hover:underline">
                  noclip bind page
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Weapons and ammo</h2>

              <h3 className="text-lg font-semibold text-white mt-6 mb-2">give weapon_X</h3>
              <CodeBlock code={GIVE_WEAPONS} label="Drops the weapon at your feet — pick it up" />
              <p>
                Spawns a weapon for you to pick up. Works with every standard CS2 weapon name:{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">ak47</code>,
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">m4a1</code> (and{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">m4a1_silencer</code>),
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">awp</code>,
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">scar20</code>,
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">deagle</code>,
                etc. Grenades work too —{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">hegrenade</code>,
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">smokegrenade</code>,
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">flashbang</code>,
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">molotov</code>.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-2">sv_infinite_ammo 1</h3>
              <p>
                Set to <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">1</code>{' '}
                for infinite reserve ammo. Set to{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">2</code> for
                infinite magazine (no reload needed at all). Spray pattern practice usually wants
                the <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">2</code>{' '}
                version so you don&apos;t reset your spray every magazine.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-2">ammo_grenade_limit_total 5</h3>
              <p>
                Bumps the per-player grenade cap from the default 4 up to whatever you set.
                Useful when practicing lineups so you don&apos;t have to spam{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">give weapon_hegrenade</code>{' '}
                every two throws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Visibility and feedback</h2>

              <h3 className="text-lg font-semibold text-white mt-6 mb-2">sv_showimpacts 1</h3>
              <p>
                Shows red dots wherever your bullets land, even through walls. The single most
                useful spray-practice command — you can finally see if your sprays go where you
                think they do.{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">0</code> off,{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">1</code> client
                shots only, <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">2</code>{' '}
                also shows bot/enemy shots.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-2">sv_grenade_trajectory_prac_pipreview 1</h3>
              <p>
                Shows the trajectory of any grenade you throw, plus a picture-in-picture view of
                where it lands. The exact tool for learning smoke and flash lineups. Pair with{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">noclip</code> and{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_rethrow_last_grenade</code>{' '}
                for the full lineup-learning kit.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-2">sv_rethrow_last_grenade</h3>
              <p>
                Throws the same grenade with the same trajectory from the same spot. Useful when
                you found a lineup and want to verify it consistently. Bind this to a key so
                you&apos;re not typing it every time.
              </p>

              <h3 className="text-lg font-semibold text-white mt-6 mb-2">ESP-style visibility (changed in CS2)</h3>
              <p>
                CS:GO had{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">r_drawothermodels 2</code>{' '}
                for see-through-walls models. Valve removed it in CS2. The closest replacements are{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">ent_skeleton</code>{' '}
                (shows player skeletons through walls) and{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">toggle r_aoproxy_show 0 1</code>{' '}
                (yellow visibility overlay). Full setup is on the{' '}
                <Link href="/commands/esp-command-practice" className="text-blue-400 hover:underline">
                  ESP practice command page
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Movement</h2>
              <p>
                Bhop and air-acceleration commands (<code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_autobunnyhopping</code>,
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_airaccelerate</code>,
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_staminajumpcost</code>,{' '}
                etc.) all need <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_cheats 1</code>{' '}
                and only work on private servers. They&apos;re a category on their own — the full
                bhop command set is on the{' '}
                <Link href="/commands/bhop-console" className="text-blue-400 hover:underline">
                  bhop console commands page
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Standard practice routine block</h2>
              <CodeBlock code={PRACTICE_BLOCK} label="Paste at the start of any solo practice session" />
              <p>
                Open a deathmatch or aim_botz map, paste the block, and you&apos;ve got infinite
                ammo, bullet impact dots, grenade trajectories, and a higher grenade cap. The{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">mp_warmup_end</code>{' '}
                +{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">mp_restartgame 1</code>{' '}
                at the end resets the round timer so you have full buy time without the warmup phase
                getting in the way.
            </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Limits and important notes</h2>
              <ol className="list-decimal pl-6 space-y-3 mt-3">
                <li>
                  <strong className="text-white">Only on private servers.</strong>{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_cheats</code>{' '}
                  is gated to local games and community servers. Valve matchmaking, Premier, FaceIt,
                  ESEA all block these. Trying to type them just shows an error in the console.
                </li>
                <li>
                  <strong className="text-white">No VAC risk.</strong> These are Valve&apos;s own
                  commands. The anti-cheat doesn&apos;t care about them. You won&apos;t get
                  flagged.
                </li>
                <li>
                  <strong className="text-white">Some commands changed from CS:GO.</strong>{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">god</code> →{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">buddha 1</code>.{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">r_drawothermodels 2</code> →{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">ent_skeleton</code>{' '}
                  /{' '}
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">r_aoproxy_show</code>.
                  Old CS:GO command lists are unreliable for CS2.
                </li>
                <li>
                  <strong className="text-white">Cheats reset on map change.</strong> Set them once
                  per map. The standard practice block above puts them all in a single paste.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">What to set up next</h2>
              <p>
                The four practice setups most CS2 players build:{' '}
                <Link href="/commands/noclip-bind" className="text-blue-400 hover:underline">
                  noclip on a key
                </Link>{' '}
                (for lineup learning),{' '}
                <Link href="/commands/bhop-console" className="text-blue-400 hover:underline">
                  bhop console block
                </Link>{' '}
                (for movement practice),{' '}
                <Link href="/commands/esp-command-practice" className="text-blue-400 hover:underline">
                  ESP-style visibility
                </Link>{' '}
                (for advanced practice routines), and a{' '}
                <Link href="/commands/jumpthrow-bind" className="text-blue-400 hover:underline">
                  jumpthrow bind
                </Link>{' '}
                (consistent grenade lineups, this one works in matchmaking too).
              </p>
            </section>
          </div>

          <ContentTrainingCTA
            sourcePage="cheats_commands_list"
            title="Use the commands, then train the mechanic"
            description="Console setup helps you repeat situations. Follow it with a short browser warm-up to practice the actual mouse movement before queueing."
          />

          <aside className="mt-16 pt-8 border-t border-gray-800">
            <h2 className="text-lg font-bold text-white mb-4">Related commands</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/commands/noclip-bind" className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors block">
                <h3 className="font-bold text-white mb-1">noclip bind</h3>
                <p className="text-sm text-gray-400">Free-fly setup for lineup practice.</p>
              </Link>
              <Link href="/commands/bhop-console" className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors block">
                <h3 className="font-bold text-white mb-1">bhop console commands</h3>
                <p className="text-sm text-gray-400">Full bunny hop server setup.</p>
              </Link>
              <Link href="/commands/esp-command-practice" className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors block">
                <h3 className="font-bold text-white mb-1">ESP practice commands</h3>
                <p className="text-sm text-gray-400">CS2 replacements for r_drawothermodels.</p>
              </Link>
            </div>
          </aside>
        </article>
      </main>
    </div>
  );
}
