import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ImageFrameProps = {
  children: ReactNode;
  className?: string;
  priority?: "normal" | "feature";
};

export function ImageFrame({
  children,
  className,
  priority = "normal",
}: ImageFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-champagne-gold/20 bg-warm-charcoal shadow-premium",
        priority === "feature" && "min-h-[420px]",
        className,
      )}
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/35 via-transparent to-transparent" />
      {children}
    </div>
  );
}
