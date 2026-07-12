import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/Container";
import { DecorativeDivider } from "@/components/DecorativeDivider";

type SupportPageHeroProps = {
  description: string;
  eyebrow: string;
  icon: LucideIcon;
  title: string;
};

export function SupportPageHero({
  description,
  eyebrow,
  icon: Icon,
  title,
}: SupportPageHeroProps) {
  return (
    <section className="relative min-h-[30svh] overflow-hidden border-b border-champagne-gold/15 bg-warm-charcoal pb-12 pt-32 lg:pb-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_40%,rgba(143,31,84,0.22),transparent_28%),radial-gradient(circle_at_18%_90%,rgba(217,168,78,0.09),transparent_26%)]" />
      <Container className="relative">
        <div className="flex max-w-5xl items-start gap-5">
          <span className="mt-1 flex size-12 shrink-0 items-center justify-center border border-champagne-gold/32 text-champagne-gold sm:size-14">
            <Icon size={23} aria-hidden />
          </span>
          <div>
            <DecorativeDivider />
            <p className="mt-5 text-eyebrow uppercase tracking-[0.28em] text-rose-pink">
              {eyebrow}
            </p>
            <h1 className="mt-3 font-serif text-section-title text-champagne-gold text-balance">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-copy text-muted-taupe">
              {description}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
