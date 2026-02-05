'use client';

// 游戏画布组件

import { useRef, useEffect, useCallback, useState } from 'react';
import { usePointerLock } from '@/hooks/usePointerLock';
import { useGameInput } from '@/hooks/useGameInput';
import { useGameStore } from '@/store/game-store';
import { GameEngine } from '@/lib/game/engine';
import { TrackingEngine } from '@/lib/game/tracking-engine';
import { FlickingEngine } from '@/lib/game/flicking-engine';
import { TrainingType, TrainingResult, GameState } from '@/types/game';
import { calculateCm360, cm360ToWebSensitivity } from '@/lib/sensitivity';
import { useTranslation } from '@/lib/i18n';
import ResultScreen from './ResultScreen';

interface GameCanvasProps {
  trainingType: TrainingType;
  onComplete?: (result: TrainingResult) => void;
}

type AnyEngine = GameEngine | TrackingEngine | FlickingEngine;

export default function GameCanvas({ trainingType, onComplete }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<AnyEngine | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [gameState, setGameState] = useState<GameState>('idle');
  const [countdown, setCountdown] = useState(3);
  const [result, setResult] = useState<TrainingResult | null>(null);
  const [usePointerLockMode, setUsePointerLockMode] = useState(true);

  const { settings, trainingConfig, addTrainingResult } = useGameStore();
  const { isLocked, requestLock, exitLock } = usePointerLock(canvasRef);
  const { t } = useTranslation();

  // 计算敏感度因子
  const getSensitivityFactor = useCallback(() => {
    const cm360 = calculateCm360(settings.sensitivity);
    return cm360ToWebSensitivity(cm360, canvasRef.current?.width || 800);
  }, [settings.sensitivity]);

  // 初始化引擎
  const initEngine = useCallback(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // 根据训练类型创建引擎
    let engine: AnyEngine;
    switch (trainingType) {
      case 'tracking':
        engine = new TrackingEngine(canvas, trainingConfig);
        break;
      case 'flicking':
        engine = new FlickingEngine(canvas, trainingConfig);
        break;
      case 'gridshot':
      default:
        engine = new GameEngine(canvas, trainingConfig);
        break;
    }

    engine.setSensitivity(getSensitivityFactor());
    engine.setCrosshair(settings.crosshairColor, settings.crosshairSize);
    engine.setCallbacks({
      onGameStateChange: (state: GameState) => {
        setGameState(state);
        if (state === 'finished') {
          const results = engine.getResults();
          const trainingResult: TrainingResult = {
            trainingType,
            ...results,
            duration: trainingConfig.duration,
            timestamp: Date.now(),
            config: trainingConfig,
          };
          setResult(trainingResult);
          addTrainingResult(trainingResult);
          onComplete?.(trainingResult);
          exitLock();
        }
      },
    });

    engineRef.current = engine;
  }, [trainingType, trainingConfig, getSensitivityFactor, addTrainingResult, onComplete, exitLock]);

  // 开始游戏（带倒计时）
  const startGame = useCallback(() => {
    setResult(null);
    setGameState('countdown');
    setCountdown(3);

    let count = 3;
    const countdownInterval = setInterval(() => {
      count--;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(countdownInterval);
        initEngine();
        engineRef.current?.start();
      }
    }, 1000);
  }, [initEngine]);

  // 处理点击开始
  const handleStart = useCallback(() => {
    if (gameState !== 'idle') return;

    // 先尝试 Pointer Lock
    requestLock();

    // 设置一个超时，如果500ms后仍未锁定，则直接开始（无锁定模式）
    const timeoutId = setTimeout(() => {
      if (!document.pointerLockElement && gameState === 'idle') {
        setUsePointerLockMode(false);
        startGame();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [gameState, requestLock, startGame]);

  // 处理锁定状态变化
  useEffect(() => {
    if (isLocked && gameState === 'idle') {
      startGame();
    } else if (!isLocked && gameState === 'playing' && usePointerLockMode) {
      engineRef.current?.pause();
      setGameState('paused');
    }
  }, [isLocked, gameState, startGame, usePointerLockMode]);

  // 输入处理 - 始终启用（不仅仅是锁定时）
  useGameInput(
    canvasRef,
    {
      onMouseMove: (mx, my) => {
        if (gameState === 'playing') {
          engineRef.current?.onMouseMove(mx, my);
        }
      },
      onClick: () => {
        if (gameState === 'playing' && trainingType !== 'tracking') {
          engineRef.current?.onClick?.();
        }
      },
      onMouseDown: () => {
        if (gameState === 'playing' && trainingType === 'tracking' && engineRef.current instanceof TrackingEngine) {
          engineRef.current.onMouseDown();
        }
      },
      onMouseUp: () => {
        if (gameState === 'playing' && trainingType === 'tracking' && engineRef.current instanceof TrackingEngine) {
          engineRef.current.onMouseUp();
        }
      },
      onKeyDown: (key) => {
        if (key === 'Escape') {
          if (gameState === 'playing') {
            engineRef.current?.pause();
            setGameState('paused');
          }
          exitLock();
        } else if (key === ' ' && gameState === 'paused') {
          if (usePointerLockMode) {
            requestLock();
          }
          engineRef.current?.resume();
          setGameState('playing');
        }
      },
    },
    isLocked || !usePointerLockMode
  );

  // 清理
  useEffect(() => {
    return () => {
      engineRef.current?.destroy();
    };
  }, []);

  // 重新开始
  const handleRestart = () => {
    setResult(null);
    setGameState('idle');
    setTimeout(() => handleStart(), 100);
  };

  // 返回
  const handleBack = () => {
    window.history.back();
  };

  // 恢复游戏
  const handleResume = () => {
    if (usePointerLockMode) {
      requestLock();
    }
    engineRef.current?.resume();
    setGameState('playing');
  };

  const getModeTitle = () => {
    switch (trainingType) {
      case 'gridshot': return t('mode_gridshot');
      case 'tracking': return t('mode_tracking');
      case 'flicking': return t('mode_flicking');
      default: return '';
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full bg-gray-900">
      {/* 游戏画布 */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-crosshair"
        onClick={() => {
          if (gameState === 'idle' && !result) {
            handleStart();
          }
        }}
      />

      {/* 开始提示 */}
      {gameState === 'idle' && !result && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer"
          onClick={handleStart}
        >
          <div className="text-center text-white pointer-events-none">
            <h2 className="text-3xl font-bold mb-4">{getModeTitle()}</h2>
            <p className="text-gray-300 mb-6">{t('game_click_to_start')}</p>
            <div className="text-sm text-gray-400">
              <p>{t('game_esc_pause')}</p>
              <p>{t('game_space_continue')}</p>
            </div>
          </div>
        </div>
      )}

      {/* 倒计时 */}
      {gameState === 'countdown' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 pointer-events-none">
          <div className="text-9xl font-bold text-white animate-pulse">{countdown}</div>
        </div>
      )}

      {/* 暂停提示 */}
      {gameState === 'paused' && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/70 cursor-pointer"
          onClick={handleResume}
        >
          <div className="text-center text-white pointer-events-none">
            <h2 className="text-4xl font-bold mb-4">{t('game_paused')}</h2>
            <p className="text-gray-300">{t('game_click_continue')}</p>
          </div>
        </div>
      )}

      {/* 结果屏幕 */}
      {result && (
        <ResultScreen
          result={result}
          onRestart={handleRestart}
          onBack={handleBack}
        />
      )}
    </div>
  );
}
