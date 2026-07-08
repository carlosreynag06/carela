import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, CheckCircle2, Heart, Sparkles, Stars } from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { DecorativeDivider } from "@/components/DecorativeDivider";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { services } from "@/data/services";
import { whatsapp } from "@/lib/site";

const essenceItems = [
  {
    title: "Relájate",
    description: "Regálate una pausa tranquila para soltar tensión.",
    icon: Heart,
  },
  {
    title: "Realza tu belleza",
    description: "Detalles cuidados para verte más pulida y natural.",
    icon: Sparkles,
  },
  {
    title: "Brilla diferente",
    description: "Sal renovada, segura y lista para sentirte mejor.",
    icon: Stars,
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <BrandEssenceStrip />
      <ServicesPreview />
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
        <div className="grid w-full items-center gap-12 py-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(280px,0.48fr)]">
          <Reveal>
            <div className="max-w-3xl">
              <DecorativeDivider />
              <p className="mt-8 text-eyebrow uppercase tracking-[0.32em] text-soft-gold">
                Beauty / Wellness / Confidence
              </p>
              <p className="mt-5 font-script text-4xl text-rose-pink sm:text-5xl">
                Tu momento de cuidado
              </p>
              <h1 className="mt-4 max-w-4xl font-serif text-display text-champagne-gold text-balance">
                Tu momento de belleza, cuidado y bienestar en Puerto Plata
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

          <Reveal delay={0.12}>
            <div className="hidden border border-champagne-gold/20 bg-background/48 p-5 shadow-premium backdrop-blur-md lg:block">
              <p className="font-script text-3xl text-rose-pink">
                CARELA
              </p>
              <p className="mt-3 font-serif text-3xl leading-tight text-warm-cream">
                Una experiencia boutique, íntima y pensada solo para ti.
              </p>
              <p className="mt-4 text-sm leading-7 text-muted-taupe">
                Cuidado personal con calma, detalle y una presencia cálida en
                cada cita.
              </p>
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

function BrandEssenceStrip() {
  return (
    <Section className="border-y border-champagne-gold/12" spacing="sm" tone="charcoal">
      <Container>
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                CARELA Beauty & Wellness
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-warm-cream sm:text-5xl">
                Cada servicio está pensado para que te sientas cuidada desde el
                primer momento.
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {essenceItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group border border-champagne-gold/14 bg-background/38 p-5 transition duration-300 hover:border-champagne-gold/45 hover:bg-background/58"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <Icon
                        className="text-champagne-gold transition group-hover:text-soft-gold"
                        size={22}
                        aria-hidden
                      />
                      <span className="h-px flex-1 bg-champagne-gold/24" />
                    </div>
                    <h3 className="mt-5 font-serif text-3xl text-champagne-gold">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-taupe">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-9 flex flex-col gap-4 border-t border-champagne-gold/12 pt-6 text-sm leading-7 text-muted-taupe sm:flex-row sm:items-center sm:justify-between">
            <p>
              Relájate. Realza tu belleza. Brilla diferente.
            </p>
            <Link
              href="/reservar"
              className="inline-flex items-center gap-2 font-semibold text-champagne-gold transition hover:text-soft-gold"
            >
              Coordinar tu cita
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
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

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Reveal key={service.slug} delay={index * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden border border-champagne-gold/15 bg-warm-charcoal/70 shadow-premium transition duration-300 hover:-translate-y-1 hover:border-champagne-gold/45 hover:bg-warm-charcoal">
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
                    <Link
                      href="/servicios"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-champagne-gold transition hover:text-soft-gold"
                    >
                      Ver detalle
                      <ArrowRight size={16} aria-hidden />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
