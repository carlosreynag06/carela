import { MessageCircle } from "lucide-react";
import { Button } from "@/components/Button";
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
    <Button
      href={whatsapp.url}
      icon={<MessageCircle size={compact ? 16 : 18} />}
      size={compact ? "sm" : "md"}
    >
      {compact ? "WhatsApp" : label}
    </Button>
  );
}
