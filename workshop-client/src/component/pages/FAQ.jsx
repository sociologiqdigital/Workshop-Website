import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Plus, Minus } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "What makes this program different from other business courses?",
    answer:
      "Unlike generic courses, we provide a hands-on 'Kickstarter' approach. You don't just learn theory; you build your digital structure, niche, and branding live over 4 weeks with direct guidance.",
  },
  {
    id: 2,
    question: "Do I need any technical skills to start?",
    answer:
      "Not at all. We walk you through every tool—from Canva for design to setting up your Instagram automation. If you can use a smartphone, you can build this business.",
  },
  {
    id: 3,
    question: "How does the 1:1 strategy call work?",
    answer:
      "For the first 10 signups, we schedule a private session to audit your specific business idea, refine your monetization strategy, and clear any roadblocks personalized to your goals.",
  },
  {
    id: 4,
    question: "What is the daily time commitment required?",
    answer:
      "We recommend at least 60-90 minutes a day. This includes attending or watching the session recordings and implementing the daily action steps.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    const scrollAmount = 400;
    if (direction === "left") {
      current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setActiveIndex(Math.max(0, activeIndex - 1));
    } else {
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setActiveIndex(Math.min(faqs.length - 1, activeIndex + 1));
    }
  };

  return (
    <section className="py-24 bg-[rgb(var(--color-background))] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Header with Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-5xl md:text-7xlfont-bold text-primary leading-tight">
              Frequently <br />
              <span className="italic text-wine">
                Asked Questions
              </span>
            </h2>
          </div>

          <div className="space-y-6 text-right">
            <p className="text-muted max-w-[300px] text-sm leading-relaxed ml-auto">
              Find answers to common questions about our workshop process,
              curriculum, and requirements.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => scroll("left")}
                className="p-4 rounded-full border border-primary/20 hover:bg-white transition-all shadow-sm group"
              >
                <ArrowLeft
                  size={20}
                  className="text-[rgb(var(--color-primary))]"
                />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-4 rounded-full bg-[rgb(var(--color-primary))] text-white hover:bg-[rgb(var(--color-wine))] transition-all shadow-lg"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrollable Cards */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-12 no-scrollbar snap-x snap-mandatory"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              whileHover={{ y: -10 }}
              onClick={() => setActiveIndex(index)}
              className={`flex-shrink-0 w-[350px] md:w-[450px] h-[480px] p-10 rounded-[2.5rem] transition-all duration-500 cursor-pointer snap-start flex flex-col justify-between ${
                activeIndex === index
                  ? "bg-[rgb(var(--color-primary))] text-white shadow-2xl shadow-[rgb(var(--color-primary))]/30"
                  : "bg-[rgb(var(--color-surface))] text-[rgb(var(--color-dark))] border border-[rgb(var(--color-accent))]/20 shadow-sm"
              }`}
            >
              <div className="space-y-6">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border ${
                    activeIndex === index
                      ? "border-white/40 bg-white/10"
                      : "border-[rgb(var(--color-accent))]"
                  }`}
                >
                  {activeIndex === index ? (
                    <Minus size={20} />
                  ) : (
                    <Plus
                      size={20}
                      className="text-[rgb(var(--color-primary))]"
                    />
                  )}
                </div>

                <h3
                  className={`text-2xl md:text-3xl font-bold leading-snug font-serif ${
                    activeIndex === index
                      ? "text-white"
                      : "text-[rgb(var(--color-dark))]"
                  }`}
                >
                  {faq.question}
                </h3>
              </div>

              <motion.p
                initial={false}
                animate={{ opacity: activeIndex === index ? 1 : 0.7 }}
                className={`text-lg leading-relaxed ${
                  activeIndex === index
                    ? "text-white/90"
                    : "text-[rgb(var(--color-muted))]"
                }`}
              >
                {faq.answer}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
