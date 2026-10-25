---
draft: false
title: "Cómo optimizar el rendimiento frontend a 60 FPS: métricas Core Web Vitals en la práctica"
snippet: "Estrategias avanzadas de ingeniería para alcanzar 60 FPS estables, reducir el LCP a menos de 1 segundo, eliminar el Layout Shift (CLS) y dominar la métrica Interaction to Next Paint (INP)."
image: {
    src: "/img/blog/es-optimitzacio-core-web-vitals-60fps.webp",
    alt: "Gráfico de telemetría y rendimiento de altas prestaciones"
}
publishDate: "2026-03-12 11:30"
category: "Rendimiento"
author: "Jaume Tur"
tags: [rendimiento, 60fps, core-web-vitals, inp, lcp, cls, optimizacion, lighthouse]
lang: "es"
canonicalUrl: "https://jaumetur.es/blog/es-optimitzacio-core-web-vitals-60fps"
---

En la web moderna, la velocidad no es un detalle cosmético: es una especificación de ingeniería innegociable. Un retraso de 100 milisegundos en la respuesta de una interfaz destruye la percepción de fluidez, reduce la retención de los usuarios y penaliza directamente el posicionamiento en los motores de búsqueda de Google.

Conseguir **60 fotogramas por segundo (FPS)** constantes significa que el navegador dispone de solo **16,6 milisegundos** para procesar JavaScript, recalcular estilos (Recalculate Style), calcular la geometría (Layout) y pintar los píxeles en la pantalla (Paint & Composite).

En esta guía práctica analizamos cómo diagnosticamos cuellos de botella con Chrome DevTools y qué técnicas aplicamos en producción para mantener las métricas **Core Web Vitals** (LCP, CLS, INP) claramente en verde.

---

## 1. La Trinidad de Google: LCP, CLS y el nuevo INP

Google evalúa la experiencia real del usuario mediante tres métricas fundamentales:

1. **Largest Contentful Paint (LCP):** Mide el tiempo de carga del bloque de contenido más grande visible en la pantalla (imagen principal o titular). Objetivo excelente: **< 2.5 segundos** (nosotros apuntamos a < 1.0 s).
2. **Cumulative Layout Shift (CLS):** Mide la estabilidad visual: si los elementos se mueven mientras se carga la página, la experiencia resulta frustrante. Objetivo excelente: **< 0.1** (idealmente **0.00**).
3. **Interaction to Next Paint (INP):** La métrica que ha sustituido a FID (First Input Delay). Mide la latencia de todas las interacciones del usuario (clics, teclas, toques) a lo largo de toda la sesión. Objetivo excelente: **< 200 ms** (se recomienda **< 50 ms** para que la respuesta parezca instantánea).

```
   0ms                 50ms                200ms               500ms
    ├───────────────────┼───────────────────┼───────────────────┤
    │  Fluidez total    │     Aceptable     │     Lento / Lag   │
    │   (Ideal 60fps)   │   (Límite verde)  │ (Penalizado GSC)  │
```

---

## 2. Reducir el LCP: priorizar la ruta crítica de renderizado

La razón principal por la que falla el LCP suele ser la descarga tardía de recursos críticos. Si la imagen principal de tu Hero depende de un archivo CSS externo o de un paquete de JavaScript que debe interpretarse primero, el navegador no empezará a descargarla hasta demasiado tarde.

### Solución: preload y dimensiones explícitas

```html
<!-- Dentro del <head> de la página -->
<link rel="preload" as="image" href="/hero-cover.webp" type="image/webp" fetchpriority="high" />

<!-- En el componente HTML -->
<img
  src="/hero-cover.webp"
  alt="Panel de control de telemetría"
  width="1200"
  height="630"
  loading="eager"
  decoding="async"
  class="w-full h-auto object-cover"
/>
```

<div class="callout callout-note">
  <strong>Clave de ingeniería:</strong> No utilices nunca <code>loading="lazy"</code> en la imagen del LCP. La carga diferida retrasa la prioridad de red de la imagen hasta que el navegador calcula la geometría del viewport, lo que retrasa el LCP cientos de milisegundos.
</div>

---

## 3. Cómo eliminar por completo el CLS

El Cumulative Layout Shift se produce casi siempre por dos causas:
- Imágenes o anuncios sin anchura (`width`) y altura (`height`) definidas en el marcado.
- Fuentes web que provocan FOIT (Flash of Invisible Text) o FOUT (Flash of Unstyled Text) y cambian el tamaño del texto cuando termina de descargarse la fuente personalizada.

### Prevención de cambios de diseño por fuentes con `font-display: swap` y tamaños de reserva:

```css
@font-face {
  font-family: 'Inter Variable';
  src: url('/fonts/InterVariable.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap; /* Muestra el texto de inmediato con la fuente del sistema */
}

/* Reserva espacio para evitar saltos al cargar imágenes */
.card-media-wrapper {
  aspect-ratio: 16 / 9;
  background-color: #111827;
  overflow: hidden;
}
```

---

## 4. Domar el INP: dividir las tareas largas de la CPU

La principal causa de un INP deficiente es la **Long Task**: cualquier ejecución de JavaScript que bloquea el hilo principal (*main thread*) del navegador durante más de **50 ms**.

Si un usuario hace clic en un botón mientras se ejecuta un bucle pesado o se filtran 10.000 elementos, el navegador no puede procesar el clic ni volver a dibujar la pantalla hasta que el hilo principal quede libre.

### La técnica: ceder el control con `scheduler.yield()` o `setTimeout`

Si tienes que procesar una gran colección de datos en la interfaz, divide el trabajo en microbloques para que el navegador pueda intercalar el renderizado con los clics del usuario:

```typescript
// Utilidad para liberar el hilo principal
async function yieldToMain(): Promise<void> {
  if ('scheduler' in window && 'yield' in (window as any).scheduler) {
    return await (window as any).scheduler.yield();
  }
  return new Promise((resolve) => setTimeout(resolve, 0));
}

// Procesamiento de datos de alta concurrencia sin bloquear la interfaz
async function processarTelemetriaEnBatches(registres: TelemetriaItem[]): Promise<void> {
  const BATCH_SIZE = 500;
  
  for (let i = 0; i < registres.length; i += BATCH_SIZE) {
    const lot = registres.slice(i, i + BATCH_SIZE);
    lot.forEach((item) => actualitzarNode(item));

    // Cede el control al navegador cada 500 elementos para garantizar 60 FPS
    await yieldToMain();
  }
}
```

---

## 5. CSS Containment y aceleración por hardware

Cuando tenemos componentes con muchas tarjetas interactivas o animaciones (como nuestros paneles de telemetría o las listas de proyectos), debemos ayudar al motor del navegador a aislar los cálculos geométricos utilizando la propiedad `contain`:

```css
.telemetria-card {
  /* Comunica al navegador que los cambios internos no afectan al resto del documento */
  contain: layout paint;
  will-change: transform;
  transform: translateZ(0); /* Fuerza una capa de composición en la GPU */
}
```

<div class="callout callout-warning">
  <strong>No abuses de <code>will-change</code>:</strong> Forzar demasiadas capas de renderizado en la tarjeta gráfica (VRAM) puede saturar la memoria de los dispositivos móviles de gama baja. Aplica <code>will-change: transform</code> solo a los elementos que realmente ejecuten animaciones continuas.
</div>

---

## 6. Listas infinitas con Virtual Scrolling

En lugar de inyectar 2.000 nodos en el DOM (lo que destroza la memoria y dispara el tiempo de Garbage Collection), utilizamos **Virtual Scrolling**. Solo se renderizan los elementos visibles en la ventana de inspección, más un pequeño margen de seguridad (buffer):

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

Esta técnica mantiene el recuento de nodos del DOM por debajo de 100 en todo momento, garantizando un desplazamiento fluido a 60 FPS incluso con cientos de miles de registros.

---

## Resultados de auditoría

Al aplicar esta metodología rigurosa hemos conseguido puntuaciones constantes en **Google PageSpeed Insights**:
- **Rendimiento:** 100/100
- **Accesibilidad:** 100/100
- **Buenas prácticas:** 100/100
- **SEO:** 100/100
- **LCP:** 0.8s | **CLS:** 0.00 | **INP:** < 28ms

El rendimiento no es fruto del azar: es el resultado directo de un diseño consciente y una ejecución técnica impecable. Si necesitas una auditoría de Core Web Vitals para tu plataforma, [hablemos](/contact).
