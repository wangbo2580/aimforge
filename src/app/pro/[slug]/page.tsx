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

  // Title: keep under 60 characters
  const title = `${player.name} CS2 Settings & Crosshair (${player.team})`;
  // Description: aim for 150-160 characters
  const description = `${player.name}'s complete CS2 setup: ${player.sensitivity} sensitivity, ${player.dpi} DPI, ${player.cm360.toFixed(1)} cm/360°. Copy his crosshair code, see his mouse, keyboard, and full gear list. Updated regularly.`;

  return {
    title,
    description,
    keywords: [
      `${player.name} settings`,
      `${player.name} sensitivity`,
      `${player.name} crosshair`,
      `${player.name} cs2 config`,
      `${player.team} settings`,
    ],
    alternates: {
      canonical: `/pro/${player.slug}`,
    },
    openGraph: {
      title: `${player.name} CS2 Settings (${player.team})`,
      description: `${player.name}'s sensitivity: ${player.sensitivity} @ ${player.dpi} DPI. Crosshair code, mouse, keyboard, and full gear setup.`,
      type: 'profile',
      url: `https://www.cs2practice.com/pro/${player.slug}`,
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
  const sameAs: string[] = [];
  if (player.twitter) sameAs.push(`https://twitter.com/${player.twitter}`);
  if (player.twitch) sameAs.push(`https://twitch.tv/${player.twitch}`);

  const personSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: player.name,
    alternateName: player.realName,
    jobTitle: `Professional Counter-Strike 2 Player`,
    description: `${player.name} is a ${player.role} for ${player.team} in Counter-Strike 2.`,
    url: `https://www.cs2practice.com/pro/${player.slug}`,
    memberOf: {
      '@type': 'SportsOrganization',
      name: player.team,
      sport: 'Counter-Strike 2',
    },
  };
  if (sameAs.length > 0) {
    personSchema.sameAs = sameAs;
  }

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
