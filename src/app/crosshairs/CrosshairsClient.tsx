'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { crosshairs, categories, Crosshair } from '@/data/crosshairs';
import { CrosshairCodePreview } from '@/components/ui/CrosshairPreview';
import { useTranslation } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';
import ContentTrainingCTA from '@/components/growth/ContentTrainingCTA';

export default function CrosshairsClient() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<Crosshair['category'] | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const filteredCrosshairs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return crosshairs.filter((crosshair) => {
      const matchesCategory =
        selectedCategory === 'all' || crosshair.category === selectedCategory;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [crosshair.name, crosshair.player, crosshair.team, crosshair.description, crosshair.color]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  const selectCategory = (category: Crosshair['category'] | 'all') => {
    setSelectedCategory(category);
    trackEvent('hub_filter', {
      hub: 'crosshairs',
      filter_type: 'category',
      filter_value: category,
    });
  };

  const handleCopy = async (crosshair: Crosshair) => {
    try {
      await navigator.clipboard.writeText(crosshair.code);
      setCopiedId(crosshair.id);
      trackEvent('copy_crosshair', {
        crosshair_id: crosshair.id,
        crosshair_name: crosshair.name,
        category: crosshair.category,
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('crosshair_title')}
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('crosshair_subtitle')}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {crosshairs.length} crosshairs &middot; {crosshairs.filter(c => c.category === 'pro').length} pro players &middot; copy-paste ready
            </p>
            <Link
              href="/tools/crosshair-generator"
              className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
            >
              🎯 Build your own — CS2 Crosshair Generator
            </Link>

            {/* Browse by type — internal links to dedicated landing pages */}
            <nav className="flex flex-wrap justify-center gap-x-2 gap-y-1 mt-5 text-sm text-gray-400">
              <span>Jump to:</span>
              <Link href="/crosshairs/dot" className="text-blue-400 hover:underline">
                Dot crosshair codes
              </Link>
              <span className="text-gray-600">·</span>
              <Link href="/crosshairs/pro" className="text-blue-400 hover:underline">
                Pro player crosshairs
              </Link>
            </nav>
          </div>

          <section className="mb-8 grid gap-4 md:grid-cols-3">
            <Link
              href="/crosshairs/pro"
              onClick={() => trackEvent('hub_path_click', { hub: 'crosshairs', path: 'pro' })}
              className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-5 hover:border-yellow-400"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-yellow-300">Copy a player</span>
              <h2 className="mt-2 text-xl font-bold text-white">Pro crosshair codes</h2>
              <p className="mt-2 text-sm text-gray-400">s1mple, donk, ZywOo, NiKo, m0NESY, and the full player list.</p>
            </Link>
            <Link
              href="/crosshairs/dot"
              onClick={() => trackEvent('hub_path_click', { hub: 'crosshairs', path: 'dot' })}
              className="rounded-xl border border-green-500/30 bg-green-500/10 p-5 hover:border-green-400"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-green-300">Minimal</span>
              <h2 className="mt-2 text-xl font-bold text-white">Dot crosshair codes</h2>
              <p className="mt-2 text-sm text-gray-400">Pure dots and center-dot variants with copy-paste codes.</p>
            </Link>
            <Link
              href="/tools/crosshair-generator"
              onClick={() => trackEvent('hub_path_click', { hub: 'crosshairs', path: 'generator' })}
              className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-5 hover:border-blue-400"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-blue-300">Customize</span>
              <h2 className="mt-2 text-xl font-bold text-white">Crosshair generator</h2>
              <p className="mt-2 text-sm text-gray-400">Start from a pro preset, change size, gap, color, and export a code.</p>
            </Link>
          </section>

          <div className="mx-auto mb-6 max-w-xl">
            <label className="text-sm font-medium text-gray-300" htmlFor="crosshair-search">
              Search by player, team, style, or color
            </label>
            <input
              id="crosshair-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try donk, Vitality, dot, cyan..."
              className="mt-2 w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => selectCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {t('crosshair_all')} ({crosshairs.length})
            </button>
            {categories.map(cat => {
              const count = crosshairs.filter(c => c.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => selectCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Crosshair Grid */}
          <p className="mb-4 text-sm text-gray-500">
            Showing {filteredCrosshairs.length} of {crosshairs.length} crosshairs.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCrosshairs.map((crosshair) => (
              <div
                key={crosshair.id}
                className="bg-gray-800 rounded-xl p-5 hover:bg-gray-700 transition-colors"
              >
                {/* Preview & Name */}
                <div className="flex items-center gap-4 mb-4">
                  {/* Crosshair Preview */}
                  <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <CrosshairCodePreview
                      code={crosshair.code}
                      size={60}
                      background="transparent"
                      fallback={<CrosshairPreview color={crosshair.color} size={crosshair.size} />}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg">{crosshair.name}</h3>
                    {crosshair.player && crosshair.team && (
                      <Link
                        href={`/pro/${crosshair.id}`}
                        className="text-sm text-blue-400 hover:underline"
                      >
                        {crosshair.team}
                      </Link>
                    )}
                    {!crosshair.player && (
                      <span className="text-sm text-gray-500 capitalize">{crosshair.category}</span>
                    )}
                  </div>
                </div>

                {/* Description */}
                {crosshair.description && (
                  <p className="text-sm text-gray-400 mb-3">{crosshair.description}</p>
                )}

                {/* Code */}
                <div className="bg-gray-900 rounded-lg p-3 mb-3">
                  <code className="text-xs text-green-400 break-all">{crosshair.code}</code>
                </div>

                {/* Copy Button */}
                <button
                  onClick={() => handleCopy(crosshair)}
                  className={`w-full py-2 rounded-lg font-medium transition-colors ${
                    copiedId === crosshair.id
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  {copiedId === crosshair.id ? `✓ ${t('crosshair_copied')}` : t('crosshair_copy')}
                </button>
              </div>
            ))}
          </div>
          {filteredCrosshairs.length === 0 && (
            <div className="rounded-xl border border-gray-800 bg-gray-900 p-8 text-center text-gray-400">
              No crosshair matches this search. Try a player name, team, color, or clear the filter.
            </div>
          )}

          {/* How to Use */}
          <div className="mt-12 bg-gray-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4">{t('crosshair_how_to')}</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>{t('crosshair_step1')}</li>
              <li>{t('crosshair_step2')} <strong className="text-white">Settings</strong></li>
              <li>{t('crosshair_step3')} <strong className="text-white">Game → Crosshair</strong></li>
              <li>{t('crosshair_step4')} <strong className="text-white">Share or Import</strong></li>
              <li>{t('crosshair_step5')} <strong className="text-white">Import</strong></li>
            </ol>
            <p className="mt-4 text-sm text-gray-500">
              {t('crosshair_tip')} <code className="text-green-400">cl_crosshair_sharecode &quot;CODE&quot;</code>
            </p>
          </div>

          {/* FAQ Section for SEO */}
          <div className="mt-8 bg-gray-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-white mb-2">How do I copy and paste a crosshair code in CS2?</h3>
                <p className="text-gray-400 text-sm">
                  Click the &quot;Copy Code&quot; button next to any crosshair above. Then open CS2, go to Settings &rarr; Game &rarr; Crosshair &rarr; Share or Import, paste the code, and click Import. You can also open the console (~) and type <code className="text-green-400">cl_crosshair_sharecode &quot;YOUR_CODE&quot;</code>.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">What crosshair do most CS2 pros use?</h3>
                <p className="text-gray-400 text-sm">
                  Most CS2 professionals use small, static crosshairs in green or cyan. The most common style is a thin cross with a small gap and no dot. Players like s1mple, donk, and ZywOo all use variations of this classic setup. Check the Pro Players filter above to see all pro crosshairs.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Do CSGO crosshair codes work in CS2?</h3>
                <p className="text-gray-400 text-sm">
                  Yes. CS2 uses the same crosshair share code format as CS:GO. Any CSGO crosshair code starting with &quot;CSGO-&quot; will work in CS2. Simply import it the same way through Settings or the console.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">What is the best crosshair for beginners?</h3>
                <p className="text-gray-400 text-sm">
                  For beginners, a small static green crosshair with a center dot is a good starting point. It provides clear visibility without being distracting. Try the &quot;Classic Static&quot; or &quot;Simple Dot&quot; options from our community collection, then adjust from there as you develop your preference.
                </p>
              </div>
            </div>
          </div>

          {/* Long-form SEO content — written like notes, not marketing */}
          <article className="mt-12 space-y-12 text-gray-300">

            {/* Most Searched Pro Crosshairs */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">The crosshairs people actually search for</h2>
              <p className="mb-4 text-gray-400">
                A handful of pro crosshairs get searched far more than the rest — s1mple, donk,
                ZywOo, NiKo, m0NESY. They&apos;re all in the grid above with a copy button (filter
                by Pro Players). For every pro&apos;s code in one place, plus what each setup is and
                why people copy it, see the{' '}
                <Link href="/crosshairs/pro" className="text-blue-400 hover:underline">
                  CS2 pro player crosshair codes page
                </Link>
                . For a player&apos;s full sensitivity, DPI and gear, open their{' '}
                <Link href="/pro" className="text-blue-400 hover:underline">
                  pro settings page
                </Link>
                .
              </p>
            </section>

            {/* Dot Crosshair Codes — teaser; full content lives on /crosshairs/dot */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Looking for a dot crosshair?</h2>
              <p className="mb-3">
                A pure dot — no cross lines, just a center dot — is one of the most searched CS2
                setups. Grab dot codes from the grid above with the{' '}
                <strong className="text-white">Dot</strong> filter, or head to the dedicated{' '}
                <Link href="/crosshairs/dot" className="text-blue-400 hover:underline">
                  CS2 dot crosshair codes page
                </Link>{' '}
                for the full set: pure-dot codes, a build-from-scratch guide, CSGO copy-paste
                compatibility, and when a dot actually helps your aim.
              </p>
            </section>

            {/* Funny / Cute Crosshair Codes */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Funny and cute crosshair codes</h2>
              <p className="mb-3">
                Sometimes you don&apos;t want a tryhard pro crosshair. You want something that
                makes you laugh when you flick onto an enemy&apos;s head. The grid above has a few
                of these — comically large, weird colors, dynamic ones that bounce around like
                a sprinkler.
              </p>
              <p className="mb-3">
                These are not optimal. They&apos;ll cost you accuracy. But for warmup,
                deathmatch, retake servers, or community modes where you&apos;re messing around,
                they&apos;re fun. Some people also use them as a deliberate handicap during aim
                training: if you can hit shots through a giant pink crosshair, your real one
                will feel surgical when you switch back.
              </p>
              <p className="text-sm text-gray-400">
                Filter by &quot;Popular&quot; or &quot;Classic&quot; to find the meme-tier ones.
                We won&apos;t name names — half the joy is finding one that matches the
                exact mood you&apos;re queuing in.
              </p>
            </section>

            {/* Tips for Choosing Your Own */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">If you don&apos;t want to copy a pro</h2>
              <p className="mb-3">
                Most of the codes here are pro player crosshairs. They work for those players
                because those players are good. They will also work for you, mostly. But if you
                want to actually pick one that fits how you play, here&apos;s what matters and
                what doesn&apos;t.
              </p>
              <h3 className="text-lg font-semibold text-white mt-4 mb-2">Things that matter</h3>
              <p className="mb-3">
                <strong className="text-white">Static, not dynamic.</strong> Dynamic crosshairs
                move when you do. Most pros disabled them years ago because the movement gives
                you false feedback about where your bullets actually go in CS2&apos;s netcode.
                Static is the move.
              </p>
              <p className="mb-3">
                <strong className="text-white">Color contrast against the maps you play.</strong>
                {' '}Cyan and pink stand out on most maps. Green works on cs_office and not much
                else. Red gets eaten alive by Inferno and Mirage textures. If you keep losing your
                crosshair on a specific map, it&apos;s the color, not your eyes.
              </p>
              <p className="mb-3">
                <strong className="text-white">Size relative to your monitor and resolution.</strong>
                {' '}A &quot;small&quot; crosshair on 1024×768 stretched is huge on 1920×1080. The
                pro codes here assume native 1080p or 1440p; if you play a stretched res, expect
                to scale things up.
              </p>
              <h3 className="text-lg font-semibold text-white mt-5 mb-2">Things that don&apos;t matter as much as you think</h3>
              <p className="mb-3">
                <strong className="text-white">The exact gap value.</strong> Anywhere from -2 to 2
                works fine. Pick one and stop adjusting.
              </p>
              <p className="mb-3">
                <strong className="text-white">Outline thickness.</strong> Either you have one or
                you don&apos;t. The exact value is barely visible.
              </p>
              <p className="mb-3">
                <strong className="text-white">Your friend&apos;s opinion.</strong> Crosshairs are
                personal. Your friend&apos;s &quot;ugly&quot; crosshair might be the one that lets
                you finally hit shots. Try it for a week before you switch back.
              </p>
            </section>

            {/* Detailed import tutorial — replaces / supplements the short version above */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How to import a CS2 crosshair code (the full version)</h2>
              <p className="mb-3">
                The short answer: copy the code, open CS2, paste, done. The full answer covers
                what to do when the import button is greyed out, what to do if your code is from
                CS:GO, and how to use the console as a faster path.
              </p>

              <h3 className="text-lg font-semibold text-white mt-4 mb-2">Through the menu</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>Click the green <strong className="text-white">Copy</strong> button next to any crosshair above. Your clipboard now has the share code.</li>
                <li>Launch CS2 (or alt-tab to it if it&apos;s already open).</li>
                <li>Open <strong className="text-white">Settings</strong> from the main menu, then go to <strong className="text-white">Game → Crosshair</strong>.</li>
                <li>Click the <strong className="text-white">Share or Import</strong> button at the top of the crosshair settings panel.</li>
                <li>Paste your code (Ctrl+V) and hit <strong className="text-white">Import</strong>. The preview should update immediately.</li>
              </ol>

              <h3 className="text-lg font-semibold text-white mt-5 mb-2">Through the console (faster)</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>Make sure the developer console is enabled: Settings → Game → Enable Developer Console → Yes.</li>
                <li>In game or in the menu, press <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-xs">~</kbd> to open the console.</li>
                <li>Type <code className="text-green-400">cl_crosshair_sharecode &quot;CSGO-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX&quot;</code>, replacing the X&apos;s with your code.</li>
                <li>Hit Enter. Your crosshair changes immediately.</li>
              </ol>

              <h3 className="text-lg font-semibold text-white mt-5 mb-2">If it doesn&apos;t work</h3>
              <p className="mb-3">
                <strong className="text-white">&quot;Import&quot; button is greyed out.</strong> The
                code on your clipboard is malformed. Re-copy it from above — sometimes a paste
                strips characters if you went through a chat program.
              </p>
              <p className="mb-3">
                <strong className="text-white">Code starts with CSGO-, will it work in CS2?</strong>
                {' '}Yes. Same format. Don&apos;t change the prefix.
              </p>
              <p className="mb-3">
                <strong className="text-white">Crosshair imported but looks different from the
                preview.</strong> Most likely your <code className="text-green-400">crosshair_recoil
                </code>{' '}or{' '}<code className="text-green-400">cl_crosshairstyle</code>{' '}
                value is overriding part of the import. Reset both to defaults and re-import.
              </p>
            </section>

            {/* CSGO compatibility */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">CSGO crosshair codes in CS2</h2>
              <p className="mb-3">
                Every code on this page starts with <code className="text-green-400">CSGO-</code>.
                That&apos;s not a typo — Valve kept the same share code format in CS2, so any code
                you saved from CS:GO still imports cleanly. The only differences live in the new
                CS2 settings (like the recoil-aware crosshair toggle), which the share code
                doesn&apos;t carry. If you want full parity with how a pro&apos;s crosshair looks
                in their stream, copy the share code, then check their{' '}
                <Link href="/pro" className="text-blue-400 hover:underline">full settings page</Link>{' '}
                for any extra console commands they run on top.
              </p>
            </section>
          </article>

          <ContentTrainingCTA
            sourcePage="crosshairs"
            title={t('crosshair_practice_cta')}
            description="Copy a crosshair, then test whether you can see it clearly while clicking targets at speed."
            primaryHref="/play/gridshot"
            primaryLabel={t('start_training')}
          />
        </div>
      </main>
    </div>
  );
}

// Simple crosshair preview component
function CrosshairPreview({ color, size }: { color: string; size: 'small' | 'medium' | 'large' }) {
  const sizeMap = { small: 8, medium: 12, large: 16 };
  const lineLength = sizeMap[size];
  const gap = 2;
  const thickness = 2;

  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      {/* Horizontal lines */}
      <rect x={20 - lineLength - gap} y={20 - thickness/2} width={lineLength} height={thickness} fill={color} />
      <rect x={20 + gap} y={20 - thickness/2} width={lineLength} height={thickness} fill={color} />
      {/* Vertical lines */}
      <rect x={20 - thickness/2} y={20 - lineLength - gap} width={thickness} height={lineLength} fill={color} />
      <rect x={20 - thickness/2} y={20 + gap} width={thickness} height={lineLength} fill={color} />
      {/* Center dot */}
      <circle cx="20" cy="20" r="1.5" fill={color} />
    </svg>
  );
}
