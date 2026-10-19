---
draft: false
title: "HTML5 Semàntic: Estructura, Accessibilitat WCAG i Optimització per a Motors de Cerca"
snippet: "Guia tècnica i estàndard d'HTML5: història del consorci W3C i WHATWG, per a què serveix la semàntica, tags estructurals fonamentals i el seu impacte directe en SEO i lectors de pantalla."
image: {
    src: "/img/blog/html5-semantic-accessibilitat-arquitectura-web.webp",
    alt: "HTML5 semàntic i arbre d'accessibilitat"
}
publishDate: "2026-03-24 12:00"
category: "Web Standards"
author: "Jaume Tur"
tags: [html5, semantica, accessibilitat, seo, web-standards, a11y]
lang: "ca"
canonicalUrl: "https://jaumetur.es/blog/html5-semantic-accessibilitat-arquitectura-web"
---

## Què és l'HTML5 Semàntic?

**HTML5** és la cinquena i actual versió principal de l'HyperText Markup Language (Llenguatge de Marques d'Hipertext), l'estàndard universal que defineix l'estructura i el contingut de qualsevol pàgina a la World Wide Web.

El concepte de **semàntica en HTML** fa referència a l'ús d'etiquetes que aporten significat explícit tant al desenvolupador com al navegador web, als lectors de pantalla per a persones amb discapacitat visual i als rastrejadors de motors de cerca (com Googlebot). En comptes d'estructurar una pàgina exclusivament mitjançant contenidors genèrics i buits de significat com `<div>` i `<span>` (anomenat comunament *div soup*), l'HTML5 semàntic utilitza elements amb un propòsit clar com `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>` i `<footer>`.

---

## Quan es va crear i per qui?

* **Any de creació d'HTML:** **1991**, creat per **Tim Berners-Lee** al CERN (Ginebra, Suïssa).
* **Naixement d'HTML5:** El **2004**, després que el consorci oficial **W3C** decidís abandonar inicialment HTML per centrar-se en XHTML (més rígid i basat en XML), un grup de desenvolupadors i fabricants de navegadors (Apple, Mozilla i Opera) van fundar el **WHATWG** (Web Hypertext Application Technology Working Group) per impulsar un estàndard pragmàtic, tolerant a errors i orientat a aplicacions web riques.
* **Consens i estandardització:** El 2007 el W3C va adoptar el treball del WHATWG com a base per a HTML5. El primer esborrany públic es va publicar el **2008**, i l'especificació es va convertir oficialment en Recomanació del W3C el **28 d'octubre de 2014**.
* **Model actual Living Standard:** Des de 2019, HTML es manté com un estàndard viu (*Living Standard*) sense versions tancades sota l'acord formal entre W3C i WHATWG.

---

## Per a què s'utilitza?

L'HTML5 semàntic és la primera línia de defensa per a la qualitat d'una aplicació web:

1. **Accessibilitat Universal (a11y):** Els lectors de pantalla (NVDA, VoiceOver, JAWS) generen un **Arbre d'Accessibilitat** a partir de l'HTML. Etiquetes com `<button>` (amb suport per defecte de navegació per teclat amb Enter i Espai) o `<main>` (que permet saltar directament al contingut) són vitals per a complir la normativa europea d'accessibilitat **WCAG 2.1 nivell AA**.
2. **SEO i indexació orgànica:** Els motors de cerca entenen la jerarquia d'informació (`<h1>` a `<h6>`), la temàtica d'un contingut (`<article>`) i quines parts són accessòries (`<aside>`, `<footer>`), atorgant major rellevància al contingut principal.
3. **Mantenibilitat del codi:** Un document ben estructurat redueix dràsticament la quantitat de classes CSS auxiliars necessàries i fa que qualsevol membre de l'equip comprengui l'estructura de forma immediata.
4. **Multimèdia natiu:** Integració de vídeo (`<video>`), àudio (`<audio>`) i gràfics vectorials interactius (`<canvas>`, `<svg>`) sense necessitat de connectors propietaris (com l'antic Adobe Flash).

---

## Comparativa d'Arquitectura: Semàntic vs Genèric

```html
<!-- Codi Antic / Genèric (div soup) -->
<div class="header">
  <div class="nav">
    <div class="link" onclick="anarInici()">Inici</div>
  </div>
</div>
<div class="content">
  <div class="post">
    <div class="post-title">El meu article</div>
  </div>
</div>

<!-- Codi Modern HTML5 Semàntic -->
<header>
  <nav aria-label="Navegació principal">
    <a href="/">Inici</a>
  </nav>
</header>
<main id="main-content">
  <article>
    <h1>El meu article</h1>
  </article>
</main>
```

---

## Elements Semàntics Fonamentals i Funcionalitat

| Element HTML5 | Rol Semàntic Natiu | Ús Adequat |
| :--- | :--- | :--- |
| `<header>` | `banner` | Capçalera introductòria d'una pàgina o d'una secció, sovint amb logotip i navegació. |
| `<nav>` | `navigation` | Bloc de navegació que conté enllaços principals a la pàgina o a altres seccions. |
| `<main>` | `main` | El contingut central i exclusiu de la pàgina. Només pot existir un `<main>` per document. |
| `<article>` | `article` | Contingut independent i autocontingut que podria distribuir-se o reutilitzar-se en solitari. |
| `<section>` | `region` | Agrupació temàtica de contingut generalment acompanyada d'un encapçalament (`<h2>`-`<h6>`). |
| `<aside>` | `complementary` | Contingut complementari (barres laterals, taules de continguts, cites relacionades). |
| `<footer>` | `contentinfo` | Peu de pàgina amb informació de drets d'autor, termes legals, enllaços de contacte. |

---

## El nostre compromís amb l'estàndard

A tots els projectes de la nostra cartera, auditem el codi font amb validadors del W3C i eina Lighthouse per garantir que el 100% de la semàntica siga neta, sense dependre de trucs de JavaScript per a la navegació fonamental.

