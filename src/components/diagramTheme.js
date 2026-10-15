// Shared colours and geometry for the static slide diagrams.

export const C = {
  ground: '#16a34a',
  sky: '#c026d3',
  los: '#0284c7',
  blocked: '#dc2626',
  earth: '#65a30d',
  iono: '#c026d3'
};

export const F = {
  signal: '#0284c7',
  pathLoss: '#64748b',
  shadow: '#f59e0b',
  reflect: '#f59e0b',
  scatter: '#c026d3',
  good: '#16a34a',
  bad: '#dc2626',
  band: '#38bdf8'
};

// Topics 6–8: modulation and conversion diagrams
export const M = {
  data: '#16a34a',
  message: '#c026d3',
  carrier: '#64748b',
  ask: '#0284c7',
  fsk: '#f59e0b',
  psk: '#dc2626',
  qpsk: '#7c3aed',
  sample: '#0284c7',
  error: '#dc2626',
  block: '#94a3b8',
  arrow: '#475569'
};

// Earth surface as a quadratic arc: y(x) for M0,y0 Q300,y0-2*bulge 600,y0
export const surface = (x, y0, bulge) => {
  const t = x / 600;
  return y0 - 4 * bulge * t * (1 - t);
};

// Closed path of a radiation pattern r(φ), φ measured anticlockwise from +x, centred on the origin.
export function polar(r, steps = 180) {
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const a = (2 * Math.PI * i) / steps;
    const rr = r(a);
    d += `${i ? ' L' : 'M'} ${(rr * Math.cos(a)).toFixed(1)},${(-rr * Math.sin(a)).toFixed(1)}`;
  }
  return `${d} Z`;
}

// Wavefront arc of radius r facing +x, spanning ±spread degrees, centred on the origin.
export function arc(r, spread) {
  const a = (spread * Math.PI) / 180;
  const x = (r * Math.cos(a)).toFixed(1), y = (r * Math.sin(a)).toFixed(1);
  return `M ${x},${-y} A ${r} ${r} 0 0 1 ${x},${y}`;
}

// Radiation patterns, r(φ) with φ from +x
const lobe = (n, R, back = 0) => (a) => {
  const c = Math.cos(a);
  return c > 0 ? R * c ** n : back * R * c * c;
};
export const omniPattern = (R) => polar((a) => R * Math.abs(Math.cos(a)));
export const directionalPattern = (n, R, back = 0) => polar(lobe(n, R, back));
// half-power beamwidth of a cosⁿ lobe, in degrees
export const hpbw = (n) => (2 * Math.acos(0.5 ** (1 / n)) * 180) / Math.PI;

// SMIL keyTimes / values list
export const kt = (...ts) => ts.map((t) => t.toFixed(3)).join(';');
