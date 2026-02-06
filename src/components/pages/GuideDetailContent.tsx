'use client';

import Link from 'next/link';
import { useTranslation, useI18n } from '@/lib/i18n';
import { Guide } from '@/data/guides';

interface GuideDetailContentProps {
  guide: Guide;
  relatedGuides: Guide[];
}

export default function GuideDetailContent({ guide, relatedGuides }: GuideDetailContentProps) {
  const { t } = useTranslation();
  const { locale } = useI18n();
  const isZh = locale === 'zh';

  const categoryLabels: Record<string, { label: string; color: string }> = {
    beginner: { label: 'Beginner', color: 'bg-green-600' },
    intermediate: { label: 'Intermediate', color: 'bg-blue-600' },
    advanced: { label: 'Advanced', color: 'bg-purple-600' },
    tips: { label: 'Tips', color: 'bg-orange-600' },
  };

  return (
    <article className="container mx-auto max-w-3xl">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <Link href="/guides" className="text-gray-400 hover:text-white">{t('guides_title')}</Link>
        <span className="text-gray-600 mx-2">/</span>
        <span className="text-white">{(isZh ? guide.titleZh : guide.title).slice(0, 30)}...</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className={`px-2 py-1 rounded text-xs font-medium text-white ${categoryLabels[guide.category].color}`}>
            {categoryLabels[guide.category].label}
          </span>
          <span className="text-sm text-gray-500">{guide.readTime} {t('min_read')}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{isZh ? guide.titleZh : guide.title}</h1>
        <p className="text-xl text-gray-400 mb-4">{isZh ? guide.descriptionZh : guide.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>By {guide.author}</span>
          <span>•</span>
          <span>
            {new Date(guide.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-invert prose-lg max-w-none">
        <MarkdownContent content={isZh ? guide.contentZh : guide.content} />
      </div>

      {/* CTA */}
      <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30 text-center">
        <h3 className="text-2xl font-bold mb-3">{t('guides_ready_practice')}</h3>
        <p className="text-gray-400 mb-6">
          {t('guides_apply')}
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

      {/* Related Guides */}
      {relatedGuides.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">{t('guides_more')}</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedGuides.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors"
              >
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium text-white mb-2 ${categoryLabels[g.category].color}`}>
                  {categoryLabels[g.category].label}
                </span>
                <h3 className="font-bold text-white hover:text-blue-400 line-clamp-2">
                  {isZh ? g.titleZh : g.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{g.readTime} {t('min_read')}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

// Simple markdown renderer (basic)
function MarkdownContent({ content }: { content: string }) {
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Headers
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold mt-8 mb-4 text-white">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-xl font-bold mt-6 mb-3 text-white">
          {line.slice(4)}
        </h3>
      );
    }
    // List items
    else if (line.startsWith('- ')) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`list-${i}`} className="list-disc list-inside space-y-1 my-4 text-gray-300">
          {listItems.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }} />
          ))}
        </ul>
      );
      continue;
    }
    // Numbered list
    else if (/^\d+\. /.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\. /, ''));
        i++;
      }
      elements.push(
        <ol key={`olist-${i}`} className="list-decimal list-inside space-y-1 my-4 text-gray-300">
          {listItems.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }} />
          ))}
        </ol>
      );
      continue;
    }
    // Paragraphs
    else if (line.trim() !== '') {
      elements.push(
        <p
          key={i}
          className="my-4 text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }}
        />
      );
    }

    i++;
  }

  return <>{elements}</>;
}

// Format inline markdown (bold, links, code)
function formatInlineMarkdown(text: string): string {
  return text
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    // Links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-blue-400 hover:underline">$1</a>')
    // Inline code
    .replace(/`(.+?)`/g, '<code class="bg-gray-800 px-1.5 py-0.5 rounded text-green-400 text-sm">$1</code>');
}
