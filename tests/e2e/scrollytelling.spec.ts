import { test, expect } from "@playwright/test";

test.describe("Minimalist Scrollytelling Experience on Main", () => {
  test("Desktop builds 'Hola, soy Jaume Tur' word by word through 5 progressive states", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const track = page.locator("#scrolly-hero");
    await expect(track).toBeVisible();

    const holaToken = page.locator("#token-hola");
    const soyToken = page.locator("#token-soy");
    const jaumeToken = page.locator("#token-jaume");
    const turToken = page.locator("#token-tur");
    const statement = page.locator("#hero-statement");

    // 1. Estado 1 (0–20%): «Hola» completo y centrado, resto oculto
    await expect(holaToken).toBeVisible();
    await expect(holaToken).toHaveText("Hola");

    const soyInitialOpacity = await soyToken.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(soyInitialOpacity).toBeLessThan(0.1);

    const jaumeInitialOpacity = await jaumeToken.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(jaumeInitialOpacity).toBeLessThan(0.1);

    const turInitialOpacity = await turToken.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(turInitialOpacity).toBeLessThan(0.1);

    const initialStmtOpacity = await statement.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(initialStmtOpacity).toBe(0);

    const trackTop = await track.evaluate((el) => window.scrollY + el.getBoundingClientRect().top);
    const scrollableDistance = await track.evaluate((el) => (el as HTMLElement).offsetHeight - window.innerHeight);

    // 2. Estado 2 (20–40%): scroll a 30% -> «Hola, soy» visible
    await page.evaluate(({ top, dist }) => window.scrollTo({ top: top + dist * 0.30, behavior: "instant" }), { top: trackTop, dist: scrollableDistance });
    await page.waitForTimeout(100);

    const soyOpacityState2 = await soyToken.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(soyOpacityState2).toBeGreaterThan(0.6);

    const jaumeOpacityState2 = await jaumeToken.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(jaumeOpacityState2).toBeLessThan(0.1);

    // 3. Estado 3 (40–60%): scroll a 50% -> «Hola, soy Jaume» visible
    await page.evaluate(({ top, dist }) => window.scrollTo({ top: top + dist * 0.50, behavior: "instant" }), { top: trackTop, dist: scrollableDistance });
    await page.waitForTimeout(100);

    const jaumeOpacityState3 = await jaumeToken.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(jaumeOpacityState3).toBeGreaterThan(0.6);

    const turOpacityState3 = await turToken.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(turOpacityState3).toBeLessThan(0.1);

    // 4. Estado 4 (60–80%): scroll a 70% -> «Hola, soy Jaume Tur» completo
    await page.evaluate(({ top, dist }) => window.scrollTo({ top: top + dist * 0.70, behavior: "instant" }), { top: trackTop, dist: scrollableDistance });
    await page.waitForTimeout(100);

    const turOpacityState4 = await turToken.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(turOpacityState4).toBeGreaterThan(0.6);

    // 5. Estado 5 (80–100%): scroll a 90% -> frase completa y estable + statement visible
    await page.evaluate(({ top, dist }) => window.scrollTo({ top: top + dist * 0.90, behavior: "instant" }), { top: trackTop, dist: scrollableDistance });
    await page.waitForTimeout(100);

    const nameLink = page.locator("#hero-name-link");
    await expect(nameLink).toBeVisible();
    await expect(nameLink).toHaveAttribute("href", "/about");

    const stmtOpacity = await statement.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(stmtOpacity).toBeGreaterThan(0.6);

    // 6. Scroll inverso hacia arriba (0px) -> regresa al Estado 1
    await page.evaluate(({ top }) => window.scrollTo({ top, behavior: "instant" }), { top: trackTop });
    await page.waitForTimeout(100);

    const soyReversedOpacity = await soyToken.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(soyReversedOpacity).toBeLessThan(0.1);

    const jaumeReversedOpacity = await jaumeToken.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(jaumeReversedOpacity).toBeLessThan(0.1);

    // 7. Scroll to #desenvolupament section smoothly
    await page.evaluate(() => {
      document.querySelector("#desenvolupament")?.scrollIntoView();
    });
    await page.waitForTimeout(100);
    const devSection = page.locator("#desenvolupament");
    await expect(devSection).toBeInViewport();

    // Verify 3 capability categories (Webs, Aplicaciones, Automatización)
    const capabilityArticles = devSection.locator("article");
    await expect(capabilityArticles).toHaveCount(3);
    await expect(devSection.getByRole("heading", { name: "Webs" })).toBeVisible();
    await expect(devSection.getByRole("heading", { name: "Aplicaciones" })).toBeVisible();
    await expect(devSection.getByRole("heading", { name: "Automatización" })).toBeVisible();

    // Verify initial state: floating popovers are not visible initially
    const websPopover = devSection.locator("#floating-webs");
    await expect(websPopover).not.toBeVisible();

    const popupCloseBtn = page.locator("#capabilities-popup-close-btn");
    const popupBackdrop = page.locator("#capabilities-popup-backdrop");

    // 1. Desktop hover: Hovering over 'Webs' card automatically opens the large preview popup
    const websCard = devSection.locator("#card-webs");
    await websCard.hover({ force: true });
    await websCard.dispatchEvent("mouseenter");
    await expect(websPopover).toBeVisible();
    await expect(websPopover.getByText("Pizzería Xàtiva")).toBeVisible();
    await expect(websPopover.getByText("Burger Xàtiva")).toBeVisible();

    // Close using the discreet X button
    await popupCloseBtn.click({ force: true });
    await expect(websPopover).not.toBeVisible();

    // Verify it does NOT re-open automatically while cursor stays on that card
    await page.waitForTimeout(100);
    await expect(websPopover).not.toBeVisible();

    // Leaving the card and hovering again triggers the pop-up again
    await page.mouse.move(0, 0);
    await page.waitForTimeout(50);
    await websCard.hover({ force: true });
    await websCard.dispatchEvent("mouseenter");
    await expect(websPopover).toBeVisible();
    await popupCloseBtn.click({ force: true });
    await expect(websPopover).not.toBeVisible();
    await page.mouse.move(0, 0);

    // 2. Apps card: hover opens apps popover with AVISA
    const appsCard = devSection.locator("#card-apps");
    await appsCard.hover({ force: true });
    await appsCard.dispatchEvent("mouseenter");
    const appsPopover = devSection.locator("#floating-apps");
    await expect(appsPopover).toBeVisible();
    await expect(appsPopover.getByText("AVISA")).toBeVisible();

    // Close using Escape key
    await page.keyboard.press("Escape");
    await expect(appsPopover).not.toBeVisible();
    await page.mouse.move(0, 0);

    // 3. Automation card: 'Más información' click also opens automation popover
    const autoCard = devSection.locator("#card-automation");
    const autoMoreBtn = autoCard.locator(".cap-more-btn");
    await autoMoreBtn.dispatchEvent("click");
    const autoPopover = devSection.locator("#floating-automation");
    await expect(autoPopover).toBeVisible();
    await expect(autoPopover.getByText(/Pipeline CI\/CD/)).toBeVisible();

    // Close using the discreet X button as specified in Section 4
    await popupCloseBtn.click({ force: true });
    await expect(autoPopover).not.toBeVisible();

    // Verify Sobre mí section with button to /about
    const aboutSection = page.locator("#sobre-mi");
    await expect(aboutSection.locator('a[href="/about"]')).toBeVisible();

    // Verify Contact / CTA section with links to contact and pricing
    const contactSection = page.locator("#contacte");
    await expect(contactSection.locator('a[href="/contact"]')).toBeVisible();
    await expect(contactSection.locator('a[href="/pricing"]')).toBeVisible();
  });

  test("English version /en progressively reveals 'Hello, I\\'m Jaume Tur.' and contains full SEO heading", async ({ page }) => {
    await page.goto("/en");
    await page.waitForLoadState("domcontentloaded");

    const mainHeading = page.locator("#hero-main-heading");
    // Verify SEO text is present in DOM immediately from server HTML
    const headingText = await mainHeading.textContent();
    expect(headingText).toContain("Hello, I'm Jaume Tur");

    const track = page.locator("#scrolly-hero");
    const trackTop = await track.evaluate((el) => window.scrollY + el.getBoundingClientRect().top);
    const scrollableDistance = await track.evaluate((el) => (el as HTMLElement).offsetHeight - window.innerHeight);

    // Scroll to middle (State 3: 50% -> 'Hello, I\'m Jaume')
    await page.evaluate(({ top, dist }) => window.scrollTo({ top: top + dist * 0.5, behavior: "instant" }), { top: trackTop, dist: scrollableDistance });
    await page.waitForTimeout(100);

    const jaumeTokenEn = page.locator("#token-jaume");
    const jaumeOpacity = await jaumeTokenEn.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(jaumeOpacity).toBeGreaterThan(0.6);

    // Scroll to State 4 (75% -> full phrase including last word 'Tur')
    await page.evaluate(({ top, dist }) => window.scrollTo({ top: top + dist * 0.75, behavior: "instant" }), { top: trackTop, dist: scrollableDistance });
    await page.waitForTimeout(100);

    const tokens = page.locator(".token-word");
    const lastTokenOpacity = await tokens.last().evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(lastTokenOpacity).toBeGreaterThan(0.8);

    const nameLinkEn = page.locator("#hero-name-link");
    await expect(nameLinkEn).toHaveAttribute("href", "/en/about");
  });

  test("Mobile viewport (375px) has zero horizontal overflow and elegant layout", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const track = page.locator("#scrolly-hero");
    await expect(track).toBeVisible();

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const windowWidth = await page.evaluate(() => window.innerWidth);
    expect(scrollWidth).toBeLessThanOrEqual(windowWidth + 1);

    // Scroll through the track on mobile
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(100);
    const scrollWidthScrolled = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidthScrolled).toBeLessThanOrEqual(windowWidth + 1);
  });
});
