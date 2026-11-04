import { test, expect, type Locator } from "@playwright/test";

test.describe("Minimalist Scrollytelling Experience on Main", () => {
  test("One wheel gesture completes each word state and the next gesture exits the hero", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");

    const track = page.locator("#scrolly-hero");
    await expect(track).toBeVisible();

    const holaToken = page.locator("#token-hola");
    const soyToken = page.locator("#token-soy");
    const jaumeToken = page.locator("#token-jaume");
    const turToken = page.locator("#token-tur");
    const statement = page.locator("#hero-statement");

    // The full phrase stays accessible in the DOM while the visual sequence starts hidden.
    await expect(holaToken).toBeVisible();
    await expect(holaToken).toHaveText("Hola");

    // Verifica que «Hola» tiene peso bold (>= 700) y que las demás palabras mantienen peso normal (400)
    const holaWeight = await holaToken.evaluate((el) => window.getComputedStyle(el).fontWeight);
    expect(parseInt(holaWeight, 10)).toBeGreaterThanOrEqual(700);

    const soyWeight = await soyToken.evaluate((el) => window.getComputedStyle(el).fontWeight);
    expect(parseInt(soyWeight, 10)).toBeLessThanOrEqual(400);

    const turWeight = await turToken.evaluate((el) => window.getComputedStyle(el).fontWeight);
    expect(parseInt(turWeight, 10)).toBeLessThanOrEqual(400);

    const soyInitialOpacity = await soyToken.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(soyInitialOpacity).toBeLessThan(0.1);

    const jaumeInitialOpacity = await jaumeToken.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(jaumeInitialOpacity).toBeLessThan(0.1);

    const turInitialOpacity = await turToken.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(turInitialOpacity).toBeLessThan(0.1);

    const initialStmtOpacity = await statement.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(initialStmtOpacity).toBe(0);

    const opacity = async (locator: Locator) =>
      locator.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    const advance = async (direction = 1) => {
      await page.mouse.wheel(0, direction * 120);
      await page.waitForTimeout(650);
    };

    expect(await opacity(holaToken)).toBeLessThan(0.1);
    expect(await opacity(soyToken)).toBeLessThan(0.1);

    // A burst of wheel events from one gesture must trigger only the first state.
    await page.mouse.wheel(0, 120);
    await page.mouse.wheel(0, 120);
    await page.mouse.wheel(0, 120);
    await page.waitForTimeout(650);
    expect(await opacity(holaToken)).toBeGreaterThan(0.99);
    expect(await opacity(soyToken)).toBeLessThan(0.1);

    // The animation finishes on its own; one fresh gesture reveals each next word.
    await advance();
    expect(await opacity(soyToken)).toBeGreaterThan(0.99);
    expect(await opacity(holaToken)).toBeGreaterThan(0.99);
    expect(await opacity(jaumeToken)).toBeLessThan(0.1);

    await advance();
    expect(await opacity(jaumeToken)).toBeGreaterThan(0.99);
    expect(await opacity(soyToken)).toBeGreaterThan(0.99);
    expect(await opacity(turToken)).toBeLessThan(0.1);

    await advance();
    expect(await opacity(turToken)).toBeGreaterThan(0.99);

    const nameLink = page.locator("#hero-name-link");
    await expect(nameLink).toBeVisible();
    await expect(nameLink).toHaveAttribute("href", "/about");

    await advance();
    expect(await opacity(statement)).toBeGreaterThan(0.99);

    const scrollAtHeroEnd = await page.evaluate(() => window.scrollY);
    await page.mouse.wheel(0, 120);
    await page.waitForTimeout(100);
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(scrollAtHeroEnd);

    // Reverse gestures return through earlier states to the initial hidden state.
    await advance(-1);
    expect(await opacity(turToken)).toBeGreaterThan(0.99);
    expect(await opacity(statement)).toBeLessThan(0.1);
    await advance(-1);
    expect(await opacity(jaumeToken)).toBeGreaterThan(0.99);
    await advance(-1);
    expect(await opacity(soyToken)).toBeGreaterThan(0.99);
    await advance(-1);
    expect(await opacity(holaToken)).toBeGreaterThan(0.99);
    await advance(-1);
    expect(await opacity(holaToken)).toBeLessThan(0.1);

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
    const _popupBackdrop = page.locator("#capabilities-popup-backdrop");

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

  test("A separate wheel gesture during an animation is queued instead of lost", async ({ page }) => {
    await page.goto("/");

    await page.mouse.wheel(0, 120);
    await page.waitForTimeout(260);
    await page.mouse.wheel(0, 120);
    await page.waitForTimeout(900);

    await expect(page.locator("#token-hola")).toHaveCSS("opacity", "1");
    await expect(page.locator("#token-soy")).toHaveCSS("opacity", "1");
    await expect(page.locator("#token-jaume")).toHaveCSS("opacity", "0");
  });

  test("English version /en reveals each word in discrete gestures and contains full SEO heading", async ({ page }) => {
    await page.goto("/en/");
    await page.waitForLoadState("domcontentloaded");

    const mainHeading = page.locator("#hero-main-heading");
    // Verify SEO text is present in DOM immediately from server HTML
    const headingText = await mainHeading.textContent();
    expect(headingText).toContain("Hello, I'm Jaume Tur");

    const advance = async () => {
      await page.mouse.wheel(0, 120);
      await page.waitForTimeout(650);
    };

    await advance();
    await advance();
    await advance();

    const jaumeTokenEn = page.locator("#token-jaume");
    const jaumeOpacity = await jaumeTokenEn.evaluate((el) => parseFloat(window.getComputedStyle(el).opacity));
    expect(jaumeOpacity).toBeGreaterThan(0.6);

    await advance();

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

  test("Reduced-motion preference shows the complete, non-animated presentation", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    for (const token of await page.locator(".token-word").all()) {
      await expect(token).toHaveCSS("opacity", "1");
    }
    await expect(page.locator("#hero-statement")).toHaveCSS("opacity", "1");
  });

  test("Touch swipes advance and reverse one complete state at a time", async ({ browser }) => {
    const context = await browser.newContext({
      baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:4321",
      viewport: { width: 375, height: 667 },
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await page.goto("/");

    const hola = page.locator("#token-hola");
    const soy = page.locator("#token-soy");
    const swipe = async (fromY: number, toY: number) => {
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [{ x: 190, y: fromY }],
      });
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x: 190, y: toY }],
      });
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchEnd",
        touchPoints: [],
      });
      await page.waitForTimeout(650);
    };

    await swipe(520, 450);
    await expect(hola).toHaveCSS("opacity", "1");
    await expect(soy).toHaveCSS("opacity", "0");

    await swipe(520, 450);
    await expect(soy).toHaveCSS("opacity", "1");

    await swipe(450, 520);
    await expect(soy).toHaveCSS("opacity", "0");
    await context.close();
  });

  test("Centering precision and bold typography across narrow, mobile, tablet, and desktop viewports", async ({ page }) => {
    test.slow();
    const viewports = [
      { name: "Móvil estrecho", width: 320, height: 568 },
      { name: "Móvil estándar", width: 375, height: 667 },
      { name: "Móvil ancho", width: 414, height: 896 },
      { name: "Tablet", width: 768, height: 1024 },
      { name: "Escritorio", width: 1280, height: 800 },
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto("/");
      await page.waitForLoadState("domcontentloaded");
      await page.waitForTimeout(100);

      const track = page.locator("#scrolly-hero");
      await expect(track).toBeVisible();

      const tokenHola = page.locator("#token-hola");
      const tokenSoy = page.locator("#token-soy");
      const tokenJaume = page.locator("#token-jaume");
      const tokenTur = page.locator("#token-tur");

      // Verify «Hola» has bold weight (700) and «soy» has normal weight (400)
      const holaWeight = await tokenHola.evaluate((el) => window.getComputedStyle(el).fontWeight);
      expect(parseInt(holaWeight, 10)).toBeGreaterThanOrEqual(700);

      const soyWeight = await tokenSoy.evaluate((el) => window.getComputedStyle(el).fontWeight);
      expect(parseInt(soyWeight, 10)).toBeLessThanOrEqual(400);

      // Verify exact centering in all 5 states using one wheel gesture per state.
      const testStates = [
        { tokens: [tokenHola] },
        { tokens: [tokenHola, tokenSoy] },
        { tokens: [tokenHola, tokenJaume] },
        { tokens: [tokenHola, tokenTur] },
        { tokens: [tokenHola, tokenTur] },
      ];

      for (const s of testStates) {
        await page.mouse.wheel(0, 120);
        await page.waitForTimeout(650);

        const boxStart = await s.tokens[0].boundingBox();
        const boxEnd = await s.tokens[s.tokens.length - 1].boundingBox();
        expect(boxStart).not.toBeNull();
        expect(boxEnd).not.toBeNull();

        const visibleLeft = boxStart!.x;
        const visibleRight = boxEnd!.x + boxEnd!.width;
        const visibleCenter = (visibleLeft + visibleRight) / 2;
        const viewportCenter = vp.width / 2;

        // Visual center must match viewport center within 1px
        expect(Math.abs(visibleCenter - viewportCenter), vp.name).toBeLessThan(1.0);
      }

      // Verify no horizontal overflow
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(vp.width + 1);

      // Reverse through prior states and confirm the greeting stays centered.
      for (let step = 0; step < 4; step += 1) {
        await page.mouse.wheel(0, -120);
        await page.waitForTimeout(650);
      }
      const topBox = await tokenHola.boundingBox();
      const topCenter = topBox!.x + topBox!.width / 2;
      expect(Math.abs(topCenter - vp.width / 2)).toBeLessThan(1.0);
    }
  });
});
