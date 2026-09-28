import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tag({ children, tone = "default", className }: { children: ReactNode; tone?: "default" | "accent"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] uppercase leading-none tracking-[0.08em]",
        tone === "accent" ? "border-accent/30 bg-accent-soft text-accent" : "border-line text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function AvailabilityBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-bg-2/80 py-1.5 pl-2.5 pr-3.5 text-[0.8125rem] text-muted">
      <span aria-hidden className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
      </span>
      {label}
    </span>
  );
}
