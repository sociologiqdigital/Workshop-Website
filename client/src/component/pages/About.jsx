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
import AboutImg from "../styles/images/AboutImg.jpg";
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
      className="bg-background selection:bg-primary/20 font-body"
      ref={containerRef}
    >
      <PremiumCarousel />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-4 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
              <header className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="h-px w-12 bg-primary/30" />
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary">
                    The Visionary
                  </span>
                </div>
                <h1 className="font-heading text-5xl md:text-7xl text-dark leading-[0.9] tracking-tighter">
                  About <br />
                  <span className="text-primary italic font-medium pl-8 md:pl-16">
                    The Founder
                  </span>
                </h1>
              </header>

              <p className="text-lg md:text-xl text-muted/90 max-w-lg leading-relaxed font-light">
                Ruchi Dorlikar is a{" "}
                <span className="text-dark font-semibold underline decoration-primary/10 underline-offset-8">
                  tech-driven digital strategist
                </span>{" "}
                who transitioned from corporate IT into entrepreneurship with a
                bold creative leap.
              </p>

              {/* WATER WAVE BUTTON */}
              <div className="pt-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onBookClick}
                  className="wave-button group relative h-[56px] min-w-[220px] overflow-hidden bg-white text-primary px-8 py-4 text-xs font-bold rounded-full transition-all shadow-hover border border-primary/15 hover:border-primary/30"
                >
                  <span className="wave-text relative z-10 flex items-center gap-3 tracking-widest uppercase text-primary transition-colors group-hover:text-white">
                    Book 1 to 1 call
                    <ArrowRight
                      size={18}
                      className="wave-icon group-hover:translate-x-1 transition-transform group-hover:text-white"
                    />
                  </span>

                  {/* Wave Layers */}
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

            {/* HERO IMAGE */}
            <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-[480px] aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl">
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

      {/* --- CHAPTER 1: THE VISION & THE SHIFT --- */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-background">
        {/* Soft Background Accent - Blur Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* LEFT CONTENT: TYPOGRAPHY & STATS */}
            <div className="lg:col-span-6 lg:order-2 space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] w-12 bg-primary/30" />
                  <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-primary">
                    The Origin Story
                  </span>
                </div>

                <h2 className="font-heading text-5xl md:text-7xl text-dark leading-[0.95] tracking-tighter mb-8">
                  Corporate Roots.
                  <br />
                  <span className="text-primary italic font-light">
                    Creative Wings.
                  </span>
                </h2>

                <div className="space-y-6">
                  <p className="text-xl md:text-2xl text-muted font-light leading-relaxed">
                    Soon after getting married, Ruchi took a bold step. She left
                    her corporate job and gave herself
                    <span className="text-dark font-medium px-2 italic">
                      one day
                    </span>
                    to decide what she truly wanted.
                  </p>
                  <p className="text-lg text-muted/80 leading-relaxed max-w-xl">
                    The answer was a silent, powerful whisper:{" "}
                    <span className="relative inline-block text-dark font-medium italic">
                      to build something of her own.
                      <svg
                        className="absolute -bottom-2 left-0 w-full"
                        height="6"
                        viewBox="0 0 200 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 5C40 1 160 1 199 5"
                          stroke="rgb(var(--color-primary))"
                          strokeWidth="2"
                          strokeLinecap="round"
                          opacity="0.3"
                        />
                      </svg>
                    </span>
                  </p>
                </div>
              </motion.div>

              {/* Minimalist Icons */}
              <div className="flex gap-12 pt-6 border-t border-dark/5">
                {[
                  { icon: <Eye size={22} />, label: "Seen" },
                  { icon: <Mic size={22} />, label: "Heard" },
                  { icon: <BookmarkCheck size={22} />, label: "Remembered" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex flex-col items-start gap-3"
                  >
                    <div className="text-primary group-hover:scale-110 transition-transform duration-500">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-muted/60 group-hover:text-primary transition-colors">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT CONTENT: THE ORGANIC VISION PORTAL */}
            <div className="lg:col-span-6 lg:order-1 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative aspect-[4/5] md:aspect-square flex items-center justify-center"
              >
                {/* Animated Background Fluid Shape */}
                <div className="absolute inset-0 bg-primary/5 floating-blob scale-110" />

                {/* The Main Portal Card - Organic Rounded Corners */}
                <div
                  className="relative w-[90%] h-[90%] bg-primary text-white p-12 md:p-16 overflow-hidden 
               rounded-[60px] md:rounded-[100px] shadow-[0_50px_100px_-20px_rgba(122,30,45,0.4)]
               flex flex-col justify-center gap-8"
                >
                  {/* Liquid Background Effect */}
                  <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] opacity-20 pointer-events-none">
                    <div className="absolute inset-0 animate-spin-slow bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
                  </div>

                  <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-3 py-1 px-3 bg-white/10 rounded-full backdrop-blur-md">
                      <Sparkles size={14} className="text-accent" />
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent/90">
                        The Vision
                      </span>
                    </div>

                    <h4 className="font-heading text-3xl md:text-5xl leading-[1.1] tracking-tight">
                      “To craft meaningful strategies that drive{" "}
                      <span className="text-accent italic font-light underline decoration-accent/20 underline-offset-8">
                        real results
                      </span>
                      —because every brand deserves its stage.”
                    </h4>

                    <div className="pt-8 flex items-center gap-4">
                      <div className="h-px w-12 bg-accent/30" />
                      <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent/60">
                        SociologiQ Leadership
                      </p>
                    </div>
                  </div>

                  {/* Subtle Abstract Element */}
                  <div className="absolute bottom-[-5%] right-[-5%] w-40 h-40 border border-white/10 rounded-full" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <FAQSection className="bg-background pt-8 pb-12" />
      <Testimonial />
    </div>
  );
}
