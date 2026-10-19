---
draft: false
title: "Com Optimitzar el Rendiment Frontend a 60 FPS: Mètriques Core Web Vitals a la Pràctica"
snippet: "Estratègies avançades d'enginyeria per a assolir 60 FPS estables, reduir el LCP a menys d'1 segon, eliminar el Layout Shift (CLS) i dominar la mètrica Interaction to Next Paint (INP)."
image: {
    src: "/img/blog/optimitzacio-core-web-vitals-60fps.webp",
    alt: "Gràfic de telemetria i rendiment d'altes prestacions"
}
publishDate: "2026-03-12 11:30"
category: "Rendiment"
author: "Jaume Tur"
tags: [rendiment, 60fps, core-web-vitals, inp, lcp, cls, optimitzacio, lighthouse]
lang: "ca"
canonicalUrl: "https://jaumetur.es/blog/optimitzacio-core-web-vitals-60fps"
---

A la web moderna, la velocitat no és un detall cosmètic: és una especificació d'enginyeria no negociable. Un retard de 100 mil·lisegons en la resposta d'una interfície destrossa la percepció de fluïdesa, redueix la retenció de l'usuari i penalitza directament el rànquing als motors de cerca de Google.

Aconseguir **60 fotogrames per segon (FPS)** constants significa que el navegador disposa de només **16,6 mil·lisegons** per a processar JavaScript, recalcular estils (Recalculate Style), disposar la geometria (Layout) i pintar els píxels a la pantalla (Paint & Composite).

En aquesta guia pràctica analitzem com diagnostiquem colls d'ampolla a Chrome DevTools i quines tècniques apliquem en producció per a mantenir les mètriques **Core Web Vitals** (LCP, CLS, INP) en un verd rotund.

---

## 1. La Trinitat de Google: LCP, CLS i el nou INP

Google avalua l'experiència real de l'usuari a través de tres mètriques fonamentals:

1. **Largest Contentful Paint (LCP):** Mesura el temps de càrrega del bloc de contingut més gran visible a la pantalla (hero image o titular principal). Objectiu excel·lent: **< 2.5 segons** (nosaltres apuntem a < 1.0 s).
2. **Cumulative Layout Shift (CLS):** Mesura l'estabilitat visual: si els elements es mouen mentre la pàgina es carrega, l'experiència és frustrant. Objectiu excel·lent: **< 0.1** (idealment **0.00**).
3. **Interaction to Next Paint (INP):** La mètrica que ha substituït FID (First Input Delay). Mesura la latència de totes les interaccions de l'usuari (clics, tecles, taps) al llarg de tota la sessió. Objectiu excel·lent: **< 200 ms** (recomanat **< 50 ms** per a sentir-se instantani).

```
   0ms                 50ms                200ms               500ms
    ├───────────────────┼───────────────────┼───────────────────┤
    │  Fluïdesa Total   │     Acceptable    │     Lent / Lag    │
    │   (Ideal 60fps)   │    (Límit verd)   │  (Penalitzat GSC) │
```

---

## 2. Reduir el LCP: Priorització del camí crític de renderitzat

El motiu principal pel qual el LCP falla sol ser la descàrrega tardana de recursos crítics. Si la imatge principal del teu Hero depén d'un fitxer CSS extern o d'un paquet de JavaScript que s'ha d'interpretar primer, el navegador no començarà a descarregar-la fins massa tard.

### Solució: Preload i dimensions explícites

```html
<!-- Dins del <head> de la pàgina -->
<link rel="preload" as="image" href="/hero-cover.webp" type="image/webp" fetchpriority="high" />

<!-- Al component HTML -->
<img
  src="/hero-cover.webp"
  alt="Panell de control de telemetria"
  width="1200"
  height="630"
  loading="eager"
  decoding="async"
  class="w-full h-auto object-cover"
/>
```

<div class="callout callout-note">
  <strong>Clau d'enginyeria:</strong> No utilitzes mai <code>loading="lazy"</code> a la imatge del LCP. El lazy loading retarda la prioritat de xarxa de la imatge fins que el navegador executa el càlcul de geometria del viewport, retardant el LCP en centenars de mil·lisegons.
</div>

---

## 3. Com eliminar el CLS completament

El Cumulative Layout Shift es produeix gairebé sempre per dues causes:
- Imatges o anuncis sense amplada (`width`) i alçària (`height`) definides al markup.
- Tipografies web que provoquen FOIT (Flash of Invisible Text) o FOUT (Flash of Unstyled Text) canviant la grandària del text quan la font personalitzada acaba de descarregar.

### Prevenció de layout shifts per fonts amb `font-display: swap` i mides de reserva:

```css
@font-face {
  font-family: 'Inter Variable';
  src: url('/fonts/InterVariable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap; /* Mostra text immediatament amb la font del sistema */
}

/* Reserva d'espai per a evitar salt d'elements en carregar imatges */
.card-media-wrapper {
  aspect-ratio: 16 / 9;
  background-color: #111827;
  overflow: hidden;
}
```

---

## 4. Domar el INP: Fragmentar tasques llargues a la CPU

La principal causa d'un INP deficient és el **Long Task**: qualsevol execució de JavaScript que bloqueja el fil principal (*main thread*) del navegador durant més de **50 ms**.

Si un usuari fa clic en un botó mentre s'està executant un bucle pesat o un filtrat de 10.000 elements, el navegador no pot processar el clic ni redibuixar la pantalla fins que el fil principal queda lliure.

### La tècnica: Ceder el control amb `scheduler.yield()` o `setTimeout`

Si has de processar una col·lecció gran de dades a la interfície, fragmenta el treball en micro-blocs perquè el navegador puga intercalar el renderitzat dels clics de l'usuari:

```typescript
// Utilitat per a alliberar el fil principal
async function yieldToMain(): Promise<void> {
  if ('scheduler' in window && 'yield' in (window as any).scheduler) {
    return await (window as any).scheduler.yield();
  }
  return new Promise((resolve) => setTimeout(resolve, 0));
}

// Processament de dades d'alta concurrència sense bloquejar la interfície
async function processarTelemetriaEnBatches(registres: TelemetriaItem[]): Promise<void> {
  const BATCH_SIZE = 500;
  
  for (let i = 0; i < registres.length; i += BATCH_SIZE) {
    const lot = registres.slice(i, i + BATCH_SIZE);
    lot.forEach((item) => actualitzarNode(item));

    // Cedeix el control al navegador cada 500 elements per a garantir 60 FPS
    await yieldToMain();
  }
}
```

---

## 5. CSS Containment i Hardware Acceleration

Quan tenim components amb moltes targetes interactives o animacions (com els nostres panells de telemetria o les llistes de projectes), hem d'ajudar el motor del navegador a aïllar els càlculs geomètrics utilitzant la propietat `contain`:

```css
.telemetria-card {
  /* Comunica al navegador que els canvis interns no afecten la resta del document */
  contain: layout paint;
  will-change: transform;
  transform: translateZ(0); /* Força capa de composició a la GPU */
}
```

<div class="callout callout-warning">
  <strong>No abuses de <code>will-change</code>:</strong> Forçar massa capes de renderitzat a la targeta gràfica (VRAM) pot saturar la memòria de dispositius mòbils de gamma baixa. Aplica <code>will-change: transform</code> només en elements que realment executen animacions continuades.
</div>

---

## 6. Llistes infinites amb Virtual Scrolling

En lloc d'injectar 2.000 nodes al DOM (el que destrossa la memòria i dispara el temps de Garbage Collection), utilitzem **Virtual Scrolling**. Només es renderitzen els elements visibles a la finestra d'inspecció més un xicotet marge de seguretat (buffer):

En Angular CDK:
```html
<cdk-virtual-scroll-viewport itemSize="64" class="telemetria-viewport">
  <div *cdkVirtualItem="let item of itemsSignal()" class="telemetria-row">
    <span>{{ item.timestamp }}</span>
    <span>{{ item.servidor }}</span>
    <span class="status-pill">{{ item.latencia }}ms</span>
  </div>
</cdk-virtual-scroll-viewport>
```

Aquesta tècnica manté el recompte de nodes del DOM per sota de 100 en tot moment, garantint un desplaçament fluid a 60 FPS fins i tot amb centenars de milers de registres.

---

## Resultats d'Auditoria

Aplicant aquesta metodologia rigorosa hem aconseguit puntuacions consistents a **Google PageSpeed Insights**:
- **Rendiment:** 100/100
- **Accessibilitat:** 100/100
- **Bones pràctiques:** 100/100
- **SEO:** 100/100
- **LCP:** 0.8s | **CLS:** 0.00 | **INP:** < 28ms

El rendiment no és un accident: és el resultat directe d'un disseny conscient i una execució tècnica impecable. Si necessites una auditoria de Core Web Vitals per a la teua plataforma, [parlem](/contact).

