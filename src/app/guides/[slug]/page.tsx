import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import GuideDetailContent from '@/components/pages/GuideDetailContent';
import { getGuideBySlug, getAllGuideSlugs, guides } from '@/data/guides';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return { title: 'Guide Not Found' };
  }

  return {
    title: `${guide.title} | CS2 Practice`,
    description: guide.description,
    keywords: [
      'cs2 aim guide',
      'aim training',
      guide.category,
      ...guide.title.toLowerCase().split(' ').filter(w => w.length > 3),
    ],
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      publishedTime: guide.publishedAt,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const relatedGuides = guides
    .filter(g => g.slug !== guide.slug)
    .slice(0, 3);

  // Article JSON-LD structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt || guide.publishedAt,
    author: {
      '@type': 'Organization',
      name: guide.author,
      url: 'https://www.cs2practice.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CS2 Practice',
      url: 'https://www.cs2practice.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.cs2practice.com/logo-512.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.cs2practice.com/guides/${guide.slug}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.cs2practice.com/' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://www.cs2practice.com/guides' },
      { '@type': 'ListItem', position: 3, name: guide.title, item: `https://www.cs2practice.com/guides/${guide.slug}` },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="flex-1 py-12 px-4">
        <GuideDetailContent guide={guide} relatedGuides={relatedGuides} />
      </main>
    </div>
  );
}
