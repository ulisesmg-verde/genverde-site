// Contenido del sitio. Solo datos verificables (sitio actual o fotos de obra).
// Lo marcado como [VALIDAR] debe confirmarlo Generación Verde antes de publicar.

export const BASE = import.meta.env.BASE_URL;
// En la vista previa compartible (mode=preview) las imágenes van embebidas; en producción se sirven desde /img.
// `#embed` apunta a embed.preview.ts solo en la vista previa compartible; en producción a embed.empty.ts.
import { EMBED } from '#embed';
export const img = (name: string, small = false) =>
  EMBED[`${name}-sm.webp`] ?? `${BASE}img/${name}${small ? '-sm' : ''}.webp`;
/** Versión media (1200 px) para la galería; en la vista previa usa la -md embebida. */
export const imgMd = (name: string) => EMBED[`${name}-md.webp`] ?? `${BASE}img/${name}-md.webp`;
export const logo = (variant: 'h-dark' | 'h-light' | 'v-dark' | 'v-light') => EMBED[`logo-${variant}.png`] ?? `${BASE}img/logo-${variant}.png`;

export const CONTACT = {
  phone: '+52 55 2921 9645',
  phoneHref: 'https://wa.me/525529219645',
  whatsapp: 'https://wa.me/525529219645',
  address: 'Eleuterio Méndez 27, San Simón Ticumac, Benito Juárez, CDMX',
  offices: ['CDMX', 'Guadalajara', 'Mérida'],
};

export const waLink = (msg: string) => `${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;

export const CLIENTS = ['Disney', 'PepsiCo', 'Ford', 'McCormick', 'UNAM', 'Metrobús', 'Camino Real', 'Bandai', 'PISA', 'El Bajío', 'Bodegas Alianza', 'Grupo Indi'];

export type Faq = { q: string; a: string };
export type ServiceType = { title: string; text: string; image: string };
export type Service = {
  slug: string;
  nav: string;
  title: string; // <title>
  description: string; // meta description
  h1: string;
  kicker: string;
  intro: string;
  hero: string;
  answerQ: string;
  answer: string; // respuesta directa citable (40–60 palabras)
  types: ServiceType[];
  benefits: string[];
  price: string;
  priceNote: string;
  priceCta: string;
  faqs: Faq[];
  whatsapp: string;
};

export const SERVICES: Service[] = [
  {
    slug: 'jardines-verticales',
    nav: 'Jardines verticales',
    title: 'Jardines verticales y muros verdes en CDMX | Generación Verde',
    description: 'Diseño, instalación y mantenimiento de jardines verticales y muros verdes naturales, interiores y exteriores, con riego automatizado. Cotiza tu green wall.',
    h1: 'Jardines verticales y muros verdes',
    kicker: 'Paisajismo vertical · green walls',
    intro: 'Muros verdes naturales para interiores y exteriores, diseñados como una pieza de arquitectura y sostenidos con riego automatizado y mantenimiento profesional.',
    hero: 'muro-verde-patio-residencial-cdmx',
    answerQ: '¿Qué es un jardín vertical?',
    answer: 'Un jardín vertical, también llamado muro verde, pared verde o green wall, es un sistema que permite cultivar plantas vivas sobre una superficie vertical. Integra estructura, sustrato o fieltro, riego automatizado y drenaje, y se diseña según la luz, el clima y el uso del espacio, en interior o exterior.',
    types: [
      { title: 'Muros verdes exteriores', text: 'Fachadas, patios, bardas y amenidades. Especies resistentes a sol y viento, con riego programado.', image: 'muro-verde-area-infantil-condominio' },
      { title: 'Jardines verticales interiores', text: 'Vestíbulos, oficinas y cubos de luz. Selección de plantas de sombra y, si hace falta, iluminación de apoyo.', image: 'jardin-vertical-interior-tragaluz' },
      { title: 'Pared de cultivo', text: 'Muros productivos de hierbas y hortalizas para restaurantes, escuelas y corporativos.', image: 'instalacion-muro-verde-plantacion' },
    ],
    benefits: [
      'Riego automatizado que usa menos agua que un jardín tradicional',
      'Tres propuestas de diseño por proyecto',
      'Proyectos de 16 m² a más de 1,000 m²',
      'Mantenimiento programado para conservar el diseño',
    ],
    price: 'Desde 10 m²',
    priceNote: 'El costo depende del tamaño, de la altura, de si existe muro o no, de la necesidad de iluminación adicional, entre otros temas.',
    priceCta: 'Cotiza tu jardín vertical',
    faqs: [
      { q: '¿Cuánto cuesta un jardín vertical por m²?', a: 'Depende del sistema, la altura de instalación, el tipo de riego y las especies. Tras una visita técnica entregamos tres propuestas con costo de instalación y de mantenimiento para que compares.' },
      { q: '¿Un muro verde natural necesita mucho mantenimiento?', a: 'Recomendamos visitas al menos cada dos meses: revisión de riego, nutrición, poda y reposición de plantas. Ofrecemos pólizas mensuales, bimestrales o trimestrales.' },
      { q: '¿Se puede poner un jardín vertical en interiores?', a: 'Sí. Se eligen especies de sombra y se evalúa la luz disponible; cuando no alcanza, se agrega iluminación de apoyo para mantener el muro sano.' },
      { q: '¿Qué diferencia hay entre muro verde, green wall y pared verde?', a: 'Son nombres para lo mismo: un sistema de vegetación viva sobre una superficie vertical. “Pared de cultivo” se usa cuando el muro produce hierbas u hortalizas.' },
      { q: '¿En qué ciudades instalan?', a: 'Tenemos oficinas en CDMX, Guadalajara y Mérida, y atendemos proyectos en Estado de México y Cuernavaca.' },
    ],
    whatsapp: 'Hola, me interesa un jardín vertical / muro verde.',
  },
  {
    slug: 'azoteas-verdes',
    nav: 'Azoteas verdes',
    title: 'Azoteas verdes y techos verdes en CDMX | Generación Verde',
    description: 'Azoteas verdes y techos verdes extensivos e intensivos conforme a la NADF-013 de CDMX. Evaluamos tu losa, diseñamos e instalamos. Cotiza tu azotea verde.',
    h1: 'Azoteas verdes y techos verdes',
    kicker: 'Azoteas ajardinadas · cubiertas vegetales',
    intro: 'Convertimos azoteas en jardines habitables o cubiertas de bajo mantenimiento, con impermeabilización, drenaje y vegetación adaptada a la ciudad.',
    hero: 'azotea-verde-riego-flores-cdmx',
    answerQ: '¿Qué es una azotea verde?',
    answer: 'Una azotea verde, techo verde o azotea ajardinada es una cubierta con capas de impermeabilización, antirraíz, drenaje, sustrato y vegetación. Retiene agua de lluvia, aísla térmicamente el edificio y crea área verde útil. En CDMX su diseño se guía por la norma ambiental NADF-013.',
    types: [
      { title: 'Extensiva', text: 'Bajo peso y poco mantenimiento. Suculentas y cubresuelos; ideal para naves, oficinas y techos sin uso.', image: 'azotea-verde-plantacion-suculentas' },
      { title: 'Intensiva', text: 'Jardín habitable con pasto, arbustos y áreas de estar. Requiere mayor capacidad de carga.', image: 'azotea-verde-terrazas-residencial' },
      { title: 'Rehabilitación de azoteas', text: 'Recuperamos azoteas dañadas: revisión de impermeabilización, pendientes y bajadas pluviales.', image: 'azotea-verde-impermeabilizacion' },
    ],
    benefits: [
      'Evaluación de losa: carga mínima de 250 kg/m²',
      'Diseño conforme a la NADF-013 de SEDEMA',
      'Retardo del desagüe pluvial de 15 a 30 minutos',
      'Supervisión de la adaptación de plantas durante 1 año',
    ],
    price: 'Evaluación a la medida',
    priceNote: 'Para cotizar evaluamos el área a trabajar, la profundidad del sustrato (mínimo 20 cm), el nivel en el que está, entre otras cosas.',
    priceCta: 'Cotiza aquí tu azotea verde',
    faqs: [
      { q: '¿Mi azotea aguanta un techo verde?', a: 'Se revisa la capacidad de carga de la losa; como referencia, una azotea verde requiere al menos 250 kg/m². Hacemos la evaluación antes de proponer el sistema.' },
      { q: '¿Una azotea verde provoca filtraciones?', a: 'No, si se instala con impermeabilización y capa antirraíz adecuadas. En nuestras pólizas de mantenimiento se revisa que el inmueble no sufra filtraciones.' },
      { q: '¿Qué diferencia hay entre azotea verde extensiva e intensiva?', a: 'La extensiva es ligera y de bajo mantenimiento; la intensiva es un jardín habitable con más sustrato, más peso y más cuidado.' },
      { q: '¿Qué norma aplica en CDMX?', a: 'La NADF-013 de SEDEMA establece las especificaciones técnicas para sistemas de naturación en la Ciudad de México.' },
    ],
    whatsapp: 'Hola, me interesa una azotea verde.',
  },
  {
    slug: 'paisajismo',
    nav: 'Paisajismo',
    title: 'Paisajismo y diseño de jardines en CDMX | Generación Verde',
    description: 'Paisajismo para residencias, condominios y corporativos: diseño de jardines, áreas comunes, patios y amenidades con muros verdes. Agenda una visita.',
    h1: 'Paisajismo y diseño de jardines',
    kicker: 'Arquitectura de paisaje',
    intro: 'Diseñamos jardines completos —suelo, muros y azoteas— como un solo paisaje: patios, áreas comunes de condominio, amenidades y espacios corporativos.',
    hero: 'paisajismo-asesoria-de-paisaje',
    answerQ: '¿Qué incluye un proyecto de paisajismo?',
    answer: 'Un proyecto de paisajismo define cómo se ocupa un espacio exterior: trazo, selección de especies, pisos, iluminación, riego y mantenimiento. En Generación Verde integra también jardines verticales y azoteas verdes, para que suelo, muros y techos funcionen como un mismo jardín.',
    types: [
      { title: 'Residencial', text: 'Patios, jardines y terrazas de casas, con muros verdes como fondo escénico.', image: 'jardin-vertical-patio-residencial' },
      { title: 'Condominios y desarrollos', text: 'Áreas comunes, juegos infantiles, fuentes y amenidades que suman valor de venta.', image: 'paisajismo-jardin-muro-verde-condominio' },
      { title: 'Corporativo y hotelería', text: 'Vestíbulos, terrazas y patios que refuerzan la identidad de marca. En la foto: hotel y oficinas en la colonia Nápoles, CDMX.', image: 'muro-verde-hotel-oficinas-napoles' },
    ],
    benefits: [
      'Diseño integral: suelo, muros y azoteas',
      'Equipo de arquitectos, biólogos, agrónomos e ingenieros',
      'Especies adaptadas al clima de cada ciudad',
      'Plan de mantenimiento desde el diseño',
    ],
    price: 'Proyecto a la medida',
    priceNote: 'Diseñamos según el espacio, el clima, las especies y el plan de mantenimiento. Cotizamos tu proyecto sin compromiso.',
    priceCta: 'Cotiza tu proyecto',
    faqs: [
      { q: '¿Hacen solo el diseño o también la obra?', a: 'Ambos. Podemos entregar el proyecto ejecutivo o encargarnos de diseño, instalación y mantenimiento.' },
      { q: '¿Trabajan con despachos de arquitectura y desarrolladores?', a: 'Sí, colaboramos desde la etapa de proyecto para integrar riego, cargas y especies en los planos.' },
      { q: '¿Qué plantas usan?', a: 'Elegimos especies por clima, exposición solar y mantenimiento esperado; en CDMX combinamos ornamentales probadas con especies de bajo consumo de agua.' },
    ],
    whatsapp: 'Hola, me interesa un proyecto de paisajismo.',
  },
  {
    slug: 'mantenimiento',
    nav: 'Mantenimiento',
    title: 'Mantenimiento de jardines verticales y azoteas verdes | Generación Verde',
    description: 'Pólizas de mantenimiento para jardines verticales, muros verdes y azoteas verdes: riego, nutrición, poda y reposición de plantas. Mensual, bimestral o trimestral.',
    h1: 'Mantenimiento de jardines verticales y azoteas verdes',
    kicker: 'Pólizas de mantenimiento',
    intro: 'Cuida tu inversión. Revisamos riego, nutrición, plagas y reposición de plantas para que tu muro verde o azotea se vea como el primer día, aunque no lo hayamos instalado nosotros.',
    hero: 'mant-escalera-muro-verde',
    answerQ: '¿Cada cuánto se da mantenimiento a un jardín vertical?',
    answer: 'Un jardín vertical natural necesita mantenimiento profesional al menos cada dos meses: revisión y limpieza del riego, nutrición, poda, control de plagas y reposición de plantas. En exteriores o con alta exposición solar conviene una visita mensual. Las azoteas verdes requieren además revisar drenajes e impermeabilización.',
    types: [
      { title: 'Póliza mensual', text: 'Para muros exteriores, alta exposición o espacios de alto tránsito.', image: 'mant-rappel-muro-verde' },
      { title: 'Póliza bimestral', text: 'La recomendada para la mayoría de los jardines verticales interiores.', image: 'mant-control-plagas-interior' },
      { title: 'Rescate de muros', text: 'Recuperamos muros verdes descuidados o instalados por terceros.', image: 'mant-rappel-muro-alto' },
    ],
    benefits: [
      'Visitas mensuales, bimestrales o trimestrales',
      'Pólizas anuales con reposición de plantas',
      'Revisión de riego, drenaje y filtraciones',
      'Atendemos muros, azoteas, jardines y huertos',
    ],
    price: 'Pólizas de mantenimiento mensual, bimestral y trimestral',
    priceNote: 'Cotizamos tu proyecto sin compromiso.',
    priceCta: 'Cotiza sin compromiso',
    faqs: [
      { q: '¿Dan mantenimiento a muros que no instalaron ustedes?', a: 'Sí. Hacemos un diagnóstico inicial y, si hace falta, un rescate antes de iniciar la póliza.' },
      { q: '¿Qué incluye una visita de mantenimiento?', a: 'Revisión del riego, nutrición, poda, control de plagas, limpieza y reposición de plantas según la póliza.' },
      { q: '¿Qué pasa si una planta se muere?', a: 'Las pólizas anuales incluyen reposición de plantas; el alcance se define en el contrato.' },
    ],
    whatsapp: 'Hola, me interesa una póliza de mantenimiento.',
  },
  {
    slug: 'jardineria',
    nav: 'Jardinería',
    title: 'Servicio de jardinería residencial y corporativa | Generación Verde',
    description: 'Jardinería profesional para residencias, condominios y oficinas: poda, pasto, riego, fertilización y control de plagas con personal capacitado.',
    h1: 'Servicio de jardinería',
    kicker: 'Jardinería profesional',
    intro: 'Jardineros capacitados para el cuidado continuo de jardines horizontales, áreas comunes y oficinas, con el mismo estándar que aplicamos a nuestros muros verdes.',
    hero: 'jard-jardinera-urbana',
    answerQ: '¿Qué incluye un servicio de jardinería profesional?',
    answer: 'Un servicio de jardinería profesional incluye poda, corte y fertilización de pasto, riego, control de plagas y enfermedades, limpieza y reposición de plantas, con una frecuencia fija y un reporte de cada visita. Para condominios y oficinas se programa con el administrador para no interrumpir la operación.',
    types: [
      { title: 'Condominios', text: 'Áreas comunes, jardineras y amenidades con calendario fijo.', image: 'jard-plantacion-jardinera-urbana' },
      { title: 'Oficinas', text: 'Plantas de interior, jardineras y terrazas corporativas.', image: 'jard-arboles-maceta' },
      { title: 'Residencias', text: 'Jardines privados, patios y terrazas.', image: 'jardin-vertical-patio-residencial' },
    ],
    benefits: ['Calendario fijo de visitas', 'Reporte fotográfico por visita', 'Personal capacitado y uniformado', 'Un solo proveedor para jardín, muros y azotea'],
    price: 'Cotizamos tu proyecto',
    priceNote: 'Revisamos el tipo de plantas que requieres, sustrato, número de visitas y periodicidad.',
    priceCta: 'Cotiza tu proyecto aquí',
    faqs: [
      { q: '¿Atienden condominios?', a: 'Sí, trabajamos con administradores para programar visitas sin afectar a los residentes.' },
      { q: '¿Llevan herramienta e insumos?', a: 'Sí; los insumos especiales (plantas de reposición, fertilizantes específicos) se cotizan aparte.' },
    ],
    whatsapp: 'Hola, me interesa el servicio de jardinería.',
  },
];

export type Project = { slug: string; title: string; service: string; sector: string; city: string; area?: string; image: string };

// Fotos reales de obra. m² y ubicación exacta: [VALIDAR] con el equipo.
export const PROJECTS: Project[] = [
  { slug: 'muro-verde-hotel-oficinas', title: 'Muro verde en hotel y oficinas', service: 'Jardines verticales', sector: 'Hospitalidad', city: 'CDMX', image: 'muro-verde-hotel-oficinas' },
  { slug: 'muro-verde-escuela-militar', title: 'Muro verde en Escuela Militar CDMX', service: 'Jardines verticales', sector: 'Educación', city: 'CDMX', image: 'muro-verde-escuela-militar-cdmx' },
  { slug: 'jardin-vertical-empresa', title: 'Jardín vertical en empresa CDMX', service: 'Jardines verticales', sector: 'Corporativo', city: 'CDMX', image: 'jardin-vertical-empresa-cdmx' },
  { slug: 'azotea-verde-oficina', title: 'Azotea verde con suculentas en oficina', service: 'Azoteas verdes', sector: 'Corporativo', city: 'CDMX', image: 'azotea-verde-oficina' },
  { slug: 'azotea-verde-riego-cdmx', title: 'Azotea verde con riego automatizado CDMX', service: 'Azoteas verdes', sector: 'Residencial', city: 'CDMX', image: 'azotea-verde-riego-flores-cdmx' },
  { slug: 'azoteas-verdes-mexico', title: 'Azoteas verdes en México', service: 'Azoteas verdes', sector: 'Residencial', city: 'CDMX', image: 'azoteas-verdes-mexico' },
  { slug: 'muro-verde-fachada-residencial', title: 'Muro verde en fachada residencial', service: 'Jardines verticales', sector: 'Residencial', city: 'CDMX', image: 'muro-verde-fachada-residencial' },
  { slug: 'muro-verde-corporativo-diseno', title: 'Muro verde con diseño gráfico para corporativo', service: 'Jardines verticales', sector: 'Corporativo', city: 'CDMX', image: 'muro-verde-corporativo-diseno' },
  { slug: 'muro-verde-patio-cempasuchil', title: 'Muro verde en patio de restaurante', service: 'Mantenimiento', sector: 'Hospitalidad', city: 'CDMX', image: 'muro-verde-patio-cempasuchil' },
  { slug: 'muro-verde-patio-residencial', title: 'Muro verde en patio residencial', service: 'Jardines verticales', sector: 'Residencial', city: 'CDMX', image: 'muro-verde-patio-residencial-cdmx' },
  { slug: 'amenidades-condominio', title: 'Amenidades de condominio con muro verde', service: 'Paisajismo', sector: 'Desarrollos', city: 'CDMX', image: 'muro-verde-area-infantil-condominio' },
  { slug: 'jardin-vertical-azotea-verde-condominio', title: 'Jardín vertical y azotea verde en condominio CDMX', service: 'Paisajismo', sector: 'Desarrollos', city: 'CDMX', image: 'jardin-vertical-azotea-verde-condominio' },
  { slug: 'jardin-vertical-instituto', title: 'Jardín vertical en instituto con más de 12 años de vida', service: 'Jardines verticales', sector: 'Educación', city: 'CDMX', image: 'jardin-vertical-instituto-12-anos' },
  { slug: 'jardin-vertical-doble-altura', title: 'Jardín vertical de doble altura', service: 'Jardines verticales', sector: 'Residencial', city: 'CDMX', image: 'muro-verde-doble-altura' },
  { slug: 'jardin-vertical-tragaluz', title: 'Jardín vertical interior bajo tragaluz', service: 'Jardines verticales', sector: 'Corporativo', city: 'CDMX', image: 'jardin-vertical-interior-tragaluz' },
  { slug: 'muro-helechos-interior', title: 'Muro de helechos en interior', service: 'Jardines verticales', sector: 'Residencial', city: 'CDMX', image: 'jardin-vertical-interior-helechos' },
  { slug: 'patio-sofa-muro', title: 'Patio con muro verde de tres niveles', service: 'Jardines verticales', sector: 'Residencial', city: 'CDMX', image: 'jardin-vertical-patio-residencial' },
  { slug: 'terraza-arboles', title: 'Terraza con muro verde y arbolado', service: 'Paisajismo', sector: 'Hospitalidad', city: 'CDMX', image: 'muro-verde-terraza-arboles' },
  { slug: 'instalacion-muro-perimetral', title: 'Muro perimetral en instalación', service: 'Jardines verticales', sector: 'Residencial', city: 'CDMX', image: 'instalacion-muro-verde-plantacion' },
  { slug: 'cubo-escalera', title: 'Cubo de escalera con jardín vertical', service: 'Mantenimiento', sector: 'Corporativo', city: 'CDMX', image: 'jardin-vertical-interior-cubo-escalera' },
  { slug: 'jardin-condominio-lawn', title: 'Jardín con muro verde y pasto', service: 'Paisajismo', sector: 'Desarrollos', city: 'CDMX', image: 'paisajismo-jardin-muro-verde-condominio' },
];

export type BeforeAfter = { image: string; title: string; text: string; services: string[] };

// Composiciones antes/después reales (1201×721, etiquetas incluidas en la imagen).
export const BEFORE_AFTER: BeforeAfter[] = [
  { image: 'antes-despues-cubo-de-luz', title: 'Cubo de luz de doble altura', text: 'Un muro ciego se convierte en el jardín vertical que se ve desde cada piso.', services: ['jardines-verticales'] },
  { image: 'antes-despues-fachada-verde', title: 'Fachada verde en obra nueva', text: 'Integrado desde la estructura: la fachada nace vegetada.', services: ['jardines-verticales'] },
  { image: 'antes-despues-terraza-concreto', title: 'Terraza con muro de concreto', text: 'Concreto aparente transformado en un muro verde con jardinera.', services: ['jardines-verticales', 'paisajismo'] },
  { image: 'antes-despues-muro-exterior', title: 'Muro exterior de colindancia', text: 'Una barda gris se vuelve el fondo escénico del jardín.', services: ['jardines-verticales'] },
  { image: 'antes-despues-muro-interior', title: 'Muro verde bajo cubierta', text: 'Terraza techada con jardín vertical y riego automatizado.', services: ['jardines-verticales'] },
  { image: 'antes-despues-patio-infantil', title: 'Patio con área infantil', text: 'Piso duro y muros blancos convertidos en jardín, pasto y muro verde.', services: ['paisajismo', 'jardines-verticales'] },
  { image: 'antes-despues-rescate-muro', title: 'Rescate de instalación amateur', text: 'Recuperamos un muro instalado por terceros y lo integramos a póliza.', services: ['mantenimiento', 'jardines-verticales'] },
];

// Proceso de instalación de un jardín vertical (fotos reales de obra).
export const INSTALL_STEPS = [
  { title: 'Estructura y placa', text: 'Bastidor metálico anclado al muro y placa de soporte.', image: 'proceso-1-estructura-placa' },
  { title: 'Placa impermeable', text: 'Sellado de juntas para proteger el muro de la humedad.', image: 'proceso-2-placa-impermeable' },
  { title: 'Geotextil', text: 'Capas de geotextil que retienen agua y alojan las raíces.', image: 'proceso-3-geotextil' },
  { title: 'Plantación', text: 'Diseño vegetal por zonas de color, con riego automatizado.', image: 'proceso-4-plantacion' },
];

// Fotos de trabajo en campo (mantenimiento y jardinería), por página de servicio.
export const FIELD_PHOTOS: { image: string; title: string; services: string[] }[] = [
  { image: 'azotea-verde-riego-atardecer', title: 'Riego automatizado por aspersión', services: ['azoteas-verdes'] },
  { image: 'azotea-verde-lavanda-agapandos', title: 'Lavanda, agapandos y pastos ornamentales', services: ['azoteas-verdes'] },
  { image: 'azotea-verde-impermeabilizacion', title: 'Impermeabilización antes de la vegetación', services: ['azoteas-verdes'] },
  { image: 'azotea-verde-plantacion-suculentas', title: 'Plantación de suculentas en azotea extensiva', services: ['azoteas-verdes'] },
  { image: 'azotea-verde-terrazas-residencial', title: 'Terrazas residenciales con azotea verde', services: ['azoteas-verdes'] },
  { image: 'azoteas-verdes-mexico', title: 'Azotea verde extensiva en vivienda', services: ['azoteas-verdes'] },
  { image: 'mant-rappel-muro-verde', title: 'Mantenimiento en altura con rappel', services: ['mantenimiento'] },
  { image: 'mant-control-plagas-interior', title: 'Control de plagas en muro interior', services: ['mantenimiento'] },
  { image: 'mant-escalera-muro-verde', title: 'Poda y reposición de plantas', services: ['mantenimiento'] },
  { image: 'mant-rappel-fachada-residencial', title: 'Equipo certificado en trabajo vertical', services: ['mantenimiento'] },
  { image: 'mant-poda-limpieza', title: 'Poda y limpieza del área', services: ['mantenimiento'] },
  { image: 'mant-altura-cuerda-escalera', title: 'Revisión de riego y nutrición', services: ['mantenimiento'] },
  { image: 'mant-rappel-muro-alto', title: 'Rescate de muro verde de gran altura', services: ['mantenimiento'] },
  { image: 'mant-muro-verde-jardin-residencial', title: 'Mantenimiento de muro verde residencial', services: ['mantenimiento'] },
  { image: 'muro-verde-patio-cempasuchil', title: 'Resultado tras el mantenimiento', services: ['mantenimiento'] },
  { image: 'jard-plantacion-jardinera-urbana', title: 'Plantación de temporada en jardinera urbana', services: ['jardineria'] },
  { image: 'jard-fertilizacion-jardinera', title: 'Fertilización programada', services: ['jardineria'] },
  { image: 'jard-jardinera-urbana', title: 'Jardinera urbana terminada', services: ['jardineria'] },
  { image: 'jard-arboles-maceta', title: 'Árboles y cubresuelos en maceta', services: ['jardineria'] },
  { image: 'jard-traslado-arbol', title: 'Traslado y plantación de árboles', services: ['jardineria'] },
];

export const FIELD_TITLES: Record<string, { title: string; text: string }> = {
  'azoteas-verdes': { title: 'Azoteas verdes en la CDMX', text: 'De la impermeabilización al riego automatizado: así se ve una azotea verde de Generación Verde en la Ciudad de México.' },
};

export const NAV = [
  { label: 'Jardines verticales', href: '/jardines-verticales' },
  { label: 'Azoteas verdes', href: '/azoteas-verdes' },
  { label: 'Paisajismo', href: '/paisajismo' },
  { label: 'Mantenimiento', href: '/mantenimiento' },
  { label: 'Proyectos', href: '/proyectos' },
];
