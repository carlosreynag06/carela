import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  Eye,
  Flower2,
  HandHeart,
  Maximize2,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { DecorativeDivider } from "@/components/DecorativeDivider";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { whatsapp } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Galería | CARELA Beauty & Wellness",
  description:
    "Explora los servicios, detalles y ambiente de CARELA Beauty & Wellness en Puerto Plata.",
};

export default function GaleriaPage() {
  return (
    <>
      <section className="relative isolate mt-20 min-h-[calc(100svh-5rem)] overflow-hidden border-b border-champagne-gold/12 bg-background">
        <Image
          src="/images/service-page-pestanas.png"
          alt="Aplicación profesional de pestañas en CARELA Beauty & Wellness"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[1.08]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,3,4,0.98),rgba(5,3,4,0.83)_47%,rgba(5,3,4,0.16))]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/72 via-transparent to-background/12" />
        <Container className="relative z-10 flex min-h-[calc(100svh-5rem)] items-end pb-14 pt-14 lg:pb-16 lg:pt-16">
          <Reveal>
            <div className="max-w-5xl">
              <DecorativeDivider />
              <p className="mt-7 text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                Galería CARELA
              </p>
              <h1 className="mt-5 max-w-5xl font-serif text-display text-champagne-gold text-balance">
                La belleza del cuidado, vista de cerca
              </h1>
              <p className="mt-7 max-w-2xl text-lead text-warm-cream/86">
                Un recorrido visual por los servicios, los detalles y la
                atmósfera que hacen de cada cita una experiencia especial.
              </p>
              <Button
                href="#bienestar"
                className="mt-8"
                icon={<ArrowDown size={17} />}
                iconPosition="right"
              >
                Explorar la galería
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section id="bienestar" spacing="lg" tone="black">
        <Container>
          <Reveal>
            <GalleryHeading
              icon={<HandHeart size={19} aria-hidden />}
              eyebrow="Bienestar en movimiento"
              title="La calma también se puede ver"
              description="Gestos precisos, un ritmo tranquilo y un espacio preparado para que el cuerpo pueda soltar la tensión."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <Reveal>
              <GalleryImage
                src="/images/service-page-masajes.png"
                alt="Masaje de hombros realizado en un ambiente boutique"
                label="Masaje terapéutico"
                className="aspect-[4/3] lg:aspect-auto lg:min-h-[43rem]"
                imageClassName="object-center"
              />
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <Reveal delay={0.08}>
                <GalleryImage
                  src="/images/service-masajes-v2.png"
                  alt="Mujer recibiendo un masaje relajante"
                  label="Momento de desconexión"
                  className="aspect-[4/3] lg:min-h-[20.75rem]"
                />
              </Reveal>
              <Reveal delay={0.14}>
                <GalleryImage
                  src="/images/testimonial-masajes.png"
                  alt="Clienta relajada después de su experiencia de masaje"
                  label="Ligereza y bienestar"
                  className="aspect-[4/3] lg:min-h-[20.75rem]"
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-champagne-gold/12" spacing="lg" tone="charcoal">
        <Container>
          <Reveal>
            <GalleryHeading
              icon={<Eye size={19} aria-hidden />}
              eyebrow="Detalles de la mirada"
              title="Precisión que eleva tu expresión"
              description="Cejas definidas y pestañas delicadas, trabajadas para complementar tus facciones con un acabado natural."
              align="right"
            />
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-[0.8fr_1.2fr_0.8fr]">
            <Reveal>
              <GalleryImage
                src="/images/service-page-cejas.png"
                alt="Aplicación precisa de tintado sobre la ceja"
                label="Tintado de cejas"
                className="aspect-[4/5]"
                imageClassName="object-[52%_center]"
              />
            </Reveal>
            <Reveal delay={0.08}>
              <GalleryImage
                src="/images/testimonial-cejas.png"
                alt="Resultado natural de cejas visto frente al espejo"
                label="Definición natural"
                className="aspect-[4/5] md:row-span-1 xl:aspect-auto xl:min-h-[44rem]"
              />
            </Reveal>
            <Reveal delay={0.14} className="md:col-span-2 xl:col-span-1">
              <GalleryImage
                src="/images/service-page-pestanas.png"
                alt="Aplicación individual de extensiones de pestañas"
                label="Postura de pestañas"
                className="aspect-[4/3] xl:aspect-[4/5]"
                imageClassName="object-[42%_center]"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section spacing="lg" tone="black">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
            <Reveal>
              <div>
                <span className="flex size-12 items-center justify-center border border-champagne-gold/35 text-champagne-gold">
                  <Flower2 size={21} aria-hidden />
                </span>
                <p className="mt-8 text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                  Cuidado de la piel
                </p>
                <h2 className="mt-4 max-w-4xl font-serif text-section-title text-champagne-gold text-balance">
                  Técnica limpia, piel suave y bien cuidada
                </h2>
                <p className="mt-6 max-w-2xl text-lead text-muted-taupe">
                  La depilación se realiza con atención a la higiene, la
                  comodidad y el cuidado de la piel en cada etapa.
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Button
                    href="/servicios#depilacion"
                    variant="ghost"
                    icon={<ArrowRight size={16} />}
                    iconPosition="right"
                  >
                    Conocer el servicio
                  </Button>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-[1.08fr_0.92fr] sm:items-end">
              <Reveal delay={0.08}>
                <GalleryImage
                  src="/images/service-page-depilacion.png"
                  alt="Aplicación profesional de cera sobre la pierna"
                  label="Aplicación cuidadosa"
                  className="aspect-[4/5]"
                  imageClassName="object-[46%_center]"
                />
              </Reveal>
              <Reveal delay={0.14}>
                <GalleryImage
                  src="/images/testimonial-depilacion.png"
                  alt="Productos calmantes para el cuidado posterior de la piel"
                  label="Cuidado posterior"
                  className="aspect-square"
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-champagne-gold/12" spacing="lg" tone="charcoal">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-4xl text-center">
              <DecorativeDivider align="center" />
              <p className="mt-7 text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                Atmósfera CARELA
              </p>
              <h2 className="mt-4 font-serif text-section-title text-champagne-gold text-balance">
                Un espacio que invita a bajar el ritmo
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lead text-muted-taupe">
                Luz cálida, detalles cuidados y una sensación de privacidad
                pensada para disfrutar tu momento.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid auto-rows-[15rem] gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Reveal className="sm:row-span-2 lg:col-span-2">
              <GalleryImage
                src="/images/hero-carela-spa.png"
                alt="Ambiente principal de CARELA Beauty & Wellness"
                label="Calma desde que llegas"
                className="h-full min-h-[31.25rem]"
              />
            </Reveal>
            <Reveal delay={0.06} className="lg:col-span-2">
              <GalleryImage
                src="/images/boutique-experience-divider.png"
                alt="Velas, toallas y detalles de una experiencia boutique"
                label="Experiencia boutique"
                className="h-full"
              />
            </Reveal>
            <Reveal delay={0.12}>
              <GalleryImage
                src="/images/why-carela-dominican-spa.png"
                alt="Preparación atenta del espacio de bienestar"
                label="Cada detalle preparado"
                className="h-full"
              />
            </Reveal>
            <Reveal delay={0.18}>
              <GalleryImage
                src="/images/testimonial-pestanas.png"
                alt="Resultado elegante de pestañas en un ambiente cálido"
                label="Belleza con confianza"
                className="h-full"
              />
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
                <p className="flex items-center gap-2 text-eyebrow uppercase tracking-[0.24em] text-rose-pink">
                  <Sparkles size={14} aria-hidden />
                  Tu momento CARELA
                </p>
                <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-champagne-gold sm:text-5xl">
                  ¿Lista para vivirlo en persona?
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-muted-taupe">
                  Escríbele a Leidania y coordina una experiencia pensada para
                  hacerte sentir tan bien como te ves.
                </p>
              </div>
              <Button
                href={whatsapp.url}
                icon={<MessageCircle size={18} />}
                size="lg"
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

function GalleryHeading({
  align = "left",
  description,
  eyebrow,
  icon,
  title,
}: {
  align?: "left" | "right";
  description: string;
  eyebrow: string;
  icon: ReactNode;
  title: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end",
        align === "right" && "lg:grid-cols-[1.18fr_0.82fr]",
      )}
    >
      <div className={align === "right" ? "lg:order-2" : undefined}>
        <span className="flex size-12 items-center justify-center border border-champagne-gold/35 text-champagne-gold">
          {icon}
        </span>
        <p className="mt-7 text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
          {eyebrow}
        </p>
        <h2 className="mt-4 font-serif text-section-title text-champagne-gold text-balance">
          {title}
        </h2>
      </div>
      <p
        className={cn(
          "max-w-2xl text-lead text-muted-taupe",
          align === "right" && "lg:order-1",
        )}
      >
        {description}
      </p>
    </div>
  );
}

function GalleryImage({
  alt,
  className,
  imageClassName,
  label,
  src,
}: {
  alt: string;
  className?: string;
  imageClassName?: string;
  label: string;
  src: string;
}) {
  return (
    <a
      href={src}
      target="_blank"
      rel="noreferrer"
      aria-label={`Ver imagen ampliada: ${label}`}
      className={cn(
        "group relative block overflow-hidden border border-champagne-gold/16 bg-warm-charcoal shadow-premium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soft-gold",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1280px) 42vw, (min-width: 768px) 48vw, 86vw"
        className={cn(
          "object-cover object-center transition duration-700 group-hover:scale-[1.025]",
          imageClassName,
        )}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/72 via-transparent to-transparent opacity-85 transition group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
        <p className="font-serif text-2xl leading-tight text-warm-cream">
          {label}
        </p>
        <span className="flex size-10 shrink-0 items-center justify-center border border-champagne-gold/35 bg-background/55 text-champagne-gold backdrop-blur transition group-hover:bg-champagne-gold group-hover:text-background">
          <Maximize2 size={17} aria-hidden />
        </span>
      </div>
    </a>
  );
}
