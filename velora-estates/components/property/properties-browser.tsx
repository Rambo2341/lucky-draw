"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { cities } from "@/data/people-places";
import { propertyTypes, purposes, type Purpose } from "@/data/properties";
import { applyFilters, bedOptions, budgetOptions, parseFilters, toQuery, type Filters } from "@/lib/filters";
import { getDict, tr, type Locale } from "@/lib/i18n";
import { usdShort } from "@/lib/format";
import { Shell } from "@/components/section";
import { PropertyCard } from "./property-card";

export function PropertiesBrowser({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const filters = parseFilters(new URLSearchParams(params.toString()));
  const results = applyFilters(filters);
  const [open, setOpen] = useState(false);
  const id = useId();

  const activeCount = [filters.city, filters.type, filters.purpose, filters.max, filters.beds].filter(Boolean).length;

  function set(patch: Partial<Filters>) {
    const next = { ...filters, ...patch };
    if (patch.purpose !== undefined && patch.purpose !== filters.purpose) next.max = undefined;
    router.replace(`${pathname}${toQuery(next)}`, { scroll: false });
  }

  const sortLabels: Record<Filters["sort"], string> = {
    newest: t.props.sortNewest,
    "price-asc": t.props.sortPriceAsc,
    "price-desc": t.props.sortPriceDesc,
    area: t.props.sortArea,
  };

  const field = (name: string, label: string, value: string, onChange: (v: string) => void, options: [string, string][], disabled?: boolean) => (
    <div className="min-w-0">
      <label htmlFor={`${id}-${name}`} className="label mb-1.5 block">
        {label}
      </label>
      <select id={`${id}-${name}`} className="field" value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)}>
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <>
      <div className="sticky top-16 z-20 border-b border-rule bg-stock/95 backdrop-blur-sm lg:top-[4.5rem]">
        <Shell className="py-3">
          <div className="flex items-center justify-between gap-3 lg:hidden">
            <button
              type="button"
              className="btn btn-line min-h-11 px-4"
              aria-expanded={open}
              aria-controls={`${id}-panel`}
              onClick={() => setOpen((v) => !v)}
            >
              <SlidersHorizontal aria-hidden className="size-4" strokeWidth={1.5} />
              {t.props.title}
              {activeCount > 0 && <span className="serial bg-ink px-1.5 text-stock">{activeCount}</span>}
            </button>
            <p className="text-[0.9375rem] tabular-nums text-ink-2" aria-live="polite">
              {t.props.results(results.length)}
            </p>
          </div>
          <div id={`${id}-panel`} className={`${open ? "grid" : "hidden"} mt-3 gap-3 sm:grid-cols-2 lg:mt-0 lg:grid lg:grid-cols-[repeat(6,minmax(0,1fr))_auto] lg:items-end`}>
            {field("city", t.props.city, filters.city ?? "", (v) => set({ city: (v || undefined) as Filters["city"] }), [
              ["", t.props.any],
              ...cities.map((c) => [c.id, tr(c.name, locale)] as [string, string]),
            ])}
            {field("type", t.props.type, filters.type ?? "", (v) => set({ type: (v || undefined) as Filters["type"] }), [
              ["", t.props.any],
              ...Object.entries(propertyTypes).map(([k, l]) => [k, tr(l, locale)] as [string, string]),
            ])}
            {field("purpose", t.props.status, filters.purpose ?? "", (v) => set({ purpose: (v || undefined) as Purpose | undefined }), [
              ["", t.props.any],
              ...Object.entries(purposes).map(([k, l]) => [k, tr(l, locale)] as [string, string]),
            ])}
            {field(
              "budget",
              t.props.budget,
              filters.max ? String(filters.max) : "",
              (v) => set({ max: v ? Number(v) : undefined }),
              [["", t.props.any], ...(filters.purpose ? budgetOptions[filters.purpose] : []).map((b) => [String(b), usdShort(b, locale)] as [string, string])],
              !filters.purpose,
            )}
            {field("beds", t.props.beds, filters.beds ? String(filters.beds) : "", (v) => set({ beds: v ? Number(v) : undefined }), [
              ["", t.props.any],
              ...bedOptions.map((b) => [String(b), t.props.bedsMin(b)] as [string, string]),
            ])}
            {field("sort", t.props.sort, filters.sort, (v) => set({ sort: v as Filters["sort"] }), Object.entries(sortLabels) as [string, string][])}
            <button
              type="button"
              className="btn min-h-12 px-3 text-[0.875rem] text-ink-2 underline hover:text-ink disabled:no-underline"
              onClick={() => router.replace(pathname, { scroll: false })}
              disabled={activeCount === 0 && filters.sort === "newest"}
            >
              {t.props.reset}
            </button>
          </div>
        </Shell>
      </div>

      <Shell className="py-10 md:py-14">
        <div className="mb-8 hidden items-baseline justify-between gap-4 lg:flex">
          <p className="text-[0.9375rem] tabular-nums text-ink-2" aria-live="polite">
            {t.props.results(results.length)}
          </p>
          <p className="text-[0.8125rem] text-ink-3">{t.props.budgetNote}</p>
        </div>
        {results.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((p, i) => (
              <PropertyCard key={p.slug} property={p} locale={locale} priority={i < 3} notch="var(--color-stock)" />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-md py-20 text-center">
            <p className="display text-[2rem]">{t.props.emptyTitle}</p>
            <p className="mt-3 text-ink-2">{t.props.emptyBody}</p>
            <button type="button" className="btn btn-ink mt-8" onClick={() => router.replace(pathname, { scroll: false })}>
              {t.props.reset}
            </button>
          </div>
        )}
      </Shell>
    </>
  );
}
