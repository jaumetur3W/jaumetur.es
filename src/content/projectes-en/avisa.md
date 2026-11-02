---
draft: false
title: "AVISA — Real-Time Incident Management"
subtitle: "Reactive frontend architecture built with Angular and TypeScript for coordinating critical urban alerts and service incidents."
tagline: "A platform for reporting, communicating, and tracking incidents in real time with an accessible UI and zero thread blocking."
icon: "bx:bell"
color: "red"
role: "Frontend Architecture & UI Engineering"
year: "2025 – 2026"
client: "Final DAW Project / Urban Services"
badge: "Web App · UI Prototype"
statLabel: "Verified Metric"
statValue: "WCAG 2.2 AA / < 150ms"
verificationMethod: "Automated audit with axe-core and DevTools Network Latency Profile"
liveUrl: "https://front-project-jjaux-h8pw.vercel.app/"
githubUrl: "https://github.com/jautur/FRONT-PROJECT-JJAUX"
stack: ["Angular 17+", "Strict TypeScript", "Signals", "Vercel Edge", "WCAG AA", "Reactive Forms"]
order: 1
image: {
  src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fit=crop&w=1200&h=630",
  alt: "AVISA real-time incident and alert management dashboard"
}
---

## 1. Problem & Context

In municipal services and local emergency management, conventional communication channels (manual telephone calls, disconnected web forms, or scattered emails) create severe bottlenecks.

Control room operators frequently manage dozens of simultaneous incident dispatches under stress, leading to:
- **Communication delays:** Information arrives late or duplicated, without precise geolocation coordinates.
- **Lack of real-time visibility:** Operators cannot track the intervention status of field teams on the ground.
- **Clunky legacy interfaces:** Outdated administrative panels with insufficient color contrast, unfit for night shifts or secondary monitors.

The goal of **AVISA** was to architect an accessible, ultra-fast, and modular web application that drastically reduces the time elapsed between receiving an alert and operational dispatch.

---

## 2. Technical Challenge

The project required solving three simultaneous engineering challenges:

1. **Reactive State Management without Memory Leaks:** Manage real-time incident state across interactive maps, dispatch lists, and status changes without UI freezing.
2. **Zero-Friction Accessibility (WCAG 2.2 AA):** Enable fast keyboard navigation, high color contrast, and complete screen reader compatibility for municipal operators.
3. **Sub-second Response Times:** Ensure lightning-fast initial load times (< 150ms) and immediate interactive feedback on edge deployments.

---

## 3. Architecture & Implementation

### Angular 17+ with Signals and Standalone Components

We adopted a modern, lightweight frontend architecture leveraging Angular's fine-grained reactivity model:

- **Signals for Granular Reactivity:** Replaced heavy `RxJS` subscriptions for simple local state with native Angular Signals. This eliminates unnecessary change detection cycles and ensures smooth 60 FPS rendering.
- **Standalone Components:** Eliminated monolithic `NgModules`, creating a modular component tree with tree-shakeable dependencies and fast incremental builds.
- **Strict TypeScript:** Enforced strict type safety across all models, interfaces, and API contracts, catching schema mismatches during compilation.

```typescript
// Granular state management with Angular Signals
readonly incidents = signal<Incident[]>([]);
readonly activeFilter = signal<IncidentPriority>('ALL');

readonly filteredIncidents = computed(() => {
  const filter = this.activeFilter();
  const list = this.incidents();
  return filter === 'ALL' ? list : list.filter(i => i.priority === filter);
});
```

---

## 4. Key Results & Verification

- **100% WCAG 2.2 AA Compliance:** Verified via automated `axe-core` tests and full keyboard traversal checks.
- **Edge Performance:** Deployed globally on Vercel Edge with zero server latency overhead.
- **Zero Thread Blocking:** Main thread tasks remain under 50ms during high-volume alert processing.

