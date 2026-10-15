import React from 'react';
import { C, surface } from './diagramTheme';
import { strokeCls, Tower, Arrow, Earth, Pulse } from './diagramParts';

// Looping animated diagrams for Topic 3: Propagation Modes (SVG SMIL; SlideDiagram pauses them for reduced-motion users).

export function GroundWave() {
  const y0 = 235, b = 45;
  const tx = 70, rx = 540;
  // the wave is redrawn at shifting phases so its crests travel away from Tx while shrinking with distance
  const wave = (phase) => {
    let d = '';
    for (let x = tx + 8; x <= rx - 12; x += 2) {
      const amp = 12 * Math.exp(-(x - tx) / 260);
      const y = surface(x, y0, b) - 18 + amp * Math.sin((x - tx) / 9 - phase);
      d += `${d ? ' L' : 'M'} ${x},${y.toFixed(1)}`;
    }
    return d;
  };
  const frames = Array.from({ length: 13 }, (_, i) => wave((2 * Math.PI * i) / 12));
  return (
    <svg viewBox="0 0 600 270" className="w-full h-auto">
      <Earth y0={y0} bulge={b} label="Earth's surface (good ground conductivity helps)" />
      <Tower x={tx} base={surface(tx, y0, b)} h={50} color="#facc15" label="Tx" />
      <Tower x={rx} base={surface(rx, y0, b)} h={40} color={C.ground} label="Rx" />
      <path d={frames[0]} fill="none" stroke={C.ground} strokeWidth="3">
        <animate attributeName="d" values={frames.join(';')} dur="1.2s" repeatCount="indefinite" />
      </path>
      <text x="300" y="120" fontSize="12" textAnchor="middle" fontWeight="900">Wave follows Earth's curvature</text>
      <text x="300" y="138" fontSize="11" textAnchor="middle" fontWeight="700">(LF / MF) — amplitude falls with distance</text>
    </svg>
  );
}

export function SkyWave() {
  const y0 = 230, b = 15;
  const tx = 40, rx = 560;
  const top = (x) => surface(x, y0, b) - 40;
  return (
    <svg viewBox="0 0 600 270" className="w-full h-auto">
      <defs>
        <Arrow id="sk" color={C.sky} />
      </defs>
      <path d="M 0,60 Q 300,20 600,60" fill="none" stroke={C.iono} strokeOpacity="0.3" strokeWidth="26" />
      <text x="300" y="34" fontSize="12" textAnchor="middle" fontWeight="900">Ionosphere (charged particles)</text>
      <Earth y0={y0} bulge={b} />
      <Tower x={tx} base={surface(tx, y0, b)} h={40} color="#facc15" label="Tx" />
      <Tower x={rx} base={surface(rx, y0, b)} h={40} color={C.sky} label="Rx" />
      <path
        d={`M ${tx},${top(tx)} L 170,56 L 300,${surface(300, y0, b)} L 430,56 L ${rx - 4},${top(rx) + 3}`}
        fill="none"
        stroke={C.sky}
        strokeWidth="3.5"
        strokeLinejoin="round"
        markerEnd="url(#sk)"
      />
      <circle cx="300" cy={surface(300, y0, b)} r="4" fill={C.sky} />
      {['0s', '-2.25s'].map((begin) => (
        <Pulse
          key={begin}
          points={[{ x: tx, y: top(tx) }, { x: 170, y: 56 }, { x: 300, y: surface(300, y0, b) }, { x: 430, y: 56 }, { x: rx - 4, y: top(rx) + 3 }]}
          color={C.sky}
          cycle={4.5}
          speed={190}
          begin={begin}
        />
      ))}
      <text x="170" y="85" fontSize="11" textAnchor="middle" fontWeight="900">Hop 1</text>
      <text x="430" y="85" fontSize="11" textAnchor="middle" fontWeight="900">Hop 2</text>
      <text x="300" y={surface(300, y0, b) + 18} fontSize="11" textAnchor="middle" fontWeight="700">Earth reflects</text>
      <line x1={tx + 10} y1="250" x2="295" y2="250" className={strokeCls} strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="170" y="265" fontSize="11" textAnchor="middle" fontWeight="700">Skip distance (no signal here)</text>
      <line x1="305" y1="250" x2={rx - 10} y2="250" className={strokeCls} strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="430" y="265" fontSize="11" textAnchor="middle" fontWeight="700">Skip distance (no signal here)</text>
      {[170, 430].map((x) => (
        <text key={x} x={x} y={surface(x, y0, b) - 10} fontSize="11" textAnchor="middle" fontWeight="900" fill={C.blocked}>
          ✕ No signal
        </text>
      ))}
    </svg>
  );
}

export function LineOfSight() {
  const y0 = 235, b = 20;
  const tx = 80, rx = 330, rx2 = 545;
  const txTop = surface(tx, y0, b) - 85;
  const bx = 440, bBase = surface(bx + 20, y0, b);
  const hitY = txTop + ((surface(rx2, y0, b) - 45) - txTop) * ((bx - tx) / (rx2 - tx));
  return (
    <svg viewBox="0 0 600 270" className="w-full h-auto">
      <defs>
        <Arrow id="los" color={C.los} />
      </defs>
      <Earth y0={y0} bulge={b} label="Earth's curvature limits range" labelX={185} />
      <Tower x={tx} base={surface(tx, y0, b)} h={85} color="#facc15" label="Tx" />
      <Tower x={rx} base={surface(rx, y0, b)} h={95} color={C.los} label="Rx (clear path)" />
      <Tower x={rx2} base={surface(rx2, y0, b)} h={45} color={C.blocked} label="Rx (blocked)" />
      <rect x={bx} y={bBase - 75} width="40" height="75" fill="#94a3b8" fillOpacity="0.6" className={strokeCls} strokeWidth="2" />
      <text x={bx + 20} y={bBase - 82} fontSize="11" textAnchor="middle" fontWeight="900">Building</text>
      <line x1={tx} y1={txTop} x2={rx - 8} y2={surface(rx, y0, b) - 97} stroke={C.los} strokeWidth="3.5" markerEnd="url(#los)" />
      <line x1={tx} y1={txTop} x2={bx} y2={hitY} stroke={C.blocked} strokeWidth="3" strokeDasharray="6 4" />
      <text x={bx - 6} y={hitY + 5} fontSize="16" textAnchor="end" fontWeight="900" fill={C.blocked}>✕</text>
      {['0s', '-1.25s'].map((begin) => (
        <g key={begin}>
          <Pulse points={[{ x: tx, y: txTop }, { x: rx - 8, y: surface(rx, y0, b) - 97 }]} color={C.los} cycle={2.5} speed={140} begin={begin} />
          <Pulse points={[{ x: tx, y: txTop }, { x: bx, y: hitY }]} color={C.blocked} cycle={2.5} speed={140} begin={begin} />
        </g>
      ))}
      <text x="205" y="70" fontSize="12" textAnchor="middle" fontWeight="900">Direct path (VHF / UHF / microwave)</text>
    </svg>
  );
}
