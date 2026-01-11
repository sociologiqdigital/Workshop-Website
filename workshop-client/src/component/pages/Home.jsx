import React, { useRef } from "react";
import { Link } from "react-router-dom";
import TestimonialSection from "./Testimonial";
import MarqueeNotice from "../common/MarqueeNotice";
import { useState, useEffect } from "react";
import BenefitImg from "../styles/images/BenefitImg.png";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView
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
  CreditCard,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  Landmark,
} from "lucide-react";
import { weeks } from "../data/Carriculum";
import { curriculum } from "../data/learn";
import { bonuses } from "../data/bonuses";
import { startPayment } from "../data/offer";
import { programs, programStatusStyles } from "../data/Workshop";
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
};

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const heroRef = useRef(null);
  const bonusSectionRef = useRef(null);

  const isBonusInView = useInView(bonusSectionRef, { amount: 0.4, once: true });

  const { scrollYProgress: heroScrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroMediaY = useTransform(heroScrollYProgress, [0, 1], [0, -80]);
  const heroMediaScale = useTransform(heroScrollYProgress, [0, 1], [1, 0.95]);

  const lessons = curriculum.map((item) => ({
    ...item,
    Icon: iconMap[(item.icon || "").trim()] || Target,
  }));

  const bonusItems = bonuses.map((bonus) => ({
    ...bonus,
    Icon: iconMap[(bonus.icon || "").trim()] || Calendar,
  }));

  const handlePayment = () => {
    if (loading) return;
    startPayment({ setLoading });
  };

  
  // Confetti burst from center, reduced particles
  const triggerConfettiBurst = () => {
    setIsOpen(true);
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 55, ticks: 80, zIndex: 50 };

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 24 * (timeLeft / duration);

      // Fire from center
      confetti({
        ...defaults,
        particleCount,
        origin: { x: 0.5, y: 0.6 },
        angle: 90,
      });
    }, 250);
  };

  // Auto-trigger when user scrolls to section
  useEffect(() => {
    if (isBonusInView && !isOpen) {
      triggerConfettiBurst();
    }
  }, [isBonusInView]);

  const triggerConfetti = () => {
    setIsOpen(true);
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };
  const benefits = [
    "Women who want to launch a homegrown or digital business",
    "Freelancers or service providers wanting more clients",
    "Offline business owners wanting to go digital",
    "Anyone with a skill but no digital structure",
  ];

  return (
    <>
      {/* Hero section */}
      <section
        ref={heroRef}
        className="hero-landing relative overflow-hidden bg-background"
      >
        <div className="max-w-7xl mx-auto px-6 pt-24 sm:pt-32 lg:pt-36 pb-20 sm:pb-24 lg:pb-28 text-center">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block text-xs tracking-[0.25em] uppercase text-muted mb-6"
          >
            Digital Biz Kickstarter
          </motion.span>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-dark text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight max-w-4xl mx-auto"
          >
            Turn Your Idea into a{" "}
            <span className="text-primary block mt-2">
              Digital Business in 30 Days
            </span>
          </motion.h1>

          {/* Sub text */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted max-w-xl mx-auto mt-6 text-lg"
          >
            Even if you're just starting out
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex justify-center"
          >
            <Link
              to="/register"
              className="btn btn-primary px-10 py-4 text-base"
            >
              Register Now
            </Link>
          </motion.div>

          {/* Product / visual card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="relative mt-14 sm:mt-20 max-w-5xl mx-auto"
            style={{ y: heroMediaY, scale: heroMediaScale }}
          >
            <div className="hero-window">
              <div className="hero-window-bar">
                <span className="hero-window-title">
                  A message from your coach{" "}
                </span>
                <div className="hero-window-controls" aria-hidden="true">
                  <span className="hero-window-btn hero-window-min" />
                  <span className="hero-window-btn hero-window-max" />
                  <span className="hero-window-btn hero-window-close" />
                </div>
              </div>
              <div className="hero-window-body w-full">
                <video
                  className="hero-window-media"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&q=80"
                >
                  <source
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>

            {/* subtle dots*/}
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3">
              <span className="w-3 h-3 rounded-full bg-primary" />
              <span className="w-3 h-3 rounded-full bg-primary/50" />
              <span className="w-3 h-3 rounded-full bg-primary/20" />
            </div>
          </motion.div>
        </div>
      </section>
      {/* Welcome section */}
      <section className="bg-gradient-to-b from-white to-[#FFF7F2] py-20 sm:py-24 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT — IMAGE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center"
          >
            <div className="relative w-[280px] sm:w-[320px] md:w-[380px] h-[420px] rounded-tr-[48px] rounded-bl-[48px] rounded-tl-none rounded-br-none bg-accent overflow-hidden shadow-soft">
              <img
                src="/images/ruchi.jpg" // replace with actual image
                alt="Ruchi Dorlikar"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative dots */}
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3">
              <span className="w-3 h-3 rounded-full bg-primary" />
              <span className="w-3 h-3 rounded-full bg-primary/40" />
              <span className="w-3 h-3 rounded-full bg-primary/20" />
            </div>
          </motion.div>

          {/* RIGHT — CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Eyebrow */}
            <span className="block text-xs tracking-[0.3em] uppercase text-muted mb-4">
              Welcome
            </span>

            {/* Heading */}
            <h2 className="font-heading text-4xl md:text-5xl text-dark mb-6">
              Welcome from <span className="text-primary">Ruchi Dorlikar</span>
            </h2>

            {/* Body */}
            <p className="text-muted leading-relaxed max-w-xl mb-6">
              Hi, I'm Ruchi Dorlikar, CEO & Founder of{" "}
              <a href="https://sociologiq.in/" target="_blank" rel="noreferrer">
                SociologiQ Digital Solution Pvt. Ltd.
              </a>{" "}
              Here you'll learn how to confidently launch your personal brand
              and digital offer, using step-by-step strategies that actually
              bring results.
            </p>

            <p className="text-muted leading-relaxed max-w-xl mb-8">
              Get started and discover how you can turn your idea into a
              thriving digital business.
            </p>

            {/* Signature */}
            <div className="flex items-center gap-4">
              <span className="font-heading text-lg text-dark">
                — Ruchi Dorlikar
              </span>

              <span className="text-muted text-sm">
                Digital Business Mentor & Founder
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Details Section */}
      <section
        className="py-16 sm:py-24 lg:py-32 bg-background overflow-hidden"
        id="program"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mb-16 lg:mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-wine tracking-[0.3em] uppercase text-xs font-semibold mb-4">
              Program Overview
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl text-primary font-light tracking-tight">
              The Essentials.
            </h2>
          </motion.div>

          {/* Subtle Program Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {programs.map((program, index) => (
              <motion.article
                key={program.id}
                className="group relative flex h-full flex-col rounded-3xl border border-slate-100 bg-white/80 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="text-[11px] uppercase tracking-[0.25em] text-muted">
                    {program.label}
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
                      programStatusStyles[program.status]
                    }`}
                  >
                    {program.statusLabel}
                  </span>
                </div>

                <h3 className="mt-4 font-heading text-2xl text-dark">
                  {program.title}
                </h3>
                <p className="mt-3 text-muted leading-relaxed">
                  {program.description}
                </p>

                <ul className="mt-5 space-y-2 text-sm text-muted">
                  {program.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-7">
                  {program.status === "active" && (
                    <Link
                      to={`/programs/${program.slug}`}
                      className="inline-flex rounded-full bg-primary px-6 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                    >
                      Apply Now
                    </Link>
                  )}

                  {program.status === "soon" && (
                    <Link
                      to={`/programs/${program.slug}`}
                      className="inline-flex rounded-full border border-primary px-6 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10"
                    >
                      Join Waitlist
                    </Link>
                  )}

                  {program.status === "closed" && (
                    <Link
                      to={`/programs/${program.slug}`}
                      className="inline-flex rounded-full border border-gray-200 px-6 py-2 text-xs font-semibold text-gray-500 transition hover:border-gray-300"
                    >
                      Get Updates
                    </Link>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      {/* Who benefits section */}
      <section className="py-20 sm:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-1 lg:order-2"
            >
              <div className="bg-[#FAEFE6] rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10 flex justify-center"
                >
                  {/* Using a placeholder SVG illustration common for "Digital Growth" */}
                  <img
                    src={BenefitImg}
                    alt="Who benefits"
                    className="w-full max-w-md"
                  />
                </motion.div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 border-4 border-accent/30 rounded-full ml-10 mb-10" />
              </div>
            </motion.div>

            {/* Content Side */}
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <span className="text-wine font-bold tracking-widest text-xs uppercase mb-3 block">
                  For Future Entrepreneurs
                </span>
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-dark leading-tight">
                  Who Will <span className="text-primary">Benefit?</span>
                </h2>
              </motion.div>

              <div className="space-y-5">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                      <Check className="w-5 h-5 text-primary group-hover:text-white" />
                    </div>
                    <p className="text-lg text-muted font-medium group-hover:text-dark transition-colors">
                      {benefit}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* subtle dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex gap-3">
          <span className="w-3 h-3 rounded-full bg-primary" />
          <span className="w-3 h-3 rounded-full bg-primary/50" />
          <span className="w-3 h-3 rounded-full bg-primary/20" />
        </div>
      </section>
      <MarqueeNotice />
      {/* Carriculum section */}
      <section className="py-16 sm:py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[#F05A6B] tracking-[0.2em] uppercase text-xs sm:text-sm mb-4">
              Curriculum
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#2B2B2B] max-w-3xl mx-auto px-4">
              What You'll Learn
            </h2>
            <p className="text-lg sm:text-xl text-[#6B6B6B] mt-4 max-w-2xl mx-auto px-4">
              4-Week Intensive Curriculum
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12">
            {weeks.map((week, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Week Number - Large & Faded */}
                  <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-[150px] sm:text-[200px] lg:text-[250px] font-bold text-[#F05A6B]/10 leading-none">
                        {week.number}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div
                    className={`bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl text-[#2B2B2B] mb-3">
                      {week.title}
                    </h3>
                    <p className="text-base sm:text-lg text-[#F05A6B] mb-6">
                      {week.description}
                    </p>
                    <ul className="space-y-3">
                      {week.topics.map((topic, topicIndex) => (
                        <motion.li
                          key={topicIndex}
                          className="flex items-start gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.2 + topicIndex * 0.1,
                          }}
                        >
                          <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#F05A6B] mt-2" />
                          <span className="text-sm sm:text-base text-[#6B6B6B]">
                            {topic}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bonuses Section */}
      <section
        id="bonuses"
        ref={bonusSectionRef}
        className="py-20 sm:py-28 lg:py-32 bg-white overflow-hidden relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Header with Auto-Opening Gift Box */}
          <div className="text-center mb-14 sm:mb-20 relative">
            <div className="inline-block mb-6 relative group">
              {/* The Lid: Pops off upward */}
              <motion.div
                initial={{ y: 0, opacity: 1, rotate: 0 }}
                animate={
                  isOpen ? { y: -80, opacity: 0, rotate: -20, scale: 1.2 } : {}
                }
                transition={{ duration: 0.8, ease: "backOut" }}
                className="absolute inset-0 z-20 flex justify-center pointer-events-none"
              >
                <Gift size={80} className="text-primary" />
              </motion.div>

              {/* The Box Base: Shakes then stays open */}
              <motion.div
                animate={isOpen ? { scale: 1.1 } : { scale: [1, 1.05, 1] }}
                transition={!isOpen ? { repeat: Infinity, duration: 2 } : {}}
                className="relative z-10"
              >
                <Gift size={80} className="text-[#F05A6B]/20" />
              </motion.div>

              <AnimatePresence>
                {!isOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-4 -right-4"
                  >
                    <Sparkles className="text-yellow-400 animate-pulse" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.h2
              animate={isOpen ? { scale: [1, 1.05, 1] } : {}}
              className="text-5xl md:text-7xl  text-wine"
            >
              Exclusive <span className="text-primary">Bonuses</span>
            </motion.h2>
            <p className="text-muted mt-4 uppercase tracking-[0.3em] text-xs font-bold">
              Unlocked for you
            </p>
          </div>

          {/* Bonus Grid: Cards reveal after the box opens */}
          <div className="grid lg:grid-cols-3 gap-8 relative">
            {bonusItems.map((bonus, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={
                  isOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0 }
                }
                transition={{ delay: 0.5 + idx * 0.2, duration: 0.6 }}
                whileHover={{ y: -15 }}
                className="relative group p-10 rounded-[3rem] transition-all duration-500 overflow-hidden h-full flex flex-col items-center text-center border border-gray-50 shadow-sm hover:shadow-2xl"
                style={{ backgroundColor: bonus.color }}
              >
                {/* Floating Background Icon */}
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
                  {bonus.Icon ? <bonus.Icon size={150} /> : null}
                </div>

                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-inner bg-white"
                  style={{ color: bonus.accent }}
                >
                  {bonus.Icon ? <bonus.Icon size={32} /> : null}
                </div>

                <h3 className="text-2xl font-bold text-[#2B2B2B] mb-4 relative z-10">
                  {bonus.title}
                </h3>

                <p className="text-[#6B6B6B] leading-relaxed relative z-10">
                  {bonus.desc.includes("10 Signups") ? (
                    <>
                      Free for First{" "}
                      <span className="text-rose-500 font-bold">
                        10 Signups
                      </span>{" "}
                      Only! Get personalized guidance.
                    </>
                  ) : (
                    bonus.desc
                  )}
                </p>

                <motion.div
                  className="w-12 h-1 mt-auto pt-1 rounded-full opacity-20"
                  style={{ backgroundColor: bonus.accent }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer section */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-[#FFF7F2] to-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-6xl font-heading text-dark mb-4">
              Limited Time <span className="text-primary ">Offer!</span>
            </h2>
            <div className="w-24 h-1 bg-primary/20 mx-auto rounded-full" />
          </motion.div>

          {/* Pricing Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-primary/10 overflow-hidden"
          >
            {/* Top Banner: Urgency */}
            <div className="bg-[#FFF1F2] py-4 px-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-muted line-through text-lg">
                  Regular Price: ₹7,499
                </span>
              </div>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-primary/30"
              >
                Only 20 Seats Available!
              </motion.div>
            </div>

            <div className="p-8 md:p-12 text-center">
              <h3 className="text-2xl text-muted mb-2">Today's Offer</h3>
              <div className="text-6xl md:text-7xl font-bold text-dark mb-6">
                ₹4,999
              </div>
              <p className="text-muted mb-10">
                Hurry, secure your spot now before the price increases!
              </p>

              {/* Payment Methods Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="text-left space-y-4">
                  <h4 className="font-bold text-dark flex items-center gap-2">
                    Payment Methods
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {["UPI", "Card", "NetBanking"].map((m) => (
                      <span
                        key={m}
                        className="px-4 py-2 bg-gray-50 rounded-xl text-xs font-semibold text-muted border border-gray-100"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-green-600 font-medium">
                    <ShieldCheck size={16} /> Secured by Razorpay
                  </div>
                </div>

                <div className="text-left space-y-4">
                  <h4 className="font-bold text-dark">How to Pay?</h4>
                  <ul className="text-sm text-muted space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-primary" /> Click
                      Enroll Now below
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-primary" /> Choose
                      your preferred method
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-primary" />{" "}
                      Complete enrollment in minutes!
                    </li>
                  </ul>
                </div>
              </div>

              {/* CAPTIVATING BUTTON */}
              <motion.button
                onClick={handlePayment}
                disabled={loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group w-full md:w-auto px-16 py-6 bg-gradient-to-r from-[#F05A6B] to-[#FBBF24] text-white text-xl font-bold rounded-full shadow-[0_20px_50px_rgba(240,90,107,0.3)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {loading ? "Processing..." : "Enroll Now"}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>

                {/* Shimmer Effect */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
              </motion.button>

              <p className="mt-6 text-xs text-muted">
                Need help?{" "}
                <a href="#" className="underline hover:text-primary">
                  Contact Support
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      <TestimonialSection />
      <FAQSection />
      <CTASection />
    </>
  );
};

export default Home;
