import { GalleryExperience } from "@/components/gallery/GalleryExperience";
import type { GalleryItem } from "@/data/gallery";
import { createPageMetadata } from "@/lib/seo";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Galería de resultados en Puerto Plata",
  description:
    "Explora resultados de masajes, cejas, pestañas y depilación de CARELA Beauty & Wellness en Puerto Plata, República Dominicana.",
  path: "/galeria",
});

export default async function GaleriaPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("gallery_items")
    .select("*")
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });

  const items: GalleryItem[] = (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    service: row.service,
    imageUrl: supabase.storage.from("gallery").getPublicUrl(row.image_path).data
      .publicUrl,
    imagePath: row.image_path,
    isPinned: row.is_pinned,
    createdAt: row.created_at,
  }));

  return <GalleryExperience items={items} />;
}
