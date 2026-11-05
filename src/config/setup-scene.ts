/**
 * Escena de la entrada «setup»: una foto y las zonas que se pueden pulsar sobre ella.
 * Para cambiar la foto basta con generar sus variantes y actualizar estos datos (ver SETUP_SCENE.md).
 * Las coordenadas van normalizadas de 0 a 1 respecto a la imagen y se obtienen
 * con el modo de calibración: `npm run dev` y abrir `/?calibrate=1`.
 */
export type Point = readonly [number, number];
export type Localized = { readonly es: string; readonly en: string };

export interface SceneObject {
  readonly id: string;
  /** "enter" funde con la página, que ya está debajo; "link" navega a `path`. */
  readonly kind: "enter" | "link";
  /** Ruta sin idioma. Se localiza con `localizePath`. Solo rutas que existan. */
  readonly path: string;
  readonly polygon: readonly Point[];
  readonly label: Localized;
  readonly ariaLabel: Localized;
}

export const setupScene = {
  image: {
    basePath: "/img/setup/setup-scene",
    /** Anchos publicados de la foto nítida. */
    widths: [1280, 1920, 2560],
    width: 2560,
    height: 1440,
    /**
     * Animación sobre la foto, que entra cuando ha cargado. Los objetos no se mueven: las zonas siguen valiendo.
     * Las sombras se funden con la foto en modo multiplicar, sin restarle nitidez.
     */
    shadows: "/img/setup/setup-shadows.gif",
    tree: "/img/setup/setup-window.gif",
    /** Dónde va el árbol, en proporción de la imagen. */
    treeBox: { left: 0.9431, top: 0, width: 0.0569, height: 0.6727 },
    /** Solo los tres cristales: los travesaños de la ventana salen de la foto nítida. */
    treeClip: "polygon(0 0, 100% 0, 100% 31.2%, 0 31.2%, 0 35.1%, 100% 35.1%, 100% 58.6%, 0 58.6%, 0 60.6%, 100% 60.6%, 100% 98.9%, 0 94.2%)",
  },
  /** Orden de tabulación: el de esta lista. */
  objects: [
    {
      id: "monitor",
      kind: "enter",
      path: "/",
      polygon: [[0.3363, 0.3081], [0.6625, 0.3081], [0.6625, 0.6596], [0.5306, 0.6596], [0.5306, 0.7119], [0.5506, 0.7119], [0.5506, 0.7475], [0.4456, 0.7475], [0.4456, 0.7119], [0.4631, 0.7119], [0.4631, 0.6596], [0.3363, 0.6596]],
      label: { es: "Entrar a la web", en: "Enter the site" },
      ariaLabel: { es: "Monitor: entrar a la web", en: "Monitor: enter the site" },
    },
    {
      id: "keyboard",
      kind: "link",
      path: "/contact",
      polygon: [[0.365, 0.7709], [0.6131, 0.7709], [0.6269, 0.8398], [0.3488, 0.8398]],
      label: { es: "Contacto", en: "Contact" },
      ariaLabel: { es: "Teclado: ir a contacto", en: "Keyboard: go to contact" },
    },
    {
      id: "postit",
      kind: "link",
      path: "/projectes",
      polygon: [[0.2513, 0.7853], [0.3144, 0.7853], [0.3081, 0.8298], [0.2338, 0.8298]],
      label: { es: "Proyectos", en: "Projects" },
      ariaLabel: { es: "Post-it: ver los proyectos", en: "Sticky note: see the projects" },
    },
    {
      id: "mug",
      kind: "link",
      path: "/about",
      polygon: [[0.7394, 0.6563], [0.8313, 0.6563], [0.8313, 0.8053], [0.7394, 0.8053]],
      label: { es: "Sobre mí", en: "About me" },
      ariaLabel: { es: "Taza: ir a sobre mí", en: "Mug: go to about me" },
    },
    {
      id: "frames",
      kind: "link",
      path: "/pricing",
      polygon: [[0.1163, 0.0623], [0.8825, 0.0623], [0.8825, 0.2759], [0.1163, 0.2759]],
      label: { es: "Servicios", en: "Services" },
      ariaLabel: { es: "Cuadros de habilidades: ir a servicios", en: "Skill frames: go to services" },
    },
  ] as readonly SceneObject[],
  copy: {
    dialog: {
      es: "Escritorio de Jaume Tur. Elige un objeto para entrar en la web.",
      en: "Jaume Tur's desk. Choose an object to enter the site.",
    },
    skip: { es: "Saltar", en: "Skip" },
  },
} as const;

/** `srcset` de un formato, a partir de los anchos configurados. */
export function setupSrcset(format: "avif" | "webp"): string {
  const { basePath, widths } = setupScene.image;
  return widths.map((width) => `${basePath}-${width}.${format} ${width}w`).join(", ");
}

/** Ancho renderizado del escenario, que cubre el viewport sin deformar (16:9). */
export const SETUP_IMAGE_SIZES = "max(100vw, 177.78vh)";
