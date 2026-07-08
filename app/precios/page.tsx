import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CheckCircle2, House, Layers3, MessageCircle } from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { DecorativeDivider } from "@/components/DecorativeDivider";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { services } from "@/data/services";
import { whatsapp } from "@/lib/site";

export const metadata: Metadata = {
  title: "Precios | CARELA Beauty & Wellness",
  description:
    "Consulta precios y opciones para los servicios de belleza y bienestar de CARELA en Puerto Plata.",
};

const pricingFactors = [
  {
    title: "Servicio elegido",
    description:
      "Cada experiencia requiere un tiempo, preparación y cuidado diferente.",
    icon: CheckCircle2,
  },
  {
    title: "Modalidad de atención",
    description:
      "Puedes coordinar tu cita en el espacio privado o solicitar atención a domicilio.",
    icon: House,
  },
  {
    title: "Combinación de servicios",
    description:
      "Si deseas más de un servicio, preparamos una cotización conjunta para tu cita.",
    icon: Layers3,
  },
];

function pricingUrl(service: string) {
  const message = `Hola, me gustaría consultar el precio de ${service}.`;
  return `${whatsapp.url}?text=${encodeURIComponent(message)}`;
}

export default function PreciosPage() {
  return (
    <>
      <section className="relative isolate min-h-[72vh] overflow-hidden border-b border-champagne-gold/12 bg-background">
        <Image
          src="/images/hero-carela-spa.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[1.08]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,3,4,0.96),rgba(5,3,4,0.78)_48%,rgba(5,3,4,0.22))]" />
        <Container className="relative z-10 flex min-h-[72vh] items-center pb-20 pt-36">
          <Reveal>
            <div className="max-w-4xl">
              <DecorativeDivider />
              <p className="mt-7 text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                Precios
              </p>
              <h1 className="mt-4 max-w-4xl font-serif text-display text-champagne-gold text-balance">
                Opciones de cuidado pensadas para ti
              </h1>
              <p className="mt-7 max-w-2xl text-lead text-warm-cream/86">
                Explora cada servicio y solicita una cotización personal según
                la modalidad, disponibilidad y experiencia que deseas.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section spacing="lg" tone="charcoal">
        <Container>
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                  Servicios y precios
                </p>
                <h2 className="mt-4 max-w-3xl font-serif text-section-title text-champagne-gold text-balance">
                  Consulta el precio de tu servicio
                </h2>
              </div>
              <p className="max-w-xl text-lead text-muted-taupe">
                Recibirás el precio confirmado antes de reservar, con todos los
                detalles de tu cita y sin cargos sorpresa.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <Reveal key={service.slug} delay={(index % 2) * 0.08}>
                  <article className="grid h-full overflow-hidden border border-champagne-gold/16 bg-background/70 sm:grid-cols-[0.82fr_1.18fr]">
                    <div className="relative min-h-64 overflow-hidden sm:min-h-full">
                      <Image
                        src={service.imageSrc}
                        alt={service.imageAlt}
                        fill
                        sizes="(min-width: 768px) 34vw, 86vw"
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="flex flex-col p-6">
                      <div className="flex items-center gap-3 text-champagne-gold">
                        <Icon size={20} aria-hidden="true" />
                        <span className="text-xs uppercase tracking-[0.2em] text-rose-pink">
                          {service.shortTitle}
                        </span>
                      </div>
                      <h2 className="mt-4 font-serif text-3xl leading-tight text-warm-cream">
                        {service.title}
                      </h2>
                      <p className="mt-4 text-sm leading-7 text-muted-taupe">
                        {service.benefit}
                      </p>
                      <p className="mt-5 border-l border-champagne-gold/40 pl-4 text-sm font-semibold text-soft-gold">
                        Precio confirmado al reservar
                      </p>
                      <div className="mt-auto pt-6">
                        <Button
                          href={pricingUrl(service.title)}
                          icon={<MessageCircle size={16} />}
                          size="sm"
                          variant="ghost"
                        >
                          Consultar precio
                        </Button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-champagne-gold/12" spacing="lg" tone="black">
        <Container>
          <Reveal>
            <div className="max-w-4xl">
              <p className="text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                Cotización personal
              </p>
              <h2 className="mt-4 font-serif text-section-title text-champagne-gold text-balance">
                ¿Qué influye en el precio?
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {pricingFactors.map((factor, index) => {
              const Icon = factor.icon;

              return (
                <Reveal key={factor.title} delay={index * 0.08}>
                  <div className="border-l border-champagne-gold/32 pl-6">
                    <Icon className="text-champagne-gold" size={24} aria-hidden="true" />
                    <h3 className="mt-5 font-serif text-3xl text-warm-cream">
                      {factor.title}
                    </h3>
                    <p className="mt-3 text-copy text-muted-taupe">
                      {factor.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.12}>
            <div className="mt-14 flex flex-col gap-6 border border-champagne-gold/22 bg-warm-charcoal/65 px-7 py-7 sm:flex-row sm:items-center sm:justify-between lg:px-10">
              <p className="max-w-3xl font-serif text-2xl text-warm-cream lg:text-3xl">
                Cuéntanos qué servicio deseas y recibe tu precio directamente.
              </p>
              <Button
                href={whatsapp.url}
                icon={<ArrowRight size={18} />}
                iconPosition="right"
                className="shrink-0"
              >
                Consultar por WhatsApp
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
