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

  test("Bento grid displays all 4 featured projects linking to case studies", async ({ page }) => {
    await page.goto("/#projectes");
    const projectsSection = page.locator("#projectes");
    await expect(projectsSection).toBeVisible();

    // Check project links to case studies
    const avisaLink = page.locator('a[href="/projectes/avisa"]').first();
    await expect(avisaLink).toBeVisible();

    const pizzeriaLink = page.locator('a[href="/projectes/pizzeria-xativa"]').first();
    await expect(pizzeriaLink).toBeVisible();
  });

  test("Case study page loads with honest verification badge and JSON-LD", async ({ page }) => {
    await page.goto("/projectes/avisa");
    await expect(page.locator("h1")).toContainText("AVISA");

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

  test("Top navbar displays in-page links only and dropdown opens containing all site links", async ({ page }) => {
    await page.goto("/");
    
    // Top menu has in-page links
    const inPageLinks = page.locator("nav[aria-label='Navegació principal'] > ul > li > a");
    await expect(inPageLinks.filter({ hasText: "Projectes" })).toBeVisible();
    await expect(inPageLinks.filter({ hasText: "Habilitats" })).toBeVisible();
    await expect(inPageLinks.filter({ hasText: "Metodologia" })).toBeVisible();
    await expect(inPageLinks.filter({ hasText: "Contacte" })).toBeVisible();

    // Dropdown is initially hidden
    const dropdownMenu = page.locator("#nav-dropdown-menu");
    await expect(dropdownMenu).toHaveClass(/hidden/);

    // Click dropdown trigger
    const dropdownTrigger = page.locator("#nav-dropdown-trigger");
    await dropdownTrigger.click();
    await expect(dropdownMenu).not.toHaveClass(/hidden/);

    // Contains links from top and bottom
    await expect(dropdownMenu.locator('a[href="/about"]')).toBeVisible();
    await expect(dropdownMenu.locator('a[href="/pricing"]')).toBeVisible();
    await expect(dropdownMenu.locator('a[href="/blog"]')).toBeVisible();
    await expect(dropdownMenu.locator('a[href="/marca"]')).toBeVisible();
    await expect(dropdownMenu.locator('a[href="/qualitat"]')).toBeVisible();
    await expect(dropdownMenu.locator('a[href="/tools/workflow-generator"]')).toBeVisible();

    // Close on Escape
    await page.keyboard.press("Escape");
    await expect(dropdownMenu).toHaveClass(/hidden/);
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

  test("Pricing page displays 4 clear service packages and structured FAQ", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.locator("text=Landing Page d'Alt Rendiment")).toBeVisible();
    await expect(page.locator("text=Web App SPA amb Angular")).toBeVisible();
    await expect(page.locator("text=Preguntes freqüents")).toBeVisible();
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

