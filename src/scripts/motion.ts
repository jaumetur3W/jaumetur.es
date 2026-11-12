/**
 * Sistema de movimiento del sitio (GSAP + ScrollTrigger).
 * Todo es progresivo: sin JS el contenido se ve completo. Con
 * prefers-reduced-motion no se anima nada de movimiento continuo.
 * Las interacciones de cursor solo existen con puntero fino.
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
const fine = () => window.matchMedia(FINE).matches;

/** Umbral de entrada: una lámina amarilla que se retira una vez por sesión. */
function startIntro(): boolean {
  const el = document.getElementById("intro");
  if (!el) return false;
  let seen = false;
  try {
    seen = sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {}
  if (seen || reduced()) {
    el.remove();
    return false;
  }
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {}
  el.classList.add("is-on");
  const kids = Array.from(document.body.children).filter((c) => c !== el && c.tagName !== "SCRIPT");
  kids.forEach((c) => c.setAttribute("inert", ""));
  gsap.to(el, {
    yPercent: -100,
    duration: 1.1,
    ease: "expo.inOut",
    delay: 0.7,
    onComplete: () => {
      kids.forEach((c) => c.removeAttribute("inert"));
      el.remove();
    },
  });
  return true;
}

function heroIn(delay: number) {
  document.documentElement.classList.remove("hero-pending");
  const words = q("[data-word]");
  if (words.length) gsap.from(words, { xPercent: -115, duration: 1.2, ease: "expo.out", stagger: 0.07, delay });
  const rules = q("[data-rule]");
  const fades = q("[data-fade]");
  if (rules.length) gsap.fromTo(rules, { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 1.3, ease: "expo.out", delay: delay + 0.2 });
  if (fades.length) gsap.from(fades, { opacity: 0, x: -40, duration: 1, ease: "power3.out", stagger: 0.12, delay: delay + 0.5 });
}

function scrollMotion() {
  // Entradas laterales alternas (izquierda / derecha) en lugar de subir desde abajo
  q("[data-reveal]").forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      x: i % 2 ? 72 : -72,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  // Imágenes que se descubren por máscara al entrar
  // Dentro de la pista horizontal, las máscaras se disparan con el scroll horizontal (no con el vertical)
  q("[data-mask]").filter((el) => !el.closest("[data-hscroll]")).forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 85%", once: true } },
    );
  });

  // Parallax suave: la imagen se desplaza dentro de su marco
  q<HTMLElement>("[data-parallax]").forEach((el) => {
    gsap.fromTo(
      el,
      { yPercent: -10 },
      { yPercent: 0, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } },
    );
  });

  // Afirmación que se ilumina palabra a palabra mientras se lee
  q("[data-scrub-section]").forEach((sec) => {
    const words = q("[data-scrub-word]", sec);
    if (!words.length) return;
    gsap.fromTo(
      words,
      { opacity: 0.15 },
      { opacity: 1, ease: "none", stagger: 0.12, scrollTrigger: { trigger: words[0].parentElement, start: "top 85%", end: "bottom 45%", scrub: true } },
    );
  });

  // Proceso: la línea se dibuja con el scroll y el paso activo se enciende
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

  // Cierre: el titular entra desde el tamaño reducido mientras se lee
  q<HTMLElement>("[data-close-title]").forEach((el) => {
    gsap.fromTo(
      el,
      { scale: 0.88, opacity: 0.2, transformOrigin: "left center" },
      { scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 95%", end: "top 35%", scrub: true } },
    );
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

/** Halo amarillo que sigue el cursor dentro de la portada. */
function halo() {
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  const el = hero?.querySelector<HTMLElement>("[data-halo]");
  if (!hero || !el || reduced() || !fine()) return;
  gsap.set(el, { x: 0, y: 0 });
  const x = gsap.quickTo(el, "x", { duration: 1.4, ease: "power3" });
  const y = gsap.quickTo(el, "y", { duration: 1.4, ease: "power3" });
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    x(e.clientX - r.left - el.offsetLeft - el.offsetWidth / 2);
    y(e.clientY - r.top - el.offsetTop - el.offsetHeight / 2);
  });
}

/** Cursor-etiqueta sobre elementos marcados con data-cursor-label. */
function cursor() {
  const cur = document.querySelector<HTMLElement>("[data-cursor]");
  if (!cur || reduced() || !fine()) return;
  const bubble = cur.querySelector<HTMLElement>("[data-cursor-bubble]");
  const cx = gsap.quickTo(cur, "x", { duration: 0.5, ease: "power3" });
  const cy = gsap.quickTo(cur, "y", { duration: 0.5, ease: "power3" });
  window.addEventListener("pointermove", (e) => { cx(e.clientX); cy(e.clientY); }, { passive: true });
  q("[data-cursor-label]").forEach((el) => {
    el.addEventListener("pointerenter", () => {
      if (bubble) bubble.textContent = el.dataset.cursorLabel || "";
      cur.setAttribute("data-on", "");
    });
    el.addEventListener("pointerleave", () => cur.removeAttribute("data-on"));
  });
}

/** Inclinación suave de la pieza de oferta según el puntero. */
function tilt() {
  if (reduced() || !fine()) return;
  q<HTMLElement>("[data-tilt]").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--rx", `${(-py * 5).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(px * 7).toFixed(2)}deg`);
    });
    el.addEventListener("pointerleave", () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    });
  });
}

function init() {
  const introOn = startIntro();
  const mm = gsap.matchMedia();

  mm.add(`(prefers-reduced-motion: no-preference)`, () => {
    document.documentElement.classList.add("motion-steps");
    heroIn(introOn ? 1.3 : 0.15);
    scrollMotion();
    return () => document.documentElement.classList.remove("motion-steps");
  });

  mm.add(`(prefers-reduced-motion: no-preference) and ${DESKTOP} and ${FINE}`, () => {
    document.documentElement.classList.add("hscroll");
    horizontalProjects();
    return () => document.documentElement.classList.remove("hscroll");
  });

  halo();
  cursor();
  tilt();
  window.addEventListener("load", () => ScrollTrigger.refresh());
  // Bricolage cambia métricas al cargar: recalcular pines y disparadores tras las fuentes
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
