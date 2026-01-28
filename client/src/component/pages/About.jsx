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
  const visionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: visionScroll } = useScroll({
    target: visionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const visionTextX = useTransform(visionScroll, [0, 1], ["10%", "-10%"]);
  const floatY = useTransform(visionScroll, [0, 1], ["0%", "-15%"]);

  return (
    <div
      className="bg-background selection:bg-primary/20 font-body overflow-x-hidden"
      ref={containerRef}
    >
      <PremiumCarousel />

      {/* HERO SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative py-12 md:py-24 overflow-hidden "
      >
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
            <div className="lg:col-span-6 space-y-8 order-2 lg:order-1">
              <header className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="font-heading text-5xl md:text-7xl text-dark leading-[1] tracking-tight"
                >
                  About <br />
                  <span className="text-primary italic font-medium">
                    Ruchi Dorlikar
                  </span>
                </motion.h1>
              </header>

              <div className="space-y-6 text-lg md:text-xl text-muted/90 max-w-lg leading-relaxed font-light">
                <p>
                  Ruchi Dorlikar is a{" "}
                  <span className="text-dark font-medium border-b-2 border-primary/10">
                    tech-driven digital strategist
                  </span>{" "}
                  who transitioned from corporate IT into entrepreneurship with
                  a bold creative leap.
                </p>
              </div>

              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onBookClick}
                  className="wave-button group relative h-[64px] min-w-[240px] overflow-hidden bg-white text-primary px-10 py-4 text-[12px] font-bold rounded-full transition-all shadow-xl border border-primary/10"
                >
                  <span className="wave-text relative z-10 flex items-center gap-3 tracking-[0.2em] uppercase text-primary group-hover:text-white transition-colors duration-500">
                    Book 1 to 1 call
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-2 transition-transform duration-500"
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

            <div className="lg:col-span-6 flex justify-center order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-[120px] scale-110 -z-10" />
              <div className="relative z-10 w-full max-w-[420px] aspect-[4/5] rounded-[100px_100px_20px_20px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(122,30,45,0.2)]">
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
      </motion.section>

      {/* --- THE VISION SECTION (RE-DESIGNED) --- */}
      <motion.section
        ref={visionRef}
        className="relative py-10 md:py-12 bg-[#F9F6F3] overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Background Large Text Parallax */}
        <motion.div
          style={{ x: visionTextX }}
          className="absolute top-1/2 left-0 -translate-y-1/2 select-none pointer-events-none z-0 opacity-[0.04]"
        >
          <span className="text-[8rem] md:text-[14rem] lg:text-[20rem] font-serif font-bold text-primary leading-none whitespace-nowrap">
            Visionary
          </span>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* LEFT COLUMN: THE ARCH PORTAL */}
            <div className="lg:col-span-6 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-[440px] aspect-[3/4] mx-auto"
              >
                {/* Rotating Text Orbit */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -inset-12 z-20 pointer-events-none"
                >
                  {/* <svg viewBox="0 0 200 200" className="w-full h-full">
                    <path
                      id="circlePath"
                      d="M 100, 100 m -80, 0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
                      fill="transparent"
                    />
                    <text className="text-[9px] md:text-[10px] uppercase tracking-[0.7em] font-bold fill-primary/40">
                      <textPath href="#circlePath">
                        Think • Digital • Act • Think • Digital • Act •
                      </textPath>
                    </text>
                  </svg> */}
                </motion.div>

                {/* THE ARCH CARD */}
                <div
                  className="relative h-full w-full bg-white shadow-[0_50px_100px_-20px_rgba(122,30,45,0.1)] border border-white/50 overflow-hidden flex flex-col items-center justify-center p-8 md:p-10 text-center"
                  style={{ borderRadius: "220px 220px 40px 40px" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent" />

                  <div className="relative z-10 space-y-8">
                    <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="text-primary w-6 h-6 animate-pulse" />
                    </div>

                    <h3 className="font-serif italic text-3xl md:text-4xl lg:text-5xl text-dark leading-[1.2]">
                      Creating{" "}
                      <span className="text-primary not-italic font-medium border-b-2 border-primary/5">
                        clarity-led
                      </span>{" "}
                      systems that empower growth.
                    </h3>

                    <div className="pt-8 border-t border-primary/10">
                      <a
                        href="https://sociologiq.in/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-bold tracking-[0.5em] uppercase text-primary/60 hover:text-primary transition-colors"
                      >
                        SociologiQ Leadership
                      </a>
                    </div>
                  </div>
                </div>

                {/* Parallax Floating Accent */}
                <motion.div
                  style={{ y: floatY }}
                  className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full border border-primary/10 backdrop-blur-[2px] -z-10 hidden md:block"
                />
              </motion.div>
            </div>

            {/* RIGHT COLUMN: THE STORY */}
            <div className="lg:col-span-6 space-y-12">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-10"
              >
                <div className="space-y-6">
                  <h2 className="text-6xl md:text-8xl font-serif leading-[0.8] text-dark tracking-tighter">
                    Corporate <br />
                    <span className="text-primary italic font-light ml-6">
                      to
                    </span>{" "}
                    <br />
                    Creativity
                  </h2>
                  <div className="h-1 w-24 bg-primary" />
                </div>

                <div className="space-y-8 max-w-lg">
                  <p className="text-2xl text-muted font-light leading-relaxed">
                    Ruchi took a bold step: leaving her corporate stability to
                    give herself
                    <span className="text-dark font-medium italic mx-2 underline decoration-primary/30 underline-offset-8">
                      one day
                    </span>
                    to define her future.
                  </p>

                  <div className="relative pl-10 border-l border-primary/20">
                    <p className="text-xl text-dark/80 italic font-light leading-relaxed">
                      "The answer was a silent, powerful whisper: to build
                      something of my own."
                    </p>
                  </div>
                </div>

                {/* PREMIUM STATS PIPS */}
                {/* <div className="flex flex-wrap gap-8 pt-8">
                  {[
                    { icon: <Eye size={20} />, label: "Seen" },
                    { icon: <Mic size={20} />, label: "Heard" },
                    { icon: <BookmarkCheck size={20} />, label: "Remembered" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      className="flex items-center gap-4 group cursor-default"
                    >
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-primary/40 group-hover:text-primary group-hover:shadow-md transition-all duration-300">
                        {item.icon}
                      </div>
                      <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-muted/60 group-hover:text-dark transition-colors">
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </div> */}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      <FAQSection onBookClick={onBookClick} />

      <div className="py-20 border-t border-dark/5 bg-white">
        <Testimonial />
      </div>
    </div>
  );
}
