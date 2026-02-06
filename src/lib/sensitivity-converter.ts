// 游戏灵敏度转换器

export interface GameConfig {
  id: string;
  name: string;
  shortName: string;
  // 每英寸转多少度（yaw 值）
  yawPerInch: (sens: number, dpi: number) => number;
  // 从 cm/360 反推灵敏度
  sensFromCm360: (cm360: number, dpi: number) => number;
  // 默认灵敏度
  defaultSens: number;
  // 灵敏度范围
  minSens: number;
  maxSens: number;
  // 是否有额外参数
  hasMultiplier?: boolean;
  multiplierName?: string;
  defaultMultiplier?: number;
}

// 游戏配置数据
export const games: Record<string, GameConfig> = {
  cs2: {
    id: 'cs2',
    name: 'Counter-Strike 2',
    shortName: 'CS2',
    // CS2: yaw = 0.022 degrees per unit at 1 sensitivity
    // degrees per inch = sensitivity * 0.022 * dpi
    yawPerInch: (sens, dpi) => sens * 0.022 * dpi,
    sensFromCm360: (cm360, dpi) => (360 / (cm360 / 2.54)) / (0.022 * dpi),
    defaultSens: 2.0,
    minSens: 0.1,
    maxSens: 10,
    hasMultiplier: true,
    multiplierName: 'm_yaw',
    defaultMultiplier: 0.022,
  },
  valorant: {
    id: 'valorant',
    name: 'Valorant',
    shortName: 'VAL',
    // Valorant: 1 sens = 0.07 degrees per count (at 800 DPI baseline)
    // Actual: degrees/inch = sens * dpi * 0.07
    yawPerInch: (sens, dpi) => sens * 0.07 * dpi,
    sensFromCm360: (cm360, dpi) => (360 / (cm360 / 2.54)) / (0.07 * dpi),
    defaultSens: 0.5,
    minSens: 0.1,
    maxSens: 5,
  },
  apex: {
    id: 'apex',
    name: 'Apex Legends',
    shortName: 'APEX',
    // Apex: similar to Source engine, yaw = 0.022
    yawPerInch: (sens, dpi) => sens * 0.022 * dpi,
    sensFromCm360: (cm360, dpi) => (360 / (cm360 / 2.54)) / (0.022 * dpi),
    defaultSens: 2.5,
    minSens: 0.1,
    maxSens: 10,
  },
  overwatch: {
    id: 'overwatch',
    name: 'Overwatch 2',
    shortName: 'OW2',
    // OW: 1 sens = 0.0066 degrees per count
    yawPerInch: (sens, dpi) => sens * 0.0066 * dpi,
    sensFromCm360: (cm360, dpi) => (360 / (cm360 / 2.54)) / (0.0066 * dpi),
    defaultSens: 5.0,
    minSens: 1,
    maxSens: 100,
  },
  fortnite: {
    id: 'fortnite',
    name: 'Fortnite',
    shortName: 'FN',
    // Fortnite: similar to Unreal Engine
    // At 100% sens and 800 DPI, ~34cm/360
    yawPerInch: (sens, dpi) => sens * 0.05555 * dpi,
    sensFromCm360: (cm360, dpi) => (360 / (cm360 / 2.54)) / (0.05555 * dpi),
    defaultSens: 10,
    minSens: 1,
    maxSens: 100,
  },
  r6: {
    id: 'r6',
    name: 'Rainbow Six Siege',
    shortName: 'R6',
    // R6 at 800 DPI, 50 sens = ~25cm/360
    yawPerInch: (sens, dpi) => sens * 0.00223 * dpi,
    sensFromCm360: (cm360, dpi) => (360 / (cm360 / 2.54)) / (0.00223 * dpi),
    defaultSens: 50,
    minSens: 1,
    maxSens: 100,
  },
  pubg: {
    id: 'pubg',
    name: 'PUBG',
    shortName: 'PUBG',
    // PUBG: 50 sens at 800 DPI = ~34cm/360
    yawPerInch: (sens, dpi) => sens * 0.002 * dpi,
    sensFromCm360: (cm360, dpi) => (360 / (cm360 / 2.54)) / (0.002 * dpi),
    defaultSens: 50,
    minSens: 1,
    maxSens: 100,
  },
  cod: {
    id: 'cod',
    name: 'Call of Duty',
    shortName: 'COD',
    // COD MW/Warzone: 5 sens at 800 DPI ~= 34cm/360
    yawPerInch: (sens, dpi) => sens * 0.022 * dpi * 1.5,
    sensFromCm360: (cm360, dpi) => (360 / (cm360 / 2.54)) / (0.022 * dpi * 1.5),
    defaultSens: 5,
    minSens: 0.5,
    maxSens: 20,
  },
};

// 计算 cm/360
export function calculateCm360(sens: number, dpi: number, gameId: string): number {
  const game = games[gameId];
  if (!game) return 0;

  const degreesPerInch = game.yawPerInch(sens, dpi);
  const inchesFor360 = 360 / degreesPerInch;
  const cmFor360 = inchesFor360 * 2.54;

  return cmFor360;
}

// 转换灵敏度
export function convertSensitivity(
  fromGame: string,
  toGame: string,
  sens: number,
  dpi: number
): number {
  const cm360 = calculateCm360(sens, dpi, fromGame);
  const targetGame = games[toGame];

  if (!targetGame) return 0;

  const convertedSens = targetGame.sensFromCm360(cm360, dpi);

  // 限制在有效范围内
  return Math.max(targetGame.minSens, Math.min(targetGame.maxSens, convertedSens));
}

// 获取所有游戏列表
export function getGameList(): GameConfig[] {
  return Object.values(games);
}
