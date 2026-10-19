---
draft: false
title: "Arquitectura Modular i Escalable en Angular amb Standalone Components i Signals"
snippet: "Guia exhaustiva d'enginyeria frontend: com dissenyar aplicacions Angular sense NgModules, utilitzant reactivitat basada en Signals, injecció amb inject() i control de flux modern."
image: {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?fit=crop&w=1200&h=630",
    alt: "Codi TypeScript en Angular i arquitectura de components"
}
publishDate: "2026-03-10 10:00"
category: "Angular"
author: "Jaume Tur"
tags: [angular, signals, standalone-components, typescript, arquitectura, clean-code]
lang: "ca"
canonicalUrl: "https://jaumetur.es/blog/arquitectura-modular-angular-standalone-signals"
---

L'ecosistema d'Angular ha experimentat la major transformació de la seua història recent. Durant anys, els desenvolupadors vam haver de conviure amb la sobrecàrrega cognitiva dels `NgModules`: fitxers de declaració interminables, dependències circulars difícils de rastrejar i una reactivitat basada exclusivament en Zone.js i RxJS per a cada xicotet canvi d'estat a la interfície.

Amb l'arribada i maduració dels **Standalone Components** i el model reactiu de **Signals**, Angular s'ha convertit en un dels frameworks més ràpids, predictibles i agradables per a desenvolupar aplicacions web d'alta concurrència.

En aquest article analitzem com dissenyem i estructurem una aplicació web empresarial moderna sense dependre de mòduls clàssics, eliminant el codi redundant i aprofitant la reactivitat atòmica.

---

## 1. El problema dels NgModules i per què abandonar-los

En l'arquitectura tradicional d'Angular, per a utilitzar un component o una canonada (pipe) calia registrar-lo prèviament en un mòdul (`@NgModule`). Açò provocava tres problemes estructurals greus:

1. **Boilerplate massiu:** La creació d'un simple component requeria modificar dos o tres fitxers addicionals (`*.module.ts`, `routing.module.ts`).
2. **Dificultat per al Tree-Shaking:** Sovint els mòduls acabaven important mòduls sencers de biblioteques de tercers, incrementant innecessàriament la grandària del paquet inicial (*bundle size*).
3. **Pèrdua de claredat en les dependències:** Era impossible saber ràpidament quins serveis o components consumia realment un component sense inspeccionar l'arbre complet de mòduls.

Amb els **Standalone Components** (`standalone: true`, per defecte en Angular modern), el component declara directament el que necessita a la seua propietat `imports`:

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
      <h3>Monitor de Connexions Actives</h3>
      <p class="stat-value">{{ connexionsActives() }}</p>
      <button (click)="actualitzarDades()">Refrescar mètriques</button>
    </div>
  `,
  styleUrls: ['./telemetria-panel.component.css']
})
export class TelemetriaPanelComponent {
  private readonly telemetriaService = inject(TelemetriaService);
  
  // Estat reactiu amb Signals
  readonly connexionsActives = signal<number>(0);

  actualitzarDades(): void {
    const noves = this.telemetriaService.obtenirMetriquesRecents();
    this.connexionsActives.set(noves.connexions);
  }
}
```

<div class="callout callout-tip">
  <strong>Consell d'enginyeria:</strong> Utilitza sempre <code>ChangeDetectionStrategy.OnPush</code> en tots els components Standalone. Combinat amb Signals, Angular actualitza exclusivament el node del DOM vinculat a la senyal sense revisar l'arbre sencer de components.
</div>

---

## 2. Signals: Reactivitat granular i atòmica

Fins fa poc, la gestió de l'estat local a Angular depenia de `BehaviorSubject` de RxJS o de propietats mutables supervisades per `Zone.js`. Zone.js funciona interceptant totes les operacions asíncrones del navegador (`setTimeout`, `fetch`, `addEventListener`), el que sol provocar cicles de detecció de canvis innecessaris arreu de l'aplicació.

Les **Signals** aporten un model de reactivitat basat en grafs de dependències. Una senyal sap exactament qui la consumeix i només notifica als consumidors directes quan el seu valor canvia.

### Primitives bàsiques de Signals

1. `signal(valorInicial)`: Contenidor d'un valor mutable reactiu.
2. `computed(() => expressio)`: Senyal derivada de només lectura que només es recalcula si alguna de les senyals que llegeix ha canviat (memoització automàtica).
3. `effect(() => operacio)`: Efecte col·lateral que s'executa automàticament quan canvien les senyals que utilitza (ideal per a sincronització amb `localStorage`, analítica o APIs externes).

Exemple en un component de gestió d'incidències:

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
      <h2>Total incidències crítiques: {{ critiquesPendents().length }}</h2>
      <span>Percentatge resoltes: {{ percentatgeResolució() }}%</span>
    </div>
  `
})
export class IncidenciesBoardComponent {
  // Estat primari
  readonly llistaIncidencies = signal<Incidencia[]>([]);

  // Estat derivat mitjançant computed()
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
    // Efecte col·lateral per a persistir en localStorage
    effect(() => {
      const estatActual = this.llistaIncidencies();
      localStorage.setItem('incidencies_backup', JSON.stringify(estatActual));
    });
  }

  afegirIncidencia(nova: Incidencia): void {
    // Actualització immutabilitat funcional amb update()
    this.llistaIncidencies.update(prev => [...prev, nova]);
  }
}
```

<div class="callout callout-warning">
  <strong>Atenció amb els efectes:</strong> Evita cridar <code>signal.set()</code> dins d'un <code>effect()</code> llevat que siga estrictament necessari i actives l'opció <code>allowSignalWrites: true</code>. En el 95% dels casos, el que necessites és una senyal derivada amb <code>computed()</code>, no un efecte manual.
</div>

---

## 3. Injecció de Dependències amb `inject()`

L'antiga injecció de dependències en el constructor (`constructor(private readonly router: Router)`) generava constructors molt llargs i dificultava l'herència de classes.

Amb la funció `inject()`, la injecció s'executa a nivell de camp, permetent crear funcions auxiliars reutilitzables (*composables*):

```typescript
import { inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

// Funció composable reutilitzable per a carregar recursos
export function useResource<T>(url: string, valorPerDefecte: T): Signal<T> {
  const http = inject(HttpClient);
  return toSignal(http.get<T>(url), { initialValue: valorPerDefecte });
}
```

Aquest patró permet modularitzar la lògica de negoci sense haver de crear serveis gegantins per a cada xicoteta crida HTTP.

---

## 4. Estructura de Carpetes Recomanada (Screaming Architecture)

Per a projectes que escalen més enllà de 50 components, recomanem organitzar el codi per funcionalitats (*feature-driven*):

```text
src/app/
├── core/                  # Serveis singleton globals, guards, interceptors
│   ├── auth/
│   ├── interceptors/
│   └── tokens/
├── shared/                # Components UI atòmics, pipes, directives
│   ├── ui-button/
│   ├── ui-modal/
│   └── ui-badge/
└── features/              # Mòduls de domini totalment independents
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

Cada funcionalitat exposa el seu propi fitxer `*.routes.ts` que es carrega de manera diferida (*lazy loading*) a l'encaminador principal:

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

## Conclusió

La combinació d'**Angular Standalone Components**, **Signals** i la funció **`inject()`** elimina la fricció històrica del framework i situa Angular al capdavant del desenvolupament web empresarial modern. Obtenim una arquitectura més modular, codi més fàcil de testar i un rendiment natiu impecable a 60 fotogrames per segon.

Si estàs planificant una migració des d'una base de codi antiga o vols auditar l'arquitectura frontend del teu equip, no dubtes a [contactar amb mi per a una sessió de consultoria](/contact).

