import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("WCAG AA Accessibility Audits (axe-core)", () => {
  const testPages = [
    { name: "Home (/)", path: "/" },
    { name: "Pricing (/pricing/)", path: "/pricing/" },
    { name: "Projects (/projectes/)", path: "/projectes/" },
  ];

  for (const { name, path } of testPages) {
    test(`passes WCAG AA accessibility scan with 0 serious or critical violations on ${name}`, async ({
      page,
    }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      const seriousOrCriticalViolations = accessibilityScanResults.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact || "")
      );

      expect(
        seriousOrCriticalViolations,
        `Expected 0 serious or critical accessibility violations on ${name}, but found ${
          seriousOrCriticalViolations.length
        }:\n${JSON.stringify(
          seriousOrCriticalViolations.map((v) => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            nodes: v.nodes.map((n) => ({
              target: n.target,
              failureSummary: n.failureSummary,
            })),
          })),
          null,
          2
        )}`
      ).toEqual([]);
    });
  }
});

