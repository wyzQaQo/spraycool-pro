export interface Industry {
  slug: string;
  name: string;
  icon: string;
  hero: string;
  challenge: string;
  solution: string;
  applications: string[];
  caseStudy: string;
}

export const industries: Industry[] = [
  {
    slug: "resorts-hotels",
    name: "Resorts y Hoteles",
    icon: "Buildings",
    hero: "Transforme la experiencia de sus huéspedes con climatización exterior invisible. Extienda la temporada de terraza junto a la piscina y comidas al aire libre durante todo el año.",
    challenge: "Las áreas exteriores representan más del 40% del espacio de los resorts, pero generan la mayor cantidad de quejas durante las temporadas de calor. La climatización tradicional falla en entornos abiertos, y los mosquitos obligan a los huéspedes a entrar después del atardecer, acabando con los ingresos de alimentos y bebidas.",
    solution: "100Cooling crea zonas de microclima en terrazas de piscina, restaurantes frente a la playa, jardines de spa y pasillos para huéspedes. La niebla a nivel de micras se evapora instantáneamente, refrescando a los huéspedes sin mojar las superficies. La inyección integrada de repelente botánico mantiene los espacios nocturnos libres de mosquitos.",
    applications: [
      "Zonas de enfriamiento para terraza de piscina y tumbonas",
      "Perímetros de nebulización para restaurantes y bares al aire libre",
      "Climatización de jardines de spa y áreas de relajación",
      "Cortinas de enfriamiento para pasillos y entradas de lobby",
    ],
    caseStudy: "Amari Resorts, Phuket — reducción de temperatura de 12\u00B0C en 6 zonas exteriores. El restaurante frente a la playa pasó de ser el menos reservado al más reservado.",
  },
  {
    slug: "restaurants-bars",
    name: "Restaurantes y Bares",
    icon: "Storefront",
    hero: "Convierta su terraza en la sección de asientos más rentable. Mantenga a los comensales cómodos y aleje los mosquitos durante las horas pico de la noche.",
    challenge: "Las comidas al aire libre generan márgenes superiores, pero el calor del verano y los mosquitos hacen que las terrazas sean inutilizables durante las horas pico de ingresos (5PM-10PM). Los ventiladores soplan aire caliente. El aire acondicionado portátil es ineficaz. Los sistemas de rociado tradicionales mojan mesas y alimentos.",
    solution: "Las boquillas de techo o integradas en pérgola de 100Cooling crean una envolvente de enfriamiento invisible. Los comensales sienten entre 5 y 10\u00B0C menos sin humedad en la piel, la ropa o los alimentos. La protección nocturna contra mosquitos mantiene las mesas llenas durante todo el servicio de cena.",
    applications: [
      "Líneas de nebulización perimetral para terraza y patio",
      "Zonas de enfriamiento para barra y mesas altas",
      "Nebulización de confort en filas de entrada",
      "Climatización para espacios en azotea",
    ],
    caseStudy: "Múltiples cadenas de restaurantes en el sudeste asiático reportan un aumento del 30-60% en ingresos por asientos al aire libre tras la instalación de 100Cooling.",
  },
  {
    slug: "factories",
    name: "Fábricas y Manufactura",
    icon: "Factory",
    hero: "Reduzca el estrés térmico, mejore la productividad de los trabajadores y proteja los equipos. Enfriamiento de grado industrial que se paga solo en meses.",
    challenge: "Los pisos de fábrica superan regularmente los 38\u00B0C en climas tropicales. El estrés térmico reduce la productividad de los trabajadores entre un 20 y un 40%, aumenta las tasas de accidentes y daña los equipos sensibles a la temperatura. El aire acondicionado tiene un costo prohibitivo para grandes naves abiertas.",
    solution: "Los sistemas industriales de 100Cooling enfrían hasta 10,000 m² por instalación. Las estaciones de bombeo dobles redundantes garantizan operación 24/7. El modo de supresión de polvo agrega control de partículas en el aire. ROI típico: 8-12 meses solo por ganancias de productividad.",
    applications: [
      "Zonas de enfriamiento en línea de producción (estaciones de trabajo específicas)",
      "Climatización de almacenes y muelles de carga",
      "Supresión de polvo para operaciones de madera, textil y minería",
      "Enfriamiento de equipos para maquinaria sensible al calor",
    ],
    caseStudy: "TechTronics Manufacturing, Shenzhen — instalación de 15,000 m². La temperatura del piso bajó de 38\u00B0C a 26\u00B0C. Productividad de los trabajadores aumentó un 22%. El sistema se pagó solo en 8 meses.",
  },
  {
    slug: "warehouses",
    name: "Almacenes y Logística",
    icon: "Warehouse",
    hero: "Mantenga fresco su inventario, equipos y personal en espacios de techos altos donde el HVAC tradicional no llega.",
    challenge: "Los espacios de almacén de gran volumen atrapan el calor. Los techos altos hacen que el enfriamiento tradicional sea impráctico. Los trabajadores en las zonas de picking y empaque sufren fatiga por calor, reduciendo el rendimiento y aumentando las tasas de error.",
    solution: "La configuración de boquillas de alto alcance de 100Cooling proporciona enfriamiento a zonas de trabajo específicas sin acondicionar todo el volumen. Ahorro energético significativo en comparación con HVAC: nuestros sistemas usan un 90% menos de electricidad para un enfriamiento equivalente.",
    applications: [
      "Enfriamiento puntual en estaciones de picking y empaque",
      "Gestión de temperatura en muelles de carga",
      "Climatización de zonas de amortiguamiento de cadena de frío",
      "Enfriamiento de instalaciones de cross-docking y clasificación",
    ],
    caseStudy: "Múltiples centros logísticos en el sudeste asiático utilizan 100Cooling para enfriamiento por zonas, reportando una mejora de productividad del 15-20% en operaciones de picking.",
  },
  {
    slug: "sports-venues",
    name: "Recintos Deportivos y Estadios",
    icon: "SoccerBall",
    hero: "Mantenga a los atletas rindiendo y a los espectadores cómodos. Enfriamiento de precisión para campos de entrenamiento, áreas de asientos y canchas exteriores.",
    challenge: "Los deportes al aire libre en climas tropicales enfrentan cancelaciones por calor y ausencia de espectadores. El rendimiento de los atletas se degrada significativamente por encima de los 30\u00B0C. El enfriamiento tradicional no puede escalar a las dimensiones de un estadio.",
    solution: "100Cooling despliega arreglos de enfriamiento por zonas en secciones de asientos, bancas de jugadores, campos de entrenamiento y áreas de calentamiento. Nuestros sistemas se utilizan en estadios profesionales en todo el sudeste asiático y Medio Oriente.",
    applications: [
      "Zonas de enfriamiento para gradas de espectadores",
      "Nebulización en bancas de jugadores y laterales",
      "Enfriamiento perimetral de campos de entrenamiento",
      "Sistemas de límite para canchas de tenis y baloncesto",
    ],
    caseStudy: "KL Sports Hub, Malasia — cobertura de 12,000 m². Las reservas nocturnas se triplicaron tras la instalación. Cero cancelaciones de eventos por calor desde el despliegue.",
  },
  {
    slug: "shopping-retail",
    name: "Centros Comerciales y Retail",
    icon: "ShoppingCart",
    hero: "Extienda la experiencia de compras al exterior. Enfríe paseos al aire libre, patios de comida y espacios para eventos para aumentar el tiempo de permanencia y el gasto.",
    challenge: "Los desarrollos comerciales al aire libre pierden afluencia de público durante las tardes calurosas. Los compradores corren de tienda con aire acondicionado a tienda, saltándose las áreas comunes exteriores, terrazas de restaurantes y espacios para eventos.",
    solution: "100Cooling transforma los espacios comerciales exteriores en áreas de reunión confortables. Los paseos frescos, las terrazas de patios de comida y las plazas de eventos mantienen a los compradores más tiempo, aumentando directamente el gasto por visita.",
    applications: [
      "Enfriamiento de paseos en centros comerciales al aire libre",
      "Climatización de patios de comida y terrazas",
      "Confort en plazas de eventos y espacios de espectáculos",
      "Cortinas de nebulización en entradas y filas de taxis",
    ],
    caseStudy: "Múltiples centros de estilo de vida en Bangkok y Dubái reportan un aumento del 25-40% en el tiempo de permanencia en áreas exteriores tras la instalación de 100Cooling.",
  },
  {
    slug: "greenhouse-agriculture",
    name: "Invernaderos y Agricultura",
    icon: "Plant",
    hero: "Control preciso de humedad y temperatura para condiciones óptimas de cultivo. Proteja los cultivos de alto valor del estrés térmico sin exceso de humedad.",
    challenge: "Los invernaderos se sobrecalientan rápidamente en climas tropicales y subtropicales. Los sistemas de nebulización tradicionales producen gotas grandes que mojan el follaje, promoviendo enfermedades fúngicas. La humedad inconsistente estresa los cultivos y reduce el rendimiento.",
    solution: "La niebla a nivel de micras de 100Cooling (5-15 µm) mantiene una humedad precisa sin mojar las hojas. Los controladores inteligentes se integran con los sistemas climáticos existentes para una automatización perfecta. Utilizado por productores comerciales en todo el sudeste asiático.",
    applications: [
      "Climatización de cultivos de alto valor (orquídeas, cannabis, microvegetales)",
      "Gestión de humedad en casas de plántulas y propagación",
      "Control ambiental para cultivo de hongos",
      "Sistemas de enfriamiento para ganado y aves de corral",
    ],
    caseStudy: "Los cultivadores comerciales de orquídeas en Tailandia reportan una reducción del 30% en pérdida de cultivos durante la temporada de calor con los sistemas de invernadero 100Cooling.",
  },
  {
    slug: "municipal-public",
    name: "Espacios Municipales y Públicos",
    icon: "City",
    hero: "Enfríe plazas públicas, paradas de transporte y áreas de espera al aire libre. Combine enfriamiento con control de mosquitos para resultados de salud pública.",
    challenge: "Las islas de calor urbanas hacen inhabitables los espacios públicos durante el verano. Las paradas de autobús, plazas y mercados al aire libre se convierten en riesgos para la salud. Los municipios enfrentan una presión creciente para proporcionar infraestructura de enfriamiento y prevención de enfermedades transmitidas por mosquitos.",
    solution: "Los sistemas municipales 100Cooling proporcionan enfriamiento público a escala. La inyección integrada de repelente de mosquitos protege la salud pública. Nuestros sistemas están desplegados en espacios públicos en Singapur, Bangkok y Dubái.",
    applications: [
      "Instalaciones de enfriamiento en plazas y explanadas públicas",
      "Nebulización en paradas de autobús y áreas de espera de transporte",
      "Climatización de mercados al aire libre y bazares",
      "Zonas de enfriamiento en parques públicos y áreas de juegos",
    ],
    caseStudy: "La Agencia Nacional de Medio Ambiente de Singapur utiliza nebulización de alta presión en múltiples espacios públicos para enfriamiento combinado y control de mosquitos.",
  },
  {
    slug: "events-entertainment",
    name: "Eventos y Espacios de Entretenimiento",
    icon: "Calendar",
    hero: "Enfriamiento portátil y escalable para eventos al aire libre. Mantenga a los asistentes cómodos y comprometidos sin importar el clima.",
    challenge: "Los eventos al aire libre — conciertos, festivales, bodas, funciones corporativas — están a merced del clima. El calor aleja a los asistentes, reduce las ventas del bar y crea riesgos de responsabilidad. El aire acondicionado portátil es caro, ruidoso e inadecuado.",
    solution: "100Cooling ofrece tanto instalaciones permanentes como unidades portátiles de alquiler para espacios de eventos. El despliegue rápido, la operación silenciosa y el rendimiento de enfriamiento comprobado hacen que los eventos al aire libre sean viables incluso en pleno verano.",
    applications: [
      "Enfriamiento de multitudes en conciertos y festivales",
      "Confort para bodas y eventos corporativos",
      "Climatización de exposiciones al aire libre y ferias comerciales",
      "Enfriamiento de filas de espera en parques temáticos",
    ],
    caseStudy: "Múltiples organizadores de eventos en Dubái y el sudeste asiático confían en los sistemas 100Cooling para eventos al aire libre con más de 5,000 asistentes.",
  },
  {
    slug: "pest-control",
    name: "Empresas de Control de Plagas",
    icon: "Bug",
    hero: "Ofrezca a sus clientes una solución premium y automatizada de control de mosquitos. Agregue ingresos recurrentes con las asociaciones de revendedores 100Cooling.",
    challenge: "Los métodos tradicionales de control de plagas — nebulización, fumigación, cebos — requieren visitas frecuentes con mucha mano de obra. La cobertura es temporal. Los clientes exigen soluciones más efectivas y automatizadas para grandes áreas exteriores.",
    solution: "Conviértase en revendedor certificado de 100Cooling. Nuestros sistemas proporcionan control de mosquitos automatizado y programado con opciones de repelentes botánicos o sintéticos. La altura de rociado de 6 metros crea perímetros protectores. El monitoreo remoto reduce las visitas de servicio.",
    applications: [
      "Barreras perimetrales contra mosquitos en urbanizaciones residenciales",
      "Sistemas integrados para campos de golf y clubes campestres",
      "Contratos de gestión de mosquitos para hoteles y resorts",
      "Programas municipales de prevención de enfermedades transmitidas por mosquitos",
    ],
    caseStudy: "MistAway y CoastalMister han construido negocios de más de $10M en nebulización automatizada contra mosquitos. 100Cooling ofrece hardware competitivo con mejores márgenes para revendedores.",
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((ind) => ind.slug === slug);
}
