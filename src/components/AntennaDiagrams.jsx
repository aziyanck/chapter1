import React from 'react';
import { C, F, M, polar, arc, omniPattern, directionalPattern, hpbw } from './diagramTheme';
import { strokeCls, Tower, Arrow, Block, Glow, Carry, FlowingWave, Ripples } from './diagramParts';

// Looping animated diagrams for Topic 1 (wireless flow) and Topic 2 (antennas).
// SVG SMIL; SlideDiagram and TopicVisuals pause them for reduced-motion users.

function Dipole({ x, y, len = 45 }) {
  return (
    <g>
      <line x1={x} y1={y - len} x2={x} y2={y - 5} className={strokeCls} strokeWidth="4" strokeLinecap="round" />
      <line x1={x} y1={y + 5} x2={x} y2={y + len} className={strokeCls} strokeWidth="4" strokeLinecap="round" />
      <circle cx={x} cy={y} r="4" fill="#facc15" className={strokeCls} strokeWidth="1.5" />
    </g>
  );
}

// ---------- Topic 1: the 5-step wireless flow ----------

export function WirelessFlow() {
  const steps = 5;
  const top = 55;
  return (
    <svg viewBox="0 0 600 200" className="w-full h-auto">
      <defs>
        <Arrow id="wf" color={M.arrow} />
      </defs>
      <Glow x={10} y={60} w={105} h={60} step={0} steps={steps} />
      <Glow x={150} y={40} w={40} h={95} step={1} steps={steps} />
      <Glow x={200} y={30} w={200} h={95} step={2} steps={steps} />
      <Glow x={410} y={40} w={40} h={95} step={3} steps={steps} />
      <Glow x={485} y={60} w={105} h={60} step={4} steps={steps} />
      {[62, 170, 300, 430, 537].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="16" r="10" fill="#facc15" className={strokeCls} strokeWidth="1.5" />
          <text x={x} y="20" fontSize="11" textAnchor="middle" fontWeight="900" className="keep-dark">{i + 1}</text>
        </g>
      ))}
      <Block x={10} y={60} w={105} h={60} lines={['Transmitter', 'info → signal']} fill={M.data} />
      <Block x={485} y={60} w={105} h={60} lines={['Receiver', 'signal → info']} fill={M.qpsk} />
      <line x1="115" y1="90" x2="166" y2="90" stroke={M.arrow} strokeWidth="2.5" markerEnd="url(#wf)" />
      <line x1="434" y1="90" x2="481" y2="90" stroke={M.arrow} strokeWidth="2.5" markerEnd="url(#wf)" />
      <Tower x={170} base={130} h={130 - top} color="#facc15" label="Tx antenna" />
      <Tower x={430} base={130} h={130 - top} color={M.qpsk} label="Rx antenna" />
      <Ripples cx={170} cy={top} d={arc(260, 12)} color={F.signal} count={4} dur={3} />
      <text x="300" y="140" fontSize="12" textAnchor="middle" fontWeight="900">Wireless channel</text>
      <text x="300" y="154" fontSize="11" textAnchor="middle" fontWeight="700">(EM waves through the air)</text>
      <Carry points={[[115, 90], [166, 90]]} step={0} steps={steps} color={M.data} />
      <Carry points={[[170, 90], [170, top]]} step={1} steps={steps} color={F.signal} />
      <Carry points={[[170, top], [430, top]]} step={2} steps={steps} color={F.signal} />
      <Carry points={[[430, top], [430, 90], [481, 90]]} step={3} steps={steps} color={M.qpsk} />
      <text x="300" y="188" fontSize="11" textAnchor="middle" fontWeight="700">
        Information → electrical signal → EM waves → electrical signal → information
      </text>
    </svg>
  );
}

// ---------- Topic 2: antennas ----------

export function AntennaConvert() {
  const sine = (cycles) => (t) => Math.sin(2 * Math.PI * cycles * t);
  return (
    <svg viewBox="0 0 600 200" className="w-full h-auto">
      <text x="80" y="70" fontSize="11" textAnchor="middle" fontWeight="900">Electrical signal</text>
      <FlowingWave id="ac-in" fn={sine(5)} yMid={100} scale={12} x0={15} w={130} period={26} color={C.ground} width={2.5} />
      <line x1="145" y1="100" x2="171" y2="100" className={strokeCls} strokeWidth="2" />
      <Dipole x={175} y={100} />
      <Ripples cx={175} cy={100} d={arc(235, 22)} color={F.signal} count={4} dur={3} />
      <Dipole x={415} y={100} />
      <line x1="419" y1="100" x2="440" y2="100" className={strokeCls} strokeWidth="2" />
      <FlowingWave id="ac-out" fn={sine(5.5)} yMid={100} scale={7} x0={440} w={145} period={26} color={C.ground} width={2.5} />
      <text x="512" y="70" fontSize="11" textAnchor="middle" fontWeight="900">Electrical signal</text>
      <text x="80" y="140" fontSize="12" textAnchor="middle" fontWeight="900">Transmitting antenna</text>
      <text x="80" y="155" fontSize="11" textAnchor="middle" fontWeight="700">electrical → EM waves</text>
      <text x="512" y="140" fontSize="12" textAnchor="middle" fontWeight="900">Receiving antenna</text>
      <text x="512" y="155" fontSize="11" textAnchor="middle" fontWeight="700">EM waves → electrical</text>
      <text x="295" y="192" fontSize="11" textAnchor="middle" fontWeight="700">EM waves travel through free space</text>
    </svg>
  );
}

export function RadiationPatterns() {
  const cy = 115;
  const panels = [
    { x: 100, d: polar(() => 70), title: 'Isotropic', gain: 'Equal in all directions (0 dBi)', color: C.ground },
    { x: 300, d: omniPattern(85), title: 'Omnidirectional', gain: 'All around in one plane', color: F.signal },
    { x: 440, d: directionalPattern(8, 140, 0.12), title: 'Directional', gain: 'Concentrated one way', color: C.sky, labelX: 500 }
  ];
  return (
    <svg viewBox="0 0 600 250" className="w-full h-auto">
      {panels.map((p) => (
        <g key={p.title}>
          <path d={p.d} transform={`translate(${p.x} ${cy})`} fill={p.color} fillOpacity="0.15" stroke={p.color} strokeWidth="2" strokeDasharray="5 4" />
          <Ripples cx={p.x} cy={cy} d={p.d} color={p.color} dur={2.4} width={2.5} />
          <text x={p.labelX ?? p.x} y="222" fontSize="12" textAnchor="middle" fontWeight="900">{p.title}</text>
          <text x={p.labelX ?? p.x} y="239" fontSize="11" textAnchor="middle" fontWeight="700">{p.gain}</text>
        </g>
      ))}
      <circle cx="100" cy={cy} r="5" fill="#facc15" className={strokeCls} strokeWidth="1.5" />
      <Dipole x={300} y={cy} len={28} />
      <polygon points={`${430},${cy - 6} ${452},${cy - 14} ${452},${cy + 14} ${430},${cy + 6}`} fill="#facc15" className={strokeCls} strokeWidth="1.5" />
    </svg>
  );
}

export function Polarization() {
  const A = 55, cy = 95;
  const panels = [
    { x: 100, title: 'Linear', sub: 'E-field moves along a line', tip: (t) => [0, -A * Math.sin(t)], trace: `M 0,${-A} L 0,${A}`, color: F.signal },
    { x: 300, title: 'Circular', sub: 'E-field rotates, constant length', tip: (t) => [A * Math.cos(t), -A * Math.sin(t)], trace: polar(() => A), color: C.ground },
    { x: 500, title: 'Elliptical', sub: 'E-field traces an ellipse', tip: (t) => [A * Math.cos(t), -0.5 * A * Math.sin(t)], trace: `M ${A},0 A ${A} ${A / 2} 0 1 0 ${-A},0 A ${A} ${A / 2} 0 1 0 ${A},0`, color: C.sky }
  ];
  const samples = Array.from({ length: 33 }, (_, i) => (2 * Math.PI * i) / 32);
  return (
    <svg viewBox="0 0 600 210" className="w-full h-auto">
      <defs>
        {panels.map((p) => <Arrow key={p.title} id={`pol-${p.title}`} color={p.color} />)}
      </defs>
      {panels.map((p) => {
        const pts = samples.map((t) => p.tip(t).map((v) => v.toFixed(1)));
        const loop = { dur: '2s', repeatCount: 'indefinite' };
        return (
          <g key={p.title} transform={`translate(${p.x} ${cy})`}>
            <line x1={-70} y1="0" x2="70" y2="0" className={strokeCls} strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" />
            <line x1="0" y1={-70} x2="0" y2="70" className={strokeCls} strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" />
            <path d={p.trace} fill="none" stroke={p.color} strokeWidth="2" strokeDasharray="5 4" strokeOpacity="0.7" />
            <line x1="0" y1="0" x2={pts[0][0]} y2={pts[0][1]} stroke={p.color} strokeWidth="3.5" markerEnd={`url(#pol-${p.title})`}>
              <animate attributeName="x2" values={pts.map((q) => q[0]).join(';')} {...loop} />
              <animate attributeName="y2" values={pts.map((q) => q[1]).join(';')} {...loop} />
            </line>
            <circle r="3" fill={p.color} className={strokeCls} strokeWidth="1" />
            <text x="0" y="-78" fontSize="11" textAnchor="middle" fontWeight="900">E</text>
            <text x="0" y="98" fontSize="12" textAnchor="middle" fontWeight="900">{p.title}</text>
            <text x="0" y="114" fontSize="11" textAnchor="middle" fontWeight="700">{p.sub}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function Beamwidth() {
  const cy = 105, R = 230;
  const panels = [
    { x: 40, n: 30, title: 'Narrow beam (satellite dish)', color: C.sky },
    { x: 330, n: 2, title: 'Wide beam (Wi-Fi router)', color: F.signal }
  ];
  return (
    <svg viewBox="0 0 600 220" className="w-full h-auto">
      {panels.map((p) => {
        const bw = hpbw(p.n);
        const half = (bw / 2) * (Math.PI / 180);
        const d = directionalPattern(p.n, R);
        const ex = (R * 0.8 * Math.cos(half)).toFixed(1), ey = (R * 0.8 * Math.sin(half)).toFixed(1);
        return (
          <g key={p.title}>
            <path d={d} transform={`translate(${p.x} ${cy})`} fill={p.color} fillOpacity="0.15" stroke={p.color} strokeWidth="2" />
            <Ripples cx={p.x} cy={cy} d={d} color={p.color} dur={2.4} width={2.5} />
            <g transform={`translate(${p.x} ${cy})`}>
              <line x1="0" y1="0" x2={ex} y2={-ey} className={strokeCls} strokeWidth="1.5" strokeDasharray="4 3" />
              <line x1="0" y1="0" x2={ex} y2={ey} className={strokeCls} strokeWidth="1.5" strokeDasharray="4 3" />
              <path d={arc(70, bw / 2)} fill="none" className={strokeCls} strokeWidth="1.5" />
              <text x="78" y={p.n > 10 ? -14 : 4} fontSize="12" fontWeight="900">≈ {Math.round(bw)}°</text>
            </g>
            <circle cx={p.x} cy={cy} r="5" fill="#facc15" className={strokeCls} strokeWidth="1.5" />
            <text x={p.x + 115} y="205" fontSize="12" textAnchor="middle" fontWeight="900">{p.title}</text>
          </g>
        );
      })}
    </svg>
  );
}
