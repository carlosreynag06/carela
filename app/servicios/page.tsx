import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check, Clock3, MessageCircle } from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { ServiceImageHero } from "@/components/ServiceImageHero";
import { ServiceSectionTabs } from "@/components/ServiceSectionTabs";
import { services } from "@/data/services";
import { whatsapp } from "@/lib/site";

export const metadata: Metadata = {
  title: "Servicios | CARELA Beauty & Wellness",
  description:
    "Conoce los servicios de masajes, cejas, pestañas y depilación de CARELA Beauty & Wellness en Puerto Plata.",
};

const serviceDetails = {
  masajes: {
    number: "01",
    image: "/images/service-page-masajes.png",
    duration: "Sesión personalizada",
    accent: "Pausa, alivio y bienestar",
    detail:
      "Un momento diseñado para bajar el ritmo y atender las zonas donde tu cuerpo guarda el cansancio. La presión y el enfoque se adaptan a cómo llegas ese día.",
  },
  cejas: {
    number: "02",
    image: "/images/service-page-cejas.png",
    duration: "Diseño y tintado",
    accent: "Definición que se siente natural",
    detail:
      "Trabajamos el tono y la forma con precisión para enmarcar tu mirada sin endurecer tus facciones. El resultado es limpio, equilibrado y pensado para ti.",
  },
  pestanas: {
    number: "03",
    image: "/images/service-page-pestanas.png",
    duration: "Aplicación personalizada",
    accent: "Una mirada suave y expresiva",
    detail:
      "La postura se adapta a la forma de tus ojos y al efecto que prefieras. Cada aplicación busca comodidad, armonía y un acabado delicado.",
  },
  depilacion: {
    number: "04",
    image: "/images/service-page-depilacion.png",
    duration: "Zonas a elección",
    accent: "Suavidad con atención cuidadosa",
    detail:
      "Un proceso privado e higiénico que cuida la piel antes, durante y después de la cera. Puedes elegir las zonas y combinarlas según lo que necesites.",
  },
} as const;

export default function ServiciosPage() {
  return (
    <>
      <ServiceImageHero />

      <section
        id="explorar-servicios"
        className="scroll-mt-20 border-b border-champagne-gold/15 bg-warm-charcoal py-14 lg:py-16"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
              Elige tu experiencia
            </p>
            <h2 className="mt-3 font-serif text-4xl text-champagne-gold sm:text-5xl">
              Encuentra el cuidado ideal para ti
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-taupe sm:text-base">
              Explora cada servicio y descubre qué incluye, para quién está
              pensado y cómo reservar tu momento CARELA.
            </p>
          </div>
          <div className="mt-9">
            <ServiceSectionTabs />
          </div>
        </Container>
      </section>

      <div className="bg-background">
        {services.map((service, index) => {
          const details = serviceDetails[service.slug];
          const Icon = service.icon;
          const imageFirst = index % 2 === 1;

          return (
            <section
              key={service.slug}
              id={service.slug}
              className="scroll-mt-24 border-b border-champagne-gold/12 py-20 lg:py-28"
            >
              <Container>
                <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-16 xl:gap-24">
                  <Reveal
                    className={
                      imageFirst
                        ? "flex self-end justify-center lg:order-2 lg:justify-end"
                        : "flex self-end justify-center lg:justify-start"
                    }
                  >
                    <div className="group relative aspect-[8/9] w-full max-w-[38rem] overflow-hidden border border-champagne-gold/20 bg-warm-charcoal shadow-premium">
                      <Image
                        src={details.image}
                        alt={service.imageAlt}
                        fill
                        sizes="(min-width: 1280px) 38rem, (min-width: 1024px) 46vw, 86vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.025]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/38 via-transparent to-transparent" />
                      <div className="absolute bottom-5 left-5 flex items-center gap-3 border border-champagne-gold/30 bg-background/78 px-4 py-3 backdrop-blur-md">
                        <Clock3 size={16} className="text-champagne-gold" aria-hidden />
                        <span className="text-xs uppercase tracking-[0.18em] text-warm-cream">
                          {details.duration}
                        </span>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal
                    delay={0.08}
                    className={imageFirst ? "lg:order-1" : undefined}
                  >
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-4">
                        <span className="font-serif text-2xl text-champagne-gold/55">
                          {details.number}
                        </span>
                        <span className="h-px w-12 bg-rose-pink" />
                        <Icon size={20} className="text-rose-pink" aria-hidden />
                      </div>
                      <p className="mt-7 text-eyebrow uppercase tracking-[0.26em] text-rose-pink">
                        {details.accent}
                      </p>
                      <h2 className="mt-4 font-serif text-section-title text-champagne-gold text-balance">
                        {service.title}
                      </h2>
                      <p className="mt-6 text-lg leading-8 text-warm-cream/82">
                        {details.detail}
                      </p>
                      <p className="mt-5 border-l border-champagne-gold/45 pl-5 text-sm leading-7 text-muted-taupe">
                        {service.idealFor}
                      </p>

                      <div className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                        {service.includes.map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-3 text-sm leading-6 text-warm-cream/78"
                          >
                            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center border border-champagne-gold/40 text-champagne-gold">
                              <Check size={12} strokeWidth={2.5} aria-hidden />
                            </span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-9 flex flex-wrap gap-3">
                        <Button
                          href={`${whatsapp.url}?text=${encodeURIComponent(`Hola Leidania, me interesa el servicio de ${service.title}.`)}`}
                          icon={<MessageCircle size={17} />}
                        >
                          Consultar por WhatsApp
                        </Button>
                        <Button
                          href={`/precios#${service.slug}`}
                          variant="ghost"
                          icon={<ArrowRight size={16} />}
                          iconPosition="right"
                        >
                          Ver precios
                        </Button>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </Container>
            </section>
          );
        })}
      </div>

      <section className="relative overflow-hidden bg-warm-charcoal py-20 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(143,31,84,0.24),transparent_30%)]" />
        <Container className="relative">
          <Reveal>
            <div className="flex flex-col gap-8 border border-champagne-gold/25 bg-background/45 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
              <div>
                <p className="text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                  Tu próxima cita
                </p>
                <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-champagne-gold sm:text-5xl">
                  Elige cómo quieres sentirte hoy
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-muted-taupe">
                  Escríbele directamente a Leidania para coordinar el servicio,
                  el horario y la modalidad que prefieras.
                </p>
              </div>
              <Button
                href={whatsapp.url}
                size="lg"
                icon={<MessageCircle size={19} />}
                className="shrink-0"
              >
                Reservar por WhatsApp
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
