import { useState } from "react";
import { faqData } from "../data/FaqData";
import FAQItem from "./FaqItem";

export default function FAQSection({
  className = "bg-background py-6 md:py-8 grid-bg",
  onBookClick,
}) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className={className}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid gap-6 md:grid-cols-[1fr,1.4fr] items-stretch">
          <div className="flex flex-col md:sticky md:top-24 md:h-full md:justify-center">
            <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.35em] text-primary">
              FAQ
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-dark tracking-tight text-left">
              Frequently Asked Questions
            </h2>
            <h3 className="text-dark/70 mt-1">
              If You have any other questions, please contact us
            </h3>
            <div className="mt-4">
              <button
                onClick={onBookClick}
                className="group relative inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-white shadow-[0_18px_40px_rgba(122,30,45,0.28)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 rounded-full bg-white/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative">Book a call</span>
                <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {faqData.map((faq, index) => {
              const isBookingAction = faq.action === "booking";
              return (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={!isBookingAction && openIndex === index}
                  isAction={isBookingAction}
                  onToggle={() => {
                    if (isBookingAction) {
                      onBookClick?.();
                      return;
                    }
                    setOpenIndex(openIndex === index ? null : index);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
