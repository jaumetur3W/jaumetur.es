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
    problem: 'Local pizzeria without online presence. Customers couldn\'t see the menu, make reservations, or order online. Dependent on high-commission third parties.',
    solution: 'Built a website with interactive digital menu, integrated reservation system, and payment gateway for online orders. Migration from third parties to direct WhatsApp contact.',
    result: '40% more inquiries/month. 80% reduction in third-party commissions. Better customer data control and preferences.',
    technologies: ['Astro', 'React', 'Stripe', 'Tailwind', 'TypeScript'],
    service_id: 'digitalitzacio-local',
    year: 2025
  },
  {
    id: 'forma-espacio',
    slug: 'forma-espacio',
    problem: 'Interior design studio with weak online presence. Disorganized portfolio, no direct contact, losing client opportunities.',
    solution: 'Professional landing page with visual portfolio, optimized contact form, local Valencia SEO, social media integration.',
    result: '25% increase in qualified leads. Improved local search rankings. Professional portfolio building trust.',
    technologies: ['Astro', 'Tailwind', 'Netlify', 'SEO'],
    service_id: 'landing-page',
    year: 2024
  },
  {
    id: 'avisa',
    slug: 'avisa',
    problem: 'Internal notification management app required modern architecture, type safety, and maintainability. Previous development with fragile code.',
    solution: 'Complete refactoring with Angular, Signals, strict TypeScript, RxJS for reactive state, Vitest tests, automated CI/CD pipeline.',
    result: '60% reduction in production bugs. Automated deployments with zero downtime. Maintainable and scalable code for the team.',
    technologies: ['Angular', 'TypeScript', 'RxJS', 'Signals', 'Vitest', 'GitHub Actions'],
    service_id: 'angular-webapp',
    year: 2024
  },
  {
    id: 'trania',
    slug: 'trania',
    problem: 'Existing website slow (Lighthouse 45/100), poor Google rankings, bad mobile UX.',
    solution: 'Complete performance audit. Removed 80% unnecessary JavaScript. Image optimization to WebP/AVIF. WCAG AA accessibility fixes.',
    result: 'Lighthouse improved to 95/100. LCP reduced from 4.2s to 1.1s. Organic traffic increased 35% in 3 months.',
    technologies: ['Core Web Vitals', 'WebP', 'AVIF', 'WCAG', 'Lighthouse'],
    service_id: 'performance-audit',
    year: 2025
  }
];
