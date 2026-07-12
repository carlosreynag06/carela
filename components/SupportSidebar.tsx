import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export type SupportSidebarItem = {
  href: string;
  icon: LucideIcon;
  label: string;
};

export function SupportSidebar({
  items,
  title = "En esta página",
}: {
  items: SupportSidebarItem[];
  title?: string;
}) {
  return (
    <aside className="lg:sticky lg:top-28">
      <p className="text-eyebrow uppercase tracking-[0.26em] text-rose-pink">
        {title}
      </p>
      <nav className="mt-5 border-y border-champagne-gold/18" aria-label={title}>
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 border-b border-champagne-gold/14 py-4 text-sm text-muted-taupe transition last:border-b-0 hover:text-warm-cream"
            >
              <Icon size={16} className="shrink-0 text-champagne-gold" aria-hidden />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
