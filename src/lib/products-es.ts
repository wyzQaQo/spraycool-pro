export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  category: "pump-station" | "misting-system" | "accessories" | "control";
  description: string;
  features: string[];
  specs: ProductSpec[];
  images: string[];
  mainImage: string;
  priceRange: string;
  leadTime: string;
  warranty: string;
}

export const products: Product[] = [
  {
    slug: "mg-pro-1500",
    name: "MG-PRO 1500 Estación de Bombeo de Alta Presión",
    tagline: "Bomba de nebulización industrial de 150 bar con control de motor VFD",
    category: "pump-station",
    description:
      "La MG-PRO 1500 es nuestra estación de bombeo de alta presión insignia, diseñada para funcionamiento continuo 24/7 en los entornos más exigentes. Cuenta con un motor de frecuencia variable de 5.5 kW, cabezal de bomba de acero inoxidable 316L y un sistema inteligente de regulación de presión que mantiene una salida constante en más de 200 conjuntos de boquillas.",
    features: [
      "Presión máxima de funcionamiento de 150 bar",
      "Motor VFD para control de velocidad variable energéticamente eficiente",
      "Cabezal de bomba, válvulas y conexiones de acero inoxidable 316L",
      "Carcasa resistente a la intemperie IP65 con refrigeración activa",
      "Sistema integrado de filtración de agua de 5 etapas",
      "Modbus RTU / TCP para integración SCADA",
      "Protección automática de apagado por bajo nivel de agua",
      "Carcasa con aislamiento acústico (< 55 dB)",
    ],
    specs: [
      { label: "Presión Máxima", value: "150 bar (2,175 PSI)" },
      { label: "Caudal", value: "8-25 L/min (variable)" },
      { label: "Potencia del Motor", value: "5.5 kW, 380V 3-phase" },
      { label: "Material de la Bomba", value: "316L Stainless Steel" },
      { label: "Capacidad de Boquillas", value: "Up to 200 nozzles" },
      { label: "Dimensiones", value: "800 x 600 x 1200 mm" },
      { label: "Peso", value: "145 kg" },
      { label: "Nivel de Ruido", value: "< 55 dB(A)" },
      { label: "Grado de Protección", value: "IP65" },
      { label: "Filtración", value: "5-stage (50/20/5/1/0.5 micron)" },
      { label: "Comunicación", value: "Modbus RTU, TCP/IP, 4G optional" },
      { label: "Temp. de Funcionamiento", value: "-10°C to 55°C" },
    ],
    images: ["/images/products/pump-station.png"],
    mainImage: "/images/products/pump-station.png",
    priceRange: "$8,500 - $12,000",
    leadTime: "4-6 weeks",
    warranty: "5 years",
  },
  {
    slug: "mg-mist-pro-x200",
    name: "MG-MIST PRO X200 Sistema de Nebulización Completo",
    tagline: "Solución de refrigeración exterior lista para usar con 200 boquillas cerámicas",
    category: "misting-system",
    description:
      "Un paquete completo de sistema de nebulización listo para instalar que incluye la bomba MG-PRO 1500, 200 boquillas cerámicas de precisión, 500 metros de tubería de acero inoxidable de alta presión y todo el hardware de montaje. Ideal para restaurantes, resorts y espacios comerciales medianos de hasta 5,000 m².",
    features: [
      "200 boquillas cerámicas antiobstrucción de 0.15 mm",
      "500 m de tubería HP de acero inoxidable 316L (DE 9.52 mm)",
      "Racores de compresión de conexión rápida, sin necesidad de soldadura",
      "Colector de válvulas de zona premontado (hasta 8 zonas)",
      "Incluye controlador IoT con programación basada en el clima",
      "Listo para inyección de repelente botánico contra mosquitos",
      "Soporte de instalación en sitio disponible",
      "Certificado CE, RoHS, ISO 9001",
    ],
    specs: [
      { label: "Área de Cobertura", value: "Up to 5,000 m²" },
      { label: "Número de Boquillas", value: "200 (expandable to 400)" },
      { label: "Longitud de Tubería", value: "500m included" },
      { label: "Material de Tubería", value: "316L Stainless Steel" },
      { label: "Orificio de Boquilla", value: "0.15mm Ceramic" },
      { label: "Tamaño de Gota", value: "5-15 micron" },
      { label: "Capacidad de Refrigeración", value: "Up to 15°C reduction" },
      { label: "Zonas", value: "8 (expandable to 16)" },
      { label: "Altura de Montaje", value: "2.5 - 6 meters" },
      { label: "Consumo de Agua", value: "8-25 L/min" },
      { label: "Potencia", value: "380V 3-phase, 5.5 kW" },
      { label: "Compatible con Repelente", value: "Yes, integrated dosing pump" },
    ],
    images: ["/images/products/outdoor-installation.png"],
    mainImage: "/images/products/outdoor-installation.png",
    priceRange: "$15,000 - $25,000",
    leadTime: "6-8 weeks",
    warranty: "5 years (pump), 3 years (nozzles)",
  },
  {
    slug: "mg-nozzle-c150",
    name: "MG-NOZZLE C150 Juego de Boquillas Cerámicas de Nebulización",
    tagline: "Boquillas cerámicas de precisión de 0.15 mm con válvula antigoteo",
    category: "accessories",
    description:
      "Nuestra boquilla cerámica patentada con válvula antirretorno antigoteo integrada. El orificio de 0.15 mm perforado con láser de precisión produce un patrón de niebla consistente de 5-15 micras. Cada boquilla se prueba individualmente en caudal y viene con una garantía antiobstrucción de 3 años.",
    features: [
      "Orificio cerámico perforado con láser de 0.15 mm",
      "Válvula antigoteo integrada con resorte",
      "Cuerpo y racor de compresión de acero inoxidable 316L",
      "Opciones de ángulo de pulverización de 90° o 180°",
      "Diseño sellado con junta tórica, libre de mantenimiento",
      "Probada individualmente en caudal y serializada",
      "Tamaños de orificio intercambiables disponibles (0.1 mm, 0.2 mm, 0.3 mm)",
      "Compatible con todas las tuberías estándar de 9.52 mm DE",
    ],
    specs: [
      { label: "Tamaño del Orificio", value: "0.15mm (0.1/0.2/0.3mm available)" },
      { label: "Material del Cuerpo", value: "316L Stainless Steel" },
      { label: "Material del Orificio", value: "Zirconia Ceramic" },
      { label: "Ángulo de Pulverización", value: "90° or 180°" },
      { label: "Caudal", value: "0.04-0.06 L/min per nozzle" },
      { label: "Presión de Funcionamiento", value: "70-150 bar" },
      { label: "Tamaño de Gota", value: "5-15 micron at 150 bar" },
      { label: "Conexión", value: "9.52mm OD compression" },
      { label: "Antigoteo", value: "Spring-loaded check valve" },
      { label: "Peso", value: "28g per nozzle" },
    ],
    images: ["/images/products/ceramic-nozzles.png"],
    mainImage: "/images/products/ceramic-nozzles.png",
    priceRange: "$18 - $35 per nozzle",
    leadTime: "2-3 weeks",
    warranty: "3 years",
  },
  {
    slug: "mg-iot-hub",
    name: "MG-IOT HUB Sistema de Control Inteligente",
    tagline: "Control de nebulización conectado a la nube con optimización climática IA",
    category: "control",
    description:
      "El MG-IOT HUB aporta automatización inteligente a su sistema de nebulización. Cuenta con una pantalla táctil industrial de 7 pulgadas, acceso al panel de control en la nube, programación basada en el clima, control a nivel de zona y un modo de optimización opcional con IA que aprende patrones de uso para minimizar el consumo de agua y energía.",
    features: [
      "Pantalla táctil industrial IP65 de 7 pulgadas",
      "Panel de control en la nube accesible desde cualquier dispositivo",
      "Integración API meteorológica para programación automática",
      "Control independiente de 8 zonas con temporizadores",
      "Modo de optimización IA (ahorro de energía/agua)",
      "Monitoreo en tiempo real de temperatura, humedad y presión",
      "Notificaciones push para alertas de mantenimiento",
      "Registro y exportación de datos históricos (CSV/PDF)",
      "Modbus RTU/TCP para integración SCADA/BMS",
      "Conectividad de respaldo 4G (SIM incluida)",
    ],
    specs: [
      { label: "Pantalla", value: '7" IPS touchscreen, 1024x600' },
      { label: "Conectividad", value: "WiFi, Ethernet, 4G LTE" },
      { label: "Protocolos", value: "Modbus RTU/TCP, MQTT, HTTP API" },
      { label: "Control de Zonas", value: "8 zones (expandable to 16)" },
      { label: "Sensores", value: "Temperature, humidity, pressure, flow" },
      { label: "Plataforma en la Nube", value: "MG Cloud (AWS hosted)" },
      { label: "Alertas", value: "Push, SMS, Email" },
      { label: "Exportación de Datos", value: "CSV, PDF reports" },
      { label: "Protección", value: "IP65 front panel" },
      { label: "Potencia", value: "24V DC, PoE option" },
      { label: "Temp. de Funcionamiento", value: "-20°C to 60°C" },
      { label: "Dimensiones", value: "220 x 145 x 45 mm" },
    ],
    images: ["/images/products/iot-controller.png"],
    mainImage: "/images/products/iot-controller.png",
    priceRange: "$2,500 - $4,500",
    leadTime: "2-4 weeks",
    warranty: "3 years",
  },
  {
    slug: "mg-repellent-kit",
    name: "MG-REPEL Kit de Inyección de Repelente contra Mosquitos",
    tagline: "Dosificación automática de repelente botánico para zonas libres de mosquitos",
    category: "accessories",
    description:
      "Se integra perfectamente con cualquier sistema de nebulización MG para inyectar dosis medidas de repelente botánico o sintético en la línea de niebla. Horarios programables, dosificación específica por zona y un depósito de concentrado de 20L proporcionan semanas de funcionamiento autónomo. Crea un perímetro protector de 6 metros de altura.",
    features: [
      "Bomba dosificadora peristáltica de precisión (0.1-10 mL/min)",
      "Depósito de concentrado HDPE de 20L con sensor de nivel",
      "Programas de dosificación específicos por zona",
      "Compatible con repelentes botánicos y sintéticos",
      "Alertas automáticas de nivel bajo y recordatorios de recarga",
      "Prevención de reflujo y doble contención",
      "Integración de conexión rápida con sistemas MG existentes",
      "Concentrados repelentes registrados EPA disponibles",
    ],
    specs: [
      { label: "Tipo de Bomba", value: "Peristaltic (precision dosing)" },
      { label: "Rango de Dosificación", value: "0.1 - 10 mL/min" },
      { label: "Depósito", value: "20L HDPE with level sensor" },
      { label: "Altura de Cobertura", value: "Up to 6 meters" },
      { label: "Tipos de Repelente", value: "Botanical (pyrethrin) & synthetic" },
      { label: "Potencia", value: "24V DC from MG pump station" },
      { label: "Integración", value: "Plug-and-play with MG-IOT HUB" },
      { label: "Seguridad", value: "Double containment, backflow prevention" },
      { label: "Dimensiones", value: "400 x 300 x 500 mm" },
      { label: "Peso (vacío)", value: "8 kg" },
    ],
    images: [],
    mainImage: "",
    priceRange: "$1,200 - $2,000",
    leadTime: "2-3 weeks",
    warranty: "2 years",
  },
  {
    slug: "mg-industrial-complete",
    name: "MG-INDUSTRIAL Sistema Completo de Refrigeración para Fábricas",
    tagline: "Nebulización de alta resistencia para fábricas, almacenes e instalaciones industriales de hasta 10,000 m²",
    category: "misting-system",
    description:
      "Diseñado para los entornos industriales más exigentes. Dos estaciones de bombeo MG-PRO 1500 redundantes, 400 boquillas de alta resistencia, 1,000 metros de tubería y filtración de grado industrial. Incluye modo de supresión de polvo y funcionamiento a alta temperatura hasta 65°C ambiente.",
    features: [
      "Dos estaciones de bombeo redundantes de 150 bar (configuración N+1)",
      "400 boquillas cerámicas de alta resistencia con carcasa reforzada",
      "1,000 m de tubería 316L de grado industrial",
      "Modo de supresión de polvo con opción de gota más grande",
      "Sistema de tratamiento de agua industrial de 10 etapas",
      "Funcionamiento a alta temperatura nominal hasta 65°C ambiente",
      "Ciclo de trabajo continuo 24/7",
      "Integración SCADA con protocolo OPC UA",
    ],
    specs: [
      { label: "Área de Cobertura", value: "Up to 10,000 m²" },
      { label: "Estaciones de Bombeo", value: "2x MG-PRO 1500 (N+1 redundant)" },
      { label: "Número de Boquillas", value: "400 (expandable to 800)" },
      { label: "Tubería", value: "1,000m 316L SS included" },
      { label: "Capacidad de Refrigeración", value: "Up to 15°C reduction" },
      { label: "Supresión de Polvo", value: "Yes, dedicated mode" },
      { label: "Temp. Ambiente Máx.", value: "65°C" },
      { label: "Tratamiento de Agua", value: "10-stage industrial system" },
      { label: "Potencia", value: "2x 380V 3-phase, 5.5 kW each" },
      { label: "Protocolos", value: "Modbus, OPC UA, MQTT" },
      { label: "Ciclo de Trabajo", value: "24/7 continuous rated" },
      { label: "Instalación", value: "Engineer-supervised, 2-3 weeks" },
    ],
    images: [],
    mainImage: "",
    priceRange: "$35,000 - $55,000",
    leadTime: "8-12 weeks",
    warranty: "5 years (pumps), 3 years (nozzles)",
  },
];

export const categories = [
  { key: "all", label: "Todos los Productos" },
  { key: "misting-system", label: "Sistemas Completos" },
  { key: "pump-station", label: "Estaciones de Bombeo" },
  { key: "control", label: "Sistemas de Control" },
  { key: "accessories", label: "Accesorios" },
] as const;

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(
  category: Product["category"] | "all"
): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}
