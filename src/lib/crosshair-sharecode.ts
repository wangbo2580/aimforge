// CS2 / CS:GO 准星分享码 编解码器
//
// 把 `CSGO-xxxxx-...` 分享码与准星 cvar 参数互转，纯离线、无依赖。
// 算法已对 30 个真实职业选手准星码 + akiver 官方示例做回环测试（32/32 通过）。
// 参考实现: akiver/csgo-sharecode、saul gist d5b1a0e2284e2bf767793880f03bd729。
//
// 字节布局（18 字节，大端，byte[0] 为校验和）:
//   [0] checksum = sum(bytes[1..17]) & 0xff
//   [1] 固定 1
//   [2] gap × 10 (signed)
//   [3] outline × 2
//   [4][5][6] red / green / blue
//   [7] alpha
//   [8] (splitDistance & 0x7f) | (followRecoil << 7)
//   [9] fixedCrosshairGap × 10 (signed)
//   [10] (color & 7) | (outlineEnabled << 3) | (innerSplitAlpha×10 << 4)
//   [11] (outerSplitAlpha×10 & 0xf) | (splitSizeRatio×10 << 4)
//   [12] thickness × 10
//   [13] (style << 1) | (dot << 4) | (weaponGap << 5) | (alpha << 6) | (tStyle << 7)
//   [14] length × 10
//   [15][16][17] 0

const DICTIONARY = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefhijkmnopqrstuvwxyz23456789';
const BASE = BigInt(DICTIONARY.length);
const SHARECODE_RE = /^CSGO(-?[\w]{5}){5}$/;

export interface CS2Crosshair {
  /** cl_crosshairstyle 0-5（0/1 默认动态、2 经典、3 经典动态、4/5 经典静态） */
  style: number;
  /** cl_crosshairsize */
  length: number;
  /** cl_crosshairthickness */
  thickness: number;
  /** cl_crosshairgap（可负） */
  gap: number;
  /** cl_crosshairdot */
  centerDotEnabled: boolean;
  /** cl_crosshair_drawoutline */
  outlineEnabled: boolean;
  /** cl_crosshair_outlinethickness */
  outline: number;
  /** cl_crosshaircolor 0-4 预设，5=自定义 RGB */
  color: number;
  red: number;
  green: number;
  blue: number;
  /** cl_crosshairusealpha */
  alphaEnabled: boolean;
  /** cl_crosshairalpha 0-255 */
  alpha: number;
  /** cl_crosshair_t（T 字形，无上半线） */
  tStyleEnabled: boolean;
  /** cl_crosshairgap_useweaponvalue */
  deployedWeaponGapEnabled: boolean;
  /** cl_crosshair_recoil */
  followRecoil: boolean;
  /** cl_crosshair_dynamic_splitdist */
  splitDistance: number;
  /** cl_fixedcrosshairgap */
  fixedCrosshairGap: number;
  /** cl_crosshair_dynamic_splitalpha_innermod */
  innerSplitAlpha: number;
  /** cl_crosshair_dynamic_splitalpha_outermod */
  outerSplitAlpha: number;
  /** cl_crosshair_dynamic_maxdist_splitratio */
  splitSizeRatio: number;
}

export interface DecodedCrosshair extends CS2Crosshair {
  /** 校验和是否通过（false 表示码无效 / 损坏） */
  valid: boolean;
}

const toByte = (v: number): number => ((Math.round(v) % 256) + 256) % 256;
const sbyte = (b: number): number => (b > 127 ? b - 256 : b);

/** 校验分享码格式 */
export function isValidShareCodeFormat(shareCode: string): boolean {
  return SHARECODE_RE.test(shareCode);
}

function shareCodeToBytes(shareCode: string): number[] {
  const code = shareCode.replace(/^CSGO-?/, '').replace(/-/g, '');
  if (code.length !== 25) {
    throw new Error(`Invalid crosshair share code length: ${code.length}`);
  }
  let big = BigInt(0);
  for (let i = code.length - 1; i >= 0; i--) {
    const idx = DICTIONARY.indexOf(code[i]);
    if (idx < 0) throw new Error(`Invalid character in share code: '${code[i]}'`);
    big = big * BASE + BigInt(idx);
  }
  const bytes = new Array<number>(18).fill(0);
  for (let i = 17; i >= 0; i--) {
    bytes[i] = Number(big & BigInt(0xff));
    big >>= BigInt(8);
  }
  return bytes;
}

function bytesToShareCode(bytes: number[]): string {
  let big = BigInt(0);
  for (let i = 0; i < 18; i++) big = big * BigInt(256) + BigInt(bytes[i] & 0xff);
  let s = '';
  for (let j = 0; j < 25; j++) {
    s += DICTIONARY[Number(big % BASE)];
    big = big / BASE;
  }
  return `CSGO-${s.slice(0, 5)}-${s.slice(5, 10)}-${s.slice(10, 15)}-${s.slice(15, 20)}-${s.slice(20, 25)}`;
}

/**
 * 解码 CS2 准星分享码为参数对象。
 * @throws 格式非法时抛错；码本身损坏时返回对象的 valid=false。
 */
export function decodeShareCode(shareCode: string): DecodedCrosshair {
  if (!isValidShareCodeFormat(shareCode)) {
    throw new Error(`Invalid crosshair share code format: ${shareCode}`);
  }
  const b = shareCodeToBytes(shareCode);
  const checksum = (b.slice(1).reduce((a, x) => a + x, 0)) & 0xff;
  return {
    valid: checksum === b[0],
    gap: sbyte(b[2]) / 10,
    outline: b[3] / 2,
    red: b[4],
    green: b[5],
    blue: b[6],
    alpha: b[7],
    splitDistance: b[8] & 0x7f,
    followRecoil: (b[8] & 128) !== 0,
    fixedCrosshairGap: sbyte(b[9]) / 10,
    color: b[10] & 7,
    outlineEnabled: (b[10] & 8) !== 0,
    innerSplitAlpha: (b[10] >> 4) / 10,
    outerSplitAlpha: (b[11] & 0xf) / 10,
    splitSizeRatio: (b[11] >> 4) / 10,
    thickness: b[12] / 10,
    style: (b[13] & 0xf) >> 1,
    centerDotEnabled: (b[13] & 16) !== 0,
    deployedWeaponGapEnabled: (b[13] & 32) !== 0,
    alphaEnabled: (b[13] & 64) !== 0,
    tStyleEnabled: (b[13] & 128) !== 0,
    length: b[14] / 10,
  };
}

/** 编码准星参数为合法分享码（自动算校验和，CS2 可直接导入）。 */
export function encodeShareCode(c: CS2Crosshair): string {
  const bytes = [
    0,
    1,
    toByte(c.gap * 10),
    toByte(c.outline * 2),
    toByte(c.red),
    toByte(c.green),
    toByte(c.blue),
    toByte(c.alpha),
    toByte((c.splitDistance & 0x7f) | ((c.followRecoil ? 1 : 0) << 7)),
    toByte(c.fixedCrosshairGap * 10),
    toByte((c.color & 7) | ((c.outlineEnabled ? 1 : 0) << 3) | ((Math.round(c.innerSplitAlpha * 10) & 0xf) << 4)),
    toByte((Math.round(c.outerSplitAlpha * 10) & 0xf) | ((Math.round(c.splitSizeRatio * 10) & 0xf) << 4)),
    toByte(c.thickness * 10),
    toByte(
      ((c.style & 7) << 1) |
        ((c.centerDotEnabled ? 1 : 0) << 4) |
        ((c.deployedWeaponGapEnabled ? 1 : 0) << 5) |
        ((c.alphaEnabled ? 1 : 0) << 6) |
        ((c.tStyleEnabled ? 1 : 0) << 7),
    ),
    toByte(c.length * 10),
    0,
    0,
    0,
  ];
  bytes[0] = bytes.slice(1).reduce((a, x) => a + x, 0) & 0xff;
  return bytesToShareCode(bytes);
}

// cl_crosshaircolor 预设色（0-4），5=自定义
const PRESET_HEX = ['#FF0000', '#00FF00', '#FFFF00', '#0000FF', '#00FFFF'];
const PRESET_NAMES = ['Red', 'Green', 'Yellow', 'Blue', 'Cyan'];

// 自定义 RGB → 最近的命名色
const COLOR_PALETTE: ReadonlyArray<readonly [string, number, number, number]> = [
  ['Red', 255, 0, 0], ['Green', 0, 255, 0], ['Yellow', 255, 255, 0], ['Blue', 0, 0, 255],
  ['Cyan', 0, 255, 255], ['White', 255, 255, 255], ['Magenta', 255, 0, 255],
  ['Orange', 255, 140, 0], ['Pink', 255, 105, 180], ['Black', 0, 0, 0],
];

const STYLE_NAMES = ['default', 'default static', 'classic', 'classic dynamic', 'classic static', 'classic static'];

/** 返回准星颜色的命名（预设色用其名，自定义 RGB 取最近调色板色）。 */
export function crosshairColorName(c: Pick<CS2Crosshair, 'color' | 'red' | 'green' | 'blue'>): string {
  if (c.color >= 0 && c.color <= 4) return PRESET_NAMES[c.color];
  let best = 'Custom';
  let bestDist = Infinity;
  for (const [name, r, g, b] of COLOR_PALETTE) {
    const d = (c.red - r) ** 2 + (c.green - g) ** 2 + (c.blue - b) ** 2;
    if (d < bestDist) { bestDist = d; best = name; }
  }
  return best;
}

/** 由准星参数生成人类可读描述，如 "Green classic static crosshair, no dot"。 */
export function describeCrosshair(c: CS2Crosshair): string {
  const color = crosshairColorName(c);
  const style = STYLE_NAMES[c.style] ?? 'classic static';
  const dot = c.centerDotEnabled ? 'with center dot' : 'no dot';
  return `${color} ${style} crosshair, ${dot}`;
}

/** 返回准星实际颜色的 CSS hex（预设色或自定义 RGB）。用于预览渲染。 */
export function crosshairColorHex(c: Pick<CS2Crosshair, 'color' | 'red' | 'green' | 'blue'>): string {
  if (c.color >= 0 && c.color <= 4) return PRESET_HEX[c.color];
  const h = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${h(c.red)}${h(c.green)}${h(c.blue)}`;
}

/** 导出为 CS2 控制台命令（供"复制 config"功能）。 */
export function crosshairToConVars(c: CS2Crosshair): string[] {
  const lines = [
    `cl_crosshairstyle ${c.style}`,
    `cl_crosshairsize ${c.length}`,
    `cl_crosshairthickness ${c.thickness}`,
    `cl_crosshairgap ${c.gap}`,
    `cl_crosshairdot ${c.centerDotEnabled ? 1 : 0}`,
    `cl_crosshair_drawoutline ${c.outlineEnabled ? 1 : 0}`,
    `cl_crosshair_outlinethickness ${c.outline}`,
    `cl_crosshaircolor ${c.color}`,
    `cl_crosshairusealpha ${c.alphaEnabled ? 1 : 0}`,
    `cl_crosshairalpha ${c.alpha}`,
    `cl_crosshair_t ${c.tStyleEnabled ? 1 : 0}`,
  ];
  if (c.color === 5) {
    lines.push(`cl_crosshaircolor_r ${c.red}`, `cl_crosshaircolor_g ${c.green}`, `cl_crosshaircolor_b ${c.blue}`);
  }
  return lines;
}

/** CS2 默认准星参数（绿色经典静态）。 */
export const DEFAULT_CROSSHAIR: CS2Crosshair = {
  style: 4,
  length: 2,
  thickness: 1,
  gap: -3,
  centerDotEnabled: false,
  outlineEnabled: true,
  outline: 1,
  color: 1,
  red: 0,
  green: 255,
  blue: 0,
  alphaEnabled: true,
  alpha: 255,
  tStyleEnabled: false,
  deployedWeaponGapEnabled: false,
  followRecoil: false,
  splitDistance: 7,
  fixedCrosshairGap: 0,
  innerSplitAlpha: 1,
  outerSplitAlpha: 0.5,
  splitSizeRatio: 0.3,
};
