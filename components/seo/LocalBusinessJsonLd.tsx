import { services } from "@/data/services";
import {
  brandName,
  brandShortName,
  siteUrl,
  socialImageUrl,
} from "@/lib/seo";
import { site, whatsapp } from "@/lib/site";

const websiteId = `${siteUrl}/#website`;
const businessId = `${siteUrl}/#negocio`;

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${siteUrl}/`,
      name: brandShortName,
      alternateName: [brandName, "carelaspa.com"],
      inLanguage: "es-DO",
      publisher: { "@id": businessId },
    },
    {
      "@type": ["BeautySalon", "DaySpa"],
      "@id": businessId,
      name: brandName,
      alternateName: brandShortName,
      description:
        "Servicios personalizados de masajes, cejas, pestañas y depilación en Puerto Plata, República Dominicana.",
      url: `${siteUrl}/`,
      image: {
        "@type": "ImageObject",
        url: socialImageUrl,
        width: 1200,
        height: 630,
      },
      telephone: whatsapp.number,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Puerto Plata",
        addressRegion: "Puerto Plata",
        addressCountry: "DO",
      },
      founder: {
        "@type": "Person",
        name: site.owner,
        url: `${siteUrl}/sobre-leidania`,
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
            "@id": `${siteUrl}/servicios#${service.slug}`,
            name: service.title,
            description: service.description,
            url: `${siteUrl}/servicios#${service.slug}`,
            provider: { "@id": businessId },
            areaServed: {
              "@type": "City",
              name: "Puerto Plata",
            },
          },
        })),
      },
    },
  ],
};

export function LocalBusinessJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(siteSchema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
