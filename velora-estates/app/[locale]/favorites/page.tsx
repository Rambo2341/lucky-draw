import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, isLocale } from "@/lib/i18n";
import { PageHead } from "@/components/section";
import { FavoritesView } from "@/components/favorites-view";

export async function generateMetadata({ params }: PageProps<"/[locale]/favorites">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: getDict(locale).fav.title, robots: { index: false } };
}

export default async function FavoritesPage({ params }: PageProps<"/[locale]/favorites">) {
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
