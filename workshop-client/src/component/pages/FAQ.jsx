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
    <section className="py-24 bg-[#F3EAFE] overflow-x-visible antialiased [text-rendering:geometricPrecision]">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-between gap-10 mb-16 text-center lg:text-left">
          <h2 className="font-heading text-5xl leading-tight text-dark">
            Frequently <br />
            <span className="text-accent font-bold">Asked Questions</span>
          </h2>

          <div className="max-w-sm text-sm text-muted leading-relaxed mx-auto lg:mx-0">
            Find answers to common questions about our workshop process,
            curriculum, and requirements.
            <div className="flex gap-3 mt-4 justify-center lg:justify-start">
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
          <div className="flex gap-10 items-start pr-[260px] min-h-[320px]">
            {faqs.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  type="button"
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  layout
                  animate={{
                    width: isActive ? 360 : 260,
                    height: isActive ? 320 : 140,
                  }}
                  transition={{
                    width: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
                    height: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
                    layout: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
                  }}
                  className={`
                    rounded-[2.5rem]
                    p-8
                    flex-shrink-0
                    overflow-hidden
                    text-left
                    flex
                    ${
                      isActive
                        ? "bg-primary text-white shadow-[0_30px_60px_rgba(124,58,237,0.2)]"
                        : "bg-white/70 text-muted"
                    }
                  `}
                >
                  {/*  Consistent inner layout so cards align */}
                  <div className="flex flex-col h-full w-full">
                    {/* QUESTION (always pinned at top) */}
                    <motion.h4
                      layout="position"
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className={`font-heading text-xl leading-snug tracking-tight ${
                        isActive ? "text-white" : "text-dark"
                      }`}
                    >
                      {item.question}
                    </motion.h4>

                    {/* Spacer keeps answer area consistent */}
                    <div className="mt-4 flex-1">
                      <AnimatePresence mode="wait">
                        {isActive ? (
                          <motion.p
                            key="answer"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{
                              delay: 0.22,
                              duration: 0.35,
                              ease: "easeOut",
                            }}
                            className="text-sm leading-relaxed text-white/90"
                          >
                            {item.answer}
                          </motion.p>
                        ) : (
                          <motion.div
                            key="hint"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-sm leading-relaxed text-muted/70"
                          ></motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* small bottom row to balance layout */}
                    <div className="pt-4">
                      <div
                        className={`h-[2px] w-14 rounded-full ${
                          isActive ? "bg-white/30" : "bg-primary/20"
                        }`}
                      />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        section {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </section>
  );
}
