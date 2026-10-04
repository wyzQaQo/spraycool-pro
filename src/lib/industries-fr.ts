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
    name: "Resorts et Hôtels",
    icon: "Buildings",
    hero: "Transformez l'expérience client avec une climatisation extérieure invisible. Prolongez les saisons de bord de piscine et de restauration en plein air toute l'année.",
    challenge: "Les espaces extérieurs représentent plus de 40% de l'immobilier des resorts mais génèrent le plus de plaintes pendant les saisons chaudes. La climatisation traditionnelle échoue dans les environnements ouverts, et les moustiques chassent les clients à l'intérieur après le coucher du soleil, anéantissant les revenus de restauration.",
    solution: "100Cooling crée des zones de microclimat sur les terrasses de piscine, les restaurants en bord de mer, les jardins de spa et les allées piétonnes. La brume au niveau micron s'évapore instantanément, rafraîchissant les clients sans mouiller les surfaces. L'injection intégrée de répulsif botanique maintient les espaces nocturnes sans moustiques.",
    applications: [
      "Zones de rafraîchissement pour terrasses de piscine et transats",
      "Périmètres de brumisation pour restaurants et bars en plein air",
      "Climatisation des jardins de spa et espaces de détente",
      "Rideaux de rafraîchissement pour allées piétonnes et entrées de hall",
    ],
    caseStudy: "Amari Resorts, Phuket — réduction de température de 12\u00B0C sur 6 zones extérieures. Le restaurant en bord de mer est passé du moins réservé au plus réservé.",
  },
  {
    slug: "restaurants-bars",
    name: "Restaurants et Bars",
    icon: "Storefront",
    hero: "Transformez votre terrasse en la section la plus rentable. Gardez les clients à l'aise et éloignez les moustiques pendant les heures de pointe du soir.",
    challenge: "La restauration en plein air génère des marges premium, mais la chaleur estivale et les moustiques rendent les terrasses inutilisables pendant les heures de pointe de revenus (17h-22h). Les ventilateurs soufflent de l'air chaud. La climatisation portable est inefficace. Les systèmes de pulvérisation traditionnels mouillent les tables et les aliments.",
    solution: "Les buses intégrées au plafond ou à la pergola de 100Cooling créent une enveloppe de rafraîchissement invisible. Les clients ressentent 5 à 10\u00B0C de moins sans aucune humidité sur la peau, les vêtements ou les aliments. La protection anti-moustiques du soir maintient les tables pleines tout au long du service du dîner.",
    applications: [
      "Lignes de brumisation périmétriques pour terrasse et patio",
      "Zones de rafraîchissement pour comptoir de bar et tables hautes",
      "Brumisation de confort pour files d'attente à l'entrée",
      "Climatisation des espaces sur toit-terrasse",
    ],
    caseStudy: "Plusieurs chaînes de restaurants en Asie du Sud-Est rapportent une augmentation de 30-60% des revenus de places en terrasse après l'installation de 100Cooling.",
  },
  {
    slug: "factories",
    name: "Usines et Industrie Manufacturière",
    icon: "Factory",
    hero: "Réduisez le stress thermique, améliorez la productivité des travailleurs et protégez les équipements. Un refroidissement de qualité industrielle qui s'amortit en quelques mois.",
    challenge: "Les sols d'usine dépassent régulièrement 38\u00B0C dans les climats tropicaux. Le stress thermique réduit la productivité des travailleurs de 20 à 40%, augmente les taux d'accidents et endommage les équipements sensibles à la température. La climatisation est d'un coût prohibitif pour les grands halls ouverts.",
    solution: "Les systèmes industriels 100Cooling refroidissent jusqu'à 10 000 m² par installation. Les stations de pompage doubles redondantes assurent un fonctionnement 24h/24 et 7j/7. Le mode de suppression de poussière ajoute un contrôle des particules en suspension. ROI typique : 8 à 12 mois grâce aux seuls gains de productivité.",
    applications: [
      "Zones de refroidissement sur ligne de production (postes de travail ciblés)",
      "Climatisation des entrepôts et quais de chargement",
      "Suppression de poussière pour les opérations de bois, textile et exploitation minière",
      "Refroidissement des équipements pour machines sensibles à la chaleur",
    ],
    caseStudy: "TechTronics Manufacturing, Shenzhen — installation de 15 000 m². La température au sol est passée de 38\u00B0C à 26\u00B0C. Productivité des travailleurs en hausse de 22%. Le système s'est amorti en 8 mois.",
  },
  {
    slug: "warehouses",
    name: "Entrepôts et Logistique",
    icon: "Warehouse",
    hero: "Gardez vos stocks, équipements et main-d'œuvre au frais dans les espaces à haut plafond où la climatisation traditionnelle ne peut pas atteindre.",
    challenge: "Les grands volumes d'entrepôt emprisonnent la chaleur. Les hauts plafonds rendent le refroidissement traditionnel impraticable. Les travailleurs dans les zones de picking et d'emballage souffrent de fatigue thermique, réduisant le débit et augmentant les taux d'erreur.",
    solution: "La configuration de buses à haute portée de 100Cooling fournit un refroidissement à des zones de travail spécifiques sans climatiser tout le volume. Économies d'énergie significatives par rapport à la climatisation — nos systèmes utilisent 90% d'électricité en moins pour un refroidissement équivalent.",
    applications: [
      "Refroidissement ponctuel des postes de picking et d'emballage",
      "Gestion de la température des quais de chargement",
      "Climatisation des zones tampons de chaîne du froid",
      "Refroidissement des installations de cross-docking et de tri",
    ],
    caseStudy: "Plusieurs centres logistiques en Asie du Sud-Est utilisent 100Cooling pour le refroidissement par zones, rapportant une amélioration de productivité de 15-20% dans les opérations de picking.",
  },
  {
    slug: "sports-venues",
    name: "Enceintes Sportives et Stades",
    icon: "SoccerBall",
    hero: "Gardez les athlètes performants et les spectateurs à l'aise. Refroidissement de précision pour les terrains d'entraînement, les gradins et les courts extérieurs.",
    challenge: "Les sports en plein air dans les climats tropicaux font face à des annulations liées à la chaleur et à l'absence de spectateurs. Les performances des athlètes se dégradent significativement au-dessus de 30\u00B0C. Le refroidissement traditionnel ne peut pas s'adapter aux dimensions d'un stade.",
    solution: "100Cooling déploie des matrices de refroidissement par zones sur les sections de gradins, les bancs de joueurs, les terrains d'entraînement et les zones d'échauffement. Nos systèmes sont utilisés dans des stades professionnels en Asie du Sud-Est et au Moyen-Orient.",
    applications: [
      "Zones de refroidissement pour gradins de spectateurs",
      "Brumisation pour bancs de joueurs et lignes de touche",
      "Refroidissement périmétrique des terrains d'entraînement",
      "Systèmes de limite pour courts de tennis et de basketball",
    ],
    caseStudy: "KL Sports Hub, Malaisie — couverture de 12 000 m². Les réservations en soirée ont triplé après l'installation. Zéro annulation d'événement liée à la chaleur depuis le déploiement.",
  },
  {
    slug: "shopping-retail",
    name: "Centres Commerciaux et Commerce de Détail",
    icon: "ShoppingCart",
    hero: "Prolongez l'expérience de shopping à l'extérieur. Rafraîchissez les promenades en plein air, les aires de restauration et les espaces événementiels pour augmenter le temps de présence et les dépenses.",
    challenge: "Les développements commerciaux en plein air perdent du trafic piétonnier pendant les après-midis chauds. Les acheteurs se précipitent de magasin climatisé en magasin, sautant les espaces communs extérieurs, les terrasses de restauration et les espaces événementiels.",
    solution: "100Cooling transforme les espaces commerciaux extérieurs en lieux de rassemblement confortables. Les promenades rafraîchies, les terrasses d'aires de restauration et les places événementielles incitent les acheteurs à rester plus longtemps, augmentant directement les dépenses par visite.",
    applications: [
      "Rafraîchissement des promenades de centres commerciaux en plein air",
      "Climatisation des aires de restauration et terrasses de repas",
      "Confort des places événementielles et espaces de spectacles",
      "Rideaux de brumisation pour entrées et files de taxis",
    ],
    caseStudy: "Plusieurs centres de style de vie à Bangkok et Dubaï rapportent une augmentation de 25-40% du temps de présence en zone extérieure après l'installation de 100Cooling.",
  },
  {
    slug: "greenhouse-agriculture",
    name: "Serres et Agriculture",
    icon: "Plant",
    hero: "Contrôle précis de l'humidité et de la température pour des conditions de croissance optimales. Protégez les cultures à haute valeur du stress thermique sans excès d'humidité.",
    challenge: "Les serres surchauffent rapidement dans les climats tropicaux et subtropicaux. Les systèmes de brumisation traditionnels produisent de grosses gouttelettes qui mouillent le feuillage, favorisant les maladies fongiques. Une humidité inconstante stresse les cultures et réduit le rendement.",
    solution: "La brume au niveau micron de 100Cooling (5-15 µm) maintient une humidité précise sans mouiller les feuilles. Les contrôleurs intelligents s'intègrent aux systèmes climatiques existants pour une automatisation transparente. Utilisé par les producteurs commerciaux en Asie du Sud-Est.",
    applications: [
      "Climatisation des cultures à haute valeur (orchidées, cannabis, micropousses)",
      "Gestion de l'humidité des serres de semis et de propagation",
      "Contrôle environnemental pour la culture de champignons",
      "Systèmes de refroidissement pour bétail et volaille",
    ],
    caseStudy: "Les producteurs commerciaux d'orchidées en Thaïlande rapportent une réduction de 30% des pertes de récolte pendant la saison chaude avec les systèmes de serre 100Cooling.",
  },
  {
    slug: "municipal-public",
    name: "Espaces Municipaux et Publics",
    icon: "City",
    hero: "Rafraîchissez les places publiques, les arrêts de transport et les zones d'attente extérieures. Combinez refroidissement et lutte anti-moustiques pour des résultats de santé publique.",
    challenge: "Les îlots de chaleur urbains rendent les espaces publics inhabitables pendant l'été. Les arrêts de bus, les places et les marchés extérieurs deviennent des risques sanitaires. Les municipalités font face à une pression croissante pour fournir des infrastructures de refroidissement et de prévention des maladies à transmission vectorielle.",
    solution: "Les systèmes municipaux 100Cooling fournissent un refroidissement public à grande échelle. L'injection intégrée de répulsif anti-moustiques protège la santé publique. Nos systèmes sont déployés dans les espaces publics à Singapour, Bangkok et Dubaï.",
    applications: [
      "Installations de refroidissement pour places et esplanades publiques",
      "Brumisation aux arrêts de bus et zones d'attente de transport",
      "Climatisation des marchés en plein air et bazars",
      "Zones de rafraîchissement dans les parcs publics et aires de jeux",
    ],
    caseStudy: "L'Agence Nationale de l'Environnement de Singapour utilise la brumisation haute pression dans de multiples espaces publics pour un refroidissement combiné et une lutte anti-moustiques.",
  },
  {
    slug: "events-entertainment",
    name: "Événements et Lieux de Divertissement",
    icon: "Calendar",
    hero: "Refroidissement portable et évolutif pour les événements en plein air. Gardez les participants à l'aise et engagés, quelle que soit la météo.",
    challenge: "Les événements en plein air — concerts, festivals, mariages, fonctions d'entreprise — sont à la merci de la météo. La chaleur fait fuir les participants, réduit les ventes de bar et crée des risques de responsabilité. La climatisation portable est chère, bruyante et inadéquate.",
    solution: "100Cooling propose à la fois des installations permanentes et des unités de location portables pour les lieux événementiels. Le déploiement rapide, le fonctionnement silencieux et les performances de refroidissement éprouvées rendent les événements en plein air viables même en plein été.",
    applications: [
      "Rafraîchissement des foules lors de concerts et festivals",
      "Confort pour mariages et événements d'entreprise",
      "Climatisation des expositions en plein air et salons professionnels",
      "Rafraîchissement des files d'attente dans les parcs à thème",
    ],
    caseStudy: "De nombreux organisateurs d'événements à Dubaï et en Asie du Sud-Est comptent sur les systèmes 100Cooling pour des événements en plein air avec plus de 5 000 participants.",
  },
  {
    slug: "pest-control",
    name: "Entreprises de Lutte Antiparasitaire",
    icon: "Bug",
    hero: "Offrez à vos clients une solution premium et automatisée de lutte anti-moustiques. Ajoutez des revenus récurrents grâce aux partenariats de revente 100Cooling.",
    challenge: "Les méthodes traditionnelles de lutte antiparasitaire — fumigation, pulvérisation, appâtage — nécessitent des visites fréquentes à forte intensité de main-d'œuvre. La couverture est temporaire. Les clients exigent des solutions plus efficaces et automatisées pour les grands espaces extérieurs.",
    solution: "Devenez revendeur certifié 100Cooling. Nos systèmes fournissent une lutte anti-moustiques automatisée et programmée avec des options de répulsifs botaniques ou synthétiques. La hauteur de pulvérisation de 6 mètres crée des périmètres protecteurs. La surveillance à distance réduit les visites de service.",
    applications: [
      "Barrières anti-moustiques périmétriques pour domaines résidentiels",
      "Systèmes intégrés pour terrains de golf et clubs de loisirs",
      "Contrats de gestion des moustiques pour hôtels et resorts",
      "Programmes municipaux de prévention des maladies à transmission vectorielle",
    ],
    caseStudy: "MistAway et CoastalMister ont bâti des entreprises de plus de 10 M$ sur la brumisation automatisée anti-moustiques. 100Cooling propose du matériel compétitif avec de meilleures marges pour les revendeurs.",
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((ind) => ind.slug === slug);
}
