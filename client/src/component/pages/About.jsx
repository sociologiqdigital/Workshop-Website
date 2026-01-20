import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
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
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary">
                    The Visionary
                  </span>
                </motion.div>
                
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-dark leading-[1.1] tracking-tight">
                  About <br />
                  <span className="text-primary italic font-medium">The Founder</span>
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
                    <ArrowRight size={18} className="wave-icon group-hover:translate-x-1 transition-transform" />
                  </span>
                  <svg className="wave-fill absolute left-0 top-0 h-full w-full pointer-events-none z-0" viewBox="0 0 1440 600" preserveAspectRatio="none">
                    <path className="animate-wave-path fill-primary" d="M 0,600 L 0,112 C 106.4,124.7 212.9,137.5 280,144 C 347,150.4 374.5,150.5 437,150 C 499.4,149.4 596.6,148.2 678,124 C 759.3,99.7 824.7,52.3 916,63 C 1007.2,73.6 1124.3,142.1 1216,160 C 1307.6,177.8 1373.8,144.9 1440,112 L 1440,600 L 0,600 Z" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* HERO IMAGE */}
            <div className="lg:col-span-6 flex justify-center order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl scale-75 -z-10" />
              <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl">
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
      <section className="relative py-20 md:py-32 overflow-hidden border-t border-dark/5 bg-surface/30">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* PORTAL BOX (Left on Desktop) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-[480px]"
              >
                <div className="relative w-full bg-primary text-white p-10 md:p-14 flex flex-col justify-center gap-8
                               rounded-[60px] md:rounded-[100px] rounded-tr-[20px] rounded-bl-[20px]
                               shadow-[0_40px_80px_-15px_rgba(122,30,45,0.3)] overflow-hidden group">
                  
                  {/* Animated Background */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] animate-spin-slow bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3),transparent_70%)]" />
                  </div>

                  <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 py-1.5 px-4 bg-white/10 rounded-full backdrop-blur-md border border-white/10">
                      <Sparkles size={14} className="text-accent animate-pulse" />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent">The Vision</span>
                    </div>

                    <h4 className="font-heading text-2xl md:text-3xl lg:text-4xl leading-[1.2] tracking-tight">
                      To craft meaningful strategies that drive{" "}
                      <span className="text-accent italic font-light serif underline decoration-accent/30 underline-offset-8">
                        real results
                      </span>
                      , because every brand deserves its stage.
                    </h4>

                    <div className="pt-4 flex items-center gap-4">
                      <div className="h-px w-10 bg-accent/40" />
                      <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-accent/80">SociologiQ Leadership</p>
                    </div>
                  </div>
                </div>
                
                {/* Floating Decorative Bubble */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 backdrop-blur-md rounded-full border border-white/20 -z-10"
                />
              </motion.div>
            </div>

            {/* STORY CONTENT (Right on Desktop) */}
            <div className="lg:col-span-7 space-y-10">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <span className="h-px w-12 bg-primary/40" />
                  <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary/80">The Origin Story</span>
                </div>

                <h2 className="font-heading text-4xl md:text-5xl text-dark leading-tight tracking-tight">
                  Corporate Roots.
                  <span className="text-primary italic font-light serif">Creative Wings.</span>
                </h2>

                <div className="space-y-6 relative border-l border-primary/10 pl-8">
                  <p className="text-lg md:text-xl text-muted font-normal leading-relaxed max-w-xl">
                    Soon after getting married, Ruchi took a bold step. She left
                    her corporate job and gave herself
                    <span className="text-dark font-semibold italic mx-1 underline decoration-primary/20 underline-offset-4">
                      one day
                    </span>
                    to decide what she truly wanted.
                  </p>
                  <p className="text-lg text-muted/80 leading-relaxed max-w-xl italic">
                    The answer was a silent, powerful whisper:{" "}
                    <span className="text-dark font-semibold non-italic">
                      to build something of her own.
                    </span>
                  </p>
                </div>
              </motion.div>

              {/* STATS ROW */}
              <div className="flex flex-wrap gap-x-12 gap-y-6 pt-6 border-t border-dark/5">
                {[
                  { icon: <Eye size={18} />, label: "Seen" },
                  { icon: <Mic size={18} />, label: "Heard" },
                  { icon: <BookmarkCheck size={18} />, label: "Remembered" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-3 rounded-full bg-white shadow-sm border border-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      {item.icon}
                    </div>
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted/70 group-hover:text-dark transition-colors">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- TESTIMONIAL SECTION --- */}
      <div className="py-20 md:py-28 border-t border-dark/5">
        <Testimonial />
      </div>
    </div>
  );
}