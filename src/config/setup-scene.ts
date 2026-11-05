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
  /** "enter" hace zoom a la pantalla y funde con la página; "link" empuja la cámara y navega a `path`. */
  readonly kind: "enter" | "link";
  /** Ruta sin idioma. Se localiza con `localizePath`. Solo rutas que existan. */
  readonly path: string;
  readonly polygon: readonly Point[];
  readonly label: Localized;
  readonly ariaLabel: Localized;
}

/** Marco de un póster de la fila de la pared. */
const posterTop = 0.0667;
const posterBottom = 0.2759;
function poster(id: string, left: number, right: number, name: Localized): SceneObject {
  return {
    id: `project-${id}`,
    kind: "link",
    path: `/projectes/${id}`,
    polygon: [[left, posterTop], [right, posterTop], [right, posterBottom], [left, posterBottom]],
    label: name,
    ariaLabel: { es: `Póster: ver el proyecto ${name.es}`, en: `Poster: see the ${name.en} project` },
  };
}

export const setupScene = {
  image: {
    basePath: "/img/setup/setup-scene",
    /** Anchos publicados: no se amplía por encima del original. */
    widths: [1280, 1680],
    width: 1680,
    height: 944,
  },
  /** Cristal de la pantalla: el zoom termina cuando llena la ventana. */
  screen: [[0.3513, 0.3148], [0.6481, 0.3148], [0.6481, 0.6429], [0.3513, 0.6429]] as readonly Point[],
  /** Orden de tabulación: el de esta lista. */
  objects: [
    {
      id: "monitor",
      kind: "enter",
      path: "/",
      polygon: [[0.3494, 0.3103], [0.65, 0.3103], [0.65, 0.663], [0.5288, 0.663], [0.5288, 0.703], [0.55, 0.703], [0.55, 0.7408], [0.45, 0.7408], [0.45, 0.703], [0.4713, 0.703], [0.4713, 0.663], [0.3494, 0.663]],
      label: { es: "Entrar a la web", en: "Enter the site" },
      ariaLabel: { es: "Monitor: entrar a la web", en: "Monitor: enter the site" },
    },
    {
      id: "keyboard",
      kind: "link",
      path: "/contact",
      polygon: [[0.3456, 0.7564], [0.65, 0.7564], [0.6675, 0.8409], [0.3256, 0.8409]],
      label: { es: "Contacto", en: "Contact" },
      ariaLabel: { es: "Teclado: ir a contacto", en: "Keyboard: go to contact" },
    },
    poster("avisa", 0.12, 0.2131, { es: "AVISA", en: "AVISA" }),
    poster("pizzeria-xativa", 0.2356, 0.3263, { es: "Pizzería Xàtiva", en: "Pizzeria Xàtiva" }),
    poster("burger-xativa", 0.3475, 0.4375, { es: "Burger Xàtiva", en: "Burger Xàtiva" }),
    poster("fincarural", 0.4581, 0.5469, { es: "Mas de l'Alzina", en: "Mas de l'Alzina" }),
    poster("forma-espacio", 0.5669, 0.6569, { es: "FORMA / ESPACIO", en: "FORMA / ESPACIO" }),
    poster("dashboard-telemetria", 0.6775, 0.7675, { es: "Panel de Telemetría", en: "Telemetry Dashboard" }),
    poster("pipeline-cicd", 0.7875, 0.8806, { es: "Pipeline CI/CD", en: "CI/CD Pipeline" }),
    {
      id: "floppies",
      kind: "link",
      path: "/projectes",
      polygon: [[0.1075, 0.8454], [0.1406, 0.8009], [0.2, 0.7842], [0.2531, 0.8198], [0.2344, 0.8509], [0.1719, 0.8654]],
      label: { es: "Todos los proyectos", en: "All projects" },
      ariaLabel: { es: "Disquetes: ver todos los proyectos", en: "Floppy disks: see all projects" },
    },
    {
      id: "books",
      kind: "link",
      path: "/pricing",
      polygon: [[0.0531, 0.6507], [0.1063, 0.6062], [0.2688, 0.6085], [0.2675, 0.7286], [0.2325, 0.782], [0.0531, 0.7809]],
      label: { es: "Servicios", en: "Services" },
      ariaLabel: { es: "Manuales: ir a servicios", en: "Manuals: go to services" },
    },
    {
      id: "mug",
      kind: "link",
      path: "/about",
      polygon: [[0.7081, 0.6541], [0.8019, 0.6541], [0.8019, 0.7998], [0.7081, 0.7998]],
      label: { es: "Sobre mí", en: "About me" },
      ariaLabel: { es: "Taza: ir a sobre mí", en: "Mug: go to about me" },
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
