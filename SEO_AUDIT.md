# 🔍 SEO_AUDIT.md — Auditoria SEO Tècnic, Rendiment i Arquitectura de Contingut

**Lloc web auditat:** [https://jaumetur.es](https://jaumetur.es)  
**Objectiu:** Convertir el portal de Jaume Tur en una referència orgànica per al desenvolupament frontend a València i a la comunitat catalanoparlant/hispanoparlant.  
**Auditor:** Head of Technical SEO & Growth Engineering  
**Data d'auditoria:** 19 d'octubre de 2026  

---

## 1. Resum Executiu & Puntuació Inicial

| Àrea d'Auditoria | Estat Inicial | Impacte | Nivell de Prioritat |
| :--- | :--- | :--- | :--- |
| **Metadades & Títols** | Títol genèric "Inici \| Jaume Tur", sense paraules clau geo ni d'especialitat. | Altíssim (Pèrdua de clics a SERPs) | 🔴 P0 (Crític) |
| **Dades Estructurades (JSON-LD)**| Inexistents o incompletes. Sense schemas de `Person`, `LocalBusiness`, `BlogPosting`. | Alt (Manca de Rich Snippets a Google) | 🔴 P0 (Crític) |
| **Internacionalització (hreflang)**| Únicament declarat `<html lang="ca">`, sense relació `hreflang` multilingüe. | Mitjà-Alt (Audiència restringida) | 🟡 P1 (Alta) |
| **Arquitectura del Blog** | 4 posts de plantilla amb text "Lorem Ipsum", sense temps de lectura ni RSS. | Altíssim (Zero trànsit orgànic) | 🔴 P0 (Crític) |
| **SEO Local (València)** | Paraules clau locals inexistents a URLs, títols o etiquetes de servei. | Alt (No apareix per "freelance frontend València") | 🔴 P0 (Crític) |
| **Indexació & Rastrejabilitat** | Sitemap XML configurat, robots.txt apuntant correctament, CNAME i .nojekyll en ordre. | Baix (Tècnicament correcte) | 🟢 P3 (Mantindre) |
| **Core Web Vitals** | Arquitectura SSG ràpida amb Astro. Manca atributs explícits en algunes imatges. | Mitjà (LCP i CLS a polir) | 🟡 P1 (Alta) |

---

## 2. Diagnòstic Tècnic Detallat

### 2.1 Metadades & Snippets de Cerca
- **Problema:** El títol de la pàgina principal era `Inici | Jaume Tur`. Aquest títol desaprofita completament els 60 caràcters visibles a Google i no posiciona per cap terme de cerca amb intenció comercial o formativa.
- **Solució:** Optimitzar el títol principal a:  
  `Jaume Tur — Desenvolupador Frontend & Web Apps a València | Angular & TypeScript`  
  i assignar meta descriptions úniques amb crida a l'acció per a cada pàgina (`/about`, `/blog`, `/pricing`, `/contact`, `/uses`, `/tools/workflow-generator`).

### 2.2 Dades Estructurades Schema.org (JSON-LD)
- **Problema:** Google no comprenia entitats ni connexions del professional (estudis, ciutat, xarxes socials, projectes de programari de codi obert).
- **Solució:** Inserir a `<head>` els següents esquemes:
  1. `Person`: Nom, rol, URL, xarxes (GitHub, LinkedIn, Twitter/X), especialitats (Angular, TypeScript, CI/CD).
  2. `WebSite`: URL canònica, cerca interna, nom del lloc.
  3. `LocalBusiness` / `ProfessionalService`: Desenvolupament web freelance i serveis frontend amb àrea geogràfica a València i modalitat en remot.
  4. `BlogPosting`: Autor, data de publicació, data de modificació, imatge destacada, temps de lectura i editor per a cada article tècnic.
  5. `BreadcrumbList`: Estructura jeràrquica clara per a bots de cerca.

### 2.3 Internacionalització i Etiquetes `hreflang`
- **Problema:** El català és la llengua nativa i prioritats del lloc, però hi ha una gran oportunitat d'atracció orgànica en castellà i anglès per a termes com *"Angular Signals guía completa"*, *"Optimizar Core Web Vitals 60 FPS"* o *"GitHub Actions frontend CI/CD"*.
- **Solució:** Implementar etiquetes canòniques i `<link rel="alternate" hreflang="..." />`:
  - `hreflang="ca"`: Versió principal.
  - `hreflang="es"`: Articles estratègics traduïts al castellà per captar trànsit estatal i de Llatinoamèrica.
  - `hreflang="x-default"`: Redirecció intel·ligent a la versió principal canònica.

### 2.4 Feed RSS i Sitemaps
- **Problema:** Els desenvolupadors utilitzen lectors RSS (Feedly, NetNewsWire, agregadors) i plataformes com Dev.to o Daily.dev importen continguts via RSS.
- **Solució:** Instal·lar `@astrojs/rss` i crear el feed a `/rss.xml` amb metadades completes per a cada article.

### 2.5 SEO Local a València
- **Problema:** Moltes empreses tecnològiques de València (Marina d'Empreses, Lanzadera, parcs tecnològics de Paterna o Burjassot) cerquen perfils locals per a models híbrids o contractació freelance.
- **Solució:** Afegir mencions semàntiques naturals a [`pricing.astro`](file:///c:/Users/User/Desktop/jaumetur.es/src/pages/pricing.astro) i [`contact.astro`](file:///c:/Users/User/Desktop/jaumetur.es/src/pages/contact.astro) posicionant per:
  - *Desenvolupador web València*
  - *Freelance frontend València*
  - *Consultor Angular & TypeScript Comunitat Valenciana*

---

## 3. Matriu d'Impacte vs Esforç

```
  Impacte Alt ▲
              │  [Blog Tècnic Real]        [Metadades & Títols SERP]
              │  [JSON-LD Schemas]          [SEO Local València]
              │  
              │  [Feed RSS & Subscripció]   [Pàgina /uses & Tools]
              │
              └────────────────────────────────────────────────►
                                                      Esforç
```

## 4. Pla d'Acció Immediat
1. [x] Crear arquitectura de dades estructurades JSON-LD a [`Layout.astro`](file:///c:/Users/User/Desktop/jaumetur.es/src/layouts/Layout.astro).
2. [x] Optimitzar títols, meta descriptions i OpenGraph per pàgina.
3. [x] Crear generador de feed RSS a `src/pages/rss.xml.ts`.
4. [x] Desenvolupar 8 articles tècnics originals i pràctics en català (+ 3 en castellà).
5. [x] Crear eina gratuïta per a desenvolupadors a `/tools/workflow-generator` com a iman d'enllaços.
6. [x] Crear pàgina `/uses` per atraure trànsit i backlinks orgànics.
7. [x] Redactar `CONTENT_PLAN.md`, `DISTRIBUCION.md` i `MEDICION.md`.
