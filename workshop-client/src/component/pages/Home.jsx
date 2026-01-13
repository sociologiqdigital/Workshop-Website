import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
  useSpring,
} from "framer-motion";
import confetti from "canvas-confetti";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Check,
  Target,
  PenTool,
  Instagram,
  Rocket,
  Gift,
  Sparkles,
  Layout,
  PhoneCall,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

// Data Imports
import { weeks } from "../data/Carriculum";
import { curriculum } from "../data/learn";
import { bonuses } from "../data/bonuses";
import { startPayment } from "../data/offer";
import { programs } from "../data/Workshop";

// Component Imports
import TestimonialSection from "./Testimonial";
import MarqueeNotice from "../common/MarqueeNotice";
import FAQSection from "./FAQ";
import CTASection from "./CTA";
import BenefitImg from "../styles/images/BenefitImg.png";

const iconMap = {
  Calendar,
  Clock,
  MapPin,
  Users,
  Target,
  PenTool,
  Instagram,
  Rocket,
  Layout,
  PhoneCall,
};

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const bonusSectionRef = useRef(null);
  const confettiCanvasRef = useRef(null);
  const confettiInstanceRef = useRef(null);
  const bonusGiftRef = useRef(null);
  const isBonusInView = useInView(bonusSectionRef, { amount: 0.4, once: true });
  const navigate = useNavigate();

  // Mouse parallax physics for Hero
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 50;
    const y = (clientY / window.innerHeight - 0.5) * 50;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    if (!confettiCanvasRef.current || confettiInstanceRef.current) return;
    confettiInstanceRef.current = confetti.create(confettiCanvasRef.current, {
      resize: true,
      useWorker: true,
    });
  }, []);

  const triggerConfettiBurst = () => {
    if (!confettiInstanceRef.current) return;
    setIsOpen(true);
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 55, ticks: 80, zIndex: 50 };

    const getOrigin = () => {
      if (!bonusSectionRef.current || !bonusGiftRef.current) {
        return { x: 0.5, y: 0.5 };
      }
      const sectionRect = bonusSectionRef.current.getBoundingClientRect();
      const giftRect = bonusGiftRef.current.getBoundingClientRect();
      const giftCenterX = giftRect.left + giftRect.width / 2;
      const giftCenterY = giftRect.top + giftRect.height / 2;
      const x = (giftCenterX - sectionRect.left) / sectionRect.width;
      const y = (giftCenterY - sectionRect.top) / sectionRect.height;
      return {
        x: Math.min(0.95, Math.max(0.05, x)),
        y: Math.min(0.9, Math.max(0.05, y)),
      };
    };

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 24 * (timeLeft / duration);
      const origin = getOrigin();
      confettiInstanceRef.current({
        ...defaults,
        particleCount,
        origin,
        angle: 90,
      });
    }, 250);
  };

  useEffect(() => {
    if (isBonusInView && !isOpen) triggerConfettiBurst();
  }, [isBonusInView]);

  const benefits = [
    "Those who want to launch a homegrown or digital business",
    "Freelancers or service providers wanting more clients",
    "Offline business owners wanting to go digital",
    "Anyone with a skill but no digital structure",
  ];
  const bonusItems = bonuses.map((bonus) => ({
    ...bonus,
    Icon: iconMap[(bonus.icon || "").trim()] || Sparkles,
  }));

  return (
    <div className="bg-white">
      {/* 1. HERO SECTION */}
      <section
        onMouseMove={handleMouseMove}
        className="relative min-h-screen  flex items-center justify-center overflow-hidden bg-[#F9F7FF] bg-[radial-gradient(circle_at_20%_30%,_rgba(150,103,224,0.05)_0%,_transparent_50%),radial-gradient(circle_at_80%_70%,_rgba(244,182,176,0.08)_0%,_transparent_50%)]"
      >
        {/* --- ANIMATED MESH GRADIENT (Light & Airy Lavender) --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Soft Lavender Glow - Top Right */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[15%] -right-[5%] w-[70%] h-[70%] rounded-full bg-[#D4BBFC]/40 blur-[130px]"
          />

          {/* Subtle Blush/Lavender Mix - Bottom Left */}
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[#EBDDEA]/60 blur-[110px]"
          />

          {/* Center Glow to keep the content area clean */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_80%)] opacity-50" />
        </div>

        {/* --- THE TOP ILLUMINATING RING --- */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[400px] pointer-events-none">
          {/* Using white and very soft purple for the ring */}
          <div className="absolute top-[-180px] left-0 right-0 h-[360px] border-[1.5px] border-white rounded-[100%] z-10 shadow-[0_0_40px_rgba(212,187,252,0.4)]" />
          <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[120%] h-[600px] bg-gradient-to-b from-white via-white/80 to-transparent blur-[100px] z-0" />
        </div>

        {/* --- FLOATING ELEMENTS (Light Glass) --- */}
        <motion.div
          style={{ x: mouseX, y: mouseY }}
          className="absolute inset-0 z-10 pointer-events-none"
        >
          {/* Frosted Light Glass Card */}
          <div className="absolute top-[20%] left-[12%] w-36 h-48 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl rotate-[-12deg] shadow-xl flex flex-col p-6 gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4BBFC]/40" />
            <div className="w-full h-2 bg-black/5 rounded-full" />
            <div className="w-2/3 h-2 bg-black/5 rounded-full" />
          </div>

          <div className="absolute top-[15%] right-[15%] w-32 h-32 border-[12px] border-white/60 rounded-full shadow-inner" />
          <div className="absolute bottom-[25%] left-[18%] w-16 h-16 bg-gradient-to-br from-[#D4BBFC] to-[#9667E0] rounded-full opacity-20 blur-sm" />
        </motion.div>

        {/* --- CONTENT --- */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 border border-white text-[#9667E0] font-bold tracking-[0.25em] uppercase text-[9px] mb-8 shadow-sm backdrop-blur-sm">
              Launch Your Brand
            </span>

            <h1 className="font-heading text-[#2F1E1E] text-4xl sm:text-5xl md:text-6xl lg:text-[80px] leading-[1.05] tracking-tight max-w-4xl mx-auto">
              Turn Your Idea into a <br />
              <span className="relative inline-block italic text-[#9667E0]">
                Digital Presence
                <svg
                  className="absolute -bottom-5 left-0 w-full"
                  viewBox="0 0 300 20"
                  fill="none"
                >
                  <motion.path
                    d="M5 15Q150 5 295 15"
                    stroke="#D4BBFC" /* Soft Lavender stroke */
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.8, duration: 1.5 }}
                  />
                </svg>
              </span>{" "}
              <span className="whitespace-nowrap">in 30 Days</span>
            </h1>

            <p className="text-[#2F1E1E]/60 max-w-2xl mx-auto mt-10 text-lg md:text-xl font-light">
              Even if you're just starting out.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. PROGRAM OVERVIEW - Fluid Staggered Layout */}
      <section className="relative py-24 sm:py-32 px-6 overflow-hidden bg-[linear-gradient(180deg,#F6F1FF_0%,#FFFFFF_100%)]">
        {/* --- VIBRANT MESH BACKGROUND --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div
            className="absolute bottom-[20%] right-[-20%] w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, #9667E0 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-[-5%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-30 blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, #D4BBFC 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* SECTION HEADER */}
          <div className="text-left mb-16 space-y-4">
            <span className="text-[#9667E0] font-bold uppercase text-[10px] tracking-[0.25em]">
              Program Overview
            </span>
            <h2 className="text-5xl md:text-7xl font-heading text-dark leading-tight">
              The <span className="text-[#9667E0]">Essentials.</span>
            </h2>
          </div>

          {/* 3-COLUMN GRID */}
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group h-full"
              >
                {/* --- NEON BORDER CONTAINER --- */}
                <div className="relative h-full p-[2px] rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(150,103,224,0.2)]">
                  {/* 1. THE ROTATING LASER (Only for active card) */}
                  {/* {program.status === "active" && (
                  <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-100">
                    <div 
                      className="w-full h-full"
                      style={{
                        background: 'conic-gradient(from 0deg, transparent 0deg, transparent 150deg, #9667E0 180deg, transparent 210deg, transparent 360deg)'
                      }}
                    />
                  </div>
                )} */}

                  {/* 2. CARD CONTENT BODY */}
                  <div className="relative bg-white rounded-[2.4rem] p-8 md:p-10 h-full flex flex-col z-10 border border-gray-100">
                    {/* Badge & Workshop # */}
                    <div className="flex justify-between items-center mb-8">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted/40">
                        Workshop 0{index + 1}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase border ${
                          program.status === "active"
                            ? "bg-[#9667E0]/10 text-[#9667E0] border-[#9667E0]/20"
                            : program.status === "soon"
                            ? "bg-amber-50 text-amber-600 border-amber-200"
                            : "bg-gray-100 text-gray-400 border-gray-200"
                        }`}
                      >
                        {program.statusLabel}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="mb-8 flex-grow">
                      <h3 className="text-2xl font-bold text-dark mb-4 leading-snug">
                        {program.title}
                      </h3>
                      <p className="text-muted/70 text-sm leading-relaxed mb-6">
                        {program.description}
                      </p>

                      {/* Bullet Points from your Reference */}
                      <ul className="space-y-3">
                        {program.points?.map((point, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-[13px] text-muted/80"
                          >
                            <Check
                              size={14}
                              className="text-[#9667E0] mt-0.5 shrink-0"
                            />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CALL TO ACTION BUTTON */}
                    <div className="mt-auto">
                      <button
                        onClick={
                          program.status === "closed"
                            ? undefined
                            : () => navigate(`/programs/${program.slug}`)
                        }
                        disabled={program.status === "closed"}
                        className={
                          program.status === "closed"
                            ? "w-full py-4 border border-gray-200 text-gray-400 font-bold rounded-2xl cursor-not-allowed"
                            : "w-full py-4 bg-[#9667E0] text-white font-bold rounded-2xl shadow-[0_10px_20px_rgba(150,103,224,0.2)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                        }
                      >
                        {program.status === "active"
                          ? "Apply Now"
                          : program.status === "soon"
                          ? "Join Waitlist"
                          : "Closed"}{" "}
                        {program.status === "closed" ? null : (
                          <ArrowRight size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `,
          }}
        />
      </section>

      {/* 3. WHO BENEFITS */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Soft Lavender Background Glows */}
        <div className="absolute bottom-[10%] right-[-20%] w-[500px] h-[500px] bg-[#F9F7FF] rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] bg-[#F2EBFB]/50 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#9667E0] font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
            >
              For Future Entrepreneurs
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl md:text-6xl text-[#2F1E1E]"
            >
              Who Will <span className="italic text-[#9667E0]">Benefit?</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden p-8 rounded-[2.5rem] bg-[#F9F7FF] border border-[#D4BBFC]/30 hover:border-[#9667E0] transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-[#9667E0]/5 flex items-start gap-6"
              >
                {/* --- ENHANCED GLOWING SEMI-CIRCLES --- */}
                <div className="absolute bottom-0 right-0 pointer-events-none z-0">
                  <svg
                    width="180"
                    height="180"
                    viewBox="0 0 180 180"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-40 group-hover:opacity-100 transition-opacity duration-700"
                  >
                    <defs>
                      <filter id={`glow-${idx}`}>
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Outer Semi-Circle */}
                    <motion.circle
                      cx="180"
                      cy="180"
                      r="140"
                      stroke="#D4BBFC"
                      strokeWidth="1.5"
                      filter={`url(#glow-${idx})`}
                      animate={{
                        scale: [1, 1.05, 1],
                        strokeOpacity: [0.2, 0.5, 0.2],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Middle Semi-Circle */}
                    <motion.circle
                      cx="180"
                      cy="180"
                      r="90"
                      stroke="#9667E0"
                      strokeWidth="2"
                      filter={`url(#glow-${idx})`}
                      animate={{
                        scale: [1, 1.1, 1],
                        strokeOpacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                    />

                    {/* Inner Semi-Circle (Filled Glow) */}
                    <motion.circle
                      cx="180"
                      cy="180"
                      r="50"
                      fill="#9667E0"
                      fillOpacity="0.1"
                      stroke="#9667E0"
                      strokeWidth="2"
                      filter={`url(#glow-${idx})`}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </svg>
                </div>

                {/* Icon Container */}
                <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#9667E0] shadow-sm group-hover:bg-[#9667E0] group-hover:text-white transition-all duration-500">
                  <CheckCircle2 size={28} />
                </div>

                {/* Content */}
                <div className="relative z-10 flex-grow pt-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#9667E0]/60">
                      Target Group 0{idx + 1}
                    </span>
                  </div>
                  <p className="text-xl md:text-2xl font-heading text-[#2F1E1E] leading-tight group-hover:text-[#9667E0] transition-colors duration-300">
                    {benefit}
                  </p>

                  {/* Subtle Decoration */}
                  <div className="mt-6 flex items-center gap-2 text-[#9667E0] font-bold text-xs opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                    View Path <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 flex flex-col items-center justify-center"
          >
            <div className="flex -space-x-3 mb-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-[#D4BBFC] flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-[#9667E0] flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                +
              </div>
            </div>
            <p className="text-sm text-[#2F1E1E]/50 font-medium">
              Join 500+ entrepreneurs building their digital future
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. WHAT YOU'LL LEARN (TABBED) */}
      <section className="py-32 bg-[linear-gradient(180deg,#F6F1FF_0%,#FFFFFF_100%)]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[#9667E0] font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">
              The Roadmap
            </span>
            <h2 className="text-5xl md:text-6xl font-heading text-dark">
              What You'll Learn
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-20">
            {weeks.map((week, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className="relative px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase"
              >
                {activeTab === index && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#D4BBFC]/30 border border-[#D4BBFC] rounded-full"
                  />
                )}
                <span
                  className={`relative z-10 ${
                    activeTab === index ? "text-[#9667E0]" : "text-muted"
                  }`}
                >
                  Week {week.number}
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col md:flex-row items-center gap-16"
            >
              <div className="w-full md:w-1/3 flex justify-center">
                <span className="text-[12rem] font-heading text-[#9667E0]/10 select-none leading-none">
                  {weeks[activeTab].number}
                </span>
              </div>
              <div className="w-full md:w-2/3 space-y-6">
                <h3 className="text-4xl font-heading text-dark">
                  {weeks[activeTab].title}
                </h3>
                <p className="text-[#9667E0] font-medium text-lg italic">
                  {weeks[activeTab].description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {weeks[activeTab].topics.map((topic, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-muted text-sm"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4BBFC]" />{" "}
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 5. BONUSES */}
      <section
        ref={bonusSectionRef}
        className="py-24 bg-white relative overflow-hidden"
      >
        <canvas
          ref={confettiCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="mb-14">
            <motion.div
              ref={bonusGiftRef}
              animate={isOpen ? { scale: 1.1 } : { scale: [1, 1.05, 1] }}
              // transition={{ repeat: Infinity, duration: 2 }}
              className="inline-block mb-6"
            >
              <Gift size={64} className="text-[#9667E0]/20" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl text-dark font-heading">
              Exclusive <span className="text-[#9667E0]">Bonuses</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {bonusItems.map((bonus, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isOpen ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + idx * 0.2 }}
                className="relative group h-full"
              >
                {/* --- THE NEON GLOW CONTAINER --- */}
                <div className="relative p-[2px] rounded-[2.5rem] overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(150,103,224,0.4)]">
                  {/* 1. THE ROTATING NEON BORDER (The 'Laser' effect) */}
                  <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] opacity-100 group-hover:opacity-100 transition-opacity">
                    <div
                      className="w-full h-full"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent 0deg, transparent 150deg, #9667E0 180deg, transparent 210deg, transparent 360deg)",
                      }}
                    />
                  </div>

                  {/* 2. THE CARD CONTENT (Inner Body) */}
                  <div className="relative bg-white rounded-[2.4rem] p-8 h-full min-h-[300px] flex flex-col items-center justify-center z-10">
                    {/* Pulsing Icon with Glow */}
                    <motion.div
                      animate={{
                        boxShadow: [
                          "0 0 0px rgba(150,103,224,0)",
                          "0 0 20px rgba(150,103,224,0.3)",
                          "0 0 0px rgba(150,103,224,0)",
                        ],
                      }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{
                        backgroundColor: bonus.color,
                        color: bonus.accent,
                      }}
                    >
                      <bonus.Icon size={26} />
                    </motion.div>

                    <h3 className="text-xl font-bold text-dark mb-3 tracking-tight">
                      {bonus.title}
                    </h3>

                    <p className="text-muted/80 leading-relaxed font-light text-base">
                      {bonus.desc}
                    </p>
                  </div>

                  {/* 3. EXTERNAL NEON FUZZ (Visible Glow) */}
                  <div className="absolute inset-0 rounded-[2.5rem] border-2 border-[#9667E0]/20 blur-[1px]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Custom CSS for the spin animation if not in your Tailwind config */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `,
          }}
        />
      </section>

      <TestimonialSection />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default Home;
