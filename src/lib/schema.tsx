export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "100Cooling",
          legalName: "Yangguo Trade LLC",
          url: "https://www.100cooling.com",
          description:
            "Industrial-grade high-pressure misting systems for outdoor cooling, dust suppression, and mosquito control. Serving resorts, hotels, agriculture, and industrial facilities worldwide.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "30 N Gould St Ste N",
            addressLocality: "Sheridan",
            addressRegion: "WY",
            postalCode: "82801",
            addressCountry: "US",
          },
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+8617843803954",
            contactType: "sales",
            email: "info@100cooling.com",
          },
          sameAs: ["https://www.linkedin.com/company/100cooling"],
        }),
      }}
    />
  );
}

export function ProductSchema({
  name,
  description,
  image,
}: {
  name: string;
  description: string;
  image?: string;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name,
          description,
          image: image || "https://www.100cooling.com/images/products/pump-station.png",
          brand: { "@type": "Brand", name: "100Cooling" },
          manufacturer: { "@type": "Organization", name: "Yangguo Trade LLC" },
        }),
      }}
    />
  );
}

export function FAQSchema({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: questions.map((q) => ({
            "@type": "Question",
            name: q.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: q.answer,
            },
          })),
        }),
      }}
    />
  );
}
