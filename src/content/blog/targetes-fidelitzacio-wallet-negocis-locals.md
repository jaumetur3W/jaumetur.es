---
draft: false
title: "Targetes de Fidelització en Apple Wallet i Google Wallet per a Negocis Locals sense Crear una App"
snippet: "Com implementar un sistema de punts digital amb notificacions per geolocalització (geofencing) i escaneig QR a peu de carrer sense dependre d'apps pesades de tercers."
image: {
    src: "/img/blog/wallet-fidelitzacio-negocis-locals.webp",
    alt: "Targeta de fidelització digital en Apple Wallet i Google Wallet per a hostaleria"
}
publishDate: "2026-03-27 10:00"
category: "Estratègia Digital"
author: "Jaume Tur"
tags: [wallet, fidelitzacio, apple-wallet, google-wallet, hostaleria, pimes]
lang: "ca"
canonicalUrl: "https://jaumetur.es/blog/targetes-fidelitzacio-wallet-negocis-locals"
---

Les targetes de fidelització de cartó tenen un problema crònic: es perden, es renten dins de la butxaca dels pantalons o el client les oblida a casa just el dia que torna al local. D'altra banda, obligar un usuari a descarregar una aplicació de 80 MB només per a acumular segells de pizza o cafè té una taxa de rebuig superior al 90%.

La solució més neta i eficient ja ve instal·lada a tots els smartphones del mercat: **Apple Wallet** i **Google Wallet**.

---

## 1. Com funciona el flux de fidelització digital

A diferència d'una app nativa, un passe de Wallet (`.pkpass` en iOS o un enllaç signat en Google Wallet) s'afig amb un sol toc des d'un enllaç web o un codi QR situat al taulell.

1. **Alta immediata:** L'usuari entra a la web del restaurant o escaneja un cartell, prem "Afegir a Wallet" i la targeta queda desada al seu telèfon.
2. **Escaneig en caixa:** La targeta conté un codi QR únic per usuari. En pagar, el cambrer escaneja el codi amb un mòbil o tauleta del local i suma +1 segell.
3. **Actualització en temps real:** La targeta s'actualitza automàticament a la pantalla del client mitjançant notificació *push* silenciosa (*"Has sumat 1 segell! En portes 4/10"*).

---

## 2. Geofencing: Notificacions per proximitat al negoci

Un dels avantatges tècnics més potents dels fitxers de Wallet és la inclusió de coordenades GPS (`locations`):

```json
"locations": [
  {
    "latitude": 38.9889,
    "longitude": -0.5218,
    "relevantText": "Estàs a prop de la pizzeria! Passa a recollir la teua comanda."
  }
]