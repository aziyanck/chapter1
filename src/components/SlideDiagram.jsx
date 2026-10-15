import React, { useEffect, useRef } from 'react';
import { C, F, M } from './diagramTheme';
import * as Propagation from './PropagationDiagrams';
import * as Fading from './FadingDiagrams';
import * as Modulation from './ModulationDiagrams';

// Registry of non-interactive slide diagrams, looked up by a slide's `diagram` name.
// Some diagrams loop (SVG SMIL); `still` is the moment (seconds) to freeze them at for reduced-motion users.

const DIAGRAMS = {
  // Topic 3: Propagation Modes
  ground: {
    svg: Propagation.GroundWave,
    legend: [{ color: C.ground, label: 'Ground wave weakening with distance' }]
  },
  sky: {
    svg: Propagation.SkyWave,
    legend: [{ color: C.sky, label: 'Sky wave refracted by the ionosphere (multiple hops)' }]
  },
  los: {
    svg: Propagation.LineOfSight,
    legend: [
      { color: C.los, label: 'Clear line-of-sight path' },
      { color: C.blocked, dashed: true, label: 'Path blocked by an obstacle' }
    ]
  },
  // Topic 4: Fading
  fading: {
    svg: Fading.FadingSignal,
    still: 6,
    legend: [{ color: F.signal, label: 'Received signal strength rises and falls (fading)' }]
  },
  multipath: {
    svg: Fading.Multipath,
    legend: [
      { color: F.signal, label: 'Direct path' },
      { color: F.reflect, dashed: true, label: 'Reflection (building)' },
      { color: C.ground, dashed: true, label: 'Ground reflection' },
      { color: F.scatter, dashed: true, label: 'Scattering (tree)' }
    ]
  },
  interference: {
    svg: Fading.Interference,
    legend: [
      { color: F.good, label: 'Paths add up (constructive)' },
      { color: F.bad, label: 'Paths cancel out (destructive)' }
    ]
  },
  pathloss: {
    svg: Fading.PathLossScene,
    legend: [{ color: F.signal, label: 'Signal spreads out and weakens with distance' }]
  },
  shadowing: {
    svg: Fading.ShadowingScene,
    legend: [
      { color: F.signal, label: 'Signal from the tower' },
      { color: '#475569', label: 'Area shadowed by the building (weak signal)' }
    ]
  },
  doppler: {
    svg: Fading.DopplerScene,
    legend: [
      { color: F.good, label: 'Moving toward the tower: waves compressed' },
      { color: F.bad, label: 'Moving away: waves stretched' }
    ]
  },
  scales: {
    svg: Fading.FadingScales,
    still: 9,
    legend: [
      { color: F.pathLoss, dashed: true, label: 'Path loss (average trend)' },
      { color: F.shadow, label: '+ Shadowing — large-scale fading' },
      { color: F.signal, label: '+ Multipath — small-scale fading' }
    ]
  },
  fastslow: {
    svg: Fading.FastSlow,
    legend: [
      { color: F.signal, label: 'Fast fading: rapid changes (movement, Doppler)' },
      { color: F.shadow, label: 'Slow fading: gradual changes (shadowing)' }
    ]
  },
  rayleighrician: {
    svg: Fading.RayleighRician,
    legend: [
      { color: F.signal, label: 'Dominant direct (LOS) path' },
      { color: F.reflect, dashed: true, label: 'Scattered multipath components' }
    ]
  },
  // Topic 6: Digital data → analog signal
  d2aflow: {
    svg: Modulation.DigitalToAnalogFlow,
    legend: [{ color: M.carrier, label: 'The carrier is changed according to the digital bits' }]
  },
  // Topic 7: Analog data → analog signal
  analoginputs: {
    svg: Modulation.AnalogInputs,
    legend: [
      { color: M.message, label: 'Message signal (the information)' },
      { color: M.carrier, label: 'Carrier signal (high frequency, unmodulated)' }
    ]
  },
  // Topic 8: Analog data → digital signal
  adcflow: {
    svg: Modulation.AdcFlow,
    legend: [{ color: M.arrow, label: 'The three steps of analog-to-digital conversion' }]
  },
  pcm: {
    svg: Modulation.PcmBlock,
    legend: [{ color: M.arrow, label: 'PCM transmitter and receiver' }]
  }
};

export default function SlideDiagram({ name }) {
  const diagram = DIAGRAMS[name];
  const ref = useRef(null);
  useEffect(() => {
    if (!diagram || !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    ref.current?.querySelectorAll('svg').forEach((svg) => {
      svg.pauseAnimations?.();
      svg.setCurrentTime?.(diagram.still ?? 5);
    });
  }, [diagram]);
  if (!diagram) return null;
  const Svg = diagram.svg;
  return (
    <div ref={ref} className="p-4 bg-[#faf8f5] dark:bg-[#07090e] neo-border dark:border-slate-700 rounded-xl shadow-[2px_2px_0px_0px_#000]">
      <Svg />
      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 pt-3 border-t-2 border-black/20 dark:border-slate-700">
        {diagram.legend.map((item, idx) => (
          <span key={idx} className="flex items-center gap-2 text-xs font-bold text-black dark:text-slate-200">
            <svg width="28" height="8" className="flex-shrink-0">
              <line x1="0" y1="4" x2="28" y2="4" stroke={item.color} strokeWidth="3.5" strokeDasharray={item.dashed ? '6 3' : undefined} />
            </svg>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
