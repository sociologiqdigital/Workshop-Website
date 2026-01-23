import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
  useSpring,
  useMotionValue,
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
  Zap,
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
  Zap,
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
        className="relative min-h-screen  flex items-center justify-center overflow-hidden bg-primary bg-[radial-gradient(circle_at_20%_30%,_rgba(150,103,224,0.05)_0%,_transparent_50%),radial-gradient(circle_at_80%_70%,_rgba(244,182,176,0.08)_0%,_transparent_50%)]"
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
        <div className="relative z-20 max-w-6xl mx-auto px-6 text-center pt-24">
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

      {/* 2. PROGRAM OVERVIEW */}
      <section  id="program-overview" className="relative py-14 px-6 overflow-hidden bg-white ">
        {/* Mesh Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute bottom-[5%] right-[-5%] w-[350px] h-[350px] rounded-full opacity-10 blur-[80px] bg-[#9667E0]" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[#9667E0] font-bold uppercase text-[9px] tracking-[0.3em] block mb-1">
              Program Overview
            </span>
            <h2 className="text-3xl md:text-5xl font-heading text-dark">
              Workshop <span className="text-[#9667E0]">Details.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 items-start">
            {programs.map((program, index) => {
              const [isHovered, setIsHovered] = useState(false);
              const mouseX = useMotionValue(0);
              const mouseY = useMotionValue(0);

              const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
              const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);

              const handleMouseMove = (e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                mouseX.set(e.clientX - rect.left - rect.width / 2);
                mouseY.set(e.clientY - rect.top - rect.height / 2);
              };

              const isClosed = program.status === "closed";

              return (
                <div
                  key={program.id}
                  className="relative group flex flex-col items-center" // Centering container
                  style={{ perspective: "1500px" }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => {
                    setIsHovered(false);
                    mouseX.set(0);
                    mouseY.set(0);
                  }}
                  onMouseMove={handleMouseMove}
                >
                  {/* 1. THE CARD */}
                  <motion.div
                    style={{
                      rotateX: isHovered ? -10 : rotateX,
                      rotateY,
                      transformStyle: "preserve-3d",
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    className="relative z-20 w-full bg-white rounded-[1.8rem] p-6 border border-[#9667E0]/15 shadow-sm flex flex-col overflow-hidden"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[8px] font-bold text-muted/30 uppercase tracking-widest">
                        Module 0{index + 1}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase border ${
                          program.status === "active"
                            ? "bg-[#9667E0]/10 text-[#9667E0] border-[#9667E0]/20"
                            : program.status === "soon"
                            ? "bg-[#FFF5D6] text-[#D98C12] border-[#F5D48B]"
                            : "bg-gray-50 text-gray-400 border-gray-200"
                        }`}
                      >
                        {program.statusLabel}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-dark mb-1.5 lining-nums">
                      {program.title}
                    </h3>
                    <p className="text-muted/70 text-[11px] leading-relaxed mb-4 line-clamp-2">
                      {program.description}
                    </p>

                    <ul className="space-y-1.5 mb-2">
                      {program.points?.slice(0, 4).map((point, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[11px] text-muted/80 leading-snug"
                        >
                          <Check
                            size={11}
                            className="text-[#9667E0] mt-0.5 shrink-0"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="h-10 w-full" />
                  </motion.div>

                  {/* 2. THE CIRCULAR ORBITING CTA  */}
                  {!isClosed && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.5,
                        x: -40, // Less extreme horizontal start
                        y: 60,
                        z: -200,
                        rotate: -15,
                      }}
                      animate={
                        isHovered
                          ? {
                              opacity: 1,
                              scale: 1,
                              x: 0,
                              y: 0,
                              z: 180,
                              rotate: 0,
                            }
                          : {
                              opacity: 0,
                              scale: 0.5,
                              x: -40,
                              y: 60,
                              z: -200,
                              rotate: -15,
                            }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 15,
                      }}
                      // Slightly narrower to keep the CTA fully inside the card.
                      className="absolute bottom-8 left-0 right-0 z-30 w-[80%] max-w-[260px] mx-auto pointer-events-none group-hover:pointer-events-auto"
                    >
                      <button
                        onClick={() => navigate(`/programs/${program.slug}`)}
                        className="w-full py-3 bg-[#9667E0] text-white text-[12px] font-bold rounded-xl shadow-[0_15px_30px_rgba(150,103,224,0.35)] flex items-center justify-center gap-2 hover:bg-[#8554d1] transition-colors"
                      >
                        {program.status === "active"
                          ? "Apply Now"
                          : "Join Waitlist"}
                        <ArrowRight size={14} />
                      </button>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* 3. WHO BENEFITS */}
      <section className="py-20 bg-[#F2EBFB] relative overflow-hidden">
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
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Trust Badge */}
          {/* <motion.div
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
          </motion.div> */}
        </div>
      </section>

      {/* 4. WHAT YOU'LL LEARN (TABBED) */}
      <section className="relative py-20 md:py-24 overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-[50%] h-[50%] rounded-full bg-[#D4BBFC]/30 blur-[120px]"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 w-[40%] h-[40%] rounded-full bg-[#9667E0]/15 blur-[100px]"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-10 md:mb-12">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[#9667E0] font-bold tracking-[0.4em] uppercase text-[10px] mb-3 block"
            >
              The Roadmap
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-serif text-[#2D233C] leading-tight">
              What You'll <span className="italic text-[#9667E0]">Learn</span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-14">
            {weeks.map((week, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className="relative px-7 md:px-8 py-3 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all"
              >
                {activeTab === index && (
                  <motion.div
                    layoutId="activeTabOutline"
                    className="absolute inset-0 bg-white border border-[#D4BBFC] rounded-full shadow-[0_15px_35px_rgba(150,103,224,0.2)]"
                  />
                )}
                <span
                  className={`relative z-10 ${
                    activeTab === index
                      ? "text-[#9667E0]"
                      : "text-[#5A506E]/60 hover:text-[#5A506E]"
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="relative flex flex-col lg:flex-row items-stretch overflow-hidden bg-white rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(45,35,60,0.15)] border border-white"
            >
              <div className="w-full lg:w-[42%] bg-[#9667E0] relative flex flex-col items-center justify-center p-12 md:p-14 overflow-hidden">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 m-auto w-[88%] max-w-[460px] aspect-square border-[1px] border-white/20 rounded-[4rem]"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 m-auto w-[70%] max-w-[360px] aspect-square border-[2px] border-dashed border-white/10 rounded-full"
                />

                <motion.div
                  key={`num-${activeTab}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="relative z-10 text-center"
                >
                  <span className="text-[10rem] md:text-[13rem] font-serif font-bold text-white leading-none block drop-shadow-2xl lining-nums">
                    {weeks[activeTab].number}
                  </span>
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-px w-8 bg-white/40" />
                    <span className="text-white font-bold tracking-[0.6em] uppercase text-sm">
                      Week
                    </span>
                    <div className="h-px w-8 bg-white/40" />
                  </div>
                </motion.div>
              </div>

              <div className="w-full lg:w-[58%] p-8 md:p-12 lg:p-14 flex flex-col justify-center bg-white relative">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-3xl md:text-4xl font-serif text-[#2D233C] mb-5 leading-tight">
                    {weeks[activeTab].title}
                  </h3>

                  <p className="text-[#5A506E] text-lg md:text-xl font-light leading-relaxed mb-8 pl-6 border-l-4 border-[#D4BBFC]">
                    {weeks[activeTab].description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {weeks[activeTab].topics.map((topic, i) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        key={i}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-[#F9F7FF] border border-[#9667E0]/10 hover:border-[#9667E0]/40 transition-colors group"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#9667E0] flex items-center justify-center shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-150 transition-transform" />
                        </div>
                        <span className="text-[#2D233C] text-sm font-medium leading-tight">
                          {topic}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 5. BONUSES */}
      <section
        ref={bonusSectionRef}
        /* UPDATED: Added linear gradient background from your index.css tokens */
        className="py-20 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(235,217,252,0.4) 100%)",
        }}
      >
        {/* --- BACKGROUND DECORATIVE GLOWS --- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full opacity-20 blur-[120px]"
            style={{ background: "rgb(var(--color-primary))" }}
          />
          <div
            className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full opacity-20 blur-[120px]"
            style={{ background: "rgb(var(--color-accent))" }}
          />
        </div>

        <canvas
          ref={confettiCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="mb-14">
            <motion.div
              ref={bonusGiftRef}
              animate={isOpen ? { scale: 1.1 } : { scale: [1, 1.05, 1] }}
              className="inline-block mb-6"
            >
              <Gift size={64} className="text-[rgb(var(--color-accent))]/20" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl text-dark font-heading">
              Exclusive <span className="text-accent">Bonuses</span>
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
                <div className="relative p-[2px] rounded-[2.5rem] overflow-hidden transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(150,103,224,0.15)]">
                  {/* 1. STATIC LAVENDER BORDER (Matches index.css accent) */}
                  <div className="absolute inset-0 border-2 border-[rgb(var(--color-accent))]/30 rounded-[2.5rem] z-0 group-hover:shadow-[0_0_18px_rgba(150,103,224,0.45)] transition-shadow duration-500" />

                  {/* 2. ROTATING BORDER GLOW (MASKED TO EDGE) */}
                  <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0">
                    <div
                      className="absolute inset-0 p-[4px] rounded-[2.5rem] animate-[spin_4s_linear_infinite]"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent 0deg, transparent 130deg, rgba(150,103,224,0.9) 170deg, transparent 210deg, transparent 360deg)",
                        WebkitMask:
                          "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    />
                  </div>

                  {/* 3. THE CARD CONTENT (Inner Body) */}
                  <div className="relative bg-white/90 backdrop-blur-sm rounded-[2.4rem] p-8 h-full min-h-[300px] flex flex-col items-center justify-center z-10 border border-white/50">
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

                  {/* 4. EXTERNAL NEON FUZZ */}
                  <div className="absolute inset-0 rounded-[2.5rem] border-2 border-[rgb(var(--color-accent))]/10 blur-[2px] pointer-events-none" />
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

      <TestimonialSection />
      <FAQSection />
      <CTASection />
    </div>
  );
};

export default Home;
