// Shared helpers for drawing waveforms as SVG paths.

// Samples f(t), t in [0, 1], into an SVG path spanning x0..x0+w around yMid
export function trace(f, yMid, scale, x0, w, steps = 900) {
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    d += `${i ? ' L' : 'M'} ${(x0 + t * w).toFixed(1)},${(yMid - scale * f(t)).toFixed(1)}`;
  }
  return d;
}
