/**
 * Tema propio de cada proyecto: al abrir su ficha, la página se «viste» como su aplicación.
 * Se aplican como variables CSS sobre el contenedor `.theme-app` (ver global.css).
 * Todos los pares texto/fondo cumplen contraste AA (texto sobre acento = --on-brand).
 */
export interface ProjectTheme {
  name: string;
  tabs: { es: string[]; en: string[] };
  action: { es: string; en: string };
  vars: Record<string, string>;
}

const sans = "'Inter Variable', 'Inter', system-ui, sans-serif";
const grotesk = "'Space Grotesk Variable', 'Space Grotesk', 'Inter Variable', system-ui, sans-serif";
const bricolage = "'Bricolage Grotesque', 'Inter Variable', system-ui, sans-serif";
const mono = "'IBM Plex Mono', ui-monospace, Menlo, Consolas, monospace";
const serif = "'Instrument Serif', Georgia, 'Times New Roman', serif";

/** Atajo: rellena las variables derivadas (los utilitarios de Tailwind leen --color-*). */
function theme(
  name: string,
  tabs: ProjectTheme["tabs"],
  action: ProjectTheme["action"],
  v: {
    paper: string; paper2: string; ink: string; brand: string; onBrand: string; graphite: string; rule: string;
    font: string; weight: string; track: string; radius: string; bw: string; shadow: string; btnR: string;
    chipR?: string; hcase?: string; bg?: string; bgSize?: string; barBg: string; barFg: string;
  },
): ProjectTheme {
  return {
    name,
    tabs,
    action,
    vars: {
      "--paper": v.paper, "--color-paper": v.paper,
      "--paper-2": v.paper2, "--color-paper-2": v.paper2,
      "--ink": v.ink, "--color-ink": v.ink,
      "--brand": v.brand, "--color-brand": v.brand,
      "--on-brand": v.onBrand,
      "--graphite": v.graphite, "--color-graphite": v.graphite,
      "--rule": v.rule, "--color-rule": v.rule,
      "--font-display": v.font,
      "--h-weight": v.weight,
      "--h-track": v.track,
      "--h-case": v.hcase ?? "none",
      "--radius": v.radius,
      "--bw": v.bw,
      "--btn-r": v.btnR,
      "--chip-r": v.chipR ?? v.btnR,
      "--hard": v.shadow, "--hard-sm": v.shadow, "--hard-lg": v.shadow,
      "--app-bg-image": v.bg ?? "none",
      "--app-bg-size": v.bgSize ?? "auto",
      "--bar-bg": v.barBg,
      "--bar-fg": v.barFg,
    },
  };
}

export const projectThemes: Record<string, ProjectTheme> = {
  // PWA de servicios y reformas: rojo vivo, tarjetas blandas, tacto de app móvil
  avisa: theme("AVISA", { es: ["Incidencias", "Presupuestos", "Profesionales"], en: ["Issues", "Quotes", "Pros"] }, { es: "Publicar tarea", en: "Post a task" }, {
    paper: "#fff6f5", paper2: "#ffe3e0", ink: "#1d0b0b", brand: "#d91c2b", onBrand: "#ffffff", graphite: "#5a3b3b", rule: "#f0c4c0",
    font: sans, weight: "800", track: "-0.03em", radius: "1.5rem", bw: "1px",
    shadow: "0 14px 34px -14px rgba(217,28,43,0.5)", btnR: "999px", barBg: "#d91c2b", barFg: "#ffffff",
  }),
  // SaaS deportivo con IA: oscuro, verde neón, brillo suave
  trania: theme("TranIA", { es: ["Socios", "Clases", "Motores IA"], en: ["Members", "Classes", "AI engines"] }, { es: "Nueva sesión", en: "New session" }, {
    paper: "#07120e", paper2: "#0e231c", ink: "#e9fff6", brand: "#2bf0a0", onBrand: "#03170f", graphite: "#9bbdb0", rule: "#1f3d33",
    font: grotesk, weight: "700", track: "-0.03em", radius: "1rem", bw: "1px",
    shadow: "0 0 0 1px rgba(43,240,160,0.35), 0 18px 50px -20px rgba(43,240,160,0.5)", btnR: "0.75rem", barBg: "#0e231c", barFg: "#e9fff6",
  }),
  // SaaS empresarial de RR. HH.: índigo sobrio, bordes finos, sombras de software B2B
  worksy: theme("Worksy", { es: ["Personas", "Control horario", "Hub Apps"], en: ["People", "Time tracking", "Hub Apps"] }, { es: "Fichar", en: "Clock in" }, {
    paper: "#f5f6ff", paper2: "#e6e8ff", ink: "#12123a", brand: "#4338ca", onBrand: "#ffffff", graphite: "#4b4d78", rule: "#cdd0f5",
    font: sans, weight: "700", track: "-0.025em", radius: "0.75rem", bw: "1px",
    shadow: "0 1px 2px rgba(18,18,58,0.14), 0 12px 28px -14px rgba(67,56,202,0.4)", btnR: "0.6rem", barBg: "#12123a", barFg: "#ffffff",
  }),
  // Demo de pizzería: mantel de cuadros, tomate y masa, sombra dura
  "pizzeria-xativa": theme("Pizzería Xàtiva", { es: ["Carta", "Pizza Pass", "Cesta"], en: ["Menu", "Pizza Pass", "Basket"] }, { es: "Pedir", en: "Order" }, {
    paper: "#fff3dc", paper2: "#ffe0aa", ink: "#3b1608", brand: "#d63a22", onBrand: "#ffffff", graphite: "#6b3d22", rule: "#e8c48f",
    font: bricolage, weight: "800", track: "-0.03em", radius: "1.75rem", bw: "3px",
    shadow: "6px 6px 0 #3b1608", btnR: "999px",
    barBg: "#d63a22", barFg: "#ffffff",
  }),
  // Demo de hamburguesería: negro parrilla y lima eléctrico, mayúsculas
  "burger-xativa": theme("Burger Xàtiva", { es: ["Carta", "Monta tu burger", "Cesta"], en: ["Menu", "Build yours", "Basket"] }, { es: "Pedir", en: "Order" }, {
    paper: "#14110d", paper2: "#221c15", ink: "#fff4e0", brand: "#c8ff1a", onBrand: "#14110d", graphite: "#cfc3ab", rule: "#3d3428",
    font: bricolage, weight: "800", track: "-0.02em", hcase: "uppercase", radius: "0.5rem", bw: "3px",
    shadow: "6px 6px 0 #c8ff1a", btnR: "0.5rem", barBg: "#c8ff1a", barFg: "#14110d",
  }),
  // Panel de telemetría: terminal azul noche, cian, rejilla de instrumentos
  "dashboard-telemetria": theme("Telemetría", { es: ["FPS", "Core Web Vitals", "Concurrencia"], en: ["FPS", "Core Web Vitals", "Concurrency"] }, { es: "En vivo", en: "Live" }, {
    paper: "#0a1020", paper2: "#131c33", ink: "#dbe7ff", brand: "#22d3ee", onBrand: "#04121a", graphite: "#8da2c9", rule: "#26324f",
    font: mono, weight: "500", track: "-0.02em", radius: "0.5rem", bw: "1px",
    shadow: "0 0 0 1px rgba(34,211,238,0.25)", btnR: "0.4rem",
    barBg: "#131c33", barFg: "#22d3ee",
  }),
  // Pipeline CI/CD: consola oscura, verde de «build passing»
  "pipeline-cicd": theme("CI/CD", { es: ["Workflows", "Runs", "Deploys"], en: ["Workflows", "Runs", "Deploys"] }, { es: "Re-run", en: "Re-run" }, {
    paper: "#0d1117", paper2: "#161b22", ink: "#e6edf3", brand: "#3fb950", onBrand: "#04160a", graphite: "#9aa7b4", rule: "#30363d",
    font: mono, weight: "500", track: "-0.02em", radius: "0.4rem", bw: "1px",
    shadow: "none", btnR: "0.4rem", barBg: "#161b22", barFg: "#e6edf3",
  }),
  // Finca rural: papel crema, tinta verde oliva, serif editorial, sin sombras
  fincarural: theme("Mas de l'Alzina", { es: ["Estancias", "Retiros", "La finca"], en: ["Stays", "Retreats", "The farm"] }, { es: "Reservar", en: "Book" }, {
    paper: "#f4eedf", paper2: "#e8dfc8", ink: "#2b3324", brand: "#b7c77a", onBrand: "#2b3324", graphite: "#566049", rule: "#cfc6ad",
    font: serif, weight: "400", track: "-0.01em", radius: "0", bw: "1px",
    shadow: "none", btnR: "0", barBg: "#f4eedf", barFg: "#2b3324",
  }),
  // Portfolio de arte y arquitectura: hormigón, tinta, un solo acento naranja
  "forma-espacio": theme("FORMA / ESPACIO", { es: ["Proyectos", "Materia", "Investigación"], en: ["Projects", "Matter", "Research"] }, { es: "Contacto", en: "Contact" }, {
    paper: "#efefeb", paper2: "#e0e0da", ink: "#101010", brand: "#ff5a1f", onBrand: "#101010", graphite: "#4a4a46", rule: "#bdbdb5",
    font: grotesk, weight: "500", track: "-0.04em", radius: "0", bw: "1px",
    shadow: "none", btnR: "0", barBg: "#101010", barFg: "#efefeb",
  }),
};
