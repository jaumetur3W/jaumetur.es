---
draft: false
title: "Tarjetas de fidelización en Apple Wallet y Google Wallet para negocios locales sin crear una app"
snippet: "Cómo implementar un sistema de puntos digital con notificaciones por geolocalización (geofencing) y escaneo QR a pie de calle, sin depender de aplicaciones pesadas de terceros."
image: {
    src: "/img/blog/wallet-fidelitzacio-negocis-locals.webp",
    alt: "Tarjeta de fidelización digital en Apple Wallet y Google Wallet para hostelería"
}
publishDate: "2026-03-27 10:00"
category: "Estrategia digital"
author: "Jaume Tur"
tags: [wallet, fidelizacion, apple-wallet, google-wallet, hosteleria, pymes]
lang: "es"
canonicalUrl: "https://jaumetur.es/blog/es-targetes-fidelitzacio-wallet-negocis-locals"
---

Las tarjetas de fidelización de cartón tienen un problema crónico: se pierden, se lavan dentro del bolsillo del pantalón o el cliente se las olvida en casa justo el día que vuelve al local. Por otra parte, obligar a un usuario a descargar una aplicación de 80 MB solo para acumular sellos de pizza o café tiene una tasa de rechazo superior al 90%.

La solución más sencilla y eficiente ya viene instalada en todos los smartphones del mercado: **Apple Wallet** y **Google Wallet**.

---

## 1. Cómo funciona el flujo de fidelización digital

A diferencia de una app nativa, un pase de Wallet (`.pkpass` en iOS o un enlace firmado en Google Wallet) se añade con un solo toque desde un enlace web o un código QR situado en el mostrador.

1. **Alta inmediata:** El usuario entra en la web del restaurante o escanea un cartel, pulsa «Añadir a Wallet» y la tarjeta queda guardada en su teléfono.
2. **Escaneo en caja:** La tarjeta contiene un código QR único por usuario. Al pagar, el camarero escanea el código con un móvil o una tableta del local y suma +1 sello.
3. **Actualización en tiempo real:** La tarjeta se actualiza automáticamente en la pantalla del cliente mediante una notificación *push* silenciosa (*«¡Has sumado 1 sello! Ya tienes 4/10»*).

---

## 2. Geofencing: notificaciones por proximidad al negocio

Una de las ventajas técnicas más potentes de los archivos de Wallet es la inclusión de coordenadas GPS (`locations`):

```json
"locations": [
  {
    "latitude": 38.9889,
    "longitude": -0.5218,
    "relevantText": "¡Estás cerca de la pizzería! Ven a recoger tu pedido."
  }
]
