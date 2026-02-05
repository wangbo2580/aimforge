// Flicking训练引擎 - 快速甩枪训练

import { Target, GameState, TrainingConfig, TARGET_SIZES } from '@/types/game';

export interface FlickingCallbacks {
  onTargetHit?: (target: Target, reactionTime: number, flickDistance: number) => void;
  onTargetMiss?: () => void;
  onTargetExpire?: (target: Target) => void;
  onGameStateChange?: (state: GameState) => void;
  onTick?: (deltaTime: number) => void;
}

// 距离配置
const DISTANCE_CONFIG = {
  close: { min: 0.15, max: 0.25 },
  medium: { min: 0.25, max: 0.4 },
  far: { min: 0.4, max: 0.6 },
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
  private mouseX: number = 0;
  private mouseY: number = 0;
  private sensitivityFactor: number = 1;

  // 准星设置
  private crosshairColor: string = '#ffffff';
  private crosshairSize: number = 10;

  // 目标
  private currentTarget: Target | null = null;
  private lastTargetPos: { x: number; y: number } | null = null;

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
    this.lastTargetPos = null;

    // 初始化鼠标位置到中心
    this.mouseX = this.canvas.width / 2;
    this.mouseY = this.canvas.height / 2;

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

    this.update(deltaTime);
    this.render();

    this.remainingTime -= deltaTime;
    if (this.remainingTime <= 0) {
      this.stop();
      return;
    }

    this.animationId = requestAnimationFrame(this.gameLoop.bind(this));
    this.callbacks.onTick?.(deltaTime);
  }

  private update(_deltaTime: number) {
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

    // 绘制中心参考点
    this.drawCenterReference();

    // 绘制目标
    if (this.currentTarget) {
      this.drawTarget(this.currentTarget);
    }

    // 绘制准星
    this.drawCrosshair();

    // 绘制HUD
    this.drawHUD();
  }

  private drawCenterReference() {
    const ctx = this.ctx;
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;

    // 绘制小圆点作为中心参考
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fill();
  }

  private drawTarget(target: Target) {
    const ctx = this.ctx;
    const { x, y, radius } = target;

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
    const x = this.mouseX;
    const y = this.mouseY;
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

    // 从上一个目标位置或中心计算新位置
    const fromX = this.lastTargetPos?.x ?? this.canvas.width / 2;
    const fromY = this.lastTargetPos?.y ?? this.canvas.height / 2;

    // 计算距离范围
    const minDist = Math.min(this.canvas.width, this.canvas.height) * distanceConfig.min;
    const maxDist = Math.min(this.canvas.width, this.canvas.height) * distanceConfig.max;
    const distance = minDist + Math.random() * (maxDist - minDist);

    // 随机角度
    const angle = Math.random() * Math.PI * 2;

    // 计算新位置
    let newX = fromX + Math.cos(angle) * distance;
    let newY = fromY + Math.sin(angle) * distance;

    // 边界限制
    const margin = radius + 30;
    newX = Math.max(margin, Math.min(this.canvas.width - margin, newX));
    newY = Math.max(margin, Math.min(this.canvas.height - margin, newY));

    this.currentTarget = {
      id: crypto.randomUUID(),
      x: newX,
      y: newY,
      radius,
      createdAt: performance.now(),
      isHit: false,
    };

    this.totalTargets++;
  }

  onMouseMove(movementX: number, movementY: number) {
    this.mouseX += movementX * this.sensitivityFactor;
    this.mouseY += movementY * this.sensitivityFactor;

    this.mouseX = Math.max(0, Math.min(this.canvas.width, this.mouseX));
    this.mouseY = Math.max(0, Math.min(this.canvas.height, this.mouseY));
  }

  onClick(): boolean {
    if (this.gameState !== 'playing' || !this.currentTarget) return false;

    const distance = Math.sqrt(
      (this.mouseX - this.currentTarget.x) ** 2 +
      (this.mouseY - this.currentTarget.y) ** 2
    );

    if (distance <= this.currentTarget.radius) {
      // 命中
      const reactionTime = performance.now() - this.currentTarget.createdAt;

      // 计算甩枪距离
      const flickDistance = this.lastTargetPos
        ? Math.sqrt(
            (this.currentTarget.x - this.lastTargetPos.x) ** 2 +
            (this.currentTarget.y - this.lastTargetPos.y) ** 2
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
      this.lastTargetPos = { x: this.currentTarget.x, y: this.currentTarget.y };
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
    this.stop();
    this.currentTarget = null;
  }
}
