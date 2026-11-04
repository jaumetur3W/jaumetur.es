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
    const avisaLink = page.locator('a[href="/projectes/avisa"]').first();
    await expect(avisaLink).toBeVisible();

    const pizzeriaLink = page.locator('a[href="/projectes/pizzeria-xativa"]').first();
    await expect(pizzeriaLink).toBeVisible();
    await expect(projectsSection.getByText(/Proyecto de cliente|Projecte de client/).first()).toBeVisible();
    await expect(projectsSection.getByText(/Demo interactiva|Demo · contingut fictici/).first()).toBeVisible();
    await expect(projectsSection.locator("article").first()).toBeAttached();
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
    
    // Desktop navigation links and dropdown triggers: Inicio, Servicios (dropdown), Proyectos (dropdown), Sobre mí, Contacto
    const desktopNav = page.locator("nav[aria-label='Navegación principal']");
    await expect(desktopNav.locator('a[href="/"]')).toHaveText("Inicio");
    
    // Servicios dropdown
    const servBtn = desktopNav.locator("#services-dropdown-btn");
    await expect(servBtn).toContainText("Servicios");
    await expect(servBtn).toHaveAttribute("aria-expanded", "false");
    await servBtn.click();
    await expect(servBtn).toHaveAttribute("aria-expanded", "true");
    const servMenu = desktopNav.locator("#services-dropdown-menu");
    await expect(servMenu).toBeVisible();
    await expect(servMenu.locator('a[href="/pricing/landing-page/"]')).toContainText("Webs");
    await expect(servMenu.locator('a[href="/pricing/angular-webapp/"]')).toContainText("Aplicaciones");
    await expect(servMenu.locator('a[href="/pricing/cicd-devops/"]')).toContainText("Automatización");
    await expect(servMenu.locator('a[href="/pricing/"]')).toContainText("Precios y tarifas");

    // Close on Escape
    await page.keyboard.press("Escape");
    await expect(servMenu).not.toBeVisible();
    await expect(servBtn).toHaveAttribute("aria-expanded", "false");

    // Proyectos dropdown
    const projBtn = desktopNav.locator("#projects-dropdown-btn");
    await expect(projBtn).toContainText("Proyectos");
    await expect(projBtn).toHaveAttribute("aria-expanded", "false");
    await projBtn.click();
    await expect(projBtn).toHaveAttribute("aria-expanded", "true");
    const projMenu = desktopNav.locator("#projects-dropdown-menu");
    await expect(projMenu).toBeVisible();
    await expect(projMenu.locator('a[href="/projectes/pizzeria-xativa/"]')).toContainText("Pizzería Xàtiva");
    await expect(projMenu.locator('a[href="/projectes/burger-xativa/"]')).toContainText("Burger Xàtiva");
    await expect(projMenu.locator('a[href="/projectes/avisa/"]')).toContainText("AVISA");
    await expect(projMenu.locator('a[href="/projectes/pipeline-cicd/"]')).toContainText("Pipeline CI/CD");
    await expect(projMenu.locator('a[href="/projectes/"]')).toContainText("Todos los proyectos");

    // Close on Escape
    await page.keyboard.press("Escape");
    await expect(projMenu).not.toBeVisible();

    // Direct links
    await expect(desktopNav.locator('a[href="/about/"]')).toHaveText("Sobre mí");
    await expect(desktopNav.locator('a[href="/contact/"]')).toHaveText("Contacto");

    // Contact is a regular navigation destination, with no extra header CTA.
    await expect(page.locator('header a[href="/contact/"]').first()).toBeAttached();

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

    // Check collapsible categories in mobile
    await expect(mobileDetails.locator(".group\\/serv summary")).toContainText("Servicios");
    await expect(mobileDetails.locator(".group\\/proj summary")).toContainText("Proyectos");

    // Close on Escape
    await page.keyboard.press("Escape");
    await expect(mobileDetails).not.toHaveAttribute("open", "");
    await expect(mobileSummary).toHaveAttribute("aria-expanded", "false");

    // Minimalist Centered Footer structure
    const footer = page.locator("footer");
    // Main navigation column removed from footer
    await expect(footer.locator("h3").filter({ hasText: /^Navegación$/ })).toHaveCount(0);
    // Identity & tagline
    await expect(footer.getByText("Jaume Tur.").first()).toBeVisible();
    await expect(footer.getByText(/Desarrollo web · Aplicaciones · Automatización/i)).toBeVisible();
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
    await expect(footer.getByText(/© \d{4} Jaume Tur · Valencia, España y remoto/i)).toBeVisible();
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

  test("Pricing page displays service packages including key local digitization offer and structured FAQ", async ({ page }) => {
    await page.goto("/pricing/");
    await expect(page.locator("h3").filter({ hasText: "Digitalización local y carta web" })).toBeVisible();
    await expect(page.getByText(/Propuesta destacada|Propuesta estrella/).first()).toBeVisible();
    await expect(page.getByText("Desde 290 €")).toBeVisible();
    await expect(page.locator("h3").filter({ hasText: "Landing page de alto rendimiento" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Preguntas frecuentes" })).toBeVisible();

    // Click on detail link of key local digitization offer
    await page.click('a[href="/pricing/digitalitzacio-local/"] >> nth=0');
    await expect(page).toHaveURL("/pricing/digitalitzacio-local/");
    await expect(page.locator("h1")).toContainText("Digitalización local y carta web");
    await expect(page.getByText("El motivo de cada precio", { exact: false })).toBeVisible();
    await expect(page.getByText("¿Cómo se amortiza fácilmente este precio en pocos meses?")).toBeVisible();
    await expect(page.getByText("Demostración práctica: Pizzería en Xàtiva")).toBeVisible();
    await expect(page.getByText("Comparativa de mercado", { exact: true })).toBeVisible();

    await page.goto("/en/pricing/");
    await expect(page.locator("h3").filter({ hasText: "Local Digitization & Web Menu" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Frequently Asked Questions" })).toBeVisible();
  });

  test("Brand kit page /marca displays official logo and download links", async ({ page }) => {
    await page.goto("/marca/");
    await expect(page.locator("h1, h2").filter({ hasText: "Logotipos" })).toBeVisible();
    await expect(page.locator('a[download="jt-logo-groc.png"]')).toBeVisible();
  });

  test("Digital card page /card displays contact pass, QR code and vCard link", async ({ page }) => {
    await page.goto("/card/");
    await expect(page.locator("h1")).toContainText("Jaume Tur");
    await expect(page.locator("#card-download-vcf")).toBeVisible();
    await expect(page.locator('img[src="/qr-jaumetur.svg"]')).toBeVisible();
  });

  test("Language switcher with globe icon opens floating dropdown, preserves routes, and switches correctly", async ({ page }) => {
    await page.goto("/about/");
    
    // Globe icon trigger button
    const langBtn = page.locator("#lang-dropdown-btn");
    await expect(langBtn).toBeVisible();
    await expect(langBtn).toHaveAttribute("aria-expanded", "false");

    // Click globe button to open floating dropdown
    await langBtn.click();
    await expect(langBtn).toHaveAttribute("aria-expanded", "true");

    const switcher = page.locator("#lang-dropdown-menu");
    await expect(switcher).toBeVisible();

    const esLink = switcher.locator("a").filter({ hasText: "ES" });
    const enLink = switcher.locator("a").filter({ hasText: "EN" });
    await expect(esLink).toBeVisible();
    await expect(enLink).toBeVisible();

    // In Spanish page, ES is active (has aria-current='page')
    await expect(esLink).toHaveAttribute("aria-current", "page");
    await expect(enLink).not.toHaveAttribute("aria-current", "page");
    await expect(enLink).toHaveAttribute("href", "/en/about/");

    // Click EN to navigate
    await enLink.click();
    await expect(page).toHaveURL("/en/about/");
    await expect(page.locator("h1")).toContainText("About Me");

    const englishDesktopNav = page.locator("nav[aria-label='Main navigation']");
    await expect(englishDesktopNav.locator('a[href="/en/"]')).toHaveText("Home");
    await expect(englishDesktopNav.locator('#services-dropdown-btn')).toContainText("Services");
    await expect(englishDesktopNav.locator('#projects-dropdown-btn')).toContainText("Projects");
    await expect(englishDesktopNav.locator('a[href="/en/about/"]')).toHaveText("About me");
    await expect(englishDesktopNav.locator('a[href="/en/contact/"]')).toHaveText("Contact");

    // On English page, open globe dropdown and verify EN is active
    const enLangBtn = page.locator("#lang-dropdown-btn");
    await expect(enLangBtn).toBeVisible();
    await enLangBtn.click();

    const enSwitcher = page.locator("#lang-dropdown-menu");
    await expect(enSwitcher).toBeVisible();
    const enEsLink = enSwitcher.locator("a").filter({ hasText: "ES" });
    const enEnLink = enSwitcher.locator("a").filter({ hasText: "EN" });
    await expect(enEnLink).toHaveAttribute("aria-current", "page");
    await expect(enEsLink).toHaveAttribute("href", "/about/");

    // Close on Escape
    await page.keyboard.press("Escape");
    await expect(enSwitcher).not.toBeVisible();
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
