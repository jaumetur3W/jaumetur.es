---
draft: false
title: "AVISA — Plataforma de Servicios Profesionales, Tareas y Reformas"
subtitle: "Aplicación web y PWA con Angular 18 para conectar clientes y comunidades con profesionales verificados de reformas, instalaciones y mantenimiento."
tagline: "Plataforma digital para publicar incidencias, recibir presupuestos gratuitos sin comisiones ocultas y gestionar servicios profesionales desde el móvil o la web."
icon: "bx:wrench"
color: "red"
role: "Arquitectura frontend y desarrollo PWA"
year: "2025 – 2026"
client: "Proyecto Final DAW / Servicios y Reformas"
badge: "Aplicación web · PWA Móvil"
statLabel: "Métrica verificada"
statValue: "Angular 18 · PWA 24/7"
verificationMethod: "Código fuente verificado en GitHub (FRONT-PROJECT-JJAUX) y despliegue real en Vercel"
liveUrl: "https://front-project-jjaux-h8pw.vercel.app/"
githubUrl: "https://github.com/jautur/FRONT-PROJECT-JJAUX"
stack: ["Angular 18", "TypeScript 5.4", "PWA Service Worker", "RxJS", "Reactive Forms", "Vercel Edge"]
order: 1
image: {
  src: "/img/avisa-logo.png",
  alt: "Plataforma AVISA de servicios profesionales, tareas y reformas del hogar"
}
---

## 1. El problema y el contexto real

En el sector de las reformas del hogar, las reparaciones urgentes y el mantenimiento de instalaciones (fontanería, electricidad, pintura, carpintería, climatización y albañilería), los canales tradicionales y las grandes plataformas intermediarias generan fricciones graves:

- **Comisiones abusivas y sobrecostes opacos:** Muchas plataformas tradicionales encarecen el precio final con comisiones por contacto o porcentajes sobre el trabajo que perjudican tanto al cliente como al profesional autónomo.
- **Falta de confianza y proximidad:** Dificultad para encontrar especialistas locales de confianza, con teléfono directo, valoraciones reales de vecinos de la zona y perfiles revisados.
- **Pérdida de tiempo en la gestión:** Colas telefónicas, formularios largos desconectados o presupuestos que tardan semanas en llegar.

El propósito de **AVISA** fue diseñar una plataforma digital directa, transparente y ágil, con una experiencia adaptada al móvil (PWA), centrada inicialmente en las comarcas valencianas (la Costera, la Safor, la Vall d'Albaida y la Ribera): conectar directamente a personas que tienen una avería o proyecto con profesionales verificados, sin intermediarios innecesarios.

---

## 2. Qué ofrece la plataforma

AVISA articula dos perfiles de usuario complementarios mediante una interfaz intuitiva:

### Para clientes y comunidades de vecinos
- **Publicación ágil y gratuita:** Describir la incidencia o necesidad de reforma en menos de 2 minutos e indicar el presupuesto de referencia.
- **Sin comisiones ocultas:** Precios justos acordados libremente entre cliente y profesional, sin letra pequeña.
- **Profesionales verificados:** Fontaneros, electricistas, carpinteros, instaladores y albañiles con perfiles revisados, contacto directo y reseñas públicas.
- **Contratación de packs de servicios:** Posibilidad de contratar directamente servicios a tarifa cerrada o solicitar presupuesto personalizado.

### Para profesionales y autónomos
- **Bolsa de tareas e incidencias en tiempo real:** Acceso diario a peticiones reales de su comarca.
- **Publicación de packs de ofertas:** Catálogo de servicios de tarifa fija para que los clientes contraten directamente.
- **Construcción de reputación:** Historial de tareas finalizadas y valoraciones verificadas para aumentar la fiabilidad.

### Experiencia móvil sincronizada (PWA)
- Toda la gestión desde el dispositivo móvil: notificaciones instantáneas cuando hay respuesta, chat directo para acordar detalles, fotos de la obra o fechas, y registro de tareas.

---

## 3. Decisiones de arquitectura frontend

El frontend está construido con **Angular 18** siguiendo las mejores prácticas de arquitectura modular moderna:

### Standalone Components y enrutado basado en dominios
Se prescinde de los módulos monolíticos clásicos (`NgModules`) para adoptar componentes Standalone agrupados por dominios funcionales:
- `/tasques-ofertes`: tablón de exploración y mercado de ofertas profesionales e incidencias.
- `/avisos`: gestión del ciclo de vida de incidencias para particulares.
- `/professional`: área privada del profesional autónomo con gestión de ofertas y presupuestos.
- `/client`: área de seguimiento para particulares.
- `/blog`: guías técnicas comarcales (boletines eléctricos CIE, cal en las cuencas del Xúquer, aislamiento térmico y cerraduras antibumping).

### Servicios especializados y flujos de datos
La capa lógica se estructura en servicios dedicados con **RxJS** y tipado estricto de TypeScript:
- `incidencia.service.ts`: creación, filtrado y seguimiento de incidencias de clientes.
- `oferta.service.ts`: publicación y gestión de packs de servicios de profesionales.
- `pressupost.service.ts` y `proposta.service.ts`: envío y aceptación de presupuestos.
- `tasca.service.ts`: ciclo de estado de los trabajos contratados.
- `resenya.service.ts`: recogida y auditoría de valoraciones verificadas.
- `usuari.service.ts`: autenticación y control de acceso según roles (`client`, `professional`, `admin`).

### Soporte Progressive Web App (PWA)
Gracias a `@angular/service-worker` y `manifest.webmanifest`, la aplicación es instalable directamente desde el navegador del móvil, con carga instantánea de los activos y comportamiento optimizado para pantallas táctiles.

---

## 4. Estructura técnica del repositorio

```
front-project-jjaux/
├── src/
│   ├── app/
│   │   ├── core/           # Interceptores, guards de autenticación y configuración global
│   │   ├── models/         # Interfaces TypeScript (Usuari, Incidencia, Oferta, Pressupost)
│   │   ├── pages/          # Vistas Standalone (main, tasques-ofertes, avisos, client, professional, blog)
│   │   ├── services/       # Servicios reactivos (incidencia, oferta, presupuesto, reseña, usuario)
│   │   └── shared/         # Componentes reutilizables, navbar, footer y maquetación
│   ├── styles.css          # Diseño corporativo con paleta oscura, carmesí neón (#ff1744) y tipografía moderna
│   └── manifest.webmanifest# Metadatos de PWA para instalación móvil
├── package.json            # Angular 18.2, TypeScript 5.4, RxJS 7.6, Service Worker
└── angular.json             # Configuración del compilador y pipeline de producción
```

---

## 5. Resultados y acceso público

- **Demostración en línea:** La aplicación está completamente desplegada y operativa en la red perimetral de Vercel: [front-project-jjaux-h8pw.vercel.app](https://front-project-jjaux-h8pw.vercel.app/).
- **Código fuente:** El repositorio oficial con el historial completo de commits está disponible en GitHub: [github.com/jautur/FRONT-PROJECT-JJAUX](https://github.com/jautur/FRONT-PROJECT-JJAUX).
- **Identidad visual:** Logotipo corporativo oficial con isotipo de arco y acabado carmesí sobre fondo oscuro técnico.
