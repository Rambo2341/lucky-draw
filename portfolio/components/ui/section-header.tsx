import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeader({ eyebrow, title, description, action, as = "h2", className }: SectionHeaderProps) {
  const Heading = as;
  return (
    <div className={cn("flex flex-col gap-8 md:flex-row md:items-end md:justify-between", className)}>
      <Reveal className="max-w-3xl">
        <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span aria-hidden className="h-px w-6 bg-accent" />
          {eyebrow}
        </p>
        <Heading
          className={cn(
            "text-balance font-medium tracking-[-0.035em] text-fg",
            as === "h1" ? "text-[2.5rem] leading-[1.02] sm:text-6xl lg:text-7xl" : "text-[2rem] leading-[1.05] sm:text-5xl",
          )}
        >
          {title}
        </Heading>
        {description && <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
      </Reveal>
      {action && <Reveal delay={0.1}>{action}</Reveal>}
    </div>
  );
}
