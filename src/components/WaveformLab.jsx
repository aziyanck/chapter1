import React, { useState } from 'react';
import { Sliders, RefreshCw, Activity } from 'lucide-react';

export default function WaveformLab() {
  const [labMode, setLabMode] = useState('digital-analog');
  
  // Digital-to-Analog parameters
  const [bits, setBits] = useState('10110010');
  const [carrierFreq, setCarrierFreq] = useState(3);
  const [digitalScheme, setDigitalScheme] = useState('ask');

  // Analog-to-Analog parameters
  const [analogScheme, setAnalogScheme] = useState('am');
  const [modIndex, setModIndex] = useState(0.7);
  const [msgFreq, setMsgFreq] = useState(1);

  // PCM parameters
  const [samplingRate, setSamplingRate] = useState(12);
  const [bitDepth, setBitDepth] = useState(3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn text-black dark:text-slate-100">
      
      {/* Header */}
      <div className="bg-[#fef9c3] dark:bg-[#171c2c] neo-border-thick dark:border-slate-700 neo-shadow-lg rounded-2xl p-6 sm:p-8 mb-8 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-[#1a2035] text-black dark:text-white neo-border dark:border-slate-700 text-xs font-black uppercase mb-2">
              <Sliders className="w-3.5 h-3.5 stroke-[2.5]" />
              Virtual Signal Laboratory
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-black dark:text-white uppercase tracking-tight">
              Waveform & Modulation Oscilloscope
            </h2>
            <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-300 mt-1">
              Experiment in real-time with digital passband keying, analog frequency/amplitude modulation, and Nyquist sampling.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex flex-wrap gap-1.5 bg-white dark:bg-[#1a2035] p-1.5 neo-border dark:border-slate-700">
            {[
              { id: 'digital-analog', label: '1. Dig → Analog (ASK/FSK/BPSK)', color: 'bg-[#bae6fd] dark:bg-[#0284c7] dark:text-white' },
              { id: 'analog-analog', label: '2. Analog → Analog (AM/FM)', color: 'bg-[#fbcfe8] dark:bg-[#db2777] dark:text-white' },
              { id: 'pcm', label: '3. Analog → Dig (PCM / Sampling)', color: 'bg-[#bbf7d0] dark:bg-[#16a34a] dark:text-white' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setLabMode(btn.id)}
                className={`px-3 py-1.5 text-xs font-black uppercase transition-all cursor-pointer ${
                  labMode === btn.id
                    ? `${btn.color} text-black neo-border shadow-[2px_2px_0px_0px_#000]`
                    : 'bg-white dark:bg-[#121524] text-black dark:text-slate-300 hover:bg-[#faf5ff] dark:hover:bg-slate-800'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MODE 1: Digital-to-Analog Passband (ASK, FSK, BPSK) */}
      {labMode === 'digital-analog' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#141827] p-5 neo-border-thick dark:border-slate-700 neo-shadow rounded-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div>
              <label className="text-xs font-black uppercase text-black dark:text-slate-200 block mb-2">
                Modulation Technique:
              </label>
              <div className="flex gap-2">
                {['ask', 'fsk', 'bpsk'].map((sch) => (
                  <button
                    key={sch}
                    onClick={() => setDigitalScheme(sch)}
                    className={`px-3 py-1.5 rounded text-xs font-black uppercase neo-btn ${
                      digitalScheme === sch
                        ? 'bg-[#fde047] dark:bg-yellow-400 text-black shadow-[2px_2px_0px_0px_#000]'
                        : 'bg-white dark:bg-[#1a2035] text-black dark:text-white dark:border-slate-700'
                    }`}
                  >
                    {sch}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-black uppercase text-black dark:text-slate-200 block mb-2">
                Binary Bitstream (8 bits):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  maxLength={8}
                  value={bits}
                  onChange={(e) => setBits(e.target.value.replace(/[^01]/g, ''))}
                  className="w-32 px-3 py-1.5 bg-[#fef08a] dark:bg-[#0c0f1a] neo-border dark:border-slate-700 text-black dark:text-white font-mono text-center font-black text-sm"
                />
                <button
                  onClick={() => setBits(Math.random() > 0.5 ? '11001010' : '10110001')}
                  className="p-2 bg-white dark:bg-[#1a2035] neo-border dark:border-slate-700 hover:bg-[#fde047] dark:hover:bg-slate-700 text-black dark:text-white neo-btn"
                  title="Randomize"
                >
                  <RefreshCw className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-black uppercase text-black dark:text-slate-200 mb-2">
                <span>Carrier Frequency:</span>
                <span className="bg-[#bae6fd] dark:bg-[#0369a1] text-black dark:text-white px-1.5 py-0.5 neo-border dark:border-slate-700">{carrierFreq} cycles/bit</span>
              </div>
              <input
                type="range"
                min={2}
                max={5}
                step={1}
                value={carrierFreq}
                onChange={(e) => setCarrierFreq(Number(e.target.value))}
                className="w-full accent-black dark:accent-yellow-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Oscilloscope Display */}
          <div className="bg-white dark:bg-[#141827] p-6 neo-border-thick dark:border-slate-700 neo-shadow-lg rounded-xl relative">
            <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-black dark:border-slate-700">
              <span className="text-xs font-black text-black dark:text-white uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-4 h-4 text-black dark:text-white stroke-[2.5]" />
                Oscilloscope Trace • {digitalScheme.toUpperCase()}
              </span>
              <span className="text-[11px] font-mono font-bold bg-[#f1ebd8] dark:bg-[#0c0f1a] px-2 py-0.5 neo-border dark:border-slate-700 text-black dark:text-slate-300">
                50 mV/div • 1 ms/div
              </span>
            </div>

            <div className="bg-[#faf8f5] dark:bg-[#07090e] neo-border dark:border-slate-700 rounded-lg p-2 overflow-x-auto">
              <svg viewBox={`0 0 ${bits.length * 80 + 80} 220`} className="w-full min-w-[500px] h-56">
                {[30, 75, 120, 165, 210].map((y, i) => (
                  <line key={i} x1="40" y1={y} x2={bits.length * 80 + 60} y2={y} stroke="#cbd5e1" strokeOpacity="0.4" strokeWidth="1" />
                ))}

                {bits.split('').map((bit, idx) => (
                  <g key={idx} transform={`translate(${50 + idx * 80}, 20)`}>
                    <rect x="0" y="0" width="80" height="22" fill="#fde047" stroke="#000000" strokeWidth="2" />
                    <text x="40" y="16" fill="#000000" fontSize="13" fontWeight="black" textAnchor="middle" fontFamily="monospace">
                      {bit}
                    </text>
                    <line x1="0" y1="22" x2="0" y2="200" stroke="#cbd5e1" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 3" />
                  </g>
                ))}
                <line x1={50 + bits.length * 80} y1="42" x2={50 + bits.length * 80} y2="200" stroke="#cbd5e1" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="3 3" />

                <line x1="40" y1="120" x2={bits.length * 80 + 60} y2="120" stroke="#64748b" strokeWidth="1.5" />

                {(() => {
                  let pts = [];
                  for (let b = 0; b < bits.length; b++) {
                    const bit = Number(bits[b]);
                    const startX = 50 + b * 80;
                    for (let x = 0; x <= 80; x += 1.5) {
                      let y = 0;
                      if (digitalScheme === 'ask') {
                        const amp = bit === 1 ? 50 : 10;
                        y = amp * Math.sin((x / 80) * carrierFreq * 2 * Math.PI);
                      } else if (digitalScheme === 'fsk') {
                        const f = bit === 1 ? carrierFreq : Math.max(1, carrierFreq - 1.5);
                        y = 45 * Math.sin((x / 80) * f * 2 * Math.PI);
                      } else if (digitalScheme === 'bpsk') {
                        const phase = bit === 1 ? 0 : Math.PI;
                        y = 45 * Math.sin((x / 80) * carrierFreq * 2 * Math.PI + phase);
                      }
                      pts.push(`${startX + x},${120 - y}`);
                    }
                  }
                  return (
                    <polyline
                      fill="none"
                      stroke={digitalScheme === 'ask' ? '#38bdf8' : digitalScheme === 'fsk' ? '#4ade80' : '#fb923c'}
                      strokeWidth="3.5"
                      points={pts.join(' ')}
                    />
                  );
                })()}
              </svg>
            </div>

            <div className="mt-4 p-3 bg-[#faf8f5] dark:bg-[#0c0f1a] neo-border dark:border-slate-700 text-xs font-bold text-black dark:text-slate-300">
              <strong className="uppercase font-black text-black dark:text-white mr-2">Modulation Principle:</strong>
              {digitalScheme === 'ask' && 'ASK modulates carrier peak amplitude with bit value. Vulnerable to atmospheric noise.'}
              {digitalScheme === 'fsk' && 'FSK shifts carrier frequency between mark and space. Constant envelope prevents amplifier distortion.'}
              {digitalScheme === 'bpsk' && 'BPSK introduces 180° carrier phase reversals. Highest noise immunity per bit energy.'}
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: Analog-to-Analog Modulation (AM vs FM) */}
      {labMode === 'analog-analog' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#141827] p-5 neo-border-thick dark:border-slate-700 neo-shadow rounded-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div>
              <label className="text-xs font-black uppercase text-black dark:text-slate-200 block mb-2">
                Modulation Type:
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setAnalogScheme('am')}
                  className={`px-4 py-2 text-xs font-black uppercase neo-btn ${
                    analogScheme === 'am'
                      ? 'bg-[#fde047] dark:bg-yellow-400 text-black shadow-[2px_2px_0px_0px_#000]'
                      : 'bg-white dark:bg-[#1a2035] text-black dark:text-white dark:border-slate-700'
                  }`}
                >
                  AM (Amplitude)
                </button>
                <button
                  onClick={() => setAnalogScheme('fm')}
                  className={`px-4 py-2 text-xs font-black uppercase neo-btn ${
                    analogScheme === 'fm'
                      ? 'bg-[#fde047] dark:bg-yellow-400 text-black shadow-[2px_2px_0px_0px_#000]'
                      : 'bg-white dark:bg-[#1a2035] text-black dark:text-white dark:border-slate-700'
                  }`}
                >
                  FM (Frequency)
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-black uppercase text-black dark:text-slate-200 mb-2">
                <span>Modulation Index ({analogScheme === 'am' ? 'μ' : 'β'}):</span>
                <span className={modIndex > 1.0 && analogScheme === 'am' ? 'bg-[#fecaca] text-[#b91c1c] px-1.5 py-0.5 neo-border' : 'bg-[#fed7aa] dark:bg-[#9a3412] text-black dark:text-white px-1.5 py-0.5 neo-border dark:border-slate-700'}>
                  {modIndex.toFixed(2)} {modIndex > 1.0 && analogScheme === 'am' && '(Overmod!)'}
                </span>
              </div>
              <input
                type="range"
                min={0.2}
                max={1.4}
                step={0.05}
                value={modIndex}
                onChange={(e) => setModIndex(Number(e.target.value))}
                className="w-full accent-black dark:accent-yellow-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-black uppercase text-black dark:text-slate-200 mb-2">
                <span>Message Frequency (fm):</span>
                <span className="bg-[#bbf7d0] dark:bg-[#15803d] text-black dark:text-white px-1.5 py-0.5 neo-border dark:border-slate-700">{msgFreq} kHz</span>
              </div>
              <input
                type="range"
                min={1}
                max={3}
                step={1}
                value={msgFreq}
                onChange={(e) => setMsgFreq(Number(e.target.value))}
                className="w-full accent-black dark:accent-yellow-400 cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-[#141827] p-6 neo-border-thick dark:border-slate-700 neo-shadow-lg rounded-xl">
            <div className="bg-[#faf8f5] dark:bg-[#07090e] neo-border dark:border-slate-700 rounded-lg p-2">
              <svg viewBox="0 0 600 200" className="w-full h-56">
                <line x1="30" y1="100" x2="570" y2="100" stroke="#64748b" strokeWidth="1.5" />

                {(() => {
                  let pts = [];
                  for (let x = 0; x <= 520; x += 1.5) {
                    let y = 0;
                    const t = x / 520;
                    if (analogScheme === 'am') {
                      const envelope = 45 * (1 + modIndex * Math.sin(t * msgFreq * 2 * Math.PI));
                      y = envelope * Math.sin(t * 36 * Math.PI);
                    } else {
                      const phase = t * 32 * Math.PI - (modIndex * 8) * Math.cos(t * msgFreq * 2 * Math.PI);
                      y = 45 * Math.sin(phase);
                    }
                    pts.push(`${40 + x},${100 - y}`);
                  }
                  return (
                    <polyline
                      fill="none"
                      stroke={analogScheme === 'am' ? '#38bdf8' : '#c084fc'}
                      strokeWidth="2.5"
                      points={pts.join(' ')}
                    />
                  );
                })()}
              </svg>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs font-bold">
              <div className="p-3 bg-[#e0f2fe] dark:bg-[#132238] neo-border dark:border-slate-700">
                <span className="font-black uppercase text-black dark:text-white">Transmitted Power:</span>
                <div className="font-mono text-sm text-black dark:text-sky-300 mt-1 font-black">
                  {analogScheme === 'am'
                    ? `Pt = Pc × (1 + ${(modIndex ** 2 / 2).toFixed(3)}) = ${(1 + modIndex ** 2 / 2).toFixed(2)} Pc`
                    : 'Pt = Pc (Independent of modulation index)'}
                </div>
              </div>
              <div className="p-3 bg-[#fef08a] dark:bg-[#182035] neo-border dark:border-slate-700">
                <span className="font-black uppercase text-black dark:text-white">Occupied Bandwidth:</span>
                <div className="font-mono text-sm text-black dark:text-yellow-300 mt-1 font-black">
                  {analogScheme === 'am'
                    ? `B = 2 × fm = ${2 * msgFreq} kHz`
                    : `Carson's Rule B ≈ ${(2 * msgFreq * (modIndex + 1)).toFixed(1)} kHz`}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: PCM Sampling & Quantization */}
      {labMode === 'pcm' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#141827] p-5 neo-border-thick dark:border-slate-700 neo-shadow rounded-xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="flex justify-between text-xs font-black uppercase text-black dark:text-slate-200 mb-2">
                <span>Sampling Rate (fs):</span>
                <span className={samplingRate < 6 ? 'bg-[#fecaca] text-[#b91c1c] px-1.5 py-0.5 neo-border' : 'bg-[#bbf7d0] dark:bg-[#15803d] text-black dark:text-white px-1.5 py-0.5 neo-border dark:border-slate-700'}>
                  {samplingRate} samples/cycle {samplingRate < 6 && '(Aliasing!)'}
                </span>
              </div>
              <input
                type="range"
                min={4}
                max={24}
                step={2}
                value={samplingRate}
                onChange={(e) => setSamplingRate(Number(e.target.value))}
                className="w-full accent-black dark:accent-yellow-400 cursor-pointer"
              />
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-400 mt-1 block">
                Nyquist Condition: fs ≥ 2 × fmax
              </span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-black uppercase text-black dark:text-slate-200 mb-2">
                <span>Quantization Bit Depth (n):</span>
                <span className="bg-[#fef08a] dark:bg-[#182035] text-black dark:text-white px-1.5 py-0.5 neo-border dark:border-slate-700">
                  {bitDepth} bits ({2 ** bitDepth} levels)
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={4}
                step={1}
                value={bitDepth}
                onChange={(e) => setBitDepth(Number(e.target.value))}
                className="w-full accent-black dark:accent-yellow-400 cursor-pointer"
              />
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-400 mt-1 block">
                SQNR ≈ (6.02 × {bitDepth} + 1.76) = {(6.02 * bitDepth + 1.76).toFixed(2)} dB
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#141827] p-6 neo-border-thick dark:border-slate-700 neo-shadow-lg rounded-xl">
            <div className="bg-[#faf8f5] dark:bg-[#07090e] neo-border dark:border-slate-700 rounded-lg p-2">
              <svg viewBox="0 0 600 220" className="w-full h-56">
                {Array.from({ length: 2 ** bitDepth }).map((_, i) => {
                  const y = 30 + (i * 160) / (2 ** bitDepth - 1);
                  return (
                    <line
                      key={i}
                      x1="40"
                      y1={y}
                      x2="560"
                      y2={y}
                      stroke="#475569"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                  );
                })}

                {(() => {
                  let pts = [];
                  for (let x = 0; x <= 500; x += 3) {
                    const y = 110 - 70 * Math.sin((x / 500) * 2 * Math.PI);
                    pts.push(`${50 + x},${y}`);
                  }
                  return <polyline fill="none" stroke="#f59e0b" strokeWidth="2.5" points={pts.join(' ')} opacity="0.6" />;
                })()}

                {Array.from({ length: samplingRate }).map((_, sIdx) => {
                  const x = 50 + (sIdx * 500) / (samplingRate - 1);
                  const analogY = 110 - 70 * Math.sin(((sIdx / (samplingRate - 1)) * 2 * Math.PI));
                  const levels = Array.from({ length: 2 ** bitDepth }).map(
                    (_, i) => 30 + (i * 160) / (2 ** bitDepth - 1)
                  );
                  const quantY = levels.reduce((prev, curr) =>
                    Math.abs(curr - analogY) < Math.abs(prev - analogY) ? curr : prev
                  );

                  return (
                    <g key={sIdx}>
                      <line x1={x} y1="110" x2={x} y2={analogY} stroke="#38bdf8" strokeWidth="2.5" />
                      <circle cx={x} cy={quantY} r="4.5" fill="#c084fc" stroke="#000000" strokeWidth="1.5" />
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="mt-4 p-3 bg-[#f1ebd8] dark:bg-[#0c0f1a] neo-border dark:border-slate-700 text-xs font-bold text-black dark:text-slate-200 flex items-center justify-between">
              <div>
                <strong className="uppercase font-black text-black dark:text-white">PCM Bitrate:</strong>{' '}
                <span className="font-mono font-black text-black dark:text-yellow-300">Rb = n × fs = {bitDepth} × {samplingRate} kSps = {bitDepth * samplingRate} kbps</span>
              </div>
              <span className="bg-white dark:bg-[#1a2035] text-black dark:text-white px-2 py-0.5 neo-border dark:border-slate-700 font-black">Levels: {2 ** bitDepth}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
