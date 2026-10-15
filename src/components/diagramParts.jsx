import React from 'react';
import { C } from './diagramTheme';

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
