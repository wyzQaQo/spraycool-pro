export interface Certificate {
  name: string;
  issuingBody: string;
  number: string;
  validUntil: string;
  description: string;
  icon: string;
}

export const certificates: Certificate[] = [
  {
    name: "ISO 9001:2015",
    issuingBody: "T\u00dcV S\u00dcD Management Service GmbH",
    number: "QMS-2023-MG-8842-TS",
    validUntil: "2029-06-14",
    description:
      "Internationally recognized quality management system certification covering the design, manufacture, and after-sales service of high-pressure misting systems, pump skids, and precision nozzles. Recertified with zero non-conformities in the most recent surveillance audit.",
    icon: "Certificate",
  },
  {
    name: "CE Marking",
    issuingBody: "EU Notified Body No. 2460 (T\u00dcV Rheinland)",
    number: "CE-MG-2023-OP-0194",
    validUntil: "2028-11-30",
    description:
      "European conformity marking confirming compliance with the Machinery Directive 2006/42/EC, Low Voltage Directive 2014/35/EU, Electromagnetic Compatibility Directive 2014/30/EU, and Pressure Equipment Directive 2014/68/EU for all products sold in the European Economic Area.",
    icon: "Globe",
  },
  {
    name: "RoHS 3 (2015/863/EU)",
    issuingBody: "SGS-CSTC Standards Technical Services Co., Ltd.",
    number: "SGS-ROHS-MG-2024-0556",
    validUntil: "2028-03-22",
    description:
      "Restriction of Hazardous Substances compliance for all electrical and electronic components. All 100Cooling products are verified lead-free, mercury-free, cadmium-free, and free of all 10 restricted substances including the four phthalates added under RoHS 3.",
    icon: "Flask",
  },
  {
    name: "UL Listed (UL 778 & UL 1004)",
    issuingBody: "Underwriters Laboratories Inc.",
    number: "UL-E502841",
    validUntil: "2029-09-18",
    description:
      "North American safety certification covering motor-operated water pumps (UL 778) and electric motors (UL 1004). All 100Cooling pump systems shipped to the U.S. and Canada bear the UL Listed mark with quarterly unannounced factory inspections by UL field representatives.",
    icon: "ShieldCheck",
  },
  {
    name: "IP65 Ingress Protection",
    issuingBody: "Intertek Testing Services NA, Inc.",
    number: "ITS-IP65-MG-2024-0732",
    validUntil: "2030-01-05",
    description:
      "Certified dust-tight and protected against low-pressure water jets from any direction. All 100Cooling pump enclosures, outdoor controllers, and junction boxes achieve IP65 rating, verified through independent testing per IEC 60529.",
    icon: "DropHalf",
  },
  {
    name: "FDA 21 CFR Food-Grade Materials",
    issuingBody: "NSF International",
    number: "NSF-FDA-MG-2023-1198",
    validUntil: "2028-08-14",
    description:
      "Certification that all wetted components in 100Cooling food-processing and greenhouse product lines\u2014including stainless-steel tubing, nozzle bodies, seals, and lubricants\u2014comply with FDA 21 CFR \u00a7175.300 for incidental food contact and \u00a7176.170 for aqueous food contact.",
    icon: "Checks",
  },
  {
    name: "ETL Intertek Certified",
    issuingBody: "Intertek Testing Services NA, Inc.",
    number: "ETL-5018297-MG",
    validUntil: "2029-02-11",
    description:
      "Electrical safety certification equivalent to UL standards for the North American market. Covers all 100Cooling motor controllers, VFD drives, and electrical panels rated up to 600V. Listed under UL 508A Industrial Control Panels and CSA C22.2 No. 14.",
    icon: "Lightning",
  },
  {
    name: "ISO 14001:2015",
    issuingBody: "T\u00dcV S\u00dcD Management Service GmbH",
    number: "EMS-2023-MG-6218-TS",
    validUntil: "2029-02-08",
    description:
      "Environmental management system certification covering responsible resource use, waste reduction, and lifecycle environmental impact assessment across 100Cooling\u2019s manufacturing operations. Includes annual third-party surveillance audits and a commitment to carbon-neutral manufacturing by 2028.",
    icon: "Tree",
  },
  {
    name: "ISO 45001:2018",
    issuingBody: "T\u00dcV S\u00dcD Management Service GmbH",
    number: "OHS-2023-MG-4407-TS",
    validUntil: "2029-04-19",
    description:
      "Occupational health and safety management system certification. 100Cooling maintains a Total Recordable Incident Rate (TRIR) of 0.41\u2014significantly below the 3.0 industry average for fabricated metal product manufacturing\u2014and has achieved over 1,800 consecutive days without a lost-time incident.",
    icon: "HardHat",
  },
  {
    name: "CSA C22.2 No. 108",
    issuingBody: "CSA Group (Canadian Standards Association)",
    number: "CSA-1093847-MG",
    validUntil: "2028-12-30",
    description:
      "Canadian national safety standard certification for motor-operated appliances. All 100Cooling products shipped to Canadian customers meet the requirements of CSA C22.2 No. 108 with a cCSAus mark, recognized by all Canadian provincial electrical safety authorities.",
    icon: "Leaf",
  },
];
