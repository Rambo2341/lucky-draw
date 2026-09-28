import { cn } from "@/lib/cn";

/** Blind-embossed V monogram: the same shape drawn twice, offset light and dark, like a press on card stock. */
export function Monogram({ className, tone = "stock" }: { className?: string; tone?: "stock" | "ink" }) {
  const base = tone === "ink" ? "#141312" : "currentColor";
  return (
    <svg viewBox="0 0 40 40" className={cn("shrink-0", className)} aria-hidden>
      <circle cx="20" cy="20" r="18.5" fill="none" stroke={base} strokeWidth="1" />
      <circle cx="20" cy="20" r="15.5" fill="none" stroke={base} strokeWidth="0.5" opacity="0.5" />
      <path d="M12.5 12.5h4.2L20 23.6l3.3-11.1h4.2L21.6 28h-3.2z" fill={base} />
    </svg>
  );
}

/** Large decorative emboss for sand fields: only light and shadow, no ink. */
export function EmbossMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={cn("pointer-events-none select-none", className)} aria-hidden>
      <g transform="translate(1.2 1.2)" opacity="0.55" fill="none" stroke="#ffffff" strokeWidth="1.4">
        <circle cx="100" cy="100" r="92" />
        <circle cx="100" cy="100" r="80" />
        <path d="M62 62h21l17 56 17-56h21l-31 78h-16z" fill="#ffffff" stroke="none" />
      </g>
      <g opacity="0.22" fill="none" stroke="#8c7b5f" strokeWidth="1.4">
        <circle cx="100" cy="100" r="92" />
        <circle cx="100" cy="100" r="80" />
        <path d="M62 62h21l17 56 17-56h21l-31 78h-16z" fill="#8c7b5f" stroke="none" />
      </g>
    </svg>
  );
}
