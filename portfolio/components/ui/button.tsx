import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group/btn inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-[0.9375rem] font-medium tracking-[-0.01em] transition-[background-color,color,border-color,transform] duration-300 ease-out-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:bg-white",
  secondary: "border border-line text-fg hover:border-subtle hover:bg-surface",
  ghost: "px-0 text-fg hover:text-accent",
};

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  external?: boolean;
  arrow?: boolean;
  /** Screen-reader note for external links, in the page language. */
  newTabLabel?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"a">, "href">;

/** Renders an internal <Link> or an external <a> with safe defaults. */
export function ButtonLink({ href, variant = "primary", external, arrow, newTabLabel = "(opens in a new tab)", className, children, ...rest }: ButtonLinkProps) {
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 ease-out-expo group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover/btn:-translate-x-0.5"
        />
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClass(variant, className)} {...rest}>
        {content}
        <span className="sr-only"> {newTabLabel}</span>
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, className)} {...rest}>
      {content}
    </Link>
  );
}
