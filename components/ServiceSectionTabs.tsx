"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { services, type Service } from "@/data/services";
import { cn } from "@/lib/utils";

export function ServiceSectionTabs() {
  const [activeSlug, setActiveSlug] = useState<Service["slug"]>("masajes");

  useEffect(() => {
    const sections = services
      .map((service) => document.getElementById(service.slug))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);

        if (visibleSection) {
          setActiveSlug(visibleSection.target.id as Service["slug"]);
        }
      },
      { rootMargin: "-24% 0px -64% 0px" },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Seleccionar servicio"
      className="grid gap-2 rounded-full border border-champagne-gold/18 bg-background/65 p-2 shadow-premium md:grid-cols-4"
    >
      {services.map((service, index) => {
        const Icon = service.icon;
        const active = service.slug === activeSlug;

        return (
          <Link
            key={service.slug}
            href={`#${service.slug}`}
            onClick={() => setActiveSlug(service.slug)}
            aria-current={active ? "true" : undefined}
            className={cn(
              "relative isolate flex min-h-14 items-center justify-center gap-3 rounded-full px-4 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soft-gold",
              active
                ? "text-background"
                : "text-warm-cream/68 hover:bg-champagne-gold/8 hover:text-warm-cream",
            )}
          >
            {active ? (
              <motion.span
                layoutId="services-active-tab"
                className="absolute inset-0 -z-10 rounded-full bg-champagne-gold"
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : null}
            <span className={active ? "text-background/65" : "text-champagne-gold/55"}>
              0{index + 1}
            </span>
            <Icon size={17} aria-hidden />
            <span>{service.shortTitle}</span>
          </Link>
        );
      })}
    </nav>
  );
}
