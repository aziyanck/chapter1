import React, { useState, useRef } from 'react';
import { Radio, Layers, Wifi, Activity, Zap, RefreshCw } from 'lucide-react';
import { Ripples, useStillFrame } from './diagramParts';
import { WirelessFlow } from './AntennaDiagrams';
import { polar, arc, omniPattern, directionalPattern } from './diagramTheme';

export default function TopicVisuals({ topicNumber }) {
  // Common states for interactive tabs inside diagrams
  const [antennaType, setAntennaType] = useState('dipole');
  const [propMode, setPropMode] = useState('all');
  const [fadingType, setFadingType] = useState('multipath');
  const [lineCodeBits, setLineCodeBits] = useState('10110010');
  const [modScheme, setModScheme] = useState('ask');
  const [analogModType, setAnalogModType] = useState('am');
  const [pcmStep, setPcmStep] = useState('all');
  const animRef = useRef(null);
  useStillFrame(animRef);

  switch (topicNumber) {
    case 1:
      // Topic 1: Wireless Comm Technology Architecture (aligned with topic1.md)
      return (
        <div ref={animRef} className="bg-white dark:bg-[#141827] rounded-xl p-6 neo-border-thick dark:border-slate-700 neo-shadow text-black dark:text-slate-100 transition-colors">
          <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-black dark:border-slate-700">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-black dark:text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-black dark:text-white stroke-[2.5]" />
              Basic Principle: The 5-Step Wireless Flow
            </h4>
            <span className="text-[11px] font-black uppercase px-2 py-0.5 bg-[#fef08a] dark:bg-yellow-400 text-black neo-border">
              From Topic 1
            </span>
          </div>

          <div className="p-4 bg-[#faf8f5] dark:bg-[#07090e] neo-border dark:border-slate-700 rounded-xl">
            <WirelessFlow />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 my-4">
            {[
              { num: "1", label: "Transmitter", sub: "Converts info to signals", bg: "bg-[#dbeafe] dark:bg-[#1e3a8a] text-black dark:text-white" },
              { num: "2", label: "Tx Antenna", sub: "Sends EM waves through air", bg: "bg-[#fef08a] dark:bg-[#854d0e] text-black dark:text-white" },
              { num: "3", label: "Wireless Channel", sub: "Carries signals to destination", bg: "bg-[#fed7aa] dark:bg-[#9a3412] text-black dark:text-white" },
              { num: "4", label: "Rx Antenna", sub: "Receives transmitted waves", bg: "bg-[#e9d5ff] dark:bg-[#581c87] text-black dark:text-white" },
              { num: "5", label: "Receiver", sub: "Converts back to information", bg: "bg-[#bbf7d0] dark:bg-[#14532d] text-black dark:text-white" }
            ].map((blk, idx) => (
              <div key={idx} style={{ animationDelay: `${idx * 1.2}s` }} className={`flow-step p-4 rounded-xl neo-border dark:border-slate-700 ${blk.bg} flex flex-col justify-center text-center shadow-[3px_3px_0px_0px_#000] relative`}>
                <span className="w-6 h-6 rounded bg-white dark:bg-[#0c0f1a] text-black dark:text-white neo-border dark:border-slate-700 font-black text-xs mx-auto mb-1 flex items-center justify-center">
                  {blk.num}
                </span>
                <span className="text-xs font-black">{blk.label}</span>
                <span className="text-[11px] font-bold opacity-80 mt-1">{blk.sub}</span>
                {idx < 4 && (
                  <div className="hidden sm:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-black dark:text-white font-black text-xs">
                    ➔
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 4 Core Components Summary */}
          <div className="mt-6 pt-4 border-t-2 border-black dark:border-slate-700">
            <h5 className="text-xs font-black text-black dark:text-white uppercase tracking-wide mb-3">
              The 4 Core Building Block Components
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 bg-[#f1ebd8] dark:bg-[#0c0f1a] neo-border dark:border-slate-700 font-bold">
                <div className="font-black text-black dark:text-white uppercase">Transmitter</div>
                <div className="text-[10px] text-slate-700 dark:text-slate-400 mt-0.5">Sends information</div>
              </div>
              <div className="p-2.5 bg-[#fef08a] dark:bg-[#1e2740] neo-border dark:border-slate-700 font-bold">
                <div className="font-black text-black dark:text-white uppercase">Antenna</div>
                <div className="text-[10px] text-slate-700 dark:text-slate-400 mt-0.5">Transmits & receives waves</div>
              </div>
              <div className="p-2.5 bg-[#dbeafe] dark:bg-[#132238] neo-border dark:border-slate-700 font-bold">
                <div className="font-black text-black dark:text-white uppercase">Channel</div>
                <div className="text-[10px] text-slate-700 dark:text-slate-400 mt-0.5">Medium through air</div>
              </div>
              <div className="p-2.5 bg-[#bbf7d0] dark:bg-[#064e3b] neo-border dark:border-slate-700 font-bold">
                <div className="font-black text-black dark:text-white uppercase">Receiver</div>
                <div className="text-[10px] text-slate-700 dark:text-slate-400 mt-0.5">Receives & processes</div>
              </div>
            </div>
          </div>
        </div>
      );

    case 2:
      // Topic 2: Antennas - Radiation Patterns & Types
      return (
        <div className="bg-white dark:bg-[#141827] rounded-xl p-6 neo-border-thick dark:border-slate-700 neo-shadow text-black dark:text-slate-100 transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-2 border-b-2 border-black dark:border-slate-700">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-black dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-black dark:text-white stroke-[2.5]" />
              Antenna Radiation Patterns & Structures
            </h4>
            <div className="flex flex-wrap gap-1 bg-[#f1ebd8] dark:bg-[#0c0f1a] p-1 neo-border dark:border-slate-700">
              {[
                { id: 'dipole', label: 'Half-Wave Dipole' },
                { id: 'directional', label: 'Directional / Horn' },
                { id: 'patch', label: 'Microstrip Patch' },
                { id: 'yagi', label: 'Yagi-Uda Array' }
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setAntennaType(btn.id)}
                  className={`px-2.5 py-1 text-xs font-black uppercase transition-all cursor-pointer ${
                    antennaType === btn.id
                      ? 'bg-[#fde047] dark:bg-yellow-400 text-black neo-border shadow-[1.5px_1.5px_0px_0px_#000]'
                      : 'bg-white dark:bg-[#1a2035] text-black dark:text-slate-200 dark:border-slate-700 hover:bg-[#faf5ff] dark:hover:bg-slate-700'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* SVG Visualizer */}
            <div ref={animRef} className="bg-[#faf8f5] dark:bg-[#07090e] rounded-xl p-4 neo-border dark:border-slate-700 flex flex-col items-center justify-center relative min-h-[220px]">
              <svg viewBox="0 0 320 200" className="w-full h-48">
                {antennaType === 'dipole' && (
                  <g>
                    {/* Dipole center element */}
                    <line x1="160" y1="45" x2="160" y2="95" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
                    <circle cx="160" cy="100" r="4" fill="#facc15" stroke="#000000" strokeWidth="1.5" />
                    <line x1="160" y1="105" x2="160" y2="155" stroke="#000000" strokeWidth="5" strokeLinecap="round" />
                    {/* Donut radiation pattern lobes */}
                    <ellipse cx="110" cy="100" rx="46" ry="34" fill="#bae6fd" stroke="#000000" strokeWidth="2.5" opacity="0.8" />
                    <ellipse cx="210" cy="100" rx="46" ry="34" fill="#bae6fd" stroke="#000000" strokeWidth="2.5" opacity="0.8" />
                    <Ripples cx={160} cy={100} d={omniPattern(96)} color="#0284c7" dur={2.4} width={2} />
                    <text x="160" y="25" fill="#000000" fontSize="11" textAnchor="middle" fontWeight="bold">Omnidirectional in H-plane (Donut 3D)</text>
                    <text x="110" y="105" fill="#000000" fontSize="11" textAnchor="middle" fontWeight="black" className="keep-dark">Lobe 1</text>
                    <text x="210" y="105" fill="#000000" fontSize="11" textAnchor="middle" fontWeight="black" className="keep-dark">Lobe 2</text>
                    <text x="160" y="185" fill="#000000" fontSize="11" textAnchor="middle" fontWeight="black">Length = λ/2 | Gain = 2.15 dBi</text>
                  </g>
                )}
                {antennaType === 'directional' && (
                  <g>
                    {/* Horn / Reflector feed */}
                    <polygon points="40,90 70,80 70,120 40,110" fill="#fde047" stroke="#000000" strokeWidth="2.5" />
                    {/* High Gain Main Lobe */}
                    <path d="M 70,100 C 140,50 290,70 300,100 C 290,130 140,150 70,100" fill="#fef08a" stroke="#000000" strokeWidth="3" />
                    {/* Side lobes */}
                    <ellipse cx="100" cy="65" rx="18" ry="12" fill="#fed7aa" stroke="#000000" strokeWidth="2" />
                    <ellipse cx="100" cy="135" rx="18" ry="12" fill="#fed7aa" stroke="#000000" strokeWidth="2" />
                    {/* Back lobe */}
                    <ellipse cx="25" cy="100" rx="12" ry="8" fill="#fecaca" stroke="#000000" strokeWidth="2" />
                    <Ripples cx={70} cy={100} d={directionalPattern(8, 230)} color="#c026d3" dur={2.4} width={2} />
                    <text x="200" y="104" fill="#000000" fontSize="12" fontWeight="black" className="keep-dark">Main Lobe (HPBW ≈ 25°)</text>
                    <text x="145" y="60" fill="#000000" fontSize="10" fontWeight="bold" className="keep-dark">Side Lobe</text>
                    <text x="160" y="185" fill="#000000" fontSize="11" textAnchor="middle" fontWeight="bold">Narrow Beamwidth • High Gain (15–35 dBi)</text>
                  </g>
                )}
                {antennaType === 'patch' && (
                  <g>
                    {/* Microstrip Substrate and Patch */}
                    <polygon points="70,120 250,120 280,100 100,100" fill="#e2e8f0" stroke="#000000" strokeWidth="2.5" />
                    <rect x="70" y="120" width="180" height="15" fill="#94a3b8" stroke="#000000" strokeWidth="2" />
                    <polygon points="110,115 210,115 230,105 130,105" fill="#f59e0b" stroke="#000000" strokeWidth="2" />
                    {/* Broadside radiation lobe */}
                    <path d="M 170,105 C 130,30 210,30 170,105" fill="#fed7aa" stroke="#000000" strokeWidth="2.5" />
                    <Ripples cx={170} cy={105} d={polar((a) => (Math.sin(a) > 0 ? 70 * Math.sin(a) ** 3 : 0))} color="#f59e0b" dur={2.4} width={2} />
                    <text x="170" y="25" fill="#000000" fontSize="11" textAnchor="middle" fontWeight="black">Broadside Hemispherical Pattern</text>
                    <text x="170" y="165" fill="#000000" fontSize="11" textAnchor="middle" fontWeight="bold">Planar & Compact for Smartphones & Laptops</text>
                  </g>
                )}
                {antennaType === 'yagi' && (
                  <g>
                    {/* Boom line */}
                    <line x1="50" y1="100" x2="270" y2="100" stroke="#000000" strokeWidth="4" />
                    {/* Reflector (longest) */}
                    <line x1="70" y1="50" x2="70" y2="150" stroke="#ef4444" strokeWidth="5" />
                    <text x="70" y="42" fill="#000000" fontSize="10" textAnchor="middle" fontWeight="black">Reflector</text>
                    {/* Driven element */}
                    <line x1="120" y1="60" x2="120" y2="140" stroke="#0284c7" strokeWidth="5" />
                    <text x="120" y="52" fill="#000000" fontSize="10" textAnchor="middle" fontWeight="black">Driven</text>
                    {/* Directors (shorter) */}
                    <line x1="170" y1="68" x2="170" y2="132" stroke="#16a34a" strokeWidth="4" />
                    <line x1="220" y1="74" x2="220" y2="126" stroke="#16a34a" strokeWidth="4" />
                    <line x1="260" y1="78" x2="260" y2="122" stroke="#16a34a" strokeWidth="4" />
                    <text x="215" y="60" fill="#000000" fontSize="10" textAnchor="middle" fontWeight="black">Directors</text>
                    <path d="M 270,100 L 295,100" stroke="#000000" strokeWidth="3" />
                    <polygon points="295,95 305,100 295,105" fill="#000000" />
                    <Ripples cx={120} cy={100} d={arc(190, 14)} color="#0284c7" count={4} dur={2.4} width={2} />
                    <text x="160" y="180" fill="#000000" fontSize="11" textAnchor="middle" fontWeight="bold">Direction of Radiation (Forward Gain: 8–18 dBi)</text>
                  </g>
                )}
              </svg>
            </div>

            {/* Parameter Summary Box */}
            <div className="space-y-3 text-xs bg-[#faf8f5] dark:bg-[#0c0f1a] p-4 neo-border dark:border-slate-700">
              <div className="font-black text-sm text-black dark:text-white uppercase">
                {antennaType === 'dipole' && 'Half-Wave Dipole Antenna (λ/2)'}
                {antennaType === 'directional' && 'Directional Horn / Reflector Antenna'}
                {antennaType === 'patch' && 'Microstrip Patch Antenna'}
                {antennaType === 'yagi' && 'Yagi-Uda Directional Array'}
              </div>
              <p className="text-slate-800 dark:text-slate-300 font-semibold leading-relaxed">
                {antennaType === 'dipole' &&
                  'The fundamental reference antenna. Symmetrical two-conductor system fed at center. Donut-shaped pattern with 73 Ω radiation resistance.'}
                {antennaType === 'directional' &&
                  'Focuses wave into a tight beam, rejecting unwanted noise. Essential for long-distance microwave and satellite communication links.'}
                {antennaType === 'patch' &&
                  'Etched on a PCB backed by ground plane. Inexpensive, light, low-profile, integrated into mobile devices and IoT nodes.'}
                {antennaType === 'yagi' &&
                  'Driven element with parasitic reflector and directors. Passive mutual coupling yields sharp forward gain for point-to-point links.'}
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t-2 border-black dark:border-slate-700 font-black">
                <div>
                  <span className="text-slate-700 dark:text-slate-400">Gain:</span>{' '}
                  <span className="bg-[#fde047] dark:bg-yellow-400 text-black px-1 neo-border">
                    {antennaType === 'dipole' ? '2.15 dBi' : antennaType === 'directional' ? '15 - 45 dBi' : antennaType === 'patch' ? '5 - 8 dBi' : '8 - 18 dBi'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-700 dark:text-slate-400">Polarization:</span>{' '}
                  <span className="bg-[#bae6fd] dark:bg-[#0369a1] text-black dark:text-white px-1 neo-border">
                    {antennaType === 'patch' ? 'Linear / Circular' : 'Linear'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 3:
      // Topic 3: Propagation Modes - Ground Wave, Sky Wave, LOS
      return (
        <div className="bg-white dark:bg-[#141827] rounded-xl p-6 neo-border-thick dark:border-slate-700 neo-shadow text-black dark:text-slate-100 transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-2 border-b-2 border-black dark:border-slate-700">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-black dark:text-white flex items-center gap-2">
              <Wifi className="w-4 h-4 text-black dark:text-white stroke-[2.5]" />
              Radio Wave Propagation Modes
            </h4>
            <div className="flex gap-1.5 bg-[#f1ebd8] dark:bg-[#0c0f1a] p-1 neo-border dark:border-slate-700">
              {[
                { id: 'all', label: 'All Modes' },
                { id: 'ground', label: 'Ground Wave' },
                { id: 'sky', label: 'Sky Wave' },
                { id: 'los', label: 'Line-of-Sight' }
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setPropMode(btn.id)}
                  className={`px-2.5 py-1 text-xs font-black uppercase transition-all cursor-pointer ${
                    propMode === btn.id
                      ? 'bg-[#fde047] dark:bg-yellow-400 text-black neo-border shadow-[1.5px_1.5px_0px_0px_#000]'
                      : 'bg-white dark:bg-[#1a2035] text-black dark:text-slate-200 dark:border-slate-700 hover:bg-[#faf5ff] dark:hover:bg-slate-700'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#faf8f5] dark:bg-[#07090e] rounded-xl p-4 neo-border dark:border-slate-700 flex flex-col items-center">
            <svg viewBox="0 0 600 240" className="w-full h-56">
              {/* Ionosphere layer */}
              {(propMode === 'all' || propMode === 'sky') && (
                <g>
                  <path d="M 50,40 Q 300,10 550,40" fill="none" stroke="#fbcfe8" strokeWidth="16" />
                  <path d="M 50,40 Q 300,10 550,40" fill="none" stroke="#000000" strokeWidth="2.5" strokeDasharray="6 4" />
                  <text x="300" y="30" fill="#000000" fontSize="12" textAnchor="middle" fontWeight="black" className="keep-dark">
                    Ionosphere (D, E, F1, F2 Layers: 60 - 400 km)
                  </text>
                </g>
              )}

              {/* Earth Curvature */}
              <path d="M 20,220 Q 300,160 580,220 L 580,240 L 20,240 Z" fill="#e2e8f0" stroke="#000000" strokeWidth="3" />
              <text x="300" y="210" fill="#000000" fontSize="11" textAnchor="middle" fontWeight="black" className="keep-dark">Curved Earth Surface</text>

              {/* Transmit Tower */}
              <g transform="translate(100, 160)">
                <line x1="0" y1="0" x2="0" y2="-40" stroke="#000000" strokeWidth="4" />
                <polygon points="-8,-40 8,-40 0,-52" fill="#facc15" stroke="#000000" strokeWidth="2" />
                <text x="0" y="16" fill="#000000" fontSize="10" textAnchor="middle" fontWeight="black">Tx Tower</text>
              </g>

              {/* Receive Tower 1 (LOS) */}
              <g transform="translate(260, 155)">
                <line x1="0" y1="0" x2="0" y2="-35" stroke="#000000" strokeWidth="4" />
                <polygon points="-6,-35 6,-35 0,-46" fill="#38bdf8" stroke="#000000" strokeWidth="2" />
                <text x="0" y="16" fill="#000000" fontSize="10" textAnchor="middle" fontWeight="black">Rx (LOS)</text>
              </g>

              {/* Receive Station 2 (Skywave) */}
              <g transform="translate(480, 175)">
                <line x1="0" y1="0" x2="0" y2="-35" stroke="#000000" strokeWidth="4" />
                <polygon points="-6,-35 6,-35 0,-46" fill="#a855f7" stroke="#000000" strokeWidth="2" />
                <text x="0" y="16" fill="#000000" fontSize="10" textAnchor="middle" fontWeight="black">Rx (Skywave)</text>
              </g>

              {/* Mode 1: Ground Wave */}
              {(propMode === 'all' || propMode === 'ground') && (
                <g>
                  <path d="M 100,160 Q 180,150 260,155" fill="none" stroke="#16a34a" strokeWidth="4" strokeDasharray="5 3" />
                  <text x="180" y="145" fill="#15803d" fontSize="11" textAnchor="middle" fontWeight="black">
                    Ground Wave (&lt; 2 MHz)
                  </text>
                </g>
              )}

              {/* Mode 2: LOS Space wave */}
              {(propMode === 'all' || propMode === 'los') && (
                <g>
                  <line x1="100" y1="110" x2="260" y2="120" stroke="#0284c7" strokeWidth="3.5" />
                  <ellipse cx="180" cy="115" rx="55" ry="12" fill="none" stroke="#000000" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="180" y="96" fill="#0369a1" fontSize="11" textAnchor="middle" fontWeight="black">
                    LOS Space Wave (&gt; 30 MHz)
                  </text>
                </g>
              )}

              {/* Mode 3: Skywave */}
              {(propMode === 'all' || propMode === 'sky') && (
                <g>
                  <path d="M 100,110 Q 290,20 480,135" fill="none" stroke="#c026d3" strokeWidth="3.5" />
                  <text x="290" y="60" fill="#a21caf" fontSize="11" textAnchor="middle" fontWeight="black">
                    Sky Wave (3 – 30 MHz HF)
                  </text>
                  <line x1="270" y1="190" x2="470" y2="190" stroke="#000000" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="370" y="185" fill="#000000" fontSize="10" textAnchor="middle" fontWeight="bold">Skip Distance</text>
                </g>
              )}
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-xs">
            <div className={`p-3 rounded neo-border dark:border-slate-700 ${propMode === 'ground' ? 'bg-[#bbf7d0] dark:bg-[#064e3b] dark:text-white' : 'bg-[#faf8f5] dark:bg-[#0c0f1a] text-black dark:text-slate-200'}`}>
              <span className="font-black uppercase">Ground Wave (&lt; 2 MHz)</span>
              <p className="text-slate-800 dark:text-slate-300 font-bold mt-1">Follows earth curvature via surface diffraction. AM radio and maritime.</p>
            </div>
            <div className={`p-3 rounded neo-border dark:border-slate-700 ${propMode === 'sky' ? 'bg-[#fbcfe8] dark:bg-[#831843] dark:text-white' : 'bg-[#faf8f5] dark:bg-[#0c0f1a] text-black dark:text-slate-200'}`}>
              <span className="font-black uppercase">Sky Wave (3–30 MHz)</span>
              <p className="text-slate-800 dark:text-slate-300 font-bold mt-1">Refracts through ionospheric ionized layers for international shortwave.</p>
            </div>
            <div className={`p-3 rounded neo-border dark:border-slate-700 ${propMode === 'los' ? 'bg-[#bae6fd] dark:bg-[#0369a1] dark:text-white' : 'bg-[#faf8f5] dark:bg-[#0c0f1a] text-black dark:text-slate-200'}`}>
              <span className="font-black uppercase">Line-of-Sight (&gt; 30 MHz)</span>
              <p className="text-slate-800 dark:text-slate-300 font-bold mt-1">Direct straight path requiring Fresnel clearance. Cellular towers & Wi-Fi.</p>
            </div>
          </div>
        </div>
      );

    case 4:
      // Topic 4: Fading in Mobile Environment
      return (
        <div className="bg-white dark:bg-[#141827] rounded-xl p-6 neo-border-thick dark:border-slate-700 neo-shadow text-black dark:text-slate-100 transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-2 border-b-2 border-black dark:border-slate-700">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-black dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-black dark:text-white stroke-[2.5]" />
              Multipath Fading & Doppler Shift Simulator
            </h4>
            <div className="flex gap-1.5 bg-[#f1ebd8] dark:bg-[#0c0f1a] p-1 neo-border dark:border-slate-700">
              {[
                { id: 'multipath', label: 'Multipath Geometry' },
                { id: 'rayleigh', label: 'Rayleigh vs Rician' },
                { id: 'doppler', label: 'Doppler Shift' }
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setFadingType(btn.id)}
                  className={`px-2.5 py-1 text-xs font-black uppercase transition-all cursor-pointer ${
                    fadingType === btn.id
                      ? 'bg-[#fde047] dark:bg-yellow-400 text-black neo-border shadow-[1.5px_1.5px_0px_0px_#000]'
                      : 'bg-white dark:bg-[#1a2035] text-black dark:text-slate-200 dark:border-slate-700 hover:bg-[#faf5ff] dark:hover:bg-slate-700'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#faf8f5] dark:bg-[#07090e] rounded-xl p-4 neo-border dark:border-slate-700 flex flex-col items-center">
            <svg viewBox="0 0 540 220" className="w-full h-52">
              {fadingType === 'multipath' && (
                <g>
                  {/* Base Station Tower */}
                  <g transform="translate(60, 80)">
                    <line x1="0" y1="80" x2="0" y2="0" stroke="#000000" strokeWidth="5" />
                    <line x1="-15" y1="80" x2="15" y2="80" stroke="#000000" strokeWidth="5" />
                    <circle cx="0" cy="-5" r="8" fill="#fde047" stroke="#000000" strokeWidth="2" />
                    <text x="0" y="100" fill="#000000" fontSize="10" textAnchor="middle" fontWeight="black">Base Station (Tx)</text>
                  </g>

                  {/* Building 1 (Reflector) */}
                  <rect x="220" y="30" width="60" height="130" fill="#bae6fd" stroke="#000000" strokeWidth="3" />
                  <text x="250" y="90" fill="#000000" fontSize="10" textAnchor="middle" fontWeight="black" className="keep-dark">Building 1</text>

                  {/* Building 2 (Diffraction Corner) */}
                  <polygon points="340,70 390,70 390,160 340,160" fill="#fed7aa" stroke="#000000" strokeWidth="3" />
                  <text x="365" y="120" fill="#000000" fontSize="9" textAnchor="middle" fontWeight="black" className="keep-dark">Building 2</text>

                  {/* Moving Car */}
                  <g transform="translate(450, 135)">
                    <rect x="0" y="10" width="45" height="15" rx="3" fill="#f43f5e" stroke="#000000" strokeWidth="2" />
                    <polygon points="8,10 14,0 32,0 38,10" fill="#fecdd3" stroke="#000000" strokeWidth="2" />
                    <circle cx="10" cy="25" r="5" fill="#000000" />
                    <circle cx="35" cy="25" r="5" fill="#000000" />
                    <line x1="32" y1="0" x2="32" y2="-12" stroke="#000000" strokeWidth="3" />
                    <line x1="0" y1="35" x2="-25" y2="35" stroke="#16a34a" strokeWidth="3" />
                    <text x="20" y="48" fill="#15803d" fontSize="10" textAnchor="middle" fontWeight="black">v (Speed) ➔</text>
                  </g>

                  {/* Multipath Rays */}
                  <line x1="60" y1="75" x2="480" y2="123" stroke="#000000" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
                  <line x1="60" y1="75" x2="220" y2="50" stroke="#0284c7" strokeWidth="3" />
                  <line x1="220" y1="50" x2="480" y2="123" stroke="#0284c7" strokeWidth="3" />
                  <line x1="60" y1="75" x2="340" y2="70" stroke="#9333ea" strokeWidth="3" />
                  <line x1="340" y1="70" x2="480" y2="123" stroke="#9333ea" strokeWidth="3" />

                  <text x="280" y="200" fill="#000000" fontSize="11" textAnchor="middle" fontWeight="black">
                    Multiple rays arrive with random phase shifts → Constructive / Destructive Fading
                  </text>
                </g>
              )}

              {fadingType === 'rayleigh' && (
                <g>
                  <line x1="50" y1="180" x2="500" y2="180" stroke="#000000" strokeWidth="3" />
                  <line x1="50" y1="180" x2="50" y2="20" stroke="#000000" strokeWidth="3" />
                  <text x="470" y="200" fill="#000000" fontSize="11" fontWeight="bold">Signal Envelope (r)</text>
                  <text x="35" y="20" fill="#000000" fontSize="11" textAnchor="end" fontWeight="bold">p(r)</text>

                  {/* Rayleigh PDF */}
                  <path d="M 50,180 C 80,180 120,40 180,80 C 260,130 350,175 480,180" fill="none" stroke="#e11d48" strokeWidth="4" />
                  <text x="160" y="55" fill="#e11d48" fontSize="12" fontWeight="black">Rayleigh (NLOS, K = 0)</text>

                  {/* Rician PDF */}
                  <path d="M 50,180 C 180,180 230,25 260,25 C 290,25 340,180 480,180" fill="none" stroke="#0284c7" strokeWidth="4" />
                  <text x="290" y="40" fill="#0284c7" fontSize="12" fontWeight="black">Rician (Strong LOS, K &gt; 0)</text>
                </g>
              )}

              {fadingType === 'doppler' && (
                <g>
                  <circle cx="270" cy="110" r="18" fill="#fde047" stroke="#000000" strokeWidth="3" />
                  <text x="270" y="115" fill="#000000" fontSize="11" textAnchor="middle" fontWeight="black" className="keep-dark">Rx</text>
                  <line x1="270" y1="110" x2="350" y2="110" stroke="#000000" strokeWidth="4" />
                  <text x="330" y="98" fill="#000000" fontSize="11" fontWeight="black">Velocity v ➔</text>
                  <line x1="160" y1="40" x2="270" y2="110" stroke="#e11d48" strokeWidth="3" strokeDasharray="4 2" />
                  <text x="270" y="165" fill="#000000" fontSize="12" textAnchor="middle" fontWeight="black">
                    Doppler Frequency Shift: f_d = (v / λ) · cos(θ)
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div className="mt-4 p-3 bg-[#fef9c3] dark:bg-[#182035] neo-border dark:border-slate-700 text-xs font-bold text-black dark:text-slate-200">
            <span className="uppercase font-black text-black dark:text-white mr-2">Fading Mitigation:</span>
            Diversity (Space/MIMO, Frequency, Time), Adaptive Equalization, Rake Receiver (CDMA), and OFDM.
          </div>
        </div>
      );

    case 5:
      // Topic 5: Signal Encoding Techniques & Criteria - Live Line Code Generator
      return (
        <div className="bg-white dark:bg-[#141827] rounded-xl p-6 neo-border-thick dark:border-slate-700 neo-shadow text-black dark:text-slate-100 transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-2 border-b-2 border-black dark:border-slate-700">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-black dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-black dark:text-yellow-400 stroke-[2.5]" />
              Digital Line Encoding Waveforms
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-black dark:text-slate-200">Input Bits:</span>
              <input
                type="text"
                value={lineCodeBits}
                maxLength={8}
                onChange={(e) => setLineCodeBits(e.target.value.replace(/[^01]/g, ''))}
                className="w-24 px-2 py-1 bg-[#fef9c3] dark:bg-[#0c0f1a] neo-border dark:border-slate-700 text-center text-xs font-mono font-black text-black dark:text-white"
              />
              <button
                onClick={() => setLineCodeBits(Math.random() > 0.5 ? '10110010' : '01001101')}
                className="p-1 bg-white dark:bg-[#1a2035] neo-border dark:border-slate-700 hover:bg-[#fde047] dark:hover:bg-slate-700 text-black dark:text-white cursor-pointer"
                title="Random bits"
              >
                <RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          <div className="bg-[#faf8f5] dark:bg-[#07090e] rounded-xl p-4 neo-border dark:border-slate-700 overflow-x-auto">
            <svg viewBox={`0 0 ${lineCodeBits.length * 60 + 120} 240`} className="w-full min-w-[500px] h-60">
              {/* Bit Headers */}
              {lineCodeBits.split('').map((bit, idx) => (
                <g key={idx} transform={`translate(${100 + idx * 60}, 20)`}>
                  <rect x="0" y="-12" width="60" height="20" fill="#fde047" stroke="#000000" strokeWidth="2" />
                  <text x="30" y="3" fill="#000000" fontSize="13" fontWeight="black" textAnchor="middle" fontFamily="monospace" className="keep-dark">
                    {bit}
                  </text>
                  <line x1="0" y1="12" x2="0" y2="210" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
                </g>
              ))}
              <line
                x1={100 + lineCodeBits.length * 60}
                y1="32"
                x2={100 + lineCodeBits.length * 60}
                y2="210"
                stroke="#cbd5e1"
                strokeWidth="1"
                strokeDasharray="2 2"
              />

              {/* NRZ-L */}
              <g transform="translate(0, 60)">
                <text x="15" y="15" fill="#38bdf8" fontSize="12" fontWeight="black">NRZ-L</text>
                <line x1="90" y1="10" x2={100 + lineCodeBits.length * 60} y2="10" stroke="#cbd5e1" strokeWidth="1" />
                {(() => {
                  let path = `M 100,${lineCodeBits[0] === '1' ? 22 : -2}`;
                  for (let i = 0; i < lineCodeBits.length; i++) {
                    const y = lineCodeBits[i] === '1' ? 22 : -2;
                    path += ` L ${100 + i * 60},${y} L ${100 + (i + 1) * 60},${y}`;
                  }
                  return <path d={path} fill="none" stroke="#38bdf8" strokeWidth="3" />;
                })()}
              </g>

              {/* NRZ-I */}
              <g transform="translate(0, 115)">
                <text x="15" y="15" fill="#c084fc" fontSize="12" fontWeight="black">NRZ-I</text>
                <line x1="90" y1="10" x2={100 + lineCodeBits.length * 60} y2="10" stroke="#cbd5e1" strokeWidth="1" />
                {(() => {
                  let currentLevel = -2;
                  let path = `M 100,${currentLevel}`;
                  for (let i = 0; i < lineCodeBits.length; i++) {
                    if (lineCodeBits[i] === '1') {
                      currentLevel = currentLevel === -2 ? 22 : -2;
                    }
                    path += ` L ${100 + i * 60},${currentLevel} L ${100 + (i + 1) * 60},${currentLevel}`;
                  }
                  return <path d={path} fill="none" stroke="#c084fc" strokeWidth="3" />;
                })()}
              </g>

              {/* Bipolar AMI */}
              <g transform="translate(0, 170)">
                <text x="15" y="15" fill="#4ade80" fontSize="12" fontWeight="black">AMI</text>
                <line x1="90" y1="10" x2={100 + lineCodeBits.length * 60} y2="10" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" />
                {(() => {
                  let lastPolarity = -1;
                  let path = `M 100,10`;
                  for (let i = 0; i < lineCodeBits.length; i++) {
                    let y = 10;
                    if (lineCodeBits[i] === '1') {
                      lastPolarity = lastPolarity === -1 ? 1 : -1;
                      y = lastPolarity === 1 ? -2 : 22;
                    }
                    path += ` L ${100 + i * 60},${y} L ${100 + (i + 1) * 60},${y}`;
                  }
                  return <path d={path} fill="none" stroke="#4ade80" strokeWidth="3" />;
                })()}
              </g>

              {/* Manchester */}
              <g transform="translate(0, 220)">
                <text x="15" y="10" fill="#fb923c" fontSize="12" fontWeight="black">Manchester</text>
                {(() => {
                  let path = `M 100,${lineCodeBits[0] === '1' ? 18 : -2}`;
                  for (let i = 0; i < lineCodeBits.length; i++) {
                    const startY = lineCodeBits[i] === '1' ? 18 : -2;
                    const midY = lineCodeBits[i] === '1' ? -2 : 18;
                    const x0 = 100 + i * 60;
                    const xMid = x0 + 30;
                    const x1 = x0 + 60;
                    path += ` L ${x0},${startY} L ${xMid},${startY} L ${xMid},${midY} L ${x1},${midY}`;
                  }
                  return <path d={path} fill="none" stroke="#fb923c" strokeWidth="3" />;
                })()}
              </g>
            </svg>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 text-xs font-bold">
            <div className="p-2.5 bg-[#e0f2fe] dark:bg-[#132238] neo-border dark:border-slate-700 text-black dark:text-white">
              <span className="font-black uppercase">Clock Sync</span>
              <p className="text-[11px] text-slate-800 dark:text-slate-300 mt-1">Manchester has guaranteed mid-bit transition for lock.</p>
            </div>
            <div className="p-2.5 bg-[#f3e8ff] dark:bg-[#281324] neo-border dark:border-slate-700 text-black dark:text-white">
              <span className="font-black uppercase">DC Component</span>
              <p className="text-[11px] text-slate-800 dark:text-slate-300 mt-1">Bipolar AMI & Manchester eliminate DC bias.</p>
            </div>
            <div className="p-2.5 bg-[#dcfce7] dark:bg-[#064e3b] neo-border dark:border-slate-700 text-black dark:text-white">
              <span className="font-black uppercase">Error Detection</span>
              <p className="text-[11px] text-slate-800 dark:text-slate-300 mt-1">AMI detects violation of alternating mark polarity.</p>
            </div>
            <div className="p-2.5 bg-[#fef3c7] dark:bg-[#1e2740] neo-border dark:border-slate-700 text-black dark:text-white">
              <span className="font-black uppercase">Bandwidth</span>
              <p className="text-[11px] text-slate-800 dark:text-slate-300 mt-1">Manchester requires 2× bandwidth of NRZ codes.</p>
            </div>
          </div>
        </div>
      );

    case 6:
      // Topic 6: Digital Data to Analog Signal - Modulation Simulator (ASK, FSK, PSK)
      return (
        <div className="bg-white dark:bg-[#141827] rounded-xl p-6 neo-border-thick dark:border-slate-700 neo-shadow text-black dark:text-slate-100 transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-2 border-b-2 border-black dark:border-slate-700">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-black dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-black dark:text-white stroke-[2.5]" />
              Digital-to-Analog Modulation: ASK, FSK, PSK
            </h4>
            <div className="flex flex-wrap gap-1 bg-[#f1ebd8] dark:bg-[#0c0f1a] p-1 neo-border dark:border-slate-700">
              {[
                { id: 'ask', label: 'ASK (Amplitude)' },
                { id: 'fsk', label: 'FSK (Frequency)' },
                { id: 'psk', label: 'BPSK (Phase)' },
                { id: 'qam', label: 'Constellation' }
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setModScheme(btn.id)}
                  className={`px-2.5 py-1 text-xs font-black uppercase transition-all cursor-pointer ${
                    modScheme === btn.id
                      ? 'bg-[#fde047] dark:bg-yellow-400 text-black neo-border shadow-[1.5px_1.5px_0px_0px_#000]'
                      : 'bg-white dark:bg-[#1a2035] text-black dark:text-slate-200 dark:border-slate-700 hover:bg-[#faf5ff] dark:hover:bg-slate-700'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#faf8f5] dark:bg-[#07090e] rounded-xl p-4 neo-border dark:border-slate-700 flex flex-col items-center">
            {modScheme !== 'qam' ? (
              <svg viewBox="0 0 560 180" className="w-full h-44">
                {['1', '0', '1', '1', '0'].map((bit, i) => (
                  <g key={i} transform={`translate(${60 + i * 90}, 15)`}>
                    <rect x="0" y="0" width="90" height="22" fill="#fde047" stroke="#000000" strokeWidth="2" />
                    <text x="45" y="16" fill="#000000" fontSize="13" fontWeight="black" textAnchor="middle" fontFamily="monospace" className="keep-dark">
                      Bit: {bit}
                    </text>
                    <line x1="0" y1="22" x2="0" y2="160" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
                  </g>
                ))}
                <line x1="510" y1="37" x2="510" y2="160" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />

                <g transform="translate(60, 100)">
                  <line x1="0" y1="0" x2="450" y2="0" stroke="#64748b" strokeWidth="1.5" />
                  {(() => {
                    const bits = [1, 0, 1, 1, 0];
                    let points = [];
                    for (let b = 0; b < bits.length; b++) {
                      const bit = bits[b];
                      const startX = b * 90;
                      for (let x = 0; x <= 90; x += 2) {
                        let y = 0;
                        if (modScheme === 'ask') {
                          const amp = bit === 1 ? 30 : 6;
                          y = amp * Math.sin((x / 90) * 4 * Math.PI);
                        } else if (modScheme === 'fsk') {
                          const freq = bit === 1 ? 4 : 2;
                          y = 28 * Math.sin((x / 90) * freq * 2 * Math.PI);
                        } else if (modScheme === 'psk') {
                          const phase = bit === 1 ? 0 : Math.PI;
                          y = 28 * Math.sin((x / 90) * 3 * 2 * Math.PI + phase);
                        }
                        points.push(`${startX + x},${-y}`);
                      }
                    }
                    return (
                      <polyline
                        fill="none"
                        stroke={modScheme === 'ask' ? '#38bdf8' : modScheme === 'fsk' ? '#4ade80' : '#fb923c'}
                        strokeWidth="3.5"
                        points={points.join(' ')}
                      />
                    );
                  })()}
                </g>
                <text x="285" y="168" fill="#000000" fontSize="11" textAnchor="middle" fontWeight="black">
                  {modScheme === 'ask' && 'ASK (Amplitude Shift Keying): Binary bits modulate carrier amplitude'}
                  {modScheme === 'fsk' && 'FSK (Frequency Shift Keying): Constant amplitude, alternating frequencies'}
                  {modScheme === 'psk' && 'BPSK (Binary Phase Shift Keying): 180° phase inversion between 1 and 0'}
                </text>
              </svg>
            ) : (
              <div className="flex flex-wrap items-center justify-around w-full py-2">
                <svg viewBox="0 0 200 180" className="w-48 h-40">
                  <line x1="10" y1="90" x2="190" y2="90" stroke="#64748b" strokeWidth="2" />
                  <line x1="100" y1="10" x2="100" y2="170" stroke="#64748b" strokeWidth="2" />
                  <text x="180" y="85" fill="#000000" fontSize="10" fontWeight="bold">I</text>
                  <text x="105" y="20" fill="#000000" fontSize="10" fontWeight="bold">Q</text>
                  {[
                    { x: 140, y: 50, bit: '00' },
                    { x: 60, y: 50, bit: '01' },
                    { x: 60, y: 130, bit: '11' },
                    { x: 140, y: 130, bit: '10' }
                  ].map((pt, i) => (
                    <g key={i}>
                      <circle cx={pt.x} cy={pt.y} r="6" fill="#0284c7" stroke="#000000" strokeWidth="2" />
                      <text x={pt.x} y={pt.y - 10} fill="#000000" fontSize="11" textAnchor="middle" fontWeight="black">
                        {pt.bit}
                      </text>
                    </g>
                  ))}
                  <text x="100" y="175" fill="#000000" fontSize="11" textAnchor="middle" fontWeight="black">
                    QPSK (2 bits/symbol)
                  </text>
                </svg>

                <svg viewBox="0 0 200 180" className="w-48 h-40">
                  <line x1="10" y1="90" x2="190" y2="90" stroke="#64748b" strokeWidth="2" />
                  <line x1="100" y1="10" x2="100" y2="170" stroke="#64748b" strokeWidth="2" />
                  {[-45, -15, 15, 45].map((xOffset) =>
                    [-45, -15, 15, 45].map((yOffset, j) => (
                      <circle
                        key={`${xOffset}-${j}`}
                        cx={100 + xOffset}
                        cy={90 + yOffset}
                        r="4"
                        fill="#e11d48"
                        stroke="#000000"
                        strokeWidth="1.5"
                      />
                    ))
                  )}
                  <text x="100" y="175" fill="#000000" fontSize="11" textAnchor="middle" fontWeight="black">
                    16-QAM (4 bits/symbol)
                  </text>
                </svg>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-xs font-bold">
            <div className="p-2.5 bg-[#fef08a] dark:bg-[#182035] neo-border dark:border-slate-700 text-black dark:text-white">
              <strong className="uppercase">Baud Rate:</strong>
              <div className="font-mono text-black dark:text-yellow-300 font-black mt-1">S = R / log₂(M)</div>
            </div>
            <div className="p-2.5 bg-[#dcfce7] dark:bg-[#064e3b] neo-border dark:border-slate-700 text-black dark:text-white">
              <strong className="uppercase">Noise Immunity:</strong>
              <div className="text-slate-800 dark:text-slate-300 text-[11px] mt-1">BPSK/QPSK maximize Euclidean distance between states.</div>
            </div>
            <div className="p-2.5 bg-[#f3e8ff] dark:bg-[#281324] neo-border dark:border-slate-700 text-black dark:text-white">
              <strong className="uppercase">Cellular Standards:</strong>
              <div className="text-slate-800 dark:text-slate-300 text-[11px] mt-1">5G dynamically switches up to 256-QAM based on SNR.</div>
            </div>
          </div>
        </div>
      );

    case 7:
      // Topic 7: Analog Data to Analog Signal - AM vs FM Waveforms
      return (
        <div className="bg-white dark:bg-[#141827] rounded-xl p-6 neo-border-thick dark:border-slate-700 neo-shadow text-black dark:text-slate-100 transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-2 border-b-2 border-black dark:border-slate-700">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-black dark:text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-black dark:text-white stroke-[2.5]" />
              Analog Modulation: Amplitude (AM) vs Frequency (FM)
            </h4>
            <div className="flex gap-1.5 bg-[#f1ebd8] dark:bg-[#0c0f1a] p-1 neo-border dark:border-slate-700">
              <button
                onClick={() => setAnalogModType('am')}
                className={`px-3 py-1 text-xs font-black uppercase transition-all cursor-pointer ${
                  analogModType === 'am'
                    ? 'bg-[#fde047] dark:bg-yellow-400 text-black neo-border shadow-[1.5px_1.5px_0px_0px_#000]'
                    : 'bg-white dark:bg-[#1a2035] text-black dark:text-slate-200 dark:border-slate-700'
                }`}
              >
                Amplitude Modulation (AM)
              </button>
              <button
                onClick={() => setAnalogModType('fm')}
                className={`px-3 py-1 text-xs font-black uppercase transition-all cursor-pointer ${
                  analogModType === 'fm'
                    ? 'bg-[#fde047] dark:bg-yellow-400 text-black neo-border shadow-[1.5px_1.5px_0px_0px_#000]'
                    : 'bg-white dark:bg-[#1a2035] text-black dark:text-slate-200 dark:border-slate-700'
                }`}
              >
                Frequency Modulation (FM)
              </button>
            </div>
          </div>

          <div className="bg-[#faf8f5] dark:bg-[#07090e] rounded-xl p-4 neo-border dark:border-slate-700">
            <svg viewBox="0 0 540 180" className="w-full h-44">
              <text x="20" y="25" fill="#000000" fontSize="10" fontWeight="bold">Message m(t):</text>
              {(() => {
                let msgPts = [];
                for (let x = 0; x <= 460; x += 4) {
                  const y = 14 * Math.sin((x / 460) * 2 * Math.PI);
                  msgPts.push(`${70 + x},${22 - y}`);
                }
                return <polyline fill="none" stroke="#d97706" strokeWidth="2.5" points={msgPts.join(' ')} />;
              })()}

              <g transform="translate(70, 110)">
                <line x1="0" y1="0" x2="460" y2="0" stroke="#64748b" strokeWidth="1.5" />
                {(() => {
                  let pts = [];
                  for (let x = 0; x <= 460; x += 1.5) {
                    let y = 0;
                    if (analogModType === 'am') {
                      const envelope = 28 * (1 + 0.65 * Math.sin((x / 460) * 2 * Math.PI));
                      y = envelope * Math.sin((x / 460) * 36 * Math.PI);
                    } else {
                      const phase = (x / 460) * 28 * Math.PI - 5 * Math.cos((x / 460) * 2 * Math.PI);
                      y = 28 * Math.sin(phase);
                    }
                    pts.push(`${x},${-y}`);
                  }
                  return (
                    <polyline
                      fill="none"
                      stroke={analogModType === 'am' ? '#38bdf8' : '#c084fc'}
                      strokeWidth="2.5"
                      points={pts.join(' ')}
                    />
                  );
                })()}

                {analogModType === 'am' && (
                  <>
                    <path
                      d={(() => {
                        let pts = [];
                        for (let x = 0; x <= 460; x += 6) {
                          const env = 28 * (1 + 0.65 * Math.sin((x / 460) * 2 * Math.PI));
                          pts.push(`${x},${-env}`);
                        }
                        return 'M ' + pts.join(' L ');
                      })()}
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                    <path
                      d={(() => {
                        let pts = [];
                        for (let x = 0; x <= 460; x += 6) {
                          const env = 28 * (1 + 0.65 * Math.sin((x / 460) * 2 * Math.PI));
                          pts.push(`${x},${env}`);
                        }
                        return 'M ' + pts.join(' L ');
                      })()}
                      fill="none"
                      stroke="#d97706"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                  </>
                )}
              </g>

              <text x="270" y="165" fill="#000000" fontSize="11" textAnchor="middle" fontWeight="black">
                {analogModType === 'am'
                  ? 'AM Waveform: Envelope matches message • Bandwidth B = 2 · fm'
                  : "FM Waveform: Constant amplitude, frequency varies • Carson's Rule B = 2(Δf + fm)"}
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-xs font-bold">
            <div className="p-3 bg-[#e0f2fe] dark:bg-[#132238] neo-border dark:border-slate-700 text-black dark:text-white">
              <strong className="uppercase">Amplitude Modulation (AM)</strong>
              <ul className="list-disc list-inside mt-1.5 space-y-1 text-slate-800 dark:text-slate-300 font-semibold">
                <li>Simple diode envelope detector receiver.</li>
                <li>Bandwidth is narrow (B = 2 · fm).</li>
                <li>High susceptibility to noise and electrical interference.</li>
              </ul>
            </div>
            <div className="p-3 bg-[#f3e8ff] dark:bg-[#281324] neo-border dark:border-slate-700 text-black dark:text-white">
              <strong className="uppercase">Frequency Modulation (FM)</strong>
              <ul className="list-disc list-inside mt-1.5 space-y-1 text-slate-800 dark:text-slate-300 font-semibold">
                <li>Constant envelope allows Class-C non-linear power amplifiers.</li>
                <li>Amplitude limiters suppress amplitude noise.</li>
                <li>Wider transmission bandwidth per Carson's Rule.</li>
              </ul>
            </div>
          </div>
        </div>
      );

    case 8:
      // Topic 8: Analog Data to Digital Signal - PCM Pipeline
      return (
        <div className="bg-white dark:bg-[#141827] rounded-xl p-6 neo-border-thick dark:border-slate-700 neo-shadow text-black dark:text-slate-100 transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-2 border-b-2 border-black dark:border-slate-700">
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-black dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-black dark:text-white stroke-[2.5]" />
              Pulse Code Modulation (PCM) Digitization Pipeline
            </h4>
            <div className="flex flex-wrap gap-1 bg-[#f1ebd8] dark:bg-[#0c0f1a] p-1 neo-border dark:border-slate-700">
              {[
                { id: 'all', label: 'Full Process' },
                { id: 'sampling', label: '1. Sampling' },
                { id: 'quant', label: '2. Quantizing' },
                { id: 'encoding', label: '3. Encoding' }
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setPcmStep(btn.id)}
                  className={`px-2.5 py-1 text-xs font-black uppercase transition-all cursor-pointer ${
                    pcmStep === btn.id
                      ? 'bg-[#fde047] dark:bg-yellow-400 text-black neo-border shadow-[1.5px_1.5px_0px_0px_#000]'
                      : 'bg-white dark:bg-[#1a2035] text-black dark:text-slate-200 dark:border-slate-700'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#faf8f5] dark:bg-[#07090e] rounded-xl p-4 neo-border dark:border-slate-700">
            <svg viewBox="0 0 540 200" className="w-full h-48">
              {[30, 55, 80, 105, 130, 155].map((y, idx) => (
                <g key={idx}>
                  <line key={idx} x1="60" y1={y} x2="480" y2={y} stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="50" y={y + 3} fill="#000000" fontSize="9" textAnchor="end" fontWeight="bold">
                    L{5 - idx}
                  </text>
                </g>
              ))}

              {(() => {
                let wavePts = [];
                for (let x = 0; x <= 400; x += 4) {
                  const y = 92 - 58 * Math.sin((x / 400) * 2 * Math.PI);
                  wavePts.push(`${70 + x},${y}`);
                }
                return (
                  <path
                    d={'M ' + wavePts.join(' L ')}
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="3"
                    opacity={pcmStep === 'all' || pcmStep === 'sampling' ? 1 : 0.4}
                  />
                );
              })()}

              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sampleIdx) => {
                const x = 70 + sampleIdx * 40;
                const analogY = 92 - 58 * Math.sin(((sampleIdx * 40) / 400) * 2 * Math.PI);
                const qLevels = [30, 55, 80, 105, 130, 155];
                const closestQ = qLevels.reduce((prev, curr) =>
                  Math.abs(curr - analogY) < Math.abs(prev - analogY) ? curr : prev
                );

                return (
                  <g key={sampleIdx}>
                    {(pcmStep === 'all' || pcmStep === 'sampling') && (
                      <line x1={x} y1="92" x2={x} y2={analogY} stroke="#38bdf8" strokeWidth="2.5" />
                    )}
                    <circle cx={x} cy={analogY} r="3.5" fill="#38bdf8" stroke="#000000" strokeWidth="1" />
                    {(pcmStep === 'all' || pcmStep === 'quant' || pcmStep === 'encoding') && (
                      <>
                        <circle cx={x} cy={closestQ} r="5" fill="#c084fc" stroke="#000000" strokeWidth="1.5" />
                        <line x1={x - 12} y1={closestQ} x2={x + 12} y2={closestQ} stroke="#94a3b8" strokeWidth="2.5" />
                      </>
                    )}
                  </g>
                );
              })}

              <text x="270" y="185" fill="#000000" fontSize="11" textAnchor="middle" fontWeight="black">
                Analog Wave (Orange) ➔ Samples fs ≥ 2·fmax (Blue) ➔ Quantized Discrete Levels (Purple)
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs font-bold">
            <div className="p-2.5 bg-[#fef08a] dark:bg-[#182035] neo-border dark:border-slate-700 text-black dark:text-white">
              <span className="uppercase">1. Nyquist Sampling:</span>
              <p className="text-slate-800 dark:text-slate-300 mt-1">fs ≥ 2·fmax prevents frequency aliasing.</p>
            </div>
            <div className="p-2.5 bg-[#f3e8ff] dark:bg-[#281324] neo-border dark:border-slate-700 text-black dark:text-white">
              <span className="uppercase">2. Quantization & SQNR:</span>
              <p className="text-slate-800 dark:text-slate-300 mt-1">SQNR ≈ 6.02·n + 1.76 dB. Companding (A-law / μ-law).</p>
            </div>
            <div className="p-2.5 bg-[#dbeafe] dark:bg-[#132238] neo-border dark:border-slate-700 text-black dark:text-white">
              <span className="uppercase">3. Binary PCM:</span>
              <p className="text-slate-800 dark:text-slate-300 mt-1">Rb = n · fs (Telephony voice: 8 kHz × 8 bits = 64 kbps).</p>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
