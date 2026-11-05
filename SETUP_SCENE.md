# Entrada «setup»: cómo cambiar la imagen

La entrada es una imagen a pantalla completa con zonas invisibles que se pueden pulsar. Al pasar el ratón, un mensaje junto al cursor indica la sección. Al pulsar cualquier objeto, la página llega deslizándose desde abajo con View Transitions; en un navegador sin soporte, simplemente aparece.

Primero se ve una foto nítida, que pesa poco. Cuando han cargado, entran encima dos GIF: las sombras de las hojas, que se funden con la foto en modo multiplicar y por eso no le restan nitidez, y el árbol de la ventana. Con movimiento reducido o ahorro de datos se queda la foto.

La foto base se generó con Canva (recurso `MAHaCht1Oyg`, 1680×944). El original no está en el repositorio: solo la foto y los GIF, en `public/img/setup/`.

## 1. Conseguir la foto base

16:9, con el monitor de frente y los cuadros vacíos. Deja los objetos dentro del 75 % central de la anchura y del 83 % central de la altura, o una ventana 4:3 o muy panorámica los recortará. Evita marcas, logos, personajes y texto de terceros: la web es comercial y lleva campaña de Ads.

## 2. Generar la foto y los GIF

Hace falta `dist/` compilado, porque el monitor muestra una captura real de la web.

```bash
npm run build
```

```bash
node scripts/build-setup-gif.mjs ruta/a/la-foto.png salida
```

```bash
node scripts/build-setup-scene.mjs salida/still.png
```

Copia `salida/setup-shadows.gif` y `salida/setup-window.gif` a `public/img/setup/` y recompila. Si cambia la ventana, actualiza `treeBox` y `treeClip` en `src/config/setup-scene.ts`; el generador imprime el recuadro.

`build-setup-gif.mjs` compone los cuadros de habilidades, el logo de la taza, el post-it y la web del monitor, y anima las sombras y el árbol en un bucle perfecto. Sus coordenadas y las habilidades están al principio del archivo. Si cambian las habilidades de la web, se cambian ahí.

## 3. Marcar las zonas

```bash
npm run dev
```

Abre `/?calibrate=1`. Elige un objeto, pulsa los puntos de su contorno sobre la imagen y copia el `polygon` resultante (también sale por consola) a `src/config/setup-scene.ts`.

Cada objeto indica ahí su ruta, su etiqueta y su texto accesible por idioma. Este modo no existe en la compilación de producción.

## 4. Comprobar

```bash
npm test
```

```bash
npx playwright test tests/e2e/setup-entrance.spec.ts
```
