---
draft: false
title: "TypeScript estricto en proyectos frontend: patrones avanzados que salvan vidas"
snippet: "Más allá del tipado básico: uniones discriminadas, branded types, narrowing exhaustivo, el operador satisfies y por qué `any` debería estar prohibido en producción."
image: {
    src: "/img/blog/guia-definitiva-typescript-estricte-frontend.webp",
    alt: "Código TypeScript limpio y arquitectura de tipos estricta"
}
publishDate: "2026-03-22 10:00"
category: "TypeScript"
author: "Jaume Tur"
tags: [typescript, clean-code, frontend, patrones-diseno, generics, arquitectura]
lang: "es"
canonicalUrl: "https://jaumetur.es/blog/es-guia-definitiva-typescript-estricte-frontend"
---

Muchos desarrolladores utilizan TypeScript simplemente como «JavaScript con comentarios de tipos». Declaran `string`, `number` o `boolean`, y en cuanto el compilador se queja de un tipo complejo, recurren rápidamente a `any` o a un operador de conversión forzada (`as unknown as TargetType`).

Hacer esto es engañarse a uno mismo: destruyes la seguridad que el sistema de tipos pretende ofrecerte y conviertes los errores de compilación en caídas en tiempo de ejecución (*runtime crashes*) que sufrirán tus usuarios.

En este artículo exploramos patrones avanzados de **TypeScript estricto** que utilizamos en proyectos de alta exigencia para blindar el frontend contra regresiones.

---

## 1. La configuración `strict: true` no es negociable

El primer paso para escribir código profesional es activar el modo estricto en tu archivo `tsconfig.json`:

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
  <strong>La clave secreta:</strong> <code>noUncheckedIndexedAccess: true</code>. Por defecto, si accedes a <code>array[0]</code>, TypeScript asume que el elemento existe. Con esta opción activada, el tipo resultante es <code>T | undefined</code>, lo que te obliga a verificar que existe antes de operar.
</div>

---

## 2. Uniones discriminadas: el antídoto contra los estados imposibles

Uno de los mayores vicios en la gestión del estado es declarar un objeto con varios booleanos de estado que pueden entrar en contradicción:

```typescript
// Inadecuado: permite estados imposibles (como isLoading: true e isError: true a la vez)
type Usuario = { nombre: string };

interface EstadoPeticion {
  isLoading: boolean;
  isError: boolean;
  datos?: Usuario;
  mensajeError?: string;
}
```

Mediante las **uniones discriminadas** (*Discriminated Unions*), hacemos que sea físicamente imposible escribir estados incompatibles:

```typescript
// Correcto: cada estado tiene exclusivamente las propiedades que le corresponden
type EstadoPeticion =
  | { readonly tipo: 'inicial' }
  | { readonly tipo: 'cargando' }
  | { readonly tipo: 'exito'; readonly datos: Usuario }
  | { readonly tipo: 'error'; readonly mensaje: string; readonly codigo: number };

function renderizarVista(estado: EstadoPeticion): string {
  switch (estado.tipo) {
    case 'inicial':
      return 'Haz clic para cargar datos.';
    case 'cargando':
      return 'Cargando telemetría...';
    case 'exito':
      return `Bienvenido, ${estado.datos.nombre}`;
    case 'error':
      return `Error (${estado.codigo}): ${estado.mensaje}`;
  }
}
```

---

## 3. Comprobación exhaustiva (*exhaustive check*)

Si en el futuro añadimos un nuevo estado (por ejemplo, `{ tipo: 'cancelado' }`), queremos que TypeScript nos avise automáticamente en todos los lugares del código donde no hayamos gestionado el nuevo caso.

Utilizamos la función `assertNever`:

```typescript
function assertNever(value: never): never {
  throw new Error(`Caso no contemplado: ${JSON.stringify(value)}`);
}

function procesarEstado(estado: EstadoPeticion) {
  switch (estado.tipo) {
    case 'inicial': return;
    case 'cargando': return;
    case 'exito': return;
    case 'error': return;
    default:
      // Si falta algún caso por tratar, TypeScript lanzará un error de compilación.
      return assertNever(estado);
  }
}
```

---

## 4. Branded types: tipado nominal en sistemas estructurados

TypeScript es un sistema de tipos estructural (si dos estructuras tienen las mismas propiedades, son compatibles). Esto significa que, si tenemos dos identificadores `string` (como `UserId` y `OrderId`), podemos pasar uno en lugar del otro por error sin que el compilador proteste:

```typescript
// Definimos tipos con marca nominal
type Brand<K, T> = K & { readonly __brand: T };

export type UserId = Brand<string, 'UserId'>;
export type OrderId = Brand<string, 'OrderId'>;

function sendNotification(usuario: UserId, pedido: OrderId) {
  // Lógica de envío segura
}

const userId = 'usr_12345' as UserId;
const orderId = 'ord_98765' as OrderId;

// Error de compilación previsto: Type 'OrderId' is not assignable to type 'UserId'
// sendNotification(orderId, userId);
```

---

## 5. El operador `satisfies`: validación sin perder precisión de tipos

Introducido en TypeScript 4.9, el operador `satisfies` permite comprobar que un objeto cumple un contrato sin ampliar (*widen*) los tipos específicos de sus claves o valores:

```typescript
type ColorPalette = Record<string, string | [number, number, number]>;

const designColors = {
  primary: '#3b82f6',
  secondary: [16, 185, 129],
  background: '#030712'
} satisfies ColorPalette;

// TypeScript sabe con precisión que 'primary' es un string (permite toUpperCase)
// y que 'secondary' es una tupla de números (permite .map())
designColors.primary.toUpperCase();
designColors.secondary.map(c => c * 2);
```

---

## Conclusión

Escribir TypeScript estricto requiere un cambio de mentalidad: los tipos no son un obstáculo que haya que superar, sino la herramienta de diseño más potente que tenemos como ingenieros frontend. Invertir tiempo en modelar correctamente el dominio ahorra cientos de horas de depuración en el futuro.

¿Tienes un equipo que quiere subir el nivel de TypeScript o auditar su código? [Hablemos](/contact).
