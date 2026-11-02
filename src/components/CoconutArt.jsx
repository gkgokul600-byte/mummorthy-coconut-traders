// Hand-drawn SVG coconut artwork — no external images needed.

export function Coconut({ size = 80, className = '', title }) {
  const id = 'cn' + Math.round(size);
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <radialGradient id={id + 'g'} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#9A6533" />
          <stop offset="60%" stopColor="#6B4220" />
          <stop offset="100%" stopColor="#3E2511" />
        </radialGradient>
      </defs>
      <ellipse cx="50" cy="52" rx="42" ry="44" fill={`url(#${id}g)`} />
      {/* fibre strokes */}
      <g stroke="#3E2511" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" fill="none">
        <path d="M20 40 q6 -4 12 -2" />
        <path d="M24 66 q8 3 14 0" />
        <path d="M62 78 q8 -2 12 -8" />
        <path d="M70 30 q6 4 8 10" />
        <path d="M42 86 q6 2 12 0" />
        <path d="M14 54 q3 6 2 12" />
      </g>
      {/* three eyes */}
      <circle cx="40" cy="30" r="5" fill="#2A170A" />
      <circle cx="56" cy="28" r="5" fill="#2A170A" />
      <circle cx="48" cy="42" r="5" fill="#2A170A" />
      <ellipse cx="32" cy="24" rx="8" ry="4" fill="#FFFFFF" opacity="0.15" transform="rotate(-30 32 24)" />
    </svg>
  );
}

export function HalfCoconut({ size = 160, className = '' }) {
  return (
    <svg className={className} width={size} height={size * 0.75} viewBox="0 0 200 150" aria-hidden="true">
      <path d="M10 60 A90 90 0 0 0 190 60 Z" fill="#6B4220" />
      <path d="M22 60 A78 78 0 0 0 178 60 Z" fill="#FFFDF7" />
      <path d="M38 60 A62 62 0 0 0 162 60 Z" fill="#F1EADB" />
      <ellipse cx="100" cy="60" rx="90" ry="14" fill="#5A361A" />
      <ellipse cx="100" cy="60" rx="78" ry="10" fill="#FFFDF7" />
      <ellipse cx="100" cy="61" rx="62" ry="7" fill="#E9F2F4" />
    </svg>
  );
}

export function TenderCoconut({ size = 160, className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
      <path d="M100 30 L100 8" stroke="#5E8F35" strokeWidth="10" strokeLinecap="round" />
      <path d="M100 30 C 40 30, 22 90, 30 130 C 40 180, 160 180, 170 130 C 178 90, 160 30, 100 30 Z" fill="#8DBF5A" />
      <path d="M100 30 C 70 40, 58 100, 70 160" stroke="#77A84A" strokeWidth="5" fill="none" />
      <path d="M100 30 C 130 40, 142 100, 130 160" stroke="#77A84A" strokeWidth="5" fill="none" />
      <ellipse cx="68" cy="80" rx="12" ry="22" fill="#FFFFFF" opacity="0.22" transform="rotate(20 68 80)" />
      {/* straw */}
      <rect x="112" y="-4" width="10" height="70" rx="5" fill="#F2C98A" transform="rotate(18 117 30)" />
    </svg>
  );
}

export function PalmScene({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 480 460" role="img" aria-label="Coconut palm with a bunch of coconuts">
      <circle cx="240" cy="250" r="200" fill="#2A5E3A" />
      {/* trunk */}
      <path d="M232 470 C 238 360, 228 250, 250 150 L 268 152 C 250 250, 262 360, 258 470 Z" fill="#8A5A2E" />
      <g stroke="#6B4220" strokeWidth="3" opacity="0.6">
        <path d="M236 420 h22" /><path d="M236 380 h22" /><path d="M234 340 h22" />
        <path d="M236 300 h22" /><path d="M240 260 h22" /><path d="M244 220 h22" /><path d="M250 185 h18" />
      </g>
      {/* fronds */}
      <g fill="none" strokeLinecap="round">
        <path d="M258 150 C 200 100, 120 100, 50 160" stroke="#4FA36A" strokeWidth="14" />
        <path d="M258 150 C 320 100, 400 104, 450 170" stroke="#4FA36A" strokeWidth="14" />
        <path d="M258 150 C 220 70, 150 40, 90 60" stroke="#6BBF84" strokeWidth="12" />
        <path d="M258 150 C 300 70, 370 40, 420 70" stroke="#6BBF84" strokeWidth="12" />
        <path d="M258 150 C 250 80, 260 40, 280 10" stroke="#3E8A57" strokeWidth="12" />
        <path d="M258 150 C 200 140, 150 180, 130 240" stroke="#3E8A57" strokeWidth="12" />
        <path d="M258 150 C 320 140, 360 180, 380 240" stroke="#3E8A57" strokeWidth="12" />
      </g>
      {/* leaflets */}
      <g stroke="#6BBF84" strokeWidth="4" strokeLinecap="round" opacity="0.8">
        <path d="M150 112 l-10 26" /><path d="M120 120 l-14 24" /><path d="M90 134 l-16 22" />
        <path d="M360 112 l10 26" /><path d="M390 122 l14 24" /><path d="M420 140 l14 22" />
      </g>
      {/* bunch */}
      <g>
        <circle cx="236" cy="176" r="22" fill="#6B4220" />
        <circle cx="272" cy="180" r="22" fill="#7A4E24" />
        <circle cx="254" cy="204" r="22" fill="#8DBF5A" />
        <circle cx="226" cy="206" r="18" fill="#77A84A" />
        <circle cx="284" cy="210" r="18" fill="#6B4220" />
      </g>
    </svg>
  );
}
