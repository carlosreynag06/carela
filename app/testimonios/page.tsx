import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  Heart,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { DecorativeDivider } from "@/components/DecorativeDivider";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { testimonials } from "@/data/testimonials";
import { createPageMetadata } from "@/lib/seo";
import { whatsapp } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Testimonios de clientas",
  description:
    "Conoce las experiencias de clientas de CARELA Beauty & Wellness en Puerto Plata.",
  path: "/testimonios",
});

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
      <section className="relative isolate min-h-[100svh] w-full overflow-hidden border-b border-champagne-gold/15 bg-background">
        <div className="grid min-h-[100svh] pt-20 lg:grid-cols-2">
          <div className="flex items-center bg-background px-[var(--site-edge-gap)] py-16 lg:py-20 lg:pr-14 xl:pr-20">
            <div className="max-w-2xl text-left">
              <p className="carela-fade-rise text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                Testimonios CARELA
              </p>

              <h1 className="carela-fade-rise mt-6 font-serif text-[clamp(3rem,5.8vw,5.9rem)] font-normal leading-[0.94] text-champagne-gold text-balance">
                Resultados Inolvidables
              </h1>

              <p className="carela-fade-rise-delay mt-7 max-w-xl text-sm leading-7 text-warm-cream/90 sm:text-base sm:leading-8">
                Historias de mujeres que eligieron regalarse una experiencia
                personal, tranquila y cuidada con Leidania.
              </p>

              <div className="carela-fade-rise-delay-2 mt-9">
                <Button
                  href="#historias"
                  size="lg"
                  icon={<ArrowDown size={18} />}
                  iconPosition="right"
                >
                  Leer sus historias
                </Button>
              </div>
            </div>
          </div>

          <div className="relative min-h-[44svh] border-t border-champagne-gold/15 lg:min-h-0 lg:border-l lg:border-t-0">
            <Image
              src="/images/testimonios-hero-portrait.png"
              alt="Clienta de CARELA mostrando un resultado natural y una expresión segura"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[center_20%]"
            />
          </div>
        </div>
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
                  Seis experiencias y distintas formas de volver a sentirse
                  cuidada, ligera y segura.
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

          <TestimonialsCarousel testimonials={testimonials} layout="grid" />
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
