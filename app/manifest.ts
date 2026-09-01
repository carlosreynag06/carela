import type { MetadataRoute } from "next";
import { brandName, brandShortName } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brandName,
    short_name: brandShortName,
    description:
      "Masajes y servicios de belleza con atención personalizada en Puerto Plata, República Dominicana.",
    start_url: "/",
    display: "standalone",
    background_color: "#080506",
    theme_color: "#080506",
    lang: "es-DO",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
