// Genera las imágenes de la entrada setup a partir de la foto base. Ningún objeto se mueve:
// - still.png: foto nítida con los cuadros de habilidades, el logo y la web en el monitor.
// - setup-shadows.gif: solo las sombras de las hojas, que oscurecen la foto sin restarle nitidez.
// - setup-window.gif: el árbol de la ventana.
// Uso, con dist/ ya compilado: node scripts/build-setup-gif.mjs foto.png carpeta-de-salida
import { createServer } from "node:http";
import { createReadStream, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const [source, outDir] = process.argv.slice(2);
if (!source || !outDir) throw new Error("Uso: node scripts/build-setup-gif.mjs foto.png carpeta-de-salida");
mkdirSync(outDir, { recursive: true });

// La composición se dibuja al doble: textos, iconos y marcos salen limpios a cualquier tamaño.
const SIZE = { width: 1680, height: 944 };
const SCALE = 2;
// Espacio en el que se dibujan las hojas.
const DESIGN = { width: 1280, height: 720 };
// Las sombras son suaves: a esta resolución no pierden nada al ampliarse y pesan muy poco.
const SHADOWS = { width: 640, height: 360, delayMs: 60, hold: 2, colours: 128, dither: 0, maxError: 1 };
// El árbol, tras el cristal, admite verse algo suave: a media resolución pesa una fracción.
const TREE = { scale: 0.5, delayMs: 100, hold: 5, colours: 128, dither: 0.3, maxError: 2 };
// Movimiento lento en un bucle largo: a menos de 1 px por fotograma, el ojo lo ve continuo.
const LOOP_MS = 8000;

// Coordenadas normalizadas sobre la foto base (medidas sobre la foto a 1600×899).
const n = (x, y) => [x / 1600, y / 899];
const SCENE = {
  posters: [
    [191, 338], [371, 518], [550, 696], [728, 872], [904, 1050], [1082, 1228], [1259, 1407],
  ].map(([left, right]) => ({ topLeft: n(left, 61), bottomRight: n(right, 243) })),
  screen: { topLeft: n(541, 280), bottomRight: n(1057, 575) },
  monitor: { topLeft: n(538, 277), bottomRight: n(1060, 593) },
  mugLogo: { center: n(1237, 660), size: 0.046 },
  postit: [n(402, 708), n(501, 708), n(491, 741), n(375, 741)],
  deskTop: 632 / 899,
  deskFront: 820 / 899,
  windowLeft: 1430 / 1600,
  glass: { left: 1509 / 1600, bottom: 605 / 899 },
};

// Habilidades que constan en la web. Palabras válidas en español e inglés: hay una sola imagen.
const SKILLS = [
  { word: "FRONTEND", icon: "layout" },
  { word: "BACKEND", icon: "server" },
  { word: "API REST", icon: "code-curly" },
  { word: "SQL", icon: "data" },
  { word: "LINUX", icon: "terminal" },
  { word: "CI/CD", icon: "git-branch" },
  { word: "SEO", icon: "search-alt-2" },
];

const icons = JSON.parse(readFileSync(join(root, "node_modules/@iconify-json/bx/icons.json"), "utf8")).icons;

function homography(width, height, [[x0, y0], [x1, y1], [x2, y2], [x3, y3]]) {
  const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
  const det = dx1 * dy2 - dx2 * dy1;
  const g = (dx3 * dy2 - dx2 * dy3) / det;
  const h = (dx1 * dy3 - dx3 * dy1) / det;
  const values = [(x1 - x0 + g * x1) / width, (y1 - y0 + g * y1) / width, 0, g / width, (x3 - x0 + h * x3) / height, (y3 - y0 + h * y3) / height, 0, h / height, 0, 0, 1, 0, x0, y0, 0, 1];
  return `matrix3d(${values.map((value) => +value.toFixed(10)).join(",")})`;
}

const px = ([x, y]) => [x * SIZE.width, y * SIZE.height];
const box = ({ topLeft, bottomRight }) => {
  const [left, top] = px(topLeft);
  const [right, bottom] = px(bottomRight);
  return `left:${left}px;top:${top}px;width:${right - left}px;height:${bottom - top}px`;
};

async function logoInk() {
  const logo = join(root, "public/img/jt.LOGO-02.png");
  const { width, height } = await sharp(logo).metadata();
  const alpha = await sharp(logo).removeAlpha().greyscale().negate().linear(1.7, -70).raw().toBuffer();
  return sharp({ create: { width, height, channels: 3, background: "#17140f" } })
    .joinChannel(alpha, { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer();
}

function composeHtml() {
  const posters = SCENE.posters
    .map((poster, index) => {
      const skill = SKILLS[index];
      if (!icons[skill.icon]) throw new Error(`Icono inexistente: ${skill.icon}`);
      const dark = index % 2 === 0;
      return `<div class="frame" style="${box(poster)}">
        <div class="poster" style="background:${dark ? "#090D16" : "#FFFF00"};color:${dark ? "#FFFF00" : "#090D16"}">
          <svg viewBox="0 0 24 24" fill="currentColor">${icons[skill.icon].body}</svg>
          <span>${skill.word}</span>
        </div>
      </div>`;
    })
    .join("");

  const [mugX, mugY] = px(SCENE.mugLogo.center);
  const mugSize = SCENE.mugLogo.size * SIZE.width;
  const postit = homography(300, 120, SCENE.postit.map(px));

  return `<!doctype html><meta charset="utf-8"><style>
    @font-face { font-family: Inter; src: url(/fonts/inter-latin-wght-normal.woff2) format("woff2"); font-weight: 100 900; }
    html, body { margin: 0; }
    #scene { position: relative; width: ${SIZE.width}px; height: ${SIZE.height}px; background: url(/__source) 0 0 / 100% 100%; overflow: hidden; }
    .frame { position: absolute; padding: 13px; box-sizing: border-box; border: 6px solid #14120f; background: #f6f3ec; box-shadow: inset 0 1px 4px rgba(0,0,0,.2); }
    .poster { position: relative; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 9px; font: 800 15px/1 Inter, sans-serif; letter-spacing: .02em; }
    .poster svg { width: 54%; }
    .poster::after { content: ""; position: absolute; inset: 0; background: linear-gradient(125deg, rgba(255,255,255,.14), transparent 42%); }
    #hero, #glass { position: absolute; ${box(SCENE.screen)}; }
    #hero { object-fit: cover; }
    #glass { background: linear-gradient(112deg, transparent 58%, rgba(255,255,255,.05) 74%, rgba(255,255,255,.015) 88%); }
    #bezel { position: absolute; ${box(SCENE.monitor)}; box-sizing: border-box; border: 2.5px solid #0d0d0f; border-radius: 3px; }
    #logo { position: absolute; left: ${mugX - mugSize / 2}px; top: ${mugY - mugSize / 2}px; width: ${mugSize}px; height: ${mugSize}px; opacity: .9; }
    #note { position: absolute; left: 0; top: 0; width: 300px; height: 120px; transform-origin: 0 0; transform: ${postit}; display: flex; align-items: center; justify-content: center; font: 700 46px "Segoe Print", cursive; color: #1b1b1f; mix-blend-mode: multiply; }
  </style><div id="scene">${posters}
    <img id="hero" src="/__hero">
    <div id="glass"></div>
    <div id="bezel"></div>
    <img id="logo" src="/__logo">
    <div id="note">jaume.www</div>
  </div>`;
}

// Compone la imagen fija con un navegador real: tipografías, fusiones y perspectiva.
async function composeStill() {
  const dist = join(root, "dist");
  const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif", ".woff2": "font/woff2" };
  let hero = null;
  const logo = await logoInk();
  // La foto se amplía con un filtro de calidad y un enfoque suave antes de componer.
  const photo = await sharp(source)
    .removeAlpha()
    .resize(SIZE.width * SCALE, SIZE.height * SCALE, { fit: "fill", kernel: "lanczos3" })
    .sharpen({ sigma: 1.1, m1: 0.4, m2: 1.2 })
    .png()
    .toBuffer();
  const server = createServer((req, res) => {
    const path = new URL(req.url, "http://x").pathname;
    if (path === "/__source") return res.end(photo);
    if (path === "/__hero") return res.end(hero);
    if (path === "/__logo") return res.end(logo);
    if (path === "/__compose") {
      res.writeHead(200, { "content-type": types[".html"] });
      return res.end(composeHtml());
    }
    let file = join(dist, normalize(decodeURIComponent(path)));
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
    if (!existsSync(file)) {
      res.writeHead(404);
      return res.end();
    }
    res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
    createReadStream(file).pipe(res);
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const base = `http://127.0.0.1:${server.address().port}`;

  const browser = await chromium.launch();
  try {
    const [left, top] = px(SCENE.screen.topLeft);
    const [right, bottom] = px(SCENE.screen.bottomRight);
    const heroPage = await browser.newPage({ viewport: { width: 1280, height: Math.round((1280 * (bottom - top)) / (right - left)) } });
    await heroPage.goto(`${base}/?nosetup`);
    await heroPage.addStyleTag({
      content: ".hero-glow-aura, .hole-accretion-ring, .hero-hole-distortion { display: none !important; } .hero-black-hole { background: #09090b !important; }",
    });
    await heroPage.waitForTimeout(1200);
    hero = await heroPage.screenshot();
    await heroPage.close();

    const page = await browser.newPage({ viewport: SIZE, deviceScaleFactor: SCALE });
    await page.goto(`${base}/__compose`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    return await page.locator("#scene").screenshot();
  } finally {
    await browser.close();
    server.close();
  }
}

// Sombras de hojas: copas que entran desde la ventana, con cada hoja meciéndose en bucle.
function mulberry32(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createClumps() {
  const random = mulberry32(20261105);
  const gaussian = () => (random() + random() + random() - 1.5) / 1.5;
  const { width: W, height: H } = DESIGN;
  // Copas de hojas: centro y radio normalizados. Las de la mesa van aplastadas por la perspectiva.
  const wall = [
    [0.885, 0.09, 92], [0.8, 0.17, 88], [0.71, 0.08, 70], [0.61, 0.15, 52],
    [0.875, 0.33, 96], [0.775, 0.39, 92], [0.695, 0.33, 62],
    [0.87, 0.57, 88], [0.765, 0.58, 76], [0.69, 0.52, 48],
  ];
  const desk = [[0.925, 0.77, 120], [0.8, 0.8, 105], [0.68, 0.775, 76], [0.88, 0.87, 92], [0.73, 0.87, 66]];
  const build = ([cx, cy, radius], squash) => ({
    x: cx * W,
    y: cy * H,
    radius,
    squash,
    phase: random(),
    phase2: random(),
    swayX: 7 + random() * 5,
    swayY: 3 + random() * 2.5,
    leaves: Array.from({ length: Math.round(radius * 0.72) }, () => ({
      offsetX: gaussian() * radius,
      offsetY: gaussian() * radius * 0.85,
      length: 17 + random() * 19,
      breadth: 7 + random() * 7,
      angle: 200 + (random() - 0.5) * 120,
      phase: random(),
      flutter: 6 + random() * 8,
      wiggle: 1.1 + random() * 1.5,
      beat: 2 + Math.floor(random() * 2),
      layer: random() < 0.45 ? "near" : "far",
    })),
  });
  return [...wall.map((clump) => build(clump, 1)), ...desk.map((clump) => build(clump, 0.36))];
}

function shadowSvg(clumps, t) {
  const { width: W, height: H } = DESIGN;
  const tau = Math.PI * 2;
  const layers = { near: [], far: [], mass: [], twigs: [] };
  for (const clump of clumps) {
    const swayX = clump.swayX * (0.75 * Math.sin(tau * (t + clump.phase)) + 0.25 * Math.sin(tau * (2 * t + clump.phase2)));
    const swayY = clump.swayY * (0.75 * Math.sin(tau * (t + clump.phase + 0.23)) + 0.25 * Math.sin(tau * (2 * t + clump.phase2 + 0.4)));
    const cx = clump.x + swayX;
    const cy = clump.y + swayY * clump.squash;
    layers.mass.push(`<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${(clump.radius * 0.8).toFixed(1)}" ry="${(clump.radius * 0.62 * clump.squash).toFixed(1)}"/>`);
    layers.twigs.push(`<path d="M${W * 1.03} ${(clump.y - 34 * clump.squash).toFixed(1)}Q${((W * 1.03 + cx) / 2).toFixed(1)} ${(clump.y + 20 * clump.squash).toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)}"/>`);
    for (const leaf of clump.leaves) {
      const x = cx + leaf.offsetX + leaf.wiggle * Math.sin(tau * (leaf.beat * t + leaf.phase));
      const y = cy + (leaf.offsetY + leaf.wiggle * 0.7 * Math.sin(tau * (leaf.beat * t + leaf.phase + 0.31))) * clump.squash;
      const angle = leaf.angle + leaf.flutter * Math.sin(tau * (t + leaf.phase));
      const half = leaf.length / 2;
      const wide = leaf.breadth * 0.75;
      layers[leaf.layer].push(
        `<path transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(1 ${clump.squash}) rotate(${angle.toFixed(1)})" d="M${-half} 0Q0 ${-wide} ${half} 0Q0 ${wide} ${-half} 0Z"/>`,
      );
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <filter id="a" x="0" y="0" width="100%" height="100%"><feGaussianBlur stdDeviation="2.4"/></filter>
      <filter id="b" x="0" y="0" width="100%" height="100%"><feGaussianBlur stdDeviation="4.5"/></filter>
      <filter id="c" x="0" y="0" width="100%" height="100%"><feGaussianBlur stdDeviation="20"/></filter>
    </defs>
    <rect width="${W}" height="${H}" fill="#000"/>
    <g fill="#fff" fill-opacity=".34" filter="url(#c)">${layers.mass.join("")}</g>
    <g fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2.4" filter="url(#b)">${layers.twigs.join("")}</g>
    <g fill="#fff" fill-opacity=".72" filter="url(#b)">${layers.far.join("")}</g>
    <g fill="#fff" fill-opacity=".9" filter="url(#a)">${layers.near.join("")}</g>
  </svg>`;
}

// Un píxel solo cambia si se aleja más que el margen: es lo que hace asumible el peso del GIF.
// Se aplica dando dos vueltas al bucle: en la segunda, el primer fotograma parte de lo que dejó
// el último, así que el reinicio del bucle no da ningún salto.
function holdSmallChanges(rawFrames, threshold) {
  const held = Buffer.from(rawFrames.at(-1));
  const apply = (frame) => {
    for (let p = 0; p < held.length; p += 3) {
      if (
        Math.abs(frame[p] - held[p]) > threshold ||
        Math.abs(frame[p + 1] - held[p + 1]) > threshold ||
        Math.abs(frame[p + 2] - held[p + 2]) > threshold
      ) {
        held[p] = frame[p];
        held[p + 1] = frame[p + 1];
        held[p + 2] = frame[p + 2];
      }
    }
  };
  rawFrames.forEach(apply);
  return rawFrames.map((frame) => {
    apply(frame);
    return Buffer.from(held);
  });
}

const smooth = (a, b, value) => {
  const x = Math.min(Math.max((value - a) / (b - a), 0), 1);
  return x * x * (3 - 2 * x);
};

// Dónde puede caer sombra: en la pared y la mesa, no sobre el monitor ni la ventana.
function createShadowMap({ width: W, height: H }) {
  const map = new Float32Array(W * H);
  const inset = 1.5;
  const monitorLeft = SCENE.monitor.topLeft[0] * W + inset;
  const monitorRight = SCENE.monitor.bottomRight[0] * W - inset;
  const monitorTop = SCENE.monitor.topLeft[1] * H + inset;
  const monitorBottom = SCENE.monitor.bottomRight[1] * H - inset;
  const windowLeft = SCENE.windowLeft * W;
  const deskTop = SCENE.deskTop * H;
  const deskFront = SCENE.deskFront * H;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (y >= deskFront) continue;
      const onDesk = y >= deskTop;
      if (!onDesk && x >= windowLeft) continue;
      if (y >= monitorTop && y < monitorBottom && x >= monitorLeft && x <= monitorRight) continue;
      map[y * W + x] = smooth(0.46, 0.8, x / W) * (onDesk ? 0.62 : 1);
    }
  }
  return map;
}

// Fotograma de sombras: blanco donde no hay sombra, para fundirlo con la foto en modo multiplicar.
function shadowFrame(leafMask, shadowMap, { width: W, height: H }) {
  const out = Buffer.alloc(W * H * 3, 255);
  const strength = 0.28;
  const deskStart = Math.floor(SCENE.deskTop * H) * W;
  for (let i = 0, p = 0; i < W * H; i++, p += 3) {
    const shade = (leafMask[i] / 255) * shadowMap[i] * strength;
    if (shade <= 0) continue;
    // En la pared, sombra algo fría; sobre la madera conserva su tono cálido.
    const onDesk = i >= deskStart;
    out[p] = 255 * (1 - shade * (onDesk ? 0.82 : 1));
    out[p + 1] = 255 * (1 - shade * (onDesk ? 1 : 0.97));
    out[p + 2] = 255 * (1 - shade * (onDesk ? 1 : 0.88));
  }
  return out;
}

// Árbol de la ventana: leve ondulación solo sobre el verde, no sobre el marco blanco.
function treeFrame(base, W, H, t, scale) {
  const out = Buffer.from(base);
  const tau = Math.PI * 2;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const p = (y * W + x) * 3;
      const r = base[p], g = base[p + 1], b = base[p + 2];
      const max = Math.max(r, g, b);
      const saturation = max === 0 ? 0 : (max - Math.min(r, g, b)) / max;
      const amount = smooth(0.12, 0.3, saturation);
      if (amount <= 0) continue;
      const [fx0, fy0] = [x / scale, y / scale];
      const dx = scale * (2.5 * Math.sin(tau * t + fy0 * 0.038 + fx0 * 0.023) + 1 * Math.sin(tau * 2 * t + fx0 * 0.07 + fy0 * 0.015));
      const dy = scale * (1.7 * Math.sin(tau * t + fx0 * 0.046 + 1.1) + 0.8 * Math.sin(tau * 2 * t + fy0 * 0.06));
      const sx = Math.min(Math.max(x + dx, 0), W - 2);
      const sy = Math.min(Math.max(y + dy, 0), H - 2);
      const x0 = Math.floor(sx), y0 = Math.floor(sy);
      const fx = sx - x0, fy = sy - y0;
      for (let c = 0; c < 3; c++) {
        const sample =
          base[(y0 * W + x0) * 3 + c] * (1 - fx) * (1 - fy) +
          base[(y0 * W + x0 + 1) * 3 + c] * fx * (1 - fy) +
          base[((y0 + 1) * W + x0) * 3 + c] * (1 - fx) * fy +
          base[((y0 + 1) * W + x0 + 1) * 3 + c] * fx * fy;
        out[p + c] = base[p + c] * (1 - amount) + sample * amount;
      }
    }
  }
  return out;
}

async function writeGif(name, rawFrames, width, height, { delayMs, hold, colours, dither, maxError }) {
  const raw = { raw: { width, height, channels: 3 } };
  const frames = await Promise.all(holdSmallChanges(rawFrames, hold).map((frame) => sharp(frame, raw).png({ compressionLevel: 1 }).toBuffer()));
  const file = join(outDir, name);
  await sharp(frames, { join: { animated: true } })
    .gif({ delay: delayMs, loop: 0, colours, dither, effort: 10, reuse: true, interFrameMaxError: maxError, interPaletteMaxError: 24 })
    .toFile(file);
  console.log(`${name}: ${width}×${height}, ${frames.length} fotogramas a ${delayMs} ms, ${(statSync(file).size / 1024).toFixed(0)} KB`);
}

const still = await composeStill();
writeFileSync(join(outDir, "still.png"), still);

// Sombras.
const clumps = createClumps();
const shadowMap = createShadowMap(SHADOWS);
const shadowFrames = [];
const shadowCount = Math.round(LOOP_MS / SHADOWS.delayMs);
for (let index = 0; index < shadowCount; index++) {
  const mask = await sharp(Buffer.from(shadowSvg(clumps, index / shadowCount))).greyscale().resize(SHADOWS.width, SHADOWS.height).raw().toBuffer();
  shadowFrames.push(shadowFrame(mask, shadowMap, SHADOWS));
}
await writeGif("setup-shadows.gif", shadowFrames, SHADOWS.width, SHADOWS.height, SHADOWS);

// Árbol de la ventana: un recorte a la resolución de la foto.
const glassLeft = Math.floor(SCENE.glass.left * SIZE.width);
const glassHeight = Math.floor(SCENE.glass.bottom * SIZE.height);
const glassWidth = SIZE.width - glassLeft;
const treeWidth = Math.round(glassWidth * TREE.scale);
const treeHeight = Math.round(glassHeight * TREE.scale);
const stillAtSize = await sharp(still).removeAlpha().resize(SIZE.width, SIZE.height, { fit: "fill" }).png().toBuffer();
const treeBase = await sharp(stillAtSize).extract({ left: glassLeft, top: 0, width: glassWidth, height: glassHeight }).resize(treeWidth, treeHeight).raw().toBuffer();
const treeCount = Math.round(LOOP_MS / TREE.delayMs);
const treeFrames = Array.from({ length: treeCount }, (_, index) => treeFrame(treeBase, treeWidth, treeHeight, index / treeCount, TREE.scale));
await writeGif("setup-window.gif", treeFrames, treeWidth, treeHeight, TREE);

const round = (value) => +value.toFixed(4);
console.log(`En src/config/setup-scene.ts: windowBox: { left: ${round(glassLeft / SIZE.width)}, top: 0, width: ${round(glassWidth / SIZE.width)}, height: ${round(glassHeight / SIZE.height)} }`);
