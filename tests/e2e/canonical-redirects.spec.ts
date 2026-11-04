import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";

function getAllHtmlFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file.endsWith(".html")) {
      results.push(fullPath);
    }
  }
  return results;
}

test.describe("Canonical URLs and Redirect Validation", () => {
  const distDir = path.resolve(process.cwd(), "dist");

  test("traverses all generated HTML files in dist and ensures zero canonicals point to a redirecting route", () => {
    expect(
      fs.existsSync(distDir),
      "dist/ directory must exist before running canonical audit"
    ).toBe(true);

    const htmlFiles = getAllHtmlFiles(distDir);
    expect(htmlFiles.length).toBeGreaterThan(0);

    const violations: { file: string; canonical: string; reason: string }[] = [];

    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, "utf-8");
      const relativeFile = path.relative(distDir, file).replace(/\\/g, "/");

      // Extract <link rel="canonical" href="...">
      const canonicalMatch = content.match(
        /<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>|<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i
      );

      if (!canonicalMatch) {
        // 404 pages intentionally should not have a canonical
        if (relativeFile.includes("404")) continue;
        violations.push({
          file: relativeFile,
          canonical: "MISSING",
          reason: "HTML page has no canonical link tag",
        });
        continue;
      }

      const canonicalUrl = canonicalMatch[1] || canonicalMatch[2];

      let parsed: URL;
      try {
        parsed = new URL(canonicalUrl);
      } catch {
        violations.push({
          file: relativeFile,
          canonical: canonicalUrl,
          reason: "Canonical URL is malformed or invalid",
        });
        continue;
      }

      const pathname = parsed.pathname;

      // 1. Check if canonical points to a known legacy / redirected route pattern
      if (pathname === "/val" || pathname.startsWith("/val/")) {
        violations.push({
          file: relativeFile,
          canonical: canonicalUrl,
          reason: "Canonical points to legacy /val/ route which redirects",
        });
        continue;
      }

      if (pathname === "/en/projects" || pathname === "/en/projects/") {
        violations.push({
          file: relativeFile,
          canonical: canonicalUrl,
          reason: "Canonical points to /en/projects/ alias which redirects to /en/projectes/",
        });
        continue;
      }

      // 2. Check trailing slash: in static directory build format, non-trailing slash triggers a 301
      if (!pathname.endsWith("/") && !pathname.includes(".") && !/\.[a-z0-9]+$/i.test(pathname)) {
        violations.push({
          file: relativeFile,
          canonical: canonicalUrl,
          reason: "Canonical lacks trailing slash, which triggers a 301 redirect on static hosting",
        });
        continue;
      }

      // 3. Resolve the canonical target file in dist/
      const cleanPath = pathname.replace(/^\//, "").replace(/\/$/, "");
      const targetFilePath =
        cleanPath === ""
          ? path.join(distDir, "index.html")
          : path.join(distDir, cleanPath, "index.html");

      if (!fs.existsSync(targetFilePath)) {
        violations.push({
          file: relativeFile,
          canonical: canonicalUrl,
          reason: `Canonical target does not exist in build: ${targetFilePath}`,
        });
        continue;
      }

      // 4. Verify the target HTML file is NOT itself a redirect page (Astro generates <meta http-equiv="refresh" ...>)
      const targetContent = fs.readFileSync(targetFilePath, "utf-8");
      if (targetContent.includes('http-equiv="refresh"')) {
        violations.push({
          file: relativeFile,
          canonical: canonicalUrl,
          reason: "Canonical points to an HTML file that contains a redirect (<meta http-equiv=\"refresh\">)",
        });
      }
    }

    expect(
      violations,
      `Found ${violations.length} canonical tags pointing to redirects or invalid targets:\n${JSON.stringify(
        violations,
        null,
        2
      )}`
    ).toEqual([]);
  });

  test("verifies all 38 blog article pages have final canonicals with trailing slashes pointing to 200 OK targets", () => {
    const spanishArticles = fs
      .readdirSync(path.join(distDir, "blog"))
      .filter((item) => item.startsWith("es-") && fs.statSync(path.join(distDir, "blog", item)).isDirectory());

    const englishArticles = fs
      .readdirSync(path.join(distDir, "en", "blog"))
      .filter((item) => item.startsWith("es-") && fs.statSync(path.join(distDir, "en", "blog", item)).isDirectory());

    expect(spanishArticles.length).toBe(19);
    expect(englishArticles.length).toBe(19);
    expect(spanishArticles.length + englishArticles.length).toBe(38);

    const allArticleFolders = [
      ...spanishArticles.map((s) => ({ folder: path.join(distDir, "blog", s), slug: s, lang: "es" })),
      ...englishArticles.map((s) => ({ folder: path.join(distDir, "en", "blog", s), slug: s, lang: "en" })),
    ];

    for (const { folder, slug, lang } of allArticleFolders) {
      const htmlPath = path.join(folder, "index.html");
      expect(fs.existsSync(htmlPath), `Article file missing: ${htmlPath}`).toBe(true);
      const content = fs.readFileSync(htmlPath, "utf-8");

      const match = content.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
      expect(match, `Canonical tag missing in ${lang} article ${slug}`).not.toBeNull();

      const canonical = match![1];
      expect(canonical.endsWith("/"), `Canonical in ${lang} article ${slug} must end with a trailing slash: ${canonical}`).toBe(true);
      expect(
        canonical.startsWith("https://jaumetur.es/blog/es-"),
        `Canonical in ${lang} article ${slug} must point to final canonical path: ${canonical}`
      ).toBe(true);

      // Verify the canonical target file exists and is not a redirect
      const targetSlug = new URL(canonical).pathname.replace(/^\/blog\//, "").replace(/\/$/, "");
      const targetHtmlPath = path.join(distDir, "blog", targetSlug, "index.html");
      expect(fs.existsSync(targetHtmlPath), `Canonical target does not exist on disk: ${targetHtmlPath}`).toBe(true);

      const targetContent = fs.readFileSync(targetHtmlPath, "utf-8");
      expect(targetContent.includes('http-equiv="refresh"'), `Canonical target must not be a redirect: ${targetHtmlPath}`).toBe(false);
    }
  });

  test("verifies sitemap does not include 404 pages, /val/ routes, or redirecting aliases", () => {
    const sitemapPath = path.join(distDir, "sitemap-0.xml");
    expect(fs.existsSync(sitemapPath), "sitemap-0.xml must exist in dist/").toBe(true);

    const sitemapXml = fs.readFileSync(sitemapPath, "utf-8");
    const urls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

    expect(urls.length).toBeGreaterThan(0);

    const valUrls = urls.filter((u) => u.includes("/val/") || u.endsWith("/val"));
    expect(valUrls, `Sitemap must not contain /val/ routes, found: ${valUrls.join(", ")}`).toEqual([]);

    const notFoundUrls = urls.filter((u) => u.includes("404"));
    expect(notFoundUrls, `Sitemap must not contain 404 pages, found: ${notFoundUrls.join(", ")}`).toEqual([]);

    const projectAliasUrls = urls.filter((u) => u.includes("/en/projects"));
    expect(projectAliasUrls, `Sitemap must not contain /en/projects alias, found: ${projectAliasUrls.join(", ")}`).toEqual([]);

    // Check that every URL in sitemap ends with trailing slash (except static files)
    const withoutSlash = urls.filter((u) => !u.endsWith("/") && !/\.[a-z0-9]+$/i.test(u));
    expect(withoutSlash, `All sitemap page URLs must end with a trailing slash: ${withoutSlash.join(", ")}`).toEqual([]);
  });
});

