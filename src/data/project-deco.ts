/**
 * Ilustración de cabecera propia de cada proyecto (SVG decorativo, aria-hidden).
 * Formas únicas y sin texturas repetitivas; los colores salen de las variables
 * --pj-bg / --pj-fg / --pj-accent / --pj-on que inyecta la ficha.
 */
const A = "var(--pj-accent)";
const F = "var(--pj-fg)";
const B = "var(--pj-bg)";

const wrap = (inner: string, extra = "") =>
  `<svg class="pj-deco" viewBox="0 0 1440 640" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false" ${extra}>${inner}</svg>`;

export const projectDeco: Record<string, string> = {
  // Arco de la marca AVISA, gigante, con su punto
  avisa: wrap(`
    <path d="M820 760 V330 A300 300 0 0 1 1420 330 V760" fill="none" style="stroke:${A}" stroke-width="34" stroke-linecap="round" opacity="0.95"/>
    <path d="M900 760 V340 A220 220 0 0 1 1340 340 V760" fill="none" style="stroke:${F}" stroke-width="3" opacity="0.28"/>
    <circle cx="1290" cy="150" r="26" style="fill:${F}" opacity="0.9"/>`),

  // Plato / horno: gran círculo cálido y ola que enlaza con la franja inferior
  "pizzeria-xativa": wrap(`
    <circle cx="1230" cy="250" r="330" style="fill:${A}" opacity="0.16"/>
    <circle cx="1230" cy="250" r="230" fill="none" style="stroke:${A}" stroke-width="3" opacity="0.5" stroke-dasharray="2 14" stroke-linecap="round"/>
    <path d="M0 640 V572 Q180 508 360 572 T720 572 T1080 572 T1440 572 V640Z" style="fill:${A}"/>`),

  // Cartel callejero: una tira diagonal y una mancha
  "burger-xativa": wrap(`
    <polygon points="0,560 1440,440 1440,520 0,640" style="fill:${A}"/>
    <polygon points="0,628 1440,540 1440,552 0,640" style="fill:${F}" opacity="0.9"/>
    <circle cx="1180" cy="120" r="70" style="fill:${A}" opacity="0.9"/>`),

  // Deporte: numeral enorme en trazo y corte diagonal
  trania: wrap(`
    <text x="840" y="610" font-size="520" font-weight="800" font-family="Syne, sans-serif" fill="none" style="stroke:${A}" stroke-width="3" opacity="0.28" letter-spacing="-20">03</text>
    <polygon points="1000,0 1440,0 1440,640 840,640" style="fill:${A}" opacity="0.12"/>
    <path d="M0 610 L1440 520" style="stroke:${A}" stroke-width="10"/>`),

  // SaaS limpio: manchas de luz suaves, sin trazos
  worksy: wrap(`
    <defs><filter id="pj-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="70"/></filter></defs>
    <circle cx="260" cy="170" r="210" style="fill:${A}" opacity="0.32" filter="url(#pj-blur)"/>
    <circle cx="1180" cy="120" r="240" fill="#a5b4fc" opacity="0.5" filter="url(#pj-blur)"/>
    <circle cx="760" cy="560" r="230" fill="#67e8f9" opacity="0.4" filter="url(#pj-blur)"/>`),

  // Telemetría: gráfica de línea que sube con picos
  "dashboard-telemetria": wrap(`
    <defs><linearGradient id="pj-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:${A}" stop-opacity="0.35"/><stop offset="1" style="stop-color:${A}" stop-opacity="0"/></linearGradient></defs>
    <path d="M0 610 L200 595 L380 600 L560 550 L700 570 L840 480 L980 510 L1120 370 L1260 410 L1440 260 V640 H0Z" fill="url(#pj-area)"/>
    <path d="M0 610 L200 595 L380 600 L560 550 L700 570 L840 480 L980 510 L1120 370 L1260 410 L1440 260" fill="none" style="stroke:${A}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="1120" cy="370" r="9" style="fill:${A}"/><circle cx="840" cy="480" r="9" style="fill:${A}"/>`),

  // Pipeline: nodos conectados en una línea con salto
  "pipeline-cicd": wrap(`
    <path d="M-20 560 H620 C700 560 700 510 780 510 H1000 C1080 510 1080 560 1160 560 H1460" fill="none" style="stroke:${A}" stroke-width="5" stroke-linecap="round"/>
    <g style="fill:${B};stroke:${A}" stroke-width="5">
      <circle cx="260" cy="560" r="18"/><circle cx="780" cy="510" r="18"/><circle cx="960" cy="510" r="18"/><circle cx="1160" cy="560" r="18"/><circle cx="1340" cy="560" r="18"/>
    </g>
    <circle cx="1340" cy="560" r="8" style="fill:${A}"/>
    <g font-family="ui-monospace, Menlo, monospace" font-size="20" style="fill:${F}" opacity="0.75" text-anchor="middle">
      <text x="260" y="604">build</text><text x="780" y="554">test</text><text x="960" y="554">scan</text><text x="1160" y="604">deploy</text><text x="1340" y="604">live</text>
    </g>`),

  // Editorial de arquitectura: círculos y una línea que se cruzan
  "forma-espacio": wrap(`
    <circle cx="1090" cy="330" r="270" fill="none" style="stroke:${F}" stroke-width="2"/>
    <circle cx="1250" cy="330" r="270" fill="none" style="stroke:${F}" stroke-width="2" opacity="0.5"/>
    <circle cx="1090" cy="330" r="120" style="fill:${A}"/>
    <path d="M520 700 L1420 -40" style="stroke:${F}" stroke-width="2"/>`),

  // Finca: colinas suaves y sol
  fincarural: wrap(`
    <circle cx="1130" cy="170" r="96" style="fill:${A}" opacity="0.85"/>
    <path d="M0 520 C220 430 420 560 700 480 S1180 420 1440 500 V640 H0Z" style="fill:${F}" opacity="0.12"/>
    <path d="M0 570 C260 500 520 610 820 540 S1250 520 1440 560 V640 H0Z" style="fill:${A}" opacity="0.55"/>
    <path d="M0 610 C300 570 620 640 940 600 S1320 590 1440 610 V640 H0Z" style="fill:${F}" opacity="0.9"/>`),
};

export const getDeco = (id: string): string => projectDeco[id] ?? "";
