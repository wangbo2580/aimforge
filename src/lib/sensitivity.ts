// 敏感度计算工具

import { SensitivityConfig } from '@/types/game';

/**
 * 计算 cm/360 (转360度需要移动的厘米数)
 */
export function calculateCm360(config: SensitivityConfig): number {
  const { game, sensitivity, dpi, mYaw = 0.022 } = config;

  switch (game) {
    case 'cs2':
      // CS2公式: cm/360 = (360 * 2.54) / (sens * dpi * m_yaw)
      return (360 * 2.54) / (sensitivity * dpi * mYaw);

    case 'valorant':
      // Valorant公式: cm/360 = (360 * 2.54) / (sens * dpi * 0.07)
      return (360 * 2.54) / (sensitivity * dpi * 0.07);

    case 'custom':
      // 自定义直接返回
      return config.cm360 || 30;

    default:
      return 30;
  }
}

/**
 * 将 cm/360 转换为 Web 敏感度因子
 * 这个因子用于将鼠标移动转换为游戏内移动
 *
 * 在 Web 中，鼠标移动是以像素为单位的 movementX/Y
 * 我们使用 1:1 映射，让用户可以通过设置调整
 */
export function cm360ToWebSensitivity(cm360: number, _canvasWidth: number): number {
  // 简化处理：使用 1:1 的基础映射
  // 用户可以通过调整游戏内灵敏度来微调
  // 基准 cm360 = 30cm，这是常见的中等敏感度
  // 如果 cm360 更高（更慢），factor 更小
  // 如果 cm360 更低（更快），factor 更大
  const baseCm360 = 30;
  const factor = baseCm360 / cm360;

  // 限制范围避免极端值
  return Math.max(0.2, Math.min(3, factor));
}

/**
 * 预设职业选手配置
 */
export const PRESET_CONFIGS: Record<string, SensitivityConfig> = {
  's1mple': {
    game: 'cs2',
    sensitivity: 3.09,
    dpi: 400,
    mYaw: 0.022,
  },
  'NiKo': {
    game: 'cs2',
    sensitivity: 1.55,
    dpi: 400,
    mYaw: 0.022,
  },
  'ZywOo': {
    game: 'cs2',
    sensitivity: 2.0,
    dpi: 400,
    mYaw: 0.022,
  },
  'TenZ': {
    game: 'valorant',
    sensitivity: 0.4,
    dpi: 800,
  },
  'Aspas': {
    game: 'valorant',
    sensitivity: 0.35,
    dpi: 800,
  },
};

/**
 * 格式化 cm/360 显示
 */
export function formatCm360(cm360: number): string {
  return `${cm360.toFixed(1)} cm/360`;
}
