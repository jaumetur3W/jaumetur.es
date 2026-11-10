# Design system — «Presupuesto de taller»

Derivado del código publicado en `src/styles/global.css` y los componentes de `src/components/`.

## Concepto
La web es el presupuesto de un taller sobre una mesa negra: partidas con puntos de relleno hasta el importe, filetes finos, perforación punteada entre bloques y una hoja amarilla (la copia del cliente) que aparece solo donde hay una decisión (selector de servicio, oferta de lanzamiento, tarjeta de precio).

## Color
| Token | Valor | Uso |
|---|---|---|
| `--bg-main` | `#0b0b09` | Fondo de toda la web (negro con una gota cálida) |
| `--bg-surface` / `--bg-raised` | `#141412` / `#1c1c19` | Paneles, formularios, imágenes |
| `--brand` | `#ffff00` | Hojas, botones primarios, subrayados, énfasis |
| `--on-brand` | `#0b0b09` | Texto y botones oscuros sobre amarillo |
| texto | `#fff` / `#d2d2cb` / `#a3a39b` | Principal / secundario / terciario (todos ≥ 4,5:1 sobre el fondo) |
| `--line` / `--line-strong` | blanco cálido 16 % / 34 % | Filetes y bordes |
| error | `#ff9b9b` | Mensajes de error en formularios |
Reglas: texto blanco sobre fondos oscuros, tinta negra solo sobre amarillo; el amarillo es la única señal de color.

## Tipografía
- Titulares: **Bricolage Grotesque** variable (eje de ancho 75–100 %; titulares a 78–82 %, peso 700–800), auto-alojada.
- Texto: **Atkinson Hyperlegible Next** variable, auto-alojada.
- Datos (precios, plazos, etiquetas): monoespaciada del sistema, con cifras tabulares.
- Escala: `.h-hero` hasta 6 rem, `.h-page` hasta 5 rem, `.h-section` hasta 3,6 rem, `.lede` 1,05–1,25 rem. Medida de lectura ≤ 38 rem en entradillas.

## Componentes
- **Hoja (`.sheet`)**: panel amarillo con borde inferior troquelado (máscara). Dentro, filas `.leader-row` con puntos de relleno.
- **Fila de servicio (`a.item`)**: fila con filete que se invierte a amarillo/negro al pasar el cursor o enfocar.
- **Botones**: `.btn-brand` (amarillo, texto negro), `.btn-white` (contorno), `.btn-dark` (negro sobre hoja amarilla). Radio 4 px, mínimo 44 px de alto.
- **Selector de presupuesto (`QuoteSheet`)**: radios + `:has()`, sin JavaScript; importes calculados desde los datos de servicios.
- **`PageHeader`, `CtaBand`**: cabecera y cierre de páginas interiores.
- **Campos (`.field`)**, `.chip`, `.link-arrow`, `.perf` (perforación), `.rule`.

## Movimiento
Un momento propio: la partida «se sella» (`.stamp`) al cambiar de servicio. Aparición de secciones suave con IntersectionObserver y transición de página CSS (`@view-transition`), todo desactivado con `prefers-reduced-motion`.

## Superficies del navegador
Selección amarilla con texto negro, cursor (`caret-color`) amarillo, barra de scroll oscura con pulgar amarillo al pasar, foco con anillo amarillo de 2 px (negro sobre hojas amarillas).

## Prohibido en este sistema
Tarjetas iguales como estructura de página, degradados, brillos o cristal, texto con degradado, bordes laterales de color, sombras duras, etiquetas encima de titulares, texto negro sobre fondo oscuro.
