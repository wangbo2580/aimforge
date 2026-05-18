import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import CopyButton from '@/components/ui/CopyButton';

export const metadata: Metadata = {
  title: 'CS2 Bhop Console Commands: Full Bunny Hop Setup (2026)',
  description:
    'The complete sv_cheats command block for bunny-hopping in CS2 — sv_enablebunnyhopping, sv_staminajumpcost, sv_airaccelerate, sv_autobunnyhopping. Default-speed and unrestricted-speed presets, plus what works on matchmaking.',
  keywords: [
    'cs2 bhop commands',
    'cs2 bunny hop commands',
    'bhop console cs2',
    'sv_enablebunnyhopping cs2',
    'sv_staminajumpcost 0',
    'sv_airaccelerate 2000',
    'cs2 auto bhop command',
  ],
  alternates: { canonical: '/commands/bhop-console' },
  openGraph: {
    title: 'CS2 Bhop Commands — Console Setup for Bunny Hopping',
    description:
      'Two copy-paste presets: matchmaking-speed (12 air accel) and unrestricted-speed (2000 air accel). Plus the scroll-wheel jump bind that makes any of it actually work.',
    url: '/commands/bhop-console',
    type: 'article',
  },
};

const DEFAULT_SPEED_BLOCK = `sv_cheats 1
sv_enablebunnyhopping 1
sv_autobunnyhopping 1
sv_maxvelocity 3500
sv_staminamax 0
sv_staminalandcost 0.050
sv_staminajumpcost 0.080
sv_staminarecoveryrate 0
sv_accelerate_use_weapon_speed 0
sv_airaccelerate 12`;

const UNLIMITED_SPEED_BLOCK = `sv_cheats 1
sv_enablebunnyhopping 1
sv_autobunnyhopping 1
sv_maxvelocity 7000
sv_staminamax 0
sv_staminalandcost 0
sv_staminajumpcost 0
sv_staminarecoveryrate 0
sv_accelerate_use_weapon_speed 0
sv_airaccelerate 2000`;

const SCROLL_BIND = `bind "mwheelup" "+jump"
bind "mwheeldown" "+jump"`;

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'CS2 Bhop Console Commands: Full Bunny Hop Setup',
  description:
    'Console commands for bunny-hopping practice in CS2. Two preset blocks — matchmaking-equivalent and unrestricted-speed — with explanations of every flag.',
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
    '@id': 'https://www.cs2practice.com/commands/bhop-console',
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
      name: 'Bhop Console Commands',
      item: 'https://www.cs2practice.com/commands/bhop-console',
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
          trackingParams={{ command: 'bhop-console' }}
        />
      </div>
    </div>
  );
}

export default function BhopConsolePage() {
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
            <span className="text-white">Bhop Console Commands</span>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              CS2 Bhop Console Commands: Full Bunny Hop Setup
            </h1>
            <p className="text-gray-400 text-lg">
              Two console blocks: one that mimics matchmaking physics so practice matches reality,
              one that unlocks the old-school speed for surf and bhop maps.
            </p>
          </header>

          <div className="prose-invert text-gray-300 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Default-speed practice (matchmaking equivalent)</h2>
              <CodeBlock code={DEFAULT_SPEED_BLOCK} label="Paste into console on a private server" />
              <p>
                This is the one you actually want most of the time. It enables bhop and removes the
                stamina hard-cap, but keeps the air acceleration at matchmaking-default (12). The
                result: bhopping works, but the timing windows match real games — so the muscle
                memory you build actually transfers.
              </p>
              <p className="mt-3">
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_autobunnyhopping 1</code>{' '}
                is the forgiving flag. It lets the game auto-jump as long as you hold spacebar (or
                your jump key) instead of needing pixel-perfect tap timing. Most players use
                auto-bhop because in CS2&apos;s subtick system, manual tap-timing is unreliable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Unrestricted speed (surf/bhop map style)</h2>
              <CodeBlock code={UNLIMITED_SPEED_BLOCK} label="For workshop bhop maps or fun mode" />
              <p>
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_airaccelerate 2000</code>{' '}
                is the old CS:GO scoot mode — strafing in mid-air gives you nearly unlimited speed
                gain. This is the setting workshop bhop and surf maps use. Speed builds quickly,
                you&apos;ll fly across maps in a few hops.
              </p>
              <p className="mt-3">
                Fun, but useless for practicing &ldquo;in-game&rdquo; bhop because matchmaking caps air
                acceleration at 12 and the speed differential is roughly 200x. Bhop muscle memory
                built at 2000 doesn&apos;t transfer to ranked play. Use this preset for entertainment
                or for surf maps that explicitly require it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Bind jump to scroll wheel (the real upgrade)</h2>
              <CodeBlock code={SCROLL_BIND} label="One bind both ways" />
              <p>
                Spacebar can&apos;t hit the multiple-frame timing window for bhop reliably even with
                auto-bhop. A scroll wheel can. One flick of the wheel pumps the jump key something
                like 4-8 times in 100ms, which guarantees at least one input lands in the right
                frame.
              </p>
              <p className="mt-3">
                Every CS player who consistently bhops has this bind. There&apos;s a separate page
                covering the trade-off with normal jumping (you lose spacebar-jump consistency in a
                gunfight):{' '}
                <Link href="/commands/scroll-wheel-jump-bind" className="text-blue-400 hover:underline">
                  scroll wheel jump bind
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">What each command actually does</h2>
              <ul className="list-disc pl-6 space-y-3 mt-3">
                <li>
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_enablebunnyhopping 1</code>{' '}
                  — removes the velocity cap that triggers when you land. Without this, the second
                  jump in a chain slows you to walking speed. The single most important flag.
                </li>
                <li>
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_autobunnyhopping 1</code>{' '}
                  — auto-jumps while you hold the jump key. Without it, you have to tap-time the
                  jump on every single landing frame.
                </li>
                <li>
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_staminajumpcost 0</code>{' '}
                  — sets the stamina penalty for jumping. 0 means a jump costs nothing, 0.08 is the
                  matchmaking default. Leave at default if you want realistic practice.
                </li>
                <li>
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_staminalandcost 0</code>{' '}
                  — same idea but for landing. 0.05 is matchmaking default.
                </li>
                <li>
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_staminamax 0</code>{' '}
                  — removes the stamina ceiling, so consecutive jumps don&apos;t stack penalty.
                </li>
                <li>
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_airaccelerate 12</code>{' '}
                  — how much sideways acceleration you get mid-jump. 12 is matchmaking. Higher means
                  faster strafe speed-up.
                </li>
                <li>
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_maxvelocity</code>{' '}
                  — hard cap on player velocity. 3500 = matchmaking limit. 7000 = effectively
                  uncapped for normal maps.
                </li>
                <li>
                  <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_accelerate_use_weapon_speed 0</code>{' '}
                  — prevents heavier weapons (AWP, M249) from slowing your bhop. Set to 0 so you can
                  practice with any loadout.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Does this work in matchmaking?</h2>
              <p>
                Short answer: no.
              </p>
              <p className="mt-3">
                Long answer:{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_cheats</code> is
                locked to 0 on every Valve matchmaking server — Premier, Competitive, Casual,
                Deathmatch, Wingman. The commands silently fail. What CS2 does allow in matchmaking
                is the natural form of bhop: tap jump on landing without using any commands. With
                the matchmaking-default air acceleration of 12 and the stamina cost of jumping,
                that&apos;s rate-limited to maybe 20% extra speed for a few hops before you stamina
                out. Useful for crossing open areas like Mirage palace catwalk, not for the
                cross-map flying that surf maps allow.
              </p>
              <p className="mt-3">
                Faceit, ESEA, and pro tournament servers also keep the matchmaking physics — they
                don&apos;t enable sv_cheats either. So everything here is for{' '}
                <strong className="text-white">private practice servers and workshop bhop maps only</strong>.
                Practice on default-speed values and the skill transfers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">How to actually bhop (the technique)</h2>
              <ol className="list-decimal pl-6 space-y-2 mt-3">
                <li>Move forward (W) and start the first jump with the scroll wheel.</li>
                <li>
                  Mid-air, release W. Hold either A or D while turning your mouse the same direction
                  — left A + mouse-left, right D + mouse-right.
                </li>
                <li>Just before landing, scroll wheel to trigger the next jump.</li>
                <li>
                  Swap strafe directions mid-air on the next hop: now hold D + mouse-right, etc.
                  Alternating each jump is what builds speed.
                </li>
                <li>Never hold W during a strafe — it kills the speed gain.</li>
              </ol>
              <p className="mt-4">
                Hard part is the mouse turn: the angle and rate of your turn has to match the strafe
                key. Too slow = you don&apos;t gain speed. Too fast = you decelerate. Most players
                need a few hours of bhop map practice to land it consistently.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">When commands fail to apply</h2>
              <ol className="list-decimal pl-6 space-y-3 mt-3">
                <li>
                  <strong className="text-white">Console says &ldquo;cannot be set with cheats off&rdquo;.</strong>{' '}
                  Type <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_cheats 1</code>{' '}
                  first. Most of the bhop flags are cheat-flagged in CS2&apos;s convar system.
                </li>
                <li>
                  <strong className="text-white">Settings reset on map change.</strong> sv_cheats
                  resets to 0 between maps. Either rebind your bhop block to a key, or put it in a
                  config file you exec on map start.
                </li>
                <li>
                  <strong className="text-white">Auto-bhop not actually auto-jumping.</strong> Check
                  that <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_autobunnyhopping</code>{' '}
                  is set to 1 and that you&apos;re holding the jump key down — not tapping. The flag
                  enables continuous jumping while held.
                </li>
                <li>
                  <strong className="text-white">Speed feels slow even with 2000 air accel.</strong>{' '}
                  Your <code className="bg-gray-800 px-1.5 py-0.5 rounded text-green-400">sv_maxvelocity</code>{' '}
                  is still 3500 or lower, capping it. Bump to 7000.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Related practice setups</h2>
              <p>
                Bhop is rarely useful alone in CS2. The two practice loops it pairs best with:{' '}
                <Link href="/commands/noclip-bind" className="text-blue-400 hover:underline">
                  noclip
                </Link>{' '}
                for getting to bhop-relevant spots on official maps without running, and{' '}
                <Link href="/commands/cheats-commands-list" className="text-blue-400 hover:underline">
                  the wider sv_cheats command list
                </Link>{' '}
                for impact markers and visual debug while you&apos;re testing movement.
              </p>
              <p className="mt-3">
                If you&apos;re practicing movement for matchmaking specifically — not for fun surf —
                pair the default-speed preset above with{' '}
                <Link href="/commands/scroll-wheel-jump-bind" className="text-blue-400 hover:underline">
                  the scroll wheel jump bind
                </Link>
                . That combination is closest to what works in real games.
              </p>
            </section>
          </div>

          <aside className="mt-16 pt-8 border-t border-gray-800">
            <h2 className="text-lg font-bold text-white mb-4">Related commands</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/commands/scroll-wheel-jump-bind" className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors block">
                <h3 className="font-bold text-white mb-1">Scroll wheel jump bind</h3>
                <p className="text-sm text-gray-400">The bind that makes bhop actually work.</p>
              </Link>
              <Link href="/commands/noclip-bind" className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors block">
                <h3 className="font-bold text-white mb-1">Noclip bind</h3>
                <p className="text-sm text-gray-400">Fly to bhop test spots.</p>
              </Link>
              <Link href="/commands/cheats-commands-list" className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors block">
                <h3 className="font-bold text-white mb-1">Full sv_cheats commands list</h3>
                <p className="text-sm text-gray-400">Everything that needs sv_cheats 1.</p>
              </Link>
            </div>
          </aside>
        </article>
      </main>
    </div>
  );
}
