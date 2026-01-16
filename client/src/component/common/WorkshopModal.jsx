import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Zap,
  Users,
  Globe,
} from "lucide-react";

const WorkshopModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Safety-wrapped close function
  const handleClose = useCallback(() => {
    try {
      setIsOpen(false);
    } catch (error) {
      console.error("Error closing modal:", error);
    }
  }, []);

  useEffect(() => {
    // 1. Safety Check for environment
    if (typeof window === "undefined") return;

    let timer;
    try {
      // 2. Refresh-friendly trigger (1.5s delay)
      timer = setTimeout(() => setIsOpen(true), 1500);

      // 3. Keyboard Accessibility with safety
      const handleEsc = (e) => {
        if (e.key === "Escape") handleClose();
      };
      window.addEventListener("keydown", handleEsc);

      return () => {
        if (timer) clearTimeout(timer);
        window.removeEventListener("keydown", handleEsc);
      };
    } catch (error) {
      console.warn("Modal initialization failed:", error);
    }
  }, [handleClose]);

  // Handle external navigation safely
  const handleNavigation = (url) => {
    try {
      if (!url) throw new Error("URL is missing");
      window.open(url, "_blank", "noopener,noreferrer");
      handleClose();
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback: simple close if link fails
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop with subtle blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[540px]"
          >
            {/* CLOSE BUTTON - Animated rotate on hover */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 z-50 p-2 hover:rotate-90 transition-transform duration-300 group"
            >
              <X size={24} className="text-muted group-hover:text-primary" />
            </button>

            {/* LEFT SIDE: Brand & Organic Animations */}
            <div className="w-full md:w-[48%] bg-background p-10 flex flex-col justify-center relative overflow-hidden border-r border-primary/5">
              {/* GRAPHICAL ANIMATIONS: Floating Blobs (No hard geometry) */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                  rotate: [0, 45, 0],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-10 -left-10 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  x: [0, -40, 0],
                  y: [0, 40, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-20 -right-10 w-72 h-72 bg-accent/40 rounded-full blur-[100px]"
              />

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-primary font-bold tracking-widest text-[10px] uppercase mb-6"
                >
                  <Sparkles size={14} className="animate-pulse" /> 2026 Strategy
                  Intake
                </motion.div>

                <h2 className="font-heading text-4xl text-dark leading-tight mb-8">
                  Think{" "}
                  <span className="text-primary italic font-medium">
                    Digital,
                  </span>{" "}
                  <br />
                  Act Global.
                </h2>

                {/* STAGGERED INFO LIST */}
                <div className="space-y-6">
                  {[
                    {
                      icon: <Zap size={18} />,
                      title: "Modern Systems",
                      desc: "Clarity-driven digital growth strategies.",
                    },
                    {
                      icon: <Users size={18} />,
                      title: "Visionary Network",
                      desc: "Join 50+ leaders in focused sessions.",
                    },
                    {
                      icon: <Globe size={18} />,
                      title: "Global Perspective",
                      desc: "Sustainable branding for global impact.",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.8 + i * 0.15 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-11 h-11 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-dark font-bold text-sm tracking-tight">
                          {item.title}
                        </h4>
                        <p className="text-muted text-[13px] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Interactive Actions */}
            <div className="w-full md:w-[52%] p-10 md:p-14 flex flex-col justify-center bg-white">
              <div className="text-center">
                <h3 className="font-heading text-2xl text-dark mb-10">
                  Choose your gentle <br />
                  next step:
                </h3>

                <div className="space-y-5">
                  {/* SHIMMER CTA BUTTON */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() =>
                      handleNavigation("https://your-workshop-link.com")
                    }
                    className="relative w-full py-5 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 overflow-hidden group shadow-lg shadow-primary/20"
                  >
                    {/* The Shimmer Effect */}
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 1,
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    />
                    Register for Workshop
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </motion.button>

                  <div className="flex items-center gap-4 py-2 opacity-40">
                    <div className="h-[px] bg-dark/20 flex-grow" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted">
                      Preference
                    </span>
                    <div className="h-[px] bg-dark/20 flex-grow" />
                  </div>

                  {/* SECONDARY CTA */}
                  <motion.button
                    whileHover={{ backgroundColor: "rgba(122, 30, 45, 0.04)" }}
                    onClick={handleClose}
                    className="w-full py-5 bg-transparent text-dark border border-dark/10 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all"
                  >
                    I'm already registered
                    <CheckCircle size={20} className="text-primary" />
                  </motion.button>
                </div>

                <p className="mt-10 text-[10px] text-muted font-medium leading-relaxed uppercase tracking-widest opacity-70">
                  Building Digital Clarity <br /> Since 2021
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WorkshopModal;
