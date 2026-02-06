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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <GuideDetailContent guide={guide} relatedGuides={relatedGuides} />
      </main>
    </div>
  );
}
