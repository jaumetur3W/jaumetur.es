// Competidores con los que la calculadora compara TranIA.
// Solo se incluyen aplicaciones con precios públicos en su web oficial; se revisan a mano y pueden cambiar.
// Precios sin IVA. Tramos: precio mensual según nº de socios (o clientes) activos.
// Los pros y contras salen de lo que cada web oficial lista (o no lista) en sus planes, no de opiniones.

export const PRICES_CHECKED = "2026-11-25";
// BCE, tipo de referencia del 24/11/2026: 1 EUR = 1,0963 USD  ->  1 USD ≈ 0,91 EUR.
export const USD_TO_EUR = 0.91;

type L = { es: string; en: string };
type LL = { es: string[]; en: string[] };

export interface Tier {
  upTo: number; // hasta cuántos socios/clientes activos cubre este tramo
  price: number; // precio mensual en la moneda del competidor
  plan: string;
}

export interface Competitor {
  id: string;
  name: string;
  segment: "gym" | "trainer";
  currency: "EUR" | "USD";
  tiers: Tier[]; // si se supera el último tramo, el precio es a medida
  basis: L; // qué cuenta como socio/cliente y cómo se factura
  url: string; // página oficial de precios
  summary: L;
  pros: LL;
  cons: LL;
}

export const COMPETITORS: Competitor[] = [
  {
    id: "gymgest",
    name: "GymGest",
    segment: "gym",
    currency: "EUR",
    tiers: [
      { upTo: 300, price: 19, plan: "Esencial" },
      { upTo: 500, price: 39, plan: "Estudio" },
      { upTo: 1000, price: 69, plan: "Club" },
    ],
    basis: {
      es: "Por centro, según socios. Mensual, sin permanencia, 30 días de prueba.",
      en: "Per centre, by members. Monthly, no lock-in, 30-day trial.",
    },
    url: "https://gymgest.es/",
    summary: {
      es: "Software español de gestión de gimnasios: cuotas, acceso, TPV, clases y app del socio.",
      en: "Spanish gym management software: fees, access, POS, classes and member app.",
    },
    pros: {
      es: [
        "Precio de entrada muy bajo: 19 €/mes hasta 300 socios",
        "Cuotas domiciliadas SEPA, TPV y cierre de caja",
        "App del socio con tu marca desde el plan de 39 €",
        "Sin permanencia ni coste de alta",
      ],
      en: [
        "Very low entry price: €19/month up to 300 members",
        "SEPA direct debit fees, POS and daily cash close",
        "Branded member app from the €39 plan",
        "No lock-in and no setup fee",
      ],
    },
    cons: {
      es: [
        "No lista planificación de entrenamiento ni progresión de cargas",
        "Reservas de clases y app solo a partir del plan de 39 €",
        "Pocos usuarios por plan (2, 3 u 8 según el plan)",
        "Un solo centro por plan salvo el plan Cadena (149 €)",
      ],
      en: [
        "Does not list training planning or load progression",
        "Class booking and app only from the €39 plan",
        "Few users per plan (2, 3 or 8 depending on the plan)",
        "A single centre per plan except the Chain plan (€149)",
      ],
    },
  },
  {
    id: "gestiongym",
    name: "Gestión Gym",
    segment: "gym",
    currency: "EUR",
    tiers: [
      { upTo: 100, price: 29, plan: "Básico" },
      { upTo: 400, price: 49, plan: "Pro" },
    ],
    basis: {
      es: "Según socios activos. Mensual, sin permanencia, 14 días de prueba.",
      en: "By active members. Monthly, no lock-in, 14-day trial.",
    },
    url: "https://www.gestiongym.es/",
    summary: {
      es: "Software español para gimnasios pequeños y medianos: fichas, cuotas, impagos e informes.",
      en: "Spanish software for small and medium gyms: member records, fees, unpaid fees and reports.",
    },
    pros: {
      es: [
        "29 €/mes hasta 100 socios, sin permanencia",
        "Detección automática de impagados",
        "Bonos de entrenador personal en el plan Pro",
        "Soporte prioritario en menos de 4 h en Pro",
      ],
      en: [
        "€29/month up to 100 members, no lock-in",
        "Automatic detection of unpaid fees",
        "Personal-trainer packs on the Pro plan",
        "Priority support in under 4 h on Pro",
      ],
    },
    cons: {
      es: [
        "Solo 1 administrador en el plan Básico (hasta 5 en Pro)",
        "No lista reservas de clases ni app del socio",
        "No lista planificación de entrenamiento",
        "Multisede solo en el plan de 99 €",
      ],
      en: [
        "Only 1 admin on the Basic plan (up to 5 on Pro)",
        "Does not list class booking or a member app",
        "Does not list training planning",
        "Multi-site only on the €99 plan",
      ],
    },
  },
  {
    id: "gymdesk",
    name: "Gymdesk",
    segment: "gym",
    currency: "USD",
    tiers: [
      { upTo: 50, price: 75, plan: "Micro Gym" },
      { upTo: 100, price: 100, plan: "Small Gym" },
      { upTo: 150, price: 150, plan: "Medium Gym" },
      { upTo: 250, price: 200, plan: "Large Gym" },
    ],
    basis: {
      es: "Por socios activos, con su procesador de pagos (más barato). Mensual, sin contrato, 30 días de prueba.",
      en: "By active members, using its payment processor (cheaper). Monthly, no contract, 30-day trial.",
    },
    url: "https://gymdesk.com/pricing",
    summary: {
      es: "Plataforma estadounidense de gestión de gimnasios con todas las funciones en todos los planes.",
      en: "US gym management platform with every feature on every plan.",
    },
    pros: {
      es: [
        "Todas las funciones en todos los planes",
        "Usuarios de equipo ilimitados y web del gimnasio incluida",
        "Mensual, sin contrato ni coste de alta",
        "30 días de prueba sin tarjeta",
      ],
      en: [
        "Every feature on every plan",
        "Unlimited staff accounts and a gym website included",
        "Monthly, no contract, no setup fee",
        "30-day trial with no card",
      ],
    },
    cons: {
      es: [
        "Precio en dólares y bastante más caro que las opciones españolas",
        "Sus pagos integrados están en EE. UU. y Canadá; fuera, vía socios aprobados",
        "App con tu marca: +100 $/mes. Control de acceso: +100 $/mes",
        "No lista planificación de entrenamiento adaptativa",
      ],
      en: [
        "Priced in dollars and well above the Spanish options",
        "Its integrated payments are in the US and Canada; elsewhere via approved partners",
        "Branded app: +$100/month. Door access: +$100/month",
        "Does not list adaptive training planning",
      ],
    },
  },
  {
    id: "glofox",
    name: "Glofox (ABC)",
    segment: "gym",
    currency: "USD",
    tiers: [{ upTo: 1_000_000, price: 275, plan: "Essential" }],
    basis: {
      es: "Precio de lista del plan Essential (sin límite de socios publicado). Boost 375 $ y Elite 625 $. Los nuevos estudios pagan 99 $ el primer año.",
      en: "List price of the Essential plan (no published member limit). Boost $375 and Elite $625. New studios pay $99 in year one.",
    },
    url: "https://www.glofox.com/plans/",
    summary: {
      es: "Plataforma de reservas y gestión para estudios boutique y gimnasios, con apps móviles propias.",
      en: "Booking and management platform for boutique studios and gyms, with its own mobile apps.",
    },
    pros: {
      es: [
        "Reservas, nóminas y cobros de no-show incluidos",
        "App móvil para socios y para el equipo",
        "Predictor de bajas e informes avanzados (Boost)",
        "API y Zapier en el plan Elite",
      ],
      en: [
        "Booking, payroll and no-show fees included",
        "Mobile app for members and for staff",
        "Churn predictor and advanced reports (Boost)",
        "API and Zapier on the Elite plan",
      ],
    },
    cons: {
      es: [
        "Desde 275 $/mes, hasta 625 $: lo más caro de la lista",
        "Las comisiones de pago se cobran aparte y no son públicas",
        "La app con tu marca es un extra (incluida solo en Elite)",
        "Límite mensual de SMS (100 en Essential)",
      ],
      en: [
        "From $275/month up to $625: the most expensive on the list",
        "Payment fees are charged on top and are not public",
        "Branded app is an extra (included only on Elite)",
        "Monthly SMS cap (100 on Essential)",
      ],
    },
  },
  {
    id: "trainerize",
    name: "Trainerize (ABC)",
    segment: "trainer",
    currency: "USD",
    tiers: [
      { upTo: 5, price: 25, plan: "Pro 5" },
      { upTo: 15, price: 50, plan: "Pro 15" },
      { upTo: 30, price: 79, plan: "Pro 30" },
      { upTo: 50, price: 135, plan: "Pro 50" },
      { upTo: 100, price: 225, plan: "Pro 100" },
      { upTo: 200, price: 250, plan: "Pro 200" },
    ],
    basis: {
      es: "Por plazas de cliente, facturación mensual. Los complementos (nutrición, pagos, app con marca) van aparte.",
      en: "Per client seat, billed monthly. Add-ons (nutrition, payments, branded app) cost extra.",
    },
    url: "https://www.trainerize.com/pricing/",
    summary: {
      es: "App de coaching muy extendida para entrenadores: programas, seguimiento y nutrición.",
      en: "Widely used coaching app for trainers: programmes, tracking and nutrition.",
    },
    pros: {
      es: [
        "App iOS y Android consolidada, con constructor de entrenos con IA",
        "Seguimiento de comidas y macros, integración con wearables",
        "Plan gratuito para 1 cliente",
        "Prueba gratuita de 30 días con clientes ilimitados",
      ],
      en: [
        "Established iOS and Android app with an AI workout builder",
        "Meal and macro tracking, wearable integrations",
        "Free plan for 1 client",
        "30-day free trial with unlimited clients",
      ],
    },
    cons: {
      es: [
        "El precio sube con cada tramo de clientes (135 $ con 50)",
        "Nutrición avanzada (+20/45 $), pagos (+10 $) y app con marca (+169 $ de alta) van aparte",
        "No incluye gestión de gimnasio (clases, accesos, facturación) en los planes de entrenador",
        "Precio en dólares",
      ],
      en: [
        "Price climbs with each client band ($135 at 50)",
        "Advanced nutrition (+$20/45), payments (+$10) and branded app (+$169 setup) cost extra",
        "No gym management (classes, access, billing) on the trainer plans",
        "Priced in dollars",
      ],
    },
  },
  {
    id: "truecoach",
    name: "TrueCoach",
    segment: "trainer",
    currency: "USD",
    tiers: [
      { upTo: 5, price: 26.34, plan: "Starter" },
      { upTo: 20, price: 57.99, plan: "Standard" },
      { upTo: 50, price: 136.99, plan: "Pro" },
    ],
    basis: {
      es: "Por entrenador, según clientes activos. Se usa el precio con facturación anual (el más barato).",
      en: "Per coach, by active clients. The annual-billing price (the cheapest) is used.",
    },
    url: "https://truecoach.co/pricing/",
    summary: {
      es: "App de coaching centrada en el entrenador: constructor de programas y biblioteca de vídeos.",
      en: "Coach-focused app: programme builder and video library.",
    },
    pros: {
      es: [
        "Más de 3.000 vídeos de ejercicios",
        "Constructor de programas y mensajería dentro de la app",
        "Integra wearables (Apple, Garmin, WHOOP) y Zapier",
        "Pagos automáticos incluidos",
      ],
      en: [
        "3,000+ exercise videos",
        "Programme builder and in-app messaging",
        "Integrates wearables (Apple, Garmin, WHOOP) and Zapier",
        "Automated payments included",
      ],
    },
    cons: {
      es: [
        "Tope de 50 clientes; por encima, precio a medida",
        "Salto grande de precio: del cliente 21 pasas de 58 $ a 137 $",
        "Sin plan gratuito, solo 14 días de prueba",
        "No es software de gestión de gimnasio",
      ],
      en: [
        "50-client cap; above that, custom pricing",
        "Big price jump: client 21 takes you from $58 to $137",
        "No free plan, only a 14-day trial",
        "Not gym management software",
      ],
    },
  },
];
