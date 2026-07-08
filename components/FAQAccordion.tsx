import { ChevronDown } from "lucide-react";

export type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FAQItem[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="border-t border-champagne-gold/22">
      {items.map((item, index) => {
        return (
          <details
            key={item.question}
            className="group border-b border-champagne-gold/22"
            open={index === 0}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left transition-colors hover:text-soft-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-soft-gold sm:py-7 [&::-webkit-details-marker]:hidden">
              <span className="font-serif text-xl leading-snug text-warm-cream sm:text-2xl">
                {item.question}
              </span>
              <span
                className="flex size-10 shrink-0 items-center justify-center border border-champagne-gold/28 text-champagne-gold transition duration-300 group-open:border-champagne-gold group-open:bg-champagne-gold group-open:text-background"
                aria-hidden="true"
              >
                <ChevronDown
                  size={20}
                  className="transition-transform duration-300 group-open:rotate-180"
                />
              </span>
            </summary>

            <p className="max-w-2xl pb-7 pr-14 text-copy text-muted-taupe">
              {item.answer}
            </p>
          </details>
        );
      })}
    </div>
  );
}
