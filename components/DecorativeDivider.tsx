import { cn } from "@/lib/utils";

type DecorativeDividerProps = {
  className?: string;
  align?: "left" | "center" | "right";
};

const alignClasses = {
  left: "mr-auto",
  center: "mx-auto",
  right: "ml-auto",
};

export function DecorativeDivider({
  align = "left",
  className,
}: DecorativeDividerProps) {
  return (
    <div
      className={cn(
        "flex w-28 items-center gap-2",
        alignClasses[align],
        className,
      )}
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-champagne-gold" />
      <span className="size-1.5 rotate-45 bg-rose-pink" />
      <span className="h-px w-8 bg-champagne-gold/45" />
    </div>
  );
}
