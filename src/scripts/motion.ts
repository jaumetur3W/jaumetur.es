/**
 * Sistema de movimiento del sitio (GSAP + ScrollTrigger).
 * Todo es progresivo: sin JS el contenido se ve completo. Con
 * prefers-reduced-motion no se anima nada.
 *
 * Cada tipo de elemento tiene SU propia animación (no una sola repetida):
 *  data-hero + data-word / data-fade / data-stick → entrada del hero (palabras que suben, cartel que se pega)
 *  data-reveal="left|right|up|scale|wipe"          → entrada de bloques (si no se indica, rota entre varias)
 *  data-split                                       → titular: cada palabra sube desde su máscara
 *  data-stagger                                     → hijos que entran en cascada
 *  data-rows                                        → filas: el filete se dibuja y la fila entra desde la izquierda
 *  data-mask="left|right|up|down"                   → imagen descubierta por cortina en esa dirección
 *  data-parallax                                    → imagen que se desplaza dentro de su marco
 *  data-count="290"                                 → cifra que cuenta hasta su valor
 *  data-scrub-word                                  → frase que se enciende al leer
 *  data-steps / data-step / data-progress           → proceso: línea que se dibuja
 *  data-close-title                                 → titular de cierre que crece
 *  data-hscroll                                     → pista horizontal fijada (escritorio)
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REDUCED = "(prefers-reduced-motion: reduce)";
const FINE = "(hover: hover) and (pointer: fine)";
const DESKTOP = "(min-width: 1024px)";
const SEEN_KEY = "jt_intro_seen";

const q = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));
const reduced = () => window.matchMedia(REDUCED).matches;

/** Lámina amarilla de entrada, una vez por sesión. */
function startIntro(): number {
  const el = document.getElementById("intro");
  if (!el) return 0;
  let seen = false;
  try {
    seen = sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {}
  if (seen || reduced()) {
    el.remove();
    return 0;
  }
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {}
  el.classList.add("is-on");
  const kids = Array.from(document.body.children).filter((c) => c !== el && c.tagName !== "SCRIPT");
  kids.forEach((c) => c.setAttribute("inert", ""));
  const words = q(".intro-word", el);
  const stamp = el.querySelector("[data-intro-stamp]");
  const tl = gsap.timeline({
    onComplete: () => {
      kids.forEach((c) => c.removeAttribute("inert"));
      el.remove();
    },
  });
  tl.from(words, { yPercent: 110, duration: 0.8, ease: "expo.out", stagger: 0.08 }, 0.1);
  if (stamp) tl.from(stamp, { scale: 0, rotation: 30, duration: 0.6, ease: "back.out(2.5)" }, 0.6);
  tl.to(el, { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", duration: 0.9, ease: "expo.inOut" }, 1.35);
  return 1.6;
}

/** Entrada del hero: palabras que suben, resto en fundido, cartel que se pega. */
function heroIn(delay: number) {
  document.documentElement.classList.remove("hero-pending");
  const tl = gsap.timeline({ delay });
  const words = q("[data-hero] [data-word]");
  if (words.length) tl.from(words, { yPercent: 115, rotation: 4, duration: 1.1, ease: "expo.out", stagger: 0.06 }, 0);
  const fades = q("[data-hero] [data-fade]");
  if (fades.length) tl.from(fades, { opacity: 0, y: 24, duration: 0.9, ease: "power3.out", stagger: 0.1 }, 0.45);
  const sticks = q("[data-hero] [data-stick]");
  if (sticks.length) tl.from(sticks, { scale: 0.2, rotation: 25, opacity: 0, duration: 0.8, ease: "back.out(2.2)", stagger: 0.12 }, 0.7);
}

type RevealKind = "left" | "right" | "up" | "scale" | "wipe";
const CYCLE: RevealKind[] = ["up", "left", "scale", "right", "wipe"];

function revealFrom(kind: RevealKind): gsap.TweenVars {
  switch (kind) {
    case "left": return { opacity: 0, x: -70 };
    case "right": return { opacity: 0, x: 70 };
    case "scale": return { opacity: 0, scale: 0.88, transformOrigin: "50% 60%" };
    case "wipe": return { clipPath: "inset(0 100% 0 0)", opacity: 1 };
    default: return { opacity: 0, y: 48 };
  }
}

function scrollMotion() {
  // Bloques: cada uno entra a su manera
  q("[data-reveal]").forEach((el, i) => {
    const attr = el.dataset.reveal as RevealKind | "";
    const kind: RevealKind = attr && ["left", "right", "up", "scale", "wipe"].includes(attr) ? (attr as RevealKind) : CYCLE[i % CYCLE.length];
    gsap.from(el, {
      ...revealFrom(kind),
      duration: kind === "wipe" ? 1.1 : 0.95,
      ease: kind === "scale" ? "back.out(1.4)" : "power3.out",
      clearProps: "clipPath,transform",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  // Titulares: cada palabra sube desde su máscara
  q("[data-split]").forEach((el) => {
    const text = el.textContent ?? "";
    el.setAttribute("aria-label", text.trim());
    el.textContent = "";
    text.trim().split(/\s+/).forEach((w, i, arr) => {
      const mask = document.createElement("span");
      mask.setAttribute("aria-hidden", "true");
      mask.style.cssText = "display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:0.12em;margin-bottom:-0.12em";
      const inner = document.createElement("span");
      inner.style.display = "inline-block";
      inner.dataset.splitWord = "";
      inner.textContent = w;
      mask.appendChild(inner);
      el.appendChild(mask);
      if (i < arr.length - 1) el.appendChild(document.createTextNode(" "));
    });
    gsap.from(q("[data-split-word]", el), {
      yPercent: 110,
      duration: 0.9,
      ease: "expo.out",
      stagger: 0.07,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  // Cascada de hijos
  q("[data-stagger]").forEach((el) => {
    gsap.from(Array.from(el.children), {
      opacity: 0,
      y: 36,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  });

  // Filas de lista: el filete se dibuja y la fila entra desde la izquierda
  q("[data-rows]").forEach((list) => {
    const rows = Array.from(list.children) as HTMLElement[];
    rows.forEach((row, i) => {
      row.style.position = row.style.position || "relative";
      gsap.from(row, {
        opacity: 0,
        x: -44,
        duration: 0.8,
        ease: "power3.out",
        delay: (i % 4) * 0.06,
        scrollTrigger: { trigger: row, start: "top 92%", once: true },
      });
    });
  });

  // Imágenes: cortina en la dirección indicada
  const maskFrom: Record<string, string> = {
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)",
    up: "inset(100% 0 0 0)",
    down: "inset(0 0 100% 0)",
  };
  q("[data-mask]").filter((el) => !el.closest("[data-hscroll]")).forEach((el) => {
    const dir = el.dataset.mask && maskFrom[el.dataset.mask] ? el.dataset.mask : "up";
    gsap.fromTo(
      el,
      { clipPath: maskFrom[dir] },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 85%", once: true } },
    );
  });

  // Parallax suave dentro del marco
  q<HTMLElement>("[data-parallax]").forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: -10 },
      { yPercent: 0, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } },
    );
  });

  // Cifras que cuentan
  q("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;
    const obj = { v: 0 };
    const fmt = (n: number) => Math.round(n).toLocaleString(document.documentElement.lang.startsWith("en") ? "en-US" : "es-ES");
    gsap.to(obj, {
      v: target,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => { el.textContent = fmt(obj.v); },
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  });

  // Afirmación que se enciende palabra a palabra
  q("[data-scrub-section]").forEach((sec) => {
    const words = q("[data-scrub-word]", sec);
    if (!words.length) return;
    gsap.fromTo(
      words,
      { opacity: 0.12 },
      { opacity: 1, ease: "none", stagger: 0.12, scrollTrigger: { trigger: words[0].parentElement, start: "top 85%", end: "bottom 45%", scrub: true } },
    );
  });

  // Proceso: la línea se dibuja y el paso activo se enciende
  const steps = q("[data-step]");
  if (steps.length) {
    gsap.fromTo(
      "[data-progress]",
      { scaleY: 0 },
      { scaleY: 1, transformOrigin: "top center", ease: "none", scrollTrigger: { trigger: "[data-steps]", start: "top 60%", end: "bottom 65%", scrub: true } },
    );
    steps.forEach((s) =>
      ScrollTrigger.create({
        trigger: s,
        start: "top 60%",
        end: "bottom 60%",
        onToggle: (self) => s.classList.toggle("is-active", self.isActive),
      }),
    );
  }

  // Cierre: el titular crece mientras se lee
  q<HTMLElement>("[data-close-title]").forEach((el) => {
    gsap.fromTo(
      el,
      { scale: 0.86, opacity: 0.2, transformOrigin: "left center" },
      { scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "top 35%", scrub: true } },
    );
  });

  // Carteles fuera del hero: se pegan al llegar
  q("[data-stick]").filter((el) => !el.closest("[data-hero]")).forEach((el) => {
    gsap.from(el, {
      scale: 0.2,
      rotation: 20,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(2.2)",
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
    });
  });
}

/** Escritorio con puntero fino: los proyectos se recorren en horizontal. */
function horizontalProjects() {
  const wrap = document.querySelector<HTMLElement>("[data-hscroll]");
  const track = wrap?.querySelector<HTMLElement>("[data-hscroll-track]");
  if (!wrap || !track) return;
  const distance = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
  gsap.to(track, {
    x: () => -distance(),
    ease: "none",
    scrollTrigger: {
      trigger: wrap,
      start: "top 96px",
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 0.6,
      invalidateOnRefresh: true,
      refreshPriority: 1,
    },
  });
}

function init() {
  const introDelay = startIntro();
  const mm = gsap.matchMedia();

  mm.add(`(prefers-reduced-motion: no-preference)`, () => {
    document.documentElement.classList.add("motion-steps");
    heroIn(introDelay || 0.1);
    scrollMotion();
    return () => document.documentElement.classList.remove("motion-steps");
  });

  mm.add(`(prefers-reduced-motion: no-preference) and ${DESKTOP} and ${FINE}`, () => {
    document.documentElement.classList.add("hscroll");
    horizontalProjects();
    return () => document.documentElement.classList.remove("hscroll");
  });

  if (reduced()) document.documentElement.classList.remove("hero-pending");

  window.addEventListener("load", () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
