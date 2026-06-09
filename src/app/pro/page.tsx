import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import AdsterraAdSlot from '@/components/ads/AdsterraAdSlot';
import ProPlayersContent from '@/components/pages/ProPlayersContent';
import { proPlayers, featuredPlayers } from '@/data/pro-players';

export const metadata: Metadata = {
  title: 'CS2 Pro Settings — Sensitivity, DPI, Crosshair Codes (30+ Players)',
  description:
    'What CS2 pros actually play with: sens, DPI, cm/360°, crosshair share code, mouse, keyboard, monitor. s1mple, donk, ZywOo, NiKo, m0NESY and 25+ more, kept current.',
  keywords: [
    'cs2 pro settings',
    'pro settings cs2',
    'pro players settings',
    'cs2 pro player settings',
    'cs2 pro players settings',
    'pro player sensitivity',
    'cs2 pro sensitivity',
    'cs2 pros peripherals',
    's1mple settings',
    'zywoo settings',
    'donk settings',
    'm0nesy settings',
    'cs2 crosshair codes',
  ],
  alternates: { canonical: '/pro' },
  openGraph: {
    title: 'CS2 Pro Settings — Sens, DPI, Crosshair (30+ Players)',
    description: 'Live setups for s1mple, donk, ZywOo, NiKo, m0NESY and more — sens, DPI, crosshair share code and full gear.',
    type: 'website',
  },
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: proPlayers.slice(0, 10).map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `https://www.cs2practice.com/pro/${p.slug}`,
    name: `${p.name} CS2 settings`,
  })),
};

export default function ProPlayersPage() {
  const featured = proPlayers.filter(p => featuredPlayers.includes(p.slug));
  const others = proPlayers.filter(p => !featuredPlayers.includes(p.slug));

  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Header />
      <main className="flex-1 py-12 px-4">
        <ProPlayersContent featured={featured} others={others} />
        <AdsterraAdSlot />

        {/* SEO Article — server-rendered for crawlers */}
        <article className="container mx-auto max-w-3xl mt-20 pt-12 border-t border-gray-800 text-gray-300 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-3">How to actually use a pro&apos;s sensitivity</h2>
            <p>
              The single number that matters most on these pages isn&apos;t the raw sensitivity, it&apos;s{' '}
              <strong className="text-white">cm/360°</strong> — how many centimeters of mouse movement
              it takes to do one full in-game turn. A pro&apos;s in-game sensitivity is meaningless
              without their DPI, because the engine multiplies them. cm/360° normalizes both into a
              single number you can compare across players, mice, and games.
            </p>
            <p className="mt-3">
              s1mple plays around 35-37 cm/360° in CS2 — that&apos;s a low-sensitivity AWP setup
              built around large arm motions. donk and many recent stars sit closer to 18-25 cm/360°,
              a faster wrist-driven style suited to riflers and entry fraggers. The right number for
              you depends on role (AWPer vs rifler), arm clearance on your desk, and what felt good in
              your existing muscle memory — not on copying a top-1 player blind.
            </p>
            <p className="mt-3">
              If you&apos;re coming from Valorant, Apex, Fortnite or another game, plug the
              sensitivity into the{' '}
              <Link href="/tools/sensitivity-converter" className="text-blue-400 hover:underline">
                sensitivity converter
              </Link>{' '}
              to match cm/360°. The number is what transfers — the in-game slider value is not. A
              Valorant 0.4 at 800 DPI is not the same as a CS2 0.4 at 800 DPI.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">What the eDPI column means</h2>
            <p>
              eDPI = effective DPI = in-game sensitivity × mouse DPI. It&apos;s a quick way to
              compare sensitivity setups across players without doing the cm/360° math yourself.
              Lower eDPI means the player turns slower, which usually means a slower, more deliberate
              aim style. Higher eDPI means a faster, more reactive style.
            </p>
            <p className="mt-3">
              Most CS2 pros land between 600 and 1200 eDPI. AWPers cluster at the lower end (s1mple
              ~640, ZywOo ~528). Riflers and entries cluster higher (donk ~800, m0NESY ~1100). The
              outliers in either direction are usually players with specific gun-style preferences —
              for example, NiKo&apos;s relatively low eDPI even as a rifler reflects his preference
              for deliberate one-tap setups over spray transfers.
            </p>
            <p className="mt-3">
              For benchmarking your own sensitivity, run a session of{' '}
              <Link href="/play/tracking" className="text-blue-400 hover:underline">
                tracking
              </Link>{' '}
              and{' '}
              <Link href="/play/flicking" className="text-blue-400 hover:underline">
                flicking
              </Link>{' '}
              at your current eDPI, then try ±10% and ±20%. If your scores rise on the lower setting,
              your existing sensitivity is too fast. If they rise on the higher, too slow. Stop
              adjusting once two consecutive sessions don&apos;t improve.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Why each pro&apos;s page has a 4-section breakdown</h2>
            <p>
              The clickable detail page for every player splits the analysis into four sections:
              playstyle, settings context, who the setup suits, and recent results. The reason
              isn&apos;t to bulk up the page — it&apos;s to give you the{' '}
              <strong className="text-white">why</strong> behind a number rather than just the number.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                <strong className="text-white">Playstyle</strong> — AWPer, lurker, entry, support.
                A 35 cm/360° AWP sens is a different beast than a 35 cm/360° rifler sens; the same
                number serves a different purpose.
              </li>
              <li>
                <strong className="text-white">Settings context</strong> — why the player picked
                this DPI / sens / monitor combo. Often the choice traces back to a specific habit
                from CS:GO, an arm injury, or a desk geometry constraint.
              </li>
              <li>
                <strong className="text-white">Who the setup suits</strong> — a copy of a pro&apos;s
                settings only works if your role and physical setup matches theirs. The page calls
                out where the setup transfers and where it doesn&apos;t.
              </li>
              <li>
                <strong className="text-white">Recent results</strong> — context that ages over
                time. Settings change with rosters and patches; the page tracks the major moves.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Crosshair codes — paste and go</h2>
            <p>
              Every player page lists the player&apos;s CS2 crosshair share code. Copy it, open CS2,
              go to Settings → Game → Crosshair → Share / Import Crosshair, paste, and it&apos;s
              applied. No need to manually translate size, thickness, gap and color values one by one.
            </p>
            <p className="mt-3">
              If you want to browse crosshairs without committing to a single player&apos;s full
              kit, the{' '}
              <Link href="/crosshairs" className="text-blue-400 hover:underline">
                crosshairs gallery
              </Link>{' '}
              shows the visual preview of each one side by side. Useful when you&apos;re testing
              what shape and color works at your monitor brightness.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">Mouse, mousepad, monitor — what changes vs what doesn&apos;t</h2>
            <p>
              The peripherals list on each player page is informational. Hardware choices are mostly
              about what feels good in your hand, not about what wins games. A pro using a
              Logitech G Pro X Superlight is doing it because of weight and shape preference, not
              because the mouse is faster than an alternative — every modern competitive mouse polls
              fast enough that the difference is below human reaction.
            </p>
            <p className="mt-3">
              What does matter in the peripherals list:{' '}
              <strong className="text-white">monitor refresh rate</strong> (240Hz minimum for
              competitive play, 360Hz now common on tournament setups) and{' '}
              <strong className="text-white">mousepad surface</strong> (smooth glass-style pads for
              fast wrist players, cloth pads for arm players who want more stop friction). DPI itself
              is almost a non-factor at the 400-1600 range most pros use — pick a value that gives
              you whole-number sens settings, then never touch it again.
            </p>
            <p className="mt-3">
              For the in-game side that you actually have control over without buying anything, the{' '}
              <Link href="/commands/fps-max-bind" className="text-blue-400 hover:underline">
                fps_max setup
              </Link>{' '}
              and the rest of the matchmaking-legal binds in the{' '}
              <Link href="/commands" className="text-blue-400 hover:underline">
                commands hub
              </Link>{' '}
              are higher-leverage than any peripheral upgrade.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">How current are these settings</h2>
            <p>
              The settings here reflect the most recent confirmed source for each player — usually
              a 2025-2026 tournament setup interview, the player&apos;s own stream, or HLTV /
              ProSettings.net cross-referenced to the player&apos;s social. CS2&apos;s subtick
              system changed how some pros tune sensitivity from their CS:GO defaults, so settings
              from before October 2023 are treated as superseded.
            </p>
            <p className="mt-3">
              If you&apos;re reading a stale config from another site that lists CS:GO sensitivity
              for a CS2 player, the conversion isn&apos;t direct. A pro who played 1.6 sens in
              CS:GO is most likely playing the same in-game value in CS2 because Valve preserved
              the sensitivity scaling. But many pros adjusted slightly when subtick rolled out — so
              double-check against a recent tournament VOD if the number you see looks wrong.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
}
