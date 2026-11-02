import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

const valencianBlogSlugs = [
  "arquitectura-modular-angular-standalone-signals",
  "optimitzacio-core-web-vitals-60fps",
  "pipeline-cicd-github-actions-desplegament-continu",
  "accessibilitat-web-wcag-aa-guia-practica",
  "avisa-gestio-incidencies-arquitectura-frontend",
  "com-crear-un-portfolio-denginyeria-frontend",
  "git-github-control-versions-flux-colaboratiu",
  "guia-definitiva-typescript-estricte-frontend",
  "guia-seo-local-google-maps-comunitat-valenciana",
  "html5-semantic-accessibilitat-arquitectura-web",
  "javascript-guia-completa-ecmascript-modern",
  "linux-shell-bash-administracio-sistemes-devops",
  "nodejs-arquitectura-backend-esdeveniments-apis",
  "optimitzacio-imatges-web-avif-webp-pipeline",
  "per-que-el-menu-en-pdf-mata-vendes-restaurant",
  "per-que-triar-astro-sobre-wordpress-negocis-locals",
  "seo-local-i-rendiment-pizzeria-xativa",
  "tailwind-css-guia-disseny-atomic-modern",
  "targetes-fidelitzacio-wallet-negocis-locals",
];

const blogRedirects = Object.fromEntries(
  valencianBlogSlugs.flatMap((slug) => [
    [`/val/blog/${slug}`, `/blog/es-${slug}`],
    [`/blog/${slug}`, `/blog/es-${slug}`],
  ])
);

// https://astro.build/config
export default defineConfig({
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
    "/val/about": "/about",
    "/val/pricing": "/pricing",
    "/val/projectes": "/projectes",
    "/val/contact": "/contact",
    "/val/blog": "/blog",
    "/val/card": "/card",
    "/val/marca": "/marca",
    "/val/qualitat": "/qualitat",
    "/val/uses": "/uses",
    "/val/tools/workflow-generator": "/tools/workflow-generator",

    // Pricing packages redirects
    "/val/pricing/digitalitzacio-local": "/pricing/digitalitzacio-local",
    "/val/pricing/landing-page": "/pricing/landing-page",
    "/val/pricing/angular-webapp": "/pricing/angular-webapp",
    "/val/pricing/performance-audit": "/pricing/performance-audit",
    "/val/pricing/cicd-devops": "/pricing/cicd-devops",

    // Projects redirects
    "/val/projectes/avisa": "/projectes/avisa",
    "/val/projectes/burger-xativa": "/projectes/burger-xativa",
    "/val/projectes/dashboard-telemetria": "/projectes/dashboard-telemetria",
    "/val/projectes/fincarural": "/projectes/fincarural",
    "/val/projectes/forma-espacio": "/projectes/forma-espacio",
    "/val/projectes/pipeline-cicd": "/projectes/pipeline-cicd",
    "/val/projectes/pizzeria-xativa": "/projectes/pizzeria-xativa",
    "/val/projectes/urbanstyles": "/projectes/urbanstyles",

    // English project alias
    "/en/projects": "/en/projectes",

    ...blogRedirects,
  },
  integrations: [mdx(), sitemap(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
