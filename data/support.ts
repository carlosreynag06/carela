import type { FAQItem } from "@/components/FAQAccordion";

export type FAQCategory = {
  id: string;
  title: string;
  description: string;
  items: FAQItem[];
};

export const faqCategories: FAQCategory[] = [
  {
    id: "reservas",
    title: "Reservas y experiencia",
    description: "Todo lo esencial antes de coordinar tu cita.",
    items: [
      {
        question: "¿Qué servicios ofrece CARELA?",
        answer:
          "Puedes reservar masajes relajantes y terapéuticos, tintado de cejas, postura de pestañas y depilación con cera. Cada servicio se adapta para que recibas una atención personal, tranquila y cuidada.",
      },
      {
        question: "¿Puedo recibir el servicio a domicilio?",
        answer:
          "Sí. CARELA ofrece atención en un espacio privado y también a domicilio en Puerto Plata, según el servicio y la disponibilidad. Al escribir por WhatsApp coordinamos la modalidad que prefieras.",
      },
      {
        question: "¿Cómo puedo reservar una cita?",
        answer:
          "Escríbele directamente a Leidania por WhatsApp e indica el servicio que deseas, tu horario preferido y si buscas atención privada o a domicilio. Recibirás la confirmación con todos los detalles.",
      },
      {
        question: "¿Cómo debo prepararme para mi cita?",
        answer:
          "Al confirmar tu reserva recibirás indicaciones sencillas según el servicio elegido. Si tienes sensibilidad, alguna condición particular o una preferencia importante, coméntala antes de la cita.",
      },
      {
        question: "¿Puedo combinar varios servicios?",
        answer:
          "Sí, siempre que el tiempo y la disponibilidad lo permitan. Cuéntale a Leidania qué experiencia deseas y ella te ayudará a organizar una combinación cómoda y armoniosa.",
      },
      {
        question: "¿Qué servicio es mejor para mí?",
        answer:
          "Si todavía no estás segura, explica por WhatsApp cómo quieres sentirte o qué resultado buscas. Leidania te orientará personalmente para elegir la opción más adecuada.",
      },
    ],
  },
  {
    id: "masajes",
    title: "Masajes",
    description: "Dudas sobre tensión, duración y modalidad.",
    items: [
      {
        question: "¿Qué paquete de masaje me conviene si tengo mucha tensión?",
        answer:
          "Ritual CARELA funciona muy bien para tensión general. Si vienes con cansancio fuerte o varias zonas cargadas, Renovación Profunda da más tiempo para trabajar sin prisa.",
      },
      {
        question: "¿El masaje puede ser a domicilio?",
        answer:
          "Sí, según disponibilidad y zona en Puerto Plata. El precio final puede variar si requiere traslado o preparación adicional.",
      },
      {
        question: "¿Debo preparar algo antes de la cita?",
        answer:
          "Solo comparte cualquier molestia, sensibilidad o condición importante antes de empezar para adaptar la presión y el enfoque.",
      },
    ],
  },
  {
    id: "cejas",
    title: "Cejas",
    description: "Tintado, duración y primeras citas.",
    items: [
      {
        question: "¿El tintado queda muy marcado?",
        answer:
          "La intención es un acabado definido pero natural. Antes de aplicar se revisa el tono para que combine con tu rostro y estilo.",
      },
      {
        question: "¿Cuánto dura el efecto?",
        answer:
          "Depende del tipo de piel, rutina y exposición al agua o productos, pero normalmente se mantiene visible por varias semanas.",
      },
      {
        question: "¿Puedo hacerlo si nunca me he tintado las cejas?",
        answer:
          "Sí. Color Suave o Diseño CARELA son buenas opciones para empezar con un resultado elegante y sin exceso.",
      },
    ],
  },
  {
    id: "pestanas",
    title: "Pestañas",
    description: "Naturalidad, duración y cuidados.",
    items: [
      {
        question: "¿Las pestañas se ven exageradas?",
        answer:
          "No tiene que ser así. El paquete se adapta a la forma de tus ojos y al nivel de naturalidad que prefieras.",
      },
      {
        question: "¿Cuánto tiempo toma la postura?",
        answer:
          "Depende del paquete. Las opciones van desde una hora hasta dos horas para un set más detallado.",
      },
      {
        question: "¿Qué debo evitar después de la cita?",
        answer:
          "Leidania te dará recomendaciones simples de cuidado para mantenerlas cómodas y bonitas por más tiempo.",
      },
    ],
  },
  {
    id: "depilacion",
    title: "Depilación",
    description: "Zonas, privacidad y combinaciones.",
    items: [
      {
        question: "¿El precio cambia según la zona?",
        answer:
          "Sí. Estos paquetes son una guía; el precio final se confirma según las zonas elegidas y si combinas varios servicios.",
      },
      {
        question: "¿La depilación se realiza con privacidad?",
        answer:
          "Sí. La experiencia se maneja con cuidado, higiene y respeto para que te sientas cómoda durante todo el proceso.",
      },
      {
        question: "¿Puedo combinar depilación con otro servicio?",
        answer:
          "Sí, si el horario lo permite. Leidania puede ayudarte a organizar una cita completa y cómoda.",
      },
    ],
  },
];
