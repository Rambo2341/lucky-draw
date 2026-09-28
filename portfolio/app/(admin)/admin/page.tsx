import Link from "next/link";
import { LogOut, Search } from "lucide-react";
import { getStore, statuses, type Submission, type SubmissionStatus } from "@/lib/submissions";
import { cn } from "@/lib/utils";
import { logout } from "./actions";
import { budgetLabel, projectTypeLabel, statusLabel, statusStyle, when } from "./labels";

export const dynamic = "force-dynamic";

export default async function AdminHome({ searchParams }: PageProps<"/admin">) {
  const sp = await searchParams;
  const filter = typeof sp.status === "string" && (statuses as readonly string[]).includes(sp.status) ? (sp.status as SubmissionStatus) : undefined;
  const q = typeof sp.q === "string" ? sp.q.trim() : "";

  const store = getStore();
  let all: Submission[] = [];
  let loadError = false;
  if (store) {
    try {
      all = await store.list();
    } catch {
      loadError = true;
    }
  }

  const needle = q.toLowerCase();
  const shown = all.filter(
    (s) =>
      (!filter || s.status === filter) &&
      (!needle || [s.name, s.email, s.phone, s.message, s.projectType].some((v) => v.toLowerCase().includes(needle))),
  );
  const count = (st?: SubmissionStatus) => (st ? all.filter((s) => s.status === st).length : all.length);
  const tabHref = (st?: SubmissionStatus) => {
    const p = new URLSearchParams();
    if (st) p.set("status", st);
    if (q) p.set("q", q);
    const s = p.toString();
    return s ? `/admin?${s}` : "/admin";
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[0.9375rem] font-medium">
          <span aria-hidden className="grid size-7 place-items-center rounded-md bg-fg font-mono text-xs font-semibold text-bg">
            Z
          </span>
          <span dir="ltr">Zenox</span>
          <span className="text-subtle">· لوحة التحكم</span>
        </div>
        <form action={logout}>
          <button type="submit" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted hover:border-subtle hover:text-fg">
            <LogOut aria-hidden className="size-4 rtl:-scale-x-100" />
            تسجيل الخروج
          </button>
        </form>
      </header>

      <h1 className="mt-10 text-4xl font-medium">الطلبات</h1>

      {!store && (
        <div className="mt-8 rounded-2xl border border-red-400/30 bg-red-400/5 p-6 text-sm leading-relaxed text-red-200">
          تخزين الطلبات غير مُعدّ. اربط <span dir="ltr">Upstash Redis</span> بالمشروع في Vercel (Storage → Marketplace)، وستظهر الطلبات هنا تلقائيًا. التفاصيل في README.
        </div>
      )}
      {loadError && (
        <div className="mt-8 rounded-2xl border border-red-400/30 bg-red-400/5 p-6 text-sm text-red-200">تعذّر تحميل الطلبات من قاعدة البيانات. تحقق من متغيرات Redis.</div>
      )}

      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
        {[undefined, ...statuses].map((st) => (
          <div key={st ?? "all"} className="bg-bg-2 p-5">
            <dt className="text-sm text-muted">{st ? statusLabel[st] : "كل الطلبات"}</dt>
            <dd className="mt-2 text-3xl font-medium tabular-nums">{count(st)}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <nav aria-label="تصفية حسب الحالة" className="flex flex-wrap gap-2">
          {[undefined, ...statuses].map((st) => {
            const active = filter === st;
            return (
              <Link
                key={st ?? "all"}
                href={tabHref(st)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm transition-colors",
                  active ? "border-fg bg-fg text-bg" : "border-line text-muted hover:border-subtle hover:text-fg",
                )}
              >
                {st ? statusLabel[st] : "الكل"}
                <span className="tabular-nums opacity-70">{count(st)}</span>
              </Link>
            );
          })}
        </nav>
        <form role="search" className="relative w-full md:w-80">
          {filter && <input type="hidden" name="status" value={filter} />}
          <label htmlFor="q" className="sr-only">
            بحث في الطلبات
          </label>
          <Search aria-hidden className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
          <input
            id="q"
            name="q"
            defaultValue={q}
            placeholder="بحث بالاسم أو الجوال أو البريد…"
            className="h-11 w-full rounded-full border border-line bg-bg-2 pe-4 ps-9 text-sm text-fg placeholder:text-subtle focus:border-accent focus:outline-none"
          />
        </form>
      </div>

      {shown.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line px-6 py-16 text-center text-muted">
          {all.length === 0 ? "لا توجد طلبات بعد. أي طلب يُرسل من صفحة التواصل سيظهر هنا." : "لا توجد طلبات مطابقة."}
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-line overflow-hidden rounded-2xl border border-line">
          {shown.map((s) => (
            <li key={s.id}>
              <Link href={`/admin/requests/${s.id}`} className="grid gap-3 bg-bg-2/40 p-5 transition-colors hover:bg-bg-2 md:grid-cols-[1.3fr_1fr_1fr_auto] md:items-center md:gap-6">
                <div className="min-w-0">
                  <p className="truncate font-medium">{s.name}</p>
                  <p className="mt-0.5 truncate text-sm text-muted" dir="ltr" style={{ textAlign: "right" }}>
                    {s.phone} · {s.email}
                  </p>
                </div>
                <p className="text-sm text-muted">
                  {projectTypeLabel(s.projectType)} · {budgetLabel(s.budget)}
                </p>
                <p className="text-sm tabular-nums text-subtle">{when(s.createdAt)}</p>
                <span className={cn("justify-self-start rounded-full border px-3 py-1 text-xs font-medium", statusStyle[s.status])}>{statusLabel[s.status]}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
