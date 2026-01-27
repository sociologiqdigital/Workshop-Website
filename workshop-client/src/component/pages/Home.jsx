import React, { useRef, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
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
  Zap,
  ArrowRight,
} from "lucide-react";

// Data Imports
import { weeks } from "../data/Carriculum";
import { bonuses } from "../data/bonuses";

// Components
import TestimonialSection from "./Testimonial";
import FAQSection from "./FAQ";
import CTASection from "./CTA";

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

const statusLabel = (status) => {
  if (status === "active") return "Active Now";
  if (status === "soon") return "Starting Soon";
  if (status === "closed") return "Closed";
  return "Active Now";
};

function normalizeOrigin(origin) {
  if (!origin) return "";
  return origin.endsWith("/") ? origin.slice(0, -1) : origin;
}

function statusBadgeClass(status) {
  if (status === "active")
    return "bg-[#9667E0]/10 text-[#9667E0] border-[#9667E0]/20";
  if (status === "soon") return "bg-[#FFF5D6] text-[#D98C12] border-[#F5D48B]";
  return "bg-gray-50 text-gray-400 border-gray-200";
}

// ✅ FIX: hooks moved into component (no hooks inside .map)
function WorkshopCard({ program, index, navigate }) {
  const [isHovered, setIsHovered] = useState(false);

  // Mouse values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // ✅ Smoother + smaller tilt
  const smoothX = useSpring(mouseX, { stiffness: 140, damping: 22, mass: 0.6 });
  const smoothY = useSpring(mouseY, { stiffness: 140, damping: 22, mass: 0.6 });

  // ✅ Reduce tilt intensity
  const rotateX = useTransform(smoothY, [-200, 200], [3, -3]);
  const rotateY = useTransform(smoothX, [-200, 200], [-3, 3]);

  const handleMouseMove = (e) => {
    if (!isHovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const isClosed = program.status === "closed";
  const badgeText = program.statusLabel || statusLabel(program.status);
  const badgeClass = statusBadgeClass(program.status);

  const desc = program.cardDescription || program.description || "";
  const points = (
    program.cardPoints?.length ? program.cardPoints : program.points || []
  ).slice(0, 4);

  return (
    <div
      className="relative group flex flex-col items-center"
      style={{ perspective: "1500px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 140, damping: 22 }}
        className="
          relative z-20 w-full rounded-[1.8rem] p-6
          border border-[#9667E0]/15 shadow-sm flex flex-col overflow-hidden
          bg-white
          transition-all duration-300 ease-out

          group-hover:border-[#D4BBFC]
          group-hover:shadow-[0_18px_50px_rgba(212,187,252,0.55)]

          group-hover:bg-gradient-to-b
          group-hover:from-[#D4BBFC]
          group-hover:to-white
        "
      >
        <div className="flex justify-between items-center mb-3">
          <span className="text-[8px] font-bold text-muted/30 uppercase tracking-widest">
            Module 0{index + 1}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase border ${badgeClass}`}
          >
            {badgeText}
          </span>
        </div>

        <h3 className="text-xl font-bold text-dark mb-1.5 lining-nums">
          {program.title}
        </h3>

        <p className="text-[#2F1E1E]/70 text-[13px] md:text-[14px] font-medium leading-relaxed mb-4 line-clamp-3 min-h-[52px]">
          {desc}
        </p>

        <ul className="space-y-2 mb-2 min-h-[110px]">
          {points.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-[13px] md:text-[14px] font-semibold text-[#2F1E1E]/80 leading-snug"
            >
              <Check size={14} className="text-[#9667E0] mt-[2px] shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <div className="h-10 w-full" />
      </motion.div>

      {/* ✅ Button: come up ONLY from bottom to its position */}
      {!isClosed && (
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={
            isHovered
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 28, scale: 0.98 }
          }
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="absolute bottom-8 left-0 right-0 z-30 w-[80%] max-w-[260px] mx-auto pointer-events-none group-hover:pointer-events-auto"
        >
          <button
            onClick={() => navigate(`/programs/${program.slug}`)}
            className="w-full py-3 bg-[#9667E0] text-white text-[12px] font-bold rounded-xl shadow-[0_15px_30px_rgba(150,103,224,0.35)] flex items-center justify-center gap-2 hover:bg-[#8554d1] transition-colors"
          >
            {program.status === "active" ? "Apply Now" : "Join Waitlist"}
            <ArrowRight size={14} />
          </button>
        </motion.div>
      )}
    </div>
  );
}

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // ✅ workshops from backend (keeps alignment + dynamic cards)
  const [workshops, setWorkshops] = useState([]);

  // Bonus/confetti
  const [isOpen, setIsOpen] = useState(false);
  const bonusSectionRef = useRef(null);
  const confettiCanvasRef = useRef(null);
  const confettiInstanceRef = useRef(null);
  const bonusGiftRef = useRef(null);
  const isBonusInView = useInView(bonusSectionRef, { amount: 0.4, once: true });

  // ✅ NEW: workshop cards section ref (for CTA scroll)
  const workshopDetailsRef = useRef(null);

  const navigate = useNavigate();

  const API_ORIGIN = useMemo(
    () =>
      normalizeOrigin(
        import.meta.env.VITE_API_ORIGIN || "http://localhost:5000",
      ),
    [],
  );

  // ✅ Fetch workshops for cards
  useEffect(() => {
    let ignore = false;

    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_ORIGIN}/api/workshops`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const data = await res.json();
        if (!ignore) setWorkshops(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!ignore) setWorkshops([]);
        console.error("Workshops fetch error:", e);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    load();
    return () => {
      ignore = true;
    };
  }, [API_ORIGIN]);

  // ✅ NEW: scroll to workshop details (cards)
  const scrollToWorkshopDetails = () => {
    if (!workshopDetailsRef.current) return;
    workshopDetailsRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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

  // confetti init
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

    const interval = setInterval(() => {
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
  }, [isBonusInView, isOpen]);

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
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary bg-[radial-gradient(circle_at_20%_30%,_rgba(150,103,224,0.05)_0%,_transparent_50%),radial-gradient(circle_at_80%_70%,_rgba(244,182,176,0.08)_0%,_transparent_50%)]"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[15%] -right-[5%] w-[70%] h-[70%] rounded-full bg-[#D4BBFC]/40 blur-[130px]"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[#EBDDEA]/60 blur-[110px]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_80%)] opacity-50" />
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[400px] pointer-events-none">
          <div className="absolute top-[-180px] left-0 right-0 h-[360px] border-[1.5px] border-white rounded-[100%] z-10 shadow-[0_0_40px_rgba(212,187,252,0.4)]" />
          <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[120%] h-[600px] bg-gradient-to-b from-white via-white/80 to-transparent blur-[100px] z-0" />
        </div>

        <motion.div
          style={{ x: mouseX, y: mouseY }}
          className="absolute inset-0 z-10 pointer-events-none"
        >
          <div className="absolute top-[20%] left-[12%] w-36 h-48 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl rotate-[-12deg] shadow-xl flex flex-col p-6 gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4BBFC]/40" />
            <div className="w-full h-2 bg-black/5 rounded-full" />
            <div className="w-2/3 h-2 bg-black/5 rounded-full" />
          </div>
          <div className="absolute top-[15%] right-[15%] w-32 h-32 border-[12px] border-white/60 rounded-full shadow-inner" />
          <div className="absolute bottom-[25%] left-[18%] w-16 h-16 bg-gradient-to-br from-[#D4BBFC] to-[#9667E0] rounded-full opacity-20 blur-sm" />
        </motion.div>

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
                    stroke="#D4BBFC"
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
      <section
        id="workshop-details"
        ref={workshopDetailsRef}
        className="relative py-14 px-6 overflow-hidden bg-white"
      >
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
            {loading && (
              <div className="col-span-full text-center text-sm text-muted/70">
                Loading workshops...
              </div>
            )}

            {!loading && workshops.length === 0 && (
              <div className="col-span-full text-center text-sm text-muted/70">
                No workshops available right now.
              </div>
            )}

            {workshops.map((program, index) => (
              <WorkshopCard
                key={program._id || program.slug || index}
                program={program}
                index={index}
                navigate={navigate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHO BENEFITS */}
      <section className="py-20 bg-[#F2EBFB] relative overflow-hidden">
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
                className="
                  group relative overflow-hidden p-8
                  rounded-[1.0rem]
                  bg-[#F9F7FF]
                  border border-[#D4BBFC]/30 hover:border-[#9667E0]
                  transition-all duration-500
                  shadow-sm hover:shadow-xl hover:shadow-[#9667E0]/5
                  flex items-center gap-5
                "
              >
                <div
                  className="
                    relative z-10 flex-shrink-0
                    w-12 h-12
                    rounded-lg
                    bg-white flex items-center justify-center text-[#9667E0]
                    shadow-sm
                    group-hover:bg-[#9667E0] group-hover:text-white
                    transition-all duration-500
                  "
                >
                  <CheckCircle2 size={24} />
                </div>

                <div className="relative z-10 flex-grow">
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
                {/* OUTER WRAPPER (NO overflow-hidden) so glow is not clipped */}
                <div className="relative rounded-[2.5rem] transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(150,103,224,0.15)]">
                  {/*  EXTRA OUTER GLOW  */}
                  <div
                    className="pointer-events-none absolute -inset-3 rounded-[2.8rem] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(closest-side, rgba(150,103,224,0.22), transparent 70%)",
                    }}
                  />

                  {/* ✅ INNER WRAPPER (overflow-hidden) keeps border effects clean */}
                  <div className="relative p-[2px] rounded-[2.5rem] overflow-hidden">
                    {/* 1. STATIC BORDER */}
                    <div className="absolute inset-0 border-2 border-[rgb(var(--color-accent))]/30 rounded-[2.5rem] z-0 transition-shadow duration-500 group-hover:shadow-[0_0_18px_rgba(150,103,224,0.45)]" />

                    {/* 2. ROTATING BORDER GLOW (masked to edge) */}
                    <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0">
                      <div
                        className="spinBorder absolute inset-0 rounded-[2.5rem]"
                        style={{
                          border: "6px solid transparent",
                          background:
                            "linear-gradient(transparent, transparent) padding-box, conic-gradient(from 0deg, transparent 0deg, transparent 90deg, rgba(160,110,255,1) 140deg, rgba(220,180,255,1) 175deg, rgba(160,110,255,1) 210deg, transparent 260deg, transparent 360deg) border-box",
                          backgroundClip: "padding-box, border-box",
                          backgroundOrigin: "padding-box, border-box",
                          filter:
                            "drop-shadow(0 0 18px rgba(160,110,255,0.75)) drop-shadow(0 0 28px rgba(160,110,255,0.45))",
                          transformOrigin: "center",
                          willChange: "transform",
                        }}
                      />
                    </div>

                    {/* 3. THE CARD CONTENT (unchanged) */}
                    <div className="relative bg-white rounded-[2.4rem] p-8 h-full min-h-[300px] flex flex-col items-center justify-center z-10 border border-white/50">
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

                      <h3 className="text-xl font-bold text-dark mb-3 tracking-tight lining-nums">
                        {bonus.title}
                      </h3>

                      <p className="text-muted/80 leading-relaxed font-light text-base lining-nums">
                        {bonus.desc}
                      </p>
                    </div>

                    {/* 4. EXTERNAL NEON FUZZ (still inside, not clipped now because outer glow exists) */}
                    <div className="absolute inset-0 rounded-[2.5rem] border-2 border-[rgb(var(--color-accent))]/10 blur-[2px] pointer-events-none" />
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
        /* Run spin always (or you can trigger on hover only) */
        .spinBorder { animation: none; }
.group:hover .spinBorder { animation: spin 4s linear infinite; }

      `,
          }}
        />
      </section>

      <TestimonialSection />
      <FAQSection />
      {/* ✅ CHANGE: pass a click handler into CTA so "Register Now" scrolls to cards */}
      <CTASection onRegisterNow={scrollToWorkshopDetails} />
    </div>
  );
};

export default Home;
