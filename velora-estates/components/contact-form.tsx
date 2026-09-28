"use client";

import { useId, useState, type FormEvent } from "react";
import { getDict, type Locale } from "@/lib/i18n";
import { Monogram } from "@/components/monogram";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
type Values = { name: string; email: string; phone: string; topic: string; message: string };
type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const id = useId();
  const empty: Values = { name: "", email: "", phone: "", topic: t.contact.topics[0], message: "" };
  const [v, setV] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = (x: Values): Errors => {
    const e: Errors = {};
    if (x.name.trim().length < 2) e.name = t.contact.errName;
    if (!EMAIL_RE.test(x.email.trim())) e.email = t.contact.errEmail;
    if (x.message.trim().length < 20) e.message = t.contact.errMessage;
    return e;
  };

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
    const first = (Object.keys(found) as (keyof Errors)[])[0];
    if (first) {
      e.currentTarget.querySelector<HTMLElement>(`[data-f="${first}"]`)?.focus();
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="stock p-8" style={{ animation: "rise 0.6s var(--ease-out)" }}>
        <Monogram className="size-10" />
        <p className="display mt-5 text-[2rem]">{t.contact.sentTitle}</p>
        <p className="mt-3 max-w-md text-ink-2">{t.contact.sentBody}</p>
        <button
          type="button"
          className="btn btn-line mt-8"
          onClick={() => {
            setSent(false);
            setV(empty);
            setTried(false);
            setErrors({});
          }}
        >
          {t.contact.another}
        </button>
      </div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${id}-${k}-e`} className="mt-1.5 text-[0.8125rem] text-error">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Errors) => ({ "aria-invalid": Boolean(errors[k]), "aria-describedby": errors[k] ? `${id}-${k}-e` : undefined });

  return (
    <form onSubmit={submit} noValidate className="stock space-y-5 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="label mb-1.5 block">
            {t.contact.name}
          </label>
          <input id={`${id}-name`} data-f="name" className="field" autoComplete="name" value={v.name} onChange={(e) => update("name", e.target.value)} {...aria("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="label mb-1.5 block">
            {t.contact.email}
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
        <div>
          <label htmlFor={`${id}-phone`} className="label mb-1.5 block">
            {t.contact.phone}
          </label>
          <input id={`${id}-phone`} type="tel" dir="ltr" autoComplete="tel" className="field text-start" value={v.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
        <div>
          <label htmlFor={`${id}-topic`} className="label mb-1.5 block">
            {t.contact.topic}
          </label>
          <select id={`${id}-topic`} className="field" value={v.topic} onChange={(e) => update("topic", e.target.value)}>
            {t.contact.topics.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-message`} className="label mb-1.5 block">
          {t.contact.message}
        </label>
        <textarea id={`${id}-message`} data-f="message" rows={6} className="field resize-y" value={v.message} onChange={(e) => update("message", e.target.value)} {...aria("message")} />
        {err("message")}
      </div>
      <button type="submit" className="btn btn-ink w-full sm:w-auto">
        {t.contact.submit}
      </button>
    </form>
  );
}
