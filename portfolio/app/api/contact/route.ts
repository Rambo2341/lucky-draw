import { NextResponse } from "next/server";
import { normalizeContact, validateContact } from "@/lib/contact";
import { getStore, newSubmission } from "@/lib/submissions";

/**
 * Contact form endpoint.
 *
 * 1. Validates (name, email, phone, project type, budget, message — all required).
 * 2. Saves the request so it appears in the admin panel (see lib/submissions.ts).
 * 3. Optionally emails a copy through Resend when RESEND_API_KEY and
 *    CONTACT_TO_EMAIL are set.
 *
 * Responds 503 `not_configured` only when neither storage nor email is set up.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: real users never fill the hidden "company" field.
  if (body && typeof body === "object" && (body as Record<string, unknown>).company) {
    return NextResponse.json({ ok: true });
  }

  const input = normalizeContact(body);
  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "validation", errors }, { status: 422 });
  }

  const locale = (body as Record<string, unknown>).locale === "ar" ? "ar" : "en";
  const submission = newSubmission(input, locale);

  const store = getStore();
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!store && !(apiKey && to)) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let saved = false;
  if (store) {
    try {
      await store.create(submission);
      saved = true;
    } catch (e) {
      console.error("Could not save contact request", e);
    }
  }

  let emailed = false;
  if (apiKey && to) {
    const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";
    const text = [
      `Name: ${submission.name}`,
      `Email: ${submission.email}`,
      `Phone: ${submission.phone}`,
      `Project type: ${submission.projectType}`,
      `Budget: ${submission.budget}`,
      `Language: ${submission.locale}`,
      "",
      submission.message,
    ].join("\n");
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: submission.email,
          subject: `New project request — ${submission.projectType} (${submission.budget})`,
          text,
        }),
      });
      emailed = res.ok;
    } catch {
      emailed = false;
    }
  }

  if (!saved && !emailed) {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
