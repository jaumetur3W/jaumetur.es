export interface MarketAlternative {
  name: string;
  priceRange: string;
  speedLighthouse: string;
  maintenanceCost: string;
  hiddenCosts: string;
  codeOwnership: string;
  summary: string;
}

export interface AmortizationPoint {
  title: string;
  metric: string;
  description: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  icon: string;
  iconColor: string;
  badge: string;
  badgeColor: string;
  isFeatured?: boolean;
  tagline: string;
  description: string;
  targetAudience: string;
  timeline: string;
  creationPrice: string;
  creationPriceNumber: number;
  monthlyFee: string;
  monthlyFeeNumber: number;
  annualTotal: string;
  dailyCostEquivalent: string;
  amortizationSummary: string;
  amortizationPoints: AmortizationPoint[];
  whyThisPrice: {
    creationBreakdown: string[];
    monthlyBreakdown: string[];
    whyCommitmentOneYear: string;
  };
  marketComparison: MarketAlternative[];
  features: string[];
  ctaText: string;
}

export const servicesData: ServicePackage[] = [
  {
    id: "digitalitzacio-local",
    name: "Digitalització Local & Carta Web (Bars i Comerços)",
    icon: "bx:restaurant",
    iconColor: "text-amber-500",
    badge: "Proposta Clau · Més Recomanat",
    badgeColor: "bg-amber-400 text-slate-950 border-amber-500 font-extrabold shadow-xs",
    isFeatured: true,
    tagline: "La solució definitiva per a xicotets bars, pizzeries, cafeteries i comerços locals que volen captar clients de Google Maps i xarxes socials.",
    description: "Inspirat en el cas d'èxit de la Pizzeria a Xàtiva: eliminem els PDFs feixucs de 15 MB que ningú pot obrir al mòbil. Construïm la teua carta interactiva ultraràpida en HTML, el teu perfil verificat a Google Maps i ens encarreguem de crear o gestionar les teues xarxes socials (Instagram/Facebook) per omplir el teu local sense comissions de tercers.",
    targetAudience: "Xicotets bars, pizzeries, restaurants familiars, cafeteries, forns de pa, comerços de barri i autònoms que no estan digitalitzats o tenen una presència web pobra o desactualitzada.",
    timeline: "3 a 5 dies hàbils",
    creationPrice: "Des de 290 €",
    creationPriceNumber: 290,
    monthlyFee: "49 €/mes",
    monthlyFeeNumber: 49,
    annualTotal: "878 € el 1r any (creació de la carta web + gestió/xarxes + 12 mesos de manteniment)",
    dailyCostEquivalent: "~2,40 €/dia durant el primer any (menys del que val un cafè i una pasta)",
    amortizationSummary: "S'amortitza completament amb només 3 o 4 sopars o comandes de pizzes al mes.",
    amortizationPoints: [
      {
        title: "Retorn immediat amb només 3-4 comandes al mes",
        metric: "3 a 4 comandes / mes",
        description: "En hostaleria o comerç local, el marge de només 3 o 4 comandes de menjar per emportar o un parell de taules reservades el cap de setmana ja cobreix íntegrament la mensualitat del servei.",
      },
      {
        title: "Posicionament estrella a Google Maps i cerques de proximitat",
        metric: "+60% en cerques locals",
        description: "El 78% de les persones que cerquen 'on sopar', 'pizzeria a prop' o 'cafeteria' al mòbil acaben acudint al local en menys de 24 hores. Tindre el teu negoci optimitzat a Google Maps amb horaris i botó directe de trucada/WhatsApp és el major generador de clients nous.",
      },
      {
        title: "Adéu al PDF feixuc que fa perdre clients a la taula",
        metric: "Càrrega en < 0,5 segons",
        description: "Quan un client escaneja un codi QR i ha de descarregar un fitxer PDF de 15 MB amb mala cobertura 4G, es desespera. La nostra carta web en HTML càrrega de manera instantània, sense descàrregues, adaptada a mòbils i al·lèrgens.",
      },
      {
        title: "Xarxes socials actives sense maldecaps ni pèrdua de temps",
        metric: "Instagram i Facebook al dia",
        description: "Creem o posem a punt els teus perfils socials i t'ajudem a publicar plats del dia, ofertes i horaris especials. Tu et centres a atendre els teus clients al taulell, nosaltres ens ocupem de la part digital.",
      },
    ],
    whyThisPrice: {
      creationBreakdown: [
        "Digitalització integral de la teua carta de plats, preus, begudes i al·lèrgens en HTML interactiu net",
        "Desenvolupament ultraràpid basat en l'arquitectura utilitzada a la Pizzeria a Xàtiva (100/100 Lighthouse)",
        "Generació de codi QR vectorial d'alta resolució llest per a imprimir en taules, estovalles o aparadors",
        "Creació o optimització de la teua fitxa a Google Business Profile (Google Maps) amb horaris i ubicació exacta",
        "Creació o posada a punt de perfils a xarxes socials (Instagram i Facebook) amb logotip adaptat i bio atractiva",
        "Canal de reserva i comanda directa per WhatsApp en un sol clic, sense pagar el 30% de comissió a tercers",
      ],
      monthlyBreakdown: [
        "Allotjament web d'alta velocitat a xarxa Edge amb certificat SSL segur i domini inclòs",
        "Actualització periòdica de preus, nous plats de temporada o menús especials de festes",
        "Acompanyament i dinamització de xarxes socials (Instagram/Facebook) amb publicacions periòdiques d'imatges i novetats",
        "Supervisió de ressenyes a Google Maps i manteniment d'horaris festius actualitzats",
        "Suport tècnic prioritari per WhatsApp amb resolució ràpida davant qualsevol canvi d'última hora",
      ],
      whyCommitmentOneYear: "El preu de creació de 290 € és molt assequible precisament perquè confiem en una relació anual: una carta o unes xarxes socials necessiten actualitzar-se cada temporada (festius, estiu, canvi de preus) per mantindre's rendibles i vives.",
    },
    marketComparison: [
      {
        name: "El nostre Pack Digitalització Local (Web + Xarxes)",
        priceRange: "290 € entrada + 49 €/mes",
        speedLighthouse: "Optimitzat per a màxima puntuació a Lighthouse",
        maintenanceCost: "49 €/mes (Web, canvis de carta i xarxes inclosos)",
        hiddenCosts: "0 € de comissions sobre comandes",
        codeOwnership: "Tot propietat teua: web, carta i perfils socials",
        summary: "La proposta clau: presència impecable a Google Maps, xarxes actives i carta mòbil sense comissions.",
      },
      {
        name: "Plataformes d'enviament de tercers (Glovo, Uber, JustEat)",
        priceRange: "Comissions del 25% al 35% de cada comanda",
        speedLighthouse: "Depens de la seua aplicació",
        maintenanceCost: "Centenars o milers d'euros cada mes en comissions",
        hiddenCosts: "Els clients són d'ells i no teus; si marxen, perds la base de dades",
        codeOwnership: "Cap: dependència total de la plataforma",
        summary: "Molt car a mitjà termini; et resten gran part del marge de benefici de cada plat.",
      },
      {
        name: "Menú en PDF penjat en un QR gratuït",
        priceRange: "0 € en aparença",
        speedLighthouse: "Pèssim (Fitxers de 5 a 15 MB lents)",
        maintenanceCost: "Sense manteniment: preus desactualitzats i enllaços trencats",
        hiddenCosts: "Pèrdua constant de clients que no aconsegueixen obrir el fitxer",
        codeOwnership: "Un simple arxiu PDF",
        summary: "Mata les vendes del local: lent, no es llegeix bé al mòbil i no posiciona a Google.",
      },
      {
        name: "Agència de xarxes socials tradicional",
        priceRange: "300 € a 600 €/mes només per portar les xarxes",
        speedLighthouse: "No inclouen desenvolupament web ni carta digital",
        maintenanceCost: "Quotes mensuals inaccessibles per a un bar de barri",
        hiddenCosts: "Facturació a banda per qualsevol modificació de carta",
        codeOwnership: "Variable",
        summary: "Pressupostos pensats per a grans marques, completament inviables per a un negoci local.",
      },
    ],
    features: [
      "Landing page i Carta interactiva en HTML (càrrega < 0.5s, 100/100 Lighthouse)",
      "Substitució de PDFs pesats per menú net adaptat a mòbil i al·lèrgens",
      "Canal de reserva i comandes directes per WhatsApp sense comissions",
      "Creació i optimització de fitxa a Google Maps (Google Business Profile)",
      "Creació o gestió continuada de xarxes socials (Instagram i Facebook)",
      "Actualització periòdica de preus, plats de temporada i menús",
      "Codi QR vectorial preparat per a imprimir en taules i aparadors",
      "Manteniment tècnic actiu tot l'any (no opcional · permanència mín. 1 any)",
    ],
    ctaText: "Demanar Pack Negoci Local (290 €)",
  },
  {
    id: "landing-page",
    name: "Landing Page d'Alt Rendiment",
    icon: "bx:rocket",
    iconColor: "text-indigo-600",
    badge: "Preu Reduït · Màxima Conversió",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
    tagline: "Web corporativa ultra ràpida dissenyada per captar clients des del primer dia i posicionar a Google.",
    description: "Webs corporatives o pàgines de llançament ultraràpides, optimitzades per convertir visites en contactes reals i liderar les cerques a Google Maps i SEO local.",
    targetAudience: "Autònoms, pimes, clíniques, despatxos i startups que busquen autoritat immediata i captació fluida de clients.",
    timeline: "1 a 2 setmanes",
    creationPrice: "Des de 390 €",
    creationPriceNumber: 390,
    monthlyFee: "30 €/mes",
    monthlyFeeNumber: 30,
    annualTotal: "750 € el 1r any (creació + 12 mesos de manteniment)",
    dailyCostEquivalent: "~2,05 €/dia durant el primer any (menys que un esmorzar)",
    amortizationSummary: "La majoria de clients amortitzen la inversió total amb només captar 1 o 2 clients nous el primer trimestre.",
    amortizationPoints: [
      {
        title: "Retorn immediat per captació de clients",
        metric: "1 a 2 vendes",
        description: "Per a qualsevol professional o pime (advocats, clíniques, reformes, consultoria), el benefici d'un sol client nou ja cobreix el cost complet de tot l'any.",
      },
      {
        title: "Major taxa de conversió per velocitat instantània",
        metric: "+20% a +35%",
        description: "Segons estudis de Google i Deloitte, reduir el temps de càrrega en només 1 segon augmenta les conversions fins a un 27%. Una pàgina amb 100/100 a Lighthouse no perd clients per lentitud.",
      },
      {
        title: "Estalvi directe en llicències de plugins i hosting car",
        metric: "350 € - 500 €/any estalviats",
        description: "En sistemes basats en WordPress s'acaben pagant llicències anuals com Elementor Pro (59$), WP Rocket (59$), plugins de seguretat (99$) i servidors dedicats lents (150-250€). Amb la nostra arquitectura estàtica a la xarxa Edge d'Astro, tot això desapareix.",
      },
      {
        title: "Protecció de reputació i zero caigudes",
        metric: "99,9% uptime",
        description: "Una web caiguda o piratejada per vulnerabilitats de plugins costa milers d'euros en vendes perdudes i desprestigi. El manteniment inclòs et garanteix tranquil·litat total.",
      },
    ],
    whyThisPrice: {
      creationBreakdown: [
        "Auditoria de negoci i disseny d'estructura orientada a conversió directa",
        "Desenvolupament a mida amb Astro v5 i Tailwind CSS v4 (sense plantilles pesades)",
        "Puntuació objectiu d'excel·lència a Google Lighthouse (Rendiment, SEO i Bones Pràctiques)",
        "Compliment estricte d'accessibilitat universal WCAG 2.2 AA (apte per a contractació pública i normatives europees)",
        "Configuració avançada de SEO on-page, JSON-LD schema (LocalBusiness / Organization) i Open Graph per a xarxes socials",
        "Formulari de contacte ràpid amb protecció antispam intel·ligent sense captchas molestos",
      ],
      monthlyBreakdown: [
        "Allotjament d'alt rendiment a xarxa CDN Edge mundial (temps de resposta < 50ms a qualsevol lloc)",
        "Supervisió contínua de disponibilitat (uptime 24/7) amb alertes automàtiques en temps real",
        "Actualitzacions de seguretat, entorns d'execució i noves versions d'eines",
        "Còpies de seguretat diàries i restauració immediata en cas de qualsevol imprevist",
        "Suport tècnic directe per correu o WhatsApp per a consultes i dubtes amb resposta en < 24h laborables",
      ],
      whyCommitmentOneYear: "El desenvolupament inicial es cobra a un preu reduït d'entrada (390 €) perquè creiem en relacions de confiança a llarg termini. La permanència d'1 any ens permet absorbir els costos tècnics d'arquitectura inicial i assegurar que la web no quedi abandonada, obsoleta o vulnerable després del lliurament.",
    },
    marketComparison: [
      {
        name: "La nostra solució (Astro + Enginyeria Frontend)",
        priceRange: "390 € entrada + 30 €/mes",
        speedLighthouse: "Optimitzat per a màxima velocitat a Lighthouse",
        maintenanceCost: "30 €/mes (Tot inclòs, sense llicències extra)",
        hiddenCosts: "0 € en llicències o plugins de pagament",
        codeOwnership: "Codi net propietat 100% del client",
        summary: "La millor relació qualitat-preu: màxima conversió, sense bloatware i manteniment proactiu garantit.",
      },
      {
        name: "Agència tradicional WordPress",
        priceRange: "1.200 € a 2.800 € inicials",
        speedLighthouse: "35 - 65 / 100 (Pes > 3-5 MB de recursos)",
        maintenanceCost: "60 € a 120 €/mes o tarifes per hores cares",
        hiddenCosts: "Llicències anuals obligatòries (Elementor, WP Rocket, ACF, etc.)",
        codeOwnership: "Lligat a plugins obsolets i base de dades pesada",
        summary: "Elevat cost inicial i mensual; lentitud recurrent que penalitza el SEO a Google.",
      },
      {
        name: "Plataformes DIY (Wix, Squarespace)",
        priceRange: "20 € a 45 €/mes de per vida",
        speedLighthouse: "40 - 60 / 100 (Codi genèric sobrecarregat)",
        maintenanceCost: "Inclos en la quota, però suport genèric per tiquets lents",
        hiddenCosts: "Quotes recurrents per afegir formularis, dominis o funcions bàsiques",
        codeOwnership: "Zero propietat: si deixes de pagar, perds absolutament tota la web",
        summary: "Sembla fàcil, però té baix rendiment en mòbils, limitacions de disseny i dependència total.",
      },
      {
        name: "Freelancers 'Low Cost' sense manteniment",
        priceRange: "200 € a 400 € pagament únic",
        speedLighthouse: "Variable (solen usar plantilles pirata o descarregades)",
        maintenanceCost: "Sense manteniment: abandonament un cop entregat",
        hiddenCosts: "Haver de contractar un altre professional quan la web es trenca",
        codeOwnership: "Codi no estructurat i sense documentació",
        summary: "Risc alt: sense garanties de continuïtat, seguretat ni compliment legal d'accessibilitat.",
      },
    ],
    features: [
      "Desenvolupament estàtic amb Astro i Tailwind CSS v4",
      "Auditoria estricta amb Lighthouse (Rendiment, SEO i Bones Pràctiques)",
      "Accessibilitat universal certificable WCAG 2.2 AA",
      "Optimització de SEO tècnic i metadades Open Graph per a xarxes",
      "Formulari de contacte accessible amb protecció anti-spam sense captcha",
      "Manteniment tècnic actiu inclòs (no opcional · permanència mín. 1 any)",
      "Monitoratge d'uptime, còpies de seguretat i actualitzacions de seguretat",
    ],
    ctaText: "Sol·licitar Landing Page (390 €)",
  },
  {
    id: "angular-webapp",
    name: "Web App SPA amb Angular",
    icon: "simple-icons:angular",
    iconColor: "text-rose-600",
    badge: "Aplicacions Reactives & SaaS",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200/80",
    tagline: "Plataforma web avançada, interactiva i escalable per a productes SaaS, portals i gestió operativa.",
    description: "Aplicacions web reactives d'alta fluïdesa, pensades per a escalar, construïdes sobre els darrers estàndards d'Angular (Signals, Standalone Components i arquitectura modular).",
    targetAudience: "Empreses tecnològiques, pimes en digitalització i equips de producte que necessiten dashboards, plataformes SaaS o panells de gestió robustos.",
    timeline: "3 a 6 setmanes",
    creationPrice: "Des de 1.950 €",
    creationPriceNumber: 1950,
    monthlyFee: "95 €/mes",
    monthlyFeeNumber: 95,
    annualTotal: "3.090 € el 1r any (arquitectura completa + 12 mesos de manteniment)",
    dailyCostEquivalent: "~8,46 €/dia durant el primer any",
    amortizationSummary: "Amortització directa estalviant desenes d'hores d'operativa manual d'equip i evitant refactoritzacions de codi prematures.",
    amortizationPoints: [
      {
        title: "Automatització d'operacions manuals",
        metric: "10-25 hores/mes estalviades",
        description: "Una interfície ben dissenyada amb Angular permet als teus empleats o usuaris completar tasques en minuts en lloc d'hores amb fulls de càlcul o eines fragmentades.",
      },
      {
        title: "Arquitectura a prova de futur (Future-Proof)",
        metric: "3 a 5 anys de vida útil",
        description: "L'ús de TypeScript estricte i Angular Standalone amb Signals evita l'acumulació de deute tècnic. No caldrà reescriure l'aplicació d'aquí a dos anys.",
      },
      {
        title: "Fluïdesa a 60 FPS i retenció d'usuaris",
        metric: "Zero bloquejos de render",
        description: "Els usuaris d'aplicacions internes o SaaS abandonen plataformes lentes i poc reactives. La reactivitat amb Signals garanteix experiències equiparables a una app nativa.",
      },
      {
        title: "Cost reduït respecte a contractar un desenvolupador intern",
        metric: "Estalvi de +35.000 €/any",
        description: "Un enginyer Frontend sènior té un cost salarial superior als 40.000 €/any més quotes de seguretat social. Amb aquest servei obtens arquitectura professional a una fracció d'aquest cost.",
      },
    ],
    whyThisPrice: {
      creationBreakdown: [
        "Disseny de l'arquitectura d'estat i flux de dades mitjançant Angular Signals i RxJS",
        "Components modulars autònoms (Standalone) altament desacoblats i reutilitzables",
        "Tipat estricte de dades d'extrem a extrem amb TypeScript (sense tipus 'any')",
        "Integració d'APIs REST / WebSockets amb gestió avançada d'errors i intersectors HTTP",
        "Validació de formularis reactius amb validacions complexes i feedback visual instantani",
        "Suite de proves unitàries amb Vitest per blindar la lògica de negoci contra regressions",
      ],
      monthlyBreakdown: [
        "Actualització continuada de versions d'Angular i biblioteques relacionades",
        "Monitoratge actiu d'errors de runtime al client amb telemetria",
        "Optimització periòdica de rendiment i mida dels bundles de producció",
        "Resolució prioritària d'incidències tècniques i consultoria arquitectònica",
        "Còpies de seguretat i manteniment del pipeline de desplegament continu",
      ],
      whyCommitmentOneYear: "Les aplicacions complexes necessiten acompanyament tècnic continu durant el seu desplegament i adopció per assegurar que les noves funcionalitats no comprometin l'estabilitat ni la velocitat.",
    },
    marketComparison: [
      {
        name: "El nostre servei Angular Expert",
        priceRange: "1.950 € entrada + 95 €/mes",
        speedLighthouse: "95 - 100 / 100 (60 FPS estables)",
        maintenanceCost: "95 €/mes (Supervisió i evolució tècnica)",
        hiddenCosts: "0 € en costos no declarats",
        codeOwnership: "Codi 100% teu al teu repositori Git",
        summary: "Enginyeria rigorosa, tipada i modular amb suport tècnic expert continuat.",
      },
      {
        name: "Agències de desenvolupament a mida",
        priceRange: "6.000 € a 15.000 € inicials",
        speedLighthouse: "70 - 85 / 100",
        maintenanceCost: "300 € a 600 €/mes de quota de manteniment mínim",
        hiddenCosts: "Facturació addicional per qualsevol ajust mínim",
        codeOwnership: "Sovint retenen el codi o imposen contractes tancats",
        summary: "Pressupostos desorbitats amb equips sobredimensionats i processos lents.",
      },
      {
        name: "Eines No-Code complexes (Bubble, Retool car)",
        priceRange: "100 € a 400 €/mes de subscripció",
        speedLighthouse: "40 - 60 / 100 (Temps de càrrega pesat)",
        maintenanceCost: "Quotes creixents segons nombre d'usuaris o trucades de BD",
        hiddenCosts: "Tarifes per ús que es disparen en escalar",
        codeOwnership: "Propietat zero: no pots exportar el codi ni canviar de servidor",
        summary: "Ràpid d'iniciar però prohibitivament car a mesura que creixes, amb rendiment deficient.",
      },
      {
        name: "Desenvolupador intern a jornada completa",
        priceRange: "35.000 € a 48.000 €/any + costos laborals",
        speedLighthouse: "Depèn de l'experiència individual",
        maintenanceCost: "Salaris, seguretat social i vacances",
        hiddenCosts: "Temps i cost de reclutament, selecció i 'onboarding'",
        codeOwnership: "Propietat de l'empresa",
        summary: "Inviable per a pimes o projectes concrets que no requereixen dedicació exclusiva diària.",
      },
    ],
    features: [
      "Arquitectura modular moderna (Standalone Components & Signals)",
      "Tipat estricte TypeScript d'extrem a extrem sense `any`",
      "Gestió d'estat reactiva i fluida amb RxJS / Signals",
      "Integració amb APIs REST, WebSockets o plataformes Backend",
      "Suite de proves de regressió amb Vitest",
      "Manteniment tècnic continuat inclòs (no opcional · permanència mín. 1 any)",
      "Supervisió de rendiment a 60 FPS i actualitzacions del framework",
    ],
    ctaText: "Projectar Web App (1.950 €)",
  },
  {
    id: "performance-audit",
    name: "Optimització & Accessibilitat (Audit & Fix)",
    icon: "bx:bxs-zap",
    iconColor: "text-emerald-600",
    badge: "Auditoria & Correcció Integral",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    tagline: "Resolució d'arrel de problemes de lentitud, Core Web Vitals i accessibilitat legal WCAG.",
    description: "Inspecció profunda de codi i recursos, eliminació de colls d'ampolla a la GPU/CPU, reducció dràstica del JavaScript innecessari i compliment estricte de la Directiva Europea d'Accessibilitat.",
    targetAudience: "Llocs web en producció amb pèrdua de trànsit orgànic, advertències de Google Search Console o obligació de complir normatives WCAG 2.2.",
    timeline: "3 a 7 dies hàbils",
    creationPrice: "Des de 450 €",
    creationPriceNumber: 450,
    monthlyFee: "39 €/mes",
    monthlyFeeNumber: 39,
    annualTotal: "918 € el 1r any (auditoria profunda + millores + 12 mesos de vigilància)",
    dailyCostEquivalent: "~2,51 €/dia durant el primer any",
    amortizationSummary: "S'amortitza immediatament evitant penalitzacions de trànsit a Google i prevenint sancions legals de conformitat europea.",
    amortizationPoints: [
      {
        title: "Recuperació de rànquing a Google per Core Web Vitals",
        metric: "+15% a +40% en trànsit SEO",
        description: "Google penalitza explícitament els dominis que no superen LCP, CLS o INP. Arreglar aquestes mètriques restaura la visibilitat orgànica que estaves perdent davant de competidors.",
      },
      {
        title: "Blindatge davant la Directiva Europea d'Accessibilitat",
        metric: "Evita multes de fins a desenes de milers d'euros",
        description: "L'Acta Europea d'Accessibilitat (EAA) exigeix que les webs de comerç electrònic i serveis compleixin WCAG 2.1 / 2.2 AA. Un lloc certificat et protegeix de denúncies i demandes legals.",
      },
      {
        title: "Reducció de costos de publicitat (Google Ads Quality Score)",
        metric: "-15% en cost per clic (CPC)",
        description: "Les campanyes publicitàries paguen menys per cada clic si la pàgina de destinació carrega ràpid i ofereix una bona experiència d'usuari mesurada per Google.",
      },
      {
        title: "Disminució de la taxa de rebot (Bounce Rate)",
        metric: "Més de la meitat dels usuaris es queden",
        description: "El 53% dels usuaris mòbils marxen si un lloc triga més de 3 segons a carregar. Optimitzar la web recupera aquests clients potencials immediatament.",
      },
    ],
    whyThisPrice: {
      creationBreakdown: [
        "Anàlisi exhaustiva de rendiment en dispositius reals de gamma mitjana i baixa",
        "Inspecció d'accessibilitat profunda amb axe-core, teclat complet i lectors de pantalla (NVDA / VoiceOver)",
        "Depuració i eliminació de JavaScript no utilitzat (tree-shaking manual i 'code splitting')",
        "Optimització de tipografies, càrrega diferida de recursos i format modern d'imatges (AVIF / WebP)",
        "Correcció directa sobre el teu codi font de contrastos, atributs ARIA, landmarks i focus visible",
        "Lliurament d'un informe tècnic comparatiu abans/després amb dades verificables",
      ],
      monthlyBreakdown: [
        "Monitoratge continu de mètriques de camp (CrUX - Chrome User Experience Report)",
        "Alertes proactives davant regressions de rendiment després d'actualitzacions de contingut",
        "Auditoria periòdica d'accessibilitat per garantir que els nous continguts continuen complint la normativa",
        "Ajustaments ràpids davant canvis d'algoritme de Google sobre Core Web Vitals",
      ],
      whyCommitmentOneYear: "El rendiment web es degrada ràpidament quan s'afegeixen nous continguts, scripts de màrqueting o píxels. La supervisió continuada durant 1 any assegura que la feina feta no es perdi al cap de dos mesos.",
    },
    marketComparison: [
      {
        name: "El nostre servei d'Enginyeria Audit & Fix",
        priceRange: "450 € entrada + 39 €/mes",
        speedLighthouse: "Optimitzat per a màxim rendiment a Lighthouse",
        maintenanceCost: "39 €/mes (Monitoratge i ajustos continus)",
        hiddenCosts: "Zero costos ocults",
        codeOwnership: "Millores directes integrades al teu repositori",
        summary: "No només et donem un PDF amb problemes: nosaltres mateixos apliquem les correccions al teu codi.",
      },
      {
        name: "Auditories tradicionals d'agències SEO",
        priceRange: "600 € a 1.500 €",
        speedLighthouse: "No arreglen res (només et donen un informe)",
        maintenanceCost: "Sense manteniment inclòs",
        hiddenCosts: "Has de contractar a banda un desenvolupador perquè apliqui les recomanacions",
        codeOwnership: "No toquen codi",
        summary: "Informes automatitzats de 40 pàgines que acaben en un calaix perquè ningú sap com implementar-los.",
      },
      {
        name: "Plugins màgics d'optimització (ex: plugins de WordPress)",
        priceRange: "50 € a 150 €/any de llicència",
        speedLighthouse: "Sovint trenquen la web o falsegen les proves de laboratori",
        maintenanceCost: "Llicència recurrent sense suport especialitzat",
        hiddenCosts: "Hores perdudes intentant configurar compatibilitats",
        codeOwnership: "Codi ofuscat",
        summary: "Posar un pegat superficial que no soluciona el codi base mal estructurat.",
      },
      {
        name: "Sense optimització (no fer res)",
        priceRange: "0 € inicials aparents",
        speedLighthouse: "Pèssim (30 - 55 / 100)",
        maintenanceCost: "Pèrdua constant de vendes i trànsit dia rere dia",
        hiddenCosts: "Possibles sancions de l'EAA i pèrdua de posicionament",
        codeOwnership: "N/A",
        summary: "La decisió més cara a llarg termini: perdre clients cada dia per lentitud.",
      },
    ],
    features: [
      "Auditoria integral de Core Web Vitals (LCP, CLS, INP) amb DevTools",
      "Inspecció d'accessibilitat profunda amb axe-core i lectors de pantalla",
      "Eliminació de codi JS innecessari i optimització de recursos crítics",
      "Correcció de contrastos de color, focus visible i semàntica HTML",
      "Informe tècnic comparatiu abans i després amb mètriques verificables",
      "Seguiment mensual de mètriques i accessibilitat (manteniment mín. 1 any)",
    ],
    ctaText: "Auditar el Meu Lloc (450 €)",
  },
  {
    id: "cicd-devops",
    name: "Pipelines CI/CD & Automatització",
    icon: "bx:git-branch",
    iconColor: "text-sky-600",
    badge: "Fiabilitat & Desplegament Continu",
    badgeColor: "bg-sky-50 text-sky-700 border-sky-200/80",
    tagline: "Automatització total del cicle de lliurament del codi amb seguretat i zero caigudes de servei.",
    description: "Eliminació completa d'errors manuals de publicació. Des del git push fins al desplegament a producció amb tests automàtics, linters i auditories de qualitat que bloquegen regressions.",
    targetAudience: "Equips de desenvolupament, agències o pimes que volen desplegar canvis sense por de trencar la producció.",
    timeline: "2 a 5 dies hàbils",
    creationPrice: "Des de 350 €",
    creationPriceNumber: 350,
    monthlyFee: "35 €/mes",
    monthlyFeeNumber: 35,
    annualTotal: "770 € el 1r any (pipeline complet configurat + 12 mesos de manteniment)",
    dailyCostEquivalent: "~2,10 €/dia durant el primer any",
    amortizationSummary: "S'amortitza estalviant hores cares d'enginyeria en cada lliurament i evitant parades del servei en producció.",
    amortizationPoints: [
      {
        title: "Estalvi d'hores d'enginyeria per cada desplegament",
        metric: "5 a 15 hores/mes recuperades",
        description: "Pujar fitxers per FTP o SSH a mà és lent i propens a errors humans. Amb CI/CD tot el procés és atòmic i triga menys de 3 minuts sense intervenció manual.",
      },
      {
        title: "Zero caigudes de servei (Zero Downtime Deployments)",
        metric: "100% continuïtat de negoci",
        description: "El pipeline publica la nova versió només quan ha superat tots els tests i està llesta. Si falla, manté la versió anterior activa sense cap segon de pantalla en blanc.",
      },
      {
        title: "Detecció preventiva d'errors abans d'arribar als usuaris",
        metric: "90% menys d'incidències a producció",
        description: "El sistema valida automàticament TypeScript, formata el codi i executa la suite de proves en entorns aïllats a cada 'Pull Request'.",
      },
      {
        title: "Previsualitzacions automàtiques per revisar canvis",
        metric: "Aprovacions un 60% més ràpides",
        description: "Cada branca de treball genera automàticament un enllaç de previsualització (preview URL) perquè el client o l'equip pugui revisar les novetats abans de publicar.",
      },
    ],
    whyThisPrice: {
      creationBreakdown: [
        "Configuració completa de fluxos de treball amb GitHub Actions o GitLab CI",
        "Pipeline paral·lelitzat per reduir els temps d'execució al mínim",
        "Execució automàtica de linters (ESLint/Prettier), comprovació estricta de tipus i tests",
        "Integració d'auditoria automàtica de Lighthouse CI que alerta si baixa el rendiment",
        "Gestió segura de secrets d'entorn i claus API xifrades",
        "Documentació clara de col·laboració (CONTRIBUTING.md) per a l'equip",
      ],
      monthlyBreakdown: [
        "Supervisió i manteniment dels 'runners' i fluxos d'execució",
        "Actualització de dependències vulnerables mitjançant bots de seguretat (Dependabot / Renovate)",
        "Resolució ràpida de bloquejos en el cicle de build o fallades de dependències externes",
        "Ajustaments continus de memòria cau per mantenir els temps de build ultraràpids",
      ],
      whyCommitmentOneYear: "Els ecosistemes de biblioteques i les accions de GitHub s'actualitzen constantment. Sense manteniment, els pipelines acaben trencant-se per versions obsoletes de Node.js o accions deprecades.",
    },
    marketComparison: [
      {
        name: "El nostre servei CI/CD Especialitzat",
        priceRange: "350 € entrada + 35 €/mes",
        speedLighthouse: "Auditoria automàtica integrada al flux",
        maintenanceCost: "35 €/mes (Supervisió proactiva de pipelines)",
        hiddenCosts: "0 € en despeses imprevistes",
        codeOwnership: "Fluxos de treball oberts al teu repositori",
        summary: "Infraestructura com a codi, fiable, segura i adaptada exactament a la teva mida.",
      },
      {
        name: "Consultories DevOps sènior externes",
        priceRange: "1.500 € a 3.500 € de tarifa inicial",
        speedLighthouse: "Sovint descuiden la part frontend",
        maintenanceCost: "Tarifes per hores des de 75 € a 120 €/hora",
        hiddenCosts: "Mínims d'hores de contractació mensuals elevats",
        codeOwnership: "Propietat compartida",
        summary: "Molt costós per a equips petits que només necessiten pipelines fiables i nets.",
      },
      {
        name: "Desplegaments manuals tradicionals (FTP / SSH manual)",
        priceRange: "0 € en aparença",
        speedLighthouse: "Sense cap garantia ni control de versions",
        maintenanceCost: "Centenars d'euros en hores perdudes d'equip",
        hiddenCosts: "Errors catastròfics de fitxers sobreescrits per error",
        codeOwnership: "Caòtic",
        summary: "El mètode més lent, insegur i propens a aturades no planificades.",
      },
      {
        name: "Plataformes corporatives tancades",
        priceRange: "Subscripcions des de 80 € a 200 €/mes",
        speedLighthouse: "Variable",
        maintenanceCost: "Manteniment a càrrec del proveïdor",
        hiddenCosts: "Cobrament per minuts addicionals de construcció",
        codeOwnership: "Dependència de la seva infraestructura propietària",
        summary: "Facturació recurrent elevada amb limitacions de configuració personalitzada.",
      },
    ],
    features: [
      "Pipelines automatitzats amb GitHub Actions en paral·lel",
      "Execució automàtica de linters, verificació TypeScript i tests",
      "Auditoria de Lighthouse CI que atura el build si baixen les mètriques",
      "Desplegaments continus amb previews automàtiques a cada Pull Request",
      "Configuració de dependències automatitzada amb Dependabot",
      "Supervisió contínua de pipelines i runners (manteniment mín. 1 any)",
    ],
    ctaText: "Automatitzar el Meu Flux (350 €)",
  },
];
