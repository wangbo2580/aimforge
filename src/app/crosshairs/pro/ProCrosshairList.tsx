'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Crosshair } from '@/data/crosshairs';
import { CrosshairCodePreview } from '@/components/ui/CrosshairPreview';

interface Props {
  items: Crosshair[];
}

export default function ProCrosshairList({ items }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (c: Crosshair) => {
    try {
      await navigator.clipboard.writeText(c.code);
      setCopiedId(c.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((c) => (
        <div
          key={c.id}
          className="bg-gray-800 rounded-xl p-5 hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
              <CrosshairCodePreview
                code={c.code}
                size={46}
                background="transparent"
                fallback={<CrossPreview color={c.color} size={c.size} />}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white truncate">{c.name}</h3>
              {c.team && (
                <Link
                  href={`/pro/${c.id}`}
                  className="text-xs text-blue-400 hover:underline"
                >
                  {c.team}
                </Link>
              )}
            </div>
          </div>

          {c.description && (
            <p className="text-sm text-gray-400 mb-3">{c.description}</p>
          )}

          <div className="bg-gray-900 rounded-lg p-3 mb-3">
            <code className="text-xs text-green-400 break-all">{c.code}</code>
          </div>

          <button
            onClick={() => handleCopy(c)}
            className={`w-full py-2 rounded-lg font-medium transition-colors ${
              copiedId === c.id
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {copiedId === c.id ? '✓ Copied' : 'Copy code'}
          </button>
        </div>
      ))}
    </div>
  );
}

function CrossPreview({ color, size }: { color: string; size: 'small' | 'medium' | 'large' }) {
  const sizeMap = { small: 6, medium: 9, large: 12 };
  const lineLength = sizeMap[size];
  const gap = 2;
  const thickness = 1.5;

  return (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <rect x={16 - lineLength - gap} y={16 - thickness / 2} width={lineLength} height={thickness} fill={color} />
      <rect x={16 + gap} y={16 - thickness / 2} width={lineLength} height={thickness} fill={color} />
      <rect x={16 - thickness / 2} y={16 - lineLength - gap} width={thickness} height={lineLength} fill={color} />
      <rect x={16 - thickness / 2} y={16 + gap} width={thickness} height={lineLength} fill={color} />
    </svg>
  );
}
