# Pla de Continguts i Estratègia Editorial (SEO & Developer Advocacy)
**Autor:** Jaume Tur — Frontend & Web Apps Engineer  
**Objectiu:** Posicionar `jaumetur.es` com a referent tècnic de parla catalana i castellana en enginyeria frontend, Angular, rendiment (60 FPS), accessibilitat (WCAG AA) i CI/CD, captant trànsit orgànic qualificat (leads per a projectes freelance, oportunitats tècniques corporatives i autoritat en la comunitat de desenvolupament).

---

## 1. Arquitectura de Clústers i Estratègia Hub & Spoke

L'estratègia es basa en el model **Topic Clusters (Pillar-Cluster)**:
- **Pillar Pages (Hubs):** Articles exhaustius (2.000–3.000 paraules) que ataquen paraules clau informatives d'alt volum (ex: "Guia Angular Signals 2026", "Optimització Core Web Vitals").
- **Cluster Pages (Spokes):** Articles específics (800–1.500 paraules) enfocats en problemes concrets i cerques long-tail (ex: "Evitar re-renders amb computed() i linkedSignal()", "Com mesurar INP en Angular").
- **Enllaçat Intern Bidireccional:** Tots els Spokes enllacen al Pillar corresponent amb anchor text exacte o semàntic, i el Pillar distribueix link juice cap als spokes i cap a les pàgines de conversió (`/pricing`, `/contact`, `/tools/workflow-generator`).

```
                ┌───────────────────────────────────────────────┐
                │          Hub / Pillar Page                    │
                │  (ex: Arquitectura Angular Standalone/Signals)│
                └───────────────────────┬───────────────────────┘
                                        │
           ┌────────────────────────────┼────────────────────────────┐
           ▼                            ▼                            ▼
   ┌───────────────┐            ┌───────────────┐            ┌───────────────┐
   │ Spoke 1:      │            │ Spoke 2:      │            │ Spoke 3:      │
   │ linkedSignal  │◄──────────►│ State Pattern │◄──────────►│ RxJS Interop  │
   └───────┬───────┘            └───────┬───────┘            └───────┬───────┘
           │                            │                            │
           └────────────────────────────┼────────────────────────────┘
                                        ▼
                         ┌─────────────────────────────┐
                         │ Pàgina de Serveis / Contacte│
                         │    (Conversió de Leads)     │
                         └─────────────────────────────┘
```

---

## 2. Els 5 Clústers Temàtics (30 Idees d'Articles Tècnics)

### Clúster 1: Angular Modern, Standalone & Signals (Autoritat de Stack)
*Públic objectiu: Desenvolupadors Angular mid/senior, tech leads, empreses migrant d'AngularJS o versions legacy amb NgModules.*

1. **[PILLAR] Arquitectura modular i escalable en Angular amb Standalone Components i Signals**
   - **Keyword Principal:** *arquitectura angular standalone components signals* / *angular signals arquitectura*
   - **Volum Estimat:** 1.200 cerques/mes (ES + LATAM + CAT) | **Dificultat (KD):** Mitjana (34)
   - **Intenció de cerca:** Informativa + Tècnica aplicada
   - **Objectiu:** Posicionar com a guia canònica d'adopció d'Angular modern sense NgModules.

2. **Migració pragmàtica: de NgModules a Standalone Components sense aturar la producció**
   - **Keyword:** *migrar ngmodules a standalone angular pas a pas*
   - **Volum:** 450/mes | **KD:** Baixa (18) | **Intenció:** How-to / Pràctica

3. **Dominar `signal()`, `computed()`, `effect()` i `linkedSignal()`: patrons i antipatrons**
   - **Keyword:** *angular signals cheatsheet patrons compute effect*
   - **Volum:** 850/mes | **KD:** Mitjana (26) | **Intenció:** Informativa avançada

4. **RxJS vs Signals en Angular: Quan utilitzar cadascun el 2026**
   - **Keyword:** *rxjs vs signals angular diferencies quan utilitzar*
   - **Volum:** 1.100/mes | **KD:** Mitjana (38) | **Intenció:** Comparativa / Decisió d'arquitectura

5. **Gestió d'estat lleugera en Angular amb Signals: Adéu a NgRx Boilerplate**
   - **Keyword:** *gestio estat angular signals sense ngrx signal store*
   - **Volum:** 720/mes | **KD:** Mitjana (29) | **Intenció:** Solució d'enginyeria

6. **Interceptors funcionals i injecció de dependències moderna amb `inject()`**
   - **Keyword:** *angular inject function interceptor http funcional*
   - **Volum:** 380/mes | **KD:** Baixa (15) | **Intenció:** How-to / Tutorial

---

### Clúster 2: Rendiment Web a 60 FPS & Core Web Vitals (Diferenciació d'Enginyeria)
*Públic objectiu: CTOs, product managers, enginyers frontend obsedits amb la velocitat i el rànquing LCP/CLS/INP.*

7. **[PILLAR] Com optimitzar el rendiment frontend a 60 FPS: Guia pràctica de Core Web Vitals**
   - **Keyword:** *optimitzar rendiment frontend 60 fps core web vitals*
   - **Volum:** 980/mes | **KD:** Mitjana (32)
   - **Intenció:** Informativa profunda + Guia d'optimització

8. **Com reduir el Interaction to Next Paint (INP) en Single Page Applications**
   - **Keyword:** *millorar interaction to next paint inp frontend spa*
   - **Volum:** 520/mes | **KD:** Baixa (22) | **Intenció:** Resolució de problema tècnic

9. **Lazy loading estratègic i Code Splitting en aplicacions TypeScript d'alta concurrència**
   - **Keyword:** *code splitting lazy loading typescript angular optimitzacio bundle*
   - **Volum:** 410/mes | **KD:** Baixa (19) | **Intenció:** Millora d'arquitectura

10. **Eliminar el Layout Shift (CLS) en càrrega de fonts i imatges dinàmiques**
    - **Keyword:** *evitar cumulative layout shift cls fonts imatges responsive*
    - **Volum:** 640/mes | **KD:** Baixa (24) | **Intenció:** How-to / Guia

11. **Rendiment en llistes massives: Virtual Scrolling i reciclatge de nodes DOM**
    - **Keyword:** *virtual scroll llistes grans renderitzat 60fps angular cdk*
    - **Volum:** 390/mes | **KD:** Baixa (17) | **Intenció:** Tutorial pràctic

12. **Auditant memòria i Memory Leaks en aplicacions web SPA amb Chrome DevTools**
    - **Keyword:** *detectar memory leaks chrome devtools frontend aplicacions*
    - **Volum:** 480/mes | **KD:** Mitjana (25) | **Intenció:** Diagnòstic / Debugging

---

### Clúster 3: CI/CD, DevOps Frontend & Desplegament Automatitzat (Fiabilitat)
*Públic objectiu: Equips de desenvolupament, enginyers de programari que volen automatitzar la seua cadena de lliurament.*

13. **[PILLAR] Guia pas a pas: Pipeline de CI/CD per a frontend amb GitHub Actions**
    - **Keyword:** *pipeline cicd frontend github actions pas a pas*
    - **Volum:** 1.500/mes | **KD:** Mitjana (31)
    - **Intenció:** How-to complet / Template llest per a producció

14. **Com configurar linters, Prettier i tests unitaris en pre-commit i CI amb Husky**
    - **Keyword:** *husky lint staged pre commit github actions frontend*
    - **Volum:** 610/mes | **KD:** Baixa (20) | **Intenció:** Configuració d'eines

15. **Zero Downtime Deployment i gestió de versions en entorns d'alta disponibilitat**
    - **Keyword:** *desplegament continu zero downtime web frontend cloudflare pages*
    - **Volum:** 320/mes | **KD:** Baixa (16) | **Intenció:** Estratègia DevOps

16. **Caching eficient a GitHub Actions: Reduir el temps de build de 8 a 1 minut**
    - **Keyword:** *accelerar github actions cache npm node modules build frontend*
    - **Volum:** 430/mes | **KD:** Baixa (18) | **Intenció:** Optimització de costos/temps

17. **Desplegament estàtic a GitHub Pages amb Astro i domini personalitzat (.es)**
    - **Keyword:** *desplegar astro github pages domini personalitzat https*
    - **Volum:** 780/mes | **KD:** Baixa (21) | **Intenció:** Tutorial pas a pas

18. **Monitoratge sintètic d'errors en producció amb Sentry i alertes a Slack/Telegram**
    - **Keyword:** *monitoritzar errors frontend produccio sentry angular web*
    - **Volum:** 360/mes | **KD:** Baixa (19) | **Intenció:** Mantenibilitat

---

### Clúster 4: Accessibilitat Web (WCAG 2.2 AA) & Disseny Inclusiu (Normativa i Ètica)
*Públic objectiu: Organitzacions públiques, e-commerce, empreses subjectes a la Llei d'Accessibilitat Europea 2025.*

19. **[PILLAR] Accessibilitat web (WCAG AA): De la teoria a la implementació real**
    - **Keyword:** *guia accessibilitat web wcag aa exemples codi frontend*
    - **Volum:** 890/mes | **KD:** Baixa (23)
    - **Intenció:** Informativa legal i d'enginyeria

20. **Com passar l'auditoria d'accessibilitat: Gestió de focus, tecles Tab i modales ARIA**
    - **Keyword:** *trampa de focus modal accessible aria dialog keyboard trap*
    - **Volum:** 420/mes | **KD:** Baixa (16) | **Intenció:** Resolució tècnica

21. **Contrast de color, escalat de font i `prefers-reduced-motion` a Tailwind CSS**
    - **Keyword:** *accessibilitat tailwind css contrast ratio prefers reduced motion*
    - **Volum:** 510/mes | **KD:** Baixa (14) | **Intenció:** Guia pràctica UI

22. **Formularis accessibles per a tothom: Errors clars, labels i lectors de pantalla**
    - **Keyword:** *formularis accessibles lectors de pantalla aria describedby*
    - **Volum:** 340/mes | **KD:** Baixa (15) | **Intenció:** UX/UI inclusiva

23. **La Directiva Europea d'Accessibilitat (EAA): Què canvia per als webs i botigues en línia**
    - **Keyword:** *directiva europea accessibilitat web obligatorietat espanya*
    - **Volum:** 1.300/mes | **KD:** Mitjana (27) | **Intenció:** Legal/Empresarial (Alta conversió per a consultoria)

24. **Tests automatitzats d'accessibilitat amb axe-core i Playwright en el teu CI/CD**
    - **Keyword:** *tests accessibilitat axe core playwright github actions*
    - **Volum:** 290/mes | **KD:** Baixa (17) | **Intenció:** Qualitat de programari

---

### Clúster 5: Carrera Frontend, Negoci Digital & Casos d'Estudi Locals (Conversió i Marca)
*Públic objectiu: Emprenedors valencians, empreses locals que necessiten web ràpida, i desenvolupadors joves que busquen inspiració.*

25. **[PILLAR] Com construir un portfolio d'enginyeria frontend que destaque el 2026**
    - **Keyword:** *com fer portfolio frontend enginyeria projectes exemples*
    - **Volum:** 1.400/mes | **KD:** Mitjana (28)
    - **Intenció:** Orientació professional / Autoritat

26. **Cas d'estudi AVISA: Arquitectura d'un sistema de gestió d'incidències en temps real**
    - **Keyword:** *arquitectura aplicacio gestio incidencies angular typescript*
    - **Volum:** 210/mes | **KD:** Molt baixa (9) | **Intenció:** Portfoli profund / Social proof

27. **Cas d'estudi Pizzeria a Xàtiva: SEO local, rendiment i disseny per a hostaleria**
    - **Keyword:** *disseny web pizzeria xativa seo local hostaleria valencia*
    - **Volum:** 180/mes | **KD:** Molt baixa (8) | **Intenció:** Captació de clients locals a la Comunitat Valenciana

28. **Desenvolupador web freelance a València: Claus per triar soci tecnològic per al teu negoci**
    - **Keyword:** *desenvolupador web freelance valencia preus contractar programador*
    - **Volum:** 460/mes | **KD:** Baixa (19) | **Intenció:** Transaccional / Comercial local

29. **TypeScript estricte en projectes frontend: Patrons avançats que salven vides en producció**
    - **Keyword:** *typescript estricte patrons avancats generics narrowing frontend*
    - **Volum:** 670/mes | **KD:** Baixa (22) | **Intenció:** Excel·lència tècnica

30. **El cost ocult del deute tècnic en webs corporatives: Quan cal redissenyar o refactoritzar**
    - **Keyword:** *deute tecnic desenvolupament web quan refer aplicacio empresa*
    - **Volum:** 280/mes | **KD:** Baixa (14) | **Intenció:** Decisió directiva B2B

---

## 3. Matriu de Priorització i Impacte Comercial

| Prioritat | Títol | Idioma | Rol Estratègic | Conversió directa |
|---|---|---|---|---|
| **P0 (Llançament)** | Arquitectura Angular Standalone & Signals | CA + ES | Pilar Tècnic | Lead Magnet / Consultoria Angular |
| **P0 (Llançament)** | Optimització Core Web Vitals a 60 FPS | CA + ES | Pilar Rendiment | Auditoria Web / Optimitació |
| **P0 (Llançament)** | Pipeline CI/CD GitHub Actions | CA + ES | Pilar DevOps | Setup CI/CD / Eina Workflow Generator |
| **P0 (Llançament)** | Accessibilitat Web WCAG AA | CA | Pilar Ètica/Normativa | Auditoria d'Accessibilitat EAA |
| **P0 (Llançament)** | Cas AVISA (Temps Real) | CA | Estudi de Cas B2B | Demostració de solvència tècnica |
| **P0 (Llançament)** | Cas Pizzeria Xàtiva (SEO Local) | CA | Estudi de Cas PIME | Clients locals a València i comarques |
| **P0 (Llançament)** | TypeScript Estricte al Frontend | CA | Autoritat Codi Net | Confiança en codi robust |
| **P0 (Llançament)** | Com fer un Portfolio d'Enginyeria | CA | Trànsit & Viralitat | Comunitat de desenvolupadors |

---

## 4. Estratègia d'Actualització i Enllaços Canònics
- Totes les versions en castellà tindran l'etiqueta `<link rel="alternate" hreflang="es" href="..." />` i `<link rel="alternate" hreflang="ca" href="..." />`.
- Cada trimestre es farà una revisió dels articles P0 per mantenir la informació alineada amb les últimes versions d'Angular, Astro i estàndards W3C.
