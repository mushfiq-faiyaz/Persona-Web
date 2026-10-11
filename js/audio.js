/**
 * Procedural Web Audio Engine
 * Lightweight, zero-dependency sound design using the native Web Audio API.
 * SOUND IS STRICTLY OFF BY DEFAULT as required.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    // Sound is OFF by default unless user previously explicitly turned it ON
    this.enabled = localStorage.getItem('ranfie_sound_enabled') === 'true';
    this.masterGain = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.08; // very soft and gentle
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.init();
    this.enabled = !this.enabled;
    localStorage.setItem('ranfie_sound_enabled', this.enabled ? 'true' : 'false');
    if (this.enabled) {
      this.playChime(660, 0.08, 'sine');
    }
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  // Soft organic hover sound
  hover() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.04); // G5

      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch (e) {
      // AudioContext policy
    }
  }

  // Soft organic click sound
  click() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.045);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }

  // Theme switch harmonic chime
  themeSwitch() {
    if (!this.enabled || !this.ctx) return;
    this.playChime(523.25, 0.12, 'sine'); // C5
    setTimeout(() => {
      if (this.enabled && this.ctx) this.playChime(659.25, 0.15, 'sine'); // E5
    }, 70);
  }

  // Easter egg fanfare
  celebrate() {
    if (!this.enabled || !this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 0.18, 'sine');
      }, idx * 80);
    });
  }

  playChime(freq, duration, type = 'sine') {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {}
  }
}

// Global singleton instance
window.soundApp = new SoundEngine();
