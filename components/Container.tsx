import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
};

const sizeClasses = {
  default: "max-w-[var(--max-site-width)]",
  narrow: "max-w-4xl",
  wide: "max-w-[var(--site-shell-max-width)]",
};

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div className={cn("mx-auto w-[var(--site-shell-width)]", sizeClasses[size], className)}>
      {children}
    </div>
  );
}
