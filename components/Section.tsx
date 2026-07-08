import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
  spacing?: "sm" | "md" | "lg" | "none";
  tone?: "black" | "charcoal" | "transparent";
};

const spacingClasses = {
  none: "",
  sm: "py-section-sm",
  md: "py-section-md",
  lg: "py-section-lg",
};

const toneClasses = {
  black: "bg-background",
  charcoal: "bg-warm-charcoal",
  transparent: "bg-transparent",
};

export function Section({
  as: Component = "section",
  children,
  className,
  id,
  spacing = "md",
  tone = "black",
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn("relative overflow-hidden", spacingClasses[spacing], toneClasses[tone], className)}
    >
      {children}
    </Component>
  );
}
