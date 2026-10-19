---
draft: false
title: "Git & GitHub: Control de Versions Distribuït, Estratègia Trunk-Based i Flux Col·laboratiu"
snippet: "Guia completa sobre Git i GitHub: com Linus Torvalds el va crear el 2005 per al kernel de Linux, funcionament del model de grafs dirigits acíclics (DAG), branques, pull requests i GitOps."
image: {
    src: "/img/blog/git-github-control-versions-flux-colaboratiu.webp",
    alt: "Flux de treball amb Git i GitHub"
}
publishDate: "2026-03-24 15:00"
category: "DevOps & Eines"
author: "Jaume Tur"
tags: [git, github, version-control, devops, trunk-based, gitops]
lang: "ca"
canonicalUrl: "https://jaumetur.es/blog/git-github-control-versions-flux-colaboratiu"
---

## Què són Git i GitHub?

Encara que sovint es mencionen junts, **Git** i **GitHub** són dues eines diferents però complementàries:

* **Git:** És un sistema de control de versions distribuït (*DVCS - Distributed Version Control System*), ràpid, escalable i dissenyat per a registrar canvis en fitxers informàtics al llarg del temps, permetent coordinar el treball de múltiples programadors sobre una mateixa base de codi.
* **GitHub:** És una plataforma al núvol (propietat de Microsoft des de 2018) que allotja repositoris de Git i ofereix eines de revisió de codi col·laborativa (*Pull Requests*), seguiment d'incidències (*Issues*), integració i desplegament continu (*GitHub Actions*) i documentació de projectes.

---

## Quan es van crear i per qui?

* **Creació de Git:** **Abril de 2005**. Fou concebut i programat per **Linus Torvalds** (el mateix creador del nucli Linux). La comunitat del kernel de Linux utilitzava un sistema propietari anomenat BitKeeper, però quan l'empresa propietària va revocar la llicència gratuïta, Torvalds va decidir crear un sistema propi que complís tres requisits innegociables: velocitat extrema, arquitectura completament distribuïda (sense servidor central obligatori) i garanties totals contra la corrupció de dades mitjançant hashes criptogràfics.
* **Creació de GitHub:** **Febrer de 2008**, fundat per **Chris Wanstrath**, **PJ Hyett**, **Tom Preston-Werner** i **Scott Chacon**. Va revolucionar el codi obert en convertir el desenvolupament de programari en una xarxa social basada en la col·laboració transparent (*forks* i *pull requests*).

---

## Per a què s'utilitzen?

Git i GitHub són el centre neuràlgic del desenvolupament de programari modern:

1. **Historial immutable i traçabilitat:** Cada canvi al codi queda associat a un autor, data, missatge descriptiu i un identificador únic (SHA-1 / SHA-256). Això permet auditar exactament quan i per què es va introduir qualsevol línia.
2. **Treball concurrent amb branques (Branches):** Permet a múltiples enginyers desenvolupar funcionalitats aïllades en paral·lel sense interferir amb el codi de producció.
3. **Revisió de codi (Code Review):** Mitjançant les Pull Requests de GitHub, els companys d'equip poden discutir, suggerir canvis línia per línia i aprovar el codi abans de fusionar-lo.
4. **GitOps i Integració Contínua:** Desencadenament automàtic de proves unitàries, comprovacions de rendiment amb Lighthouse i desplegament a producció a cada `git push`.
5. **Còpies de seguretat distribuïdes:** Cada desenvolupador té una còpia completa de l'historial del repositori al seu ordinador local; si un servidor cau, no es perd res.

---

## Arquitectura Interna de Git: El Graf de Commits

A diferència dels sistemes antics (com SVN o CVS) que guardaven "diferències" entre fitxers, Git tracta les dades com un conjunt d'**instantànies** (*snapshots*).

Git estructura la informació com un graf dirigit acíclic (DAG) amb quatre objectes fonamentals:
1. **Blob:** Contingut d'un fitxer (dades pures).
2. **Tree:** Representa un directori, apuntant a blobs i altres sub-arbres.
3. **Commit:** Conté un punter a un tree principal, metadades (autor, data, missatge) i punters als commits pares.
4. **Tag:** Una referència fixa i amb nom a un commit específic (per exemple, per a llançaments de versions `v4.0.0`).

```bash
# Flux de treball estàndard per a noves funcionalitats
# 1. Crear i canviar a una nova branca de treball
git checkout -b feature/millora-rendiment

# 2. Afegir canvis a l'àrea d'escenificació (Staging Area)
git add src/components/hero.astro

# 3. Registrar la instantània amb un missatge clar
git commit -m "perf: optimitzar càrrega d'imatges del hero"

# 4. Enviar la branca a GitHub per obrir Pull Request
git push origin feature/millora-rendiment
```

---

## Bones Pràctiques: Convenció de Commits i Trunk-Based Development

En els nostres projectes apliquem la convenció de commits estàndard (*Conventional Commits*):
* `feat:` Noves funcionalitats d'usuari.
* `fix:` Correcció d'errors o bugs detectats.
* `perf:` Millores de rendiment o reducció de peticions.
* `docs:` Actualització de documentació i guies tècniques.
* `test:` Afegir o corregir proves automatitzades.
* `refactor:` Canvis estructurals de codi sense alterar el comportament extern.

