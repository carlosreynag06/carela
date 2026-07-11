import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Heart,
  House,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { DecorativeDivider } from "@/components/DecorativeDivider";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { whatsapp } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre Leidania | CARELA Beauty & Wellness",
  description:
    "Conoce la visión de Leidania Carela y la atención personal detrás de CARELA Beauty & Wellness en Puerto Plata.",
};

const values = [
  {
    title: "Escucha primero",
    description:
      "Cada cita comienza entendiendo cómo quieres sentirte y qué resultado esperas.",
    icon: Heart,
  },
  {
    title: "Detalle siempre",
    description:
      "La técnica, el ambiente y los pequeños gestos reciben la misma atención.",
    icon: Sparkles,
  },
  {
    title: "Confianza real",
    description:
      "Un servicio privado, respetuoso y claro para que puedas relajarte de verdad.",
    icon: ShieldCheck,
  },
];

const journey = [
  {
    number: "01",
    title: "Conversamos",
    description: "Coordinamos tu servicio, horario y preferencias por WhatsApp.",
  },
  {
    number: "02",
    title: "Personalizamos",
    description: "Leidania adapta cada detalle a lo que necesitas ese día.",
  },
  {
    number: "03",
    title: "Cuidamos",
    description: "Tu cita se trabaja sin prisa, con higiene, técnica y calma.",
  },
  {
    number: "04",
    title: "Acompañamos",
    description: "Recibes orientación sencilla para prolongar el resultado.",
  },
];

const experienceNotes = [
  "Atención directa y personal de Leidania",
  "Ambiente íntimo, limpio y cuidadosamente preparado",
  "Opción de servicio a domicilio según disponibilidad",
];

export default function SobreLeidaniaPage() {
  return (
    <>
      <section className="relative isolate min-h-[74svh] overflow-hidden border-b border-champagne-gold/15 bg-background">
        <Image
          src="/images/hero-carela-spa.png"
          alt="Ambiente cálido de CARELA Beauty & Wellness"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[1.08]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,3,4,0.98)_0%,rgba(5,3,4,0.86)_46%,rgba(5,3,4,0.28)_78%,rgba(5,3,4,0.12)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,3,4,0.72),transparent_45%)]" />
        <Container className="relative z-10 flex min-h-[74svh] items-end pb-16 pt-36 lg:pb-20">
          <Reveal>
            <div className="max-w-5xl">
              <DecorativeDivider />
              <p className="mt-7 text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                Sobre Leidania Carela
              </p>
              <h1 className="mt-5 max-w-5xl font-serif text-display text-champagne-gold text-balance">
                La belleza se eleva cuando el cuidado se siente personal
              </h1>
              <p className="mt-7 max-w-2xl text-lead text-warm-cream/84">
                CARELA nace de una forma sencilla de atender: escuchar con
                calma, cuidar cada detalle y hacer que cada mujer se sienta
                cómoda, vista y especial.
              </p>
              <Link
                href="#historia"
                className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-soft-gold transition hover:text-rose-pink"
              >
                Conocer su esencia
                <ArrowDown size={17} aria-hidden />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section id="historia" spacing="lg" tone="black">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-20">
            <Reveal>
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[34rem] overflow-hidden border border-champagne-gold/20 shadow-premium lg:mx-0">
                <Image
                  src="/images/service-page-masajes.png"
                  alt="Experiencia de cuidado personal durante un masaje de hombros"
                  fill
                  sizes="(min-width: 1024px) 34rem, 86vw"
                  className="object-cover object-[56%_center]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-5 border border-champagne-gold/25 bg-background/80 p-5 backdrop-blur-md">
                  <p className="font-script text-3xl text-rose-pink">
                    Cuidado que se siente cercano
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div>
                <p className="text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                  La intención detrás de CARELA
                </p>
                <h2 className="mt-4 max-w-4xl font-serif text-section-title text-champagne-gold text-balance">
                  Un espacio creado para atenderte sin prisa
                </h2>
                <p className="mt-7 max-w-2xl text-lead text-warm-cream/82">
                  Leidania construyó CARELA alrededor de una convicción: un
                  servicio de belleza también puede ser un momento de descanso,
                  confianza y reconexión personal.
                </p>
                <p className="mt-5 max-w-2xl text-copy text-muted-taupe">
                  Su trabajo une técnica y calidez. Desde un masaje que libera
                  tensión hasta el detalle preciso de unas cejas, cada cita se
                  adapta a la persona, no a una fórmula repetida.
                </p>
                <blockquote className="mt-9 border-l border-champagne-gold/55 pl-6 font-serif text-2xl leading-9 text-warm-cream sm:text-3xl">
                  “Quiero que salgas sintiéndote más ligera, más segura y más
                  tú.”
                  <footer className="mt-4 font-sans text-xs uppercase tracking-[0.24em] text-rose-pink">
                    Leidania Carela
                  </footer>
                </blockquote>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-champagne-gold/12" spacing="lg" tone="charcoal">
        <Container>
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <div>
                <DecorativeDivider />
                <p className="mt-7 text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                  Su forma de cuidar
                </p>
                <h2 className="mt-4 font-serif text-section-title text-champagne-gold text-balance">
                  Tres principios en cada cita
                </h2>
              </div>
              <p className="max-w-2xl text-lead text-muted-taupe">
                Una experiencia coherente desde el primer mensaje hasta el
                último detalle del servicio.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid border-l border-t border-champagne-gold/16 md:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <Reveal key={value.title} delay={index * 0.08}>
                  <article className="group h-full border-b border-r border-champagne-gold/16 bg-background/45 p-7 transition duration-300 hover:bg-background/78 sm:p-9">
                    <span className="flex size-12 items-center justify-center border border-champagne-gold/35 text-champagne-gold transition group-hover:bg-champagne-gold group-hover:text-background">
                      <Icon size={21} aria-hidden />
                    </span>
                    <p className="mt-8 font-serif text-lg text-champagne-gold/55">
                      0{index + 1}
                    </p>
                    <h3 className="mt-2 font-serif text-3xl text-warm-cream">
                      {value.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-muted-taupe">
                      {value.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section spacing="lg" tone="black">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <DecorativeDivider align="center" />
              <p className="mt-7 text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                Tu recorrido CARELA
              </p>
              <h2 className="mt-4 font-serif text-section-title text-champagne-gold text-balance">
                Una experiencia sencilla y bien cuidada
              </h2>
            </div>
          </Reveal>

          <div className="relative mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-0">
            <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-champagne-gold/25 xl:block" />
            {journey.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.08}>
                <article className="relative px-4 text-center">
                  <span className="relative z-10 mx-auto flex size-14 items-center justify-center border border-champagne-gold/40 bg-background font-serif text-xl text-champagne-gold">
                    {step.number}
                  </span>
                  <h3 className="mt-6 font-serif text-2xl text-warm-cream">
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-muted-taupe">
                    {step.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-champagne-gold/12" spacing="lg" tone="charcoal">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-20">
            <Reveal>
              <div>
                <p className="text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                  Experiencia boutique
                </p>
                <h2 className="mt-4 max-w-4xl font-serif text-section-title text-champagne-gold text-balance">
                  Profesional, íntima y hecha a tu medida
                </h2>
                <p className="mt-6 max-w-2xl text-lead text-muted-taupe">
                  CARELA combina la cercanía de una atención independiente con
                  el cuidado y la presentación de una experiencia premium.
                </p>
                <div className="mt-9 grid gap-4">
                  {experienceNotes.map((note) => (
                    <div
                      key={note}
                      className="flex items-center gap-4 border-b border-champagne-gold/16 pb-4 text-warm-cream/82"
                    >
                      <span className="flex size-7 shrink-0 items-center justify-center border border-champagne-gold/35 text-champagne-gold">
                        <Check size={14} aria-hidden />
                      </span>
                      <span className="text-sm leading-6">{note}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    href="/servicios"
                    variant="ghost"
                    icon={<ArrowRight size={16} />}
                    iconPosition="right"
                  >
                    Explorar servicios
                  </Button>
                  <span className="inline-flex min-h-12 items-center gap-2 px-2 text-sm text-muted-taupe">
                    <House size={17} className="text-rose-pink" aria-hidden />
                    Puerto Plata, RD
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden border border-champagne-gold/20 shadow-premium">
                <Image
                  src="/images/boutique-experience-divider.png"
                  alt="Ambiente boutique con velas, toallas y detalles de bienestar"
                  fill
                  sizes="(min-width: 1024px) 40vw, 86vw"
                  className="object-cover object-center brightness-[1.14]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent" />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <section
        id="reservar"
        className="relative scroll-mt-20 overflow-hidden bg-background py-20 lg:py-24"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_50%,rgba(143,31,84,0.25),transparent_30%)]" />
        <Container className="relative">
          <Reveal>
            <div className="flex flex-col gap-8 border border-champagne-gold/25 bg-warm-charcoal/75 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
              <div>
                <p className="text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                  Conoce la experiencia
                </p>
                <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-champagne-gold sm:text-5xl">
                  Tu próximo momento de cuidado comienza aquí
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-muted-taupe">
                  Habla directamente con Leidania y encuentra el servicio ideal
                  para ti.
                </p>
              </div>
              <Button
                href={whatsapp.url}
                size="lg"
                icon={<MessageCircle size={19} />}
                className="shrink-0"
              >
                Hablar con Leidania
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
