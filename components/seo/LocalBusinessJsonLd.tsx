import { services } from "@/data/services";
import { brandName, siteUrl, socialImageUrl } from "@/lib/seo";
import { site, whatsapp } from "@/lib/site";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["BeautySalon", "DaySpa"],
  "@id": `${siteUrl}/#negocio`,
  name: brandName,
  description:
    "Servicios personalizados de masajes, cejas, pestañas y depilación en Puerto Plata, República Dominicana.",
  url: siteUrl,
  image: socialImageUrl,
  telephone: whatsapp.number,
  founder: {
    "@type": "Person",
    name: site.owner,
  },
  sameAs: ["https://www.instagram.com/carela_b.w"],
  areaServed: {
    "@type": "City",
    name: "Puerto Plata",
    containedInPlace: {
      "@type": "Country",
      name: "República Dominicana",
      identifier: "DO",
    },
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "reservas",
    telephone: whatsapp.number,
    url: whatsapp.url,
    availableLanguage: ["es"],
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de belleza y bienestar",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        url: `${siteUrl}/servicios#${service.slug}`,
        areaServed: "Puerto Plata, República Dominicana",
      },
    })),
  },
};

export function LocalBusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
