# Inventari d'Animacions i Interaccions (Motion Budget)

Aquest document recull l'inventari complet d'animacions, transicions, efectes visuals i scripts interactius de [jaumetur.es](https://jaumetur.es), amb l'avaluació de cost computacional (CPU, GPU, composició, bloqueig del fil principal), impacte visual percebut i decisió d'enginyeria d'acord amb el pressupost de moviment unificat.

## 1. Taula d'Inventari Secció per Secció

| Element / Secció | Tipus | Propietat Animada | Cost Computacional | Impacte Visual | Decisió |
|---|---|---|---|---|---|
| **Hero: Canvas Three.js Particles** (`three-hero.astro`) | WebGL `requestAnimationFrame` continu | 110 partícules en 3D, càlcul de distàncies $O(N^2)$ per a 550 línies a cada frame, render continu | Crític (500+ KB de bundle JS, alta càrrega de CPU/GPU mòbil, drenatge de bateria, TBT elevat) | Mitjà-Alt (vistós inicialment, però alenteix la càrrega 7+ segons) | **Eliminar** (substituir per fons CSS estàtic d'obsidiana d'alt contrast) |
| **Hero: Aurores Mesh en bucle** (`hero.astro`) | CSS `@keyframes` infinit alternat | `transform: translate3d(...) scale(...)` amb filtres `blur-[120px]`, `blur-[110px]`, `blur-[100px]` | Alt (composició contínua de capes rasteritzades amb radis de desenfocament molt pesants) | Baix-Mitjà (moviment lent amb prou feines apreciable) | **Eliminar** (convertir a gradients radials estàtics CSS d'alta definició) |
| **Hero: Parallax de ratolí i scroll al Memoji** (`hero.astro`) | JavaScript `mousemove` i `scroll` amb rAF | `transform: perspective(800px) rotateY(...) rotateX(...) translate3d(...)` i `margin-top` | Mig-Alt (escoltadors continus d'esdeveniments, càlculs matricials i repintats) | Baix (efecte flotant prescindible que consumeix recursos) | **Eliminar** (fixar el Memoji amb transició CSS suau en `:hover` únicament) |
| **Hero: Bafarada de diàleg del Memoji** (`hero.astro`) | Transició CSS `:hover` | `transform: scale(1.10)` | Molt baix (transició curta 200 ms només sota acció de l'usuari) | Alt (microinteracció propera i humana) | **Mantenir** (unificar a `duration-200 ease-out hover:scale-105`) |
| **Hero: Indicador de disponibilitat (ping)** (`hero.astro`) | CSS `@keyframes animate-ping` | `transform: scale(...)`, `opacity` | Baix (composició per GPU aïllada en element de 8x8 px) | Alt (informa a l'instant de disponibilitat laboral) | **Simplificar** (substituir per pols suau de color o indicador estàtic brillant) |
| **Hero: Selector de rol interactiu i botó disponible** (`hero.astro`) | Esdeveniment `click` JavaScript natiu | Transició de canvi de text i escala curta al memoji (120 ms) | Nul en repòs/scroll (només s'executa quan l'usuari fa clic) | Alt (demostra capacitat tècnica interactiva backend/sistemes/frontend) | **Mantenir** (garantir zero CLS fixant mides mínimes de contenidor) |
| **Hero: Targetes mètriques (Backend, SMX, CI/CD, TS)** (`hero.astro`) | CSS `:hover` | `scale-125`, `rotate-180`, `rotate-6`, canvis d'ombres | Baix (transició de 200 ms per GPU) | Mitjà | **Simplificar** (unificar comportament: `hover:-translate-y-0.5 hover:shadow-md duration-200`) |
| **Logos: Píndoles de Stack Tecnològic** (`logos.astro`) | CSS `:hover` | `transform: translateY(-4px)`, ombra, escala d'icona | Baix (només actiu en interactuar l'usuari) | Alt (tacte professional i lúdic) | **Mantenir** (estandarditzar a `hover:-translate-y-0.5 duration-200`) |
| **Projectes: Targetes Bento Grid** (`projects.astro`) | CSS `:hover` | `border-color`, `shadow`, fletxa `translate-x-1` | Baix (transició neta de propietats compostes) | Alt (convida a la lectura del cas d'estudi) | **Mantenir** (conservar com a patró de referència per a tota la web) |
| **Skills: Diagrama d'Arquitectura Trigger/Executor** (`features.astro`) | CSS `:hover` + `animate-ping` a la barra de dades | `hover:-translate-y-1`, `animate-ping` continu | Baix-Mitjà | Alt (explica el model mental de l'enginyer) | **Simplificar** (suprimir l'infinite ping de la barra, mantenir l'hover de nodes a 200 ms) |
| **Workflow: Etapes del Procés en 4 Passes** (`workflow.astro`) | CSS `:hover` | `border-color`, `shadow`, escala de la icona | Baix | Alt (coherència amb la resta de blocs de la pàgina) | **Mantenir** (ajustar a la corba de transició unificada) |
| **CTA Final: Capçalera de Tancament** (`cta.astro`) | CSS `:hover` sobre botons i Memoji | `scale-105`, `-translate-y-1` | Baix | Alt | **Mantenir** (garantir que els fons borrosos de profunditat siguin estàtics) |
| **Global: Transició universal d'elements** (`global.css`) | CSS transició global a `html, body, header, nav, footer, article, section` | `transition: background-color, border-color, color 200ms` | Molt Alt (invalida estils i força reflows en canviar qualsevol classe) | Nul (imperceptible per a l'usuari) | **Eliminar** (eliminar la regla global; aplicar transicions només a elements concrets) |
| **Global: Navegador de Seccions Lateral** (`scroll-indicator.astro`) | `IntersectionObserver` passiu | Canvi d'estil i color de fons del punt actiu | Molt baix (observador natiu asíncron sense bucles rAF) | Alt (facilita la navegació a pantalla gran) | **Mantenir** |
| **Global: Easter Eggs i Codi Konami** (`easter-eggs.astro`) | Escoltador `keydown` passiu | Aparició de toast amb notificació d'enginyeria | Nul en navegació normal | Alt (recompensa la curiositat d'altres programadors) | **Mantenir** |

---

## 2. Sistema de Moviment Unificat ("Motion Budget")

Totes les animacions i transicions del lloc web es regeixen estrictament sota els següents paràmetres únics:

1. **Tokens de Temps i Curva d'Acceleració:**
   - **Micro-interaccions (hover, focus, active):** `duration: 200ms` (rang permès: 150–200 ms).
   - **Entrades i aparicions de secció (reveal):** `duration: 400ms` (una sola vegada al camp visual).
   - **Curva d'easing única:** `cubic-bezier(0.16, 1, 0.3, 1)` (suau, precisa i natural).

2. **Regles de Revelació de Seccions:**
   - Un únic patró suau: `opacity` de 0 a 1 i `translateY` de 12px a 0px.
   - Sense retards escalonats excessius (stagger) que facin esperar a l'usuari.
   - Desactivació immediata si l'usuari té activat `prefers-reduced-motion`.

3. **Límit de Moment "Firma":**
   - Màxim 1 efecte destacat per secció (a l'Hero: el selector interactiu de rol i memoji reactiu, sense bucles continus).
   - Cap animació infinita en segon pla que consumeixi cicles de CPU.

