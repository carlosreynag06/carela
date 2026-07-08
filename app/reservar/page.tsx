import { WhatsAppCTA } from "@/components/brand/WhatsAppCTA";
import { ImagePlaceholder } from "@/components/brand/ImagePlaceholder";

export default function ReservarPage() {
  return (
    <section className="mx-auto grid min-h-[68vh] w-[var(--site-shell-width)] max-w-[var(--max-site-width)] content-center gap-8 py-24 lg:grid-cols-[1fr_380px]">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-rose-pink">
          Fase 17
        </p>
        <h1 className="mt-4 font-serif text-5xl text-champagne-gold">
          Reservar
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-taupe">
          Ruta preparada para una experiencia de reserva enfocada en WhatsApp.
        </p>
        <div className="mt-7">
          <WhatsAppCTA />
        </div>
      </div>
      <ImagePlaceholder label="Reserva" description="Imagen pendiente" />
    </section>
  );
}
