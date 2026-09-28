import { getDict } from "@/lib/i18n";
import type { SubmissionStatus } from "@/lib/submission-types";

const ar = getDict("ar").contact;

export const statusLabel: Record<SubmissionStatus, string> = {
  new: "جديد",
  in_progress: "قيد المتابعة",
  done: "منتهي",
};

export const statusStyle: Record<SubmissionStatus, string> = {
  new: "border-accent/40 bg-accent-soft text-accent",
  in_progress: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  done: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
};

export const projectTypeLabel = (v: string) => (ar.projectTypes as Record<string, string>)[v] ?? v;
export const budgetLabel = (v: string) => (ar.budgets as Record<string, string>)[v] ?? v;

export function when(iso: string) {
  return new Intl.DateTimeFormat("ar-SA-u-ca-gregory-nu-latn", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));
}

/** wa.me wants digits only, with the country code. */
export const whatsapp = (phone: string) => `https://wa.me/${phone.replace(/\D/g, "")}`;
