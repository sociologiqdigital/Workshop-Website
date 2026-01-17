import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Globe,
  Heart,
  BarChart3,
  Monitor,
  Sparkles,
  Eye,
  Mic,
  BookmarkCheck,
  ArrowRight,
} from "lucide-react";

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
   
      <section className="relative pt-4 md:pt-6 pb-4 md:pb-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 w-full max-w-[520px] space-y-4 order-2 lg:order-1 lg:mr-auto">
              <header className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="h-px w-10 bg-primary/30" />
                  <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-primary">
                    The Visionary
                  </span>
                </div>
                {/* Standardized Hero Heading (text-3xl to 5xl) */}
                <h1 className="font-heading text-3xl md:text-4xl text-dark leading-tight tracking-tight">
                  About <br />
                  <span className="text-primary font-medium pl-6 md:pl-12">
                    The Founder
                  </span>
                </h1>
              </header>

              {/* Normalized body text (base to lg) */}
              <div className="space-y-3 text-sm md:text-base text-muted/90 max-w-lg">
                <p className="leading-relaxed">
                  Ruchi Dorlikar is a{" "}
                  <span className="text-dark font-semibold underline decoration-primary/10 underline-offset-4">
                    tech-driven digital strategist
                  </span>{" "}
                  who transitioned from corporate IT into entrepreneurship with
                  a bold creative leap.
                </p>
                <p className="leading-relaxed opacity-75">
                  Her journey connects deep technical roots with human insight,
                  building a brand that thrives on data-led strategy and
                  purpose.
                </p>
              </div>

              {/* WATER WAVE BUTTON - Preserved exactly as requested */}
              <div className="pt-1">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onBookClick}
                  className="wave-button group relative h-[52px] min-w-[200px] overflow-hidden bg-white text-primary px-8 py-4 text-[10px] font-bold rounded-full transition-all shadow-hover border border-primary/15 hover:border-primary/30"
                >
                  <span className="wave-text relative z-10 flex items-center gap-3 tracking-widest uppercase text-primary transition-colors group-hover:text-white">
                    Book 1 to 1 call
                    <ArrowRight
                      size={16}
                      className="wave-icon group-hover:translate-x-1 transition-transform group-hover:text-white"
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
                    <path
                      className="animate-wave-path fill-primary"
                      d="M 0,600 L 0,112 C 106.4,124.7 212.9,137.5 280,144 C 347,150.4 374.5,150.5 437,150 C 499.4,149.4 596.6,148.2 678,124 C 759.3,99.7 824.7,52.3 916,63 C 1007.2,73.6 1124.3,142.1 1216,160 C 1307.6,177.8 1373.8,144.9 1440,112 L 1440,600 L 0,600 Z"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* HERO IMAGE - Optimized sizing */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative w-full max-w-[360px] md:max-w-[420px] aspect-[4/5] rounded-[40px] md:rounded-[50px] overflow-hidden shadow-xl">
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

      {/* THE VISION & THE SHIFT */}
      <section className="relative pt-4 md:pt-6 pb-4 md:pb-6 overflow-hidden bg-background">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-accent/15 rounded-full blur-[100px] translate-y-1/3" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT CONTENT: THE STORY */}
            <div className="lg:col-span-6 lg:order-2 w-full max-w-[520px] space-y-5 lg:ml-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-10 bg-primary/40" />
                  <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary/80">
                    The Origin Story
                  </span>
                </div>

                {/* Standard Consistent Heading Size (text-3xl) */}
                <h2 className="font-heading text-3xl md:text-4xl text-dark leading-tight tracking-tight mb-4">
                  Corporate Roots.
                  <span className="text-primary italic font-light serif">
                    {" "}Creative Wings.
                  </span>
                </h2>

                <div className="space-y-3 relative">
                  <div className="absolute -left-5 top-1 bottom-1 w-[1px] bg-gradient-to-b from-primary/30 via-primary/5 to-transparent" />
                  <p className="text-base md:text-lg text-muted font-normal leading-relaxed max-w-xl">
                    Soon after getting married, Ruchi took a bold step. She left
                    her corporate job and gave herself
                    <span className="text-dark font-semibold italic mx-1 underline decoration-primary/20 underline-offset-4">
                      one day
                    </span>
                    to decide what she truly wanted.
                  </p>
                  <p className="text-base md:text-lg text-muted/80 leading-relaxed max-w-xl italic">
                    The answer was a silent, powerful whisper:{" "}
                    <span className="text-dark font-semibold non-italic">
                      to build something of her own.
                    </span>
                  </p>
                </div>
              </motion.div>

              {/* Minimalist Stats - Normalized spacing */}
              <div className="flex flex-wrap gap-x-10 gap-y-4 pt-3 border-t border-dark/5">
                {[
                  { icon: <Eye size={16} />, label: "Seen" },
                  { icon: <Mic size={16} />, label: "Heard" },
                  { icon: <BookmarkCheck size={16} />, label: "Remembered" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="p-2.5 rounded-full bg-white shadow-sm border border-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted/70 group-hover:text-dark transition-colors">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT CONTENT: THE PORTAL */}
            <div className="lg:col-span-6 lg:order-1 relative flex justify-center lg:justify-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-[520px] flex items-start justify-center"
              >
                {/* Organic Portal - Kept design but normalized text inside */}
                <div
                  className="relative w-[84%] bg-primary text-white p-6 md:p-10 flex flex-col justify-center gap-5
               rounded-[50px] md:rounded-[80px] rounded-tr-[15px] rounded-bl-[15px]
               shadow-[0_25px_50px_-12px_rgba(122,30,45,0.3)] overflow-hidden group"
                >
                  {/* Preserved Liquid Overlay Animation */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                    <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] animate-spin-slow bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_60%)]" />
                  </div>

                  <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 py-1 px-3 bg-white/10 rounded-full backdrop-blur-md border border-white/10">
                      <Sparkles
                        size={10}
                        className="text-accent animate-pulse"
                      />
                      <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-accent">
                        The Vision
                      </span>
                    </div>

                    {/* Vision Text (Standard Heading Size) */}
                    <h4 className="font-heading text-xl md:text-3xl leading-snug tracking-tight">
                      To craft meaningful strategies that drive{" "}
                      <span className="text-accent italic font-light serif underline decoration-accent/30 underline-offset-4">
                        real results
                      </span>
                      , because every brand deserves its stage.
                    </h4>

                    <div className="pt-3 flex items-center gap-3">
                      <div className="h-[1px] w-8 bg-accent/40" />
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent/80">
                        SociologiQ Leadership
                      </p>
                    </div>
                  </div>

                  <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/5 rounded-full blur-xl group-hover:scale-125 transition-transform duration-1000" />
                </div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-6 right-6 w-16 h-16 bg-accent/10 backdrop-blur-sm rounded-full border border-white/10 z-0"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Removed gaps between FAQ and Testimonial by using consistent padding */}
      <FAQSection className="bg-background py-8" />
      <div className="pb-12 md:pb-16">
        <Testimonial />
      </div>
    </div>
  );
}

