import React from 'react';
import { C, F } from './diagramTheme';
import { strokeCls, Tower, Arrow, Scroll } from './diagramParts';

// Looping animated diagrams for Topic 4: Fading in the Mobile Environment.
// Animations use SVG SMIL so they run without JS; SlideDiagram pauses them for reduced-motion users.

// ---------- Shared pieces ----------

function Phone({ x, y, label, color = C.los }) {
  return (
    <g>
      <rect x={x - 8} y={y - 15} width="16" height="28" rx="3" fill={color} fillOpacity="0.35" className={strokeCls} strokeWidth="2" />
      <line x1={x - 3} y1={y + 9} x2={x + 3} y2={y + 9} className={strokeCls} strokeWidth="1.5" />
      {label && (
        <text x={x} y={y + 30} fontSize="11" textAnchor="middle" fontWeight="900">{label}</text>
      )}
    </g>
  );
}

function Bars({ x, y, level }) {
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={x + i * 7}
          y={y - (i + 1) * 5}
          width="5"
          height={(i + 1) * 5}
          fill={i < level ? (level <= 1 ? F.bad : level === 2 ? F.shadow : F.good) : 'none'}
          className={strokeCls}
          strokeWidth="1"
        />
      ))}
    </g>
  );
}

function Building({ x, y, w, h, label }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#94a3b8" fillOpacity="0.6" className={strokeCls} strokeWidth="2" />
      {label && (
        <text x={x + w / 2} y={y - 6} fontSize="11" textAnchor="middle" fontWeight="900">{label}</text>
      )}
    </g>
  );
}

function Ground({ y }) {
  return (
    <g>
      <rect x="0" y={y} width="600" height={270 - y} fill={C.earth} fillOpacity="0.3" />
      <line x1="0" y1={y} x2="600" y2={y} className={strokeCls} strokeWidth="2.5" />
    </g>
  );
}

function Axes({ x0, y0, w, h, xLabel, yLabel }) {
  return (
    <g>
      <line x1={x0} y1={y0} x2={x0 + w} y2={y0} className={strokeCls} strokeWidth="2" />
      <line x1={x0} y1={y0} x2={x0} y2={y0 - h} className={strokeCls} strokeWidth="2" />
      <text x={x0 + w} y={y0 + 18} fontSize="11" textAnchor="end" fontWeight="700">{xLabel}</text>
      <text x={x0 - 10} y={y0 - h / 2} fontSize="11" textAnchor="middle" fontWeight="700" transform={`rotate(-90 ${x0 - 10} ${y0 - h / 2})`}>
        {yLabel}
      </text>
    </g>
  );
}

// Received power model for the plots: path loss + shadowing + multipath (values roughly 0.15–1.1)
const pathLoss = (t) => 1 - 0.55 * t;
const shadowing = (t) => pathLoss(t) + 0.12 * Math.sin(2 * Math.PI * t * 2.2 + 0.5);
const multipath = (t) => shadowing(t) + 0.07 * Math.sin(2 * Math.PI * t * 23) + 0.05 * Math.sin(2 * Math.PI * t * 41 + 1);

function plotPath(fn, x0, y0, w, h, steps = 300) {
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const v = fn(t);
    const y = y0 - ((v - 0.15) / 0.95) * h;
    d += `${i ? ' L' : 'M'} ${(x0 + t * w).toFixed(1)},${Math.min(y0, Math.max(y0 - h, y)).toFixed(1)}`;
  }
  return d;
}

function lowestPoint(fn, from, to, x0, y0, w, h) {
  let best = from;
  for (let t = from; t <= to; t += 0.001) {
    if (fn(t) < fn(best)) best = t;
  }
  return { x: x0 + best * w, y: y0 - ((fn(best) - 0.15) / 0.95) * h };
}

// ---------- Animation helpers ----------

const polyD = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'} ${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
const polyLen = (pts) => pts.slice(1).reduce((sum, p, i) => sum + Math.hypot(p.x - pts[i].x, p.y - pts[i].y), 0);

// A dot that travels a polyline at a fixed speed once per cycle, then vanishes until the next cycle.
// With a shared cycle and speed, longer paths visibly arrive later.
function Pulse({ points, color, cycle, speed = 160, begin = '0s', r = 5 }) {
  const f = Math.min(0.95, polyLen(points) / speed / cycle).toFixed(3);
  const loop = { dur: `${cycle}s`, begin, repeatCount: 'indefinite' };
  return (
    <circle r={r} fill={color} className={strokeCls} strokeWidth="1.5" opacity="0">
      <animateMotion path={polyD(points)} keyPoints="0;1;1" keyTimes={`0;${f};1`} calcMode="linear" {...loop} />
      <animate attributeName="opacity" values="1;1;0;0" keyTimes={`0;${f};${Math.min(+f + 0.03, 0.99).toFixed(3)};1`} {...loop} />
    </circle>
  );
}

// Wipes children in from left to right between fractions `start` and `end` of each cycle.
function Reveal({ id, x, y, w, h, dur, start, end, children }) {
  return (
    <g>
      <clipPath id={id}>
        <rect x={x} y={y} width={w} height={h}>
          <animate attributeName="width" values={`0;0;${w};${w}`} keyTimes={`0;${start};${end};1`} dur={dur} repeatCount="indefinite" />
        </rect>
      </clipPath>
      <g clipPath={`url(#${id})`}>{children}</g>
    </g>
  );
}

// ---------- Diagrams ----------

export function FadingSignal() {
  const x0 = 50, y0 = 225, w = 520, h = 190;
  const dip = lowestPoint(multipath, 0.3, 0.55, x0, y0, w, h);
  const trace = plotPath(multipath, x0, y0, w, h);
  const loop = { dur: '7s', repeatCount: 'indefinite' };
  return (
    <svg viewBox="0 0 600 260" className="w-full h-auto">
      <Axes x0={x0} y0={y0} w={w} h={h} xLabel="Time / distance →" yLabel="Signal strength" />
      <g>
        <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.93;1" {...loop} />
        <path d={trace} fill="none" stroke={F.signal} strokeWidth="2.5" pathLength="1" strokeDasharray="1 1" strokeDashoffset="0">
          <animate attributeName="stroke-dashoffset" values="1;0;0" keyTimes="0;0.7;1" {...loop} />
        </path>
        <circle r="5" fill={F.signal} className={strokeCls} strokeWidth="1.5">
          <animateMotion path={trace} keyPoints="0;1;1" keyTimes="0;0.7;1" calcMode="linear" {...loop} />
        </circle>
      </g>
      <circle cx={dip.x} cy={dip.y} r="6" fill="none" stroke={F.bad} strokeWidth="2.5">
        <animate attributeName="r" values="6;10;6" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <text x={dip.x + 10} y={dip.y + 22} fontSize="11" fontWeight="900">Deep fade (weak signal)</text>
    </svg>
  );
}

export function FadingScales() {
  const x0 = 50, y0 = 225, w = 520, h = 190;
  const win = { x: x0, y: y0 - h - 6, w, h: h + 12, dur: '10s' };
  return (
    <svg viewBox="0 0 600 260" className="w-full h-auto">
      <Axes x0={x0} y0={y0} w={w} h={h} xLabel="Distance from transmitter →" yLabel="Received power" />
      {/* builds up layer by layer: path loss, then + shadowing, then + multipath */}
      <g>
        <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.94;1" dur="10s" repeatCount="indefinite" />
        <Reveal id="fs-mp" {...win} start={0.6} end={0.85}>
          <path d={plotPath(multipath, x0, y0, w, h)} fill="none" stroke={F.signal} strokeWidth="1.8" />
        </Reveal>
        <Reveal id="fs-sh" {...win} start={0.32} end={0.55}>
          <path d={plotPath(shadowing, x0, y0, w, h)} fill="none" stroke={F.shadow} strokeWidth="3.5" />
        </Reveal>
        <Reveal id="fs-pl" {...win} start={0.03} end={0.27}>
          <path d={plotPath(pathLoss, x0, y0, w, h)} fill="none" stroke={F.pathLoss} strokeWidth="3" strokeDasharray="8 5" />
        </Reveal>
      </g>
    </svg>
  );
}

export function Multipath() {
  const g = 220;
  const tx = { x: 60, y: g - 90 };
  const rx = { x: 500, y: g - 20 };
  const bounce = { x: 300, y: 70 };
  const tree = { x: 565, y: 172 };
  const groundPt = { x: 260, y: g };
  return (
    <svg viewBox="0 0 600 260" className="w-full h-auto">
      <defs>
        <Arrow id="mp-d" color={F.signal} />
        <Arrow id="mp-r" color={F.reflect} />
        <Arrow id="mp-s" color={F.scatter} />
        <Arrow id="mp-g" color={C.ground} />
      </defs>
      <Ground y={g} />
      <Building x={255} y={20} w={90} h={50} label="" />
      <text x="300" y="50" fontSize="11" textAnchor="middle" fontWeight="900">Building</text>
      <circle cx={tree.x} cy={tree.y} r="18" fill={C.ground} fillOpacity="0.5" className={strokeCls} strokeWidth="2" />
      <line x1={tree.x} y1={tree.y + 18} x2={tree.x} y2={g} className={strokeCls} strokeWidth="3" />
      <text x={tree.x} y={tree.y - 48} fontSize="11" textAnchor="middle" fontWeight="900">Tree</text>
      <Tower x={tx.x} base={g} h={g - tx.y} color="#facc15" label="Tx" />
      <Phone x={rx.x} y={rx.y - 4} label="Rx" />
      <line x1={tx.x} y1={tx.y} x2={rx.x - 12} y2={rx.y - 6} stroke={F.signal} strokeWidth="3" markerEnd="url(#mp-d)" />
      <path d={`M ${tx.x},${tx.y} L ${bounce.x},${bounce.y} L ${rx.x - 10},${rx.y - 14}`} fill="none" stroke={F.reflect} strokeWidth="3" strokeDasharray="8 4" markerEnd="url(#mp-r)" />
      <path d={`M ${tx.x},${tx.y} L ${groundPt.x},${groundPt.y} L ${rx.x - 12},${rx.y + 2}`} fill="none" stroke={C.ground} strokeWidth="3" strokeDasharray="3 4" markerEnd="url(#mp-g)" />
      <path d={`M ${tx.x},${tx.y} L ${tree.x - 18},${tree.y - 6}`} fill="none" stroke={F.scatter} strokeWidth="2" strokeDasharray="5 3" />
      <path d={`M ${tree.x - 16},${tree.y + 8} L ${rx.x + 12},${rx.y - 4}`} fill="none" stroke={F.scatter} strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#mp-s)" />
      <line x1={tree.x + 8} y1={tree.y - 16} x2={tree.x + 22} y2={tree.y - 38} stroke={F.scatter} strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1={tree.x - 4} y1={tree.y - 18} x2={tree.x - 10} y2={tree.y - 42} stroke={F.scatter} strokeWidth="1.5" strokeDasharray="3 2" />
      {[
        { color: F.signal, points: [tx, { x: rx.x - 12, y: rx.y - 6 }] },
        { color: F.reflect, points: [tx, bounce, { x: rx.x - 10, y: rx.y - 14 }] },
        { color: C.ground, points: [tx, groundPt, { x: rx.x - 12, y: rx.y + 2 }] },
        { color: F.scatter, points: [tx, { x: tree.x - 18, y: tree.y - 6 }, { x: tree.x - 16, y: tree.y + 8 }, { x: rx.x + 12, y: rx.y - 4 }] }
      ].map((p, i) => (
        <Pulse key={i} points={p.points} color={p.color} cycle={4} speed={180} />
      ))}
      <text x="500" y="40" fontSize="11" textAnchor="middle" fontWeight="900">Copies arrive at</text>
      <text x="500" y="54" fontSize="11" textAnchor="middle" fontWeight="900">different times</text>
    </svg>
  );
}

function wavePath(x0, yMid, w, amp, phase, cycles = 2.5) {
  let d = '';
  for (let i = 0; i <= 120; i++) {
    const t = i / 120;
    const y = yMid - amp * Math.sin(2 * Math.PI * cycles * t + phase);
    d += `${i ? ' L' : 'M'} ${(x0 + t * w).toFixed(1)},${y.toFixed(1)}`;
  }
  return d;
}

export function Interference() {
  // waves are 2.5 cycles across 195px; drawing one extra period and sliding by it makes them flow
  const period = 195 / 2.5;
  const flowing = (id, x0, yMid, amp, phase, color, width) => (
    <Scroll id={id} x={x0 + 45} y={yMid - amp - 4} w={195} h={2 * amp + 8} shift={period} dur="1.6s">
      <path d={wavePath(x0 + 45 - period, yMid, 195 + period, amp, phase, 3.5)} fill="none" stroke={color} strokeWidth={width} />
    </Scroll>
  );
  const panel = (x0, title, phase, resultAmp, resultLabel, color) => (
    <g>
      <text x={x0 + 120} y="22" fontSize="12" textAnchor="middle" fontWeight="900">{title}</text>
      <text x={x0} y="52" fontSize="10" fontWeight="700">Path 1</text>
      {flowing(`if-1-${x0}`, x0, 60, 14, 0, F.signal, 2)}
      <text x={x0} y="102" fontSize="10" fontWeight="700">Path 2</text>
      {flowing(`if-2-${x0}`, x0, 110, 14, phase, F.reflect, 2)}
      <text x={x0 + 140} y="142" fontSize="16" textAnchor="middle" fontWeight="900">↓</text>
      <text x={x0} y="190" fontSize="10" fontWeight="700">Result</text>
      {resultAmp > 0 ? (
        flowing(`if-r-${x0}`, x0, 195, resultAmp, 0, color, 3.5)
      ) : (
        <line x1={x0 + 45} y1="195" x2={x0 + 240} y2="195" stroke={color} strokeWidth="3.5" />
      )}
      <text x={x0 + 140} y="245" fontSize="11" textAnchor="middle" fontWeight="900">{resultLabel}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 600 260" className="w-full h-auto">
      {panel(30, 'Constructive (in phase)', 0, 28, 'Stronger signal', F.good)}
      <line x1="300" y1="10" x2="300" y2="250" className={strokeCls} strokeWidth="1.5" strokeDasharray="4 4" />
      {panel(330, 'Destructive (out of phase)', Math.PI, 0, 'Weak / no signal (fade)', F.bad)}
    </svg>
  );
}

export function PathLossScene() {
  const g = 210;
  const phones = [
    { x: 190, level: 4, label: 'Near' },
    { x: 350, level: 2, label: 'Farther' },
    { x: 510, level: 1, label: 'Far' }
  ];
  return (
    <svg viewBox="0 0 600 260" className="w-full h-auto">
      <defs>
        <Arrow id="pl" color={F.pathLoss} />
      </defs>
      <Ground y={g} />
      <Tower x={60} base={g} h={110} color="#facc15" label="Cell tower" />
      {/* wavefronts expand from the tower and fade as they spread */}
      <g transform="translate(60 100)">
        {[0, 1, 2].map((i) => (
          <path key={i} d="M 119,-119 A 170 170 0 0 1 119,119" fill="none" stroke={F.signal} strokeWidth="3" vectorEffect="non-scaling-stroke" opacity="0">
            <animateTransform attributeName="transform" type="scale" values="0.25;1" dur="3s" begin={`${-i}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0" dur="3s" begin={`${-i}s`} repeatCount="indefinite" />
          </path>
        ))}
      </g>
      {phones.map((p) => (
        <g key={p.x}>
          <Phone x={p.x} y={g - 20} label={p.label} />
          <Bars x={p.x - 12} y={g - 46} level={p.level} />
        </g>
      ))}
      <line x1="150" y1="250" x2="560" y2="250" stroke={F.pathLoss} strokeWidth="2.5" markerEnd="url(#pl)" />
      <text x="355" y="244" fontSize="11" textAnchor="middle" fontWeight="900">Distance increases → signal power decreases</text>
    </svg>
  );
}

export function ShadowingScene() {
  const g = 215;
  const tx = { x: 60, y: 55 };
  const b = { x: 290, y: 95, w: 60 };
  // shadow boundary: ray from the Tx top over the building's top-right corner
  const cx = b.x + b.w, cy = b.y;
  const slope = (cy - tx.y) / (cx - tx.x);
  const edgeY = cy + slope * (600 - cx);
  // where a ray aimed at the shadowed phone hits the building wall
  const wallY = tx.y + ((g - 34 - tx.y) * (b.x - tx.x)) / (450 - tx.x);
  return (
    <svg viewBox="0 0 600 260" className="w-full h-auto">
      <Ground y={g} />
      <polygon points={`${cx},${cy} 600,${edgeY} 600,${g} ${cx},${g}`} fill="#475569" fillOpacity="0.35" />
      <text x="530" y={edgeY + 30} fontSize="11" textAnchor="middle" fontWeight="900">Shadow region</text>
      <line x1={tx.x} y1={tx.y} x2="600" y2={edgeY} stroke={F.signal} strokeWidth="1.5" strokeDasharray="5 4" />
      <Building x={b.x} y={b.y} w={b.w} h={g - b.y} label="Building" />
      <Tower x={tx.x} base={g} h={g - tx.y} color="#facc15" label="Tx" />
      <line x1={tx.x} y1={tx.y} x2={192} y2={g - 50} stroke={F.signal} strokeWidth="3" />
      <line x1={tx.x} y1={tx.y} x2={b.x} y2={wallY} stroke={F.bad} strokeWidth="2" strokeDasharray="4 3" />
      <text x={b.x - 4} y={wallY + 5} fontSize="14" textAnchor="end" fontWeight="900" fill={F.bad}>✕</text>
      {['0s', '-1.25s'].map((begin) => (
        <g key={begin}>
          <Pulse points={[tx, { x: 192, y: g - 50 }]} color={F.signal} cycle={2.5} speed={120} begin={begin} />
          <Pulse points={[tx, { x: b.x, y: wallY }]} color={F.signal} cycle={2.5} speed={120} begin={begin} />
        </g>
      ))}
      <Phone x={200} y={g - 20} label="Clear" color={F.good} />
      <Bars x={188} y={g - 46} level={4} />
      <Phone x={450} y={g - 20} label="In shadow" color={F.bad} />
      <Bars x={438} y={g - 46} level={1} />
    </svg>
  );
}

export function DopplerScene() {
  const g = 215;
  const tower = 300;
  const waves = (from, to, wavelength, y) => {
    let d = '';
    for (let i = 0; i <= 200; i++) {
      const x = from + (i / 200) * (to - from);
      const yy = y - 10 * Math.sin((2 * Math.PI * (x - from)) / wavelength);
      d += `${i ? ' L' : 'M'} ${x.toFixed(1)},${yy.toFixed(1)}`;
    }
    return d;
  };
  // both waves travel outward from the tower at the same speed (40 px/s)
  const outward = (id, from, to, wavelength, dir) => (
    <Scroll id={id} x={from} y="100" w={to - from} h="40" shift={dir * wavelength} dur={`${wavelength / 40}s`}>
      <path d={waves(from - wavelength, to + wavelength, wavelength, 120)} fill="none" stroke={dir < 0 ? F.good : F.bad} strokeWidth="2.5" />
    </Scroll>
  );
  const moving = (dx) => (
    <>
      <animateTransform attributeName="transform" type="translate" values={`0 0;${dx} 0`} dur="2.5s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur="2.5s" repeatCount="indefinite" />
    </>
  );
  return (
    <svg viewBox="0 0 600 260" className="w-full h-auto">
      <defs>
        <Arrow id="dp-g" color={F.good} />
        <Arrow id="dp-b" color={F.bad} />
      </defs>
      <Ground y={g} />
      <Tower x={tower} base={g} h={115} color="#facc15" label="Tower" />
      {/* user on the left moving toward the tower: waves compressed */}
      {outward('dp-l', 95, tower - 15, 22, -1)}
      <g>
        {moving(20)}
        <Phone x={70} y={g - 20} color={F.good} />
      </g>
      <line x1="45" y1={g - 52} x2="105" y2={g - 52} stroke={F.good} strokeWidth="3" markerEnd="url(#dp-g)" />
      <text x="75" y={g - 62} fontSize="10" textAnchor="middle" fontWeight="900">moving toward</text>
      <text x="150" y="80" fontSize="12" textAnchor="middle" fontWeight="900">Higher frequency</text>
      <text x="150" y="95" fontSize="11" textAnchor="middle" fontWeight="700">f + f_d</text>
      {/* user on the right moving away: waves stretched */}
      {outward('dp-r', tower + 15, 505, 55, 1)}
      <g>
        {moving(20)}
        <Phone x={520} y={g - 20} color={F.bad} />
      </g>
      <line x1="500" y1={g - 52} x2="560" y2={g - 52} stroke={F.bad} strokeWidth="3" markerEnd="url(#dp-b)" />
      <text x="530" y={g - 62} fontSize="10" textAnchor="middle" fontWeight="900">moving away</text>
      <text x="450" y="80" fontSize="12" textAnchor="middle" fontWeight="900">Lower frequency</text>
      <text x="450" y="95" fontSize="11" textAnchor="middle" fontWeight="700">f − f_d</text>
    </svg>
  );
}

export function FastSlow() {
  // fn repeats every t = 1, so drawing t = 0..2 and sliding left by one width scrolls seamlessly
  const lane = (y0, title, fn, color) => {
    let d = '';
    for (let i = 0; i <= 600; i++) {
      const t = (i / 600) * 2;
      d += `${i ? ' L' : 'M'} ${(70 + t * 500).toFixed(1)},${(y0 - fn(t)).toFixed(1)}`;
    }
    return (
      <g>
        <text x="20" y={y0 - 30} fontSize="12" fontWeight="900">{title}</text>
        <line x1="70" y1={y0} x2="570" y2={y0} className={strokeCls} strokeWidth="1" strokeDasharray="3 3" />
        <Scroll id={`fsl-${title}`} x={70} y={y0 - 36} w={500} h={72} shift={-500} dur="10s">
          <path d={d} fill="none" stroke={color} strokeWidth="2.5" />
        </Scroll>
      </g>
    );
  };
  return (
    <svg viewBox="0 0 600 260" className="w-full h-auto">
      {lane(80, 'Fast', (t) => 22 * Math.sin(2 * Math.PI * t * 18) * (0.6 + 0.4 * Math.sin(2 * Math.PI * t * 3)), F.signal)}
      {lane(190, 'Slow', (t) => 28 * Math.sin(2 * Math.PI * t * 2 + 0.4), F.shadow)}
      <text x="570" y="250" fontSize="11" textAnchor="end" fontWeight="700">Time →</text>
    </svg>
  );
}

export function RayleighRician() {
  const g = 215;
  const scene = (x0, title, los) => {
    const tx = { x: x0 + 30, y: g - 80 };
    const rx = { x: x0 + 240, y: g - 24 };
    const scatterers = [
      { x: x0 + 110, y: 50 },
      { x: x0 + 175, y: 85 },
      { x: x0 + 228, y: 48 }
    ];
    return (
      <g>
        <text x={x0 + 135} y="22" fontSize="12" textAnchor="middle" fontWeight="900">{title}</text>
        {scatterers.map((s, i) => (
          <g key={i}>
            <path d={`M ${tx.x},${tx.y} L ${s.x},${s.y} L ${rx.x - 8},${rx.y - 6}`} fill="none" stroke={F.reflect} strokeWidth="2" strokeDasharray="5 3" />
            <circle cx={s.x} cy={s.y} r="6" fill="#94a3b8" className={strokeCls} strokeWidth="1.5" />
          </g>
        ))}
        {los ? (
          <line x1={tx.x} y1={tx.y} x2={rx.x - 8} y2={rx.y - 6} stroke={F.signal} strokeWidth="4" />
        ) : (
          <g>
            <Building x={x0 + 150} y={g - 95} w={34} h={95} />
            <line x1={tx.x} y1={tx.y} x2={x0 + 150} y2={tx.y + (rx.y - tx.y) * ((120) / 210)} stroke={F.bad} strokeWidth="2.5" strokeDasharray="4 3" />
            <text x={x0 + 144} y={tx.y + 40} fontSize="15" textAnchor="end" fontWeight="900" fill={F.bad}>✕</text>
          </g>
        )}
        {scatterers.map((s, i) => (
          <Pulse key={i} points={[tx, s, { x: rx.x - 8, y: rx.y - 6 }]} color={F.reflect} cycle={3} speed={150} r={4} />
        ))}
        <Pulse
          points={[tx, los ? { x: rx.x - 8, y: rx.y - 6 } : { x: x0 + 150, y: tx.y + (rx.y - tx.y) * (120 / 210) }]}
          color={los ? F.signal : F.bad}
          cycle={3}
          speed={150}
        />
        <Tower x={tx.x} base={g} h={g - tx.y} color="#facc15" label="Tx" />
        <Phone x={rx.x} y={rx.y} label="Rx" />
      </g>
    );
  };
  return (
    <svg viewBox="0 0 600 260" className="w-full h-auto">
      <Ground y={g} />
      {scene(10, 'Rayleigh: no direct path', false)}
      <line x1="300" y1="10" x2="300" y2={g} className={strokeCls} strokeWidth="1.5" strokeDasharray="4 4" />
      {scene(310, 'Rician: direct path + scattered', true)}
    </svg>
  );
}
