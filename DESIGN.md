# Design system — «BRUTALISMO EDITORIAL SUAVE»

Derivado de `src/styles/global.css`. Papel, tinta y dos primarios; secciones separadas por cambio de fondo, filetes de 1px y notas a mano.

## Color
| Token | Valor | Uso |
|---|---|---|
| `--paper` | `#F7F7F5` | Fondo claro principal |
| `--ink` | `#111111` | Texto, bordes 1px, bandas oscuras |
| `--brand` (lima) | `#C8F169` | Etiquetas, botones destacados, resaltes, banda de cierre |
| `--clay` (terracota) | `#E05A36` | Trazos a mano, notas, banda de servicios, subrayado de nav |
Bandas: `.band-paper`, `.band-ink`, `.band-lime`, `.band-clay`. Texto siempre tinta sobre lima/terracota; blanco solo sobre tinta.

## Tipografía
- Titulares `font-display`: **Syne** 700/800 (alternativa a Clash Display, que no está en npm), tracking ajustado.
- Cuerpo `font-sans`: **Plus Jakarta Sans** variable.
- Notas `font-hand`: **Caveat** 700, solo nav, notas al margen y anotaciones de proyecto (`.note`, `.bento-note`).
- Fuentes auto-alojadas en `public/fonts/`. Marca: solo texto `jaumetur.es` (`.wordmark`); el monograma JT queda fuera de alcance.

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
