import React, { useState } from 'react';
import { M } from './diagramTheme';
import { strokeCls } from './diagramParts';
import { trace } from './waveMath';

// Interactive slide diagrams for Topics 6–8: sliders change the inputs and the resulting waves redraw live.
// Each slide shows only the controls for its technique; comparison slides show all of them.

const X0 = 110;
const W = 870;
const wave = (f, yMid, scale, steps = 1200) => trace(f, yMid, scale, X0, W, steps);

// ---------- Shared UI ----------

function Slider({ label, value, min, max, step = 1, onChange, display }) {
  return (
    <label className="block p-3 bg-white dark:bg-[#0c0f1a] neo-border dark:border-slate-700 rounded-lg">
      <span className="flex items-center justify-between gap-2 mb-1.5">
        <span className="text-xs font-black text-black dark:text-slate-200">{label}</span>
        <span className="text-xs font-mono font-black bg-[#fde047] dark:bg-yellow-400 text-black px-1.5 py-0.5 neo-border">
          {display ?? value}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#0284c7] cursor-pointer"
      />
    </label>
  );
}

function Controls({ children }) {
  const count = React.Children.toArray(children).filter(Boolean).length;
  const cols = count >= 5 ? 'lg:grid-cols-5' : count === 4 ? 'lg:grid-cols-4' : count === 3 ? 'lg:grid-cols-3' : '';
  return <div className={`grid grid-cols-1 sm:grid-cols-2 ${cols} gap-3`}>{children}</div>;
}

function Readout({ label, value, tone = 'neutral' }) {
  const tones = {
    neutral: 'bg-white dark:bg-[#141827]',
    good: 'bg-[#dcfce7] dark:bg-[#0f2a1a]',
    bad: 'bg-[#fee2e2] dark:bg-[#2a1215]'
  };
  return (
    <div className={`px-3 py-2 ${tones[tone]} neo-border dark:border-slate-700 rounded-lg`}>
      <span className="text-[11px] font-black text-slate-600 dark:text-slate-400 block">{label}</span>
      <span className="text-sm font-black text-black dark:text-white">{value}</span>
    </div>
  );
}

function Readouts({ children }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{children}</div>;
}

function Panel({ title, children }) {
  return (
    <div className="p-3 sm:p-4 bg-white dark:bg-[#07090e] neo-border dark:border-slate-700 rounded-xl">
      {title && <h5 className="text-xs font-black uppercase tracking-wider text-black dark:text-white mb-2">{title}</h5>}
      {children}
    </div>
  );
}

function Frame({ children }) {
  return (
    <div className="p-4 bg-[#faf8f5] dark:bg-[#0c0f1a] neo-border dark:border-slate-700 rounded-xl shadow-[2px_2px_0px_0px_#000] space-y-4">
      <span className="inline-block text-[10px] font-black uppercase tracking-wider bg-[#bae6fd] dark:bg-[#0369a1] text-black dark:text-white px-2 py-0.5 neo-border">
        Interactive — move the sliders
      </span>
      {children}
    </div>
  );
}

// Colour key under a lab: says what each wave is and whether it is an input, the carrier or the processed output.
const ROLE_STYLE = {
  Input: 'bg-[#e9d5ff] dark:bg-[#3b2156]',
  Carrier: 'bg-[#e2e8f0] dark:bg-[#1e293b]',
  Output: 'bg-[#bae6fd] dark:bg-[#0c3a55]',
  Error: 'bg-[#fee2e2] dark:bg-[#2a1215]'
};

function WaveKey({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {items.map((it) => (
        <div key={it.label} className="flex items-start gap-2 px-3 py-2 bg-white dark:bg-[#141827] neo-border dark:border-slate-700 rounded-lg text-xs font-bold text-black dark:text-slate-200">
          <svg width="26" height="12" className="flex-shrink-0 mt-0.5">
            {it.dot ? (
              <circle cx="13" cy="6" r="4.5" fill={it.color} />
            ) : (
              <line x1="0" y1="6" x2="26" y2="6" stroke={it.color} strokeWidth="3.5" strokeDasharray={it.dashed ? '6 3' : undefined} />
            )}
          </svg>
          <span>
            <span className={`inline-block mr-1.5 px-1.5 py-px rounded text-[10px] font-black uppercase neo-border dark:border-slate-600 ${ROLE_STYLE[it.role]}`}>
              {it.role}
            </span>
            <span className="font-black">{it.label}</span> — {it.text}
          </span>
        </div>
      ))}
    </div>
  );
}

function LaneLabel({ y, label, sub }) {
  return (
    <g>
      <text x="8" y={sub ? y - 2 : y + 4} fontSize="13" fontWeight="900">{label}</text>
      {sub && <text x="8" y={y + 13} fontSize="11" fontWeight="700">{sub}</text>}
    </g>
  );
}

function Baseline({ y }) {
  return <line x1={X0} y1={y} x2={X0 + W} y2={y} className={strokeCls} strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" />;
}

function Grid({ count, top, bottom }) {
  return (
    <g>
      {Array.from({ length: count + 1 }, (_, i) => (
        <line key={i} x1={X0 + (i * W) / count} y1={top} x2={X0 + (i * W) / count} y2={bottom} className={strokeCls} strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.35" />
      ))}
    </g>
  );
}

// ---------- Topic 6: Digital data → analog signal ----------

const QPSK_PHASE = { '00': 45, '01': 135, '11': 225, '10': 315 };

function DigitalLab({ show }) {
  const [bits, setBits] = useState([1, 0, 1, 1, 0, 0, 1, 0]);
  const [cycles, setCycles] = useState(2);
  const [f1, setF1] = useState(4);
  const [f0, setF0] = useState(2);
  const [low, setLow] = useState(0);
  const has = (k) => show.includes(k);

  const n = bits.length;
  const bw = W / n;
  const at = (t) => {
    const idx = Math.min(n - 1, Math.floor(t * n));
    return { bit: bits[idx], local: t * n - idx };
  };
  const dibits = Array.from({ length: n / 2 }, (_, i) => `${bits[2 * i]}${bits[2 * i + 1]}`);
  const fns = {
    bask: (t) => {
      const { bit, local } = at(t);
      return (bit ? 1 : low) * Math.sin(2 * Math.PI * cycles * local);
    },
    bfsk: (t) => {
      const { bit, local } = at(t);
      return Math.sin(2 * Math.PI * (bit ? f1 : f0) * local);
    },
    bpsk: (t) => {
      const { bit, local } = at(t);
      return Math.sin(2 * Math.PI * cycles * local + (bit ? 0 : Math.PI));
    },
    qpsk: (t) => {
      const s = dibits.length;
      const idx = Math.min(s - 1, Math.floor(t * s));
      const local = t * s - idx;
      return Math.sin(2 * Math.PI * 2 * cycles * local + (QPSK_PHASE[dibits[idx]] * Math.PI) / 180);
    }
  };
  const keyText = {
    bask: 'the carrier with its amplitude switched by each bit (big = 1, small or none = 0).',
    bfsk: 'the carrier with its frequency switched by each bit (fast = 1, slow = 0).',
    bpsk: 'the carrier with its phase flipped by each bit (0° = 1, 180° = 0).',
    qpsk: 'the carrier shifted to one of 4 phases, one for every pair of bits.'
  };
  const meta = {
    bask: { label: 'BASK', sub: 'amplitude', color: M.ask },
    bfsk: { label: 'BFSK', sub: 'frequency', color: M.fsk },
    bpsk: { label: 'BPSK', sub: 'phase', color: M.psk },
    qpsk: { label: 'QPSK', sub: '4 phases', color: M.qpsk }
  };

  // Stack the lanes below the data lane; QPSK gets an extra row for its dibit labels
  const laneTop = (i) => 95 + i * 95 + show.slice(0, i + 1).filter((k) => k === 'qpsk').length * 30;
  const lanes = show.map((k, i) => ({
    key: k,
    y: laneTop(i) + 45,
    labelsY: k === 'qpsk' ? laneTop(i) - 12 : null,
    ...meta[k]
  }));
  const height = laneTop(show.length - 1) + 100;

  let data = '';
  bits.forEach((b, i) => {
    const yy = b ? 37 : 73;
    data += `${i ? ' L' : 'M'} ${X0 + i * bw},${yy} L ${X0 + (i + 1) * bw},${yy}`;
  });
  const toggle = (i) => setBits((prev) => prev.map((b, j) => (j === i ? 1 - b : b)));

  return (
    <Frame>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-black text-black dark:text-slate-200 mr-1">Input bits (click to flip):</span>
        {bits.map((b, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`w-9 h-9 rounded font-mono font-black text-base neo-border cursor-pointer transition-colors ${
              b ? 'bg-[#86efac] text-black' : 'bg-white dark:bg-[#1a2035] text-black dark:text-white dark:border-slate-700'
            }`}
          >
            {b}
          </button>
        ))}
        <button
          onClick={() => setBits(Array.from({ length: n }, () => (Math.random() < 0.5 ? 0 : 1)))}
          className="px-3 h-9 bg-[#fde047] dark:bg-yellow-400 text-black neo-btn text-xs font-black uppercase"
        >
          Random
        </button>
      </div>

      <Controls>
        {(has('bask') || has('bpsk') || has('qpsk')) && (
          <Slider label="Carrier cycles per bit" value={cycles} min={1} max={6} onChange={setCycles} />
        )}
        {has('bask') && (
          <Slider label="BASK amplitude for bit 0" value={low} min={0} max={0.8} step={0.1} onChange={setLow} display={low === 0 ? '0 (OOK)' : low.toFixed(1)} />
        )}
        {has('bfsk') && <Slider label="BFSK cycles for bit 1" value={f1} min={1} max={8} onChange={setF1} />}
        {has('bfsk') && <Slider label="BFSK cycles for bit 0" value={f0} min={1} max={8} onChange={setF0} />}
      </Controls>

      <Panel>
        <svg viewBox={`0 0 1000 ${height}`} className="w-full h-auto">
          <Grid count={n} top={10} bottom={height - 5} />
          <LaneLabel y={55} label="Data" />
          {bits.map((b, i) => (
            <text key={i} x={X0 + (i + 0.5) * bw} y="26" fontSize="14" textAnchor="middle" fontWeight="900">{b}</text>
          ))}
          <path d={data} fill="none" stroke={M.data} strokeWidth="3" />
          {lanes.map((l) => (
            <g key={l.key}>
              {l.labelsY &&
                dibits.map((d, i) => (
                  <g key={i}>
                    <rect x={X0 + i * 2 * bw + 4} y={l.labelsY - 15} width={2 * bw - 8} height="21" rx="4" fill={M.qpsk} fillOpacity="0.15" />
                    <text x={X0 + (i + 0.5) * 2 * bw} y={l.labelsY} fontSize="12" textAnchor="middle" fontWeight="900">
                      {d} → {QPSK_PHASE[d]}°
                    </text>
                  </g>
                ))}
              <LaneLabel y={l.y} label={l.label} sub={l.sub} />
              <Baseline y={l.y} />
              <path d={wave(fns[l.key], l.y, 32)} fill="none" stroke={l.color} strokeWidth="2.2" />
            </g>
          ))}
        </svg>
      </Panel>

      <WaveKey
        items={[
          { color: M.data, role: 'Input', label: 'Data', text: 'the digital bits to send (high = 1, low = 0).' },
          ...lanes.map((l) => ({ color: l.color, role: 'Output', label: l.label, text: `modulated signal: ${keyText[l.key]}` }))
        ]}
      />

      <Readouts>
        {has('bask') && (
          <Readout label="BASK" value={low === 0 ? 'Bit 0 = no carrier (On-Off Keying)' : `Bit 0 = carrier at ${low.toFixed(1)} amplitude`} />
        )}
        {has('bfsk') && (
          <Readout
            label="BFSK frequencies"
            value={f1 === f0 ? 'Same frequency: bits cannot be told apart!' : `Bit 1 = ${f1} cycles, bit 0 = ${f0} cycles`}
            tone={f1 === f0 ? 'bad' : 'good'}
          />
        )}
        {has('bpsk') && <Readout label="BPSK" value={`${n} symbols, 1 bit each (0° / 180°)`} />}
        {has('qpsk') && <Readout label="QPSK" value={`${n / 2} symbols, 2 bits each (4 phases)`} />}
      </Readouts>
    </Frame>
  );
}

// ---------- Topic 7: Analog data → analog signal ----------

function AnalogLab({ show }) {
  const [fm, setFm] = useState(2);
  const [fc, setFc] = useState(24);
  const [m, setM] = useState(0.6);
  const [beta, setBeta] = useState(4);
  const [kp, setKp] = useState(2);
  const has = (k) => show.includes(k);

  const maxBeta = Math.max(0, Math.floor((fc - 2) / fm));
  const b = Math.min(beta, maxBeta);
  const msg = (t) => Math.sin(2 * Math.PI * fm * t);
  const norm = 1 + m;
  const env = (t) => (1 + m * msg(t)) / norm;
  const fns = {
    carrier: (t) => Math.sin(2 * Math.PI * fc * t),
    am: (t) => env(t) * Math.sin(2 * Math.PI * fc * t),
    // FM: instantaneous frequency fc + Δf·msg, with Δf = β·fm
    fm: (t) => Math.sin(2 * Math.PI * fc * t + b * (1 - Math.cos(2 * Math.PI * fm * t))),
    pm: (t) => Math.sin(2 * Math.PI * fc * t + kp * msg(t))
  };
  const meta = {
    carrier: { label: 'Carrier', color: M.carrier, scale: 32 },
    am: { label: 'AM', sub: 'amplitude', color: M.ask, scale: 40 },
    fm: { label: 'FM', sub: 'frequency', color: M.fsk, scale: 32 },
    pm: { label: 'PM', sub: 'phase', color: M.psk, scale: 32 }
  };
  const lanes = show.map((k, i) => ({ key: k, y: 145 + i * 95, ...meta[k] }));
  const height = 145 + show.length * 95 - 35;
  const keyItems = {
    carrier: { color: M.carrier, role: 'Carrier', label: 'Carrier', text: 'plain high-frequency wave before modulation; carries no information.' },
    am: { color: M.ask, role: 'Output', label: 'AM', text: 'modulated signal: the carrier\'s amplitude follows the message.' },
    fm: { color: M.fsk, role: 'Output', label: 'FM', text: 'modulated signal: the carrier\'s waves bunch up and spread out (frequency) with the message.' },
    pm: { color: M.psk, role: 'Output', label: 'PM', text: 'modulated signal: the carrier\'s timing (phase) shifts with the message.' }
  };
  const over = m > 1;

  return (
    <Frame>
      <Controls>
        <Slider label="Message frequency fm" value={fm} min={1} max={4} step={0.5} onChange={setFm} display={`${fm} Hz`} />
        <Slider label="Carrier frequency fc" value={fc} min={10} max={40} onChange={setFc} display={`${fc} Hz`} />
        {has('am') && <Slider label="AM modulation index m" value={m} min={0} max={1.5} step={0.05} onChange={setM} display={m.toFixed(2)} />}
        {has('fm') && <Slider label="FM modulation index β" value={b} min={0} max={maxBeta} step={0.5} onChange={setBeta} display={b.toFixed(1)} />}
        {has('pm') && <Slider label="PM phase deviation" value={kp} min={0} max={6} step={0.25} onChange={setKp} display={`${kp} rad`} />}
      </Controls>

      <Panel>
        <svg viewBox={`0 0 1000 ${height}`} className="w-full h-auto">
          <LaneLabel y={50} label="Message" sub="(audio)" />
          <Baseline y={50} />
          <path d={wave(msg, 50, 32)} fill="none" stroke={M.message} strokeWidth="3" />
          <text x="990" y="100" fontSize="11" textAnchor="end" fontWeight="700">Window = 1 second</text>
          {lanes.map((l) => (
            <g key={l.key}>
              <LaneLabel y={l.y} label={l.label} sub={l.sub} />
              <Baseline y={l.y} />
              <path d={wave(fns[l.key], l.y, l.scale)} fill="none" stroke={l.color} strokeWidth="2" />
              {l.key === 'am' && (
                <g>
                  <path d={wave(env, l.y, l.scale)} fill="none" stroke={over ? M.error : M.message} strokeWidth="2" strokeDasharray="6 4" />
                  <path d={wave((t) => -env(t), l.y, l.scale)} fill="none" stroke={over ? M.error : M.message} strokeWidth="2" strokeDasharray="6 4" />
                </g>
              )}
            </g>
          ))}
        </svg>
      </Panel>

      <WaveKey
        items={[
          { color: M.message, role: 'Input', label: 'Message', text: 'the information to send, e.g. audio (low frequency).' },
          ...(has('carrier') ? [] : [{ color: M.carrier, role: 'Carrier', label: 'Carrier', text: `not drawn here: a plain ${fc} Hz wave that the message modifies.` }]),
          ...lanes.map((l) => keyItems[l.key]),
          ...(has('am') ? [{ color: over ? M.error : M.message, dashed: true, role: 'Output', label: 'Envelope', text: 'outline of the AM wave; it traces the message shape.' }] : [])
        ]}
      />

      <Readouts>
        {has('am') && (
          <Readout
            label="AM: m = A_m / A_c"
            value={over ? `m = ${m.toFixed(2)} > 1 — Overmodulation (envelope distorted)` : `m = ${m.toFixed(2)} ≤ 1 — OK`}
            tone={over ? 'bad' : 'good'}
          />
        )}
        {has('fm') && (
          <Readout label="FM: Δf = β · fm" value={`${b.toFixed(1)} × ${fm} = ${(b * fm).toFixed(1)} Hz (swings ${fc - b * fm}–${fc + b * fm} Hz)`} />
        )}
        {has('pm') && <Readout label="PM: peak phase shift" value={`± ${kp} rad (± ${Math.round((kp * 180) / Math.PI)}°)`} />}
      </Readouts>
    </Frame>
  );
}

// ---------- Topic 8: Analog data → digital signal ----------

const AMP = 0.9;

function AdcLab({ show }) {
  const [f, setF] = useState(2);
  const [fs, setFs] = useState(16);
  const [nBits, setNBits] = useState(3);
  const has = (k) => show.includes(k);
  const quant = has('quantization') || has('encoding');

  const sig = (t) => AMP * Math.sin(2 * Math.PI * f * t);
  const count = Math.floor(fs);
  const times = Array.from({ length: count }, (_, k) => k / fs);
  const xOf = (t) => X0 + t * W;
  const nextX = (k) => xOf(k < times.length - 1 ? times[k + 1] : 1);

  // Nyquist / aliasing
  const nyquistOk = fs >= 2 * f;
  const aliasF = f - fs * Math.round(f / fs);

  // Quantization: mid-rise, L levels between -1 and 1
  const L = 2 ** nBits;
  const step = 2 / L;
  const qIndex = (v) => Math.max(0, Math.min(L - 1, Math.floor((v + 1) / step)));
  const qValue = (i) => -1 + (i + 0.5) * step;
  const samples = times.map((t) => ({ t, v: sig(t), q: qIndex(sig(t)) }));
  let stair = '';
  samples.forEach((s, k) => {
    const yy = 115 - 80 * qValue(s.q);
    stair += `${k ? ' L' : 'M'} ${xOf(s.t).toFixed(1)},${yy.toFixed(1)} L ${nextX(k).toFixed(1)},${yy.toFixed(1)}`;
  });
  const showCodes = count <= 16 && nBits <= 4;

  return (
    <Frame>
      <Controls>
        <Slider label="Signal frequency f (fmax)" value={f} min={1} max={8} step={0.5} onChange={setF} display={`${f} Hz`} />
        <Slider label="Sampling rate fs" value={fs} min={2} max={60} onChange={setFs} display={`${fs} Hz`} />
        {quant && <Slider label="Bits per sample n" value={nBits} min={1} max={6} onChange={setNBits} />}
      </Controls>

      {has('sampling') && (
        <Panel title="Sampling">
          <svg viewBox="0 0 1000 225" className="w-full h-auto">
            <LaneLabel y={110} label="Analog" sub="+ samples" />
            <Baseline y={110} />
            <path d={wave(sig, 110, 85)} fill="none" stroke={M.message} strokeWidth="2.5" />
            {!nyquistOk && (
              <path d={wave((t) => AMP * Math.sin(2 * Math.PI * aliasF * t), 110, 85)} fill="none" stroke={M.error} strokeWidth="2.5" strokeDasharray="7 4" />
            )}
            {samples.map((s, k) => (
              <g key={k}>
                <line x1={xOf(s.t)} y1={110} x2={xOf(s.t)} y2={110 - 85 * s.v} stroke={M.sample} strokeWidth="2" />
                <circle cx={xOf(s.t)} cy={110 - 85 * s.v} r="4.5" fill={M.sample} />
              </g>
            ))}
            {!nyquistOk && (
              <text x="990" y="218" fontSize="12" textAnchor="end" fontWeight="900" fill={M.error}>
                Red dashed: the slower wave the samples suggest (alias, {Math.abs(aliasF).toFixed(1)} Hz)
              </text>
            )}
          </svg>
        </Panel>
      )}

      {quant && (
        <Panel title={has('encoding') ? 'Quantization & Encoding' : 'Quantization'}>
          <svg viewBox="0 0 1000 240" className="w-full h-auto">
            {L <= 32 &&
              Array.from({ length: L }, (_, i) => (
                <g key={i}>
                  <line x1={X0} y1={115 - 80 * qValue(i)} x2={X0 + W} y2={115 - 80 * qValue(i)} className={strokeCls} strokeWidth="1" strokeDasharray="2 4" strokeOpacity="0.4" />
                  {L <= 16 && (
                    <text x={X0 - 6} y={115 - 80 * qValue(i) + 3} fontSize="10" textAnchor="end" fontWeight="900">
                      {has('encoding') ? i.toString(2).padStart(nBits, '0') : `L${i}`}
                    </text>
                  )}
                </g>
              ))}
            <text x="8" y="20" fontSize="13" fontWeight="900">Levels</text>
            <path d={wave(sig, 115, 80)} fill="none" stroke={M.message} strokeWidth="2" strokeOpacity="0.45" />
            <path d={stair} fill="none" stroke={M.sample} strokeWidth="2.5" />
            {!has('encoding') &&
              samples.map((s, k) => (
                <line key={k} x1={xOf(s.t)} y1={115 - 80 * s.v} x2={xOf(s.t)} y2={115 - 80 * qValue(s.q)} stroke={M.error} strokeWidth="3" />
              ))}
            {has('encoding') && showCodes &&
              samples.map((s, k) => (
                <text key={k} x={xOf(s.t) + W / fs / 2} y="230" fontSize={nBits > 3 ? 9 : 11} textAnchor="middle" fontWeight="900" fill={M.data}>
                  {s.q.toString(2).padStart(nBits, '0')}
                </text>
              ))}
            {has('encoding') && !showCodes && (
              <text x="545" y="230" fontSize="12" textAnchor="middle" fontWeight="700">Lower fs (≤ 16) and n (≤ 4) to see each sample's binary code</text>
            )}
            {!has('encoding') && (
              <text x="545" y="230" fontSize="12" textAnchor="middle" fontWeight="700">Red bars = quantization error (difference between sample and its level)</text>
            )}
          </svg>
        </Panel>
      )}

      <WaveKey
        items={[
          { color: M.message, role: 'Input', label: 'Analog signal', text: 'the original continuous signal (faded where it is drawn behind the result).' },
          ...(has('sampling') ? [{ color: M.sample, dot: true, role: 'Output', label: 'Samples', text: 'values measured at regular intervals (sampling).' }] : []),
          ...(has('sampling') && !nyquistOk ? [{ color: M.error, dashed: true, role: 'Error', label: 'Alias', text: 'the wrong, slower wave the samples suggest when fs is too low.' }] : []),
          ...(quant ? [{ color: M.sample, role: 'Output', label: 'Staircase', text: 'each sample rounded to the nearest allowed level (quantization).' }] : []),
          ...(has('quantization') && !has('encoding') ? [{ color: M.error, role: 'Error', label: 'Red bars', text: 'quantization error: gap between the true sample and its level.' }] : []),
          ...(has('encoding') ? [{ color: M.data, dot: true, role: 'Output', label: 'Binary codes', text: 'each level written as n bits; this is the final digital output.' }] : [])
        ]}
      />
    </Frame>
  );
}

// name → which lab and which parts of it to show
const LABS = {
  bask: [DigitalLab, ['bask']],
  bfsk: [DigitalLab, ['bfsk']],
  bpsk: [DigitalLab, ['bpsk']],
  qpsk: [DigitalLab, ['qpsk']],
  am: [AnalogLab, ['am']],
  fm: [AnalogLab, ['fm']],
  pm: [AnalogLab, ['pm']],
  sampling: [AdcLab, ['sampling']],
  quantization: [AdcLab, ['quantization']],
  encoding: [AdcLab, ['encoding']]
};

export default function ModulationLab({ name }) {
  const entry = LABS[name];
  if (!entry) return null;
  const [Lab, show] = entry;
  return <Lab show={show} />;
}
