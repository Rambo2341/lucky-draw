"use client";

import Image from "next/image";
import { useState, type KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { images, type ImageKey } from "@/data/images";
import { getDict, tr, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

export function Gallery({ keys, serial, locale }: { keys: ImageKey[]; serial: string; locale: Locale }) {
  const t = getDict(locale);
  const [i, setI] = useState(0);
  const n = keys.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);
  const current = images[keys[i]];
  const rtl = locale === "ar";

  function onKey(e: KeyboardEvent) {
    if (e.key === "ArrowRight") go(rtl ? -1 : 1);
    if (e.key === "ArrowLeft") go(rtl ? 1 : -1);
  }

  return (
    <section aria-roledescription="carousel" aria-label={t.detail.gallery} onKeyDown={onKey}>
      <div className="stock rounded-[14px] p-2">
        <div className="relative aspect-[1.586] overflow-hidden rounded-[10px] bg-sand-deep">
          <Image
            key={current.src}
            src={current.src}
            alt={tr(current.alt, locale)}
            fill
            priority
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
            style={{ animation: "rise 0.6s var(--ease-out)" }}
          />
          <span className="serial absolute start-3 top-3 bg-stock/95 px-2 py-1" dir="ltr">
            {serial}
          </span>
          <span className="absolute bottom-3 end-3 bg-ink/85 px-2 py-1 text-[0.75rem] tabular-nums text-stock" aria-live="polite">
            {t.detail.photo} {i + 1} {t.detail.of} {n}
          </span>
          <div className="absolute inset-y-0 start-0 flex items-center ps-2">
            <button type="button" onClick={() => go(-1)} className="grid size-11 place-items-center bg-stock/90 hover:bg-stock" aria-label={rtl ? "الصورة السابقة" : "Previous photo"}>
              <ChevronLeft aria-hidden className="size-5 rtl:rotate-180" strokeWidth={1.5} />
            </button>
          </div>
          <div className="absolute inset-y-0 end-0 flex items-center pe-2">
            <button type="button" onClick={() => go(1)} className="grid size-11 place-items-center bg-stock/90 hover:bg-stock" aria-label={rtl ? "الصورة التالية" : "Next photo"}>
              <ChevronRight aria-hidden className="size-5 rtl:rotate-180" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
      <ul className="mt-3 grid grid-cols-5 gap-2">
        {keys.map((k, idx) => (
          <li key={k}>
            <button
              type="button"
              onClick={() => setI(idx)}
              aria-label={`${t.detail.photo} ${idx + 1}`}
              aria-current={idx === i}
              className={cn(
                "relative block aspect-[1.586] w-full overflow-hidden rounded-[6px] bg-sand-deep outline-offset-2 transition-opacity",
                idx === i ? "outline outline-2 outline-ink" : "opacity-70 hover:opacity-100",
              )}
            >
              <Image src={images[k].src} alt="" fill sizes="160px" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[0.75rem] text-ink-3">{t.detail.imageNote}</p>
    </section>
  );
}
