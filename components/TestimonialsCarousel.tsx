"use client";

import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
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
        {testimonials.map((testimonial, index) => (
          <article
            key={testimonial.name}
            data-testimonial
            className="group relative flex min-h-[32rem] min-w-0 shrink-0 basis-[86%] snap-start flex-col overflow-hidden border border-champagne-gold/18 bg-[linear-gradient(145deg,rgba(28,17,19,0.98),rgba(10,7,8,0.96))] shadow-premium transition duration-500 hover:-translate-y-1 hover:border-champagne-gold/42 sm:basis-[62%] lg:basis-[calc((100%-3rem)/3)]"
          >
            <div
              className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full border border-champagne-gold/10 transition duration-700 group-hover:scale-110 group-hover:border-champagne-gold/18"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute right-8 top-20 size-2 rotate-45 border border-rose-pink/55"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/80 to-transparent" />

            <div className="relative flex flex-1 flex-col p-6 sm:p-7">
              <div className="flex items-start justify-between gap-5">
                <p className="max-w-[78%] text-[0.68rem] font-bold uppercase leading-5 tracking-[0.18em] text-rose-pink">
                  {testimonial.service}
                </p>
                <span
                  className="font-serif text-4xl leading-none text-champagne-gold/24"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-10 flex size-12 items-center justify-center border border-champagne-gold/30 bg-champagne-gold/8 text-champagne-gold">
                <Quote size={20} strokeWidth={1.5} aria-hidden="true" />
              </div>

              <blockquote className="mt-7 font-serif text-[1.55rem] leading-[1.42] text-warm-cream/94 sm:text-[1.65rem]">
                {testimonial.quote}
              </blockquote>

              <footer className="mt-auto flex items-end justify-between gap-4 border-t border-champagne-gold/14 pt-6">
                <div className="flex min-w-0 items-center gap-3.5">
                  <span
                    className="flex size-12 shrink-0 items-center justify-center border border-champagne-gold/38 bg-champagne-gold/10 font-serif text-base text-champagne-gold"
                    aria-hidden="true"
                  >
                    {testimonial.initials}
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate font-serif text-xl text-warm-cream">
                      {testimonial.name}
                    </h3>
                    <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted-taupe">
                      Clienta CARELA
                    </p>
                  </div>
                </div>

                <div
                  className="mb-1 flex shrink-0 gap-0.5 text-champagne-gold"
                  aria-label="5 de 5 estrellas"
                >
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={12}
                      fill="currentColor"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </footer>
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
