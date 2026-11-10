import fs from 'node:fs';
import sharp from 'sharp';

function sanitizeObj(obj) {
  const res = {};
  for (const [k, v] of Object.entries(obj)) {
    res[k] = typeof v === 'string' ? v.replace(/&/g, '&amp;') : v;
  }
  return res;
}

// -------------------------------------------------------------
// 1. GENERATE WORKSY ARCHITECTURE SCHEMA (1200 x 860)
// Theme: "Presupuesto de taller" (warm black #0b0b09, #141412, #1c1c19,
// yellow #ffff00, warm white lines, typography: Bricolage / Atkinson / Mono)
// -------------------------------------------------------------

function generateSchemaSvg(lang) {
  const isEn = lang === 'en';

  const rawT = isEn ? {
    techLabel: "// TECHNICAL ARCHITECTURE · ENTERPRISE WORKSPACE & HR PLATFORM",
    mainTitle: "WORKSY HR ARCHITECTURE",
    mainSub: "— MODULAR DOMAINS, MULTI-TENANT CORE & SMART ASSISTANT",
    badgeStamp: "[ ENTERPRISE SAAS · GDPR READY ]",

    // Layer 1
    l1Tag: "[ PRESENTATION LAYER · MULTI-DEVICE ]",
    l1Title: "React 18 + TypeScript SPA / PWA",
    l1Item1: "• Vite build pipeline & Tailwind CSS + shadcn/ui",
    l1Item2: "• Role-adaptive views: Employee, Manager, HR Admin",
    l1Item3: "• TanStack Query state cache & optimistic updates",
    l1Item4: "• Real-time reactive socket alerts (Socket.IO)",

    // Layer 2: Core modules
    modTag: "[ CORE ENTERPRISE DOMAINS · DOMAIN-DRIVEN DESIGN ]",
    m1Title: "HR & Organization",
    m1Desc: "Employee directory, organizational hierarchy, role assignments & onboarding/offboarding workflows.",
    m2Title: "Time & Attendance",
    m2Desc: "Tamper-proof time clock, pause tracking, incident management & full Spanish labor law compliance.",
    m3Title: "Absence & Leave",
    m3Desc: "Vacation balance engine, automated approval workflows, conflict detection & team absence calendars.",
    m4Title: "WorkFlow Hub & Mail",
    m4Desc: "Unified inbox (Gmail/Outlook/IMAP) with email-to-task conversion & SSO hub (Slack, Teams, Zoom).",
    m5Title: "Tasks & Projects",
    m5Desc: "Kanban boards, sprint milestones, subtasks, priorities & cross-department workload tracking.",
    m6Title: "Document Vault",
    m6Desc: "Encrypted employment records, contracts, version control & Google Drive / OneDrive sync.",

    // Layer 3: Validation & AI
    gateLabel: "▼ RBAC PERMISSION GATEWAY & COMPLIANCE VERIFICATION ▼",
    gateRule: "Strict Rule: Zero data alteration without authenticated role token and immutable audit trail.",

    // Layer 4: AI & Services
    aiTitle: "WORKFLOW SMART ASSISTANT & EVENT AUTOMATION ENGINE",
    aiSub: "Context-aware AI queries, conversational productivity & event-driven trigger dispatch",
    aiBadge: "[ ENTERPRISE AI · CONFIRMATION GATE ]",
    aiCol1Title: "SMART ASSISTANT CAPABILITIES",
    aiCol1p1: "1. Natural language queries: leave balances, upcoming shifts, team schedules.",
    aiCol1p2: "2. Executive document & internal announcement summarization.",
    aiCol1p3: "3. Action dispatch: draft calendar events, create task dependencies with confirm gate.",
    aiCol2Title: "SECURITY & DATA ISOLATION",
    aiCol2p1: "• Strictly constrained within the employee's RBAC scope and tenant perimeter.",
    aiCol2p2: "• PostgreSQL + Prisma multi-tenant logical partitioning (tenantId isolation).",
    aiCol2p3: "• Encrypted S3-compatible document storage, SAML 2.0 / SSO integration.",
  } : {
    techLabel: "// ESQUEMA TÉCNICO · SISTEMA OPERATIVO EMPRESARIAL INTEGRAL",
    mainTitle: "ARQUITECTURA DE WORKSY HR",
    mainSub: "— DOMINIOS MODULARES, NÚCLEO MULTI-TENANT Y ASISTENTE IA",
    badgeStamp: "[ SAAS EMPRESARIAL · CONFORME RGPD ]",

    // Layer 1
    l1Tag: "[ CAPA DE PRESENTACIÓN · MULTIDISPOSITIVO ]",
    l1Title: "React 18 + TypeScript SPA / PWA",
    l1Item1: "• Compilación optimizada Vite + Tailwind CSS + shadcn/ui",
    l1Item2: "• Vistas adaptadas por rol: Trabajador, Responsable, Admin RR. HH.",
    l1Item3: "• Caché reactiva con TanStack Query y actualizaciones optimistas",
    l1Item4: "• Alertas push reactivas en tiempo real mediante WebSockets (Socket.IO)",

    // Layer 2: Core modules
    modTag: "[ DOMINIOS EMPRESARIALES PRINCIPALES · DISEÑO POR DOMINIOS ]",
    m1Title: "Estructura & Empleados",
    m1Desc: "Directorio corporativo, organigramas departamentales, perfiles y flujos de onboarding y offboarding.",
    m2Title: "Control Horario & Jornada",
    m2Desc: "Registro inalterable de entradas/pausas, trazabilidad y pleno cumplimiento de la ley de control horario en España.",
    m3Title: "Vacaciones & Ausencias",
    m3Desc: "Cálculo dinámico de saldos, flujos de aprobación jerárquica y prevención de solapamientos en calendarios.",
    m4Title: "WorkFlow Hub & Mail",
    m4Desc: "Bandeja corporativa unificada (Gmail/Outlook/IMAP) con conversión a tarea y acceso directo SSO a apps de trabajo.",
    m5Title: "Proyectos & Kanban",
    m5Desc: "Tableros ágiles, subtareas, fechas límite, prioridades y supervisión de cargas de trabajo por equipo.",
    m6Title: "Bóveda Documental",
    m6Desc: "Repositorio cifrado de contratos y nóminas, control de versiones y sincronización con Drive y OneDrive.",

    // Layer 3: Validation & AI
    gateLabel: "▼ PASARELA DE CONTROL DE ACCESO RBAC Y AUDITORÍA FORENSE ▼",
    gateRule: "Regla inquebrantable: Ninguna modificación de jornada o contrato sin token de rol y registro de auditoría.",

    // Layer 4: AI & Services
    aiTitle: "ASISTENTE INTELIGENTE SMART ASSISTANT Y MOTOR DE EVENTOS",
    aiSub: "Consultas contextuales en lenguaje natural, productividad asistida y automatizaciones por eventos",
    aiBadge: "[ IA EMPRESARIAL · BARRERA DE CONFIRMACIÓN ]",
    aiCol1Title: "CAPACIDADES DEL ASISTENTE",
    aiCol1p1: "1. Consulta de días de vacaciones pendientes, turnos y coberturas de equipo.",
    aiCol1p2: "2. Síntesis y extracción de información de comunicados internos y manuales.",
    aiCol1p3: "3. Disparador de acciones asistidas con confirmación expresa obligatoria del usuario.",
    aiCol2Title: "SEGURIDAD Y AISLAMIENTO DE DATOS",
    aiCol2p1: "• Operación restringida estrictamente a los permisos del perfil (RBAC).",
    aiCol2p2: "• PostgreSQL con Prisma ORM y partición lógica multi-tenant (aislamiento por tenantId).",
    aiCol2p3: "• Almacenamiento seguro compatible con S3, firmas DocuSign y SSO SAML 2.0 / Entra ID.",
  };

  const t = sanitizeObj(rawT);
  const w = 1200;
  const h = 860;

  return `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <!-- Dark Workshop Background -->
  <rect width="${w}" height="${h}" fill="#0b0b09"/>

  <!-- Subtle Blueprint Grid Pattern -->
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 240, 0.03)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#grid)"/>

  <!-- Technical Corner Registration Crosshairs -->
  <g stroke="#ffff00" stroke-width="1.5" opacity="0.75">
    <path d="M 24 34 L 34 34 M 29 29 L 29 39"/>
    <path d="M 1166 34 L 1176 34 M 1171 29 L 1171 39"/>
    <path d="M 24 826 L 34 826 M 29 821 L 29 831"/>
    <path d="M 1166 826 L 1176 826 M 1171 821 L 1171 831"/>
  </g>

  <!-- External Frame Border -->
  <rect x="20" y="20" width="1160" height="820" fill="none" stroke="rgba(255, 255, 240, 0.16)" stroke-width="1"/>

  <!-- ================= HEADER SECTION ================= -->
  <g transform="translate(60, 42)">
    <text x="0" y="16" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffff00" letter-spacing="1.5">${t.techLabel}</text>
    <text x="0" y="46" font-family="'Bricolage Grotesque', system-ui, sans-serif" font-size="28" font-weight="900" fill="#ffffff" letter-spacing="-0.5">${t.mainTitle} <tspan font-size="16" fill="#a3a39b" font-weight="600">${t.mainSub}</tspan></text>

    <!-- Top Workshop Stamp Badge -->
    <rect x="850" y="18" width="230" height="28" rx="2" fill="#ffff00"/>
    <text x="965" y="36" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" fill="#0b0b09">${t.badgeStamp}</text>
  </g>

  <!-- Main Top Divider Line -->
  <line x1="60" y1="100" x2="1140" y2="100" stroke="rgba(255, 255, 240, 0.18)" stroke-width="1"/>

  <!-- ================= LEVEL 1: PRESENTATION LAYER ================= -->
  <g transform="translate(60, 114)">
    <rect width="1080" height="68" rx="3" fill="#141412" stroke="rgba(255, 255, 240, 0.22)" stroke-width="1"/>
    <rect x="0" y="0" width="4" height="68" fill="#ffff00"/>

    <text x="20" y="24" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="700" fill="#ffff00">${t.l1Tag}</text>
    <text x="20" y="48" font-family="'Bricolage Grotesque', sans-serif" font-size="17" font-weight="800" fill="#ffffff">${t.l1Title}</text>

    <g transform="translate(360, 16)">
      <text x="0" y="15" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#d2d2cb">${t.l1Item1}</text>
      <text x="0" y="36" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#d2d2cb">${t.l1Item2}</text>
    </g>

    <g transform="translate(730, 16)">
      <text x="0" y="15" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#d2d2cb">${t.l1Item3}</text>
      <text x="0" y="36" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#d2d2cb">${t.l1Item4}</text>
    </g>
  </g>

  <!-- Downward Connectors -->
  <line x1="600" y1="182" x2="600" y2="204" stroke="#ffff00" stroke-width="1.5"/>

  <!-- Section Label for Domains -->
  <g transform="translate(60, 204)">
    <text x="0" y="0" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#a3a39b">// ${t.modTag}</text>
  </g>

  <!-- ================= LEVEL 2: 6 CORE DOMAIN MODULES ================= -->
  <!-- ROW 1 -->
  <!-- Box 1: Organization -->
  <g transform="translate(60, 218)">
    <rect width="346" height="136" rx="3" fill="#141412" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
    <text x="16" y="24" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#ffff00">[ 01. HR &amp; ORG ]</text>
    <text x="16" y="45" font-family="'Bricolage Grotesque', sans-serif" font-size="15" font-weight="800" fill="#ffffff">${t.m1Title}</text>
    <line x1="16" y1="55" x2="330" y2="55" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1" stroke-dasharray="2,2"/>
    <text x="16" y="76" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.m1Desc.split('.')[0]}.</text>
    <text x="16" y="96" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#a3a39b">${t.m1Desc.split('.')[1] || ''}</text>
    <text x="16" y="122" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="#ffff00">✓ Onboarding · Offboarding · RBAC</text>
  </g>

  <!-- Box 2: Time Tracking -->
  <g transform="translate(427, 218)">
    <rect width="346" height="136" rx="3" fill="#141412" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
    <text x="16" y="24" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#ffff00">[ 02. TIME CLOCK ]</text>
    <text x="16" y="45" font-family="'Bricolage Grotesque', sans-serif" font-size="15" font-weight="800" fill="#ffffff">${t.m2Title}</text>
    <line x1="16" y1="55" x2="330" y2="55" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1" stroke-dasharray="2,2"/>
    <text x="16" y="76" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.m2Desc.split('.')[0]}.</text>
    <text x="16" y="96" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#a3a39b">${t.m2Desc.split('.')[1] || ''}</text>
    <text x="16" y="122" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="#ffff00">✓ Ley Control Horario · Auditoría Hash</text>
  </g>

  <!-- Box 3: Leave & Absences -->
  <g transform="translate(794, 218)">
    <rect width="346" height="136" rx="3" fill="#141412" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
    <text x="16" y="24" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#ffff00">[ 03. ABSENCE ]</text>
    <text x="16" y="45" font-family="'Bricolage Grotesque', sans-serif" font-size="15" font-weight="800" fill="#ffffff">${t.m3Title}</text>
    <line x1="16" y1="55" x2="330" y2="55" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1" stroke-dasharray="2,2"/>
    <text x="16" y="76" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.m3Desc.split('.')[0]}.</text>
    <text x="16" y="96" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#a3a39b">${t.m3Desc.split('.')[1] || ''}</text>
    <text x="16" y="122" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="#ffff00">✓ Saldos en Vivo · Aprobación Jerárquica</text>
  </g>

  <!-- ROW 2 -->
  <!-- Box 4: WorkFlow Hub & Mail -->
  <g transform="translate(60, 368)">
    <rect width="346" height="136" rx="3" fill="#141412" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
    <text x="16" y="24" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#ffff00">[ 04. HUB &amp; MAIL ]</text>
    <text x="16" y="45" font-family="'Bricolage Grotesque', sans-serif" font-size="15" font-weight="800" fill="#ffffff">${t.m4Title}</text>
    <line x1="16" y1="55" x2="330" y2="55" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1" stroke-dasharray="2,2"/>
    <text x="16" y="76" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.m4Desc.split('.')[0]}.</text>
    <text x="16" y="96" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#a3a39b">${t.m4Desc.split('.')[1] || ''}</text>
    <text x="16" y="122" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="#ffff00">✓ Gmail · Outlook · Slack · Zoom</text>
  </g>

  <!-- Box 5: Tasks & Kanban -->
  <g transform="translate(427, 368)">
    <rect width="346" height="136" rx="3" fill="#141412" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
    <text x="16" y="24" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#ffff00">[ 05. PROJECTS &amp; TASKS ]</text>
    <text x="16" y="45" font-family="'Bricolage Grotesque', sans-serif" font-size="15" font-weight="800" fill="#ffffff">${t.m5Title}</text>
    <line x1="16" y1="55" x2="330" y2="55" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1" stroke-dasharray="2,2"/>
    <text x="16" y="76" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.m5Desc.split('.')[0]}.</text>
    <text x="16" y="96" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#a3a39b">${t.m5Desc.split('.')[1] || ''}</text>
    <text x="16" y="122" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="#ffff00">✓ Tableros Kanban · Sincronización iCal</text>
  </g>

  <!-- Box 6: Document Vault -->
  <g transform="translate(794, 368)">
    <rect width="346" height="136" rx="3" fill="#141412" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
    <text x="16" y="24" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#ffff00">[ 06. VAULT &amp; DOCS ]</text>
    <text x="16" y="45" font-family="'Bricolage Grotesque', sans-serif" font-size="15" font-weight="800" fill="#ffffff">${t.m6Title}</text>
    <line x1="16" y1="55" x2="330" y2="55" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1" stroke-dasharray="2,2"/>
    <text x="16" y="76" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">${t.m6Desc.split('.')[0]}.</text>
    <text x="16" y="96" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#a3a39b">${t.m6Desc.split('.')[1] || ''}</text>
    <text x="16" y="122" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" fill="#ffff00">✓ Cifrado S3 · Firma Digital · Versiones</text>
  </g>

  <!-- Bus line to Validation Gate -->
  <path d="M 230 504 L 230 524 M 600 504 L 600 524 M 970 504 L 970 524 M 230 524 L 970 524 M 600 524 L 600 540" fill="none" stroke="rgba(255, 255, 240, 0.3)" stroke-width="1.2" stroke-dasharray="3,3"/>
  <circle cx="600" cy="524" r="3.5" fill="#ffff00"/>

  <!-- ================= LEVEL 3: VALIDATION GATE ================= -->
  <g transform="translate(180, 540)">
    <rect width="840" height="42" rx="3" fill="#0b0b09" stroke="#ffff00" stroke-width="1.5"/>
    <rect x="0" y="0" width="8" height="42" fill="#ffff00"/>
    <text x="420" y="19" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" fill="#ffff00" letter-spacing="0.5">${t.gateLabel}</text>
    <text x="420" y="34" text-anchor="middle" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11" font-weight="500" fill="#d2d2cb">${t.gateRule}</text>
  </g>

  <line x1="600" y1="582" x2="600" y2="602" stroke="#ffff00" stroke-width="1.5"/>

  <!-- ================= LEVEL 4: SMART ASSISTANT & SECURITY ================= -->
  <g transform="translate(60, 602)">
    <rect width="1080" height="218" rx="3" fill="#141412" stroke="rgba(255, 255, 240, 0.28)" stroke-width="1"/>
    <rect x="0" y="0" width="4" height="218" fill="#ffff00"/>

    <!-- Header -->
    <text x="24" y="28" font-family="'Bricolage Grotesque', sans-serif" font-size="17" font-weight="800" fill="#ffffff">${t.aiTitle}</text>
    <text x="24" y="47" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" font-weight="400" fill="#a3a39b">${t.aiSub}</text>

    <!-- Stamp Badge -->
    <rect x="800" y="16" width="255" height="26" rx="2" fill="#ffff00"/>
    <text x="927" y="33" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="800" fill="#0b0b09">${t.aiBadge}</text>

    <line x1="24" y1="60" x2="1056" y2="60" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1"/>

    <!-- Two Internal Columns -->
    <g transform="translate(24, 75)">
      <text x="0" y="14" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="700" fill="#ffff00">[ ${t.aiCol1Title} ]</text>
      <text x="0" y="38" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#d2d2cb">${t.aiCol1p1}</text>
      <text x="0" y="60" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#d2d2cb">${t.aiCol1p2}</text>
      <text x="0" y="82" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#d2d2cb">${t.aiCol1p3}</text>
      <text x="0" y="112" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#ffffff">&gt; Confirmación expresa requerida en altas, bajas y modificaciones contractuales.</text>
    </g>

    <line x1="540" y1="72" x2="540" y2="198" stroke="rgba(255, 255, 240, 0.16)" stroke-width="1" stroke-dasharray="3,3"/>

    <g transform="translate(565, 75)">
      <text x="0" y="14" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="700" fill="#ffff00">[ ${t.aiCol2Title} ]</text>
      <text x="0" y="38" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#d2d2cb">${t.aiCol2p1}</text>
      <text x="0" y="60" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#d2d2cb">${t.aiCol2p2}</text>
      <text x="0" y="82" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#d2d2cb">${t.aiCol2p3}</text>
      <text x="0" y="112" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#ffff00">✓ PostgreSQL + Prisma · Docker · Zod · OpenAPI · Vitest &amp; Playwright</text>
    </g>
  </g>
</svg>
`;
}

// -------------------------------------------------------------
// 2. GENERATE PROJECT PREVIEW (preview-worksy.webp) (1200 x 750)
// Matching website "Presupuesto de taller" theme
// -------------------------------------------------------------

function generatePreviewSvg() {
  const w = 1200;
  const h = 750;

  return `
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
  <!-- Workshop Dark Background -->
  <rect width="${w}" height="${h}" fill="#0b0b09"/>

  <!-- Technical Corner Marks -->
  <g stroke="#ffff00" stroke-width="1.5" opacity="0.65">
    <path d="M 24 34 L 34 34 M 29 29 L 29 39"/>
    <path d="M 1166 34 L 1176 34 M 1171 29 L 1171 39"/>
    <path d="M 24 716 L 34 716 M 29 711 L 29 721"/>
    <path d="M 1166 716 L 1176 716 M 1171 711 L 1171 721"/>
  </g>

  <!-- Frame border -->
  <rect x="20" y="20" width="1160" height="710" fill="none" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1"/>

  <!-- Top Bar -->
  <g transform="translate(60, 42)">
    <text x="0" y="16" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="11" font-weight="700" fill="#ffff00" letter-spacing="1.5">// PLATAFORMA SAAS EMPRESARIAL · RECURSOS HUMANOS &amp; PRODUCTIVIDAD</text>
    <text x="0" y="46" font-family="'Bricolage Grotesque', system-ui, sans-serif" font-size="28" font-weight="900" fill="#ffffff" letter-spacing="-0.5">WORKSY <tspan fill="#ffff00">HR</tspan> <tspan font-size="17" fill="#a3a39b" font-weight="600">— ESPACIO DIGITAL UNIFICADO &amp; CONTROL EMPRESARIAL</tspan></text>

    <!-- Top Workshop Badges -->
    <rect x="850" y="20" width="130" height="26" rx="2" fill="#ffff00"/>
    <text x="915" y="37" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" fill="#0b0b09">MULTI-TENANT</text>

    <rect x="990" y="20" width="110" height="26" rx="2" fill="#141412" stroke="#ffff00" stroke-width="1"/>
    <text x="1045" y="37" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#ffff00">SMART IA</text>
  </g>

  <!-- Divider -->
  <line x1="60" y1="102" x2="1140" y2="102" stroke="rgba(255, 255, 240, 0.16)" stroke-width="1"/>

  <!-- LEFT COLUMN: GESTIÓN DE RR. HH. Y CONTROL HORARIO (w=525) -->
  <g transform="translate(60, 118)">
    <rect width="525" height="582" rx="3" fill="#141412" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
    <rect x="0" y="0" width="4" height="582" rx="1" fill="#ffff00"/>

    <!-- Header -->
    <text x="24" y="34" font-family="'Bricolage Grotesque', sans-serif" font-size="18" font-weight="800" fill="#ffffff">RECURSOS HUMANOS &amp; OPERACIONES</text>
    <text x="24" y="52" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#a3a39b">Directorio, Control Horario, Vacaciones &amp; Bóveda Laboral</text>
    <line x1="24" y1="64" x2="501" y2="64" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1"/>

    <!-- Two Metric Cards (workshop style) -->
    <g transform="translate(24, 76)">
      <rect width="226" height="80" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.18)" stroke-width="1"/>
      <text x="14" y="24" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="700" fill="#a3a39b">PLANTILLA ACTIVA</text>
      <text x="14" y="54" font-family="'Bricolage Grotesque', sans-serif" font-size="24" font-weight="800" fill="#ffffff">142 <tspan font-size="13" fill="#ffff00" font-weight="700">+8 altas</tspan></text>
      <text x="14" y="70" font-family="'JetBrains Mono', monospace" font-size="9" fill="#a3a39b">8 Depts · Organigrama RBAC</text>
    </g>

    <g transform="translate(275, 76)">
      <rect width="226" height="80" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.18)" stroke-width="1"/>
      <text x="14" y="24" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="700" fill="#a3a39b">CONTROL DE JORNADA</text>
      <text x="14" y="54" font-family="'Bricolage Grotesque', sans-serif" font-size="24" font-weight="800" fill="#ffff00">100% AUDITADO</text>
      <text x="14" y="70" font-family="'JetBrains Mono', monospace" font-size="9" fill="#a3a39b">Ley España · Trazabilidad Hash</text>
    </g>

    <!-- Operational leader rows (like Workshop invoice) -->
    <g transform="translate(24, 175)">
      <!-- Row 1 -->
      <g transform="translate(0, 0)">
        <rect width="477" height="42" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1"/>
        <text x="16" y="26" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12.5" font-weight="700" fill="#ffffff">Directorio &amp; Perfiles Laborales</text>
        <line x1="230" y1="26" x2="350" y2="26" stroke="rgba(255, 255, 240, 0.2)" stroke-dasharray="2,3"/>
        <text x="460" y="26" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="700" fill="#ffff00">Onboarding Activo</text>
      </g>

      <!-- Row 2 -->
      <g transform="translate(0, 50)">
        <rect width="477" height="42" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1"/>
        <text x="16" y="26" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12.5" font-weight="700" fill="#ffffff">Fichaje, Pausas &amp; Horas Extra</text>
        <line x1="225" y1="26" x2="340" y2="26" stroke="rgba(255, 255, 240, 0.2)" stroke-dasharray="2,3"/>
        <text x="460" y="26" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="700" fill="#ffff00">Sin Alteración</text>
      </g>

      <!-- Row 3 -->
      <g transform="translate(0, 100)">
        <rect width="477" height="42" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1"/>
        <text x="16" y="26" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12.5" font-weight="700" fill="#ffffff">Vacaciones, Bajas &amp; Permisos</text>
        <line x1="220" y1="26" x2="330" y2="26" stroke="rgba(255, 255, 240, 0.2)" stroke-dasharray="2,3"/>
        <text x="460" y="26" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="700" fill="#ffffff">Flujo Aprobación</text>
      </g>

      <!-- Row 4 -->
      <g transform="translate(0, 150)">
        <rect width="477" height="42" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1"/>
        <text x="16" y="26" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12.5" font-weight="700" fill="#ffffff">Bóveda Documental &amp; Contratos</text>
        <line x1="230" y1="26" x2="350" y2="26" stroke="rgba(255, 255, 240, 0.2)" stroke-dasharray="2,3"/>
        <text x="460" y="26" text-anchor="end" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="700" fill="#ffffff">Cifrado S3 / RGPD</text>
      </g>
    </g>

    <!-- Bottom Feature Box: Integrations & Compliance -->
    <g transform="translate(24, 395)">
      <rect width="477" height="162" rx="2" fill="#1c1c19" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
      <rect x="0" y="0" width="477" height="4" fill="#ffff00"/>
      <text x="18" y="26" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="800" fill="#ffff00">// CONFORMIDAD NORMATIVA &amp; SEGURIDAD MULTI-EMPRESA</text>
      <text x="18" y="52" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#d2d2cb">Registro diario de jornada con trazabilidad forense, gestión de nóminas,</text>
      <text x="18" y="70" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#d2d2cb">aislamiento multi-tenant estricto y exportación certificada para inspección.</text>

      <line x1="18" y1="88" x2="459" y2="88" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1" stroke-dasharray="2,2"/>

      <g transform="translate(18, 102)">
        <rect width="135" height="26" rx="2" fill="#0b0b09" stroke="#ffff00" stroke-width="1"/>
        <text x="67" y="17" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#ffff00">✓ Ley Jornada 100%</text>

        <rect x="150" y="0" width="165" height="26" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
        <text x="232" y="17" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#ffffff">✓ DocuSign &amp; Holded</text>

        <rect x="325" y="0" width="115" height="26" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
        <text x="382" y="17" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="700" fill="#ffffff">✓ RGPD / SAML</text>
      </g>
    </g>
  </g>

  <!-- RIGHT COLUMN: PRODUCTIVIDAD, HUBS & SMART IA (w=525) -->
  <g transform="translate(615, 118)">
    <rect width="525" height="582" rx="3" fill="#141412" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
    <rect x="0" y="0" width="4" height="582" rx="1" fill="#ffff00"/>

    <!-- Header -->
    <text x="24" y="34" font-family="'Bricolage Grotesque', sans-serif" font-size="18" font-weight="800" fill="#ffffff">PRODUCTIVIDAD, HUB &amp; SMART IA</text>
    <text x="24" y="52" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#a3a39b">WorkFlow Mail, Hub de Apps, Tableros &amp; Asistente IA</text>
    <line x1="24" y1="64" x2="501" y2="64" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1"/>

    <!-- 4 Modules 2x2 Grid -->
    <!-- M1: WorkFlow Mail -->
    <g transform="translate(24, 76)">
      <rect width="228" height="66" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.16)" stroke-width="1"/>
      <text x="12" y="20" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="700" fill="#ffff00">[ 01. WORKFLOW MAIL ]</text>
      <text x="12" y="38" font-family="'Bricolage Grotesque', sans-serif" font-size="13" font-weight="700" fill="#ffffff">Correo Unificado</text>
      <text x="12" y="54" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="10.5" fill="#a3a39b">Gmail, Outlook e IMAP a tareas</text>
    </g>

    <!-- M2: WorkFlow Hub -->
    <g transform="translate(273, 76)">
      <rect width="228" height="66" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.16)" stroke-width="1"/>
      <text x="12" y="20" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="700" fill="#ffff00">[ 02. WORKFLOW HUB ]</text>
      <text x="12" y="38" font-family="'Bricolage Grotesque', sans-serif" font-size="13" font-weight="700" fill="#ffffff">Centro de Apps</text>
      <text x="12" y="54" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="10.5" fill="#a3a39b">Slack, Drive, Teams &amp; Zoom</text>
    </g>

    <!-- M3: Projects & Tasks -->
    <g transform="translate(24, 150)">
      <rect width="228" height="66" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.16)" stroke-width="1"/>
      <text x="12" y="20" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="700" fill="#ffff00">[ 03. TAREAS &amp; KANBAN ]</text>
      <text x="12" y="38" font-family="'Bricolage Grotesque', sans-serif" font-size="13" font-weight="700" fill="#ffffff">Gestión por Equipos</text>
      <text x="12" y="54" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="10.5" fill="#a3a39b">Prioridades, avances y fechas</text>
    </g>

    <!-- M4: Calendar Sync -->
    <g transform="translate(273, 150)">
      <rect width="228" height="66" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.16)" stroke-width="1"/>
      <text x="12" y="20" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="700" fill="#ffff00">[ 04. CALENDARIO SYNC ]</text>
      <text x="12" y="38" font-family="'Bricolage Grotesque', sans-serif" font-size="13" font-weight="700" fill="#ffffff">Sincronización Total</text>
      <text x="12" y="54" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="10.5" fill="#a3a39b">Google, Outlook, CalDAV e iCal</text>
    </g>

    <!-- Smart Assistant IA Panel (workshop style terminal) -->
    <g transform="translate(24, 230)">
      <rect width="477" height="326" rx="2" fill="#1c1c19" stroke="#ffff00" stroke-width="1.2"/>
      
      <!-- Top stamp tag inside coach -->
      <rect x="0" y="0" width="477" height="30" fill="#ffff00"/>
      <text x="16" y="20" font-family="'JetBrains Mono', monospace" font-size="10.5" font-weight="800" fill="#0b0b09">WORKFLOW SMART ASSISTANT // IA EMPRESARIAL ASISTIDA</text>

      <!-- Simulated terminal dialog -->
      <g transform="translate(16, 44)">
        <text x="0" y="16" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#ffff00">&gt; CONSULTA DE EMPLEADO:</text>
        <text x="0" y="34" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="12" fill="#ffffff">"¿Cuántas vacaciones me quedan y quién cubre mi guardia del jueves?"</text>

        <line x1="0" y1="48" x2="445" y2="48" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1" stroke-dasharray="2,2"/>

        <text x="0" y="68" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#ffffff">&gt; RESPUESTA VALIDADA POR MÓDULO RR. HH.:</text>
        <text x="0" y="88" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">• Saldo disponible: 14 días laborables de vacaciones acumulados.</text>
        <text x="0" y="106" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">• Guardia jueves 14: Cubierta por Laura Martínez (Dep. Técnico).</text>
        <text x="0" y="124" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">• Solicitud de permiso generada: Pendiente de confirmación por tu parte.</text>

        <line x1="0" y1="140" x2="445" y2="140" stroke="rgba(255, 255, 240, 0.12)" stroke-width="1" stroke-dasharray="2,2"/>

        <text x="0" y="160" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="700" fill="#ffff00">&gt; AUTOMATIZACIÓN ACTIVADA:</text>
        <text x="0" y="180" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="11.5" fill="#d2d2cb">Notificación enviada a responsable de equipo y sync en Google Calendar.</text>
      </g>

      <!-- Security guarantee banner -->
      <g transform="translate(16, 256)">
        <rect width="445" height="54" rx="2" fill="#0b0b09" stroke="rgba(255, 255, 240, 0.2)" stroke-width="1"/>
        <text x="222" y="20" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="800" fill="#ffff00">🔒 BARRERA DE AUTORIZACIÓN ESTRICTA (RBAC)</text>
        <text x="222" y="38" text-anchor="middle" font-family="'Atkinson Hyperlegible Next', sans-serif" font-size="10.5" fill="#a3a39b">Ninguna acción laboral sensible se ejecuta sin confirmación explícita del usuario.</text>
      </g>
    </g>
  </g>
</svg>
`;
}

async function run() {
  console.log('Generating Worksy workshop-themed images...');

  // 1. Schema in Spanish
  const schemaEsSvg = generateSchemaSvg('es');
  const schemaEsBuf = Buffer.from(schemaEsSvg);
  await sharp(schemaEsBuf).webp({ quality: 92 }).toFile('public/img/worksy-architecture-esquema.webp');
  await sharp(schemaEsBuf).webp({ quality: 92 }).toFile('img/worksy-architecture-esquema.webp');

  // 2. Schema in English
  const schemaEnSvg = generateSchemaSvg('en');
  const schemaEnBuf = Buffer.from(schemaEnSvg);
  await sharp(schemaEnBuf).webp({ quality: 92 }).toFile('public/img/worksy-architecture-scheme-en.webp');
  await sharp(schemaEnBuf).webp({ quality: 92 }).toFile('img/worksy-architecture-scheme-en.webp');

  // 3. Project preview (cover)
  const prevSvg = generatePreviewSvg();
  const prevBuf = Buffer.from(prevSvg);
  await sharp(prevBuf).webp({ quality: 92 }).toFile('public/img/preview-worksy.webp');
  await sharp(prevBuf).webp({ quality: 92 }).toFile('img/preview-worksy.webp');

  console.log('All Worksy workshop-themed images generated successfully!');
}

run().catch(console.error);
