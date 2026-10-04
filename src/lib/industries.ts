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
    name: "Resorts & Hotels",
    icon: "Buildings",
    hero: "Transform guest experiences with invisible outdoor climate control. Extend poolside and alfresco dining seasons year-round.",
    challenge: "Outdoor areas represent 40%+ of resort real estate but generate the most complaints during hot seasons. Traditional cooling fails in open-air environments, and mosquitoes drive guests indoors after sunset — killing F&B revenue.",
    solution: "100Cooling creates microclimate zones across pool decks, beachfront restaurants, spa gardens, and guest walkways. Micron-level mist evaporates instantly, cooling guests without wetting surfaces. Integrated botanical repellent injection keeps evening venues mosquito-free.",
    applications: [
      "Pool deck and sun lounger cooling zones",
      "Alfresco restaurant and bar misting perimeters",
      "Spa garden and relaxation area climate control",
      "Guest walkway and lobby entrance cooling curtains",
    ],
    caseStudy: "Amari Resorts, Phuket — 12\u00B0C temperature reduction across 6 outdoor zones. Beachfront restaurant went from worst-booked to most-booked venue.",
  },
  {
    slug: "restaurants-bars",
    name: "Restaurants & Bars",
    icon: "Storefront",
    hero: "Turn your patio into your most profitable seating section. Keep guests comfortable and mosquitoes away during peak evening hours.",
    challenge: "Outdoor dining generates premium margins, but summer heat and mosquitoes make patios unusable during peak revenue hours (5PM-10PM). Fans blow hot air. Portable AC is ineffective. Traditional sprays soak tables and food.",
    solution: "100Cooling's ceiling-mounted or pergola-integrated nozzles create an invisible cooling envelope. Guests feel 5-10\u00B0C cooler without any moisture on skin, clothing, or food. Evening mosquito protection keeps tables full through dinner service.",
    applications: [
      "Patio and terrace perimeter misting lines",
      "Bar counter and high-top cooling zones",
      "Entrance queue comfort misting",
      "Rooftop venue climate control",
    ],
    caseStudy: "Multiple restaurant chains in Southeast Asia report 30-60% increase in outdoor seating revenue after 100Cooling installation.",
  },
  {
    slug: "factories",
    name: "Factories & Manufacturing",
    icon: "Factory",
    hero: "Reduce heat stress, improve worker productivity, and protect equipment. Industrial-grade cooling that pays for itself in months.",
    challenge: "Factory floors regularly exceed 38\u00B0C in tropical climates. Heat stress reduces worker productivity by 20-40%, increases accident rates, and damages temperature-sensitive equipment. AC is cost-prohibitive for large open bays.",
    solution: "100Cooling industrial systems cool up to 10,000 m\u00B2 per installation. Dual redundant pump stations ensure 24/7 operation. Dust suppression mode adds airborne particulate control. Typical ROI: 8-12 months through productivity gains alone.",
    applications: [
      "Production line cooling zones (targeted worker stations)",
      "Warehouse and loading bay climate control",
      "Dust suppression for wood, textile, and mining operations",
      "Equipment cooling for heat-sensitive machinery",
    ],
    caseStudy: "TechTronics Manufacturing, Shenzhen — 15,000 m\u00B2 facility. Floor temperature dropped from 38\u00B0C to 26\u00B0C. Worker productivity up 22%. System paid for itself in 8 months.",
  },
  {
    slug: "warehouses",
    name: "Warehouses & Logistics",
    icon: "Warehouse",
    hero: "Keep your inventory, equipment, and workforce cool in high-ceiling spaces where traditional HVAC cannot reach.",
    challenge: "Large-volume warehouse spaces trap heat. High ceilings make traditional cooling impractical. Workers in picking and packing zones suffer heat fatigue, reducing throughput and increasing error rates.",
    solution: "100Cooling's high-reach nozzle configuration delivers cooling to specific work zones without conditioning the entire volume. Significant energy savings compared to HVAC — our systems use 90% less electricity for equivalent cooling.",
    applications: [
      "Picking and packing station spot cooling",
      "Loading dock temperature management",
      "Cold chain buffer zone climate control",
      "Cross-dock and sorting facility cooling",
    ],
    caseStudy: "Multiple logistics centers in Southeast Asia use 100Cooling for zoned cooling, reporting 15-20% productivity improvement in picking operations.",
  },
  {
    slug: "sports-venues",
    name: "Sports Venues & Stadiums",
    icon: "SoccerBall",
    hero: "Keep athletes performing and spectators comfortable. Precision cooling for training grounds, seating areas, and outdoor courts.",
    challenge: "Outdoor sports in tropical climates face heat-related cancellations and spectator no-shows. Athlete performance degrades significantly above 30\u00B0C. Traditional cooling cannot scale to stadium dimensions.",
    solution: "100Cooling deploys zoned cooling arrays across seating sections, player benches, training grounds, and warm-up areas. Our systems are used in professional stadiums across Southeast Asia and the Middle East.",
    applications: [
      "Spectator seating area cooling zones",
      "Player bench and sideline misting",
      "Training ground perimeter cooling",
      "Tennis/basketball court boundary systems",
    ],
    caseStudy: "KL Sports Hub, Malaysia — 12,000 m\u00B2 coverage. Evening bookings tripled after installation. Zero heat-related event cancellations since deployment.",
  },
  {
    slug: "shopping-retail",
    name: "Shopping Malls & Retail",
    icon: "ShoppingCart",
    hero: "Extend the shopping experience outdoors. Cool open-air promenades, food courts, and event spaces to increase dwell time and spend.",
    challenge: "Open-air retail developments lose foot traffic during hot afternoons. Shoppers rush from air-conditioned store to store, skipping outdoor common areas, dining terraces, and event spaces.",
    solution: "100Cooling transforms outdoor retail spaces into comfortable gathering areas. Cool promenades, food court terraces, and event plazas keep shoppers lingering longer — directly increasing per-visit spend.",
    applications: [
      "Open-air mall promenade cooling",
      "Food court and dining terrace climate control",
      "Event plaza and performance space comfort",
      "Entrance and taxi queue misting curtains",
    ],
    caseStudy: "Multiple lifestyle centers in Bangkok and Dubai report 25-40% increase in outdoor area dwell time after 100Cooling installation.",
  },
  {
    slug: "greenhouse-agriculture",
    name: "Greenhouse & Agriculture",
    icon: "Plant",
    hero: "Precision humidity and temperature control for optimal growing conditions. Protect high-value crops from heat stress without over-wetting.",
    challenge: "Greenhouses overheat rapidly in tropical and subtropical climates. Traditional fogging systems produce large droplets that wet foliage, promoting fungal disease. Inconsistent humidity stresses crops and reduces yield.",
    solution: "100Cooling's micron-level fog (5-15 \u00b5m) maintains precise humidity without wetting leaves. Smart controllers integrate with existing climate systems for seamless automation. Used by commercial growers across Southeast Asia.",
    applications: [
      "High-value crop climate control (orchids, cannabis, microgreens)",
      "Seedling and propagation house humidity management",
      "Mushroom cultivation environmental control",
      "Livestock and poultry cooling systems",
    ],
    caseStudy: "Commercial orchid growers in Thailand report 30% reduction in crop loss during hot season with 100Cooling greenhouse systems.",
  },
  {
    slug: "municipal-public",
    name: "Municipal & Public Spaces",
    icon: "City",
    hero: "Cool public plazas, transit stops, and outdoor waiting areas. Combine cooling with mosquito control for public health outcomes.",
    challenge: "Urban heat islands make public spaces uninhabitable during summer. Bus stops, plazas, and outdoor markets become health hazards. Municipalities face increasing pressure to provide cooling infrastructure and mosquito-borne disease prevention.",
    solution: "100Cooling municipal systems provide public cooling at scale. Integrated mosquito repellent injection protects public health. Our systems are deployed in public spaces across Singapore, Bangkok, and Dubai.",
    applications: [
      "Public plaza and square cooling installations",
      "Bus stop and transit waiting area misting",
      "Outdoor market and bazaar climate control",
      "Public park and playground cooling zones",
    ],
    caseStudy: "Singapore's National Environment Agency uses high-pressure misting in multiple public spaces for combined cooling and mosquito control.",
  },
  {
    slug: "events-entertainment",
    name: "Events & Entertainment Venues",
    icon: "Calendar",
    hero: "Portable, scalable cooling for outdoor events. Keep attendees comfortable and engaged regardless of weather.",
    challenge: "Outdoor events — concerts, festivals, weddings, corporate functions — are at the mercy of weather. Heat drives attendees away, reduces bar sales, and creates liability risks. Portable AC is expensive, noisy, and inadequate.",
    solution: "100Cooling offers both permanent installations and portable rental units for event venues. Rapid deployment, silent operation, and proven cooling performance make outdoor events viable even in peak summer.",
    applications: [
      "Concert and festival crowd cooling",
      "Wedding and corporate event comfort",
      "Outdoor exhibition and trade show climate",
      "Theme park queue line cooling",
    ],
    caseStudy: "Multiple event organizers in Dubai and Southeast Asia rely on 100Cooling systems for outdoor events with 5,000+ attendees.",
  },
  {
    slug: "pest-control",
    name: "Pest Control Companies",
    icon: "Bug",
    hero: "Offer your clients a premium, automated mosquito control solution. Add recurring revenue with 100Cooling reseller partnerships.",
    challenge: "Traditional pest control methods — fogging, spraying, baiting — require frequent labor-intensive visits. Coverage is temporary. Clients demand more effective, automated solutions for large outdoor areas.",
    solution: "Become a 100Cooling certified reseller. Our systems provide automated, scheduled mosquito control with botanical or synthetic repellent options. 6-meter spray height creates protective perimeters. Remote monitoring reduces service visits.",
    applications: [
      "Residential estate perimeter mosquito barriers",
      "Golf course and country club integrated systems",
      "Hotel and resort mosquito management contracts",
      "Municipal mosquito-borne disease prevention programs",
    ],
    caseStudy: "MistAway and CoastalMister have built $10M+ businesses on automated mosquito misting. 100Cooling offers competitive hardware with better margins for resellers.",
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((ind) => ind.slug === slug);
}
