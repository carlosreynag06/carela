import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Galería de resultados",
  description:
    "Explora videos y fotos de masajes, cejas, pestañas y depilación de CARELA Beauty & Wellness en Puerto Plata.",
  path: "/galeria",
});

export default function GaleriaPage() {
  return <GalleryExperience />;
}
