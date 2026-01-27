import { useState } from "react";
import { faqData } from "../data/FaqData";
import FAQItem from "./FaqItem";

export default function FAQSection({
  className = "bg-surface py-14 md:py-16",
  onBookClick,
}) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className={className} >
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-4xl text-dark mb-8 text-center tracking-tight">
          Frequently Asked Questions
        </h2>

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
    </section>
  );
}
