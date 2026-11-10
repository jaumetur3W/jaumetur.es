import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// Old Catalan-based slugs -> current Spanish slugs
const legacyBlogSlugs = [
  ["accessibilitat-web-wcag-aa-guia-practica", "accesibilidad-web-wcag-aa-guia-practica"],
  ["arquitectura-modular-angular-standalone-signals", "arquitectura-modular-angular-standalone-signals"],
  ["avisa-gestio-incidencies-arquitectura-frontend", "avisa-arquitectura-frontend-angular-pwa"],
  ["com-crear-un-portfolio-denginyeria-frontend", "como-crear-portfolio-ingenieria-frontend"],
  ["git-github-control-versions-flux-colaboratiu", "git-github-control-de-versiones-flujo-colaborativo"],
  ["guia-definitiva-typescript-estricte-frontend", "guia-definitiva-typescript-estricto-frontend"],
  ["guia-seo-local-google-maps-comunitat-valenciana", "guia-seo-local-google-maps-comunidad-valenciana"],
  ["html5-semantic-accessibilitat-arquitectura-web", "html5-semantico-accesibilidad-arquitectura-web"],
  ["javascript-guia-completa-ecmascript-modern", "javascript-guia-completa-ecmascript-moderno"],
  ["linux-shell-bash-administracio-sistemes-devops", "linux-shell-bash-administracion-sistemas-devops"],
  ["nodejs-arquitectura-backend-esdeveniments-apis", "nodejs-arquitectura-backend-eventos-apis"],
  ["optimitzacio-core-web-vitals-60fps", "optimizacion-core-web-vitals-60fps"],
  ["optimitzacio-imatges-web-avif-webp-pipeline", "optimizacion-imagenes-web-avif-webp-pipeline"],
  ["per-que-el-menu-en-pdf-mata-vendes-restaurant", "por-que-el-menu-en-pdf-mata-ventas-restaurante"],
  ["per-que-triar-astro-sobre-wordpress-negocis-locals", "por-que-elegir-astro-sobre-wordpress-negocios-locales"],
  ["pipeline-cicd-github-actions-desplegament-continu", "pipeline-cicd-github-actions-despliegue-continuo"],
  ["seo-local-i-rendiment-pizzeria-xativa", "seo-local-y-rendimiento-pizzeria-xativa"],
  ["tailwind-css-guia-disseny-atomic-modern", "tailwind-css-guia-diseno-atomico-moderno"],
  ["targetes-fidelitzacio-wallet-negocis-locals", "tarjetas-fidelizacion-wallet-negocios-locales"],
];

const blogRedirects = Object.fromEntries(
  legacyBlogSlugs.flatMap(([oldSlug, newSlug]) => [
    [`/val/blog/${oldSlug}`, `/blog/${newSlug}/`],
    [`/blog/es-${oldSlug}`, `/blog/${newSlug}/`],
    ...(oldSlug === newSlug ? [] : [[`/blog/${oldSlug}`, `/blog/${newSlug}/`]]),
  ])
);

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
    "/val/blog": "/blog/",
    "/val/card": "/card/",
    "/val/qualitat": "/qualitat/",
    "/val/tools/workflow-generator": "/tools/workflow-generator/",

    // Tool redirects
    "/tools/html": "/tools/creador-html/",
    "/tools/html-generator": "/tools/creador-html/",
    "/en/tools/html-generator": "/en/tools/creador-html/",

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
    "/val/projectes/trania": "/projectes/trania/",
    "/val/projectes/worksy": "/projectes/worksy/",

    // English project alias
    "/en/projects": "/en/projectes/",

    ...blogRedirects,
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark-high-contrast",
    },
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        if (page.includes("/404")) return false;
        if (page.includes("/briefing")) return false;
        if (page.includes("/val/") || page.endsWith("/val/")) return false;
        if (page.includes("/en/projects")) return false;
        // Artículos del blog sin traducción real: la versión /en/ es una copia noindex
        if (/\/en\/blog\/[^/]+\/?$/.test(page)) return false;
        return true;
      },
    }),
    icon(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
