import { EventBus } from '../core/EventBus.js';

// Âm thanh giả lập bằng Web Audio API thuần túy (Không cần tải file bên ngoài, chạy tức thì)
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.initEvents();
  }

  getAudioContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1) {
    if (!this.enabled) return;
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio context bị chặn bởi trình duyệt trước khi người dùng click
    }
  }

  initEvents() {
    // Bước chân nhẹ
    EventBus.on('PLAYER_MOVED', () => {
      this.playTone(180, 'triangle', 0.05, 0.03);
    });

    // Thu hoạch mùa màng (Âm thanh vui tai)
    EventBus.on('SFX_HARVEST', () => {
      this.playTone(523.25, 'sine', 0.1, 0.12); // C5
      setTimeout(() => this.playTone(659.25, 'sine', 0.15, 0.12), 80); // E5
      setTimeout(() => this.playTone(783.99, 'sine', 0.2, 0.15), 160); // G5
    });

    // Tiếng cày đất / Gieo hạt
    EventBus.on('SFX_PLANT', () => {
      this.playTone(220, 'sine', 0.1, 0.08);
      setTimeout(() => this.playTone(330, 'sine', 0.12, 0.08), 70);
    });

    // Tiếng tưới nước
    EventBus.on('SFX_WATER', () => {
      this.playTone(440, 'triangle', 0.1, 0.06);
      setTimeout(() => this.playTone(587.33, 'triangle', 0.12, 0.06), 90);
    });

    // Tiếng đốn củi
    EventBus.on('SFX_WOOD', () => {
      this.playTone(140, 'sawtooth', 0.08, 0.1);
    });

    // Tiếng tiền xu keng keng
    EventBus.on('SFX_COIN', () => {
      this.playTone(987.77, 'sine', 0.08, 0.12);
      setTimeout(() => this.playTone(1318.51, 'sine', 0.15, 0.15), 60);
    });
  }
}

export const soundEngine = new SoundEngine();
