// CS2 准星代码库

export interface Crosshair {
  id: string;
  name: string;
  code: string;
  category: 'pro' | 'popular' | 'minimal' | 'dot' | 'classic';
  player?: string;
  team?: string;
  description?: string;
  color: string; // CSS color for preview
  style: 'static' | 'dynamic';
  size: 'small' | 'medium' | 'large';
}

export const crosshairs: Crosshair[] = [
  // Pro Player Crosshairs
  {
    id: 's1mple',
    name: 's1mple',
    code: 'CSGO-aN4vK-KQx3P-uTxPT-4bYtH-HLLTM',
    category: 'pro',
    player: 's1mple',
    team: 'NAVI',
    description: 'Small static cyan crosshair',
    color: '#00FFFF',
    style: 'static',
    size: 'small',
  },
  {
    id: 'zywoo',
    name: 'ZywOo',
    code: 'CSGO-UdNaP-KWOQR-VLOLT-c8bJs-yVWKD',
    category: 'pro',
    player: 'ZywOo',
    team: 'Vitality',
    description: 'Classic small green crosshair',
    color: '#00FF00',
    style: 'static',
    size: 'small',
  },
  {
    id: 'niko',
    name: 'NiKo',
    code: 'CSGO-UNjDW-dz4Hk-pXsH5-mGhRF-EAhKN',
    category: 'pro',
    player: 'NiKo',
    team: 'G2',
    description: 'Small green crosshair with gap',
    color: '#00FF00',
    style: 'static',
    size: 'small',
  },
  {
    id: 'donk',
    name: 'donk',
    code: 'CSGO-WGVfj-X9FQM-bFH2M-fZ7hP-JrEzN',
    category: 'pro',
    player: 'donk',
    team: 'Team Spirit',
    description: 'Small cyan dot crosshair',
    color: '#00FFFF',
    style: 'static',
    size: 'small',
  },
  {
    id: 'm0nesy',
    name: 'm0NESY',
    code: 'CSGO-9Snp2-VxDzS-Jn2JP-yVknP-3O7NL',
    category: 'pro',
    player: 'm0NESY',
    team: 'G2',
    description: 'Small pink crosshair',
    color: '#FF69B4',
    style: 'static',
    size: 'small',
  },
  {
    id: 'device',
    name: 'device',
    code: 'CSGO-nCsDP-buRvh-VePHn-jMo5Y-HWPGF',
    category: 'pro',
    player: 'device',
    team: 'Astralis',
    description: 'Classic white crosshair',
    color: '#FFFFFF',
    style: 'static',
    size: 'small',
  },
  {
    id: 'ropz',
    name: 'ropz',
    code: 'CSGO-xFc9C-V6bO8-FBTaE-DJOmn-vxXoH',
    category: 'pro',
    player: 'ropz',
    team: 'FaZe',
    description: 'Small static cyan crosshair',
    color: '#00FFFF',
    style: 'static',
    size: 'small',
  },
  {
    id: 'twistzz',
    name: 'Twistzz',
    code: 'CSGO-zEpk5-5FhQV-eoXmr-JxsDn-WM7jG',
    category: 'pro',
    player: 'Twistzz',
    team: 'FaZe',
    description: 'Small classic crosshair',
    color: '#00FF00',
    style: 'static',
    size: 'small',
  },

  // Popular Community Crosshairs
  {
    id: 'simple-dot',
    name: 'Simple Dot',
    code: 'CSGO-O4Jsi-V36wY-rTMGK-d3dNH-MfoCP',
    category: 'dot',
    description: 'Clean center dot only',
    color: '#00FF00',
    style: 'static',
    size: 'small',
  },
  {
    id: 'small-cross',
    name: 'Small Cross',
    code: 'CSGO-sYNxN-Jwp6n-d7B3c-V4zMy-UJujN',
    category: 'minimal',
    description: 'Minimal small cross, no dot',
    color: '#00FF00',
    style: 'static',
    size: 'small',
  },
  {
    id: 'classic-static',
    name: 'Classic Static',
    code: 'CSGO-erCsz-Fz3dP-V9xQF-WLZGD-jXPXM',
    category: 'classic',
    description: 'Classic CS crosshair, static',
    color: '#00FF00',
    style: 'static',
    size: 'medium',
  },
  {
    id: 'classic-dynamic',
    name: 'Classic Dynamic',
    code: 'CSGO-T6M8z-BhEKr-c4NdG-YzPQD-2LPAN',
    category: 'classic',
    description: 'Classic crosshair with movement feedback',
    color: '#00FF00',
    style: 'dynamic',
    size: 'medium',
  },
  {
    id: 'cyan-small',
    name: 'Cyan Small',
    code: 'CSGO-Mq4n2-Ue7Gz-DKFB2-qNTxP-YMEWB',
    category: 'popular',
    description: 'Popular cyan small crosshair',
    color: '#00FFFF',
    style: 'static',
    size: 'small',
  },
  {
    id: 'pink-dot',
    name: 'Pink Dot',
    code: 'CSGO-hNOXZ-2eVGU-p59xm-6fMYD-MTOYF',
    category: 'dot',
    description: 'Pink dot crosshair',
    color: '#FF69B4',
    style: 'static',
    size: 'small',
  },
  {
    id: 'white-minimal',
    name: 'White Minimal',
    code: 'CSGO-Z2H5r-Qw4aT-bX7mK-Dc3nP-YLVRK',
    category: 'minimal',
    description: 'Clean white minimal crosshair',
    color: '#FFFFFF',
    style: 'static',
    size: 'small',
  },
  {
    id: 'yellow-classic',
    name: 'Yellow Classic',
    code: 'CSGO-K3mNp-Y7cRw-tU8xQ-Hd6bL-SFJNV',
    category: 'classic',
    description: 'Visible yellow classic crosshair',
    color: '#FFFF00',
    style: 'static',
    size: 'medium',
  },
  {
    id: 'red-dot',
    name: 'Red Dot',
    code: 'CSGO-P4vLn-Jw2sM-tQ5xR-Fb3cZ-NKDYM',
    category: 'dot',
    description: 'Red center dot',
    color: '#FF0000',
    style: 'static',
    size: 'small',
  },
  {
    id: 'green-t-style',
    name: 'Green T-Style',
    code: 'CSGO-R5wMz-Uc8dK-bX2nL-Yf6pQ-HWJTN',
    category: 'popular',
    description: 'T-shaped crosshair without top line',
    color: '#00FF00',
    style: 'static',
    size: 'small',
  },
];

// 按分类获取准星
export function getCrosshairsByCategory(category: Crosshair['category']): Crosshair[] {
  return crosshairs.filter(c => c.category === category);
}

// 获取所有分类
export const categories: { id: Crosshair['category']; name: string; icon: string }[] = [
  { id: 'pro', name: 'Pro Players', icon: '⭐' },
  { id: 'popular', name: 'Popular', icon: '🔥' },
  { id: 'minimal', name: 'Minimal', icon: '✨' },
  { id: 'dot', name: 'Dot Only', icon: '•' },
  { id: 'classic', name: 'Classic', icon: '➕' },
];
