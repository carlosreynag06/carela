import { services } from "@/data/services";
import { brandName, siteUrl } from "@/lib/seo";

const serviceCatalogSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${siteUrl}/servicios#catalogo`,
  name: `Servicios de ${brandName}`,
  url: `${siteUrl}/servicios`,
  numberOfItems: services.length,
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      "@id": `${siteUrl}/servicios#${service.slug}`,
      name: service.title,
      description: service.description,
      url: `${siteUrl}/servicios#${service.slug}`,
      image: `${siteUrl}${service.imageSrc}`,
      provider: {
        "@id": `${siteUrl}/#negocio`,
        "@type": ["BeautySalon", "DaySpa"],
        name: brandName,
      },
      areaServed: {
        "@type": "City",
        name: "Puerto Plata",
        containedInPlace: {
          "@type": "Country",
          name: "República Dominicana",
          identifier: "DO",
        },
      },
    },
  })),
};

export function ServiceCatalogJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(serviceCatalogSchema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
