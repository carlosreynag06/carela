export type GalleryServiceKey =
  | "masajes"
  | "cejas"
  | "pestanas"
  | "depilacion";

export type GalleryMediaType = "video" | "image";

export type GalleryItem = {
  id: string;
  title: string;
  mediaType: GalleryMediaType;
  service: GalleryServiceKey;
  youtubeUrl?: string;
  imageUrl: string;
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
    images: string[];
  }
> = {
  masajes: {
    title: "Masajes relajantes y terapéuticos",
    shortTitle: "Masajes",
    description:
      "Momentos de calma, atención personalizada y alivio para volver a sentir el cuerpo ligero.",
    images: [
      "/images/service-masajes-v2.png",
      "/images/service-page-masajes.png",
      "/images/testimonial-masajes.png",
      "/images/service-masajes.png",
    ],
  },
  cejas: {
    title: "Tintado de cejas",
    shortTitle: "Cejas",
    description:
      "Diseños definidos con suavidad para enmarcar la mirada sin perder naturalidad.",
    images: [
      "/images/service-cejas-v2.png",
      "/images/service-page-cejas.png",
      "/images/testimonial-cejas.png",
      "/images/service-cejas.png",
    ],
  },
  pestanas: {
    title: "Postura de pestañas",
    shortTitle: "Pestañas",
    description:
      "Resultados femeninos y favorecedores, trabajados con precisión para cada mirada.",
    images: [
      "/images/service-pestanas-v2.png",
      "/images/service-page-pestanas.png",
      "/images/testimonial-pestanas.png",
      "/images/service-pestanas.png",
    ],
  },
  depilacion: {
    title: "Depilación con cera",
    shortTitle: "Depilación",
    description:
      "Cuidado de la piel en un ambiente privado, higiénico y pensado para tu comodidad.",
    images: [
      "/images/service-depilacion-v2.png",
      "/images/service-page-depilacion.png",
      "/images/testimonial-depilacion.png",
      "/images/service-depilacion.png",
    ],
  },
};

const videoTitles: Record<GalleryServiceKey, string[]> = {
  masajes: [
    "Una pausa para soltar la tensión",
    "Preparando el ambiente CARELA",
    "Movimiento lento, alivio profundo",
    "Cuidado de espalda y hombros",
    "Un ritual para volver a ti",
    "Detalles que invitan a respirar",
    "Atención adaptada a tu cuerpo",
    "Calma desde el primer momento",
    "Masaje terapéutico personalizado",
    "El cierre perfecto para tu sesión",
    "Bienestar en un espacio privado",
    "Una experiencia sin prisa",
  ],
  cejas: [
    "Diseño que respeta tu expresión",
    "Cómo elegimos el tono ideal",
    "Definición suave y natural",
    "Preparación antes del tintado",
    "Cejas cuidadas, mirada elevada",
    "Precisión en cada detalle",
    "Un acabado limpio y elegante",
    "El proceso de diseño CARELA",
    "Antes y después del tintado",
    "Simetría sin perder naturalidad",
    "Cuidado posterior para tus cejas",
    "Una mirada más armoniosa",
  ],
  pestanas: [
    "Una mirada delicada y femenina",
    "Preparación higiénica de pestañas",
    "Diseño según la forma de tus ojos",
    "Aplicación cómoda y cuidadosa",
    "Naturalidad con más presencia",
    "El detalle que cambia la mirada",
    "Pestañas ligeras y favorecedoras",
    "Cómo cuidarlas después de tu cita",
    "Un set pensado para ti",
    "Precisión, calma y comodidad",
    "Resultado boutique CARELA",
    "Mirada lista para brillar",
  ],
  depilacion: [
    "Preparación cuidadosa de la piel",
    "Una experiencia privada y cómoda",
    "Suavidad con atención profesional",
    "Cuidado antes y después de la cera",
    "Higiene en cada paso",
    "Cómo preparamos cada zona",
    "Piel calmada después de tu cita",
    "Consejos para prolongar la suavidad",
    "Depilación con respeto y cuidado",
    "Detalles para una sesión cómoda",
    "Tu piel, atendida sin prisa",
    "El acabado CARELA",
  ],
};

const imageTitles: Record<GalleryServiceKey, string[]> = {
  masajes: [
    "Calma preparada para ti",
    "Ritual de bienestar",
    "Un espacio para respirar",
    "Atención a cada tensión",
    "Ambiente íntimo y cuidado",
    "Descanso para cuerpo y mente",
    "Tu momento CARELA",
    "Detalles que reconfortan",
    "Bienestar personalizado",
    "Pausa profunda",
    "Cuidado que se siente",
    "Renovación y ligereza",
  ],
  cejas: [
    "Definición natural",
    "Diseño a tu medida",
    "Tono suave y favorecedor",
    "Mirada en armonía",
    "Precisión CARELA",
    "Acabado limpio",
    "Cejas con intención",
    "Belleza sin excesos",
    "Forma y equilibrio",
    "Resultado personalizado",
    "Detalles de tintado",
    "Una mirada más pulida",
  ],
  pestanas: [
    "Mirada sutil",
    "Aplicación delicada",
    "Pestañas con movimiento",
    "Resultado femenino",
    "Detalle y precisión",
    "Comodidad en cada paso",
    "Diseño favorecedor",
    "Ligereza natural",
    "Set personalizado",
    "Mirada CARELA",
    "Cuidado posterior",
    "Belleza que se nota",
  ],
  depilacion: [
    "Piel suave y cuidada",
    "Preparación profesional",
    "Privacidad y comodidad",
    "Cuidado calmante",
    "Higiene y detalle",
    "Suavidad prolongada",
    "Atención respetuosa",
    "Piel lista y luminosa",
    "Rutina de cuidado",
    "Resultado uniforme",
    "Bienestar para tu piel",
    "Cierre calmante",
  ],
};

function buildMockItems(): GalleryItem[] {
  const items: GalleryItem[] = [];

  galleryServiceOrder.forEach((service, serviceIndex) => {
    const images = galleryServiceInfo[service].images;

    videoTitles[service].forEach((title, index) => {
      items.push({
        id: `${service}-video-${index + 1}`,
        title,
        mediaType: "video",
        service,
        youtubeUrl: `https://youtu.be/carela${serviceIndex}${String(index + 1).padStart(4, "0")}`,
        imageUrl: images[index % images.length],
        isPinned: index < 2,
        createdAt: new Date(Date.UTC(2026, 7, 20 - index, 15, serviceIndex)).toISOString(),
      });
    });

    imageTitles[service].forEach((title, index) => {
      items.push({
        id: `${service}-image-${index + 1}`,
        title,
        mediaType: "image",
        service,
        imageUrl: images[(index + 1) % images.length],
        isPinned: index === 0,
        createdAt: new Date(Date.UTC(2026, 7, 19 - index, 16, serviceIndex)).toISOString(),
      });
    });
  });

  return items;
}

export const initialGalleryItems = buildMockItems();

export function sortGalleryItems(items: GalleryItem[]) {
  return [...items].sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
  });
}

export function isYouTubeUrl(value: string) {
  try {
    const url = new URL(value);
    return (
      url.hostname === "youtu.be" ||
      url.hostname.endsWith("youtube.com") ||
      url.hostname.endsWith("youtube-nocookie.com")
    );
  } catch {
    return false;
  }
}
