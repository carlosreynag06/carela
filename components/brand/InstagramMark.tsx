import { cn } from "@/lib/utils";

type InstagramMarkProps = {
  className?: string;
  size?: number;
};

export function InstagramMark({
  className,
  size = 20,
}: InstagramMarkProps) {
  const lineWidth = Math.max(1.5, size * 0.09);

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 border-solid border-current",
        className,
      )}
      style={{
        width: size,
        height: size,
        borderWidth: lineWidth,
        borderRadius: size * 0.28,
      }}
      aria-hidden="true"
    >
      <span
        className="absolute left-1/2 top-1/2 rounded-full border-solid border-current"
        style={{
          width: size * 0.42,
          height: size * 0.42,
          borderWidth: lineWidth,
          transform: "translate(-50%, -50%)",
        }}
      />
      <span
        className="absolute rounded-full bg-current"
        style={{
          width: size * 0.11,
          height: size * 0.11,
          right: size * 0.17,
          top: size * 0.17,
        }}
      />
    </span>
  );
}
