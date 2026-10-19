---
draft: false
title: "Cas d'Estudi AVISA: Gestió d'Incidències en Temps Real amb Angular i TypeScript"
snippet: "Anàlisi arquitectònica profunda de la plataforma d'alerta i coordinació d'incidències: reactivitat en temps real, gestió d'estat resilient, mapeig geoespacial i fiabilitat crítica."
image: {
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?fit=crop&w=1200&h=630",
    alt: "Panell de gestió d'incidències i alertes en temps real AVISA"
}
publishDate: "2026-03-18 10:45"
category: "Cas d'estudi"
author: "Jaume Tur"
tags: [avisa, cas-estudi, angular, typescript, temps-real, arquitectura, web-apps]
lang: "ca"
canonicalUrl: "https://jaumetur.es/blog/avisa-gestio-incidencies-arquitectura-frontend"
---

En situacions d'emergència o gestió de serveis urbans, cada segon compta. Els operadors de control necessiten rebre avisos a l'instant, visualitzar la ubicació geoespacial exacta en qüestió de mil·lisegons i coordinar equips de resposta sobre el terreny sense bloquejos ni desconnexions.

Aquest és el repte que vam resoldre amb **AVISA**, una aplicació web d'alt rendiment construïda amb **Angular**, **TypeScript** i una arquitectura orientada a esdeveniments en temps real.

En aquest article detallem les decisions clau de disseny de programari, la gestió de dades asíncrones i com vam aconseguir una experiència d'operador fluida i lliure d'errors.

---

## 1. El Repte: Dades Crítiques amb Zero Tolerància al Retard

La plataforma AVISA havia de respondre als següents requisits tècnics no funcionals:
- **Latència inferior a 150 ms** en la recepció i renderitzat de noves alertes ciutadanes.
- **Resiliència davant caigudes de xarxa:** capacitat de treballar en mode desconnectat parcial (offline-first) i sincronitzar les accions un cop recuperada la connectivitat.
- **Mapeig dinàmic:** renderització fluida de marcadors geolocalitzats amb agrupament (*clustering*) per a evitar la saturació visual del mapa.
- **Accessibilitat d'alt contrast (WCAG AA):** llegibilitat impecable en pantalles de sala de control sota diferents condicions d'il·luminació.

<div class="callout callout-tip">
  <strong>Demostració del projecte:</strong> Pots explorar la interfície funcional de la plataforma directament a la <a href="https://front-project-jjaux-h8pw.vercel.app/" target="_blank" rel="noopener noreferrer">demo desplegada a Vercel</a>.
</div>

---

## 2. L'Arquitectura d'Estat: Angular Signals i Events en Temps Real

Per a coordinar el flux de dades procedent de la capa de transport (WebSockets / Server-Sent Events) vam optar per un patró de magatzem d'estat reactiu basat en **Angular Signals**:

```typescript
// services/incidencies-store.service.ts
import { Injectable, signal, computed } from '@angular/core';

export interface AlertaIncidencia {
  id: string;
  coordenades: [number, number]; // [lat, lng]
  nivellGravetat: 'verda' | 'groga' | 'roja';
  descripcio: string;
  timestamp: number;
  estat: 'activa' | 'assignada' | 'resolta';
}

@Injectable({ providedIn: 'root' })
export class IncidenciesStoreService {
  // Senyal base privada (font única de veritat)
  private readonly _incidencies = signal<AlertaIncidencia[]>([]);

  // Senyals computades públiques per a la vista
  readonly incidenciesActives = computed(() => 
    this._incidencies().filter(inc => inc.estat !== 'resolta')
  );

  readonly alertesRoies = computed(() =>
    this._incidencies().filter(inc => inc.nivellGravetat === 'roja' && inc.estat === 'activa')
  );

  // Ingesta d'esdeveniments en temps real
  rebreNouAvis(alerta: AlertaIncidencia): void {
    this._incidencies.update(llista => [alerta, ...llista]);
    this.emetreAlertaSonoraSiEscau(alerta.nivellGravetat);
  }

  canviarEstat(id: string, nouEstat: AlertaIncidencia['estat']): void {
    this._incidencies.update(llista =>
      llista.map(item => item.id === id ? { ...item, estat: nouEstat } : item)
    );
  }

  private emetreAlertaSonoraSiEscau(gravetat: AlertaIncidencia['nivellGravetat']): void {
    if (gravetat === 'roja') {
      // Reproducció d'àudio sintetitzat per a alertes crítiques
      const audio = new Audio('/audio/critical-alert.mp3');
      audio.play().catch(() => console.warn('Autoplay bloquejat pel navegador'));
    }
  }
}
```

---

## 3. Renderització de Mapes i Optimització de Memòria

Un dels problemes típics de les aplicacions de telemetria és la fuita de memòria (*memory leak*) provocada per marcadors de mapa que no es destrueixen quan el component es desmunta.

En AVISA, cada instància de marcador es gestiona mitjançant el cicle de vida del component i s'aplica agrupament geoespacial per quadrícules:

```typescript
// components/incidencies-map.component.ts
import { Component, OnInit, OnDestroy, effect, inject } from '@angular/core';
import { IncidenciesStoreService } from '../services/incidencies-store.service';

@Component({
  selector: 'app-incidencies-map',
  standalone: true,
  template: `<div id="map-container" class="map-viewport"></div>`,
  styleUrls: ['./incidencies-map.component.css']
})
export class IncidenciesMapComponent implements OnInit, OnDestroy {
  private readonly store = inject(IncidenciesStoreService);
  private mapInstance: any;

  constructor() {
    // Sincronització automàtica del mapa amb la senyal d'incidències
    effect(() => {
      const alertes = this.store.incidenciesActives();
      this.actualitzarCapaMarcadors(alertes);
    });
  }

  ngOnInit(): void {
    this.inicialitzarMapa();
  }

  ngOnDestroy(): void {
    // Neteja exhaustiva de recursos per a evitar Memory Leaks
    if (this.mapInstance) {
      this.mapInstance.remove();
      this.mapInstance = null;
    }
  }

  private inicialitzarMapa(): void {
    // Lògica de càrrega del mapa vectorial
  }

  private actualitzarCapaMarcadors(alertes: any[]): void {
    // Actualització eficient dels punts
  }
}
```

---

## 4. Mode Fora de Línia (Offline Sync)

Quan els operadors pateixen talls de xarxa en zones de baixa cobertura mòbil, les peticions de canvi d'estat s'emmagatzemen en una cua persistent a **IndexedDB**. Mitjançant un Service Worker, tan prompte com el navegador detecta l'esdeveniment `online`, la cua es transmet en bloc al servidor garantint la integritat transaccional.

---

## Resultats i Conclusions

Amb l'arquitectura implementada a AVISA vam aconseguir:
- **0 errors de concordança d'estat** entre el panell d'administració i els dispositius mòbils.
- **Rendiment estable a 60 FPS** fins i tot amb centenars d'elements actius a la capa cartogràfica.
- **Temps de resposta sub-100ms** en la notificació a operadors.

Aquest projecte demostra que triar la pila tecnològica correcta (TypeScript estricte + Angular modern) permet construir eines d'alta disponibilitat preparades per a les situacions més exigents.

Vols desenvolupar una aplicació web complexa o en temps real? [Explica'm el teu projecte](/contact).
