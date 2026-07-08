import Link from "next/link";
import { navItems } from "@/data/nav";
import { WhatsAppCTA } from "@/components/brand/WhatsAppCTA";

export function Header() {
  return (
    <header className="border-b border-champagne-gold/15 bg-background/90">
      <div className="mx-auto flex h-20 w-full max-w-[var(--max-site-width)] items-center justify-between px-6 sm:px-8">
        <Link href="/" className="leading-none" aria-label="CARELA Inicio">
          <span className="block font-serif text-3xl tracking-[0.16em] text-champagne-gold">
            CARELA
          </span>
          <span className="block font-script text-xl text-rose-pink">
            Beauty & Wellness
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted-taupe lg:flex">
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

        <div className="hidden lg:block">
          <WhatsAppCTA compact />
        </div>

        <span className="text-sm uppercase tracking-[0.24em] text-muted-taupe lg:hidden">
          Menu
        </span>
      </div>
    </header>
  );
}
