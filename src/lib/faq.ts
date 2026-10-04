export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    question: "How does high-pressure misting actually cool the air?",
    answer:
      "100Cooling systems pressurize filtered water to 1,000 PSI and force it through precision laser-drilled nozzles with 0.008-inch orifices, creating droplets averaging 5 microns in diameter\u2014approximately 1/10th the diameter of a human hair. These micro-droplets flash-evaporate in under 2 seconds, absorbing 8,700 BTU of thermal energy per gallon of water consumed. The result is a measured ambient temperature reduction of 15\u201330\u00b0F depending on ambient humidity, with no residual moisture on surfaces, skin, or clothing.",
    category: "Technology",
  },
  {
    question: "What droplet size does 100Cooling produce and why does it matter?",
    answer:
      "100Cooling nozzles produce droplets in the 5\u201315 micron range at 1,000 PSI. Droplet size is critical for two reasons: (1) evaporation rate\u2014smaller droplets present exponentially more surface area per volume of water, evaporating completely before reaching people or surfaces; (2) cooling efficiency\u2014only fully evaporated droplets deliver latent cooling. Systems producing droplets above 30 microns leave moisture on tables, floors, and clothing, which is unacceptable for hospitality, retail, and food-service environments. 100Cooling\u2019s ruby-orifice nozzle technology maintains tight droplet-size distribution across the entire pressure curve.",
    category: "Technology",
  },
  {
    question: "What is the difference between low-pressure and high-pressure misting?",
    answer:
      "Low-pressure systems (60\u2013250 PSI) produce droplets of 30\u2013100+ microns that do not fully evaporate, leaving everything wet. They are essentially garden-hose foggers. High-pressure systems (800\u20131,200 PSI) like 100Cooling produce 5\u201315 micron droplets that evaporate completely mid-air. The cooling difference is dramatic: low-pressure systems achieve 5\u20138\u00b0F reduction with wetting; 100Cooling delivers 15\u201330\u00b0F reduction with zero moisture. For any commercial application where aesthetics, safety, or hygiene matter, only high-pressure misting is appropriate.",
    category: "Technology",
  },
  {
    question: "Does misting work in humid climates?",
    answer:
      "Yes. While evaporative cooling is most efficient in dry climates, 100Cooling systems are engineered to perform in humidity up to 85% RH. The key is the 5-micron droplet size: micro-droplets have such high surface-area-to-volume ratios that they evaporate even in saturated air. At 80% RH, you can expect 12\u201318\u00b0F of cooling; at 40% RH, expect 22\u201330\u00b0F. Our engineering team sizes every system using ASHRAE climate data for the installation ZIP code, and we publish performance curves for each system configuration. In the hottest regions of Southeast Asia, Florida, and the Gulf Coast\u2014where outdoor cooling is most needed\u2014100Cooling delivers measurable, consistent results.",
    category: "Technology",
  },
  {
    question: "How much water does a commercial misting system consume?",
    answer:
      "A typical 100Cooling commercial installation consumes 0.4\u20131.2 gallons per nozzle per hour, depending on nozzle orifice size and operating pressure. A 50-nozzle restaurant patio system running 10 hours per day would use approximately 200\u2013600 gallons daily\u2014comparable to a single commercial dishwasher cycle. For reference, the same patio cooled by air conditioning would require 3\u20135 tons of refrigeration consuming 12\u201320 kWh per hour. Water consumption is metered and can be fed from municipal supply, reclaimed water, or rainwater harvesting systems. All systems include a low-water shutoff and flow totalizer for sustainability reporting.",
    category: "Technology",
  },
  {
    question: "What pump options does 100Cooling offer?",
    answer:
      "100Cooling offers four pump platforms: (1) **MG-Pro 500** \u2014 1.5 HP direct-drive plunger pump, 0.5 GPM at 1,000 PSI, supports up to 40 nozzles, ideal for small patios and residential entry installations. (2) **MG-Pro 1500** \u2014 3 HP belt-driven triplex plunger pump, 1.5 GPM at 1,000 PSI, supports up to 120 nozzles, our most popular model for mid-size restaurants, pool decks, and loading docks. (3) **MG-Pro 5000** \u2014 7.5 HP triplex plunger pump with VFD motor control, 5.0 GPM at 1,000 PSI, supports up to 400 nozzles, designed for large venues, warehouses, and municipal installations. (4) **MG-Pro 10000** \u2014 15 HP industrial triplex with dual VFD, 10.0 GPM at 1,000 PSI, supports 800+ nozzles across multiple zones, built for stadiums, large greenhouses, and multi-acre facilities.",
    category: "Products",
  },
  {
    question: "What nozzle types are available and how do I choose?",
    answer:
      "100Cooling offers five nozzle configurations: **MG-Standard** (0.008-inch ruby orifice, brass body, 0.012 GPM at 1,000 PSI) for general outdoor cooling. **MG-Micro** (0.006-inch ruby orifice, 0.008 GPM) for ultra-dry applications in restaurants and high-end hospitality where zero moisture tolerance is required. **MG-HighFlow** (0.012-inch orifice, 0.022 GPM) for high-heat industrial and warehouse applications where maximum BTU extraction is prioritized. **MG-VectorShield** (0.010-inch orifice, stainless-steel body with integrated check valve) for mosquito-control applications using diluted insecticide solutions. **MG-AntiDrip** (0.008-inch orifice with spring-loaded check valve) for overhead installations where gravity drip between cycles must be eliminated. Our application engineers specify nozzle type, spacing, and count based on your site survey data.",
    category: "Products",
  },
  {
    question: "What filtration system does 100Cooling use?",
    answer:
      "Every 100Cooling system includes a three-stage filtration package as standard equipment: (1) 50-micron washable stainless-steel screen pre-filter at the supply inlet to catch pipe scale and debris. (2) 20-micron spun-bonded polypropylene depth filter with translucent housing and pressure-differential gauge for visual clog monitoring. (3) 5-micron pleated polyester final filter immediately upstream of the pump to protect precision nozzle orifices. For systems using non-potable water sources (reclaimed water, rainwater, pond water), we add a 1-micron absolute-rated filter and an optional UV sterilization stage. All filters are field-replaceable in under 5 minutes with no tools required.",
    category: "Products",
  },
  {
    question: "How is a 100Cooling system installed? What is the typical timeline?",
    answer:
      "Installation follows a structured three-phase process: **Phase 1 \u2014 Site Survey (1\u20132 days)**: Our engineer measures the space, maps sun exposure, identifies water and power tie-in points, and produces a CAD layout with nozzle placement. **Phase 2 \u2014 Infrastructure (1\u20133 days)**: A certified installer runs high-pressure stainless-steel tubing along designated mounting points (under eaves, along pergola beams, on dedicated posts), mounts the pump skid on a level pad, and connects to water supply and electrical. **Phase 3 \u2014 Commissioning (0.5\u20131 day)**: Nozzles are installed and aligned, the system is pressure-tested to 1,500 PSI, zone controllers are programmed, and a full operational test is performed with the client present. Typical total timeline: 3\u20136 days for a mid-size commercial installation. All installations include a 2-hour staff training session on operation and basic maintenance.",
    category: "Installation",
  },
  {
    question: "Can 100Cooling be retrofitted into an existing structure?",
    answer:
      "Yes\u2014approximately 70% of our installations are retrofits into existing buildings, pergolas, shade structures, and open spaces. Our tubing is 3/8-inch outside diameter and can be routed along existing beams, under eaves, through attic spaces, and within conduit. Mounting hardware includes stainless-steel beam clamps, magnetic mounts for steel structures, and surface-mount brackets for masonry. For temporary or seasonal installations (event venues, seasonal patios), we offer a quick-connect system with hand-tightened fittings that can be deployed and removed without tools. All retrofit installations include a structural mounting assessment to ensure load ratings are not exceeded.",
    category: "Installation",
  },
  {
    question: "What power and water supply requirements are needed?",
    answer:
      "Electrical: MG-Pro 500 and 1500 systems require a dedicated 230V single-phase 30A circuit. MG-Pro 5000 requires 230V/460V three-phase 30A. MG-Pro 10000 requires 460V three-phase 60A. All motors are TEFC (Totally Enclosed Fan Cooled) with NEMA 4X-rated VFD enclosures for outdoor installation. Water: Minimum 40 PSI dynamic supply pressure and 2 GPM per pump HP at the inlet. Systems include a break tank with float valve for installations with unreliable municipal pressure. Drainage: No drainage is required\u2014water evaporates completely. A drip pan under the pump skid with a 1/2-inch drain line is recommended for maintenance purges.",
    category: "Installation",
  },
  {
    question: "What ongoing maintenance does a commercial system require?",
    answer:
      "100Cooling systems are designed for minimal maintenance: **Weekly** (2 minutes): Visual check of filter pressure gauge; if differential exceeds 10 PSI, swap the filter cartridge. **Monthly** (15 minutes): Inspect nozzles for mineral buildup (more frequent in hard-water areas above 10 grains); clean with our included nozzle cleaning tool or replace if necessary. **Quarterly** (1 hour): Check pump oil level and condition; inspect belt tension on belt-drive models; verify zone controller operation; test low-water and high-pressure safety cutoffs. **Annually** (2\u20133 hours): Change pump oil and seals; replace all filter cartridges; flush lines with our descaling solution in hard-water areas; firmware update on digital controllers. We offer Preventative Maintenance Plans (PMP) with scheduled on-site visits for clients who prefer fully managed service.",
    category: "Maintenance",
  },
  {
    question: "How do I winterize a misting system in cold climates?",
    answer:
      "Winterization is a simple 20-minute procedure: (1) Close the main water supply valve. (2) Open all zone drain valves at the lowest points in the system. (3) Connect compressed air (max 50 PSI) to the system\u2019s blowout port and purge all lines zone by zone until no water exits the nozzles. (4) Remove and store the final filter cartridge indoors. (5) Add RV antifreeze (propylene glycol, non-toxic) to the pump inlet and briefly jog the pump to protect internal seals. (6) Cover the pump skid with our custom weatherproof cover. Systems winterized per this procedure have a 100% spring startup success rate. We provide a detailed winterization checklist and instructional video with every system, and our PMP plans include fall winterization visits.",
    category: "Maintenance",
  },
  {
    question: "What happens if a nozzle clogs? Does it affect the whole system?",
    answer:
      "Individual nozzle clogging does not affect system performance due to 100Cooling\u2019s parallel hydraulic design. A single clogged nozzle simply stops emitting mist from that position while remaining nozzles continue operating at full pressure. You can identify clogs by visual inspection during monthly checks. Clearing a clog takes under 30 seconds using our nozzle cleaning tool (a fine wire probe sized to the orifice) or by unscrewing the nozzle and soaking it in our descaling solution for 10 minutes. Our three-stage filtration prevents 99%+ of clogs before they occur. Systems installed with our descaling injection kit in hard-water zones (>15 grains) typically see fewer than one clog per 100 nozzles per year.",
    category: "Maintenance",
  },
  {
    question: "How does the mosquito control feature work?",
    answer:
      "100Cooling\u2019s VectorShield mosquito control system uses the same high-pressure infrastructure (pump, tubing, and strategically positioned perimeter nozzles) to deliver EPA-registered insecticide solutions as an ultra-fine fog. The system operates on a programmable timer\u2014typically 30\u201360 second bursts at dawn and dusk, coinciding with peak mosquito activity. The 5\u201310 micron droplets remain suspended for 3\u20135 minutes, contacting mosquitoes in flight and on foliage. Solutions available include: botanical pyrethrin (OMRI-listed for organic use), synthetic pyrethroids (permethrin, deltamethrin) for maximum knockdown, and our proprietary MG-Botanical blend of lemongrass, peppermint, and geraniol oils. The insecticide injection module is physically separated from the cooling water supply by a double-check-valve manifold to prevent any cross-contamination. All pesticides are stored in a lockable, weatherproof cabinet with secondary containment.",
    category: "Mosquito Control",
  },
  {
    question: "Are the mosquito control chemicals safe for people, pets, and food areas?",
    answer:
      "Yes. 100Cooling VectorShield systems are compatible with EPA-registered FIFRA 25(b) exempt minimum-risk pesticides\u2014products made exclusively from active ingredients the EPA has determined pose negligible risk to human health. Our MG-Botanical blend uses food-grade essential oils and is suitable for restaurant patios, resort pool decks, playgrounds, and food-preparation areas when used according to label directions. For clients who require maximum efficacy, we also support conventional synthetic pyrethroids applied at label rates by licensed pest control operators. All VectorShield installations include prominent signage and are programmed for early-morning and late-evening operation when people and pets are least likely to be present. We provide full Safety Data Sheets (SDS) and label documentation with every system.",
    category: "Mosquito Control",
  },
  {
    question: "How effective is the mosquito control system compared to traditional spraying?",
    answer:
      "Independent field trials conducted by a university entomology department showed 100Cooling VectorShield achieved a 92% reduction in adult mosquito landing counts within the treated perimeter versus untreated control areas over a 12-week summer trial\u2014compared to a 73% reduction from weekly backpack fogging. Key advantages over traditional spraying: (1) automation eliminates missed treatments due to weather or scheduling; (2) the 5-micron fog penetrates dense foliage that coarse backpack droplets miss; (3) consistent dawn/dusk timing targets mosquitoes at peak activity; (4) perimeter-based approach creates a continuous barrier rather than a single-event knockdown; and (5) the traceable digital controller provides treatment logs for regulatory compliance and customer reporting.",
    category: "Mosquito Control",
  },
  {
    question: "What does a commercial misting system cost?",
    answer:
      "100Cooling commercial systems are custom-engineered to each site, so pricing varies with scope. As a reference, a 50-nozzle restaurant patio system (MG-Pro 1500 pump, 250 linear feet of tubing, stainless-steel nozzles, digital zone controller, three-stage filtration, installation, and commissioning) typically ranges from $18,000\u2013$26,000 installed. A 200-nozzle warehouse or greenhouse installation generally runs $55,000\u2013$85,000. For large venues (500+ nozzles, multiple zones), systems typically range from $120,000\u2013$250,000. Every project begins with a complimentary site survey and detailed proposal with line-item pricing. We do not publish a fixed price list because each system is engineered to your specific layout, climate conditions, and performance requirements.",
    category: "Pricing & ROI",
  },
  {
    question: "What is the typical ROI for a commercial misting system?",
    answer:
      "ROI varies by industry, but most commercial clients achieve full payback in 4\u201318 months: **Restaurants & Bars**: 3\u20136 months through increased summer covers and extended patio season (average $25,000\u2013$60,000 incremental annual revenue versus $22,000 system cost). **Resorts & Hotels**: 6\u201312 months through increased F&B revenue and reduced guest complaints (pool bar alone often covers the system cost in one season). **Warehouses & Factories**: 4\u20138 months through productivity gains and reduced workers\u2019 compensation claims (a single avoided heat-stress claim can exceed the system cost). **Greenhouses**: 6\u201318 months through yield improvements and reduced crop loss (5\u201315% yield increase on high-value crops). **Municipalities**: Quantified through community benefit, grant eligibility, and reduced heat-related EMS calls. We provide an ROI calculator with every proposal using your actual financial inputs.",
    category: "Pricing & ROI",
  },
  {
    question: "What warranty comes with 100Cooling systems?",
    answer:
      "Every 100Cooling system includes a comprehensive warranty package: **Pump**: 5-year limited warranty on the crankcase, crankshaft, and connecting rods; 2-year warranty on seals, valves, and plungers. **Motor**: 3-year manufacturer warranty (TEFC motors by WEG or Baldor). **Stainless-Steel Tubing & Fittings**: Lifetime warranty against manufacturing defects and corrosion perforation. **Nozzles**: 2-year warranty on ruby orifices against wear and erosion; 1-year warranty on brass and stainless-steel bodies. **Electronics & Controllers**: 2-year warranty including the touchscreen controller, VFD drive, relays, and sensors. **Installation Workmanship**: 2-year warranty on all labor and installation materials. Extended warranties of up to 10 years are available through our 100Cooling Care+ program. All warranty claims are processed within 48 business hours, and we maintain regional parts inventories for same-week replacement.",
    category: "Warranty",
  },
];
