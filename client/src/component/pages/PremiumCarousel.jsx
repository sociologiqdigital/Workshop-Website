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
    <section className="relative w-full bg-background pt-4 pb-20 overflow-visible">
      {/* 3D Perspective Wrapper */}
      <div
        className="w-full relative px-0 sm:px-6 md:px-10"
        style={{ perspective: "1200px" }}
      >
        <div className="relative w-full h-[400px] md:h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{
                opacity: 0,
                rotateY: 45,
                z: -200,
                x: 100,
              }}
              animate={{
                opacity: 1,
                rotateY: 0,
                z: 0,
                x: 0,
              }}
              exit={{
                opacity: 0,
                rotateY: -45,
                z: -200,
                x: -100,
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full h-full relative preserve-3d"
            >
              {/* The "Shield" Shape: Non-rectangular 3D Panel */}
              <div
                className="w-full h-full overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transition-transform duration-500"
                style={{
                  clipPath: "polygon(0 0, 100% 5%, 100% 95%, 0% 100%)",
                }}
              >
                <motion.img
                  src={images[currentIndex]}
                  className="w-full h-full object-cover scale-110"
                  alt="Founder Portfolio"
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                />

                {/* 3D Light Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-white/10 pointer-events-none" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Floating High-Tech Controls */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-8 px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl">
            <button
              onClick={prev}
              className="text-white hover:text-primary transition-colors p-2"
            >
              <ChevronLeft size={28} strokeWidth={1.5} />
            </button>

            {/* Pagination Indicators inside the bar */}
            <div className="flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-1 transition-all duration-300 rounded-full ${
                    i === currentIndex ? "w-8 bg-primary" : "w-2 bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="text-white hover:text-primary transition-colors p-2"
            >
              <ChevronRight size={28} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Background Decorative "Shadow" to emphasize 3D space */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[80%] h-20 bg-dark/20 blur-[100px] -z-10" />
    </section>
  );
}
