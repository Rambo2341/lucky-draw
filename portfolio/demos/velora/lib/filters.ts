import { properties, toUsd, type CityId, type Property, type PropertyType, type Purpose } from "@/demos/velora/data/properties";

export type Filters = {
  city?: CityId;
  type?: PropertyType;
  purpose?: Purpose;
  /** Upper budget in US-dollar equivalent. */
  max?: number;
  beds?: number;
  sort: "newest" | "price-asc" | "price-desc" | "area";
};

export const budgetOptions: Record<Purpose, number[]> = {
  sale: [3_000_000, 5_000_000, 10_000_000, 15_000_000],
  rent: [50_000, 100_000, 150_000],
};
export const bedOptions = [3, 4, 5, 6];
export const sortOptions: Filters["sort"][] = ["newest", "price-asc", "price-desc", "area"];

const cityIds: CityId[] = ["riyadh", "jeddah", "dubai", "kuwait"];
const typeIds: PropertyType[] = ["villa", "penthouse", "apartment", "townhouse", "estate"];

/** Reads filters from URL search params, ignoring anything invalid. */
export function parseFilters(params: URLSearchParams): Filters {
  const city = params.get("city") as CityId | null;
  const type = params.get("type") as PropertyType | null;
  const purpose = params.get("purpose") as Purpose | null;
  const max = Number(params.get("max"));
  const beds = Number(params.get("beds"));
  const sort = params.get("sort") as Filters["sort"] | null;
  const validPurpose = purpose === "sale" || purpose === "rent" ? purpose : undefined;
  return {
    city: city && cityIds.includes(city) ? city : undefined,
    type: type && typeIds.includes(type) ? type : undefined,
    purpose: validPurpose,
    max: validPurpose && budgetOptions[validPurpose].includes(max) ? max : undefined,
    beds: bedOptions.includes(beds) ? beds : undefined,
    sort: sort && sortOptions.includes(sort) ? sort : "newest",
  };
}

export function toQuery(f: Partial<Filters>) {
  const q = new URLSearchParams();
  if (f.city) q.set("city", f.city);
  if (f.type) q.set("type", f.type);
  if (f.purpose) q.set("purpose", f.purpose);
  if (f.purpose && f.max) q.set("max", String(f.max));
  if (f.beds) q.set("beds", String(f.beds));
  if (f.sort && f.sort !== "newest") q.set("sort", f.sort);
  const s = q.toString();
  return s ? `?${s}` : "";
}

export function applyFilters(f: Filters, list: Property[] = properties): Property[] {
  const out = list.filter(
    (p) =>
      (!f.city || p.city === f.city) &&
      (!f.type || p.type === f.type) &&
      (!f.purpose || p.purpose === f.purpose) &&
      (!f.max || toUsd(p) <= f.max) &&
      (!f.beds || p.beds >= f.beds),
  );
  const sorted = [...out];
  switch (f.sort) {
    case "price-asc":
      sorted.sort((a, b) => toUsd(a) - toUsd(b));
      break;
    case "price-desc":
      sorted.sort((a, b) => toUsd(b) - toUsd(a));
      break;
    case "area":
      sorted.sort((a, b) => b.built - a.built);
      break;
    default:
      sorted.sort((a, b) => b.listed.localeCompare(a.listed));
  }
  return sorted;
}
