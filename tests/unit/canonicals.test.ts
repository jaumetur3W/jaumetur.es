import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

function getAllHtmlFiles(dir: string): string[] {
  let results: string[] = [];
  if (!fs.existsSync(dir)) return results;
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

describe("Canonical and Redirect Audits", () => {
  const distDir = path.resolve(process.cwd(), "dist");

  it("ensures all generated HTML canonicals point to final non-redirecting URLs", () => {
    if (!fs.existsSync(distDir)) {
      // Skip if build hasn't run yet
      return;
    }

    const htmlFiles = getAllHtmlFiles(distDir);
    expect(htmlFiles.length).toBeGreaterThan(0);

    const violations: { file: string; canonical: string; reason: string }[] = [];

    for (const file of htmlFiles) {
      const content = fs.readFileSync(file, "utf-8");
      const relativeFile = path.relative(distDir, file).replace(/\\/g, "/");

      if (/<meta\s+name=["']robots["'][^>]*content=["'][^"']*\bnoindex\b/i.test(content)) continue;

      const canonicalMatch = content.match(
        /<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>|<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i
      );

      if (!canonicalMatch) {
        if (relativeFile.includes("404")) continue;
        violations.push({
          file: relativeFile,
          canonical: "MISSING",
          reason: "HTML page has no canonical link tag",
        });
        continue;
      }

      const canonicalUrl = canonicalMatch[1] || canonicalMatch[2];
      const parsed = new URL(canonicalUrl);
      const pathname = parsed.pathname;

      if (pathname === "/val" || pathname.startsWith("/val/")) {
        violations.push({
          file: relativeFile,
          canonical: canonicalUrl,
          reason: "Points to legacy /val/ route",
        });
        continue;
      }

      if (pathname === "/en/projects" || pathname === "/en/projects/") {
        violations.push({
          file: relativeFile,
          canonical: canonicalUrl,
          reason: "Points to /en/projects alias",
        });
        continue;
      }

      if (!pathname.endsWith("/") && !pathname.includes(".") && !/\.[a-z0-9]+$/i.test(pathname)) {
        violations.push({
          file: relativeFile,
          canonical: canonicalUrl,
          reason: "Lacks trailing slash",
        });
        continue;
      }

      const cleanPath = pathname.replace(/^\//, "").replace(/\/$/, "");
      const targetFilePath =
        cleanPath === ""
          ? path.join(distDir, "index.html")
          : path.join(distDir, cleanPath, "index.html");

      if (!fs.existsSync(targetFilePath)) {
        violations.push({
          file: relativeFile,
          canonical: canonicalUrl,
          reason: `Target file not found: ${targetFilePath}`,
        });
        continue;
      }

      const targetContent = fs.readFileSync(targetFilePath, "utf-8");
      if (targetContent.includes('http-equiv="refresh"')) {
        violations.push({
          file: relativeFile,
          canonical: canonicalUrl,
          reason: "Target file is a redirect page",
        });
      }
    }

    expect(violations).toEqual([]);
  });

  it("verifies the 38 blog article pages have canonical URLs with trailing slashes", () => {
    if (!fs.existsSync(distDir)) return;

    const spanishArticles = fs
      .readdirSync(path.join(distDir, "blog"))
      .filter((item) => item.startsWith("es-") && fs.statSync(path.join(distDir, "blog", item)).isDirectory());

    const englishArticles = fs
      .readdirSync(path.join(distDir, "en", "blog"))
      .filter((item) => item.startsWith("es-") && fs.statSync(path.join(distDir, "en", "blog", item)).isDirectory());

    expect(spanishArticles.length).toBe(19);
    expect(englishArticles.length).toBe(19);

    const allArticles = [
      ...spanishArticles.map((s) => path.join(distDir, "blog", s, "index.html")),
      ...englishArticles.map((s) => path.join(distDir, "en", "blog", s, "index.html")),
    ];

    expect(allArticles.length).toBe(38);

    for (const articleFile of allArticles) {
      const content = fs.readFileSync(articleFile, "utf-8");
      const match = content.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
      expect(match).not.toBeNull();
      const canonical = match![1];
      expect(canonical.endsWith("/")).toBe(true);
      expect(canonical.startsWith("https://jaumetur.es/blog/es-")).toBe(true);
    }
  });
});
