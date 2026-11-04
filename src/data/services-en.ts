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
  "Comprehensive requirements analysis and technical scope definition.",
  "Architecture, UI design, and implementation using specified modern technologies.",
  "Rigorous quality review: 100/100 Lighthouse performance and WCAG AA accessibility.",
  "Full source code ownership, deployment setup, and technical documentation.",
];

const monthlyBreakdown = [
  "Continuous proactive technical maintenance throughout the contract term.",
  "Prompt incident resolution, dependency security audits, and framework updates.",
  "Ongoing technical consulting to grow and evolve the digital platform.",
];

const commitmentExplanation =
  "Monthly maintenance requires a minimum one-year commitment, ensuring continuous technical support, peak speed, and long-term security.";

const marketComparisonDigital = [
  {
    name: "Local Digitization Package (Web + Social)",
    priceRange: "€290 upfront + €49/month",
    speedLighthouse: "Optimized for maximum Lighthouse score (95-100)",
    maintenanceCost: "€49/month (web menu, content updates, and social channels included)",
    hiddenCosts: "€0 order commissions",
    codeOwnership: "Everything is yours: website, digital menu, and social profiles",
    summary: "My flagship proposal: curated Google Maps presence, active social channels, and an instant mobile menu with zero middleman fees.",
  },
  {
    name: "Third-party Delivery Platforms (Glovo, Uber Eats, JustEat)",
    priceRange: "25% to 35% commission on every order",
    speedLighthouse: "Dependent on third-party mobile apps",
    maintenanceCost: "Hundreds or thousands of euros per month in commissions",
    hiddenCosts: "Customers belong to the platform; you lose direct customer relationships",
    codeOwnership: "None: total vendor lock-in",
    summary: "Extremely costly over time; drastically reduces operating margins on every dish.",
  },
  {
    name: "PDF Menu linked via a free QR code",
    priceRange: "€0 superficially",
    speedLighthouse: "Terrible user experience (slow 5-15 MB PDF downloads)",
    maintenanceCost: "€0 initially; high lost-revenue cost from frustrated diners",
    hiddenCosts: "Unreadable on mobile without zooming, zero SEO indexing, no Google Maps integration",
    codeOwnership: "None",
    summary: "Fails to convert customers, hurts brand image, and leads to walkaways during peak dining hours.",
  },
  {
    name: "Traditional Digital Agency",
    priceRange: "€1,200 to €3,500 initial setup",
    speedLighthouse: "Often slow due to generic WordPress or template themes",
    maintenanceCost: "€100 to €300/month for minimal support",
    hiddenCosts: "Extra fees for every minor menu price change or photo edit",
    codeOwnership: "Often shared or restricted by agency agreements",
    summary: "Unnecessarily expensive for local hospitality and neighborhood businesses.",
  },
];

export const servicesCopyEn: Record<string, ServiceCopy> = {
  "digitalitzacio-local": {
    name: "Local Digitization & Web Menu (Bars & Retail)",
    badge: "Key Proposal · Most Recommended",
    tagline:
      "The definitive solution for local bars, pizzerias, cafes, and neighborhood shops looking to attract customers from Google Maps and social media without middleman commissions.",
    description:
      "Inspired by the success of Pizzeria in Xàtiva: eliminating heavy 15 MB PDFs that diners cannot open on their phones. I build your ultra-fast HTML digital menu, set up a verified Google Maps profile, and handle or optimize your social channels (Instagram/Facebook) to fill your tables without paying commissions to delivery apps.",
    targetAudience:
      "Small bars, pizzerias, family restaurants, cafes, bakeries, neighborhood stores, and local professionals without a website or with an outdated online presence.",
    timeline: "3 to 5 business days",
    creationPrice: "From €290",
    annualTotal: "€878 1st year (web menu creation + social channels + 12 months maintenance)",
    dailyCostEquivalent: "~€2.40/day during the first year (less than a coffee and pastry)",
    amortizationSummary: "Fully pays for itself with just 3 to 4 takeaway orders or dinners per month.",
    ctaText: "Start Local Digitization",
    features: [
      "Lightweight, instant-loading HTML web menu (target < 0.5s) optimized for smartphones",
      "Full setup, optimization, and verification of Google Maps & Google Business profile",
      "Direct WhatsApp and phone call ordering buttons with zero intermediary fees",
      "Setup and visual design for Instagram and Facebook business profiles",
      "Digital QR code designed for print (ready for tables, window decals, and flyers)",
      "Technical maintenance, hosting, menu price updates, and support included",
    ],
    amortizationPoints: [
      {
        title: "Immediate ROI with only 3-4 orders per month",
        metric: "3 to 4 orders / month",
        description:
          "In hospitality and retail, the profit margin of just 3-4 takeaway orders or a couple of weekend tables completely covers the monthly service fee.",
      },
      {
        title: "Top ranking on Google Maps and proximity search",
        metric: "+60% local visibility",
        description:
          "Over 75% of consumers searching for 'where to eat' or 'restaurants near me' visit a local business within 24 hours. Having an optimized Google Maps presence with opening hours and instant WhatsApp contact is the single biggest new customer driver.",
      },
      {
        title: "Goodbye to bulky PDFs that lose customers at tables",
        metric: "Target load < 0.5 seconds",
        description:
          "Heavy PDF menus fail to load on weak mobile data connections. A clean, native HTML web menu loads instantly, keeps customers happy, and boosts drink and dessert orders.",
      },
      {
        title: "100% independence from delivery app commissions",
        metric: "Save 25% - 35%",
        description:
          "Third-party delivery platforms take up to 35% of every order. With your direct WhatsApp menu, customers order straight from you, protecting your margins.",
      },
    ],
    marketComparison: marketComparisonDigital,
    whyThisPrice: {
      creationBreakdown,
      monthlyBreakdown,
      whyCommitmentOneYear: commitmentExplanation,
    },
  },

  "landing-page": {
    name: "High-Performance Landing Page & Conversion",
    badge: "Fast Turnaround · Maximum Conversion",
    tagline:
      "High-speed landing pages engineered for product launches, ad campaigns, and professional services with 100/100 Lighthouse performance.",
    description:
      "A fast, responsive, and persuasive landing page designed to turn ad clicks and visitors into qualified leads and sales. Built with semantic HTML, zero bloat, instant loading, and accessible UX.",
    targetAudience:
      "Startups, professionals, consultants, SaaS creators, and companies running paid ads or launching new products.",
    timeline: "5 to 7 business days",
    creationPrice: "From €490",
    annualTotal: "€1,270 1st year (creation + 12 months proactive maintenance)",
    dailyCostEquivalent: "~€3.48/day during the first year",
    amortizationSummary: "Recovers investment with 1 or 2 new client acquisitions.",
    ctaText: "Launch My Landing Page",
    features: [
      "Ultra-fast static HTML architecture powered by Astro and modern CSS",
      "100/100 Google Lighthouse score across Performance, SEO, and Accessibility",
      "Clear call-to-action sections with accessible contact and lead capture forms",
      "Open Graph cards and social media preview assets for Twitter, LinkedIn, and WhatsApp",
      "Integrated lightweight analytics without cookie banners or GDPR friction",
      "Continuous technical maintenance, hosting on global CDN edge, and SSL included",
    ],
    amortizationPoints: [
      {
        title: "Lower cost per acquisition on Google & Meta Ads",
        metric: "-30% ad bounce rate",
        description:
          "Google Ads rewards high-speed landing pages with better Quality Scores, directly lowering your cost per click (CPC) and boosting ad rankings.",
      },
      {
        title: "Higher conversion rate from visitors to clients",
        metric: "+25% conversion lift",
        description:
          "Every second of delay costs 7% in conversions. Sub-second load times ensure every visitor engages with your value proposition immediately.",
      },
    ],
    marketComparison: [
      {
        name: "Custom High-Performance Landing Page",
        priceRange: "€490 upfront + €65/month",
        speedLighthouse: "Target: 95-100",
        maintenanceCost: "€65/month included",
        hiddenCosts: "€0",
        codeOwnership: "100% yours",
        summary: "Lightweight, ultra-fast, and focused on conversions.",
      },
      {
        name: "Generic WordPress / Elementor Landing",
        priceRange: "€600 - €1,500",
        speedLighthouse: "30 - 60 (heavy plugins and slow database queries)",
        maintenanceCost: "€80 - €150/month for plugin security patches",
        hiddenCosts: "Hosting, premium theme licenses, security add-ons",
        codeOwnership: "Tied to proprietary plugins",
        summary: "Slow, vulnerable to attacks, and frequently breaks after updates.",
      },
    ],
    whyThisPrice: {
      creationBreakdown,
      monthlyBreakdown,
      whyCommitmentOneYear: commitmentExplanation,
    },
  },

  "angular-webapp": {
    name: "Custom Web Application & Interactive Dashboard",
    badge: "Scalable Architecture · Enterprise Quality",
    tagline:
      "Modular single-page applications and internal management tools with robust state management, REST APIs, and strict TypeScript.",
    description:
      "Engineered for businesses that need more than a content website: internal operations dashboards, inventory systems, client portals, and real-time operational tools built with clean architecture and type safety.",
    targetAudience:
      "Mid-sized businesses, engineering teams, logistics operations, and startups that require reliable custom software.",
    timeline: "3 to 6 weeks",
    creationPrice: "From €1,850",
    annualTotal: "€3,290 1st year (architecture, development + 12 months maintenance)",
    dailyCostEquivalent: "~€9.00/day during the first year",
    amortizationSummary: "Eliminates hundreds of manual operational hours each month.",
    ctaText: "Discuss Web Application",
    features: [
      "Modular frontend architecture built with Angular (Standalone Components & Signals)",
      "Strict TypeScript end-to-end, guaranteeing type safety and minimal runtime bugs",
      "Scalable REST API integration with robust authentication and state management",
      "Smooth 60 FPS performance, reactive tables, and real-time interactive dashboards",
      "Full WCAG 2.2 AA accessibility and cross-device responsive ergonomics",
      "Proactive code maintenance, dependency updates, and feature iteration support",
    ],
    amortizationPoints: [
      {
        title: "Drastic reduction in manual errors and admin overhead",
        metric: "15+ hours saved / week",
        description:
          "Automating repetitive internal processes and incident workflows frees your team to focus on revenue-generating core business tasks.",
      },
      {
        title: "Enterprise-grade reliability without vendor lock-in",
        metric: "99.9% uptime",
        description:
          "Modular code ensures that your software can evolve gracefully for years without expensive rewrites.",
      },
    ],
    marketComparison: [
      {
        name: "Custom Angular / TypeScript Web App",
        priceRange: "€1,850 upfront + €120/month",
        speedLighthouse: "95+ on web metrics, 60 FPS smooth interactions",
        maintenanceCost: "€120/month (ongoing updates, bug fixes, performance monitoring)",
        hiddenCosts: "€0",
        codeOwnership: "Full repository ownership and intellectual property",
        summary: "Clean, robust, and scalable software built specifically for your exact workflow.",
      },
      {
        name: "Off-the-shelf SaaS Subscription",
        priceRange: "€50 - €150 / user / month",
        speedLighthouse: "Varies; non-customizable",
        maintenanceCost: "Costs compound rapidly as your team grows",
        hiddenCosts: "Tier upgrades, export fees, per-seat licensing",
        codeOwnership: "Zero data or software ownership",
        summary: "Forces your business into rigid generic workflows and recurring per-seat costs.",
      },
    ],
    whyThisPrice: {
      creationBreakdown,
      monthlyBreakdown,
      whyCommitmentOneYear: commitmentExplanation,
    },
  },

  "performance-audit": {
    name: "Performance Audit & Core Web Vitals Optimization",
    badge: "Diagnostic & Remediation",
    tagline:
      "In-depth diagnostic and hands-on optimization to boost Core Web Vitals, eliminate render-blocking resources, and achieve sub-second load times.",
    description:
      "Designed for businesses whose existing websites suffer from slow load times, high bounce rates, or poor Google rankings due to failed Core Web Vitals (LCP, CLS, INP). We pinpoint performance bottlenecks and rewrite critical assets for maximum speed.",
    targetAudience:
      "E-commerce stores, high-traffic portals, marketing agencies, and corporate websites needing speed optimization.",
    timeline: "3 to 5 business days",
    creationPrice: "From €390",
    annualTotal: "€810 1st year (audit, remediation + 12 months monitoring)",
    dailyCostEquivalent: "~€2.21/day during the first year",
    amortizationSummary: "Recovers cost immediately via improved organic search rankings and lower bounce rates.",
    ctaText: "Request Performance Audit",
    features: [
      "Deep analysis using Chrome DevTools, WebPageTest, and Google Lighthouse v13",
      "Hands-on optimization of critical render path, removing render-blocking CSS and JS",
      "Image optimization pipeline: modern WebP/AVIF compression, responsive sizing, and preload tags",
      "Core Web Vitals remediation targeting green thresholds for LCP (<2.5s), CLS (<0.1), and INP (<200ms)",
      "Comprehensive before-and-after audit report with actionable metrics and guidelines",
      "Continuous monthly performance monitoring to prevent regression after updates",
    ],
    amortizationPoints: [
      {
        title: "Direct Google SEO ranking boost via Core Web Vitals",
        metric: "Top SEO signal",
        description:
          "Google uses page speed as an official ranking factor. Passing Core Web Vitals moves your site ahead of slower competitors.",
      },
      {
        title: "Immediate reduction in bounce rate",
        metric: "-40% immediate drop",
        description:
          "More than half of mobile visitors leave if a page takes over 3 seconds to load. Speed optimization stops lost sales immediately.",
      },
    ],
    marketComparison: [
      {
        name: "Hands-on Technical Performance Remediation",
        priceRange: "€390 upfront + €35/month",
        speedLighthouse: "Target: Green Core Web Vitals",
        maintenanceCost: "€35/month for continuous monitoring",
        hiddenCosts: "€0",
        codeOwnership: "Code changes implemented directly in your repository",
        summary: "Tangible, verifiable speed gains applied by an experienced web engineer.",
      },
      {
        name: "Automated 'Optimization' Plugins",
        priceRange: "€100 - €300 / year",
        speedLighthouse: "Often causes visual layout bugs and false metrics",
        maintenanceCost: "Frequent breaks when updates collide",
        hiddenCosts: "Complex cache clearing issues and layout shifts",
        codeOwnership: "Proprietary plugin dependency",
        summary: "Superficial patch that often worsens JavaScript blocking and cumulative layout shift.",
      },
    ],
    whyThisPrice: {
      creationBreakdown,
      monthlyBreakdown,
      whyCommitmentOneYear: commitmentExplanation,
    },
  },

  "cicd-devops": {
    name: "CI/CD Pipeline Automation & DevOps Workflow",
    badge: "Zero Downtime · Total Automation",
    tagline:
      "Automated testing, linting, continuous integration, and atomic zero-downtime deployment workflows using GitHub Actions.",
    description:
      "Stop manual FTP uploads and stressful releases. I set up an automated DevOps pipeline that runs tests, compiles assets, and deploys your application safely every time you push code to GitHub.",
    targetAudience:
      "Development agencies, software teams, and growing projects seeking reliable, hands-off release processes.",
    timeline: "2 to 4 business days",
    creationPrice: "From €350",
    annualTotal: "€830 1st year (setup + 12 months pipeline maintenance)",
    dailyCostEquivalent: "~€2.27/day during the first year",
    amortizationSummary: "Eliminates deployment errors and saves dozens of developer hours every month.",
    ctaText: "Automate My Deployments",
    features: [
      "Custom GitHub Actions YAML workflows tailored to your frontend/backend stack",
      "Automated unit testing, linting (ESLint), and strict TypeScript build validation",
      "Atomic zero-downtime deployments to modern platforms (Vercel, Cloudflare, Netlify, VPS)",
      "Dependency caching for rapid build times (<60 seconds per run)",
      "Automated rollback strategies and secret management (API keys, environment variables)",
      "Monthly pipeline maintenance, runner dependency upgrades, and security advisory alerts",
    ],
    amortizationPoints: [
      {
        title: "Eliminate costly production release outages",
        metric: "Zero downtime",
        description:
          "Catch bugs and broken types before they ever reach production users, eliminating emergency weekend debugging sessions.",
      },
      {
        title: "Deploy updates in seconds, not hours",
        metric: "10x faster shipping",
        description:
          "Push code to Git and let automation handle building, testing, and deploying globally.",
      },
    ],
    marketComparison: [
      {
        name: "Tailored GitHub Actions CI/CD Pipeline",
        priceRange: "€350 upfront + €40/month",
        speedLighthouse: "Builds execute in under 60 seconds with cached dependencies",
        maintenanceCost: "€40/month (runner health, dependency updates, workflow fixes)",
        hiddenCosts: "€0",
        codeOwnership: "Workflows live directly in your .github/workflows directory",
        summary: "Professional DevOps automation built on industry best practices.",
      },
      {
        name: "Manual File Uploads via FTP / SSH",
        priceRange: "€0 upfront",
        speedLighthouse: "Manual, slow, and error-prone",
        maintenanceCost: "Hours of expensive developer time wasted on every release",
        hiddenCosts: "High risk of overwriting production files or deploying broken code",
        codeOwnership: "None",
        summary: "Fragile and dangerous practice that leads to service outages and lost revenue.",
      },
    ],
    whyThisPrice: {
      creationBreakdown,
      monthlyBreakdown,
      whyCommitmentOneYear: commitmentExplanation,
    },
  },
};

