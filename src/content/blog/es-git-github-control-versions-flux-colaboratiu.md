---
draft: false
title: "Git y GitHub: control de versiones distribuido, estrategia trunk-based y flujo colaborativo"
snippet: "Guía completa sobre Git y GitHub: cómo Linus Torvalds lo creó en 2005 para el kernel de Linux, el funcionamiento del modelo de grafos acíclicos dirigidos (DAG), las ramas, las pull requests y GitOps."
image: {
    src: "/img/blog/git-github-control-versions-flux-colaboratiu.webp",
    alt: "Flujo de trabajo con Git y GitHub"
}
publishDate: "2026-03-24 15:00"
category: "DevOps y herramientas"
author: "Jaume Tur"
tags: [git, github, control-versiones, devops, trunk-based, gitops]
lang: "es"
canonicalUrl: "https://jaumetur.es/blog/es-git-github-control-versions-flux-colaboratiu"
---

## ¿Qué son Git y GitHub?

Aunque a menudo se mencionan juntos, **Git** y **GitHub** son dos herramientas distintas, pero complementarias:

* **Git:** Es un sistema de control de versiones distribuido (*DVCS - Distributed Version Control System*), rápido, escalable y diseñado para registrar los cambios en archivos informáticos a lo largo del tiempo, lo que permite coordinar el trabajo de varios programadores sobre una misma base de código.
* **GitHub:** Es una plataforma en la nube (propiedad de Microsoft desde 2018) que aloja repositorios de Git y ofrece herramientas de revisión de código colaborativa (*Pull Requests*), seguimiento de incidencias (*Issues*), integración y despliegue continuos (*GitHub Actions*) y documentación de proyectos.

---

## ¿Cuándo se crearon y quién los creó?

* **Creación de Git:** **Abril de 2005**. Fue ideado y programado por **Linus Torvalds** (el mismo creador del kernel de Linux). La comunidad del kernel de Linux utilizaba un sistema propietario llamado BitKeeper, pero cuando la empresa propietaria revocó la licencia gratuita, Torvalds decidió crear un sistema propio que cumpliera tres requisitos innegociables: velocidad extrema, arquitectura completamente distribuida (sin servidor central obligatorio) y garantías totales contra la corrupción de datos mediante hashes criptográficos.
* **Creación de GitHub:** **Febrero de 2008**, fundado por **Chris Wanstrath**, **PJ Hyett**, **Tom Preston-Werner** y **Scott Chacon**. Revolucionó el código abierto al convertir el desarrollo de software en una red social basada en la colaboración transparente (*forks* y *pull requests*).

---

## ¿Para qué se utilizan?

Git y GitHub son el centro neurálgico del desarrollo de software moderno:

1. **Historial inmutable y trazabilidad:** Cada cambio en el código queda asociado a un autor, una fecha, un mensaje descriptivo y un identificador único (SHA-1 / SHA-256). Esto permite auditar exactamente cuándo y por qué se introdujo cualquier línea.
2. **Trabajo concurrente con ramas (Branches):** Permite que varios ingenieros desarrollen funcionalidades aisladas en paralelo sin interferir con el código de producción.
3. **Revisión de código (Code Review):** Mediante las Pull Requests de GitHub, los compañeros de equipo pueden debatir, sugerir cambios línea por línea y aprobar el código antes de fusionarlo.
4. **GitOps e integración continua:** Ejecución automática de pruebas unitarias, comprobaciones de rendimiento con Lighthouse y despliegue en producción con cada `git push`.
5. **Copias de seguridad distribuidas:** Cada desarrollador tiene una copia completa del historial del repositorio en su ordenador local; si un servidor se cae, no se pierde nada.

---

## Arquitectura interna de Git: el grafo de commits

A diferencia de los sistemas antiguos (como SVN o CVS), que guardaban «diferencias» entre archivos, Git trata los datos como un conjunto de **instantáneas** (*snapshots*).

Git estructura la información como un grafo acíclico dirigido (DAG) con cuatro objetos fundamentales:
1. **Blob:** Contenido de un archivo (datos puros).
2. **Tree:** Representa un directorio y apunta a blobs y otros subárboles.
3. **Commit:** Contiene un puntero a un tree principal, metadatos (autor, fecha, mensaje) y punteros a los commits padre.
4. **Tag:** Una referencia fija y con nombre a un commit específico (por ejemplo, para lanzamientos de versiones `v4.0.0`).

```bash
# Flujo de trabajo estándar para nuevas funcionalidades
# 1. Crear y cambiar a una nueva rama de trabajo
git checkout -b feature/mejora-rendimiento

# 2. Añadir cambios al área de preparación (staging area)
git add src/components/hero.astro

# 3. Registrar la instantánea con un mensaje claro
git commit -m "perf: optimizar carga de imágenes del hero"

# 4. Enviar la rama a GitHub para abrir una pull request
git push origin feature/mejora-rendimiento
```

---

## Buenas prácticas: convención de commits y desarrollo trunk-based

En nuestros proyectos aplicamos la convención estándar de commits (*Conventional Commits*):
* `feat:` Nuevas funcionalidades de usuario.
* `fix:` Corrección de errores detectados.
* `perf:` Mejoras de rendimiento o reducción de solicitudes.
* `docs:` Actualización de documentación y guías técnicas.
* `test:` Añadir o corregir pruebas automatizadas.
* `refactor:` Cambios estructurales de código sin alterar el comportamiento externo.
