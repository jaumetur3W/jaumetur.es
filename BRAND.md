# Manual d'Identitat de Marca & Guia d'Estil (Brand Guidelines)
## Jaume Tur — Desenvolupador Frontend & Web Apps

Aquest document defineix de manera normativa la identitat visual, el llenguatge de disseny, els actius gràfics oficials i les regles d'ús per al projecte professional **[jaumetur.es](https://jaumetur.es)**.

---

## 1. Posicionament & Filosofia de Marca

La marca **Jaume Tur** representa enginyeria frontend d'alt rendiment:
* **Rigor Tècnic:** Verificació empírica de 60 FPS fluids, arquitectura modular i tipat estricte TypeScript.
* **Accessibilitat Universal:** Compliment estricte de la normativa europea i internacional WCAG 2.2 AA.
* **Honestedat Empírica:** Mètriques reals i auditables de manera independent, sense xifres ni testimonis inventats.
* **Identitat Pròpia:** Ús conscient de la llengua catalana com a idioma vehicular del projecte amb versions internacionals (castellà i anglès).

---

## 2. Monograma Oficial "JT" & Logotip

El símbol oficial és un monograma geomètric que fusiona les inicials **J** i **T** en una estructura contínua amb un node de connexió de dades d'accent cian:

### Actius Vectorials i d'Alta Definició a `/public/img` i `/public`:
* **`jt.LOGO-01.png`:** Logotip oficial ("jaume. www") sobre fons groc corporatiu (#FFE600).
* **`jt.LOGO-02.png`:** Isotip oficial (símbol "j" amb ulls XX i somriure) sobre fons groc corporatiu (#FFE600).
* **`jt.LOGO-03.png`:** Logotip en blanc pur (#FFFFFF) per a fons foscos i terminals (Dark Mode).
* **`jt.LOGO-04.png`:** Isotip en blanc pur (#FFFFFF) per a fons foscos i terminals (Dark Mode).
* **`jt.LOGO-05.png`:** Logotip en tinta negra (#000000) per a superfícies clares i editorials (Light Mode).
* **`jt.LOGO-06.png`:** Isotip en tinta negra (#000000) per a superfícies clares i editorials (Light Mode).
* **`jt-monogram.svg`:** Monograma geomètric JT amb squircle fosc de protecció (format 1:1, favicons i PWA).
* **`jt-monogram-light.svg`:** Monograma en degradat cian/índigo per a superfícies fosques.
* **`jt-monogram-dark.svg`:** Monograma en índigo per a superfícies clares d'alt contrast.

### Regles d'Ús del Logotip:
* **Mida Mínima:** 24x24 px per al monograma; 120x30 px per al logotip complet.
* **Espai de Seguretat:** Una distància mínima equivalent al 25% de l'alçada del símbol al voltant del logotip.
* **Prohibicions Específiques:**
  * No deformar, inclinar o alterar les proporcions del monograma.
  * No aplicar ombres caigudes artificials dures ni filtres de distorsió.
  * No canviar els colors de degradat oficials.

---

## 3. Paleta Cromàtica Oficial (Normativa WCAG AA / AAA)

Tots els colors han estat seleccionats i validats per complir amb les exigències de contrast del W3C sobre fons clar:

| Color de Marca | Codi HEX | Valor RGB | Valor HSL | Ràtio de Contrast | Rol d'Aplicació |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Groc Corporatiu** | `#FFE600` | `255, 230, 0` | `54°, 100%, 50%` | `16.5:1 s/ fosc (AAA)` | Identitat visual `jaume.www`, isotip principal i accents d'alt impacte. |
| **Fosc Obsidiana** | `#090D16` | `9, 13, 22` | `222°, 42%, 6%` | `18.2:1 (AAA)` | Fons principal de la secció Hero (Opció B), superfícies d'aurora i dark mode. |
| **Índigo Primari** | `#4F46E5` | `79, 70, 229` | `243°, 75%, 59%` | `8.5:1 (AAA)` | Identitat de marca, botons primaris i enllaços clau. |
| **Cian Tecnològic** | `#06B6D4` | `6, 182, 212` | `189°, 94%, 43%` | `4.7:1 (AA)` | Accents d'enginyeria, nodes de dades i gradients. |
| **Pissarra Tech** | `#0F172A` | `15, 23, 42` | `222°, 47%, 11%` | `16.1:1 (AAA)` | Tipografia principal, terminals de codi i fons de contrast. |
| **Verd Maragda** | `#10B981` | `16, 185, 129` | `160°, 84%, 39%` | `4.6:1 (AA)` | Estats actius, èxit de proves, 60 FPS i validacions. |
| **Fons Pissarra-50** | `#F8FAFC` | `248, 250, 252` | `210°, 40%, 98%` | Base | Fons general del lloc web en mode clar permanent. |
| **Blanc Pur** | `#FFFFFF` | `255, 255, 255` | `0°, 0%, 100%` | Base | Superfície de targetes, panells elevats i modales. |

---

## 4. Tipografia Corporativa

* **Titulars & Display:** **Bricolage Grotesque Variable** (`font-extrabold` / `font-black`).
  * Aplicació: H1, H2, H3, grans mètriques i logotip.
* **Cossos de Text & Interfície:** **Inter Variable** (`font-normal`, `font-medium`, `font-semibold`).
  * Aplicació: Paràgrafs de lectura, botons, menús de navegació i formularis.
* **Codi, Dades & Telemetria:** **JetBrains Mono / ui-monospace** (`font-mono`).
  * Aplicació: Valors de Core Web Vitals, rutes de fitxers, terminals interactius i mètriques.

---

## 5. Regla d'Or: Iconografia Estandarditzada (Prohibició d'Emojis)

Per ordre expressa de direcció de disseny:
* **Queda terminantment prohibit l'ús d'emojis Unicode** (com ara coets, focs, carasses o símbols de text) a cap element de la interfície d'usuari, botons, llistats de serveis o documentació.
* **Estàndard Únic:** Tots els conceptes es comuniquen mitjançant icones vectorials netes proporcionades pel component `astro-icon`:
  * Icones de sistema i navegació: **Boxicons** (`bx:*`).
  * Logotips de tecnologia i plataformes: **Simple Icons** (`simple-icons:*`).

---

## 6. Kit de Memojis Contextuals Oficials

Els memojis de Jaume Tur aporten proximitat humana sense restar rigor tècnic. S'utilitzen sempre vinculats a contenidors o targetes:

| Fitxer a `/public/img/` | Pose / Actitud | Significat & Context d'Ús | Mida Recomanada | Text Alternatiu Requerit |
| :--- | :--- | :--- | :--- | :--- |
| **`4.png`** | Somriure directe | Presentació principal a la capçalera Hero | 240px - 320px | `Jaume Tur somrient interactiu` |
| **`3.png`** | Salutació amb la mà | Benvinguda, pàgina de contacte i targeta digital `/card` | 112px - 144px | `Jaume Tur saludant` |
| **`2.png`** / **`loading.png`** | Treball amb portàtil | Projectes en curs, estats de càrrega i enginyeria activa | 128px - 180px | `Jaume Tur treballant amb el portàtil` |
| **`1.png`** / **`404.png`** | Cercant desconcertat | Pàgina 404 (error de recurs no trobat) | 128px | `Jaume Tur cercant la pàgina desconcertat` |
| **`6.png`** / **`blog.png`** | Ulleres / Acadèmic | Blog tècnic, anàlisi de codi i docència | 96px - 128px | `Jaume Tur explicant un concepte tècnic` |
| **`7.png`** / **`success.png`** | Polze amunt | Fase verificada, confirmació de formulari i èxit | 96px - 128px | `Jaume Tur amb el polze amunt` |

---

## 7. Ecosistema PWA & Recursos Digitals

* **Manifest PWA:** [`public/site.webmanifest`](public/site.webmanifest)
* **Icones d'Aplicació:** `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`
* **Compte d'Instagram Oficial:** [`@jaume.www`](https://www.instagram.com/jaume.www/)
* **Targeta Digital de Visita:** Disponible a [`/card`](https://jaumetur.es/card) amb codi QR vectorial i fitxer vCard descarregable (`jaume-tur.vcf`).
* **Kit de Marca Públic:** Consultable i descarregable directament a [`/marca`](https://jaumetur.es/marca).
* **Targeta Social OpenGraph:** [`public/og-home.svg`](public/og-home.svg) i versió rasteritzada d'alta definició a [`public/opengraph.jpg`](public/opengraph.jpg).

