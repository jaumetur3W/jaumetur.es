# Prompt: rediseño total de jaumetur.es

Copia todo lo que hay debajo de la línea y pégalo en Claude Code.

---

Quiero que rediseñes **por completo** la web jaumetur.es (este repositorio, Astro 5 + Tailwind). No es un retoque: es un rediseño total de la capa visual y de la estructura de las páginas, hecho por ti como si fueras un director de arte y diseñador de producto senior con criterio propio. **Tienes libertad absoluta de diseño.** Antes de escribir código, carga y usa tus skills de diseño (frontend-design, ui-ux-pro-max, diseño/brand, review visual con navegador) y trabaja con disciplina profesional: primero dirección de arte, luego sistema de diseño, luego construcción, luego revisión visual real con capturas.

## La única restricción de marca

El color principal de la marca es el **amarillo intenso `#FFFF00` exacto** y debe mantenerse como color de marca. Cuánto lo uses es decisión tuya: puede dominar la web, puede ser solo un acento quirúrgico, o puede aparecer únicamente en el nombre/logo. Lo que exijo es **armonía**: una dirección de arte coherente, con una paleta completa construida alrededor de ese amarillo (neutros, fondos, un posible color secundario), tipografía elegida con intención y jerarquía visual clara. Regla dura de accesibilidad: `#FFFF00` nunca como color de texto sobre fondos claros; texto sobre amarillo siempre casi-negro. Todo contraste debe cumplir WCAG AA.

## Libertad creativa

Elige tú la dirección (editorial, suiza/grid, brutalista refinada, dark, light, lo que defiendas) y comprométele toda la web: nada de mezclar estilos por página. Puedes rehacer desde cero layouts, componentes, navegación, footer, hero, tarjetas, tablas de precios, animaciones y microinteracciones. Puedes reorganizar secciones dentro de cada página si mejora el discurso comercial. Evita a toda costa el aspecto de plantilla genérica de Tailwind: quiero que parezca el estudio de alguien que diseña de verdad.

## Lo que debe conservarse (no negociable)

1. **Todo el contenido y todas las páginas actuales.** Puedes reescribir la presentación, no eliminar apartados. Inventario completo (cada una con su equivalente en inglés bajo `/en/`):
   - **Home** con todas sus secciones: hero, los 5 servicios, "quien te atiende es quien lo construye" (trato directo / todo es tuyo / precio cerrado), proyectos destacados (AVISA y Pizzería Xàtiva, abribles en vivo), proceso en 4 pasos, **oferta de lanzamiento** (plazas limitadas, sin honorarios de desarrollo), sobre mí, FAQ y CTA final.
   - **/servicios** y las páginas de precios **/pricing** + **/pricing/[slug]** con los 5 servicios: Digitalización local y carta web, Landing page de alto rendimiento, Aplicación SPA con Angular, Optimización y accesibilidad, Pipelines CI/CD. Cada uno con precio de creación, cuota mensual de mantenimiento (permanencia mínima de un año), comparativas de mercado y desglose de qué incluye.
   - **/projectes** + casos de estudio individuales (9 proyectos, formato problema–solución–resultado).
   - **/blog** + artículos individuales (19 posts técnicos en MDX/Markdown, con tipografía de lectura cuidada).
   - **/about**, **/contact** (formulario Web3Forms funcional; el email es el canal de contacto principal, por delante de WhatsApp), **/briefing**, **/card** (tarjeta de visita digital), **/captacion-clientes**, **/qualitat**, **/tools/creador-html**, **/tools/workflow-generator**.
   - Legales: **/aviso-legal**, **/privacidad**, **/cookies** + banner de consentimiento de cookies. Y la **404**.
2. **Bilingüe ES/EN intacto**: cada cambio de diseño se aplica a ambas versiones; no rompas el sistema i18n ni dejes claves de traducción sin definir.
3. **URLs, SEO y datos actuales**: no cambies rutas ni slugs; conserva titles, metadescripciones, datos estructurados, sitemap y RSS. Los datos de servicios/precios viven en `src/data/` y los contenidos en `src/content/`: úsalos como fuente, no los dupliques en los componentes.
4. **Rendimiento y accesibilidad**: sitio estático Astro, imágenes optimizadas, sin JS innecesario; navegación por teclado, focus visible, aria correcto.

## Cómo quiero que trabajes

- Trabaja en una rama nueva dedicada al rediseño.
- Define primero el sistema de diseño como tokens en `src/styles/global.css` (paleta, tipografías — elige fuentes con carácter, no la default del sistema—, escala de espaciado, radios, sombras) y construye todo desde esos tokens.
- Reconstruye los componentes compartidos (navbar, footer, botones, tarjetas, formularios, tabla de precios, banner de cookies) antes que las páginas, para que todo sea consistente.
- Verifica de verdad: `npm run build` debe pasar con las ~100 páginas, y revisa el resultado en el navegador con capturas en desktop (1440px) y móvil (375px) de al menos home, servicios, un caso de estudio, un post del blog, pricing y contact. Sin overflow horizontal, sin texto ilegible, sin amarillo sobre blanco en texto.
- No me preguntes por decisiones estéticas: decide tú y defiéndelo. Pregunta solo si algo amenaza contenido, URLs o datos.
- Al terminar, enséñame capturas del antes/después y un resumen corto de la dirección de arte elegida.
