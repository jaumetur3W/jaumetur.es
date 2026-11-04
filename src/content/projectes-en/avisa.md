---
draft: false
title: "AVISA — Professional Services, Home Tasks & Renovations Platform"
subtitle: "Progressive Web App (PWA) built with Angular 18 connecting homeowners and communities directly with verified trade professionals without hidden fees."
tagline: "A digital marketplace to post repair tasks, receive free upfront quotes without hidden commissions, and manage trade projects from mobile or desktop."
icon: "bx:wrench"
color: "red"
role: "Frontend Architecture & PWA Engineering"
year: "2025 – 2026"
client: "Final DAW Capstone / Trades & Home Services"
badge: "Web App · Mobile PWA"
statLabel: "Verified Metric"
statValue: "Angular 18 · PWA 24/7"
verificationMethod: "Verified source code on GitHub (FRONT-PROJECT-JJAUX) and live production deployment on Vercel"
liveUrl: "https://front-project-jjaux-h8pw.vercel.app/app"
githubUrl: "https://github.com/jautur/FRONT-PROJECT-JJAUX"
stack: ["Angular 18", "TypeScript 5.4", "PWA Service Worker", "RxJS", "Reactive Forms", "Vercel Edge"]
order: 1
image: {
  src: "/img/avisa-logo.png",
  alt: "AVISA professional services, home tasks, and renovation platform"
}
---

## 1. Real-World Context & Problem Statement

In the home renovation, urgent repairs, and trade services sector (plumbing, electrical work, carpentry, air conditioning, and masonry), conventional portals and major intermediary platforms introduce significant friction:

- **Excessive intermediary fees & hidden markups:** Many legacy platforms charge tradespeople high lead-generation fees or add hidden percentage commissions, inflating costs for both customers and self-employed professionals.
- **Lack of trust & regional proximity:** Homeowners struggle to find reliable, verified local trade professionals with transparent contact details and real verified client reviews.
- **Wasted time in administrative delays:** Lengthy phone inquiries, uncoordinated web forms, or quotes that take weeks to arrive.

**AVISA** was engineered to solve this through a direct, transparent, and mobile-first platform (PWA) tailored to the local market (specifically Valencia's southern counties: la Costera, la Safor, la Vall d'Albaida, and la Ribera): linking clients and tradespeople directly with agreed pricing and zero hidden fees.

---

## 2. Platform Capabilities

AVISA connects two complementary user profiles through an intuitive, streamlined UI:

### For Homeowners & Community Managers
- **Fast, free task posting:** Describe any repair or renovation project in under 2 minutes with an estimated budget reference.
- **Zero hidden commissions:** Fair, clear pricing agreed directly between client and trade specialist.
- **Verified professionals:** Plumbers, electricians, carpenters, painters, and builders with vetted profiles, direct phone contact, and public ratings.
- **Fixed-price service packs:** Instant hiring of standardized service packs or custom project quotes.

### For Trade Professionals & Contractors
- **Live job & task board:** Daily access to genuine local tasks and repair dispatches in their area.
- **Fixed-price service packages:** A storefront to offer standard packages directly to homeowners.
- **Verified reputation building:** Complete record of completed jobs and client ratings.

### Mobile-Synchronized PWA Experience
- Full management from smartphones: real-time alerts when contractors respond, secure direct chat to coordinate photos and dates, and job history tracking.

---

## 3. Frontend Architecture (Angular 18 + PWA)

The frontend leverages modern **Angular 18** architectural standards:

### Standalone Components & Domain-Driven Routing
Monolithic `NgModules` were replaced with decoupled Standalone components routed by domain:
- `/tasques-ofertes`: task and service pack discovery marketplace.
- `/avisos`: incident and request lifecycle management for clients.
- `/professional`: dedicated portal for tradespeople managing active bids and fixed-price service packs.
- `/client`: client tracking hub for active quotes and project dispatches.
- `/blog`: local technical guides (electrical CIE bulletins, hard water lime treatment, thermal insulation, and anti-bumping locks).

### Specialized Reactive Services
Business logic is decoupled into typed services using **RxJS** and strict TypeScript:
- `incidencia.service.ts`: client task submission, filtering, and lifecycle.
- `oferta.service.ts`: trade contractor service pack publishing.
- `pressupost.service.ts` & `proposta.service.ts`: custom quote creation, negotiation, and acceptance.
- `tasca.service.ts`: work-order status machine (pending, assigned, in progress, completed).
- `resenya.service.ts`: verified client ratings and feedback audits.
- `usuari.service.ts`: role-based access control (`client`, `professional`, `admin`).

### Progressive Web App (PWA) Support
Configured with `@angular/service-worker` and `manifest.webmanifest`, enabling direct home-screen installation on iOS and Android with fast asset caching and mobile responsiveness.

---

## 4. Source Code & Public Deployment

- **Live Application:** Fully deployed and operational on Vercel's Edge network: [front-project-jjaux-h8pw.vercel.app](https://front-project-jjaux-h8pw.vercel.app/app).
- **GitHub Repository:** The complete source code and commit history is openly available: [github.com/jautur/FRONT-PROJECT-JJAUX](https://github.com/jautur/FRONT-PROJECT-JJAUX).
- **Brand Identity:** Official brand logo featuring an arch motif and crimson neon highlights over a dark technical theme.
