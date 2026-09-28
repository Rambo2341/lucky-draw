import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Minimal browser chrome around a desktop interface. */
export function BrowserFrame({ url, children, className }: { url: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-[10px] border border-white/10 bg-[#1a1a1d] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]", className)}>
      <div className="flex h-7 items-center gap-3 border-b border-white/5 px-3" aria-hidden>
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
        </div>
        <div className="mx-auto hidden h-4 w-2/5 max-w-60 items-center justify-center rounded bg-white/5 font-mono text-[9px] text-white/40 sm:flex">
          {url}
        </div>
        <div className="w-10" />
      </div>
      <div className="preview-canvas">{children}</div>
    </div>
  );
}

/** Phone bezel; the screen is 39em wide (≈390px device) and scales fluidly. */
export function PhoneFrame({ children, className, tone = "dark" }: { children: ReactNode; className?: string; tone?: "dark" | "light" }) {
  return (
    <div
      className={cn(
        "relative rounded-[13%/6%] border border-white/10 bg-[#0c0c0e] p-[3.2%] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.75)]",
        className,
      )}
    >
      <div className={cn("preview-canvas relative overflow-hidden rounded-[10.5%/4.9%]", tone === "light" ? "bg-white" : "bg-black")}>
        <div aria-hidden className="absolute left-1/2 top-[1.3%] z-10 h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  );
}
