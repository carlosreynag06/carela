import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

const publicRoutes = [
  "",
  "/servicios",
  "/sobre-leidania",
  "/testimonios",
  "/preguntas",
  "/terminos",
  "/politica",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
  }));
}
