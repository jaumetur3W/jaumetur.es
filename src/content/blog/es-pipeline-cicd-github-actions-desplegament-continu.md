---
draft: false
title: "Guía paso a paso: CI/CD para frontend con GitHub Actions y despliegue automatizado"
snippet: "Aprende a diseñar un pipeline profesional de integración y despliegue continuos: linter, pruebas, compilación optimizada, caché eficiente y despliegue sin interrupciones."
image: {
    src: "/img/blog/es-pipeline-cicd-github-actions-desplegament-continu.webp",
    alt: "Pipeline de automatización e integración continua CI/CD"
}
publishDate: "2026-03-14 09:15"
category: "CI/CD"
author: "Jaume Tur"
tags: [cicd, github-actions, devops, deploy, automatizacion, astro, angular]
lang: "es"
canonicalUrl: "https://jaumetur.es/blog/es-pipeline-cicd-github-actions-desplegament-continu"
---

El despliegue manual de software mediante FTP o arrastrando archivos por SSH es una de las mayores fuentes de errores en la industria del desarrollo web. Un archivo olvidado, una versión equivocada de Node.js o una variable de entorno desincronizada pueden dejar una aplicación en caída libre (*downtime*) en plena hora punta.

La solución es sencilla: **Integración Continua (CI) y Despliegue Continuo (CD)**. Cada vez que un desarrollador hace un `git push` a la rama `main`, una máquina aislada en la nube clona el repositorio, valida el formato del código, ejecuta las pruebas unitarias, compila los activos estáticos y despliega la nueva versión a producción de forma atómica y sin interrumpir el servicio.

En esta guía detallamos cómo configurar un pipeline profesional para aplicaciones frontend con **GitHub Actions**.

---

## 1. La arquitectura de un pipeline frontend profesional

Un buen pipeline de CI/CD para frontend debe cumplir tres premisas:
1. **Velocidad (Fast Feedback):** Si el pipeline tarda más de 3-4 minutos, los desarrolladores perderán el ritmo y dejarán de revisar los resultados antes de cambiar de contexto.
2. **Determinismo:** Utilizar `npm ci` en lugar de `npm install` para garantizar que se instalan exactamente las mismas dependencias descritas en el archivo de bloqueo `package-lock.json`.
3. **Resiliencia (Fail-Fast):** Si los linters fallan o hay un error de TypeScript, el proceso se detiene inmediatamente, sin gastar tiempo ni minutos de cálculo intentando compilar.

```text
  [ Git Push ]
       │
       ▼
┌───────────────────────────────┐
│ Trabajo: Calidad y seguridad  │
│ - ESLint / Prettier            │
│ - Typecheck (tsc --noEmit)     │
│ - Pruebas unitarias (Vitest)   │
└──────────────┬────────────────┘
               │ (Solo si pasa)
               ▼
┌───────────────────────────────┐
│ Trabajo: Build y caché        │
│ - Astro / Angular Build       │
│ - Optimización de imágenes    │
└──────────────┬────────────────┘
               │ (Solo si pasa)
               ▼
┌───────────────────────────────┐
│ Trabajo: Despliegue atómico   │
│ - GitHub Pages / Cloudflare   │
│ - Purga de caché CDN          │
└───────────────────────────────┘
```

---

## 2. El archivo de configuración `.github/workflows/deploy.yml`

A continuación presentamos el workflow completo y optimizado que utilizamos en proyectos basados en Astro y Angular para desplegar en **GitHub Pages** con un dominio personalizado:

```yaml
name: Deploy Frontend to Production

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    name: Build & Validate
    runs-on: ubuntu-latest
    steps:
      - name: Clonar repositorio
        uses: actions/checkout@v4

      - name: Configurar Node.js (v22 LTS)
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'

      - name: Instalar dependencias deterministas
        run: npm ci

      - name: Verificación estricta de tipos TypeScript
        run: npx astro check || npx tsc --noEmit

      - name: Compilación de producción
        run: npm run build

      - name: Subir artefactos estáticos
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    name: Despliegue atómico
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Desplegar en GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

<div class="callout callout-tip">
  <strong>¿Quieres generar este archivo automáticamente?</strong> Hemos creado la herramienta interactiva <a href="/tools/workflow-generator">Generador de workflows CI/CD</a> para crear pipelines personalizados para Astro, Angular o React con un solo clic.
</div>

---

## 3. Caché inteligente: reducir el tiempo de build de 5 minutos a 45 segundos

Uno de los cuellos de botella habituales en GitHub Actions es la descarga reiterada de la carpeta `node_modules`.

Mediante la propiedad `cache: 'npm'` en la acción oficial `actions/setup-node@v4`, GitHub Actions guarda una instantánea de la caché de paquetes indexada por el hash del archivo `package-lock.json`. Si no se ha añadido ninguna biblioteca nueva, la instalación de dependencias se resuelve en cuestión de segundos:

```yaml
- name: Setup Node.js with cache
  uses: actions/setup-node@v4
  with:
    node-version: 22
    cache: 'npm'
```

---

## 4. Gestión de dominios personalizados y HTTPS (.es)

Al desplegar en GitHub Pages con un dominio propio (como `jaumetur.es`), hay que tener en cuenta dos aspectos críticos que a menudo provocan caídas del sitio web:

1. **El archivo CNAME en la carpeta de salida:** GitHub Pages requiere un archivo de texto llamado `CNAME` que contenga exclusivamente el dominio de producción. Si tu framework no lo copia a `./dist`, el dominio se desvincula con cada despliegue. En Astro, basta con guardarlo en la carpeta `/public/CNAME`.
2. **El archivo `.nojekyll`:** GitHub Pages asume por defecto que los sitios están construidos con Jekyll e ignora cualquier directorio que empiece por guion bajo (`_astro`, `_app`). Crear un archivo vacío `/public/.nojekyll` desactiva este comportamiento y garantiza que todos los archivos CSS y JavaScript se carguen correctamente.

---

## 5. Prevención de regresiones con Husky y linters

El mejor pipeline de CI/CD es aquel que no hay que ejecutar porque los errores se interceptan antes de llegar al repositorio remoto.

Utilizamos **Husky** y **lint-staged** para validar el formato y los tipos antes de permitir un commit:

```json
// package.json
{
  "lint-staged": {
    "*.{ts,astro,js}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

De este modo, ninguna línea de código con sintaxis incorrecta llega a la rama principal.

---

## Conclusión

La automatización mediante CI/CD transforma por completo la seguridad psicológica de un equipo de ingeniería. Saber que cada cambio pasa por una batería de validaciones automáticas permite entregar valor continuamente sin miedo a romper producción.

Si quieres implementar un pipeline similar en tu organización u optimizar los tiempos de despliegue, [puedes solicitar nuestro servicio de consultoría DevOps](/contact).
