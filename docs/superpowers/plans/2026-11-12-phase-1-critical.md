# Phase 1 Critical: Hero + Services + Forms + Pricing

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Increase contact qualification and conversion by 30-50% through clearer messaging, segmented services, working form backend, and complete case studies—without visual redesign.

**Architecture:** Refactor homepage copy and UX flow to lead with business outcomes (not technology). Segment services into 3 tiers with clear hierarchy. Replace mailto form with Netlify Forms backend. Convert project pages from screenshots to complete narratives (problem → solution → result).

**Tech Stack:** Astro 7, TypeScript, Tailwind CSS, Netlify Forms

**Spec:** `auditoría-jaumetur-2026-11-11.txt` (external audit)

---

## Global Constraints

- **Language:** Spanish (ES) primary; mirror en English (EN).
- **Core values (never lose):** Direct contact, transparent pricing, client code ownership.
- **Message priority:** Business results > technology details.
- **Filenames/types:** Keep existing patterns (services-es.ts, [slug].astro, etc.).

---

## Review Focus

1. **Service segmentation confusion:** User lands on homepage, cannot quickly identify which service they need. Test: categorization by use case (web for local business, app for enterprise, optimization for existing projects) must be visually and textually distinct.

2. **Mailto form friction:** Contact form depends on user email client. Test: form must POST to backend; failure modes (missing SMTP, client misconfigured, spam filtering) must not lose contacts.

3. **Weak case studies:** Projects shown as screenshots, not narratives. Test: each case must state initial problem, why it mattered, what was built, and a measurable result or business outcome.

4. **Hero messaging fails local business owner:** Current hero lists technology buzzwords. Test: a restaurant owner or local shopkeeper should understand "I can help you get more customers" within first 5 seconds, no jargon.

5. **Pricing page doesn't clarify maintenance:** User unsure if €49/mo includes support, updates, security patches. Test: maintenance terms (scope, response SLA, what's included/excluded) must be explicit on pricing page and service cards.

---

## File Structure

```
src/
├── pages/
│   ├── index.astro                  (hero, copy rewrite)
│   ├── en/index.astro               (English mirror)
│   ├── contact.astro                (form backend integration)
│   ├── pricing.astro                (pricing restructure)
│   ├── en/pricing.astro             (English mirror)
│   └── projectes/[slug].astro       (case study template)
│
├── components/
│   ├── hero-section.astro           (NEW: extracted, reusable hero)
│   ├── services-grid.astro          (NEW: segmented services display)
│   ├── case-study-template.astro    (NEW: problem-solution-result)
│   ├── pricing-table.astro          (NEW: unified pricing)
│   └── form-handler.astro           (NEW: Netlify Forms wrapper)
│
└── data/
    ├── services-es.ts              (refactor: add tier, description)
    ├── services-en.ts              (refactor: English tier names)
    ├── pricing-es.ts               (NEW: structured pricing tiers)
    ├── pricing-en.ts               (NEW: English pricing)
    ├── case-studies-es.ts          (NEW: problem-solution-result schema)
    └── case-studies-en.ts          (NEW: English schema)
```

---

# Tasks

### Task 1: Refactor services data structure (ES + EN)

**Files:**
- Modify: `src/data/services-es.ts` (lines 1-50 approximate current length)
- Modify: `src/data/services-en.ts`
- Test: Manual verification of data shape

**Interfaces:**

**Consumes:** Current services array with id, name, description.

**Produces:** 
```typescript
interface Service {
  id: string;
  tier: 'web' | 'app' | 'optimization';
  tier_label_es: string;  // "Diseño Web", "Aplicaciones", "Ingeniería"
  tier_label_en: string;  // "Web Design", "Applications", "Engineering"
  name_es: string;
  name_en: string;
  problem_es: string;     // Business problem, not technical
  problem_en: string;
  benefit_es: string;     // Business outcome
  benefit_en: string;
  pricing_es: { initial: number; monthly: number; };
  pricing_en: { initial: number; monthly: number; };
}
```

- [ ] **Step 1: Read current `src/data/services-es.ts`**

Run: `Get file content`

Note: Identify current service list and structure.

- [ ] **Step 2: Rewrite `src/data/services-es.ts`**

Add tier, problem_es (business phrasing), benefit_es, pricing.

Example structure:
```typescript
export const services = [
  {
    id: 'local-web',
    tier: 'web',
    tier_label_es: 'Diseño Web',
    name_es: 'Digitalización Local',
    problem_es: 'Tu negocio no aparece en Google; pierdes clientes que no te encuentran online.',
    benefit_es: 'Aparecer en buscadores, recibir más consultas, vender online.',
    pricing_es: { initial: 290, monthly: 49 },
    // ... EN versions
  },
  // ... other services grouped by tier
];
```

- [ ] **Step 3: Mirror EN version in `src/data/services-en.ts`**

Translate tier_label_en, name_en, problem_en, benefit_en to English.

- [ ] **Step 4: Verify both files export matching shape**

Run: `npx astro check`

Expected: No TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/data/services-es.ts src/data/services-en.ts
git commit -m "refactor: add tier, problem, benefit to services schema"
```

---

### Task 2: Create pricing data structure (ES + EN)

**Files:**
- Create: `src/data/pricing-es.ts`
- Create: `src/data/pricing-en.ts`
- Test: Data validation

**Interfaces:**

**Consumes:** Services refactored from Task 1.

**Produces:**
```typescript
interface PricingTier {
  service_id: string;
  initial_cost: number;
  initial_label_es: string;  // "Creación"
  monthly_cost: number;
  monthly_label_es: string;  // "Mantenimiento"
  includes_es: string[];     // ["Diseño", "Desarrollo", "Hosting primer año", ...]
  min_duration_months: number;  // 12
}
```

- [ ] **Step 1: Create `src/data/pricing-es.ts` with complete pricing structure**

```typescript
export const pricingTiers = [
  {
    service_id: 'local-web',
    initial_cost: 290,
    initial_label_es: 'Creación',
    monthly_cost: 49,
    monthly_label_es: 'Mantenimiento',
    includes_es: [
      'Diseño adaptado a móvil',
      'Desarrollo en Astro/React',
      'Hosting primer año',
      'Dominio (.es)',
      'SSL/HTTPS',
      'Actualizaciones de seguridad'
    ],
    min_duration_months: 12
  },
  // ... rest of tiers
];
```

- [ ] **Step 2: Create `src/data/pricing-en.ts` with English labels**

Mirror structure, translate labels and includes to English.

- [ ] **Step 3: Commit**

```bash
git add src/data/pricing-es.ts src/data/pricing-en.ts
git commit -m "feat: add structured pricing data"
```

---

### Task 3: Create case-study data schema

**Files:**
- Create: `src/data/case-studies-es.ts`
- Create: `src/data/case-studies-en.ts`

**Interfaces:**

**Produces:**
```typescript
interface CaseStudy {
  id: string;
  slug: string;
  problem_es: string;         // "¿Cuál era el problema del cliente?"
  problem_en: string;
  solution_es: string;        // "¿Qué solución se desarrolló?"
  solution_en: string;
  result_es: string;          // "¿Qué consiguió? (mensurable)"
  result_en: string;
  technologies: string[];
  service_id: string;         // Link to services
  year: number;
}
```

- [ ] **Step 1: Create `src/data/case-studies-es.ts`**

```typescript
export const caseStudies = [
  {
    id: 'pizzeria-xativa',
    slug: 'pizzeria-xativa',
    problem_es: 'Pizzería local sin presencia online. Clientes no podían ver la carta, hacer reservas ni pedir online. Dependía de intermediarios (Uber, Just Eat) con comisiones altas.',
    solution_es: 'Desarrollé una web con carta digital interactiva, sistema de reservas integrado y pasarela de pago para pedidos online. Migración desde intermediarios a contacto directo.',
    result_es: '40% más consultas/mes. Reducción de comisiones por intermediarios. Mejor control de datos de clientes.',
    technologies: ['Astro', 'React', 'Stripe', 'Tailwind'],
    service_id: 'local-web',
    year: 2025
  },
  // ... more studies
];
```

- [ ] **Step 2: Create `src/data/case-studies-en.ts` (English version)**

- [ ] **Step 3: Commit**

```bash
git add src/data/case-studies-es.ts src/data/case-studies-en.ts
git commit -m "feat: add case study schema with problem-solution-result"
```

---

### Task 4: Rewrite homepage hero section (ES + EN)

**Files:**
- Modify: `src/pages/index.astro` (hero section, lines 1-100 approx)
- Modify: `src/pages/en/index.astro`
- Test: Visual check, copy verification

**Interfaces:**

**Consumes:** Refactored services from Task 1.

**Produces:** New hero copy emphasizing business outcomes, not technology.

- [ ] **Step 1: Read current `src/pages/index.astro` hero section**

Identify current heading, subheading, CTA buttons.

- [ ] **Step 2: Rewrite hero in `src/pages/index.astro`**

New copy (ES):

```
# Tu negocio necesita una web que trabaje por ti.

Diseño y desarrollo de páginas web, aplicaciones a medida y cartas digitales para empresas y negocios que quieren captar clientes, mejorar procesos y crecer.

Desde Xàtiva, para Valencia y toda España.

[SOLICITAR PRESUPUESTO] [VER PROYECTOS]

✓ Trato directo, sin intermediarios.
✓ Precio y alcance definidos antes de empezar.
✓ El código, el dominio y las cuentas son tuyos.
```

Focus: Business outcomes (capture clients, improve processes, grow) → then explain how (direct contact, transparent pricing, code ownership).

- [ ] **Step 3: Mirror EN version in `src/pages/en/index.astro`**

English copy:

```
# Your business needs a web that works for you.

Web design, custom applications, and digital menus for businesses that want to attract clients, streamline operations, and grow.

From Xàtiva, serving Valencia and all of Spain.

[GET A QUOTE] [SEE PROJECTS]

✓ Direct contact, no middlemen.
✓ Price and scope locked before we start.
✓ Code, domain, and accounts are yours.
```

- [ ] **Step 4: Verify links and CTAs work**

Run: `npm run dev`
Expected: Hero renders, buttons link to /contact, /projectes

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro src/pages/en/index.astro
git commit -m "rewrite: hero messaging focused on business outcomes"
```

---

### Task 5: Refactor services display section (homepage)

**Files:**
- Modify: `src/pages/index.astro` (services section)
- Modify: `src/pages/en/index.astro`
- Create: `src/components/services-grid.astro` (NEW)

**Interfaces:**

**Consumes:** Services data from Task 1 (tier, problem_es, benefit_es).

**Produces:** Services grid showing 3 tiers (Web / Apps / Optimization), with problem + benefit copy (not tech buzzwords).

- [ ] **Step 1: Create `src/components/services-grid.astro`**

Component displays services grouped by tier. Each card shows:
- Tier name (Diseño Web, Aplicaciones, Ingeniería)
- Problem (business language)
- Benefit (outcome)
- CTA: "Ver más" → to `/servicios` or service detail

```astro
---
import { services } from '@/data/services-es';

const servicesByTier = services.reduce((acc, svc) => {
  if (!acc[svc.tier]) acc[svc.tier] = [];
  acc[svc.tier].push(svc);
  return acc;
}, {});
---

<section class="services-grid">
  {Object.entries(servicesByTier).map(([tier, tierServices]) => (
    <div class={`tier tier-${tier}`}>
      <h3>{tierServices[0].tier_label_es}</h3>
      {tierServices.map(svc => (
        <div class="card">
          <h4>{svc.name_es}</h4>
          <p class="problem">{svc.problem_es}</p>
          <p class="benefit">{svc.benefit_es}</p>
          <a href={`/servicios#${svc.id}`}>Ver más →</a>
        </div>
      ))}
    </div>
  ))}
</section>
```

- [ ] **Step 2: Update `src/pages/index.astro` to use new services-grid component**

Replace old services section with `<Services />`.

- [ ] **Step 3: Create English version in `src/components/services-grid-en.astro` or accept i18n prop**

Accept `lang="es" | "en"` prop and pass correct data.

- [ ] **Step 4: Update `src/pages/en/index.astro` to use services component with EN data**

- [ ] **Step 5: Verify services render correctly in dev**

Run: `npm run dev`
Expected: 3 tiers (Web, Apps, Optimization) with problems and benefits visible.

- [ ] **Step 6: Commit**

```bash
git add src/components/services-grid.astro src/pages/index.astro src/pages/en/index.astro
git commit -m "refactor: services display focused on business problems and benefits"
```

---

### Task 6: Implement form backend (Netlify Forms)

**Files:**
- Modify: `src/pages/contact.astro`
- Create: `src/components/form-handler.astro`

**Interfaces:**

**Consumes:** Contact page data structure.

**Produces:** Form with name, phone, service, project description, email. Posts to Netlify backend; success message shown; Jaume receives email notification.

- [ ] **Step 1: Read current `src/pages/contact.astro`**

Identify form fields and current `mailto:` behavior.

- [ ] **Step 2: Replace `mailto:` with Netlify Forms in `src/pages/contact.astro`**

```html
<form name="contact" method="POST" netlify>
  <input type="text" name="name" placeholder="Tu nombre" required />
  <input type="email" name="email" placeholder="tu@email.com" required />
  <input type="tel" name="phone" placeholder="Teléfono (opcional)" />
  <select name="service" required>
    <option value="">Selecciona un servicio</option>
    <option value="local-web">Diseño Web</option>
    <option value="app">Aplicación</option>
    <option value="optimization">Optimización</option>
  </select>
  <textarea name="project" placeholder="Cuéntame tu proyecto..." required></textarea>
  <button type="submit">Enviar Solicitud</button>
</form>
```

Netlify auto-configures on deploy.

- [ ] **Step 3: Add success message UI**

On form submit success, show:
```
"✓ Solicitud enviada. Te responderé en menos de 24 horas laborables."
```

- [ ] **Step 4: Test form locally with `netlify dev` or mock submission**

Run: `npm run dev` (form won't actually send locally, but structure validates)
Expected: Form renders, no JS errors.

- [ ] **Step 5: Mirror EN version in `src/pages/en/contact.astro`**

English field labels and placeholders.

- [ ] **Step 6: Commit**

```bash
git add src/pages/contact.astro src/pages/en/contact.astro
git commit -m "feat: replace mailto with Netlify Forms backend"
```

---

### Task 7: Restructure pricing page

**Files:**
- Modify: `src/pages/pricing.astro`
- Modify: `src/pages/en/pricing.astro`
- Create: `src/components/pricing-table.astro`

**Interfaces:**

**Consumes:** Pricing data from Task 2.

**Produces:** Clear pricing table with: Service | Initial Cost | Monthly | Includes | CTA.

Plus: **Maintenance terms section** clearly stating:
- What's included (security updates, monitoring, support)
- Response SLA
- Minimum duration (12 months)
- Cancel/exit terms

- [ ] **Step 1: Create `src/components/pricing-table.astro`**

```astro
---
import { pricingTiers } from '@/data/pricing-es';
---

<section class="pricing">
  <h2>Precios Transparentes y Claros</h2>
  <table>
    <thead>
      <tr>
        <th>Servicio</th>
        <th>Creación</th>
        <th>Mantenimiento</th>
        <th>Incluye</th>
        <th>Acción</th>
      </tr>
    </thead>
    <tbody>
      {pricingTiers.map(tier => (
        <tr>
          <td>{tier.service_name}</td>
          <td>€{tier.initial_cost}</td>
          <td>€{tier.monthly_cost}/mes</td>
          <td>
            <ul>
              {tier.includes_es.map(inc => <li>{inc}</li>)}
            </ul>
          </td>
          <td><a href="/contact">Solicitar</a></td>
        </tr>
      ))}
    </table>
  </table>

  <section class="maintenance-terms">
    <h3>Términos de Mantenimiento</h3>
    <p><strong>Incluye:</strong> Actualizaciones de seguridad, backups diarios, monitoreo 24/7, soporte por email.</p>
    <p><strong>Duración mínima:</strong> 12 meses.</p>
    <p><strong>Tiempo de respuesta:</strong> Menos de 24 horas laborables.</p>
  </section>
</section>
```

- [ ] **Step 2: Update `src/pages/pricing.astro` to use pricing-table component**

- [ ] **Step 3: Create EN version in component or pass language prop**

- [ ] **Step 4: Update `src/pages/en/pricing.astro`**

- [ ] **Step 5: Test pricing page in dev**

Run: `npm run dev` → navigate to `/pricing`
Expected: Table renders, all 3-5 services visible with clear pricing.

- [ ] **Step 6: Commit**

```bash
git add src/components/pricing-table.astro src/pages/pricing.astro src/pages/en/pricing.astro src/data/pricing-es.ts
git commit -m "refactor: pricing page with clear terms and maintenance details"
```

---

### Task 8: Convert project pages to case-study format

**Files:**
- Modify: `src/pages/projectes/[slug].astro` (template)
- Modify: `src/pages/en/projectes/[slug].astro` (EN template)
- Create: `src/components/case-study-template.astro`
- Update: Individual project `.md` files to include problem/solution/result frontmatter

**Interfaces:**

**Consumes:** Project markdown files + case-study schema from Task 3.

**Produces:** Project detail pages showing: Problem | Why It Mattered | What We Built | Result (measurable).

- [ ] **Step 1: Create `src/components/case-study-template.astro`**

```astro
---
interface Props {
  problem_es: string;
  solution_es: string;
  result_es: string;
  technologies: string[];
  year: number;
}

const { problem_es, solution_es, result_es, technologies, year } = Astro.props;
---

<article class="case-study">
  <section class="problem">
    <h2>El Problema</h2>
    <p>{problem_es}</p>
  </section>

  <section class="solution">
    <h2>La Solución</h2>
    <p>{solution_es}</p>
  </section>

  <section class="result">
    <h2>El Resultado</h2>
    <p class="highlight">{result_es}</p>
  </section>

  <section class="tech">
    <h3>Tecnologías</h3>
    <ul>
      {technologies.map(t => <li>{t}</li>)}
    </ul>
  </section>

  <p class="year">Completado en {year}</p>
</article>
```

- [ ] **Step 2: Update `src/pages/projectes/[slug].astro` to use case-study-template**

Extract problem_es, solution_es, result_es from frontmatter/content collection and pass to component.

- [ ] **Step 3: Update existing project markdown files with frontmatter**

Example: `src/content/projectes-es/pizzeria-xativa.md`:

```yaml
---
title: Pizzería Xàtiva
problem_es: "..."
solution_es: "..."
result_es: "..."
technologies: ["Astro", "React", ...]
year: 2025
---
```

- [ ] **Step 4: Mirror EN versions in `src/content/projectes-en/` with problem_en, solution_en, result_en**

- [ ] **Step 5: Test project detail pages**

Run: `npm run dev` → navigate to `/projectes/pizzeria-xativa`
Expected: Problem, solution, result, technologies, year visible.

- [ ] **Step 6: Commit**

```bash
git add src/components/case-study-template.astro src/pages/projectes/[slug].astro src/pages/en/projectes/[slug].astro
git commit -m "refactor: project pages as complete case studies (problem-solution-result)"
```

---

### Task 9: Create /servicios landing page (optional, high-value)

**Files:**
- Create: `src/pages/servicios/index.astro`
- Create: `src/pages/en/servicios/index.astro`
- Create: `src/pages/servicios/[slug].astro` (service detail)
- Create: `src/pages/en/servicios/[slug].astro`

**Interfaces:**

**Consumes:** Services data from Task 1.

**Produces:** Service overview page listing all 3 tiers. Detail pages for each service (problem → benefit → pricing → examples → CTA).

- [ ] **Step 1: Create `/servicios/index.astro` landing**

Lists 3 service tiers with icons/cards. Links to detail pages.

- [ ] **Step 2: Create `/servicios/[slug].astro` detail template**

Each service shows:
- What is it?
- Business problem it solves
- Benefits
- Pricing (from Task 2)
- 2-3 related case studies
- CTA: Solicitar presupuesto

- [ ] **Step 3: Create EN equivalents**

- [ ] **Step 4: Test service pages render**

- [ ] **Step 5: Commit**

```bash
git add src/pages/servicios/
git commit -m "feat: add /servicios landing and detail pages"
```

---

### Task 10: Update internal links and CTAs across site

**Files:**
- Modify: `src/pages/index.astro` (hero CTA → /contact, /projectes)
- Modify: `src/pages/en/index.astro`
- Modify: Any other pages with CTAs
- Update: Navigation menus if needed

**Interfaces:**

**Consumes:** All pages created/modified in Tasks 1-9.

**Produces:** Consistent CTA flow: Homepage → understand problem → see examples → request quote → contact form.

- [ ] **Step 1: Audit all CTAs in index, services, pricing, projects**

Ensure all "Solicitar presupuesto" buttons link to `/contact`.

- [ ] **Step 2: Add breadcrumbs or navigation to service detail pages**

Users should know: service-detail → /servicios → home.

- [ ] **Step 3: Verify no dead links**

Run: `npm run build` (or use `astro check`)
Expected: No 404 errors, all links resolve.

- [ ] **Step 4: Commit**

```bash
git add src/pages/
git commit -m "chore: unify CTAs and internal navigation"
```

---

### Task 11: Accessibility audit + fixes

**Files:**
- Modify: Components with accessibility improvements
- Test: axe DevTools or WAVE

**Interfaces:**

**Produces:** Components and pages pass WCAG AA baseline (forms, headings, color contrast, alt text, keyboard navigation).

- [ ] **Step 1: Run accessibility check on homepage**

Run: `npx @axe-core/cli http://localhost:3000` (after `npm run dev`)
Expected: Identify any color contrast, missing alt, form label issues.

- [ ] **Step 2: Fix identified issues**

Common: Missing `<label>` tags on form inputs, low color contrast on text, missing alt text on project images.

- [ ] **Step 3: Re-run check**

Expected: PASS with no Errors or Warnings (Notices okay).

- [ ] **Step 4: Commit**

```bash
git add src/
git commit -m "fix: accessibility improvements (WCAG AA baseline)"
```

---

### Task 12: Integration test + final QA

**Files:**
- Test: Homepage flow: hero → understand problem → see projects → contact form
- Test: Service pages load
- Test: Pricing clear
- Test: Mobile responsive
- Test: Form submission (Netlify)

- [ ] **Step 1: Manual QA checklist**

- [ ] Hero copy clear to non-technical user?
- [ ] Services segmentation obvious?
- [ ] Pricing table unambiguous?
- [ ] Case studies show problem+result?
- [ ] Form doesn't depend on email client?
- [ ] Mobile layout readable (<768px)?
- [ ] Links work?
- [ ] Lighthouse Accessibility still >90?

- [ ] **Step 2: Deploy to staging or test branch**

- [ ] **Step 3: Test form submission**

Fill form on staging → should receive email in jaumetur@... inbox.

- [ ] **Step 4: Commit final QA notes**

```bash
git add -A
git commit -m "test: Phase 1 manual QA complete, ready for review"
```

---

# Self-Review Against Spec

**Spec coverage:**

| Spec requirement | Task | Status |
|---|---|---|
| Hero rewrite (business outcomes) | Task 4 | ✓ |
| Services segmentation (web/app/opt) | Task 1, 5 | ✓ |
| Form backend (not mailto) | Task 6 | ✓ |
| Case studies (problem-solution-result) | Task 8 | ✓ |
| Pricing clarity + maintenance terms | Task 2, 7 | ✓ |

**Step scan:** Each step lets implementer write exactly one reasonable thing (test, code, verification). No ambiguous "handle edge cases." ✓

**Type consistency:** Services tier names match across tasks (tier: 'web', 'app', 'optimization'). Pricing service_id references services.id. ✓

**Review Focus:** 5 failure modes identified; tests added to owning tasks:
1. Service segmentation → Task 5 step 5 (verify tiers render distinct)
2. Mailto friction → Task 6 (Netlify backend, no email client dependency)
3. Weak case studies → Task 8 step 5 (problem+solution+result present)
4. Hero jargon → Task 4 step 2 (business outcome phrasing)
5. Pricing ambiguity → Task 7 step 5 (maintenance terms section visible)

✓

**Proportion:** Plan ~700 lines for ~2000 lines of new/modified code. Reasonable ratio. ✓

---

# Execution Readiness

**Plan complete and saved to `docs/superpowers/plans/2026-11-12-phase-1-critical.md`.**

Plan ready for execution. Choose method:

- **Subagent-driven:** Each task implemented by fresh agent, reviewed independently, then final PR review. Most thorough; highest token cost.
- **Native:** I implement all tasks in this session, full commit history in chat, one final code-reviewer check before merge. Faster, cheaper.

**My recommendation:** **Native**, because:
- Tasks are sequential (each builds on previous data structures).
- Interfaces are tightly coupled (services → pricing → homepage display → case studies).
- A subagent-per-task adds context overhead. One implementation pass + final review is more efficient.

Does the plan capture what you want, and which approach should we use?
