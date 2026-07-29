import { WhatsAppMark } from "@/components/brand/WhatsAppMark";
import { whatsapp } from "@/lib/site";

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsapp.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Escribir a CARELA por WhatsApp al ${whatsapp.label}`}
      title={`WhatsApp ${whatsapp.label}`}
      className="group fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 flex min-h-16 max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full border border-[#25d366]/40 bg-[#0b1510]/95 py-2 pl-2 pr-5 text-left shadow-[0_18px_60px_rgba(37,211,102,0.24)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#25d366]/75 hover:bg-[#102018] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#72e59d] sm:bottom-6 sm:right-6"
    >
      <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-[#25d366] text-[#07120b] shadow-[0_8px_24px_rgba(37,211,102,0.28)] transition duration-300 group-hover:scale-105">
        <span
          className="carela-whatsapp-pulse pointer-events-none absolute -inset-1 rounded-full border border-[#72e59d]/80"
          aria-hidden="true"
        />
        <WhatsAppMark size={25} />
      </span>

      <span className="min-w-0">
        <span className="block text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#8be9ad]">
          WhatsApp
        </span>
        <span className="mt-0.5 block whitespace-nowrap text-sm font-extrabold text-warm-cream">
          {whatsapp.label}
        </span>
      </span>
    </a>
  );
}
