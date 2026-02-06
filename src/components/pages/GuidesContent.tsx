'use client';

import Link from 'next/link';
import { useTranslation, useI18n } from '@/lib/i18n';
import { Guide } from '@/data/guides';

interface GuidesContentProps {
  guides: Guide[];
}

export default function GuidesContent({ guides }: GuidesContentProps) {
  const { t } = useTranslation();
  const { locale } = useI18n();
  const isZh = locale === 'zh';

  const categoryLabels: Record<string, { label: string; labelZh: string; color: string }> = {
    beginner: { label: 'Beginner', labelZh: '入门', color: 'bg-green-600' },
    intermediate: { label: 'Intermediate', labelZh: '进阶', color: 'bg-blue-600' },
    advanced: { label: 'Advanced', labelZh: '高级', color: 'bg-purple-600' },
    tips: { label: 'Tips', labelZh: '技巧', color: 'bg-orange-600' },
  };

  return (
    <div className="container mx-auto max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('guides_title')}
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          {t('guides_subtitle')}
        </p>
      </div>

      {/* Guide List */}
      <div className="space-y-6">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="block bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors group"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium text-white ${categoryLabels[guide.category].color}`}>
                    {categoryLabels[guide.category].label}
                  </span>
                  <span className="text-sm text-gray-500">{guide.readTime} {t('min_read')}</span>
                </div>
                <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                  {isZh ? guide.titleZh : guide.title}
                </h2>
                <p className="text-gray-400">{isZh ? guide.descriptionZh : guide.description}</p>
              </div>
              <div className="text-gray-500 text-sm md:text-right">
                {new Date(guide.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <p className="text-gray-400 mb-4">{t('guides_ready')}</p>
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
    </div>
  );
}
