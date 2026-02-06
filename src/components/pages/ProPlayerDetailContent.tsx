'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { ProPlayer, countryToFlag } from '@/data/pro-players';
import CopyButton from '@/components/ui/CopyButton';

interface ProPlayerDetailContentProps {
  player: ProPlayer;
  similarPlayers: ProPlayer[];
}

export default function ProPlayerDetailContent({ player, similarPlayers }: ProPlayerDetailContentProps) {
  const { t } = useTranslation();

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
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400">{t('pro_scaling_mode')}</span>
              <span className="text-white font-bold">{player.scalingMode}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Crosshair */}
      <div className="bg-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span>🎯</span> {t('pro_crosshair')}
        </h2>
        <div className="bg-gray-900 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <code className="text-green-400 text-sm break-all">{player.crosshairCode}</code>
            <CopyButton text={player.crosshairCode} />
          </div>
        </div>
        {player.crosshairDescription && (
          <p className="text-gray-400 text-sm">{player.crosshairDescription}</p>
        )}
        <p className="text-gray-500 text-xs mt-3">
          {t('pro_crosshair_tip')}
        </p>
      </div>

      {/* Gaming Gear */}
      <div className="bg-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span>🎮</span> {t('pro_gaming_gear')}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex justify-between items-center py-3 px-4 bg-gray-900/50 rounded-lg">
            <span className="text-gray-400">{t('pro_mouse')}</span>
            <span className="text-white font-medium">{player.mouse}</span>
          </div>
          <div className="flex justify-between items-center py-3 px-4 bg-gray-900/50 rounded-lg">
            <span className="text-gray-400">{t('pro_mousepad')}</span>
            <span className="text-white font-medium">{player.mousepad}</span>
          </div>
          <div className="flex justify-between items-center py-3 px-4 bg-gray-900/50 rounded-lg">
            <span className="text-gray-400">{t('pro_keyboard')}</span>
            <span className="text-white font-medium">{player.keyboard}</span>
          </div>
          <div className="flex justify-between items-center py-3 px-4 bg-gray-900/50 rounded-lg">
            <span className="text-gray-400">{t('pro_monitor')}</span>
            <span className="text-white font-medium">{player.monitor}</span>
          </div>
          <div className="flex justify-between items-center py-3 px-4 bg-gray-900/50 rounded-lg md:col-span-2">
            <span className="text-gray-400">{t('pro_headset')}</span>
            <span className="text-white font-medium">{player.headset}</span>
          </div>
        </div>
      </div>

      {/* Practice CTA */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 mb-8 border border-blue-500/30">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold mb-1">{t('pro_practice_with')} {player.name}{t('pro_settings_suffix')}</h3>
            <p className="text-gray-400 text-sm">
              {player.sensitivity} sens @ {player.dpi} DPI
            </p>
          </div>
          <Link
            href={`/settings?sens=${player.sensitivity}&dpi=${player.dpi}`}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors text-center"
          >
            {t('pro_apply_settings')}
          </Link>
        </div>
      </div>

      {/* Similar Players */}
      {similarPlayers.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-4">{t('pro_similar_players')}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {similarPlayers.map((p) => (
              <Link
                key={p.slug}
                href={`/pro/${p.slug}`}
                className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors"
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
