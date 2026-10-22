---
draft: false
title: "Pizzeria a Xàtiva — Presència Digital i SEO Local"
subtitle: "Redisseny integral de l'experiència digital d'un negoci gastronòmic tradicional: càrrega instantània, menú interactiu i canal directe de comandes."
tagline: "De PDFs feixucs de 15MB a una interfície de 85KB d'HTML/CSS pur amb esquema semàntic Restaurant per a Google Maps."
icon: "bx:restaurant"
color: "amber"
role: "Product Designer & Frontend Developer"
year: "2025"
client: "Pizzeria a Xàtiva (Comarca de La Costera)"
badge: "Landing Page · En Producció"
statLabel: "Mètrica Verificada"
statValue: "100/100 Lighthouse / SEO Local"
verificationMethod: "Auditoria Google Lighthouse Mòbil & Proves de cerca a Google Maps"
liveUrl: "https://jautur.github.io/pizzeria_xativa/"
githubUrl: "https://github.com/jautur/pizzeria_xativa"
stack: ["HTML5 Semàntic", "Tailwind CSS v4", "SEO Local", "Schema.org JSON-LD", "WhatsApp API", "WebP/AVIF"]
order: 2
image: {
  src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?fit=crop&w=1200&h=630",
  alt: "Pizzeria artesana i disseny web gastronòmic a Xàtiva"
}
---

## 1. El Problema i el Context

Els restaurants i pizzeries locals solen dependre gairebé en exclusiva de xarxes socials o plataformes d'enviament de tercers que cobren comissions de fins al 30% per comanda. 

Quan els usuaris busquen a Google *"on sopar a Xàtiva"* o *"pizzeria a Xàtiva"*, solen trobar:
- **Cartes en PDF pesats:** Fitxers de més de 10 MB impossibles d'obrir ràpidament amb connexions 4G al carrer.
- **Dades de contacte desactualitzades:** Horaris incorrectes i manca de botons de reserva immediata.
- **Pèssima experiència mòbil:** Webs antigues en Flash o WordPress saturats de connectors que triguen més de 6 segons a carregar.

El repte va ser dotar la **Pizzeria a Xàtiva** d'una identitat digital pròpia, ultral-lleugera, optimitzada per a cercadors locals i amb un canal de reserva sense intermediaris.

---

## 2. El Repte Tècnic

1. **Càrrega sub-segon en dispositius mòbils de gamma mitjana:** Optimització extrema dels actius multimèdia per a assegurar un LCP inferior a 1 segon en 4G.
2. **Eliminació del deute tècnic del PDF:** Construir un menú estructurat en HTML accessible que permeta als clients llegir ingredients i al·lèrgens sense descarregar cap fitxer.
3. **SEO Local estructurat per a aparèixer en Google Maps:** Configuració rigorosa de dades `Restaurant`, geolocalització, horaris d'obertura i rang de preus.

---

## 3. Decisions d'Arquitectura

Vam prescindir de qualsevol Single Page Application pesada en favor d'una arquitectura estàtica basada en **HTML5 semàntic i Tailwind CSS v4**.

### Diagrama del Flux de Conversió de l'Usuari

```
   [ Cerca Local: "Pizzeria Xàtiva" ] ──▶ [ Snippet Google Maps (JSON-LD) ]
                                                        │
                                                        ▼
                                             [ Landing Page (< 85KB) ]
                                                        │
                              ┌─────────────────────────┴─────────────────────────┐
                              ▼                                                   ▼
                    [ Consulta Menú HTML ]                            [ Clic Comanda WhatsApp ]
```

### Fragment de Codi Clau: Dades Estructurades (Schema.org)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Pizzeria a Xàtiva",
  "image": "https://jaumetur.es/pizzeria-cover.webp",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Carrer Major",
    "addressLocality": "Xàtiva",
    "addressRegion": "València",
    "postalCode": "46800",
    "addressCountry": "ES"
  },
  "servesCuisine": ["Italiana", "Pizza artesana"],
  "priceRange": "€€",
  "telephone": "+34960000000"
}
</script>
```

---

## 4. Comparativa: Abans vs Després

| Mètrica / Propietat | Situació Prèvia (Carta en PDF) | Nova Solució Web |
|---|---|---|
| **Pes total de descàrrega** | 12.4 MB (fitxer PDF) | 84 KB (HTML + CSS comprimit) |
| **Temps de primer renderitzat (LCP)** | ~5.8s en 4G | 0.7s en 4G |
| **Indexabilitat del contingut** | Text bloquejat dins d'una imatge/PDF | Text HTML rastrejable per Googlebot |
| **Fricció per a demanar** | L'usuari havia de copiar el telèfon a mà | Botó directe a WhatsApp amb missatge preconfigurat |

---

## 5. Resultats Verificables i Mètriques d'Auditoria

Apliquem el nostre protocol de verificació d'honestedat tècnica:

- **Rendiment Google Lighthouse (Mòbil):**  
  - *Mètode de verificació:* Auditoria oficial a Chrome DevTools amb emulació mòbil Moto G4.  
  - *Resultat verificat:* **100/100 Rendiment**, **100/100 Accessibilitat**, **100/100 SEO**.
- **Cumulative Layout Shift (CLS):**  
  - *Mètode de verificació:* Panell de Performance a DevTools.  
  - *Resultat verificat:* **0.00** (Zero desplaçament visual en càrrega).
- **Taxa d'increment de reserves:**  
  - *Mètode de verificació:* Clics registrats al botó d'enllaç de WhatsApp (`wa.me`).  
  - *Resultat:* `[COMPLETAR]` *(Dada acumulada a validar amb el propietari del negoci a final de trimestre)*.

---

## 6. Aprenentatges i Conclusions

1. **La simplicitat ven més que el bloatware:** Un lloc web estàtic, ben maquetat i ràpid supera en conversió qualsevol plantilla lenta de CMS per a negocis d'hostaleria.
2. **El SEO local requereix precisió mil·limètrica:** Vincular correctament les adreces postals i el telèfon en l'esquema JSON-LD permet a Google presentar la fitxa sense errors de concordança.

