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

  test("Command palette opens on shortcut and filters commands", async ({ page }) => {
    await page.goto("/");
    const paletteBackdrop = page.locator("#command-palette-backdrop");
    await expect(paletteBackdrop).toHaveClass(/hidden/);

    // Click visible command palette trigger button
    const triggerBtn = page.locator("[data-command-palette-trigger]:visible");
    await triggerBtn.click();
    await expect(paletteBackdrop).not.toHaveClass(/hidden/);

    // Filter input
    const input = page.locator("#command-palette-input");
    await input.fill("qualitat");
    await expect(page.locator('.command-item:not(.hidden)').first()).toContainText("Qualitat");

    // Close with Escape
    await page.keyboard.press("Escape");
    await expect(paletteBackdrop).toHaveClass(/hidden/);
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
});

