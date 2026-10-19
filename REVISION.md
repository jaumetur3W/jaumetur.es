# Informe de Revisió de Direcció d'Art & Assegurament de Qualitat (QA Lead)

> **Auditor:** Design Director & Technical QA Lead  
> **Objectiu:** Avaluació rigorosa de la cartera professional de Jaume Tur ([jaumetur.es](https://jaumetur.es)) des de la perspectiva d'un reclutador tècnic sènior (test dels 60 segons) i inspecció profunda de maquetació, accessibilitat WCAG AA, absència d'emojis Unicode, contrastos i adaptabilitat mòbil (360px a 1440px i 200% zoom).

---

## 1. Test del Reclutador Tècnic (60 Segons en Primera Pantalla)

### Diagnòstic d'Impacte Immediat:
- **Qui és Jaume?** S'identifica de forma clara i directa amb nom, càrrec ("Desenvolupador Frontend & Web Apps"), fotografia contextualitzada (Memoji actiu) i insígnia de disponibilitat immediata en temps real.
- **Què fa i quin és el seu nivell tècnic?** La jerarquia visual comunica immediatament l'especialització: arquitectures reactives amb **Angular**, tipat estricte amb **TypeScript**, rendiment auditable a **60 FPS** i fluxos automatitzats de **CI/CD**.
- **Com contactar-lo?**
  - *Abans de la revisió:* El grup d'accions principals només incloïa "Veure projectes", "Descarregar CV", GitHub i LinkedIn. No hi havia cap acció directa de contacte al primer plec de pantalla (Hero), obligant a buscar a la barra de navegació o fer scroll fins al final.
  - *Solució implementada:* S'ha afegit el botó d'alta conversió **"Contactar"** (`/contact`) directament a la botonera principal del Hero junt amb accés a CV, GitHub, LinkedIn i projectes, garantint conversió en un sol clic.

---

## 2. Matriu dels 15 Problemes Prioritzats per Impacte

| # | Problema Detectat | Severitat | Àrea | Estat |
|---|-------------------|-----------|------|-------|
| 1 | Manca de botó directe de contacte al primer plec del Hero (Impacte Reclutador < 60s) | Crítica | Conversió & UX | **CORREGIT** |
| 2 | Contrast nul per text blanc sobre fons clar (`text-white` sobre `bg-slate-50`) al Blog (`/blog` i `/blog/[slug]`) | Crítica | Disseny & WCAG | **CORREGIT** |
| 3 | Contrast nul als casos d'estudi (`/projectes/[slug]`): títols i metadades heretades de mode fosc | Crítica | Disseny & WCAG | **CORREGIT** |
| 4 | Ruta inexistent `/projectes` que provocava error 404 en navegació directa | Alta | Arquitectura Web | **CORREGIT** |
| 5 | Desbordament horitzontal a mòbils estrets (360px) per tooltip del footer i absència d'`overflow-x-clip` | Alta | Responsive & QA | **CORREGIT** |
| 6 | 97 classes residuals `dark:` que generaven fragilitat d'estils i pes de CSS inútil | Mitjana | Codi & Cleanliness | **CORREGIT** |
| 7 | Estat buit de cerca de blog sense contrast ni botó de restabliment | Mitjana | UX & Microcopy | **CORREGIT** |
| 8 | Accessibilitat del memoji i bafarada reactiva del Hero sense atributs `role="status"` / `aria-live` | Mitjana | Accessibilitat (A11y) | **CORREGIT** |
| 9 | Inconsistència estètica dels botons de filtre i cerca del blog (estil fosc discordant amb la resta) | Mitjana | Direcció d'Art | **CORREGIT** |
| 10 | Disposició i ajust de chips de rol al terminal interactiu per a pantalles de 360px | Mitjana | Mobile Polish | **CORREGIT** |
| 11 | Precarrega intel·ligent d'imatges clau LCP als mockups de navegador dels casos d'estudi | Baixa | Rendiment LCP | *Tasca Pendent* |
| 12 | Automatització de proves de regressió visual mitjançant captures Playwright a CI | Baixa | QA & Testing | *Tasca Pendent* |
| 13 | Fallback fora de línia mitjançant Service Worker lleuger per a mode PWA offline | Baixa | PWA & Resilience | *Tasca Pendent* |
| 14 | Generació dinàmica d'imatges OpenGraph per article de blog i cas d'estudi (SVG/PNG) | Baixa | SEO & Social | *Tasca Pendent* |
| 15 | Connexió de la pàgina `/qualitat` amb balises d'analítica real Core Web Vitals en temps real | Baixa | Telemetria Web | *Tasca Pendent* |

---

## 3. Detall de les 10 Correccions Executades

### 1. Acció de Contacte Directe al Hero (`src/components/hero.astro`)
- **Diagnòstic:** Un reclutador tècnic que visita el lloc web té un temps mitjà d'atenció de menys de 60 segons. La manca d'un botó directe de contacte a la botonera d'acció obligava a cercar al menú.
- **Acció:** S'ha integrat un botó d'acció primari destacat `Contactar` (`/contact`) amb icona Boxicons `bx:envelope`, acompanyat de `CV`, `GitHub`, `LinkedIn` i `Veure projectes`.

### 2. Correcció Integral de Contrast al Blog (`src/pages/blog.astro`)
- **Diagnòstic:** La pàgina `/blog` conservava targetes, filtres de categoria i cercador en colors foscos (`bg-gray-900 border-gray-800 text-white`), trencant per complet la línia de disseny del mode clar permanent.
- **Acció:** S'han reconstruït les targetes a `bg-white border-slate-200/90 text-slate-900`, filtres actius en blau índigo (`bg-indigo-600 text-white`) i cercador accessible amb focus visible.

### 3. Normalització Tipogràfica dels Articles de Blog (`src/pages/blog/[slug].astro`)
- **Diagnòstic:** Els articles individuals tenien encapçalaments `text-white` i la classe `prose-invert`, provocant que el text fóra pràcticament invisible sobre el fons clar `bg-slate-50`.
- **Acció:** S'ha substituït `prose-invert` per `prose prose-slate prose-indigo`, assignant `text-slate-900` als títols principals, `text-slate-600` al cos i adaptant la taula de continguts lateral al disseny clar. El contrast mesurat supera 13:1 (WCAG AAA).

### 4. Correcció de Contrast als Casos d'Estudi (`src/pages/projectes/[slug].astro`)
- **Diagnòstic:** Igual que al blog, el títol H1 del cas d'estudi tenia assignat `text-white`, i la graella de dades tècniques (client, any, rol, mètode de verificació) emprava fons foscos heretats.
- **Acció:** Encapçalaments actualitzats a `text-slate-900`, marcs de navegador i previsualització de dispositiu convertits a targeta blanca amb vora `border-slate-200/90`, i panell de verificació d'honestedat redissenyat en estil transparent i accessible.

### 5. Creació de la Ruta Index de Projectes (`src/pages/projectes/index.astro`)
- **Diagnòstic:** L'accés directe per URL a `/projectes` retornava un error 404 perquè només existia el fitxer dinàmic `[slug].astro`.
- **Acció:** S'ha creat [`src/pages/projectes/index.astro`](file:///c:/Users/User/Desktop/jaumetur.es/src/pages/projectes/index.astro), oferint una galeria bento completa amb els 4 casos d'estudi (AVISA, Pizzeria a Xàtiva, Dashboard de Telemetria i Pipeline CI/CD), mètriques auditades i navegació directe.

### 6. Resolució del Desbordament Horitzontal a Mòbil 360px
- **Diagnòstic:** Les proves automatitzades amb Playwright van detectar `scrollWidth = 367px` en pantalla de 360px a causa del tooltip del footer (`left-1/2 -translate-x-1/2`) que sobresortia pel marge dret. A més, mancava tallar el desbordament decoratiu dels aures difuminats.
- **Acció:** S'ha ajustat la posició del tooltip a [`src/components/footer.astro`](file:///c:/Users/User/Desktop/jaumetur.es/src/components/footer.astro) a `left-0 sm:left-1/2`, i s'ha afegit `overflow-x-clip` tant a `html` com a `body` a [`src/layouts/Layout.astro`](file:///c:/Users/User/Desktop/jaumetur.es/src/layouts/Layout.astro). Test de viewport Playwright passat amb 0 px d'overflow a 360px i 768px.

### 7. Eliminació Completa de 97 Classes Residuals `dark:`
- **Diagnòstic:** Malgrat haver establert el mode clar permanent a la Fase 7, romanien 97 instàncies de classes `dark:*` a components com `command-palette.astro`, `scroll-indicator.astro`, `build-status.astro` i `qualitat.astro`.
- **Acció:** S'han purgat totes les classes residuals, assegurant una càrrega de CSS neta, predictible i sense riscos d'inconsistència o salt de contrast.

### 8. Disseny de l'Estat Buit ("No Results") al Cercador del Blog
- **Diagnòstic:** Quan un usuari cercava una cadena sense coincidències, el missatge era poc visible i no oferia mecanisme de recuperació.
- **Acció:** S'ha integrat una targeta blanca d'alt contrast amb icona `bx:search`, missatge clar en català i botó interactiu "Restablir filtres i cerca" que neteja l'input i torna a la categoria "Tots".

### 9. Accessibilitat per a Lectors de Pantalla a la Bafarada del Hero
- **Diagnòstic:** El canvi dinàmic de rol ("Frontend", "Angular & Signals", "60 FPS", "CI/CD") actualitzava visualment la bafarada del Memoji però no ho notificava a tecnologies d'assistència.
- **Acció:** S'han afegit els atributs semàntics `role="status"` i `aria-live="polite"` al contenidor de la bafarada a [`src/components/hero.astro`](file:///c:/Users/User/Desktop/jaumetur.es/src/components/hero.astro).

### 10. Optimització de la Targeta de Codi Interactiva a 360px
- **Diagnòstic:** En dispositius molt petits o amb zoom gran, els botons de presets de rol i els espaiats del terminal podien quedar atapeïts.
- **Acció:** S'han refinat els marges, la mida de font i la propietat de flex-wrap, assegurant que el codi interactiu es llegeix amb comoditat sense truncaments accidentals.

---

## 4. Tasques Pendents Documentades (Problemes 11 a 15)

- **Tasca 11 — Precarrega selectiva d'imatges LCP als Casos d'Estudi:**
  - *Abast:* Configurar un component d'enllaç `<link rel="preload" as="image" href="..." fetchpriority="high">` a la capçalera de cada pàgina de `/projectes/[slug]` per millorar el temps LCP a xarxes mòbils lentes.
- **Tasca 12 — Automatització de Snapshot Testing Visual a Playwright:**
  - *Abast:* Afegir proves de regressió de píxels (`expect(page).toHaveScreenshot()`) per a 360px, 768px i 1280px dins del pipeline de GitHub Actions per detectar canvis visuals no desitjats abans de fer merge.
- **Tasca 13 — Service Worker per a suport complet Offline PWA:**
  - *Abast:* Generar una estratègia de Service Worker "Network First, falling back to cache" mitjançant Workbox o codi natiu per permetre consultar la targeta digital (`/card`) i els casos d'estudi en absència de connectivitat.
- **Tasca 14 — Generació automàtica de Targetes OpenGraph (Satori / Canvas):**
  - *Abast:* Desenvolupar un endpoint d'Astro que genere targetes OG personalitzades en format PNG amb el títol real de cada article i el monograma JT en comptes d'utilitzar una imatge genèrica compartida.
- **Tasca 15 — Connexió de `/qualitat` amb dades d'Usuaris Reals (RUM):**
  - *Abast:* Incorporar un servei com Web Vitals Reporting per alimentar la taula de Core Web Vitals amb percentils 75 reals procedents de navegadors de visitants, més enllà de les simulacions de laboratori.

---

## 5. Cinc Idees de "Següent Nivell" per a Diferenciar el Portfolio

1. **Laboratori d'Arquitectura Interactiva al Navegador (Angular Signals Playground)**
   - *Concepte:* Incrustar un mini-entorn d'execució interactiu basat en Web Workers o WebContainers directament al cas d'estudi d'AVISA, on un reclutador puga modificar un Signal reactiu i veure com s'actualitza el gràfic en temps real sense instal·lar res.

2. **Assistent Tècnic d'Entrevistes IA (RAG sobre el Codi i Experiència de Jaume)**
   - *Concepte:* Un xatbot interactiu i minimalista entrenat exclusivament amb la documentació del repositori, decisions d'arquitectura, fitxers `BRAND.md`, `PERFORMANCE_REPORT.md` i el CV oficial, capaç de respondre a preguntes tècniques ("Com va resoldre Jaume els problemes de CLS a la Pizzeria?").

3. **Graella de Pipeline GitHub Actions en Viu amb Nodes Animats SVG**
   - *Concepte:* Al cas d'estudi del Pipeline CI/CD, substituir el diagrama estàtic per un graf SVG dinàmic connectat a l'API pública de GitHub Actions que il·lumine els passos d'execució (Lint -> Test -> Build -> Deploy) en temps real segons l'últim push.

4. **Eina d'Auditoria WCAG Accessible en Temps Real a `/tools`**
   - *Concepte:* Ampliar l'apartat d'eines amb un calculador de ràtios de contrast WCAG 2.2 que permeta als visitants introduir dos colors hexadecimals i comprovar conformitat AA/AAA per a text normal, gran i components d'UI.

5. **Commutador d'Idioma sense Runtime (Català / Castellà / Anglès)**
   - *Concepte:* Aprofitant que ja existeixen articles en castellà (`es-*`) i català, implementar rutes estàtiques completes i localitzades (`/ca/`, `/es/`, `/en/`) utilitzant Astro i18n per permetre a reclutadors internacionals llegir els casos d'estudi en anglès.
