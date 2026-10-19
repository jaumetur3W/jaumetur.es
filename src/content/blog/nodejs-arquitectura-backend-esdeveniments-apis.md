---
draft: false
title: "Node.js: Arquitectura Asíncrona, Motor V8 i Disseny d'APIs Escalables"
snippet: "Guia enciclopèdica sobre Node.js: creat el 2009 per Ryan Dahl, per a què serveix, com funciona el model d'I/O no bloquejant amb libuv i la gestió eficient de servidors web."
image: {
    src: "/img/blog/nodejs-arquitectura-backend-esdeveniments-apis.webp",
    alt: "Arquitectura interna de Node.js i libuv"
}
publishDate: "2026-03-24 13:00"
category: "Backend"
author: "Jaume Tur"
tags: [nodejs, backend, javascript, api, v8, async, libuv]
lang: "ca"
canonicalUrl: "https://jaumetur.es/blog/nodejs-arquitectura-backend-esdeveniments-apis"
---

## Què és Node.js?

**Node.js** és un entorn d'execució (*runtime environment*) per a JavaScript multiplataforma i de codi obert que permet executar codi JavaScript fora del navegador web, principalment al costat del servidor (*server-side*).

Construït sobre el motor **V8** de Google Chrome, Node.js utilitza un model d'I/O orientat a esdeveniments (*event-driven*) i no bloquejant (*non-blocking*), la qual cosa el fa extremadament lleuger, ràpid i eficient per a aplicacions distribuïdes que gestionen milers de connexions concurrents amb un consum mínim de memòria RAM.

---

## Quan es va crear i per qui?

* **Any de llançament:** **2009**.
* **Creador:** **Ryan Dahl**.
* **Context històric:** Dahl estava frustrat per com els servidors web tradicionals de l'època (com Apache HTTP Server) gestionaven la concurrència. Cada petició d'usuari requeria assignar un fil del sistema operatiu complet (*thread-per-connection*), consumint 2 MB de memòria per connexió i col·lapsant ràpidament el servidor davant desenes de milers de clients simultanis. Dahl va concebre la idea d'aprofitar l'Event Loop natural de JavaScript per delegar totes les operacions d'entrada/sortida (lectura de disc, consultes a bases de dades, sockets de xarxa) de manera asíncrona a través d'un sol fil principal.
* **Governança:** Actualment és mantingut per la comunitat sota la tutela de la **OpenJS Foundation** (part de la Linux Foundation).

---

## Per a què s'utilitza?

Node.js és una peça fonamental en l'enginyeria de programari contemporània:

1. **APIs RESTful i GraphQL:** Construcció de serveis d'alta concurrència que interactuen amb bases de dades relacionals (PostgreSQL, MySQL) o NoSQL (MongoDB, Redis).
2. **Aplicacions en temps real (WebSockets):** Sistemes de xat, subhastes en viu, taulers col·laboratius i telemetria de sensors IoT.
3. **Backend-for-Frontend (BFF) i SSR:** Servidors per a renderitzar aplicacions en temps real (Server-Side Rendering) en frameworks com Next.js, Nuxt o Astro.
4. **Ecosistema npm i eines de construcció:** Execució del registre de paquets més gran del món (**npm**), utilitzat per a empaquetar, compilar i testejar pràcticament qualsevol aplicació web moderna.
5. **Microserveis i Cloud Functions:** Arquitectures serverless en plataformes com AWS Lambda, Google Cloud Run o Cloudflare Workers.

---

## Arquitectura Tècnica: Com funciona Node.js?

Node.js combina diversos components fonamentals escrits en C++ i JavaScript:

```
+-------------------------------------------------------+
|                   Aplicació Node.js                   |
|                   (Codi JavaScript)                   |
+-------------------------------------------------------+
|           APIs Nadiues (fs, http, crypto, path)       |
+---------------------------+---------------------------+
|      Motor V8 (C++)       |        libuv (C)          |
|  (Compilació & Memòria)   |  (Event Loop & ThreadPool)|
+---------------------------+---------------------------+
|             Sistema Operatiu (Linux / Windows)        |
+-------------------------------------------------------+
```

* **V8 Engine:** Compila el codi JavaScript directament a codi màquina natiu del processador.
* **libuv:** Biblioteca en C dissenyada específicament per a Node.js que implementa l'Event Loop multiplataforma i gestiona un grup de fils interns (*Thread Pool*) per a aquelles operacions del sistema que no poden ser no bloquejants de forma nativa a nivell d'OS (com certes lectures de fitxers al sistema de fitxers).

```javascript
// Exemple de servidor HTTP asíncron amb el mòdul natiu 'node:http'
import http from 'node:http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    status: 'online',
    uptime: process.uptime(),
    plataforma: process.platform
  }));
});

server.listen(3000, () => {
  console.log('Servidor executant-se a http://localhost:3000');
});
```

---

## Avantatges principals

* **Un sol llenguatge a tot l'stack:** Permet als equips utilitzar JavaScript/TypeScript tant al frontend com al backend, compartint models de dades, validacions i lògica de negoci.
* **Baix consum de recursos:** Ideal per a entorns continguts en contenidors Docker i microserveis al núvol.
* **Comunitat massiva:** Milers de biblioteques de codi obert auditades disponibles de forma immediata mitjançant gestors de paquets.

