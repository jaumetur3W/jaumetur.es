import { describe, expect, it } from "vitest";
import { alternatePaths, localeFromPath, localizePath, stripLocale } from "../../src/i18n";

describe("locale routing", () => {
  it("detects Valencian routes only at the locale boundary", () => {
    expect(localeFromPath("/val")).toBe("val");
    expect(localeFromPath("/val/about")).toBe("val");
    expect(localeFromPath("/values")).toBe("es");
  });

  it("normalizes localized paths without removing route names containing val", () => {
    expect(stripLocale("/val/about/")).toBe("/about");
    expect(stripLocale("/val")).toBe("/");
    expect(stripLocale("/values")).toBe("/values");
  });

  it("localizes page routes and preserves query strings and fragments", () => {
    expect(localizePath("/about", "val")).toBe("/val/about");
    expect(localizePath("/val/pricing?servei=landing-page#faq", "es")).toBe(
      "/pricing?servei=landing-page#faq",
    );
    expect(localizePath("/", "val")).toBe("/val/");
  });

  it("does not prefix static assets, documents, or the RSS feed", () => {
    expect(localizePath("/img/profile.webp", "val")).toBe("/img/profile.webp");
    expect(localizePath("/docs/CV.pdf", "val")).toBe("/docs/CV.pdf");
    expect(localizePath("/rss.xml", "val")).toBe("/rss.xml");
  });

  it("switches between known Spanish and Valencian article slugs", () => {
    expect(
      localizePath("/blog/arquitectura-modular-angular-standalone-signals", "es"),
    ).toBe("/blog/es-arquitectura-modular-angular-standalone-signals");
    expect(
      localizePath("/val/blog/es-arquitectura-modular-angular-standalone-signals", "val"),
    ).toBe("/val/blog/arquitectura-modular-angular-standalone-signals"    );
  });

  it("switches every translated article between its matching locale route", () => {
    const translatedSlugs = [
      ["accessibilitat-web-wcag-aa-guia-practica", "es-accessibilitat-web-wcag-aa-guia-practica"],
      ["arquitectura-modular-angular-standalone-signals", "es-arquitectura-modular-angular-standalone-signals"],
      ["avisa-gestio-incidencies-arquitectura-frontend", "es-avisa-gestio-incidencies-arquitectura-frontend"],
      ["com-crear-un-portfolio-denginyeria-frontend", "es-com-crear-un-portfolio-denginyeria-frontend"],
      ["git-github-control-versions-flux-colaboratiu", "es-git-github-control-versions-flux-colaboratiu"],
      ["guia-definitiva-typescript-estricte-frontend", "es-guia-definitiva-typescript-estricte-frontend"],
      ["guia-seo-local-google-maps-comunitat-valenciana", "es-guia-seo-local-google-maps-comunitat-valenciana"],
      ["html5-semantic-accessibilitat-arquitectura-web", "es-html5-semantic-accessibilitat-arquitectura-web"],
      ["javascript-guia-completa-ecmascript-modern", "es-javascript-guia-completa-ecmascript-modern"],
      ["linux-shell-bash-administracio-sistemes-devops", "es-linux-shell-bash-administracio-sistemes-devops"],
      ["nodejs-arquitectura-backend-esdeveniments-apis", "es-nodejs-arquitectura-backend-esdeveniments-apis"],
      ["optimitzacio-core-web-vitals-60fps", "es-optimitzacio-core-web-vitals-60fps"],
      ["optimitzacio-imatges-web-avif-webp-pipeline", "es-optimitzacio-imatges-web-avif-webp-pipeline"],
      ["per-que-el-menu-en-pdf-mata-vendes-restaurant", "es-per-que-el-menu-en-pdf-mata-vendes-restaurant"],
      ["per-que-triar-astro-sobre-wordpress-negocis-locals", "es-per-que-triar-astro-sobre-wordpress-negocis-locals"],
      ["pipeline-cicd-github-actions-desplegament-continu", "es-pipeline-cicd-github-actions-desplegament-continu"],
      ["seo-local-i-rendiment-pizzeria-xativa", "es-seo-local-i-rendiment-pizzeria-xativa"],
      ["tailwind-css-guia-disseny-atomic-modern", "es-tailwind-css-guia-disseny-atomic-modern"],
      ["targetes-fidelitzacio-wallet-negocis-locals", "es-targetes-fidelitzacio-wallet-negocis-locals"],
    ];

    for (const [valencianSlug, spanishSlug] of translatedSlugs) {
      expect(localizePath(`/val/blog/${valencianSlug}`, "es")).toBe(`/blog/${spanishSlug}`);
      expect(localizePath(`/blog/${spanishSlug}`, "val")).toBe(`/val/blog/${valencianSlug}`);
    }
  });

  it("sends unknown articles to the target language's blog index", () => {
    expect(localizePath("/val/blog/untranslated-valencian-post", "es")).toBe("/blog");
    expect(localizePath("/blog/untranslated-spanish-post", "val"))
      .toBe("/val/blog");
  });

  it("keeps page alternates consistent", () => {
    expect(alternatePaths("/val/projectes/avisa")).toEqual({
      es: "/projectes/avisa",
      val: "/val/projectes/avisa",
    });
  });

  it("advertises matching locale versions for translated blog articles", () => {
    expect(alternatePaths("/val/blog/guia-definitiva-typescript-estricte-frontend")).toEqual({
      es: "/blog/es-guia-definitiva-typescript-estricte-frontend",
      val: "/val/blog/guia-definitiva-typescript-estricte-frontend",
    });
  });
});
