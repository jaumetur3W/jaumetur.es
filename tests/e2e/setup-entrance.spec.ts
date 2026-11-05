import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { setupScene } from "../../src/config/setup-scene";

// El setup se omite con automatización (navigator.webdriver): aquí se simula un navegador normal.
async function asRealBrowser(page: Page) {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
  });
  await page.setViewportSize({ width: 1280, height: 720 });
}

const layer = (page: Page) => page.locator("#setup-layer");
const object = (page: Page, id: string) => page.locator(`#setup-layer a[data-object="${id}"]`);
const clickObject = (page: Page, id: string) => object(page, id).locator("polygon").click({ force: true });

test.describe("Entrada setup: cuándo se muestra", () => {
  test.beforeEach(async ({ page }) => {
    await asRealBrowser(page);
  });

  for (const root of ["/", "/en/"]) {
    test(`primera visita a ${root} lo muestra y la segunda carga no`, async ({ page }) => {
      await page.goto(root);
      await expect(layer(page)).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(layer(page)).toHaveCount(0);

      await page.goto(root);
      await expect(page.locator("#scrolly-hero")).toBeVisible();
      await expect(layer(page)).toHaveCount(0);
    });
  }

  test("una recarga lo muestra en cualquier ruta, aunque ya se hubiese visto", async ({ page }) => {
    await page.goto("/about/");
    await expect(layer(page)).toHaveCount(0);
    await page.reload();
    await expect(layer(page)).toBeVisible();
  });

  test("el logo lleva a la home sin setup", async ({ page }) => {
    await page.goto("/about/");
    await page.locator('#site-header a[href="/"]:visible').first().click();
    await expect(page).toHaveURL("/");
    await expect(layer(page)).toHaveCount(0);
  });

  for (const url of ["/contact/", "/?nosetup", "/?gclid=abc", "/?utm_source=google", "/en/?utm_campaign=x"]) {
    test(`no se muestra en ${url}`, async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState("load");
      await expect(layer(page)).toHaveCount(0);
    });
  }

  test("tampoco con exclusiones al recargar", async ({ page }) => {
    await page.goto("/?gclid=abc");
    await page.reload();
    await page.waitForLoadState("load");
    await expect(layer(page)).toHaveCount(0);
  });

  test("no se muestra en pantallas estrechas", async ({ page }) => {
    await page.setViewportSize({ width: 700, height: 900 });
    await page.goto("/");
    await page.waitForLoadState("load");
    await expect(layer(page)).toHaveCount(0);
  });

  test("volver atrás no lo muestra", async ({ page }) => {
    await page.goto("/");
    await clickObject(page, "mug");
    await expect(page).toHaveURL("/about/");
    await page.goBack();
    await page.waitForLoadState("load");
    await expect(layer(page)).toHaveCount(0);
  });

  test("con automatización, la web se ve normal", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
    const page = await context.newPage();
    await page.goto("/");
    await page.waitForLoadState("load");
    await expect(layer(page)).toHaveCount(0);
    await context.close();
  });
});

test.describe("Entrada setup: flujo", () => {
  test.beforeEach(async ({ page }) => {
    await asRealBrowser(page);
  });

  test("la foto se carga y no hay ninguna web incrustada", async ({ page }) => {
    await page.goto("/");
    const image = page.locator(".setup-photo img");
    await expect(image).toBeVisible();
    await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
    expect(await image.evaluate((el: HTMLImageElement) => el.currentSrc)).toContain("/img/setup/setup-scene-");
    await expect(page.locator("iframe")).toHaveCount(0);
  });

  test("las sombras y el árbol entran sobre la foto cuando han cargado", async ({ page }) => {
    await page.goto("/");
    const shadows = page.locator("img.setup-shadows");
    const tree = page.locator("img.setup-tree");
    await expect(shadows).toBeVisible({ timeout: 15000 });
    await expect(tree).toBeVisible({ timeout: 15000 });
    expect(await shadows.evaluate((el: HTMLImageElement) => el.currentSrc)).toContain(setupScene.image.shadows);
    expect(await tree.evaluate((el: HTMLImageElement) => el.currentSrc)).toContain(setupScene.image.tree);
    await expect(shadows).toHaveCSS("mix-blend-mode", "multiply");

    // La foto nítida sigue debajo y el árbol queda sobre la ventana.
    await expect(page.locator(".setup-photo img")).toBeVisible();
    const box = (await tree.boundingBox())!;
    expect(box.x + box.width).toBeCloseTo(1280, 0);
    expect(box.y).toBeCloseTo(0, 0);

    // Quedan debajo de las zonas: se sigue pudiendo pulsar.
    await clickObject(page, "keyboard");
    await expect(page).toHaveURL("/contact/");
  });

  test("el monitor desliza la web real, sin zoom", async ({ page }) => {
    await page.addInitScript(() => {
      const original = document.startViewTransition?.bind(document);
      const counter = window as unknown as { transitions: number };
      counter.transitions = 0;
      if (original) {
        document.startViewTransition = ((callback: () => void) => {
          counter.transitions++;
          return original(callback);
        }) as typeof document.startViewTransition;
      }
    });
    await page.goto("/");
    await expect(layer(page)).toBeVisible();

    await clickObject(page, "monitor");
    await expect(layer(page)).toHaveCount(0, { timeout: 15000 });
    expect(await page.evaluate(() => (window as unknown as { transitions: number }).transitions)).toBe(1);

    await expect(page).toHaveURL("/");
    await expect(page.locator("#token-hola")).toBeVisible();
    await expect(page.locator("#main-content")).not.toHaveAttribute("inert", "");
    expect(await page.evaluate(() => sessionStorage.getItem("jt-setup-done"))).toBe("1");

    // La web vuelve a responder: la rueda avanza el hero.
    await page.mouse.move(600, 300);
    await page.mouse.wheel(0, 120);
    await expect(page.locator("#token-soy")).toHaveCSS("opacity", "1");
  });

  test("al recargar en una ruta interna, el monitor continúa en esa página", async ({ page }) => {
    await page.goto("/about/");
    await page.reload();
    await clickObject(page, "monitor");
    await expect(layer(page)).toHaveCount(0, { timeout: 15000 });
    await expect(page).toHaveURL("/about/");
  });

  const links = setupScene.objects.filter((item) => item.kind === "link");
  for (const [prefix, lang] of [["", "es"], ["/en", "en"]] as const) {
    for (const item of links) {
      const target = `${prefix}${item.path}/`;
      test(`${item.id} navega a ${target} (${lang})`, async ({ page }) => {
        await page.goto(`${prefix}/`);
        const response = page.waitForResponse((r) => r.url().endsWith(target) && r.request().isNavigationRequest());
        await clickObject(page, item.id);
        expect((await response).status()).toBe(200);
        await expect(page).toHaveURL(target);
        await expect(layer(page)).toHaveCount(0);
      });
    }
  }

  test("el hover muestra la etiqueta y precarga el destino", async ({ page }) => {
    await page.goto("/");
    await expect(layer(page)).toBeVisible();
    await object(page, "postit").locator("polygon").hover({ force: true });
    await expect(page.locator(".setup-label")).toHaveText("Proyectos");
    await expect(page.locator('link[rel="prefetch"][href="/projectes/"]')).toHaveCount(1);
  });

  test("un mensaje junto al cursor indica la sección, sin rodear el objeto", async ({ page }) => {
    await page.goto("/");
    await expect(layer(page)).toBeVisible();
    const polygon = object(page, "mug").locator("polygon");
    const box = (await polygon.boundingBox())!;
    const [x, y] = [box.x + box.width / 2, box.y + box.height / 2];
    await page.mouse.move(x, y);

    const label = page.locator(".setup-label");
    await expect(label).toHaveText("Sobre mí");
    await expect(polygon).toHaveCSS("stroke-opacity", "0");
    const near = async (cursorX: number, cursorY: number) => {
      const position = (await label.boundingBox())!;
      expect(Math.abs(position.x - cursorX)).toBeLessThan(40);
      expect(Math.abs(position.y - cursorY)).toBeLessThan(40);
    };
    await near(x, y);

    // El mensaje sigue al cursor y desaparece al salir del objeto.
    await page.mouse.move(x + 12, y + 8);
    await near(x + 12, y + 8);
    await page.mouse.move(40, 400);
    await expect(label).toBeHidden();
  });

  test("el mensaje no se sale de la ventana junto a los bordes", async ({ page }) => {
    await page.goto("/");
    await expect(layer(page)).toBeVisible();
    const box = (await object(page, "keyboard").locator("polygon").boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.evaluate(() => {
      document.querySelector('a[data-object="keyboard"]')!.dispatchEvent(new PointerEvent("pointermove", { bubbles: true, clientX: 1278, clientY: 718 }));
    });
    const position = (await page.locator(".setup-label").boundingBox())!;
    expect(position.x + position.width).toBeLessThanOrEqual(1280);
    expect(position.y + position.height).toBeLessThanOrEqual(720);
  });

  test("con teclado, el foco se ve y el mensaje sale junto al objeto", async ({ page }) => {
    await page.goto("/");
    await expect(layer(page)).toBeVisible();
    await page.keyboard.press("Tab");
    await expect(object(page, "monitor")).toBeFocused();
    await expect(object(page, "monitor").locator("polygon")).toHaveCSS("stroke-opacity", "1");
    await expect(page.locator(".setup-label")).toHaveText("Entrar a la web");
  });

  test("las demás páginas llegan con la misma transición, y solo desde la entrada", async ({ page }) => {
    await page.addInitScript(() => {
      window.addEventListener("pagereveal", (event) => {
        (window as unknown as { revealed: boolean }).revealed = !!(event as Event & { viewTransition?: unknown }).viewTransition;
      });
    });
    const revealedWithTransition = () => page.evaluate(() => (window as unknown as { revealed?: boolean }).revealed);

    await page.goto("/");
    await expect(layer(page)).toBeVisible();
    await expect(page.locator("style[data-setup-slide]")).toHaveCount(1);
    await clickObject(page, "keyboard");
    await expect(page).toHaveURL("/contact/");
    await expect(page.locator("style[data-setup-slide]")).toHaveCount(1);
    await expect.poll(revealedWithTransition).toBe(true);
    expect(await page.evaluate(() => sessionStorage.getItem("jt-setup-slide"))).toBeNull();

    // La navegación normal de la web no lleva transición.
    await page.locator('#site-header nav a[href="/about/"]:visible').first().click();
    await expect(page).toHaveURL("/about/");
    await expect(page.locator("style[data-setup-slide]")).toHaveCount(0);
    await expect.poll(revealedWithTransition).toBe(false);
  });

  test("con movimiento reducido se muestra y entra sin animación", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(layer(page)).toBeVisible();
    // Sin GIF ni fundido: la capa se retira en cuanto se pulsa.
    await page.waitForTimeout(800);
    await expect(page.locator("img.setup-animated")).toHaveCount(0);
    await clickObject(page, "monitor");
    await expect(layer(page)).toHaveCount(0);
    await expect(page.locator("#main-content")).toBeFocused();
  });

  test("la rueda no mueve el hero mientras está la capa", async ({ page }) => {
    await page.goto("/");
    await expect(layer(page)).toBeVisible();
    await page.mouse.move(600, 300);
    await page.mouse.wheel(0, 120);
    await page.waitForTimeout(400);
    await expect(page.locator("#token-soy")).toHaveCSS("opacity", "0");
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });
});

test.describe("Entrada setup: accesibilidad", () => {
  test.beforeEach(async ({ page }) => {
    await asRealBrowser(page);
  });

  test("se usa entero con teclado", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.locator(".setup-skip")).toBeFocused();

    const order: (string | undefined)[] = [];
    for (let i = 0; i < setupScene.objects.length; i++) {
      await page.keyboard.press("Tab");
      order.push(await page.evaluate(() => (document.activeElement as HTMLElement | null)?.dataset?.object));
    }
    expect(order).toEqual(setupScene.objects.map((item) => item.id));

    await object(page, "keyboard").focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL("/contact/");
  });

  test("Saltar y Esc devuelven el foco a la web", async ({ page }) => {
    await page.goto("/");
    await page.locator(".setup-skip").click();
    await expect(layer(page)).toHaveCount(0);
    await expect(page.locator("#main-content")).toBeFocused();
    expect(await page.evaluate(() => sessionStorage.getItem("jt-setup-done"))).toBe("1");

    await page.reload();
    await expect(layer(page)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(layer(page)).toHaveCount(0);
    await expect(page.locator("#main-content")).toBeFocused();
  });

  test("etiquetas en el idioma activo", async ({ page }) => {
    await page.goto("/en/");
    await expect(page.getByRole("dialog", { name: /Jaume Tur's desk/ })).toBeVisible();
    await expect(page.getByRole("button", { name: "Skip" })).toBeVisible();
    await expect(object(page, "mug")).toHaveAttribute("aria-label", "Mug: go to about me");
  });

  test("sin infracciones de axe en la capa", async ({ page }) => {
    await page.goto("/");
    await expect(layer(page)).toBeVisible();
    const results = await new AxeBuilder({ page }).include("#setup-layer").analyze();
    expect(results.violations.map((violation) => violation.id)).toEqual([]);
  });
});

test.describe("Entrada setup: escena y SEO", () => {
  test.beforeEach(async ({ page }) => {
    await asRealBrowser(page);
  });

  for (const [width, height] of [[1280, 720], [1600, 800], [1024, 768]] as const) {
    test(`las zonas siguen alineadas con la foto a ${width}×${height}`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto("/");
      await expect(layer(page)).toBeVisible();
      const { polygon, camera } = await page.evaluate(() => {
        const box = (selector: string) => {
          const { left, top, width, height } = document.querySelector(selector)!.getBoundingClientRect();
          return { left, top, width, height };
        };
        return { polygon: box('a[data-object="mug"] polygon'), camera: box(".setup-camera") };
      });
      expect(Math.abs(camera.width / camera.height - 16 / 9)).toBeLessThan(0.01);
      expect(camera.width).toBeGreaterThanOrEqual(width - 1);
      expect(camera.height).toBeGreaterThanOrEqual(height - 1);

      const points = setupScene.objects.find((item) => item.id === "mug")!.polygon;
      const left = Math.min(...points.map(([x]) => x));
      const top = Math.min(...points.map(([, y]) => y));
      expect(Math.abs((polygon.left - camera.left) / camera.width - left)).toBeLessThan(0.002);
      expect(Math.abs((polygon.top - camera.top) / camera.height - top)).toBeLessThan(0.002);
    });
  }

  test("el HTML servido conserva el contenido y no incluye la capa", async ({ request }) => {
    const html = await (await request.get("/")).text();
    expect(html).toContain("Qué puedo desarrollar");
    expect(html).toContain("<h1");
    expect(html).not.toContain('id="setup-layer"');
    expect(html).not.toMatch(/rel="preload"[^>]*setup-scene/);
    expect(html).not.toMatch(/<meta name="robots" content="noindex/);
  });

  test("la precarga de la imagen solo aparece si se muestra", async ({ page }) => {
    const preload = page.locator('link[rel="preload"][as="image"]');
    await page.goto("/contact/");
    await expect(preload).toHaveCount(0);
    await page.goto("/about/");
    await page.reload();
    await expect(preload).toHaveCount(1);
  });

  test("la calibración no existe en producción", async ({ page }) => {
    await page.goto("/contact/?calibrate=1");
    await page.waitForLoadState("load");
    await expect(layer(page)).toHaveCount(0);
    await expect(page.locator("select[data-target]")).toHaveCount(0);
  });
});
