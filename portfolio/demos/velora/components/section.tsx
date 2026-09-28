import type { ReactNode } from "react";
import { cn } from "@/demos/velora/lib/cn";

export function Shell({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-10", className)}>{children}</div>;
}

/** Page opener used by inner pages: title, lede, optional aside. */
export function PageHead({ title, lede, aside }: { title: string; lede?: string; aside?: ReactNode }) {
  return (
    <div className="border-b border-rule bg-paper">
      <Shell className="flex flex-col gap-6 py-12 md:flex-row md:items-end md:justify-between md:py-16">
        <div className="max-w-2xl">
          <h1 className="display reveal text-[2.75rem] sm:text-[3.75rem]">{title}</h1>
          {lede && (
            <p className="reveal mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-ink-2" style={{ ["--d" as string]: "80ms" }}>
              {lede}
            </p>
          )}
        </div>
        {aside}
      </Shell>
    </div>
  );
}
