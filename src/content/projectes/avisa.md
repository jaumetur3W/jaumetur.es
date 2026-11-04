---
draft: false
title: "AVISA — Plataforma de Serveis Professionals, Tasques i Reformes"
subtitle: "Aplicació web i PWA amb Angular 18 per connectar clients i comunitats amb professionals verificats de reformes, instal·lacions i manteniment."
tagline: "Plataforma digital per publicar incidències, rebre pressupostos gratuïts sense comissions ocultes i gestionar serveis professionals des del mòbil o la web."
icon: "bx:wrench"
color: "red"
role: "Arquitectura frontend i desenvolupament PWA"
year: "2025 – 2026"
client: "Projecte Final DAW / Serveis i Reformes"
badge: "Aplicació web · PWA Mòbil"
statLabel: "Mètrica verificada"
statValue: "Angular 18 · PWA 24/7"
verificationMethod: "Codi font verificat a GitHub (FRONT-PROJECT-JJAUX) i desplegament real a Vercel"
liveUrl: "https://front-project-jjaux-h8pw.vercel.app/"
githubUrl: "https://github.com/jautur/FRONT-PROJECT-JJAUX"
stack: ["Angular 18", "TypeScript 5.4", "PWA Service Worker", "RxJS", "Reactive Forms", "Vercel Edge"]
order: 1
image: {
  src: "/img/avisa-logo.png",
  alt: "Plataforma AVISA de serveis professionals, tasques i reformes de la llar"
}
---

## 1. El problema i el context real

En el sector de les reformes de la llar, les reparacions urgents i el manteniment d'instal·lacions (lampisteria, electricitat, pintura, fusteria, climatització i paletes), els canals tradicionals i les grans plataformes intermediàries generen friccions greus:

- **Comissions abusives i sobrecostos opacs:** Moltes plataformes tradicionals encareixen el preu final amb comissions per contactar o percentatges sobre la feina que perjudiquen tant el client com el professional autònom.
- **Manca de confiança i proximitat:** Dificultat per trobar especialistes locals de confiança, amb telèfon directe, valoracions reals de veïns de la zona i perfils revisats.
- **Pèrdua de temps en la gestió:** Cues telefòniques, formularis llargs desconectats o pressupostos que tarden setmanes a arribar.

El propòsit d'**AVISA** va ser dissenyar una plataforma digital directa, transparent i àgil, amb una experiència adaptada al mòbil (PWA), centrada inicialment en les comarques valencianes (la Costera, la Safor, la Vall d'Albaida i la Ribera): connectar directament persones que tenen una avaria o projecte amb professionals verificats, sense intermediaris innecessaris.

---

## 2. Què ofereix la plataforma

AVISA articula dos perfils d'usuari complementaris mitjançant una interfície intuïtiva:

### Per a clients i comunitats de veïns
- **Publicació àgil i gratuïta:** Descriure la incidència o necessitat de reforma en menys de 2 minuts i indicar el pressupost de referència.
- **Sense comissions ocultes:** Preus justos acordats lliurement entre client i professional, sense lletra petita.
- **Professionals verificats:** Lampistes, electricistes, fusters, instal·ladors i paletes amb perfils revisats, contacte directe i ressenyes públiques.
- **Contractació de packs de serveis:** Possibilitat de contractar directament serveis a tarifa tancada o sol·licitar pressupost personalitzat.

### Per a professionals i autònoms
- **Borsa de tasques i incidències en temps real:** Accés diari a peticions reals de la seua comarca.
- **Publicació de packs d'ofertes:** Catàleg de serveis de tarifa fixa perquè els clients contracten directament.
- **Construcció de reputació:** Historial de tasques finalitzades i valoracions verificades per augmentar la fiabilitat.

### Experiència mòbil sincronitzada (PWA)
- Tota la gestió des del dispositiu mòbil: notificacions instantànies quan hi ha resposta, xat directe per acordar detalls, fotos de l'obra o dates, i registre de tasques.

---

## 3. Decisions d'arquitectura frontend

El frontend està construït amb **Angular 18** seguint les millors pràctiques d'arquitectura modular moderna:

### Standalone Components i enrutament basat en dominis
Es prescindeix dels mòduls monolítics clàssics (`NgModules`) per adoptar components Standalone agrupats per dominis funcionals:
- `/tasques-ofertes`: tauler d'exploració i mercat d'ofertes professionals i incidències.
- `/avisos`: gestió del cicle de vida d'incidències per a particulars.
- `/professional`: àrea privada del professional autònom amb gestió d'ofertes i pressupostos.
- `/client`: àrea de seguiment per a particulars.
- `/blog`: guies tècniques comarcals (butlletins elèctrics CIE, calç a les conques del Xúquer, aïllament tèrmic i panys antibumping).

### Serveis especialitzats i fluxos de dades
La capa lògica s'estructura en serveis dedicats amb **RxJS** i tipat estricte de TypeScript:
- `incidencia.service.ts`: creació, filtratge i seguiment d'incidències de clients.
- `oferta.service.ts`: publicació i gestió de packs de serveis de professionals.
- `pressupost.service.ts` i `proposta.service.ts`: enviament i acceptació de pressupostos.
- `tasca.service.ts`: cicle d'estat de les feines contractades.
- `resenya.service.ts`: recollida i auditoria de valoracions verificades.
- `usuari.service.ts`: autenticació i control d'accés segons rols (`client`, `professional`, `admin`).

### Suport Progressive Web App (PWA)
Gràcies a `@angular/service-worker` i `manifest.webmanifest`, l'aplicació és instal·lable directament des del navegador del mòbil, amb càrrega instantània dels actius i comportament optimitzat per a pantalles tàctils.

---

## 4. Estructura tècnica del repositori

```
front-project-jjaux/
├── src/
│   ├── app/
│   │   ├── core/           # Interceptors, guards d'autenticació i configuració global
│   │   ├── models/         # Interfícies TypeScript (Usuari, Incidencia, Oferta, Pressupost)
│   │   ├── pages/          # Vistes Standalone (main, tasques-ofertes, avisos, client, professional, blog)
│   │   ├── services/       # Serveis reactius (incidència, oferta, pressupost, ressenya, usuari)
│   │   └── shared/         # Components reutilitzables, navbar, footer i maquetació
│   ├── styles.css          # Disseny corporatiu amb paleta fosca, carmesí neon (#ff1744) i tipografia moderna
│   └── manifest.webmanifest# Metadades de PWA per a instal·lació mòbil
├── package.json            # Angular 18.2, TypeScript 5.4, RxJS 7.6, Service Worker
└── angular.json            # Configuració del compilador i pipeline de producció
```

---

## 5. Resultats i accés públic

- **Demostració en línia:** L'aplicació està completament desplegada i operativa a la xarxa perimetral de Vercel: [front-project-jjaux-h8pw.vercel.app](https://front-project-jjaux-h8pw.vercel.app/).
- **Codi font:** El repositori oficial amb l'historial complet de commits està disponible a GitHub: [github.com/jautur/FRONT-PROJECT-JJAUX](https://github.com/jautur/FRONT-PROJECT-JJAUX).
- **Identitat visual:** Logotip corporatiu oficial amb isotip d'arc i acabat carmesí sobre fons fosc tècnic.
