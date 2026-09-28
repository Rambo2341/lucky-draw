"use client";

import { Check } from "lucide-react";
import { getDict, type Locale } from "@/lib/i18n";
import { actions, useStore } from "@/lib/store";
import { cn } from "@/lib/cn";

export function SetAsideButton({ slug, locale, name, large }: { slug: string; locale: Locale; name: string; large?: boolean }) {
  const t = getDict(locale);
  const { saved } = useStore();
  const on = saved.includes(slug);
  return (
    <button
      type="button"
      onClick={() => actions.toggleSaved(slug)}
      aria-pressed={on}
      aria-label={`${on ? t.card.remove : t.card.setAside}: ${name}`}
      className={cn(
        "relative z-10 inline-flex min-h-11 items-center gap-2 border px-3.5 text-[0.875rem] font-medium transition-colors",
        large && "min-h-12 px-5 text-[0.9375rem]",
        on ? "border-ink bg-ink text-stock" : "border-ink/70 text-ink hover:bg-sand",
      )}
    >
      {on ? (
        <Check aria-hidden className="size-4" strokeWidth={2} style={{ animation: "stamp 0.4s var(--ease-out)" }} />
      ) : (
        <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
          <rect x="2" y="4" width="12" height="8" rx="1" />
          <path d="M8 1.5v5M5.8 4.5 8 6.7l2.2-2.2" />
        </svg>
      )}
      {on ? t.card.setAsideDone : t.card.setAside}
    </button>
  );
}
