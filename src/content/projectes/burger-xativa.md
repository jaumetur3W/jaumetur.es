---
draft: false
title: "Burger Xàtiva — Demo de web gastronòmica interactiva"
subtitle: "Plantilla d'una hamburgueseria fictícia amb carta digital, personalitzador de burgers, cistella i experiències de reserva i seguiment completament simulades."
tagline: "Una demo responsive d'Astro que explora un recorregut de comanda gastronòmica, des de la carta fins a un Delivery Tracker d'exemple."
icon: "bx:restaurant"
color: "lime"
role: "Frontend Developer & UI Designer"
year: "2026"
client: "Projecte de demostració · negoci i contingut ficticis"
badge: "Demo interactiva · no rep comandes reals"
statLabel: "Abast funcional"
statValue: "Fluïxos simulats · sense backend"
verificationMethod: "Revisió de la demo publicada i dels textos d'estat de cada flux"
liveUrl: "https://jautur.github.io/burger_xativa/"
stack: ["Astro", "HTML estàtic", "Tailwind CSS", "JavaScript vanilla", "Disseny responsive", "ES / VA"]
order: 3
image: {
  src: "/img/foto_burger.png",
  alt: "Hamburguesa de la demo Burger Xàtiva"
}
---

## Un recorregut de comanda per a una marca fictícia

Burger Xàtiva és una demo de portfolio, no un restaurant en funcionament. La marca, la carta, els preus, les fotografies i les dades locals són de mostra. La pàgina ho identifica com a demo i adverteix que no s'ha d'utilitzar per a fer comandes reals.

El projecte presenta una experiència mòbil per explorar una carta, personalitzar una hamburguesa i recórrer les pantalles habituals d'un negoci gastronòmic.

## Funcionalitats que explora la demo

- **Carta per categories i cistella:** permet afegir productes de mostra i veure el total orientatiu.
- **Personalitzador de burger:** ofereix opcions de punt de la carn i extres amb preu il·lustratiu.
- **Delivery Tracker:** mostra les fases de recepció, preparació i lliurament amb un identificador d'exemple. No consulta cap comanda real ni un servei de repartiment.
- **Reserves i club VIP:** els formularis només presenten una confirmació simulada; no envien ni guarden dades.
- **Fidelització conceptual:** la cistella mostra una recompensa visual en arribar a cinc productes. És una idea de mostra, no un Pizza Pass actiu ni un saldo persistent.
- **Carta QR i idiomes:** inclou una entrada a la carta mitjançant QR i una interfície en castellà i valencià.

## Arquitectura

La pàgina es genera amb Astro com a HTML estàtic, amb estils compilats amb Tailwind CSS i interaccions locals en mòduls de JavaScript vanilla. No hi ha un backend de comandes, reserves, pagaments, seguiment o subscripcions connectat.

## Límits i verificació

He revisat la web publicada i els missatges que mostren els seus fluxos. La mateixa demo avisa que el tracker, les reserves, el club VIP, les ressenyes, els preus, els horaris i la localització són il·lustratius. Per això, aquest cas descriu el prototip i no atribueix resultats comercials ni una puntuació Lighthouse que la pàgina no declara.
