import type { Metadata } from "next";
import { BadgeDollarSign, CalendarClock, FileText, HeartHandshake, MessageCircle, Scale, ShieldCheck } from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { SupportPageHero } from "@/components/SupportPageHero";
import { SupportSidebar, type SupportSidebarItem } from "@/components/SupportSidebar";
import { whatsapp } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y Condiciones | CARELA Beauty & Wellness",
  description:
    "Términos y condiciones de reserva, atención y uso del sitio de CARELA Beauty & Wellness.",
};

const terms = [
  {
    id: "aceptacion",
    title: "Aceptación de estos términos",
    icon: FileText,
    content:
      "Al usar este sitio, solicitar información o reservar un servicio con CARELA Beauty & Wellness, aceptas estos términos. CARELA puede actualizar este contenido cuando sea necesario para reflejar cambios en sus servicios o procesos.",
  },
  {
    id: "reservas",
    title: "Reservas y confirmaciones",
    icon: CalendarClock,
    content:
      "Las citas se coordinan directamente por WhatsApp. Una reserva queda confirmada cuando Leidania confirme el servicio, fecha, horario, modalidad y cualquier detalle relevante. La disponibilidad puede variar según la agenda y la zona.",
  },
  {
    id: "precios",
    title: "Precios y pagos",
    icon: BadgeDollarSign,
    content:
      "Los precios publicados son una guía para ayudarte a comparar opciones. El valor final se confirma antes de la cita y puede depender de la duración, zonas elegidas, combinación de servicios o modalidad a domicilio.",
  },
  {
    id: "cambios",
    title: "Cambios y cancelaciones",
    icon: HeartHandshake,
    content:
      "Si necesitas modificar o cancelar una cita, avisa con la mayor anticipación posible por WhatsApp. Esto permite reorganizar la agenda y atender a otras clientas con el mismo cuidado.",
  },
  {
    id: "bienestar",
    title: "Bienestar y seguridad",
    icon: ShieldCheck,
    content:
      "Antes del servicio, comparte cualquier sensibilidad, condición de la piel, molestia o preferencia importante. CARELA puede recomendar ajustar, reprogramar o no realizar un servicio si considera que no es adecuado para tu comodidad y seguridad.",
  },
  {
    id: "sitio",
    title: "Uso del sitio",
    icon: Scale,
    content:
      "El contenido, imágenes y diseño de este sitio pertenecen a CARELA Beauty & Wellness o se usan con autorización. No pueden copiarse, reproducirse o utilizarse con fines comerciales sin consentimiento previo.",
  },
];

const sidebarItems: SupportSidebarItem[] = terms.map(({ id, icon, title }) => ({
  href: `#${id}`,
  icon,
  label: title,
}));

export default function TerminosPage() {
  return (
    <>
      <SupportPageHero
        icon={Scale}
        eyebrow="Información legal"
        title="Términos y condiciones"
        description="Las pautas que ayudan a que cada cita se coordine con claridad, respeto y cuidado mutuo."
      />

      <section className="bg-background py-16 lg:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
            <SupportSidebar items={sidebarItems} title="Temas" />
            <div>
              <p className="text-sm text-muted-taupe">Última actualización: 12 de julio de 2026</p>
              {terms.map((term, index) => {
                const Icon = term.icon;

                return (
                  <section key={term.id} id={term.id} className="scroll-mt-28 border-t border-champagne-gold/18 py-10 lg:py-12">
                    <div className="flex items-start gap-4">
                      <Icon className="mt-2 shrink-0 text-champagne-gold" size={19} aria-hidden />
                      <div>
                        <p className="text-eyebrow uppercase tracking-[0.24em] text-rose-pink">0{index + 1}</p>
                        <h2 className="mt-2 font-serif text-4xl leading-tight text-champagne-gold sm:text-5xl">{term.title}</h2>
                        <p className="mt-5 max-w-3xl text-copy text-muted-taupe">{term.content}</p>
                      </div>
                    </div>
                  </section>
                );
              })}
              <div className="border-t border-champagne-gold/18 pt-10">
                <p className="font-serif text-3xl text-warm-cream">¿Necesitas aclarar algo antes de reservar?</p>
                <Button href={whatsapp.url} icon={<MessageCircle size={18} />} className="mt-6">Hablar con Leidania</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
