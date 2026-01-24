import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Eye, Mic, BookmarkCheck, ArrowRight } from "lucide-react";

// Components
import FAQSection from "./FaqSection";
import { Testimonial } from "./Testimonial";
import AboutImg from "../styles/images/AboutImg.png";
import PremiumCarousel from "./PremiumCarousel";

export default function About({ onBookClick }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      className="bg-background selection:bg-primary/20 font-body overflow-x-hidden"
      ref={containerRef}
    >
      <PremiumCarousel />

      {/* --- HERO SECTION --- */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* TEXT CONTENT */}
            <div className="lg:col-span-6 space-y-8 order-2 lg:order-1">
              <header className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center gap-3"
                >
                  <span className="h-px w-12 bg-primary/30" />
                </motion.div>

                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-dark leading-[1.1] tracking-tight">
                  About {""}
                  <span className="text-primary italic font-medium">
                    Ruchi Dorlikar
                  </span>
                </h1>
              </header>

              <div className="space-y-6 text-base md:text-lg text-muted/90 max-w-lg leading-relaxed">
                <p>
                  Ruchi Dorlikar is a{" "}
                  <span className="text-dark font-semibold border-b border-primary/20">
                    tech-driven digital strategist
                  </span>{" "}
                  who transitioned from corporate IT into entrepreneurship with
                  a bold creative leap.
                </p>
                <p className="opacity-80">
                  Her journey connects deep technical roots with human insight,
                  building a brand that thrives on data-led strategy and
                  purpose.
                </p>
              </div>

              {/* WATER WAVE BUTTON */}
              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onBookClick}
                  className="wave-button group relative h-[56px] min-w-[220px] overflow-hidden bg-white text-primary px-8 py-4 text-[11px] font-bold rounded-full transition-all shadow-soft border border-primary/10 hover:border-primary/30"
                >
                  <span className="wave-text relative z-10 flex items-center gap-3 tracking-widest uppercase text-primary transition-colors group-hover:text-white">
                    Book 1 to 1 call
                    <ArrowRight
                      size={18}
                      className="wave-icon group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                  <svg
                    className="wave-fill absolute left-0 top-0 h-full w-full pointer-events-none z-0"
                    viewBox="0 0 1440 600"
                    preserveAspectRatio="none"
                  >
                    <path
                      className="animate-wave-path fill-primary"
                      d="M 0,600 L 0,112 C 106.4,124.7 212.9,137.5 280,144 C 347,150.4 374.5,150.5 437,150 C 499.4,149.4 596.6,148.2 678,124 C 759.3,99.7 824.7,52.3 916,63 C 1007.2,73.6 1124.3,142.1 1216,160 C 1307.6,177.8 1373.8,144.9 1440,112 L 1440,600 L 0,600 Z"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* HERO IMAGE */}
            <div className="lg:col-span-6 flex justify-center order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl scale-75 -z-10" />
              <div className="about-orbit" aria-hidden="true">
                <svg viewBox="0 0 200 200">
                  <defs>
                    <path
                      id="about-orbit-path"
                      d="M 100,20 a 80,80 0 1,1 -0.1,0"
                    />
                  </defs>
                  <text>
                    <textPath href="#about-orbit-path" startOffset="0%">
                      Think • Digital • Act • Think • Digital • Act •
                    </textPath>
                  </text>
                </svg>
              </div>
              <div className="relative z-10 w-full max-w-[400px] aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl">
                <motion.img
                  style={{ y: imageY }}
                  src={AboutImg}
                  alt="Ruchi Dorlikar"
                  className="w-full h-[120%] object-cover scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- THE VISION SECTION --- */}
      <section className="relative py-12 md:py-16 bg-[#F9F6F3] overflow-hidden">
        {/* 1. Background Typography (The "V" for Vision) */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 select-none pointer-events-none">
          <span className="text-[40rem] font-serif  text-primary/5 leading-none">
            V
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            {/* LEFT COLUMN: THE VISION PORTAL */}
            <div className="lg:col-span-6 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[4/5] w-full max-w-[450px] mx-auto"
              >
                {/* Subtle Animated Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 border border-primary/10 rounded-full scale-110"
                />

                {/* THE VISION CARD: Glassmorphism over a soft gradient */}
                <div className="relative h-full w-full rounded-[120px] rounded-tr-[20px] rounded-bl-[20px] overflow-hidden bg-white shadow-[0_50px_100px_-20px_rgba(122,30,45,0.12)] border border-white flex flex-col items-center justify-center p-12 text-center group">
                  {/* Internal Gradient Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-50" />

                  <div className="relative z-10 space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 rounded-full">
                      <Sparkles
                        size={14}
                        className="text-primary animate-pulse"
                      />
                      <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">
                        The Vision
                      </span>
                    </div>

                    <h3 className="font-serif italic text-3xl md:text-4xl lg:text-5xl text-dark leading-[1.15]">
                      To craft <span className="text-primary">meaningful</span>{" "}
                      strategies that drive <br />
                      <span className="relative inline-block mt-2">
                        real results
                        <motion.span
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          transition={{ delay: 1, duration: 1 }}
                          className="absolute left-0 -bottom-2 h-[1px] bg-primary/40"
                        />
                      </span>
                    </h3>

                    <div className="pt-8">
                      <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-muted/60">
                        SociologiQ Leadership
                      </p>
                    </div>
                  </div>
                </div>

                {/* Decorative Floating Element (Thin Line Circle) */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full border border-primary/20 backdrop-blur-sm -z-10"
                />
              </motion.div>
            </div>

            {/* RIGHT COLUMN: THE STORY */}
            <div className="lg:col-span-6 space-y-12">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] w-8 bg-primary/30" />
                    <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary/80">
                      The Journey
                    </span>
                  </div>
                  <h2 className="text-5xl md:text-7xl font-serif leading-[0.9] text-dark tracking-tighter">
                    Corporate <br />
                    <span className="text-primary italic font-light ml-8 md:ml-12">
                      to
                    </span>{" "}
                    Creativity
                  </h2>
                </div>

                <div className="space-y-6 max-w-lg">
                  <p className="text-xl text-muted font-light leading-relaxed">
                    Ruchi took a bold step: leaving her corporate stability to
                    give herself
                    <span className="text-dark font-medium italic mx-2">
                      one day
                    </span>
                    to define her future.
                  </p>
                  <div className="h-px w-20 bg-primary/20" />
                  <p className="text-lg text-dark/70 italic font-light">
                    "The answer was a silent, powerful whisper: to build
                    something of my own."
                  </p>
                </div>
              </motion.div>

              {/* MINIMAL STATS ROW */}
              <div className="flex flex-wrap gap-12 pt-10">
                {[
                  { icon: <Eye size={18} />, label: "Seen" },
                  { icon: <Mic size={18} />, label: "Heard" },
                  { icon: <BookmarkCheck size={18} />, label: "Remembered" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="text-primary/40 group-hover:text-primary transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-muted">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <FAQSection onBookClick={onBookClick} />
      {/* --- TESTIMONIAL SECTION --- */}
      <div className="py-20 md:py-28 border-t border-dark/5">
        <Testimonial />
      </div>
    </div>
  );
}
