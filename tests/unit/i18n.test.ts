import { describe, expect, it } from "vitest";
import { alternatePaths, localeFromPath, localizePath, stripLocale } from "../../src/i18n";

describe("locale routing (Spanish default, English alternative)", () => {
  it("detects English routes only at the locale boundary and defaults to Spanish", () => {
    expect(localeFromPath("/en")).toBe("en");
    expect(localeFromPath("/en/")).toBe("en");
    expect(localeFromPath("/en/about")).toBe("en");
    expect(localeFromPath("/enterprise")).toBe("es");
    expect(localeFromPath("/about")).toBe("es");
    expect(localeFromPath("/")).toBe("es");
  });

  it("normalizes localized paths without removing route names containing en or val", () => {
    expect(stripLocale("/en/about/")).toBe("/about");
    expect(stripLocale("/en")).toBe("/");
    expect(stripLocale("/val/about/")).toBe("/about");
    expect(stripLocale("/val")).toBe("/");
    expect(stripLocale("/enterprise")).toBe("/enterprise");
    expect(stripLocale("/values")).toBe("/values");
  });

  it("localizes page routes and preserves query strings and fragments", () => {
    expect(localizePath("/about", "en")).toBe("/en/about");
    expect(localizePath("/en/pricing?service=landing-page#faq", "es")).toBe(
      "/pricing?service=landing-page#faq",
    );
    expect(localizePath("/", "en")).toBe("/en/");
    expect(localizePath("/", "es")).toBe("/");
    expect(localizePath("/projectes/avisa", "en")).toBe("/en/projectes/avisa");
  });

  it("does not prefix static assets, documents, or the RSS feed", () => {
    expect(localizePath("/img/profile.webp", "en")).toBe("/img/profile.webp");
    expect(localizePath("/docs/CV.pdf", "en")).toBe("/docs/CV.pdf");
    expect(localizePath("/rss.xml", "en")).toBe("/rss.xml");
  });

  it("keeps page alternates consistent between es and en", () => {
    expect(alternatePaths("/projectes/avisa")).toEqual({
      es: "/projectes/avisa",
      en: "/en/projectes/avisa",
    });
    expect(alternatePaths("/en/about")).toEqual({
      es: "/about",
      en: "/en/about",
    });
  });
});
