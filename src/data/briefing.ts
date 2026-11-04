export interface BriefingQuestion {
  id: string;
  label: string;
  type: "text" | "email" | "textarea" | "checkbox" | "radio";
  required: boolean;
  description?: string;
  options?: string[];
  /** Field name sent to Web3Forms when it differs from the label. */
  key?: string;
}

export interface BriefingSection {
  id: string;
  title: string;
  description?: string;
  /** The section stays hidden and disabled until this answer is selected. */
  showWhen?: { question: string; value: string };
  questions: BriefingQuestion[];
}

export const briefingTitle = "Briefing per a la teua nova web";
export const briefingIntro =
  "Ajuda’m a entendre el teu negoci i què necessites de la web. No cal que conegues termes tècnics. Respon amb la informació que tingues; si alguna cosa encara no està decidida, indica-ho. Després revisarem els materials i concretarem els detalls que falten.";

const STORE_YES = "Sí, vull una botiga amb pagament en línia";
const LANGUAGES_YES = "Sí, en diversos idiomes";

export const briefingSections: BriefingSection[] = [
  {
    id: "contacte",
    title: "Les teues dades",
    description: "Les necessite per a poder respondre’t.",
    questions: [
      { id: "nom", key: "name", label: "Com et dius?", type: "text", required: true },
      { id: "correu", key: "email", label: "A quin correu puc respondre’t?", type: "email", required: true },
    ],
  },
  {
    id: "negoci",
    title: "1. El teu negoci",
    description: "Comencem per allò essencial.",
    questions: [
      { id: "negoci-nom", label: "Com es diu el negoci o projecte?", type: "text", required: true },
      {
        id: "negoci-descripcio",
        label: "A què es dedica el negoci i què el fa especial?",
        description: "Explica què ofereixes i per què un client et triaria a tu.",
        type: "textarea",
        required: true,
      },
      {
        id: "objectius",
        label: "Què t’agradaria aconseguir amb la web?",
        type: "checkbox",
        required: true,
        options: [
          "Aconseguir més clients o contactes",
          "Presentar els meus productes o serveis",
          "Vendre productes en línia",
          "Rebre reserves o sol·licituds",
          "Mostrar projectes o treballs anteriors",
          "Reforçar la imatge de marca",
          "Facilitar informació als clients",
          "Una altra cosa",
        ],
      },
      {
        id: "client-ideal",
        label: "Qui és el teu client ideal?",
        description: "Pots marcar més d’una opció.",
        type: "checkbox",
        required: true,
        options: [
          "Particulars",
          "Professionals, autònoms o empreses",
          "Arquitectes o interioristes",
          "Comerços, hotels o restaurants",
          "Distribuïdors o altres professionals del sector",
          "Un altre perfil",
          "Encara no ho tinc clar",
        ],
      },
      {
        id: "client-necessitats",
        label: "Què busquen aquests clients i què els pots oferir?",
        description: "Si no ho tens clar, pots deixar-ho en blanc.",
        type: "textarea",
        required: false,
      },
    ],
  },
  {
    id: "contingut",
    title: "2. Contingut i estil",
    description: "No cal que sàpies quines pàgines són tècnicament necessàries; explica què t’agradaria mostrar.",
    questions: [
      {
        id: "apartats",
        label: "Quins apartats t’agradaria que tinguera la web?",
        type: "checkbox",
        required: true,
        options: [
          "Inici",
          "Sobre nosaltres",
          "Productes o serveis",
          "Catàleg o botiga en línia",
          "Projectes, galeria o portafolis",
          "Opinions de clients",
          "Preguntes freqüents",
          "Contacte i ubicació",
          "Blog o notícies",
          "No ho sé; proposa’m una estructura",
        ],
      },
      {
        id: "estil",
        label: "Quin estil visual t’agrada més?",
        type: "checkbox",
        required: true,
        options: [
          "Elegant i minimalista",
          "Modern i tecnològic",
          "Natural, artesanal i pròxim",
          "Atrevit i amb personalitat",
          "Fosc i sofisticat",
          "Net i corporatiu",
          "Colorit i dinàmic",
          "No ho tinc clar; m’agradaria rebre una proposta",
        ],
      },
      {
        id: "marca",
        label: "Quins colors, tipografies o elements de marca hem de respectar?",
        description: "Per exemple: logotip existent, colors corporatius o elements que no vols utilitzar.",
        type: "textarea",
        required: false,
      },
      {
        id: "inspiracio",
        label: "Enllaça webs o marques que t’agraden i explica què t’agrada de cadascuna.",
        description: "Pots posar diversos enllaços. Ens interessa la inspiració, no copiar una altra web.",
        type: "textarea",
        required: false,
      },
      {
        id: "accio-principal",
        label: "Quina acció principal vols que faça una persona quan entre a la web?",
        description: "Per exemple: comprar, telefonar, demanar pressupost, reservar o visitar el local.",
        type: "textarea",
        required: true,
      },
    ],
  },
  {
    id: "funcions",
    title: "3. Funcions i dades de contacte",
    questions: [
      {
        id: "funcions-web",
        label: "Quines funcions necessites?",
        type: "checkbox",
        required: true,
        options: [
          "Botó de WhatsApp",
          "Telèfon clicable",
          "Mapa, adreça i horari",
          "Formulari de contacte",
          "Reserves o cites",
          "Sol·licitud de pressupost",
          "Galeria de fotos o projectes",
          "Opinions de clients",
          "Cercador o filtres",
          "Idiomes múltiples",
          "Una altra funció",
          "No ho sé; recomana’m què necessite",
        ],
      },
      {
        id: "dades-contacte",
        label: "Quines dades de contacte vols mostrar?",
        description: "Indica les que pertoquen: correu, telèfon, WhatsApp, adreça, horari i xarxes socials. Pots afegir-les més avant.",
        type: "textarea",
        required: false,
      },
      {
        id: "pagament-online",
        label: "Vols que els clients compren i paguen directament des de la web?",
        description: "La resposta determina si hauràs de completar la secció específica de botiga.",
        type: "radio",
        required: true,
        options: [STORE_YES, "No, només vull mostrar productes o rebre consultes"],
      },
    ],
  },
  {
    id: "botiga",
    title: "4. Detalls de la botiga en línia",
    description: "Aquesta secció només és necessària si vols que els clients compren directament des de la web.",
    showWhen: { question: "pagament-online", value: STORE_YES },
    questions: [
      {
        id: "productes",
        label: "Quins productes vens i quines dades tens de cada producte?",
        description: "Per exemple: nom, fotos, preu, descripció, materials, dimensions, variants i disponibilitat.",
        type: "textarea",
        required: true,
      },
      {
        id: "format-cataleg",
        label: "En quin format tens el catàleg?",
        type: "radio",
        required: true,
        options: [
          "En un full Excel o full de càlcul",
          "En un PDF o catàleg descarregable",
          "En una web existent",
          "En fitxes, documents o carpetes de fotos",
          "Encara l’he de preparar",
          "En diversos formats",
        ],
      },
      {
        id: "tipus-compra",
        label: "Com vols que es facen les compres?",
        type: "radio",
        required: true,
        options: [
          "Compra directa amb cistella i pagament en línia",
          "Comandes sense pagament immediat",
          "Sol·licitud de pressupost",
          "Consulta per WhatsApp abans de comprar",
          "Una combinació d’aquestes opcions",
          "Encara no ho tinc decidit",
        ],
      },
      {
        id: "metodes-pagament",
        label: "Quins mètodes de pagament vols oferir?",
        description: "Marca els que ja saps que vols. Si no ho tens decidit, selecciona l’última opció.",
        type: "checkbox",
        required: true,
        options: [
          "Targeta bancària",
          "PayPal",
          "Transferència bancària",
          "Pagament en recollir o contra reemborsament",
          "Un altre mètode",
          "No ho sé; necessite assessorament",
        ],
      },
      {
        id: "enviaments",
        label: "Com funcionaran els enviaments i les devolucions?",
        description: "Indica zones d’enviament, cost o gratuïtat, terminis, recollida en botiga i condicions de devolució, si ja ho saps.",
        type: "textarea",
        required: false,
      },
      {
        id: "plataforma",
        label: "Tens ja una plataforma de botiga o un proveïdor de pagaments?",
        description: "Si sí, indica quin. No compartisques contrasenyes ni claus privades en aquest formulari.",
        type: "textarea",
        required: false,
      },
    ],
  },
  {
    id: "idiomes",
    title: "5. Idiomes de la web",
    description: "Si només necessites un idioma, pots passar directament a la secció de materials.",
    questions: [
      {
        id: "multiidioma",
        label: "La web ha d’estar disponible en més d’un idioma?",
        type: "radio",
        required: true,
        options: [LANGUAGES_YES, "No, només en un idioma", "Encara no ho tinc decidit"],
      },
    ],
  },
  {
    id: "idiomes-detalls",
    title: "Idiomes: detalls",
    showWhen: { question: "multiidioma", value: LANGUAGES_YES },
    questions: [
      {
        id: "idiomes-necessaris",
        label: "Quins idiomes necessites?",
        type: "checkbox",
        required: true,
        options: ["Valencià/català", "Castellà", "Anglés", "Francés", "Alemany", "Italià", "Un altre idioma"],
      },
      {
        id: "idioma-defecte",
        label: "En quin idioma vols que aparega la web per defecte?",
        type: "radio",
        required: true,
        options: ["Valencià/català", "Castellà", "Anglés", "Un altre dels idiomes indicats"],
      },
      {
        id: "traduccions",
        label: "Tens els textos traduïts?",
        type: "radio",
        required: true,
        options: [
          "Sí, tinc totes les traduccions",
          "Només tinc els textos en un idioma",
          "Necessite ajuda amb les traduccions",
          "Encara no ho sé",
        ],
      },
    ],
  },
  {
    id: "materials",
    title: "6. Materials disponibles",
    description: "No cal pujar-ho tot ara. Pots compartir una carpeta de Google Drive, Dropbox o un altre servei amb els materials.",
    questions: [
      {
        id: "material-preparat",
        label: "Quin material tens preparat?",
        type: "radio",
        required: true,
        options: [
          "Quasi tot: logotip, fotos i textos",
          "Logotip i fotografies, però falten textos",
          "Textos, però falten fotografies",
          "Catàleg o documents, però cal organitzar-los",
          "Tinc poca cosa i necessite ajuda per preparar el contingut",
        ],
      },
      {
        id: "carpeta",
        label: "Enllaç a una carpeta amb el logotip, fotografies, textos, catàlegs o altres materials",
        description: "Comprova que l’enllaç tinga permisos perquè puguem veure els fitxers. No inclogues contrasenyes ni dades sensibles.",
        type: "textarea",
        required: false,
      },
      {
        id: "web-actual",
        label: "Enllaç a la web actual, xarxes socials o altres pàgines del negoci",
        type: "textarea",
        required: false,
      },
      {
        id: "imprescindibles",
        label: "Hi ha alguna cosa que la web haja de tindre obligatòriament o que no vulgues veure mai?",
        description: "Per exemple: colors a evitar, contingut que no s’ha de publicar o funcions imprescindibles.",
        type: "textarea",
        required: false,
      },
      {
        id: "altres-detalls",
        label: "Hi ha algun altre detall important que no t’hàgem preguntat?",
        type: "textarea",
        required: false,
      },
    ],
  },
];
