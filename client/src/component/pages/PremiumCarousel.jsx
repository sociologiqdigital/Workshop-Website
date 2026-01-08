import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ---------- Arrow Component ---------- */
const Arrow = ({ onClick, direction }) => {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  const positionClass = direction === "left" ? "-left-4" : "-right-4";

  return (
    <button
      onClick={onClick}
      aria-label={direction === "left" ? "Previous" : "Next"}
      className={`
        absolute ${positionClass} top-1/2 -translate-y-1/2 z-20
        w-10 h-10 rounded-full
        bg-white/20 backdrop-blur-md
        flex items-center justify-center
        hover:bg-white/30 transition
      `}
    >
      <Icon className="text-primary" strokeWidth={1.4} />
    </button>
  );
};

/* ---------- Carousel Component ---------- */
export default function PremiumCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1617325279446-f0831b1d369d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1718220268527-4477fd170775?auto=format&fit=crop&w=1200&q=80",
  ];

  const paginate = (direction) => {
    setCurrentIndex((prev) => {
      const next = prev + direction;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  };

  const getIndex = (i) => (i + images.length) % images.length;

  const cards = [
    { index: getIndex(currentIndex - 1), position: "left" },
    { index: getIndex(currentIndex), position: "center" },
    { index: getIndex(currentIndex + 1), position: "right" },
  ];

  const cardVariants = {
    center: {
      x: "-50%",
      scale: 1.2,
      opacity: 1,
      y: -6,
      filter: "blur(0px)",
      zIndex: 3,
    },
    left: {
      x: "-135%",
      scale: 0.88,
      opacity: 0.5,
      y: 8,
      filter: "blur(1px)",
      zIndex: 2,
    },
    right: {
      x: "35%",
      scale: 0.88,
      opacity: 0.5,
      y: 8,
      filter: "blur(1px)",
      zIndex: 2,
    },
  };

  return (
    <section className="relative w-full bg-background pb-12 overflow-hidden">
      <div className="relative max-w-[1200px] mx-auto px-6">
        {/* -------- Carousel Rail -------- */}
        <div className="relative h-[320px] md:h-[380px] overflow-visible">
          {/* Arrows */}
          <Arrow direction="left" onClick={() => paginate(-1)} />
          <Arrow direction="right" onClick={() => paginate(1)} />

          {/* Slides */}
          {cards.map((card) => (
            <motion.div
              key={card.index}
              className="absolute top-[40%] h-[260px] w-[82%] md:h-[320px] md:w-[74%] -translate-y-1/2"
              style={{ left: "50%" }}
              variants={cardVariants}
              animate={card.position}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 32,
              }}
            >
              <div className="relative h-full w-full rounded-[2rem] overflow-hidden">
                <img
                  src={images[card.index]}
                  alt={`Slide ${card.index + 1}`}
                  className="h-full w-full object-cover select-none"
                  draggable={false}
                />

                {/* Soft material highlight */}
                <div
                  className="absolute inset-0 rounded-[2rem]
                  bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_60%)]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
