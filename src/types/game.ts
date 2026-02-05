// 游戏类型定义

export type TrainingType = 'gridshot' | 'tracking' | 'flicking';

export type GameState = 'idle' | 'countdown' | 'playing' | 'paused' | 'finished';

export type TargetSize = 'small' | 'medium' | 'large';

export type TrackingPattern = 'linear' | 'curve' | 'random' | 'strafe';

export type Speed = 'slow' | 'medium' | 'fast';

// 目标对象
export interface Target {
  id: string;
  x: number;
  y: number;
  radius: number;
  createdAt: number;
  isHit: boolean;
  // Tracking专用
  velocityX?: number;
  velocityY?: number;
}

// 训练配置
export interface TrainingConfig {
  // 通用配置
  duration: number; // 训练时长(秒)
  targetSize: TargetSize;

  // Gridshot配置
  targetCount?: number; // 同时目标数

  // Tracking配置
  movePattern?: TrackingPattern;
  speed?: Speed;

  // Flicking配置
  targetDistance?: 'close' | 'medium' | 'far';
}

// 训练结果
export interface TrainingResult {
  trainingType: TrainingType;
  score: number;
  accuracy: number;
  avgReactionTime: number;
  bestReactionTime: number;
  totalTargets: number;
  hits: number;
  misses: number;
  duration: number;
  timestamp: number;
  config: TrainingConfig;
}

// 敏感度配置
export interface SensitivityConfig {
  game: 'cs2' | 'valorant' | 'custom';
  sensitivity: number;
  dpi: number;
  mYaw?: number; // CS2专用
  cm360?: number; // 计算值
}

// 游戏设置
export interface GameSettings {
  sensitivity: SensitivityConfig;
  crosshairColor: string;
  crosshairSize: number;
  targetSize: TargetSize;
  soundEnabled: boolean;
}

// 目标大小映射
export const TARGET_SIZES: Record<TargetSize, number> = {
  small: 25,
  medium: 40,
  large: 60,
};

// 速度映射
export const SPEED_VALUES: Record<Speed, number> = {
  slow: 2,
  medium: 4,
  fast: 7,
};

// 默认训练配置
export const DEFAULT_TRAINING_CONFIG: TrainingConfig = {
  duration: 30,
  targetSize: 'medium',
  targetCount: 3,
  movePattern: 'strafe',
  speed: 'medium',
  targetDistance: 'medium',
};

// 默认设置
export const DEFAULT_SETTINGS: GameSettings = {
  sensitivity: {
    game: 'cs2',
    sensitivity: 2.0,
    dpi: 800,
    mYaw: 0.022,
  },
  crosshairColor: '#ffffff',
  crosshairSize: 10,
  targetSize: 'medium',
  soundEnabled: true,
};
