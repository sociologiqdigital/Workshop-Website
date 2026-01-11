import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PremiumCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1617325279446-f0831b1d369d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1718220268527-4477fd170775?auto=format&fit=crop&w=1200&q=80",
  ];

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="relative w-full bg-background pt-8 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative flex flex-col items-center">
        {/* Unique Organic Shape Container */}
        <div className="relative w-full max-w-[900px] aspect-[16/9] md:aspect-[21/9]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotate: 2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full relative"
              style={{
                // Custom Leaf-like Shape Mask
                clipPath: "polygon(10% 0, 100% 0%, 90% 100%, 0% 100%)",
              }}
            >
              <img
                src={images[currentIndex]}
                className="w-full h-full object-cover"
                alt="Portfolio"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Floating Minimal Controls */}
          <div className="absolute -bottom-6 right-10 flex gap-4">
            <button
              onClick={prev}
              className="w-14 h-14 rounded-full border border-primary/20 bg-background flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-soft"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="w-14 h-14 rounded-full border border-primary/20 bg-background flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-soft"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Dynamic Pagination Nodes */}
        <div className="mt-12 flex gap-3">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                i === currentIndex ? "w-12 bg-primary" : "w-2 bg-primary/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
