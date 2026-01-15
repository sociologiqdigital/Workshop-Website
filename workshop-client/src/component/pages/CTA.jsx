import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

const CTASection = () => {
  // Magnetic Button Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative py-16 px-6 overflow-hidden bg-white">
      {/* --- BACKGROUND MESH GLOWS (Scaled down) --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-[#9667E0]/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#D4BBFC]/20 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-5xl" 
      >
        {/* --- THE MAIN CTA CONTAINER (Reduced padding and rounding) --- */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#9667E0] p-8 md:p-12 lg:p-14 shadow-[0_30px_60px_-15px_rgba(150,103,224,0.3)] border border-white/10">
          
          {/* Subtle Grid Overlay */}
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4BBFC' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 30L30 0H15L0 15M30 30V15L15 30'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            {/* TEXT CONTENT */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-5"
              >
                <Zap size={12} className="fill-current text-[#D4BBFC]" />{" "}
                Limited Slots Available
              </motion.div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight mb-4">
                Ready to Transform <br />
                <span className="italic text-[#D4BBFC]">
                  Your Future?
                </span>
              </h2>

              <p className="text-white/80 text-base font-light mb-8 max-w-sm leading-relaxed mx-auto lg:mx-0">
                Secure your spot in the Digital Biz Kickstarter workshop and
                start building the business you've always dreamed of.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register" className="relative group">
                  <motion.div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ x: springX, y: springY }}
                  >
                    <button className="relative w-full sm:w-auto px-7 py-3.5 bg-white text-[#9667E0] font-bold rounded-xl transition-all shadow-lg group-hover:scale-[1.02] flex items-center justify-center gap-2.5 overflow-hidden text-sm">
                      <span className="relative z-10">Reserve My Seat</span>
                      <ArrowRight
                        size={18}
                        className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </button>
                  </motion.div>
                </Link>

                <Link to="/contact">
                  <button className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-white/30 text-white font-bold hover:bg-white/10 transition-all text-sm">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>

            {/* --- RIGHT SIDE VISUAL (Scaled down) --- */}
            <div className="relative hidden lg:flex justify-center items-center">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-full max-w-[300px]"
              >
                {/* Success Card (Smaller) */}
                <div className="absolute -top-6 -left-4 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#9667E0]">
                      <Sparkles size={16} />
                    </div>
                    <div className="text-white text-xs font-bold">
                      New Enrollment!
                    </div>
                  </div>
                </div>

                {/* Main Abstract Visual (Smaller) */}
                <div className="relative w-full aspect-square rounded-[3rem] bg-white/5 border border-white/10 flex items-center justify-center">
                  <Zap
                    size={120}
                    className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                  />
                </div>

                {/* Stats Card (Smaller) */}
                <div className="absolute -bottom-6 -right-4 p-5 rounded-[1.5rem] bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl z-20">
                  <div className="text-white text-2xl font-bold">98%</div>
                  <div className="text-white/60 text-[8px] font-bold uppercase tracking-widest">
                    Satisfaction
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
