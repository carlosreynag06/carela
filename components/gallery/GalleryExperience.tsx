"use client";

import Image from "next/image";
import {
  ArrowDown,
  ChevronDown,
  Eye,
  Flower2,
  HandHeart,
  MessageCircle,
  Pin,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { DecorativeDivider } from "@/components/DecorativeDivider";
import { Reveal } from "@/components/Reveal";
import {
  galleryServiceInfo,
  galleryServiceOrder,
  sortGalleryItems,
  type GalleryItem,
  type GalleryServiceKey,
} from "@/data/gallery";
import { whatsapp } from "@/lib/site";

const batchSize = 8;

const serviceIcons = {
  masajes: HandHeart,
  cejas: Eye,
  pestanas: Sparkles,
  depilacion: Flower2,
} as const;

export function GalleryExperience({ items }: { items: GalleryItem[] }) {
  const [activeService, setActiveService] =
    useState<GalleryServiceKey>("masajes");
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({});
  const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const sections = galleryServiceOrder
      .map((service) => document.getElementById(`galeria-${service}`))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const service = visible?.target.getAttribute(
          "data-gallery-service",
        ) as GalleryServiceKey | null;

        if (service) setActiveService(service);
      },
      { rootMargin: "-24% 0px -56% 0px", threshold: [0.05, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = previewItem ? "hidden" : "";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setPreviewItem(null);
    }

    if (previewItem) window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [previewItem]);

  function scrollToService(service: GalleryServiceKey) {
    setActiveService(service);
    document
      .getElementById(`galeria-${service}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${service}`);
  }

  function revealMore(service: GalleryServiceKey) {
    setVisibleCounts((counts) => ({
      ...counts,
      [service]: (counts[service] ?? batchSize) + batchSize,
    }));
  }

  return (
    <>
      <GalleryHero />

      <div className="sticky top-20 z-30 border-y border-champagne-gold/14 bg-background/92 py-3 shadow-[0_16px_45px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:py-4">
        <Container>
          <nav
            aria-label="Ir a la galería de cada servicio"
            className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] md:justify-center [&::-webkit-scrollbar]:hidden"
          >
            {galleryServiceOrder.map((service) => {
              const info = galleryServiceInfo[service];
              const Icon = serviceIcons[service];
              const active = activeService === service;

              return (
                <button
                  key={service}
                  type="button"
                  onClick={() => scrollToService(service)}
                  aria-current={active ? "location" : undefined}
                  className={`group flex min-h-12 shrink-0 items-center gap-2.5 border px-4 text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-soft-gold sm:px-5 ${
                    active
                      ? "border-champagne-gold bg-champagne-gold text-background shadow-[0_12px_30px_rgba(217,168,78,0.2)]"
                      : "border-champagne-gold/20 bg-warm-charcoal/55 text-warm-cream/72 hover:border-champagne-gold/55 hover:text-warm-cream"
                  }`}
                >
                  <Icon size={17} aria-hidden="true" />
                  <span>{info.shortTitle}</span>
                </button>
              );
            })}
          </nav>
        </Container>
      </div>

      <div className="bg-background">
        {galleryServiceOrder.map((service, index) => (
          <ServiceGallerySection
            key={service}
            service={service}
            index={index}
            visibleCounts={visibleCounts}
            onMore={revealMore}
            onPreview={setPreviewItem}
            items={items}
          />
        ))}
      </div>

      <GalleryCTA />

      {previewItem ? (
        <MediaPreview item={previewItem} onClose={() => setPreviewItem(null)} />
      ) : null}
    </>
  );
}

function GalleryHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-champagne-gold/14 bg-background pt-20">
      <div className="absolute left-0 top-20 h-72 w-72 bg-[radial-gradient(circle,rgba(143,31,84,0.2),transparent_68%)]" />
      <Container className="relative grid min-h-[72svh] items-center gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-20">
        <Reveal>
          <div className="max-w-3xl">
            <DecorativeDivider />
            <p className="mt-8 text-eyebrow uppercase tracking-[0.3em] text-rose-pink">
              Galería CARELA
            </p>
            <h1 className="mt-4 font-serif text-display text-champagne-gold text-balance">
              Cuidado que también se puede ver
            </h1>
            <p className="mt-7 max-w-2xl text-lead text-warm-cream/82">
              Explora momentos, detalles y resultados de cada experiencia.
              Todo está organizado por servicio para que encuentres inspiración
              con calma.
            </p>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("galeria-masajes")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-8 inline-flex min-h-12 items-center gap-3 border-b border-champagne-gold/60 text-sm font-bold text-warm-cream transition hover:border-soft-gold hover:text-soft-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soft-gold"
            >
              Explorar la galería
              <ArrowDown size={17} aria-hidden="true" />
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative mx-auto grid w-full max-w-3xl grid-cols-[1.08fr_0.92fr] gap-3 sm:gap-4">
            <div className="relative aspect-[4/5] overflow-hidden border border-champagne-gold/20 shadow-premium">
              <Image
                src="/images/service-page-masajes.webp"
                alt="Experiencia de masaje CARELA"
                fill
                priority
                sizes="(min-width: 1024px) 32vw, 55vw"
                className="object-cover transition duration-700 hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/48 via-transparent to-transparent" />
            </div>
            <div className="grid gap-3 pt-8 sm:gap-4 sm:pt-12">
              <div className="relative aspect-square overflow-hidden border border-champagne-gold/20">
                <Image
                  src="/images/service-page-cejas.webp"
                  alt="Detalle de tintado de cejas CARELA"
                  fill
                  priority
                  sizes="(min-width: 1024px) 24vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[5/4] overflow-hidden border border-champagne-gold/20">
                <Image
                  src="/images/service-page-pestanas.webp"
                  alt="Postura de pestañas CARELA"
                  fill
                  priority
                  sizes="(min-width: 1024px) 24vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-5 left-[42%] border border-champagne-gold/24 bg-warm-charcoal/96 px-5 py-3 shadow-premium backdrop-blur sm:px-6">
              <p className="text-[0.64rem] font-bold uppercase tracking-[0.24em] text-rose-pink">
                Cuatro servicios
              </p>
              <p className="mt-1 font-serif text-xl text-warm-cream sm:text-2xl">
                Una misma intención
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function ServiceGallerySection({
  service,
  index,
  visibleCounts,
  onMore,
  onPreview,
  items: allItems,
}: {
  service: GalleryServiceKey;
  index: number;
  visibleCounts: Record<string, number>;
  onMore: (service: GalleryServiceKey) => void;
  onPreview: (item: GalleryItem) => void;
  items: GalleryItem[];
}) {
  const info = galleryServiceInfo[service];
  const Icon = serviceIcons[service];
  const serviceItems = useMemo(
    () =>
      sortGalleryItems(
        allItems.filter((item) => item.service === service),
      ),
    [allItems, service],
  );

  return (
    <section
      id={`galeria-${service}`}
      data-gallery-service={service}
      className={`scroll-mt-36 border-b border-champagne-gold/12 py-20 lg:py-28 ${
        index % 2 === 1 ? "bg-warm-charcoal/42" : "bg-background"
      }`}
    >
      <Container>
        <Reveal>
          <div className="grid gap-6 border-b border-champagne-gold/16 pb-10 lg:grid-cols-[auto_1fr_0.7fr] lg:items-end lg:gap-8">
            <span className="flex size-13 items-center justify-center border border-champagne-gold/32 bg-champagne-gold/8 text-champagne-gold">
              <Icon size={22} aria-hidden="true" />
            </span>
            <div>
              <p className="text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                Servicio 0{index + 1}
              </p>
              <h2 className="mt-3 max-w-4xl font-serif text-section-title text-champagne-gold text-balance">
                {info.title}
              </h2>
            </div>
            <p className="max-w-xl text-copy text-muted-taupe lg:justify-self-end">
              {info.description}
            </p>
          </div>
        </Reveal>

        <MediaSubsection
          service={service}
          items={serviceItems}
          visibleCount={visibleCounts[service] ?? batchSize}
          onMore={onMore}
          onPreview={onPreview}
        />
      </Container>
    </section>
  );
}

function MediaSubsection({
  service,
  items,
  visibleCount,
  onMore,
  onPreview,
}: {
  service: GalleryServiceKey;
  items: GalleryItem[];
  visibleCount: number;
  onMore: (service: GalleryServiceKey) => void;
  onPreview: (item: GalleryItem) => void;
}) {
  const visibleItems = items.slice(0, visibleCount);
  const remaining = items.length - visibleItems.length;

  return (
    <div className="pt-12 lg:pt-16">
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 min-[520px]:grid-cols-2 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-10">
        {visibleItems.map((item, itemIndex) => (
          <Reveal key={item.id} delay={Math.min(itemIndex % 4, 3) * 0.035}>
            <ImageCard item={item} onPreview={onPreview} />
          </Reveal>
        ))}
      </div>

      {!items.length ? (
        <div className="flex min-h-56 flex-col items-center justify-center border border-champagne-gold/14 bg-warm-charcoal/34 px-6 text-center">
          <p className="font-serif text-2xl text-warm-cream">
            Nuevos resultados próximamente
          </p>
          <p className="mt-3 max-w-lg text-sm leading-6 text-muted-taupe">
            Estamos preparando las fotos de este servicio para compartirlas contigo.
          </p>
        </div>
      ) : null}

      {remaining > 0 ? (
        <div className="mt-10 flex justify-center lg:mt-12">
          <button
            type="button"
            onClick={() => onMore(service)}
            className="inline-flex min-h-12 items-center gap-2 border border-champagne-gold/32 px-6 text-sm font-bold text-champagne-gold transition hover:border-champagne-gold hover:bg-champagne-gold/10 hover:text-soft-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soft-gold"
          >
            Ver más
            <ChevronDown size={17} aria-hidden="true" />
            <span className="sr-only">
              fotos de {galleryServiceInfo[service].title}
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
}

function ImageCard({
  item,
  onPreview,
}: {
  item: GalleryItem;
  onPreview: (item: GalleryItem) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onPreview(item)}
      aria-label={`Ampliar foto: ${item.title}`}
      className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soft-gold"
    >
      <span className="relative block aspect-[4/5] overflow-hidden border border-champagne-gold/16 bg-warm-charcoal shadow-premium">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          loading="lazy"
          sizes="(min-width: 1024px) 24vw, (min-width: 520px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-background/72 via-transparent to-transparent opacity-80 transition group-hover:opacity-60" />
        {item.isPinned ? <PinnedBadge /> : null}
        <span className="absolute bottom-4 left-4 right-4 font-serif text-xl leading-tight text-warm-cream">
          {item.title}
        </span>
      </span>
    </button>
  );
}

function PinnedBadge() {
  return (
    <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 bg-champagne-gold px-2.5 py-1.5 text-[0.58rem] font-extrabold uppercase tracking-[0.16em] text-background">
      <Pin size={11} fill="currentColor" aria-hidden="true" />
      Anclado
    </span>
  );
}

function MediaPreview({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/92 p-4 backdrop-blur-md sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-preview-title"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="w-full max-w-5xl border border-champagne-gold/22 bg-warm-charcoal shadow-[0_40px_120px_rgba(0,0,0,0.72)]">
        <div className="flex items-center justify-between border-b border-champagne-gold/14 px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-rose-pink">
              Foto CARELA
            </p>
            <h2
              id="gallery-preview-title"
              className="truncate font-serif text-xl text-warm-cream sm:text-2xl"
            >
              {item.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-11 shrink-0 items-center justify-center text-muted-taupe transition hover:bg-white/5 hover:text-warm-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-soft-gold"
            aria-label="Cerrar vista previa"
          >
            <X size={20} />
          </button>
        </div>
        <div className="relative max-h-[74vh] min-h-[60vh]">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 900px, 94vw"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

function GalleryCTA() {
  return (
    <section className="relative overflow-hidden border-b border-champagne-gold/14 bg-warm-charcoal py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_50%,rgba(143,31,84,0.24),transparent_30%)]" />
      <Container className="relative">
        <Reveal>
          <div className="grid gap-8 border border-champagne-gold/22 bg-background/46 p-7 shadow-premium sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
            <div>
              <p className="text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
                Tu experiencia CARELA
              </p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-champagne-gold sm:text-5xl">
                ¿Viste un resultado que te inspira?
              </h2>
              <p className="mt-4 max-w-2xl text-copy text-muted-taupe">
                Escríbele a Leidania y cuéntale qué servicio te interesa. Ella te
                orientará personalmente antes de reservar.
              </p>
            </div>
            <Button href={whatsapp.url} icon={<MessageCircle size={18} />} size="lg">
              Consultar por WhatsApp
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
