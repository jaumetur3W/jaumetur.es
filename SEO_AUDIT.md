# Auditoría SEO y optimización — jaumetur.es (noviembre 2026)

Sustituye a la auditoría anterior (octubre 2026), que describía una versión ya obsoleta del sitio (catalán, blog de plantilla, `/uses`, etc.). Se conserva en el historial de git.

**Alcance:** 92 páginas generadas (69 indexables, 23 no indexables o de redirección lógica: 404, briefing y copias `/en/blog/<artículo>`) más 81 stubs de redirección. Auditoría sobre la build local (`dist/`) — **no sobre producción**, que aún sirve la versión anterior.

## Herramientas realmente utilizadas
- **Plugin Claude SEO 2.5.0** (26 skills: audit, technical, schema, local, geo, images, sitemap, hreflang, content, page…): está instalado en `~/.claude/plugins`, pero **sus skills no se cargaron como invocables en esta sesión** (el plugin se instaló durante la sesión). Se leyó su metodología (`seo-audit`) y se aplicó con un rastreador propio sobre `dist/`; no se ejecutó ninguna de sus skills ni scripts.
- **Datos reales de Search Console:** solo la exportación CSV del 4-nov-2026 (no hay API autenticada).
- **Sin acceso** a DataForSEO, Keyword Planner, PageSpeed API ni backlinks: no se citan volúmenes, dificultad, CrUX ni autoridad.
- **Playwright** (suite `tests/e2e/seo.spec.ts` nueva + 43 pruebas previas) y medición de laboratorio en navegador con CPU ×4 y 4G lenta.

## Problemas encontrados → estado
| # | Problema | Gravedad | Estado |
|---|---|---|---|
| 1 | 18 copias `/en/blog/<artículo>` con contenido en español: indexables, en sitemap, con hreflang `en` y canonical al ES (señales contradictorias, contenido duplicado) | Alta | **Corregido**: `noindex, follow`, canonical a la versión ES, sin hreflang, fuera del sitemap; `<html lang="es">` |
| 2 | Artículos sin schema `BlogPosting` (solo migas) y con una miga falsa (`#categoría`) | Alta | **Corregido**: `BlogPosting` autocontenido + `BreadcrumbList` real |
| 3 | `/tools/html-generator` duplicaba `/tools/creador-html` (mismo título, descripción y contenido) | Media | **Corregido**: redirección y eliminada la página |
| 4 | Títulos recortados en el `:` (p. ej. «HTML5 semántico: estructura», «JavaScript moderno: origen») | Media | **Corregido**: títulos completos o cortados en un límite natural |
| 5 | Schema `Person` + `ProfessionalService` + `OfferCatalog` repetidos en las 92 páginas; coordenadas `geo` no verificadas | Media | **Corregido**: entidades completas solo en `/`, `/about/`, `/contact/` (y EN); `WebPage` en cada página que referencia por `@id`; `geo` eliminado |
| 6 | Teléfono ausente del schema y de la web (NAP incompleto) | Media | **Corregido**: WhatsApp +34 644 525 838 visible en pie y contacto y en `telephone`/`contactPoint` |
| 7 | Enlaces internos sin barra final (`/blog`, `/contact`, `/pricing`…): redirecciones innecesarias y 404 en el servidor de pruebas | Media | **Corregido** en plantillas y en los artículos del blog (nuevo `localizeHref`) |
| 8 | Selector de idioma de la 404 apuntaba a `/404/` | Baja | **Corregido** |
| 9 | H1 genéricos («Precios claros…», «Hablemos de tu proyecto», «La persona que construirá tu web») sin intención de búsqueda | Media | **Corregido** (ver mapa) |
| 10 | Portada: título sin la palabra clave principal y demasiados precios a la vista | Media | **Corregido**: precio solo del servicio elegido en el presupuesto; el resto, en `/pricing/` |
| 11 | Títulos/descripciones cortas (aviso legal) | Baja | **Corregido** |
| 12 | Estadísticas sin fuente en descripciones (EN) | Media | **Corregido** (ya en la entrega anterior) |
| 13 | URLs antiguas `/blog/es-*` y `/val/*` aún en el índice de Google | Info | **No resoluble en el código**: GitHub Pages no permite 301; las redirecciones son `meta refresh` + `canonical`. Se resolverá con el tiempo |
| 14 | Mediciones de `/qualitat/` de 4-nov (previas al rediseño) | Baja | **Pendiente**: volver a medir |

## Estado actual verificado (build local)
- 92 páginas, 69 indexables; **0** títulos duplicados entre páginas indexables, **0** descripciones duplicadas, **1 H1** por página, **0** saltos de encabezado, **0** imágenes sin `alt` ni sin dimensiones, **0** enlaces internos rotos, **0** huérfanas.
- Canonical autorreferente en todas las páginas indexables; hreflang `es`/`en`/`x-default` coherente.
- JSON-LD: todos los bloques parsean; sin `@id` duplicados dentro de una página; un solo `WebSite` por página.
- Sitemap: 69 URLs únicas con barra final, sin `/val/`, 404, briefing ni copias noindex. `robots.txt` permite el rastreo y declara el sitemap.

## Rendimiento (laboratorio local, build de producción, móvil, 4G lenta y CPU ×4)
Valores de una sola ejecución en esta máquina; **no son datos de campo (CrUX)**.
- LCP 1,0–1,5 s, CLS 0–0,03 (`/projectes/`), TBT estimado ≤ 40 ms (un pico de 217 ms en `/contact/` por la limitación de CPU).
- 5–8 peticiones, 250–370 KB sin comprimir (CSS 98 KB, fuentes 110 KB, documento 30–60 KB, sin JavaScript de terceros). Imágenes ya en WebP con dimensiones y `loading="lazy"`.
- Cabeceras de caché: las fija GitHub Pages; no controlables desde el código.

## Datos estructurados implementados
`WebSite` (todas) · `WebPage` (todas las indexables) · `ProfessionalService` con `OfferCatalog` + `ContactPoint` (inicio, sobre mí, contacto) · `Person` (ídem) · `Service` + `BreadcrumbList` (servicios) · `ItemList` (servicios, proyectos) · `CreativeWork` + `BreadcrumbList` (casos) · `BlogPosting` + `BreadcrumbList` (artículos) · `FAQPage` (inicio). `LocalBusiness`/dirección postal: solo localidad (Xàtiva) — no hay dirección física pública verificable, no se inventa.

## Imágenes
Todas WebP, con `alt` donde aportan contenido, `alt=""` en decorativas (enlazadas con texto adyacente) y `width`/`height`. Renombradas `1.webp`→`jaume-tur-desarrollador-web.webp` y `3.webp`→`jaume-tur-contacto.webp`. Sin cambios: nombres de las portadas de blog (descriptivos, en catalán) y `2.webp`, `4.webp`… (avatares sin valor SEO).

## Recomendaciones (requieren datos o decisión)
1. Verificar y reclamar la ficha de Google Business Profile y mantener nombre/teléfono idénticos a la web.
2. Enviar el sitemap y revisar cobertura en Search Console tras desplegar; comprobar la indexación real (no se ha comprobado ninguna URL).
3. Medir CrUX/PageSpeed reales tras el despliegue y actualizar `/qualitat/`.
4. Contenido nuevo solo con datos reales: casos con permiso del cliente, reseñas verificables, página local de hostelería.
5. Traducir de verdad (o no) los artículos del blog; hasta entonces la copia EN permanece noindex.
6. Valorar un dominio con redirecciones 301 reales (Cloudflare/Netlify) para limpiar `/val/*` y `/blog/es-*`.
7. `llms.txt` y archivos similares: no se han añadido; no hay evidencia de beneficio demostrable.

## Pendiente de tiempo/datos de Google
Cualquier mejora de posiciones, impresiones, CTR o indexación **no puede afirmarse todavía**: depende del despliegue, del rastreo de Google y de semanas de datos.
