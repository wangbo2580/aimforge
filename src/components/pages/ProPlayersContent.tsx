'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useTranslation } from '@/lib/i18n';
import { ProPlayer, countryToFlag } from '@/data/pro-players';
import ContentTrainingCTA from '@/components/growth/ContentTrainingCTA';
import { trackEvent } from '@/lib/analytics';

interface ProPlayersContentProps {
  featured: ProPlayer[];
  others: ProPlayer[];
}

export default function ProPlayersContent({ featured, others }: ProPlayersContentProps) {
  const { t } = useTranslation();
  const allPlayers = useMemo(() => [...featured, ...others], [featured, others]);
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('All roles');
  const [sort, setSort] = useState<'featured' | 'edpi-low' | 'edpi-high'>('featured');
  const roles = useMemo(
    () => ['All roles', ...Array.from(new Set(allPlayers.map((player) => player.role))).sort()],
    [allPlayers]
  );
  const filteredPlayers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const players = allPlayers.filter((player) => {
      const matchesRole = role === 'All roles' || player.role === role;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [player.name, player.realName, player.team, player.role, player.mouse]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesRole && matchesQuery;
    });

    if (sort === 'edpi-low') return [...players].sort((a, b) => a.edpi - b.edpi);
    if (sort === 'edpi-high') return [...players].sort((a, b) => b.edpi - a.edpi);
    return players;
  }, [allPlayers, query, role, sort]);

  const selectRole = (nextRole: string) => {
    setRole(nextRole);
    trackEvent('hub_filter', {
      hub: 'pro',
      filter_type: 'role',
      filter_value: nextRole,
    });
  };

  return (
    <div className="container mx-auto max-w-6xl">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          CS2 Pro Settings 2026
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Copy sensitivity, DPI, eDPI, cm/360, crosshair codes, and gear for 30+ CS2 pros —
          then test the setup in a browser warm-up before using it in matchmaking.
        </p>
        <p className="mt-3 text-sm text-gray-500">
          {allPlayers.length} verified player profiles · settings checked through June 2026
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/crosshairs/pro"
            onClick={() => trackEvent('hub_path_click', { hub: 'pro', path: 'hero_pro_crosshairs' })}
            className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-green-500"
          >
            Copy pro crosshair codes
          </Link>
          <Link
            href="/play/quick-warmup"
            onClick={() =>
              trackEvent('warmup_cta_click', {
                source: 'pro_hero',
                routine_id: 'cs2-90-second-quick-warmup',
              })
            }
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-500"
          >
            Test a setup in 90 seconds
          </Link>
          <Link
            href="/pro-beta?source=pro_hero"
            onClick={() => trackEvent('pro_beta_details_click', { source: 'pro_hero' })}
            className="rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-5 py-3 font-semibold text-yellow-100 transition-colors hover:border-yellow-300"
          >
            Get a role-based routine
          </Link>
        </div>
      </div>

      <section className="mb-10 grid gap-4 md:grid-cols-4">
        <button
          type="button"
          onClick={() => selectRole('AWPer')}
          className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-5 text-left transition-colors hover:border-purple-400"
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-purple-300">AWPers</span>
          <h2 className="mt-2 text-xl font-bold text-white">Lower, steadier sensitivity</h2>
          <p className="mt-2 text-sm text-gray-400">Compare scoped aim, cm/360, zoom sensitivity, and AWP gear.</p>
        </button>
        <button
          type="button"
          onClick={() => selectRole('Rifler')}
          className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-5 text-left transition-colors hover:border-blue-400"
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-300">Riflers</span>
          <h2 className="mt-2 text-xl font-bold text-white">Crosshair placement and control</h2>
          <p className="mt-2 text-sm text-gray-400">Compare eDPI, stretched resolutions, mice, and static crosshairs.</p>
        </button>
        <Link
          href="/crosshairs/pro"
          onClick={() => trackEvent('hub_path_click', { hub: 'pro', path: 'pro_crosshairs' })}
          className="rounded-xl border border-green-500/30 bg-green-500/10 p-5 transition-colors hover:border-green-400"
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-green-300">Crosshairs</span>
          <h2 className="mt-2 text-xl font-bold text-white">Copy pro crosshair codes</h2>
          <p className="mt-2 text-sm text-gray-400">Browse visual previews when you only want the code, not the full setup.</p>
        </Link>
        <Link
          href="/tools/crosshair-generator"
          onClick={() => trackEvent('hub_path_click', { hub: 'pro', path: 'crosshair_generator' })}
          className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-5 transition-colors hover:border-yellow-400"
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-yellow-300">Generator</span>
          <h2 className="mt-2 text-xl font-bold text-white">Edit before you copy</h2>
          <p className="mt-2 text-sm text-gray-400">Load a pro crosshair, tweak gap or color, then export a CS2 share code.</p>
        </Link>
      </section>

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
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 hover:from-gray-700 hover:to-gray-800 transition-all hover:scale-[1.02] border border-gray-700 hover:border-blue-500"
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
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold">{t('pro_all_players')}</h2>
            <p className="mt-1 text-sm text-gray-400">
              Showing {filteredPlayers.length} of {allPlayers.length} players.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="text-xs text-gray-400">
              Search
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Player, team, mouse..."
                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
              />
            </label>
            <label className="text-xs text-gray-400">
              Role
              <select
                value={role}
                onChange={(event) => selectRole(event.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
              >
                {roles.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <label className="text-xs text-gray-400">
              Sort
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as typeof sort)}
                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:border-blue-500"
              >
                <option value="featured">Default</option>
                <option value="edpi-low">Lowest eDPI</option>
                <option value="edpi-high">Highest eDPI</option>
              </select>
            </label>
          </div>
        </div>
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
                {filteredPlayers.map((player) => (
                  <tr key={player.slug} className="hover:bg-gray-700 transition-colors">
                    <td className="px-4 py-3">
                      <Link
                        href={`/pro/${player.slug}`}
                        onClick={() =>
                          trackEvent('hub_item_click', {
                            hub: 'pro',
                            item: player.slug,
                            role: player.role,
                          })
                        }
                        className="flex items-center gap-2 hover:text-blue-400"
                      >
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
          {filteredPlayers.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              No player matches this search. Clear the role or try a team name.
            </div>
          )}
        </div>
      </section>

      <ContentTrainingCTA
        sourcePage="pro_players"
        title={t('pro_practice_cta')}
        description={t('pro_practice_desc')}
        primaryHref="/play/quick-warmup"
        primaryLabel={t('start_training')}
      />
    </div>
  );
}
