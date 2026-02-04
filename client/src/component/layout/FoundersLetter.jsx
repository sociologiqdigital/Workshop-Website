import { motion } from "framer-motion";

const FoundersMessage = () => {
  // Animation triggered on Hover
  const flapVariants = {
    closed: { rotateX: 0, zIndex: 30 },
    open: {
      rotateX: 180,
      zIndex: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  const letterVariants = {
    closed: {
      y: 150,
      opacity: 0,
      zIndex: 0,
      display: "block",
      transitionEnd: { display: "none" },
      transition: {
        y: { delay: 0.45, duration: 0.5, ease: "easeInOut" },
        opacity: { delay: 0, duration: 0.12, ease: "easeOut" },
      },
    },
    open: {
      y: -220,
      opacity: 1,
      zIndex: 10,
      display: "block",
      transition: {
        delay: 0.6,
        y: { duration: 0.8, ease: "easeOut" },
        opacity: { delay: 0.6, duration: 0.2 },
      },
    },
  };

  const sealVariants = {
    closed: { opacity: 1, scale: 1 },
    open: {
      opacity: 0,
      scale: 1.2,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section
      className="relative pt-10 pb-6 bg-surface flex flex-col items-center"
      style={{
        backgroundImage: `url("https://www.transparenttextures.com/patterns/natural-paper.png")`,
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-heading text-4xl md:text-5xl text-dark font-bold text-center mb-4"
      >
        Note from Ruchi
      </motion.h1>
      {/* 3D envelope Wrapper - Hover target */}
      <motion.div
        initial="closed"
        whileHover="open"
        className="relative w-full max-w-[520px] h-[260px] cursor-pointer mt-2 mx-auto"
        style={{
          perspective: "1500px",
          clipPath: "inset(-700px 0px 0px 0px)",
          WebkitClipPath: "inset(-700px 0px 0px 0px)",
        }}
      >
        {/* 1. THE LETTER  */}
        <motion.div
          variants={letterVariants}
          className="absolute left-[5%] w-[90%] bg-white  rounded-sm p-8 h-85"
          style={{
            backgroundImage: `url("https://www.transparenttextures.com/patterns/natural-paper.png")`,
          }}
        >
          {/* RD Wreath Monogram (Top Center) */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 mb-2 text-primary">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
                <path
                  d="M30 70 C 10 50, 10 20, 50 15 C 90 20, 90 50, 70 70"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path d="M25 60 L 35 60 M 65 60 L 75 60" strokeWidth="1" />
                <text
                  x="50"
                  y="55"
                  textAnchor="middle"
                  className="font-serif text-2xl font-bold italic"
                  fill="currentColor"
                >
                  RD
                </text>
              </svg>
            </div>
            <div className="h-px w-24 bg-primary/20" />
          </div>

          <div className="space-y-6 text-center">
            <p className="font-serif text-lg leading-relaxed text-dark italic">
              “Building a brand isn’t just about likes or logos — it’s about
              understanding people, solving real problems, and staying
              consistent with purpose.”
            </p>
            <div className="pb-4">
              <p className="font-handwriting text-xl text-primary">
                — Ruchi Dorlikar
              </p>
              <p className="font-handwriting text-base text-primary">
                Founder & CEO
              </p>
            </div>
          </div>
        </motion.div>

        {/* 2. ENVELOPE FRONT FLAP */}
        <div
          className="absolute inset-0 bg-[#F8F1EA] rounded-b-xl z-20 border border-[#DCCBBA] shadow-[0_20px_50px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.75),inset_0_-14px_18px_rgba(199,163,127,0.18)]"
          style={{
            clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 50%)",
          }}
        >
          {/* Subtle Debossed SQ Branding */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-10 font-bold text-3xl tracking-tighter text-black">
            SQ
          </div>
        </div>

        {/* 3. TOP FLAP */}
        <motion.div
          variants={flapVariants}
          className="absolute inset-0 bg-[#F3E8DC] z-30 flex justify-center items-center border-x border-t border-[#D3BEA9] shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]"
          style={{
            transformOrigin: "top center",
            clipPath: "polygon(0 0, 100% 0, 50% 50%)",
            backfaceVisibility: "hidden",
          }}
        />

        {/* 4. WAX SEAL */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
          <motion.div
            variants={sealVariants}
            className="w-16 h-16 rounded-full border border-[#D4C3B1] bg-white shadow-[0_6px_16px_rgba(0,0,0,0.18)] flex items-center justify-center"
          >
            <div className="w-9 h-9 text-primary">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
                <path
                  d="M30 70 C 10 50, 10 20, 50 15 C 90 20, 90 50, 70 70"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <text
                  x="50"
                  y="60"
                  textAnchor="middle"
                  className="font-serif text-4xl font-bold italic"
                  fill="currentColor"
                >
                  RD
                </text>
              </svg>
            </div>
          </motion.div>
        </div>

        {/* 5. EDGE/FOLD STROKES */}
        <svg
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 25 }}
          viewBox="0 0 520 260"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M1 1 L1 259 L519 259 L519 1 L260 130 Z"
            fill="none"
            stroke="#CFB8A0"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M1 259 L260 130 L519 259"
            fill="none"
            stroke="#D9C6B3"
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* 6. ENVELOPE INTERIOR */}
        <div className="absolute inset-0 bg-[#F1E4D6] rounded-b-xl z-0 border border-[#E6D6C6]" />
      </motion.div>
      <p className="mt-6 text-muted text-sm font-medium tracking-widest uppercase animate-pulse">
        <span className="text-primary">---</span>{" "}Hover to open the message{" "}
        <span className="text-primary">---</span>
      </p>
    </section>
  );
};

export default FoundersMessage;
