---
draft: false
title: "Accessibilitat Web (WCAG AA): De la Teoria a la Implementació Real amb Exemples"
snippet: "Guia pràctica d'enginyeria per a complir els criteris WCAG 2.2 nivell AA i la Directiva Europea d'Accessibilitat: gestió de focus, tecles, ARIA, ràtios de contrast i proves automatitzades."
image: {
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?fit=crop&w=1200&h=630",
    alt: "Accessibilitat digital i disseny web inclusiu"
}
publishDate: "2026-03-16 12:00"
category: "Accessibilitat"
author: "Jaume Tur"
tags: [accessibilitat, wcag, a11y, disseny-inclusiu, aria, tailwind]
lang: "ca"
canonicalUrl: "https://jaumetur.es/blog/accessibilitat-web-wcag-aa-guia-practica"
---

Durant massa anys, l'accessibilitat web (sovint anomenada **a11y**) s'ha tractat com una llista de comprovació secundària que s'afegia al final d'un projecte si quedava pressupost. Aquest paradigma ha mort.

Amb l'entrada en vigor de la **Directiva Europea d'Accessibilitat (European Accessibility Act)**, l'accessibilitat digital ha esdevingut un requisit legal d'obligat compliment per a la gran majoria de serveis digitals, comerços electrònics i aplicacions web a la Unió Europea. Però més enllà de la legislació, l'accessibilitat és un deure ètic d'enginyeria: el programari que construïm ha de poder ser utilitzat per qualsevol persona, independentment de les seues capacitats visuals, motores, auditives o cognitives.

En aquest article abordem com implementar els criteris **WCAG 2.2 Nivell AA** amb solucions de codi reals i verificades.

---

## 1. Els Quatre Principis Fonamentals (POUR)

L'estàndard WCAG es recolza en quatre pilars essencials:
- **Perceptible:** La informació i la interfície han de presentar-se de manera que els usuaris puguen percebre-la (textos alternatius, contrast suficient).
- **Operable:** Els components de la interfície han de poder ser manipulats amb qualsevol dispositiu (especialment el teclat).
- **Comprensible:** El contingut ha de ser clar i el comportament de la interfície predictible.
- **Robust:** El codi ha de ser interpretat de manera fiable per una àmplia varietat d'agents d'usuari, incloent tecnologies d'assistència (lectors de pantalla com NVDA, VoiceOver o JAWS).

---

## 2. Ràtios de Contrast de Color i Mode Fosc

El criteri d'èxit **1.4.3 (Contrast Mínim - AA)** exigeix que el text visual tinga una relació de contrast de com a mínim:
- **4.5:1** per a text normal (menys de 18pt o 14pt en negreta).
- **3.0:1** per a text gran (més de 18pt o 14pt en negreta) i elements essencials de la interfície d'usuari (vores de camps de text, icones d'acció).

A les paletes fosques de la nostra interfície, evitem fons negres purs (`#000000`) i grisos massa foscos per al text:

```css
/* Paleta accessible sobre fons fosc (#030712) */
:root {
  --bg-primary: #030712;
  --text-primary: #f9fafb;   /* Contrast 17.5:1 (Supera àmpliament AAA) */
  --text-secondary: #9ca3af; /* Contrast 7.2:1 (Supera AA) */
  --accent-blue: #3b82f6;    /* Contrast 4.6:1 per a elements actius */
  --accent-emerald: #10b981; /* Contrast 6.1:1 sobre fons fosc */
}
```

<div class="callout callout-note">
  <strong>Eina d'auditoria:</strong> Pots utilitzar la pestanya <em>Lighthouse</em> de Chrome DevTools o l'extensió <em>Colour Contrast Analyser (CCA)</em> per a verificar cada parell de colors abans d'enviar a producció.
</div>

---

## 3. Navegació Total per Teclat i Estats de Focus

Tota la funcionalitat del teu lloc web ha de ser accessible utilitzant exclusivament la tecla `Tab`, `Shift + Tab`, `Enter`, `Espai` i les tecles de fletxa.

El major error d'accessibilitat en CSS és eliminar el contorn de focus sense oferir una alternativa:
```css
/* Incorrecte: Mai faces açò */
*:focus {
  outline: none;
}

/* Correcte: Proporciona un focus visible i clar */
button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
  border-radius: 0.375rem;
}
```

---

## 4. Gestió Accessible de Finestres Modals (Focus Trap)

Quan s'obri una finestra modal de diàleg, cal complir tres regles d'accessibilitat estrictes:
1. Moure el focus automàticament al primer element interactiu de la modal.
2. Atrapar el focus dins de la modal (que l'usuari no puga fer `Tab` cap al fons de la pàgina mentre la modal està oberta).
3. Tancar la modal en prémer la tecla `Escape` i retornar el focus a l'element que la va obrir.

Exemple d'implementació nativa amb l'element HTML `<dialog>`:

```html
<dialog id="contact-modal" class="modal-dialog" aria-labelledby="modal-title">
  <div class="modal-content">
    <h2 id="modal-title">Sol·licitar Pressupost de Projecte</h2>
    <form method="dialog">
      <label for="client-email">El teu correu electrònic:</label>
      <input type="email" id="client-email" required />
      
      <div class="modal-actions">
        <button type="button" id="close-modal-btn">Cancel·lar</button>
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
    // showModal() activa automàticament el focus trap i la tecla Escape nativa
    dialog?.showModal();
  });

  closeBtn?.addEventListener('click', () => {
    dialog?.close();
  });
</script>
```

---

## 5. Respectar les Preferències de Moviment (`prefers-reduced-motion`)

Moltes persones pateixen trastorns vestibulars o mareig per moviment quan s'enfronten a animacions ràpides o transicions de zoom.

Mitjançant la mitja query CSS `prefers-reduced-motion`, desactivem automàticament les transicions innecessàries per a aquells usuaris que ho hagen configurat al seu sistema operatiu:

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

## 6. Proves Automatitzades amb `axe-core`

Podem integrar l'auditoria d'accessibilitat directament en els nostres tests de components o en el pipeline de CI/CD utilitzant la biblioteca `axe-core`:

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

## Conclusió

L'accessibilitat no és una tasca aïllada: és una cultura de qualitat de codi. Crear aplicacions accessibles millora el SEO, optimitza el rendiment i garanteix que la teua plataforma estiga preparada per a atendre el 100% dels usuaris potencials.

Vols avaluar l'accessibilitat del teu lloc web o preparar la teua plataforma per a la Directiva Europea? [Sol·licita una auditoria d'accessibilitat amb nosaltres](/contact).

