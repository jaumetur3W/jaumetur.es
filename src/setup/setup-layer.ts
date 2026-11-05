import { SETUP_IMAGE_SIZES, setupScene, setupSrcset } from "@/config/setup-scene";
import { localeFromPath, localizePath } from "@/i18n";
import css from "./setup-layer.css?inline";

const SESSION_KEY = "jt-setup-done";
const SLIDE_KEY = "jt-setup-slide";
const CURSOR_GAP = 16;
const EDGE_GAP = 8;

export interface SetupBoot {
  expired?: boolean;
  mounted?: boolean;
  /** Retira el bloqueo de rueda del script de `<head>`. */
  release: () => void;
  /** Quita el fundido de cobertura del script de `<head>`. */
  uncover: () => void;
}

const locale = localeFromPath(window.location.pathname);
const t = (value: { es: string; en: string }) => value[locale];
const canonicalPath = (path: string) => {
  const localized = localizePath(path, locale);
  return localized.endsWith("/") ? localized : `${localized}/`;
};

function markDone() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* Sin almacenamiento, el setup simplemente se decide en cada carga. */
  }
}

function buildLayer() {
  const layer = document.createElement("div");
  layer.id = "setup-layer";
  layer.setAttribute("role", "dialog");
  layer.setAttribute("aria-modal", "true");
  layer.setAttribute("aria-label", t(setupScene.copy.dialog));

  const style = document.createElement("style");
  style.textContent = css;
  layer.append(style);

  const skip = document.createElement("button");
  skip.type = "button";
  skip.className = "setup-skip";
  skip.textContent = t(setupScene.copy.skip);
  layer.append(skip);

  const camera = document.createElement("div");
  camera.className = "setup-camera";
  layer.append(camera);

  const { width, height, basePath, widths } = setupScene.image;
  const picture = document.createElement("picture");
  picture.className = "setup-photo";
  for (const format of ["avif", "webp"] as const) {
    const source = document.createElement("source");
    source.type = `image/${format}`;
    source.srcset = setupSrcset(format);
    source.sizes = SETUP_IMAGE_SIZES;
    picture.append(source);
  }
  const image = document.createElement("img");
  image.alt = "";
  image.width = width;
  image.height = height;
  image.src = `${basePath}-${widths.at(-1)}.webp`;
  image.setAttribute("fetchpriority", "high");
  picture.append(image);
  camera.append(picture);

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "setup-objects");
  svg.setAttribute("viewBox", "0 0 1 1");
  svg.setAttribute("preserveAspectRatio", "none");
  const anchors = setupScene.objects.map((object) => {
    const anchor = document.createElementNS("http://www.w3.org/2000/svg", "a");
    anchor.setAttribute("href", object.kind === "enter" ? window.location.pathname : canonicalPath(object.path));
    anchor.setAttribute("aria-label", t(object.ariaLabel));
    anchor.dataset.object = object.id;
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("points", object.polygon.map((point) => point.join(",")).join(" "));
    anchor.append(polygon);
    svg.append(anchor);
    return { anchor, object };
  });
  camera.append(svg);

  const label = document.createElement("div");
  label.className = "setup-label";
  label.hidden = true;
  layer.append(label);

  return { layer, skip, camera, picture, image, anchors, label };
}

export function mountSetup(boot: SetupBoot) {
  if (boot.expired) {
    markDone();
    return null;
  }
  boot.mounted = true;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const { layer, skip, camera, picture, image, anchors, label } = buildLayer();

  const coveredPage = [...document.body.children].filter((element) => element.tagName !== "SCRIPT");
  coveredPage.forEach((element) => {
    element.setAttribute("inert", "");
    // Tapada por completo: no hace falta pintarla, y sigue en el DOM con su layout.
    // Con movimiento reducido, la transición global de visibility impediría devolverle el foco.
    if (!reducedMotion) (element as HTMLElement).style.visibility = "hidden";
  });
  const restorePage = () => {
    document.documentElement.style.overflow = "";
    coveredPage.forEach((element) => {
      element.removeAttribute("inert");
      (element as HTMLElement).style.visibility = "";
    });
  };
  document.documentElement.style.overflow = "hidden";
  document.body.append(layer);
  boot.uncover();
  skip.focus({ preventScroll: true });

  let closing = false;

  // La foto fija se ve al instante. El GIF, su mismo primer fotograma en movimiento, entra al cargar.
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  if (!reducedMotion && !saveData) {
    image
      .decode()
      .catch(() => undefined)
      .then(() => {
        if (closing) return;
        const gif = new Image();
        gif.className = "setup-animated";
        gif.alt = "";
        gif.addEventListener("load", () => {
          if (!closing) picture.after(gif);
        });
        gif.src = setupScene.image.animated;
      });
  }

  const teardown = () => {
    document.removeEventListener("keydown", onKeydown, true);
    window.removeEventListener("pageshow", onPageShow);
    restorePage();
    boot.release();
    layer.remove();
  };

  const focusPage = () => {
    (document.getElementById("main-content") ?? document.body).focus({ preventScroll: true });
  };

  const close = () => {
    if (closing) return;
    closing = true;
    markDone();
    teardown();
    focusPage();
  };

  // La web ya está cargada debajo: entra deslizándose, igual que las demás páginas.
  const enterSite = () => {
    if (closing) return;
    closing = true;
    markDone();
    const reveal = () => {
      teardown();
      focusPage();
    };
    if (reducedMotion || !document.startViewTransition) reveal();
    else document.startViewTransition(reveal);
  };

  const prefetched = new Set<string>();
  const prefetch = (href: string) => {
    if (prefetched.has(href)) return;
    prefetched.add(href);
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;
    document.head.append(link);
  };

  // Mensaje junto al cursor con la sección a la que lleva el objeto.
  const placeLabel = (x: number, y: number) => {
    label.hidden = false;
    const { width, height } = label.getBoundingClientRect();
    const left = Math.max(EDGE_GAP, Math.min(x + CURSOR_GAP, window.innerWidth - width - EDGE_GAP));
    const below = y + CURSOR_GAP + height <= window.innerHeight - EDGE_GAP;
    label.style.transform = `translate(${Math.round(left)}px, ${Math.round(below ? y + CURSOR_GAP : y - CURSOR_GAP - height)}px)`;
  };

  for (const { anchor, object } of anchors) {
    const href = anchor.getAttribute("href") as string;
    const name = t(object.label);
    const announce = () => {
      label.textContent = name;
      if (object.kind === "link") prefetch(href);
    };
    const hide = () => {
      label.hidden = true;
    };
    anchor.addEventListener("pointerenter", (event) => {
      announce();
      placeLabel(event.clientX, event.clientY);
    });
    anchor.addEventListener("pointermove", (event) => placeLabel(event.clientX, event.clientY));
    anchor.addEventListener("pointerleave", hide);
    // Con teclado no hay cursor: el mensaje sale junto al objeto.
    anchor.addEventListener("focus", () => {
      if (!anchor.matches(":focus-visible")) return;
      announce();
      const box = anchor.getBoundingClientRect();
      placeLabel(box.left + box.width / 2, box.top + box.height / 2);
    });
    anchor.addEventListener("blur", hide);
    anchor.addEventListener("click", (event) => {
      // Ctrl/Cmd+clic y similares conservan su comportamiento de enlace.
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      if (object.kind === "enter") {
        event.preventDefault();
        enterSite();
        return;
      }
      markDone();
      if (!reducedMotion) {
        try {
          sessionStorage.setItem(SLIDE_KEY, "1");
        } catch {
          /* Sin almacenamiento, la página entra sin deslizarse. */
        }
      }
    });
  }

  skip.addEventListener("click", close);

  function onKeydown(event: KeyboardEvent) {
    if (event.key !== "Escape") return;
    event.stopPropagation();
    close();
  }
  document.addEventListener("keydown", onKeydown, true);

  // Al volver atrás desde la caché del navegador, la entrada ya no debe seguir ahí.
  function onPageShow(event: PageTransitionEvent) {
    if (!event.persisted) return;
    closing = true;
    teardown();
  }
  window.addEventListener("pageshow", onPageShow);

  return { layer, camera };
}
