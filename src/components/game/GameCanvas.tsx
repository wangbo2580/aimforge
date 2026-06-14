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
import { sensitivityToAngularDegrees } from '@/lib/sensitivity';
import { useTranslation } from '@/lib/i18n';
import { soundManager } from '@/lib/sound-manager';
import { trackEvent } from '@/lib/analytics';
import ResultScreen from './ResultScreen';

interface GameCanvasProps {
  trainingType: TrainingType;
  onComplete?: (result: TrainingResult) => void;
  renderResultScreen?: boolean;
  routineContext?: {
    routineId: string;
    stepId: string;
    stepName: string;
    label: string;
    isLastStep: boolean;
    onContinue: () => void;
  };
}

type AnyEngine = GameEngine | TrackingEngine | FlickingEngine;
type InputMode = 'unknown' | 'raw' | 'pointer-lock' | 'browser-fallback';

export default function GameCanvas({
  trainingType,
  onComplete,
  renderResultScreen = true,
  routineContext,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<AnyEngine | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const resumePendingRef = useRef(false);

  const [gameState, setGameState] = useState<GameState>('idle');
  const [countdown, setCountdown] = useState(3);
  const [result, setResult] = useState<TrainingResult | null>(null);
  const [inputMode, setInputMode] = useState<InputMode>('unknown');
  const [showFallbackPrompt, setShowFallbackPrompt] = useState(false);

  const { settings, trainingConfig, addTrainingResult } = useGameStore();
  const {
    isLocked,
    lockMode,
    rawInputSupported,
    requestLock,
    exitLock,
    error: pointerLockError,
  } = usePointerLock(canvasRef);
  const { t } = useTranslation();

  // 计算敏感度因子
  const getSensitivityFactor = useCallback(() => {
    return sensitivityToAngularDegrees(settings.sensitivity);
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

    // 初始化声音管理器
    soundManager.setEnabled(settings.soundEnabled);
    soundManager.setPreset(settings.soundPreset ?? 'pistol');
    soundManager.setVolume(settings.soundVolume ?? 0.5);

    engine.setCallbacks({
      onGameStateChange: (state: GameState) => {
        setGameState(state);
        if (state === 'playing') {
          soundManager.play('start');
          trackEvent('start_training', {
            mode: trainingType,
            duration: trainingConfig.duration,
            game: settings.sensitivity.game,
            sensitivity: settings.sensitivity.sensitivity,
            dpi: settings.sensitivity.dpi,
          });
        }
        if (state === 'finished') {
          soundManager.play('finish');
          const results = engine.getResults();
          const trainingResult: TrainingResult = {
            trainingType,
            ...results,
            duration: trainingConfig.duration,
            timestamp: Date.now(),
            config: trainingConfig,
            inputMode:
              inputMode === 'raw'
                ? 'raw'
                : inputMode === 'pointer-lock'
                ? 'pointer-lock'
                : 'browser-fallback',
            calibrationMultiplier: settings.sensitivity.calibrationMultiplier ?? 1,
            aimEngine: 'angular',
            routineId: routineContext?.routineId,
            routineStepId: routineContext?.stepId,
            routineStepName: routineContext?.stepName,
          };
          setResult(trainingResult);
          addTrainingResult(trainingResult);
          onComplete?.(trainingResult);
          exitLock();
          trackEvent('complete_training', {
            mode: trainingType,
            score: results.score,
            accuracy: results.accuracy,
            input_mode: inputMode,
            calibration_multiplier: settings.sensitivity.calibrationMultiplier ?? 1,
            aim_engine: 'angular',
            routine_id: routineContext?.routineId,
            routine_step_id: routineContext?.stepId,
          });
        }
      },
      onTargetHit: () => {
        soundManager.play('hit');
      },
      onTargetMiss: () => {
        soundManager.play('miss');
      },
      onTargetExpire: () => {
        soundManager.play('miss');
      },
    });

    engineRef.current = engine;
  }, [trainingType, trainingConfig, getSensitivityFactor, settings, addTrainingResult, onComplete, exitLock, inputMode, routineContext]);

  // 开始游戏（带倒计时）
  const startGame = useCallback(() => {
    setResult(null);
    setGameState('countdown');
    setCountdown(3);

    // 初始化声音（用于倒计时）
    soundManager.setEnabled(settings.soundEnabled);
    soundManager.setPreset(settings.soundPreset ?? 'pistol');
    soundManager.setVolume(settings.soundVolume ?? 0.5);
    soundManager.play('countdown');

    let count = 3;
    const countdownInterval = setInterval(() => {
      count--;
      setCountdown(count);
      if (count > 0) {
        soundManager.play('countdown');
      }
      if (count <= 0) {
        clearInterval(countdownInterval);
        initEngine();
        engineRef.current?.start();
      }
    }, 1000);
  }, [initEngine, settings.soundEnabled, settings.soundPreset, settings.soundVolume]);

  // 处理点击开始
  const handleStart = useCallback(async (force = false) => {
    if (!force && gameState !== 'idle') return;

    setShowFallbackPrompt(false);
    const mode = await requestLock();

    trackEvent('pointer_lock_request', {
      mode,
      raw_input_supported: mode === 'raw',
      training_mode: trainingType,
    });

    if (mode === 'raw') {
      setInputMode('raw');
    } else if (mode === 'standard') {
      setInputMode('pointer-lock');
    } else {
      setInputMode('browser-fallback');
      setShowFallbackPrompt(true);
      trackEvent('pointer_lock_failed', {
        training_mode: trainingType,
      });
    }
  }, [gameState, requestLock, trainingType]);

  const handleFallbackStart = useCallback(() => {
    if (gameState !== 'idle') return;
    setInputMode('browser-fallback');
    setShowFallbackPrompt(false);
    trackEvent('pointer_lock_fallback_start', {
      training_mode: trainingType,
    });
    startGame();
  }, [gameState, startGame, trainingType]);

  // 处理锁定状态变化
  useEffect(() => {
    if (isLocked && gameState === 'idle') {
      setInputMode(lockMode === 'raw' ? 'raw' : 'pointer-lock');
      startGame();
    } else if (isLocked && gameState === 'paused' && resumePendingRef.current) {
      resumePendingRef.current = false;
      engineRef.current?.resume();
      setGameState('playing');
    } else if (!isLocked && gameState === 'playing' && inputMode !== 'browser-fallback') {
      engineRef.current?.pause();
      setGameState('paused');
    }
  }, [isLocked, lockMode, gameState, startGame, inputMode]);

  const resumeTraining = useCallback(async () => {
    if (gameState !== 'paused') return;

    if (inputMode === 'browser-fallback') {
      engineRef.current?.resume();
      setGameState('playing');
      return;
    }

    resumePendingRef.current = true;
    const mode = await requestLock();

    if (mode === 'raw') {
      setInputMode('raw');
    } else if (mode === 'standard') {
      setInputMode('pointer-lock');
    } else {
      resumePendingRef.current = false;
      setInputMode('browser-fallback');
      setShowFallbackPrompt(false);
      trackEvent('pointer_lock_failed', {
        training_mode: trainingType,
        source: 'resume',
      });
      engineRef.current?.resume();
      setGameState('playing');
      return;
    }

    if (document.pointerLockElement === canvasRef.current) {
      resumePendingRef.current = false;
      engineRef.current?.resume();
      setGameState('playing');
    }
  }, [gameState, inputMode, requestLock, trainingType]);

  useEffect(() => {
    if (gameState !== 'paused') return;

    const handlePausedKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        resumeTraining();
      }
    };

    document.addEventListener('keydown', handlePausedKeyDown);
    return () => document.removeEventListener('keydown', handlePausedKeyDown);
  }, [gameState, resumeTraining]);

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
          const engine = engineRef.current;
          if (engine && 'onClick' in engine) {
            (engine as GameEngine | FlickingEngine).onClick();
          }
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
          resumePendingRef.current = false;
          if (gameState === 'playing') {
            engineRef.current?.pause();
            setGameState('paused');
          }
          exitLock();
        } else if (key === ' ' && gameState === 'paused') {
          resumeTraining();
        }
      },
    },
    isLocked || inputMode === 'browser-fallback'
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
    setInputMode('unknown');
    setShowFallbackPrompt(false);
    setGameState('idle');
    setTimeout(() => handleStart(true), 100);
  };

  // 返回
  const handleBack = () => {
    window.history.back();
  };

  // 恢复游戏
  const getModeTitle = () => {
    switch (trainingType) {
      case 'gridshot': return t('mode_gridshot');
      case 'tracking': return t('mode_tracking');
      case 'flicking': return t('mode_flicking');
      default: return '';
    }
  };

  const getInputStatus = () => {
    if (inputMode === 'raw') {
      return {
        label: 'Raw input',
        detail: 'Highest browser confidence for CS2-style mouse movement',
        color: 'border-green-500/40 bg-green-500/15 text-green-200',
      };
    }

    if (inputMode === 'pointer-lock') {
      return {
        label: 'Pointer lock',
        detail: 'Mouse is captured, but OS/browser acceleration may still apply',
        color: 'border-yellow-500/40 bg-yellow-500/15 text-yellow-100',
      };
    }

    if (inputMode === 'browser-fallback') {
      return {
        label: 'Browser fallback',
        detail: 'Not CS2-like. Use only if pointer lock is blocked',
        color: 'border-red-500/40 bg-red-500/15 text-red-100',
      };
    }

    return {
      label: 'Input check',
      detail:
        rawInputSupported === false
          ? 'Raw input unavailable; pointer lock will still be requested'
          : 'Click start to request raw mouse input',
      color: 'border-blue-500/40 bg-blue-500/15 text-blue-100',
    };
  };

  const inputStatus = getInputStatus();
  const showCompactInputStatus =
    gameState === 'playing' || gameState === 'paused' || gameState === 'countdown';

  return (
    <div ref={containerRef} className="relative w-full h-full bg-gray-900">
      <div
        className={`pointer-events-none absolute z-10 border text-xs shadow-lg backdrop-blur ${
          showCompactInputStatus
            ? `bottom-4 left-4 rounded-full px-3 py-1.5 ${inputStatus.color}`
            : `left-4 top-4 max-w-xs rounded-lg px-3 py-2 ${inputStatus.color}`
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
          <span className="font-semibold">{inputStatus.label}</span>
        </div>
        {!showCompactInputStatus && <div className="mt-0.5 opacity-90">{inputStatus.detail}</div>}
      </div>

      {/* 游戏画布 */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${
          gameState === 'playing' && inputMode !== 'browser-fallback' ? 'cursor-none' : 'cursor-crosshair'
        }`}
        onClick={() => {
          if (gameState === 'idle' && !result && !showFallbackPrompt) {
            handleStart();
          }
        }}
      />

      {/* 开始提示 */}
      {gameState === 'idle' && !result && !showFallbackPrompt && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer"
          onClick={() => handleStart()}
        >
          <div className="text-center text-white pointer-events-none">
            <h2 className="text-3xl font-bold mb-4">{getModeTitle()}</h2>
            <p className="text-gray-300 mb-2">{t('game_click_to_start')}</p>
            <p className="mx-auto mb-6 max-w-md text-sm text-gray-400">
              Raw mouse input will be requested first. If your browser blocks it, you will see a clear fallback warning.
            </p>
            <div className="text-sm text-gray-400">
              <p>{t('game_esc_pause')}</p>
              <p>{t('game_space_continue')}</p>
            </div>
          </div>
        </div>
      )}

      {gameState === 'idle' && !result && showFallbackPrompt && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/75">
          <div className="mx-4 max-w-lg rounded-lg border border-red-500/40 bg-gray-900 p-6 text-white shadow-2xl">
            <p className="text-xs font-semibold uppercase tracking-wide text-red-300">
              Pointer lock failed
            </p>
            <h2 className="mt-2 text-2xl font-bold">CS2-style mouse input is not active</h2>
            <p className="mt-3 text-sm text-gray-300">
              The trainer could not capture raw mouse movement. Browser fallback mode uses standard cursor movement, so it will not feel like CS2.
            </p>
            {pointerLockError && (
              <p className="mt-3 rounded-lg bg-gray-800 px-3 py-2 text-xs text-gray-400">
                Browser message: {pointerLockError}
              </p>
            )}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  setShowFallbackPrompt(false);
                  setInputMode('unknown');
                  handleStart(true);
                }}
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
              >
                Try again
              </button>
              <button
                type="button"
                onClick={handleFallbackStart}
                className="rounded-lg bg-gray-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-600"
              >
                Start fallback mode
              </button>
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
          onClick={resumeTraining}
        >
          <div className="text-center text-white pointer-events-none">
            <h2 className="text-4xl font-bold mb-4">{t('game_paused')}</h2>
            <p className="text-gray-300">{t('game_click_continue')}</p>
          </div>
        </div>
      )}

      {/* 结果屏幕 */}
      {result && renderResultScreen && (
        <ResultScreen
          result={result}
          onRestart={handleRestart}
          onBack={handleBack}
          routineAction={
            routineContext
              ? {
                  label: routineContext.isLastStep ? 'Finish warm-up' : 'Continue warm-up',
                  description: routineContext.label,
                  onClick: routineContext.onContinue,
                }
              : undefined
          }
          hideRoutineRecommendation={Boolean(routineContext)}
        />
      )}
    </div>
  );
}
