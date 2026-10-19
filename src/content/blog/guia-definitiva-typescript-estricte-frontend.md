---
draft: false
title: "TypeScript Estricte en Projectes Frontend: Patrons Avançats que Salven Vides"
snippet: "Més enllà del tipatge bàsic: unions discriminades, branded types, narrowing exhaustiu, l'operador satisfies i per què `any` hauria d'estar prohibit en producció."
image: {
    src: "/img/blog/guia-definitiva-typescript-estricte-frontend.webp",
    alt: "Codi TypeScript net i arquitectura de tipus estricta"
}
publishDate: "2026-03-22 10:00"
category: "TypeScript"
author: "Jaume Tur"
tags: [typescript, clean-code, frontend, patrons-disseny, generics, arquitectura]
lang: "ca"
canonicalUrl: "https://jaumetur.es/blog/guia-definitiva-typescript-estricte-frontend"
---

Molts desenvolupadors utilitzen TypeScript simplement com un "JavaScript amb comentaris de tipus". Declaren `string`, `number` o `boolean`, i en el moment en què el compilador es queixa d'un tipus complex, recorren ràpidament a `any` o a un operador de càsting forçat (`as unknown as TargetType`).

Fer açò és enganyar-se a un mateix: destrueixes la seguretat que el sistema de tipus pretén oferir-te i converteixes els teus errors de temps de compilació en caigudes en temps d'execució (*runtime crashes*) que patiran els teus usuaris.

En aquest article explorem patrons avançats de **TypeScript Estricte** que utilitzem en projectes d'altes exigències per a blindar el frontend contra regressions.

---

## 1. La Configuració `strict: true` No Negociable

El primer pas per a escriure codi professional és activar el mode estricte al teu fitxer `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2024",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

<div class="callout callout-tip">
  <strong>La clau secreta:</strong> <code>noUncheckedIndexedAccess: true</code>. Per defecte, si accedeixes a <code>array[0]</code>, TypeScript assumeix que l'element existeix. Amb aquesta opció activada, el tipus resultant és <code>T | undefined</code>, obligant-te a verificar l'existència abans d'operar.
</div>

---

## 2. Unions Discriminades: L'Antídot contra Estats Impossibles

Un dels majors vicis en la gestió d'estat és declarar un objecte amb múltiples booleans d'estat que poden entrar en contradicció:

```typescript
// Inadequat: Permet estats impossibles (com isLoading: true i isError: true alhora)
interface EstatPeticio {
  isLoading: boolean;
  isError: boolean;
  dades?: Usuari;
  missatgeError?: string;
}
```

Mitjançant les **Unions Discriminades** (*Discriminated Unions*), fem que els estats incompatibles siguen físicament impossibles d'escriure:

```typescript
// Correcte: Cada estat té exclusivament les propietats que li corresponen
type EstatPeticio =
  | { readonly tipus: 'inicial' }
  | { readonly tipus: 'carregant' }
  | { readonly tipus: 'exit'; readonly dades: Usuari }
  | { readonly tipus: 'error'; readonly missatge: string; readonly codi: number };

function renderitzarVista(estat: EstatPeticio): string {
  switch (estat.tipus) {
    case 'inicial':
      return 'Feu clic per a carregar dades.';
    case 'carregant':
      return 'Carregant telemetria...';
    case 'exit':
      return `Benvingut, ${estat.dades.nom}`;
    case 'error':
      return `Error (${estat.codi}): ${estat.missatge}`;
  }
}
```

---

## 3. Comprovació Exhaustiva (*Exhaustive Check*)

Si en el futur afegim un nou estat (per exemple `{ tipus: 'cancel·lat' }`), volem que TypeScript ens avise automàticament a tots els llocs del codi on no hàgem gestionat el nou cas.

Utilitzem la funció `assertNever`:

```typescript
function assertNever(x: never): never {
  throw new Error(`Cas no contemplat: ${JSON.stringify(x)}`);
}

function processarEstat(estat: EstatPeticio) {
  switch (estat.tipus) {
    case 'inicial': return;
    case 'carregant': return;
    case 'exit': return;
    case 'error': return;
    default:
      // Si falta algun cas per tractar, TypeScript llançarà un error de compilació ací!
      return assertNever(estat);
  }
}
```

---

## 4. Branded Types: Tipatge Nominal en Sistemes Estructurats

TypeScript és un sistema de tipus estructural (si dues estructures tenen les mateixes propietats, són compatibles). Això significa que si tenim dos identificadors `string` (com `UserId` i `OrderId`), podem passar accidentalment un en lloc de l'altre sense que el compilador proteste:

```typescript
// Definim tipus amb marca nominal
type Brand<K, T> = K & { readonly __brand: T };

export type UserId = Brand<string, 'UserId'>;
export type OrderId = Brand<string, 'OrderId'>;

function enviarNotificacio(usuari: UserId, comanda: OrderId) {
  // Lògica d'enviament segura
}

const idUsuari = 'usr_12345' as UserId;
const idComanda = 'ord_98765' as OrderId;

// Error de compilació previst: Type 'OrderId' is not assignable to type 'UserId'
// enviarNotificacio(idComanda, idUsuari);
```

---

## 5. L'Operador `satisfies`: Validació sense Perdre Infecció de Tipus

Introduït en TypeScript 4.9, l'operador `satisfies` permet comprovar que un objecte compleix un contracte sense ampliar (*widen*) els tipus específics de les seues claus o valors:

```typescript
type PaletaColors = Record<string, string | [number, number, number]>;

const colorsDisseny = {
  primari: '#3b82f6',
  secundari: [16, 185, 129],
  fons: '#030712'
} satisfies PaletaColors;

// TypeScript sap amb precisió que 'primari' és un string (permet toUpperCase)
// i que 'secundari' és una tupla de nombres (permet .map())
colorsDisseny.primari.toUpperCase();
colorsDisseny.secundari.map(c => c * 2);
```

---

## Conclusió

Escriure TypeScript estricte requereix un canvi de mentalitat: els tipus no són un obstacle que cal superar, sinó l'eina de disseny més potent que tenim com a enginyers frontend. Invertir temps en modelar el domini correctament estalvia centenars d'hores de depuració en el futur.

Tens un equip que vol elevar el nivell de TypeScript o auditar el seu codi? [Parlem](/contact).

