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
    await page.goto("/#projectes");
    const projectsSection = page.locator("#projectes");
    await expect(projectsSection).toBeVisible();

    // Check project links to case studies
    const avisaLink = page.locator('a[href="/projectes/avisa"]').first();
    await expect(avisaLink).toBeVisible();

    const pizzeriaLink = page.locator('a[href="/projectes/pizzeria-xativa"]').first();
    await expect(pizzeriaLink).toBeVisible();
    await expect(projectsSection.getByText("Projecte de client")).toBeVisible();
    await expect(projectsSection.getByText("Demo · contingut fictici").first()).toBeVisible();
    await expect(projectsSection.locator("article")).toHaveCount(3);
  });

  test("Case study page loads with honest verification badge and JSON-LD", async ({ page }) => {
    await page.goto("/projectes/avisa");
    await expect(page.locator("main h1")).toContainText("AVISA");

    // Check JSON-LD schema containing SoftwareSourceCode
    const scripts = await page.locator('script[type="application/ld+json"]').allTextContents();
    const hasSoftwareSchema = scripts.some((s) => s.includes("SoftwareSourceCode") || s.includes("CreativeWork"));
    expect(hasSoftwareSchema).toBe(true);
  });

  test("Transparency quality page /qualitat displays Lighthouse 100 metrics", async ({ page }) => {
    await page.goto("/qualitat");
    await expect(page.locator("h1")).toContainText("Qualitat");
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
    
    // Desktop navigation links
    const desktopLinks = page.locator("nav[aria-label='Navegación principal'] > ul > li > a");
    await expect(desktopLinks.filter({ hasText: "Proyectos" })).toHaveAttribute("href", "/projectes");
    await expect(desktopLinks.filter({ hasText: "Precios" })).toHaveAttribute("href", "/pricing");
    await expect(desktopLinks.filter({ hasText: "Sobre mí" })).toHaveAttribute("href", "/about");
    await expect(desktopLinks.filter({ hasText: "Contacto" })).toHaveAttribute("href", "/contact");

    // Contact is a regular navigation destination, with no extra header CTA.
    await expect(page.locator('header a[href="/contact"]').first()).toBeAttached();

    // Internal anchors must NOT be in the header
    const allHeaderLinks = await page.locator("header a").evaluateAll((links) =>
      links.map((l) => l.getAttribute("href") || "")
    );
    expect(allHeaderLinks.some((h) => h.includes("#skills") || h.includes("#metodologia"))).toBe(false);

    // Switch to mobile viewport to test accessible mobile menu
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileDetails = page.locator("#mobile-menu-details");
    const mobileSummary = page.locator("#mobile-menu-summary");
    await expect(mobileSummary).toBeVisible();
    await expect(mobileSummary).toHaveAttribute("aria-expanded", "false");

    // Click summary to toggle open
    await mobileSummary.click();
    await expect(mobileDetails).toHaveAttribute("open", "");
    await expect(mobileSummary).toHaveAttribute("aria-expanded", "true");

    // Close on Escape
    await page.keyboard.press("Escape");
    await expect(mobileDetails).not.toHaveAttribute("open", "");
    await expect(mobileSummary).toHaveAttribute("aria-expanded", "false");

    // Footer contains 3 columns (Navegar, Recursos, Contacte)
    const footer = page.locator("footer");
    await expect(footer.getByText("Navegación")).toBeVisible();
    await expect(footer.getByText("Recursos")).toBeVisible();
    await expect(footer.locator("h3").filter({ hasText: "Contacto" })).toBeVisible();
    await expect(footer.getByText("Desarrollador web · Frontend")).toBeVisible();
  });

  test("Contact form triggers accessible validation on empty submit", async ({ page }) => {
    await page.goto("/contact");
    const submitBtn = page.locator('button[type="submit"]').first();
    await submitBtn.click();

    // Feedback message should be triggered
    const nameInput = page.locator("#contact-name");
    await expect(nameInput).toHaveAttribute("aria-required", "true");
    const nameError = page.locator("#name-error");
    await expect(nameError).toBeVisible();
  });

  test("Pricing page displays service packages including key local digitization offer and structured FAQ", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.locator("h3").filter({ hasText: "Digitalització Local" })).toBeVisible();
    await expect(page.locator("text=Proposta Clau · Oferta Estrella")).toBeVisible();
    await expect(page.locator("text=Des de 290 €")).toBeVisible();
    await expect(page.locator("text=Landing Page d'Alt Rendiment")).toBeVisible();
    await expect(page.locator("text=Preguntes freqüents")).toBeVisible();

    // Click on detail link of key local digitization offer
    await page.click('a[href="/pricing/digitalitzacio-local"] >> nth=0');
    await expect(page).toHaveURL("/pricing/digitalitzacio-local");
    await expect(page.locator("h1")).toContainText("Digitalització Local & Carta Web");
    await expect(page.locator("text=El perquè de cada preu")).toBeVisible();
    await expect(page.locator("text=Com s'amortitza aquest preu fàcilment")).toBeVisible();
    await expect(page.locator("text=Inspirat en el cas real de la Pizzeria a Xàtiva")).toBeVisible();
    await expect(page.locator("text=Comparativa de Mercat")).toBeVisible();
  });

  test("Brand kit page /marca displays official logo and download links", async ({ page }) => {
    await page.goto("/marca");
    await expect(page.locator("h1, h2").filter({ hasText: "Logotips" })).toBeVisible();
    await expect(page.locator('a[download="jt-logo-groc.png"]')).toBeVisible();
  });

  test("Digital card page /card displays contact pass, QR code and vCard link", async ({ page }) => {
    await page.goto("/card");
    await expect(page.locator("h1")).toContainText("Jaume Tur");
    await expect(page.locator("#card-download-vcf")).toBeVisible();
    await expect(page.locator('img[src="/qr-jaumetur.svg"]')).toBeVisible();
  });
});

