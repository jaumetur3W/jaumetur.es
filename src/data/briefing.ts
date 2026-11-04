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
  lang: "es" | "en";
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

const STORE_YES_ES = "Sí, quiero una tienda con pago online";
const STORE_NO_ES = "No, solo quiero mostrar productos o recibir consultas";
const LANGUAGES_YES_ES = "Sí, en varios idiomas";
const LANGUAGES_NO_ES = "No, solo en un idioma";

const STORE_YES_EN = "Yes, I want an online store with online payment";
const STORE_NO_EN = "No, I only want to showcase products or receive inquiries";
const LANGUAGES_YES_EN = "Yes, in multiple languages";
const LANGUAGES_NO_EN = "No, only in one language";

const briefingDataEs: BriefingData = {
  lang: "es",
  title: "Briefing para tu nueva web",
  description: "Ayúdame a entender tu negocio y qué necesitas de la web.",
  intro:
    "Ayúdame a entender tu negocio y qué necesitas de la web. No hace falta que conozcas términos técnicos. Responde con la información que tengas; si algo todavía no está decidido, indícalo. Después revisaremos los materiales y concretaremos los detalles que falten.",
  noJsMessage: "Este formulario necesita JavaScript para enviarse. También puedes escribir a jaumetur3w@gmail.com.",
  botcheckLabel: "No rellenes este campo si eres una persona",
  requiredMessage: "Esta pregunta es obligatoria.",
  emailMessage: "Indica un correo válido para poder responderte.",
  ariaRequiredLabel: "obligatorio",
  submitLabel: "Enviar el briefing",
  submittingLabel: "Enviando…",
  successMessage: "Briefing enviado. ¡Gracias!",
  errorMessage:
    "No se ha podido enviar el briefing y tus respuestas continúan en el formulario. Vuelve a intentarlo o escribe a jaumetur3w@gmail.com.",
  subjectPrefix: "Nuevo briefing:",
  sections: [
    {
      id: "contacte",
      title: "Tus datos",
      description: "Los necesito para poder responderte.",
      questions: [
        { id: "nom", key: "name", label: "¿Cómo te llamas?", type: "text", required: true },
        { id: "correu", key: "email", label: "¿A qué correo puedo responderte?", type: "email", required: true },
      ],
    },
    {
      id: "negoci",
      title: "1. Tu negocio",
      description: "Empecemos por lo esencial.",
      questions: [
        { id: "negoci-nom", label: "¿Cómo se llama el negocio o proyecto?", type: "text", required: true },
        {
          id: "negoci-descripcio",
          label: "¿A qué se dedica el negocio y qué lo hace especial?",
          description: "Explica qué ofreces y por qué un cliente te elegiría a ti.",
          type: "textarea",
          required: true,
        },
        {
          id: "objectius",
          label: "¿Qué te gustaría conseguir con la web?",
          type: "checkbox",
          required: true,
          options: [
            "Conseguir más clientes o contactos",
            "Presentar mis productos o servicios",
            "Vender productos online",
            "Recibir reservas o solicitudes",
            "Mostrar proyectos o trabajos anteriores",
            "Reforzar la imagen de marca",
            "Facilitar información a los clientes",
            "Otra cosa",
          ],
        },
        {
          id: "client-ideal",
          label: "¿Quién es tu cliente ideal?",
          description: "Puedes marcar más de una opción.",
          type: "checkbox",
          required: true,
          options: [
            "Particulares",
            "Profesionales, autónomos o empresas",
            "Arquitectos o interioristas",
            "Comercios, hoteles o restaurantes",
            "Distribuidores u otros profesionales del sector",
            "Otro perfil",
            "Todavía no lo tengo claro",
          ],
        },
        {
          id: "client-necessitats",
          label: "¿Qué buscan estos clientes y qué les puedes ofrecer?",
          description: "Si no lo tienes claro, puedes dejarlo en blanco.",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      id: "contingut",
      title: "2. Contenido y estilo",
      description: "No hace falta que sepas qué páginas son técnicamente necesarias; explica qué te gustaría mostrar.",
      questions: [
        {
          id: "apartats",
          label: "¿Qué apartados te gustaría que tuviera la web?",
          type: "checkbox",
          required: true,
          options: [
            "Inicio",
            "Sobre nosotros",
            "Productos o servicios",
            "Catálogo o tienda online",
            "Proyectos, galería o portafolio",
            "Opiniones de clientes",
            "Preguntas frecuentes",
            "Contacto y ubicación",
            "Blog o noticias",
            "No lo sé; proponme una estructura",
          ],
        },
        {
          id: "estil",
          label: "¿Qué estilo visual te gusta más?",
          type: "checkbox",
          required: true,
          options: [
            "Elegante y minimalista",
            "Moderno y tecnológico",
            "Natural, artesanal y cercano",
            "Atrevido y con personalidad",
            "Oscuro y sofisticado",
            "Limpio y corporativo",
            "Colorido y dinámico",
            "No lo tengo claro; me gustaría recibir una propuesta",
          ],
        },
        {
          id: "marca",
          label: "¿Qué colores, tipografías o elementos de marca debemos respetar?",
          description: "Por ejemplo: logotipo existente, colores corporativos o elementos que no quieras utilizar.",
          type: "textarea",
          required: false,
        },
        {
          id: "inspiracio",
          label: "Enlaza webs o marcas que te gusten y explica qué te gusta de cada una.",
          description: "Puedes poner varios enlaces. Nos interesa la inspiración, no copiar otra web.",
          type: "textarea",
          required: false,
        },
        {
          id: "accio-principal",
          label: "¿Qué acción principal quieres que haga una persona cuando entre en la web?",
          description: "Por ejemplo: comprar, llamar, pedir presupuesto, reservar o visitar el local.",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      id: "funcions",
      title: "3. Funciones y datos de contacto",
      questions: [
        {
          id: "funcions-web",
          label: "¿Qué funciones necesitas?",
          type: "checkbox",
          required: true,
          options: [
            "Botón de WhatsApp",
            "Teléfono clicable",
            "Mapa, dirección y horario",
            "Formulario de contacto",
            "Reservas o citas",
            "Solicitud de presupuesto",
            "Galería de fotos o proyectos",
            "Opiniones de clientes",
            "Buscador o filtros",
            "Idiomas múltiples",
            "Otra función",
            "No lo sé; recomiéndame qué necesito",
          ],
        },
        {
          id: "dades-contacte",
          label: "¿Qué datos de contacto quieres mostrar?",
          description:
            "Indica los que correspondan: correo, teléfono, WhatsApp, dirección, horario y redes sociales. Puedes añadirlos más adelante.",
          type: "textarea",
          required: false,
        },
        {
          id: "pagament-online",
          label: "¿Quieres que los clientes compren y paguen directamente desde la web?",
          description: "La respuesta determina si tendrás que completar la sección específica de tienda.",
          type: "radio",
          required: true,
          options: [STORE_YES_ES, STORE_NO_ES],
        },
      ],
    },
    {
      id: "botiga",
      title: "4. Detalles de la tienda online",
      description: "Esta sección solo es necesaria si quieres que los clientes compren directamente desde la web.",
      showWhen: { question: "pagament-online", value: STORE_YES_ES },
      questions: [
        {
          id: "productes",
          label: "¿Qué productos vendes y qué datos tienes de cada producto?",
          description: "Por ejemplo: nombre, fotos, precio, descripción, materiales, dimensiones, variantes y disponibilidad.",
          type: "textarea",
          required: true,
        },
        {
          id: "format-cataleg",
          label: "¿En qué formato tienes el catálogo?",
          type: "radio",
          required: true,
          options: [
            "En una hoja Excel o de cálculo",
            "En un PDF o catálogo descargable",
            "En una web existente",
            "En fichas, documentos o carpetas de fotos",
            "Todavía lo tengo que preparar",
            "En varios formatos",
          ],
        },
        {
          id: "tipus-compra",
          label: "¿Cómo quieres que se realicen las compras?",
          type: "radio",
          required: true,
          options: [
            "Compra directa con carrito y pago online",
            "Pedidos sin pago inmediato",
            "Solicitud de presupuesto",
            "Consulta por WhatsApp antes de comprar",
            "Una combinación de estas opciones",
            "Todavía no lo tengo decidido",
          ],
        },
        {
          id: "metodes-pagament",
          label: "¿Qué métodos de pago quieres ofrecer?",
          description: "Marca los que ya sabes que quieres. Si no lo tienes decidido, selecciona la última opción.",
          type: "checkbox",
          required: true,
          options: [
            "Tarjeta bancaria",
            "PayPal",
            "Transferencia bancaria",
            "Pago al recoger o contra reembolso",
            "Otro método",
            "No lo sé; necesito asesoramiento",
          ],
        },
        {
          id: "enviaments",
          label: "¿Cómo funcionarán los envíos y las devoluciones?",
          description:
            "Indica zonas de envío, coste o gratuidad, plazos, recogida en tienda y condiciones de devolución, si ya lo sabes.",
          type: "textarea",
          required: false,
        },
        {
          id: "plataforma",
          label: "¿Tienes ya una plataforma de tienda o un proveedor de pagos?",
          description:
            "Si es así, indica cuál. No compartas contraseñas ni claves privadas en este formulario.",
          type: "textarea",
          required: false,
        },
      ],
    },
    {
      id: "idiomes",
      title: "5. Idiomas de la web",
      description: "Si solo necesitas un idioma, puedes pasar directamente a la sección de materiales.",
      questions: [
        {
          id: "multiidioma",
          label: "¿La web debe estar disponible en más de un idioma?",
          type: "radio",
          required: true,
          options: [LANGUAGES_YES_ES, LANGUAGES_NO_ES, "Todavía no lo tengo decidido"],
        },
      ],
    },
    {
      id: "idiomes-detalls",
      title: "Idiomas: detalles",
      showWhen: { question: "multiidioma", value: LANGUAGES_YES_ES },
      questions: [
        {
          id: "idiomes-necessaris",
          label: "¿Qué idiomas necesitas?",
          type: "checkbox",
          required: true,
          options: ["Español", "Valenciano / catalán", "Inglés", "Francés", "Alemán", "Italiano", "Otro idioma"],
        },
        {
          id: "idioma-defecte",
          label: "¿En qué idioma quieres que aparezca la web por defecto?",
          type: "radio",
          required: true,
          options: ["Español", "Valenciano / catalán", "Inglés", "Otro de los idiomas indicados"],
        },
        {
          id: "traduccions",
          label: "¿Tienes los textos traducidos?",
          type: "radio",
          required: true,
          options: [
            "Sí, tengo todas las traducciones",
            "Solo tengo los textos en un idioma",
            "Necesito ayuda con las traducciones",
            "Todavía no lo sé",
          ],
        },
      ],
    },
    {
      id: "materials",
      title: "6. Materiales disponibles",
      description:
        "No hace falta subirlo todo ahora. Puedes compartir una carpeta de Google Drive, Dropbox u otro servicio con los materiales.",
      questions: [
        {
          id: "material-preparat",
          label: "¿Qué material tienes preparado?",
          type: "radio",
          required: true,
          options: [
            "Casi todo: logotipo, fotos y textos",
            "Logotipo y fotografías, pero faltan textos",
            "Textos, pero faltan fotografías",
            "Catálogo o documentos, pero hay que organizarlos",
            "Tengo poca cosa y necesito ayuda para preparar el contenido",
          ],
        },
        {
          id: "carpeta",
          label: "Enlace a una carpeta con el logotipo, fotografías, textos, catálogos u otros materiales",
          description:
            "Comprueba que el enlace tenga permisos para que podamos ver los archivos. No incluyas contraseñas ni datos sensibles.",
          type: "textarea",
          required: false,
        },
        {
          id: "web-actual",
          label: "Enlace a la web actual, redes sociales u otras páginas del negocio",
          type: "textarea",
          required: false,
        },
        {
          id: "imprescindibles",
          label: "¿Hay alguna cosa que la web deba tener obligatoriamente o que no quieras ver jamás?",
          description: "Por ejemplo: colores a evitar, contenido que no se deba publicar o funciones imprescindibles.",
          type: "textarea",
          required: false,
        },
        {
          id: "altres-detalls",
          label: "¿Hay algún otro detalle importante que no te hayamos preguntado?",
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

export const briefingTitle = briefingDataEs.title;
export const briefingIntro = briefingDataEs.intro;
export const briefingSections = briefingDataEs.sections;

export function getBriefingData(locale: string = "es"): BriefingData {
  return locale === "en" ? briefingDataEn : briefingDataEs;
}
