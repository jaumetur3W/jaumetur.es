export interface PricingTier {
  service_id: string;
  initial_cost: number;
  initial_label_en: string;
  monthly_cost: number;
  monthly_label_en: string;
  includes_en: string[];
  min_duration_months: number;
}

export const pricingTiers: PricingTier[] = [
  // WEB tier
  {
    service_id: 'digitalitzacio-local',
    initial_cost: 290,
    initial_label_en: 'Creation',
    monthly_cost: 49,
    monthly_label_en: 'Maintenance',
    includes_en: [
      'Mobile-responsive design',
      'Development with Astro/React',
      'First year hosting',
      'Domain (.es)',
      'SSL/HTTPS certificate',
      'Price and menu updates',
      'QR code for print',
      'Google Maps optimization',
      'Monthly security updates'
    ],
    min_duration_months: 12
  },
  {
    service_id: 'landing-page',
    initial_cost: 390,
    initial_label_en: 'Creation',
    monthly_cost: 30,
    monthly_label_en: 'Maintenance',
    includes_en: [
      'Static development with Astro and Tailwind CSS v4',
      '100/100 Lighthouse target',
      'WCAG 2.2 AA universal accessibility',
      'Technical SEO and Open Graph meta',
      'Accessible contact form',
      'Hosting with SSL certificate',
      'Automatic daily backups',
      'Monthly security updates',
      'Uptime monitoring 24/7'
    ],
    min_duration_months: 12
  },
  // APP tier
  {
    service_id: 'angular-webapp',
    initial_cost: 1950,
    initial_label_en: 'Creation',
    monthly_cost: 95,
    monthly_label_en: 'Maintenance',
    includes_en: [
      'Modular architecture with standalone components',
      'Strict TypeScript end-to-end',
      'Reactive state management with RxJS and Signals',
      'REST API or WebSocket integration',
      'Regression testing with Vitest',
      'Scalable hosting',
      'Performance monitoring',
      'Framework updates',
      'Priority technical support'
    ],
    min_duration_months: 12
  },
  // OPTIMIZATION tier
  {
    service_id: 'performance-audit',
    initial_cost: 450,
    initial_label_en: 'Audit',
    monthly_cost: 39,
    monthly_label_en: 'Monitoring',
    includes_en: [
      'Core Web Vitals audit (LCP, CLS, INP)',
      'WCAG 2.2 accessibility inspection',
      'Unnecessary JavaScript removal',
      'Critical resource optimization',
      'Contrast and HTML semantics fixes',
      'Before/after comparative report',
      'Monthly metrics tracking',
      'Regression alerts',
      'Periodic accessibility review'
    ],
    min_duration_months: 12
  },
  {
    service_id: 'cicd-devops',
    initial_cost: 350,
    initial_label_en: 'Setup',
    monthly_cost: 35,
    monthly_label_en: 'Maintenance',
    includes_en: [
      'Parallel pipelines with GitHub Actions',
      'Linters, TypeScript and automated tests',
      'Lighthouse CI audit',
      'Continuous deployments with previews',
      'Automated dependency management',
      'Pipeline and runner supervision',
      'Secure secret configuration',
      'Team collaboration documentation',
      'Support for failure resolution'
    ],
    min_duration_months: 12
  }
];
