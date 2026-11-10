import { test, expect } from "@playwright/test";

test.describe("Herramienta de Creación de Archivos HTML (/tools/creador-html)", () => {
  test("loads properly in Spanish and English with all controls and interactive sandbox iframe", async ({
    page,
  }) => {
    // 1. Spanish route
    await page.goto("/tools/creador-html/");
    await expect(page.locator("h1")).toContainText("Creador de Archivos HTML5");
    
    // Check key form controls exist
    const brandInput = page.locator("#cfg-brand");
    const h1Input = page.locator("#cfg-h1");
    const ctaInput = page.locator("#cfg-cta-text");
    await expect(brandInput).toBeVisible();
    await expect(h1Input).toBeVisible();
    await expect(ctaInput).toBeVisible();

    // Check iframe preview exists
    const iframe = page.frameLocator("#preview-iframe");
    await expect(iframe.locator("body")).toBeAttached();
    await expect(iframe.locator("text=Estudio Digital").first()).toBeVisible();

    // 2. Real-time reactivity: modify brand title
    await brandInput.fill("Restaurante Xàtiva Gourmet");
    await expect(iframe.locator("text=Restaurante Xàtiva Gourmet").first()).toBeVisible();

    // 3. Tab switching to Code view
    const tabCode = page.locator("#tab-btn-code");
    await tabCode.click();
    const panelCode = page.locator("#panel-code");
    await expect(panelCode).toBeVisible();
    const codeContent = await page.locator("#code-output").textContent();
    expect(codeContent).toContain("Restaurante Xàtiva Gourmet");
    expect(codeContent).toContain("<!DOCTYPE html>");

    // 4. Viewport switcher
    const tabPreview = page.locator("#tab-btn-preview");
    await tabPreview.click();
    const vpMobile = page.locator('button[data-view="375px"]');
    await vpMobile.click();
    const iframeWrapper = page.locator("#iframe-wrapper");
    await expect(iframeWrapper).toHaveCSS("max-width", "375px");

    const vpDesktop = page.locator('button[data-view="100%"]');
    await vpDesktop.click();
    const viewportLabel = page.locator("#preview-viewport-label");
    await expect(viewportLabel).toContainText("100%");

    // 5. Actions: Copy and Download buttons exist and have correct brand styling
    const copyBtn = page.locator("#btn-copy-code");
    const downloadBtn = page.locator("#btn-download-html");
    await expect(copyBtn).toBeVisible();
    await expect(downloadBtn).toBeVisible();
    await expect(downloadBtn).toHaveClass(/btn-brand/);

    // 6. English route verification
    await page.goto("/en/tools/creador-html/");
    await expect(page.locator("h1")).toContainText("HTML File Creator & Generator");
    const enIframe = page.frameLocator("#preview-iframe");
    await expect(enIframe.locator("body")).toBeAttached();
    await expect(enIframe.locator("text=Studio Apex").first()).toBeVisible();
  });
});
