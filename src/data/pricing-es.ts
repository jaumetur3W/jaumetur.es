export interface PricingTier {
  service_id: string;
  initial_cost: number;
  initial_label_es: string;
  monthly_cost: number;
  monthly_label_es: string;
  includes_es: string[];
  min_duration_months: number;
}

export const pricingTiers: PricingTier[] = [
  // WEB tier
  {
    service_id: 'digitalitzacio-local',
    initial_cost: 290,
    initial_label_es: 'Creación',
    monthly_cost: 49,
    monthly_label_es: 'Mantenimiento',
    includes_es: [
      'Diseño adaptado a móvil',
      'Desarrollo en Astro/React',
      'Hosting primer año',
      'Dominio (.es)',
      'SSL/HTTPS',
      'Actualización de precios y menú',
      'Código QR para imprimir',
      'Optimización Google Maps',
      'Actualizaciones de seguridad'
    ],
    min_duration_months: 12
  },
  {
    service_id: 'landing-page',
    initial_cost: 390,
    initial_label_es: 'Creación',
    monthly_cost: 30,
    monthly_label_es: 'Mantenimiento',
    includes_es: [
      'Desarrollo estático con Astro y Tailwind CSS v4',
      'Objetivo de 100/100 en Lighthouse',
      'Accesibilidad universal WCAG 2.2 AA',
      'SEO técnico y metadatos Open Graph',
      'Formulario de contacto accesible',
      'Hosting con certificado SSL',
      'Copias de seguridad automáticas',
      'Actualizaciones de seguridad mensuales',
      'Monitorización de disponibilidad'
    ],
    min_duration_months: 12
  },
  // APP tier
  {
    service_id: 'angular-webapp',
    initial_cost: 1950,
    initial_label_es: 'Creación',
    monthly_cost: 95,
    monthly_label_es: 'Mantenimiento',
    includes_es: [
      'Arquitectura modular con componentes standalone',
      'Tipado estricto TypeScript extremo a extremo',
      'Gestión de estado reactiva con RxJS y Signals',
      'Integración con API REST o WebSockets',
      'Pruebas de regresión con Vitest',
      'Hosting escalable',
      'Seguimiento del rendimiento',
      'Actualizaciones del framework',
      'Soporte técnico prioritario'
    ],
    min_duration_months: 12
  },
  // OPTIMIZATION tier
  {
    service_id: 'performance-audit',
    initial_cost: 450,
    initial_label_es: 'Auditoría',
    monthly_cost: 39,
    monthly_label_es: 'Monitorización',
    includes_es: [
      'Auditoría de Core Web Vitals (LCP, CLS, INP)',
      'Inspección de accesibilidad WCAG 2.2',
      'Eliminación de JavaScript innecesario',
      'Optimización de recursos críticos',
      'Corrección de contraste y semántica HTML',
      'Informe comparativo antes/después',
      'Seguimiento mensual de métricas',
      'Avisos de regresiones',
      'Revisión periódica de accesibilidad'
    ],
    min_duration_months: 12
  },
  {
    service_id: 'cicd-devops',
    initial_cost: 350,
    initial_label_es: 'Configuración',
    monthly_cost: 35,
    monthly_label_es: 'Mantenimiento',
    includes_es: [
      'Pipelines paralelos con GitHub Actions',
      'Linters, TypeScript y pruebas automatizadas',
      'Auditoría de Lighthouse CI',
      'Despliegues continuos con vistas previas',
      'Gestión automatizada de dependencias',
      'Supervisión de pipelines y runners',
      'Configuración segura de secretos',
      'Documentación de colaboración',
      'Soporte para resolver fallos'
    ],
    min_duration_months: 12
  }
];
