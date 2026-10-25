import type { ServicePackage } from "./services";

type ServiceCopy = Pick<
  ServicePackage,
  | "name"
  | "badge"
  | "tagline"
  | "description"
  | "targetAudience"
  | "timeline"
  | "creationPrice"
  | "annualTotal"
  | "dailyCostEquivalent"
  | "amortizationSummary"
  | "ctaText"
  | "features"
  | "amortizationPoints"
  | "marketComparison"
  | "whyThisPrice"
>;

const creationBreakdown = [
  "Análisis de requisitos y alcance del proyecto.",
  "Diseño e implementación de la solución acordada con las tecnologías indicadas.",
  "Revisión de calidad, rendimiento y accesibilidad incluida en el alcance.",
  "Entrega del código y documentación del trabajo realizado.",
];

const monthlyBreakdown = [
  "Mantenimiento técnico continuado durante el periodo contratado.",
  "Seguimiento de incidencias y aplicación de actualizaciones incluidas.",
  "Asesoramiento para mantener y evolucionar la solución.",
];

const commitmentExplanation =
  "El mantenimiento mensual requiere una permanencia mínima de un año, tal como se indica en la oferta. Este periodo permite dar continuidad al seguimiento técnico acordado.";

const marketComparisonDigital = [
  {
    name: "Pack de digitalización local (web y redes)",
    priceRange: "290 € de entrada + 49 €/mes",
    speedLighthouse: "100/100 (carga instantánea < 0,5 s)",
    maintenanceCost: "49 €/mes (web, cambios de carta y redes incluidos)",
    hiddenCosts: "0 € de comisiones por pedidos",
    codeOwnership: "Todo es tuyo: web, carta y perfiles sociales",
    summary: "La propuesta principal: presencia cuidada en Google Maps, redes activas y carta móvil sin comisiones.",
  },
  {
    name: "Plataformas de reparto de terceros (Glovo, Uber, JustEat)",
    priceRange: "Comisiones del 25 % al 35 % por pedido",
    speedLighthouse: "Depende de su aplicación",
    maintenanceCost: "Cientos o miles de euros al mes en comisiones",
    hiddenCosts: "Los clientes son suyos, no tuyos; si se van, pierdes la base de datos",
    codeOwnership: "Ninguna: dependencia total de la plataforma",
    summary: "Muy caro a medio plazo; se lleva gran parte del margen de cada plato.",
  },
  {
    name: "Menú en PDF enlazado mediante un código QR gratuito",
    priceRange: "0 € en apariencia",
    speedLighthouse: "Deficiente (archivos lentos de 5 a 15 MB)",
    maintenanceCost: "Sin mantenimiento: precios desactualizados y enlaces rotos",
    hiddenCosts: "Pérdida constante de clientes que no consiguen abrir el archivo",
    codeOwnership: "Un simple archivo PDF",
    summary: "Perjudica las ventas del local: es lento, se lee mal en el móvil y no posiciona en Google.",
  },
  {
    name: "Agencia tradicional de redes sociales",
    priceRange: "De 300 € a 600 €/mes solo por gestionar las redes",
    speedLighthouse: "No incluye desarrollo web ni carta digital",
    maintenanceCost: "Cuotas mensuales inaccesibles para un bar de barrio",
    hiddenCosts: "Facturación aparte por cualquier cambio en la carta",
    codeOwnership: "Variable",
    summary: "Presupuestos pensados para grandes marcas, inviables para un negocio local.",
  },
];

const marketComparisonLanding = [
  {
    name: "Nuestra solución (Astro e ingeniería frontend)",
    priceRange: "390 € de entrada + 30 €/mes",
    speedLighthouse: "100/100 (carga instantánea < 0,6 s)",
    maintenanceCost: "30 €/mes (todo incluido, sin licencias adicionales)",
    hiddenCosts: "0 € en licencias o plugins de pago",
    codeOwnership: "Código limpio propiedad al 100 % del cliente",
    summary: "La mejor relación calidad-precio: máxima conversión, sin software innecesario y mantenimiento proactivo.",
  },
  {
    name: "Agencia tradicional de WordPress",
    priceRange: "De 1.200 € a 2.800 € iniciales",
    speedLighthouse: "35-65/100 (más de 3-5 MB de recursos)",
    maintenanceCost: "De 60 € a 120 €/mes o tarifas por hora elevadas",
    hiddenCosts: "Licencias anuales obligatorias (Elementor, WP Rocket, ACF, etc.)",
    codeOwnership: "Vinculado a plugins obsoletos y una base de datos pesada",
    summary: "Costes iniciales y mensuales elevados; la lentitud recurrente perjudica el SEO en Google.",
  },
  {
    name: "Plataformas DIY (Wix, Squarespace)",
    priceRange: "De 20 € a 45 €/mes de forma indefinida",
    speedLighthouse: "40-60/100 (código genérico sobrecargado)",
    maintenanceCost: "Incluido en la cuota, con soporte genérico y tickets lentos",
    hiddenCosts: "Cuotas recurrentes para añadir formularios, dominios o funciones básicas",
    codeOwnership: "Sin propiedad: si dejas de pagar, pierdes toda la web",
    summary: "Parece fácil, pero ofrece bajo rendimiento en móviles, limita el diseño y genera dependencia.",
  },
  {
    name: "Freelancers de bajo coste sin mantenimiento",
    priceRange: "De 200 € a 400 € en un pago único",
    speedLighthouse: "Variable (suelen usar plantillas pirateadas o descargadas)",
    maintenanceCost: "Sin mantenimiento: abandono tras la entrega",
    hiddenCosts: "Tener que contratar a otro profesional cuando la web se rompe",
    codeOwnership: "Código sin estructura ni documentación",
    summary: "Riesgo alto: sin garantías de continuidad, seguridad ni cumplimiento legal de accesibilidad.",
  },
];

const marketComparisonAngular = [
  {
    name: "Nuestro servicio Angular Expert",
    priceRange: "1.950 € de entrada + 95 €/mes",
    speedLighthouse: "95-100/100 (60 FPS estables)",
    maintenanceCost: "95 €/mes (supervisión y evolución técnica)",
    hiddenCosts: "0 € en costes no declarados",
    codeOwnership: "Código 100 % tuyo en tu repositorio Git",
    summary: "Ingeniería rigurosa, tipada y modular con soporte técnico experto continuado.",
  },
  {
    name: "Agencias de desarrollo a medida",
    priceRange: "De 6.000 € a 15.000 € iniciales",
    speedLighthouse: "70-85/100",
    maintenanceCost: "De 300 € a 600 €/mes de cuota mínima de mantenimiento",
    hiddenCosts: "Facturación adicional por cualquier ajuste, por pequeño que sea",
    codeOwnership: "A menudo retienen el código o imponen contratos cerrados",
    summary: "Presupuestos desorbitados, equipos sobredimensionados y procesos lentos.",
  },
  {
    name: "Herramientas No-Code complejas (Bubble, Retool de pago)",
    priceRange: "De 100 € a 400 €/mes de suscripción",
    speedLighthouse: "40-60/100 (tiempos de carga elevados)",
    maintenanceCost: "Cuotas crecientes según usuarios o llamadas a la base de datos",
    hiddenCosts: "Tarifas de uso que se disparan al escalar",
    codeOwnership: "Sin propiedad: no puedes exportar el código ni cambiar de servidor",
    summary: "Rápidas de iniciar, pero prohibitivas al crecer y con un rendimiento deficiente.",
  },
  {
    name: "Desarrollador interno a jornada completa",
    priceRange: "De 35.000 € a 48.000 €/año, más costes laborales",
    speedLighthouse: "Depende de la experiencia individual",
    maintenanceCost: "Salario, Seguridad Social y vacaciones",
    hiddenCosts: "Tiempo y coste de selección, contratación e incorporación",
    codeOwnership: "Propiedad de la empresa",
    summary: "Inviable para pymes o proyectos concretos que no requieren dedicación exclusiva diaria.",
  },
];

const marketComparisonAudit = [
  {
    name: "Nuestro servicio de auditoría y corrección de rendimiento",
    priceRange: "450 € de entrada + 39 €/mes",
    speedLighthouse: "Garantía de 95-100/100",
    maintenanceCost: "39 €/mes (monitorización y ajustes continuos)",
    hiddenCosts: "Sin costes ocultos",
    codeOwnership: "Mejoras integradas directamente en tu repositorio",
    summary: "No solo entregamos un PDF con problemas: también aplicamos las correcciones al código.",
  },
  {
    name: "Auditorías tradicionales de agencias SEO",
    priceRange: "De 600 € a 1.500 €",
    speedLighthouse: "No corrigen nada (solo entregan un informe)",
    maintenanceCost: "Sin mantenimiento incluido",
    hiddenCosts: "Hay que contratar aparte a un desarrollador para aplicar las recomendaciones",
    codeOwnership: "No modifican el código",
    summary: "Informes automatizados de 40 páginas que acaban archivados porque nadie sabe implementarlos.",
  },
  {
    name: "Plugins mágicos de optimización (por ejemplo, de WordPress)",
    priceRange: "De 50 € a 150 €/año por la licencia",
    speedLighthouse: "A menudo rompen la web o falsean las pruebas de laboratorio",
    maintenanceCost: "Licencia recurrente sin soporte especializado",
    hiddenCosts: "Horas perdidas al intentar configurar compatibilidades",
    codeOwnership: "Código ofuscado",
    summary: "Un parche superficial que no suele corregir una estructura de código deficiente.",
  },
  {
    name: "No optimizar (no hacer nada)",
    priceRange: "0 € de coste inicial aparente",
    speedLighthouse: "Deficiente (30-55/100)",
    maintenanceCost: "Pérdida constante de ventas y tráfico",
    hiddenCosts: "Posibles sanciones de la EAA y pérdida de posicionamiento",
    codeOwnership: "No aplicable",
    summary: "La decisión más cara a largo plazo: perder clientes cada día por la lentitud.",
  },
];

const marketComparisonCicd = [
  {
    name: "Nuestro servicio especializado de CI/CD",
    priceRange: "350 € de entrada + 35 €/mes",
    speedLighthouse: "Auditoría automática integrada en el flujo",
    maintenanceCost: "35 €/mes (supervisión proactiva de los pipelines)",
    hiddenCosts: "0 € en gastos imprevistos",
    codeOwnership: "Flujos de trabajo abiertos en tu repositorio",
    summary: "Infraestructura como código fiable, segura y adaptada a tus necesidades.",
  },
  {
    name: "Consultoras externas sénior de DevOps",
    priceRange: "De 1.500 € a 3.500 € de tarifa inicial",
    speedLighthouse: "A menudo descuidan la parte frontend",
    maintenanceCost: "Tarifas por hora desde 75 € hasta 120 €",
    hiddenCosts: "Mínimos mensuales elevados de horas contratadas",
    codeOwnership: "Propiedad compartida",
    summary: "Muy costosas para equipos pequeños que solo necesitan pipelines fiables y limpios.",
  },
  {
    name: "Despliegues manuales tradicionales (FTP/SSH)",
    priceRange: "0 € en apariencia",
    speedLighthouse: "Sin garantías ni control de versiones",
    maintenanceCost: "Cientos de euros en horas de trabajo perdidas",
    hiddenCosts: "Errores graves por sobrescribir archivos accidentalmente",
    codeOwnership: "Caótico",
    summary: "El método más lento, inseguro y propenso a interrupciones no planificadas.",
  },
  {
    name: "Plataformas corporativas cerradas",
    priceRange: "Suscripciones desde 80 € hasta 200 €/mes",
    speedLighthouse: "Variable",
    maintenanceCost: "A cargo del proveedor",
    hiddenCosts: "Cobro por minutos adicionales de compilación",
    codeOwnership: "Dependencia de la infraestructura propietaria del proveedor",
    summary: "Facturación recurrente elevada y limitaciones de configuración personalizada.",
  },
];

export const servicesCopyEs: Record<string, ServiceCopy> = {
  "digitalitzacio-local": {
    name: "Digitalización local y carta web (bares y comercios)",
    badge: "Propuesta destacada · Más recomendada",
    tagline: "La solución para pequeños bares, pizzerías, cafeterías y comercios locales que quieren atraer clientes desde Google Maps y las redes sociales.",
    description: "Inspirada en el caso de la pizzería de Xàtiva: sustituye los PDF pesados por una carta interactiva en HTML, optimiza la ficha de Google Maps y permite crear o gestionar perfiles sociales para dar visibilidad al negocio sin comisiones de terceros.",
    targetAudience: "Pequeños bares, pizzerías, restaurantes familiares, cafeterías, panaderías, comercios de barrio y autónomos con una presencia digital escasa o desactualizada.",
    timeline: "De 3 a 5 días laborables",
    creationPrice: "Desde 290 €",
    annualTotal: "878 € el primer año (creación de la carta web + gestión de redes + 12 meses de mantenimiento)",
    dailyCostEquivalent: "~2,40 €/día durante el primer año (menos que un café y una pasta)",
    amortizationSummary: "Se amortiza con solo 3 o 4 cenas o pedidos de pizza al mes.",
    ctaText: "Solicitar pack de negocio local (290 €)",
    features: [
      "Landing page y carta interactiva en HTML (carga < 0,5 s, 100/100 en Lighthouse)",
      "Sustitución de PDF pesados por una carta clara, adaptada a móviles y con información de alérgenos",
      "Reservas y pedidos directos por WhatsApp sin comisiones",
      "Creación y optimización de la ficha de Google Maps (Google Business Profile)",
      "Creación o gestión continua de redes sociales (Instagram y Facebook)",
      "Actualización periódica de precios, platos de temporada y menús",
      "Código QR vectorial listo para imprimir en mesas y escaparates",
      "Mantenimiento técnico activo todo el año (obligatorio · permanencia mínima de un año)",
    ],
    amortizationPoints: [
      { title: "Recuperación con pedidos adicionales", metric: "3 a 4 pedidos al mes", description: "El margen de varios pedidos o reservas adicionales puede ayudar a cubrir la cuota mensual; el resultado depende de cada negocio." },
      { title: "Presencia en búsquedas locales", metric: "Google Maps y búsquedas de proximidad", description: "Una ficha actualizada con horarios y contacto facilita que las personas encuentren el negocio desde el móvil." },
      { title: "Carta web accesible desde el móvil", metric: "Sin descargar un PDF pesado", description: "Una carta en HTML se consulta desde el navegador y puede mostrar información sobre productos y alérgenos." },
      { title: "Gestión de la presencia digital", metric: "Web y perfiles sociales", description: "La actualización de perfiles y publicaciones ayuda a mantener al día la información del negocio." },
    ],
    whyThisPrice: { creationBreakdown: ["Digitalización de la carta, los precios, las bebidas y los alérgenos en HTML.", "Desarrollo web a medida basado en el caso de la pizzería de Xàtiva.", "Creación de un código QR vectorial preparado para imprimir.", "Creación u optimización de la ficha de Google Business Profile.", "Creación o puesta a punto de perfiles de Instagram y Facebook.", "Configuración de un canal directo de reservas o pedidos por WhatsApp."], monthlyBreakdown: ["Alojamiento web con certificado SSL y dominio según las condiciones del servicio.", "Actualización periódica de precios, platos de temporada y menús.", "Acompañamiento para publicar imágenes y novedades en redes sociales.", "Revisión de reseñas y actualización de horarios festivos.", "Soporte técnico prioritario por WhatsApp para cambios."], whyCommitmentOneYear: "El precio inicial de 290 € se ofrece dentro de una relación anual. La carta y las redes pueden necesitar actualizaciones durante las distintas temporadas para mantenerse al día." },
    marketComparison: marketComparisonDigital,
  },
  "landing-page": {
    name: "Landing page de alto rendimiento",
    badge: "Precio reducido · Máxima conversión",
    tagline: "Web corporativa muy rápida, diseñada para captar clientes desde el primer día y posicionarse en Google.",
    description: "Webs corporativas y páginas de lanzamiento rápidas, optimizadas para convertir visitas en contactos y mejorar la presencia en Google Maps y las búsquedas locales.",
    targetAudience: "Autónomos, pymes, clínicas, despachos y startups que buscan autoridad y captar clientes de forma eficaz.",
    timeline: "De 1 a 2 semanas",
    creationPrice: "Desde 390 €",
    annualTotal: "750 € el primer año (creación + 12 meses de mantenimiento)",
    dailyCostEquivalent: "~2,05 €/día durante el primer año",
    amortizationSummary: "La mayoría de los clientes amortizan la inversión con solo captar 1 o 2 clientes nuevos durante el primer trimestre.",
    ctaText: "Solicitar landing page (390 €)",
    features: [
      "Desarrollo estático con Astro y Tailwind CSS v4",
      "Objetivo de 100/100 en Lighthouse (rendimiento, SEO y buenas prácticas)",
      "Accesibilidad universal conforme a WCAG 2.2 AA",
      "SEO técnico y metadatos Open Graph para redes sociales",
      "Formulario de contacto accesible con protección antispam sin CAPTCHA",
      "Mantenimiento técnico activo incluido (obligatorio · permanencia mínima de un año)",
      "Monitorización de disponibilidad, copias de seguridad y actualizaciones de seguridad",
    ],
    amortizationPoints: [
      { title: "Captación de nuevos clientes", metric: "Depende de cada negocio", description: "Los contactos que lleguen a través de la web pueden contribuir a recuperar la inversión, según el valor y la conversión de cada oportunidad." },
      { title: "Rendimiento y experiencia de uso", metric: "Objetivos definidos para el proyecto", description: "Una página rápida puede facilitar la navegación; los resultados dependen del contenido, el dispositivo y la conexión." },
      { title: "Costes de licencias y alojamiento", metric: "Revisar el coste anual total", description: "Una arquitectura estática puede reducir la dependencia de complementos, según las necesidades y los servicios externos elegidos." },
      { title: "Continuidad técnica", metric: "Mantenimiento contratado", description: "El seguimiento técnico permite atender actualizaciones e incidencias conforme al plan acordado." },
    ],
    whyThisPrice: { creationBreakdown, monthlyBreakdown, whyCommitmentOneYear: commitmentExplanation },
    marketComparison: marketComparisonLanding,
  },
  "angular-webapp": {
    name: "Aplicación web SPA con Angular",
    badge: "Aplicaciones reactivas y SaaS",
    tagline: "Plataforma web avanzada, interactiva y escalable para productos SaaS, portales y gestión operativa.",
    description: "Aplicaciones web reactivas construidas con estándares actuales de Angular, Signals, componentes standalone y arquitectura modular.",
    targetAudience: "Empresas tecnológicas, pymes en digitalización y equipos de producto que necesitan paneles, plataformas SaaS o herramientas de gestión.",
    timeline: "De 3 a 6 semanas",
    creationPrice: "Desde 1.950 €",
    annualTotal: "3.090 € el primer año (arquitectura completa + 12 meses de mantenimiento)",
    dailyCostEquivalent: "~8,46 €/día durante el primer año",
    amortizationSummary: "Ahorra horas de trabajo manual y evita refactorizaciones prematuras.",
    ctaText: "Solicitar aplicación web (1.950 €)",
    features: [
      "Arquitectura modular moderna con componentes standalone y Signals",
      "Tipado estricto de extremo a extremo con TypeScript, sin any",
      "Gestión de estado reactiva con RxJS y Signals",
      "Integración con API REST, WebSockets o plataformas backend",
      "Pruebas de regresión con Vitest",
      "Mantenimiento técnico continuo incluido (obligatorio · permanencia mínima de un año)",
      "Seguimiento del rendimiento y actualizaciones del framework",
    ],
    amortizationPoints: [
      { title: "Automatización de tareas", metric: "Ahorro sujeto al uso", description: "Una interfaz adaptada a los procesos del equipo puede reducir tareas manuales y cambios entre herramientas." },
      { title: "Arquitectura modular", metric: "Preparada para evolucionar", description: "TypeScript y los componentes standalone ayudan a mantener una estructura organizada a medida que crece la aplicación." },
      { title: "Interacción fluida", metric: "Rendimiento validado en el alcance", description: "La gestión reactiva del estado permite diseñar interfaces que respondan a las acciones del usuario." },
      { title: "Alternativa a la contratación interna", metric: "Presupuesto por proyecto", description: "El desarrollo a medida tiene un alcance y coste acordados; no sustituye automáticamente las funciones de un equipo interno." },
    ],
    whyThisPrice: { creationBreakdown: ["Diseño de la arquitectura de estado y flujos de datos con Angular Signals y RxJS.", "Desarrollo de componentes standalone modulares y reutilizables.", "Tipado estricto de extremo a extremo con TypeScript.", "Integración de API REST o WebSockets con gestión de errores.", "Formularios reactivos con validaciones y mensajes de estado.", "Pruebas unitarias con Vitest para reducir regresiones."], monthlyBreakdown: ["Actualizaciones de Angular y bibliotecas relacionadas.", "Seguimiento de errores de ejecución y telemetría según el proyecto.", "Revisión periódica del rendimiento y el tamaño de los paquetes.", "Atención prioritaria de incidencias y asesoramiento de arquitectura.", "Copias de seguridad y mantenimiento del pipeline de despliegue."], whyCommitmentOneYear: "Las aplicaciones complejas requieren acompañamiento técnico durante su despliegue y adopción para mantener la estabilidad al incorporar nuevas funciones." },
    marketComparison: marketComparisonAngular,
  },
  "performance-audit": {
    name: "Optimización y accesibilidad (auditoría y corrección)",
    badge: "Auditoría y corrección integral",
    tagline: "Solución de problemas de lentitud, Core Web Vitals y accesibilidad WCAG.",
    description: "Análisis de código y recursos para localizar cuellos de botella, reducir JavaScript innecesario y mejorar el cumplimiento de los requisitos de accesibilidad.",
    targetAudience: "Sitios web en producción con pérdida de tráfico orgánico, avisos de Google Search Console o requisitos de accesibilidad WCAG 2.2.",
    timeline: "De 3 a 7 días laborables",
    creationPrice: "Desde 450 €",
    annualTotal: "918 € el primer año (auditoría + mejoras + 12 meses de seguimiento)",
    dailyCostEquivalent: "~2,51 €/día durante el primer año",
    amortizationSummary: "Mejorar la experiencia puede recuperar tráfico y reducir el riesgo de incumplimientos de accesibilidad.",
    ctaText: "Auditar mi sitio (450 €)",
    features: [
      "Auditoría de Core Web Vitals (LCP, CLS, INP) con DevTools",
      "Inspección de accesibilidad con axe-core y lectores de pantalla",
      "Eliminación de JavaScript innecesario y optimización de recursos críticos",
      "Corrección del contraste, el foco visible y la semántica HTML",
      "Informe comparativo con métricas verificables antes y después",
      "Seguimiento mensual de métricas y accesibilidad (mantenimiento mínimo de un año)",
    ],
    amortizationPoints: [
      { title: "Visibilidad en buscadores", metric: "Depende de la web y su competencia", description: "Mejorar Core Web Vitals puede contribuir a la experiencia, pero no garantiza cambios de posicionamiento." },
      { title: "Accesibilidad", metric: "Revisión WCAG incluida en el alcance", description: "La auditoría identifica barreras y permite priorizar correcciones; el cumplimiento depende de la implementación y el contenido final." },
      { title: "Eficiencia de las campañas", metric: "Medición según los objetivos", description: "La velocidad de una página es uno de varios factores que influyen en el rendimiento de las campañas." },
      { title: "Experiencia móvil", metric: "Menos fricción de uso", description: "Reducir tiempos y resolver problemas de interacción puede mejorar la experiencia, sin garantizar una tasa de conversión concreta." },
    ],
    whyThisPrice: { creationBreakdown: ["Análisis de rendimiento en dispositivos reales de distintas capacidades.", "Inspección de accesibilidad con axe-core, teclado y lectores de pantalla.", "Revisión de JavaScript y división de código cuando proceda.", "Optimización de fuentes, carga diferida e imágenes AVIF o WebP.", "Corrección de contraste, atributos ARIA, regiones y foco visible.", "Informe técnico comparativo con resultados observados."], monthlyBreakdown: ["Seguimiento de métricas de campo disponibles (CrUX).", "Avisos de regresiones de rendimiento tras cambios de contenido.", "Revisión periódica de accesibilidad de los nuevos contenidos.", "Ajustes relacionados con cambios de Core Web Vitals."], whyCommitmentOneYear: "El rendimiento puede cambiar al añadir contenido, scripts o píxeles de marketing. El seguimiento permite comprobar la evolución durante el periodo contratado." },
    marketComparison: marketComparisonAudit,
  },
  "cicd-devops": {
    name: "Pipelines CI/CD y automatización",
    badge: "Fiabilidad y despliegue continuo",
    tagline: "Automatización del ciclo de entrega de código con controles de calidad y despliegues fiables.",
    description: "Automatización de validaciones, pruebas y publicaciones para reducir errores manuales y detectar regresiones antes de desplegar.",
    targetAudience: "Equipos de desarrollo, agencias y pymes que quieren publicar cambios con un proceso repetible y seguro.",
    timeline: "De 2 a 5 días laborables",
    creationPrice: "Desde 350 €",
    annualTotal: "770 € el primer año (pipeline configurado + 12 meses de mantenimiento)",
    dailyCostEquivalent: "~2,10 €/día durante el primer año",
    amortizationSummary: "Reduce el tiempo dedicado a publicaciones manuales y a resolver errores de despliegue.",
    ctaText: "Automatizar mi flujo (350 €)",
    features: [
      "Pipelines paralelos automatizados con GitHub Actions",
      "Ejecución automática de linters, comprobaciones de TypeScript y pruebas",
      "Auditoría de Lighthouse CI que detiene la compilación si empeoran las métricas",
      "Despliegues continuos con vistas previas en cada pull request",
      "Gestión automatizada de dependencias con Dependabot",
      "Supervisión continua de pipelines y runners (mantenimiento mínimo de un año)",
    ],
    amortizationPoints: [
      { title: "Menos trabajo manual en publicaciones", metric: "Ahorro según la frecuencia de despliegue", description: "La automatización reduce pasos manuales; el tiempo ahorrado depende del proceso y de la frecuencia de publicación." },
      { title: "Continuidad del servicio", metric: "Despliegue condicionado a validaciones", description: "Un pipeline puede conservar la versión activa si falla una comprobación, según el proveedor y la configuración." },
      { title: "Detección temprana de errores", metric: "Validaciones automáticas", description: "Las pruebas y comprobaciones se ejecutan antes de publicar para detectar ciertos problemas con antelación." },
      { title: "Previsualización de cambios", metric: "Revisión antes de publicar", description: "Las vistas previas permiten revisar cambios antes de integrarlos, cuando la plataforma las ofrece." },
    ],
    whyThisPrice: { creationBreakdown: ["Configuración de workflows con GitHub Actions o GitLab CI.", "Paralelización de tareas para reducir tiempos de ejecución.", "Linters, comprobaciones de tipos y pruebas automatizadas.", "Integración de Lighthouse CI si encaja con el proyecto.", "Configuración segura de secretos y claves de API.", "Documentación de colaboración para el equipo."], monthlyBreakdown: ["Seguimiento de runners y flujos de ejecución.", "Revisión de dependencias vulnerables mediante Dependabot o Renovate.", "Resolución de fallos del proceso de compilación y dependencias.", "Ajuste de la caché para optimizar la duración de las compilaciones."], whyCommitmentOneYear: "Las bibliotecas, las versiones de Node.js y las acciones de GitHub evolucionan. El mantenimiento ayuda a mantener el pipeline compatible." },
    marketComparison: marketComparisonCicd,
  },
};
