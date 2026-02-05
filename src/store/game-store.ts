// Zustand 游戏状态管理

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  TrainingType,
  TrainingConfig,
  TrainingResult,
  GameSettings,
  DEFAULT_TRAINING_CONFIG,
  DEFAULT_SETTINGS,
} from '@/types/game';

interface GameStore {
  // 设置
  settings: GameSettings;
  updateSettings: (settings: Partial<GameSettings>) => void;

  // 训练配置
  trainingConfig: TrainingConfig;
  updateTrainingConfig: (config: Partial<TrainingConfig>) => void;

  // 训练历史
  trainingHistory: TrainingResult[];
  addTrainingResult: (result: TrainingResult) => void;
  clearHistory: () => void;

  // 最近一次结果
  lastResult: TrainingResult | null;
  setLastResult: (result: TrainingResult | null) => void;

  // 当前训练类型
  currentTrainingType: TrainingType | null;
  setCurrentTrainingType: (type: TrainingType | null) => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      // 初始设置
      settings: DEFAULT_SETTINGS,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      // 训练配置
      trainingConfig: DEFAULT_TRAINING_CONFIG,
      updateTrainingConfig: (config) =>
        set((state) => ({
          trainingConfig: { ...state.trainingConfig, ...config },
        })),

      // 训练历史
      trainingHistory: [],
      addTrainingResult: (result) =>
        set((state) => ({
          trainingHistory: [result, ...state.trainingHistory].slice(0, 100), // 最多保留100条
          lastResult: result,
        })),
      clearHistory: () => set({ trainingHistory: [], lastResult: null }),

      // 最近结果
      lastResult: null,
      setLastResult: (result) => set({ lastResult: result }),

      // 当前训练类型
      currentTrainingType: null,
      setCurrentTrainingType: (type) => set({ currentTrainingType: type }),
    }),
    {
      name: 'aimforge-storage',
      partialize: (state) => ({
        settings: state.settings,
        trainingConfig: state.trainingConfig,
        trainingHistory: state.trainingHistory,
      }),
    }
  )
);

// 选择器 hooks
export const useSettings = () => useGameStore((state) => state.settings);
export const useTrainingConfig = () => useGameStore((state) => state.trainingConfig);
export const useTrainingHistory = () => useGameStore((state) => state.trainingHistory);
export const useLastResult = () => useGameStore((state) => state.lastResult);

// 统计数据 hooks
export const useStats = () => {
  const history = useGameStore((state) => state.trainingHistory);

  const getStatsByType = (type: TrainingType) => {
    const typeHistory = history.filter((r) => r.trainingType === type);
    if (typeHistory.length === 0) return null;

    const avgAccuracy =
      typeHistory.reduce((sum, r) => sum + r.accuracy, 0) / typeHistory.length;
    const avgReactionTime =
      typeHistory.reduce((sum, r) => sum + r.avgReactionTime, 0) / typeHistory.length;
    const bestScore = Math.max(...typeHistory.map((r) => r.score));
    const totalSessions = typeHistory.length;

    return {
      avgAccuracy,
      avgReactionTime,
      bestScore,
      totalSessions,
    };
  };

  const getTotalStats = () => {
    if (history.length === 0) return null;

    const totalSessions = history.length;
    const avgAccuracy =
      history.reduce((sum, r) => sum + r.accuracy, 0) / history.length;
    const avgReactionTime =
      history.reduce((sum, r) => sum + r.avgReactionTime, 0) / history.length;
    const totalScore = history.reduce((sum, r) => sum + r.score, 0);

    return {
      totalSessions,
      avgAccuracy,
      avgReactionTime,
      totalScore,
    };
  };

  return {
    getStatsByType,
    getTotalStats,
  };
};
