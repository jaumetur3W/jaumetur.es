# Pla de Mesurament, Analítica i KPIs Tècnics
**Projecte:** `jaumetur.es`  
**Autor:** Jaume Tur — Frontend & Web Apps Engineer  
**Filosofia:** Mesurament centrat en la privadesa (sense cookies invasives, compatible amb RGPD sense banners molests), màxima precisió en l'embut de conversió orgànica.

---

## 1. Quadre de Comandament de KPIs (Dashboard de Rendiment)

### A. Mètriques d'Adquisició Orgànica (SEO)
| KPI | Objectiu a 3 Mesos | Objectiu a 6 Mesos | Font de Dades |
|---|---|---|---|
| **Impressions a Google Search** | > 15.000 / mes | > 50.000 / mes | Google Search Console |
| **Clics Orgànics Totals** | > 800 / mes | > 3.000 / mes | Google Search Console |
| **CTR Mitjà a les SERPs** | > 3.8% | > 4.5% | Google Search Console |
| **Keywords al Top 10** | > 15 keywords | > 45 keywords | GSC / Ahrefs / Semrush |
| **Keywords al Top 3** | > 5 keywords | > 15 keywords | GSC / Ahrefs / Semrush |
| **Trànsit de Referència (Social & Devs)** | > 200 visites / mes | > 600 visites / mes | Plausible / Umami Analytics |

### B. Mètriques de Compromís i Retenció (Engagement)
| KPI | Valor Esperat | Significat Tècnic |
|---|---|---|
| **Temps mitjà de lectura a articles** | > 3 minuts i 30 segons | Confirma lectura real del codi i les explicacions |
| **Taxa de Scroll > 75%** | > 45% dels lectors | Valida la qualitat del contingut i l'atractiu del disseny |
| **Interacció amb blocs de codi (Copiat)** | > 8% dels lectors | L'usuari troba el codi útil per als seus propis projectes |
| **Ús de l'eina interactiva (`/tools/workflow-generator`)** | > 120 generacions/mes | Eina útil com a generadora de backlinks i retenció |

### C. Mètriques de Conversió de Negoci (Leads & Contacte)
| Esdeveniment de Conversió | Acció de l'Usuari | Canal / Destí |
|---|---|---|
| **Click a Formulari de Contacte** | Clic a botons "Contactar", "Parlem" | `/contact` |
| **Enviament de Sol·licitud de Pressupost** | Formulari de contacte o correu enviat | Email directe `jaume@jaumetur.es` |
| **Descàrrega / Subscripció Lead Magnet** | Clic a "Vull la Checklist de Rendiment" | Base de dades de subscriptors |
| **Visualització de Projectes en Producció** | Clics a demos de projectes (AVISA, Pizzeria) | Enllaços externs a Vercel / GitHub |

---

## 2. Configuració de Google Search Console & Bing Webmaster Tools

### Pas 1: Verificació del Domini a GSC
1. Accedir a [Google Search Console](https://search.google.com/search-console).
2. Afegir propietat de tipus **Domini**: `jaumetur.es` (recomanat) o **Prefix d'URL**: `https://jaumetur.es`.
3. Per a verificació per DNS (propietat de Domini):
   - Afegir un registre TXT al proveïdor de DNS (Cloudflare, Nominalia o DonDominio):
     ```text
     Tipo: TXT
     Nombre: @ (o jaumetur.es)
     Valor: google-site-verification=EL_TEU_TOKEN_DE_GOOGLE
     TTL: Automàtic
     ```
4. Alternativament (ja configurat al layout): L'etiqueta HTML `<meta name="google-site-verification" content="..." />` a `Layout.astro`.

### Pas 2: Enviament del Sitemap
- A la secció **Sitemaps** de GSC, afegir:
  ```text
  https://jaumetur.es/sitemap-index.xml
  ```
- Comprovar que l'estat indique *"Correcte"* amb les rutes detectades (`/`, `/about`, `/blog`, `/pricing`, `/contact`, `/uses`, `/tools/workflow-generator`, `/blog/*`).

### Pas 3: Verificació a Bing Webmaster Tools
1. Accedir a [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Importar directament la propietat des de Google Search Console amb un sol clic (mètode més ràpid).
3. O bé utilitzar l'etiqueta meta:
   ```html
   <meta name="msvalidate.01" content="EL_TEU_TOKEN_DE_BING" />
   ```

---

## 3. Analítica Ètica i Respectuosa amb la Privadesa (Sense Cookies)

Recomanem utilitzar **Plausible Analytics** o **Umami** (auto-allotjat o cloud gratuït).
A `src/layouts/Layout.astro` ja s'ha integrat l'etiqueta amb càrrega diferida:
```html
<!-- Analytics lleuger (sense cookies, conforme amb RGPD) -->
<script defer data-domain="jaumetur.es" src="https://plausible.io/js/script.tagged-events.js"></script>
```

### Esdeveniments Personalitzats (Custom Events) Implementats:
1. `copy_code_snippet`: Quan el lector fa clic al botó de copiar codi d'un article.
2. `workflow_yaml_generated`: Quan un usuari genera un pipeline a `/tools/workflow-generator`.
3. `contact_click`: Quan es fa clic a qualsevol CTA de contacte o pressupost.
4. `download_lead_magnet`: Quan es sol·licita la checklist tècnica.

---

## 4. Rutina de Revisió Periòdica (Feedback Loops)

- **Setmanal (15 minuts):**
  - Revisar errors de rastreig o pàgines no indexades a GSC.
  - Comprovar queries emergents a la pestanya de Rendiment per a detectar noves oportunitats de contingut.
- **Mensual (45 minuts):**
  - Actualitzar el document `CONTENT_PLAN.md` amb noves paraules clau derivades de les impressions reals de cerca.
  - Revisar els Core Web Vitals (LCP, CLS, INP) a l'informe real d'usuaris (CrUX) a GSC.
- **Trimestral (2 hores):**
  - Auditoria completa de continguts antics: actualitzar versions de llibreries, millorar snippets i afegir nous enllaços interns cap als articles recents.
