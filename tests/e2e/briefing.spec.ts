import { test, expect, type Page } from "@playwright/test";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const STORE_YES = "Sí, quiero una tienda con pago online";
const STORE_NO = "No, solo quiero mostrar productos o recibir consultas";
const LANGUAGES_YES = "Sí, en varios idiomas";
const LANGUAGES_NO = "No, solo en un idioma";

const STORE_YES_EN = "Yes, I want an online store with online payment";
const STORE_NO_EN = "No, I only want to showcase products or receive inquiries";
const LANGUAGES_YES_EN = "Yes, in multiple languages";
const LANGUAGES_NO_EN = "No, only in one language";

const choose = (page: Page, question: string, option: string) =>
  page.locator(`#q-${question}`).getByLabel(option, { exact: true }).check();

// The build used by the tests may have no key, and no test should reach the real API.
async function openBriefing(page: Page, path: string = "/briefing/") {
  await page.addInitScript(() => {
    const calls: string[] = [];
    (window as unknown as { plausibleCalls: string[] }).plausibleCalls = calls;
    (window as unknown as { plausible: (name: string) => void }).plausible = (name) => {
      calls.push(name);
    };
  });
  await page.goto(path);
  await page.locator("#briefing-form").evaluate((form: HTMLFormElement) => {
    form.dataset.web3formsKey = "test-key";
  });
}

async function fillRequiredBaseFields(page: Page) {
  await page.locator("#nom").fill("Persona de prueba");
  await page.locator("#correu").fill("prueba@example.com");
  await page.locator("#negoci-nom").fill("Negocio de prueba");
  await page.locator("#negoci-descripcio").fill("Descripción de prueba");
  await choose(page, "objectius", "Reforzar la imagen de marca");
  await choose(page, "objectius", "Otra cosa");
  await choose(page, "client-ideal", "Particulares");
  await choose(page, "apartats", "Inicio");
  await choose(page, "estil", "Elegante y minimalista");
  await page.locator("#accio-principal").fill("Pedir presupuesto");
  await choose(page, "funcions-web", "Botón de WhatsApp");
  await choose(page, "pagament-online", STORE_NO);
  await choose(page, "multiidioma", LANGUAGES_NO);
  await choose(page, "material-preparat", "Casi todo: logotipo, fotos y textos");
}

async function fillRequiredBaseFieldsEn(page: Page) {
  await page.locator("#nom").fill("Test Person");
  await page.locator("#correu").fill("test@example.com");
  await page.locator("#negoci-nom").fill("English Test Business");
  await page.locator("#negoci-descripcio").fill("Description of test business");
  await choose(page, "objectius", "Strengthen brand identity");
  await choose(page, "objectius", "Something else");
  await choose(page, "client-ideal", "Individuals / consumers");
  await choose(page, "apartats", "Home");
  await choose(page, "estil", "Elegant and minimalist");
  await page.locator("#accio-principal").fill("Request a quote");
  await choose(page, "funcions-web", "WhatsApp button");
  await choose(page, "pagament-online", STORE_NO_EN);
  await choose(page, "multiidioma", LANGUAGES_NO_EN);
  await choose(page, "material-preparat", "Almost everything: logo, photos, and copy");
}

const plausibleCalls = (page: Page) =>
  page.evaluate(() => (window as unknown as { plausibleCalls: string[] }).plausibleCalls);

test.describe("Briefing form", () => {
  test("is a private Spanish page with language switcher linking to /en/briefing/", async ({ page, request }) => {
    await page.goto("/briefing/");
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.locator("h1")).toHaveText("Briefing para tu nueva web");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[hreflang="en"]')).toHaveCount(0);

    await expect(page.locator('header a[hreflang="en"]').first()).toHaveAttribute("href", "/en/briefing/");

    const sitemap = await (await request.get("/sitemap-0.xml")).text();
    expect(sitemap).not.toContain("/briefing");
  });

  test("English version /en/briefing/ is fully localized and links back to /briefing/", async ({ page, request }) => {
    await page.goto("/en/briefing/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("h1")).toHaveText("Briefing for your new website");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);

    await expect(page.locator('header a[hreflang="es"]').first()).toHaveAttribute("href", "/briefing/");

    const sitemap = await (await request.get("/sitemap-0.xml")).text();
    expect(sitemap).not.toContain("/en/briefing");
  });

  test("shows the store and language sections only for the matching answers (Spanish)", async ({ page }) => {
    await page.goto("/briefing/");
    const store = page.locator("#section-botiga");
    const languages = page.locator("#section-idiomes-detalls");
    await expect(store).toBeHidden();
    await expect(languages).toBeHidden();

    await choose(page, "pagament-online", STORE_YES);
    await expect(store).toBeVisible();
    await choose(page, "pagament-online", STORE_NO);
    await expect(store).toBeHidden();

    await choose(page, "multiidioma", LANGUAGES_YES);
    await expect(languages).toBeVisible();
    await choose(page, "multiidioma", "Todavía no lo tengo decidido");
    await expect(languages).toBeHidden();
  });

  test("shows the store and language sections only for the matching answers (English)", async ({ page }) => {
    await page.goto("/en/briefing/");
    const store = page.locator("#section-botiga");
    const languages = page.locator("#section-idiomes-detalls");
    await expect(store).toBeHidden();
    await expect(languages).toBeHidden();

    await choose(page, "pagament-online", STORE_YES_EN);
    await expect(store).toBeVisible();
    await choose(page, "pagament-online", STORE_NO_EN);
    await expect(store).toBeHidden();

    await choose(page, "multiidioma", LANGUAGES_YES_EN);
    await expect(languages).toBeVisible();
    await choose(page, "multiidioma", "Not decided yet");
    await expect(languages).toBeHidden();
  });

  test("validates visible required questions and ignores hidden ones", async ({ page }) => {
    let requests = 0;
    await page.route(WEB3FORMS_URL, (route) => {
      requests += 1;
      return route.fulfill({ json: { success: true } });
    });
    await openBriefing(page);
    const submit = page.locator("#briefing-submit-btn");

    await submit.click();
    await expect(page.locator("#nom-error")).toBeVisible();
    await expect(page.locator("#objectius-error")).toBeVisible();
    await expect(page.locator("#nom")).toBeFocused();
    await expect(page.locator("#productes-error")).toBeHidden();
    expect(requests).toBe(0);

    await fillRequiredBaseFields(page);
    await page.locator("#correu").fill("correo-no-valido");
    await submit.click();
    await expect(page.locator("#correu-error")).toBeVisible();
    expect(requests).toBe(0);

    await page.locator("#correu").fill("prueba@example.com");
    await choose(page, "pagament-online", STORE_YES);
    await submit.click();
    await expect(page.locator("#productes-error")).toBeVisible();
    expect(requests).toBe(0);

    await choose(page, "pagament-online", STORE_NO);
    await submit.click();
    await expect(page.locator("#briefing-feedback")).toContainText("Briefing enviado");
    expect(requests).toBe(1);
  });

  test("sends English answers with English subject, clears form and counts conversion", async ({ page }) => {
    let body: Record<string, string> = {};
    await page.route(WEB3FORMS_URL, async (route) => {
      body = route.request().postDataJSON();
      await route.fulfill({ json: { success: true } });
    });

    await openBriefing(page, "/en/briefing/");
    await fillRequiredBaseFieldsEn(page);

    const submit = page.locator("#briefing-submit-btn");
    await submit.click();

    await expect(page.locator("#briefing-feedback")).toContainText("Briefing submitted. Thank you!");
    await expect(page.locator("#nom")).toHaveValue("");
    expect(body).toMatchObject({
      access_key: "test-key",
      subject: "New briefing: English Test Business",
      name: "Test Person",
      email: "test@example.com",
      "What would you like to achieve with the website?": "Strengthen brand identity, Something else",
      "Do you want customers to buy and pay directly on the website?": STORE_NO_EN,
    });
  });

  test("sends the answers, shows the sending state, clears the form and counts one conversion", async ({ page }) => {
    let release = () => {};
    const responseGate = new Promise<void>((resolve) => {
      release = resolve;
    });
    let body: Record<string, string> = {};
    await page.route(WEB3FORMS_URL, async (route) => {
      body = route.request().postDataJSON();
      await responseGate;
      await route.fulfill({ json: { success: true } });
    });

    await openBriefing(page);
    await fillRequiredBaseFields(page);
    await choose(page, "pagament-online", STORE_YES);
    await page.locator("#productes").fill("Respuesta que no debe enviarse");
    await choose(page, "pagament-online", STORE_NO);

    const submit = page.locator("#briefing-submit-btn");
    await submit.click();
    await expect(submit).toBeDisabled();
    await expect(submit).toContainText("Enviando…");
    expect(await plausibleCalls(page)).toEqual([]);

    release();
    await expect(page.locator("#briefing-feedback")).toContainText("Briefing enviado");
    await expect(page.locator("#nom")).toHaveValue("");
    await expect(submit).toBeEnabled();
    expect(await plausibleCalls(page)).toEqual(["form_submit"]);
    expect(body).toMatchObject({
      access_key: "test-key",
      subject: "Nuevo briefing: Negocio de prueba",
      name: "Persona de prueba",
      email: "prueba@example.com",
      "¿Qué te gustaría conseguir con la web?": "Reforzar la imagen de marca, Otra cosa",
      "¿Quieres que los clientes compren y paguen directamente desde la web?": STORE_NO,
    });
    expect(body).not.toHaveProperty("¿Qué productos vendes y qué datos tienes de cada producto?");
    expect(body).not.toHaveProperty("¿Qué colores, tipografías o elementos de marca debemos respetar?");
  });

  test("keeps the answers and shows the email when sending fails", async ({ page }) => {
    await page.route(WEB3FORMS_URL, (route) => route.fulfill({ status: 400, json: { success: false } }));
    await openBriefing(page);
    await fillRequiredBaseFields(page);
    const submit = page.locator("#briefing-submit-btn");
    await submit.click();

    await expect(page.locator("#briefing-feedback")).toContainText("jaumetur3w@gmail.com");
    await expect(page.locator("#nom")).toHaveValue("Persona de prueba");
    await expect(submit).toBeEnabled();
    expect(await plausibleCalls(page)).toEqual([]);
  });

  test("the honeypot blocks the request and the conversion", async ({ page }) => {
    let requests = 0;
    await page.route(WEB3FORMS_URL, (route) => {
      requests += 1;
      return route.fulfill({ json: { success: true } });
    });
    await openBriefing(page);
    await fillRequiredBaseFields(page);
    await page.locator("#briefing-botcheck").evaluate((input: HTMLInputElement) => {
      input.value = "spam";
    });
    await page.locator("#briefing-submit-btn").click();

    await expect(page.locator("#briefing-feedback")).toBeVisible();
    expect(requests).toBe(0);
    expect(await plausibleCalls(page)).toEqual([]);
  });
});
