"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import {
  budgetRanges,
  limits,
  projectTypes,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactInput,
  type ErrorCode,
} from "@/lib/contact";
import { site } from "@/data/site";
import { getDict, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { buttonClass } from "@/components/ui/button";

type Status = "idle" | "submitting" | "success" | "error";

const empty: ContactInput = { name: "", email: "", phone: "", projectType: "", budget: "", message: "" };
const fieldOrder: ContactField[] = ["name", "email", "phone", "projectType", "budget", "message"];

export function ContactForm({ locale }: { locale: Locale }) {
  const t = getDict(locale).contact;
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const fid = (f: string) => `${id}-${f}`;
  const message = (code?: ErrorCode) => {
    if (!code) return undefined;
    const m = t.errors[code];
    return typeof m === "function" ? m(limits.messageMin) : m;
  };

  function update<K extends ContactField>(field: K, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (submitted) setErrors(validateContact(next));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    const found = validateContact(values);
    setErrors(found);
    const first = fieldOrder.find((f) => found[f]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setErrorMessage("");
    const honeypot = (formRef.current?.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale, company: honeypot }),
      });
      if (res.ok) {
        setStatus("success");
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string; errors?: ContactErrors };
      if (data.errors) setErrors(data.errors);
      setStatus("error");
      setErrorMessage(data.error === "not_configured" && process.env.NODE_ENV === "development" ? t.notConfigured : t.failed);
    } catch {
      setStatus("error");
      setErrorMessage(t.network);
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-line bg-bg-2 p-8 md:p-12">
        <span className="grid size-12 place-items-center rounded-full bg-accent text-bg">
          <Check aria-hidden className="size-5" />
        </span>
        <h2 className="mt-6 text-2xl font-medium tracking-[-0.03em] md:text-3xl">{t.thanks(values.name.trim().split(" ")[0])}</h2>
        <p className="mt-3 max-w-md leading-relaxed text-muted">{t.sent(values.email.trim())}</p>
        <button
          type="button"
          onClick={() => {
            setValues(empty);
            setErrors({});
            setSubmitted(false);
            setStatus("idle");
          }}
          className={buttonClass("secondary", "mt-8")}
        >
          {t.another}
        </button>
      </div>
    );
  }

  const mailto = site.email
    ? `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry — ${values.projectType || "New project"}`)}&body=${encodeURIComponent(values.message)}`
    : "";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative space-y-8" aria-describedby={`${id}-required`}>
      <p id={`${id}-required`} className="text-sm text-subtle">
        {t.required}
      </p>

      <div className="grid gap-8 sm:grid-cols-2">
        <TextField
          id={fid("name")}
          field="name"
          label={t.name}
          autoComplete="name"
          value={values.name}
          error={message(errors.name)}
          maxLength={limits.name}
          onChange={(v) => update("name", v)}
        />
        <TextField
          id={fid("email")}
          field="email"
          label={t.email}
          type="email"
          autoComplete="email"
          inputMode="email"
          ltr
          value={values.email}
          error={message(errors.email)}
          maxLength={limits.email}
          onChange={(v) => update("email", v)}
        />
      </div>

      <TextField
        id={fid("phone")}
        field="phone"
        label={t.phone}
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        ltr
        placeholder="+966 5X XXX XXXX"
        hint={t.phoneHint}
        value={values.phone}
        error={message(errors.phone)}
        maxLength={limits.phone}
        onChange={(v) => update("phone", v)}
      />

      <ChoiceField
        id={fid("projectType")}
        field="projectType"
        legend={t.projectType}
        options={projectTypes.map((o) => [o, t.projectTypes[o]])}
        value={values.projectType}
        error={message(errors.projectType)}
        onChange={(v) => update("projectType", v)}
      />

      <ChoiceField
        id={fid("budget")}
        field="budget"
        legend={t.budget}
        options={budgetRanges.map((o) => [o, t.budgets[o]])}
        value={values.budget}
        error={message(errors.budget)}
        onChange={(v) => update("budget", v)}
      />

      <div>
        <label htmlFor={fid("message")} className="block text-sm font-medium">
          {t.message}
        </label>
        <textarea
          id={fid("message")}
          data-field="message"
          rows={6}
          value={values.message}
          maxLength={limits.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${fid("message")}-error` : `${fid("message")}-hint`}
          placeholder={t.messagePh}
          className={cn(inputClass, "resize-y py-3 leading-relaxed", errors.message && errorBorder)}
        />
        {errors.message ? (
          <FieldError id={`${fid("message")}-error`}>{message(errors.message)!}</FieldError>
        ) : (
          <p id={`${fid("message")}-hint`} className="mt-2 text-xs text-subtle">
            {t.messageHint}
          </p>
        )}
      </div>

      {/* Honeypot for bots — hidden from people and assistive tech. */}
      <div aria-hidden className="sr-only">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div aria-live="polite">
        {status === "error" && (
          <div role="alert" className="rounded-xl border border-red-400/30 bg-red-400/5 p-4 text-sm leading-relaxed text-red-200">
            {errorMessage}
            {mailto && (
              <>
                {" "}
                {t.orEmail}{" "}
                <a href={mailto} className="underline underline-offset-4 hover:text-fg">
                  {t.emailDirect}
                </a>
                .
              </>
            )}
          </div>
        )}
      </div>

      <button type="submit" disabled={status === "submitting"} className={buttonClass("primary", "h-12 w-full px-7 sm:w-auto")}>
        {status === "submitting" ? (
          <>
            <LoaderCircle aria-hidden className="size-4 animate-spin" />
            {t.sending}
          </>
        ) : (
          <>
            {t.send}
            <ArrowRight aria-hidden className="size-4 rtl:rotate-180" />
          </>
        )}
      </button>
    </form>
  );
}

const inputClass =
  "mt-2 block w-full rounded-xl border border-line bg-bg-2 px-4 text-[1rem] text-fg placeholder:text-subtle transition-colors hover:border-subtle focus:border-accent focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-accent/25";
const errorBorder = "border-red-400/60 hover:border-red-400/80";

function FieldError({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} className="mt-2 text-xs text-red-300">
      {children}
    </p>
  );
}

type TextFieldProps = {
  id: string;
  field: ContactField;
  label: string;
  value: string;
  error?: string;
  hint?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "email" | "text" | "tel";
  placeholder?: string;
  ltr?: boolean;
  maxLength?: number;
  onChange: (v: string) => void;
};

function TextField({ id, field, label, value, error, hint, type = "text", autoComplete, inputMode, placeholder, ltr, maxLength, onChange }: TextFieldProps) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        data-field={field}
        type={type}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        dir={ltr ? "ltr" : undefined}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={cn(inputClass, "h-12", ltr && "text-start", error && errorBorder)}
      />
      {error ? (
        <FieldError id={`${id}-error`}>{error}</FieldError>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-xs text-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type ChoiceFieldProps = {
  id: string;
  field: ContactField;
  legend: string;
  options: [value: string, label: string][];
  value: string;
  error?: string;
  onChange: (v: string) => void;
};

function ChoiceField({ id, field, legend, options, value, error, onChange }: ChoiceFieldProps) {
  return (
    <fieldset aria-describedby={error ? `${id}-error` : undefined} aria-invalid={Boolean(error)}>
      <legend className="text-sm font-medium">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map(([opt, label], i) => {
          const checked = value === opt;
          return (
            <label
              key={opt}
              className={cn(
                "relative inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent",
                checked ? "border-fg bg-fg text-bg" : "border-line text-muted hover:border-subtle hover:text-fg",
                error && !checked && "border-red-400/50",
              )}
            >
              <input
                type="radio"
                name={`${id}-${field}`}
                value={opt}
                checked={checked}
                onChange={() => onChange(opt)}
                data-field={i === 0 ? field : undefined}
                className="sr-only"
              />
              {label}
            </label>
          );
        })}
      </div>
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </fieldset>
  );
}
