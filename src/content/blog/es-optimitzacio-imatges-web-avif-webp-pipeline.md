---
draft: false
title: "Optimización extrema de imágenes gastronómicas: pipeline a AVIF y WebP sin perder nitidez"
snippet: "Cómo reducir el peso de fotografías de alta resolución de 3 MB a menos de 50 KB manteniendo colores vivos y textura, y evitando el salto de diseño (CLS)."
image: {
    src: "/img/blog/pipeline-imatges-webp-avif-rendiment.webp",
    alt: "Comparativa de compresión de imágenes gastronómicas JPEG frente a WebP y AVIF"
}
publishDate: "2026-04-24 11:00"
category: "Desarrollo web"
author: "Jaume Tur"
tags: [rendimiento-web, webp, avif, core-web-vitals, frontend]
lang: "es"
canonicalUrl: "https://jaumetur.es/blog/es-optimitzacio-imatges-web-avif-webp-pipeline"
---

En un sitio web de restauración, la imagen es el principal argumento de venta. Si la fotografía de una pizza artesanal o de una hamburguesa gourmet se ve borrosa o pixelada por un exceso de compresión, el producto pierde atractivo comercial. Pero si se sube el archivo original directamente desde la cámara (un JPEG de 4 MB), la velocidad de carga se desploma.

La clave técnica está en implementar un pipeline de procesamiento moderno basado en formatos de nueva generación.

---

## 1. La diferencia entre JPEG, WebP y AVIF

* **JPEG:** Estándar heredado de los años 90. Pesado e ineficiente en resoluciones de alta densidad.
* **WebP:** Compatible con el 97% de los navegadores modernos. Consigue reducciones del 30% respecto al JPEG con idéntica calidad visual.
* **AVIF:** Basado en el códec de vídeo AV1. Proporciona una compresión hasta un 50% superior a WebP, conservando degradados sutiles y detalles en las zonas oscuras sin generar artefactos visibles.

---

## 2. Automatización en el proceso de compilación

En lugar de convertir las imágenes a mano con programas de edición, podemos delegar la conversión directamente en nuestro entorno de construcción o mediante el componente nativo de imágenes de Astro:

```astro
---
import { Image } from 'astro:assets';
import fotoPizza from '../assets/pizza-artesana.jpg';
---

<Image alt="Pizza artesana al forn de llenya a Xàtiva" decoding="async" format="avif" height="{400}" loading="lazy" quality="{80}" src="{fotoPizza}" width="{600}"/>
