import Link from "next/link";
import { navItems } from "@/data/nav";
import { WhatsAppCTA } from "@/components/brand/WhatsAppCTA";

export function Footer() {
  return (
    <footer className="border-t border-champagne-gold/15 bg-warm-charcoal">
      <div className="mx-auto grid w-full max-w-[var(--max-site-width)] gap-8 px-6 py-12 sm:px-8 md:grid-cols-[1.2fr_1fr_auto]">
        <div>
          <p className="font-serif text-3xl tracking-[0.14em] text-champagne-gold">
            CARELA
          </p>
          <p className="mt-1 font-script text-2xl text-rose-pink">
            Beauty & Wellness
          </p>
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-taupe">
            Beauty · Wellness · Confidence
          </p>
        </div>

        <nav className="grid gap-3 text-sm text-muted-taupe">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-warm-cream"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-start">
          <WhatsAppCTA />
        </div>
      </div>
    </footer>
  );
}
