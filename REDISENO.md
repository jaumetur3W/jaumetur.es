# Propuesta de rediseño (rama `propuesta-web-nueva`)

Base: `origin/main` (última versión fiable). Sin datos nuevos: todo el contenido sale de lo ya publicado
(servicios y precios, proyectos, formación, contacto).

## Qué cambia
- **Diseño**: amarillo de marca (#FFFF00) como protagonista + negro tinta + papel crema; estilo editorial con sombras duras.
  Tipografías: Bricolage Grotesque (titulares) + Inter (texto), alojadas en local.
- **Portada**: hero con propuesta de valor, datos clave, servicios con precio, antes/después para negocios locales,
  proyectos, proceso, sobre mí, FAQ y CTA final.
- **Páginas rehechas**: portada, servicios (`/pricing`, `/pricing/[slug]`), proyectos (`/projectes`, `/projectes/[slug]`), sobre mí, contacto, 404, cabecera y pie.
- **Eliminado**: blog (páginas, contenido, RSS, redirects), `/marca`, `/uses`, generador de workflows, easter eggs y componentes del hero antiguo.

## SEO
- Títulos y descripciones con palabras clave locales (diseño web Xàtiva/Valencia, desde 290 €).
- JSON-LD: Person, WebSite, ProfessionalService con `OfferCatalog` (precios reales), FAQPage en portada,
  Service + BreadcrumbList en servicios, ItemList/CreativeWork en proyectos.
- hreflang es/en, canonical, sitemap sin páginas del blog, imágenes con dimensiones y carga diferida, fuentes precargadas.

## Pendiente de revisar
- Las pruebas E2E (`tests/e2e/flows.spec.ts`, etc.) describen la interfaz antigua y necesitan actualizarse.
- Las páginas heredadas (legales, briefing, calidad, tarjeta) conservan su maquetación con la nueva tipografía.

---
## Idea B (rama `propuesta-web-nueva-2`): «Modo oscuro premium»
Mismo contenido y estructura, concepto visual distinto: fondo casi negro, amarillo neón de acento,
tarjetas bento con borde fino y brillo al pasar el cursor, tipografía Space Grotesk + Inter,
servicios en rejilla bento, proyectos en carrusel horizontal y proceso como línea de tiempo.

---
## Rediseño integral «Presupuesto de taller» (rama `rediseno-integral`, publicada en `propuesta-web-nueva-2`)
Concepto, color, tipografía y componentes: ver `DESIGN.md`. Contexto de producto: `PRODUCT.md`.
- Rehechas: portada, servicios y detalle, proyectos y detalle, sobre mí, contacto (y formulario), 404, cabecera, pie.
- Adaptadas al nuevo sistema: blog, calidad, briefing, tarjeta digital, herramientas, legales.
- Eliminados del contenido los datos numéricos sin fuente (porcentajes de conversión, «< 0,5 s», «99,9 % uptime»).
- Pendiente: las mediciones de `/qualitat` son del 4-nov-2026 (antes del rediseño) y deben volver a medirse.
