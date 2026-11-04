---
draft: false
title: "Caso de estudio AVISA: arquitectura frontend con Angular 18, TypeScript y PWA para una plataforma de servicios profesionales"
snippet: "Análisis arquitectónico de AVISA: plataforma web y PWA con Angular 18 Standalone, reactividad con RxJS, arquitectura modular por dominios (incidencias, ofertas de profesionales, presupuestos y chat) y despliegue en Vercel."
image: {
    src: "/img/blog/avisa-gestio-incidencies-arquitectura-frontend.webp",
    alt: "Plataforma AVISA de servicios profesionales, tareas y reformas"
}
publishDate: "2026-03-18 10:45"
category: "Caso de estudio"
author: "Jaume Tur"
tags: [avisa, caso-estudio, angular, typescript, pwa, arquitectura, web-apps]
lang: "es"
canonicalUrl: "https://jaumetur.es/blog/es-avisa-gestio-incidencies-arquitectura-frontend/"
---

En el sector de las reformas de la vivienda, las reparaciones urgentes y el mantenimiento del hogar (electricidad, fontanería, pintura, climatización y carpintería), las plataformas tradicionales suelen introducir sobrecostes opacos, comisiones abusivas por contacto y una notable falta de proximidad local.

Para abordar este reto diseñamos **AVISA**, una plataforma digital y aplicación web progresiva (PWA) construida con **Angular 18**, **TypeScript** y una arquitectura reactiva orientada a la negociación directa y transparente entre clientes y profesionales verificados de su zona.

En este artículo detallamos las decisiones técnicas clave de ingeniería frontend, la organización del código por dominios y cómo estructuramos los flujos de datos asíncronos para ofrecer una experiencia fluida tanto en dispositivos móviles como en escritorio.

---

## 1. El reto funcional y técnico

La plataforma debía resolver simultáneamente las necesidades de dos perfiles de usuario muy distintos:

1. **Clientes y particulares:** Publicar avisos o incidencias de averías y reformas en menos de dos minutos, indicar un presupuesto orientativo de referencia y recibir propuestas de especialistas contrastados sin pagar comisiones añadidas.
2. **Profesionales y autónomos:** Acceder a un tablón diario de tareas reales en su comarca, publicar paquetes de servicios a tarifa cerrada y acumular valoraciones verificadas para hacer crecer su reputación.

A nivel de ingeniería frontend, los requisitos críticos eran:
- **Enfoque Mobile-First y PWA:** Capacidad de instalar la aplicación desde el navegador mediante `@angular/service-worker` y soporte offline para consulta de tareas y chat directo.
- **Rutas y vistas por dominios desacoplados:** Separar claramente las áreas públicas (`/tasques-ofertes`, `/blog`), el panel privado del cliente (`/client`, `/avisos`) y el espacio del profesional (`/professional`).
- **Formularios reactivos con tipado estricto:** Validación de presupuestos, descripciones técnicas y datos de contacto sin fugas de tipos.

<div class="callout callout-tip">
  <strong>Demostración del proyecto:</strong> Puedes explorar la plataforma funcional directamente en la <a href="https://front-project-jjaux-h8pw.vercel.app/" target="_blank" rel="noopener noreferrer">aplicación desplegada en Vercel</a> o consultar el código fuente en <a href="https://github.com/jautur/FRONT-PROJECT-JJAUX" target="_blank" rel="noopener noreferrer">GitHub</a>.
</div>

---

## 2. Arquitectura con Angular 18 Standalone Components

Prescindimos por completo de los módulos tradicionales (`NgModules`) para adoptar componentes Standalone organizados por áreas de responsabilidad dentro de `src/app/pages`:

```
src/app/
├── core/               # Interceptores HTTP, guards de acceso y configuración global
├── models/             # Interfaces de TypeScript (Incidencia, Oferta, Pressupost, Usuari)
├── pages/
│   ├── main/           # Página principal y buscador de servicios
│   ├── tasques-ofertes/# Mercado interactivo de ofertas y tareas
│   ├── avisos/         # Creación y ciclo de vida de incidencias
│   ├── client/         # Panel privado del particular
│   ├── professional/   # Portal del autónomo (packs de servicio y presupuestos)
│   └── blog/           # Guías técnicas comarcales
├── services/           # Lógica de negocio y llamadas a la API
└── shared/             # Barra de navegación, pie y componentes reutilizables
```

---

## 3. Capa de servicios reactivos con RxJS y TypeScript

La gestión de datos se divide en servicios especializados que mantienen la coherencia del estado y gestionan las peticiones asíncronas con **RxJS**:

```typescript
// services/incidencia.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Incidencia, NovaIncidenciaDto } from '../models';

@Injectable({ providedIn: 'root' })
export class IncidenciaService {
  private readonly http = inject(HttpClient);
  private readonly _incidencies$ = new BehaviorSubject<Incidencia[]>([]);

  // Flujo observable para los componentes de la vista
  readonly incidencies$ = this._incidencies$.asObservable();

  carregarIncidencies(filtreComarca?: string): Observable<Incidencia[]> {
    const url = filtreComarca 
      ? `/api/incidencies?comarca=${encodeURIComponent(filtreComarca)}`
      : '/api/incidencies';

    return this.http.get<Incidencia[]>(url).pipe(
      tap(llista => this._incidencies$.next(llista))
    );
  }

  publicarIncidencia(dto: NovaIncidenciaDto): Observable<Incidencia> {
    return this.http.post<Incidencia>('/api/incidencies', dto).pipe(
      tap(nova => this._incidencies$.next([nova, ...this._incidencies$.value]))
    );
  }
}
```

Cada dominio funcional cuenta con su servicio específico:
- `oferta.service.ts`: Gestión del catálogo de tarifas fijas publicadas por autónomos.
- `pressupost.service.ts`: Envío, contraoferta y aceptación de presupuestos entre cliente y profesional.
- `tasca.service.ts`: Máquina de estados del trabajo (publicada, asignada, en ejecución y finalizada).
- `resenya.service.ts`: Sistema de opiniones y valoraciones contrastadas tras la finalización del servicio.

---

## 4. Experiencia PWA y rendimiento

Para garantizar que tanto clientes como profesionales puedan utilizar la herramienta sobre el terreno sin instalar pesadas aplicaciones nativas de las tiendas de apps:
- Se implementó `@angular/service-worker` con pre-caché de recursos estáticos y fuentes tipográficas.
- El manifest (`manifest.webmanifest`) permite añadir AVISA directamente a la pantalla de inicio del smartphone con barra de navegación integrada.
- El despliegue continuo en **Vercel** proporciona tiempos de respuesta ultrarrápidos gracias a la red perimetral (*Edge*).

---

## Conclusiones

La arquitectura de **AVISA** demuestra que la combinación de **Angular 18 Standalone**, tipado estricto con **TypeScript** y capacidades **PWA** permite crear marketplaces de servicios ágiles, fiables y transparentes sin la sobrecarga ni los costes de las infraestructuras tradicionales.

¿Tienes en mente un proyecto o aplicación web a medida? [Iniciemos la conversación](/contact).
