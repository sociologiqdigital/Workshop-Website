import { motion } from "framer-motion";

const FoundersMessage = () => {
  // Animation triggered on Hover
  const flapVariants = {
    closed: { rotateX: 0, zIndex: 30 },
    open: { 
      rotateX: 180, 
      zIndex: 0, 
      transition: { duration: 0.6, ease: "easeInOut" } 
    }
  };

  const letterVariants = {
    closed: {
      y: 130,
      opacity: 0,
      transition: {
        y: { delay: 0.1, duration: 0.6, ease: "easeInOut" },
        opacity: { duration: 0.1 },
      },
    },
    open: {
      y: -220,
      opacity: 1,
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
      transition: { duration: 0.3 } 
    }
  };

  return (
    <section
      className="relative pt-12 pb-6 bg-surface flex flex-col items-center"
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
        className="relative w-[520px] h-[260px] cursor-pointer mt-2"
        style={{ perspective: "1500px" }}
      >
        {/* 1. THE LETTER (RD Wreath Logo at Top) */}
        <motion.div
          variants={letterVariants}
          className="absolute left-[5%] w-[90%] bg-white shadow-2xl border border-gray-100 rounded-sm z-10 p-8 h-85"
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
            <div className="pb-24">
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
          className="absolute inset-0 bg-[#F8F1EA] rounded-b-xl z-20 shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
          style={{
            clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 50%)",
          }}
        >
          {/* Subtle Debossed SQ Branding */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-10 font-bold text-3xl tracking-tighter text-black">
            SQ
          </div>
        </div>

        {/* 3. TOP FLAP WITH CUSTOM SEAL */}
        <motion.div
          variants={flapVariants}
          className="absolute inset-0 bg-[#F8F1EA] z-30 flex justify-center items-center"
          style={{
            transformOrigin: "top center",
            clipPath: "polygon(0 0, 100% 0, 50% 50%)",
            backfaceVisibility: "hidden",
          }}
        >
          {/* THE CIRCULAR WREATH SEAL */}
          <motion.div
            variants={sealVariants}
            className="absolute top-[35%] w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100"
          >
            <div className="text-primary scale-50">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor">
                <path
                  d="M30 70 C 10 50, 10 20, 50 15 C 90 20, 90 50, 70 70"
                  strokeWidth="4"
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
        </motion.div>

        {/* 4. ENVELOPE INTERIOR */}
        <div className="absolute inset-0 bg-[#F8F1EA] rounded-b-xl z-0 shadow-inner" />
      </motion.div>
    </section>
  );
};

export default FoundersMessage;
