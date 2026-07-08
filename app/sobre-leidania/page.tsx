import { ImagePlaceholder } from "@/components/brand/ImagePlaceholder";

export default function SobreLeidaniaPage() {
  return (
    <section className="mx-auto grid min-h-[68vh] w-full max-w-[var(--max-site-width)] content-center gap-8 px-6 py-24 sm:px-8 lg:grid-cols-[1fr_380px]">
      <div>
        <p className="text-sm uppercase tracking-[0.28em] text-rose-pink">
          Fase 14
        </p>
        <h1 className="mt-4 font-serif text-5xl text-champagne-gold">
          Sobre Leidania
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-taupe">
          Ruta preparada para presentar la marca personal de Leidania Carela sin
          usar retratos falsos.
        </p>
      </div>
      <ImagePlaceholder label="Sobre Leidania" description="Imagen pendiente" />
    </section>
  );
}
