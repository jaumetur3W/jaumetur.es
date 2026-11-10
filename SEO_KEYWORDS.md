# Mapa de palabras clave por página

**Fuente de datos:** exportación real de Google Search Console (3 meses hasta el 4-nov-2026; carpeta `jaumetur.es-Performance-on-Search-2026-11-04/`) y análisis de intención de búsqueda.
**Límite importante:** no hay acceso a herramientas con volúmenes (Keyword Planner, DataForSEO, Semrush…), así que **no se citan volúmenes ni dificultad**. Los datos de Search Console son pocos (89 impresiones en consultas y 162 en páginas en 3 meses, 1 clic de consulta con nombre y 12 clics a páginas): sirven para orientar, no para concluir.

## Lo que muestran los datos reales
- Casi todo el tráfico es de marca: «jaume tur» (posición media 7) y la portada (28 % CTR, posición 5,2).
- Hay impresiones sin clic en consultas informativas con posiciones 50-96: «control de versiones distribuido» (38 impr. entre variantes), «tarjeta de fidelización google/apple wallet» (13), «pautas de accesibilidad web / wcag aa» (6).
- Búsqueda local real aunque minúscula: «posicionamiento seo la safor» (posición 67), «desarrollo backend a medida».
- Se indexaron URLs antiguas `/blog/es-*` y `/val/*` (ya redirigidas con canonical al destino actual).
- País: España (147 de 156 impresiones).

## Mapa (una intención principal por URL)
| URL | Palabra clave principal | Secundarias / long-tail | Intención |
|---|---|---|---|
| `/` | diseño web Xàtiva | diseño web Valencia, páginas web a medida, desarrollador web Xàtiva | Comercial / local |
| `/pricing/` | precio diseño web a medida | precios desarrollo web Valencia, cuánto cuesta una página web | Comercial (comparación) |
| `/pricing/digitalitzacio-local/` | carta digital para restaurante | carta QR sin PDF, página web para bar, Google Business Profile bar Xàtiva | Comercial local |
| `/pricing/landing-page/` | landing page a medida | página web para autónomos y pymes, web corporativa rápida | Comercial |
| `/pricing/angular-webapp/` | desarrollo de aplicación web a medida | desarrollador Angular freelance, aplicación SPA Angular | Comercial técnica |
| `/pricing/performance-audit/` | auditoría de rendimiento web | optimizar Core Web Vitals, accesibilidad web WCAG | Comercial técnica |
| `/pricing/cicd-devops/` | CI/CD con GitHub Actions | automatizar despliegues web, pipeline de despliegue continuo | Comercial técnica |
| `/projectes/` + fichas | (marca) casos de estudio web | AVISA PWA Angular, carta digital pizzería Xàtiva | Prueba social / marca |
| `/about/` | Jaume Tur desarrollador web | desarrollador web Xàtiva, CFGS DAW Xàtiva | Marca / confianza |
| `/contact/` | pedir presupuesto página web | contacto desarrollador web Valencia | Transaccional |
| `/blog/` | blog desarrollo web | guías de desarrollo web en español | Informativa (hub) |
| `/blog/tarjetas-fidelizacion-wallet-negocios-locales/` | tarjeta de fidelización Google Wallet | tarjeta fidelización Apple Wallet, fidelización comercio local | Informativa (GSC: 13 impr.) |
| `/blog/git-github-control-de-versiones-flujo-colaborativo/` | control de versiones distribuido | qué es Git, trunk-based development | Informativa (GSC: 38 impr.) |
| `/blog/accesibilidad-web-wcag-aa-guia-practica/` | WCAG AA guía práctica | pautas de accesibilidad web, accesibilidad AA vs AAA | Informativa (GSC: 6 impr.) |
| `/blog/guia-seo-local-google-maps-comunidad-valenciana/` | SEO local Comunitat Valenciana | posicionamiento SEO local La Safor/La Costera, Google Maps negocio local | Informativa local |
| `/blog/por-que-el-menu-en-pdf-mata-ventas-restaurante/` | menú en PDF restaurante | carta digital vs PDF, carta QR | Informativa → servicio |
| `/blog/por-que-elegir-astro-sobre-wordpress-negocios-locales/` | Astro vs WordPress | web rápida negocio local | Informativa comparativa |
| resto de artículos (Angular, TypeScript, Node, Tailwind, JS, Linux, HTML5, CI/CD, Core Web Vitals, imágenes AVIF/WebP, portfolio) | tema propio de cada artículo | — | Informativa técnica (audiencia desarrolladores) |

## Cómo se evita la canibalización
- Servicios (`/pricing/*`) capturan intención comercial; el blog captura informativa y enlaza al servicio correspondiente (y cada servicio enlaza de vuelta a 2-3 lecturas).
- Los casos de estudio no compiten por palabras de servicio: su H1 es el nombre del proyecto.
- `/en/*`: versiones en inglés de páginas comerciales con hreflang; los artículos del blog **no** tienen traducción real, así que `/en/blog/<artículo>` es noindex y no aparece en el sitemap.

## Oportunidades pendientes (requieren datos o contenido nuevo)
- Verificar volúmenes reales antes de crear contenido nuevo (Keyword Planner con cuenta de Ads o herramienta de pago).
- Posible página/artículo de «diseño web para restaurantes/bares en Xàtiva» solo si existen datos reales (casos, fotos, cliente) que lo respalden; no se ha creado para no inventar.
- Google Business Profile: mantener coherencia de nombre, categoría y teléfono con la web (WhatsApp +34 644 525 838, ya visible en pie y contacto).
