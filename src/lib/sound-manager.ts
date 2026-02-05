// 声音管理器 - 使用 Web Audio API 合成枪声音效

export type SoundType = 'hit' | 'miss' | 'countdown' | 'start' | 'finish';

export type SoundPreset = 'pistol' | 'rifle' | 'smg' | 'shotgun';

class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;
  private volume: number = 0.5;
  private preset: SoundPreset = 'pistol';

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      } catch {
        console.warn('Web Audio API not supported');
        return null;
      }
    }

    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }

    return this.audioContext;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  setPreset(preset: SoundPreset) {
    this.preset = preset;
  }

  play(soundType: SoundType) {
    if (!this.enabled) return;

    const ctx = this.getContext();
    if (!ctx) return;

    switch (soundType) {
      case 'hit':
        this.playGunshot(ctx);
        break;
      case 'miss':
        this.playMiss(ctx);
        break;
      case 'countdown':
        this.playBeep(ctx);
        break;
      case 'start':
        this.playStart(ctx);
        break;
      case 'finish':
        this.playFinish(ctx);
        break;
    }
  }

  // 枪声合成 - 根据不同枪械类型
  private playGunshot(ctx: AudioContext) {
    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
    masterGain.gain.value = this.volume * 0.8;

    switch (this.preset) {
      case 'pistol':
        this.createPistolSound(ctx, now, masterGain);
        break;
      case 'rifle':
        this.createRifleSound(ctx, now, masterGain);
        break;
      case 'smg':
        this.createSMGSound(ctx, now, masterGain);
        break;
      case 'shotgun':
        this.createShotgunSound(ctx, now, masterGain);
        break;
    }
  }

  // 手枪 - 短促清脆
  private createPistolSound(ctx: AudioContext, now: number, masterGain: GainNode) {
    // 噪音层 - 枪声的主要成分
    const noiseBuffer = this.createNoiseBuffer(ctx, 0.15);
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 1000;
    noiseFilter.Q.value = 0.5;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(1, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);

    // 低频冲击
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.05);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.8, now);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

    osc.connect(oscGain);
    oscGain.connect(masterGain);

    noise.start(now);
    noise.stop(now + 0.15);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  // 步枪 - 更重更响
  private createRifleSound(ctx: AudioContext, now: number, masterGain: GainNode) {
    // 噪音层
    const noiseBuffer = this.createNoiseBuffer(ctx, 0.2);
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 2000;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(1.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);

    // 低频冲击 - 更强
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.08);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(1, now);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(oscGain);
    oscGain.connect(masterGain);

    // 高频成分
    const highOsc = ctx.createOscillator();
    highOsc.type = 'sawtooth';
    highOsc.frequency.value = 800;

    const highGain = ctx.createGain();
    highGain.gain.setValueAtTime(0.3, now);
    highGain.gain.exponentialRampToValueAtTime(0.01, now + 0.03);

    highOsc.connect(highGain);
    highGain.connect(masterGain);

    noise.start(now);
    noise.stop(now + 0.2);
    osc.start(now);
    osc.stop(now + 0.15);
    highOsc.start(now);
    highOsc.stop(now + 0.05);
  }

  // SMG/冲锋枪 - 快速轻脆
  private createSMGSound(ctx: AudioContext, now: number, masterGain: GainNode) {
    const noiseBuffer = this.createNoiseBuffer(ctx, 0.1);
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 500;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.9, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);

    // 快速低频
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.03);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.6, now);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.04);

    osc.connect(oscGain);
    oscGain.connect(masterGain);

    noise.start(now);
    noise.stop(now + 0.1);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  // 霰弹枪 - 低沉有力
  private createShotgunSound(ctx: AudioContext, now: number, masterGain: GainNode) {
    // 大量噪音
    const noiseBuffer = this.createNoiseBuffer(ctx, 0.3);
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 1500;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(1.5, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.3, now + 0.1);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);

    // 重低频
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(20, now + 0.15);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(1.2, now);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(oscGain);
    oscGain.connect(masterGain);

    // 散射效果 - 多个短促噪音
    for (let i = 0; i < 3; i++) {
      const scatterNoise = ctx.createBufferSource();
      scatterNoise.buffer = this.createNoiseBuffer(ctx, 0.05);

      const scatterGain = ctx.createGain();
      scatterGain.gain.setValueAtTime(0.3, now + i * 0.01);
      scatterGain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.01 + 0.04);

      scatterNoise.connect(scatterGain);
      scatterGain.connect(masterGain);
      scatterNoise.start(now + i * 0.01);
      scatterNoise.stop(now + i * 0.01 + 0.05);
    }

    noise.start(now);
    noise.stop(now + 0.3);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  // 创建白噪音缓冲
  private createNoiseBuffer(ctx: AudioContext, duration: number): AudioBuffer {
    const sampleRate = ctx.sampleRate;
    const bufferSize = sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    return buffer;
  }

  // 未击中音效 - 空枪/弹壳声
  private playMiss(ctx: AudioContext) {
    const now = ctx.currentTime;
    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    gain.gain.value = this.volume * 0.4;

    // 金属碰撞声
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2000, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.5, now);
    oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    osc.connect(oscGain);
    oscGain.connect(gain);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // 倒计时蜂鸣
  private playBeep(ctx: AudioContext) {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 880;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(this.volume * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // 开始音效
  private playStart(ctx: AudioContext) {
    const now = ctx.currentTime;

    // 上升音调
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.linearRampToValueAtTime(880, now + 0.15);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(this.volume * 0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  // 结束音效
  private playFinish(ctx: AudioContext) {
    const now = ctx.currentTime;

    // 双音
    [660, 880].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(this.volume * 0.3, now + i * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.15 + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.15);
      osc.stop(now + i * 0.15 + 0.25);
    });
  }

  // 预览音效
  previewPreset(preset: SoundPreset) {
    const originalPreset = this.preset;
    this.preset = preset;
    this.play('hit');
    this.preset = originalPreset;
  }
}

export const soundManager = new SoundManager();
