export type GalleryServiceKey =
  | "masajes"
  | "cejas"
  | "pestanas"
  | "depilacion";

export type GalleryItem = {
  id: string;
  title: string;
  service: GalleryServiceKey;
  imageUrl: string;
  imagePath: string;
  isPinned: boolean;
  createdAt: string;
};

export const galleryServiceOrder: GalleryServiceKey[] = [
  "masajes",
  "cejas",
  "pestanas",
  "depilacion",
];

export const galleryServiceInfo: Record<
  GalleryServiceKey,
  {
    title: string;
    shortTitle: string;
    description: string;
  }
> = {
  masajes: {
    title: "Masajes relajantes y terapéuticos",
    shortTitle: "Masajes",
    description:
      "Momentos de calma, atención personalizada y alivio para volver a sentir el cuerpo ligero.",
  },
  cejas: {
    title: "Tintado de cejas",
    shortTitle: "Cejas",
    description:
      "Diseños definidos con suavidad para enmarcar la mirada sin perder naturalidad.",
  },
  pestanas: {
    title: "Postura de pestañas",
    shortTitle: "Pestañas",
    description:
      "Resultados femeninos y favorecedores, trabajados con precisión para cada mirada.",
  },
  depilacion: {
    title: "Depilación con cera",
    shortTitle: "Depilación",
    description:
      "Cuidado de la piel en un ambiente privado, higiénico y pensado para tu comodidad.",
  },
};

export function sortGalleryItems(items: GalleryItem[]) {
  return [...items].sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
  });
}
