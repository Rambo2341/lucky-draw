import { NextResponse } from "next/server";
import { normalizeContact, validateContact } from "@/lib/contact";

/**
 * Contact form endpoint.
 *
 * Email delivery uses the Resend HTTP API (https://resend.com) — no SDK needed.
 * Configure these environment variables to enable it (see README):
 *   RESEND_API_KEY      API key from Resend
 *   CONTACT_TO_EMAIL    Inbox that receives enquiries
 *   CONTACT_FROM_EMAIL  Verified sender, e.g. "Portfolio <hello@yourdomain.com>"
 *
 * Without them the endpoint still validates input and responds with 503
 * `not_configured`, and the form offers a direct email fallback instead.
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

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const text = [
    `Name: ${input.name.trim()}`,
    `Email: ${input.email.trim()}`,
    `Project type: ${input.projectType}`,
    `Budget: ${input.budget}`,
    "",
    input.message.trim(),
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: input.email.trim(),
        subject: `New project enquiry — ${input.projectType} (${input.budget})`,
        text,
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
