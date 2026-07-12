import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/Button";

export function ServiceImageHero() {
  return (
    <section className="relative isolate min-h-[100svh] w-full overflow-hidden border-b border-champagne-gold/15 bg-background">
      <div className="grid min-h-[100svh] pt-20 lg:grid-cols-2">
        <div className="flex items-center bg-background px-[var(--site-edge-gap)] py-16 lg:py-20 lg:pr-14 xl:pr-20">
          <div className="max-w-2xl text-left">
            <p className="carela-fade-rise text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
              Belleza / Bienestar / Confianza
            </p>

            <h1 className="carela-fade-rise mt-6 font-serif text-[clamp(3rem,5.8vw,5.9rem)] font-normal leading-[0.94] text-champagne-gold text-balance">
              Belleza &amp; Bienestar.
            </h1>

            <p className="carela-fade-rise-delay mt-7 max-w-xl text-sm leading-7 text-warm-cream/90 sm:text-base sm:leading-8">
              Cuatro experiencias de belleza y bienestar creadas con calma,
              atención personal y el detalle que convierte una cita en tu
              momento.
            </p>

            <div className="carela-fade-rise-delay-2 mt-9">
              <Button
                href="#explorar-servicios"
                size="lg"
                icon={<ArrowDown size={18} />}
                iconPosition="right"
              >
                Explorar servicios
              </Button>
            </div>
          </div>
        </div>

        <div className="relative min-h-[44svh] border-t border-champagne-gold/15 lg:min-h-0 lg:border-l lg:border-t-0">
          <Image
            src="/images/service-page-masajes.png"
            alt="Experiencia de masaje y bienestar en CARELA"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
