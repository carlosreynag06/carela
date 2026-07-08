import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PremiumCardProps = {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
};

export function PremiumCard({
  children,
  className,
  interactive = false,
}: PremiumCardProps) {
  return (
    <div
      className={cn(
        "border border-champagne-gold/18 bg-warm-charcoal/78 p-6 shadow-premium backdrop-blur",
        interactive &&
          "transition duration-300 hover:-translate-y-1 hover:border-champagne-gold/45 hover:bg-warm-charcoal",
        className,
      )}
    >
      {children}
    </div>
  );
}
