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
} from "@/lib/contact";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { buttonClass } from "@/components/ui/button";

type Status = "idle" | "submitting" | "success" | "error";

const empty: ContactInput = { name: "", email: "", projectType: "", budget: "", message: "" };

const fieldOrder: ContactField[] = ["name", "email", "projectType", "budget", "message"];

export function ContactForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const fid = (f: string) => `${id}-${f}`;

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
      const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`);
      el?.focus();
      return;
    }

    setStatus("submitting");
    setErrorMessage("");
    const honeypot = (formRef.current?.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: honeypot }),
      });
      if (res.ok) {
        setStatus("success");
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string; errors?: ContactErrors };
      if (data.errors) setErrors(data.errors);
      setStatus("error");
      setErrorMessage(
        data.error === "not_configured" && process.env.NODE_ENV === "development"
          ? "Email delivery isn’t configured yet. Add RESEND_API_KEY and CONTACT_TO_EMAIL (see README)."
          : "Sorry — your message couldn’t be sent right now. Please try again in a moment.",
      );
    } catch {
      setStatus("error");
      setErrorMessage("Network error — please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-line bg-bg-2 p-8 md:p-12">
        <span className="grid size-12 place-items-center rounded-full bg-accent text-bg">
          <Check aria-hidden className="size-5" />
        </span>
        <h2 className="mt-6 text-2xl font-medium tracking-[-0.03em] md:text-3xl">Thanks, {values.name.trim().split(" ")[0]}.</h2>
        <p className="mt-3 max-w-md leading-relaxed text-muted">
          Your message has been sent. I’ll read it carefully and reply to {values.email.trim()} as soon as possible.
        </p>
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
          Send another message
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
        All fields are required.
      </p>

      <div className="grid gap-8 sm:grid-cols-2">
        <TextField
          id={fid("name")}
          field="name"
          label="Name"
          autoComplete="name"
          value={values.name}
          error={errors.name}
          maxLength={limits.name}
          onChange={(v) => update("name", v)}
        />
        <TextField
          id={fid("email")}
          field="email"
          label="Email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          error={errors.email}
          maxLength={limits.email}
          onChange={(v) => update("email", v)}
        />
      </div>

      <ChoiceField
        id={fid("projectType")}
        field="projectType"
        legend="Project type"
        options={projectTypes}
        value={values.projectType}
        error={errors.projectType}
        onChange={(v) => update("projectType", v)}
      />

      <ChoiceField
        id={fid("budget")}
        field="budget"
        legend="Estimated budget"
        options={budgetRanges}
        value={values.budget}
        error={errors.budget}
        onChange={(v) => update("budget", v)}
      />

      <div>
        <label htmlFor={fid("message")} className="block text-sm font-medium">
          Message
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
          placeholder="What are you building, and what would you like help with?"
          className={cn(inputClass, "resize-y py-3 leading-relaxed", errors.message && errorBorder)}
        />
        {errors.message ? (
          <FieldError id={`${fid("message")}-error`}>{errors.message}</FieldError>
        ) : (
          <p id={`${fid("message")}-hint`} className="mt-2 text-xs text-subtle">
            A few sentences about goals, timeline and any links are perfect.
          </p>
        )}
      </div>

      {/* Honeypot for bots — hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
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
                You can also{" "}
                <a href={mailto} className="underline underline-offset-4 hover:text-fg">
                  email me directly
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
            Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowRight aria-hidden className="size-4" />
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
  type?: string;
  autoComplete?: string;
  inputMode?: "email" | "text";
  maxLength?: number;
  onChange: (v: string) => void;
};

function TextField({ id, field, label, value, error, type = "text", autoComplete, inputMode, maxLength, onChange }: TextFieldProps) {
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
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputClass, "h-12", error && errorBorder)}
      />
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}

type ChoiceFieldProps = {
  id: string;
  field: ContactField;
  legend: string;
  options: readonly string[];
  value: string;
  error?: string;
  onChange: (v: string) => void;
};

function ChoiceField({ id, field, legend, options, value, error, onChange }: ChoiceFieldProps) {
  return (
    <fieldset aria-describedby={error ? `${id}-error` : undefined} aria-invalid={Boolean(error)}>
      <legend className="text-sm font-medium">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((opt, i) => {
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
              {opt}
            </label>
          );
        })}
      </div>
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </fieldset>
  );
}
