"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { WhatsAppCTA } from "@/components/brand/WhatsAppCTA";
import { navItems } from "@/data/nav";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition duration-300",
        scrolled || menuOpen
          ? "border-champagne-gold/18 bg-background/92 shadow-[0_18px_60px_rgba(5,3,4,0.42)] backdrop-blur-xl"
          : "border-champagne-gold/10 bg-background/62 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-20 w-[var(--site-shell-width)] max-w-[var(--max-site-width)] items-center justify-between">
        <Logo onClick={() => setMenuOpen(false)} />

        <nav
          className="hidden items-center gap-1 rounded-full border border-champagne-gold/12 bg-warm-charcoal/35 px-2 py-2 text-sm text-muted-taupe xl:flex"
          aria-label="Navegacion principal"
        >
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 transition duration-300 hover:text-warm-cream",
                  active
                    ? "bg-champagne-gold/12 text-warm-cream"
                    : "text-muted-taupe",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden xl:block">
          <WhatsAppCTA compact={false} />
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center border border-champagne-gold/28 text-champagne-gold transition hover:border-soft-gold hover:text-soft-gold xl:hidden"
          aria-label={menuOpen ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 top-20 h-[calc(100dvh-5rem)] origin-top overflow-y-auto border-t border-champagne-gold/12 bg-background/98 px-6 py-8 shadow-[0_24px_80px_rgba(5,3,4,0.6)] backdrop-blur-xl transition duration-300 xl:hidden",
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0",
        )}
      >
        <div className="mx-auto flex w-[var(--site-shell-width)] max-w-[var(--max-site-width)] flex-col">
          <p className="flex items-center gap-2 text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
            <Sparkles size={14} aria-hidden="true" />
            Beauty / Wellness / Confidence
          </p>

          <nav className="mt-8 grid gap-3" aria-label="Menu movil">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "border border-champagne-gold/12 px-5 py-4 font-serif text-3xl transition hover:border-champagne-gold/45 hover:text-warm-cream",
                    active
                      ? "bg-champagne-gold/10 text-warm-cream"
                      : "text-muted-taupe",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 grid gap-3 border-t border-champagne-gold/12 pt-6">
            <WhatsAppCTA />
            <Button href="/servicios" variant="secondary">
              Ver servicios
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      className="group leading-none"
      aria-label="CARELA Inicio"
      onClick={onClick}
    >
      <span className="block font-serif text-[1.72rem] tracking-[0.18em] text-champagne-gold transition group-hover:text-soft-gold sm:text-3xl">
        CARELA
      </span>
      <span className="block font-script text-xl text-rose-pink sm:text-2xl">
        Beauty & Wellness
      </span>
    </Link>
  );
}
