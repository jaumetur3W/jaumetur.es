import fs from 'node:fs';
import sharp from 'sharp';

// -------------------------------------------------------------
// 1. GENERATE TRANIA INTELLIGENCE ARCHITECTURE SCHEMA (1200 x 860)
// Theme: "Presupuesto de taller" (warm black #0b0b09, #141412, #1c1c19,
// yellow #ffff00, warm white lines, typography: Bricolage / Atkinson / Mono)
// -------------------------------------------------------------

function sanitizeObj(obj) {
  const res = {};
  for (const [k, v] of Object.entries(obj)) {
    res[k] = typeof v === 'string' ? v.replace(/&/g, '&amp;') : v;
  }
  return res;
}

function generateSchemaSvg(lang) {
  const isEn = lang === 'en';

  const rawT = isEn ? {
    techLabel: "// TECHNICAL ARCHITECTURE · ATHLETIC INTELLIGENCE SYSTEM",
    mainTitle: "TRANIA INTELLIGENCE",
    mainSub: "— BIOMECHANICAL ENGINES & AI COACH",
    badgeStamp: "[ 6 DETERMINISTIC ENGINES ]",
    coreHeader: "ATHLETIC INTELLIGENCE CORE · TRANIA CORE",
    coreSub: "Algorithmic biomechanical supervision, continuous load calculation & multi-tenant isolation.",
    corePip: "DETERMINISTIC PIPELINE",
    coreIso: "ISOLATED MULTI-TENANT",
    e1Tag: "[ ENGINE 01 ]", e1Title: "Training Intelligence",
    e1p1: "• Custom adaptive routine generation", e1p2: "• Dynamic volume & frequency modulation", e1p3: "• Goal alignment (strength, hypertrophy, health)",
    e1Badge: "Algorithmic Prescription",
    e2Tag: "[ ENGINE 02 ]", e2Title: "Performance Tracking",
    e2p1: "• Progressive overload quantification", e2p2: "• Tonnage, effective reps & RPE records", e2p3: "• Real-time estimated 1RM calculations",
    e2Badge: "Load Metric Modeling",
    e3Tag: "[ ENGINE 03 ]", e3Title: "Recovery Intelligence",
    e3p1: "• CNS & muscular fatigue modeling", e3p2: "• Readiness Score & sleep factor scoring", e3p3: "• Proactive overtraining prevention",
    e3Badge: "Fatigue & Recovery",
    e4Tag: "[ ENGINE 04 ]", e4Title: "Body Analytics",
    e4p1: "• Longitudinal biometric & caliper tracking", e4p2: "• Circumference & body composition shifts", e4p3: "• Training volume vs. physique correlation",
    e4Badge: "Biometric Registry",
    e5Tag: "[ ENGINE 05 ]", e5Title: "Exercise Intelligence",
    e5p1: "• Biomechanical motion & joint analysis", e5p2: "• Structural movement compatibility", e5p3: "• Algorithmic alternative exercise substitution",
    e5Badge: "Applied Biomechanics",
    e6Tag: "[ ENGINE 06 ]", e6Title: "Progressive Learning",
    e6p1: "• Verified individual adaptation calibration", e6p2: "• Algorithmic deload scheduling", e6p3: "• Microcycle stimulus auto-regulation",
    e6Badge: "Continuous Adaptation",
    gateLabel: "▼ MANDATORY DETERMINISTIC VALIDATION GATE · BIOMECHANICAL SAFETY ▼",
    gateRule: "Strict Rule: No AI output can bypass or override the mathematical calculations of the 6 engines.",
    coachTitle: "AI ATHLETIC COACH ASSISTANT",
    coachSub: "Natural language conversational layer & contextual workout explanations",
    coachBadge: "[ SOVEREIGN AI · PRIVATE HOSTING ]",
    coachCol1Title: "CONVERSATIONAL CAPABILITIES",
    coachCol1p1: "1. Resolves technical queries on execution, form & rest intervals.",
    coachCol1p2: "2. Explains the biomechanical rationale behind each set and exercise.",
    coachCol1p3: "3. Identifies training plateaus and drafts adjustment proposals.",
    coachCol2Title: "DETERMINISTIC SAFETY ASSURANCE",
    coachCol2p1: "• The AI operates solely as an intuitive natural language interface.",
    coachCol2p2: "• Absolute determinism: physical prescriptions are computed by engines.",
    coachCol2p3: "• Health data privacy: biometric records never leave the private host.",
  } : {
    techLabel: "// ESQUEMA TÉCNICO · SISTEMA DE INTELIGENCIA DEPORTIVA",
    mainTitle: "TRANIA INTELLIGENCE",
    mainSub: "— NÚCLEO BIOMECÁNICO Y COACH IA",
    badgeStamp: "[ 6 MOTORES DETERMINISTAS ]",
    coreHeader: "NÚCLEO DE INTELIGENCIA DEPORTIVA · TRANIA CORE",
    coreSub: "Supervisión algorítmica biomecánica, cálculo continuo de cargas y aislamiento multi-inquilino.",
    corePip: "PIPELINE DETERMINISTA",
    coreIso: "MULTITENANT AISLADO",
    e1Tag: "[ MOTOR 01 ]", e1Title: "Training Intelligence",
    e1p1: "• Planificación de rutinas adaptativas individuales", e1p2: "• Modulación de volumen, frecuencia y descansos", e1p3: "• Adaptación por objetivo (fuerza, hipertrofia, salud)",
    e1Badge: "Prescripción Algorítmica",
    e2Tag: "[ MOTOR 02 ]", e2Title: "Performance Tracking",
    e2p1: "• Monitorización de sobrecarga progresiva", e2p2: "• Registro de tonelaje, reps efectivas y RPE", e2p3: "• Cálculo dinámico y proyección de 1RM",
    e2Badge: "Modelado de Carga",
    e3Tag: "[ MOTOR 03 ]", e3Title: "Recovery Intelligence",
    e3p1: "• Modelado de fatiga del SNC y muscular", e3p2: "• Índice de preparación física (Readiness Score)", e3p3: "• Prevención proactiva del sobreentrenamiento",
    e3Badge: "Control de Fatiga",
    e4Tag: "[ MOTOR 04 ]", e4Title: "Body Analytics",
    e4p1: "• Seguimiento antropométrico y pliegues", e4p2: "• Medición de perímetros y composición física", e4p3: "• Correlación entre volumen y cambios corporales",
    e4Badge: "Historial Biométrico",
    e5Tag: "[ MOTOR 05 ]", e5Title: "Exercise Intelligence",
    e5p1: "• Biblioteca biomecánica y análisis técnico", e5p2: "• Compatibilidad articular y patrones motores", e5p3: "• Sustitución algorítmica ante limitaciones",
    e5Badge: "Biomecánica Aplicada",
    e6Tag: "[ MOTOR 06 ]", e6Title: "Progressive Learning",
    e6p1: "• Ajuste continuo según respuesta individual", e6p2: "• Calibración de ritmos de descarga (Deload)", e6p3: "• Auto-regulación del estímulo por microciclos",
    e6Badge: "Adaptación Continua",
    gateLabel: "▼ FILTRO DE VALIDACIÓN OBLIGATORIA · SEGURIDAD BIOMECÁNICA ▼",
    gateRule: "Regla inquebrantable: Ninguna salida de la IA puede omitir o contradecir el cálculo matemático de los 6 motores.",
    coachTitle: "ASISTENTE DEPORTIVO COACH IA",
    coachSub: "Capa de interacción en lenguaje natural y explicación contextual de rutinas",
    coachBadge: "[ IA SOBERANA · HOSPEDAJE PROPIO ]",
    coachCol1Title: "FUNCIONES CONVERSACIONALES",
    coachCol1p1: "1. Resuelve dudas biomecánicas sobre técnica, ejecución y descansos.",
    coachCol1p2: "2. Explica al socio la justificación metodológica de cada serie y bloque.",
    coachCol1p3: "3. Diagnostica estancamientos y propone ajustes a los motores deportivos.",
    coachCol2Title: "GARANTÍA DE SEGURIDAD TÉCNICA",
    coachCol2p1: "• La IA actúa únicamente como interfaz en lenguaje natural.",
    coachCol2p2: "• Determinismo absoluto: la prescripción física la calculan los motores.",
    coachCol2p3: "• Privacidad de datos de salud: los registros biométricos no salen del VPS.",
  };

  const t = sanitizeObj(rawT);

  const w = 1200;
  const h = 860;

  return `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <!-- Workshop Background -->
  <rect width="${w}" height="${h}" fill="#0b0b09"/>

  <!-- Technical Corner Marks -->
  <g stroke="#ffff00" stroke-width="1.5" opacity="0.6">
    <path d="M 24 34 L 34 34 M 29 29 L 29 39"/>
    <path d="M 1166 34 L 1176 34 M 1171 29 L 1171 39"/>
    <path d="M 24 826 L 34 826 M 29 821 L 29 831"/>
    <path d="M 1166 826 L 1176 826 M 1171 821 L 1171 831"/>
  </g>

  <!-- Frame border -->
  <rect x="20" y="20" width="1160" height="820" fill="none" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1"/>

  <!-- Header -->
  <g transform="translate(60, 42)">
    <text x="0" y="16" font-family="'JetBrains Mono', ui-monospace, Menlo, monospace" font-size="11" font-weight="700" fill="#ffff00" letter-spacing="1.5">${t.techLabel}</text>
    <text x="0" y="44" font-family="'Bricolage Grotesque', system-ui, sans-serif" font-size="24" font-weight="800" fill="#ffffff" letter-spacing="-0.5">${t.mainTitle} <tspan fill="#a3a39b" font-weight="600" font-size="16">${t.mainSub}</tspan></text>
    
    <!-- Yellow Stamp Badge -->
    <rect x="870" y="18" width="210" height="26" rx="2" fill="#ffff00"/>
    <text x="975" y="35" text-anchor="middle" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="11" font-weight="800" fill="#0b0b09" letter-spacing="0.5">${t.badgeStamp}</text>
  </g>

  <!-- Fine Line Header Divider -->
  <line x1="60" y1="98" x2="1140" y2="98" stroke="rgba(255, 255, 240, 0.16)" stroke-width="1"/>

  <!-- LEVEL 1: CENTRAL CORE HUB -->
  <g transform="translate(60, 114)">
    <rect width="1080" height="72" rx="3" fill="#141412" stroke="rgba(255, 255, 240, 0.22)" stroke-width="1"/>
    <!-- Yellow Accent Tab on left -->
    <rect x="0" y="0" width="4" height="72" rx="1" fill="#ffff00"/>

    <text x="24" y="30" font-family="'Bricolage Grotesque', system-ui, sans-serif" font-size="16" font-weight="800" fill="#ffffff">${t.coreHeader}</text>
    <text x="24" y="52" font-family="'Atkinson Hyperlegible Next', system-ui, sans-serif" font-size="12.5" font-weight="400" fill="#d2d2cb">${t.coreSub}</text>

    <!-- Chips on the right -->
    <g transform="translate(730, 24)">
      <rect width="170" height="24" rx="2" fill="#0b0b09" stroke="#ffff00" stroke-width="1"/>
      <text x="85" y="16" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="700" fill="#ffff00">${t.corePip}</text>

      <rect x="180" y="0" width="150" height="24" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.25)" stroke-width="1"/>
      <text x="255" y="16" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="700" fill="#ffffff">${t.coreIso}</text>
    </g>
  </g>

  <!-- Distribution Lines to 6 Engines -->
  <line x1="600" y1="186" x2="600" y2="208" stroke="#ffff00" stroke-width="1.5"/>
  <path d="M 230 208 L 970 208 M 230 208 L 230 224 M 600 208 L 600 224 M 970 208 L 970 224" fill="none" stroke="rgba(255, 255, 240, 0.3)" stroke-width="1.2" stroke-dasharray="3,3"/>
  
  <!-- Connector Points -->
  <circle cx="230" cy="208" r="3" fill="#ffff00"/>
  <circle cx="600" cy="208" r="3.5" fill="#ffff00"/>
  <circle cx="970" cy="208" r="3" fill="#ffff00"/>

  <!-- ================= ROW 1 OF ENGINES ================= -->
  <!-- Box 1: Training Intelligence -->
  <g transform="translate(60, 224)">
    <rect width="346" height="142" rx="3" fill="#141412" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
    <text x="16" y="24" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#ffff00">${t.e1Tag}</text>
    <text x="16" y="44" font-family="'Bricolage Grotesque', sans-serif" font-size="15" font-weight="800" fill="#ffffff">${t.e1Title}</text>
    <line x1="16" y1="54" x2="330" y2="54" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1" stroke-dasharray="2,2"/>
    <text x="16" y="74" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.e1p1}</text>
    <text x="16" y="94" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.e1p2}</text>
    <text x="16" y="114" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.e1p3}</text>
    <text x="16" y="132" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="#a3a39b">// ${t.e1Badge}</text>
  </g>

  <!-- Box 2: Performance Tracking -->
  <g transform="translate(427, 224)">
    <rect width="346" height="142" rx="3" fill="#141412" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
    <text x="16" y="24" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#ffff00">${t.e2Tag}</text>
    <text x="16" y="44" font-family="'Bricolage Grotesque', sans-serif" font-size="15" font-weight="800" fill="#ffffff">${t.e2Title}</text>
    <line x1="16" y1="54" x2="330" y2="54" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1" stroke-dasharray="2,2"/>
    <text x="16" y="74" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.e2p1}</text>
    <text x="16" y="94" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.e2p2}</text>
    <text x="16" y="114" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.e2p3}</text>
    <text x="16" y="132" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="#a3a39b">// ${t.e2Badge}</text>
  </g>

  <!-- Box 3: Recovery Intelligence -->
  <g transform="translate(794, 224)">
    <rect width="346" height="142" rx="3" fill="#141412" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
    <text x="16" y="24" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#ffff00">${t.e3Tag}</text>
    <text x="16" y="44" font-family="'Bricolage Grotesque', sans-serif" font-size="15" font-weight="800" fill="#ffffff">${t.e3Title}</text>
    <line x1="16" y1="54" x2="330" y2="54" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1" stroke-dasharray="2,2"/>
    <text x="16" y="74" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.e3p1}</text>
    <text x="16" y="94" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.e3p2}</text>
    <text x="16" y="114" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.e3p3}</text>
    <text x="16" y="132" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="#a3a39b">// ${t.e3Badge}</text>
  </g>

  <!-- ================= ROW 2 OF ENGINES ================= -->
  <!-- Box 4: Body Analytics -->
  <g transform="translate(60, 380)">
    <rect width="346" height="142" rx="3" fill="#141412" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
    <text x="16" y="24" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#ffff00">${t.e4Tag}</text>
    <text x="16" y="44" font-family="'Bricolage Grotesque', sans-serif" font-size="15" font-weight="800" fill="#ffffff">${t.e4Title}</text>
    <line x1="16" y1="54" x2="330" y2="54" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1" stroke-dasharray="2,2"/>
    <text x="16" y="74" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.e4p1}</text>
    <text x="16" y="94" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.e4p2}</text>
    <text x="16" y="114" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.e4p3}</text>
    <text x="16" y="132" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="#a3a39b">// ${t.e4Badge}</text>
  </g>

  <!-- Box 5: Exercise Intelligence -->
  <g transform="translate(427, 380)">
    <rect width="346" height="142" rx="3" fill="#141412" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
    <text x="16" y="24" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#ffff00">${t.e5Tag}</text>
    <text x="16" y="44" font-family="'Bricolage Grotesque', sans-serif" font-size="15" font-weight="800" fill="#ffffff">${t.e5Title}</text>
    <line x1="16" y1="54" x2="330" y2="54" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1" stroke-dasharray="2,2"/>
    <text x="16" y="74" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.e5p1}</text>
    <text x="16" y="94" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.e5p2}</text>
    <text x="16" y="114" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.e5p3}</text>
    <text x="16" y="132" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="#a3a39b">// ${t.e5Badge}</text>
  </g>

  <!-- Box 6: Progressive Learning -->
  <g transform="translate(794, 380)">
    <rect width="346" height="142" rx="3" fill="#141412" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
    <text x="16" y="24" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#ffff00">${t.e6Tag}</text>
    <text x="16" y="44" font-family="'Bricolage Grotesque', sans-serif" font-size="15" font-weight="800" fill="#ffffff">${t.e6Title}</text>
    <line x1="16" y1="54" x2="330" y2="54" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1" stroke-dasharray="2,2"/>
    <text x="16" y="74" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.e6p1}</text>
    <text x="16" y="94" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.e6p2}</text>
    <text x="16" y="114" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.e6p3}</text>
    <text x="16" y="132" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="#a3a39b">// ${t.e6Badge}</text>
  </g>

  <!-- Convergence bus from Engines to Validation Gate -->
  <path d="M 230 522 L 230 542 M 600 522 L 600 542 M 970 522 L 970 542 M 230 542 L 970 542 M 600 542 L 600 558" fill="none" stroke="rgba(255, 255, 240, 0.3)" stroke-width="1.2" stroke-dasharray="3,3"/>
  <circle cx="600" cy="542" r="3.5" fill="#ffff00"/>

  <!-- LEVEL 4: VALIDATION GATE -->
  <g transform="translate(180, 558)">
    <rect width="840" height="42" rx="3" fill="#0b0b09" stroke="#ffff00" stroke-width="1.5"/>
    <!-- Yellow Stamp on the left -->
    <rect x="0" y="0" width="8" height="42" fill="#ffff00"/>
    <text x="420" y="19" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" fill="#ffff00" letter-spacing="0.5">${t.gateLabel}</text>
    <text x="420" y="34" text-anchor="middle" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11" font-weight="500" fill="#d2d2cb">${t.gateRule}</text>
  </g>

  <line x1="600" y1="600" x2="600" y2="620" stroke="#ffff00" stroke-width="1.5"/>

  <!-- LEVEL 5: ASISTENTE COACH IA -->
  <g transform="translate(60, 620)">
    <rect width="1080" height="195" rx="3" fill="#141412" stroke="rgba(255, 255, 240, 0.28)" stroke-width="1"/>
    
    <!-- Left Accent Strip -->
    <rect x="0" y="0" width="4" height="195" fill="#ffff00"/>

    <!-- Header -->
    <text x="24" y="28" font-family="'Bricolage Grotesque', sans-serif" font-size="17" font-weight="800" fill="#ffffff">${t.coachTitle}</text>
    <text x="24" y="47" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" font-weight="400" fill="#a3a39b">${t.coachSub}</text>

    <!-- Right Yellow Chip -->
    <rect x="830" y="16" width="225" height="24" rx="2" fill="#ffff00"/>
    <text x="942" y="32" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="800" fill="#0b0b09">${t.coachBadge}</text>

    <line x1="24" y1="60" x2="1056" y2="60" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1"/>

    <!-- Two Internal Columns -->
    <!-- Column 1 -->
    <g transform="translate(24, 75)">
      <text x="0" y="14" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="700" fill="#ffff00">[ ${t.coachCol1Title} ]</text>
      <text x="0" y="38" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#d2d2cb">${t.coachCol1p1}</text>
      <text x="0" y="60" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#d2d2cb">${t.coachCol1p2}</text>
      <text x="0" y="82" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#d2d2cb">${t.coachCol1p3}</text>
    </g>

    <!-- Dotted Divider between columns -->
    <line x1="540" y1="72" x2="540" y2="175" stroke="rgba(255, 255, 240, 0.16)" stroke-width="1" stroke-dasharray="3,3"/>

    <!-- Column 2 -->
    <g transform="translate(565, 75)">
      <text x="0" y="14" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="700" fill="#ffff00">[ ${t.coachCol2Title} ]</text>
      <text x="0" y="38" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#d2d2cb">${t.coachCol2p1}</text>
      <text x="0" y="60" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#d2d2cb">${t.coachCol2p2}</text>
      <text x="0" y="82" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#d2d2cb">${t.coachCol2p3}</text>
    </g>
  </g>
</svg>
`;
}

// -------------------------------------------------------------
// 2. GENERATE PROJECT PREVIEW (preview-trania.webp) (1200 x 750)
// Matching website "Presupuesto de taller" theme
// -------------------------------------------------------------

function generatePreviewSvg() {
  const w = 1200;
  const h = 750;

  return `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <!-- Workshop Background -->
  <rect width="${w}" height="${h}" fill="#0b0b09"/>

  <!-- Technical Corner Marks -->
  <g stroke="#ffff00" stroke-width="1.5" opacity="0.6">
    <path d="M 24 34 L 34 34 M 29 29 L 29 39"/>
    <path d="M 1166 34 L 1176 34 M 1171 29 L 1171 39"/>
    <path d="M 24 716 L 34 716 M 29 711 L 29 721"/>
    <path d="M 1166 716 L 1176 716 M 1171 711 L 1171 721"/>
  </g>

  <!-- Frame border -->
  <rect x="20" y="20" width="1160" height="710" fill="none" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1"/>

  <!-- Top Bar -->
  <g transform="translate(60, 42)">
    <text x="0" y="16" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffff00" letter-spacing="1.5">// PLATAFORMA SAAS DEPORTIVA · FIT &amp; ATHLETIC INTELLIGENCE</text>
    <text x="0" y="46" font-family="'Bricolage Grotesque', system-ui, sans-serif" font-size="28" font-weight="900" fill="#ffffff" letter-spacing="-0.5">TRAN<tspan fill="#ffff00">IA</tspan> <tspan font-size="17" fill="#a3a39b" font-weight="600">— GESTIÓN INTELIGENTE DEL GIMNASIO &amp; RENDIMIENTO CON IA</tspan></text>

    <!-- Top Workshop Badges -->
    <rect x="850" y="20" width="130" height="26" rx="2" fill="#ffff00"/>
    <text x="915" y="37" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" fill="#0b0b09">MULTI-TENANT</text>

    <rect x="990" y="20" width="110" height="26" rx="2" fill="#141412" stroke="#ffff00" stroke-width="1"/>
    <text x="1045" y="37" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#ffff00">COACH IA</text>
  </g>

  <!-- Divider -->
  <line x1="60" y1="102" x2="1140" y2="102" stroke="rgba(255, 255, 240, 0.16)" stroke-width="1"/>

  <!-- LEFT COLUMN: TRANIA MANAGER (w=525) -->
  <g transform="translate(60, 118)">
    <rect width="525" height="582" rx="3" fill="#141412" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
    <rect x="0" y="0" width="4" height="582" rx="1" fill="#ffff00"/>

    <!-- Header -->
    <text x="24" y="34" font-family="'Bricolage Grotesque', sans-serif" font-size="18" font-weight="800" fill="#ffffff">TRANIA MANAGER</text>
    <text x="24" y="52" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#a3a39b">Administración, Facturación, Socios &amp; Operaciones</text>
    <line x1="24" y1="64" x2="501" y2="64" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1"/>

    <!-- Two Metric Cards (workshop style) -->
    <g transform="translate(24, 76)">
      <rect width="226" height="80" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.18)" stroke-width="1"/>
      <text x="14" y="24" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="700" fill="#a3a39b">SOCIOS ACTIVOS</text>
      <text x="14" y="54" font-family="'Bricolage Grotesque', sans-serif" font-size="24" font-weight="800" fill="#ffffff">1.248 <tspan font-size="13" fill="#ffff00" font-weight="700">+14%</tspan></text>
      <text x="14" y="70" font-family="'JetBrains Mono', monospace" font-size="9" fill="#a3a39b">Control de acceso QR</text>
    </g>

    <g transform="translate(275, 76)">
      <rect width="226" height="80" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.18)" stroke-width="1"/>
      <text x="14" y="24" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="700" fill="#a3a39b">FACTURACIÓN MENSUAL</text>
      <text x="14" y="54" font-family="'Bricolage Grotesque', sans-serif" font-size="24" font-weight="800" fill="#ffff00">42.850 €</text>
      <text x="14" y="70" font-family="'JetBrains Mono', monospace" font-size="9" fill="#a3a39b">Remesas SEPA automáticas</text>
    </g>

    <!-- Operational leader rows (like Workshop invoice) -->
    <g transform="translate(24, 175)">
      <!-- Row 1 -->
      <g transform="translate(0, 0)">
        <rect width="477" height="42" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1"/>
        <text x="16" y="26" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12.5" font-weight="700" fill="#ffffff">Socios &amp; Fichas Personales</text>
        <line x1="210" y1="26" x2="350" y2="26" stroke="rgba(255, 255, 240, 0.2)" stroke-dasharray="2,3"/>
        <text x="460" y="26" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="700" fill="#ffff00">Altas / Bajas</text>
      </g>

      <!-- Row 2 -->
      <g transform="translate(0, 50)">
        <rect width="477" height="42" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1"/>
        <text x="16" y="26" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12.5" font-weight="700" fill="#ffffff">Clases &amp; Control de Aforo</text>
        <line x1="200" y1="26" x2="330" y2="26" stroke="rgba(255, 255, 240, 0.2)" stroke-dasharray="2,3"/>
        <text x="460" y="26" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="700" fill="#ffff00">Reservas QR en Vivo</text>
      </g>

      <!-- Row 3 -->
      <g transform="translate(0, 100)">
        <rect width="477" height="42" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1"/>
        <text x="16" y="26" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12.5" font-weight="700" fill="#ffffff">Instalaciones &amp; Maquinaria</text>
        <line x1="215" y1="26" x2="340" y2="26" stroke="rgba(255, 255, 240, 0.2)" stroke-dasharray="2,3"/>
        <text x="460" y="26" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="700" fill="#ffffff">Mantenimiento OK</text>
      </g>

      <!-- Row 4 -->
      <g transform="translate(0, 150)">
        <rect width="477" height="42" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1"/>
        <text x="16" y="26" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12.5" font-weight="700" fill="#ffffff">Entrenadores &amp; Turnos</text>
        <line x1="180" y1="26" x2="350" y2="26" stroke="rgba(255, 255, 240, 0.2)" stroke-dasharray="2,3"/>
        <text x="460" y="26" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="700" fill="#ffffff">Cuadrantes</text>
      </g>
    </g>

    <!-- White Label Card at bottom (Presupuesto de taller sheet style) -->
    <g transform="translate(24, 395)">
      <rect width="477" height="162" rx="2" fill="#1c1c19" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
      <rect x="0" y="0" width="477" height="4" fill="#ffff00"/>
      <text x="18" y="26" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" fill="#ffff00">// ARQUITECTURA WHITE LABEL MULTI-GIMNASIO</text>
      <text x="18" y="52" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#d2d2cb">Personalización integral de identidad: logotipo, paleta y portal</text>
      <text x="18" y="70" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#d2d2cb">propio de socio sin bifurcación de la base de código.</text>

      <line x1="18" y1="88" x2="459" y2="88" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1" stroke-dasharray="2,2"/>

      <g transform="translate(18, 102)">
        <rect width="135" height="26" rx="2" fill="#0b0b09" stroke="#ffff00" stroke-width="1"/>
        <text x="67" y="17" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#ffff00">✓ Web &amp; App PWA</text>

        <rect x="150" y="0" width="165" height="26" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
        <text x="232" y="17" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#ffffff">✓ Servidor VPS Aislado</text>

        <rect x="325" y="0" width="115" height="26" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
        <text x="382" y="17" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#ffffff">✓ Marca 100%</text>
      </g>
    </g>
  </g>

  <!-- RIGHT COLUMN: TRANIA INTELLIGENCE (w=525) -->
  <g transform="translate(615, 118)">
    <rect width="525" height="582" rx="3" fill="#141412" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
    <rect x="0" y="0" width="4" height="582" rx="1" fill="#ffff00"/>

    <!-- Header -->
    <text x="24" y="34" font-family="'Bricolage Grotesque', sans-serif" font-size="18" font-weight="800" fill="#ffffff">TRANIA INTELLIGENCE</text>
    <text x="24" y="52" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#a3a39b">6 Motores Deterministas + Asistente Deportivo Coach IA</text>
    <line x1="24" y1="64" x2="501" y2="64" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1"/>

    <!-- 6 Motors Compact Grid (2 cols x 3 rows) -->
    <!-- M1 -->
    <g transform="translate(24, 76)">
      <rect width="228" height="66" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.16)" stroke-width="1"/>
      <text x="12" y="20" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="700" fill="#ffff00">[ 01. TRAINING ]</text>
      <text x="12" y="38" font-family="'Bricolage Grotesque', sans-serif" font-size="13" font-weight="700" fill="#ffffff">Training Intelligence</text>
      <text x="12" y="54" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="10.5" fill="#a3a39b">Rutinas adaptativas a medida</text>
    </g>

    <!-- M2 -->
    <g transform="translate(273, 76)">
      <rect width="228" height="66" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.16)" stroke-width="1"/>
      <text x="12" y="20" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="700" fill="#ffff00">[ 02. TRACKING ]</text>
      <text x="12" y="38" font-family="'Bricolage Grotesque', sans-serif" font-size="13" font-weight="700" fill="#ffffff">Performance Tracking</text>
      <text x="12" y="54" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="10.5" fill="#a3a39b">Tonelaje, RPE y cálculo 1RM</text>
    </g>

    <!-- M3 -->
    <g transform="translate(24, 150)">
      <rect width="228" height="66" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.16)" stroke-width="1"/>
      <text x="12" y="20" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="700" fill="#ffff00">[ 03. RECOVERY ]</text>
      <text x="12" y="38" font-family="'Bricolage Grotesque', sans-serif" font-size="13" font-weight="700" fill="#ffffff">Recovery Intelligence</text>
      <text x="12" y="54" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="10.5" fill="#a3a39b">Fatiga, descanso y readiness</text>
    </g>

    <!-- M4 -->
    <g transform="translate(273, 150)">
      <rect width="228" height="66" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.16)" stroke-width="1"/>
      <text x="12" y="20" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="700" fill="#ffff00">[ 04. ANALYTICS ]</text>
      <text x="12" y="38" font-family="'Bricolage Grotesque', sans-serif" font-size="13" font-weight="700" fill="#ffffff">Body Analytics</text>
      <text x="12" y="54" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="10.5" fill="#a3a39b">Antropometría y pliegues</text>
    </g>

    <!-- M5 -->
    <g transform="translate(24, 224)">
      <rect width="228" height="66" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.16)" stroke-width="1"/>
      <text x="12" y="20" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="700" fill="#ffff00">[ 05. EXERCISE ]</text>
      <text x="12" y="38" font-family="'Bricolage Grotesque', sans-serif" font-size="13" font-weight="700" fill="#ffffff">Exercise Intelligence</text>
      <text x="12" y="54" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="10.5" fill="#a3a39b">Técnica y sustitución articular</text>
    </g>

    <!-- M6 -->
    <g transform="translate(273, 224)">
      <rect width="228" height="66" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.16)" stroke-width="1"/>
      <text x="12" y="20" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="700" fill="#ffff00">[ 06. LEARNING ]</text>
      <text x="12" y="38" font-family="'Bricolage Grotesque', sans-serif" font-size="13" font-weight="700" fill="#ffffff">Progressive Learning</text>
      <text x="12" y="54" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="10.5" fill="#a3a39b">Adaptación continua por socio</text>
    </g>

    <!-- Coach IA Panel at bottom (Presupuesto de taller workshop box) -->
    <g transform="translate(24, 308)">
      <rect width="477" height="248" rx="2" fill="#1c1c19" stroke="#ffff00" stroke-width="1.2"/>
      
      <!-- Top stamp tag inside coach -->
      <rect x="0" y="0" width="477" height="30" fill="#ffff00"/>
      <text x="16" y="20" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="800" fill="#0b0b09">ASISTENTE DEPORTIVO COACH IA // CONVERSACIONAL</text>

      <!-- Simulated terminal dialog -->
      <g transform="translate(16, 46)">
        <text x="0" y="16" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#ffff00">&gt; CONSULTA SOCIO:</text>
        <text x="0" y="34" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#ffffff">"Estancamiento detectado en banca tras 4 semanas de progresión."</text>

        <line x1="0" y1="46" x2="445" y2="46" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1" stroke-dasharray="2,2"/>

        <text x="0" y="64" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#ffffff">&gt; RESPUESTA VALIDADA POR MOTOR RECOVERY:</text>
        <text x="0" y="82" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">• Fatiga acumulada en deltoides anterior (Score: 78/100).</text>
        <text x="0" y="98" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">• Prescripción matemática: Descarga del 12% durante 5 días.</text>
        <text x="0" y="114" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">• Ajuste de ejercicio: Variante inclinada 30° recomendada.</text>
      </g>

      <!-- Security guarantee banner -->
      <g transform="translate(16, 188)">
        <rect width="445" height="42" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
        <text x="222" y="18" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="800" fill="#ffff00">🔒 VALIDACIÓN DETERMINISTA OBLIGATORIA</text>
        <text x="222" y="32" text-anchor="middle" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="10.5" fill="#a3a39b">La IA no altera datos directamente; toda orden pasa por los 6 motores.</text>
      </g>
    </g>
  </g>
</svg>
`;
}

async function run() {
  console.log('Generating workshop-themed images...');

  // 1. Schema in Spanish
  const schemaEsSvg = generateSchemaSvg('es');
  const schemaEsBuf = Buffer.from(schemaEsSvg);
  await sharp(schemaEsBuf).webp({ quality: 92 }).toFile('public/img/trania-intelligence-esquema.webp');
  await sharp(schemaEsBuf).webp({ quality: 92 }).toFile('img/trania-intelligence-esquema.webp');

  // 2. Schema in English
  const schemaEnSvg = generateSchemaSvg('en');
  const schemaEnBuf = Buffer.from(schemaEnSvg);
  await sharp(schemaEnBuf).webp({ quality: 92 }).toFile('public/img/trania-intelligence-scheme-en.webp');
  await sharp(schemaEnBuf).webp({ quality: 92 }).toFile('img/trania-intelligence-scheme-en.webp');

  // 3. Project preview (cover)
  const prevSvg = generatePreviewSvg();
  const prevBuf = Buffer.from(prevSvg);
  await sharp(prevBuf).webp({ quality: 92 }).toFile('public/img/preview-trania.webp');
  await sharp(prevBuf).webp({ quality: 92 }).toFile('img/preview-trania.webp');

  console.log('All workshop-themed images generated successfully!');
}

run().catch(console.error);
