import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function FAQItem({
  index,
  question,
  answer,
  isOpen,
  onToggle,
  isAction,
}) {
  const hasAnswer = Boolean(answer);
  return (
    <div className="mb-4">
      {/* QUESTION */}
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between gap-6
        px-6 md:px-8 py-4 md:py-5 text-left transition-all duration-300
        bg-[#E9E4DD] text-dark ${
          isOpen ? "rounded-t-2xl" : "rounded-2xl hover:bg-[#DED7CF]"
        }`}
      >
        <div className="flex items-start gap-4">
          <h3 className="text-base md:text-lg font-medium leading-snug">
            {question}
          </h3>
        </div>

        {hasAnswer && !isAction && (
          <span className="shrink-0 text-primary">
            {isOpen ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </span>
        )}
      </button>

      {/* ANSWER */}
      <AnimatePresence initial={false}>
        {hasAnswer && isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-7 md:px-10 pt-4 pb-5 bg-[#E9E4DD] text-muted rounded-b-3xl">
              <div className="mb-3 h-[4px] bg-primary/5" />
              <p className="max-w-5xl leading-relaxed text-primary">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
