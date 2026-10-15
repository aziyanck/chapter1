import React, { useEffect } from 'react';
import { C, M, kt } from './diagramTheme';

// Shared drawing helpers for the static slide diagrams.
// Fills are semi-transparent so the same SVG reads in light and dark mode.

export const strokeCls = 'stroke-black dark:stroke-slate-300';

export function Tower({ x, base, h, color, label, labelBelow = true }) {
  return (
    <g>
      <line x1={x} y1={base} x2={x} y2={base - h} className={strokeCls} strokeWidth="4" />
      <polygon points={`${x - 7},${base - h} ${x + 7},${base - h} ${x},${base - h - 12}`} fill={color} className={strokeCls} strokeWidth="1.5" />
      <text x={x} y={labelBelow ? base + 16 : base - h - 18} fontSize="12" textAnchor="middle" fontWeight="900">
        {label}
      </text>
    </g>
  );
}

export function Arrow({ id, color }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
    </marker>
  );
}

export function Earth({ y0, bulge, label, labelX = 300 }) {
  return (
    <g>
      <path
        d={`M 0,${y0} Q 300,${y0 - 2 * bulge} 600,${y0} L 600,300 L 0,300 Z`}
        fill={C.earth}
        fillOpacity="0.3"
        className={strokeCls}
        strokeWidth="2.5"
      />
      {label && (
        <text x={labelX} y={y0 - bulge + 30} fontSize="12" textAnchor="middle" fontWeight="700">
          {label}
        </text>
      )}
    </g>
  );
}

export function Block({ x, y, w, h, lines, fill = M.block }) {
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

// ---------- Animation helpers (SVG SMIL, so they run without JS) ----------

// Freezes every SVG animation under `ref` at `still` seconds for reduced-motion users.
export function useStillFrame(ref, still = 5) {
  useEffect(() => {
    if (!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    ref.current?.querySelectorAll('svg').forEach((svg) => {
      svg.pauseAnimations?.();
      svg.setCurrentTime?.(still);
    });
  });
}

// Clips children to a window and slides them by `shift` px per `dur`; a periodic curve drawn one period
// longer than the window then appears to flow endlessly.
export function Scroll({ id, x, y, w, h, shift, dur, children }) {
  return (
    <g>
      <clipPath id={id}>
        <rect x={x} y={y} width={w} height={h} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <g>
          <animateTransform attributeName="transform" type="translate" from="0 0" to={`${shift} 0`} dur={dur} repeatCount="indefinite" />
          {children}
        </g>
      </g>
    </g>
  );
}

// A periodic wave (period in px) flowing rightwards inside a fixed window.
export function FlowingWave({ id, fn, yMid, scale, x0, w, period, speed = 40, color, width = 2 }) {
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

// Copies of path `d` that grow from the point (cx, cy) and fade, like waves spreading from an antenna.
export function Ripples({ cx, cy, d, color, count = 3, dur = 3, from = 0.15, width = 3 }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {Array.from({ length: count }, (_, i) => {
        const loop = { dur: `${dur}s`, begin: `${(-i * dur) / count}s`, repeatCount: 'indefinite' };
        return (
          <path key={i} d={d} fill="none" stroke={color} strokeWidth={width} vectorEffect="non-scaling-stroke" opacity="0">
            <animateTransform attributeName="transform" type="scale" values={`${from};1`} {...loop} />
            <animate attributeName="opacity" values="1;0" {...loop} />
          </path>
        );
      })}
    </g>
  );
}

const polyD = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'} ${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
const polyLen = (pts) => pts.slice(1).reduce((sum, p, i) => sum + Math.hypot(p.x - pts[i].x, p.y - pts[i].y), 0);

// A dot that travels a polyline at a fixed speed once per cycle, then vanishes until the next cycle.
// With a shared cycle and speed, longer paths visibly arrive later.
export function Pulse({ points, color, cycle, speed = 160, begin = '0s', r = 5 }) {
  const f = Math.min(0.95, polyLen(points) / speed / cycle).toFixed(3);
  const loop = { dur: `${cycle}s`, begin, repeatCount: 'indefinite' };
  return (
    <circle r={r} fill={color} className={strokeCls} strokeWidth="1.5" opacity="0">
      <animateMotion path={polyD(points)} keyPoints="0;1;1" keyTimes={`0;${f};1`} calcMode="linear" {...loop} />
      <animate attributeName="opacity" values="1;1;0;0" keyTimes={`0;${f};${Math.min(+f + 0.03, 0.99).toFixed(3)};1`} {...loop} />
    </circle>
  );
}

// Highlights a block during its stage: stage `step` of `steps` stages per cycle.
export function Glow({ x, y, w, h, rx = 6, step, steps, cycle = 6 }) {
  const a = step / steps, b = (step + 0.5) / steps, c = (step + 1) / steps;
  return (
    <rect x={x - 3} y={y - 3} width={w + 6} height={h + 6} rx={rx + 2} fill={M.ask} fillOpacity="0.25" stroke={M.ask} strokeWidth="3" opacity="0">
      <animate attributeName="opacity" values="0;0;1;0;0" keyTimes={kt(0, a, b, c, 1)} dur={`${cycle}s`} repeatCount="indefinite" />
    </rect>
  );
}

// A dot that runs along a polyline in the second half of stage `step`, carrying the signal to the next block.
export function Carry({ points, step, steps, color = M.ask, cycle = 6 }) {
  const a = (step + 0.5) / steps, b = (step + 1) / steps;
  const loop = { dur: `${cycle}s`, repeatCount: 'indefinite' };
  return (
    <circle r="5" fill={color} className={strokeCls} strokeWidth="1.5" opacity="0">
      <animateMotion path={points.map((p, i) => `${i ? 'L' : 'M'} ${p[0]},${p[1]}`).join(' ')} keyPoints="0;0;1;1" keyTimes={kt(0, a, b, 1)} calcMode="linear" {...loop} />
      <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes={kt(0, a - 0.001, a, b, Math.min(b + 0.001, 1), 1)} {...loop} />
    </circle>
  );
}
