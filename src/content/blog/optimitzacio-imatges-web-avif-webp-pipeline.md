---
draft: false
title: "Optimització Extrema d'Imatges Gastronòmiques: Pipeline a AVIF i WebP sense Pèrdua de Nitidesa"
snippet: "Com reduir el pes de fotografies d'alta resolució de 3 MB a menys de 50 KB mantenint colors vius, textura i evitant el salt de disseny (CLS)."
image: {
    src: "/img/blog/pipeline-imatges-webp-avif-rendiment.webp",
    alt: "Comparativa de compressió d'imatges gastronòmiques JPEG enfront de WebP i AVIF"
}
publishDate: "2026-04-24 11:00"
category: "Desenvolupament Web"
author: "Jaume Tur"
tags: [rendiment-web, webp, avif, core-web-vitals, frontend]
lang: "ca"
canonicalUrl: "https://jaumetur.es/blog/optimitzacio-imatges-web-avif-webp-pipeline"
---

En un lloc web de restauració, la imatge és el principal argument de venda. Si la fotografia d'una pizza artesana o d'una hamburguesa gourmet es veu borrosa o pixelada per excés de compressió, el producte perd atractiu comercial. Però si es puja el fitxer original directament de la càmera (un JPEG de 4 MB), la velocitat de càrrega es desploma.

La clau tècnica està en implementar un pipeline de processament modern basat en formats de nova generació.

---

## 1. La diferència entre JPEG, WebP i AVIF

* **JPEG:** Estàndard heretat dels anys 90. Pesat i ineficient en resolucions d'alta densitat.
* **WebP:** Compatible amb el 97% dels navegadors moderns. Aconsegueix reduccions del 30% respecte al JPEG amb idèntica qualitat visual.
* **AVIF:** Basat en el còdec de vídeo AV1. Proporciona una compressió fins a un 50% superior a WebP, conservant gradients subtils i detalls a les zones fosques sense generar artefactes visibles.

---

## 2. Automatització en el procés de compilació

En lloc de convertir les imatges a mà amb programes d'edició, podem delegar la conversió directament al nostre entorn de construcció o mitjançant el component natiu d'imatge a Astro:

```astro
---
import { Image } from 'astro:assets';
import fotoPizza from '../assets/pizza-artesana.jpg';
---

<Image alt="Pizza artesana al forn de llenya a Xàtiva" decoding="async" format="avif" height="{400}" loading="lazy" quality="{80}" src="{fotoPizza}" width="{600}"/>