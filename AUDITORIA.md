# Informe d'Auditoria Tècnica i Pla de Rendiment (jaumetur.es)

Data de diagnòstic: 19 d'octubre de 2026  
Objectiu innegociable: **Rendiment mòbil ≥ 90 (objectiu 95–100)** a Google Lighthouse, LCP < 2.5 s (< 1.8 s objectiu), CLS < 0.05, TBT < 200 ms, consistència visual i d'estil en tota la pàgina.

---

## 1. Estat de la Versió Desplegada vs Entorn Local

- **Comprovació de Branca i Workflow:** La branca `main` està sincronitzada amb `origin/main` (commit `7117f74`). El workflow de GitHub Pages s'executa correctament, però arrossega regressions severes de rendiment introduïdes per dependències pesades i recursos gràfics sense optimitzar.
- **Coherència entre Home i Subpàgines:** S'ha comprovat que components com la paleta ⌘K, la navegació, la paleta d'alt contrast i els badges d'estat estan presents en el layout comú, però pateixen de bloquejos de fil principal (TBT elevat) tant a la portada com al blog i articles.

---

## 2. Resultats de l'Auditoria Inicial (Reports Abans d'Optimitzar)

Dades extretes d'auditories oficials de Google Lighthouse v13.5.0 en mode Mòbil (emulació estàndard Moto G Power, xarxa 4G lenta i CPU x4) i Escriptori contra la compilació de producció (`astro preview`):

| Pàgina | Mode | Rendiment | Accessibilitat | Bones Pràctiques | SEO | LCP | TBT | CLS | Pes Total | Peticions |
|---|---|---|---|---|---|---|---|---|---|---|
| **Inici (/)** | Mòbil | **50** | 96 | 100 | 100 | 7.5 s | 710 ms | 0.000 | 1561.0 KB | 20 |
| **Inici (/)** | Escriptori | **42** | 96 | 100 | 100 | 1.4 s | 1,200 ms | 0.648 | 1561.0 KB | 21 |
| **Blog (/blog)** | Mòbil | **36** | 95 | 100 | 100 | 3.7 s | 2,780 ms | 0.893 | 1370.3 KB | 19 |
| **Blog (/blog)** | Escriptori | **43** | 96 | 100 | 100 | 1.0 s | 1,790 ms | 0.641 | 1576.8 KB | 21 |
| **Article (/blog/...)** | Mòbil | **52** | 96 | 100 | 100 | 7.1 s | 1,140 ms | 0.017 | 1127.8 KB | 16 |
| **Article (/blog/...)** | Escriptori | **42** | 96 | 100 | 100 | 1.3 s | 1,680 ms | 0.755 | 1127.8 KB | 16 |
| **Serveis (/pricing)** | Mòbil | **71** | 94 | 100 | 100 | 2.6 s | 1,440 ms | 0.002 | 734.6 KB | 13 |
| **Serveis (/pricing)** | Escriptori | **47** | 94 | 100 | 100 | 0.6 s | 1,320 ms | 0.641 | 734.6 KB | 13 |
| **Contacte (/contact)** | Mòbil | **64** | 96 | 100 | 100 | 3.7 s | 1,340 ms | 0.001 | 881.9 KB | 14 |
| **Contacte (/contact)** | Escriptori | **46** | 96 | 100 | 100 | 0.8 s | 2,070 ms | 0.642 | 881.9 KB | 14 |
| **Sobre mi (/about)** | Mòbil | **61** | 96 | 100 | 100 | 4.0 s | 1,400 ms | 0.056 | 943.9 KB | 15 |
| **Sobre mi (/about)** | Escriptori | **46** | 96 | 100 | 100 | 0.8 s | 1,310 ms | 0.638 | 943.9 KB | 15 |
| **Qualitat (/qualitat)** | Mòbil | **71** | 93 | 100 | 100 | 2.6 s | 1,410 ms | 0.019 | 730.5 KB | 15 |
| **Qualitat (/qualitat)** | Escriptori | **46** | 94 | 100 | 100 | 1.0 s | 1,440 ms | 0.641 | 730.5 KB | 15 |

---

## 3. Diagnòstic dels Colls d'Ampolla Principals

1. **Dependència de Three.js i bucle WebGL (`three-hero.astro`):**
   - Incorpora més de 500 KB de codi JavaScript al paquet crític.
   - Executa a cada frame de pantalla càlculs de distàncies entre 110 partícules i xarxa de línies, causant caigudes dràstiques de fotogrames i un TBT de fins a 1,200 ms a l'escriptori.
2. **Imatges PNG gegants sense comprimir (`public/img/jt.LOGO-*.png`):**
   - Els arxius de logotip tenen una resolució d'origen de 8,334 x 8,334 px i pesen entre 410 KB i 470 KB cadascun.
   - S'estan descarregant a la barra de navegació i al peu de pàgina per mostrar-se a només 32-56 px, consumint gairebé 1 MB de xarxa per pàgina.
3. **Imatges d'origen extern a Unsplash als articles del blog:**
   - Els 11 articles del blog enllacen imatges a servidors de tercers (`images.unsplash.com`), provocant resolucions DNS externes, negociació TLS addicional i retards de fins a 3.7 s en l'LCP mòbil.
4. **Desviació acumulada de disseny (CLS elevat a l'escriptori ~0.64):**
   - L'intercanvi de fonts web (Bricolage Grotesque) sense pre-càrrega i les regles de transició global provoquen salts de capçalera en renderitzar el text.
5. **Transició universal en CSS (`src/styles/global.css`):**
   - La regla `transition-property: background-color, border-color, color` aplicada de forma indiscriminada a `html, body, header, nav, footer, article, section` força repintats totals a cada mutació del DOM.
6. **Contingut duplicat i mescla d'idiomes:**
   - 3 articles en castellà (`es-arquitectura-...`, etc.) conviuen directament al llistat de `/blog` al costat dels articles en català sense separació formal ni etiquetes `hreflang` dedicades.
7. **Tokens de color desalineats i placeholders exposats:**
   - `<meta name="theme-color" content="#4f46e5">` (índigo forà en lloc del color de marca obsidiana `#090D16`).
   - Metaetiquetes de verificació amb placeholders buits exposats a l'índex.

---

## 4. Pla d'Acció Prioritzat per Impacte

1. **Impacte Crític (Rendiment & TBT):**
   - Eliminar el canvas Three.js de l'Hero i retirar la dependència de `three` del paquet de producció.
   - Convertir el fons de l'Hero a un gradient d'alta precisió en CSS pur, estalviant més de 500 KB de JavaScript.
2. **Impacte Crític (Pes de Xarxa & LCP):**
   - Processar mitjançant `sharp` tots els logos de `public/img` a formats WebP i AVIF ultralleugers (< 10 KB cadascun) amb resolucions ajustades (64px, 128px, 256px).
   - Optimitzar els memojis de suport (`1.png` a `7.png`) a WebP d'alta fidelitat amb mides fixes.
   - Substituir les imatges externes d'Unsplash del blog per il·lustracions SVG o WebP locals alineades amb la identitat de marca.
3. **Impacte Alt (CLS & Estabilitat Visual):**
   - Eliminar la regla de transició universal de `global.css`.
   - Afegir `<link rel="preload">` per a les tipografies i establir `font-display: swap` amb mètriques de reserva precises.
   - Especificar mides de reserva (`width` i `height` explícits) en totes les imatges del blog i components de la pàgina.
4. **Impacte Mitjà (Consistència de Marca & Qualitat):**
   - Unificar el sistema de moviment als tokens: 200 ms per a hover, 400 ms per a reveal, màxim 1 moment destacat per secció.
   - Corregir el `theme-color` a `#090D16` i retirar placeholders innecessaris.
   - Aïllar els articles en castellà amb selecció d'idioma neta i enllaços canònics vàlids.
   - Actualitzar el tauler de `/qualitat` amb les dades auditades reals obtingudes.

