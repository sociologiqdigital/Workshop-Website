import { useState } from "react";
import { faqData } from "../data/FaqData";
import FAQItem from "./FaqItem";

export default function FAQSection({
  className = "bg-background py-14 md:py-16 grid-bg",
  onBookClick,
}) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className={className}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid gap-10 md:grid-cols-[1fr,1.4fr] items-start">
          <div className="md:sticky md:top-24">
            <h2 className="font-heading text-3xl md:text-4xl text-dark tracking-tight text-left">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
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
