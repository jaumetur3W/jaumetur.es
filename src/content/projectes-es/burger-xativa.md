---
draft: false
title: "Burger Xàtiva — Demo de web gastronómica interactiva"
subtitle: "Plantilla de una hamburguesería ficticia con carta digital, personalizador de hamburguesas, cesta y experiencias de reserva y seguimiento completamente simuladas."
tagline: "Una demo responsive de Astro que explora un recorrido de pedido gastronómico, desde la carta hasta un Delivery Tracker de ejemplo."
icon: "bx:restaurant"
color: "lime"
role: "Desarrollo frontend y diseño de interfaz"
year: "2026"
client: "Proyecto de demostración · negocio y contenido ficticios"
badge: "Demo interactiva · no recibe pedidos reales"
statLabel: "Alcance funcional"
statValue: "Flujos simulados · sin backend"
verificationMethod: "Revisión de la demo publicada y de los textos de estado de cada flujo"
liveUrl: "https://jaumetur3w.github.io/burger_xativa/"
stack: ["Astro", "HTML estàtic", "Tailwind CSS", "JavaScript vanilla", "Disseny responsive", "ES / VA"]
order: 3
image: {
  src: "/img/foto_burger.png",
  alt: "Hamburguesa de la demo Burger Xàtiva"
}
---

## Un recorrido de pedido para una marca ficticia

Burger Xàtiva es una demo de portfolio, no un restaurante en funcionamiento. La marca, la carta, los precios, las fotografías y los datos locales son de muestra. La página la identifica como demo y advierte que no debe utilizarse para hacer pedidos reales.

El proyecto presenta una experiencia móvil para explorar una carta, personalizar una hamburguesa y recorrer las pantallas habituales de un negocio gastronómico.

## Funcionalidades que explora la demo

- **Carta por categorías y cesta:** permite añadir productos de muestra y ver el total orientativo.
- **Personalizador de hamburguesas:** ofrece opciones del punto de cocción de la carne y extras con precio ilustrativo.
- **Delivery Tracker:** muestra las fases de recepción, preparación y entrega con un identificador de ejemplo. No consulta ningún pedido real ni servicio de reparto.
- **Reservas y club VIP:** los formularios solo muestran una confirmación simulada; no envían ni guardan datos.
- **Fidelización conceptual:** la cesta muestra una recompensa visual al alcanzar cinco productos. Es una idea de muestra, no un Pizza Pass activo ni un saldo persistente.
- **Carta QR e idiomas:** incluye un acceso a la carta mediante QR y una interfaz en castellano y valenciano.

## Arquitectura

La página se genera con Astro como HTML estático, con estilos compilados con Tailwind CSS e interacciones locales en módulos de JavaScript vanilla. No hay ningún backend conectado para pedidos, reservas, pagos, seguimiento o suscripciones.

## Límites y verificación

He revisado la web publicada y los mensajes que muestran sus flujos. La propia demo avisa de que el tracker, las reservas, el club VIP, las reseñas, los precios, los horarios y la ubicación son ilustrativos. Por eso, este caso describe el prototipo y no atribuye resultados comerciales ni una puntuación Lighthouse que la página no declara.
