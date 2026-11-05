# Entrada «setup»: cómo cambiar la foto

La entrada es una foto a pantalla completa con zonas invisibles que se pueden pulsar. Al pulsar la pantalla, la cámara hace zoom y se funde con la web, que ya está cargada debajo. Los demás objetos empujan la cámara y navegan a su página.

La foto actual se generó con Canva (recurso `MAHZ_4svM60`, 1680×944). El original no está en el repositorio: solo sus variantes, en `public/img/setup/`.

## 1. Conseguir la foto

Mejor 3840×2160; como mínimo, tan ancha como las pantallas que quieras cubrir. Debe ser 16:9. Encuadre: deja los objetos dentro del 75 % central de la anchura y del 83 % central de la altura, o una ventana 4:3 o muy panorámica los recortará. Evita marcas, logos, personajes y texto de terceros: la web es comercial y lleva campaña de Ads.

## 2. Generar las variantes

```bash
node scripts/build-setup-scene.mjs ruta/a/la-foto.jpg --avif=50 --webp=72
```

Crea AVIF y WebP en `public/img/setup/`, sin ampliar nunca por encima del original, e imprime su peso y los valores de `image` para `src/config/setup-scene.ts`. Baja la calidad hasta el límite en que aparezca banding, sobre todo en la pared y los degradados.

## 3. Marcar las zonas

```bash
npm run dev
```

Abre `/?calibrate=1`. Elige un elemento, pulsa los puntos de su contorno sobre la foto y copia el resultado (también sale por consola) a `src/config/setup-scene.ts`:

- `screen`: el cristal de la pantalla; el zoom termina cuando llena la ventana.
- `polygon` de cada objeto: su contorno, con tantos puntos como necesite.

Cada objeto indica ahí su ruta, su etiqueta y su texto accesible por idioma. Este modo no existe en la compilación de producción.

## 4. Comprobar

```bash
npm test
```

```bash
npm run build
```

```bash
npx playwright test tests/e2e/setup-entrance.spec.ts
```
