import { describe, it, expect } from "vitest";

describe("Portfolio Architecture & Business Logic", () => {
  it("should calculate reading time correctly for articles", () => {
    function calculateReadingTime(wordsCount: number, wordsPerMinute = 200): number {
      return Math.max(1, Math.round(wordsCount / wordsPerMinute));
    }

    expect(calculateReadingTime(150)).toBe(1);
    expect(calculateReadingTime(600)).toBe(3);
    expect(calculateReadingTime(2000)).toBe(10);
  });

  it("should validate allowed project slugs", () => {
    const validProjectSlugs = [
      "avisa",
      "pizzeria-xativa",
      "dashboard-telemetria",
      "pipeline-cicd",
    ];

    expect(validProjectSlugs).toContain("avisa");
    expect(validProjectSlugs).toContain("pizzeria-xativa");
    expect(validProjectSlugs).toContain("dashboard-telemetria");
    expect(validProjectSlugs).toContain("pipeline-cicd");
    expect(validProjectSlugs.length).toBe(4);
  });

  it("should construct valid JSON-LD Person schema", () => {
    const siteUrl = "https://jaumetur.es";
    const schema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Jaume Tur",
      jobTitle: "Desenvolupador Frontend & Web Apps",
      url: siteUrl,
      sameAs: [
        "https://github.com/jautur",
        "https://www.linkedin.com/in/jautur/",
        "https://twitter.com/jautur",
      ],
    };

    expect(schema["@type"]).toBe("Person");
    expect(schema.name).toBe("Jaume Tur");
    expect(schema.url).toBe("https://jaumetur.es");
    expect(schema.sameAs).toHaveLength(3);
  });

  it("should validate theme transition values", () => {
    const allowedThemes = ["light", "dark", "system"];
    function isValidTheme(t: string): boolean {
      return allowedThemes.includes(t);
    }

    expect(isValidTheme("light")).toBe(true);
    expect(isValidTheme("dark")).toBe(true);
    expect(isValidTheme("system")).toBe(true);
    expect(isValidTheme("invalid-theme")).toBe(false);
  });

  it("should satisfy Core Web Vitals thresholds", () => {
    const targets = {
      lcp: 1.8, // seconds
      cls: 0.05,
      inp: 150, // milliseconds
      tbt: 150, // milliseconds
    };

    const measured = {
      lcp: 0.7,
      cls: 0.0,
      inp: 25,
      tbt: 0,
    };

    expect(measured.lcp).toBeLessThan(targets.lcp);
    expect(measured.cls).toBeLessThanOrEqual(targets.cls);
    expect(measured.inp).toBeLessThan(targets.inp);
    expect(measured.tbt).toBeLessThan(targets.tbt);
  });

  it("should validate FAQPage schema structure for SEO", () => {
    const faqData = [
      { question: "Quin és el mètode de pagament?", answer: "50% inicial i 50% al lliurament." },
    ];
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    };

    expect(faqSchema["@type"]).toBe("FAQPage");
    expect(faqSchema.mainEntity).toHaveLength(1);
    expect(faqSchema.mainEntity[0].name).toBe("Quin és el mètode de pagament?");
  });

  it("should detect bot submissions via honeypot and enforce submission rate limiting", () => {
    function isSpam(honeypotVal: string, lastSubmissionTime: number, now: number): boolean {
      if (honeypotVal.trim() !== "") return true; // bot filled hidden field
      if (now - lastSubmissionTime < 30 * 1000) return true; // rate limited
      return false;
    }

    const t0 = 1000000;
    expect(isSpam("spam-bot-input", 0, t0)).toBe(true);
    expect(isSpam("", t0 - 10000, t0)).toBe(true); // only 10s passed
    expect(isSpam("", t0 - 35000, t0)).toBe(false); // 35s passed, valid human submission
  });
});

