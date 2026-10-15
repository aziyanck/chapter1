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
