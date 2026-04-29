import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Free FPS Gaming Tools | CS2 Practice',
  description: 'Free tools for FPS gamers. Sensitivity converter for CS2, Valorant, Apex, OW2 and more. Crosshair code library, pro player settings database. All tools work in your browser.',
  alternates: { canonical: '/tools' },
};

const tools = [
  {
    href: '/tools/sensitivity-converter',
    title: 'Sensitivity Converter',
    description: 'Convert sensitivity between CS2, Valorant, Apex, OW2, and more',
    icon: '🔄',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    href: '/crosshairs',
    title: 'Crosshair Codes',
    description: 'Pro player crosshair codes ready to copy and paste',
    icon: '🎯',
    color: 'from-red-500 to-orange-500',
  },
  {
    href: '/pro',
    title: 'Pro Settings Database',
    description: 'Complete settings for professional CS2 players',
    icon: '⚙️',
    color: 'from-purple-500 to-pink-500',
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              FPS Gaming Tools
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Free utilities to help you improve your FPS gaming setup
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-gray-800 rounded-2xl p-6 hover:bg-gray-750 transition-all hover:scale-[1.02] hover:shadow-xl"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl mb-4`}
                >
                  {tool.icon}
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  {tool.title}
                </h2>
                <p className="text-gray-400">{tool.description}</p>
              </Link>
            ))}
          </div>

          {/* SEO content */}
          <div className="mt-20 space-y-10 text-gray-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Why these exist</h2>
              <p>
                Most people who play FPS bounce between games. CS2, Valorant, maybe Apex if
                you&apos;ve got friends still playing it. Each game uses its own sensitivity
                scale, its own crosshair config, its own settings UI. Switching games means
                re-doing all that math, which is annoying every single time.
              </p>
              <p className="mt-3">
                These three tools are stuff I needed myself, so I built them. They run in your
                browser, don&apos;t need an account, don&apos;t store anything on a server.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">
                <Link href="/tools/sensitivity-converter" className="hover:text-blue-400">
                  Sensitivity Converter
                </Link>
              </h2>
              <p>
                CS2 uses cl_sensitivity. Valorant uses a 0-1 slider. Apex has its own scale per
                zoom level. None of those numbers are comparable. The only number that matters
                is cm/360°, the actual physical mouse distance for a full turn. That&apos;s
                what your hand learns.
              </p>
              <p className="mt-3">
                The converter takes your sensitivity in one game, computes cm/360°, then spits
                out the equivalent in every other game. Switch from CS2 to Valorant in 10
                seconds without recalibrating.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">
                <Link href="/crosshairs" className="hover:text-blue-400">
                  Crosshair Codes
                </Link>
              </h2>
              <p>
                CS2 lets you share crosshairs as a code string. Most pros publish theirs,
                community favorites get passed around on Reddit. The library has the popular
                ones (s1mple, ZywOo, NiKo, donk, m0NESY, plus minimal/static/classic presets)
                with one-click copy. Paste in CS2&apos;s share menu and you&apos;re using
                whatever crosshair the pros use this season.
              </p>
              <p className="mt-3">
                I test every code in CS2 before adding it. If something&apos;s broken, the
                feedback button takes me there.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">
                <Link href="/pro" className="hover:text-blue-400">
                  Pro Settings Database
                </Link>
              </h2>
              <p>
                Full setup for each player: sensitivity, DPI, eDPI, cm/360°, raw input, accel,
                zoom sens, video resolution, aspect ratio, scaling, crosshair code, and gear
                (mouse, mousepad, keyboard, monitor, headset). Sources are official team pages,
                player streams, and Liquipedia.
              </p>
              <p className="mt-3">
                Currently 30+ active CS2 pros, kept up to date when players publicly change
                configs. Pros tweak settings constantly though, so if something looks off, the
                contact link is at the bottom.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-3">Used together</h2>
              <p>
                Tools by themselves don&apos;t make anyone better. They remove friction. Lock in
                a sensitivity that transfers across your games, copy a crosshair you can
                actually see, then jump into{' '}
                <Link href="/play" className="text-blue-400 hover:underline">
                  the trainer
                </Link>{' '}
                for 5-10 minutes before queueing. That&apos;s the whole loop.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
