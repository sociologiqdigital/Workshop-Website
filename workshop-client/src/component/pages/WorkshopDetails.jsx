import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { programs } from "../data/Workshop";
import FAQSection from "./FAQ";
import MarqueeNotice from "../common/MarqueeNotice";
import PayULogo from "../styles/images/PayU.svg";
import {
  CheckCircle2,
  Play,
  Users,
  Clock,
  ShieldCheck,
  ArrowRight,
  Zap,
} from "lucide-react";

export default function WorkshopDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const program = programs.find((p) => p.slug === slug);
  const handleEnrollClick = () => {
    navigate(program.status === "soon" ? "/waitlist" : "/register");
  };

  if (!program) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-[#FDFCFE]">
        <div className="text-center">
          <h1 className="text-4xl font-heading text-dark mb-4">
            Program not found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="text-[#9667E0] font-bold flex items-center gap-2 mx-auto"
          >
            <ArrowRight className="rotate-180" /> Back to Workshops
          </button>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-[#FDFCFE] min-h-screen">
      {/* --- HERO SECTION: TEXT LEFT | VIDEO RIGHT --- */}
      <section className="relative pt-8 pb-12 overflow-hidden bg-gradient-to-b from-[#F9F7FF] to-white">
        <MarqueeNotice />
        <div className="max-w-6xl mx-auto px-6 mt-8">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-center">
            {/* LEFT: TEXT CONTENT */}
            <div className="space-y-6 text-left">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-block px-4 py-1.5 rounded-full bg-[#9667E0]/10 text-[#9667E0] text-xs font-bold uppercase tracking-widest border border-[#9667E0]/20"
              >
                {program.statusLabel}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl lg:text-5xl font-heading text-dark leading-tight"
              >
                {program.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-muted/80 text-lg leading-relaxed max-w-xl"
              >
                {program.description}
              </motion.p>
            </div>

            {/* RIGHT: VIDEO PLAYER (16:9 Ratio) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative group w-full"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#9667E0] to-[#D4BBFC] rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative aspect-video rounded-[1.75rem] bg-black overflow-hidden shadow-2xl border border-white/20">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  controls
                  playsInline
                  poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070"
                >
                  <source src={program.videoUrl || ""} type="video/mp4" />
                </video>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT & EXPANDED SIDEBAR --- */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-start">
          {/* LEFT CONTENT: WHAT YOU'LL MASTER */}
          <div className="space-y-12">
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="p-6 rounded-3xl bg-white border border-purple-50 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#9667E0]/10 flex items-center justify-center text-[#9667E0] mb-6">
                  <Clock size={24} />
                </div>
                <h4 className="font-bold text-dark mb-2 text-lg">Self-Paced</h4>
                <p className="text-muted/70">
                  Learn at your own speed with lifetime access to all modules.
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-white border border-purple-50 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#9667E0]/10 flex items-center justify-center text-[#9667E0] mb-6">
                  <Users size={24} />
                </div>
                <h4 className="font-bold text-dark mb-2 text-lg">Community</h4>
                <p className="text-muted/70">
                  Join 500+ students in our private Discord networking group.
                </p>
              </div>
            </div>

            {/* KEEPING UI SAME: WHAT YOU'LL MASTER */}
            <div>
              <h2 className="text-2xl font-heading text-dark mb-6 text-center sm:text-left">
                What You'll Master
              </h2>
              <div className="grid gap-4">
                {program.points.map((point, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-purple-50 hover:border-[#9667E0]/30 transition-all shadow-sm group"
                  >
                    <CheckCircle2 className="text-[#9667E0] group-hover:scale-110 transition-transform" />
                    <span className="text-dark font-medium">{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: EXPANDED LIMITED OFFER SECTION */}
          <aside className="lg:sticky lg:top-28">
            <div className="relative p-7 md:p-8 rounded-[2.25rem] bg-white border border-purple-100 shadow-2xl shadow-purple-100/50 overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Zap size={120} className="text-[#9667E0]" />
              </div>

              <div className="relative z-10 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-[#9667E0] font-bold text-sm mb-2 uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-[#9667E0] animate-ping" />
                    Limited Offer
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl md:text-5xl font-heading text-dark">
                      ₹4,999
                    </span>
                    <span className="text-muted line-through text-lg">
                      ₹7,499
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-dark/70 text-base">
                    <ShieldCheck size={20} className="text-green-500" />
                    7-Day Money Back Guarantee
                  </div>
                  <div className="flex items-center gap-3 text-dark/70 text-base">
                    <Users size={20} className="text-[#9667E0]" />
                    Only 12 Seats Remaining
                  </div>
                </div>

                <button
                  onClick={handleEnrollClick}
                  className="w-full py-4 rounded-2xl bg-[#9667E0] text-white font-bold text-lg shadow-[0_10px_30px_rgba(150,103,224,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  Enroll Now <ArrowRight size={20} />
                </button>

                <div className="pt-6 border-t border-purple-50">
                  <p className="text-center text-xs text-muted mb-6 uppercase tracking-widest font-bold">
                    Secure Payment Methods
                  </p>
                  <div className="flex justify-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all">
                    <img src={PayULogo} className="h-5" alt="PayU" />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg"
                      className="h-5"
                      alt="UPI"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                      className="h-5"
                      alt="Mastercard"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <FAQSection />
    </div>
  );
}
