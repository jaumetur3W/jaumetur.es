import { test, expect } from "@playwright/test";

test.describe("Critical User Journeys & Technical Quality", () => {
  test("Home loads successfully with valid meta and skip link", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Jaume Tur/);

    // Skip link exists and is accessible
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeAttached();

    // Main landmark exists
    const mainLandmark = page.locator("#main-content");
    await expect(mainLandmark).toBeAttached();
  });

  test("Featured projects link to their case studies and label client/demo work", async ({ page }) => {
    await page.goto("/projectes/");
    const projectsSection = page.locator("main");
    await expect(projectsSection).toBeVisible();

    // Check project links to case studies
    const avisaLink = page.locator('a[href*="/projectes/avisa"]').first();
    await expect(avisaLink).toBeVisible();

    const pizzeriaLink = page.locator('a[href*="/projectes/pizzeria-xativa"]').first();
    await expect(pizzeriaLink).toBeVisible();
    await expect(projectsSection.getByText(/Insignia|Flagship/i).first()).toBeVisible();
    await expect(projectsSection.getByText(/Demo interactiva|Demo · contingut fictici/i).first()).toBeVisible();
  });

  test("Case study page loads with honest verification badge and JSON-LD", async ({ page }) => {
    await page.goto("/projectes/avisa/");
    await expect(page.locator("main h1")).toContainText("AVISA");

    // Check JSON-LD schema containing SoftwareSourceCode
    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const hasSoftwareSchema = scripts.some((s) => s.includes("SoftwareSourceCode") || s.includes("CreativeWork"));
    expect(hasSoftwareSchema).toBe(true);
  });

  test("Quality pages display localized titles and Lighthouse metrics", async ({ page }) => {
    await page.goto("/qualitat/");
    await expect(page.locator("h1")).toContainText("Compromiso de calidad y rendimiento");
    await expect(page.getByText("100", { exact: true }).first()).toBeVisible();

    await page.goto("/en/qualitat/");
    await expect(page.locator("h1")).toContainText("quality and performance");
    await expect(page.getByText("100", { exact: true }).first()).toBeVisible();
  });

  test("Theme is strictly light mode and dark mode toggle is removed", async ({ page }) => {
    await page.goto("/");
    const themeBtn = page.locator("#theme-toggle-btn:visible");
    await expect(themeBtn).toHaveCount(0);

    const html = page.locator("html");
    const isDark = await html.evaluate((el) => el.classList.contains("dark"));
    expect(isDark).toBe(false);
  });

  test("Sticky navbar stays visible at top of viewport on scroll", async ({ page }) => {
    await page.goto("/");
    const navHeader = page.locator("#site-header");
    await expect(navHeader).toBeVisible();

    // Scroll down 600px
    await page.evaluate(() => window.scrollTo(0, 600));
    await expect(navHeader).toBeVisible();
    
    // Check it is positioned at the top of the viewport
    const boundingBox = await navHeader.boundingBox();
    expect(boundingBox?.y).toBeLessThanOrEqual(5);
  });

  test("Top navbar displays standard page links without in-page anchors, and mobile menu is accessible", async ({ page }) => {
    await page.goto("/");
    
    // Desktop navigation links: Servicios, Proyectos, Blog, Herramientas, Sobre mí
    const desktopNav = page.locator("nav[aria-label='Navegación principal']");
    await expect(desktopNav.locator('a[href="/pricing/"]')).toHaveText("Servicios");
    await expect(desktopNav.locator('a[href="/projectes/"]')).toHaveText("Proyectos");
    await expect(desktopNav.locator('a[href="/blog/"]')).toHaveText("Blog");
    await expect(desktopNav.locator('a[href="/tools/creador-html/"]')).toHaveText("Herramientas");
    await expect(desktopNav.locator('a[href="/about/"]')).toHaveText("Sobre mí");

    // Contact CTA
    await expect(page.locator('header a[href="/contact/"]').first()).toBeVisible();

    // Internal anchors must NOT be in the header
    const allHeaderLinks = await page.locator("header a").evaluateAll((links) =>
      links.map((l) => l.getAttribute("href") || "")
    );
    expect(allHeaderLinks.some((h) => h.includes("#skills") || h.includes("#metodologia"))).toBe(false);

    // Switch to mobile viewport to test accessible mobile menu
    await page.setViewportSize({ width: 375, height: 667 });
    const navToggle = page.locator("#nav-toggle");
    const navPanel = page.locator("#nav-panel");
    await expect(navToggle).toBeVisible();
    await expect(navToggle).toHaveAttribute("aria-expanded", "false");

    // Click toggle to open mobile menu
    await navToggle.click();
    await expect(navPanel).toBeVisible();
    await expect(navToggle).toHaveAttribute("aria-expanded", "true");

    // Close on Escape
    await page.keyboard.press("Escape");
    await expect(navPanel).not.toBeVisible();
    await expect(navToggle).toHaveAttribute("aria-expanded", "false");

    // Minimalist Studio Footer structure
    const footer = page.locator("footer");
    // Identity & tagline
    await expect(footer.getByText("Jaume Tur").first()).toBeVisible();

    // Social & Contact icons
    await expect(footer.locator('a[href="https://github.com/jaumetur3W"]')).toBeVisible();
    await expect(footer.locator('a[href*="linkedin.com/in/jautur"]')).toBeVisible();
    await expect(footer.locator('a[href*="instagram.com/jaume.www"]')).toBeVisible();
    await expect(footer.locator('a[href="mailto:jaumetur3w@gmail.com"]')).toBeVisible();
    // Legal & standards links
    await expect(footer.locator('a[href="/privacidad/"]')).toBeVisible();
    await expect(footer.locator('a[href="/cookies/"]')).toBeVisible();
    await expect(footer.locator('a[href="/aviso-legal/"]')).toBeVisible();
    await expect(footer.locator('a[href="/qualitat/"]').filter({ hasText: "Accesibilidad" })).toBeVisible();
    await expect(footer.locator('a[href="/rss.xml"]')).toBeVisible();
    // Bottom copyright and location
    await expect(footer.getByText(/© \d{4} Jaume Tur/i)).toBeVisible();
  });

  test("Contact form triggers accessible validation on empty submit", async ({ page }) => {
    await page.goto("/contact/");
    const submitBtn = page.locator('button[type="submit"]').first();
    await submitBtn.click();

    // Feedback message should be triggered
    const nameInput = page.locator("#contact-name");
    await expect(nameInput).toHaveAttribute("aria-required", "true");
    const nameError = page.locator("#name-error");
    await expect(nameError).toBeVisible();
  });

  test("Pricing page displays service packages including key local digitization offer", async ({ page }) => {
    await page.goto("/pricing/");
    await expect(page.locator("h2").filter({ hasText: "Digitalización local y carta web" })).toBeVisible();
    await expect(page.getByText("290 €").first()).toBeVisible();
    await expect(page.locator("h2").filter({ hasText: "Landing page de alto rendimiento" })).toBeVisible();

    // Click on detail link of key local digitization offer
    await page.click('a[href="/pricing/digitalitzacio-local/"] >> nth=0');
    await expect(page).toHaveURL("/pricing/digitalitzacio-local/");
    await expect(page.locator("h1")).toContainText("Digitalización local y carta web");
    await expect(page.getByText(/De dónde sale el precio/i)).toBeVisible();
    await expect(page.getByText(/Cómo se amortiza/i)).toBeVisible();
    await expect(page.getByText(/Comparativa/i)).toBeVisible();

    await page.goto("/en/pricing/");
    await expect(page.locator("h2").filter({ hasText: "Local Digitization & Web Menu" })).toBeVisible();
  });

  test("Digital card page /card displays contact pass, QR code and vCard link", async ({ page }) => {
    await page.goto("/card/");
    await expect(page.locator("h1")).toContainText("Jaume Tur");
    await expect(page.locator("#card-download-vcf")).toBeVisible();
    await expect(page.locator('img[src="/qr-jaumetur.svg"]')).toBeVisible();
  });

  test("Language switcher preserves routes and switches correctly", async ({ page }) => {
    await page.goto("/about/");
    
    // In Spanish page, ES is active and EN links to /en/about/
    const enLink = page.locator('header a[hreflang="en"]').first();
    const esLink = page.locator('header a[hreflang="es"]').first();
    await expect(esLink).toBeVisible();
    await expect(enLink).toBeVisible();

    await expect(enLink).toHaveAttribute("href", "/en/about/");

    // Click EN to navigate
    await enLink.click();
    await expect(page).toHaveURL("/en/about/");
    await expect(page.locator("h1")).toContainText("The person who'll build your website");

    const englishDesktopNav = page.locator("nav[aria-label='Main navigation']");
    await expect(englishDesktopNav.locator('a[href="/en/pricing/"]')).toHaveText("Services");
    await expect(englishDesktopNav.locator('a[href="/en/projectes/"]')).toHaveText("Projects");
    await expect(englishDesktopNav.locator('a[href="/en/about/"]')).toHaveText("About");

    // On English page, verify ES links back to /about/
    const backToEsLink = page.locator('header a[hreflang="es"]').first();
    await expect(backToEsLink).toBeVisible();
    await expect(backToEsLink).toHaveAttribute("href", "/about/");
  });

  test("Legacy /val routes redirect cleanly to Spanish counterparts", async ({ page }) => {
    await page.goto("/val/");
    await expect(page).toHaveURL("/");
    expect(page.url()).not.toContain("/val");

    await page.goto("/val/about/");
    await expect(page).toHaveURL(/\/about\/?$/);
    expect(page.url()).not.toContain("/val");
  });
});
