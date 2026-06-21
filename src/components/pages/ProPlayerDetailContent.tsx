'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { ProPlayer, countryToFlag, getPlayerConfig, getPlayerFaqs, getPlayerCrosshairDescription } from '@/data/pro-players';
import CopyButton from '@/components/ui/CopyButton';
import { CrosshairCodePreview } from '@/components/ui/CrosshairPreview';
import AdsterraAdSlot from '@/components/ads/AdsterraAdSlot';
import { amazonSearchLink } from '@/lib/amazon-affiliate';
import { trackEvent } from '@/lib/analytics';

interface ProPlayerDetailContentProps {
  player: ProPlayer;
  similarPlayers: ProPlayer[];
}

function GearRow({
  label,
  value,
  gearType,
  playerSlug,
  playerName,
  note,
}: {
  label: string;
  value: string;
  gearType: string;
  playerSlug: string;
  playerName: string;
  note?: string;
}) {
  const href = amazonSearchLink(value);
  const handleClick = () => {
    trackEvent('click_pro_gear', {
      player: playerSlug,
      player_name: playerName,
      gear_type: gearType,
      product: value,
      outbound_url: href,
      link_destination: 'amazon_search',
    });
  };

  return (
    <div className="bg-gray-900/50 hover:bg-gray-900 rounded-lg transition-colors group">
      <a
        href={href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        onClick={handleClick}
        onAuxClick={handleClick}
        className="flex justify-between items-center py-3 px-4"
      >
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-medium group-hover:text-blue-400 flex flex-col items-end text-right">
          <span className="flex items-center gap-1">
            {value}
            <svg className="w-3 h-3 opacity-40 group-hover:opacity-100 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </span>
          <span className="text-xs font-normal text-gray-500 group-hover:text-blue-300">
            Compare current listings
          </span>
        </span>
      </a>
      {note && (
        <p className="text-gray-500 text-xs px-4 pb-3 -mt-1 leading-relaxed">{note}</p>
      )}
    </div>
  );
}

export default function ProPlayerDetailContent({ player, similarPlayers }: ProPlayerDetailContentProps) {
  const { t } = useTranslation();
  const config = getPlayerConfig(player);
  const faqs = getPlayerFaqs(player);
  const crosshairDesc = getPlayerCrosshairDescription(player);
  const roleText = player.role.toLowerCase();
  const recommendedRoutine = roleText.includes('awp')
    ? {
        href: '/play/routines/awp-flick',
        label: 'Run the AWPer flick routine',
        reason: 'Test the setup through scoped target acquisition and controlled flicks.',
      }
    : roleText.includes('entry') || roleText.includes('rifl')
    ? {
        href: '/play/routines/rifle-entry',
        label: 'Run the rifle entry routine',
        reason: 'Test the setup through entry-style target switches and first-bullet control.',
      }
    : {
        href: '/play/quick-warmup',
        label: 'Run the 90-second setup test',
        reason: 'Test the setup across precision, tracking, and flicking before committing to it.',
      };

  return (
    <div className="container mx-auto max-w-4xl">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <Link href="/pro" className="text-gray-400 hover:text-white">{t('pro_all_players')}</Link>
        <span className="text-gray-600 mx-2">/</span>
        <span className="text-white">{player.name}</span>
      </nav>

      {/* Player Header */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 mb-8 border border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{countryToFlag(player.country)}</span>
              <h1 className="text-4xl font-bold text-white">{player.name}</h1>
            </div>
            <p className="text-gray-400 text-lg">{player.realName}</p>
            <div className="flex items-center gap-4 mt-3">
              <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium">
                {player.team}
              </span>
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                {player.role}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            {player.twitter && (
              <a
                href={`https://twitter.com/${player.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                title="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            )}
            {player.twitch && (
              <a
                href={`https://twitch.tv/${player.twitch}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-700 hover:bg-purple-600 rounded-lg transition-colors"
                title="Twitch"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Achievements */}
        {player.achievements.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="flex flex-wrap gap-2">
              {player.achievements.map((achievement, i) => (
                <span key={i} className="px-3 py-1 bg-yellow-600/20 text-yellow-400 rounded-full text-sm">
                  {achievement}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Answer — plain-language summary for featured snippets & AI answer engines */}
      <div className="bg-gray-800/60 rounded-xl p-6 mb-8 border-l-4 border-blue-500">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wide">{t('pro_quick_answer')}</h2>
          {player.lastUpdated && (
            <span className="text-xs text-gray-500">{t('pro_last_updated')} {player.lastUpdated}</span>
          )}
        </div>
        <p className="text-gray-200 leading-relaxed">
          {player.name} plays CS2 at <strong className="text-white">{player.sensitivity} sensitivity</strong> on{' '}
          <strong className="text-white">{player.dpi} DPI</strong> (eDPI {player.edpi}, {player.cm360.toFixed(1)} cm/360°),
          at <strong className="text-white">{player.resolution}</strong> {player.aspectRatio} {player.scalingMode.toLowerCase()}.
          {` His crosshair is a ${crosshairDesc.toLowerCase()}.`} He uses a{' '}
          <strong className="text-white">{player.mouse}</strong> and a <strong className="text-white">{player.keyboard}</strong>.
          The crosshair code, a copy-paste config and full gear are below.
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Mouse Settings */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span>🖱️</span> {t('pro_mouse_settings')}
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400">{t('pro_sensitivity')}</span>
              <span className="text-white font-bold text-lg">{player.sensitivity}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400">DPI</span>
              <span className="text-white font-bold text-lg">{player.dpi}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400">eDPI</span>
              <span className="text-blue-400 font-bold text-lg">{player.edpi}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400">cm/360°</span>
              <span className="text-white font-bold text-lg">{player.cm360.toFixed(2)} cm</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400">{t('pro_zoom_sens')}</span>
              <span className="text-white font-bold">{player.zoomSensitivity}</span>
            </div>
          </div>
        </div>

        {/* Video Settings */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span>🖥️</span> {t('pro_video_settings')}
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400">{t('pro_resolution')}</span>
              <span className="text-white font-bold">{player.resolution}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400">{t('pro_aspect_ratio')}</span>
              <span className="text-white font-bold">{player.aspectRatio}</span>
            </div>
            <div className={`flex justify-between items-center py-2 ${player.viewmodel ? 'border-b border-gray-700' : ''}`}>
              <span className="text-gray-400">{t('pro_scaling_mode')}</span>
              <span className="text-white font-bold">{player.scalingMode}</span>
            </div>
            {player.viewmodel && (
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-400">{t('pro_viewmodel')}</span>
                <span className="text-white font-bold text-sm">
                  FOV {player.viewmodel.fov} · {player.viewmodel.offsetX}/{player.viewmodel.offsetY}/{player.viewmodel.offsetZ}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Crosshair */}
      <div className="bg-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span>🎯</span> {t('pro_crosshair')}
        </h2>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-20 h-20 shrink-0 bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
            <CrosshairCodePreview code={player.crosshairCode} size={76} background="transparent" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between gap-2">
                <code className="text-green-400 text-sm break-all">{player.crosshairCode}</code>
                <CopyButton
                  text={player.crosshairCode}
                  trackingEvent="copy_crosshair"
                  trackingParams={{
                    source: 'pro_player_page',
                    player: player.slug,
                  }}
                />
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-2">{crosshairDesc}</p>
          </div>
        </div>
        <Link
          href={`/tools/crosshair-generator?code=${encodeURIComponent(player.crosshairCode)}`}
          onClick={() =>
            trackEvent('pro_crosshair_edit_click', {
              player: player.slug,
              source: 'pro_player_page',
            })
          }
          className="text-blue-400 hover:underline text-sm"
        >
          Edit this crosshair in the generator →
        </Link>
        <p className="text-gray-500 text-xs mt-3">
          {t('pro_crosshair_tip')}
        </p>
      </div>

      {/* Config / autoexec — generated from verified settings, serves "{player} config / cfg" searches */}
      <div className="bg-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span>⚙️</span> {player.name} {t('pro_config')}
        </h2>
        <div className="bg-gray-900 rounded-lg p-4 mb-3 relative">
          <div className="absolute top-3 right-3">
            <CopyButton
              text={config}
              trackingEvent="copy_config"
              trackingParams={{ source: 'pro_player_page', player: player.slug }}
            />
          </div>
          <pre className="text-green-400 text-xs sm:text-sm whitespace-pre-wrap break-all leading-relaxed pr-12 font-mono">
            {config}
          </pre>
        </div>
        <p className="text-gray-500 text-xs">{t('pro_config_tip')}</p>
      </div>

      {/* Launch Options */}
      {player.launchOptions && (
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span>🚀</span> {player.name} {t('pro_launch_options')}
          </h2>
          <div className="bg-gray-900 rounded-lg p-4 flex items-center justify-between gap-3">
            <code className="text-green-400 text-sm break-all font-mono">{player.launchOptions}</code>
            <CopyButton
              text={player.launchOptions}
              trackingEvent="copy_launch_options"
              trackingParams={{ source: 'pro_player_page', player: player.slug }}
            />
          </div>
          <p className="text-gray-500 text-xs mt-3">
            Steam → right-click CS2 → Properties → Launch Options → paste.
          </p>
        </div>
      )}

      {/* Gaming Gear */}
      <div className="bg-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span>🎮</span> {t('pro_gaming_gear')}
        </h2>
        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
          Use this as a quick reference for {player.name}&apos;s reported setup. Each link opens Amazon search results for the gear name so you can compare current listings, prices, reviews, and availability before buying.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <GearRow label={t('pro_mouse')} value={player.mouse} gearType="mouse" playerSlug={player.slug} playerName={player.name} note={player.gearNotes?.mouse} />
          <GearRow label={t('pro_mousepad')} value={player.mousepad} gearType="mousepad" playerSlug={player.slug} playerName={player.name} note={player.gearNotes?.mousepad} />
          <GearRow label={t('pro_keyboard')} value={player.keyboard} gearType="keyboard" playerSlug={player.slug} playerName={player.name} note={player.gearNotes?.keyboard} />
          <GearRow label={t('pro_monitor')} value={player.monitor} gearType="monitor" playerSlug={player.slug} playerName={player.name} note={player.gearNotes?.monitor} />
          <div className="md:col-span-2">
            <GearRow label={t('pro_headset')} value={player.headset} gearType="headset" playerSlug={player.slug} playerName={player.name} note={player.gearNotes?.headset} />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Product links go to Amazon. As an Amazon Associate we may earn from qualifying purchases at no extra cost to you. Gear data can change, so verify the exact model and seller before checkout.
        </p>
      </div>

      {/* Player Analysis */}
      {player.analysis && (
        <div className="bg-gray-800 rounded-xl p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span>📖</span> About {player.name}&apos;s Setup
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Playstyle</h3>
              <p className="text-gray-300 leading-relaxed">{player.analysis.playstyle}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Why These Settings</h3>
              <p className="text-gray-300 leading-relaxed">{player.analysis.settingsContext}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Who Should Try This</h3>
              <p className="text-gray-300 leading-relaxed">{player.analysis.suitableFor}</p>
            </div>
            {player.analysis.careerHighlights && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Career Highlights</h3>
                <p className="text-gray-300 leading-relaxed">{player.analysis.careerHighlights}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <AdsterraAdSlot className="mb-8" />

      {/* Practice CTA */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 mb-8 border border-blue-500/30">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-300">
          Try the setup, then measure it
        </p>
        <h3 className="mt-2 text-xl font-bold">
          {t('pro_practice_with')} {player.name}{t('pro_settings_suffix')}
        </h3>
        <p className="mt-2 text-sm text-gray-300">
          Import {player.sensitivity} sensitivity at {player.dpi} DPI into this browser,
          then test it in a routine matched to {player.name}&apos;s {player.role.toLowerCase()} role.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <Link
            href={`/settings?sens=${player.sensitivity}&dpi=${player.dpi}&source=pro_${player.slug}`}
            onClick={() =>
              trackEvent('pro_setup_apply', {
                player: player.slug,
                sensitivity: player.sensitivity,
                dpi: player.dpi,
              })
            }
            className="rounded-lg bg-blue-600 px-5 py-3 text-center font-semibold transition-colors hover:bg-blue-500"
          >
            1. Import {player.name}&apos;s sensitivity
          </Link>
          <Link
            href={recommendedRoutine.href}
            onClick={() =>
              trackEvent('pro_training_click', {
                player: player.slug,
                player_role: player.role,
                routine: recommendedRoutine.href,
              })
            }
            className="rounded-lg bg-purple-600 px-5 py-3 text-center font-semibold transition-colors hover:bg-purple-500"
          >
            2. {recommendedRoutine.label}
          </Link>
        </div>
        <p className="mt-3 text-xs text-gray-400">{recommendedRoutine.reason}</p>
      </div>

      {/* FAQ — visible Q&A; matching FAQPage JSON-LD is emitted in the page route */}
      {faqs.length > 0 && (
        <div className="bg-gray-800 rounded-xl p-6 md:p-8 mb-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span>❓</span> {t('pro_faq')}
          </h2>
          <div className="space-y-5">
            {faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="text-base font-semibold text-white mb-1.5">{faq.q}</h3>
                <p className="text-gray-300 leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Similar Players */}
      {similarPlayers.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-4">{t('pro_similar_players')}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {similarPlayers.map((p) => (
              <Link
                key={p.slug}
                href={`/pro/${p.slug}`}
                onClick={() =>
                  trackEvent('pro_similar_player_click', {
                    from_player: player.slug,
                    to_player: p.slug,
                  })
                }
                className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span>{countryToFlag(p.country)}</span>
                  <span className="font-bold text-white">{p.name}</span>
                </div>
                <div className="text-sm text-gray-400">{p.team}</div>
                <div className="text-sm text-gray-500 mt-1">eDPI: {p.edpi}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
