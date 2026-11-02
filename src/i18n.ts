export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

export function stripLocale(pathname: string): string {
  const path = pathname.split(/[?#]/, 1)[0].replace(/^\/(en|val)(?=\/|$)/, "") || "/";
  return path === "/" ? path : path.replace(/\/$/, "");
}

function isNonPagePath(path: string): boolean {
  return (
    path === "/rss.xml" ||
    path.startsWith("/docs/") ||
    path.startsWith("/img/") ||
    path.startsWith("/memojis/") ||
    path.startsWith("/fonts/") ||
    /\.[a-z0-9]+$/i.test(path)
  );
}

export function localizePath(pathname: string, locale: Locale): string {
  const queryIndex = pathname.indexOf("?");
  const hashIndex = pathname.indexOf("#");
  const suffixIndex = [queryIndex, hashIndex]
    .filter((index) => index >= 0)
    .reduce((minimum, index) => Math.min(minimum, index), pathname.length);
  const suffix = pathname.slice(suffixIndex);
  const path = stripLocale(pathname);
  if (isNonPagePath(path)) return `${path}${suffix}`;

  const localized =
    locale === "en"
      ? `/en${path === "/" ? "/" : path}`
      : path;

  return `${localized}${suffix}`;
}

export function alternatePaths(pathname: string) {
  return {
    es: localizePath(pathname, "es"),
    en: localizePath(pathname, "en"),
  };
}
