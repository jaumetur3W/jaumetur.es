import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { setupScene, setupSrcset } from "@/config/setup-scene";

describe("setupScene", () => {
  it("usa solo rutas de páginas que existen, en ambos idiomas", () => {
    for (const { path } of setupScene.objects) {
      const project = path.match(/^\/projectes\/(.+)$/)?.[1];
      if (project) {
        expect(existsSync(`src/content/projectes/${project}.md`), path).toBe(true);
        expect(existsSync(`src/content/projectes-en/${project}.md`), `/en${path}`).toBe(true);
        continue;
      }
      const name = path === "/" ? "index" : path.slice(1);
      const exists = (root: string) => existsSync(`${root}/${name}.astro`) || existsSync(`${root}/${name}/index.astro`);
      expect(exists("src/pages"), path).toBe(true);
      expect(exists("src/pages/en"), `/en${path}`).toBe(true);
    }
  });

  it("da acceso a todos los proyectos", () => {
    const paths = setupScene.objects.map((object) => object.path);
    for (const project of ["avisa", "burger-xativa", "dashboard-telemetria", "fincarural", "forma-espacio", "pipeline-cicd", "pizzeria-xativa"]) {
      expect(paths, project).toContain(`/projectes/${project}`);
    }
  });

  it("tiene todas las variantes de imagen publicadas", () => {
    for (const format of ["avif", "webp"] as const) {
      for (const candidate of setupSrcset(format).split(", ")) {
        expect(existsSync(`public${candidate.split(" ")[0]}`), candidate).toBe(true);
      }
    }
  });

  it("mantiene las coordenadas normalizadas", () => {
    const points = [...setupScene.screen, ...setupScene.objects.flatMap((object) => object.polygon)];
    for (const [x, y] of points) {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(1);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(1);
    }
  });

  it("no repite identificadores", () => {
    const ids = setupScene.objects.map((object) => object.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
