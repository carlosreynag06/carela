import { MessageCircle } from "lucide-react";
import { whatsapp } from "@/lib/site";

type WhatsAppCTAProps = {
  compact?: boolean;
  label?: string;
};

export function WhatsAppCTA({
  compact = false,
  label = "Reservar por WhatsApp",
}: WhatsAppCTAProps) {
  return (
    <a
      href={whatsapp.url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center gap-2 border border-champagne-gold/45 bg-champagne-gold px-5 py-3 text-sm font-semibold text-background transition hover:border-soft-gold hover:bg-soft-gold"
    >
      <MessageCircle aria-hidden="true" size={compact ? 16 : 18} />
      <span>{compact ? "WhatsApp" : label}</span>
    </a>
  );
}
