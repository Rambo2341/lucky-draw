import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getDict, isLocale, BASE } from "@/demos/velora/lib/i18n";
import { applyFilters } from "@/demos/velora/lib/filters";
import { PageHead, Shell } from "@/demos/velora/components/section";
import { PropertyCard } from "@/demos/velora/components/property/property-card";
import { PropertiesBrowser } from "@/demos/velora/components/property/properties-browser";

export async function generateMetadata({ params }: PageProps<"/demos/velora/[locale]/properties">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale);
  return { title: t.props.title, description: t.props.lede, alternates: { canonical: `${BASE}/${locale}/properties` } };
}

export default async function PropertiesPage({ params }: PageProps<"/demos/velora/[locale]/properties">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale);
  return (
    <>
      <PageHead title={t.props.title} lede={t.props.lede} />
      <Suspense
        fallback={
          <Shell className="py-10 md:py-14">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {applyFilters({ sort: "newest" }).map((p) => (
                <PropertyCard key={p.slug} property={p} locale={locale} notch="var(--color-stock)" />
              ))}
            </div>
          </Shell>
        }
      >
        <PropertiesBrowser locale={locale} />
      </Suspense>
    </>
  );
}
