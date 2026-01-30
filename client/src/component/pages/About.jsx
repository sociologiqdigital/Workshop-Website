import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Eye, Mic, BookmarkCheck, ArrowRight } from "lucide-react";

// Components
import FAQSection from "./FaqSection";
import { Testimonial } from "./Testimonial";
import AboutImg from "../styles/images/AboutImg.png";
import AboutBackground from "../styles/images/AboutBackground.jpg";
import OurPurposeImg from "../styles/images/OurPurpose.webp";
import PremiumCarousel from "./PremiumCarousel";
import FoundersLetter from "../layout/FoundersLetter";

// CSS Component for Realistic Tape
const MaskingTape = ({ className }) => (
  <div
    className={`absolute h-8 w-24 bg-surface opacity-90 shadow-sm ${className}`}
    style={{
      clipPath: "polygon(2% 0, 98% 1%, 100% 95%, 0% 100%)",
      backgroundImage:
        "linear-gradient(to bottom right, rgba(0,0,0,0.02), transparent)",
    }}
  />
);

// CSS Component for Realistic Pushpin
const PushPin = () => (
  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 filter drop-shadow-md">
    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-dark/20 via-surface to-white border-[0.5px] border-dark/20 relative">
      <div className="absolute inset-1 rounded-full bg-gradient-to-br from-transparent to-dark/20"></div>
    </div>
  </div>
);

export default function About({ onBookClick }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const polaroidY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const paperY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <div
      className="bg-background selection:bg-primary/20 font-body overflow-x-hidden relative"
      ref={containerRef}
    >
      {/* Subtle paper texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <PremiumCarousel />
      {/* --- About SECTION --- */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-surface">
        <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10">
          <header className="relative mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-6 md:gap-10"
            >
              <span className="hidden md:block h-px flex-1 border-t border-dashed border-dark/30" />
              <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl text-dark font-extrabold tracking-tight text-center whitespace-nowrap px-3">
                About{" "}
                <span className="text-dark font-extrabold">Ruchi Dorlikar</span>
              </h1>
              <span className="hidden md:block h-px flex-1 border-t border-dashed border-dark/30" />
            </motion.div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* CONTENT COLUMN */}
            <div className="lg:col-span-7 flex flex-col order-2 lg:order-1 h-full">
              <div className="bg-accent rounded-2xl border border-primary/10 shadow-[0_6px_30px_rgba(0,0,0,0.05)] p-8 md:p-10 space-y-6 text-lg text-muted/90 leading-relaxed font-light flex-1">
                <p className="text-xl">
                  <span className="text-dark font-semibold border-b-2 border-primary/10">
                    Founder &amp; CEO{" "}
                    <a
                      href="https://sociologiq.in/"
                      target="blank"
                      className="hover:text-primary transition-colors"
                    >
                      SociologiQ Digital Solutions
                    </a>{" "}
                  </span>
                </p>
                <p>
                  Ruchi Dorlikar is a tech-savvy digital strategist who
                  transitioned from an IT background to build a meaningful
                  agency of her own. With a foundation at Tech Mahindra and
                  Capgemini, she blends technical precision with a deep
                  understanding of digital ecosystems.
                </p>
                <p className="pt-4 italic text-dark">
                  Ruchi believes in blending strategy with soul—because every
                  brand has a story worth telling, and she’s here to help them
                  tell it better.
                </p>
              </div>
              {/* NEW SPECIALIZATION GRID */}
              <div className="mt-6 rounded-2xl bg-surface/70 border border-dark/10 px-5 py-5">
                <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-primary font-bold mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Specializing In
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-[15px] font-normal text-dark/80">
                  <div className="flex items-center gap-2 group cursor-default">
                    <BookmarkCheck
                      size={16}
                      className="text-primary group-hover:scale-110 transition-transform"
                    />
                    <span>Performance Marketing</span>
                  </div>
                  <div className="flex items-center gap-2 group cursor-default">
                    <BookmarkCheck
                      size={16}
                      className="text-primary group-hover:scale-110 transition-transform"
                    />
                    <span>Content & Branding</span>
                  </div>
                  <div className="flex items-center gap-2 group cursor-default">
                    <BookmarkCheck
                      size={16}
                      className="text-primary group-hover:scale-110 transition-transform"
                    />
                    <span>SEO & Google Ads</span>
                  </div>
                  <div className="flex items-center gap-2 group cursor-default">
                    <BookmarkCheck
                      size={16}
                      className="text-primary group-hover:scale-110 transition-transform"
                    />
                    <span>Creative Production</span>
                  </div>
                </div>
              </div>
            </div>

            {/* POLAROID COLUMN */}
            <div className="lg:col-span-5 flex flex-col items-center order-1 lg:order-2 relative h-full">
              <motion.div
                style={{ y: polaroidY }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                className="relative bg-surface p-4 pb-24 shadow-[20px_40px_80px_rgba(0,0,0,0.12)] z-10 border border-dark/20 w-full max-w-[420px] rounded-2xl"
              >
                {/* PAPERCLIP - Adjusted to be a bit more subtle */}
                <div className="absolute -top-7 right-10 z-30 drop-shadow-md">
                  <svg
                    className="text-[#C9A24D]"
                    width="45"
                    height="65"
                    viewBox="0 0 40 60"
                    fill="none"
                  >
                    <path
                      d="M12 15V45C12 51.6 17.4 57 24 57C30.6 57 36 51.6 36 45V12C36 7.6 32.4 4 28 4C23.6 4 20 7.6 20 12V42C20 44.2 21.8 46 24 46C26.2 46 28 44.2 28 42V15"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* IMAGE CONTAINER WITH CUSTOM GRADIENT */}
                <div className="aspect-[4/5] overflow-hidden border border-dark/10 rounded-xl relative bg-transparent">
                  
                  {/* 2. Subject Image with CSS "Retouching" */}
                  <img
                    src={AboutImg}
                    alt="Ruchi Dorlikar"
                    className="relative z-10 w-full h-full object-cover transition-all duration-700 transform hover:scale-105"
                    style={{
                      filter: "brightness(1.08) contrast(1.02) saturate(1.1)",
                    }}
                  />

                  {/* 3. Lighting Overlay: Simulating a soft studio light from the top-left */}
                  {/* <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-transparent" /> */}

                  {/* 4. Vignette: Keeps the focus on the face */}
                  <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_80px_rgba(0,0,0,0.5)]" />
                </div>

                {/* POLAROID CAPTION */}
                <div className="absolute bottom-8 left-6 right-6">
                  <p className="font-starlight text-2xl text-primary leading-[0.9] tracking-wide whitespace-nowrap flex items-center gap-2">
                    The journey begins...{" "}
                    <Sparkles className="w-5 h-5 text-primary/80" />
                  </p>
                  <div className="flex justify-between items-center border-t border-dark/10 pt-3">
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted/40 font-bold">
                      EST. 2018
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted/40 font-bold">
                      NAGPUR, IN
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-primary/5 blur-[120px] scale-150 -z-10 translate-y-10" />
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center text-center mt-12 md:mt-16 w-full">
            {/* WAVE BUTTON - Animation Intact */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-2 w-full flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={onBookClick}
                className="wave-button group relative h-[70px] min-w-[300px] mx-auto overflow-hidden bg-white text-primary px-12 py-4 rounded-full transition-all shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-primary/10"
              >
                <span className="wave-text relative z-10 flex items-center justify-center gap-3 tracking-[0.25em] uppercase text-[14px] font-extrabold group-hover:text-white transition-colors duration-500">
                  Book 1:1 Coffee
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-2 transition-transform duration-500"
                  />
                </span>

                {/* Wave SVG Animation Path */}
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
            </motion.div>
          </div>
        </div>
      </section>
      {/* --- VISION SECTION --- */}
      <section className="relative py-12 md:py-16 overflow-hidden bg-background">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            style={{ y: paperY }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative px-6 py-10 md:px-14 md:py-16 text-center flex items-center justify-center min-h-[320px]"
          >
            {/* PURPOSE SHAPE IMAGE */}
            <img
              src={OurPurposeImg}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            />

            {/* CONTENT */}
            <div className="relative z-10 max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-5xl mb-4 tracking-tight"
                style={{ fontWeight: 700 }}
              >
                Our Purpose
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg leading-relaxed text-muted"
                style={{ fontSize: "1.125rem", lineHeight: "1.75" }}
              >
                "To craft meaningful strategies that drive real business
                results—because every brand deserves to be{" "}
                <motion.span
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  style={{ fontWeight: 700 }}
                  className="text-dark"
                >
                  seen, heard, and remembered."
                </motion.span>
              </motion.p>
              {/* Decorative animated elements */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.12 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-primary/30 to-accent/60 rounded-full blur-3xl"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.12 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-accent/60 to-primary/30 rounded-full blur-3xl"
              />
            </div>
          </motion.div>
        </div>
      </section>
      {/* --- STORY SECTION (commented for now) --- */}
      {/*
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-0 items-start">
            <div className="lg:col-span-7 lg:-ml-12 relative z-10">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white/60 backdrop-blur-md p-10 md:p-16 lg:pl-24 shadow-sm border-l border-white rounded-r-[40px]"
              >
                <div className="space-y-10">
                  <div className="space-y-6">
                    <h2 className="text-6xl md:text-8xl font-serif leading-[0.8] text-dark tracking-tighter relative">
                      Corporate <br />
                      <span className="text-primary italic font-light ml-6 relative inline-block">
                        to
                        <motion.svg
                          className="absolute top-1/2 left-full w-32 h-32 text-primary/40 -translate-y-1/4 ml-4 pointer-events-none overflow-visible"
                          viewBox="0 0 100 100"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          <motion.path
                            d="M 5 20 C 40 20, 55 40, 25 85 M 15 75 L 25 85 L 40 80"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            variants={{
                              hidden: { pathLength: 0, opacity: 0 },
                              visible: {
                                pathLength: 1,
                                opacity: 1,
                                transition: {
                                  pathLength: {
                                    duration: 1.4,
                                    ease: "easeInOut",
                                    delay: 0.6,
                                  },
                                  opacity: { duration: 0.2, delay: 0.6 },
                                },
                              },
                            }}
                          />
                        </motion.svg>
                      </span>{" "}
                      <br />
                      Creativity
                    </h2>
                  </div>

                  <div className="space-y-8 max-w-lg">
                    <p className="text-2xl text-muted font-light leading-relaxed">
                      Ruchi took a bold step: leaving her corporate stability to
                      give herself
                      <span className="text-dark font-medium italic mx-2 border-b-2 border-dashed border-primary/30">
                        one day
                      </span>
                      to define her future.
                    </p>
                    <div className="relative pl-10 bg-accent p-6 border-l-4 border-primary/20 shadow-sm rotate-1">
                      <p className="text-xl text-dark/80 italic font-light leading-relaxed">
                        "The answer was a silent, powerful whisper: to build
                        something of my own."
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      */}
      <FoundersLetter />
      <FAQSection onBookClick={onBookClick} />
      <div className="py-20 border-t border-dark/5 bg-background relative z-10">
        <Testimonial />
      </div>
    </div>
  );
}
