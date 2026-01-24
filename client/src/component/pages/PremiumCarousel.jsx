import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Replace these with your actual image paths
const defaultSlides = [
  {
    id: "hero",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "blog",
    image:
      "https://images.unsplash.com/photo-1617325279446-f0831b1d369d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "benefit",
    image:
      "https://images.unsplash.com/photo-1718220268527-4477fd170775?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function PremiumCarousel({ slides = [] }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);

  const resolvedSlides = slides.length ? slides : defaultSlides;
  const count = resolvedSlides.length;

  const goTo = (index) => {
    if (!count) return;
    const nextIdx = (index + count) % count;
    setDirection(index > active ? 1 : -1);
    setActive(nextIdx);
  };

  const next = () => goTo(active + 1);
  const prev = () => goTo(active - 1);

  const current = resolvedSlides[active];
  const prevSlide = resolvedSlides[(active - 1 + count) % count];
  const nextSlide = resolvedSlides[(active + 1) % count];

  const variants = useMemo(
    () => ({
      enter: (dir) => ({
        x: dir > 0 ? 150 : -150,
        opacity: 0,
        scale: 0.9,
        filter: "blur(4px)",
      }),
      center: {
        x: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      },
      exit: (dir) => ({
        x: dir > 0 ? -150 : 150,
        opacity: 0,
        scale: 0.9,
        filter: "blur(4px)",
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      }),
    }),
    [],
  );

  return (
    <section className="relative w-full py-20 bg-[#F9FAFB] overflow-hidden">
      {/* Background Decorative Element */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="relative mx-auto w-full max-w-[1100px]">
          {/* Glassmorphic NAVIGATION & PEEKS */}
          <div className="relative flex items-center justify-center gap-4 h-[450px]">
            {/* LEFT PEEK + ARROW */}
            <div
              className="relative hidden md:block group cursor-pointer"
              onClick={prev}
            >
              <motion.div
                key={`prev-${active}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.4, x: 0 }}
                className="h-[300px] w-[180px] overflow-hidden rounded-[40px] grayscale hover:grayscale-0 transition-all duration-500 shadow-lg"
              >
                <img
                  src={prevSlide.image}
                  className="h-full w-full object-cover"
                  alt="prev"
                />
              </motion.div>
              {/* Glass Arrow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-14 w-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-dark shadow-xl group-hover:bg-primary group-hover:text-white transition-all">
                  <ChevronLeft size={28} />
                </div>
              </div>
            </div>

            {/* MAIN STAGE */}
            <div className="relative z-10 w-full max-w-[700px] h-full flex items-center">
              {/* Decorative Organic Backdrop Shape */}
              <div className="absolute inset-0 -m-8 opacity-50">
                <svg
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full fill-white"
                >
                  <path
                    d="M44.7,-76.4C58.3,-69.2,70.1,-57.4,77.6,-43.3C85.2,-29.2,88.5,-12.6,86.4,3.3C84.4,19.2,76.9,34.4,66.8,47.1C56.7,59.8,44,70,29.8,75.3C15.6,80.7,-0.1,81.2,-15.8,77.6C-31.5,74.1,-47.2,66.5,-58.5,54.8C-69.8,43.1,-76.8,27.3,-79.1,10.9C-81.5,-5.5,-79.3,-22.5,-71.9,-37.2C-64.4,-52,-51.7,-64.5,-37.6,-71.4C-23.5,-78.3,-8,-79.6,7.4,-80.9C22.7,-82.1,44.7,-83.4,44.7,-76.4Z"
                    transform="translate(100 100)"
                  />
                </svg>
              </div>

              <div className="relative w-full h-[400px] overflow-hidden rounded-[50px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)]">
                <AnimatePresence
                  initial={false}
                  custom={direction}
                  mode="popLayout"
                >
                  <motion.div
                    key={current.id}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0"
                  >
                    <img
                      src={current.image}
                      className="h-full w-full object-cover"
                      draggable={false}
                      alt="active slide"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT PEEK + ARROW */}
            <div
              className="relative hidden md:block group cursor-pointer"
              onClick={next}
            >
              <motion.div
                key={`next-${active}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 0.4, x: 0 }}
                className="h-[300px] w-[180px] overflow-hidden rounded-[40px] grayscale hover:grayscale-0 transition-all duration-500 shadow-lg"
              >
                <img
                  src={nextSlide.image}
                  className="h-full w-full object-cover"
                  alt="next"
                />
              </motion.div>
              {/* Glass Arrow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-14 w-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-dark shadow-xl group-hover:bg-primary group-hover:text-white transition-all">
                  <ChevronRight size={28} />
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC PAGINATION */}
          <div className="mt-12 flex justify-center items-center gap-3">
            {resolvedSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative h-2 group"
              >
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    i === active
                      ? "w-12 bg-primary"
                      : "w-3 bg-dark/10 group-hover:bg-dark/20"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
