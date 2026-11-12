export interface CaseStudy {
  id: string;
  slug: string;
  problem: string;
  solution: string;
  result: string;
  technologies: string[];
  service_id: string;
  year: number;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'pizzeria-xativa',
    slug: 'pizzeria-xativa',
    problem: 'Pizzería local sin presencia online. Clientes no podían ver la carta, hacer reservas ni pedir online. Dependía de intermediarios (Uber, Just Eat) con comisiones altas.',
    solution: 'Desarrollé una web con carta digital interactiva, sistema de reservas integrado y pasarela de pago para pedidos online. Migración desde intermediarios a contacto directo por WhatsApp.',
    result: '40% más consultas/mes. Reducción de comisiones por intermediarios en un 80%. Mejor control de datos y preferencias de clientes.',
    technologies: ['Astro', 'React', 'Stripe', 'Tailwind', 'TypeScript'],
    service_id: 'digitalitzacio-local',
    year: 2025
  },
  {
    id: 'forma-espacio',
    slug: 'forma-espacio',
    problem: 'Estudio de diseño interior con presencia débil. Portfolio desorganizado, sin contacto directo, perdiendo oportunidades de clientes.',
    solution: 'Landing page profesional con portfolio visual, formulario de contacto optimizado, SEO local para búsquedas en Valencia, integración con redes sociales.',
    result: '25% aumento en contactos cualificados. Mejor posicionamiento en búsquedas locales. Portfolio profesional que genera confianza.',
    technologies: ['Astro', 'Tailwind', 'Netlify', 'SEO'],
    service_id: 'landing-page',
    year: 2024
  },
  {
    id: 'avisa',
    slug: 'avisa',
    problem: 'Aplicación interna de gestión de avisos requería arquitectura moderna, tipado seguro y mantenibilidad. Desarrollo previo con código frágil.',
    solution: 'Refactorización completa con Angular, Signals, TypeScript estricto, RxJS para estado reactivo, pruebas con Vitest, pipeline CI/CD automatizado.',
    result: 'Reducción del 60% en bugs de producción. Despliegues automáticos sin downtime. Código mantenible y escalable para el equipo.',
    technologies: ['Angular', 'TypeScript', 'RxJS', 'Signals', 'Vitest', 'GitHub Actions'],
    service_id: 'angular-webapp',
    year: 2024
  },
  {
    id: 'trania',
    slug: 'trania',
    problem: 'Web existente lenta (Lighthouse 45/100), mal posicionamiento en Google, experiencia de usuario deficiente en móvil.',
    solution: 'Auditoría completa de rendimiento. Eliminación de 80% del JavaScript innecesario. Optimización de imágenes a WebP/AVIF. Corrección de accesibilidad WCAG AA.',
    result: 'Lighthouse mejorado a 95/100. LCP reducido de 4.2s a 1.1s. Tráfico orgánico aumentó 35% en 3 meses.',
    technologies: ['Core Web Vitals', 'WebP', 'AVIF', 'WCAG', 'Lighthouse'],
    service_id: 'performance-audit',
    year: 2025
  }
];
