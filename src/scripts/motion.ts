/**
 * Motion STREET-GLASS. Pocas animaciones, memorables.
 * - Titular [data-split]: se monta letra a letra (momento firma de la home).
 * - Cursor con carácter y tilt leve en [data-tilt] (solo puntero fino).
 * - Reveals con stagger corto sobre [data-stagger].
 * Todo es opcional: sin JS o con prefers-reduced-motion la página ya es legible.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// ---- Titular letra a letra ---------------------------------------------
function splitHeadline(el: HTMLElement) {
  const walk = (node: Node, out: HTMLElement[]) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent ?? "";
        const frag = document.createDocumentFragment();
        text.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
            return;
          }
          const word = document.createElement("span");
          word.style.display = "inline-block";
          word.style.whiteSpace = "nowrap";
          Array.from(part).forEach((ch) => {
            const s = document.createElement("span");
            s.className = "split-char";
            s.setAttribute("aria-hidden", "true");
            s.textContent = ch;
            word.appendChild(s);
            out.push(s);
          });
          frag.appendChild(word);
        });
        child.parentNode?.replaceChild(frag, child);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child, out);
      }
    });
  };
  const label = el.textContent?.replace(/\s+/g, " ").trim() ?? "";
  el.setAttribute("aria-label", label);
  const chars: HTMLElement[] = [];
  walk(el, chars);
  el.classList.add("is-split");
  return chars;
}

document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
  if (reduce) {
    el.classList.add("is-split");
    el.querySelectorAll(".mark-draw").forEach((m) => m.classList.add("is-visible"));
    return;
  }
  const chars = splitHeadline(el);
  gsap.set(chars, { yPercent: 70, rotate: 8, opacity: 0 });
  gsap
    .timeline({ defaults: { ease: "power4.out" } })
    .to(chars, { yPercent: 0, rotate: 0, opacity: 1, duration: 0.7, stagger: 0.018 }, 0.05)
    .add(() => el.querySelectorAll(".mark-draw").forEach((m) => m.classList.add("is-visible")), "-=0.35");
});

// ---- Titulares: máscara que sube al entrar en pantalla (una sola vez)
if (!reduce && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } }),
    { rootMargin: "0px 0px -10% 0px" },
  );
  document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
} else {
  document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
}

// ---- Reveals con stagger corto ------------------------------------------
if (!reduce && "IntersectionObserver" in window) {
  const groups = document.querySelectorAll<HTMLElement>("[data-stagger]");
  groups.forEach((g) => {
    const kids = Array.from(g.children) as HTMLElement[];
    gsap.set(kids, { opacity: 0, y: 16 });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          gsap.to(kids, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.05, clearProps: "transform,opacity" });
          io.disconnect();
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(g);
  });
}

// ---- Tilt leve (solo puntero fino)
if (!reduce && finePointer) {
  document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((card) => {
    const rx = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3" });
    const ry = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3" });
    gsap.set(card, { transformPerspective: 900 });
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry(px * 5);
      rx(-py * 5);
    });
    card.addEventListener("pointerleave", () => {
      rx(0);
      ry(0);
    });
  });
}

// ---- Servicios en horizontal: pin vertical; las tarjetas avanzan hasta que la última de servicio queda centrada (la CTA no cuenta)
const svcSection = document.querySelector<HTMLElement>("[data-svc]");
const svcTrack = document.querySelector<HTMLElement>("[data-svc-track]");
if (svcSection && svcTrack && !reduce && window.matchMedia("(min-width: 1024px)").matches) {
  const cards = Array.from(svcTrack.querySelectorAll<HTMLElement>(".svc-card"));
  const lastService = cards[cards.length - 2];
  let dist = 0;
  const measure = () => {
    gsap.set(svcTrack, { x: 0 });
    const r = lastService.getBoundingClientRect();
    dist = Math.max(0, r.left + r.width / 2 - window.innerWidth / 2);
  };
  svcTrack.classList.add("is-pinned");
  gsap.to(svcTrack, {
    x: () => -dist,
    ease: "none",
    scrollTrigger: {
      trigger: svcSection,
      start: "top 6rem",
      end: () => "+=" + dist,
      pin: svcSection.querySelector<HTMLElement>(".svc-pin"),
      pinSpacing: true,
      scrub: 0.6,
      invalidateOnRefresh: true,
      onRefreshInit: measure,
    },
  });
}
