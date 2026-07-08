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
  icon: LucideIcon;
  includes: string[];
  idealFor: string;
};

export const services: Service[] = [
  {
    slug: "masajes",
    title: "Masajes relajantes y terapeuticos",
    shortTitle: "Masajes",
    description:
      "Libera tension, descansa el cuerpo y regalate un momento de calma profunda.",
    benefit: "Para relajarte, respirar mejor y salir renovada.",
    imageKey: "massage-room",
    icon: HandHeart,
    includes: [
      "Ambiente relajante",
      "Atencion personalizada",
      "Enfoque en zonas de tension",
      "Modalidad en espacio privado o a domicilio",
    ],
    idealFor:
      "Ideal para mujeres con cansancio, estres o tension acumulada que desean un cuidado tranquilo y personal.",
  },
  {
    slug: "cejas",
    title: "Tintado de cejas",
    shortTitle: "Cejas",
    description: "Define tu mirada con un acabado natural, limpio y elegante.",
    benefit: "Para realzar tu expresion sin perder naturalidad.",
    imageKey: "beauty-detail",
    icon: Eye,
    includes: [
      "Diseno visual cuidadoso",
      "Tintado de acabado natural",
      "Atencion higienica y detallista",
      "Orientacion segun tu estilo",
    ],
    idealFor:
      "Ideal para quienes desean cejas mas definidas y una mirada mas pulida.",
  },
  {
    slug: "pestanas",
    title: "Postura de pestanas",
    shortTitle: "Pestanas",
    description:
      "Realza tus ojos con un resultado femenino, delicado y favorecedor.",
    benefit: "Para sentirte arreglada con un detalle suave y elegante.",
    imageKey: "lashes-detail",
    icon: Sparkles,
    includes: [
      "Preparacion cuidadosa",
      "Aplicacion personalizada",
      "Resultado femenino y favorecedor",
      "Recomendaciones de cuidado",
    ],
    idealFor:
      "Ideal para elevar la mirada con un acabado delicado, sin exageraciones.",
  },
  {
    slug: "depilacion",
    title: "Depilacion con cera",
    shortTitle: "Depilacion",
    description:
      "Piel mas suave con un servicio cuidadoso, higienico y profesional.",
    benefit: "Para sentir la piel limpia, suave y bien cuidada.",
    imageKey: "waxing-prep",
    icon: Flower2,
    includes: [
      "Preparacion del area",
      "Depilacion con cera",
      "Cuidado de la piel",
      "Proceso privado y profesional",
    ],
    idealFor:
      "Ideal para quienes buscan suavidad y una atencion respetuosa en cada detalle.",
  },
];
