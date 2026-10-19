---
draft: false
title: "Guia Pas a Pas: CI/CD per a Frontend amb GitHub Actions i Desplegament Automatitzat"
snippet: "Aprende a dissenyar un pipeline de continuous integration i continuous deployment professional: linter, tests, build optimitzat, cache eficient i zero downtime deployment."
image: {
    src: "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?fit=crop&w=1200&h=630",
    alt: "Pipeline d'automatització i integració contínua CI/CD"
}
publishDate: "2026-03-14 09:15"
category: "CI/CD"
author: "Jaume Tur"
tags: [cicd, github-actions, devops, deploy, automacio, astro, angular]
lang: "ca"
canonicalUrl: "https://jaumetur.es/blog/pipeline-cicd-github-actions-desplegament-continu"
---

El desplegament manual de programari mitjançant FTP o arrossegant fitxers per SSH és una de les majors fonts d'errors en la indústria del desenvolupament web. Un fitxer oblidat, una versió equivocada de Node.js o una variable d'entorn no sincronitzada poden deixar una aplicació en caiguda lliure (*downtime*) en plena hora punta.

La solució és senzilla: **Integració Contínua (CI) i Desplegament Continu (CD)**. Cada vegada que un desenvolupador fa un `git push` a la branca `main`, una màquina aïllada al núvol clona el repositori, valida el format del codi, executa els tests unitaris, compila els actius estàtics i desplega la nova versió a producció de manera atòmica i sense interrupció del servei.

En aquesta guia detallem com configurar un pipeline professional per a aplicacions frontend utilitzant **GitHub Actions**.

---

## 1. L'Arquitectura d'un Pipeline Frontend Professional

Un bon pipeline de CI/CD per a frontend ha de complir tres premisses:
1. **Velocitat (Fast Feedback):** Si el pipeline tarda més de 3-4 minuts, els desenvolupadors perdran el ritme i deixaran de revisar els resultats abans de canviar de context.
2. **Determinisme:** Utilitzar `npm ci` en lloc de `npm install` per a garantir que s'instal·len exactament les mateixes dependències descrites al fitxer de bloqueig `package-lock.json`.
3. **Resiliència (Fail-Fast):** Si els linters fallen o hi ha un error de TypeScript, el procés s'atura immediatament sense gastar temps ni minuts de càlcul intentant compilar.

```text
  [ Git Push ]
       │
       ▼
┌───────────────────────────────┐
│ Job: Qualitat i Seguretat     │
│ - ESLint / Prettier           │
│ - Typecheck (tsc --noEmit)    │
│ - Tests Unitaris (Vitest)     │
└──────────────┬────────────────┘
               │ (Només si passa)
               ▼
┌───────────────────────────────┐
│ Job: Build & Caching          │
│ - Astro / Angular Build       │
│ - Optimització d'imatges      │
└──────────────┬────────────────┘
               │ (Només si passa)
               ▼
┌───────────────────────────────┐
│ Job: Desplegament Atòmic      │
│ - GitHub Pages / Cloudflare   │
│ - Purga de CDN Cache          │
└───────────────────────────────┘
```

---

## 2. El Fitxer de Configuració `.github/workflows/deploy.yml`

A continuació presentem el workflow complet i optimitzat que utilitzem en projectes basats en Astro i Angular per a desplegar a **GitHub Pages** amb domini personalitzat:

```yaml
name: Deploy Frontend to Production

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    name: ⚙️ Build & Validate
    runs-on: ubuntu-latest
    steps:
      - name: 📥 Clonar Repositori
        uses: actions/checkout@v4

      - name: 🟢 Configurar Node.js (v22 LTS)
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'

      - name: 📦 Instal·lar Dependències Deterministes
        run: npm ci

      - name: 🔍 Verificació Estricta de Tipus TypeScript
        run: npx astro check || npx tsc --noEmit

      - name: 🚀 Compilació de Producció
        run: npm run build

      - name: 📤 Pujar artefactes estàtics
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    name: 🌍 Desplegament Atòmic
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: 🚀 Desplegar a GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

<div class="callout callout-tip">
  <strong>Vols generar aquest fitxer automàticament?</strong> Hem creat l'eina interactiva <a href="/tools/workflow-generator">Generador de Workflows CI/CD</a> per a crear pipelines personalitzats per a Astro, Angular o React amb 1 sol clic.
</div>

---

## 3. Caching Intel·ligent: Reduir el temps de build de 5 minuts a 45 segons

Un dels colls d'ampolla habituals a GitHub Actions és la descàrrega reiterada de la carpeta `node_modules`.

Mitjançant la propietat `cache: 'npm'` a l'acció oficial `actions/setup-node@v4`, GitHub Actions guarda una instantània del cau de paquets indexat pel hash del fitxer `package-lock.json`. Si no s'ha afegit cap biblioteca nova, la instal·lació de dependències es resol en qüestió de segons:

```yaml
- name: Setup Node.js with cache
  uses: actions/setup-node@v4
  with:
    node-version: 22
    cache: 'npm'
```

---

## 4. Gestió de Dominis Personalitzats i HTTPS (.es)

Quan es desplega a GitHub Pages amb un domini propi (com `jaumetur.es`), cal tenir en compte dos aspectes crítics que sovint causen caigudes del lloc web:

1. **El fitxer CNAME a la carpeta d'eixida:** GitHub Pages requereix un fitxer de text anomenat `CNAME` que continga exclusivament el domini de producció. Si el teu framework no el copia a `./dist`, el domini es desvincula en cada desplegament. A Astro, simplement cal guardar-lo a la carpeta `/public/CNAME`.
2. **El fitxer `.nojekyll`:** GitHub Pages assumeix per defecte que els llocs estan construïts amb Jekyll, ignorant qualsevol directori que comence per guió baix (`_astro`, `_app`). Crear un fitxer buit `/public/.nojekyll` desactiva aquest comportament i garanteix que tots els fitxers CSS i JavaScript es carreguen correctament.

---

## 5. Prevenció de Regressions amb Husky i Linters

El millor pipeline de CI/CD és aquell que no cal executar perquè els errors s'intercepten abans d'arribar al repositori remot.

Utilitzem **Husky** i **lint-staged** per a validar el format i el tipatge abans de permetre un commit:

```json
// package.json
{
  "lint-staged": {
    "*.{ts,astro,js}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

D'aquesta manera, cap línia de codi amb sintaxi incorrecta arriba a la branca principal.

---

## Conclusió

L'automatització mitjançant CI/CD transforma completament la seguretat psicològica d'un equip d'enginyeria. Saber que cada canvi passa per una bateria de validacions automàtiques permet lliurar valor contínuament sense por a trencar la producció.

Si vols implementar un pipeline similar a la teua organització o optimitzar els teus temps de desplegament, [pots sol·licitar el nostre servei de consultoria DevOps](/contact).
