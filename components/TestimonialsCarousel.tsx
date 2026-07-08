"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export type Testimonial = {
  name: string;
  initials: string;
  service: string;
  image: string;
  imageAlt: string;
  quote: string;
};

type TestimonialsCarouselProps = {
  testimonials: Testimonial[];
};

export function TestimonialsCarousel({
  testimonials,
}: TestimonialsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(true);

  const updateControls = useCallback(() => {
    const track = trackRef.current;

    if (!track) return;

    setCanScrollBack(track.scrollLeft > 8);
    setCanScrollForward(
      track.scrollLeft < track.scrollWidth - track.clientWidth - 8,
    );
  }, []);

  useEffect(() => {
    updateControls();
    window.addEventListener("resize", updateControls);

    return () => window.removeEventListener("resize", updateControls);
  }, [updateControls]);

  function scroll(direction: -1 | 1) {
    const track = trackRef.current;

    if (!track) return;

    const card = track.querySelector<HTMLElement>("[data-testimonial]");
    const distance = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: distance * direction, behavior: "smooth" });
  }

  return (
    <div className="relative mt-10">
      <div
        ref={trackRef}
        onScroll={updateControls}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.name}
            data-testimonial
            className="group flex min-w-0 shrink-0 basis-[86%] snap-start flex-col overflow-hidden border border-champagne-gold/16 bg-background/72 shadow-premium sm:basis-[62%] lg:basis-[calc((100%-3rem)/3)]"
          >
            <div className="flex min-h-28 items-center gap-4 px-5 py-5 sm:px-6">
              <span
                className="flex size-14 shrink-0 items-center justify-center border border-champagne-gold/38 bg-champagne-gold/10 font-serif text-lg text-champagne-gold"
                aria-hidden="true"
              >
                {testimonial.initials}
              </span>
              <div className="min-w-0">
                <h3 className="font-serif text-2xl leading-tight text-warm-cream">
                  {testimonial.name}
                </h3>
                <p className="mt-1.5 text-xs uppercase tracking-[0.16em] text-rose-pink">
                  {testimonial.service}
                </p>
              </div>
            </div>

            <div className="relative aspect-[1.38/1] overflow-hidden border-y border-champagne-gold/12">
              <Image
                src={testimonial.image}
                alt={testimonial.imageAlt}
                fill
                sizes="(min-width: 1024px) 29vw, (min-width: 640px) 58vw, 82vw"
                className="object-cover object-center transition duration-700 group-hover:scale-[1.025]"
              />
            </div>

            <div className="flex flex-1 flex-col px-5 py-6 sm:px-6">
              <div
                className="flex gap-1 text-champagne-gold"
                aria-label="5 de 5 estrellas"
              >
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    size={17}
                    fill="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="mt-4 font-serif text-lg leading-7 text-warm-cream/92">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scroll(-1)}
        disabled={!canScrollBack}
        aria-label="Ver testimonios anteriores"
        title="Testimonios anteriores"
        className="absolute left-0 top-1/2 z-10 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-champagne-gold/45 bg-warm-charcoal text-warm-cream shadow-lg transition hover:border-champagne-gold hover:bg-champagne-gold hover:text-background disabled:pointer-events-none disabled:opacity-35 max-sm:left-5 max-sm:translate-x-0"
      >
        <ArrowLeft size={22} aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={() => scroll(1)}
        disabled={!canScrollForward}
        aria-label="Ver más testimonios"
        title="Más testimonios"
        className="absolute right-0 top-1/2 z-10 flex size-14 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-champagne-gold bg-champagne-gold text-background shadow-lg transition hover:bg-soft-gold disabled:pointer-events-none disabled:opacity-35 max-sm:right-5 max-sm:translate-x-0"
      >
        <ArrowRight size={22} aria-hidden="true" />
      </button>
    </div>
  );
}
