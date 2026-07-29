import { MessageCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

type WhatsAppMarkProps = {
  className?: string;
  size?: number;
};

export function WhatsAppMark({
  className,
  size = 24,
}: WhatsAppMarkProps) {
  const phoneSize = Math.max(8, Math.round(size * 0.42));

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        className,
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <MessageCircle size={size} strokeWidth={1.9} />
      <Phone
        className="absolute"
        size={phoneSize}
        strokeWidth={2.5}
      />
    </span>
  );
}
