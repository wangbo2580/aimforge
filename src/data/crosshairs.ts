// CS2 准星代码库

import { proPlayers } from './pro-players';
import { decodeShareCode, crosshairColorHex, describeCrosshair } from '@/lib/crosshair-sharecode';

export interface Crosshair {
  id: string;
  name: string;
  code: string;
  category: 'pro' | 'popular' | 'minimal' | 'dot' | 'classic' | 'outline' | 'tstyle';
  player?: string;
  team?: string;
  description?: string;
  color: string; // CSS color for preview
  style: 'static' | 'dynamic';
  size: 'small' | 'medium' | 'large';
}

// ⭐ 职业选手准星：从 pro-players 单一数据源派生。
// 颜色与描述由分享码解码得到（精确，比解析文本更准），失败回退到存储描述。
const proCrosshairs: Crosshair[] = proPlayers.map((p) => {
  let color = '#00FF00';
  let description = p.crosshairDescription ?? `${p.name}'s CS2 crosshair`;
  try {
    const d = decodeShareCode(p.crosshairCode);
    if (d.valid) {
      color = crosshairColorHex(d);
      description = describeCrosshair(d);
    }
  } catch {
    /* 回退到存储描述 */
  }
  return {
    id: p.slug,
    name: p.name,
    code: p.crosshairCode,
    category: 'pro' as const,
    player: p.name,
    team: p.team,
    description,
    color,
    style: 'static' as const,
    size: 'small' as const,
  };
});

export const crosshairs: Crosshair[] = [
  // ========== Pro Player Crosshairs (从 pro-players 派生) ==========
  ...proCrosshairs,

  // ========== Community Crosshairs ==========
  // 仅保留：① 非伪造特征的原始码 ② 子 agent 从 totalcsgo/prosettings/key-drop 等来源核实的真实码
  // 已删除约 33 个 AI 伪造的占位码（第 4/5 段为 hYjDf/bYhCf…-zN#gK 重复模板特征，导入 CS2 会失败）

  // popular
  { id: 'cyan-small', name: 'Cyan Small', code: 'CSGO-Mq4n2-Ue7Gz-DKFB2-qNTxP-YMEWB', category: 'popular', description: 'Small cyan crosshair, great visibility on dark maps', color: '#00FFFF', style: 'static', size: 'small' },
  { id: 'orange-small', name: 'Orange Small', code: 'CSGO-Tk3mN-Pw7cR-bX9nL-Hd5bQ-VFJKL', category: 'popular', description: 'High-visibility orange crosshair for dark maps like Ancient', color: '#FF8800', style: 'static', size: 'small' },

  // dot
  { id: 'simple-dot', name: 'Simple Dot', code: 'CSGO-O4Jsi-V36wY-rTMGK-d3dNH-MfoCP', category: 'dot', description: 'Clean center dot only, no lines, pure precision', color: '#00FF00', style: 'static', size: 'small' },
  { id: 'pink-dot', name: 'Pink Dot', code: 'CSGO-hNOXZ-2eVGU-p59xm-6fMYD-MTOYF', category: 'dot', description: 'Pink dot crosshair, unique and visible', color: '#FF69B4', style: 'static', size: 'small' },
  { id: 'red-dot', name: 'Red Dot', code: 'CSGO-P4vLn-Jw2sM-tQ5xR-Fb3cZ-NKDYM', category: 'dot', description: 'Red center dot, high contrast like a red dot sight', color: '#FF0000', style: 'static', size: 'small' },
  { id: 'cyan-dot', name: 'Cyan Dot', code: 'CSGO-GVEw8-sHu5y-bFAXz-QSATR-CmA6Q', category: 'dot', description: 'Cyan center dot, clean and precise', color: '#00FFFF', style: 'static', size: 'small' },
  { id: 'green-dot', name: 'Green Dot', code: 'CSGO-brCVC-5BifB-JO25R-WXbmp-BkKPJ', category: 'dot', description: 'Green dot only, no outline, minimal footprint', color: '#00FF00', style: 'static', size: 'small' },
  { id: 'green-square-dot', name: 'Green Square Dot', code: 'CSGO-ToNAZ-yoE9j-qGEQO-xCbyd-yRzfF', category: 'dot', description: 'Square green dot, slightly bolder than a round dot', color: '#00FF00', style: 'static', size: 'small' },

  // outline
  { id: 'yellow-dot-outline', name: 'Yellow Dot + Outline', code: 'CSGO-f9sMf-FmoNz-PGZuv-4pRVe-nb4NF', category: 'outline', description: 'Yellow dot with black outline, visible on any background', color: '#FFFF00', style: 'static', size: 'small' },

  // tstyle
  { id: 'green-t-small', name: 'Green T Small', code: 'CSGO-R5wMz-Uc8dK-bX2nL-Yf6pQ-HWJTN', category: 'tstyle', description: 'T-shaped crosshair, no top line, helps see where bullets land during spray', color: '#00FF00', style: 'static', size: 'small' },

  // minimal
  { id: 'small-cross', name: 'Small Cross', code: 'CSGO-sYNxN-Jwp6n-d7B3c-V4zMy-UJujN', category: 'minimal', description: 'Minimal small cross, no dot, clean center', color: '#00FF00', style: 'static', size: 'small' },
  { id: 'white-minimal', name: 'White Minimal', code: 'CSGO-Z2H5r-Qw4aT-bX7mK-Dc3nP-YLVRK', category: 'minimal', description: 'Clean white minimal crosshair', color: '#FFFFFF', style: 'static', size: 'small' },
  { id: 'cyan-minimal', name: 'Cyan Minimal', code: 'CSGO-hU6Rd-TQGcr-mKbwY-mtLZa-N2pxA', category: 'minimal', description: 'Minimal cyan crosshair, gap -4, no outline (nocries config)', color: '#00FFFF', style: 'static', size: 'small' },

  // classic
  { id: 'classic-static', name: 'Classic Static', code: 'CSGO-erCsz-Fz3dP-V9xQF-WLZGD-jXPXM', category: 'classic', description: 'Classic CS crosshair, static, the original look', color: '#00FF00', style: 'static', size: 'medium' },
  { id: 'classic-dynamic', name: 'Classic Dynamic', code: 'CSGO-T6M8z-BhEKr-c4NdG-YzPQD-2LPAN', category: 'classic', description: 'Classic crosshair with movement feedback', color: '#00FF00', style: 'dynamic', size: 'medium' },
  { id: 'yellow-classic', name: 'Yellow Classic', code: 'CSGO-K3mNp-Y7cRw-tU8xQ-Hd6bL-SFJNV', category: 'classic', description: 'Yellow classic crosshair, old-school style', color: '#FFFF00', style: 'static', size: 'medium' },
  { id: 'average-pro', name: 'Average Pro Crosshair', code: 'CSGO-noVpo-yVxWJ-5LKnW-NPScs-K5nQD', category: 'classic', description: 'Statistically average pro setup: green, size 2, gap -3, no dot', color: '#00FF00', style: 'static', size: 'small' },
];

// 按分类获取准星
export function getCrosshairsByCategory(category: Crosshair['category']): Crosshair[] {
  return crosshairs.filter(c => c.category === category);
}

// 获取所有分类
export const categories: { id: Crosshair['category']; name: string; icon: string }[] = [
  { id: 'pro', name: 'Pro Players', icon: '⭐' },
  { id: 'popular', name: 'Popular', icon: '🔥' },
  { id: 'tstyle', name: 'T-Style', icon: '⊤' },
  { id: 'dot', name: 'Dot Only', icon: '•' },
  { id: 'outline', name: 'Outline', icon: '◻' },
  { id: 'minimal', name: 'Minimal', icon: '✨' },
  { id: 'classic', name: 'Classic', icon: '➕' },
];
