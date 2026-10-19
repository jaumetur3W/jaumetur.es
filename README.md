# jaumetur.es — Portfolio Personal & Playground d'Enginyeria Frontend

[![CI Pipeline](https://github.com/jautur/jaumetur.es/actions/workflows/ci.yml/badge.svg)](https://github.com/jautur/jaumetur.es/actions/workflows/ci.yml)
[![GitHub Pages Deploy](https://github.com/jautur/jaumetur.es/actions/workflows/deploy.yml/badge.svg)](https://github.com/jautur/jaumetur.es/actions/workflows/deploy.yml)
[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-100%2F100-brightgreen?logo=lighthouse&logoColor=white)](https://jaumetur.es/qualitat)
[![WCAG 2.2 AA Compliant](https://img.shields.io/badge/Accessibility-WCAG%202.2%20AA-success?logo=w3c&logoColor=white)](https://jaumetur.es/qualitat)
[![Astro Version](https://img.shields.io/badge/Astro-v5%2Fv7-bc52ee?logo=astro&logoColor=white)](https://astro.build)
[![TypeScript Strict](https://img.shields.io/badge/TypeScript-Strict-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Català (Catalan)

### Descripció del Projecte

Aquest repositori conté el codi font de **[jaumetur.es](https://jaumetur.es)**, el portfolio personal i laboratori d'enginyeria frontend de **Jaume Tur**, desenvolupador especialitzat en aplicacions web d'alt rendiment, arquitectures modernes amb Astro, Angular, TypeScript i processos d'automatització CI/CD.

El lloc web està construït com una prova empírica de qualitat: disseny net tipus Bento Grid, 60 FPS garantits en animacions, compliment estricte de WCAG 2.2 AA, càrrega instantània amb zero FOUC (*Flash of Unstyled Content*), paleta de comandes per teclat (`Cmd/Ctrl + K`) i una pàgina pública de telemetria i mètriques en viu a [`/qualitat`](https://jaumetur.es/qualitat).

### Pilars d'Arquitectura

1. **Astro Content Collections & Islands Architecture**: Renderitzat estàtic per defecte (SSG) amb generació de zero JavaScript a la majoria de seccions. Els components interactius (paleta de comandes, selector de tema, Three.js) funcionen com a illes aïllades.
2. **Motor de Tema Zero-FOUC**: Gestió de tema fosc/clar/automàtic amb sincronització al `localStorage` i preferències del sistema operatiu (`prefers-color-scheme`), injectat al `<head>` abans del renderitzat visual per evitar parpellejos.
3. **Casos d'Estudi Verificables**: Col·leccions de contingut per a projectes d'enginyeria (`/projectes/[slug]`) amb dades estructurades `CreativeWork` i `SoftwareSourceCode` validades segons schema.org.
4. **Paleta de Comandes (`Cmd/Ctrl + K`)**: Modal accessible amb gestió de focus, tancament amb tecla Escape, dreceres de navegació ràpida i canvi d'estat del sistema.
5. **CI/CD Integral**: Pipeline de GitHub Actions amb etapes paral·leles de comprovació de tipus (`astro check`), linter, proves unitàries (Vitest), proves de cap a cap (Playwright) i auditoria automatitzada amb Lighthouse CI.

---

## English

### Project Overview

This repository hosts the source code for **[jaumetur.es](https://jaumetur.es)**, the technical portfolio and frontend engineering playground of **Jaume Tur**, a Frontend & Web Apps Engineer specializing in high-performance web applications, modern architectures with Astro, Angular, TypeScript, and CI/CD automation pipelines.

The platform is designed to practice what it preaches: high-density Bento Grid layout, verifiable 60 FPS frame rates, strict WCAG 2.2 AA accessibility, zero-FOUC theme switching, fully accessible keyboard-driven Command Palette (`Cmd/Ctrl + K`), and an auditable live metrics dashboard at [`/qualitat`](https://jaumetur.es/qualitat).

### Architectural Highlights

1. **Islands Architecture**: Static-first zero-JavaScript default with client islands activated only when interactive behavior is strictly required.
2. **Zero-FOUC Theme Engine**: Synchronized light/dark/system theme management preventing any visual flash on initial load.
3. **Evidence-Based Case Studies**: Content collections located under `/projectes/[slug]` enriched with structured `SoftwareSourceCode` and `CreativeWork` schemas.
4. **Interactive Command Palette**: Accessible modal dialog offering quick page navigation, theme toggling, and email copying with full keyboard trapping.
5. **Automated Platform Engineering**: Multi-stage GitHub Actions workflow encompassing static analysis, type checking, unit tests (Vitest), end-to-end tests (Playwright), and performance assertion gates (Lighthouse CI).

---

## Stack Tecnològic / Tech Stack

* **Framework:** [Astro](https://astro.build/) (v5 / v7 core engine)
* **Estils & Disseny:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Tipografia:** Bricolage Grotesque & Inter Variable via `@fontsource-variable`
* **Icones Estabilitzades:** Boxicons (`@iconify-json/bx`), Simple Icons (`@iconify-json/simple-icons`) via `astro-icon` (zero emojis)
* **Gràfics 3D:** Three.js (canvas de partícules respectuós amb `prefers-reduced-motion`)
* **Qualitat & Tipus:** TypeScript (mode estricte) + `@astrojs/check`
* **Testing:** [Vitest](https://vitest.dev/) (unitaris) + [Playwright](https://playwright.dev/) (E2E)
* **CI/CD & Desplegament:** GitHub Actions + GitHub Pages + Lighthouse CI

---

## Comandes Locals / Quickstart

### Requisits Previs / Prerequisites

* Node.js `>= 22.12.0`
* npm `>= 10.x`

### Instal·lació i Execució / Installation & Development

```bash
# 1. Clonar el repositori / Clone repository
git clone https://github.com/jautur/jaumetur.es.git
cd jaumetur.es

# 2. Instal·lar dependències / Install dependencies
npm ci

# 3. Instal·lar navegadors de Playwright / Install Playwright browsers
npx playwright install chromium

# 4. Iniciar el servidor local de desenvolupament / Start local dev server
npm run dev
```

El servidor local s'iniciarà a:
`http://localhost:4321/`

---

## Scripts Disponibles / Available Scripts

| Comanda / Command | Descripció / Description |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desenvolupament local (`http://localhost:4321`). |
| `npm run build` | Compila l'aplicació per a producció estàtica a `./dist`. |
| `npm run preview` | Serveix la compilació estàtica de producció en local. |
| `npm run check` | Executa `astro check` per verificar tipus TypeScript i components Astro. |
| `npm test` | Executa la suite de proves unitàries amb Vitest. |
| `npm run test:e2e` | Executa les proves end-to-end de navegació i interacció amb Playwright. |

---

## Pipelines de CI/CD / Continuous Integration

Els fluxos de treball s'executen automàticament a cada Pull Request i push a `main`:

* **`quality-and-typecheck`**: Verificació estricta de tipus TypeScript i sintaxi Astro.
* **`unit-tests`**: Execució de tests de lògica amb Vitest.
* **`build-and-e2e`**: Compilació estàtica i proves d'integració d'usuari amb Playwright.
* **`lighthouse-audit`**: Avaluació de rendiment, accessibilitat, bones pràctiques i SEO amb umbrals mínims de 95-100.
* **`deploy`**: Desplegament automàtic a GitHub Pages amb comprovacions prèvies de salut.

Per a detalls sobre estàndards de contribució i Conventional Commits, consulta [CONTRIBUTING.md](CONTRIBUTING.md).

---

## Llicència / License

Distribuït sota llicència MIT. Consulta l'arxiu [LICENSE](LICENSE) per a més informació.
