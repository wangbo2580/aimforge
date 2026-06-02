'use client';

import type { ReactNode } from 'react';
import { CS2Crosshair, crosshairColorHex, decodeShareCode } from '@/lib/crosshair-sharecode';

interface CrosshairPreviewProps {
  crosshair: CS2Crosshair;
  /** SVG 边长（px） */
  size?: number;
  /** 预览背景 CSS（默认中性深色，浅色/深色准星都可见） */
  background?: string;
  className?: string;
}

/**
 * 从准星参数渲染近似预览（非游戏内逐像素，仅供可视化）。
 * 分享码本身是精确的；预览只需"看起来对、随参数变"。
 */
export default function CrosshairPreview({
  crosshair: c,
  size = 200,
  background = 'radial-gradient(circle at 50% 45%, #3a4452 0%, #20262f 70%, #181d24 100%)',
  className = '',
}: CrosshairPreviewProps) {
  const cx = size / 2;
  const cy = size / 2;
  const color = crosshairColorHex(c);
  const opacity = c.alphaEnabled ? Math.max(0, Math.min(1, c.alpha / 255)) : 1;

  const S = 4; // px per CS2 unit
  const armLen = Math.max(2, Math.round(c.length * S));
  const armThick = Math.max(1, Math.round(c.thickness * S * 0.7));
  const gapPx = Math.round(c.gap * S) + 2; // 负 gap → 线穿过中心
  const o = c.outlineEnabled ? Math.max(1, Math.round(c.outline * 2)) : 0;

  // 每个臂：[x, y, w, h]
  const arms: [number, number, number, number][] = [
    [cx + gapPx, cy - armThick / 2, armLen, armThick], // right
    [cx - gapPx - armLen, cy - armThick / 2, armLen, armThick], // left
    [cx - armThick / 2, cy + gapPx, armThick, armLen], // bottom
  ];
  if (!c.tStyleEnabled) {
    arms.push([cx - armThick / 2, cy - gapPx - armLen, armThick, armLen]); // top
  }

  const rects: { x: number; y: number; w: number; h: number }[] = arms.map(([x, y, w, h]) => ({ x, y, w, h }));
  if (c.centerDotEnabled) {
    const d = Math.max(2, armThick);
    rects.push({ x: cx - d / 2, y: cy - d / 2, w: d, h: d });
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`rounded-lg ${className}`}
      style={{ background }}
      role="img"
      aria-label="Crosshair preview"
    >
      <g opacity={opacity} shapeRendering="crispEdges">
        {/* 先画黑边（描边），再画彩色，保证 outline 在底层 */}
        {o > 0 &&
          rects.map((r, i) => (
            <rect key={`o${i}`} x={r.x - o} y={r.y - o} width={r.w + 2 * o} height={r.h + 2 * o} fill="#000000" />
          ))}
        {rects.map((r, i) => (
          <rect key={`c${i}`} x={r.x} y={r.y} width={r.w} height={r.h} fill={color} />
        ))}
      </g>
    </svg>
  );
}

interface CrosshairCodePreviewProps {
  code: string;
  size?: number;
  background?: string;
  className?: string;
  /** 解码失败时渲染的回退内容 */
  fallback?: ReactNode;
}

/**
 * 从分享码解码后渲染真实准星预览；解码失败时渲染 fallback。
 */
export function CrosshairCodePreview({ code, fallback = null, ...rest }: CrosshairCodePreviewProps) {
  let crosshair: CS2Crosshair | null = null;
  try {
    const d = decodeShareCode(code);
    if (d.valid) {
      const { valid: _valid, ...c } = d;
      void _valid;
      crosshair = c;
    }
  } catch {
    crosshair = null;
  }
  if (!crosshair) return <>{fallback}</>;
  return <CrosshairPreview crosshair={crosshair} {...rest} />;
}
