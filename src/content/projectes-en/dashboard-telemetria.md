---
draft: false
title: "Telemetry Dashboard — 60 FPS Web Performance"
subtitle: "Real-time interactive dashboard monitoring web performance metrics, system concurrency, and Core Web Vitals."
tagline: "High-frequency UI engineering: guaranteed 60 FPS rendering via requestAnimationFrame and isolated CSS containment layers."
icon: "bx:line-chart"
color: "emerald"
role: "Frontend Engineering & Web Performance"
year: "2025"
client: "Personal Engineering Project / Open Source"
badge: "Frontend UI & Metrics"
statLabel: "Verified Metric"
statValue: "60 FPS / INP < 30ms"
verificationMethod: "Chrome DevTools Performance Profiler & FPS Meter Audit"
liveUrl: "https://jautur.github.io/portfolio/#skills"
githubUrl: "https://github.com/jautur/portfolio"
stack: ["JavaScript ES6+", "TypeScript", "Performance API", "CSS Containment", "Virtual DOM", "Core Web Vitals"]
order: 6
image: {
  src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=1200&h=630",
  alt: "High-performance telemetry and analytics visual graph"
}
---

## 1. Problem & Context

Corporate analytics dashboards required to render live charts, high-volume telemetry streams, and server metrics often suffer sudden performance drops as data throughput increases.

Common performance failure modes include:
- **Main Thread Lockup:** Heavy data computation or formatting tasks blocking the main thread, freezing the mouse cursor and degrading user input responsiveness.
- **Visual Jank:** Sudden framerate drops from 60 FPS to under 20 FPS during interactive filtering or scrolling.
- **Streaming Memory Leaks:** Accumulation of detached DOM nodes and unmanaged event listeners consuming gigabytes of browser RAM over extended monitoring sessions.

This engineering showcase was built to demonstrate how to architect a high-throughput telemetry interface that sustains a rock-solid **60 FPS under intensive data loads**.

---

## 2. Technical Challenge

1. **Strict 16.6ms Frame Budget:** Ensure all JavaScript execution, style recalculation, layout, and compositing complete within 16 milliseconds per frame.
2. **Optimize Interaction to Next Paint (INP):** Keep input response latency under 30ms when users switch time ranges or metric filters.
3. **Isolate Repaints with CSS Containment:** Ensure that rapid updates inside an analytics card never trigger a document-wide geometry recalculation.

---

## 3. Architectural Decisions

- **Hardware Acceleration (GPU Compositing):** Critical charts and dynamic dials animate exclusively using GPU-accelerated CSS properties (`transform` and `opacity`).
- **Main Thread Yielding:** Long-running data calculations are broken into cooperative micro-tasks using `scheduler.yield()` or `requestAnimationFrame`, avoiding thread starvation.
- **CSS Containment (`contain: layout paint`):** Each metric widget lives in an isolated rendering subtree, restricting browser reflows locally.

---

## 4. Key Results & Verification

- **Smooth 60 FPS Rendering:** Zero dropped frames during intensive real-time updates as verified by the Chrome DevTools FPS Meter.
- **Ultra-low INP:** Measured at < 30ms across all key user interactions.
- **Lean Memory Profile:** Stable heap allocation during multi-hour stress tests.

