import { ImagePlaceholder } from "@/components/brand/ImagePlaceholder";

export default function GaleriaPage() {
  return (
    <section className="mx-auto grid min-h-[68vh] w-full max-w-[var(--max-site-width)] content-center gap-8 px-6 py-24 sm:px-8 lg:grid-cols-[1fr_380px]">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-rose-pink">
          Fase 16
        </p>
        <h1 className="mt-4 font-serif text-5xl text-champagne-gold">
          Galeria
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-taupe">
          Ruta preparada para la galeria filtrable. Las imagenes se generaran o
          reemplazaran segun cada fase.
        </p>
      </div>
      <ImagePlaceholder label="Galeria" description="Imagen pendiente" />
    </section>
  );
}
