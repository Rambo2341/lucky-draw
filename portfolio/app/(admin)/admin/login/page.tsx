import { adminConfigured } from "@/lib/admin-auth";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default function AdminLogin() {
  return (
    <main className="grid min-h-svh place-items-center px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 text-[0.9375rem] font-medium">
          <span aria-hidden className="grid size-7 place-items-center rounded-md bg-fg font-mono text-xs font-semibold text-bg">
            Z
          </span>
          <span dir="ltr">Zenox</span>
          <span className="text-subtle">· لوحة التحكم</span>
        </div>
        <h1 className="mt-8 text-3xl font-medium">تسجيل الدخول</h1>
        <p className="mt-2 text-sm text-muted">هذه الصفحة خاصة بصاحب الموقع فقط.</p>
        {adminConfigured() ? (
          <LoginForm />
        ) : (
          <p className="mt-8 rounded-xl border border-red-400/30 bg-red-400/5 p-4 text-sm leading-relaxed text-red-200">
            لم يتم تعيين كلمة المرور بعد. أضف المتغير <code dir="ltr">ADMIN_PASSWORD</code> في إعدادات المشروع (راجع README).
          </p>
        )}
      </div>
    </main>
  );
}
