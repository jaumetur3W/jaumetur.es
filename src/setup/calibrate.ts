import { setupScene } from "@/config/setup-scene";

/** Modo de calibración: solo se incluye en desarrollo (`/?calibrate=1`). */
export function mountCalibration(layer: HTMLElement, camera: HTMLElement) {
  const targets = ["screen", ...setupScene.objects.map((object) => object.id)];
  const points = new Map<string, [number, number][]>(targets.map((name) => [name, []]));

  const svg = camera.querySelector<SVGElement>(".setup-objects");
  if (svg) svg.style.pointerEvents = "none";
  svg?.querySelectorAll<SVGElement>("polygon").forEach((polygon) => {
    polygon.style.pointerEvents = "none";
    polygon.style.strokeOpacity = "0.6";
  });
  layer.querySelector(".setup-skip")?.remove();

  const marks = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  marks.setAttribute("viewBox", "0 0 1 1");
  marks.setAttribute("preserveAspectRatio", "none");
  marks.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible";
  camera.append(marks);

  const panel = document.createElement("div");
  panel.style.cssText =
    "position:fixed;top:12px;left:12px;z-index:5;width:360px;padding:12px;border-radius:10px;background:#090d16;color:#fff;font:12px/1.4 monospace";
  panel.innerHTML = `
    <strong>Calibración</strong>
    <select data-target style="display:block;width:100%;margin:8px 0;padding:4px;color:#000;background:#fff">
      ${targets.map((name) => `<option value="${name}">${name}</option>`).join("")}
    </select>
    <button type="button" data-undo style="padding:3px 8px;background:#fff;color:#000">Deshacer punto</button>
    <button type="button" data-print style="padding:3px 8px;background:#ff0;color:#000">Imprimir</button>
    <textarea data-output rows="10" readonly style="display:block;width:100%;margin-top:8px;color:#000;background:#fff;font:11px monospace"></textarea>`;
  layer.append(panel);

  const select = panel.querySelector("select") as HTMLSelectElement;
  const output = panel.querySelector("textarea") as HTMLTextAreaElement;

  const print = () => {
    const text = [...points]
      .filter(([, list]) => list.length)
      .map(([name, list]) => {
        const coords = `[${list.map(([x, y]) => `[${x}, ${y}]`).join(", ")}]`;
        return name === "screen" ? `screen: ${coords},` : `// ${name}\npolygon: ${coords},`;
      })
      .join("\n");
    output.value = text;
    console.log(text);
  };

  const redraw = () => {
    const list = points.get(select.value) ?? [];
    marks.innerHTML = list.length
      ? `<polygon points="${list.map((point) => point.join(",")).join(" ")}" fill="rgba(255,255,0,.25)" stroke="#ff0" stroke-width="2" vector-effect="non-scaling-stroke"/>`
      : "";
    print();
  };

  select.addEventListener("change", redraw);
  panel.querySelector("[data-undo]")?.addEventListener("click", () => {
    points.get(select.value)?.pop();
    redraw();
  });
  panel.querySelector("[data-print]")?.addEventListener("click", print);

  const round = (value: number) => +value.toFixed(4);
  layer.addEventListener("click", (event) => {
    if (panel.contains(event.target as Node)) return;
    const rect = camera.getBoundingClientRect();
    points.get(select.value)?.push([round((event.clientX - rect.left) / rect.width), round((event.clientY - rect.top) / rect.height)]);
    redraw();
  });
  redraw();
}
