---
draft: false
title: "Cas d'Estudi Pizzeria a Xàtiva: Disseny UI/UX, Rendiment i SEO Local per a Hostaleria"
snippet: "Com vam transformar la presència digital d'un restaurant tradicional a La Costera: arquitectura web lleugera, menú interactiu sense fricció, schema Restaurant i posicionament a Google Maps."
image: {
    src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?fit=crop&w=1200&h=630",
    alt: "Pizzeria artesana i disseny web gastronòmic a Xàtiva"
}
publishDate: "2026-03-20 11:00"
category: "Cas d'estudi"
author: "Jaume Tur"
tags: [cas-estudi, seo-local, xativa, valencia, ui-ux, rendiment, hostaleria]
lang: "ca"
canonicalUrl: "https://jaumetur.es/blog/seo-local-i-rendiment-pizzeria-xativa"
---

En el sector de l'hostaleria i la restauració, el lloc web d'un negoci sol ser la primera impressió que rep un client potencial un divendres a la nit quan busca des del mòbil on sopar.

No obstant això, la majoria de llocs web de restaurants pateixen dels mateixos greus defectes:
- Menús en format PDF pesats de 15 MB que triguen minuts a descarregar-se amb cobertura mòbil 4G.
- Llocs lents construïts sobre plantilles inflades de WordPress amb desenes de plugins innecessaris.
- Absència total de dades estructurades (`Restaurant` / `Menu`), impedint que Google mostre els preus o l'horari d'obertura a la fitxa de Google Maps.

Per al projecte **Pizzeria a Xàtiva**, vam abordar el desenvolupament des d'una perspectiva d'enginyeria frontend i disseny de producte pur: **velocitat instantània, menú digital interactiu i SEO local d'alt impacte a la comarca de La Costera**.

---

## 1. El Disseny UI/UX: Menú Visual i Zero Fricció

El 85% del trànsit d'un restaurant arriba a través de dispositius mòbils. L'usuari sol tenir gana, pressa o està decidint en grup.

Vam aplicar tres regles d'or en el disseny:
1. **Accés al menú en 1 sol toc:** El botó "Veure Carta" és el centre d'atenció del Hero, sense popups molestos de cookies invasives ni anuncis.
2. **Filtratge instantani per al·lèrgens:** Permetre a persones celíaques o vegetarianes filtrar la carta en temps real sense recarregar la pàgina.
3. **Reserva i comanda directa:** Connexió amb un sol clic cap a trucada telefònica directa i WhatsApp Business, reduint els passos necessaris per a tancar la comanda.

---

## 2. Rendiment Extrem: De 15MB de PDF a 85KB d'HTML/CSS

En lloc d'obligar l'usuari a obrir un visor de documents PDF, vam construir el menú amb components web estàtics ultralleugers utilitzant **Astro** i **Tailwind CSS**.

- Totes les fotografies gastronòmiques es van convertir automàticament a format **WebP** i **AVIF**, amb compressió òptima que redueix el pes mitjà de cada imatge de 2.5 MB a només 45 KB.
- El paquet complet de JavaScript necessari per a la interactivitat del filtre és de només **2.3 KB**, el que permet una càrrega en menys de **0.6 segons** fins i tot amb connexions mòbils lentes.

---

## 3. SEO Local i Dades Estructurades (Schema.org)

Per a dominar les cerques locals com *"pizzeria a Xàtiva"*, *"millor pizza artesana Xàtiva"* o *"sopar a Xàtiva"*, vam integrar l'esquema complet de `Restaurant` i `Menu` en format **JSON-LD**:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Pizzeria a Xàtiva",
  "image": "https://jaumetur.es/pizzeria-cover.webp",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Carrer Major",
    "addressLocality": "Xàtiva",
    "addressRegion": "València",
    "postalCode": "46800",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 38.9889,
    "longitude": -0.5218
  },
  "telephone": "+34960000000",
  "servesCuisine": ["Italiana", "Pizza artesana"],
  "priceRange": "€€",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "19:30",
      "closes": "23:45"
    }
  ]
}
</script>
```

Gràcies a aquest marcatge semàntic, Google pot mostrar l'estat d'obertura ("Obert ara"), el rang de preus i la valoració directament en el fragment enriquit (*rich snippet*) dels resultats de cerca.

---

## 4. Resultats Comercials

Després del llançament de la nova plataforma web:
- **Posició #1 a Google Maps i cerca orgànica** per a les principals consultes gastronòmiques a Xàtiva.
- **Increment del 42% en trucades de reserva** procedents directament del botó flotant del lloc web.
- **100/100 en Google Lighthouse** en rendiment, SEO i bones pràctiques mòbils.

Aquest cas demostra que un bon desenvolupament web no és un despesa, sinó el millor comercial que pot tenir un negoci local a peu de carrer.

Tens un negoci a la Comunitat Valenciana i vols renovar la teua imatge digital per a atraure més clients? [Posa't en contacte amb mi](/contact).

