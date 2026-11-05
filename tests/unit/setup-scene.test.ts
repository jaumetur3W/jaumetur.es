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

  it("da acceso a contacto, proyectos, sobre mí y servicios", () => {
    const paths = setupScene.objects.map((object) => object.path);
    for (const path of ["/contact", "/projectes", "/about", "/pricing"]) expect(paths).toContain(path);
  });

  it("tiene todas las variantes de imagen publicadas", () => {
    for (const format of ["avif", "webp"] as const) {
      for (const candidate of setupSrcset(format).split(", ")) {
        expect(existsSync(`public${candidate.split(" ")[0]}`), candidate).toBe(true);
      }
    }
  });

  it("tiene publicado el GIF", () => {
    expect(existsSync(`public${setupScene.image.animated}`)).toBe(true);
  });

  it("mantiene las coordenadas normalizadas", () => {
    const points = setupScene.objects.flatMap((object) => object.polygon);
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
