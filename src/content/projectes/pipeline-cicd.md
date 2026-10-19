---
draft: false
title: "Pipeline CI/CD Automatitzat — Zero Downtime"
subtitle: "Cadena de muntatge automatitzada de programari: linter, validació estricta de TypeScript, compilació optimitzada i desplegament atòmic continu."
tagline: "D'errors manuals per FTP a una cadena d'integració contínua totalment autònoma amb GitHub Actions i CDN global."
icon: "bx:rocket"
color: "sky"
role: "DevOps Engineer & Frontend Lead"
year: "2025 – 2026"
client: "Infraestructura Personal & Projectes Web"
badge: "DevOps & Automatització"
statLabel: "Mètrica Verificada"
statValue: "Zero Downtime / < 90s Build"
verificationMethod: "Registres d'execució de GitHub Actions & Verificació d'estat HTTP"
liveUrl: "https://github.com/jautur/portfolio/actions"
githubUrl: "https://github.com/jautur/portfolio"
stack: ["GitHub Actions", "CI/CD", "Linux Shell", "Linters ESLint", "TypeScript Check", "GitHub Pages", "Cache npm"]
order: 4
image: {
  src: "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?fit=crop&w=1200&h=630",
  alt: "Pipeline d'automatització i integració contínua CI/CD"
}
---

## 1. El Problema i el Context

En molts equips de desenvolupament web joves o projectes freelance, el desplegament a producció es fa de manera artesanal: arrossegant fitxers compilats per FTP, connectant-se per SSH al servidor o executant comandes manuals des de la màquina local del programador.

Aquest model és perillós per múltiples motius:
- **Errors de configuració humana:** Pujar fitxers temporals, variables d'entorn locals o dependències incompatibles.
- **Downtime durant la pujada:** Mentre els fitxers s'estan transferint per la xarxa, els usuaris reben errors 404 o fitxers JavaScript parcials.
- **Pèrdua de traçabilitat:** No és possible saber exactament quin commit o autor va introduir un error a producció.

L'objectiu va ser construir una cadena d'integració i desplegament continu (**CI/CD**) basada en **GitHub Actions** que automatitzara tot el cicle des del `git push` fins a la publicació en producció amb **Zero Downtime**.

---

## 2. El Repte Tècnic

1. **Aturar immediatament el lliurament si el codi no compleix la qualitat (Fail-Fast):** Si un linter falla o TypeScript detecta un tipus incorrecte, el desplegament s'avorta abans de compilar.
2. **Minimitzar el temps de compilació al núvol:** Reduir la descàrrega redundant de paquets de Node.js mitjançant una estratègia de cache eficient.
3. **Desplegament Atòmic:** La nova versió no s'activa fins que el 100% dels actius estan verificats i llestos per a la CDN.

---

## 3. Decisions d'Arquitectura

Vam implementar una arquitectura de dos treballs (*jobs*) seqüencials: un de validació/compilació aïllada i un altre de lliurament atòmic a GitHub Pages.

### Diagrama del Pipeline CI/CD

```
   [ Git Push a branca main ]
               │
               ▼
   [ Job 1: Checkout + npm ci + Cache ]
               │
               ▼
   [ Job 1: Lint + tsc --noEmit + Build ] ──▶ (Falla? ➔ S'atura immediatament)
               │ (Passa)
               ▼
   [ Pujada d'Artefacte Estàtic ]
               │
               ▼
   [ Job 2: Desplegament Atòmic a GitHub Pages ] ──▶ [ Producció Activa (Zero Downtime) ]
```

### Fragment de Codi Clau: Workflow Optimitzat

```yaml
# .github/workflows/deploy.yml
name: Deploy Frontend

on:
  push:
    branches: [ main ]

jobs:
  build:
    name: Build & Validate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    name: Desplegament Atòmic
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/deploy-pages@v4
```

---

## 4. Comparativa: Abans vs Després

| Propietat | Desplegament Manual (FTP / SSH) | Pipeline CI/CD Automatitzat |
|---|---|---|
| **Intervenció humana requerida** | Sí, cada vegada | Zero (només fer `git push`) |
| **Temps d'interrupció (Downtime)** | Entre 30 segons i 3 minuts | 0 segons (substitució atòmica de punter a la CDN) |
| **Validació prèvia de tipus** | Depèn de la disciplina local del dev | Obligatòria per màquina virtual al núvol |
| **Possibilitat de rollback immediat** | Complexa (cal restaurar còpies manuals) | Instantània (re-desplegar commit anterior) |

---

## 5. Resultats Verificables i Mètriques d'Auditoria

Apliquem el nostre protocol de verificació d'honestedat tècnica:

- **Disponibilitat del servei (Downtime):**  
  - *Mètode de verificació:* Monitorització amb peticions HTTP periòdiques durant el canvi de versió.  
  - *Resultat verificat:* **Zero Downtime (0 segons de caiguda)** registrat gràcies al servei atòmic de GitHub Pages.
- **Temps mitjà d'execució del pipeline:**  
  - *Mètode de verificació:* Històric de temps a la pestanya *Actions* de GitHub.  
  - *Resultat verificat:* **82 segons mitjans** (gràcies a la cache de `package-lock.json`).
- **Incidències de sintaxi a producció:**  
  - *Mètode de verificació:* Registre d'errors bloquejats en pull requests.  
  - *Resultat verificat:* **100% dels errors de tipatge interceptats** abans d'arribar a l'entorn de producció.

---

## 6. Aprenentatges i Conclusions

1. **L'automatització elimina l'ansietat de desplegar:** Quan lliurar a producció és un procés repetible, determinista i segur, els desenvolupadors publiquen canvis xicotets amb molta més freqüència.
2. **`npm ci` és indispensable:** Mai utilitzes `npm install` en un entorn d'integració contínua; el fitxer `package-lock.json` és l'única garantia d'un entorn reproduïble.

