"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CircleDollarSign,
  Clock3,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";
import { Reveal } from "@/components/Reveal";
import { services, type Service } from "@/data/services";
import { whatsapp } from "@/lib/site";
import { cn } from "@/lib/utils";

type PlanKey = "esencial" | "signature" | "premium";

type Plan = {
  key: PlanKey;
  name: string;
  price: string;
  cadence: string;
  description: string;
  featured?: boolean;
};

type FeatureValue = boolean | string;

type Feature = {
  label: string;
  values: Record<PlanKey, FeatureValue>;
};

type ServicePricing = {
  slug: Service["slug"];
  eyebrow: string;
  headline: string;
  summary: string;
  plans: Plan[];
  features: Feature[];
  faqs: FAQItem[];
};

const pricingByService: ServicePricing[] = [
  {
    slug: "masajes",
    eyebrow: "Masajes relajantes y terapéuticos",
    headline: "Elige el nivel de descanso que tu cuerpo necesita.",
    summary:
      "Opciones pensadas para liberar tensión, bajar el ritmo y salir con una sensación real de calma.",
    plans: [
      {
        key: "esencial",
        name: "Pausa Esencial",
        price: "RD$2,200",
        cadence: "45 minutos",
        description: "Para desconectar rápido y aliviar zonas puntuales.",
      },
      {
        key: "signature",
        name: "Ritual CARELA",
        price: "RD$3,600",
        cadence: "75 minutos",
        description: "La experiencia más balanceada para cuerpo completo.",
        featured: true,
      },
      {
        key: "premium",
        name: "Renovación Profunda",
        price: "RD$4,800",
        cadence: "100 minutos",
        description: "Un cuidado más lento, profundo y completamente personal.",
      },
    ],
    features: [
      {
        label: "Consulta breve antes de iniciar",
        values: { esencial: true, signature: true, premium: true },
      },
      {
        label: "Enfoque en zonas de tensión",
        values: { esencial: "1 zona", signature: "2 zonas", premium: "3 zonas" },
      },
      {
        label: "Masaje cuerpo completo",
        values: { esencial: false, signature: true, premium: true },
      },
      {
        label: "Aromas y ambiente relajante",
        values: { esencial: true, signature: true, premium: true },
      },
      {
        label: "Recomendaciones posteriores",
        values: { esencial: false, signature: true, premium: true },
      },
      {
        label: "Prioridad para cita a domicilio",
        values: { esencial: false, signature: false, premium: true },
      },
    ],
    faqs: [
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
    slug: "cejas",
    eyebrow: "Tintado de cejas",
    headline: "Cejas definidas sin perder un acabado natural.",
    summary:
      "Paquetes para ordenar la forma, suavizar el marco del rostro y elevar la mirada con buen gusto.",
    plans: [
      {
        key: "esencial",
        name: "Color Suave",
        price: "RD$950",
        cadence: "30 minutos",
        description: "Tintado natural para refrescar la mirada.",
      },
      {
        key: "signature",
        name: "Diseño CARELA",
        price: "RD$1,450",
        cadence: "45 minutos",
        description: "Forma, color y acabado más pulido.",
        featured: true,
      },
      {
        key: "premium",
        name: "Mirada Completa",
        price: "RD$1,950",
        cadence: "60 minutos",
        description: "Definición más completa con cuidado final.",
      },
    ],
    features: [
      {
        label: "Evaluación de tono y forma",
        values: { esencial: true, signature: true, premium: true },
      },
      {
        label: "Tintado de acabado natural",
        values: { esencial: true, signature: true, premium: true },
      },
      {
        label: "Diseño visual de cejas",
        values: { esencial: false, signature: true, premium: true },
      },
      {
        label: "Limpieza de bordes",
        values: { esencial: false, signature: true, premium: true },
      },
      {
        label: "Cuidado calmante posterior",
        values: { esencial: false, signature: false, premium: true },
      },
      {
        label: "Guía de mantenimiento",
        values: { esencial: false, signature: true, premium: true },
      },
    ],
    faqs: [
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
    slug: "pestanas",
    eyebrow: "Postura de pestañas",
    headline: "Una mirada más femenina, delicada y cómoda.",
    summary:
      "Opciones creadas para elevar tus ojos con un resultado favorecedor, limpio y sin verse exagerado.",
    plans: [
      {
        key: "esencial",
        name: "Toque Natural",
        price: "RD$1,800",
        cadence: "60 minutos",
        description: "Un acabado ligero para realzar la mirada.",
      },
      {
        key: "signature",
        name: "Mirada CARELA",
        price: "RD$2,600",
        cadence: "90 minutos",
        description: "Balance entre presencia, comodidad y elegancia.",
        featured: true,
      },
      {
        key: "premium",
        name: "Set Boutique",
        price: "RD$3,400",
        cadence: "120 minutos",
        description: "Más detalle, más definición y mayor personalización.",
      },
    ],
    features: [
      {
        label: "Consulta de estilo",
        values: { esencial: true, signature: true, premium: true },
      },
      {
        label: "Preparación higiénica",
        values: { esencial: true, signature: true, premium: true },
      },
      {
        label: "Diseño personalizado",
        values: { esencial: false, signature: true, premium: true },
      },
      {
        label: "Mayor definición visual",
        values: { esencial: "Suave", signature: "Media", premium: "Alta" },
      },
      {
        label: "Kit básico de cuidado",
        values: { esencial: false, signature: false, premium: true },
      },
      {
        label: "Revisión de comodidad",
        values: { esencial: true, signature: true, premium: true },
      },
    ],
    faqs: [
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
    slug: "depilacion",
    eyebrow: "Depilación con cera",
    headline: "Piel suave con una experiencia privada y cuidadosa.",
    summary:
      "Paquetes para zonas puntuales, combinaciones prácticas o una sesión más completa de cuidado corporal.",
    plans: [
      {
        key: "esencial",
        name: "Zona Esencial",
        price: "RD$850",
        cadence: "1 zona",
        description: "Para una zona puntual con atención rápida y privada.",
      },
      {
        key: "signature",
        name: "Combo CARELA",
        price: "RD$1,850",
        cadence: "2 a 3 zonas",
        description: "La opción práctica para combinar zonas frecuentes.",
        featured: true,
      },
      {
        key: "premium",
        name: "Suavidad Total",
        price: "RD$3,200",
        cadence: "sesión completa",
        description: "Más zonas, más preparación y cuidado posterior.",
      },
    ],
    features: [
      {
        label: "Preparación del área",
        values: { esencial: true, signature: true, premium: true },
      },
      {
        label: "Depilación con cera",
        values: { esencial: true, signature: true, premium: true },
      },
      {
        label: "Cantidad de zonas",
        values: { esencial: "1", signature: "2-3", premium: "4+" },
      },
      {
        label: "Cuidado calmante posterior",
        values: { esencial: false, signature: true, premium: true },
      },
      {
        label: "Recomendaciones para la piel",
        values: { esencial: true, signature: true, premium: true },
      },
      {
        label: "Plan de mantenimiento",
        values: { esencial: false, signature: false, premium: true },
      },
    ],
    faqs: [
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

const planOrder: PlanKey[] = ["esencial", "signature", "premium"];

function getWhatsAppUrl(service: string, plan: string) {
  const message = `Hola, me gustaría consultar el paquete ${plan} para ${service}.`;
  return `${whatsapp.url}?text=${encodeURIComponent(message)}`;
}

function renderFeatureValue(value: FeatureValue) {
  if (value === true) {
    return (
      <span className="inline-flex size-10 items-center justify-center rounded-full border border-soft-gold/35 bg-champagne-gold text-background shadow-[0_0_24px_rgba(217,168,78,0.22)]">
        <Check size={18} strokeWidth={2.6} aria-hidden="true" />
      </span>
    );
  }

  if (value === false) {
    return (
      <span className="inline-flex size-10 items-center justify-center rounded-full border border-muted-taupe/35 text-muted-taupe/78">
        <X size={18} aria-hidden="true" />
      </span>
    );
  }

  return (
    <span className="inline-flex min-h-10 items-center justify-center border border-champagne-gold/22 bg-background/55 px-4 py-2 text-center text-sm font-semibold text-warm-cream">
      {value}
    </span>
  );
}

export function PricingTabs() {
  const [activeSlug, setActiveSlug] = useState<Service["slug"]>("masajes");

  const activeService = useMemo(
    () => services.find((service) => service.slug === activeSlug) ?? services[0],
    [activeSlug],
  );
  const activePricing = useMemo(
    () =>
      pricingByService.find((pricing) => pricing.slug === activeSlug) ??
      pricingByService[0],
    [activeSlug],
  );

  const ActiveIcon = activeService.icon;

  return (
    <Container>
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
              Elige un servicio
            </p>
            <h2 className="mt-4 max-w-3xl font-serif text-section-title text-champagne-gold text-balance">
              Compara paquetes antes de reservar.
            </h2>
          </div>
          <p className="max-w-2xl text-lead text-muted-taupe">
            Usa las pestañas para revisar precios estimados por servicio,
            inclusiones y preguntas frecuentes. Todo queda confirmado antes de
            agendar.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-10 grid gap-3 rounded-full border border-champagne-gold/18 bg-warm-charcoal/70 p-2 shadow-premium backdrop-blur md:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            const active = service.slug === activeSlug;

            return (
              <button
                key={service.slug}
                className={cn(
                  "relative isolate flex min-h-14 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soft-gold",
                  active
                    ? "text-background"
                    : "text-warm-cream/76 hover:text-warm-cream",
                )}
                type="button"
                onClick={() => setActiveSlug(service.slug)}
                aria-pressed={active}
              >
                {active ? (
                  <motion.span
                    layoutId="pricing-active-tab"
                    className="absolute inset-0 -z-10 rounded-full bg-champagne-gold"
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  />
                ) : null}
                <Icon size={18} aria-hidden="true" />
                {service.shortTitle}
              </button>
            );
          })}
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlug}
          initial={false}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <div className="mb-8 grid gap-5 border border-champagne-gold/16 bg-warm-charcoal/45 px-5 py-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:px-7">
            <div>
              <p className="text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                {activePricing.eyebrow}
              </p>
              <h3 className="mt-2 max-w-3xl font-serif text-3xl leading-tight text-warm-cream text-balance sm:text-4xl">
                {activePricing.headline}
              </h3>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-muted-taupe lg:ml-auto">
              {activePricing.summary}
            </p>
          </div>

          <div className="overflow-hidden border border-champagne-gold/18 bg-warm-charcoal/72 shadow-premium">
            <div className="overflow-x-auto">
              <div className="grid min-w-[960px] grid-cols-[minmax(17rem,0.95fr)_repeat(3,minmax(13.5rem,1fr))]">
                <div className="flex min-h-60 flex-col justify-between border-b border-r border-champagne-gold/16 bg-background/40 p-6">
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="flex size-12 items-center justify-center border border-champagne-gold/35 bg-champagne-gold/10 text-champagne-gold">
                        <ActiveIcon size={22} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="font-script text-3xl text-rose-pink">
                          CARELA
                        </p>
                        <p className="text-sm uppercase tracking-[0.24em] text-soft-gold">
                          Beauty & Wellness
                        </p>
                      </div>
                    </div>
                    <p className="mt-7 max-w-xs text-sm leading-7 text-muted-taupe">
                      {activeService.benefit}
                    </p>
                  </div>
                  <div className="mt-7 grid gap-3 text-sm text-warm-cream/78">
                    <span className="inline-flex items-center gap-2">
                      <ShieldCheck size={17} className="text-champagne-gold" />
                      Atención privada
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Clock3 size={17} className="text-champagne-gold" />
                      Cita coordinada por WhatsApp
                    </span>
                  </div>
                </div>

                {activePricing.plans.map((plan) => (
                  <div
                    key={plan.key}
                    className={cn(
                      "min-h-60 border-b border-r border-champagne-gold/16 p-6 last:border-r-0",
                      plan.featured
                        ? "bg-[linear-gradient(180deg,rgba(217,168,78,0.18),rgba(143,31,84,0.16))]"
                        : "bg-background/20",
                    )}
                  >
                    <div className="flex h-full flex-col items-start justify-between gap-6">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-sans text-lg font-bold text-warm-cream">
                            {plan.name}
                          </h4>
                          {plan.featured ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-rose-pink px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-warm-cream">
                              <Sparkles size={12} aria-hidden="true" />
                              Popular
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-5 font-serif text-5xl leading-none text-champagne-gold">
                          {plan.price}
                        </p>
                        <p className="mt-2 font-semibold text-muted-taupe">
                          {plan.cadence}
                        </p>
                        <p className="mt-4 max-w-xs text-sm leading-7 text-muted-taupe">
                          {plan.description}
                        </p>
                      </div>
                      <Button
                        href={getWhatsAppUrl(activeService.title, plan.name)}
                        icon={<MessageCircle size={16} />}
                        size="sm"
                        variant={plan.featured ? "primary" : "ghost"}
                      >
                        Consultar paquete
                      </Button>
                    </div>
                  </div>
                ))}

                {activePricing.features.map((feature) => (
                  <div className="contents" key={feature.label}>
                    <div className="flex min-h-20 items-center gap-4 border-b border-r border-champagne-gold/14 bg-background/20 px-6 py-5">
                      <ArrowRight
                        className="shrink-0 text-champagne-gold"
                        size={18}
                        aria-hidden="true"
                      />
                      <span className="font-semibold text-warm-cream">
                        {feature.label}
                      </span>
                    </div>
                    {planOrder.map((planKey) => {
                      const plan = activePricing.plans.find(
                        (item) => item.key === planKey,
                      );

                      return (
                        <div
                          key={planKey}
                          className={cn(
                            "flex min-h-20 items-center justify-center border-b border-r border-champagne-gold/14 px-6 py-5 text-center last:border-r-0",
                            plan?.featured
                              ? "bg-[linear-gradient(180deg,rgba(217,168,78,0.13),rgba(143,31,84,0.12))]"
                              : "bg-background/10",
                          )}
                        >
                          {renderFeatureValue(feature.values[planKey])}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                Preguntas frecuentes
              </p>
              <h3 className="mt-4 font-serif text-4xl leading-tight text-champagne-gold text-balance">
                Dudas comunes sobre {activeService.shortTitle.toLowerCase()}.
              </h3>
              <p className="mt-5 text-copy text-muted-taupe">
                Si necesitas un precio exacto, escribe por WhatsApp y comparte
                la modalidad que prefieres.
              </p>
              <Button
                className="mt-7"
                href={getWhatsAppUrl(activeService.title, "consulta personalizada")}
                icon={<CircleDollarSign size={18} />}
                variant="ghost"
              >
                Pedir precio exacto
              </Button>
            </div>

            <FAQAccordion items={activePricing.faqs} />
          </div>
        </motion.div>
      </AnimatePresence>
    </Container>
  );
}
