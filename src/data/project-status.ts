/**
 * Estado real de cada proyecto, para no presentar demos como productos terminados.
 * - advanced: aplicación en desarrollo avanzado
 * - demo: demostración / maqueta con datos de ejemplo
 * - done: proyecto terminado
 */
export type ProjectStatus = "advanced" | "demo" | "done";

const statusById: Record<string, ProjectStatus> = {
  avisa: "advanced",
  worksy: "advanced",
  trania: "advanced",
  "dashboard-telemetria": "done",
  "pipeline-cicd": "done",
};

export const getStatus = (id: string): ProjectStatus => statusById[id] ?? "demo";

const labels = {
  es: { advanced: "En desarrollo avanzado", demo: "Demo", done: "Proyecto terminado" },
  en: { advanced: "Advanced development", demo: "Demo", done: "Finished project" },
} as const;

/** Nota corta a mano para los márgenes (minúsculas, tono cercano). */
const notes = {
  es: { advanced: "en desarrollo avanzado", demo: "solo una demo", done: "terminado" },
  en: { advanced: "advanced development", demo: "just a demo", done: "finished" },
} as const;

export const statusLabel = (id: string, isEn: boolean): string => labels[isEn ? "en" : "es"][getStatus(id)];
export const statusNote = (id: string, isEn: boolean): string => notes[isEn ? "en" : "es"][getStatus(id)];
