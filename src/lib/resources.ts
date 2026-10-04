export interface Resource {
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
  category: string;
  downloadPath: string;
}

export const resources: Resource[] = [
  {
    title: "MG-P1500 High-Pressure Pump Datasheet",
    description:
      "Complete technical specifications for the MG-P1500 triplex plunger pump including flow curves, motor configurations, pressure ratings, and dimensional drawings.",
    fileType: "PDF",
    fileSize: "2.4 MB",
    category: "Datasheet",
    downloadPath: "/downloads/mg-pro-1500-datasheet.pdf",
  },
  {
    title: "100Cooling 2026 Full Product Catalog",
    description:
      "Comprehensive 48-page product catalog covering all pump modules, nozzles, tubing, filtration systems, and control accessories in the 100Cooling line.",
    fileType: "PDF",
    fileSize: "8.7 MB",
    category: "Catalog",
    downloadPath: "/downloads/mistguard-pro-2026-catalog.pdf",
  },
  {
    title: "MG-8000 Industrial Misting System Brochure",
    description:
      "Application-focused brochure for the MG-8000 industrial misting system. Includes case studies, performance data from factory installations, and ROI calculators.",
    fileType: "PDF",
    fileSize: "3.1 MB",
    category: "Brochure",
    downloadPath: "/downloads/mg-8000-industrial-brochure.pdf",
  },
  {
    title: "Nozzle Selection and Orifice Sizing Guide",
    description:
      "Technical reference for selecting the correct nozzle orifice size and body material. Includes flow-rate tables for 0.006 through 0.015 inch orifices at pressures from 800 to 1200 psi.",
    fileType: "PDF",
    fileSize: "1.6 MB",
    category: "Technical Guide",
    downloadPath: "/downloads/nozzle-selection-guide.pdf",
  },
  {
    title: "MG-P200 / MG-P500 Installation and Operation Manual",
    description:
      "Step-by-step installation instructions, commissioning procedures, and operating guidelines for MG-P200 (2 HP) and MG-P500 (5 HP) pump modules.",
    fileType: "PDF",
    fileSize: "5.2 MB",
    category: "Manual",
    downloadPath: "/downloads/mg-p200-p500-installation-manual.pdf",
  },
  {
    title: "MG-P1500 / MG-P2000 Installation and Operation Manual",
    description:
      "Detailed installation and operation manual for large-capacity MG-P1500 (15 HP) and MG-P2000 (20 HP) industrial pump modules with three-phase electrical requirements.",
    fileType: "PDF",
    fileSize: "6.8 MB",
    category: "Manual",
    downloadPath: "/downloads/mg-p1500-p2000-installation-manual.pdf",
  },
  {
    title: "MG-Pump-Mount Pump Bracket CAD Drawing (STEP)",
    description:
      "3D CAD model of the standard MG-Pump-Mount universal pump bracket. STEP format for import into SolidWorks, Inventor, Fusion 360, and other parametric CAD platforms.",
    fileType: "STEP",
    fileSize: "1.2 MB",
    category: "CAD File",
    downloadPath: "/downloads/mg-pump-mount-bracket.step",
  },
  {
    title: "MG-Nozzle-Body Nozzle Assembly CAD Drawing (STEP)",
    description:
      "3D CAD model of the stainless steel MG-Nozzle-Body assembly with ruby orifice insert and anti-drip check valve. Use for integration into architectural and MEP design models.",
    fileType: "STEP",
    fileSize: "840 KB",
    category: "CAD File",
    downloadPath: "/downloads/mg-nozzle-body-assembly.step",
  },
  {
    title: "100Cooling Tubing and Fittings Compatibility Matrix",
    description:
      "Complete compatibility reference for all 100Cooling tubing types, compression fittings, adapters, and connectors. Includes pressure ratings and material compatibility by chemical exposure.",
    fileType: "PDF",
    fileSize: "980 KB",
    category: "Technical Guide",
    downloadPath: "/downloads/tubing-fittings-compatibility-matrix.pdf",
  },
  {
    title: "Commercial Misting System RFP Template",
    description:
      "Ready-to-use Request for Proposal template for commercial misting system procurement. Includes specification worksheets for pump sizing, nozzle layout, control requirements, and installation scope.",
    fileType: "PDF",
    fileSize: "520 KB",
    category: "Template",
    downloadPath: "/downloads/commercial-misting-rfp-template.pdf",
  },
];
