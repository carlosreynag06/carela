import type { Metadata } from "next";
import { Database, Eye, FileKey2, LockKeyhole, MessageCircle, ShieldCheck, UserRoundCheck } from "lucide-react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { SupportPageHero } from "@/components/SupportPageHero";
import { SupportSidebar, type SupportSidebarItem } from "@/components/SupportSidebar";
import { whatsapp } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidad | CARELA Beauty & Wellness",
  description:
    "Cómo CARELA Beauty & Wellness trata la información compartida a través de su sitio y WhatsApp.",
};

const policySections = [
  {
    id: "datos",
    title: "Información que puedes compartir",
    icon: Database,
    content:
      "Cuando nos escribes o reservas, puedes compartir tu nombre, número de teléfono, servicio de interés, horario preferido, zona y detalles relevantes para tu atención. Solo se solicita información necesaria para responderte y coordinar tu cita.",
  },
  {
    id: "uso",
    title: "Cómo usamos tu información",
    icon: Eye,
    content:
      "La información se utiliza para responder consultas, confirmar reservas, adaptar el servicio, coordinar citas a domicilio cuando aplique y mantener una comunicación clara contigo. CARELA no usa tu información para fines ajenos a esta relación de servicio.",
  },
  {
    id: "whatsapp",
    title: "WhatsApp y servicios externos",
    icon: MessageCircle,
    content:
      "Las conversaciones de reserva se realizan mediante WhatsApp, una plataforma de terceros con sus propias políticas de privacidad. Al escribir por ese canal, también aplican las condiciones de WhatsApp.",
  },
  {
    id: "proteccion",
    title: "Protección y acceso",
    icon: LockKeyhole,
    content:
      "CARELA procura manejar la información con cuidado y limitar el acceso a lo necesario para atenderte. Ningún método de transmisión o almacenamiento digital es completamente infalible, pero se aplican prácticas razonables de protección.",
  },
  {
    id: "derechos",
    title: "Tus decisiones y derechos",
    icon: UserRoundCheck,
    content:
      "Puedes solicitar actualizar, corregir o dejar de usar la información que compartiste para comunicaciones futuras, salvo la que CARELA deba conservar por motivos operativos o legales. Para ello, escríbenos por WhatsApp.",
  },
  {
    id: "cambios",
    title: "Cambios a esta política",
    icon: FileKey2,
    content:
      "Esta política puede actualizarse cuando cambien los procesos del sitio o de atención. La versión vigente siempre mostrará la fecha de su última actualización.",
  },
];

const sidebarItems: SupportSidebarItem[] = policySections.map(({ id, icon, title }) => ({
  href: `#${id}`,
  icon,
  label: title,
}));

export default function PoliticaPage() {
  return (
    <>
      <SupportPageHero
        icon={ShieldCheck}
        eyebrow="Información legal"
        title="Política de privacidad"
        description="Una explicación clara de cómo tratamos la información que compartes al contactar o reservar con CARELA."
      />

      <section className="bg-background py-16 lg:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
            <SupportSidebar items={sidebarItems} title="Categorías" />
            <div>
              <p className="text-sm text-muted-taupe">Última actualización: 12 de julio de 2026</p>
              {policySections.map((section, index) => {
                const Icon = section.icon;

                return (
                  <section key={section.id} id={section.id} className="scroll-mt-28 border-t border-champagne-gold/18 py-10 lg:py-12">
                    <div className="flex items-start gap-4">
                      <Icon className="mt-2 shrink-0 text-champagne-gold" size={19} aria-hidden />
                      <div>
                        <p className="text-eyebrow uppercase tracking-[0.24em] text-rose-pink">0{index + 1}</p>
                        <h2 className="mt-2 font-serif text-4xl leading-tight text-champagne-gold sm:text-5xl">{section.title}</h2>
                        <p className="mt-5 max-w-3xl text-copy text-muted-taupe">{section.content}</p>
                      </div>
                    </div>
                  </section>
                );
              })}
              <div className="border-t border-champagne-gold/18 pt-10">
                <p className="font-serif text-3xl text-warm-cream">¿Tienes preguntas sobre tu información?</p>
                <Button href={whatsapp.url} icon={<MessageCircle size={18} />} className="mt-6">Escribir por WhatsApp</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
