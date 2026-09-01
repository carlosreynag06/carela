import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no está disponible en CARELA.",
  alternates: {},
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[75svh] items-center bg-background pb-20 pt-36 text-center">
      <Container>
        <p className="text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
          Error 404
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl font-serif text-display text-champagne-gold text-balance">
          Esta página no está disponible
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-copy text-muted-taupe">
          El enlace pudo cambiar o la página ya no existe. Puedes volver al inicio
          o explorar los servicios de CARELA.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/">Volver al inicio</Button>
          <Button href="/servicios" variant="secondary">
            Ver servicios
          </Button>
        </div>
      </Container>
    </section>
  );
}
