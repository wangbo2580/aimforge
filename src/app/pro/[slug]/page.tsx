import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import ProPlayerDetailContent from '@/components/pages/ProPlayerDetailContent';
import { getPlayerBySlug, getAllPlayerSlugs, proPlayers } from '@/data/pro-players';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPlayerSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const player = getPlayerBySlug(slug);

  if (!player) {
    return { title: 'Player Not Found' };
  }

  return {
    title: `${player.name} CS2 Settings - Sensitivity, Crosshair, Gear | CS2 Practice`,
    description: `${player.name} (${player.team}) CS2 settings: ${player.sensitivity} sensitivity, ${player.dpi} DPI, ${player.edpi} eDPI. Crosshair code, gear, and more.`,
    keywords: [
      `${player.name} settings`,
      `${player.name} sensitivity`,
      `${player.name} crosshair`,
      `${player.name} cs2 config`,
      `${player.team} settings`,
    ],
    openGraph: {
      title: `${player.name} CS2 Settings`,
      description: `Sensitivity: ${player.sensitivity} | DPI: ${player.dpi} | eDPI: ${player.edpi}`,
    },
  };
}

export default async function ProPlayerPage({ params }: Props) {
  const { slug } = await params;
  const player = getPlayerBySlug(slug);

  if (!player) {
    notFound();
  }

  const similarPlayers = proPlayers
    .filter(p => p.slug !== player.slug)
    .filter(p => p.team === player.team || Math.abs(p.edpi - player.edpi) < 200)
    .slice(0, 3);

  // Person JSON-LD for the player
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: player.name,
    alternateName: player.realName,
    jobTitle: `Professional Counter-Strike 2 Player (${player.role})`,
    affiliation: {
      '@type': 'SportsTeam',
      name: player.team,
    },
    nationality: player.country,
    url: `https://www.cs2practice.com/pro/${player.slug}`,
    ...(player.twitter && {
      sameAs: [
        `https://twitter.com/${player.twitter}`,
        ...(player.twitch ? [`https://twitch.tv/${player.twitch}`] : []),
      ],
    }),
  };

  // Breadcrumb JSON-LD
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.cs2practice.com/' },
      { '@type': 'ListItem', position: 2, name: 'Pro Players', item: 'https://www.cs2practice.com/pro' },
      { '@type': 'ListItem', position: 3, name: player.name, item: `https://www.cs2practice.com/pro/${player.slug}` },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="flex-1 py-12 px-4">
        <ProPlayerDetailContent player={player} similarPlayers={similarPlayers} />
      </main>
    </div>
  );
}
