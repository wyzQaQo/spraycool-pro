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
    name: "MG-PRO 1500 محطة ضخ عالية الضغط",
    tagline: "مضخة رذاذ صناعية 150 بار مع تحكم بمحرك VFD",
    category: "pump-station",
    description:
      "MG-PRO 1500 هي محطة الضخ عالية الضغط الرائدة لدينا، مصممة للتشغيل المستمر على مدار الساعة في أكثر البيئات تطلبًا. تتميز بمحرك تردد متغير 5.5 كيلوواط، ورأس مضخة من الفولاذ المقاوم للصدأ 316L، ونظام تنظيم ضغط ذكي يحافظ على إخراج ثابت عبر أكثر من 200 مصفوفة فوهة.",
    features: [
      "أقصى ضغط تشغيل 150 بار",
      "محرك VFD للتحكم في السرعة المتغيرة الموفرة للطاقة",
      "رأس مضخة وصمامات ووصلات من الفولاذ المقاوم للصدأ 316L",
      "حاوية مقاومة للعوامل الجوية IP65 مع تبريد نشط",
      "نظام ترشيح مياه متكامل من 5 مراحل",
      "Modbus RTU / TCP للتكامل مع SCADA",
      "حماية إيقاف تلقائي عند انخفاض مستوى المياه",
      "حاوية عازلة للصوت (< 55 ديسيبل)",
    ],
    specs: [
      { label: "الضغط الأقصى", value: "150 bar (2,175 PSI)" },
      { label: "معدل التدفق", value: "8-25 L/min (variable)" },
      { label: "قوة المحرك", value: "5.5 kW, 380V 3-phase" },
      { label: "مادة المضخة", value: "316L Stainless Steel" },
      { label: "سعة الفوهات", value: "Up to 200 nozzles" },
      { label: "الأبعاد", value: "800 x 600 x 1200 mm" },
      { label: "الوزن", value: "145 kg" },
      { label: "مستوى الضوضاء", value: "< 55 dB(A)" },
      { label: "تصنيف الحماية", value: "IP65" },
      { label: "الترشيح", value: "5-stage (50/20/5/1/0.5 micron)" },
      { label: "الاتصالات", value: "Modbus RTU, TCP/IP, 4G optional" },
      { label: "درجة حرارة التشغيل", value: "-10°C to 55°C" },
    ],
    images: ["/images/products/pump-station.png"],
    mainImage: "/images/products/pump-station.png",
    priceRange: "$8,500 - $12,000",
    leadTime: "4-6 weeks",
    warranty: "5 years",
  },
  {
    slug: "mg-mist-pro-x200",
    name: "MG-MIST PRO X200 نظام الرذاذ المتكامل",
    tagline: "حل تبريد خارجي جاهز مع 200 فوهة سيراميك",
    category: "misting-system",
    description:
      "حزمة نظام رذاذ كاملة جاهزة للتركيب تشمل مضخة MG-PRO 1500 و200 فوهة سيراميك دقيقة و500 متر من أنابيب الفولاذ المقاوم للصدأ عالية الضغط وجميع أدوات التركيب. مثالية للمطاعم والمنتجعات والمساحات التجارية المتوسطة حتى 5000 متر مربع.",
    features: [
      "200 فوهة سيراميك مضادة للانسداد 0.15 مم",
      "500 متر أنابيب ضغط عالي من الفولاذ المقاوم للصدأ 316L (قطر خارجي 9.52 مم)",
      "وصلات ضغط سريعة التوصيل، لا حاجة للحام",
      "مشعب صمامات منطقة مجمع مسبقًا (حتى 8 مناطق)",
      "يشمل وحدة تحكم IoT مع جدولة قائمة على الطقس",
      "جاهز لحقن طارد البعوض النباتي",
      "دعم تركيب في الموقع متاح",
      "حاصل على شهادات CE وRoHS وISO 9001",
    ],
    specs: [
      { label: "مساحة التغطية", value: "Up to 5,000 m²" },
      { label: "عدد الفوهات", value: "200 (expandable to 400)" },
      { label: "طول الأنابيب", value: "500m included" },
      { label: "مادة الأنابيب", value: "316L Stainless Steel" },
      { label: "فتحة الفوهة", value: "0.15mm Ceramic" },
      { label: "حجم القطيرات", value: "5-15 micron" },
      { label: "سعة التبريد", value: "Up to 15°C reduction" },
      { label: "المناطق", value: "8 (expandable to 16)" },
      { label: "ارتفاع التركيب", value: "2.5 - 6 meters" },
      { label: "استهلاك المياه", value: "8-25 L/min" },
      { label: "الطاقة", value: "380V 3-phase, 5.5 kW" },
      { label: "متوافق مع الطارد", value: "Yes, integrated dosing pump" },
    ],
    images: ["/images/products/outdoor-installation.png"],
    mainImage: "/images/products/outdoor-installation.png",
    priceRange: "$15,000 - $25,000",
    leadTime: "6-8 weeks",
    warranty: "5 years (pump), 3 years (nozzles)",
  },
  {
    slug: "mg-nozzle-c150",
    name: "MG-NOZZLE C150 مجموعة فوهات الرذاذ السيراميكية",
    tagline: "فوهات سيراميك دقيقة 0.15 مم مع صمام مضاد للتنقيط",
    category: "accessories",
    description:
      "فوهة السيراميك الخاصة بنا مع صمام فحص مدمج مضاد للتنقيط. تنتج الفتحة المحفورة بالليزر بدقة 0.15 مم نمط رذاذ متسق 5-15 ميكرون. يتم اختبار تدفق كل فوهة بشكل فردي وتأتي مع ضمان مضاد للانسداد لمدة 3 سنوات.",
    features: [
      "فتحة سيراميك محفورة بالليزر 0.15 مم",
      "صمام فحص مدمج محمل بنابض مضاد للتنقيط",
      "جسم ووصلة ضغط من الفولاذ المقاوم للصدأ 316L",
      "خيارات زاوية رش 90 درجة أو 180 درجة",
      "تصميم محكم بحلقة O-ring، صيانة مجانية",
      "اختبار تدفق فردي وترقيم تسلسلي",
      "أحجام فتحات قابلة للتبديل متاحة (0.1 مم، 0.2 مم، 0.3 مم)",
      "متوافقة مع جميع الأنابيب القياسية بقطر خارجي 9.52 مم",
    ],
    specs: [
      { label: "حجم الفتحة", value: "0.15mm (0.1/0.2/0.3mm available)" },
      { label: "مادة الجسم", value: "316L Stainless Steel" },
      { label: "مادة الفتحة", value: "Zirconia Ceramic" },
      { label: "زاوية الرش", value: "90° or 180°" },
      { label: "معدل التدفق", value: "0.04-0.06 L/min per nozzle" },
      { label: "ضغط التشغيل", value: "70-150 bar" },
      { label: "حجم القطيرات", value: "5-15 micron at 150 bar" },
      { label: "التوصيل", value: "9.52mm OD compression" },
      { label: "مضاد التنقيط", value: "Spring-loaded check valve" },
      { label: "الوزن", value: "28g per nozzle" },
    ],
    images: ["/images/products/ceramic-nozzles.png"],
    mainImage: "/images/products/ceramic-nozzles.png",
    priceRange: "$18 - $35 per nozzle",
    leadTime: "2-3 weeks",
    warranty: "3 years",
  },
  {
    slug: "mg-iot-hub",
    name: "MG-IOT HUB نظام التحكم الذكي",
    tagline: "تحكم في الرذاذ متصل بالسحابة مع تحسين ذكي للطقس",
    category: "control",
    description:
      "يجلب MG-IOT HUB الأتمتة الذكية لنظام الرذاذ الخاص بك. يتميز بشاشة لمس صناعية 7 بوصة، وصول إلى لوحة التحكم السحابية، جدولة قائمة على الطقس، تحكم على مستوى المنطقة، ووضع تحسين اختياري مدعوم بالذكاء الاصطناعي يتعلم أنماط الاستخدام لتقليل استهلاك المياه والطاقة.",
    features: [
      "شاشة لمس صناعية IP65 مقاس 7 بوصة",
      "لوحة تحكم سحابية يمكن الوصول إليها من أي جهاز",
      "تكامل مع API الطقس للجدولة التلقائية",
      "تحكم مستقل في 8 مناطق مع مؤقتات",
      "وضع تحسين الذكاء الاصطناعي (توفير الطاقة والمياه)",
      "مراقبة درجة الحرارة والرطوبة والضغط في الوقت الفعلي",
      "إشعارات فورية لتنبيهات الصيانة",
      "تسجيل البيانات التاريخية وتصديرها (CSV/PDF)",
      "Modbus RTU/TCP للتكامل مع SCADA/BMS",
      "اتصال احتياطي 4G (شريحة SIM مرفقة)",
    ],
    specs: [
      { label: "الشاشة", value: '7" IPS touchscreen, 1024x600' },
      { label: "الاتصال", value: "WiFi, Ethernet, 4G LTE" },
      { label: "البروتوكولات", value: "Modbus RTU/TCP, MQTT, HTTP API" },
      { label: "التحكم في المناطق", value: "8 zones (expandable to 16)" },
      { label: "المستشعرات", value: "Temperature, humidity, pressure, flow" },
      { label: "المنصة السحابية", value: "MG Cloud (AWS hosted)" },
      { label: "التنبيهات", value: "Push, SMS, Email" },
      { label: "تصدير البيانات", value: "CSV, PDF reports" },
      { label: "الحماية", value: "IP65 front panel" },
      { label: "الطاقة", value: "24V DC, PoE option" },
      { label: "درجة حرارة التشغيل", value: "-20°C to 60°C" },
      { label: "الأبعاد", value: "220 x 145 x 45 mm" },
    ],
    images: ["/images/products/iot-controller.png"],
    mainImage: "/images/products/iot-controller.png",
    priceRange: "$2,500 - $4,500",
    leadTime: "2-4 weeks",
    warranty: "3 years",
  },
  {
    slug: "mg-repellent-kit",
    name: "MG-REPEL طقم حقن طارد البعوض",
    tagline: "جرعات أوتوماتيكية من الطارد النباتي لمناطق خالية من البعوض",
    category: "accessories",
    description:
      "يتكامل بسلاسة مع أي نظام رذاذ MG لحقن جرعات مقاسة من الطارد النباتي أو الاصطناعي في خط الرذاذ. جداول قابلة للبرمجة وجرعات خاصة بالمنطقة وخزان تركيز سعة 20 لترًا توفر أسابيع من التشغيل المستقل. ينشئ محيطًا واقيًا بارتفاع 6 أمتار.",
    features: [
      "مضخة جرعات تمعجية دقيقة (0.1-10 مل/دقيقة)",
      "خزان تركيز HDPE سعة 20 لترًا مع مستشعر مستوى",
      "برامج جرعات خاصة بالمنطقة",
      "متوافق مع الطاردات النباتية والاصطناعية",
      "تنبيهات تلقائية لانخفاض المستوى وتذكيرات إعادة التعبئة",
      "منع التدفق العكسي واحتواء مزدوج",
      "تكامل سريع التوصيل مع أنظمة MG الحالية",
      "مركزات طارد مسجلة لدى وكالة حماية البيئة متاحة",
    ],
    specs: [
      { label: "نوع المضخة", value: "Peristaltic (precision dosing)" },
      { label: "نطاق الجرعات", value: "0.1 - 10 mL/min" },
      { label: "الخزان", value: "20L HDPE with level sensor" },
      { label: "ارتفاع التغطية", value: "Up to 6 meters" },
      { label: "أنواع الطارد", value: "Botanical (pyrethrin) & synthetic" },
      { label: "الطاقة", value: "24V DC from MG pump station" },
      { label: "التكامل", value: "Plug-and-play with MG-IOT HUB" },
      { label: "السلامة", value: "Double containment, backflow prevention" },
      { label: "الأبعاد", value: "400 x 300 x 500 mm" },
      { label: "الوزن (فارغ)", value: "8 kg" },
    ],
    images: [],
    mainImage: "",
    priceRange: "$1,200 - $2,000",
    leadTime: "2-3 weeks",
    warranty: "2 years",
  },
  {
    slug: "mg-industrial-complete",
    name: "MG-INDUSTRIAL نظام تبريد المصانع المتكامل",
    tagline: "رذاذ للخدمة الشاقة للمصانع والمستودعات والمنشآت الصناعية حتى 10,000 متر مربع",
    category: "misting-system",
    description:
      "مصمم لأكثر البيئات الصناعية تطلبًا. محطتا ضخ MG-PRO 1500 مزدوجتان احتياطيًا و400 فوهة للخدمة الشاقة و1000 متر من الأنابيب وترشيح من الدرجة الصناعية. يشمل وضع إخماد الغبار وتشغيل في درجات حرارة عالية حتى 65 درجة مئوية.",
    features: [
      "محطتا ضخ احتياطيتان مزدوجتان 150 بار (تكوين N+1)",
      "400 فوهة سيراميك للخدمة الشاقة مع غلاف مقوى",
      "1000 متر أنابيب 316L من الدرجة الصناعية",
      "وضع إخماد الغبار مع خيار قطيرات أكبر",
      "نظام معالجة مياه صناعي من 10 مراحل",
      "تشغيل في درجات حرارة عالية يصل إلى 65 درجة مئوية",
      "دورة تشغيل مستمرة 24/7",
      "تكامل SCADA مع بروتوكول OPC UA",
    ],
    specs: [
      { label: "مساحة التغطية", value: "Up to 10,000 m²" },
      { label: "محطات الضخ", value: "2x MG-PRO 1500 (N+1 redundant)" },
      { label: "عدد الفوهات", value: "400 (expandable to 800)" },
      { label: "الأنابيب", value: "1,000m 316L SS included" },
      { label: "سعة التبريد", value: "Up to 15°C reduction" },
      { label: "إخماد الغبار", value: "Yes, dedicated mode" },
      { label: "أقصى درجة حرارة محيطة", value: "65°C" },
      { label: "معالجة المياه", value: "10-stage industrial system" },
      { label: "الطاقة", value: "2x 380V 3-phase, 5.5 kW each" },
      { label: "البروتوكولات", value: "Modbus, OPC UA, MQTT" },
      { label: "دورة التشغيل", value: "24/7 continuous rated" },
      { label: "التركيب", value: "Engineer-supervised, 2-3 weeks" },
    ],
    images: [],
    mainImage: "",
    priceRange: "$35,000 - $55,000",
    leadTime: "8-12 weeks",
    warranty: "5 years (pumps), 3 years (nozzles)",
  },
];

export const categories = [
  { key: "all", label: "جميع المنتجات" },
  { key: "misting-system", label: "الأنظمة المتكاملة" },
  { key: "pump-station", label: "محطات الضخ" },
  { key: "control", label: "أنظمة التحكم" },
  { key: "accessories", label: "الإكسسوارات" },
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
