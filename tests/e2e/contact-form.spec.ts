import { test, expect, type Page, type Route } from "@playwright/test";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const PACKAGE_IDS = [
  "digitalitzacio-local",
  "landing-page",
  "angular-webapp",
  "performance-audit",
  "cicd-devops",
];

// The build used by the tests may have no key, and no test should reach the real API.
async function openForm(page: Page, path = "/contact") {
  await page.addInitScript(() => {
    const calls: string[] = [];
    (window as unknown as { plausibleCalls: string[] }).plausibleCalls = calls;
    (window as unknown as { plausible: (name: string) => void }).plausible = (name) => {
      calls.push(name);
    };
  });
  await page.goto(path);
  await page.locator("#contact-form").evaluate((form: HTMLFormElement) => {
    form.dataset.web3formsKey = "test-key";
  });
}

async function fillRequiredFields(page: Page) {
  await page.locator("#contact-name").fill("Persona de prueba");
  await page.locator("#contact-email").fill("prueba@example.com");
}

const plausibleCalls = (page: Page) =>
  page.evaluate(() => (window as unknown as { plausibleCalls: string[] }).plausibleCalls);

test.describe("Contact form", () => {
  for (const [pricingPath, contactPath] of [
    ["/pricing", "/contact"],
    ["/en/pricing", "/en/contact"],
  ]) {
    test(`every package on ${pricingPath} preselects its option`, async ({ page }) => {
      await page.goto(pricingPath);
      const hrefs = await page
        .locator('a[href*="/contact?servei="]')
        .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
      expect(hrefs.map((href) => href?.split("servei=")[1]).sort()).toEqual([...PACKAGE_IDS].sort());

      for (const id of PACKAGE_IDS) {
        await page.goto(pricingPath);
        await page.locator(`a[href="${contactPath}?servei=${id}"]`).click();
        await expect(page).toHaveURL(new RegExp(`servei=${id}$`));
        await expect(page.locator("#contact-service")).toHaveValue(id);
      }
    });
  }

  test("an unknown package keeps the default option", async ({ page }) => {
    await page.goto("/contact?servei=no-existe");
    await expect(page.locator("#contact-service")).toHaveValue("landing-page");
  });

  test("shows the sending state, then clears the form and counts one conversion", async ({ page }) => {
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

    await openForm(page, "/contact?servei=digitalitzacio-local");
    await fillRequiredFields(page);
    const submit = page.locator("#contact-submit-btn");
    await submit.click();

    await expect(submit).toBeDisabled();
    await expect(submit).toContainText("Enviando…");
    expect(await plausibleCalls(page)).toEqual([]);

    release();
    await expect(page.locator("#form-feedback")).toContainText("Mensaje enviado");
    await expect(page.locator("#contact-name")).toHaveValue("");
    await expect(submit).toBeEnabled();
    await expect(submit).toContainText("Enviar consulta");
    expect(await plausibleCalls(page)).toEqual(["form_submit"]);
    expect(body).toMatchObject({
      access_key: "test-key",
      name: "Persona de prueba",
      email: "prueba@example.com",
      service: "Digitalización local",
    });
  });

  const failures: [string, (route: Route) => Promise<void>][] = [
    ["the API rejects the message", (route) => route.fulfill({ status: 400, json: { success: false } })],
    ["the network fails", (route) => route.abort()],
  ];
  for (const [scenario, respond] of failures) {
    test(`keeps the data, shows the email and allows a retry when ${scenario}`, async ({ page }) => {
      await page.route(WEB3FORMS_URL, respond);
      await openForm(page);
      await fillRequiredFields(page);
      const submit = page.locator("#contact-submit-btn");
      await submit.click();

      const feedback = page.locator("#form-feedback");
      await expect(feedback).toContainText("jaumetur3w@gmail.com");
      await expect(page.locator("#contact-name")).toHaveValue("Persona de prueba");
      await expect(page.locator("#contact-email")).toHaveValue("prueba@example.com");
      await expect(submit).toBeEnabled();
      expect(await plausibleCalls(page)).toEqual([]);

      await page.unroute(WEB3FORMS_URL);
      await page.route(WEB3FORMS_URL, (route) => route.fulfill({ json: { success: true } }));
      await submit.click();
      await expect(feedback).toContainText("Mensaje enviado");
    });
  }

  test("does not call the API without a key and keeps the data", async ({ page }) => {
    let requests = 0;
    await page.route(WEB3FORMS_URL, (route) => {
      requests += 1;
      return route.fulfill({ json: { success: true } });
    });
    await openForm(page);
    await page.locator("#contact-form").evaluate((form: HTMLFormElement) => {
      form.dataset.web3formsKey = "";
    });
    await fillRequiredFields(page);
    await page.locator("#contact-submit-btn").click();

    await expect(page.locator("#form-feedback")).toContainText("jaumetur3w@gmail.com");
    await expect(page.locator("#contact-name")).toHaveValue("Persona de prueba");
    expect(requests).toBe(0);
  });

  test("requires a valid email", async ({ page }) => {
    let requests = 0;
    await page.route(WEB3FORMS_URL, (route) => {
      requests += 1;
      return route.fulfill({ json: { success: true } });
    });
    await openForm(page);
    await page.locator("#contact-name").fill("Persona de prueba");
    await page.locator("#contact-email").fill("correo-no-valido");
    await page.locator("#contact-submit-btn").click();

    await expect(page.locator("#email-error")).toBeVisible();
    await expect(page.locator("#contact-email")).toBeFocused();
    expect(requests).toBe(0);
  });

  test("the honeypot blocks the request and the conversion", async ({ page }) => {
    let requests = 0;
    await page.route(WEB3FORMS_URL, (route) => {
      requests += 1;
      return route.fulfill({ json: { success: true } });
    });
    await openForm(page);
    await fillRequiredFields(page);
    await page.locator("#honeypot-field").evaluate((input: HTMLInputElement) => {
      input.value = "spam";
    });
    await page.locator("#contact-submit-btn").click();

    await expect(page.locator("#form-feedback")).toBeVisible();
    expect(requests).toBe(0);
    expect(await plausibleCalls(page)).toEqual([]);
  });
});
