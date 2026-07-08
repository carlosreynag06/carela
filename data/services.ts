import {
  Eye,
  Flower2,
  HandHeart,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: "masajes" | "cejas" | "pestanas" | "depilacion";
  title: string;
  shortTitle: string;
  description: string;
  benefit: string;
  imageKey: string;
  imageSrc: string;
  imageAlt: string;
  icon: LucideIcon;
  includes: string[];
  idealFor: string;
};

export const services: Service[] = [
  {
    slug: "masajes",
    title: "Masajes relajantes y terapéuticos",
    shortTitle: "Masajes",
    description:
      "Libera tensión, descansa el cuerpo y regálate un momento de calma profunda.",
    benefit: "Para relajarte, respirar mejor y salir renovada.",
    imageKey: "massage-room",
    imageSrc: "/images/service-masajes-v2.png",
    imageAlt: "Mujer recibiendo un masaje relajante en ambiente privado",
    icon: HandHeart,
    includes: [
      "Ambiente relajante",
      "Atención personalizada",
      "Enfoque en zonas de tensión",
      "Modalidad en espacio privado o a domicilio",
    ],
    idealFor:
      "Ideal para mujeres con cansancio, estrés o tensión acumulada que desean un cuidado tranquilo y personal.",
  },
  {
    slug: "cejas",
    title: "Tintado de cejas",
    shortTitle: "Cejas",
    description: "Define tu mirada con un acabado natural, limpio y elegante.",
    benefit: "Para elevar tu expresión sin perder naturalidad.",
    imageKey: "beauty-detail",
    imageSrc: "/images/service-cejas-v2.png",
    imageAlt: "Mujer recibiendo tintado de cejas con cuidado profesional",
    icon: Eye,
    includes: [
      "Diseño visual cuidadoso",
      "Tintado de acabado natural",
      "Atención higiénica y detallista",
      "Orientación según tu estilo",
    ],
    idealFor:
      "Ideal para quienes desean cejas más definidas y una mirada más pulida.",
  },
  {
    slug: "pestanas",
    title: "Postura de pestañas",
    shortTitle: "Pestañas",
    description:
    "Eleva tus ojos con un resultado femenino, delicado y favorecedor.",
    benefit: "Para sentirte arreglada con un detalle suave y elegante.",
    imageKey: "lashes-detail",
    imageSrc: "/images/service-pestanas-v2.png",
    imageAlt: "Mujer recibiendo postura de pestañas en estudio boutique",
    icon: Sparkles,
    includes: [
      "Preparación cuidadosa",
      "Aplicación personalizada",
      "Resultado femenino y favorecedor",
      "Recomendaciones de cuidado",
    ],
    idealFor:
      "Ideal para elevar la mirada con un acabado delicado, sin exageraciones.",
  },
  {
    slug: "depilacion",
    title: "Depilación con cera",
    shortTitle: "Depilación",
    description:
      "Piel más suave con un servicio cuidadoso, higiénico y profesional.",
    benefit: "Para sentir la piel limpia, suave y bien cuidada.",
    imageKey: "waxing-prep",
    imageSrc: "/images/service-depilacion-v2.png",
    imageAlt: "Depilación con cera en pierna con atención profesional",
    icon: Flower2,
    includes: [
      "Preparación del área",
      "Depilación con cera",
      "Cuidado de la piel",
      "Proceso privado y profesional",
    ],
    idealFor:
      "Ideal para quienes buscan suavidad y una atencion respetuosa en cada detalle.",
  },
];
