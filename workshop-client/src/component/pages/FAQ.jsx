import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const faqs = [
  {
    question: "What makes this program different from other business courses?",
    answer:
      "Unlike generic courses, we provide a hands-on 'Kickstarter' approach. You don't just learn theory - you build your digital structure, niche, and branding live over 4 weeks with direct guidance.",
  },
  {
    question: "Do I need any technical skills to start?",
    answer:
      "No technical background is required. The program is designed for beginners and non-tech founders, with step-by-step guidance throughout.",
  },
  {
    question: "How does the 1:1 strategy call work?",
    answer:
      "Each participant gets a personal strategy call focused on clarity, positioning, and next steps tailored to your business idea.",
  },
  {
    question: "Will I get recordings of the sessions?",
    answer:
      "Yes. All live sessions are recorded and shared so you can revisit the material anytime.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(1);

  const prev = () => setActiveIndex((i) => (i === 0 ? faqs.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === faqs.length - 1 ? 0 : i + 1));

  return (
    <section className="py-24 bg-[#F3EAFE] overflow-x-visible">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-16">
          <h2 className="font-heading text-5xl leading-tight text-dark">
            Frequently <br />
            <span className="text-primary">Asked Questions</span>
          </h2>

          <div className="max-w-sm text-sm text-muted">
            Find answers to common questions about our workshop process,
            curriculum, and requirements.
            <div className="flex gap-3 mt-4">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center hover:bg-primary hover:text-white transition"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* CAROUSEL */}
        <div className="relative overflow-x-visible">
          {/* extra right padding fixes last-card cut */}
          <div className="flex gap-10 items-center pr-[160px]">
            {faqs.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  layout
                  animate={{ width: isActive ? 420 : 300 }}
                  transition={{
                    width: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
                    layout: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
                  }}
                  className={`
                    h-[360px]
                    rounded-[2.5rem]
                    p-8
                    cursor-pointer
                    flex-shrink-0
                    overflow-hidden
                    ${
                      isActive
                        ? "bg-primary text-white shadow-[0_40px_80px_rgba(124,58,237,0.35)]"
                        : "bg-white/70 text-muted"
                    }
                  `}
                >
                  {/* CONTENT */}
                  <div className="flex flex-col h-full">
                    {/* QUESTION */}
                    <motion.h4
                      layout="position"
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className={`font-heading text-xl leading-snug ${
                        isActive
                          ? "text-white mb-4 mt-0"
                          : "text-dark mt-auto mb-0"
                      }`}
                    >
                      {item.question}
                    </motion.h4>

                    {/* ANSWER */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{
                            delay: 0.28, // after width expansion
                            duration: 0.35,
                            ease: "easeOut",
                          }}
                          className="text-sm leading-relaxed text-white/90"
                        >
                          {item.answer}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
