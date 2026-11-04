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

export interface BriefingData {
  lang: "ca" | "en";
  title: string;
  description: string;
  intro: string;
  noJsMessage: string;
  botcheckLabel: string;
  requiredMessage: string;
  emailMessage: string;
  ariaRequiredLabel: string;
  submitLabel: string;
  submittingLabel: string;
  successMessage: string;
  errorMessage: string;
  subjectPrefix: string;
  sections: BriefingSection[];
}

const STORE_YES_CA = "Sí, vull una botiga amb pagament en línia";
const STORE_NO_CA = "No, només vull mostrar productes o rebre consultes";
const LANGUAGES_YES_CA = "Sí, en diversos idiomes";
const LANGUAGES_NO_CA = "No, només en un idioma";

const STORE_YES_EN = "Yes, I want an online store with online payment";
const STORE_NO_EN = "No, I only want to showcase products or receive inquiries";
const LANGUAGES_YES_EN = "Yes, in multiple languages";
const LANGUAGES_NO_EN = "No, only in one language";

const briefingDataCa: BriefingData = {
  lang: "ca",
  title: "Briefing per a la teua nova web",
  description: "Ajuda’m a entendre el teu negoci i què necessites de la web.",
  intro:
    "Ajuda’m a entendre el teu negoci i què necessites de la web. No cal que conegues termes tècnics. Respon amb la informació que tingues; si alguna cosa encara no està decidida, indica-ho. Després revisarem els materials i concretarem els detalls que falten.",
  noJsMessage: "Aquest formulari necessita JavaScript per a enviar-se. També pots escriure a jaumetur3w@gmail.com.",
  botcheckLabel: "No ompligues aquest camp si eres una persona",
  requiredMessage: "Aquesta pregunta és obligatòria.",
  emailMessage: "Indica un correu vàlid per a poder respondre’t.",
  ariaRequiredLabel: "obligatori",
  submitLabel: "Enviar el briefing",
  submittingLabel: "Enviant…",
  successMessage: "Briefing enviat. Gràcies!",
  errorMessage:
    "No s’ha pogut enviar el briefing i les teues respostes continuen en el formulari. Torna-ho a provar o escriu a jaumetur3w@gmail.com.",
  subjectPrefix: "Nou briefing:",
  sections: [
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
          description:
            "Indica les que pertoquen: correu, telèfon, WhatsApp, adreça, horari i xarxes socials. Pots afegir-les més avant.",
          type: "textarea",
          required: false,
        },
        {
          id: "pagament-online",
          label: "Vols que els clients compren i paguen directament des de la web?",
          description: "La resposta determina si hauràs de completar la secció específica de botiga.",
          type: "radio",
          required: true,
          options: [STORE_YES_CA, STORE_NO_CA],
        },
      ],
    },
    {
      id: "botiga",
      title: "4. Detalls de la botiga en línia",
      description: "Aquesta secció només és necessària si vols que els clients compren directament des de la web.",
      showWhen: { question: "pagament-online", value: STORE_YES_CA },
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
          description:
            "Indica zones d’enviament, cost o gratuïtat, terminis, recollida en botiga i condicions de devolució, si ja ho saps.",
          type: "textarea",
          required: false,
        },
        {
          id: "plataforma",
          label: "Tens ja una plataforma de botiga o un proveïdor de pagaments?",
          description:
            "Si sí, indica quin. No compartisques contrasenyes ni claus privades en aquest formulari.",
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
          options: [LANGUAGES_YES_CA, LANGUAGES_NO_CA, "Encara no ho tinc decidit"],
        },
      ],
    },
    {
      id: "idiomes-detalls",
      title: "Idiomes: detalls",
      showWhen: { question: "multiidioma", value: LANGUAGES_YES_CA },
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
      description:
        "No cal pujar-ho tot ara. Pots compartir una carpeta de Google Drive, Dropbox o un altre servei amb els materials.",
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
          description:
            "Comprova que l’enllaç tinga permisos perquè puguem veure els fitxers. No inclogues contrasenyes ni dades sensibles.",
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
  ],
};

const briefingDataEn: BriefingData = {
  lang: "en",
  title: "Briefing for your new website",
  description: "Help me understand your business and what you need from your website.",
  intro:
    "Help me understand your business and what you need from the website. You don't need technical knowledge. Answer with whatever information you have; if something isn't decided yet, just say so. We'll review the materials and nail down the remaining details together.",
  noJsMessage: "This form requires JavaScript to submit. You can also email jaumetur3w@gmail.com.",
  botcheckLabel: "Do not fill this field if you are human",
  requiredMessage: "This question is required.",
  emailMessage: "Please enter a valid email address so I can reply to you.",
  ariaRequiredLabel: "required",
  submitLabel: "Submit briefing",
  submittingLabel: "Submitting…",
  successMessage: "Briefing submitted. Thank you!",
  errorMessage:
    "Could not submit the briefing; your answers remain in the form. Please try again or write to jaumetur3w@gmail.com.",
  subjectPrefix: "New briefing:",
  sections: [
    {
      id: "contacte",
      title: "Your details",
      description: "I need them to get back to you.",
      questions: [
        { id: "nom", key: "name", label: "What is your name?", type: "text", required: true },
        { id: "correu", key: "email", label: "Which email can I reply to?", type: "email", required: true },
      ],
    },
    {
      id: "negoci",
      title: "1. Your business",
      description: "Let's start with the essentials.",
      questions: [
        { id: "negoci-nom", label: "What is the name of the business or project?", type: "text", required: true },
        {
          id: "negoci-descripcio",
          label: "What does the business do and what makes it special?",
          description: "Explain what you offer and why a customer would choose you.",
          type: "textarea",
          required: true,
        },
        {
          id: "objectius",
          label: "What would you like to achieve with the website?",
          type: "checkbox",
          required: true,
          options: [
            "Get more clients or leads",
            "Showcase my products or services",
            "Sell products online",
            "Receive bookings or requests",
            "Showcase previous projects or portfolio",
            "Strengthen brand identity",
            "Provide information to customers",
            "Something else",
          ],
        },
        {
          id: "client-ideal",
          label: "Who is your ideal customer?",
          description: "You can select more than one option.",
          type: "checkbox",
          required: true,
          options: [
            "Individuals / consumers",
            "Professionals, freelancers, or companies",
            "Architects or interior designers",
            "Shops, hotels, or restaurants",
            "Distributors or industry peers",
            "Another profile",
            "Not sure yet",
          ],
        },
        {
          id: "client-necessitats",
          label: "What are these customers looking for and what can you offer them?",
          description: "If you're not sure, you can leave this blank.",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      id: "contingut",
      title: "2. Content and style",
      description: "You don't need to know which pages are technically needed; just explain what you'd like to show.",
      questions: [
        {
          id: "apartats",
          label: "Which sections would you like the website to have?",
          type: "checkbox",
          required: true,
          options: [
            "Home",
            "About us",
            "Products or services",
            "Catalog or online store",
            "Projects, gallery, or portfolio",
            "Customer reviews & testimonials",
            "Frequently Asked Questions (FAQ)",
            "Contact and location",
            "Blog or news",
            "Not sure; suggest a structure",
          ],
        },
        {
          id: "estil",
          label: "Which visual style appeals to you most?",
          type: "checkbox",
          required: true,
          options: [
            "Elegant and minimalist",
            "Modern and tech-forward",
            "Natural, handcrafted, and approachable",
            "Bold and distinctive",
            "Dark and sophisticated",
            "Clean and corporate",
            "Colorful and dynamic",
            "Not sure yet; I'd like to see a proposal",
          ],
        },
        {
          id: "marca",
          label: "Which colors, fonts, or brand elements should we follow?",
          description: "For example: existing logo, corporate colors, or elements you want to avoid.",
          type: "textarea",
          required: false,
        },
        {
          id: "inspiracio",
          label: "Link websites or brands you like and explain what you like about each.",
          description: "You can paste multiple links. We look for inspiration, not copying another website.",
          type: "textarea",
          required: false,
        },
        {
          id: "accio-principal",
          label: "What is the main action you want visitors to take when entering the website?",
          description: "For example: buy, call, request a quote, book, or visit the premises.",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      id: "funcions",
      title: "3. Features and contact information",
      questions: [
        {
          id: "funcions-web",
          label: "Which features do you need?",
          type: "checkbox",
          required: true,
          options: [
            "WhatsApp button",
            "Clickable phone number",
            "Map, address, and business hours",
            "Contact form",
            "Bookings or appointments",
            "Quote request",
            "Photo or project gallery",
            "Customer reviews",
            "Search or filters",
            "Multiple languages",
            "Another feature",
            "Not sure; recommend what I need",
          ],
        },
        {
          id: "dades-contacte",
          label: "Which contact details do you want to show?",
          description:
            "Indicate any that apply: email, phone, WhatsApp, address, hours, and social media. You can add them later.",
          type: "textarea",
          required: false,
        },
        {
          id: "pagament-online",
          label: "Do you want customers to buy and pay directly on the website?",
          description: "Your answer determines whether you'll need to complete the dedicated store section.",
          type: "radio",
          required: true,
          options: [STORE_YES_EN, STORE_NO_EN],
        },
      ],
    },
    {
      id: "botiga",
      title: "4. Online store details",
      description: "This section is only needed if you want customers to buy directly on the website.",
      showWhen: { question: "pagament-online", value: STORE_YES_EN },
      questions: [
        {
          id: "productes",
          label: "What products do you sell and what information do you have for each?",
          description: "For example: name, photos, price, description, materials, dimensions, variants, and stock availability.",
          type: "textarea",
          required: true,
        },
        {
          id: "format-cataleg",
          label: "In what format do you have your catalog?",
          type: "radio",
          required: true,
          options: [
            "In an Excel sheet or spreadsheet",
            "In a PDF or downloadable catalog",
            "On an existing website",
            "In product sheets, documents, or photo folders",
            "I still need to prepare it",
            "In multiple formats",
          ],
        },
        {
          id: "tipus-compra",
          label: "How do you want purchases to work?",
          type: "radio",
          required: true,
          options: [
            "Direct purchase with cart and online checkout",
            "Orders without immediate payment",
            "Quote request",
            "WhatsApp inquiry before buying",
            "A combination of these options",
            "Not decided yet",
          ],
        },
        {
          id: "metodes-pagament",
          label: "Which payment methods do you want to offer?",
          description: "Select those you already know you want. If undecided, pick the last option.",
          type: "checkbox",
          required: true,
          options: [
            "Credit/debit card",
            "PayPal",
            "Bank transfer",
            "Cash on delivery or pay on pickup",
            "Another method",
            "Not sure; I need advice",
          ],
        },
        {
          id: "enviaments",
          label: "How will shipping and returns work?",
          description:
            "Indicate delivery zones, shipping costs or free shipping thresholds, delivery times, store pickup, and return policies, if known.",
          type: "textarea",
          required: false,
        },
        {
          id: "plataforma",
          label: "Do you already have an e-commerce platform or payment processor?",
          description:
            "If yes, please indicate which. Do not share passwords or private keys in this form.",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      id: "idiomes",
      title: "5. Website languages",
      description: "If you only need one language, you can skip straight to the materials section.",
      questions: [
        {
          id: "multiidioma",
          label: "Should the website be available in more than one language?",
          type: "radio",
          required: true,
          options: [LANGUAGES_YES_EN, LANGUAGES_NO_EN, "Not decided yet"],
        },
      ],
    },
    {
      id: "idiomes-detalls",
      title: "Languages: details",
      showWhen: { question: "multiidioma", value: LANGUAGES_YES_EN },
      questions: [
        {
          id: "idiomes-necessaris",
          label: "Which languages do you need?",
          type: "checkbox",
          required: true,
          options: ["Valencian / Catalan", "Spanish", "English", "French", "German", "Italian", "Another language"],
        },
        {
          id: "idioma-defecte",
          label: "Which language should the website display by default?",
          type: "radio",
          required: true,
          options: ["Valencian / Catalan", "Spanish", "English", "Another of the selected languages"],
        },
        {
          id: "traduccions",
          label: "Do you already have the translated copy?",
          type: "radio",
          required: true,
          options: [
            "Yes, I have all translations ready",
            "I only have copy in one language",
            "I need help with translations",
            "Not sure yet",
          ],
        },
      ],
    },
    {
      id: "materials",
      title: "6. Available materials",
      description:
        "You don't need to upload everything now. You can share a Google Drive, Dropbox, or other cloud folder with your materials.",
      questions: [
        {
          id: "material-preparat",
          label: "What materials do you have ready?",
          type: "radio",
          required: true,
          options: [
            "Almost everything: logo, photos, and copy",
            "Logo and photography, but missing copy",
            "Copy, but missing photography",
            "Catalog or documents, but need organizing",
            "Very little; I need help preparing the content",
          ],
        },
        {
          id: "carpeta",
          label: "Link to a cloud folder with logo, photos, copy, catalogs, or other materials",
          description:
            "Make sure the link has viewing permissions. Do not include passwords or sensitive information.",
          type: "textarea",
          required: false,
        },
        {
          id: "web-actual",
          label: "Link to current website, social media, or other business pages",
          type: "textarea",
          required: false,
        },
        {
          id: "imprescindibles",
          label: "Is there anything the website must definitely have or that you never want to see?",
          description: "For example: colors to avoid, content that shouldn't be published, or essential must-have features.",
          type: "textarea",
          required: false,
        },
        {
          id: "altres-detalls",
          label: "Are there any other important details we haven't asked about?",
          type: "textarea",
          required: false,
        },
      ],
    },
  ],
};

export const briefingTitle = briefingDataCa.title;
export const briefingIntro = briefingDataCa.intro;
export const briefingSections = briefingDataCa.sections;

export function getBriefingData(locale: string = "ca"): BriefingData {
  return locale === "en" ? briefingDataEn : briefingDataCa;
}
