export interface FactoryData {
  name: string;
  location: string;
  founded: number;
  totalArea: number; // square meters
  employees: number;
  productionLines: number;
  certifications: string[];
  manufacturingCapabilities: string[];
  qualityControlSteps: string[];
  galleryImages: string[];
}

export const factory: FactoryData = {
  name: "100Cooling Manufacturing Center",
  location: "Shenzhen, Guangdong, China",
  founded: 2008,
  totalArea: 28000,
  employees: 340,
  productionLines: 7,
  certifications: [
    "ISO 9001:2015 Quality Management System",
    "ISO 14001:2015 Environmental Management",
    "ISO 45001:2018 Occupational Health & Safety",
    "CE Marking (EU Compliance)",
    "UL Listed (UL 778 & UL 1004)",
    "RoHS Directive 2011/65/EU",
    "IP65 Ingress Protection (All Pump Enclosures)",
    "FDA 21 CFR Food-Grade Materials",
    "ETL Intertek Certified (North America)",
    "CSA C22.2 No. 108 (Canada)",
  ],
  manufacturingCapabilities: [
    "CNC precision machining \u2014 5-axis Mazak and Haas cells for pump housings, manifold blocks, and custom fittings with \u00b10.005mm tolerance",
    "High-pressure pump assembly \u2014 dedicated positive-displacement plunger pump lines rated 250\u20131,500 PSI with automated torque station and helium leak testing",
    "Nozzle manufacturing \u2014 laser-drilled 0.008\u20130.020 inch ruby and stainless-steel orifice production with in-line particle counting QC",
    "Stainless-steel tube fabrication \u2014 304/316L tube cutting, swaging, and flaring for 3/8\u201d, 1/2\u201d, and 3/4\u201d high-pressure lines up to 2,500 PSI",
    "PCB and control systems assembly \u2014 SMT pick-and-place for controller boards with conformal coating for outdoor-rated electronics",
    "Powder coating and finishing \u2014 automated electrostatic powder-coating line with 7-stage pre-treatment for outdoor-rated corrosion resistance (ASTM B117 1,500+ hours salt spray)",
    "Motor winding and balancing \u2014 in-house TEFC and ODP motor winding for 1\u201350 HP units with dynamic balancing to ISO 1940 G2.5",
    "Filtration media production \u2014 spun-bonded polypropylene and stainless-steel mesh filter cartridge manufacturing from 5\u201350 micron ratings",
    "Automated final assembly \u2014 semi-automated assembly stations with poka-yoke pick-to-light systems and digital torque traceability",
    "Custom engineering and OEM \u2014 in-house R&D lab with 3D printing, CFD simulation, and rapid prototyping for bespoke client solutions",
  ],
  qualityControlSteps: [
    "Incoming Material Inspection \u2014 All raw materials (stainless steel, brass, ceramics, polymers) verified against mill certificates with spectrometer composition analysis for every batch.",
    "First-Article Inspection (FAI) \u2014 Complete dimensional and functional check on the first unit of every production run per AS9102 standards before line clearance.",
    "In-Process SPC Monitoring \u2014 Real-time statistical process control on critical dimensions (nozzle orifice diameter, pump plunger clearance, seal compression) with automated alerts at \u00b13-sigma drift.",
    "Hydrostatic Pressure Testing \u2014 100% of pump housings, manifolds, and tube assemblies pressure-tested at 1.5x rated working pressure with digital data logging and serial-number traceability.",
    "Flow Rate Calibration \u2014 Each nozzle batch sampled at 15% AQL per ANSI/ASQ Z1.4; flow rate tolerance held to \u00b13% of nominal across the rated pressure curve.",
    "Electrical Safety Test \u2014 Every motor and controller undergoes hipot (dielectric withstand), insulation resistance, and ground-bond testing per UL/IEC 60335-1 with automated pass/fail recording.",
    "Environmental Chamber Cycling \u2014 Sample units from each production lot subjected to 96-hour thermal cycling (-20\u00b0F to 140\u00b0F) with 95% humidity at peak to validate outdoor durability claims.",
    "Salt Spray Corrosion Testing \u2014 Coated components undergo ASTM B117 neutral salt spray testing; minimum 1,500 hours to red rust for outdoor-rated enclosures with monthly lot sampling.",
    "Noise Level Verification \u2014 Pump skids and fan units measured in a semi-anechoic chamber per ISO 3744; 65 dBA maximum at 3 meters verified on every production unit.",
    "End-of-Line Run-In Test \u2014 Every assembled pump system undergoes a 2-hour continuous run-in at rated pressure with thermal imaging, vibration spectrum analysis, and oil analysis before crating.",
    "Pre-Shipment Audit \u2014 Final dimensional, cosmetic, and documentation audit per ANSI/ASQ Z1.4 Level II before release; includes crate integrity, label accuracy, and accessory kit completeness check.",
    "Traceability and Batch Records \u2014 Full digital batch record including material heats, torque values, test results, inspector sign-offs, and shipping serial numbers archived for 15 years per ISO 9001.",
  ],
  galleryImages: [
    "/images/products/factory-exterior.jpg",
    "/images/products/cnc-machining-cell.jpg",
    "/images/products/pump-assembly-line.jpg",
    "/images/products/nozzle-testing-lab.jpg",
    "/images/products/powder-coating-line.jpg",
    "/images/products/pcb-assembly-smt.jpg",
    "/images/products/hydrostatic-test-bay.jpg",
    "/images/products/environmental-chamber.jpg",
    "/images/products/warehouse-shipping.jpg",
    "/images/products/rd-lab-cfd-simulation.jpg",
  ],
};
