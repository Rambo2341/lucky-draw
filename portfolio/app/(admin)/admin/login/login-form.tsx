"use client";

import { useActionState } from "react";
import { LoaderCircle } from "lucide-react";
import { login, type LoginState } from "../actions";
import { buttonClass } from "@/components/ui/button";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  return (
    <form action={action} className="mt-8 space-y-5">
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          كلمة المرور
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          dir="ltr"
          aria-invalid={Boolean(state.error)}
          aria-describedby={state.error ? "password-error" : undefined}
          className="mt-2 block h-12 w-full rounded-xl border border-line bg-bg-2 px-4 text-start text-fg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
        />
        {state.error && (
          <p id="password-error" role="alert" className="mt-2 text-xs text-red-300">
            {state.error === "wrong" ? "كلمة المرور غير صحيحة." : "لم يتم تعيين كلمة المرور بعد."}
          </p>
        )}
      </div>
      <button type="submit" disabled={pending} className={buttonClass("primary", "h-12 w-full")}>
        {pending && <LoaderCircle aria-hidden className="size-4 animate-spin" />}
        دخول
      </button>
    </form>
  );
}
