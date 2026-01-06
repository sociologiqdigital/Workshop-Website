import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";


export default function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-dark/10 py-6">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 text-left"
      >
        {/* QUESTION */}
        <h3 className="text-lg md:text-xl font-medium text-dark leading-snug">
          {question}
        </h3>

        {/* ICON */}
        <ChevronDown
          className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-primary" : "text-dark/60"
          }`}
        />
      </button>

      {/* ANSWER */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="mt-4 max-w-2xl text-muted leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
