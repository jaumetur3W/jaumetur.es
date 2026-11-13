# Design system — «STREET-GLASS»

Derivado de `src/styles/global.css` y los componentes de `src/components/`. Estudio de diseño luminoso con actitud de cultura street; la firma es el amarillo #FFFF00. Modo claro únicamente.

## Color
| Token | Valor | Uso |
|---|---|---|
| `--bg-main` | `#fafaf6` | Base casi blanca; sobre ella: retícula de puntos (22 px), grano SVG al 7 % y un velo amarillo apenas perceptible |
| `--ink` / `--text-main` | `#111111` | Tinta: texto, bordes de retícula, botón principal |
| `--text-muted` / `--text-faint` | `#3d3d39` / `#5d5d57` | Texto secundario y metadatos (AA sobre la base) |
| `--brand` | `#ffff00` | Único acento: bloques (`.sheet`), marcadores (`.mark`, `.hl`), etiquetas (`.tag`), rellenos de hover |
| `--line` / `--line-strong` | tinta 16 % / 90 % | Filetes finos / bordes visibles de catálogo |
Regla: el amarillo es fondo con tinta encima, nunca texto sobre blanco. Sin más colores salvo neutros (rojo oscuro `#9b1c1c` solo en errores de formulario).

## Tipografía
- Titulares: **Archivo Black**, mayúsculas en momentos clave, palabra clave entre comillas con resalte amarillo (`.hl`). Auto-alojada.
- Cuerpo: **Inter** variable, auto-alojada. Metadatos (año, nº de proyecto, stack): mono del sistema pequeña (`.label`, `.tag`).
- Escala: `.h-hero` hasta 3,9 rem, `.h-page` hasta 4,2 rem, `.h-section` hasta 3 rem; `.lede` 1–1,15 rem.

## Superficies y retícula
- **Glass (`.glass`, `.card`)**: translúcida, blur 10 px, borde fino de tinta 20 %, radio 1,25 rem.
- **Retícula de catálogo (`.cat-grid`)**: celdas separadas por filete de tinta de 1,5 px, borde exterior visible; densidad media-alta.
- **Hoja (`.sheet`)**: bloque amarillo sólido con borde de tinta para decisiones (selector de presupuesto, oferta, CTA de cierre).
- Imágenes siempre contenidas: marcos 16:10 pequeños con borde de tinta.

## Componentes
Botones pill (`.btn`): borde de tinta; el relleno amarillo (o tinta) sube desde abajo al hover. `.btn-dark` (principal), `.btn-brand`, `.btn-white`. `.link-arrow` con marcador que se dibuja. `.item` fila que se rellena de amarillo. `PageHeader`, `CtaBand`, `QuoteSheet`, campos `.field` con halo amarillo al enfocar. Foco visible: anillo de tinta + halo amarillo.

## Movimiento (GSAP, `src/scripts/motion.ts`)
Momento firma: el titular de la home se monta letra a letra (`data-split`). Resto: cursor con carácter (punto amarillo que crece sobre enlaces), tilt leve en `[data-tilt]`, reveals con stagger corto en `[data-stagger]`, subrayados marcador. Todo visible sin JS; `prefers-reduced-motion` lo desactiva.

## Prohibido
Fondos planos o grises, imágenes a pantalla completa, modo oscuro, más de un acento, amarillo como texto sobre blanco, cream+serif+terracota, gradientes morados, emojis como iconos.
