// 游戏引擎核心

import { Target, GameState, TrainingConfig, TARGET_SIZES } from '@/types/game';

export interface EngineCallbacks {
  onTargetHit?: (target: Target, reactionTime: number) => void;
  onTargetMiss?: (target: Target) => void;
  onTargetExpire?: (target: Target) => void;
  onGameStateChange?: (state: GameState) => void;
  onTick?: (deltaTime: number) => void;
}

export class GameEngine {
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

  // 目标管理
  private targets: Target[] = [];
  private gridPositions: { x: number; y: number }[] = [];

  // 统计
  private score: number = 0;
  private hits: number = 0;
  private misses: number = 0;
  private totalTargets: number = 0;
  private reactionTimes: number[] = [];

  // 回调
  private callbacks: EngineCallbacks = {};

  constructor(canvas: HTMLCanvasElement, config: TrainingConfig) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.config = config;
    this.remainingTime = config.duration;
    this.initGridPositions();
  }

  private initGridPositions() {
    const { width, height } = this.canvas;
    const cols = 5;
    const rows = 3;
    const marginX = width * 0.15;
    const marginY = height * 0.2;
    const spacingX = (width - marginX * 2) / (cols - 1);
    const spacingY = (height - marginY * 2) / (rows - 1);

    this.gridPositions = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        this.gridPositions.push({
          x: marginX + c * spacingX,
          y: marginY + r * spacingY,
        });
      }
    }
  }

  setCallbacks(callbacks: EngineCallbacks) {
    this.callbacks = callbacks;
  }

  setSensitivity(factor: number) {
    this.sensitivityFactor = factor;
  }

  setCrosshair(color: string, size: number) {
    this.crosshairColor = color;
    this.crosshairSize = size;
  }

  // 启动游戏
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
    this.targets = [];
    this.remainingTime = this.config.duration;

    // 初始化鼠标位置到中心
    this.mouseX = this.canvas.width / 2;
    this.mouseY = this.canvas.height / 2;

    // 生成初始目标
    const targetCount = this.config.targetCount || 3;
    for (let i = 0; i < targetCount; i++) {
      this.spawnTarget();
    }

    this.callbacks.onGameStateChange?.('playing');
    this.gameLoop(performance.now());
  }

  // 暂停
  pause() {
    this.isRunning = false;
    this.gameState = 'paused';
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.callbacks.onGameStateChange?.('paused');
  }

  // 恢复
  resume() {
    if (this.gameState === 'paused') {
      this.isRunning = true;
      this.gameState = 'playing';
      this.lastTime = performance.now();
      this.callbacks.onGameStateChange?.('playing');
      this.gameLoop(performance.now());
    }
  }

  // 停止
  stop() {
    this.isRunning = false;
    this.gameState = 'finished';
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.callbacks.onGameStateChange?.('finished');
  }

  // 游戏循环
  private gameLoop(currentTime: number) {
    if (!this.isRunning) return;

    const deltaTime = (currentTime - this.lastTime) / 1000; // 转换为秒
    this.lastTime = currentTime;

    this.update(deltaTime);
    this.render();

    // 检查时间
    this.remainingTime -= deltaTime;
    if (this.remainingTime <= 0) {
      this.stop();
      return;
    }

    this.animationId = requestAnimationFrame(this.gameLoop.bind(this));
    this.callbacks.onTick?.(deltaTime);
  }

  // 更新逻辑
  private update(deltaTime: number) {
    const now = performance.now();
    const targetCount = this.config.targetCount || 3;

    // 检查过期目标
    this.targets = this.targets.filter(target => {
      const age = now - target.createdAt;
      if (age > 3000 && !target.isHit) {
        // 目标存在超过3秒未命中
        this.misses++;
        this.callbacks.onTargetExpire?.(target);
        return false;
      }
      return !target.isHit;
    });

    // 维持目标数量
    while (this.targets.length < targetCount) {
      const spawned = this.spawnTarget();
      if (!spawned) break; // 没有可用位置了
    }
  }

  // 渲染
  private render() {
    const { width, height } = this.canvas;
    const ctx = this.ctx;

    // 清屏
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, width, height);

    // 绘制目标
    this.targets.forEach(target => {
      this.drawTarget(target);
    });

    // 绘制准星
    this.drawCrosshair();

    // 绘制HUD
    this.drawHUD();
  }

  private drawTarget(target: Target) {
    const ctx = this.ctx;
    const { x, y, radius } = target;

    // 外圈
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#ef4444';
    ctx.fill();

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

    // 上
    ctx.beginPath();
    ctx.moveTo(x, y - gap);
    ctx.lineTo(x, y - gap - size);
    ctx.stroke();

    // 下
    ctx.beginPath();
    ctx.moveTo(x, y + gap);
    ctx.lineTo(x, y + gap + size);
    ctx.stroke();

    // 左
    ctx.beginPath();
    ctx.moveTo(x - gap, y);
    ctx.lineTo(x - gap - size, y);
    ctx.stroke();

    // 右
    ctx.beginPath();
    ctx.moveTo(x + gap, y);
    ctx.lineTo(x + gap + size, y);
    ctx.stroke();
  }

  private drawHUD() {
    const ctx = this.ctx;
    const accuracy = this.totalTargets > 0 ? (this.hits / this.totalTargets) * 100 : 0;

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Inter, system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`分数: ${this.score}`, 20, 40);

    ctx.textAlign = 'center';
    ctx.fillText(`${Math.ceil(this.remainingTime)}s`, this.canvas.width / 2, 40);

    ctx.textAlign = 'right';
    ctx.fillText(`准确率: ${accuracy.toFixed(1)}%`, this.canvas.width - 20, 40);
  }

  // 生成新目标
  spawnTarget(): Target | null {
    const radius = TARGET_SIZES[this.config.targetSize];

    // 找到未被占用的位置
    const usedPositions = new Set(this.targets.map(t => `${t.x},${t.y}`));
    const availablePositions = this.gridPositions.filter(
      pos => !usedPositions.has(`${pos.x},${pos.y}`)
    );

    if (availablePositions.length === 0) return null;

    const pos = availablePositions[Math.floor(Math.random() * availablePositions.length)];

    const target: Target = {
      id: crypto.randomUUID(),
      x: pos.x,
      y: pos.y,
      radius,
      createdAt: performance.now(),
      isHit: false,
    };

    this.targets.push(target);
    this.totalTargets++;
    return target;
  }

  // 处理鼠标移动
  onMouseMove(movementX: number, movementY: number) {
    // 忽略异常大的移动值（可能是浏览器bug或窗口切换）
    if (Math.abs(movementX) > 200 || Math.abs(movementY) > 200) {
      return;
    }

    this.mouseX += movementX * this.sensitivityFactor;
    this.mouseY += movementY * this.sensitivityFactor;

    // 边界限制（留一点边距）
    const margin = 5;
    this.mouseX = Math.max(margin, Math.min(this.canvas.width - margin, this.mouseX));
    this.mouseY = Math.max(margin, Math.min(this.canvas.height - margin, this.mouseY));
  }

  // 处理点击
  onClick(): boolean {
    if (this.gameState !== 'playing') return false;

    const hitTarget = this.checkHit(this.mouseX, this.mouseY);
    if (hitTarget) {
      const reactionTime = performance.now() - hitTarget.createdAt;
      hitTarget.isHit = true;
      this.score++;
      this.hits++;
      this.reactionTimes.push(reactionTime);
      this.callbacks.onTargetHit?.(hitTarget, reactionTime);
      // 目标数量由 update() 维护，不在这里生成
      return true;
    }
    return false;
  }

  // 检查命中
  private checkHit(x: number, y: number): Target | null {
    for (const target of this.targets) {
      if (target.isHit) continue;
      const distance = Math.sqrt((x - target.x) ** 2 + (y - target.y) ** 2);
      if (distance <= target.radius) {
        return target;
      }
    }
    return null;
  }

  // 获取结果
  getResults() {
    const avgReactionTime =
      this.reactionTimes.length > 0
        ? this.reactionTimes.reduce((a, b) => a + b, 0) / this.reactionTimes.length
        : 0;
    const bestReactionTime =
      this.reactionTimes.length > 0 ? Math.min(...this.reactionTimes) : 0;

    return {
      score: this.score,
      accuracy: this.totalTargets > 0 ? (this.hits / this.totalTargets) * 100 : 0,
      avgReactionTime: Math.round(avgReactionTime),
      bestReactionTime: Math.round(bestReactionTime),
      totalTargets: this.totalTargets,
      hits: this.hits,
      misses: this.misses,
    };
  }

  // 获取当前状态
  getState() {
    return {
      gameState: this.gameState,
      remainingTime: this.remainingTime,
      score: this.score,
      accuracy: this.totalTargets > 0 ? (this.hits / this.totalTargets) * 100 : 0,
    };
  }

  // 销毁
  destroy() {
    this.stop();
    this.targets = [];
  }
}
