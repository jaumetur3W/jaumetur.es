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

    // Verifica que el forat negre cinematogràfic i la lletra 'o' de Hola estan presents
    const blackHole = page.locator("#hero-black-hole");
    await expect(blackHole).toBeAttached();
    const letterO = page.locator("#letter-o");
    await expect(letterO).toBeVisible();

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

    expect(await opacity(holaToken)).toBeGreaterThan(0.99);
    expect(await opacity(soyToken)).toBeLessThan(0.1);

    // A burst of wheel events from one gesture must trigger only the first step (step 1).
    await page.mouse.wheel(0, 120);
    await page.mouse.wheel(0, 120);
    await page.mouse.wheel(0, 120);
    await page.waitForTimeout(650);
    expect(await opacity(holaToken)).toBeGreaterThan(0.99);
    expect(await opacity(soyToken)).toBeGreaterThan(0.99);
    expect(await opacity(jaumeToken)).toBeLessThan(0.1);

    // 2.º gesto de rueda: se junta «Jaume» con «Tur» (la frase se completa).
    await advance();
    expect(await opacity(jaumeToken)).toBeGreaterThan(0.99);
    expect(await opacity(turToken)).toBeGreaterThan(0.99);
    expect(await opacity(statement)).toBeLessThan(0.1);

    const nameLink = page.locator("#hero-name-link");
    await expect(nameLink).toBeVisible();
    await expect(nameLink).toHaveAttribute("href", "/about");

    // 3.ᵉʳ gesto de rueda: se junta el subtítulo con la entrada al primer contenido (sube el telón).
    const scrollAtHeroBeforeExit = await page.evaluate(() => window.scrollY);
    await advance();
    expect(await opacity(statement)).toBeGreaterThan(0.99);
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(scrollAtHeroBeforeExit);

    // El telón (#home-curtain) NO tapa el texto inferior (#hero-statement) en el paso 3
    const curtain = page.locator("#home-curtain");
    const curtainBox = await curtain.boundingBox();
    const statementBox = await statement.boundingBox();
    expect(curtainBox).not.toBeNull();
    expect(statementBox).not.toBeNull();
    expect(curtainBox!.y).toBeGreaterThanOrEqual(statementBox!.y + statementBox!.height);

    // Gestos inversos (scroll hacia arriba) regresan limpiamente hasta el estado inicial.
    await advance(-1);
    expect(await opacity(turToken)).toBeGreaterThan(0.99);
    expect(await opacity(jaumeToken)).toBeGreaterThan(0.99);
    expect(await opacity(statement)).toBeLessThan(0.1);
    await advance(-1);
    expect(await opacity(soyToken)).toBeGreaterThan(0.99);
    expect(await opacity(jaumeToken)).toBeLessThan(0.1);
    expect(await opacity(turToken)).toBeLessThan(0.1);
    await advance(-1);
    expect(await opacity(holaToken)).toBeGreaterThan(0.99);
    expect(await opacity(soyToken)).toBeLessThan(0.1);

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

    // Verify initial state: cards are not flipped initially
    const websCard = devSection.locator("#card-webs");
    const appsCard = devSection.locator("#card-apps");
    const autoCard = devSection.locator("#card-automation");

    await expect(websCard).not.toHaveClass(/is-flipped/);
    await expect(appsCard).not.toHaveClass(/is-flipped/);
    await expect(autoCard).not.toHaveClass(/is-flipped/);

    // 1. Hover does NOT flip the card (user requested: si no se pulsa en mas info no se ha de mostrar mas info)
    await websCard.hover({ force: true });
    await page.waitForTimeout(100);
    await expect(websCard).not.toHaveClass(/is-flipped/);

    // 2. Clicking 'Más información' flips the Webs card in 3D
    const websMoreBtn = websCard.locator(".cap-more-btn");
    await websMoreBtn.click();
    await expect(websCard).toHaveClass(/is-flipped/);
    const websBack = devSection.locator("#floating-webs");
    await expect(websBack.getByText("Pizzería Xàtiva")).toBeVisible();
    await expect(websBack.getByText("Burger Xàtiva")).toBeVisible();

    // Close / unflip using the back close button (X button)
    const websCloseBtn = websBack.locator(".cap-back-btn");
    await websCloseBtn.click();
    await expect(websCard).not.toHaveClass(/is-flipped/);

    // 3. Apps card: clicking 'Más información' flips to show AVISA
    const appsMoreBtn = appsCard.locator(".cap-more-btn");
    await appsMoreBtn.click();
    await expect(appsCard).toHaveClass(/is-flipped/);
    const appsBack = devSection.locator("#floating-apps");
    await expect(appsBack.getByText("AVISA")).toBeVisible();

    // Close using Escape key
    await page.keyboard.press("Escape");
    await expect(appsCard).not.toHaveClass(/is-flipped/);

    // 4. Automation card: 'Más información' click flips to show Pipeline CI/CD
    const autoMoreBtn = autoCard.locator(".cap-more-btn");
    await autoMoreBtn.click();
    await expect(autoCard).toHaveClass(/is-flipped/);
    const autoBack = devSection.locator("#floating-automation");
    await expect(autoBack.getByText(/Pipeline CI\/CD/)).toBeVisible();

    // Close using the back text button ('Volver')
    const autoBackTextBtn = autoBack.locator(".cap-back-text-btn");
    await autoBackTextBtn.click();
    await expect(autoCard).not.toHaveClass(/is-flipped/);

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
    await expect(page.locator("#token-jaume")).toHaveCSS("opacity", "1");
    await expect(page.locator("#token-tur")).toHaveCSS("opacity", "1");
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

    await expect(hola).toHaveCSS("opacity", "1");
    await expect(soy).toHaveCSS("opacity", "0");

    await swipe(520, 450);
    await expect(hola).toHaveCSS("opacity", "1");
    await expect(soy).toHaveCSS("opacity", "1");

    await swipe(450, 520);
    await expect(hola).toHaveCSS("opacity", "1");
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
      const tokenTur = page.locator("#token-tur");

      // Verify «Hola» has bold weight (700) and «soy» has normal weight (400)
      const holaWeight = await tokenHola.evaluate((el) => window.getComputedStyle(el).fontWeight);
      expect(parseInt(holaWeight, 10)).toBeGreaterThanOrEqual(700);

      const soyWeight = await tokenSoy.evaluate((el) => window.getComputedStyle(el).fontWeight);
      expect(parseInt(soyWeight, 10)).toBeLessThanOrEqual(400);

      // Initial state (step 0): «Hola» is already visible and centered on load
      const boxHola = await tokenHola.boundingBox();
      expect(boxHola).not.toBeNull();
      const initialCenter = boxHola!.x + boxHola!.width / 2;
      expect(Math.abs(initialCenter - vp.width / 2), vp.name).toBeLessThan(1.0);

      // Verify exact centering in all subsequent states using one wheel gesture per state.
      const testStates = [
        { tokens: [tokenHola, tokenSoy] },
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
      for (let step = 0; step < 3; step += 1) {
        await page.mouse.wheel(0, -120);
        await page.waitForTimeout(650);
      }
      const topBox = await tokenHola.boundingBox();
      const topCenter = topBox!.x + topBox!.width / 2;
      expect(Math.abs(topCenter - vp.width / 2)).toBeLessThan(1.0);
    }
  });
});
