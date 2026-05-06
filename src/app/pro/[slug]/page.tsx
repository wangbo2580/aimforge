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

  const sens = player.sensitivity;
  const dpi = player.dpi;
  const cm360 = player.cm360.toFixed(1);

  // Title puts the numbers up front — that's what people search for and what makes them click.
  // Length budget ~60 chars; longest player name + team still fits.
  const title = `${player.name} CS2 Settings: ${sens} sens, ${dpi} DPI, Crosshair (${player.team})`;

  // Description leads with the actual numbers, no marketing fluff.
  const description = `${sens} sens, ${dpi} DPI, ${cm360} cm/360° — ${player.name}'s real CS2 setup at ${player.team}. Crosshair code is copy-paste ready below, plus his mouse, keyboard, monitor and viewmodel.`;

  return {
    title,
    description,
    keywords: [
      `${player.name} settings`,
      `${player.name} sensitivity`,
      `${player.name} crosshair`,
      `${player.name} crosshair code`,
      `${player.name} dpi`,
      `${player.name} cm/360`,
      `${player.name} cs2 config`,
      `${player.team} settings`,
    ],
    alternates: {
      canonical: `/pro/${player.slug}`,
    },
    openGraph: {
      title: `${player.name} CS2 Settings — ${sens} sens @ ${dpi} DPI`,
      description: `What ${player.name} actually plays at ${player.team}: ${sens} sens, ${dpi} DPI, ${cm360} cm/360°. Crosshair code, mouse, keyboard and full gear inside.`,
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
