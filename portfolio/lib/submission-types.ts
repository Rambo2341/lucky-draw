import type { ContactInput } from "@/lib/contact";

/** Shared by the server store and the admin UI (safe to import in client components). */
export const statuses = ["new", "in_progress", "done"] as const;
export type SubmissionStatus = (typeof statuses)[number];

export type Submission = ContactInput & {
  id: string;
  createdAt: string;
  locale: "en" | "ar";
  status: SubmissionStatus;
};
