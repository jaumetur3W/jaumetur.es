---
draft: false
title: "Com Construir un Portfolio d'Enginyeria Frontend que Destaque: Decisions de Disseny i Codi"
snippet: "Què busquen realment els Lead Engineers i clients tècnics: arquitectura real, casos d'estudi amb mètriques, rendiment a 60 FPS, accessibilitat i integració de personalitat visual."
image: {
    src: "/img/blog/com-crear-un-portfolio-denginyeria-frontend.webp",
    alt: "Escriptori d'un enginyer de programari i disseny de portfolio"
}
publishDate: "2026-03-24 10:30"
category: "Carrera"
author: "Jaume Tur"
tags: [portfolio, enginyeria-frontend, disseny-ui, astro, carrera, clean-code]
lang: "ca"
canonicalUrl: "https://jaumetur.es/blog/com-crear-un-portfolio-denginyeria-frontend"
---

Si fas una cerca ràpida a GitHub o Twitter de portfolios de desenvolupadors web, trobaràs centenars de llocs gairebé idèntics: la mateixa plantilla clonada, les típiques barres de progrés que diuen "HTML: 90%, JavaScript: 80%" (què significa exactament dominar el 80% d'un llenguatge?), i tres projectes que són clons d'una llista de tasques (*Todo App*), una aplicació del temps i una botiga fictícia amb dades en memòria.

Aquests portfolios no demostren res. No mostren com resols problemes reals, com prens decisions d'arquitectura, ni com et comportes davant d'incidències en producció.

Quan vaig redissenyar `jaumetur.es`, l'objectiu va ser clar: **construir un portfolio que no semble un aparador buit, sinó una peça d'enginyeria de programari en si mateixa**.

En aquest article detalle les decisions estratègiques de disseny, codi i contingut que marquen la diferència entre passar desapercebut o rebre ofertes de projectes i contractacions d'alt nivell.

---

## 1. El Contingut: Casos d'Estudi vs Simples Captures de Pantalla

Un enginyer sènior o un client corporatiu no contracta perquè una imatge es veja bonica; contracta per **la teua capacitat de pensar, estructurar i executar solucions tècniques**.

En lloc de posar només una captura amb un enllaç al repositori, cada projecte principal ha de respondre a una estructura de cas d'estudi:
1. **El Context i el Problema de Negoci:** Quin repte existia abans d'escriure una sola línia de codi? (ex: a AVISA, la lentitud en la coordinació d'emergències urbanes).
2. **L'Arquitectura Tècnica:** Per què vas triar aquesta tecnologia i quines alternatives vas descartar?
3. **Els Colls d'Ampolla Superats:** Quina dificultat imprevista va sorgir i com la vas solucionar? (ex: reducció de fuites de memòria en mapes, eliminació de requetes innecessàries).
4. **Mètriques Reals:** Què va aconseguir el projecte un cop en producció? (ex: 60 FPS estables, reducció del 40% en temps de càrrega, 100/100 a Lighthouse).

---

## 2. La Tria de la Pila Tecnològica: Zero JavaScript Innecessari

Un dels errors més comuns és utilitzar una Single Page Application completa (com Create React App o un bundle pesat) per a un lloc web que bàsicament és contingut estàtic i articles.

Per a aquest portfolio vaig escollir **Astro 5+** i **Tailwind CSS v4**:
- **Astro Island Architecture:** Envia zero JavaScript per defecte al client. Només s'activa JavaScript en els components interactius que realment ho necessiten (com el generador de workflows o el filtre del blog).
- **Compilació estàtica ultraràpida:** El lloc sencer es compila en menys de 2 segons i es distribueix a través d'una CDN global (GitHub Pages / Cloudflare).
- **Rendiment natiu:** Permet obtenir 100 punts en les quatre categories de Google Lighthouse de manera coherent i sense trucs bruts.

---

## 3. Disseny Visual: Personalitat sense Perdre Rigor Tècnic

Un portfolio tècnic no ha de ser avorrit o gris com un document de Word dels anys 90, però tampoc ha de semblar un parc d'atraccions ple d'animacions lentes que distraguen de la lectura.

Vam aplicar tres regles visuals:
- **Tema fosc d'enginyeria (*Engineering Dark Palette*):** Fons en `#030712`, superfícies en `#0b0f19` i vores en `#1f2937` que recorden els terminals de desenvolupament moderns.
- **Integració d'Iconografia Tècnica Estandarditzada:** En lloc d'adorns buits, cadascun s'integra com a icona funcional d'enginyeria (Angular, Rendiment 60 FPS, CI/CD).
- **Memojis 3D amb Propòsit:** Els memojis actuen com a amfitrions visuals: asomen per darrere de les targetes de projectes o sostenen la insígnia de la secció, aportant proximitat humana a un lloc d'alta densitat tècnica.

---

## 4. Oferir Eines Gratuïtes i Valuoses

La millor manera de demostrar competència és crear utilitats que la mateixa comunitat de desenvolupadors utilitze en el seu dia a dia.

En el nostre cas, vam crear el [/tools/workflow-generator](/tools/workflow-generator): una eina que permet configurar fitxers de GitHub Actions per a Astro, Angular i React en un sol clic. Açò no només genera trànsit orgànic i mencions en xarxes socials, sinó que és una prova viva que saps construir interfícies interactives útils.

---

## 5. El teu Ecosistema Complet: /uses i RSS

Un desenvolupador professional és transparent amb el seu flux de treball:
- La pàgina **/uses** (`/uses`) documenta el maquinari, el programari, les extensions de VS Code i les eines de terminal que utilitzes diàriament.
- El canal **/rss.xml** permet que la comunitat més tècnica seguisca els teus articles des del seu lector de feeds favorit sense dependre d'algorismes de xarxes socials.

---

## Conclusió

El teu portfolio és el projecte més important de la teua carrera: és el que treballa per tu les 24 hores del dia, els 7 dies de la setmana. Tracta'l amb la mateixa exigència, arquitectura i rigor que aplicaries a l'aplicació més crítica del teu client més gran.

Vols millorar la presència digital del teu projecte o necessites suport en desenvolupament frontend? [Contacta amb mi](/contact).

