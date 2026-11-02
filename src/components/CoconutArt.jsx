import { useId, useMemo } from 'react';

// Deterministic pseudo-random so drawings are stable between renders.
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function useSafeId(prefix) {
  return prefix + useId().replace(/[^a-zA-Z0-9]/g, '');
}

/** Fibre hairs around the outline of an ellipse. */
function Hairs({ cx, cy, rx, ry, count, seed, color, length = 6, width = 0.9, opacity = 0.75 }) {
  const paths = useMemo(() => {
    const r = rng(seed);
    const out = [];
    for (let i = 0; i < count; i++) {
      const a = r() * Math.PI * 2;
      const inset = 0.92 + r() * 0.1;
      const x = cx + Math.cos(a) * rx * inset;
      const y = cy + Math.sin(a) * ry * inset;
      const dir = a + (r() - 0.5) * 1.6;
      const len = length * (0.5 + r());
      const x2 = x + Math.cos(dir) * len;
      const y2 = y + Math.sin(dir) * len;
      const bend = (r() - 0.5) * len;
      out.push(`M${x.toFixed(1)} ${y.toFixed(1)} Q${((x + x2) / 2 + bend).toFixed(1)} ${((y + y2) / 2 - bend).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`);
    }
    return out;
  }, [cx, cy, rx, ry, count, seed, length]);
  return (
    <g stroke={color} strokeWidth={width} strokeLinecap="round" fill="none" opacity={opacity}>
      {paths.map((d, i) => <path key={i} d={d} />)}
    </g>
  );
}

/** Mature brown coconut with fibrous husk texture and three eyes. */
export function Coconut({ size = 80, className = '', seed = 7, title }) {
  const id = useSafeId('cc');
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <radialGradient id={id + 'body'} cx="36%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#B07A45" />
          <stop offset="35%" stopColor="#8A5A2E" />
          <stop offset="75%" stopColor="#5C3818" />
          <stop offset="100%" stopColor="#2F1A09" />
        </radialGradient>
        <filter id={id + 'fib'} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035 0.55" numOctaves="3" seed={seed} result="n" />
          <feColorMatrix in="n" type="matrix"
            values="0 0 0 0 0.18  0 0 0 0 0.10  0 0 0 0 0.04  0 0 0 1.4 -0.45" result="fibres" />
          <feComposite in="fibres" in2="SourceGraphic" operator="in" result="clip" />
          <feBlend in="clip" in2="SourceGraphic" mode="multiply" />
        </filter>
        <filter id={id + 'spec'} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed={seed + 3} result="n" />
          <feColorMatrix in="n" type="matrix"
            values="0 0 0 0 0.85  0 0 0 0 0.65  0 0 0 0 0.4  0 0 0 2.2 -1.4" result="flecks" />
          <feComposite in="flecks" in2="SourceGraphic" operator="in" />
        </filter>
        <radialGradient id={id + 'eye'} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#120904" />
          <stop offset="70%" stopColor="#24130A" />
          <stop offset="100%" stopColor="#4A2C14" />
        </radialGradient>
        <radialGradient id={id + 'shine'} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE9C9" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FFE9C9" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g transform="rotate(-14 60 62)">
        {/* outer hairs behind */}
        <Hairs cx={60} cy={63} rx={44} ry={47} count={110} seed={seed} color="#6B4423" length={5} />
        {/* body */}
        <ellipse cx="60" cy="63" rx="44" ry="47" fill={`url(#${id}body)`} filter={`url(#${id}fib)`} />
        <ellipse cx="60" cy="63" rx="44" ry="47" fill="#C89A64" filter={`url(#${id}spec)`} opacity="0.5" />
        {/* longitudinal ridges */}
        <g fill="none" strokeLinecap="round" opacity="0.35">
          <path d="M60 17 C 44 40, 42 80, 56 109" stroke="#2A170A" strokeWidth="1.6" />
          <path d="M60 17 C 78 42, 82 82, 70 109" stroke="#2A170A" strokeWidth="1.6" />
          <path d="M61 18 C 46 40, 44 80, 57 108" stroke="#C99A62" strokeWidth="0.8" />
        </g>
        {/* eyes at the top pole */}
        <g>
          <ellipse cx="52" cy="28" rx="5.2" ry="4.4" fill={`url(#${id}eye)`} />
          <ellipse cx="67" cy="27" rx="5.2" ry="4.4" fill={`url(#${id}eye)`} />
          <ellipse cx="60" cy="38" rx="5.2" ry="4.4" fill={`url(#${id}eye)`} />
          <path d="M48 31 q4 2 8 0 M63 30 q4 2 8 0 M56 41 q4 2 8 0" stroke="#B88552" strokeWidth="0.9" fill="none" opacity="0.6" />
        </g>
        {/* soft highlight */}
        <ellipse cx="42" cy="44" rx="16" ry="11" fill={`url(#${id}shine)`} transform="rotate(-35 42 44)" />
        {/* surface hairs on top */}
        <Hairs cx={60} cy={63} rx={36} ry={40} count={40} seed={seed + 11} color="#A97A49" length={4} width={0.6} opacity={0.45} />
      </g>
    </svg>
  );
}

/** Green tender coconut (elaneer) with calyx cap; optional straw. */
export function TenderCoconut({ size = 160, className = '', straw = true }) {
  const id = useSafeId('tc');
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <radialGradient id={id + 'g'} cx="34%" cy="38%" r="78%">
          <stop offset="0%" stopColor="#C9E27A" />
          <stop offset="35%" stopColor="#8CB846" />
          <stop offset="75%" stopColor="#5A8A2A" />
          <stop offset="100%" stopColor="#2F5414" />
        </radialGradient>
        <linearGradient id={id + 'face'} x1="0" x2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="55%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#1F3A0C" stopOpacity="0.45" />
        </linearGradient>
        <filter id={id + 'tex'}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9 0.08" numOctaves="2" seed="4" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.2  0 0 0 0 0.3  0 0 0 0 0.05  0 0 0 0.9 -0.35" result="t" />
          <feComposite in="t" in2="SourceGraphic" operator="in" result="c" />
          <feBlend in="c" in2="SourceGraphic" mode="multiply" />
        </filter>
        <radialGradient id={id + 'cap'} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#E6CF9A" />
          <stop offset="100%" stopColor="#8F6A33" />
        </radialGradient>
        <linearGradient id={id + 'straw'} x1="0" x2="1">
          <stop offset="0%" stopColor="#F7E2B5" />
          <stop offset="50%" stopColor="#FFF6E2" />
          <stop offset="100%" stopColor="#D8B87C" />
        </linearGradient>
      </defs>
      {/* ground shadow */}
      <ellipse cx="102" cy="188" rx="60" ry="7" fill="#000" opacity="0.18" />
      {/* body: rounded triangular shape */}
      <path d="M100 32 C 58 34, 30 82, 34 126 C 38 170, 70 186, 100 186 C 132 186, 164 170, 167 126 C 170 82, 142 34, 100 32 Z"
        fill={`url(#${id}g)`} filter={`url(#${id}tex)`} />
      <path d="M100 32 C 58 34, 30 82, 34 126 C 38 170, 70 186, 100 186 C 132 186, 164 170, 167 126 C 170 82, 142 34, 100 32 Z"
        fill={`url(#${id}face)`} />
      {/* ridge lines */}
      <path d="M100 34 C 88 80, 86 140, 96 184" stroke="#3E6A1C" strokeWidth="2" fill="none" opacity="0.45" />
      <path d="M100 34 C 128 80, 140 140, 132 178" stroke="#3E6A1C" strokeWidth="2" fill="none" opacity="0.35" />
      {/* glossy highlight */}
      <ellipse cx="66" cy="92" rx="11" ry="30" fill="#FFFFFF" opacity="0.28" transform="rotate(18 66 92)" />
      <ellipse cx="72" cy="70" rx="4" ry="9" fill="#FFFFFF" opacity="0.5" transform="rotate(22 72 70)" />
      {/* calyx cap */}
      <path d="M100 26 l14 10 l-5 4 l9 6 l-18 -2 l-18 2 l9 -6 l-5 -4 Z" fill={`url(#${id}cap)`} />
      <rect x="96" y="12" width="8" height="18" rx="3" fill="#7A5A2A" />
      {straw && (
        <g transform="rotate(16 128 60)">
          <rect x="122" y="-6" width="11" height="78" rx="5" fill={`url(#${id}straw)`} />
          <path d="M122 14 h11 M122 22 h11" stroke="#C9A160" strokeWidth="1.5" />
        </g>
      )}
    </svg>
  );
}

/** Coconut split in half showing white meat. */
export function HalfCoconut({ size = 160, className = '' }) {
  const id = useSafeId('hc');
  return (
    <svg className={className} width={size} height={size * 0.78} viewBox="0 0 220 172" aria-hidden="true">
      <defs>
        <radialGradient id={id + 'shell'} cx="30%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#9C6A3A" />
          <stop offset="60%" stopColor="#5C3818" />
          <stop offset="100%" stopColor="#2A1708" />
        </radialGradient>
        <filter id={id + 'fib'}>
          <feTurbulence type="fractalNoise" baseFrequency="0.5 0.03" numOctaves="3" seed="9" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.16  0 0 0 0 0.09  0 0 0 0 0.03  0 0 0 1.5 -0.5" result="f" />
          <feComposite in="f" in2="SourceGraphic" operator="in" result="c" />
          <feBlend in="c" in2="SourceGraphic" mode="multiply" />
        </filter>
        <radialGradient id={id + 'meat'} cx="50%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#F6F1E6" />
          <stop offset="100%" stopColor="#E3D8C2" />
        </radialGradient>
        <radialGradient id={id + 'hollow'} cx="50%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#FBF8F1" />
          <stop offset="100%" stopColor="#D9CDB3" />
        </radialGradient>
      </defs>
      <ellipse cx="110" cy="162" rx="92" ry="8" fill="#000" opacity="0.16" />
      {/* shell bowl */}
      <path d="M14 66 C 14 128, 58 160, 110 160 C 162 160, 206 128, 206 66 Z" fill={`url(#${id}shell)`} filter={`url(#${id}fib)`} />
      {/* rim: shell edge, meat ring, hollow */}
      <ellipse cx="110" cy="66" rx="96" ry="26" fill="#3A220E" />
      <ellipse cx="110" cy="65" rx="90" ry="23" fill="#5C3818" />
      <ellipse cx="110" cy="65" rx="84" ry="21" fill={`url(#${id}meat)`} />
      <ellipse cx="110" cy="67" rx="64" ry="15" fill={`url(#${id}hollow)`} />
      <ellipse cx="110" cy="69" rx="40" ry="8" fill="#E9F2F4" opacity="0.7" />
      <path d="M40 60 q70 -22 140 0" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.6" />
    </svg>
  );
}

/** A heap of loose coconut husk fibre with a shell piece. */
export function HuskPile({ size = 140, className = '' }) {
  const id = useSafeId('hp');
  const strands = useMemo(() => {
    const r = rng(42);
    return Array.from({ length: 70 }, () => {
      const x = 15 + r() * 110;
      const y = 50 + r() * 50;
      const a = -Math.PI / 2 + (r() - 0.5) * 2.4;
      const len = 14 + r() * 26;
      return {
        d: `M${x.toFixed(1)} ${y.toFixed(1)} q${(Math.cos(a) * len * 0.6 + (r() - 0.5) * 8).toFixed(1)} ${(Math.sin(a) * len * 0.4).toFixed(1)} ${(Math.cos(a) * len).toFixed(1)} ${(Math.sin(a) * len).toFixed(1)}`,
        c: ['#C79A62', '#A9773F', '#8A5A2E', '#D9B47F'][Math.floor(r() * 4)],
        w: 0.8 + r() * 1.4,
      };
    });
  }, []);
  return (
    <svg className={className} width={size} height={size * 0.8} viewBox="0 0 140 112" aria-hidden="true">
      <defs>
        <radialGradient id={id + 'g'} cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#C79A62" />
          <stop offset="100%" stopColor="#7A4E24" />
        </radialGradient>
      </defs>
      <ellipse cx="70" cy="104" rx="60" ry="6" fill="#000" opacity="0.15" />
      <path d="M8 102 C 18 50, 50 30, 70 30 C 92 30, 124 52, 132 102 Z" fill={`url(#${id}g)`} />
      <g strokeLinecap="round" fill="none">
        {strands.map((s, i) => <path key={i} d={s.d} stroke={s.c} strokeWidth={s.w} />)}
      </g>
      {/* broken shell piece */}
      <path d="M86 98 C 90 80, 110 74, 124 82 L 118 88 L 122 94 Z" fill="#3E2511" />
      <path d="M90 96 C 94 84, 108 80, 118 85" stroke="#F3EBDB" strokeWidth="3" fill="none" />
    </svg>
  );
}

/** One pinnate palm frond along a quadratic curve. */
function Frond({ x0, y0, cx, cy, x1, y1, leaflets = 26, len = 46, color, dark, seed }) {
  const leaves = useMemo(() => {
    const r = rng(seed);
    const out = [];
    for (let i = 2; i < leaflets; i++) {
      const t = i / leaflets;
      const x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t * t * x1;
      const y = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * cy + t * t * y1;
      const dx = 2 * (1 - t) * (cx - x0) + 2 * t * (x1 - cx);
      const dy = 2 * (1 - t) * (cy - y0) + 2 * t * (y1 - cy);
      const ang = Math.atan2(dy, dx);
      const l = len * Math.sin(Math.PI * Math.min(1, t * 1.15)) * (0.75 + r() * 0.35) + 8;
      for (const side of [-1, 1]) {
        const a = ang + side * (0.9 + r() * 0.25);
        const droop = 0.55; // leaflets hang down with gravity
        const ex = x + Math.cos(a) * l;
        const ey = y + Math.sin(a) * l * (side === 1 ? 1 : 0.6) + l * droop * 0.5;
        const mx = x + Math.cos(a) * l * 0.5;
        const my = y + Math.sin(a) * l * 0.5 - 4;
        out.push({ d: `M${x.toFixed(1)} ${y.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`, c: r() > 0.5 ? color : dark });
      }
    }
    return out;
  }, [x0, y0, cx, cy, x1, y1, leaflets, len, color, dark, seed]);
  return (
    <g fill="none" strokeLinecap="round">
      {leaves.map((l, i) => <path key={i} d={l.d} stroke={l.c} strokeWidth="3.2" />)}
      <path d={`M${x0} ${y0} Q${cx} ${cy} ${x1} ${y1}`} stroke="#7E8F45" strokeWidth="3" />
    </g>
  );
}

/** Coconut palm with a bunch of mixed tender and mature coconuts. */
export function PalmScene({ className = '' }) {
  const id = useSafeId('ps');
  const top = { x: 262, y: 170 };
  const fronds = [
    { cx: 170, cy: 90, x1: 40, y1: 210, color: '#4F9A4A', dark: '#2F6E33', seed: 1 },
    { cx: 360, cy: 90, x1: 470, y1: 220, color: '#4F9A4A', dark: '#2F6E33', seed: 2 },
    { cx: 200, cy: 40, x1: 70, y1: 70, color: '#62B05A', dark: '#3C8240', seed: 3 },
    { cx: 330, cy: 40, x1: 450, y1: 80, color: '#62B05A', dark: '#3C8240', seed: 4 },
    { cx: 262, cy: 40, x1: 300, y1: 2, color: '#6DBA62', dark: '#418846', seed: 5 },
    { cx: 200, cy: 150, x1: 130, y1: 290, color: '#3F8A41', dark: '#2A5E2E', seed: 6 },
    { cx: 330, cy: 150, x1: 395, y1: 295, color: '#3F8A41', dark: '#2A5E2E', seed: 7 },
  ];
  return (
    <svg className={className} viewBox="0 0 520 520" role="img" aria-label="Coconut palm with a bunch of coconuts">
      <defs>
        <linearGradient id={id + 'trunk'} x1="0" x2="1">
          <stop offset="0%" stopColor="#5E4128" />
          <stop offset="40%" stopColor="#9C7A55" />
          <stop offset="70%" stopColor="#7F5F3E" />
          <stop offset="100%" stopColor="#4A3220" />
        </linearGradient>
        <radialGradient id={id + 'sun'} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#3C7A4A" />
          <stop offset="100%" stopColor="#21502F" />
        </radialGradient>
      </defs>
      <circle cx="260" cy="280" r="230" fill={`url(#${id}sun)`} />
      {/* curved trunk with ring scars */}
      <path d="M244 540 C 252 420, 236 300, 252 176 L 274 178 C 262 300, 282 420, 276 540 Z" fill={`url(#${id}trunk)`} />
      <g stroke="#3F2A18" strokeWidth="2.5" opacity="0.55" fill="none">
        {Array.from({ length: 16 }, (_, i) => {
          const y = 200 + i * 21;
          return <path key={i} d={`M${246 + Math.sin(i) * 3} ${y} q14 ${4 + (i % 3)} 28 0`} />;
        })}
      </g>
      {/* back fronds */}
      {fronds.slice(0, 5).map((f, i) => (
        <Frond key={i} x0={top.x} y0={top.y} {...f} />
      ))}
      {/* coconut bunch */}
      <g transform="translate(262 196) scale(1.25) translate(-262 -196)">
        <path d="M262 176 l-20 20 M262 176 l22 22 M262 176 l0 30" stroke="#B59A55" strokeWidth="4" />
        <g transform="translate(214 176)"><TenderCoconutMini /></g>
        <g transform="translate(252 182)"><TenderCoconutMini shade /></g>
        <g transform="translate(230 206)"><TenderCoconutMini /></g>
        <g transform="translate(270 208)"><CoconutMini /></g>
        <g transform="translate(200 210)"><CoconutMini /></g>
      </g>
      {/* front fronds */}
      {fronds.slice(5).map((f, i) => (
        <Frond key={i} x0={top.x} y0={top.y} {...f} />
      ))}
    </svg>
  );
}

function TenderCoconutMini({ shade = false }) {
  const id = useSafeId('tm');
  return (
    <g>
      <defs>
        <radialGradient id={id} cx="35%" cy="35%" r="75%">
          <stop offset="0%" stopColor={shade ? '#A9CC5E' : '#C2DD72'} />
          <stop offset="60%" stopColor={shade ? '#5E8E2C' : '#78A63A'} />
          <stop offset="100%" stopColor="#2F5414" />
        </radialGradient>
      </defs>
      <path d="M24 2 C 8 3, 1 20, 2 32 C 3 44, 12 49, 24 49 C 36 49, 46 44, 47 32 C 48 20, 40 3, 24 2 Z" fill={`url(#${id})`} />
      <ellipse cx="15" cy="20" rx="3" ry="8" fill="#FFFFFF" opacity="0.3" transform="rotate(18 15 20)" />
      <path d="M24 0 l5 4 l-5 2 l-5 -2 Z" fill="#B8954F" />
    </g>
  );
}

function CoconutMini() {
  const id = useSafeId('cm');
  return (
    <g>
      <defs>
        <radialGradient id={id} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#B07A45" />
          <stop offset="60%" stopColor="#6B4220" />
          <stop offset="100%" stopColor="#2F1A09" />
        </radialGradient>
      </defs>
      <ellipse cx="22" cy="24" rx="21" ry="23" fill={`url(#${id})`} />
      <ellipse cx="14" cy="15" rx="5" ry="3" fill="#FFE9C9" opacity="0.25" transform="rotate(-30 14 15)" />
    </g>
  );
}
