/** Decorative, hand-built SVG: dotted grid, flowing route lines, stylised container ship. */
export function HeroArt({label}: {label: string}) {
  const boxes: {x: number; y: number; c: string}[] = [];
  const palette = ['#E8833A', '#1F7A8C', '#F5F3EE', '#3E8FA0', '#C96A27', '#DCD8CC'];
  const perRow = [7, 7, 5, 3]; // bottom row first
  perRow.forEach((n, r) => {
    for (let i = 0; i < n; i++) {
      boxes.push({x: 112 + i * 37 + (r > 1 ? 18 : 0), y: 296 - r * 23, c: palette[(i * 3 + r * 2) % palette.length]});
    }
  });

  return (
    <svg viewBox="0 0 560 460" role="img" aria-label={label} className="h-auto w-full">
      <defs>
        <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill="#fff" opacity="0.18" />
        </pattern>
        <radialGradient id="glow" cx="50%" cy="45%" r="55%">
          <stop offset="0" stopColor="#1F7A8C" stopOpacity="0.55" />
          <stop offset="1" stopColor="#1F7A8C" stopOpacity="0" />
        </radialGradient>
        <clipPath id="sea">
          <rect x="0" y="340" width="560" height="120" />
        </clipPath>
      </defs>

      <rect width="560" height="460" rx="28" fill="url(#glow)" />
      <rect width="560" height="460" rx="28" fill="url(#dots)" />

      {/* route lines */}
      <g fill="none" strokeLinecap="round">
        <path d="M60 210 C150 80 330 40 480 110" stroke="#E8833A" strokeWidth="2.2" className="route-flow" />
        <path d="M90 150 C200 60 360 90 500 190" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.6" className="route-flow" />
        <path d="M40 270 C120 190 300 170 520 250" stroke="#1F7A8C" strokeWidth="2" className="route-flow" />
      </g>
      <g>
        <circle cx="480" cy="110" r="14" fill="#E8833A" opacity="0.25" className="pulse-ring" />
        <circle cx="480" cy="110" r="6" fill="#E8833A" />
        <circle cx="60" cy="210" r="5" fill="#F5F3EE" />
        <circle cx="500" cy="190" r="4.5" fill="#F5F3EE" />
        <circle cx="520" cy="250" r="4.5" fill="#1F7A8C" stroke="#F5F3EE" strokeWidth="1.5" />
      </g>

      {/* ship */}
      <g className="ship-bob">
        {boxes.map((b, i) => (
          <rect key={i} x={b.x} y={b.y - 20} width="34" height="20" rx="2" fill={b.c} stroke="#0B1F3A" strokeOpacity="0.35" />
        ))}
        {/* deck line */}
        <rect x="104" y="300" width="330" height="8" fill="#0B1F3A" opacity="0.4" />
        {/* bridge */}
        <rect x="392" y="236" width="52" height="64" rx="3" fill="#F5F3EE" />
        <rect x="402" y="246" width="32" height="8" rx="2" fill="#0B1F3A" opacity="0.75" />
        <rect x="402" y="262" width="32" height="6" rx="2" fill="#0B1F3A" opacity="0.4" />
        <rect x="414" y="214" width="14" height="24" fill="#E8833A" />
        {/* hull */}
        <path d="M80 304 H470 L438 350 H122 Z" fill="#F5F3EE" />
        <path d="M96 326 H455 L438 350 H122 Z" fill="#1F7A8C" />
        <path d="M80 304 H470 L466 312 H85 Z" fill="#E8833A" />
      </g>

      {/* waves */}
      <g clipPath="url(#sea)" fill="none" strokeLinecap="round">
        <g className="wave-drift">
          <path d="M-60 358 q30 -14 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0" stroke="#fff" strokeOpacity="0.55" strokeWidth="2" />
          <path d="M-60 384 q30 -14 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0" stroke="#1F7A8C" strokeWidth="2.4" />
          <path d="M-60 410 q30 -14 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0" stroke="#fff" strokeOpacity="0.3" strokeWidth="2" />
        </g>
      </g>
    </svg>
  );
}
