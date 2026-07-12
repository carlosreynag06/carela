import type { Metadata } from "next";
import { CalendarCheck, Eye, Flower2, HandHeart, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { FAQAccordion } from "@/components/FAQAccordion";
import { SupportPageHero } from "@/components/SupportPageHero";
import { SupportSidebar, type SupportSidebarItem } from "@/components/SupportSidebar";
import { faqCategories } from "@/data/support";
import { whatsapp } from "@/lib/site";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | CARELA Beauty & Wellness",
  description:
    "Respuestas sobre reservas, servicios, precios y cuidados de CARELA Beauty & Wellness.",
};

const categoryIcons = [CalendarCheck, HandHeart, Eye, Sparkles, Flower2];

const sidebarItems: SupportSidebarItem[] = faqCategories.map((category, index) => ({
  href: `#${category.id}`,
  icon: categoryIcons[index],
  label: category.title,
}));

export default function PreguntasPage() {
  return (
    <>
      <SupportPageHero
        icon={MessageCircle}
        eyebrow="Ayuda CARELA"
        title="Preguntas frecuentes"
        description="Respuestas claras para que puedas elegir, reservar y disfrutar tu cita con tranquilidad."
      />

      <section className="bg-background py-16 lg:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
            <SupportSidebar items={sidebarItems} title="Categorías" />

            <div>
              {faqCategories.map((category, index) => (
                <section
                  key={category.id}
                  id={category.id}
                  className="scroll-mt-28 border-t border-champagne-gold/18 py-10 first:border-t-0 first:pt-0 lg:py-12"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-1 flex size-10 shrink-0 items-center justify-center border border-champagne-gold/28 text-champagne-gold">
                      {(() => {
                        const Icon = categoryIcons[index];
                        return <Icon size={18} aria-hidden />;
                      })()}
                    </span>
                    <div>
                      <p className="text-eyebrow uppercase tracking-[0.24em] text-rose-pink">
                        0{index + 1}
                      </p>
                      <h2 className="mt-2 font-serif text-4xl leading-tight text-champagne-gold sm:text-5xl">
                        {category.title}
                      </h2>
                      <p className="mt-3 text-copy text-muted-taupe">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-7">
                    <FAQAccordion items={category.items} />
                  </div>
                </section>
              ))}

              <div className="border-t border-champagne-gold/18 pt-10">
                <p className="font-serif text-3xl text-warm-cream">
                  ¿Aún tienes una duda?
                </p>
                <p className="mt-3 max-w-2xl text-copy text-muted-taupe">
                  Escríbele a Leidania directamente. Te orientará según el servicio y la experiencia que buscas.
                </p>
                <Button href={whatsapp.url} icon={<MessageCircle size={18} />} className="mt-6">
                  Hablar por WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
