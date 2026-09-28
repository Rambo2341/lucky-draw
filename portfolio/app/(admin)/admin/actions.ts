"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkPassword, createSession, SESSION_COOKIE, SESSION_DAYS, verifySession } from "@/lib/admin-auth";
import { getStore, statuses, type SubmissionStatus } from "@/lib/submissions";

export type LoginState = { error?: "wrong" | "unset" };

export async function login(_: LoginState, form: FormData): Promise<LoginState> {
  if (!process.env.ADMIN_PASSWORD) return { error: "unset" };
  const password = String(form.get("password") ?? "");
  if (!checkPassword(password)) {
    // Slow down guessing.
    await new Promise((r) => setTimeout(r, 800));
    return { error: "wrong" };
  }
  (await cookies()).set(SESSION_COOKIE, createSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

async function requireAdmin() {
  if (!verifySession((await cookies()).get(SESSION_COOKIE)?.value)) redirect("/admin/login");
}

export async function setStatus(id: string, status: SubmissionStatus) {
  await requireAdmin();
  if (!(statuses as readonly string[]).includes(status)) return;
  await getStore()?.update(id, { status });
  revalidatePath("/admin");
  revalidatePath(`/admin/requests/${id}`);
}

export async function deleteRequest(id: string) {
  await requireAdmin();
  await getStore()?.remove(id);
  revalidatePath("/admin");
  redirect("/admin");
}
