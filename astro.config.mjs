import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  trailingSlash: "always",
  devToolbar: {
    enabled: false,
  },
  site: "https://jaumetur.es",
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  redirects: {
    "/val": "/",
    "/val/about": "/about/",
    "/val/pricing": "/pricing/",
    "/val/projectes": "/projectes/",
    "/val/contact": "/contact/",
    "/val/card": "/card/",
    "/val/qualitat": "/qualitat/",

    // Pricing packages redirects
    "/val/pricing/digitalitzacio-local": "/pricing/digitalitzacio-local/",
    "/val/pricing/landing-page": "/pricing/landing-page/",
    "/val/pricing/angular-webapp": "/pricing/angular-webapp/",
    "/val/pricing/performance-audit": "/pricing/performance-audit/",
    "/val/pricing/cicd-devops": "/pricing/cicd-devops/",

    // Projects redirects
    "/val/projectes/avisa": "/projectes/avisa/",
    "/val/projectes/burger-xativa": "/projectes/burger-xativa/",
    "/val/projectes/dashboard-telemetria": "/projectes/dashboard-telemetria/",
    "/val/projectes/fincarural": "/projectes/fincarural/",
    "/val/projectes/forma-espacio": "/projectes/forma-espacio/",
    "/val/projectes/pipeline-cicd": "/projectes/pipeline-cicd/",
    "/val/projectes/pizzeria-xativa": "/projectes/pizzeria-xativa/",

    // English project alias
    "/en/projects": "/en/projectes/",

  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        if (page.includes("/404")) return false;
        if (page.includes("/briefing")) return false;
        if (page.includes("/val/") || page.endsWith("/val/")) return false;
        if (page.includes("/en/projects")) return false;
        return true;
      },
    }),
    icon(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
