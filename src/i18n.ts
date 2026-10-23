export const locales = ["es", "val"] as const;
export type Locale = (typeof locales)[number];

export function localeFromPath(pathname: string): Locale {
  return pathname === "/val" || pathname.startsWith("/val/") ? "val" : "es";
}

export function stripLocale(pathname: string): string {
  const path = pathname.replace(/^\/val(?=\/|$)/, "") || "/";
  return path === "/" ? path : path.replace(/\/$/, "");
}

export function localizePath(pathname: string, locale: Locale): string {
  const path = stripLocale(pathname);
  return locale === "val" ? `/val${path === "/" ? "/" : path}` : path;
}

export function alternatePaths(pathname: string) {
  const path = stripLocale(pathname);
  return { es: localizePath(path, "es"), val: localizePath(path, "val") };
}
