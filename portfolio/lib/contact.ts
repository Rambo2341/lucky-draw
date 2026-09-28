/**
 * Contact form schema and validation, shared by the client form and the
 * /api/contact route so both enforce exactly the same rules. Errors are codes;
 * the form turns them into English or Arabic text.
 */

export const projectTypes = ["Website", "Web App", "Mobile App", "Ecommerce", "Other"] as const;
export const budgetRanges = ["Under $500", "$500–$1,000", "$1,000–$3,000", "$3,000+", "Not sure yet"] as const;

export type ProjectType = (typeof projectTypes)[number];
export type BudgetRange = (typeof budgetRanges)[number];

export type ContactInput = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
};

export type ContactField = keyof ContactInput;
export type ErrorCode =
  | "name"
  | "nameLong"
  | "email"
  | "emailInvalid"
  | "phone"
  | "phoneInvalid"
  | "projectType"
  | "budget"
  | "message"
  | "messageShort"
  | "messageLong";
export type ContactErrors = Partial<Record<ContactField, ErrorCode>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Digits with optional +, spaces, dashes, dots or brackets; 8–15 digits in total (E.164 maximum). */
const PHONE_RE = /^\+?[\d\s\-().]+$/;

export const limits = { name: 100, email: 200, phone: 25, message: 5000, messageMin: 20 } as const;

export function phoneDigits(phone: string) {
  return phone.replace(/\D/g, "");
}

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const message = input.message.trim();

  if (!name) errors.name = "name";
  else if (name.length > limits.name) errors.name = "nameLong";

  if (!email) errors.email = "email";
  else if (email.length > limits.email || !EMAIL_RE.test(email)) errors.email = "emailInvalid";

  const digits = phoneDigits(phone).length;
  if (!phone) errors.phone = "phone";
  else if (phone.length > limits.phone || !PHONE_RE.test(phone) || digits < 8 || digits > 15) errors.phone = "phoneInvalid";

  if (!(projectTypes as readonly string[]).includes(input.projectType)) errors.projectType = "projectType";
  if (!(budgetRanges as readonly string[]).includes(input.budget)) errors.budget = "budget";

  if (!message) errors.message = "message";
  else if (message.length < limits.messageMin) errors.message = "messageShort";
  else if (message.length > limits.message) errors.message = "messageLong";

  return errors;
}

export function normalizeContact(raw: unknown): ContactInput {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v : "");
  return {
    name: str(r.name),
    email: str(r.email),
    phone: str(r.phone),
    projectType: str(r.projectType),
    budget: str(r.budget),
    message: str(r.message),
  };
}
