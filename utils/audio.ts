/**
 * Sci-Fi Web Audio Synthesizer
 * Generates low-volume, zero-latency futuristic UI audio effects
 * using Web Audio API without relying on external assets.
 */

class SciFiAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private lastPlayTime: number = 0;
  private minIntervalMs: number = 40; // Throttle to prevent sound overlap

  constructor() {
    // Read initial muted state from localStorage if available
    try {
      const stored = localStorage.getItem('arwes_audio_muted');
      this.isMuted = stored === 'true';
    } catch {
      this.isMuted = false;
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    try {
      localStorage.setItem('arwes_audio_muted', String(muted));
    } catch {
      // Ignore localStorage errors in sandboxes
    }
  }

  public toggleMute(): boolean {
    const nextState = !this.isMuted;
    this.setMuted(nextState);
    if (!nextState) {
      // Play a subtle activation chime when unmuting
      this.playChime(true);
    }
    return nextState;
  }

  /**
   * Sci-Fi Hover Blip
   * Low-volume, ultra-short frequency-modulated sine/triangle chirp
   */
  public playHover(type: 'subtle' | 'chirp' | 'nav' | 'action' = 'subtle'): void {
    if (this.isMuted) return;

    const nowMs = performance.now();
    if (nowMs - this.lastPlayTime < this.minIntervalMs) return;
    this.lastPlayTime = nowMs;

    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.Q.setValueAtTime(3.5, t);

      if (type === 'action') {
        // Dual-tone high-tech button hover
        osc.type = 'sine';
        osc.frequency.setValueAtTime(950, t);
        osc.frequency.exponentialRampToValueAtTime(1800, t + 0.035);

        filter.frequency.setValueAtTime(1400, t);
        filter.frequency.exponentialRampToValueAtTime(2400, t + 0.035);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.035, t + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.045);
      } else if (type === 'nav') {
        // Crisp navigational ping
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1100, t);
        osc.frequency.exponentialRampToValueAtTime(1550, t + 0.03);

        filter.frequency.setValueAtTime(1800, t);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.025, t + 0.004);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.04);
      } else {
        // Standard subtle UI blip
        osc.type = 'sine';
        osc.frequency.setValueAtTime(780, t);
        osc.frequency.exponentialRampToValueAtTime(1320, t + 0.025);

        filter.frequency.setValueAtTime(1200, t);

        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.028, t + 0.003);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + 0.035);
      }
    } catch {
      // Ignore audio synthesis errors gracefully
    }
  }

  /**
   * Sci-Fi Click / Confirm Sound
   */
  public playClick(): void {
    if (this.isMuted) return;

    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1600, t);
      osc.frequency.exponentialRampToValueAtTime(400, t + 0.05);

      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.045, t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.055);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.06);
    } catch {
      // Graceful fallback
    }
  }

  /**
   * Sci-Fi State Toggle Chime (Power-up / Power-down)
   */
  public playChime(powerUp: boolean = true): void {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const frequencies = powerUp ? [587.33, 880, 1174.66] : [1174.66, 880, 440];

      frequencies.forEach((freq, idx) => {
        const noteStart = t + idx * 0.04;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.0001, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.03, noteStart + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.06);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.07);
      });
    } catch {
      // Graceful fallback
    }
  }
}

export const soundEngine = new SciFiAudioEngine();
