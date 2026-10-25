---
draft: false
title: "Arquitectura modular y escalable en Angular con Standalone Components y Signals"
snippet: "Guía exhaustiva de ingeniería frontend: cómo diseñar aplicaciones Angular sin NgModules, utilizando reactividad basada en Signals, inyección con inject() y control de flujo moderno."
image: {
    src: "/img/blog/es-arquitectura-modular-angular-standalone-signals.webp",
    alt: "Código TypeScript en Angular y arquitectura de componentes"
}
publishDate: "2026-03-10 10:00"
category: "Angular"
author: "Jaume Tur"
tags: [angular, signals, standalone-components, typescript, arquitectura, clean-code]
lang: "es"
canonicalUrl: "https://jaumetur.es/blog/es-arquitectura-modular-angular-standalone-signals"
---

El ecosistema de Angular ha experimentado la mayor transformación de su historia reciente. Durante años, los desarrolladores tuvimos que convivir con la sobrecarga cognitiva de los `NgModules`: archivos de declaración interminables, dependencias circulares difíciles de rastrear y una reactividad basada exclusivamente en Zone.js y RxJS para cada pequeño cambio de estado en la interfaz.

Con la llegada y maduración de los **Standalone Components** y el modelo reactivo de **Signals**, Angular se ha convertido en uno de los frameworks más rápidos, predecibles y agradables para desarrollar aplicaciones web de alta concurrencia.

En este artículo analizamos cómo diseñamos y estructuramos una aplicación web empresarial moderna sin depender de módulos clásicos, eliminando el código redundante y aprovechando la reactividad atómica.

---

## 1. El problema de los NgModules y por qué abandonarlos

En la arquitectura tradicional de Angular, para utilizar un componente o una tubería (pipe) era necesario registrarlo previamente en un módulo (`@NgModule`). Esto provocaba tres problemas estructurales graves:

1. **Boilerplate masivo:** La creación de un simple componente requería modificar dos o tres archivos adicionales (`*.module.ts`, `routing.module.ts`).
2. **Dificultad para el Tree-Shaking:** A menudo los módulos acababan importando módulos enteros de bibliotecas de terceros, incrementando innecesariamente el tamaño del paquete inicial (*bundle size*).
3. **Pérdida de claridad en las dependencias:** Era imposible saber rápidamente qué servicios o componentes consumía realmente un componente sin inspeccionar el árbol completo de módulos.

Con los **Standalone Components** (`standalone: true`, por defecto en Angular moderno), el componente declara directamente lo que necesita en su propiedad `imports`:

```typescript
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelemetriaService } from '../services/telemetria.service';

@Component({
  selector: 'app-telemetria-panel',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="panel-card">
      <h3>Monitor de conexiones activas</h3>
      <p class="stat-value">{{ connexionsActives() }}</p>
      <button (click)="actualitzarDades()">Actualizar métricas</button>
    </div>
  `,
  styleUrls: ['./telemetria-panel.component.css']
})
export class TelemetriaPanelComponent {
  private readonly telemetriaService = inject(TelemetriaService);
  
  // Estado reactivo con Signals
  readonly connexionsActives = signal<number>(0);

  actualitzarDades(): void {
    const noves = this.telemetriaService.obtenirMetriquesRecents();
    this.connexionsActives.set(noves.connexions);
  }
}
```

<div class="callout callout-tip">
  <strong>Consejo de ingeniería:</strong> Utiliza siempre <code>ChangeDetectionStrategy.OnPush</code> en todos los componentes Standalone. Combinado con Signals, Angular actualiza exclusivamente el nodo del DOM vinculado a la señal sin revisar el árbol entero de componentes.
</div>

---

## 2. Signals: reactividad granular y atómica

Hasta hace poco, la gestión del estado local en Angular dependía de `BehaviorSubject` de RxJS o de propiedades mutables supervisadas por `Zone.js`. Zone.js funciona interceptando todas las operaciones asíncronas del navegador (`setTimeout`, `fetch`, `addEventListener`), lo que suele provocar ciclos de detección de cambios innecesarios en toda la aplicación.

Las **Signals** aportan un modelo de reactividad basado en grafos de dependencias. Una señal sabe exactamente quién la consume y solo notifica a los consumidores directos cuando su valor cambia.

### Primitivas básicas de Signals

1. `signal(valorInicial)`: Contenedor de un valor mutable reactivo.
2. `computed(() => expresión)`: Señal derivada de solo lectura que solo se recalcula si alguna de las señales que lee ha cambiado (memoización automática).
3. `effect(() => operación)`: Efecto colateral que se ejecuta automáticamente cuando cambian las señales que utiliza (ideal para sincronización con `localStorage`, analítica o APIs externas).

Ejemplo en un componente de gestión de incidencias:

```typescript
import { Component, signal, computed, effect } from '@angular/core';

interface Incidencia {
  id: string;
  titol: string;
  estat: 'pendent' | 'en_proces' | 'resolta';
  prioritat: 'baixa' | 'mitjana' | 'alta';
}

@Component({
  selector: 'app-incidencies-board',
  standalone: true,
  template: `
    <div class="board-header">
      <h2>Total de incidencias críticas: {{ critiquesPendents().length }}</h2>
      <span>Porcentaje resuelto: {{ percentatgeResolució() }}%</span>
    </div>
  `
})
export class IncidenciesBoardComponent {
  // Estado primario
  readonly llistaIncidencies = signal<Incidencia[]>([]);

  // Estado derivado mediante computed()
  readonly critiquesPendents = computed(() => {
    return this.llistaIncidencies().filter(
      item => item.prioritat === 'alta' && item.estat !== 'resolta'
    );
  });

  readonly percentatgeResolució = computed(() => {
    const total = this.llistaIncidencies().length;
    if (total === 0) return 0;
    const resoltes = this.llistaIncidencies().filter(i => i.estat === 'resolta').length;
    return Math.round((resoltes / total) * 100);
  });

  constructor() {
    // Efecto colateral para persistir en localStorage
    effect(() => {
      const estatActual = this.llistaIncidencies();
      localStorage.setItem('incidencies_backup', JSON.stringify(estatActual));
    });
  }

  afegirIncidencia(nova: Incidencia): void {
    // Actualización inmutable funcional con update()
    this.llistaIncidencies.update(prev => [...prev, nova]);
  }
}
```

<div class="callout callout-warning">
  <strong>Cuidado con los efectos:</strong> Evita llamar a <code>signal.set()</code> dentro de un <code>effect()</code> salvo que sea estrictamente necesario y actives la opción <code>allowSignalWrites: true</code>. En el 95 % de los casos, lo que necesitas es una señal derivada con <code>computed()</code>, no un efecto manual.
</div>

---

## 3. Inyección de dependencias con `inject()`

La antigua inyección de dependencias en el constructor (`constructor(private readonly router: Router)`) generaba constructores muy largos y dificultaba la herencia de clases.

Con la función `inject()`, la inyección se ejecuta a nivel de campo, lo que permite crear funciones auxiliares reutilizables (*composables*):

```typescript
import { inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

// Función composable reutilizable para cargar recursos
export function useResource<T>(url: string, valorPerDefecte: T): Signal<T> {
  const http = inject(HttpClient);
  return toSignal(http.get<T>(url), { initialValue: valorPerDefecte });
}
```

Este patrón permite modularizar la lógica de negocio sin tener que crear servicios gigantescos para cada pequeña petición HTTP.

---

## 4. Estructura de carpetas recomendada (Screaming Architecture)

Para proyectos que escalan más allá de 50 componentes, recomendamos organizar el código por funcionalidades (*feature-driven*):

```text
src/app/
├── core/                  # Servicios singleton globales, guards, interceptors
│   ├── auth/
│   ├── interceptors/
│   └── tokens/
├── shared/                # Componentes UI atómicos, pipes, directivas
│   ├── ui-button/
│   ├── ui-modal/
│   └── ui-badge/
└── features/              # Módulos de dominio totalmente independientes
    ├── telemetria/
    │   ├── components/
    │   ├── services/
    │   ├── telemetria.routes.ts
    │   └── telemetria.page.ts
    └── incidencies/
        ├── components/
        ├── services/
        └── incidencies.routes.ts
```

Cada funcionalidad expone su propio archivo `*.routes.ts`, que se carga de forma diferida (*lazy loading*) en el enrutador principal:

```typescript
// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'telemetria',
    loadChildren: () => import('./features/telemetria/telemetria.routes').then(m => m.TELEMETRIA_ROUTES),
  },
  {
    path: 'incidencies',
    loadChildren: () => import('./features/incidencies/incidencies.routes').then(m => m.INCIDENCIES_ROUTES),
  },
  { path: '', redirectTo: 'telemetria', pathMatch: 'full' }
];
```

---

## Conclusión

La combinación de **Angular Standalone Components**, **Signals** y la función **`inject()`** elimina la fricción histórica del framework y sitúa a Angular a la vanguardia del desarrollo web empresarial moderno. Obtenemos una arquitectura más modular, código más fácil de probar y un rendimiento nativo impecable a 60 fotogramas por segundo.

Si estás planificando una migración desde una base de código antigua o quieres auditar la arquitectura frontend de tu equipo, no dudes en [contactar conmigo para una sesión de consultoría](/contact).
