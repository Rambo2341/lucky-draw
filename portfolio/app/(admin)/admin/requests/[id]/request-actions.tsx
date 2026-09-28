"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { statuses, type SubmissionStatus } from "@/lib/submission-types";
import { cn } from "@/lib/utils";
import { deleteRequest, setStatus } from "../../actions";
import { statusLabel } from "../../labels";

export function RequestActions({ id, status }: { id: string; status: SubmissionStatus }) {
  const [pending, start] = useTransition();
  const [confirming, setConfirming] = useState(false);

  return (
    <section aria-labelledby="manage" className="mt-10 border-t border-line pt-8">
      <h2 id="manage" className="text-sm text-muted">
        حالة الطلب
      </h2>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="حالة الطلب">
        {statuses.map((st) => (
          <button
            key={st}
            type="button"
            disabled={pending}
            aria-pressed={status === st}
            onClick={() => start(() => setStatus(id, st))}
            className={cn(
              "inline-flex min-h-11 items-center rounded-full border px-5 text-sm transition-colors disabled:opacity-60",
              status === st ? "border-fg bg-fg text-bg" : "border-line text-muted hover:border-subtle hover:text-fg",
            )}
          >
            {statusLabel[st]}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {confirming ? (
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-red-400/30 bg-red-400/5 p-4">
            <p className="text-sm text-red-200">سيتم حذف الطلب نهائيًا. متأكد؟</p>
            <button
              type="button"
              disabled={pending}
              onClick={() => start(() => deleteRequest(id))}
              className="inline-flex min-h-10 items-center rounded-full bg-red-500 px-4 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-60"
            >
              نعم، احذف
            </button>
            <button type="button" onClick={() => setConfirming(false)} className="inline-flex min-h-10 items-center rounded-full border border-line px-4 text-sm text-muted hover:text-fg">
              إلغاء
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm text-muted hover:border-red-400/50 hover:text-red-300"
          >
            <Trash2 aria-hidden className="size-4" />
            حذف الطلب
          </button>
        )}
      </div>
    </section>
  );
}
