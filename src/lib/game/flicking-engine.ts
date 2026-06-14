// Flicking训练引擎 - 快速甩枪训练

import { Target, GameState, TrainingConfig, TARGET_SIZES } from '@/types/game';
import {
  AngularCamera,
  isTargetCentered,
  projectTarget,
  rotateCamera,
} from './angular-aim';

export interface FlickingCallbacks {
  onTargetHit?: (target: Target, reactionTime: number, flickDistance: number) => void;
  onTargetMiss?: () => void;
  onTargetExpire?: (target: Target) => void;
  onGameStateChange?: (state: GameState) => void;
  onTick?: (deltaTime: number) => void;
}

// 距离配置
const DISTANCE_CONFIG = {
  close: { min: 6, max: 10 },
  medium: { min: 10, max: 18 },
  far: { min: 18, max: 28 },
};

export class FlickingEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private animationId: number | null = null;
  private lastTime: number = 0;
  private isRunning: boolean = false;

  // 游戏状态
  private gameState: GameState = 'idle';
  private startTime: number = 0;
  private remainingTime: number = 0;
  private config: TrainingConfig;

  // 输入状态
  private camera: AngularCamera = { yaw: 0, pitch: 0 };
  private sensitivityFactor: number = 1;

  // 准星设置
  private crosshairColor: string = '#ffffff';
  private crosshairSize: number = 10;

  // 目标
  private currentTarget: Target | null = null;
  private lastTargetAngle: { yaw: number; pitch: number } | null = null;

  // 统计
  private score: number = 0;
  private hits: number = 0;
  private misses: number = 0;
  private totalTargets: number = 0;
  private reactionTimes: number[] = [];
  private flickDistances: number[] = [];

  // 回调
  private callbacks: FlickingCallbacks = {};

  constructor(canvas: HTMLCanvasElement, config: TrainingConfig) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.config = config;
    this.remainingTime = config.duration;
  }

  setCallbacks(callbacks: FlickingCallbacks) {
    this.callbacks = callbacks;
  }

  setSensitivity(factor: number) {
    this.sensitivityFactor = factor;
  }

  setCrosshair(color: string, size: number) {
    this.crosshairColor = color;
    this.crosshairSize = size;
  }

  start() {
    this.gameState = 'playing';
    this.isRunning = true;
    this.startTime = performance.now();
    this.lastTime = this.startTime;

    // 重置状态
    this.score = 0;
    this.hits = 0;
    this.misses = 0;
    this.totalTargets = 0;
    this.reactionTimes = [];
    this.flickDistances = [];
    this.remainingTime = this.config.duration;
    this.currentTarget = null;
    this.lastTargetAngle = null;

    this.camera = { yaw: 0, pitch: 0 };

    // 生成第一个目标
    this.spawnTarget();

    this.callbacks.onGameStateChange?.('playing');
    this.gameLoop(performance.now());
  }

  pause() {
    this.isRunning = false;
    this.gameState = 'paused';
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.callbacks.onGameStateChange?.('paused');
  }

  resume() {
    if (this.gameState === 'paused') {
      this.isRunning = true;
      this.gameState = 'playing';
      this.lastTime = performance.now();
      this.callbacks.onGameStateChange?.('playing');
      this.gameLoop(performance.now());
    }
  }

  stop() {
    this.isRunning = false;
    this.gameState = 'finished';
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.callbacks.onGameStateChange?.('finished');
  }

  private gameLoop(currentTime: number) {
    if (!this.isRunning) return;

    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    this.update();
    this.render();

    this.remainingTime -= deltaTime;
    if (this.remainingTime <= 0) {
      this.stop();
      return;
    }

    this.animationId = requestAnimationFrame(this.gameLoop.bind(this));
    this.callbacks.onTick?.(deltaTime);
  }

  private update() {
    if (!this.currentTarget) return;

    // 检查目标是否过期 (2秒)
    const age = performance.now() - this.currentTarget.createdAt;
    if (age > 2000) {
      this.misses++;
      this.callbacks.onTargetExpire?.(this.currentTarget);
      this.spawnTarget();
    }
  }

  private render() {
    const { width, height } = this.canvas;
    const ctx = this.ctx;

    // 清屏
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, width, height);

    // 绘制目标
    if (this.currentTarget) {
      this.drawTarget(this.currentTarget);
    }

    // 绘制准星
    this.drawCrosshair();

    // 绘制HUD
    this.drawHUD();
  }

  private drawTarget(target: Target) {
    const ctx = this.ctx;
    const projected = projectTarget(this.canvas, this.camera, target);
    if (!projected.visible) return;
    const { x, y, radius } = projected;

    // 计算剩余时间比例 (2秒超时)
    const age = performance.now() - target.createdAt;
    const timeRatio = Math.max(0, 1 - age / 2000);

    // 外圈 - 带时间指示
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(239, 68, 68, ${0.3 + timeRatio * 0.7})`;
    ctx.fill();

    // 时间进度环
    ctx.beginPath();
    ctx.arc(x, y, radius + 3, -Math.PI / 2, -Math.PI / 2 + timeRatio * Math.PI * 2);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 内圈
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = '#dc2626';
    ctx.fill();
  }

  private drawCrosshair() {
    const ctx = this.ctx;
    const x = this.canvas.width / 2;
    const y = this.canvas.height / 2;
    const size = this.crosshairSize;
    const gap = Math.max(2, this.crosshairSize * 0.3);

    ctx.strokeStyle = this.crosshairColor;
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(x, y - gap);
    ctx.lineTo(x, y - gap - size);
    ctx.moveTo(x, y + gap);
    ctx.lineTo(x, y + gap + size);
    ctx.moveTo(x - gap, y);
    ctx.lineTo(x - gap - size, y);
    ctx.moveTo(x + gap, y);
    ctx.lineTo(x + gap + size, y);
    ctx.stroke();
  }

  private drawHUD() {
    const ctx = this.ctx;
    const accuracy = this.totalTargets > 0 ? (this.hits / this.totalTargets) * 100 : 0;
    const avgFlick = this.flickDistances.length > 0
      ? this.flickDistances.reduce((a, b) => a + b, 0) / this.flickDistances.length
      : 0;

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Inter, system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`分数: ${this.score}`, 20, 40);

    ctx.textAlign = 'center';
    ctx.fillText(`${Math.ceil(this.remainingTime)}s`, this.canvas.width / 2, 40);

    ctx.textAlign = 'right';
    ctx.fillText(`准确率: ${accuracy.toFixed(1)}%`, this.canvas.width - 20, 40);

    // 显示平均甩枪距离
    ctx.font = '16px Inter, system-ui, sans-serif';
    ctx.fillText(`平均距离: ${avgFlick.toFixed(0)}px`, this.canvas.width - 20, 65);
  }

  private spawnTarget() {
    const radius = TARGET_SIZES[this.config.targetSize];
    const distanceConfig = DISTANCE_CONFIG[this.config.targetDistance || 'medium'];

    const distance = distanceConfig.min + Math.random() * (distanceConfig.max - distanceConfig.min);
    const angle = Math.random() * Math.PI * 2;
    const baseYaw = this.camera.yaw;
    const basePitch = this.camera.pitch;
    const pitch = Math.max(-18, Math.min(18, basePitch + Math.sin(angle) * distance * 0.65));

    this.currentTarget = {
      id: crypto.randomUUID(),
      x: 0,
      y: 0,
      radius,
      createdAt: performance.now(),
      isHit: false,
      yaw: baseYaw + Math.cos(angle) * distance,
      pitch,
      angularRadius:
        this.config.targetSize === 'small'
          ? 1.1
          : this.config.targetSize === 'large'
          ? 2.4
          : 1.7,
    };

    this.totalTargets++;
  }

  onMouseMove(movementX: number, movementY: number) {
    this.camera = rotateCamera(this.camera, movementX, movementY, this.sensitivityFactor);
  }

  onClick(): boolean {
    if (this.gameState !== 'playing' || !this.currentTarget) return false;

    if (isTargetCentered(this.currentTarget, this.camera)) {
      // 命中
      const reactionTime = performance.now() - this.currentTarget.createdAt;

      // 计算甩枪距离
      const targetYaw = this.currentTarget.yaw ?? this.camera.yaw;
      const targetPitch = this.currentTarget.pitch ?? this.camera.pitch;
      const flickDistance = this.lastTargetAngle
        ? Math.sqrt(
            (targetYaw - this.lastTargetAngle.yaw) ** 2 +
            (targetPitch - this.lastTargetAngle.pitch) ** 2
          )
        : 0;

      this.score++;
      this.hits++;
      this.reactionTimes.push(reactionTime);
      if (flickDistance > 0) {
        this.flickDistances.push(flickDistance);
      }

      this.callbacks.onTargetHit?.(this.currentTarget, reactionTime, flickDistance);

      // 记录位置并生成新目标
      this.lastTargetAngle = { yaw: targetYaw, pitch: targetPitch };
      this.spawnTarget();
      return true;
    } else {
      // 未命中
      this.misses++;
      this.callbacks.onTargetMiss?.();
      return false;
    }
  }

  getResults() {
    const avgReactionTime = this.reactionTimes.length > 0
      ? this.reactionTimes.reduce((a, b) => a + b, 0) / this.reactionTimes.length
      : 0;
    const bestReactionTime = this.reactionTimes.length > 0
      ? Math.min(...this.reactionTimes)
      : 0;
    const avgFlickDistance = this.flickDistances.length > 0
      ? this.flickDistances.reduce((a, b) => a + b, 0) / this.flickDistances.length
      : 0;

    return {
      score: this.score,
      accuracy: this.totalTargets > 0 ? (this.hits / this.totalTargets) * 100 : 0,
      avgReactionTime: Math.round(avgReactionTime),
      bestReactionTime: Math.round(bestReactionTime),
      totalTargets: this.totalTargets,
      hits: this.hits,
      misses: this.misses,
      avgFlickDistance: Math.round(avgFlickDistance),
    };
  }

  getState() {
    return {
      gameState: this.gameState,
      remainingTime: this.remainingTime,
      score: this.score,
      accuracy: this.totalTargets > 0 ? (this.hits / this.totalTargets) * 100 : 0,
    };
  }

  destroy() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.currentTarget = null;
  }
}
