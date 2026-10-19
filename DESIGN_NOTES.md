# 🎨 DESIGN_NOTES — Redisseny Visual & Sistema d'Emojis Integrats

**Projecte:** Portfolio Personal de Jaume Tur ([jaumetur.es](https://jaumetur.es/))  
**Rol:** Senior Product Designer + Creative Frontend Developer  
**Data:** 19 d'octubre de 2026  

---

## 1. Diagnòstic Visual Inicial

### Què funcionava bé
- **Fonaments tècnics sòlids:** Astro + Tailwind CSS v4 compilen en menys de 2 segons generant HTML pur i lleuger.
- **Rendiment:** Fons 3D interactiu amb Three.js optimitzat (pausa amb `visibilitychange`, límit de FPS).
- **Missatge clau definit:** Desenvolupador frontend enfocat en Angular, TypeScript, WCAG AA i CI/CD.

### Què calia millorar
- **Emojis com a elements aïllats:** Els emojis i memojis s'utilitzaven sovint com a adhesius o decoració "enganxada" per sobre, sense relació estructural amb els objectes de la interfície.
- **Manca d'identitat tàctil:** Les targetes mancaven d'un "segell" visual que permetera identificar d'una ullada el propòsit de cada projecte.
- **Manca de microinteraccions:** La web transmetia rigor però poca calidesa dinàmica al hover o a la interacció.

---

## 2. Mini Design System

### 2.1 Paleta de Color Calibrada (60-30-10)
- **Canvas Base:** `#F8FAFC` (`slate-50`) off-white per evitar el blanc cru.
- **Superfícies de Targeta:** `#FFFFFF` pur amb vora `border-slate-200/90` i ombres físiques de contacte.
- **Superfícies Dark Tech:** `#090D16` (`slate-950` profund) amb accents lluminosos.
- **Brand Accent:** `#4F46E5` (`indigo-600`) per a accions primàries, enllaços actius i focus.
- **Semantic Live Pulses:**
  - `🟢` `#10B981` (`emerald-500`): En línia, producció, estat actiu.
  - `⚡` `#F59E0B` (`amber-500`): 60 FPS, velocitat, renderitzat.
  - `🛡️` `#0EA5E9` (`sky-500`): Zero downtime, accessibilitat, tipat.

### 2.2 Tipografia & Escala
- **Display / Títols:** `Bricolage Grotesque Variable` (caràcter tècnic, contemporani i accessible).
- **Body / Descripcions:** `Inter Variable` (màxima llegibilitat tipogràfica).
- **Codi & Dades:** `JetBrains Mono` / `ui-monospace` per a mètriques i JSON payloads.

### 2.3 Motion & 60 FPS Physics
- Microinteraccions basades en `transform: translateY(-2px)` i `scale(1.02)`.
- Compatibilitat estricta amb `@media (prefers-reduced-motion: reduce)`: sense animacions invasives per a usuaris amb sensibilitat al moviment.

---

## 3. Mapa d'Integració d'Emojis & Memojis

| Ubicació | Element / Objecte | Emoji / Memoji Associat | Funció Dissenyada |
| :--- | :--- | :--- | :--- |
| **Hero Stats** | 60 FPS | `⚡` | Icona de velocitat amb microbot al hover. |
| **Hero Stats** | WCAG AA | `♿` | Icona d'accessibilitat certificada. |
| **Hero Stats** | CI/CD | `🔁` | Rotació suau al hover representant cicle continu. |
| **Hero Stats** | TypeScript | `🧩` | Peces encaixades per a tipat estricte. |
| **Hero Visual** | Memoji 4 (Saludant) | `4.png` + `👋` | Asoma per darrere de la consola de codi saludant al visitant. |
| **Terminal** | `developer.profile` | `🟢` + `👨‍💻` | Indicador de disponibilitat actiu en temps real. |
| **Stack Strip** | Tecnologies (9 chips) | `🅰️ 🟦 🟨 🎨 🌐 🟢 🤖 🐧 🔀` | Cada tecnologia té la seua insígnia emoji tàctil interactiva. |
| **Projecte 1** | AVISA | `🚨` (Segell cantoner) | Icona d'alerta/incidències amb insígnia `🌐 DEMO EN LÍNIA`. |
| **Projecte 2** | Pizzeria a Xàtiva | `🍕` (Segell cantoner) | Segell gastronòmic amb botó de comandes i `🟢 EN PRODUCCIÓ`. |
| **Projecte 3** | Telemetria | `📊` (Segell cantoner) | Tauler de mètriques amb insígnia `⚡ 60 FPS FLUID`. |
| **Projecte 4** | Pipeline CI/CD | `🚀` (Segell cantoner) | Coet de desplegaments amb insígnia `🛡️ ZERO DOWNTIME`. |
| **Projectes** | Memoji 7 (Programant) | `7.png` + `💻` | Ancorat a la capçalera de secció supervisant el codi. |
| **Diagrama** | Trigger / Executor | `📤 📦 ⚙️ 🌍` | Nodos connectats amb pols de dades animat. |
| **Habilitats** | 4 Columnes Stack | `🎨 🔌 🤖 🛡️` | Capçaleres temàtiques per a cada àrea d'enginyeria. |
| **Metodologia** | 4 Fases de treball | `📋 🎨 💻 ✅` | Línia temporal iterativa amb segell `✅ Fase verificada`. |
| **Metodologia** | Memoji 2 (Polze amunt) | `2.png` + `👍` | Certificant la qualitat del procés d'enginyeria. |
| **CTA** | Banner de Contacte | `✨` + `🤙` + `3.png` | Memoji 3 fent el gest de telefonar connectat a l'email. |
| **Navegació** | Botons d'acció | `📄 CV` + `💬 Contactar` | Botons funcionals d'alta conversió. |
| **Logo** | Easter Egg interactiu | `⚡ 💻 🚀 🎨` | En fer clic al monograma `<JT/>` es genera una pluja d'emojis. |
| **Footer** | Comiat & Tornar a dalt | `😉` (`6.png`) + `🔝 Dalt` | Tancament càlid amb memoji picant l'ullet. |

---

## 4. Criteris d'Accessibilitat (WCAG AA)
1. **Semàntica d'emojis:** Tots els emojis purament decoratius s'etiqueten amb `aria-hidden="true"` per no interferir en lectors de pantalla.
2. **Emojis funcionals:** Quan un emoji acompanya un enllaç o botó, s'acompanya de text explícit o `aria-label`.
3. **Contrast cromàtic:** Ratios de contrast sempre superiors a 4.5:1 (text normal) i 3:1 (text gran i components d'interfície).
