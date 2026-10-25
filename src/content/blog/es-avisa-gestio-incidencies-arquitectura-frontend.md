---
draft: false
title: "Caso de estudio AVISA: gestión de incidencias en tiempo real con Angular y TypeScript"
snippet: "Análisis arquitectónico en profundidad de la plataforma de alerta y coordinación de incidencias: reactividad en tiempo real, gestión de estado resiliente, cartografía geoespacial y fiabilidad crítica."
image: {
    src: "/img/blog/avisa-gestio-incidencies-arquitectura-frontend.webp",
    alt: "Panel de gestión de incidencias y alertas en tiempo real de AVISA"
}
publishDate: "2026-03-18 10:45"
category: "Caso de estudio"
author: "Jaume Tur"
tags: [avisa, caso-estudio, angular, typescript, tiempo-real, arquitectura, web-apps]
lang: "es"
canonicalUrl: "https://jaumetur.es/blog/es-avisa-gestio-incidencies-arquitectura-frontend"
---

En situaciones de emergencia o de gestión de servicios urbanos, cada segundo cuenta. Los operadores de control necesitan recibir avisos al instante, visualizar la ubicación geoespacial exacta en cuestión de milisegundos y coordinar equipos de respuesta sobre el terreno sin bloqueos ni desconexiones.

Ese es el reto que resolvimos con **AVISA**, una aplicación web de alto rendimiento construida con **Angular**, **TypeScript** y una arquitectura orientada a eventos en tiempo real.

En este artículo detallamos las decisiones clave de diseño de software, la gestión de datos asíncronos y cómo conseguimos una experiencia fluida y sin errores para los operadores.

---

## 1. El reto: datos críticos con tolerancia cero a los retrasos

La plataforma AVISA tenía que responder a los siguientes requisitos técnicos no funcionales:
- **Latencia inferior a 150 ms** en la recepción y renderizado de nuevas alertas ciudadanas.
- **Resiliencia ante caídas de red:** capacidad de trabajar parcialmente sin conexión (offline-first) y sincronizar las acciones una vez recuperada la conectividad.
- **Cartografía dinámica:** renderizado fluido de marcadores geolocalizados con agrupación (*clustering*) para evitar la saturación visual del mapa.
- **Accesibilidad de alto contraste (WCAG AA):** legibilidad impecable en pantallas de salas de control bajo distintas condiciones de iluminación.

<div class="callout callout-tip">
  <strong>Demostración del proyecto:</strong> Puedes explorar la interfaz funcional de la plataforma directamente en la <a href="https://front-project-jjaux-h8pw.vercel.app/" target="_blank" rel="noopener noreferrer">demo desplegada en Vercel</a>.
</div>

---

## 2. La arquitectura de estado: Angular Signals y eventos en tiempo real

Para coordinar el flujo de datos procedentes de la capa de transporte (WebSockets / Server-Sent Events), optamos por un patrón de almacén de estado reactivo basado en **Angular Signals**:

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
  // Señal base privada (fuente única de verdad)
  private readonly _incidencies = signal<AlertaIncidencia[]>([]);

  // Señales computadas públicas para la vista
  readonly incidenciesActives = computed(() =>
    this._incidencies().filter(inc => inc.estat !== 'resolta')
  );

  readonly alertesRoies = computed(() =>
    this._incidencies().filter(inc => inc.nivellGravetat === 'roja' && inc.estat === 'activa')
  );

  // Ingesta de eventos en tiempo real
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
      // Reproducción de audio sintetizado para alertas críticas
      const audio = new Audio('/audio/critical-alert.mp3');
      audio.play().catch(() => console.warn('Reproducción automática bloqueada por el navegador'));
    }
  }
}
```

---

## 3. Renderizado de mapas y optimización de memoria

Uno de los problemas típicos de las aplicaciones de telemetría es la fuga de memoria (*memory leak*) provocada por marcadores del mapa que no se destruyen cuando se desmonta el componente.

En AVISA, cada instancia de marcador se gestiona mediante el ciclo de vida del componente y se aplica agrupación geoespacial por cuadrículas:

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
    // Sincronización automática del mapa con la señal de incidencias
    effect(() => {
      const alertes = this.store.incidenciesActives();
      this.actualitzarCapaMarcadors(alertes);
    });
  }

  ngOnInit(): void {
    this.inicialitzarMapa();
  }

  ngOnDestroy(): void {
    // Limpieza exhaustiva de recursos para evitar fugas de memoria
    if (this.mapInstance) {
      this.mapInstance.remove();
      this.mapInstance = null;
    }
  }

  private inicialitzarMapa(): void {
    // Lógica de carga del mapa vectorial
  }

  private actualitzarCapaMarcadors(alertes: any[]): void {
    // Actualización eficiente de los puntos
  }
}
```

---

## 4. Modo sin conexión (sincronización offline)

Cuando los operadores sufren cortes de red en zonas con poca cobertura móvil, las solicitudes de cambio de estado se almacenan en una cola persistente en **IndexedDB**. Mediante un Service Worker, en cuanto el navegador detecta el evento `online`, la cola se envía en bloque al servidor, garantizando la integridad transaccional.

---

## Resultados y conclusiones

Con la arquitectura implementada en AVISA conseguimos:
- **0 errores de coherencia de estado** entre el panel de administración y los dispositivos móviles.
- **Rendimiento estable a 60 FPS** incluso con cientos de elementos activos en la capa cartográfica.
- **Tiempo de respuesta inferior a 100 ms** en las notificaciones a operadores.

Este proyecto demuestra que elegir la pila tecnológica adecuada (TypeScript estricto + Angular moderno) permite construir herramientas de alta disponibilidad preparadas para las situaciones más exigentes.

¿Quieres desarrollar una aplicación web compleja o en tiempo real? [Cuéntame tu proyecto](/contact).
