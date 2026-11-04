import { test, expect, type Page } from "@playwright/test";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const STORE_YES = "Sí, vull una botiga amb pagament en línia";
const STORE_NO = "No, només vull mostrar productes o rebre consultes";
const LANGUAGES_YES = "Sí, en diversos idiomes";
const LANGUAGES_NO = "No, només en un idioma";

const choose = (page: Page, question: string, option: string) =>
  page.locator(`#q-${question}`).getByLabel(option, { exact: true }).check();

// The build used by the tests may have no key, and no test should reach the real API.
async function openBriefing(page: Page) {
  await page.addInitScript(() => {
    const calls: string[] = [];
    (window as unknown as { plausibleCalls: string[] }).plausibleCalls = calls;
    (window as unknown as { plausible: (name: string) => void }).plausible = (name) => {
      calls.push(name);
    };
  });
  await page.goto("/briefing/");
  await page.locator("#briefing-form").evaluate((form: HTMLFormElement) => {
    form.dataset.web3formsKey = "test-key";
  });
}

async function fillRequiredBaseFields(page: Page) {
  await page.locator("#nom").fill("Persona de prueba");
  await page.locator("#correu").fill("prueba@example.com");
  await page.locator("#negoci-nom").fill("Negoci de prova");
  await page.locator("#negoci-descripcio").fill("Descripció de prova");
  await choose(page, "objectius", "Reforçar la imatge de marca");
  await choose(page, "objectius", "Una altra cosa");
  await choose(page, "client-ideal", "Particulars");
  await choose(page, "apartats", "Inici");
  await choose(page, "estil", "Elegant i minimalista");
  await page.locator("#accio-principal").fill("Demanar pressupost");
  await choose(page, "funcions-web", "Botó de WhatsApp");
  await choose(page, "pagament-online", STORE_NO);
  await choose(page, "multiidioma", LANGUAGES_NO);
  await choose(page, "material-preparat", "Quasi tot: logotip, fotos i textos");
}

const plausibleCalls = (page: Page) =>
  page.evaluate(() => (window as unknown as { plausibleCalls: string[] }).plausibleCalls);

test.describe("Briefing form", () => {
  test("is a private Valencian page that does not offer a missing English version", async ({ page, request }) => {
    await page.goto("/briefing/");
    await expect(page.locator("html")).toHaveAttribute("lang", "ca");
    await expect(page.locator("h1")).toHaveText("Briefing per a la teua nova web");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[hreflang="en"]')).toHaveCount(0);

    await page.locator("#lang-dropdown-btn").click();
    await expect(page.locator('#lang-dropdown-menu a[lang="en"]')).toHaveAttribute("href", "/en/");

    const sitemap = await (await request.get("/sitemap-0.xml")).text();
    expect(sitemap).not.toContain("/briefing");
  });

  test("shows the store and language sections only for the matching answers", async ({ page }) => {
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
    await choose(page, "multiidioma", "Encara no ho tinc decidit");
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
    await page.locator("#correu").fill("correu-no-valid");
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
    await expect(page.locator("#briefing-feedback")).toContainText("Briefing enviat");
    expect(requests).toBe(1);
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
    await page.locator("#productes").fill("Resposta que no s'ha d'enviar");
    await choose(page, "pagament-online", STORE_NO);

    const submit = page.locator("#briefing-submit-btn");
    await submit.click();
    await expect(submit).toBeDisabled();
    await expect(submit).toContainText("Enviant…");
    expect(await plausibleCalls(page)).toEqual([]);

    release();
    await expect(page.locator("#briefing-feedback")).toContainText("Briefing enviat");
    await expect(page.locator("#nom")).toHaveValue("");
    await expect(submit).toBeEnabled();
    expect(await plausibleCalls(page)).toEqual(["form_submit"]);
    expect(body).toMatchObject({
      access_key: "test-key",
      subject: "Nou briefing: Negoci de prova",
      name: "Persona de prueba",
      email: "prueba@example.com",
      "Què t’agradaria aconseguir amb la web?": "Reforçar la imatge de marca, Una altra cosa",
      "Vols que els clients compren i paguen directament des de la web?": STORE_NO,
    });
    expect(body).not.toHaveProperty("Quins productes vens i quines dades tens de cada producte?");
    expect(body).not.toHaveProperty("Quins colors, tipografies o elements de marca hem de respectar?");
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
