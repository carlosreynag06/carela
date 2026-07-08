import Link from "next/link";
import { ImagePlaceholder } from "@/components/brand/ImagePlaceholder";
import { Container } from "@/components/Container";
import { DecorativeDivider } from "@/components/DecorativeDivider";
import { PremiumCard } from "@/components/PremiumCard";
import { Section } from "@/components/Section";
import { WhatsAppCTA } from "@/components/brand/WhatsAppCTA";
import { Reveal } from "@/components/motion/Reveal";
import { navItems } from "@/data/nav";

export default function Home() {
  return (
    <Section className="min-h-[72vh]" spacing="md">
      <Container className="flex flex-col justify-center gap-10">
        <Reveal>
          <div className="max-w-3xl">
            <p className="font-script text-3xl text-rose-pink">
              Beauty & Wellness
            </p>
            <h1 className="mt-4 font-serif text-section-title text-champagne-gold">
              Scaffold base de CARELA listo para construir por fases
            </h1>
            <p className="mt-6 max-w-2xl text-lead text-muted-taupe">
              Esta pantalla es solo el punto de partida tecnico. La experiencia
              visual completa de Inicio comenzara en la fase aprobada
              correspondiente.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <PremiumCard>
            <DecorativeDivider />
            <h2 className="mt-5 font-serif text-3xl text-warm-cream">
              Rutas preparadas
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border border-champagne-gold/15 px-4 py-3 text-sm text-muted-taupe transition hover:border-champagne-gold/50 hover:text-warm-cream"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <WhatsAppCTA />
            </div>
          </PremiumCard>

          <ImagePlaceholder
            label="Placeholder visual"
            description="Las imagenes premium se generaran una por una segun la fase."
          />
        </div>
      </Container>
    </Section>
  );
}
