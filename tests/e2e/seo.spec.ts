import { test, expect } from "@playwright/test";

const SITE = "https://jaumetur.es";

async function sitemapUrls(request: import("@playwright/test").APIRequestContext): Promise<string[]> {
  const index = await request.get("/sitemap-index.xml");
  expect(index.status()).toBe(200);
  const indexXml = await index.text();
  const sitemaps = [...indexXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  expect(sitemaps.length).toBeGreaterThan(0);
  const urls: string[] = [];
  for (const sm of sitemaps) {
    const res = await request.get(sm);
    expect(res.status()).toBe(200);
    const xml = await res.text();
    expect(xml).toContain("<urlset");
    urls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname));
  }
  return urls;
}

test.describe("SEO técnico", () => {
  test("robots.txt permite rastrear y declara el sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toMatch(/User-agent:\s*\*/i);
    expect(body).toMatch(/Sitemap:\s*https:\/\/jaumetur\.es\/sitemap-index\.xml/);
    expect(body).not.toMatch(/Disallow:\s*\/\s*$/m);
  });

  test("sitemap: URLs únicas, con barra final y sin páginas noindex ni copias /en/blog/<post>", async ({ request }) => {
    const urls = await sitemapUrls(request);
    expect(urls.length).toBeGreaterThan(40);
    expect(new Set(urls).size).toBe(urls.length);
    for (const u of urls) {
      expect(u.endsWith("/"), `sin barra final: ${u}`).toBe(true);
      expect(u).not.toMatch(/^\/val\//);
      expect(u).not.toMatch(/404|briefing/);
      expect(u, `copia noindex en sitemap: ${u}`).not.toMatch(/^\/en\/blog\/[^/]+\/$/);
    }
  });

  test("cada página del sitemap tiene identidad SEO propia y válida", async ({ page, request }) => {
    test.setTimeout(240_000);
    const urls = await sitemapUrls(request);
    const titles = new Map<string, string>();
    const descriptions = new Map<string, string>();
    const consoleErrors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(`${page.url()} → ${m.text()}`);
    });

    for (const path of urls) {
      const res = await page.goto(path);
      expect(res?.status(), `status ${path}`).toBe(200);

      const title = await page.title();
      expect(title.length, `título vacío o corto ${path}`).toBeGreaterThan(20);
      expect(title.length, `título demasiado largo ${path}: ${title}`).toBeLessThanOrEqual(70);
      expect(titles.get(title), `título duplicado ${path} = ${titles.get(title)}`).toBeUndefined();
      titles.set(title, path);

      const description = (await page.locator('meta[name="description"]').getAttribute("content")) ?? "";
      expect(description.length, `meta description ausente o corta ${path}`).toBeGreaterThanOrEqual(70);
      expect(description.length, `meta description larga ${path}`).toBeLessThanOrEqual(165);
      expect(descriptions.get(description), `descripción duplicada ${path}`).toBeUndefined();
      descriptions.set(description, path);

      await expect(page.locator("h1"), `H1 en ${path}`).toHaveCount(1);
      const levels = await page.locator("h1,h2,h3,h4,h5,h6").evaluateAll((hs) => hs.map((h) => Number(h.tagName[1])));
      for (let i = 1; i < levels.length; i++) {
        expect(levels[i] - levels[i - 1], `salto de encabezado en ${path}`).toBeLessThanOrEqual(1);
      }

      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical, `canonical en ${path}`).toBe(`${SITE}${path}`);
      const robots = (await page.locator('meta[name="robots"]').getAttribute("content").catch(() => null)) ?? "";
      expect(robots, `noindex en sitemap ${path}`).not.toMatch(/noindex/);

      const hreflangs = await page.locator('link[rel="alternate"][hreflang]').evaluateAll((ls) =>
        ls.map((l) => [l.getAttribute("hreflang"), l.getAttribute("href")]),
      );
      if (hreflangs.length) {
        const langs = hreflangs.map((h) => h[0]);
        expect(langs, `hreflang en ${path}`).toEqual(expect.arrayContaining(["es", "en", "x-default"]));
        for (const [, href] of hreflangs) expect(href).toMatch(/^https:\/\/jaumetur\.es\/.*\/$|^https:\/\/jaumetur\.es\/$/);
      }

      const blocks = await page.locator('script[type="application/ld+json"]').evaluateAll((ss) => ss.map((s) => s.textContent ?? ""));
      const ids = new Set<string>();
      for (const raw of blocks) {
        const data = JSON.parse(raw);
        expect(data["@context"]).toBe("https://schema.org");
        expect(data["@type"], `@type en ${path}`).toBeTruthy();
        if (data["@id"]) {
          expect(ids.has(data["@id"]), `@id duplicado ${data["@id"]} en ${path}`).toBe(false);
          ids.add(data["@id"]);
        }
      }
      const types = blocks.map((raw) => JSON.parse(raw)["@type"]);
      expect(types, `WebPage en ${path}`).toContain("WebPage");
      expect(types.filter((t) => t === "WebSite").length).toBe(1);
      if (/^\/blog\/[^/]+\/$/.test(path)) {
        expect(types).toContain("BlogPosting");
        expect(types).toContain("BreadcrumbList");
      }
      if (/^(\/en)?\/pricing\/[^/]+\/$/.test(path)) expect(types).toContain("Service");

      // Imágenes: siempre con atributo alt; las de contenido con dimensiones (evita saltos de diseño)
      const imgs = await page.locator("main img").evaluateAll((is) =>
        is.map((i) => ({ src: i.getAttribute("src"), alt: i.getAttribute("alt"), w: i.getAttribute("width"), h: i.getAttribute("height") })),
      );
      for (const img of imgs) {
        expect(img.alt, `img sin alt ${img.src} en ${path}`).not.toBeNull();
        expect(img.w && img.h, `img sin dimensiones ${img.src} en ${path}`).toBeTruthy();
      }
    }
    expect(consoleErrors, consoleErrors.join("\n")).toEqual([]);
  });

  test("los enlaces internos del sitio no están rotos", async ({ page, request }) => {
    test.setTimeout(240_000);
    const urls = await sitemapUrls(request);
    const seen = new Set<string>();
    const broken: string[] = [];
    for (const path of urls) {
      await page.goto(path);
      const hrefs = await page.locator("a[href]").evaluateAll((as) => as.map((a) => a.getAttribute("href") ?? ""));
      for (const href of hrefs) {
        if (!href || /^(https?:|mailto:|tel:|#|javascript:)/.test(href)) continue;
        const target = new URL(href, `http://x${path}`).pathname;
        if (seen.has(target)) continue;
        seen.add(target);
        const res = await request.get(target);
        if (res.status() >= 400) broken.push(`${path} → ${href} (${res.status()})`);
      }
    }
    expect(broken, broken.join("\n")).toEqual([]);
  });

  test("las copias /en/blog/<artículo> son noindex con canonical a la versión ES; la ES lleva BlogPosting", async ({ page }) => {
    await page.goto("/en/blog/git-github-control-de-versiones-flujo-colaborativo/");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}/blog/git-github-control-de-versiones-flujo-colaborativo/`);
    await expect(page.locator("html")).toHaveAttribute("lang", "es");

    await page.goto("/blog/git-github-control-de-versiones-flujo-colaborativo/");
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
    const posting = await page.locator('script[type="application/ld+json"]').evaluateAll((ss) =>
      ss.map((s) => JSON.parse(s.textContent ?? "")).find((d) => d["@type"] === "BlogPosting"),
    );
    expect(posting.headline).toBeTruthy();
    expect(posting.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}/);
    expect(posting.author.name).toBe("Jaume Tur");
    expect(posting.mainEntityOfPage["@id"]).toBe(`${SITE}/blog/git-github-control-de-versiones-flujo-colaborativo/`);
  });

  test("alias antiguos redirigen a la herramienta canónica", async ({ page }) => {
    await page.goto("/tools/html-generator/");
    await expect(page).toHaveURL(/\/tools\/creador-html\/$/);
  });

  test("datos de contacto coherentes entre pie, contacto y JSON-LD (teléfono WhatsApp)", async ({ page }) => {
    await page.goto("/contact/");
    await expect(page.locator("footer")).toContainText("+34 644 525 838");
    await expect(page.locator("main")).toContainText("+34 644 525 838");
    const business = await page.locator('script[type="application/ld+json"]').evaluateAll((ss) =>
      ss.map((s) => JSON.parse(s.textContent ?? "")).find((d) => d["@type"] === "ProfessionalService"),
    );
    expect(business.telephone).toBe("+34644525838");
    expect(business.address.addressLocality).toBe("Xàtiva");
    expect(business.geo).toBeUndefined();
  });
});
