import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/demos/velora/lib/i18n";
import { PageHead } from "@/demos/velora/components/section";
import { FavoritesView } from "@/demos/velora/components/favorites-view";

export async function generateMetadata({ params }: PageProps<"/demos/velora/[locale]/favorites">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDict(locale).fav.title, robots: { index: false } };
}

export default async function FavoritesPage({ params }: PageProps<"/demos/velora/[locale]/favorites">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDict(locale);
  return (
    <>
      <PageHead title={t.fav.title} lede={t.fav.lede} />
      <FavoritesView locale={locale} />
    </>
  );
}
