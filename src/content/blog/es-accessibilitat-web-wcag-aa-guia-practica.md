---
draft: false
title: "Accesibilidad web (WCAG AA): de la teoría a la implementación real con ejemplos"
snippet: "Guía práctica de ingeniería para cumplir los criterios WCAG 2.2 de nivel AA y la Directiva Europea de Accesibilidad: gestión del foco, teclado, ARIA, ratios de contraste y pruebas automatizadas."
image: {
    src: "/img/blog/accessibilitat-web-wcag-aa-guia-practica.webp",
    alt: "Accesibilidad digital y diseño web inclusivo"
}
publishDate: "2026-03-16 12:00"
category: "Accesibilidad"
author: "Jaume Tur"
tags: [accesibilidad, wcag, a11y, diseno-inclusivo, aria, tailwind]
lang: "es"
canonicalUrl: "https://jaumetur.es/blog/es-accessibilitat-web-wcag-aa-guia-practica"
---

Durante demasiados años, la accesibilidad web (a menudo denominada **a11y**) se ha tratado como una lista de comprobación secundaria que se añadía al final de un proyecto si quedaba presupuesto. Ese paradigma ha muerto.

Con la entrada en vigor de la **Directiva Europea de Accesibilidad (European Accessibility Act)**, la accesibilidad digital se ha convertido en un requisito legal de obligado cumplimiento para la gran mayoría de servicios digitales, comercios electrónicos y aplicaciones web de la Unión Europea. Pero, más allá de la legislación, la accesibilidad es un deber ético de la ingeniería: el software que construimos debe poder utilizarlo cualquier persona, independientemente de sus capacidades visuales, motoras, auditivas o cognitivas.

En este artículo abordamos cómo implementar los criterios **WCAG 2.2 de nivel AA** con soluciones de código reales y verificadas.

---

## 1. Los cuatro principios fundamentales (POUR)

El estándar WCAG se apoya en cuatro pilares esenciales:
- **Perceptible:** La información y la interfaz deben presentarse de manera que los usuarios puedan percibirlas (textos alternativos, contraste suficiente).
- **Operable:** Los componentes de la interfaz deben poder manejarse con cualquier dispositivo (especialmente con el teclado).
- **Comprensible:** El contenido debe ser claro y el comportamiento de la interfaz, predecible.
- **Robusto:** El código debe interpretarse de forma fiable en una amplia variedad de agentes de usuario, incluidas las tecnologías de asistencia (lectores de pantalla como NVDA, VoiceOver o JAWS).

---

## 2. Ratios de contraste de color y modo oscuro

El criterio de éxito **1.4.3 (Contraste mínimo - AA)** exige que el texto visual tenga una relación de contraste de al menos:
- **4.5:1** para texto normal (menos de 18 pt o 14 pt en negrita).
- **3.0:1** para texto grande (más de 18 pt o 14 pt en negrita) y elementos esenciales de la interfaz de usuario (bordes de campos de texto, iconos de acción).

En las paletas oscuras de nuestra interfaz, evitamos los fondos negros puros (`#000000`) y los grises demasiado oscuros para el texto:

```css
/* Paleta accesible sobre fondo oscuro (#030712) */
:root {
  --bg-primary: #030712;
  --text-primary: #f9fafb;   /* Contraste 17,5:1 (supera ampliamente AAA) */
  --text-secondary: #9ca3af; /* Contraste 7,2:1 (supera AA) */
  --accent-blue: #3b82f6;    /* Contraste 4,6:1 para elementos activos */
  --accent-emerald: #10b981; /* Contraste 6,1:1 sobre fondo oscuro */
}
```

<div class="callout callout-note">
  <strong>Herramienta de auditoría:</strong> Puedes utilizar la pestaña <em>Lighthouse</em> de Chrome DevTools o la extensión <em>Colour Contrast Analyser (CCA)</em> para verificar cada pareja de colores antes de publicar en producción.
</div>

---

## 3. Navegación completa con teclado y estados de foco

Toda la funcionalidad de tu sitio web debe ser accesible utilizando exclusivamente las teclas `Tab`, `Shift + Tab`, `Enter`, `Espacio` y las teclas de flecha.

El mayor error de accesibilidad en CSS es eliminar el contorno de foco sin ofrecer una alternativa:
```css
/* Incorrecto: nunca hagas esto */
*:focus {
  outline: none;
}

/* Correcto: proporciona un foco visible y claro */
button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
  border-radius: 0.375rem;
}
```

---

## 4. Gestión accesible de ventanas modales (focus trap)

Cuando se abra una ventana modal de diálogo, hay que cumplir tres reglas estrictas de accesibilidad:
1. Mover el foco automáticamente al primer elemento interactivo de la ventana modal.
2. Mantener el foco dentro de la ventana modal (que el usuario no pueda pulsar `Tab` para ir al fondo de la página mientras la ventana esté abierta).
3. Cerrar la ventana modal al pulsar la tecla `Escape` y devolver el foco al elemento que la abrió.

Ejemplo de implementación nativa con el elemento HTML `<dialog>`:

```html
<dialog id="contact-modal" class="modal-dialog" aria-labelledby="modal-title">
  <div class="modal-content">
    <h2 id="modal-title">Solicitar presupuesto para el proyecto</h2>
    <form method="dialog">
      <label for="client-email">Tu correo electrónico:</label>
      <input type="email" id="client-email" required />

      <div class="modal-actions">
        <button type="button" id="close-modal-btn">Cancelar</button>
        <button type="submit" class="btn-primary">Enviar</button>
      </div>
    </form>
  </div>
</dialog>

<script>
  const dialog = document.getElementById('contact-modal');
  const openBtn = document.getElementById('open-dialog-btn');
  const closeBtn = document.getElementById('close-modal-btn');

  openBtn?.addEventListener('click', () => {
    // showModal() activa automáticamente la contención del foco y el cierre nativo con Escape
    dialog?.showModal();
  });

  closeBtn?.addEventListener('click', () => {
    dialog?.close();
  });
</script>
```

---

## 5. Respetar las preferencias de movimiento (`prefers-reduced-motion`)

Muchas personas sufren trastornos vestibulares o mareos por movimiento cuando se enfrentan a animaciones rápidas o transiciones de zoom.

Mediante la media query CSS `prefers-reduced-motion`, desactivamos automáticamente las transiciones innecesarias para los usuarios que lo hayan configurado en su sistema operativo:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 6. Pruebas automatizadas con `axe-core`

Podemos integrar la auditoría de accesibilidad directamente en nuestras pruebas de componentes o en el pipeline de CI/CD utilizando la biblioteca `axe-core`:

```typescript
import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('La pàgina principal no ha de tenir violacions WCAG AA detectables', async ({ page }) => {
  await page.goto('http://localhost:4321');

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
```

---

## Conclusión

La accesibilidad no es una tarea aislada: es una cultura de calidad del código. Crear aplicaciones accesibles mejora el SEO, optimiza el rendimiento y garantiza que tu plataforma esté preparada para atender al 100 % de los usuarios potenciales.

¿Quieres evaluar la accesibilidad de tu sitio web o preparar tu plataforma para la Directiva Europea? [Solicita una auditoría de accesibilidad con nosotros](/contact).
