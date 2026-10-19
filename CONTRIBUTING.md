# Guia de Contribució (Contributing Guide)

Gràcies pel teu interès a contribuir al projecte del portfolio personal i tècnic de **Jaume Tur** ([jaumetur.es](https://jaumetur.es)). Aquest repositori està dissenyat com a banc de proves d'alta enginyeria frontend, amb estàndards estrictes de qualitat de codi, rendiment 60 FPS i accessibilitat WCAG 2.2 AA.

---

## 1. Requisits Previs (Prerequisites)

* **Node.js:** Versió `>= 22.12.0` (LTS recomanat).
* **npm:** Versió `>= 10.x`.
* **Git:** Control de versions.

---

## 2. Instal·lació i Entorn Local (Local Setup)

```bash
# 1. Clonar el repositori
git clone https://github.com/jautur/jaumetur.es.git
cd jaumetur.es

# 2. Instal·lar dependències
npm ci

# 3. Instal·lar navegadors de Playwright per a tests E2E
npx playwright install chromium

# 4. Iniciar el servidor local de desenvolupament
npm run dev
```

El servidor s'iniciarà a `http://localhost:4321/` amb recàrrega ràpida (HMR).

---

## 3. Comandes Disponibles (Scripts)

| Comanda | Descripció |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desenvolupament local a `http://localhost:4321`. |
| `npm run build` | Compila la versió de producció estàtica a la carpeta `./dist`. |
| `npm run preview` | Previsualitza localment la versió compilada de producció. |
| `npm run check` | Executa `astro check` i verificació estricta de tipus TypeScript. |
| `npm test` | Executa els tests unitaris amb **Vitest**. |
| `npm run test:e2e` | Executa els tests de fluxos crítics d'usuari amb **Playwright**. |
| `npm audit` | Audita les dependències per detectar possibles vulnerabilitats. |

---

## 4. Estàndard de Commits (Conventional Commits)

Aquest projecte segueix estrictament l'especificació [Conventional Commits](https://www.conventionalcommits.org/):

```text
<tipus>(<abast opcional>): <descripció en present>

[cos opcional]

[peu opcional]
```

### Tipus Admesos:
* `feat`: Nova funcionalitat, cas d'estudi o component.
* `fix`: Correcció d'un error o problema de compatibilitat.
* `perf`: Millora de rendiment (LCP, CLS, INP, optimització de paquets).
* `docs`: Modificacions a la documentació, fitxers README o articles de blog.
* `refactor`: Canvis en el codi intern que no modifiquen el comportament ni afegeixen funcions.
* `test`: Addició o millora de tests unitaris o E2E.
* `ci`: Canvis en els pipelines de GitHub Actions o configuracions de desplegament.
* `chore`: Tasques rutinàries de manteniment o actualització de dependències.

**Exemples:**
* `feat(case-studies): add interactive bento grid cards`
* `fix(a11y): improve contrast ratio on dark mode buttons`
* `perf(three): lazy load three.js via dynamic import and requestIdleCallback`

---

## 5. Regles de Disseny i Codi

1. **Zero Emojis en Brut:** No utilitzis mai caràcters emoji nadius (`🚀`, `⚡`, `🍕`) en el codi de la interfície. Utilitza exclusivament la iconografia SVG estandarditzada mitjançant `<Icon name="..." />` (`@iconify-json/bx`, `simple-icons`).
2. **Accessibilitat (WCAG 2.2 AA):**
   * Tot element interactiu ha de ser operable per teclat i disposar d'anell de focus visible.
   * Els camps de formulari han de tenir un `<label for="...">` explícit.
   * Els contrastos de color han de superar el llindar 4.5:1 (AA) tant en mode clar com en mode fosc.
   * Respectar sempre `prefers-reduced-motion`.
3. **Core Web Vitals:** Cap canvi pot augmentar el pes crític inicial ni provocar salts de maquetació (CLS > 0.05).

---

## 6. Flux de Pull Request

1. Crea una branca descriptiva: `git checkout -b feat/nom-de-la-millora`.
2. Fes els canvis i assegura't que passen totes les comprovacions locals:
   ```bash
   npm run check
   npm test
   npm run test:e2e
   npm run build
   ```
3. Fes push i obre un Pull Request a GitHub utilitzant la plantilla de PR.
4. El pipeline de **GitHub Actions** verificarà automàticament el codi (tipat, proves, E2E i Lighthouse CI).

