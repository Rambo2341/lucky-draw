import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";
import { getStore } from "@/lib/submissions";
import { cn } from "@/lib/utils";
import { budgetLabel, projectTypeLabel, statusLabel, statusStyle, when, whatsapp } from "../../labels";
import { RequestActions } from "./request-actions";

export const dynamic = "force-dynamic";

export default async function RequestPage({ params }: PageProps<"/admin/requests/[id]">) {
  const { id } = await params;
  const store = getStore();
  const s = store ? (await store.list()).find((x) => x.id === id) : undefined;
  if (!s) notFound();

  const contact = [
    { href: `tel:${s.phone.replace(/[^\d+]/g, "")}`, label: "اتصال", icon: Phone },
    { href: whatsapp(s.phone), label: "واتساب", icon: MessageCircle, external: true },
    { href: `mailto:${s.email}?subject=${encodeURIComponent(`بخصوص طلبك — ${projectTypeLabel(s.projectType)}`)}`, label: "إيميل", icon: Mail },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 md:py-12">
      <Link href="/admin" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-fg">
        <ArrowRight aria-hidden className="size-4" />
        كل الطلبات
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-medium">{s.name}</h1>
          <p className="mt-2 text-sm tabular-nums text-subtle">
            {when(s.createdAt)} · {s.locale === "ar" ? "أُرسل من الموقع العربي" : "أُرسل من الموقع الإنجليزي"}
          </p>
        </div>
        <span className={cn("rounded-full border px-3 py-1 text-xs font-medium", statusStyle[s.status])}>{statusLabel[s.status]}</span>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {contact.map(({ href, label, icon: Icon, external }) => (
          <a
            key={label}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium hover:border-subtle hover:bg-bg-2"
          >
            <Icon aria-hidden className="size-4" />
            {label}
          </a>
        ))}
      </div>

      <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {[
          ["رقم الجوال", s.phone, true],
          ["البريد الإلكتروني", s.email, true],
          ["نوع المشروع", projectTypeLabel(s.projectType), false],
          ["الميزانية", budgetLabel(s.budget), false],
        ].map(([k, v, ltr]) => (
          <div key={String(k)} className="bg-bg-2 p-5">
            <dt className="text-xs text-subtle">{k}</dt>
            <dd className="mt-1.5 break-words" dir={ltr ? "ltr" : undefined} style={ltr ? { textAlign: "right" } : undefined}>
              {v}
            </dd>
          </div>
        ))}
      </dl>

      <section aria-labelledby="msg" className="mt-8">
        <h2 id="msg" className="text-sm text-muted">
          الرسالة
        </h2>
        <p className="mt-3 whitespace-pre-wrap rounded-2xl border border-line bg-bg-2 p-5 leading-relaxed" dir="auto">
          {s.message}
        </p>
      </section>

      <RequestActions id={s.id} status={s.status} />
    </div>
  );
}
