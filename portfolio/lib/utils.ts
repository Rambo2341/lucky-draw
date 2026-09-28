/** Joins class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function absoluteUrl(path: string, base: string): string {
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
