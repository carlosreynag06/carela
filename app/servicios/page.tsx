import { ImagePlaceholder } from "@/components/brand/ImagePlaceholder";

export default function ServiciosPage() {
  return (
    <section className="mx-auto grid min-h-[68vh] w-[var(--site-shell-width)] max-w-[var(--max-site-width)] content-center gap-8 py-24 lg:grid-cols-[1fr_380px]">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-rose-pink">
          Fase 13
        </p>
        <h1 className="mt-4 font-serif text-5xl text-champagne-gold">
          Servicios
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-taupe">
          Ruta preparada para la pagina completa de servicios. Se construira
          cuando el flujo por fases llegue a este punto.
        </p>
      </div>
      <ImagePlaceholder label="Servicios" description="Imagen pendiente" />
    </section>
  );
}
