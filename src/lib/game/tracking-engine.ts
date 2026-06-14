// Tracking训练引擎 - 追踪移动目标

import { Target, GameState, TrainingConfig, TARGET_SIZES, SPEED_VALUES } from '@/types/game';
import {
  AngularCamera,
  getAngularTargetRadius,
  isTargetCentered,
  projectTarget,
  rotateCamera,
} from './angular-aim';

export interface TrackingCallbacks {
  onTrackingUpdate?: (trackingTime: number, totalTime: number) => void;
  onGameStateChange?: (state: GameState) => void;
  onTick?: (deltaTime: number) => void;
  // 以下为保持与其他引擎回调接口一致的可选回调
  onTargetHit?: (target: Target, reactionTime: number) => void;
  onTargetMiss?: () => void;
  onTargetExpire?: (target: Target) => void;
}

export class TrackingEngine {
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
  private isMouseDown: boolean = false;

  // 准星设置
  private crosshairColor: string = '#ffffff';
  private crosshairSize: number = 10;

  // 目标
  private target: Target | null = null;

  // 统计
  private trackingTime: number = 0; // 追踪时间(ms)
  private totalActiveTime: number = 0; // 总激活时间
  private lastTrackingState: boolean = false;

  // 回调
  private callbacks: TrackingCallbacks = {};

  constructor(canvas: HTMLCanvasElement, config: TrainingConfig) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.config = config;
    this.remainingTime = config.duration;
  }

  setCallbacks(callbacks: TrackingCallbacks) {
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
    this.trackingTime = 0;
    this.totalActiveTime = 0;
    this.remainingTime = this.config.duration;

    this.camera = { yaw: 0, pitch: 0 };

    // 生成目标
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

  private update(deltaTime: number) {
    if (!this.target) return;

    // 更新目标位置
    this.updateTargetPosition(deltaTime);

    // 检查追踪状态
    if (this.isMouseDown) {
      this.totalActiveTime += deltaTime * 1000;
      const isTracking = this.isOnTarget();
      if (isTracking) {
        this.trackingTime += deltaTime * 1000;
      }
      this.lastTrackingState = isTracking;
      this.callbacks.onTrackingUpdate?.(this.trackingTime, this.totalActiveTime);
    }
  }

  private updateTargetPosition(deltaTime: number) {
    if (!this.target) return;

    const speed = SPEED_VALUES[this.config.speed || 'medium'] * 1.4;
    const pattern = this.config.movePattern || 'strafe';

    switch (pattern) {
      case 'linear':
        this.moveLinear(deltaTime, speed);
        break;
      case 'curve':
        this.moveCurve(deltaTime, speed);
        break;
      case 'random':
        this.moveRandom(deltaTime, speed);
        break;
      case 'strafe':
      default:
        this.moveStrafe(deltaTime, speed);
        break;
    }

    // 边界碰撞
    this.handleBoundaryCollision();
  }

  private moveLinear(deltaTime: number, speed: number) {
    if (!this.target) return;
    this.target.yaw = (this.target.yaw ?? 0) + (this.target.velocityX || speed) * deltaTime;
    this.target.pitch = (this.target.pitch ?? 0) + (this.target.velocityY || 0) * deltaTime;
  }

  private moveStrafe(deltaTime: number, speed: number) {
    if (!this.target) return;
    // 左右移动，模拟玩家闪避
    this.target.yaw = (this.target.yaw ?? 0) + (this.target.velocityX || speed) * deltaTime;
  }

  private moveCurve(deltaTime: number, speed: number) {
    if (!this.target) return;
    // 曲线移动
    const time = performance.now() / 1000;
    this.target.yaw = this.camera.yaw + Math.cos(time * (speed / 4)) * 10;
    this.target.pitch = this.camera.pitch + Math.sin(time * (speed / 3)) * 5;
  }

  private moveRandom(deltaTime: number, speed: number) {
    if (!this.target) return;
    // 随机改变方向
    if (Math.random() < 0.02) {
      this.target.velocityX = (Math.random() - 0.5) * speed * 2;
      this.target.velocityY = (Math.random() - 0.5) * speed;
    }
    this.target.yaw = (this.target.yaw ?? 0) + (this.target.velocityX || 0) * deltaTime;
    this.target.pitch = (this.target.pitch ?? 0) + (this.target.velocityY || 0) * deltaTime;
  }

  private handleBoundaryCollision() {
    if (!this.target) return;
    const yaw = this.target.yaw ?? 0;
    const pitch = this.target.pitch ?? 0;

    if (Math.abs(yaw - this.camera.yaw) > 22) {
      this.target.velocityX = -(this.target.velocityX || 0);
      this.target.yaw = this.camera.yaw + Math.sign(yaw - this.camera.yaw) * 22;
    }
    if (Math.abs(pitch - this.camera.pitch) > 12) {
      this.target.velocityY = -(this.target.velocityY || 0);
      this.target.pitch = this.camera.pitch + Math.sign(pitch - this.camera.pitch) * 12;
    }
  }

  private render() {
    const { width, height } = this.canvas;
    const ctx = this.ctx;

    // 清屏
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, width, height);

    // 绘制目标
    if (this.target) {
      this.drawTarget();
    }

    // 绘制准星
    this.drawCrosshair();

    // 绘制HUD
    this.drawHUD();
  }

  private drawTarget() {
    if (!this.target) return;
    const ctx = this.ctx;
    const projected = projectTarget(this.canvas, this.camera, this.target);
    if (!projected.visible) return;
    const { x, y, radius } = projected;
    const isTracking = this.isOnTarget() && this.isMouseDown;

    // 外圈
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = isTracking ? '#22c55e' : '#3b82f6';
    ctx.fill();

    // 内圈
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = isTracking ? '#16a34a' : '#2563eb';
    ctx.fill();
  }

  private drawCrosshair() {
    const ctx = this.ctx;
    const x = this.canvas.width / 2;
    const y = this.canvas.height / 2;
    const size = this.crosshairSize;
    const gap = Math.max(2, this.crosshairSize * 0.3);

    // 追踪时显示红色，否则使用自定义颜色
    ctx.strokeStyle = this.isMouseDown ? '#ef4444' : this.crosshairColor;
    ctx.lineWidth = 2;

    // 上下左右
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
    const accuracy = this.totalActiveTime > 0
      ? (this.trackingTime / this.totalActiveTime) * 100
      : 0;

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Inter, system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`追踪: ${(this.trackingTime / 1000).toFixed(1)}s`, 20, 40);

    ctx.textAlign = 'center';
    ctx.fillText(`${Math.ceil(this.remainingTime)}s`, this.canvas.width / 2, 40);

    ctx.textAlign = 'right';
    ctx.fillText(`准确率: ${accuracy.toFixed(1)}%`, this.canvas.width - 20, 40);

    // 提示
    if (!this.isMouseDown) {
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.font = '16px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('按住鼠标左键追踪目标', this.canvas.width / 2, this.canvas.height - 30);
    }
  }

  private spawnTarget() {
    const radius = TARGET_SIZES[this.config.targetSize];
    const speed = SPEED_VALUES[this.config.speed || 'medium'] * 1.4;

    this.target = {
      id: crypto.randomUUID(),
      x: 0,
      y: 0,
      radius,
      createdAt: performance.now(),
      isHit: false,
      velocityX: (Math.random() > 0.5 ? 1 : -1) * speed,
      velocityY: 0,
      yaw: this.camera.yaw + (Math.random() > 0.5 ? 8 : -8),
      pitch: this.camera.pitch,
      angularRadius: getAngularTargetRadius(this.config.targetSize) * 1.15,
    };
  }

  private isOnTarget(): boolean {
    if (!this.target) return false;
    return isTargetCentered(this.target, this.camera);
  }

  onMouseMove(movementX: number, movementY: number) {
    this.camera = rotateCamera(this.camera, movementX, movementY, this.sensitivityFactor);
  }

  onMouseDown() {
    this.isMouseDown = true;
  }

  onMouseUp() {
    this.isMouseDown = false;
  }

  getResults() {
    const accuracy = this.totalActiveTime > 0
      ? (this.trackingTime / this.totalActiveTime) * 100
      : 0;

    return {
      score: Math.round(this.trackingTime / 100), // 每100ms得1分
      accuracy,
      avgReactionTime: 0, // Tracking模式不计算反应时间
      bestReactionTime: 0,
      totalTargets: 1,
      hits: Math.round(this.trackingTime / 1000),
      misses: Math.round((this.totalActiveTime - this.trackingTime) / 1000),
      trackingTime: this.trackingTime,
      totalActiveTime: this.totalActiveTime,
    };
  }

  getState() {
    return {
      gameState: this.gameState,
      remainingTime: this.remainingTime,
      trackingTime: this.trackingTime,
      accuracy: this.totalActiveTime > 0
        ? (this.trackingTime / this.totalActiveTime) * 100
        : 0,
    };
  }

  destroy() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.target = null;
  }
}
