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
    name: "MG-PRO 1500 Station de Pompage Haute Pression",
    tagline: "Pompe de brumisation industrielle 150 bar avec contrôle moteur VFD",
    category: "pump-station",
    description:
      "La MG-PRO 1500 est notre station de pompage haute pression phare, conçue pour un fonctionnement continu 24/7 dans les environnements les plus exigeants. Dotée d'un moteur à fréquence variable de 5,5 kW, d'une tête de pompe en acier inoxydable 316L et d'un système intelligent de régulation de pression qui maintient un débit constant sur plus de 200 réseaux de buses.",
    features: [
      "Pression de fonctionnement maximale de 150 bar",
      "Moteur VFD pour un contrôle de vitesse variable économe en énergie",
      "Tête de pompe, vannes et raccords en acier inoxydable 316L",
      "Boîtier étanche IP65 avec refroidissement actif",
      "Système intégré de filtration d'eau à 5 étages",
      "Modbus RTU / TCP pour intégration SCADA",
      "Protection automatique d'arrêt en cas de niveau d'eau bas",
      "Boîtier insonorisé (< 55 dB)",
    ],
    specs: [
      { label: "Pression Max", value: "150 bar (2,175 PSI)" },
      { label: "Débit", value: "8-25 L/min (variable)" },
      { label: "Puissance Moteur", value: "5.5 kW, 380V 3-phase" },
      { label: "Matériau de la Pompe", value: "316L Stainless Steel" },
      { label: "Capacité de Buses", value: "Up to 200 nozzles" },
      { label: "Dimensions", value: "800 x 600 x 1200 mm" },
      { label: "Poids", value: "145 kg" },
      { label: "Niveau Sonore", value: "< 55 dB(A)" },
      { label: "Indice de Protection", value: "IP65" },
      { label: "Filtration", value: "5-stage (50/20/5/1/0.5 micron)" },
      { label: "Communication", value: "Modbus RTU, TCP/IP, 4G optional" },
      { label: "Temp. de Fonctionnement", value: "-10°C to 55°C" },
    ],
    images: ["/images/products/pump-station.png"],
    mainImage: "/images/products/pump-station.png",
    priceRange: "$8,500 - $12,000",
    leadTime: "4-6 weeks",
    warranty: "5 years",
  },
  {
    slug: "mg-mist-pro-x200",
    name: "MG-MIST PRO X200 Système de Brumisation Complet",
    tagline: "Solution de refroidissement extérieur clé en main avec 200 buses céramiques",
    category: "misting-system",
    description:
      "Un package complet de système de brumisation prêt à installer comprenant la pompe MG-PRO 1500, 200 buses céramiques de précision, 500 mètres de tuyauterie en acier inoxydable haute pression et toute la quincaillerie de montage. Idéal pour les restaurants, centres de villégiature et espaces commerciaux de taille moyenne jusqu'à 5 000 m².",
    features: [
      "200 buses céramiques anti-colmatage de 0,15 mm",
      "500 m de tuyauterie HP en acier inoxydable 316L (DE 9,52 mm)",
      "Raccords à compression à connexion rapide, sans soudure requise",
      "Collecteur de vannes de zone pré-assemblé (jusqu'à 8 zones)",
      "Contrôleur IoT inclus avec programmation basée sur la météo",
      "Prêt pour l'injection de répulsif botanique contre les moustiques",
      "Assistance à l'installation sur site disponible",
      "Certifié CE, RoHS, ISO 9001",
    ],
    specs: [
      { label: "Zone de Couverture", value: "Up to 5,000 m²" },
      { label: "Nombre de Buses", value: "200 (expandable to 400)" },
      { label: "Longueur de Tuyauterie", value: "500m included" },
      { label: "Matériau de Tuyauterie", value: "316L Stainless Steel" },
      { label: "Orifice de Buse", value: "0.15mm Ceramic" },
      { label: "Taille des Gouttelettes", value: "5-15 micron" },
      { label: "Capacité de Refroidissement", value: "Up to 15°C reduction" },
      { label: "Zones", value: "8 (expandable to 16)" },
      { label: "Hauteur de Montage", value: "2.5 - 6 meters" },
      { label: "Consommation d'Eau", value: "8-25 L/min" },
      { label: "Puissance", value: "380V 3-phase, 5.5 kW" },
      { label: "Compatible Répulsif", value: "Yes, integrated dosing pump" },
    ],
    images: ["/images/products/outdoor-installation.png"],
    mainImage: "/images/products/outdoor-installation.png",
    priceRange: "$15,000 - $25,000",
    leadTime: "6-8 weeks",
    warranty: "5 years (pump), 3 years (nozzles)",
  },
  {
    slug: "mg-nozzle-c150",
    name: "MG-NOZZLE C150 Jeu de Buses de Brumisation Céramiques",
    tagline: "Buses céramiques de précision 0,15 mm avec valve anti-goutte",
    category: "accessories",
    description:
      "Notre buse céramique brevetée avec clapet anti-retour anti-goutte intégré. L'orifice de 0,15 mm percé au laser de précision produit un brouillard constant de 5 à 15 microns. Chaque buse est testée individuellement en débit et livrée avec une garantie anti-colmatage de 3 ans.",
    features: [
      "Orifice céramique percé au laser de 0,15 mm",
      "Clapet anti-goutte intégré à ressort",
      "Corps et raccord à compression en acier inoxydable 316L",
      "Options d'angle de pulvérisation 90° ou 180°",
      "Conception étanche avec joint torique, sans entretien",
      "Testée individuellement en débit et numérotée",
      "Tailles d'orifice interchangeables disponibles (0,1 mm, 0,2 mm, 0,3 mm)",
      "Compatible avec toutes les tuyauteries standard DE 9,52 mm",
    ],
    specs: [
      { label: "Taille d'Orifice", value: "0.15mm (0.1/0.2/0.3mm available)" },
      { label: "Matériau du Corps", value: "316L Stainless Steel" },
      { label: "Matériau de l'Orifice", value: "Zirconia Ceramic" },
      { label: "Angle de Pulvérisation", value: "90° or 180°" },
      { label: "Débit", value: "0.04-0.06 L/min per nozzle" },
      { label: "Pression de Fonctionnement", value: "70-150 bar" },
      { label: "Taille des Gouttelettes", value: "5-15 micron at 150 bar" },
      { label: "Raccordement", value: "9.52mm OD compression" },
      { label: "Anti-Goutte", value: "Spring-loaded check valve" },
      { label: "Poids", value: "28g per nozzle" },
    ],
    images: ["/images/products/ceramic-nozzles.png"],
    mainImage: "/images/products/ceramic-nozzles.png",
    priceRange: "$18 - $35 per nozzle",
    leadTime: "2-3 weeks",
    warranty: "3 years",
  },
  {
    slug: "mg-iot-hub",
    name: "MG-IOT HUB Système de Contrôle Intelligent",
    tagline: "Contrôle de brumisation connecté au cloud avec optimisation météo IA",
    category: "control",
    description:
      "Le MG-IOT HUB apporte l'automatisation intelligente à votre système de brumisation. Doté d'un écran tactile industriel de 7 pouces, d'un accès au tableau de bord cloud, d'une programmation basée sur la météo, d'un contrôle au niveau des zones et d'un mode d'optimisation IA optionnel qui apprend les habitudes d'utilisation pour minimiser la consommation d'eau et d'énergie.",
    features: [
      "Écran tactile industriel IP65 de 7 pouces",
      "Tableau de bord cloud accessible depuis n'importe quel appareil",
      "Intégration API météo pour programmation automatique",
      "Contrôle indépendant de 8 zones avec minuteries",
      "Mode d'optimisation IA (économie d'énergie/eau)",
      "Surveillance en temps réel de la température, l'humidité et la pression",
      "Notifications push pour les alertes de maintenance",
      "Enregistrement et export des données historiques (CSV/PDF)",
      "Modbus RTU/TCP pour intégration SCADA/BMS",
      "Connectivité de secours 4G (carte SIM incluse)",
    ],
    specs: [
      { label: "Écran", value: '7" IPS touchscreen, 1024x600' },
      { label: "Connectivité", value: "WiFi, Ethernet, 4G LTE" },
      { label: "Protocoles", value: "Modbus RTU/TCP, MQTT, HTTP API" },
      { label: "Contrôle de Zones", value: "8 zones (expandable to 16)" },
      { label: "Capteurs", value: "Temperature, humidity, pressure, flow" },
      { label: "Plateforme Cloud", value: "MG Cloud (AWS hosted)" },
      { label: "Alertes", value: "Push, SMS, Email" },
      { label: "Export de Données", value: "CSV, PDF reports" },
      { label: "Protection", value: "IP65 front panel" },
      { label: "Puissance", value: "24V DC, PoE option" },
      { label: "Temp. de Fonctionnement", value: "-20°C to 60°C" },
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
    name: "MG-REPEL Kit d'Injection de Répulsif Anti-Moustiques",
    tagline: "Dosage automatique de répulsif botanique pour des zones sans moustiques",
    category: "accessories",
    description:
      "S'intègre parfaitement avec tout système de brumisation MG pour injecter des doses mesurées de répulsif botanique ou synthétique dans la ligne de brouillard. Des horaires programmables, un dosage spécifique par zone et un réservoir de concentré de 20L offrent des semaines de fonctionnement autonome. Crée un périmètre protecteur de 6 mètres de hauteur.",
    features: [
      "Pompe doseuse péristaltique de précision (0,1-10 mL/min)",
      "Réservoir de concentré HDPE de 20L avec capteur de niveau",
      "Programmes de dosage spécifiques par zone",
      "Compatible avec les répulsifs botaniques et synthétiques",
      "Alertes automatiques de niveau bas et rappels de recharge",
      "Dispositif anti-refoulement et double confinement",
      "Intégration à connexion rapide avec les systèmes MG existants",
      "Concentrés répulsifs homologués EPA disponibles",
    ],
    specs: [
      { label: "Type de Pompe", value: "Peristaltic (precision dosing)" },
      { label: "Plage de Dosage", value: "0.1 - 10 mL/min" },
      { label: "Réservoir", value: "20L HDPE with level sensor" },
      { label: "Hauteur de Couverture", value: "Up to 6 meters" },
      { label: "Types de Répulsif", value: "Botanical (pyrethrin) & synthetic" },
      { label: "Puissance", value: "24V DC from MG pump station" },
      { label: "Intégration", value: "Plug-and-play with MG-IOT HUB" },
      { label: "Sécurité", value: "Double containment, backflow prevention" },
      { label: "Dimensions", value: "400 x 300 x 500 mm" },
      { label: "Poids (vide)", value: "8 kg" },
    ],
    images: [],
    mainImage: "",
    priceRange: "$1,200 - $2,000",
    leadTime: "2-3 weeks",
    warranty: "2 years",
  },
  {
    slug: "mg-industrial-complete",
    name: "MG-INDUSTRIAL Système Complet de Refroidissement pour Usines",
    tagline: "Brumisation robuste pour usines, entrepôts et installations industrielles jusqu'à 10 000 m²",
    category: "misting-system",
    description:
      "Conçu pour les environnements industriels les plus exigeants. Deux stations de pompage MG-PRO 1500 redondantes, 400 buses robustes, 1 000 mètres de tuyauterie et filtration de qualité industrielle. Inclut un mode suppression de poussière et un fonctionnement à haute température jusqu'à 65°C ambiante.",
    features: [
      "Deux stations de pompage redondantes de 150 bar (configuration N+1)",
      "400 buses céramiques robustes avec boîtier renforcé",
      "1 000 m de tuyauterie 316L de qualité industrielle",
      "Mode suppression de poussière avec option de gouttelettes plus grandes",
      "Système de traitement d'eau industriel à 10 étages",
      "Fonctionnement haute température nominal jusqu'à 65°C ambiante",
      "Cycle de service continu 24/7",
      "Intégration SCADA avec protocole OPC UA",
    ],
    specs: [
      { label: "Zone de Couverture", value: "Up to 10,000 m²" },
      { label: "Stations de Pompage", value: "2x MG-PRO 1500 (N+1 redundant)" },
      { label: "Nombre de Buses", value: "400 (expandable to 800)" },
      { label: "Tuyauterie", value: "1,000m 316L SS included" },
      { label: "Capacité de Refroidissement", value: "Up to 15°C reduction" },
      { label: "Suppression de Poussière", value: "Yes, dedicated mode" },
      { label: "Temp. Ambiante Max", value: "65°C" },
      { label: "Traitement de l'Eau", value: "10-stage industrial system" },
      { label: "Puissance", value: "2x 380V 3-phase, 5.5 kW each" },
      { label: "Protocoles", value: "Modbus, OPC UA, MQTT" },
      { label: "Cycle de Service", value: "24/7 continuous rated" },
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
  { key: "all", label: "Tous les Produits" },
  { key: "misting-system", label: "Systèmes Complets" },
  { key: "pump-station", label: "Stations de Pompage" },
  { key: "control", label: "Systèmes de Contrôle" },
  { key: "accessories", label: "Accessoires" },
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
