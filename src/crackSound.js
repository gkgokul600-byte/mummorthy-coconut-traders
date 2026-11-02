// Coconut-breaking sound, synthesized with the Web Audio API (no audio files).
// Layers: a sharp shell crack, a hollow woody "thunk", a second split crack,
// and a short splash of coconut water.

let ctx = null;
let noiseBuf = null;
let muted = false;

try {
  muted = localStorage.getItem('coconut-sound') === 'off';
} catch {
  /* storage unavailable */
}

export function isMuted() {
  return muted;
}

export function setMuted(value) {
  muted = value;
  try {
    localStorage.setItem('coconut-sound', value ? 'off' : 'on');
  } catch {
    /* ignore */
  }
}

function getCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    const len = Math.floor(ctx.sampleRate * 0.6);
    noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

/** Call from inside a user gesture (tap/click) once so audio is allowed. */
export function unlockAudio() {
  getCtx();
}

function noiseBurst(ac, t, { type, freq, q = 1, attack = 0.002, decay, gain }) {
  const src = ac.createBufferSource();
  src.buffer = noiseBuf;
  src.playbackRate.value = 0.8 + Math.random() * 0.4;
  const f = ac.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  f.Q.value = q;
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  src.connect(f).connect(g).connect(ac.destination);
  src.start(t, Math.random() * 0.2);
  src.stop(t + attack + decay + 0.05);
}

function thunk(ac, t, gain) {
  const o = ac.createOscillator();
  o.type = 'triangle';
  const base = 150 + Math.random() * 50;
  o.frequency.setValueAtTime(base * 1.6, t);
  o.frequency.exponentialRampToValueAtTime(base * 0.55, t + 0.14);
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
  o.connect(g).connect(ac.destination);
  o.start(t);
  o.stop(t + 0.2);
}

/**
 * Play a coconut crack.
 * @param {number} strength 0.3 (light tap) to 1 (full break)
 */
export function playCrack(strength = 1) {
  if (muted) return;
  const ac = getCtx();
  if (!ac || ac.state !== 'running') return;
  const t = ac.currentTime + 0.005;
  const s = Math.max(0.2, Math.min(1, strength));

  // 1. sharp shell crack
  noiseBurst(ac, t, { type: 'highpass', freq: 1800, decay: 0.06, gain: 0.9 * s });
  // 2. hollow woody body
  thunk(ac, t, 0.7 * s);
  noiseBurst(ac, t, { type: 'bandpass', freq: 520, q: 5, decay: 0.12, gain: 0.6 * s });
  // 3. the shell splitting a moment later
  noiseBurst(ac, t + 0.045 + Math.random() * 0.02, { type: 'bandpass', freq: 2600, q: 1.5, decay: 0.05, gain: 0.5 * s });
  // 4. splash of coconut water (only on a full break)
  if (s > 0.6) {
    noiseBurst(ac, t + 0.06, { type: 'lowpass', freq: 1400, q: 0.7, attack: 0.02, decay: 0.28, gain: 0.18 * s });
  }
}
