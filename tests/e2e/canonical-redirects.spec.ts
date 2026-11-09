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

