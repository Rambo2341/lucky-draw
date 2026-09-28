/**
 * Contact form schema and validation, shared by the client form and the
 * /api/contact route so both enforce exactly the same rules.
 */

export const projectTypes = ["Website", "Web App", "Mobile App", "Ecommerce", "Other"] as const;
export const budgetRanges = [
  "Under $500",
  "$500–$1,000",
  "$1,000–$3,000",
  "$3,000+",
  "Not sure yet",
] as const;

export type ProjectType = (typeof projectTypes)[number];
export type BudgetRange = (typeof budgetRanges)[number];

export type ContactInput = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
};

export type ContactField = keyof ContactInput;
export type ContactErrors = Partial<Record<ContactField, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const limits = { name: 100, email: 200, message: 5000, messageMin: 20 } as const;

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const message = input.message.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > limits.name) errors.name = "Name is too long.";

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > limits.email || !EMAIL_RE.test(email))
    errors.email = "Please enter a valid email address.";

  if (!(projectTypes as readonly string[]).includes(input.projectType))
    errors.projectType = "Please choose a project type.";

  if (!(budgetRanges as readonly string[]).includes(input.budget))
    errors.budget = "Please choose a budget range.";

  if (!message) errors.message = "Please tell me a little about your project.";
  else if (message.length < limits.messageMin)
    errors.message = `Please add a few more details (at least ${limits.messageMin} characters).`;
  else if (message.length > limits.message) errors.message = "Message is too long.";

  return errors;
}

export function normalizeContact(raw: unknown): ContactInput {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v : "");
  return {
    name: str(r.name),
    email: str(r.email),
    projectType: str(r.projectType),
    budget: str(r.budget),
    message: str(r.message),
  };
}
