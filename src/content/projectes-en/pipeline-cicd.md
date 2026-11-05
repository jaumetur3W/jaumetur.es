---
draft: false
title: "Automated CI/CD Pipeline — Zero Downtime"
subtitle: "Automated software delivery pipeline: linting, strict TypeScript checks, optimized production builds, and atomic continuous deployment."
tagline: "Moving from manual FTP errors to a fully autonomous continuous integration pipeline powered by GitHub Actions and a global CDN."
icon: "bx:rocket"
color: "sky"
role: "DevOps Engineering & Frontend Leadership"
year: "2025 – 2026"
client: "Personal Infrastructure & Web Projects"
badge: "DevOps & Automation"
statLabel: "Verified Metric"
statValue: "Zero Downtime / < 90s Build"
verificationMethod: "GitHub Actions execution logs and live HTTP status telemetry"
liveUrl: "https://github.com/jautur/portfolio/actions"
githubUrl: "https://github.com/jautur/portfolio"
stack: ["GitHub Actions", "CI/CD", "Linux Shell", "ESLint", "TypeScript Check", "GitHub Pages", "npm Cache"]
order: 7
image: {
  src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=1200&h=630",
  alt: "Continuous integration and automation CI/CD pipeline"
}
---

## 1. Problem & Context

In many freelance projects and fast-moving web teams, production releases are still performed manually: dragging compiled bundles over FTP, issuing manual SSH commands, or deploying from a developer's local machine.

This manual release pattern introduces serious hazards:
- **Human Configuration Errors:** Accidental upload of `.env` files, unminified artifacts, or conflicting dependencies.
- **Downtime & Partial States:** While assets upload across the wire, users experience 404 missing chunk errors and broken styles.
- **Lack of Traceability:** Inability to pinpoint which exact Git commit or pull request caused a production regression.

The objective was to engineer an automated **CI/CD** pipeline leveraging **GitHub Actions** that automates the entire lifecycle, from `git push` to global production deployment with **Zero Downtime**.

---

## 2. Technical Challenge

1. **Fail-Fast Quality Gates:** Abort builds immediately if ESLint rules fail or TypeScript reports type mismatches before any production build begins.
2. **Aggressive Cache Optimization:** Cut cloud compute time drastically by caching npm dependencies and Vite build artifacts.
3. **Atomic Production Releases:** Ensure the new version goes live instantaneously only after 100% of static assets are verified and ready on the global CDN.

---

## 3. Architecture & Implementation

The pipeline runs across isolated, containerized Linux runners with multi-stage verification:

```yaml
name: Deploy Portfolio to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

---

## 4. Key Results & Verification

- **100% Zero Downtime:** Atomic asset updates ensure continuous uptime during releases.
- **Fast Build Times:** Predictable builds completing in under 90 seconds from push to deployment.
- **Fail-Safe Confidence:** Flawed commits are stopped at the gate before reaching end users.

