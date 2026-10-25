---
draft: false
title: "Cómo construir un portfolio de ingeniería frontend que destaque: decisiones de diseño y código"
snippet: "Qué buscan realmente los Lead Engineers y los clientes técnicos: arquitectura real, casos de estudio con métricas, rendimiento a 60 FPS, accesibilidad e integración de personalidad visual."
image: {
    src: "/img/blog/com-crear-un-portfolio-denginyeria-frontend.webp",
    alt: "Escritorio de un ingeniero de software y diseño de portfolio"
}
publishDate: "2026-03-24 10:30"
category: "Carrera"
author: "Jaume Tur"
tags: [portfolio, ingenieria-frontend, diseno-ui, astro, carrera, clean-code]
lang: "es"
canonicalUrl: "https://jaumetur.es/blog/es-com-crear-un-portfolio-denginyeria-frontend"
---

Si haces una búsqueda rápida en GitHub o Twitter de portfolios de desarrolladores web, encontrarás cientos de sitios prácticamente idénticos: la misma plantilla clonada, las típicas barras de progreso que dicen «HTML: 90 %, JavaScript: 80 %» (¿qué significa exactamente dominar el 80 % de un lenguaje?) y tres proyectos que son clones de una lista de tareas (*Todo App*), una aplicación del tiempo y una tienda ficticia con datos en memoria.

Esos portfolios no demuestran nada. No muestran cómo resuelves problemas reales, cómo tomas decisiones de arquitectura ni cómo te desenvuelves ante incidencias en producción.

Cuando rediseñé `jaumetur.es`, el objetivo estaba claro: **construir un portfolio que no pareciera un escaparate vacío, sino una pieza de ingeniería de software en sí misma**.

En este artículo detallo las decisiones estratégicas de diseño, código y contenido que marcan la diferencia entre pasar desapercibido o recibir ofertas de proyectos y contrataciones de alto nivel.

---

## 1. El contenido: casos de estudio frente a simples capturas de pantalla

Un ingeniero sénior o un cliente corporativo no te contrata porque una imagen se vea bonita; te contrata por **tu capacidad de pensar, estructurar y ejecutar soluciones técnicas**.

En lugar de poner solo una captura con un enlace al repositorio, cada proyecto principal debe responder a una estructura de caso de estudio:
1. **El contexto y el problema de negocio:** ¿Qué reto existía antes de escribir una sola línea de código? (p. ej., en AVISA, la lentitud en la coordinación de emergencias urbanas).
2. **La arquitectura técnica:** ¿Por qué elegiste esa tecnología y qué alternativas descartaste?
3. **Los cuellos de botella superados:** ¿Qué dificultad imprevista surgió y cómo la solucionaste? (p. ej., reducción de fugas de memoria en mapas, eliminación de solicitudes innecesarias).
4. **Métricas reales:** ¿Qué consiguió el proyecto una vez en producción? (p. ej., 60 FPS estables, reducción del 40 % en el tiempo de carga, 100/100 en Lighthouse).

---

## 2. La elección de la pila tecnológica: cero JavaScript innecesario

Uno de los errores más comunes es utilizar una aplicación de página única completa (como Create React App o un bundle pesado) para un sitio web que básicamente contiene contenido estático y artículos.

Para este portfolio elegí **Astro 5+** y **Tailwind CSS v4**:
- **Arquitectura de islas de Astro:** Envía cero JavaScript por defecto al cliente. Solo activa JavaScript en los componentes interactivos que realmente lo necesitan (como el generador de workflows o el filtro del blog).
- **Compilación estática ultrarrápida:** El sitio entero se compila en menos de 2 segundos y se distribuye a través de una CDN global (GitHub Pages / Cloudflare).
- **Rendimiento nativo:** Permite obtener 100 puntos en las cuatro categorías de Google Lighthouse de manera coherente y sin trucos sucios.

---

## 3. Diseño visual: personalidad sin perder rigor técnico

Un portfolio técnico no tiene que ser aburrido o gris como un documento de Word de los años 90, pero tampoco debe parecer un parque de atracciones lleno de animaciones lentas que distraigan de la lectura.

Aplicamos tres reglas visuales:
- **Tema oscuro de ingeniería (*Engineering Dark Palette*):** Fondos en `#030712`, superficies en `#0b0f19` y bordes en `#1f2937`, que recuerdan a los terminales de desarrollo modernos.
- **Integración de iconografía técnica estandarizada:** En lugar de adornos vacíos, cada elemento se integra como un icono funcional de ingeniería (Angular, rendimiento a 60 FPS, CI/CD).
- **Memojis 3D con propósito:** Los memojis actúan como anfitriones visuales: asoman por detrás de las tarjetas de proyectos o sostienen la insignia de la sección, aportando cercanía humana a un sitio con alta densidad técnica.

---

## 4. Ofrecer herramientas gratuitas y valiosas

La mejor manera de demostrar competencia es crear utilidades que la propia comunidad de desarrolladores utilice en su día a día.

En nuestro caso, creamos [/tools/workflow-generator](/tools/workflow-generator): una herramienta que permite configurar archivos de GitHub Actions para Astro, Angular y React con un solo clic. Esto no solo genera tráfico orgánico y menciones en redes sociales, sino que es una prueba real de que sabes construir interfaces interactivas útiles.

---

## 5. Tu ecosistema completo: /uses y RSS

Un desarrollador profesional es transparente con su flujo de trabajo:
- La página **/uses** (`/uses`) documenta el hardware, el software, las extensiones de VS Code y las herramientas de terminal que utilizas a diario.
- El canal **/rss.xml** permite que la comunidad más técnica siga tus artículos desde su lector de feeds favorito, sin depender de algoritmos de redes sociales.

---

## Conclusión

Tu portfolio es el proyecto más importante de tu carrera: trabaja para ti las 24 horas del día, los 7 días de la semana. Trátalo con la misma exigencia, arquitectura y rigor que aplicarías a la aplicación más crítica de tu cliente más importante.

¿Quieres mejorar la presencia digital de tu proyecto o necesitas apoyo en desarrollo frontend? [Contacta conmigo](/contact).
