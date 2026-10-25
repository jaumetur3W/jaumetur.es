export const locales = ["es", "val"] as const;
export type Locale = (typeof locales)[number];

const blogTranslations: Record<string, string> = {
  "arquitectura-modular-angular-standalone-signals":
    "es-arquitectura-modular-angular-standalone-signals",
  "optimitzacio-core-web-vitals-60fps": "es-optimitzacio-core-web-vitals-60fps",
  "pipeline-cicd-github-actions-desplegament-continu":
    "es-pipeline-cicd-github-actions-desplegament-continu",
  "accessibilitat-web-wcag-aa-guia-practica":
    "es-accessibilitat-web-wcag-aa-guia-practica",
  "avisa-gestio-incidencies-arquitectura-frontend":
    "es-avisa-gestio-incidencies-arquitectura-frontend",
  "com-crear-un-portfolio-denginyeria-frontend":
    "es-com-crear-un-portfolio-denginyeria-frontend",
  "git-github-control-versions-flux-colaboratiu":
    "es-git-github-control-versions-flux-colaboratiu",
  "guia-definitiva-typescript-estricte-frontend":
    "es-guia-definitiva-typescript-estricte-frontend",
  "guia-seo-local-google-maps-comunitat-valenciana":
    "es-guia-seo-local-google-maps-comunitat-valenciana",
  "html5-semantic-accessibilitat-arquitectura-web":
    "es-html5-semantic-accessibilitat-arquitectura-web",
  "javascript-guia-completa-ecmascript-modern":
    "es-javascript-guia-completa-ecmascript-modern",
  "linux-shell-bash-administracio-sistemes-devops":
    "es-linux-shell-bash-administracio-sistemes-devops",
  "nodejs-arquitectura-backend-esdeveniments-apis":
    "es-nodejs-arquitectura-backend-esdeveniments-apis",
  "optimitzacio-imatges-web-avif-webp-pipeline":
    "es-optimitzacio-imatges-web-avif-webp-pipeline",
  "per-que-el-menu-en-pdf-mata-vendes-restaurant":
    "es-per-que-el-menu-en-pdf-mata-vendes-restaurant",
  "per-que-triar-astro-sobre-wordpress-negocis-locals":
    "es-per-que-triar-astro-sobre-wordpress-negocis-locals",
  "seo-local-i-rendiment-pizzeria-xativa":
    "es-seo-local-i-rendiment-pizzeria-xativa",
  "tailwind-css-guia-disseny-atomic-modern":
    "es-tailwind-css-guia-disseny-atomic-modern",
  "targetes-fidelitzacio-wallet-negocis-locals":
    "es-targetes-fidelitzacio-wallet-negocis-locals",
};

export function localeFromPath(pathname: string): Locale {
  return pathname === "/val" || pathname.startsWith("/val/") ? "val" : "es";
}

export function stripLocale(pathname: string): string {
  const path = pathname.split(/[?#]/, 1)[0].replace(/^\/val(?=\/|$)/, "") || "/";
  return path === "/" ? path : path.replace(/\/$/, "");
}

function translateBlogPath(path: string, locale: Locale, sourceLocale: Locale): string {
  const match = path.match(/^\/blog\/([^/]+)$/);
  if (!match) return path;

  const slug = match[1];
  const valencianSlug = Object.keys(blogTranslations).find(
    (key) => blogTranslations[key] === slug,
  );

  const translatedSlug = locale === "es"
    ? blogTranslations[slug] ?? (valencianSlug ? slug : undefined)
    : valencianSlug ?? (blogTranslations[slug] ? slug : undefined);

  if (translatedSlug) return `/blog/${translatedSlug}`;
  return locale === sourceLocale ? path : "/blog";
}

function isNonPagePath(path: string): boolean {
  return (
    path === "/rss.xml" ||
    path.startsWith("/docs/") ||
    path.startsWith("/img/") ||
    path.startsWith("/memojis/") ||
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
  const sourceLocale = localeFromPath(pathname.slice(0, suffixIndex));
  const path = stripLocale(pathname);
  if (isNonPagePath(path)) return `${path}${suffix}`;

  const translatedPath = translateBlogPath(path, locale, sourceLocale);
  const localized =
    locale === "val"
      ? `/val${translatedPath === "/" ? "/" : translatedPath}`
      : translatedPath;

  return `${localized}${suffix}`;
}

export function alternatePaths(pathname: string) {
  return { es: localizePath(pathname, "es"), val: localizePath(pathname, "val") };
}
