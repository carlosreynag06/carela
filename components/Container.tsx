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
  wide: "max-w-[1280px]",
};

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-6 sm:px-8", sizeClasses[size], className)}>
      {children}
    </div>
  );
}
