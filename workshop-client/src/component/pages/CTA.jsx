import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
    <section className="relative py-24 px-6 my-0 overflow-hidden bg-white">
      {/* --- BACKGROUND MESH GLOWS --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[500px] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#9667E0]/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4BBFC]/30 rounded-full blur-[120px] transition-all duration-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-5xl"
      >
        {/* --- THE MAIN CTA CONTAINER --- */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#2F1E1E] p-8 md:p-12 lg:p-14 shadow-2xl">
          {/* Decorative Laser Lines */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#9667E0] to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4BBFC] to-transparent" />
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* TEXT CONTENT */}
            <div className="text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#9667E0]/20 border border-[#9667E0]/30 text-[#D4BBFC] text-[10px] font-bold uppercase tracking-[0.2em] mb-5"
              >
                <Zap size={14} className="fill-current" /> Limited Slots
                Available
              </motion.div>

              <h2 className="text-3xl md:text-5xl font-heading text-white leading-tight mb-5">
                Ready to Transform <br />
                <span className="italic text-[#9667E0]">Your Future?</span>
              </h2>

              <p className="text-gray-400 text-base md:text-lg font-light mb-8 max-w-md">
                Secure your spot in the Digital Biz Kickstarter workshop and
                start building the business you've always dreamed of.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="relative group">
                  <motion.div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ x: springX, y: springY }}
                  >
                    <button className="relative w-full sm:w-auto px-8 py-4 bg-[#9667E0] text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(150,103,224,0.3)] group-hover:shadow-[0_0_40px_rgba(150,103,224,0.5)] flex items-center justify-center gap-3 overflow-hidden text-sm sm:text-base">
                      <span className="relative z-10">Reserve My Seat</span>
                      <ArrowRight
                        size={20}
                        className="relative z-10 group-hover:translate-x-1 transition-transform"
                      />
                      {/* Button Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </button>
                  </motion.div>
                </Link>

                <Link to="/contact">
                  <button className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors text-sm sm:text-base">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>

            {/* --- RIGHT SIDE VISUAL (Floating 3D Bento) --- */}
            <div className="relative hidden lg:block">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                {/* Floating "Success" Card */}
                <div className="absolute top-0 left-0 p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rotate-[-6deg]">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#9667E0] flex items-center justify-center text-white">
                      <Sparkles size={20} />
                    </div>
                    <div className="text-white text-sm font-bold">
                      New Enrollment!
                    </div>
                  </div>
                  <div className="h-2 w-32 bg-white/20 rounded-full mb-2" />
                  <div className="h-2 w-20 bg-white/10 rounded-full" />
                </div>

                {/* Main Abstract Visual */}
                <div className="w-full aspect-square rounded-[3rem] bg-gradient-to-br from-[#9667E0]/20 to-transparent border border-white/5 flex items-center justify-center">
                  <Zap
                    size={180}
                    className="text-[#9667E0] opacity-20 blur-sm absolute"
                  />
                  <Zap
                    size={160}
                    className="text-[#9667E0] drop-shadow-[0_0_30px_rgba(150,103,224,0.8)]"
                  />
                </div>

                {/* Floating "Stats" Card */}
                <div className="absolute bottom-0 right-0 p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rotate-[6deg]">
                  <div className="text-[#D4BBFC] text-3xl font-bold mb-1">
                    98%
                  </div>
                  <div className="text-gray-400 text-xs uppercase tracking-tighter">
                    Student Satisfaction
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
