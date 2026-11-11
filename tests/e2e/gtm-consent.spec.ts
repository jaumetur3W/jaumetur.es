import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

function collectHtmlFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectHtmlFiles(full));
    } else if (entry.name.endsWith(".html")) {
      results.push(full);
    }
  }
  return results;
}

test.describe("Basic Google Consent Mode v2 & GTM (GTM-5PZR8DJ8)", () => {
  test("every built public HTML page gates GTM-5PZR8DJ8 behind consent in <head>, has no unconditional noscript/GA4 tags, and preserves Plausible", () => {
    const distDir = path.resolve(process.cwd(), "dist");
    expect(fs.existsSync(distDir)).toBe(true);

    const htmlFiles = collectHtmlFiles(distDir);
    const contentPages = htmlFiles.filter((file) => {
      const html = fs.readFileSync(file, "utf-8");
      return !html.includes('http-equiv="refresh"');
    });

    expect(contentPages.length).toBeGreaterThan(40);

    for (const file of contentPages) {
      const html = fs.readFileSync(file, "utf-8");
      const rel = path.relative(distDir, file);

      expect(html, `Forbidden container ID found in ${rel}`).not.toContain("GTM-NB8SFRHL");
      expect(html, `Direct gtag.js script must not be embedded in ${rel}`).not.toContain("googletagmanager.com/gtag/js");
      expect(html, `Direct gtag('config', ...) must not be embedded in ${rel}`).not.toMatch(/gtag\(\s*["']config["']\s*,/);
      expect(html, `Unconditional GTM noscript iframe violates Basic mode in ${rel}`).not.toContain(
        "googletagmanager.com/ns.html",
      );
      expect(html, `Plausible analytics script should remain intact in ${rel}`).toContain("https://plausible.io/js/script.js");

      const headMatch = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
      const bodyMatch = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
      expect(headMatch, `Missing <head> in ${rel}`).toBeTruthy();
      expect(bodyMatch, `Missing <body> in ${rel}`).toBeTruthy();

      const head = headMatch![1];
      const body = bodyMatch![1];

      const headGtmMatches = head.match(/GTM-5PZR8DJ8/g) ?? [];
      expect(headGtmMatches.length, `Expected exactly 1 GTM-5PZR8DJ8 loader in <head> of ${rel}`).toBe(1);
      expect(body, `Body should not duplicate GTM-5PZR8DJ8 in ${rel}`).not.toContain("GTM-5PZR8DJ8");

      const consentIdx = head.indexOf('"default"');
      const gtmIdx = head.indexOf("GTM-5PZR8DJ8");
      expect(consentIdx, `Consent default missing in <head> of ${rel}`).toBeGreaterThan(-1);
      expect(consentIdx, `Consent default must precede GTM loader in ${rel}`).toBeLessThan(gtmIdx);
    }
  });

  for (const vp of [
    { name: "desktop", width: 1280, height: 800 },
    { name: "mobile", width: 375, height: 812 },
  ]) {
    test(`blocks GTM/GA4 before consent and on reject, loads GTM-5PZR8DJ8 once on accept, and halts GA4 on withdrawal (${vp.name})`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      const jsErrors: string[] = [];
      page.on("pageerror", (err) => jsErrors.push(err.message));
      page.on("console", (msg) => {
        if (msg.type() === "error") jsErrors.push(msg.text());
      });

      const googleRequests: string[] = [];
      page.on("request", (req) => {
        const url = req.url();
        if (url.includes("googletagmanager.com") || url.includes("google-analytics.com")) {
          googleRequests.push(url);
        }
      });

      // 1. First visit: Basic Mode must NOT load GTM or GA4 before consent
      await page.goto("/", { waitUntil: "networkidle" });
      expect(googleRequests).toEqual([]);
      expect(await page.locator('script[src*="googletagmanager.com/gtm.js"]').count()).toBe(0);

      const beforeConsent = await page.evaluate(() => {
        const win = window as unknown as Record<string, unknown> & { dataLayer?: unknown[] };
        const dl = win.dataLayer ?? [];
        const entries = dl.map((item) =>
          item && typeof item === "object" && "length" in item ? Array.from(item as ArrayLike<unknown>) : item,
        );
        const defaultCall = entries.find(
          (e): e is unknown[] => Array.isArray(e) && e[0] === "consent" && e[1] === "default",
        );
        const hasGtmStart = dl.some((item) => (item as Record<string, unknown>)?.event === "gtm.js");
        return {
          defaultPayload: defaultCall ? (defaultCall[2] as Record<string, unknown>) : null,
          hasGtmStart,
          gaDisabled: win["ga-disable-G-LFSN2GYK8R"],
          cookies: document.cookie,
          overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        };
      });

      expect(beforeConsent.defaultPayload).toMatchObject({
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
      });
      expect(beforeConsent.hasGtmStart).toBe(false);
      expect(beforeConsent.gaDisabled).toBe(true);
      expect(beforeConsent.cookies).not.toMatch(/(?:^|;\s*)_ga=/);
      expect(beforeConsent.overflow).toBe(false);

      // 2. Rejecting keeps GTM and GA4 completely unloaded across navigations
      const banner = page.locator("#cookie-consent-banner");
      await expect(banner).toBeVisible();
      await expect(banner).toContainText("Cookies y medición");

      await page.locator("#cookie-consent-reject").click();
      await expect(banner).toBeHidden();
      expect(googleRequests).toEqual([]);

      await page.goto("/pricing/", { waitUntil: "networkidle" });
      await expect(banner).toBeHidden();
      expect(googleRequests).toEqual([]);
      expect(await page.locator('script[src*="googletagmanager.com/gtm.js"]').count()).toBe(0);

      // 3. Reopening settings from footer and accepting loads GTM-5PZR8DJ8 once and enables GA4
      await page.locator("footer [data-open-cookie-settings]").click();
      await expect(banner).toBeVisible();

      const gtmResponsePromise = page.waitForResponse(
        (res) => res.url().includes("googletagmanager.com/gtm.js?id=GTM-5PZR8DJ8") && res.status() === 200,
      );
      await page.locator("#cookie-consent-accept").click();
      await gtmResponsePromise;
      await expect(banner).toBeHidden();

      const gtmOnly = googleRequests.filter((u) => u.includes("googletagmanager.com/gtm.js"));
      expect(gtmOnly.length).toBe(1);
      expect(gtmOnly[0]).toContain("id=GTM-5PZR8DJ8");
      expect(await page.locator('script[src*="googletagmanager.com/gtm.js"]').count()).toBe(1);

      const afterAccept = await page.evaluate(() => {
        const win = window as unknown as Record<string, unknown> & { dataLayer?: unknown[] };
        const dl = win.dataLayer ?? [];
        const entries = dl.map((item) =>
          item && typeof item === "object" && "length" in item ? Array.from(item as ArrayLike<unknown>) : item,
        );
        const updateCall = entries.find(
          (e): e is unknown[] => Array.isArray(e) && e[0] === "consent" && e[1] === "update",
        );
        return {
          stored: window.localStorage.getItem("jaumetur_cookie_consent_v1"),
          gaDisabled: win["ga-disable-G-LFSN2GYK8R"],
          updatePayload: updateCall ? (updateCall[2] as Record<string, unknown>) : null,
        };
      });

      expect(afterAccept.stored).toBe("granted");
      expect(afterAccept.gaDisabled).toBe(false);
      expect(afterAccept.updatePayload).toMatchObject({
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "granted",
      });

      // 4. Subsequent navigation (/en/cookies/) loads GTM automatically with granted consent
      googleRequests.length = 0;
      await page.goto("/en/cookies/", { waitUntil: "networkidle" });
      await expect(banner).toBeHidden();
      await expect(page.locator("#cookies-page-status")).toContainText("Accepted");
      expect(googleRequests.filter((u) => u.includes("GTM-5PZR8DJ8")).length).toBe(1);
      expect(await page.locator('script[src*="googletagmanager.com/gtm.js"]').count()).toBe(1);

      // 5. Withdrawing consent immediately stops GA4, clears _ga cookies, and stops loading GTM on next pages
      await page.evaluate(() => {
        document.cookie = "_ga=GA1.1.123456789.123456789; path=/";
      });
      await page.locator("#cookies-page-reject").click();
      await expect(page.locator("#cookies-page-status")).toContainText("Rejected");

      const afterRevoke = await page.evaluate(() => {
        const win = window as unknown as Record<string, unknown>;
        return {
          stored: window.localStorage.getItem("jaumetur_cookie_consent_v1"),
          gaDisabled: win["ga-disable-G-LFSN2GYK8R"],
          cookies: document.cookie,
        };
      });
      expect(afterRevoke.stored).toBe("denied");
      expect(afterRevoke.gaDisabled).toBe(true);
      expect(afterRevoke.cookies).not.toMatch(/(?:^|;\s*)_ga=/);

      googleRequests.length = 0;
      await page.goto("/", { waitUntil: "networkidle" });
      expect(googleRequests).toEqual([]);
      expect(await page.locator('script[src*="googletagmanager.com/gtm.js"]').count()).toBe(0);
      expect(jsErrors).toEqual([]);
    });
  }
});
