/**
 * Abstract, code-drawn stand-ins for photography inside the interface
 * previews. They are deliberately illustrative so nothing is presented as a
 * real property or product photo.
 */

const houseTones = [
  { sky: ["#c9b8a3", "#e9dfd2"], wall: "#f3eee7", shade: "#b9ab99", glass: "#3b3a38", ground: "#8f8a78" },
  { sky: ["#8ea0a6", "#d6d9d3"], wall: "#e8e4dc", shade: "#a8a397", glass: "#2c3134", ground: "#6f7a68" },
  { sky: ["#d9a785", "#efd9c4"], wall: "#f1e7dc", shade: "#c0a58c", glass: "#3a302a", ground: "#8a7b64" },
  { sky: ["#5d6670", "#b9bcb8"], wall: "#d9d6cf", shade: "#9a958b", glass: "#1f2326", ground: "#56604f" },
] as const;

export function HouseArt({ variant = 0, className }: { variant?: number; className?: string }) {
  const t = houseTones[variant % houseTones.length];
  const flip = variant % 2 === 1;
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <rect width="400" height="260" fill={t.sky[1]} />
      <rect width="400" height="90" fill={t.sky[0]} opacity="0.7" />
      <rect y="90" width="400" height="40" fill={t.sky[0]} opacity="0.35" />
      <g transform={flip ? "translate(400 0) scale(-1 1)" : undefined}>
        <rect x="0" y="200" width="400" height="60" fill={t.ground} />
        <rect x="70" y="118" width="210" height="84" fill={t.wall} />
        <rect x="150" y="70" width="170" height="50" fill={t.wall} />
        <rect x="150" y="116" width="170" height="6" fill={t.shade} />
        <rect x="60" y="112" width="100" height="6" fill={t.shade} />
        <rect x="170" y="80" width="130" height="32" fill={t.glass} opacity="0.9" />
        <rect x="90" y="132" width="70" height="60" fill={t.glass} opacity="0.85" />
        <rect x="180" y="132" width="80" height="60" fill={t.glass} opacity="0.75" />
        <rect x="0" y="198" width="400" height="4" fill={t.shade} />
        <rect x="290" y="196" width="110" height="10" fill="#7fa3ad" opacity="0.6" />
        <circle cx="340" cy="150" r="34" fill={t.ground} opacity="0.55" />
        <rect x="338" y="160" width="4" height="40" fill={t.ground} />
      </g>
    </svg>
  );
}

const productTones = ["#e7e1d8", "#dfe3e0", "#e9dfdc", "#e2e0e8", "#ece6d6", "#dde2e6"] as const;

/** Simple product silhouettes on soft studio backgrounds. */
export function ProductArt({ variant = 0, className }: { variant?: number; className?: string }) {
  const bg = productTones[variant % productTones.length];
  const kind = variant % 4;
  return (
    <svg viewBox="0 0 300 360" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <rect width="300" height="360" fill={bg} />
      <ellipse cx="150" cy="300" rx="90" ry="10" fill="#000" opacity="0.08" />
      {kind === 0 && (
        <g>
          <path d="M120 120 Q120 100 135 96 L165 96 Q180 100 180 120 L186 290 Q186 300 176 300 L124 300 Q114 300 114 290 Z" fill="#c9b9a5" />
          <rect x="136" y="76" width="28" height="22" rx="3" fill="#2a2724" />
        </g>
      )}
      {kind === 1 && (
        <g>
          <path d="M95 300 L110 170 L190 170 L205 300 Z" fill="#6f7d74" />
          <rect x="104" y="150" width="92" height="22" rx="4" fill="#58655d" />
          <path d="M130 150 Q150 90 170 150" fill="none" stroke="#3c443f" strokeWidth="6" />
        </g>
      )}
      {kind === 2 && (
        <g>
          <circle cx="150" cy="210" r="80" fill="#b98f82" />
          <rect x="130" y="112" width="40" height="30" rx="6" fill="#a47b6f" />
        </g>
      )}
      {kind === 3 && (
        <g>
          <rect x="146" y="120" width="8" height="170" fill="#3a3a3f" />
          <path d="M100 130 L200 130 L180 70 L120 70 Z" fill="#8c86a0" />
          <rect x="115" y="288" width="70" height="12" rx="4" fill="#3a3a3f" />
        </g>
      )}
    </svg>
  );
}
