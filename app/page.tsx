import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Heart,
  House,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { DecorativeDivider } from "@/components/DecorativeDivider";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ImageFrame } from "@/components/ImageFrame";
import { PremiumCard } from "@/components/PremiumCard";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { whatsapp } from "@/lib/site";

const boutiqueBenefits = [
  "Atención directa de Leidania",
  "Ambiente acogedor",
  "Servicio a domicilio disponible",
];

const whyUsItems = [
  {
    title: "Trato personal",
    description:
      "Cada cita se atiende con calma, escucha y cuidado directo, sin sentirte apurada.",
    icon: Heart,
  },
  {
    title: "Ambiente cuidado",
    description:
      "Una experiencia íntima, limpia y acogedora, con detalles pensados para relajarte.",
    icon: ShieldCheck,
  },
  {
    title: "Belleza con buen gusto",
    description:
      "Servicios trabajados con un acabado femenino, natural y elegante.",
    icon: Sparkles,
  },
];

const howItWorksItems = [
  {
    step: "01",
    title: "Escríbenos por WhatsApp",
    description:
      "Cuéntanos qué servicio deseas y si prefieres espacio privado o atención a domicilio.",
    icon: MessageCircle,
  },
  {
    step: "02",
    title: "Coordinamos los detalles",
    description:
      "Se confirma disponibilidad, horario, modalidad y cualquier detalle importante.",
    icon: CalendarCheck,
  },
  {
    step: "03",
    title: "Preparamos tu momento",
    description:
      "Leidania organiza la experiencia para que recibas una atención tranquila y cuidada.",
    icon: House,
  },
];

const faqItems = [
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
];

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <WhyUsSection />
      <HowItWorksSection />
      <BoutiqueExperience />
      <TestimonialsSection />
      <FAQSection />
      <BookingCTASection />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate min-h-svh overflow-hidden bg-background">
      <Image
        src="/images/hero-carela-spa.png"
        alt="Ambiente privado de spa con velas, toallas y detalles dorados"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,3,4,0.96)_0%,rgba(5,3,4,0.86)_32%,rgba(5,3,4,0.42)_64%,rgba(5,3,4,0.16)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,3,4,0.62)_0%,rgba(5,3,4,0.12)_42%,rgba(5,3,4,0.8)_100%)]" />

      <Container className="relative z-10 flex min-h-svh items-center pt-28">
        <div className="w-full py-16">
          <Reveal>
            <div className="max-w-4xl">
              <DecorativeDivider />
              <p className="mt-8 text-eyebrow uppercase tracking-[0.32em] text-soft-gold">
                Beauty / Wellness / Confidence
              </p>
              <p className="mt-5 font-script text-4xl text-rose-pink sm:text-5xl">
                Tu momento de cuidado
              </p>
              <h1 className="mt-4 max-w-4xl font-serif text-display text-champagne-gold text-balance">
                Eleva tu Belleza y tu Bienestar
              </h1>
              <p className="mt-7 max-w-2xl text-lead text-warm-cream/88">
                Disfruta una experiencia personalizada con Leidania Carela:
                masajes relajantes y terapéuticos, cejas, pestañas y depilación
                con cera en un ambiente privado, acogedor o a domicilio.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href={whatsapp.url} icon={<ArrowRight size={18} />}>
                  Reservar por WhatsApp
                </Button>
                <Button href="/servicios" variant="secondary">
                  Ver servicios
                </Button>
              </div>

              <div className="mt-8 flex flex-col gap-3 border-l border-champagne-gold/35 pl-4 text-sm text-muted-taupe sm:flex-row sm:flex-wrap sm:items-center sm:border-l-0 sm:pl-0">
                <TrustItem>Atención personalizada</TrustItem>
                <TrustItem>Servicio a domicilio disponible</TrustItem>
                <TrustItem>Puerto Plata, RD</TrustItem>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function TrustItem({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2">
      <CheckCircle2 className="text-champagne-gold" size={16} aria-hidden />
      {children}
    </span>
  );
}

function ServicesPreview() {
  return (
    <Section spacing="lg" tone="black">
      <Container>
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1fr] lg:items-end">
            <div>
              <DecorativeDivider />
              <p className="mt-7 text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                Servicios
              </p>
              <h2 className="mt-4 max-w-3xl font-serif text-section-title text-champagne-gold text-balance">
                Belleza y bienestar con atención personal
              </h2>
            </div>
            <p className="max-w-xl text-lead text-muted-taupe">
              Elige el servicio que necesitas y disfruta una experiencia
              privada, cálida y profesional con Leidania Carela.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Reveal key={service.slug} delay={index * 0.08}>
                <Link
                  href={`/servicios#${service.slug}`}
                  aria-label={`Ver detalles de ${service.title}`}
                  className="group flex h-full flex-col overflow-hidden border border-champagne-gold/15 bg-warm-charcoal/70 shadow-premium transition duration-300 hover:-translate-y-1 hover:border-champagne-gold/45 hover:bg-warm-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soft-gold"
                >
                  <div className="relative aspect-[16/11] overflow-hidden bg-background">
                    <Image
                      src={service.imageSrc}
                      alt={service.imageAlt}
                      fill
                      sizes="(min-width: 1536px) 20vw, (min-width: 768px) 40vw, 80vw"
                      className="object-cover object-center transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/8 to-transparent" />
                    <div className="absolute left-4 top-4 flex size-11 items-center justify-center border border-champagne-gold/35 bg-background/68 text-champagne-gold backdrop-blur">
                      <Icon size={20} aria-hidden />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-eyebrow uppercase tracking-[0.24em] text-rose-pink">
                      {service.shortTitle}
                    </p>
                    <h3 className="mt-3 font-serif text-3xl leading-tight text-warm-cream">
                      {service.title}
                    </h3>
                    <p className="mt-4 flex-1 text-sm leading-7 text-muted-taupe">
                      {service.description}
                    </p>
                    <span className="mt-6 inline-flex min-h-10 self-start items-center gap-2 border border-champagne-gold/30 px-4 py-2 text-xs font-semibold text-champagne-gold transition group-hover:border-champagne-gold group-hover:bg-champagne-gold/10 group-hover:text-soft-gold">
                      Ver detalle
                      <ArrowRight size={16} aria-hidden />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

function WhyUsSection() {
  return (
    <Section className="border-t border-champagne-gold/12" spacing="lg" tone="charcoal">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <ImageFrame className="aspect-[4/5] min-h-0">
              <Image
                src="/images/why-carela-dominican-spa.png"
                alt="Mujer dominicana adulta en uniforme negro preparando toallas en un ambiente spa"
                fill
                sizes="(min-width: 1024px) 38vw, 86vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-x-5 bottom-5 z-20 border border-champagne-gold/20 bg-background/76 p-5 backdrop-blur-md">
                <p className="font-script text-3xl text-rose-pink">
                  Cuidado boutique
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-taupe">
                  Una experiencia cercana, elegante y pensada para mujeres que
                  quieren sentirse bien atendidas.
                </p>
              </div>
            </ImageFrame>
          </Reveal>

          <Reveal delay={0.12}>
            <div>
              <DecorativeDivider />
              <p className="mt-7 text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                Por qué elegir CARELA
              </p>
              <h2 className="mt-4 max-w-4xl font-serif text-section-title text-champagne-gold text-balance">
                Una atención más personal, más tranquila y más tuya
              </h2>
              <p className="mt-6 max-w-2xl text-lead text-muted-taupe">
                CARELA Beauty & Wellness está pensado para que cada servicio se
                sienta privado, cuidado y especial. Aquí la belleza y el
                bienestar se trabajan con detalle, buen gusto y una presencia
                cálida.
              </p>

              <div className="mt-9 grid gap-4 md:grid-cols-3">
                {whyUsItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <PremiumCard key={item.title} interactive className="p-5">
                      <div className="flex size-11 items-center justify-center border border-champagne-gold/28 bg-background/52 text-champagne-gold">
                        <Icon size={20} aria-hidden />
                      </div>
                      <h3 className="mt-5 font-serif text-2xl text-warm-cream">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted-taupe">
                        {item.description}
                      </p>
                    </PremiumCard>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function HowItWorksSection() {
  return (
    <Section className="border-y border-champagne-gold/12" spacing="lg" tone="black">
      <Container>
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1fr] lg:items-end">
            <div>
              <DecorativeDivider />
              <p className="mt-7 text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                Cómo funciona
              </p>
              <h2 className="mt-4 max-w-3xl font-serif text-section-title text-champagne-gold text-balance">
                Reservar tu momento de cuidado es sencillo
              </h2>
            </div>
            <p className="max-w-xl text-lead text-muted-taupe">
              El proceso es claro y directo para que puedas coordinar tu cita
              con confianza, sin formularios complicados ni vueltas
              innecesarias.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {howItWorksItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal key={item.step} delay={index * 0.08}>
                <article className="group relative h-full overflow-hidden border border-champagne-gold/16 bg-warm-charcoal/72 p-6 shadow-premium transition duration-300 hover:-translate-y-1 hover:border-champagne-gold/45">
                  <div className="absolute right-5 top-5 font-serif text-6xl leading-none text-champagne-gold/10">
                    {item.step}
                  </div>
                  <div className="relative">
                    <div className="flex size-12 items-center justify-center border border-champagne-gold/28 bg-background/58 text-champagne-gold">
                      <Icon size={21} aria-hidden />
                    </div>
                    <p className="mt-8 text-eyebrow uppercase tracking-[0.24em] text-rose-pink">
                      Paso {item.step}
                    </p>
                    <h3 className="mt-3 font-serif text-3xl text-warm-cream">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-muted-taupe">
                      {item.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-col gap-4 border-t border-champagne-gold/12 pt-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-7 text-muted-taupe">
              La disponibilidad puede variar según el servicio, la zona y el
              horario.
            </p>
            <Button href={whatsapp.url} icon={<ArrowRight size={18} />}>
              Coordinar por WhatsApp
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function BoutiqueExperience() {
  return (
    <Section
      className="isolate min-h-[340px] border-y border-champagne-gold/12"
      spacing="none"
      tone="black"
    >
      <Image
        src="/images/boutique-experience-divider.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center brightness-[1.14] saturate-[1.06]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,3,4,0.88),rgba(5,3,4,0.55)_46%,rgba(5,3,4,0.08))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(217,75,140,0.08),transparent_34%)]" />

      <Container className="relative z-10 flex min-h-[340px] items-center py-12">
        <Reveal>
          <div className="max-w-4xl">
            <p className="text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
              Experiencia boutique
            </p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-champagne-gold text-balance sm:text-5xl">
              Una experiencia privada, cálida y pensada solo para ti
            </h2>
            <p className="mt-5 max-w-2xl text-copy text-warm-cream/82">
              Cada cita se trabaja con calma, detalle y atención personalizada
              para que puedas desconectarte, verte mejor y volver a sentirte en
              balance.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {boutiqueBenefits.map((benefit) => (
                <span
                  key={benefit}
                  className="inline-flex items-center gap-2 border border-champagne-gold/22 bg-background/62 px-4 py-2.5 text-sm text-warm-cream/86 backdrop-blur-md"
                >
                  <CheckCircle2
                    className="text-champagne-gold"
                    size={16}
                    aria-hidden
                  />
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function TestimonialsSection() {
  return (
    <Section
      className="border-b border-champagne-gold/12"
      id="testimonios"
      spacing="lg"
      tone="charcoal"
    >
      <Container>
        <Reveal>
          <div className="grid gap-8 border-b border-champagne-gold/14 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-4xl">
              <DecorativeDivider />
              <p className="mt-7 text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                Testimonios
              </p>
              <h2 className="mt-4 font-serif text-section-title text-champagne-gold text-balance">
                Experiencias que se sienten y se recuerdan
              </h2>
              <p className="mt-5 max-w-2xl text-lead text-muted-taupe">
                Cuatro servicios, cuatro maneras de regalarte un momento de
                cuidado hecho con atención, calma y detalle.
              </p>
            </div>

            <Button
              href={whatsapp.url}
              icon={<ArrowRight size={18} />}
              iconPosition="right"
              size="lg"
            >
              Reservar mi cita
            </Button>
          </div>
        </Reveal>

        <TestimonialsCarousel testimonials={testimonials} />

        <Reveal delay={0.12}>
          <div className="relative mt-12 flex flex-col gap-6 overflow-hidden border border-champagne-gold/22 bg-background/72 px-6 py-6 shadow-premium before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-champagne-gold sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10 lg:py-8">
            <div className="flex items-center gap-5">
              <span
                className="hidden size-12 shrink-0 items-center justify-center border border-champagne-gold/35 bg-champagne-gold/10 text-champagne-gold sm:flex"
                aria-hidden="true"
              >
                <Sparkles size={21} />
              </span>
              <p className="max-w-3xl font-serif text-2xl leading-snug text-warm-cream lg:text-3xl">
                Tu próxima experiencia de cuidado puede comenzar hoy.
              </p>
            </div>
            <Button
              className="shrink-0"
              href={whatsapp.url}
              icon={<MessageCircle size={18} />}
            >
              Hablar con Leidania
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function FAQSection() {
  return (
    <Section
      className="border-y border-champagne-gold/12"
      id="preguntas-frecuentes"
      spacing="lg"
      tone="black"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <DecorativeDivider />
              <p className="mt-7 text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                Preguntas frecuentes
              </p>
              <h2 className="mt-4 max-w-2xl font-serif text-section-title text-champagne-gold text-balance">
                Todo lo que necesitas saber antes de tu cita
              </h2>
              <p className="mt-6 max-w-xl text-lead text-muted-taupe">
                Encuentra respuestas rápidas sobre los servicios, reservas y
                modalidades de atención de CARELA.
              </p>
              <div className="mt-8">
                <Button
                  href={whatsapp.url}
                  icon={<MessageCircle size={18} />}
                  variant="ghost"
                >
                  Hacer otra pregunta
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <FAQAccordion items={faqItems} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function BookingCTASection() {
  return (
    <Section spacing="lg" tone="black">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden border border-champagne-gold/28 bg-background shadow-premium">
            <Image
              src="/images/hero-carela-spa.png"
              alt=""
              fill
              sizes="86vw"
              className="object-cover object-center brightness-[1.12] saturate-[1.06]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,3,4,0.92),rgba(5,3,4,0.62)_48%,rgba(5,3,4,0.1))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(217,75,140,0.08),transparent_34%)]" />

            <div className="relative z-10 grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:p-14">
              <div className="max-w-3xl">
                <DecorativeDivider />
                <p className="mt-7 text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                  Reserva tu momento
                </p>
                <h2 className="mt-4 font-serif text-section-title text-champagne-gold text-balance">
                  Reserva tu momento de cuidado
                </h2>
                <p className="mt-6 max-w-2xl text-lead text-warm-cream/86">
                  Escríbele a Leidania por WhatsApp y coordina el servicio,
                  horario y modalidad que prefieras.
                </p>
                <p className="mt-5 text-sm uppercase tracking-[0.24em] text-soft-gold">
                  Puerto Plata, República Dominicana
                </p>
              </div>

              <div className="flex flex-col items-start gap-4 lg:items-end">
                <Button href={whatsapp.url} icon={<ArrowRight size={18} />} size="lg">
                  Reservar por WhatsApp
                </Button>
                <p className="max-w-xs text-sm leading-6 text-muted-taupe lg:text-right">
                  Eleva tu belleza. Relájate. Brilla diferente.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
