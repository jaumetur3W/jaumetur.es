# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Dueños y responsables de negocios locales (hostelería, comercio, pymes) de Xàtiva, València y comarcas, y emprendedores o equipos pequeños de toda España que necesitan una web, una carta digital, una landing o una aplicación a medida. Llegan desde Google, Google Maps o Instagram, casi siempre desde el móvil, comparan opciones y quieren saber qué cuesta, qué incluye y quién lo va a hacer. [Inferido del repositorio y del encargo; no confirmado en entrevista.]

## Product Purpose
jaumetur.es es el sitio comercial de Jaume Tur, desarrollador web titulado (CFGS DAW + GM SMX) con base en Xàtiva. Vende servicios profesionales de desarrollo digital con precio de creación + cuota mensual de mantenimiento. Éxito: que un posible cliente entienda la oferta en segundos y contacte (formulario, WhatsApp o correo).

## Positioning
Trato directo con la persona que programa, sin intermediarios ni agencia; código y cuentas del cliente en propiedad del cliente; precios publicados y alcance cerrado antes de empezar.

## Operating Context
Sitio estático Astro 7 + Tailwind 4, bilingüe ES (por defecto) / EN, publicado en GitHub Pages (jaumetur.es). Contacto por formulario (Web3Forms), WhatsApp +34 644 525 838 y jaumetur3w@gmail.com. Analítica Plausible solo en producción.

## Capabilities and Constraints
- Servicios y precios reales en src/data/services*.ts (desde 290 €, más cuota mensual con permanencia de un año).
- Promoción de lanzamiento temporal para primeros clientes: creación de la web sin honorarios de desarrollo; el cliente solo cubre dominio y alojamiento. Es una oportunidad limitada, no una política gratuita permanente. Las tarifas estándar siguen vigentes.
- Rutas existentes (/pricing, /projectes, /about, /contact, /blog, /tools/*, /card, /briefing, /qualitat, legales, equivalentes /en/*) y redirecciones /val/* deben conservarse.
- El blog, las herramientas, la tarjeta digital y el briefing son funcionalidades útiles y se conservan.
- Deploy a producción solo con autorización explícita del usuario.

## Brand Commitments
Amarillo corporativo #FFFF00 como única firma de color (bloques sólidos, marcadores, etiquetas, hovers) y nunca como color de texto sobre blanco; tinta #111111 sobre base clara casi blanca con textura sutil. Modo claro únicamente (el brief «STREET-GLASS» de 2026-11-12 sustituye al antiguo «negro predominante»). Botones amarillos con texto negro o tinta con texto blanco. Logos JT en /public/img (jt.LOGO-0x).

## Evidence on Hand
Proyectos reales en src/content/projectes*: Avisa (PWA Angular), Pizzería Xàtiva, Burger Xàtiva, Dashboard de telemetría, Pipeline CI/CD, Finca Rural, Forma Espacio (las demos con datos de ejemplo están rotuladas como tales). Capturas en /public/img. No hay testimonios, clientes de pago verificados, premios ni cifras de resultados: no se pueden inventar.

## Product Principles
1. Decir qué se vende, a quién y por cuánto antes de pedir nada.
2. Cada afirmación verificable: sin cifras, clientes ni resultados inventados.
3. La persona que programa es la cara del servicio.
4. La promoción de lanzamiento es una puerta de entrada acotada, no la identidad de la empresa.
5. Móvil primero: la mayoría de visitas llegan desde Google Maps e Instagram.

## Accessibility & Inclusion
WCAG 2.2 AA como mínimo (ya declarado en /qualitat), foco visible, movimiento reducido respetado, contenido en español e inglés.
