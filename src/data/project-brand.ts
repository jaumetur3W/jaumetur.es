/**
 * Identidad propia de cada proyecto, extraída de sus capturas y sitios en vivo.
 * Se usa en las miniaturas (logo sobre su color) y en el tema de cada ficha.
 */
export interface ProjectBrand {
  logo: string;
  w: number;
  h: number;
  /** Fondo de marca (cabecera y miniatura) */
  bg: string;
  /** Texto sobre el fondo de marca */
  fg: string;
  /** Acento de marca */
  accent: string;
  /** Texto sobre el acento */
  onAccent: string;
  /** Titulares de la ficha */
  font: "sans" | "serif" | "wide" | "mono" | "helvetica";
  /** Radio base de la ficha */
  radius: string;
  /** Textura de la cabecera */
  pattern: "none" | "grid" | "gingham" | "dots" | "rule";
}

export const projectBrand: Record<string, ProjectBrand> = {
  avisa: { logo: "/img/projects/avisa-logo.png", w: 1024, h: 1024, bg: "#1f2435", fg: "#ffffff", accent: "#d4002e", onAccent: "#ffffff", font: "sans", radius: "1.4rem", pattern: "dots" },
  "pizzeria-xativa": { logo: "/img/projects/pizzeria-logo.svg", w: 500, h: 500, bg: "#2b2a28", fg: "#fbf3e2", accent: "#d83a4a", onAccent: "#ffffff", font: "serif", radius: "1.6rem", pattern: "gingham" },
  "burger-xativa": { logo: "/img/projects/burger-logo.png", w: 240, h: 205, bg: "#0b0b0b", fg: "#ffffff", accent: "#ffff00", onAccent: "#0b0b0b", font: "wide", radius: "0.35rem", pattern: "rule" },
  trania: { logo: "/img/projects/trania-logo.svg", w: 320, h: 90, bg: "#0f1417", fg: "#ffffff", accent: "#c6f535", onAccent: "#0f1417", font: "sans", radius: "1rem", pattern: "grid" },
  worksy: { logo: "/img/projects/worksy-logo.svg", w: 400, h: 90, bg: "#0e0e10", fg: "#ffffff", accent: "#ffff00", onAccent: "#0e0e10", font: "sans", radius: "0.9rem", pattern: "grid" },
  "dashboard-telemetria": { logo: "/img/projects/dashboard-logo.svg", w: 320, h: 100, bg: "#0a1118", fg: "#ffffff", accent: "#22d3ee", onAccent: "#06222b", font: "mono", radius: "0.6rem", pattern: "grid" },
  "pipeline-cicd": { logo: "/img/projects/pipeline-logo.svg", w: 320, h: 100, bg: "#0d1117", fg: "#e6edf3", accent: "#2da44e", onAccent: "#ffffff", font: "mono", radius: "0.5rem", pattern: "dots" },
  "forma-espacio": { logo: "/img/projects/arq-logo.svg", w: 320, h: 90, bg: "#f5f3ee", fg: "#191919", accent: "#9c4a35", onAccent: "#ffffff", font: "helvetica", radius: "0rem", pattern: "rule" },
  fincarural: { logo: "/img/projects/fincarural-logo.svg", w: 340, h: 100, bg: "#f5f2ea", fg: "#2e3d2c", accent: "#b8694b", onAccent: "#ffffff", font: "serif", radius: "1.1rem", pattern: "none" },
};

export const fallbackBrand: ProjectBrand = {
  logo: "/img/jt.LOGO-02-128.webp", w: 128, h: 128, bg: "#fafaf6", fg: "#111111", accent: "#ffff00", onAccent: "#111111", font: "sans", radius: "1.25rem", pattern: "none",
};
export const getBrand = (id: string): ProjectBrand => projectBrand[id] ?? fallbackBrand;
