import { useState } from "react";
import { faqData } from "../data/FaqData";
import FAQItem from "./FaqItem";

export default function FAQSection({ className = "bg-background py-20 md:py-24" }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className={className}>
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-heading text-3xl md:text-4xl text-dark mb-12 text-center">
          Frequently Asked Questions
        </h2>

        {faqData.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
}
