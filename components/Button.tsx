import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "rose";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  size?: ButtonSize;
  target?: string;
  variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-champagne-gold/50 bg-champagne-gold text-background hover:border-soft-gold hover:bg-soft-gold",
  secondary:
    "border-champagne-gold/35 bg-transparent text-warm-cream hover:border-champagne-gold hover:bg-champagne-gold/10",
  ghost:
    "border-transparent bg-transparent text-muted-taupe hover:text-warm-cream",
  rose: "border-rose-pink/45 bg-rose-pink text-warm-cream hover:border-soft-gold hover:bg-deep-magenta",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 py-2 text-xs",
  md: "min-h-12 px-5 py-3 text-sm",
  lg: "min-h-14 px-7 py-4 text-base",
};

export function Button({
  children,
  className,
  href,
  icon,
  iconPosition = "left",
  size = "md",
  target,
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 border font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soft-gold disabled:pointer-events-none disabled:opacity-55",
    sizeClasses[size],
    variantClasses[variant],
    className,
  );
  const content = (
    <>
      {icon && iconPosition === "left" ? (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
      {icon && iconPosition === "right" ? (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      ) : null}
    </>
  );

  if (href) {
    const external = target === "_blank" || href.startsWith("http");

    if (external) {
      return (
        <a
          className={classes}
          href={href}
          target={target ?? "_blank"}
          rel="noreferrer"
        >
          {content}
        </a>
      );
    }

    return (
      <Link className={classes} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {content}
    </button>
  );
}
