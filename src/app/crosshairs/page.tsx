'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import CopyButton from '@/components/ui/CopyButton';
import { crosshairs, categories, Crosshair } from '@/data/crosshairs';
import { useTranslation } from '@/lib/i18n';

export default function CrosshairsPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<Crosshair['category'] | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredCrosshairs = selectedCategory === 'all'
    ? crosshairs
    : crosshairs.filter(c => c.category === selectedCategory);

  const handleCopy = async (crosshair: Crosshair) => {
    try {
      await navigator.clipboard.writeText(crosshair.code);
      setCopiedId(crosshair.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('crosshair_title')}
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('crosshair_subtitle')}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {t('crosshair_all')}
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Crosshair Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCrosshairs.map((crosshair) => (
              <div
                key={crosshair.id}
                className="bg-gray-800 rounded-xl p-5 hover:bg-gray-750 transition-colors"
              >
                {/* Preview & Name */}
                <div className="flex items-center gap-4 mb-4">
                  {/* Crosshair Preview */}
                  <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center relative">
                    <CrosshairPreview color={crosshair.color} size={crosshair.size} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-lg">{crosshair.name}</h3>
                    {crosshair.player && crosshair.team && (
                      <Link
                        href={`/pro/${crosshair.id}`}
                        className="text-sm text-blue-400 hover:underline"
                      >
                        {crosshair.team}
                      </Link>
                    )}
                    {!crosshair.player && (
                      <span className="text-sm text-gray-500 capitalize">{crosshair.category}</span>
                    )}
                  </div>
                </div>

                {/* Description */}
                {crosshair.description && (
                  <p className="text-sm text-gray-400 mb-3">{crosshair.description}</p>
                )}

                {/* Code */}
                <div className="bg-gray-900 rounded-lg p-3 mb-3">
                  <code className="text-xs text-green-400 break-all">{crosshair.code}</code>
                </div>

                {/* Copy Button */}
                <button
                  onClick={() => handleCopy(crosshair)}
                  className={`w-full py-2 rounded-lg font-medium transition-colors ${
                    copiedId === crosshair.id
                      ? 'bg-green-600 text-white'
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  {copiedId === crosshair.id ? `✓ ${t('crosshair_copied')}` : t('crosshair_copy')}
                </button>
              </div>
            ))}
          </div>

          {/* How to Use */}
          <div className="mt-12 bg-gray-800 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4">{t('crosshair_how_to')}</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>{t('crosshair_step1')}</li>
              <li>{t('crosshair_step2')} <strong className="text-white">Settings</strong></li>
              <li>{t('crosshair_step3')} <strong className="text-white">Game → Crosshair</strong></li>
              <li>{t('crosshair_step4')} <strong className="text-white">Share or Import</strong></li>
              <li>{t('crosshair_step5')} <strong className="text-white">Import</strong></li>
            </ol>
            <p className="mt-4 text-sm text-gray-500">
              {t('crosshair_tip')} <code className="text-green-400">cl_crosshair_sharecode &quot;CODE&quot;</code>
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">{t('crosshair_practice_cta')}</p>
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
      </main>
    </div>
  );
}

// Simple crosshair preview component
function CrosshairPreview({ color, size }: { color: string; size: 'small' | 'medium' | 'large' }) {
  const sizeMap = { small: 8, medium: 12, large: 16 };
  const lineLength = sizeMap[size];
  const gap = 2;
  const thickness = 2;

  return (
    <svg width="40" height="40" viewBox="0 0 40 40">
      {/* Horizontal lines */}
      <rect x={20 - lineLength - gap} y={20 - thickness/2} width={lineLength} height={thickness} fill={color} />
      <rect x={20 + gap} y={20 - thickness/2} width={lineLength} height={thickness} fill={color} />
      {/* Vertical lines */}
      <rect x={20 - thickness/2} y={20 - lineLength - gap} width={thickness} height={lineLength} fill={color} />
      <rect x={20 - thickness/2} y={20 + gap} width={thickness} height={lineLength} fill={color} />
      {/* Center dot */}
      <circle cx="20" cy="20" r="1.5" fill={color} />
    </svg>
  );
}
