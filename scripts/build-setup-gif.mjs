// Genera el GIF de la entrada setup a partir de la foto base: compone los cuadros de
// habilidades, el logo y la web en el monitor, y anima las sombras de las hojas y el Ã¡rbol
// de la ventana en un bucle perfecto. NingÃºn objeto cambia de sitio.
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

const SIZE = { width: 1680, height: 944 };
const OUTPUT = { width: 1280, height: 720 };
// Movimiento lento en un bucle largo: a menos de 1 px por fotograma, el ojo lo ve continuo.
const LOOP_MS = 8000;
const DELAY_MS = 80;
const FRAMES = Math.round(LOOP_MS / DELAY_MS);
// Un píxel solo cambia si se aleja más que este margen: es lo que hace asumible el peso del GIF.
const HOLD_THRESHOLD = 4;
// Margen del codificador, solo para absorber el ruido de la paleta.
const GIF_MAX_ERROR = 2;

// Coordenadas normalizadas sobre la foto base (medidas sobre la foto a 1600Ã—899).
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
  glass: { left: 1495 / 1600, bottom: 605 / 899 },
};

// Habilidades que constan en la web. Palabras vÃ¡lidas en espaÃ±ol e inglÃ©s: hay una sola imagen.
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
    .map(({ topLeft, bottomRight }, index) => {
      const [left, top] = px(topLeft);
      const [right, bottom] = px(bottomRight);
      const skill = SKILLS[index];
      if (!icons[skill.icon]) throw new Error(`Icono inexistente: ${skill.icon}`);
      const dark = index % 2 === 0;
      const frame = (right - left) * 0.039;
      return `<div class="mat" style="left:${left + frame}px;top:${top + frame}px;width:${right - left - frame * 2}px;height:${bottom - top - frame * 2}px">
        <div class="poster" style="background:${dark ? "#090D16" : "#FFFF00"};color:${dark ? "#FFFF00" : "#090D16"}">
          <svg viewBox="0 0 24 24" fill="currentColor">${icons[skill.icon].body}</svg>
          <span>${skill.word}</span>
        </div>
      </div>`;
    })
    .join("");

  const [screenLeft, screenTop] = px(SCENE.screen.topLeft);
  const [screenRight, screenBottom] = px(SCENE.screen.bottomRight);
  const [mugX, mugY] = px(SCENE.mugLogo.center);
  const mugSize = SCENE.mugLogo.size * SIZE.width;
  const postit = homography(300, 120, SCENE.postit.map(px));

  return `<!doctype html><meta charset="utf-8"><style>
    @font-face { font-family: Inter; src: url(/fonts/inter-latin-wght-normal.woff2) format("woff2"); font-weight: 100 900; }
    html, body { margin: 0; }
    #scene { position: relative; width: ${SIZE.width}px; height: ${SIZE.height}px; background: url(/__source) 0 0 / 100% 100%; overflow: hidden; }
    .mat { position: absolute; padding: 11px; box-sizing: border-box; background: #f6f3ec; box-shadow: inset 0 1px 4px rgba(0,0,0,.2); }
    .poster { position: relative; width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 9px; font: 800 15px/1 Inter, sans-serif; letter-spacing: .02em; }
    .poster svg { width: 54%; }
    .poster::after { content: ""; position: absolute; inset: 0; background: linear-gradient(125deg, rgba(255,255,255,.14), transparent 42%); }
    #hero { position: absolute; left: ${screenLeft}px; top: ${screenTop}px; width: ${screenRight - screenLeft}px; height: ${screenBottom - screenTop}px; object-fit: cover; }
    #glass { position: absolute; left: ${screenLeft}px; top: ${screenTop}px; width: ${screenRight - screenLeft}px; height: ${screenBottom - screenTop}px; background: linear-gradient(112deg, transparent 58%, rgba(255,255,255,.05) 74%, rgba(255,255,255,.015) 88%); }
    #logo { position: absolute; left: ${mugX - mugSize / 2}px; top: ${mugY - mugSize / 2}px; width: ${mugSize}px; height: ${mugSize}px; opacity: .9; }
    #note { position: absolute; left: 0; top: 0; width: 300px; height: 120px; transform-origin: 0 0; transform: ${postit}; display: flex; align-items: center; justify-content: center; font: 700 46px "Segoe Print", cursive; color: #1b1b1f; mix-blend-mode: multiply; }
  </style><div id="scene">${posters}
    <img id="hero" src="/__hero">
    <div id="glass"></div>
    <img id="logo" src="/__logo">
    <div id="note">jaume.www</div>
  </div>`;
}

// Compone la imagen fija con un navegador real: tipografÃ­as, fusiones y perspectiva.
async function composeStill() {
  const dist = join(root, "dist");
  const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif", ".woff2": "font/woff2" };
  let hero = null;
  const logo = await logoInk();
  const server = createServer((req, res) => {
    const path = new URL(req.url, "http://x").pathname;
    if (path === "/__source") return createReadStream(source).pipe(res);
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

    const page = await browser.newPage({ viewport: SIZE });
    await page.goto(`${base}/__compose`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    return await page.locator("#scene").screenshot();
  } finally {
    await browser.close();
    server.close();
  }
}

// Sombras de hojas: copas que entran desde la ventana, con cada hoja meciÃ©ndose en bucle.
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
  const { width: W, height: H } = OUTPUT;
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
  const { width: W, height: H } = OUTPUT;
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

// Aplica el margen por píxel dando dos vueltas al bucle: en la segunda, el primer fotograma parte
// de lo que dejó el último, así que el reinicio del bucle no da ningún salto.
function holdSmallChanges(rawFrames) {
  const held = Buffer.from(rawFrames.at(-1));
  const apply = (frame) => {
    for (let p = 0; p < held.length; p += 3) {
      if (
        Math.abs(frame[p] - held[p]) > HOLD_THRESHOLD ||
        Math.abs(frame[p + 1] - held[p + 1]) > HOLD_THRESHOLD ||
        Math.abs(frame[p + 2] - held[p + 2]) > HOLD_THRESHOLD
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

function createShadowMap() {
  const { width: W, height: H } = OUTPUT;
  const map = new Float32Array(W * H);
  const monitorLeft = SCENE.monitor.topLeft[0] * W;
  const monitorRight = SCENE.monitor.bottomRight[0] * W;
  const monitorTop = SCENE.monitor.topLeft[1] * H;
  const monitorBottom = SCENE.monitor.bottomRight[1] * H;
  const windowLeft = SCENE.windowLeft * W;
  const deskTop = SCENE.deskTop * H;
  const deskFront = SCENE.deskFront * H;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (y >= deskFront) continue;
      const onDesk = y >= deskTop;
      if (!onDesk && x >= windowLeft) continue;
      if (!onDesk && x >= monitorLeft && x <= monitorRight && y >= monitorTop && y <= monitorBottom) continue;
      if (y >= monitorTop && y < monitorBottom && x >= monitorLeft && x <= monitorRight) continue;
      map[y * W + x] = smooth(0.46, 0.8, x / W) * (onDesk ? 0.62 : 1);
    }
  }
  return map;
}

function animateFrame(base, leafMask, shadowMap, t) {
  const { width: W, height: H } = OUTPUT;
  const out = Buffer.from(base);
  const strength = 0.28;
  const deskStart = Math.floor(SCENE.deskTop * H) * W;
  for (let i = 0, p = 0; i < W * H; i++, p += 3) {
    const shade = (leafMask[i] / 255) * shadowMap[i] * strength;
    if (shade <= 0) continue;
    // En la pared, sombra algo frÃ­a; sobre la madera conserva su tono cÃ¡lido.
    const onDesk = i >= deskStart;
    out[p] = base[p] * (1 - shade * (onDesk ? 0.82 : 1));
    out[p + 1] = base[p + 1] * (1 - shade * (onDesk ? 1 : 0.97));
    out[p + 2] = base[p + 2] * (1 - shade * (onDesk ? 1 : 0.88));
  }

  // Hojas de la ventana: leve ondulaciÃ³n solo sobre el verde, no sobre el marco blanco.
  const tau = Math.PI * 2;
  const left = Math.floor(SCENE.glass.left * W);
  const bottom = Math.floor(SCENE.glass.bottom * H);
  for (let y = 0; y < bottom; y++) {
    for (let x = left; x < W; x++) {
      const p = (y * W + x) * 3;
      const r = base[p], g = base[p + 1], b = base[p + 2];
      const max = Math.max(r, g, b);
      const saturation = max === 0 ? 0 : (max - Math.min(r, g, b)) / max;
      const amount = smooth(0.12, 0.3, saturation);
      if (amount <= 0) continue;
      const dx = 1.9 * Math.sin(tau * t + y * 0.05 + x * 0.03) + 0.8 * Math.sin(tau * 2 * t + x * 0.09 + y * 0.02);
      const dy = 1.3 * Math.sin(tau * t + x * 0.06 + 1.1) + 0.6 * Math.sin(tau * 2 * t + y * 0.08);
      const sx = Math.min(Math.max(x + dx, left), W - 2);
      const sy = Math.min(Math.max(y + dy, 0), bottom - 2);
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

const started = Date.now();
const still = await composeStill();
writeFileSync(join(outDir, "still-1680.png"), still);

const { data: base } = await sharp(still).removeAlpha().resize(OUTPUT.width, OUTPUT.height, { fit: "fill" }).raw().toBuffer({ resolveWithObject: true });
const clumps = createClumps();
const shadowMap = createShadowMap();
const rawFrames = [];
for (let index = 0; index < FRAMES; index++) {
  const t = index / FRAMES;
  const mask = await sharp(Buffer.from(shadowSvg(clumps, t))).greyscale().raw().toBuffer();
  rawFrames.push(animateFrame(base, mask, shadowMap, t));
}
const raw = { raw: { width: OUTPUT.width, height: OUTPUT.height, channels: 3 } };
const frames = await Promise.all(holdSmallChanges(rawFrames).map((frame) => sharp(frame, raw).png({ compressionLevel: 1 }).toBuffer()));
writeFileSync(join(outDir, "frame-00.png"), frames[0]);
console.log(`Fotogramas: ${FRAMES} en ${((Date.now() - started) / 1000).toFixed(1)} s`);

const gif = join(outDir, "setup-scene.gif");
await sharp(frames, { join: { animated: true } })
  .gif({ delay: DELAY_MS, loop: 0, colours: 256, dither: 0.5, effort: 10, reuse: true, interFrameMaxError: GIF_MAX_ERROR, interPaletteMaxError: 24 })
  .toFile(gif);
console.log(`GIF ${OUTPUT.width}×${OUTPUT.height}, ${FRAMES} fotogramas a ${DELAY_MS} ms: ${(statSync(gif).size / 1024 / 1024).toFixed(2)} MB`);
