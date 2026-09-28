import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { images } from "@/data/images";
import type { Property } from "@/data/properties";
import { getDict, href, tr, type Locale } from "@/lib/i18n";
import { priceLabel } from "@/lib/format";
import { EmbossMark } from "@/components/monogram";

const fan = [
  { rot: -9, x: "-14%", y: "10%", z: 1 },
  { rot: 6, x: "12%", y: "4%", z: 2 },
  { rot: -1.5, x: "0%", y: "-6%", z: 3 },
];

/** Three keycards dealt onto a sand field; the top card is live. */
export function FannedCards({ items, locale }: { items: Property[]; locale: Locale }) {
  const t = getDict(locale);
  return (
    <div className="relative isolate h-full min-h-[440px] overflow-hidden bg-sand sm:min-h-[520px]">
      <EmbossMark className="absolute -bottom-16 -end-16 w-[360px] opacity-90" />
      <div className="group absolute inset-0 grid place-items-center">
        {items.slice(0, 3).map((p, i) => {
          const f = fan[i];
          const img = images[p.cover];
          const top = i === 2;
          return (
            <div
              key={p.slug}
              className="absolute w-[min(78%,420px)] transition-transform duration-700 ease-[var(--ease-out)] [transform:var(--rest)] group-hover:[transform:var(--spread)]"
              style={
                {
                  zIndex: f.z,
                  "--rest": `translate(${f.x}, ${f.y}) rotate(${f.rot}deg)`,
                  "--spread": `translate(calc(${f.x} * 1.6), calc(${f.y} * 1.4)) rotate(${f.rot * 1.4}deg)`,
                  animation: `deal 1s var(--ease-out) ${250 + i * 140}ms backwards`,
                } as CSSProperties
              }
            >
              <div className="stock rounded-[12px] p-2 shadow-[0_2px_2px_rgba(20,19,18,0.06),0_24px_48px_-18px_rgba(20,19,18,0.35)]">
                <div className="relative aspect-[1.586] overflow-hidden rounded-[8px] bg-sand-deep">
                  <Image src={img.src} alt={top ? tr(img.alt, locale) : ""} fill priority sizes="420px" className="object-cover" />
                  <span className="serial absolute start-2 top-2 bg-stock/95 px-2 py-1" dir="ltr">
                    {p.serial}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-3 px-2 pb-1 pt-3">
                  {top ? (
                    <Link href={href(locale, `/properties/${p.slug}`)} className="display text-[1.2rem] after:absolute after:inset-0 after:content-['']">
                      {tr(p.name, locale)}
                    </Link>
                  ) : (
                    <span className="display invisible text-[1.2rem]" aria-hidden>
                      {tr(p.name, locale)}
                    </span>
                  )}
                  <span className={`text-[0.8125rem] font-semibold tabular-nums ${top ? "" : "invisible"}`} aria-hidden={!top}>
                    {priceLabel(p, locale, t.card.perYear)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
