'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { ProPlayer, countryToFlag } from '@/data/pro-players';

interface ProPlayersContentProps {
  featured: ProPlayer[];
  others: ProPlayer[];
}

export default function ProPlayersContent({ featured, others }: ProPlayersContentProps) {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto max-w-6xl">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('pro_title')}
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          {t('pro_subtitle')}
        </p>
      </div>

      {/* Featured Players */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="text-yellow-400">⭐</span> {t('pro_top_players')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((player) => (
            <Link
              key={player.slug}
              href={`/pro/${player.slug}`}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 hover:from-gray-750 hover:to-gray-850 transition-all hover:scale-[1.02] border border-gray-700 hover:border-blue-500"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{countryToFlag(player.country)}</span>
                    <h3 className="text-xl font-bold text-white">{player.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{player.team} · {player.role}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-900/50 rounded-lg p-2">
                  <div className="text-gray-500 text-xs">{t('pro_sensitivity')}</div>
                  <div className="text-white font-medium">{player.sensitivity}</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-2">
                  <div className="text-gray-500 text-xs">DPI</div>
                  <div className="text-white font-medium">{player.dpi}</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-2">
                  <div className="text-gray-500 text-xs">eDPI</div>
                  <div className="text-white font-medium">{player.edpi}</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-2">
                  <div className="text-gray-500 text-xs">cm/360</div>
                  <div className="text-white font-medium">{player.cm360.toFixed(1)}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Players Table */}
      <section>
        <h2 className="text-2xl font-bold mb-6">{t('pro_all_players')}</h2>
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-900 text-left text-sm text-gray-400">
                  <th className="px-4 py-3 font-medium">{t('pro_player')}</th>
                  <th className="px-4 py-3 font-medium">{t('pro_team')}</th>
                  <th className="px-4 py-3 font-medium text-center">Sens</th>
                  <th className="px-4 py-3 font-medium text-center">DPI</th>
                  <th className="px-4 py-3 font-medium text-center">eDPI</th>
                  <th className="px-4 py-3 font-medium text-center">cm/360</th>
                  <th className="px-4 py-3 font-medium">{t('pro_mouse')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {[...featured, ...others].map((player) => (
                  <tr key={player.slug} className="hover:bg-gray-750 transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/pro/${player.slug}`} className="flex items-center gap-2 hover:text-blue-400">
                        <span>{countryToFlag(player.country)}</span>
                        <span className="font-medium text-white">{player.name}</span>
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{player.team}</td>
                    <td className="px-4 py-3 text-center text-white">{player.sensitivity}</td>
                    <td className="px-4 py-3 text-center text-white">{player.dpi}</td>
                    <td className="px-4 py-3 text-center text-white font-medium">{player.edpi}</td>
                    <td className="px-4 py-3 text-center text-white">{player.cm360.toFixed(1)}</td>
                    <td className="px-4 py-3 text-gray-400 text-sm">{player.mouse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 text-center">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30">
          <h3 className="text-2xl font-bold mb-3">{t('pro_practice_cta')}</h3>
          <p className="text-gray-400 mb-6">
            {t('pro_practice_desc')}
          </p>
          <Link
            href="/play"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
          >
            {t('start_training')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
