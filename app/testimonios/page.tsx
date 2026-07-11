import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Heart,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { DecorativeDivider } from "@/components/DecorativeDivider";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { testimonials } from "@/data/testimonials";
import { whatsapp } from "@/lib/site";

export const metadata: Metadata = {
  title: "Testimonios | CARELA Beauty & Wellness",
  description:
    "Conoce las experiencias de clientas de CARELA Beauty & Wellness en Puerto Plata.",
};

const trustSignals = [
  { value: "4", label: "Servicios especializados" },
  { value: "1:1", label: "Atención completamente personal" },
  { value: "5/5", label: "Cuidado en cada detalle" },
];

const rememberedDetails = [
  {
    title: "Sentirse escuchadas",
    description:
      "Cada resultado comienza con una conversación clara sobre gustos, comodidad y expectativas.",
    icon: Heart,
  },
  {
    title: "Resultados naturales",
    description:
      "La belleza se trabaja para elevar tus facciones y tu estilo, sin perder lo que te hace tú.",
    icon: Sparkles,
  },
  {
    title: "Cuidado y confianza",
    description:
      "La privacidad, la higiene y el trato tranquilo hacen que la experiencia se sienta segura.",
    icon: ShieldCheck,
  },
];

export default function TestimoniosPage() {
  return (
    <>
      <section className="relative isolate min-h-[72svh] overflow-hidden border-b border-champagne-gold/12 bg-background">
        <Image
          src="/images/testimonial-cejas.png"
          alt="Clienta admirando el resultado natural de su servicio CARELA"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[1.12]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,3,4,0.98),rgba(5,3,4,0.83)_48%,rgba(5,3,4,0.22))]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/65 via-transparent to-background/15" />
        <Container className="relative z-10 flex min-h-[72svh] items-end pb-16 pt-36 lg:pb-20">
          <Reveal>
            <div className="max-w-5xl">
              <DecorativeDivider />
              <p className="mt-7 text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                Testimonios CARELA
              </p>
              <h1 className="mt-5 max-w-5xl font-serif text-display text-champagne-gold text-balance">
                Cuidado que se siente, resultados que se recuerdan
              </h1>
              <p className="mt-7 max-w-2xl text-lead text-warm-cream/86">
                Historias de mujeres que eligieron regalarse una experiencia
                personal, tranquila y cuidada con Leidania.
              </p>
              <Link
                href="#historias"
                className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-soft-gold transition hover:text-rose-pink"
              >
                Leer sus historias
                <ArrowDown size={17} aria-hidden />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-champagne-gold/14 bg-warm-charcoal">
        <Container>
          <div className="grid md:grid-cols-3">
            {trustSignals.map((signal, index) => (
              <Reveal key={signal.label} delay={index * 0.06}>
                <div className="flex min-h-36 items-center gap-5 border-b border-champagne-gold/14 py-7 md:border-b-0 md:border-r md:px-8 first:md:pl-0 last:md:border-r-0 last:md:pr-0">
                  <span className="font-serif text-5xl text-champagne-gold">
                    {signal.value}
                  </span>
                  <p className="max-w-[13rem] text-sm leading-6 text-muted-taupe">
                    {signal.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Section id="historias" spacing="lg" tone="charcoal">
        <Container>
          <Reveal>
            <div className="grid gap-8 border-b border-champagne-gold/14 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-4xl">
                <p className="text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                  Cartas de nuestra comunidad
                </p>
                <h2 className="mt-4 font-serif text-section-title text-champagne-gold text-balance">
                  Experiencias contadas por ellas
                </h2>
                <p className="mt-5 max-w-2xl text-lead text-muted-taupe">
                  Cuatro servicios y cuatro formas distintas de volver a
                  sentirse cuidada, ligera y segura.
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
        </Container>
      </Section>

      <Section className="border-t border-champagne-gold/12" spacing="lg" tone="black">
        <Container>
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <DecorativeDivider />
                <p className="mt-7 text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                  Cuatro resultados reales
                </p>
                <h2 className="mt-4 font-serif text-section-title text-champagne-gold text-balance">
                  Una historia para cada servicio
                </h2>
              </div>
              <p className="max-w-2xl text-lead text-muted-taupe">
                Cada experiencia cambia, pero la sensación de haber recibido un
                cuidado atento permanece.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 0.07}>
                <article className="group relative min-h-[31rem] overflow-hidden border border-champagne-gold/16 bg-warm-charcoal">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.imageAlt}
                    fill
                    sizes="(min-width: 768px) 43vw, 86vw"
                    className="object-cover object-center transition duration-700 group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,3,4,0.98)_0%,rgba(5,3,4,0.82)_34%,rgba(5,3,4,0.08)_72%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs uppercase tracking-[0.2em] text-rose-pink">
                        {testimonial.service}
                      </span>
                      <span className="flex gap-0.5 text-champagne-gold" aria-label="5 de 5 estrellas">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            size={13}
                            fill="currentColor"
                            aria-hidden
                          />
                        ))}
                      </span>
                    </div>
                    <blockquote className="mt-4 max-w-2xl font-serif text-2xl leading-8 text-warm-cream sm:text-3xl sm:leading-10">
                      “{testimonial.quote}”
                    </blockquote>
                    <div className="mt-5 flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center border border-champagne-gold/35 bg-background/65 font-serif text-sm text-champagne-gold">
                        {testimonial.initials}
                      </span>
                      <span className="text-sm text-warm-cream/78">
                        {testimonial.name}
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-champagne-gold/12" spacing="lg" tone="charcoal">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <DecorativeDivider align="center" />
              <p className="mt-7 text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                Más allá del resultado
              </p>
              <h2 className="mt-4 font-serif text-section-title text-champagne-gold text-balance">
                Lo que más recuerdan de CARELA
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid border-l border-t border-champagne-gold/16 md:grid-cols-3">
            {rememberedDetails.map((detail, index) => {
              const Icon = detail.icon;

              return (
                <Reveal key={detail.title} delay={index * 0.08}>
                  <article className="h-full border-b border-r border-champagne-gold/16 bg-background/42 p-7 text-center sm:p-9">
                    <span className="mx-auto flex size-12 items-center justify-center border border-champagne-gold/35 text-champagne-gold">
                      <Icon size={21} aria-hidden />
                    </span>
                    <h3 className="mt-6 font-serif text-3xl text-warm-cream">
                      {detail.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-muted-taupe">
                      {detail.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
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
                <p className="flex items-center gap-2 text-eyebrow uppercase tracking-[0.24em] text-rose-pink">
                  <Sparkles size={14} aria-hidden />
                  Tu experiencia
                </p>
                <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-champagne-gold sm:text-5xl">
                  La próxima historia puede ser la tuya
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-muted-taupe">
                  Elige tu servicio y coordina directamente con Leidania un
                  momento pensado para ti.
                </p>
              </div>
              <Button
                href={whatsapp.url}
                icon={<MessageCircle size={18} />}
                size="lg"
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
