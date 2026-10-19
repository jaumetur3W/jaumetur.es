import { test, expect } from '@playwright/test';

const pages = [
  '/',
  '/about',
  '/projectes/avisa',
  '/projectes/pizzeria-xativa',
  '/projectes/dashboard-telemetria',
  '/projectes/pipeline-cicd',
  '/pricing',
  '/contact',
  '/blog',
  '/qualitat',
  '/marca',
  '/card'
];

test.describe('Responsive & Viewport QA Audit', () => {
  test('Mobile 360px has zero horizontal overflow across key pages', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 360, height: 740 } });
    const page = await context.newPage();

    for (const p of pages) {
      await page.goto(p, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(100);

      const check = await page.evaluate(() => {
        const scrollWidth = document.documentElement.scrollWidth;
        const windowWidth = window.innerWidth;
        return {
          path: window.location.pathname,
          scrollWidth,
          windowWidth,
          hasOverflow: scrollWidth > windowWidth + 1
        };
      });

      if (check.hasOverflow) {
        const offenders = await page.evaluate(() => {
          const w = window.innerWidth;
          const bad: Array<{ tag: string; id: string; class: string; right: number; width: number }> = [];
          document.querySelectorAll('*').forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.right > w + 1) {
              bad.push({
                tag: el.tagName,
                id: el.id,
                class: el.className.toString ? el.className.toString().slice(0, 60) : '',
                right: Math.round(r.right),
                width: Math.round(r.width)
              });
            }
          });
          return bad;
        });
        console.log(`Offenders on [${p}]:`, JSON.stringify(offenders.slice(0, 8), null, 2));
      }
      expect(check.hasOverflow, `Page ${p} has horizontal overflow: ${check.scrollWidth} > ${check.windowWidth}`).toBe(false);
    }

    await context.close();
  });

  test('Tablet 768px has zero horizontal overflow across key pages', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 768, height: 1024 } });
    const page = await context.newPage();

    for (const p of pages) {
      await page.goto(p, { waitUntil: 'domcontentloaded' });
      const check = await page.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          windowWidth: window.innerWidth,
          hasOverflow: document.documentElement.scrollWidth > window.innerWidth + 1
        };
      });
      expect(check.hasOverflow, `Page ${p} has horizontal overflow at 768px`).toBe(false);
    }

    await context.close();
  });
});
