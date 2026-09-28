"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { cities } from "@/data/people-places";
import { propertyTypes, type Purpose } from "@/data/properties";
import { budgetOptions, toQuery } from "@/lib/filters";
import { getDict, href, tr, type Locale } from "@/lib/i18n";
import { usdShort } from "@/lib/format";

/** The concierge request slip: a sentence with printed blanks. */
export function RequestSlip({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const router = useRouter();
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [purpose, setPurpose] = useState<Purpose>("sale");
  const [max, setMax] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const q = toQuery({
      type: (type || undefined) as never,
      city: (city || undefined) as never,
      purpose,
      max: max ? Number(max) : undefined,
    });
    router.push(`${href(locale, "/properties")}${q}`);
  }

  return (
    <form onSubmit={submit} className="border-y border-ink py-6" aria-labelledby="slip-legend">
      <p id="slip-legend" className="label mb-4">
        {t.home.slipLabel}
      </p>
      <p className="display text-[1.5rem] leading-[1.7] sm:text-[1.875rem] rtl:leading-[1.9]">
        {t.home.slipLooking}{" "}
        <label className="sr-only" htmlFor="slip-type">
          {t.props.type}
        </label>
        <select id="slip-type" className="blank" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">{t.home.anyType}</option>
          {Object.entries(propertyTypes).map(([id, l]) => (
            <option key={id} value={id}>
              {tr(l, locale)}
            </option>
          ))}
        </select>{" "}
        {t.home.slipIn}{" "}
        <label className="sr-only" htmlFor="slip-city">
          {t.props.city}
        </label>
        <select id="slip-city" className="blank" value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">{t.home.anyCity}</option>
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {tr(c.name, locale)}
            </option>
          ))}
        </select>{" "}
        {t.home.slipTo}
        <label className="sr-only" htmlFor="slip-purpose">
          {t.props.status}
        </label>
        <select
          id="slip-purpose"
          className="blank ms-[0.3em]"
          value={purpose}
          onChange={(e) => {
            setPurpose(e.target.value as Purpose);
            setMax("");
          }}
        >
          <option value="sale">{t.home.slipBuy}</option>
          <option value="rent">{t.home.slipRent}</option>
        </select>
        {t.home.slipUpTo}{" "}
        <label className="sr-only" htmlFor="slip-budget">
          {t.props.budget}
        </label>
        <select id="slip-budget" className="blank" value={max} onChange={(e) => setMax(e.target.value)}>
          <option value="">{t.home.anyBudget}</option>
          {budgetOptions[purpose].map((b) => (
            <option key={b} value={b}>
              {usdShort(b, locale)}
            </option>
          ))}
        </select>
        .
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-ink">
          {t.home.submit}
          <ArrowRight aria-hidden className="size-4 rtl:rotate-180" strokeWidth={1.5} />
        </button>
        <span className="text-[0.8125rem] text-ink-3">{t.props.budgetNote}</span>
      </div>
    </form>
  );
}
