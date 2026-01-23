import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCreative,
  Navigation,
  Autoplay,
  Pagination,
} from "swiper/modules";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slideData = [
  {
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    title: "Digital Architecture",
    tag: "Strategy",
  },
  {
    image:
      "https://images.unsplash.com/photo-1617325279446-f0831b1d369d?auto=format&fit=crop&w=1200&q=80",
    title: "Conscious Growth",
    tag: "Execution",
  },
  {
    image:
      "https://images.unsplash.com/photo-1718220268527-4477fd170775?auto=format&fit=crop&w=1200&q=80",
    title: "Creative Wings",
    tag: "Design",
  },
];

export default function PremiumCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative w-full bg-[#fafaf8] py-12 px-4 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto relative group">
        {/* Navigation Buttons - Abstract Minimalist */}
        <div className="absolute top-1/2 -left-6 md:-left-12 z-20 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden lg:block">
          <button className="nav-prev w-14 h-14 rounded-full border border-primary/20 flex items-center justify-center bg-white/80 backdrop-blur-md hover:bg-primary hover:text-white transition-all shadow-xl">
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute top-1/2 -right-6 md:-right-12 z-20 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden lg:block">
          <button className="nav-next w-14 h-14 rounded-full border border-primary/20 flex items-center justify-center bg-white/80 backdrop-blur-md hover:bg-primary hover:text-white transition-all shadow-xl">
            <ChevronRight size={24} />
          </button>
        </div>

        <Swiper
          grabCursor={true}
          effect={"creative"}
          speed={1000}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ["-20%", 0, -1],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          navigation={{
            nextEl: ".nav-next",
            prevEl: ".nav-prev",
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          modules={[EffectCreative, Navigation, Autoplay, Pagination]}
          className="rounded-[2.5rem] overflow-hidden shadow-2xl h-[450px] md:h-[650px]"
        >
          {slideData.map((slide, index) => (
            <SwiperSlide key={index} className="relative overflow-hidden">
              {/* Content Overlay */}
              <div className="absolute inset-0 z-10 p-8 md:p-16 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={activeIndex === index ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-xl"
                >
                  <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                    {slide.tag}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-heading text-white mb-6 leading-tight">
                    {slide.title}
                  </h2>
                  <button className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group/btn uppercase text-xs font-bold tracking-widest">
                    View Project
                    <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-dark transition-all">
                      <ArrowUpRight size={16} />
                    </span>
                  </button>
                </motion.div>
              </div>

              {/* Background Image with Parallax Scale */}
              <motion.div
                className="absolute inset-0 w-full h-full"
                animate={
                  activeIndex === index ? { scale: 1.05 } : { scale: 1.2 }
                }
                transition={{ duration: 10, ease: "linear" }}
              >
                <img
                  src={slide.image}
                  className="w-full h-full object-cover"
                  alt={slide.title}
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination Indicator */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="text-[10px] font-bold text-primary">
            0{activeIndex + 1}
          </span>
          <div className="flex gap-2">
            {slideData.map((_, i) => (
              <div
                key={i}
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  i === activeIndex ? "w-12 bg-primary" : "w-4 bg-primary/20"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-bold text-muted">
            0{slideData.length}
          </span>
        </div>
      </div>
    </section>
  );
}
