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
    name: "MG-PRO 1500 High-Pressure Pump Station",
    tagline: "150 bar industrial-grade misting pump with VFD motor control",
    category: "pump-station",
    description:
      "The MG-PRO 1500 is our flagship high-pressure pump station engineered for continuous 24/7 operation in the most demanding environments. Features a 5.5 kW variable frequency drive motor, 316L stainless steel pump head, and intelligent pressure regulation system that maintains consistent output across 200+ nozzle arrays.",
    features: [
      "150 bar max operating pressure",
      "VFD motor for energy-efficient variable speed control",
      "316L stainless steel pump head, valves, and fittings",
      "IP65 weatherproof enclosure with active cooling",
      "Integrated 5-stage water filtration system",
      "Modbus RTU / TCP for SCADA integration",
      "Automatic low-water shutdown protection",
      "Sound-dampened enclosure (< 55 dB)",
    ],
    specs: [
      { label: "Max Pressure", value: "150 bar (2,175 PSI)" },
      { label: "Flow Rate", value: "8-25 L/min (variable)" },
      { label: "Motor Power", value: "5.5 kW, 380V 3-phase" },
      { label: "Pump Material", value: "316L Stainless Steel" },
      { label: "Nozzle Capacity", value: "Up to 200 nozzles" },
      { label: "Dimensions", value: "800 x 600 x 1200 mm" },
      { label: "Weight", value: "145 kg" },
      { label: "Noise Level", value: "< 55 dB(A)" },
      { label: "Protection Rating", value: "IP65" },
      { label: "Filtration", value: "5-stage (50/20/5/1/0.5 micron)" },
      { label: "Communication", value: "Modbus RTU, TCP/IP, 4G optional" },
      { label: "Operating Temp", value: "-10°C to 55°C" },
    ],
    images: ["/images/products/pump-station.png"],
    mainImage: "/images/products/pump-station.png",
    priceRange: "$8,500 - $12,000",
    leadTime: "4-6 weeks",
    warranty: "5 years",
  },
  {
    slug: "mg-mist-pro-x200",
    name: "MG-MIST PRO X200 Complete Misting System",
    tagline: "Turn-key outdoor cooling solution with 200 ceramic nozzles",
    category: "misting-system",
    description:
      "A complete, ready-to-install misting system package including the MG-PRO 1500 pump, 200 precision ceramic nozzles, 500 meters of high-pressure stainless steel tubing, and all mounting hardware. Ideal for restaurants, resorts, and medium-sized commercial spaces up to 5,000 m².",
    features: [
      "200 x 0.15mm ceramic anti-clog nozzles",
      "500m 316L stainless steel HP tubing (OD 9.52mm)",
      "Quick-connect compression fittings, no welding required",
      "Pre-assembled zone valve manifold (up to 8 zones)",
      "Includes IoT controller with weather-based scheduling",
      "Botanical mosquito repellent injection ready",
      "On-site installation support available",
      "CE, RoHS, ISO 9001 certified",
    ],
    specs: [
      { label: "Coverage Area", value: "Up to 5,000 m²" },
      { label: "Nozzle Count", value: "200 (expandable to 400)" },
      { label: "Tubing Length", value: "500m included" },
      { label: "Tubing Material", value: "316L Stainless Steel" },
      { label: "Nozzle Orifice", value: "0.15mm Ceramic" },
      { label: "Droplet Size", value: "5-15 micron" },
      { label: "Cooling Capacity", value: "Up to 15°C reduction" },
      { label: "Zones", value: "8 (expandable to 16)" },
      { label: "Mounting Height", value: "2.5 - 6 meters" },
      { label: "Water Consumption", value: "8-25 L/min" },
      { label: "Power", value: "380V 3-phase, 5.5 kW" },
      { label: "Repellent Compatible", value: "Yes, integrated dosing pump" },
    ],
    images: ["/images/products/outdoor-installation.png"],
    mainImage: "/images/products/outdoor-installation.png",
    priceRange: "$15,000 - $25,000",
    leadTime: "6-8 weeks",
    warranty: "5 years (pump), 3 years (nozzles)",
  },
  {
    slug: "mg-nozzle-c150",
    name: "MG-NOZZLE C150 Ceramic Misting Nozzle Set",
    tagline: "Precision 0.15mm ceramic orifice nozzles with anti-drip valve",
    category: "accessories",
    description:
      "Our proprietary ceramic nozzle with integrated anti-drip check valve. The 0.15mm precision laser-drilled orifice produces a consistent 5-15 micron mist pattern. Each nozzle is individually flow-tested and comes with a 3-year anti-clog warranty.",
    features: [
      "0.15mm laser-drilled ceramic orifice",
      "Integrated spring-loaded anti-drip valve",
      "316L stainless steel body and compression fitting",
      "90° or 180° spray angle options",
      "O-ring sealed, maintenance-free design",
      "Individually flow-tested and serialized",
      "Interchangeable orifice sizes available (0.1mm, 0.2mm, 0.3mm)",
      "Compatible with all standard 9.52mm OD tubing",
    ],
    specs: [
      { label: "Orifice Size", value: "0.15mm (0.1/0.2/0.3mm available)" },
      { label: "Body Material", value: "316L Stainless Steel" },
      { label: "Orifice Material", value: "Zirconia Ceramic" },
      { label: "Spray Angle", value: "90° or 180°" },
      { label: "Flow Rate", value: "0.04-0.06 L/min per nozzle" },
      { label: "Operating Pressure", value: "70-150 bar" },
      { label: "Droplet Size", value: "5-15 micron at 150 bar" },
      { label: "Connection", value: "9.52mm OD compression" },
      { label: "Anti-Drip", value: "Spring-loaded check valve" },
      { label: "Weight", value: "28g per nozzle" },
    ],
    images: ["/images/products/ceramic-nozzles.png"],
    mainImage: "/images/products/ceramic-nozzles.png",
    priceRange: "$18 - $35 per nozzle",
    leadTime: "2-3 weeks",
    warranty: "3 years",
  },
  {
    slug: "mg-iot-hub",
    name: "MG-IOT HUB Smart Control System",
    tagline: "Cloud-connected misting control with AI weather optimization",
    category: "control",
    description:
      "The MG-IOT HUB brings intelligent automation to your misting system. Features a 7-inch industrial touchscreen, cloud dashboard access, weather-based scheduling, zone-level control, and optional AI-powered optimization that learns usage patterns to minimize water and energy consumption.",
    features: [
      "7-inch IP65 industrial touchscreen display",
      "Cloud dashboard accessible from any device",
      "Weather API integration for automatic scheduling",
      "8-zone independent control with timers",
      "AI optimization mode (energy/water savings)",
      "Real-time temperature, humidity, and pressure monitoring",
      "Push notifications for maintenance alerts",
      "Historical data logging and export (CSV/PDF)",
      "Modbus RTU/TCP for SCADA/BMS integration",
      "4G backup connectivity (SIM included)",
    ],
    specs: [
      { label: "Display", value: "7\" IPS touchscreen, 1024x600" },
      { label: "Connectivity", value: "WiFi, Ethernet, 4G LTE" },
      { label: "Protocols", value: "Modbus RTU/TCP, MQTT, HTTP API" },
      { label: "Zone Control", value: "8 zones (expandable to 16)" },
      { label: "Sensors", value: "Temperature, humidity, pressure, flow" },
      { label: "Cloud Platform", value: "MG Cloud (AWS hosted)" },
      { label: "Alerts", value: "Push, SMS, Email" },
      { label: "Data Export", value: "CSV, PDF reports" },
      { label: "Protection", value: "IP65 front panel" },
      { label: "Power", value: "24V DC, PoE option" },
      { label: "Operating Temp", value: "-20°C to 60°C" },
      { label: "Dimensions", value: "220 x 145 x 45 mm" },
    ],
    images: ["/images/products/iot-controller.png"],
    mainImage: "/images/products/iot-controller.png",
    priceRange: "$2,500 - $4,500",
    leadTime: "2-4 weeks",
    warranty: "3 years",
  },
  {
    slug: "mg-repellent-kit",
    name: "MG-REPEL Mosquito Repellent Injection Kit",
    tagline: "Automated botanical repellent dosing for mosquito-free zones",
    category: "accessories",
    description:
      "Integrates seamlessly with any MG misting system to inject measured doses of botanical or synthetic repellent into the mist line. Programmable schedules, zone-specific dosing, and a 20L concentrate reservoir provide weeks of autonomous operation. Creates a 6-meter high protective perimeter.",
    features: [
      "Precision peristaltic dosing pump (0.1-10 mL/min)",
      "20L HDPE concentrate reservoir with level sensor",
      "Zone-specific dosing programs",
      "Compatible with botanical and synthetic repellents",
      "Automatic low-level alerts and refill reminders",
      "Backflow prevention and double containment",
      "Quick-connect integration with existing MG systems",
      "EPA-registered repellent concentrates available",
    ],
    specs: [
      { label: "Pump Type", value: "Peristaltic (precision dosing)" },
      { label: "Dosing Range", value: "0.1 - 10 mL/min" },
      { label: "Reservoir", value: "20L HDPE with level sensor" },
      { label: "Coverage Height", value: "Up to 6 meters" },
      { label: "Repellent Types", value: "Botanical (pyrethrin) & synthetic" },
      { label: "Power", value: "24V DC from MG pump station" },
      { label: "Integration", value: "Plug-and-play with MG-IOT HUB" },
      { label: "Safety", value: "Double containment, backflow prevention" },
      { label: "Dimensions", value: "400 x 300 x 500 mm" },
      { label: "Weight (empty)", value: "8 kg" },
    ],
    images: [],
    mainImage: "",
    priceRange: "$1,200 - $2,000",
    leadTime: "2-3 weeks",
    warranty: "2 years",
  },
  {
    slug: "mg-industrial-complete",
    name: "MG-INDUSTRIAL Complete Factory Cooling System",
    tagline: "Heavy-duty misting for factories, warehouses, and industrial facilities up to 10,000 m²",
    category: "misting-system",
    description:
      "Designed for the most demanding industrial environments. Dual redundant MG-PRO 1500 pump stations, 400 heavy-duty nozzles, 1,000 meters of tubing, and industrial-grade filtration. Includes dust suppression mode and high-temperature operation up to 65°C ambient.",
    features: [
      "Dual redundant 150 bar pump stations (N+1 configuration)",
      "400 heavy-duty ceramic nozzles with reinforced housing",
      "1,000m industrial-grade 316L tubing",
      "Dust suppression mode with larger droplet option",
      "Industrial 10-stage water treatment system",
      "High-temp operation rated to 65°C ambient",
      "24/7 continuous duty cycle rated",
      "SCADA integration with OPC UA protocol",
    ],
    specs: [
      { label: "Coverage Area", value: "Up to 10,000 m²" },
      { label: "Pump Stations", value: "2x MG-PRO 1500 (N+1 redundant)" },
      { label: "Nozzle Count", value: "400 (expandable to 800)" },
      { label: "Tubing", value: "1,000m 316L SS included" },
      { label: "Cooling Capacity", value: "Up to 15°C reduction" },
      { label: "Dust Suppression", value: "Yes, dedicated mode" },
      { label: "Max Ambient Temp", value: "65°C" },
      { label: "Water Treatment", value: "10-stage industrial system" },
      { label: "Power", value: "2x 380V 3-phase, 5.5 kW each" },
      { label: "Protocols", value: "Modbus, OPC UA, MQTT" },
      { label: "Duty Cycle", value: "24/7 continuous rated" },
      { label: "Installation", value: "Engineer-supervised, 2-3 weeks" },
    ],
    images: [],
    mainImage: "",
    priceRange: "$35,000 - $55,000",
    leadTime: "8-12 weeks",
    warranty: "5 years (pumps), 3 years (nozzles)",
  },
];

export const categories = [
  { key: "all", label: "All Products" },
  { key: "misting-system", label: "Complete Systems" },
  { key: "pump-station", label: "Pump Stations" },
  { key: "control", label: "Control Systems" },
  { key: "accessories", label: "Accessories" },
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
