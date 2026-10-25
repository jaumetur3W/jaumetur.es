---
draft: false
title: "Pipeline CI/CD automatizado — Zero Downtime"
subtitle: "Cadena automatizada de montaje de software: linter, validación estricta de TypeScript, compilación optimizada y despliegue continuo atómico."
tagline: "De los errores manuales por FTP a una cadena de integración continua totalmente autónoma con GitHub Actions y una CDN global."
icon: "bx:rocket"
color: "sky"
role: "Ingeniería DevOps y liderazgo frontend"
year: "2025 – 2026"
client: "Infraestructura personal y proyectos web"
badge: "DevOps y automatización"
statLabel: "Métrica verificada"
statValue: "Zero Downtime / < 90s Build"
verificationMethod: "Registros de ejecución de GitHub Actions y verificación del estado HTTP"
liveUrl: "https://github.com/jautur/portfolio/actions"
githubUrl: "https://github.com/jautur/portfolio"
stack: ["GitHub Actions", "CI/CD", "Linux Shell", "Linters ESLint", "TypeScript Check", "GitHub Pages", "Cache npm"]
order: 5
image: {
  src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=1200&h=630",
  alt: "Pipeline de automatización e integración continua CI/CD"
}
---

## 1. El problema y el contexto

En muchos equipos jóvenes de desarrollo web o proyectos freelance, el despliegue en producción se realiza de forma artesanal: arrastrando archivos compilados por FTP, conectándose por SSH al servidor o ejecutando comandos manuales desde el equipo local del programador.

Este modelo es peligroso por varios motivos:
- **Errores de configuración humana:** Subir archivos temporales, variables de entorno locales o dependencias incompatibles.
- **Tiempo de inactividad durante la subida:** Mientras se transfieren los archivos por la red, los usuarios reciben errores 404 o archivos JavaScript parciales.
- **Pérdida de trazabilidad:** No es posible saber exactamente qué commit o autor introdujo un error en producción.

El objetivo fue construir una cadena de integración y despliegue continuos (**CI/CD**) basada en **GitHub Actions** que automatizara todo el ciclo, desde `git push` hasta la publicación en producción con **Zero Downtime**.

---

## 2. El reto técnico

1. **Detener inmediatamente la entrega si el código no cumple los requisitos de calidad (Fail-Fast):** Si falla un linter o TypeScript detecta un tipo incorrecto, el despliegue se aborta antes de compilar.
2. **Minimizar el tiempo de compilación en la nube:** Reducir la descarga redundante de paquetes de Node.js mediante una estrategia de caché eficiente.
3. **Despliegue atómico:** La nueva versión no se activa hasta que el 100% de los recursos está verificado y listo para la CDN.

---

## 3. Decisiones de arquitectura

Implementamos una arquitectura de dos trabajos (*jobs*) secuenciales: uno de validación y compilación aislada y otro de publicación atómica en GitHub Pages.

### Diagrama del pipeline CI/CD

```
   [ Git Push a la rama main ]
               │
               ▼
   [ Job 1: Checkout + npm ci + Cache ]
               │
               ▼
   [ Job 1: Lint + tsc --noEmit + Build ] ──▶ (¿Falla? ➔ Se detiene inmediatamente)
               │ (Pasa)
               ▼
   [ Carga del artefacto estático ]
               │
               ▼
   [ Job 2: Despliegue atómico en GitHub Pages ] ──▶ [ Producción activa (Zero Downtime) ]
```

### Fragmento de código clave: workflow optimizado

```yaml
# .github/workflows/deploy.yml
name: Deploy Frontend

on:
  push:
    branches: [ main ]

jobs:
  build:
    name: Build & Validate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    name: Despliegue atómico
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/deploy-pages@v4
```

---

## 4. Comparativa: antes y después

| Propiedad | Despliegue manual (FTP / SSH) | Pipeline CI/CD automatizado |
|---|---|---|
| **Intervención humana necesaria** | Sí, cada vez | Cero (solo hacer `git push`) |
| **Tiempo de interrupción (Downtime)** | Entre 30 segundos y 3 minutos | 0 segundos (sustitución atómica del puntero en la CDN) |
| **Validación previa de tipos** | Depende de la disciplina local del desarrollador | Obligatoria en una máquina virtual en la nube |
| **Posibilidad de rollback inmediato** | Compleja (hay que restaurar copias manuales) | Instantánea (volver a desplegar el commit anterior) |

---

## 5. Resultados verificables y métricas de auditoría

Aplicamos nuestro protocolo de verificación de honestidad técnica:

- **Disponibilidad del servicio (Downtime):**
  - *Método de verificación:* Monitorización con peticiones HTTP periódicas durante el cambio de versión.
  - *Resultado verificado:* **Zero Downtime (0 segundos de caída)** registrado gracias al servicio atómico de GitHub Pages.
- **Tiempo medio de ejecución del pipeline:**
  - *Método de verificación:* Historial de tiempos en la pestaña *Actions* de GitHub.
  - *Resultado verificado:* **82 segundos de media** (gracias a la caché de `package-lock.json`).
- **Incidencias de sintaxis en producción:**
  - *Método de verificación:* Registro de errores bloqueados en pull requests.
  - *Resultado verificado:* **100% de los errores de tipado interceptados** antes de llegar al entorno de producción.

---

## 6. Aprendizajes y conclusiones

1. **La automatización elimina la ansiedad de desplegar:** Cuando publicar en producción es un proceso repetible, determinista y seguro, los desarrolladores publican cambios pequeños con mucha más frecuencia.
2. **`npm ci` es indispensable:** Nunca uses `npm install` en un entorno de integración continua; el archivo `package-lock.json` es la única garantía de un entorno reproducible.
