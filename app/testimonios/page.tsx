import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Heart, MessageCircle, Sparkles } from "lucide-react";
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

export default function TestimoniosPage() {
  return (
    <>
      <section className="relative isolate min-h-[72vh] overflow-hidden border-b border-champagne-gold/12 bg-background">
        <Image
          src="/images/testimonial-cejas.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[1.08]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,3,4,0.97),rgba(5,3,4,0.8)_48%,rgba(5,3,4,0.28))]" />
        <Container className="relative z-10 flex min-h-[72vh] items-center pb-20 pt-36">
          <Reveal>
            <div className="max-w-4xl">
              <DecorativeDivider />
              <p className="mt-7 text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                Testimonios
              </p>
              <h1 className="mt-4 max-w-4xl font-serif text-display text-champagne-gold text-balance">
                Cuidado que se siente, resultados que se recuerdan
              </h1>
              <p className="mt-7 max-w-2xl text-lead text-warm-cream/86">
                Historias de mujeres que eligieron regalarse una experiencia
                personal, tranquila y cuidada con Leidania.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section spacing="lg" tone="charcoal">
        <Container>
          <Reveal>
            <div className="grid gap-8 border-b border-champagne-gold/14 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-4xl">
                <p className="text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                  Experiencias CARELA
                </p>
                <h2 className="mt-4 font-serif text-section-title text-champagne-gold text-balance">
                  Palabras de nuestra comunidad
                </h2>
                <p className="mt-5 max-w-2xl text-lead text-muted-taupe">
                  Cada testimonio corresponde a uno de los servicios de belleza
                  y bienestar disponibles.
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
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="flex items-start gap-5">
                <span
                  className="hidden size-14 shrink-0 items-center justify-center border border-champagne-gold/30 bg-champagne-gold/10 text-champagne-gold sm:flex"
                  aria-hidden="true"
                >
                  <Heart size={23} />
                </span>
                <div>
                  <p className="flex items-center gap-2 text-eyebrow uppercase tracking-[0.24em] text-rose-pink">
                    <Sparkles size={14} aria-hidden="true" />
                    Tu experiencia
                  </p>
                  <h2 className="mt-4 max-w-4xl font-serif text-section-title text-champagne-gold text-balance">
                    La próxima historia puede ser la tuya
                  </h2>
                </div>
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
      </Section>
    </>
  );
}
