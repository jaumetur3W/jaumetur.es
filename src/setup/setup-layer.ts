import { SETUP_IMAGE_SIZES, setupScene, setupSrcset, type Point, type SceneObject } from "@/config/setup-scene";
import { localeFromPath, localizePath } from "@/i18n";
import css from "./setup-layer.css?inline";

const SESSION_KEY = "jt-setup-done";
const ZOOM_MS = 1400;
const PUSH_MS = 700;
const FADE_MS = 400;
const EASING = "cubic-bezier(.65,0,.25,1)";
const IDLE_MS = 3000;
const STALL_MARGIN_MS = 800;

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

function boundingBox(points: readonly Point[]) {
  const xs = points.map(([x]) => x);
  const ys = points.map(([, y]) => y);
  const left = Math.min(...xs);
  const top = Math.min(...ys);
  return { left, top, width: Math.max(...xs) - left, height: Math.max(...ys) - top };
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
  image.src = `${basePath}-${widths[1]}.webp`;
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
  camera.append(label);

  return { layer, skip, camera, anchors, label };
}

export function mountSetup(boot: SetupBoot) {
  if (boot.expired) {
    markDone();
    return null;
  }
  boot.mounted = true;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const { layer, skip, camera, anchors, label } = buildLayer();

  const coveredPage = [...document.body.children].filter((element) => element.tagName !== "SCRIPT");
  coveredPage.forEach((element) => {
    element.setAttribute("inert", "");
    // Tapada por completo: no hace falta pintarla durante el zoom, y sigue en el DOM con su layout.
    // Con movimiento reducido no hay zoom, y la transición global de visibility impediría devolverle el foco.
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
  let idleTimer = 0;

  const teardown = () => {
    window.clearTimeout(idleTimer);
    document.removeEventListener("keydown", onKeydown, true);
    document.removeEventListener("mousemove", armIdle);
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

  const untilFinished = async (animation: Animation, duration: number) => {
    // Si el navegador se queda sin fotogramas, la entrada no debe atascarse.
    const guard = setTimeout(() => animation.finish(), duration + STALL_MARGIN_MS);
    await animation.finished;
    clearTimeout(guard);
  };

  const cameraTo = (box: ReturnType<typeof boundingBox>, scale: number, duration: number) => {
    const { width, height } = camera.getBoundingClientRect();
    const x = window.innerWidth / 2 - camera.offsetLeft - (box.left + box.width / 2) * width * scale;
    const y = window.innerHeight / 2 - camera.offsetTop - (box.top + box.height / 2) * height * scale;
    const animation = camera.animate(
      [{ transform: "translate(0, 0) scale(1)" }, { transform: `translate(${x}px, ${y}px) scale(${scale})` }],
      { duration, easing: EASING, fill: "forwards" },
    );
    return untilFinished(animation, duration);
  };

  // Zoom hasta que la pantalla de la foto llena la ventana y fundido a la web, que ya está debajo.
  const enterSite = async () => {
    if (closing) return;
    closing = true;
    markDone();
    if (reducedMotion) {
      teardown();
      focusPage();
      return;
    }
    layer.dataset.zooming = "";
    const box = boundingBox(setupScene.screen);
    const { width, height } = camera.getBoundingClientRect();
    const scale = Math.max(window.innerWidth / (box.width * width), window.innerHeight / (box.height * height));
    await cameraTo(box, scale, ZOOM_MS);
    restorePage();
    const fade = layer.animate([{ opacity: 1 }, { opacity: 0 }], { duration: FADE_MS, easing: "ease", fill: "forwards" });
    await untilFinished(fade, FADE_MS);
    teardown();
    focusPage();
  };

  const goTo = async (object: SceneObject, href: string) => {
    if (closing) return;
    closing = true;
    markDone();
    if (!reducedMotion) {
      layer.dataset.zooming = "";
      await cameraTo(boundingBox(object.polygon), 1.7, PUSH_MS);
    }
    window.location.assign(href);
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

  const showLabel = (object: SceneObject) => {
    const box = boundingBox(object.polygon);
    label.textContent = t(object.label);
    label.style.left = `${(box.left + box.width / 2) * 100}%`;
    // Si no cabe encima del objeto, va debajo.
    const cameraTop = camera.getBoundingClientRect().top;
    const roomAbove = cameraTop + box.top * camera.offsetHeight > 44;
    label.toggleAttribute("data-below", !roomAbove);
    label.style.top = `${(roomAbove ? box.top : box.top + box.height) * 100}%`;
    label.hidden = false;
  };

  for (const { anchor, object } of anchors) {
    const href = anchor.getAttribute("href") as string;
    const activate = () => {
      showLabel(object);
      if (object.kind === "link") prefetch(href);
    };
    anchor.addEventListener("pointerenter", activate);
    anchor.addEventListener("focus", activate);
    const hide = () => {
      label.hidden = true;
    };
    anchor.addEventListener("pointerleave", hide);
    anchor.addEventListener("blur", hide);
    anchor.addEventListener("click", (event) => {
      // Ctrl/Cmd+clic y similares conservan su comportamiento de enlace.
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      if (object.kind === "enter") void enterSite();
      else void goTo(object, href);
    });
  }

  skip.addEventListener("click", close);

  function onKeydown(event: KeyboardEvent) {
    if (event.key !== "Escape") return;
    event.stopPropagation();
    close();
  }
  document.addEventListener("keydown", onKeydown, true);

  function armIdle() {
    delete layer.dataset.idle;
    window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(() => {
      layer.dataset.idle = "";
    }, IDLE_MS);
  }
  document.addEventListener("mousemove", armIdle);
  armIdle();

  // Al volver desde la caché del navegador no debe quedar la cámara a medio camino.
  function onPageShow(event: PageTransitionEvent) {
    if (!event.persisted) return;
    closing = true;
    teardown();
  }
  window.addEventListener("pageshow", onPageShow);

  return { layer, camera };
}
