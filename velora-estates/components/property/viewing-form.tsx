"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { getDict, href, type Locale } from "@/lib/i18n";
import { actions, type ViewingRequest } from "@/lib/store";
import { cn } from "@/lib/cn";
import { AppointmentCard } from "./appointment-card";

const slots = ["10:00", "12:00", "15:00", "17:00", "19:00"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s-]{8,18}$/;

type Values = { date: string; time: string; name: string; phone: string; email: string; notes: string };
type Errors = Partial<Record<keyof Values, string>>;

function tomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function ViewingForm({ slug, locale }: { slug: string; locale: Locale }) {
  const t = getDict(locale);
  const id = useId();
  const empty: Values = { date: "", time: "", name: "", phone: "", email: "", notes: "" };
  const [v, setV] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [tried, setTried] = useState(false);
  const [issued, setIssued] = useState<ViewingRequest | null>(null);

  function validate(x: Values): Errors {
    const e: Errors = {};
    if (!x.date || x.date < tomorrow()) e.date = t.viewing.errDate;
    if (!x.time) e.time = t.viewing.errTime;
    if (x.name.trim().length < 3) e.name = t.viewing.errName;
    if (!PHONE_RE.test(x.phone.trim()) || x.phone.replace(/\D/g, "").length < 8) e.phone = t.viewing.errPhone;
    if (!EMAIL_RE.test(x.email.trim())) e.email = t.viewing.errEmail;
    return e;
  }

  function update<K extends keyof Values>(k: K, val: string) {
    const next = { ...v, [k]: val };
    setV(next);
    if (tried) setErrors(validate(next));
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTried(true);
    const found = validate(v);
    setErrors(found);
    const first = (Object.keys(found) as (keyof Values)[])[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[data-f="${first}"]`)?.focus();
      return;
    }
    setIssued(actions.addRequest({ slug, date: v.date, time: v.time, name: v.name.trim() }));
  }

  if (issued) {
    return (
      <div role="status">
        <AppointmentCard request={issued} locale={locale} fresh />
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            className="btn btn-line"
            onClick={() => {
              setIssued(null);
              setV(empty);
              setTried(false);
              setErrors({});
            }}
          >
            {t.viewing.another}
          </button>
          <Link href={href(locale, "/favorites")} className="btn btn-ink">
            {t.viewing.allRequests}
          </Link>
        </div>
      </div>
    );
  }

  const err = (k: keyof Values) =>
    errors[k] ? (
      <p id={`${id}-${k}-e`} className="mt-1.5 text-[0.8125rem] text-error">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Values) => ({ "aria-invalid": Boolean(errors[k]), "aria-describedby": errors[k] ? `${id}-${k}-e` : undefined });

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div>
        <label htmlFor={`${id}-date`} className="label mb-1.5 block">
          {t.viewing.date}
        </label>
        <input
          id={`${id}-date`}
          data-f="date"
          type="date"
          className="field"
          value={v.date}
          onFocus={(e) => (e.currentTarget.min = tomorrow())}
          onChange={(e) => update("date", e.target.value)}
          {...aria("date")}
        />
        {err("date")}
      </div>
      <fieldset aria-describedby={errors.time ? `${id}-time-e` : undefined}>
        <legend className="label mb-1.5">{t.viewing.time}</legend>
        <div className="flex flex-wrap gap-2" dir="ltr">
          {slots.map((s, i) => (
            <label
              key={s}
              className={cn(
                "inline-flex min-h-11 cursor-pointer items-center border px-3.5 text-[0.9375rem] tabular-nums transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink",
                v.time === s ? "border-ink bg-ink text-stock" : "border-rule hover:border-ink",
                errors.time && v.time !== s && "border-error/60",
              )}
            >
              <input
                type="radio"
                name={`${id}-time`}
                value={s}
                checked={v.time === s}
                onChange={() => update("time", s)}
                className="sr-only"
                data-f={i === 0 ? "time" : undefined}
              />
              {s}
            </label>
          ))}
        </div>
        {err("time")}
      </fieldset>
      <div>
        <label htmlFor={`${id}-name`} className="label mb-1.5 block">
          {t.viewing.name}
        </label>
        <input id={`${id}-name`} data-f="name" className="field" autoComplete="name" value={v.name} onChange={(e) => update("name", e.target.value)} {...aria("name")} />
        {err("name")}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-phone`} className="label mb-1.5 block">
            {t.viewing.phone}
          </label>
          <input
            id={`${id}-phone`}
            data-f="phone"
            type="tel"
            dir="ltr"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+966 5X XXX XXXX"
            className="field text-start"
            value={v.phone}
            onChange={(e) => update("phone", e.target.value)}
            {...aria("phone")}
          />
          {err("phone")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="label mb-1.5 block">
            {t.viewing.email}
          </label>
          <input
            id={`${id}-email`}
            data-f="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            className="field text-start"
            value={v.email}
            onChange={(e) => update("email", e.target.value)}
            {...aria("email")}
          />
          {err("email")}
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-notes`} className="label mb-1.5 block">
          {t.viewing.notes}
        </label>
        <textarea id={`${id}-notes`} rows={3} className="field resize-y" placeholder={t.viewing.notesPh} value={v.notes} onChange={(e) => update("notes", e.target.value)} />
      </div>
      <button type="submit" className="btn btn-ink w-full sm:w-auto">
        {t.viewing.submit}
      </button>
    </form>
  );
}
