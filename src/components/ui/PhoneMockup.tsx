/**
 * Mockup de iPhone exibindo o mapa tático do ORYX.
 * SVG-only pra zero peso de imagem + escala perfeita.
 *
 * O conteúdo da "tela" é um mini-render do mapa com markers,
 * mesma estética que vai aparecer no app real.
 */
export function PhoneMockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 640"
      className={className}
      role="img"
      aria-label="Mapa tático do ORYX rodando no celular"
    >
      {/* Phone body */}
      <rect
        x="8"
        y="8"
        width="304"
        height="624"
        rx="48"
        fill="#0a0a0a"
        stroke="#2a2a2a"
        strokeWidth="2"
      />
      <rect
        x="14"
        y="14"
        width="292"
        height="612"
        rx="42"
        fill="#1a1a1a"
      />

      {/* Notch */}
      <rect x="120" y="20" width="80" height="22" rx="11" fill="#0a0a0a" />

      {/* HUD top — status bar */}
      <g transform="translate(28, 64)">
        <rect width="264" height="46" rx="8" fill="rgba(0,0,0,0.65)" />
        <circle cx="14" cy="23" r="4" fill="#22c55e">
          <animate
            attributeName="opacity"
            values="1;0.4;1"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
        <text x="28" y="22" fontFamily="ui-monospace" fontSize="8" fill="#a3a3a3">
          BAT 87% · GPS 5/5 · ON
        </text>
        <text x="28" y="36" fontFamily="ui-monospace" fontSize="10" fill="#f5f5f5" fontWeight="700">
          ⏱ 24:18
        </text>
        <text x="180" y="36" fontFamily="ui-monospace" fontSize="10" fill="#c8202c" fontWeight="700">
          ▲ 4/4
        </text>
        <rect x="220" y="14" width="36" height="20" rx="4" fill="#c8202c" />
        <text x="238" y="28" textAnchor="middle" fontFamily="ui-monospace" fontSize="10" fill="#fff" fontWeight="800">
          2:1
        </text>
      </g>

      {/* Map area — satellite-ish grid */}
      <defs>
        <pattern
          id="grid"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        </pattern>
        <radialGradient id="objZone" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(200,32,44,0.4)" />
          <stop offset="100%" stopColor="rgba(200,32,44,0)" />
        </radialGradient>
        <radialGradient id="ally1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(34,197,94,0.6)" />
          <stop offset="100%" stopColor="rgba(34,197,94,0)" />
        </radialGradient>
      </defs>

      <rect x="14" y="118" width="292" height="378" fill="#1f2521" />
      <rect x="14" y="118" width="292" height="378" fill="url(#grid)" />

      {/* Terrain blobs — fake topology */}
      <ellipse cx="80" cy="200" rx="50" ry="30" fill="rgba(60,80,50,0.5)" />
      <ellipse cx="220" cy="280" rx="65" ry="40" fill="rgba(60,80,50,0.4)" />
      <ellipse cx="150" cy="400" rx="80" ry="35" fill="rgba(60,80,50,0.5)" />

      {/* Objective zone */}
      <circle cx="160" cy="300" r="60" fill="url(#objZone)" />
      <circle cx="160" cy="300" r="60" fill="none" stroke="#c8202c" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />
      <text x="160" y="304" textAnchor="middle" fontFamily="ui-monospace" fontSize="9" fontWeight="800" fill="#c8202c">
        OBJ ALPHA
      </text>

      {/* Self marker (center, pulsing green) */}
      <circle cx="160" cy="380" r="20" fill="url(#ally1)" />
      <circle cx="160" cy="380" r="9" fill="#22c55e" stroke="#fff" strokeWidth="2">
        <animate attributeName="r" values="9;11;9" dur="1.8s" repeatCount="indefinite" />
      </circle>

      {/* Squad mates (blue dots) */}
      <g>
        <circle cx="120" cy="340" r="6" fill="#2962ff" stroke="#fff" strokeWidth="1.5" />
        <circle cx="195" cy="345" r="6" fill="#2962ff" stroke="#fff" strokeWidth="1.5" />
        <circle cx="140" cy="420" r="6" fill="#2962ff" stroke="#fff" strokeWidth="1.5" />
        <circle cx="185" cy="415" r="6" fill="#2962ff" stroke="#fff" strokeWidth="1.5" />
      </g>

      {/* Enemy markers (orange/amber, fewer) */}
      <g>
        <circle cx="80" cy="230" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
        <circle cx="240" cy="200" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
      </g>

      {/* Ping marker (animated ring) */}
      <g>
        <circle cx="100" cy="450" r="4" fill="#c8202c" />
        <circle cx="100" cy="450" r="6" fill="none" stroke="#c8202c" strokeWidth="1.5">
          <animate attributeName="r" values="6;18;6" dur="1.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0;1" dur="1.6s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Action bar bottom */}
      <g transform="translate(28, 520)">
        <rect width="124" height="40" rx="6" fill="#c8202c" />
        <text x="62" y="25" textAnchor="middle" fontFamily="ui-sans-serif" fontSize="10" fontWeight="800" fill="#fff">
          FUI ELIMINADO
        </text>
        <rect x="132" y="0" width="124" height="40" rx="6" fill="#f59e0b" />
        <text x="194" y="25" textAnchor="middle" fontFamily="ui-sans-serif" fontSize="10" fontWeight="800" fill="#0a0a0a">
          VI INIMIGO
        </text>
      </g>

      {/* Home indicator */}
      <rect x="120" y="608" width="80" height="4" rx="2" fill="#3a3a3a" />
    </svg>
  );
}
