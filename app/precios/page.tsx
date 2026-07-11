import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { DecorativeDivider } from "@/components/DecorativeDivider";
import { PricingTabs } from "@/components/PricingTabs";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { whatsapp } from "@/lib/site";

export const metadata: Metadata = {
  title: "Precios | CARELA Beauty & Wellness",
  description:
    "Compara paquetes y precios para masajes, cejas, pestanas y depilacion en CARELA Beauty & Wellness.",
};

export default function PreciosPage() {
  return (
    <>
      <section className="relative isolate min-h-[46svh] overflow-hidden border-b border-champagne-gold/12 bg-background pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(217,75,140,0.17),transparent_34%),radial-gradient(circle_at_18%_78%,rgba(217,168,78,0.12),transparent_32%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/40 to-transparent" />

        <Container className="relative z-10 grid min-h-[calc(46svh-7rem)] gap-10 py-14 lg:grid-cols-[0.96fr_1.04fr] lg:items-center lg:py-16">
          <Reveal>
            <div>
              <DecorativeDivider />
              <p className="mt-7 text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                Compara paquetes
              </p>
              <h1 className="mt-4 max-w-4xl font-serif text-section-title text-champagne-gold text-balance">
                Elige el precio que mejor acompaña tu momento de cuidado.
              </h1>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="max-w-2xl lg:ml-auto">
              <p className="text-lead text-warm-cream/86">
                Compara opciones por servicio antes de escribir por WhatsApp.
                Los paquetes son una guía inicial; Leidania confirma el precio
                final según modalidad, disponibilidad y detalles de tu cita.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#comparar-precios" icon={<ArrowRight size={18} />}>
                  Ver paquetes
                </Button>
                <Button href={whatsapp.url} variant="ghost">
                  Consultar por WhatsApp
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <Section
        className="border-b border-champagne-gold/12"
        id="comparar-precios"
        spacing="lg"
        tone="black"
      >
        <PricingTabs />
      </Section>
    </>
  );
}
