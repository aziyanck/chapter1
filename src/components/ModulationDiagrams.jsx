import React from 'react';
import { M } from './diagramTheme';
import { strokeCls, Arrow, Scroll } from './diagramParts';

// Looping animated block diagrams for Topics 6–8: stages light up in order and a dot carries the signal
// along each arrow. The waveform slides use ModulationLab instead.

const X0 = 105;
const W = 480;

// ---------- Animation helpers (SVG SMIL; SlideDiagram pauses them for reduced-motion users) ----------

const CYCLE = 6;
const kt = (...ts) => ts.map((t) => t.toFixed(3)).join(';');

// Highlights a block during its stage: stage `step` of `steps` stages per cycle.
function Glow({ x, y, w, h, rx = 6, step, steps }) {
  const a = step / steps, b = (step + 0.5) / steps, c = (step + 1) / steps;
  return (
    <rect x={x - 3} y={y - 3} width={w + 6} height={h + 6} rx={rx + 2} fill={M.ask} fillOpacity="0.25" stroke={M.ask} strokeWidth="3" opacity="0">
      <animate attributeName="opacity" values="0;0;1;0;0" keyTimes={kt(0, a, b, c, 1)} dur={`${CYCLE}s`} repeatCount="indefinite" />
    </rect>
  );
}

// A dot that runs along a polyline in the second half of stage `step`, carrying the signal to the next block.
function Carry({ points, step, steps, color = M.ask }) {
  const a = (step + 0.5) / steps, b = (step + 1) / steps;
  const loop = { dur: `${CYCLE}s`, repeatCount: 'indefinite' };
  return (
    <circle r="5" fill={color} className={strokeCls} strokeWidth="1.5" opacity="0">
      <animateMotion path={points.map((p, i) => `${i ? 'L' : 'M'} ${p[0]},${p[1]}`).join(' ')} keyPoints="0;0;1;1" keyTimes={kt(0, a, b, 1)} calcMode="linear" {...loop} />
      <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes={kt(0, a - 0.001, a, b, Math.min(b + 0.001, 1), 1)} {...loop} />
    </circle>
  );
}

// A periodic wave (period in px) flowing rightwards inside a fixed window.
function FlowingWave({ id, fn, yMid, scale, x0, w, period, speed = 40, color, width = 2 }) {
  let d = '';
  for (let i = 0; i <= 400; i++) {
    const x = x0 - period + (i / 400) * (w + period);
    d += `${i ? ' L' : 'M'} ${x.toFixed(1)},${(yMid - scale * fn((x - x0) / w)).toFixed(1)}`;
  }
  return (
    <Scroll id={id} x={x0} y={yMid - scale - 4} w={w} h={2 * scale + 8} shift={period} dur={`${(period / speed).toFixed(2)}s`}>
      <path d={d} fill="none" stroke={color} strokeWidth={width} />
    </Scroll>
  );
}

function LaneLabel({ y, label, sub }) {
  return (
    <g>
      <text x="8" y={sub ? y - 2 : y + 4} fontSize="12" fontWeight="900">{label}</text>
      {sub && <text x="8" y={y + 12} fontSize="10" fontWeight="700">{sub}</text>}
    </g>
  );
}

function Baseline({ y }) {
  return <line x1={X0} y1={y} x2={X0 + W} y2={y} className={strokeCls} strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" />;
}

// ---------- Digital data → analog signal (Topic 6) ----------

function Block({ x, y, w, h, lines, fill = M.block }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={fill} fillOpacity="0.3" className={strokeCls} strokeWidth="2" />
      {lines.map((ln, i) => (
        <text key={i} x={x + w / 2} y={y + h / 2 + 4 + (i - (lines.length - 1) / 2) * 14} fontSize="12" textAnchor="middle" fontWeight={i === 0 ? 900 : 700}>
          {ln}
        </text>
      ))}
    </g>
  );
}

function Link({ x1, y1, x2, y2, id }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={M.arrow} strokeWidth="2.5" markerEnd={`url(#${id})`} />;
}

export function DigitalToAnalogFlow() {
  return (
    <svg viewBox="0 0 600 200" className="w-full h-auto">
      <defs>
        <Arrow id="d2a" color={M.arrow} />
      </defs>
      {[10, 225, 440].map((x, i) => <Glow key={x} x={x} y={50} w={150} h={70} step={i} steps={3} />)}
      <Block x={10} y={50} w={150} h={70} lines={['Digital data', '1  0  1  1']} fill={M.data} />
      <Block x={225} y={50} w={150} h={70} lines={['Modulator', '(changes carrier)']} />
      <Block x={440} y={50} w={150} h={70} lines={['Analog signal', 'to channel']} fill={M.fsk} />
      <Link x1={160} y1={85} x2={221} y2={85} id="d2a" />
      <Link x1={375} y1={85} x2={436} y2={85} id="d2a" />
      <FlowingWave id="d2a-c" fn={(t) => Math.sin(2 * Math.PI * 4 * t)} yMid={175} scale={10} x0={240} w={120} period={30} color={M.carrier} />
      <Carry points={[[160, 85], [221, 85]]} step={0} steps={3} color={M.data} />
      <Carry points={[[300, 160], [300, 124]]} step={0} steps={3} color={M.carrier} />
      <Carry points={[[375, 85], [436, 85]]} step={1} steps={3} color={M.fsk} />
      <line x1="300" y1="160" x2="300" y2="124" stroke={M.arrow} strokeWidth="2.5" markerEnd="url(#d2a)" />
      <text x="370" y="180" fontSize="11" fontWeight="700">Carrier wave</text>
    </svg>
  );
}

// ---------- Analog data → analog signal (Topic 7) ----------

const FM_MSG = 1.5;
const FC = 20;
const message = (t) => Math.sin(2 * Math.PI * FM_MSG * t);
const carrier = (t) => Math.sin(2 * Math.PI * FC * t);
function AnalogLanes({ lanes, height }) {
  return (
    <svg viewBox={`0 0 600 ${height}`} className="w-full h-auto">
      {lanes.map((l) => (
        <g key={l.label}>
          <LaneLabel y={l.y} label={l.label} sub={l.sub} />
          <Baseline y={l.y} />
          <FlowingWave id={`al-${l.label}`} fn={l.fn} yMid={l.y} scale={l.scale || 30} x0={X0} w={W} period={l.period} color={l.color} width={l.width || 2} />
        </g>
      ))}
    </svg>
  );
}

const messageLane = (y) => ({ y, fn: message, label: 'Message', sub: '(audio)', color: M.message, width: 3, period: W / FM_MSG });

export function AnalogInputs() {
  return (
    <AnalogLanes
      height={180}
      lanes={[messageLane(50), { y: 135, fn: carrier, label: 'Carrier', sub: '(high freq.)', color: M.carrier, period: W / FC }]}
    />
  );
}

// ---------- Analog data → digital signal (Topic 8) ----------

export function AdcFlow() {
  const boxes = [
    { x: 5, lines: ['Analog', 'signal'], fill: M.message },
    { x: 125, lines: ['Sampling'] },
    { x: 245, lines: ['Quantization'] },
    { x: 365, lines: ['Encoding'] },
    { x: 485, lines: ['Digital', '101 110…'], fill: M.data }
  ];
  return (
    <svg viewBox="0 0 600 150" className="w-full h-auto">
      <defs>
        <Arrow id="adc" color={M.arrow} />
      </defs>
      {boxes.map((b, i) => (
        <g key={b.x}>
          <Glow x={b.x} y={40} w={98} h={64} step={i} steps={boxes.length} />
          <Block x={b.x} y={40} w={98} h={64} lines={b.lines} fill={b.fill} />
          {i < boxes.length - 1 && <Link x1={b.x + 98} y1={72} x2={b.x + 117} y2={72} id="adc" />}
        </g>
      ))}
      {boxes.slice(0, -1).map((b, i) => (
        <Carry key={b.x} points={[[b.x + 98, 72], [b.x + 117, 72]]} step={i} steps={boxes.length} />
      ))}
      <text x="300" y="130" fontSize="11" textAnchor="middle" fontWeight="700">Performed by an Analog-to-Digital Converter (ADC)</text>
    </svg>
  );
}

export function PcmBlock() {
  const tx = [
    { lines: ['Analog', 'input'], fill: M.message },
    { lines: ['Sampling'] },
    { lines: ['Quantization'] },
    { lines: ['Encoding'] }
  ];
  const rx = [
    { lines: ['Decoding'] },
    { lines: ['Reconstruction'] },
    { lines: ['Analog', 'output'], fill: M.message }
  ];
  const bw = 112, gap = 34, h = 54;
  return (
    <svg viewBox="0 0 600 250" className="w-full h-auto">
      <defs>
        <Arrow id="pcm" color={M.arrow} />
      </defs>
      <text x="8" y="22" fontSize="12" fontWeight="900">Transmitter</text>
      {tx.map((b, i) => {
        const x = 10 + i * (bw + gap);
        return (
          <g key={i}>
            <Glow x={x} y={35} w={bw} h={h} step={i} steps={8} />
            <Block x={x} y={35} w={bw} h={h} lines={b.lines} fill={b.fill} />
            {i < tx.length - 1 && <Link x1={x + bw} y1={62} x2={x + bw + gap - 4} y2={62} id="pcm" />}
            {i < tx.length - 1 && <Carry points={[[x + bw, 62], [x + bw + gap - 4, 62]]} step={i} steps={8} />}
          </g>
        );
      })}
      <path d={`M ${10 + 3 * (bw + gap) + bw / 2},${35 + h} L ${10 + 3 * (bw + gap) + bw / 2},125`} stroke={M.arrow} strokeWidth="2.5" markerEnd="url(#pcm)" />
      <Carry points={[[10 + 3 * (bw + gap) + bw / 2, 35 + h], [10 + 3 * (bw + gap) + bw / 2, 125]]} step={3} steps={8} />
      <Glow x={120} y={125} w={420} h={34} step={4} steps={8} />
      <rect x="120" y="125" width="420" height="34" rx="6" fill={M.data} fillOpacity="0.25" className={strokeCls} strokeWidth="2" strokeDasharray="6 3">
        <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="0.8s" repeatCount="indefinite" />
      </rect>
      <Carry points={[[120, 142], [80, 142], [80, 190]]} step={4} steps={8} />
      <text x="330" y="147" fontSize="12" textAnchor="middle" fontWeight="900">Transmission: 1 0 1 1 0 1 0 …</text>
      <text x="8" y="182" fontSize="12" fontWeight="900">Receiver</text>
      <path d="M 120,142 L 80,142 L 80,190" fill="none" stroke={M.arrow} strokeWidth="2.5" markerEnd="url(#pcm)" />
      {rx.map((b, i) => {
        const x = 25 + i * (bw + 80);
        return (
          <g key={i}>
            <Glow x={x} y={192} w={bw} h={h} step={5 + i} steps={8} />
            <Block x={x} y={192} w={bw} h={h} lines={b.lines} fill={b.fill} />
            {i < rx.length - 1 && <Link x1={x + bw} y1={219} x2={x + bw + 76} y2={219} id="pcm" />}
            {i < rx.length - 1 && <Carry points={[[x + bw, 219], [x + bw + 76, 219]]} step={5 + i} steps={8} />}
          </g>
        );
      })}
    </svg>
  );
}
