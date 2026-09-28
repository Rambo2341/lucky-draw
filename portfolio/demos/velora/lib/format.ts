import type { Locale } from "./i18n";
import type { Currency, Property } from "@/demos/velora/data/properties";

const numberLocale = (locale: Locale) => (locale === "ar" ? "ar-SA-u-nu-latn" : "en-US");

export function money(amount: number, currency: Currency, locale: Locale) {
  return new Intl.NumberFormat(numberLocale(locale), {
    style: "currency",
    currency,
    currencyDisplay: locale === "ar" ? "symbol" : "code",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function num(n: number, locale: Locale) {
  return new Intl.NumberFormat(numberLocale(locale)).format(n);
}

export function priceLabel(p: Property, locale: Locale, perYear: string) {
  return p.purpose === "rent" ? `${money(p.price, p.currency, locale)} ${perYear}` : money(p.price, p.currency, locale);
}

export function usdShort(n: number, locale: Locale) {
  const v = n >= 1_000_000 ? `${n / 1_000_000}M` : `${n / 1_000}K`;
  return locale === "ar" ? `${v} دولار` : `US$ ${v}`;
}

export function longDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA-u-ca-gregory-nu-latn" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${iso}T12:00:00`));
}
