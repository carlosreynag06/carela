import Link from "next/link";
import { AtSign, MapPin, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/Button";
import { DecorativeDivider } from "@/components/DecorativeDivider";
import { navItems } from "@/data/nav";
import { services } from "@/data/services";
import { site, whatsapp } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-champagne-gold/15 bg-warm-charcoal">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne-gold/60 to-transparent" />
      <div className="absolute bottom-0 right-0 size-80 bg-[radial-gradient(circle,rgba(143,31,84,0.2),transparent_66%)]" />

      <div className="relative mx-auto grid w-[var(--site-shell-width)] max-w-[var(--max-site-width)] gap-10 py-14 lg:grid-cols-[1.3fr_0.8fr_1fr_1fr]">
        <div>
          <DecorativeDivider />
          <Link href="/" className="mt-6 block leading-none" aria-label="CARELA Inicio">
            <span className="block font-serif text-4xl tracking-[0.16em] text-champagne-gold">
              CARELA
            </span>
            <span className="block font-script text-3xl text-rose-pink">
              Beauty & Wellness
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-muted-taupe">
            Beauty / Wellness / Confidence
          </p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-muted-taupe">
            Realza tu belleza. Relajate. Brilla diferente.
          </p>
          <div className="mt-7">
            <Button
              href={whatsapp.url}
              icon={<MessageCircle size={18} />}
              variant="primary"
            >
              Reservar por WhatsApp
            </Button>
          </div>
        </div>

        <FooterColumn title="Navegacion">
          {navItems.map((item) => (
            <FooterLink key={item.href} href={item.href}>
              {item.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Servicios">
          {services.map((service) => (
            <FooterLink key={service.slug} href="/servicios">
              {service.title}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Contacto">
          <FooterExternalLink
            href={whatsapp.url}
            icon={<MessageCircle size={16} aria-hidden="true" />}
          >
            WhatsApp: {whatsapp.label}
          </FooterExternalLink>
          <FooterExternalLink
            href="https://www.instagram.com/carela_b.w"
            icon={<AtSign size={16} aria-hidden="true" />}
          >
            Instagram: {site.instagram}
          </FooterExternalLink>
          <p className="flex items-start gap-2 text-sm leading-6 text-muted-taupe">
            <MapPin
              className="mt-1 shrink-0 text-champagne-gold"
              size={16}
              aria-hidden="true"
            />
            Puerto Plata, RD
          </p>
        </FooterColumn>
      </div>

      <div className="relative border-t border-champagne-gold/12 py-5">
        <div className="mx-auto flex w-[var(--site-shell-width)] max-w-[var(--max-site-width)] flex-col gap-2 text-xs text-muted-taupe sm:flex-row sm:items-center sm:justify-between">
          <p>{site.name}</p>
          <p>Atencion personalizada por {site.owner}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div>
      <h2 className="text-eyebrow font-semibold uppercase tracking-[0.28em] text-champagne-gold">
        {title}
      </h2>
      <div className="mt-5 h-px w-10 bg-rose-pink/70" />
      <div className="mt-5 grid gap-3">{children}</div>
    </div>
  );
}

function FooterLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="text-sm leading-6 text-warm-cream/72 transition hover:text-soft-gold"
    >
      {children}
    </Link>
  );
}

function FooterExternalLink({
  children,
  href,
  icon,
}: {
  children: ReactNode;
  href: string;
  icon: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-start gap-2 text-sm leading-6 text-muted-taupe transition hover:text-warm-cream"
    >
      <span className="mt-1 shrink-0 text-champagne-gold">{icon}</span>
      <span>{children}</span>
    </a>
  );
}
