# Pla de Distribució de Continguts i Difusió (12 Setmanes)
**Autor:** Jaume Tur — Frontend & Web Apps Engineer  
**Ecosistema:** `jaumetur.es`, X/Twitter (`@jautur`), LinkedIn (`jautur`), GitHub (`jautur`), Dev.to, Hashnode, Reddit, Comunitats de Discord.

---

## 1. Principi Fonamental: "El Blog com a Font Canònica de la Veritat"

Tots els articles es publiquen primer a **`https://jaumetur.es/blog/`**.
Les republiques a plataformes de tercers (Dev.to, Hashnode, Medium) es faran sempre després de 48-72 hores (per donar temps a Google a indexar la URL original com a canònica) i afegint obligatòriament la metadada:
```html
<link rel="canonical" href="https://jaumetur.es/blog/{slug}" />
```

---

## 2. Rutes de Distribució i Adaptació per Canal

### A. LinkedIn (Format: Reflexió d'Enginyeria + Carrusel PDF o Captures de Codi)
- **To:** Professional, enfocat a la presa de decisions d'enginyeria, deute tècnic, estalvi de temps en equips i impacte en negoci.
- **Estructura del post:**
  1. **Hook:** Desafia una pràctica comuna (ex: *"Continuar utilitzant NgModules en projectes nous d'Angular el 2026 és acumular deute tècnic per voluntat pròpia. Ací està el per què."*).
  2. **El problema:** Costos de manteniment, bundle size inflat, corba d'aprenentatge innecessària.
  3. **La solució tècnica:** 3 canvis essencials amb `inject()`, `provideRouter()` i `signals`.
  4. **Crida a la conversa:** *"Com esteu gestionant la transició al vostre equip? Us llig als comentaris."*
  5. **Enllaç:** En el primer comentari o al final del post cap a l'article complet a `jaumetur.es`.

### B. X / Twitter (Format: Fil Tècnic Pas a Pas amb Emojis i Code Snippets)
- **To:** Directe, pràctic, orientat a "tips" aplicables immediatament.
- **Estructura d'un fil (Tweetstorm):**
  - **Tweet 1 (Hook + Mètriques):** *"Com aconseguir 100/100 a Lighthouse i 60 FPS estables en un SPA sense tornar-te boig. Guia amb patrons que aplique en producció 🧵👇"*
  - **Tweet 2:** Gràfic o captura de Web Vitals (LCP, CLS, INP).
  - **Tweets 3-6:** 1 consell per tweet (Lazy loading, Font-display swap, desconnexió d'event listeners, virtual scrolling).
  - **Tweet 7:** Eina gratuïta: *"He creat un generador interactiu de workflows de GitHub Actions per estalviar-vos la configuració manual: jaumetur.es/tools/workflow-generator"*.
  - **Tweet Final:** Enllaç a l'article complet + RT del primer tweet.

### C. Dev.to & Hashnode (Format: Cross-Posting amb Enllaç Canònic)
- Es publica la versió completa o un extracte tècnic en castellà o anglès per posicionar keywords globals.
- Títols adaptats per al feed de desenvolupadors: *"Building a 60 FPS Angular App: What I Learned Fixing Cumulative Layout Shift"*.
- Call to Action clar al final: *"Publicat originalment al meu blog personal: jaumetur.es"*.

### D. Comunitats Tècniques (Aportació de Valor, Zero Spam)
- **Discord de Midudev & Carlos Azaustre:** Compartir solucions a dubtes dels canals `#angular`, `#rendiment` o `#projectes` enllaçant a la secció específica o l'eina `/tools/workflow-generator`.
- **Reddit (`r/angular`, `r/webdev`, `r/Frontend`):** Compartir el post retrospectiu d'arquitectura demanant feedback genuí d'enginyers d'arreu del món.
- **Comunitat Valenciana i Xarxes Locals (València Tech City, Geekshubs, Betabeers València):** Compartir casos d'estudi de digitalització local (com el de la Pizzeria a Xàtiva o AVISA).

---

## 3. Calendari d'Execució en 12 Setmanes

| Setmana | Contingut Principal (`jaumetur.es`) | Acció a X/Twitter | Acció a LinkedIn | Acció a Comunitats / Tercers |
|---|---|---|---|---|
| **S1** | *Arquitectura Angular Standalone & Signals* | Fil de 7 tweets: Per què abandonar NgModules | Post amb captura de codi: Abans i després amb Signals | Publicació canònica a Dev.to |
| **S2** | *Workflow Generator Tool* (`/tools/workflow-generator`) | Vídeo curt / GIF demostratiu de l'eina interactiva | Post: Com reduir temps de setup en projectes web | Difusió a Discord Midudev (#eines) |
| **S3** | *Optimització Core Web Vitals a 60 FPS* | Fil de 5 consells per reduir INP i CLS | Cas real: Com reduir el LCP a menys d'1 segon | Reddit r/webdev: "Real-world Core Web Vitals checklist" |
| **S4** | *Cas d'Estudi AVISA (Incidències en Temps Real)* | Mini-fil sobre arquitectura orientada a events | Anàlisi de fiabilitat en sistemes crítics | LinkedIn Tech Groups de València |
| **S5** | *Pipeline CI/CD per a Frontend amb GitHub Actions* | Snippet del pipeline més net per a Astro/Angular | Desmitificant el desplegament continu: De 15min a 90s | Dev.to & Hashnode (versió ES) |
| **S6** | *Pàgina /uses: El meu setup d'enginyeria* | Tweet amb foto/captura del setup + llista d'extensions | Post: Les 5 eines que multipliquen la meua productivitat | Inclusió a directori web uses.tech |
| **S7** | *Accessibilitat Web WCAG AA a la pràctica* | Checklist interactiu de contrast i navegació per teclat | Post: Directiva Europea d'Accessibilitat 2025: Estàs llest? | Compartir a comunitats de disseny accessible |
| **S8** | *Cas d'Estudi Pizzeria a Xàtiva (SEO Local)* | Fil: Com el SEO local i la velocitat omplin taules | Post orientat a PIMEs: El teu web ven o espanta clients? | Grups d'empresaris locals i comerç |
| **S9** | *TypeScript Estricte: Patrons que salven vides* | 4 tipatges generics avançats que has de conéixer | Reflexió sobre tipatges febles vs forts en equips grans | Dev.to: "TypeScript patterns that prevent production bugs" |
| **S10** | *Com construir un portfolio d'enginyeria el 2026* | Fil: Errors típics en portfolios juniors/mid | Anàlisi: Què busquen realment els Lead Engineers | Discord de comunitats juniors per ajudar amb revisions |
| **S11** | *Checklist Lead Magnet: Descarregable gratuït* | Llançament del PDF/Recurs gratuït per a subscriptors | Post sobre estàndards de qualitat en auditories web | Recordatori per correu a subscriptors del blog |
| **S12** | *Retrospectiva del Trimestre: Mètriques i Aprenentatges* | Tweet amb gràfic de creixement orgànic i agraïment | Post de transparència: Impacte del SEO i contingut tècnic | Revisió de noves oportunitats i idees de contingut |

---

## 4. Guia d'Estil per a Publicacions Socials
- **Preservar el Design System:** Quan s'adjunten imatges, utilitzar el format de targeta amb fons `#030712`, accents verds (`#10b981`), blaus (`#3b82f6`) i l'avatar/memoji oficial de Jaume Tur com a signatura visual.
- **Zero Clickbait buit:** Cada publicació ha d'aportar valor per si mateixa fins i tot si l'usuari no fa clic a l'enllaç. El link a `jaumetur.es` ha de ser la continuació natural per a aprofundir.

