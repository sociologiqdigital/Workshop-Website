import {
  motion,
  AnimatePresence,
  useInView,
  animate,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { featuredBlog, secondaryBlogs } from "../data/blog";
import { programs, programStatusStyles } from "../data/courses";
import { milestones } from "../data/Journey";
import { upcomingEvents } from "../data/upcomingEvents";
import AnimatedCounter from "../pages/AnimatedCounter";
import { ImageWithFallback } from "../common/ImageWithFallback";
// Images and Illustration imports
import BenefitImage from "../styles/images/whoBenefitImg.jpg";
import HeroImg from "../styles/images/HeroImg.png";
import AchievementImg from "../styles/images/achivementImg.jpg";
import SteamingCoffee from "../common/SteamingCoffee";

import {
  Calendar,
  Users,
  UserCheck,
  Video,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Compass,
  Layers,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  Briefcase,
} from "lucide-react";
import { galleryItems } from "../data/galleryItem";
const socialContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.25,
    },
  },
};
const socialItem = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};
const tooltipClass = `
  absolute -top-8 left-1/2 -translate-x-1/2
  whitespace-nowrap
  rounded-md
  bg-dark
  px-2 py-1
  text-[11px]
  text-white
  opacity-0
  translate-y-1
  transition-all
  duration-200
  group-hover:opacity-100
  group-hover:translate-y-0
  pointer-events-none
`;
const animatedStatLabels = new Set();
//import {star_bg} from "../styles/images/star_bg.svg"
export default function Home({ onBookClick }) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const words = [
    "FOUNDER",
    "COACH",
    "MENTOR",
    "STRATEGIST",
    "TRAINER",
    "CEO",
    "IPP",
  ];
  const typedWord = useTypewriter(words);
  const [active, setActive] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
  const [isCoffeeHovered, setIsCoffeeHovered] = useState(false);
  const journeyScrollRef = useRef(null);
  const journeyDragState = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
  });
  const achievements = [
    {
      title: "Clarity Accelerator Live",
      tag: "Workshops",
      description:
        "Hands-on builds across cities helping founders launch digital systems with clarity.",
      image: AchievementImg,
    },
    {
      title: "Mentorship Circles",
      tag: "Community",
      description:
        "Intimate cohorts for women-led businesses to get direction, accountability, and growth.",
      image: galleryItems[2]?.image || BenefitImage,
    },
    {
      title: "Stage & Media",
      tag: "Talks",
      description:
        "Panels, podcasts, and keynotes on sustainable digital strategy and confident execution.",
      image: galleryItems[3]?.image || HeroImg,
    },
  ];
  const roles = [
    {
      title: "Founder & CEO",
      organization: "SociologiQ Digital Pvt. Ltd.",
      description:
        "Leading SociologiQ as a digital solutions and strategy agency focused on building clarity-led systems for modern businesses.",
      icon: Briefcase,
      socials: [
        {
          name: "LinkedIn",
          icon: Linkedin,
          url: "https://www.linkedin.com/in/sociologiq/",
        },
        {
          name: "Instagram",
          icon: Instagram,
          url: "https://www.instagram.com/thinkdigitalwithruchi/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D#",
        },
        { name: "Twitter", icon: Twitter, url: "#" },
        {
          name: "Facebook",
          icon: Facebook,
          url: "https://www.facebook.com/ruchi.shegaonkar.7/",
        },
      ],
    },
    {
      title: "IPP",
      organization: "JCI Nagpur Nakshatra",
      description:
        "Actively contributing as an IPP at JCI Nagpur, supporting leadership, community development, and youth-driven initiatives.",
      icon: Users,
      socials: [
        {
          name: "Instagram",
          icon: Instagram,
          url: "https://www.instagram.com/jcinagpurnakshatra/",
        },
        { name: "LinkedIn", icon: Linkedin, url: "#" },
      ],
    },
  ];
  const stats = [
    { value: 217, label: "projects delivered" },
    { value: 86, label: "workshops with clients" },
    { value: 5, label: "years of experience" },
    { value: 8000, label: "students & attendees" },
  ];
  const heroAchievementImage = achievements[active]?.image || AchievementImg;
  // Form handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) return;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newError = {};

    if (!form.name.trim()) {
      newError.name = "Name is required";
    }

    if (!form.email.trim()) {
      newError.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newError.email = "Email is invalid";
    }

    if (!form.message.trim()) {
      newError.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      newError.message = "Message must be at least 10 characters";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      //submit form
      console.log("Form submitted", form);
      //reset form
      setForm({
        name: "",
        email: "",
        message: "",
      });
      setError({});
    }
  };

  function useTypewriter(words, speed = 140, pause = 1400) {
    const [index, setIndex] = useState(0);
    const [text, setText] = useState("");
    const [phase, setPhase] = useState("typing");
    const timeoutRef = useRef(null);

    useEffect(() => {
      const currentWord = words[index % words.length];
      const lengthFactor = Math.max(1, 7 / currentWord.length);
      const typingSpeed = speed * lengthFactor;
      const deletingSpeed = speed * 0.6 * lengthFactor;
      const restartDelay = phase === "typing" && text === "" ? 180 : 0;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (phase === "typing") {
        if (text === currentWord) {
          timeoutRef.current = setTimeout(() => setPhase("pause"), pause);
        } else {
          timeoutRef.current = setTimeout(() => {
            setText(currentWord.slice(0, text.length + 1));
          }, typingSpeed + restartDelay);
        }
      } else if (phase === "pause") {
        timeoutRef.current = setTimeout(() => setPhase("deleting"), 120);
      } else {
        if (text === "") {
          setPhase("typing");
          setIndex((prev) => prev + 1);
        } else {
          timeoutRef.current = setTimeout(() => {
            setText(currentWord.slice(0, text.length - 1));
          }, deletingSpeed + 40);
        }
      }

      return () => clearTimeout(timeoutRef.current);
    }, [text, phase, index, speed, pause, words]);

    return text;
  }
  function AnimatedStat({ value, label }) {
    const ref = useRef(null);

    // session-persistent lock (module-level)
    const alreadyAnimated = animatedStatLabels.has(label);

    const inView = useInView(ref, {
      margin: "-80px",
    });

    const count = useMotionValue(alreadyAnimated ? value : 0);
    const rounded = useTransform(count, (latest) =>
      Math.round(latest).toLocaleString()
    );

    useEffect(() => {
      // If already animated earlier → lock value and exit
      if (alreadyAnimated) {
        count.set(value);
        return;
      }

      if (!inView) return;

      animatedStatLabels.add(label);

      const controls = animate(count, value, {
        duration: 1.4,
        ease: [0.25, 0.8, 0.25, 1],
      });

      return () => controls.stop();
    }, [alreadyAnimated, inView, value, label, count]);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center text-center"
      >
        <div className="flex items-baseline gap-1">
          <motion.span className="font-heading text-[30px] md:text-[34px] text-dark tracking-tight leading-none">
            {rounded}
          </motion.span>
          <span className="text-primary text-lg font-medium">+</span>
        </div>

        <p className="mt-1 text-[13px] md:text-[14px] italic text-muted">
          {label}
        </p>
      </motion.div>
    );
  }

  const handleJourneyPointerDown = (e) => {
    if (!journeyScrollRef.current) return;
    journeyDragState.current.isDown = true;
    journeyDragState.current.startX = e.clientX;
    journeyDragState.current.scrollLeft = journeyScrollRef.current.scrollLeft;
    journeyScrollRef.current.setPointerCapture?.(e.pointerId);
  };

  const handleJourneyPointerMove = (e) => {
    if (!journeyScrollRef.current || !journeyDragState.current.isDown) return;
    const walk = e.clientX - journeyDragState.current.startX;
    journeyScrollRef.current.scrollLeft =
      journeyDragState.current.scrollLeft - walk;
  };

  const handleJourneyPointerUp = (e) => {
    journeyDragState.current.isDown = false;
    journeyScrollRef.current?.releasePointerCapture?.(e.pointerId);
  };

  const scrollJourney = (direction) => {
    if (!journeyScrollRef.current) return;
    journeyScrollRef.current.scrollBy({
      left: direction * 260,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-background home-hero grid-bg pt-6 pb-6 md:pt-12 md:pb-10">
        {/* Background Accents */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[360px] bg-primary/10 rounded-[50%] blur-3xl " />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* LEFT CONTENT */}
            <motion.div
              className="relative max-w-[520px] text-left md:pl-8 lg:pl-12"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {/* Greeting - Tight gap */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 5 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-[13px] sm:text-[14px] md:text-[15px] text-muted mb-0.5 uppercase tracking-widest font-medium"
              >
                Hello, I'm
              </motion.div>

              {/* Name - Leading tight to remove extra space below */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="font-heading text-[36px] sm:text-[48px] md:text-[62px] text-dark leading-[1.1] mb-2"
              >
                Ruchi <span className="text-primary">Dorlikar</span>
              </motion.h1>

              {/* Single Line Title Section */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex items-center gap-3 mb-6"
              >
                {/* <span className="text-[14px] sm:text-[16px] md:text-[18px] text-muted whitespace-nowrap font-medium">
                  And I am
                </span> */}
                <span className="text-primary text-[20px] sm:text-[26px] md:text-[32px] font-bold tracking-tight leading-none">
                  <span className="relative">
                    {typedWord}
                    <span className="inline-block ml-1 w-[2px] h-[24px] md:h-[32px] bg-primary animate-pulse align-middle"></span>
                  </span>
                </span>
              </motion.div>

              {/* Description */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-[16px] sm:text-[17px] md:text-[18px] text-muted leading-relaxed mb-8 max-w-[520px]"
              >
                Creating digital paths with clarity,{" "}
                <span className="text-dark font-semibold">
                  confidence, and conscious growth
                </span>{" "}
                for modern brands and{" "}
                <span className="whitespace-nowrap">
                  leaders.
                  <Link
                    to="/about"
                    className="inline-flex items-center text-[13px] font-bold text-primary ml-2 underline underline-offset-4 hover:text-dark transition-colors"
                  >
                    Know More
                    <ArrowRight className="ml-1 w-3 h-3" />
                  </Link>
                </span>
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, width: 0 },
                  visible: { opacity: 1, width: "60px" },
                }}
                className="h-[3px] bg-primary mb-8"
              />

              <motion.button
                onMouseEnter={() => setIsCoffeeHovered(true)}
                onMouseLeave={() => setIsCoffeeHovered(false)}
                onClick={() => onBookClick?.()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-2.5 rounded-full bg-primary/95 px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:bg-primary hover:shadow-primary/20 hover:-translate-y-0.5 active:scale-95 overflow-hidden shine-button"
              >
                <SteamingCoffee isHovered={isCoffeeHovered} />
                <span className="relative tracking-wide font-body">
                  Schedule a Coffee Chat
                </span>
              </motion.button>
            </motion.div>

            {/* RIGHT IMAGE  */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative hidden md:flex justify-end items-center md:pr-8 lg:pr-12"
            >
              <div className="relative">
                {/* Main Image Container */}
                {/* <div className="relative z-10 w-[380px] h-[500px] lg:w-[420px] lg:h-[560px] rounded-[48px] overflow-hidden border-[12px] border-white shadow-soft"> */}
                <div className="relative z-10 w-[340px] h-[460px] lg:w-[400px] lg:h-[520px] rounded-[40px] overflow-hidden">
                  <ImageWithFallback
                    src={HeroImg}
                    alt="Ruchi Dorlikar"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* </div> */}

                {/* Badge 1: Top Left - Professional Label */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-white px-4 py-2.5 rounded-full shadow-md border border-primary/5"
                >
                  <Compass className="w-4 h-4 text-primary" />
                  <span className="text-[11px] font-bold text-dark uppercase tracking-wider">
                    Clarity Coach
                  </span>
                </motion.div>

                {/* Badge 2: Mid Right  */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-md border border-primary/10 flex flex-col items-center"
                >
                  <div className="flex -space-x-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-white font-bold border-2 border-white">
                      G
                    </div>
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-[8px] text-white font-bold border-2 border-white">
                      A
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-dark tracking-tighter">
                    Google Certified
                  </span>
                </motion.div>

                {/* Badge 3: Bottom Left - JCI President 2025 (Important Milestone from PDF) */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="absolute bottom-6 left-6 z-20 bg-white text-dark px-5 py-3 rounded-2xl shadow-md border border-primary/5 flex flex-col items-start"
                >
                  <span className="text-[18px] font-heading font-bold text-primary leading-none">
                    2025
                  </span>
                  <span className="text-[9px] uppercase tracking-widest font-medium opacity-80">
                    LO President
                  </span>
                </motion.div>

                {/* Badge 4: Bottom Right - Project Stats */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="absolute bottom-6 right-6 z-20 flex items-center gap-3 bg-white px-5 py-4 rounded-3xl shadow-md border border-primary/5"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Layers size={18} />
                  </div>
                  <div className="leading-tight">
                    <p className="text-sm font-bold text-dark tracking-tight">
                      217+ Builds
                    </p>
                    <p className="text-[10px] text-muted font-medium uppercase tracking-tighter">
                      Digital Systems
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Refined Stats Section */}
      <section className="relative grid-bg home-section overflow-hidden">
        {/* soft ambient wash */}
        {/* <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[220px] bg-primary/10 blur-3xl rounded-full" /> */}

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-y-14 md:gap-y-0">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="relative flex flex-col items-center text-center px-6"
              >
                {/* vertical separator */}
                {index !== 0 && (
                  <span className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-10 w-px bg-primary/25" />
                )}

                {/* number container */}
                <div className="font-heading text-[32px] md:text-[38px] text-dark tracking-tight leading-none flex items-center lining-nums">
                  <AnimatedCounter value={stat.value} />
                  <span className="text-primary ml-1 lining-nums font-bold">+</span>
                </div>

                {/* label */}
                <p className="mt-2 text-[16px] font-bold md:text-[14px]  text-dark max-w-[160px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Situation */}
      <section className="relative overflow-hidden bg-[#FAFAF8] home-section">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          {/* Container with a defined height to anchor absolute children */}
          <div className="relative flex flex-col lg:block lg:min-h-[500px]">
            {/* MAROON GRADIENT SLAB */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative lg:absolute left-0 top-0 w-full lg:w-[45%] rounded-[2.5rem] lg:rounded-r-none overflow-hidden z-10 min-h-[360px] sm:min-h-[420px] lg:min-h-[480px]"
              style={{
                background:
                  "linear-gradient(165deg, #7B1E3A 0%, #9B3E5A 50%, #B8859E 100%)",
              }}
            >
              <div className="relative z-10 px-6 sm:px-10 lg:px-16 py-12 sm:py-14 lg:py-16 h-full flex flex-col justify-center min-h-[360px] sm:min-h-[420px] lg:min-h-[480px]">
                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-white uppercase tracking-[0.2em] text-xs font-bold mb-8"
                >
                  Currently
                </motion.div>

                {/* Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="text-[#FAFAF8] mb-8 font-heading text-[clamp(2.4rem,4vw,3.5rem)] leading-[1.1]"
                >
                  What I'm Doing Now
                </motion.h2>

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 0.4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="h-[1px] w-24 bg-[#F6F1EB]"
                  style={{ transformOrigin: "left" }}
                />
              </div>

              {/* Texture Overlay */}
              {/* <div
                className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              /> */}
            </motion.div>

            {/* RIGHT CARDS — Aligned to the vertical center of the slab */}
            <div className="relative lg:absolute lg:top-1/2 lg:left-[40%] lg:-translate-y-1/2 z-20 mt-8 lg:mt-0">
              <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-stretch px-4 lg:px-0">
                {roles.map((role, index) => {
                  const IconComponent = role.icon;

                  return (
                    <motion.div
                      key={role.title}
                      initial={{ opacity: 0, y: 40, x: 20 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      whileHover={{ y: -10 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.9,
                        delay: 0.4 + index * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`relative bg-white rounded-[2rem] border border-[#E4D7CE] shadow-[0_20px_50px_rgba(0,0,0,0.08)] px-8 py-8 w-full max-w-[380px] flex flex-col justify-between ${
                        index === 0 ? "z-30" : "z-20"
                      }`}
                    >
                      <div>
                        {/* Header */}
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7B1E3A] to-[#9B2E4A] flex items-center justify-center text-white shadow-lg">
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-heading text-[1.4rem] text-[#2A2A2A] leading-tight">
                              {role.title}
                            </h3>
                            <p className="text-sm text-[#7B1E3A] font-bold tracking-wide">
                              {role.organization}
                            </p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-[#6B6B6B] mb-8 text-[1rem] leading-relaxed">
                          {role.description}
                        </p>
                      </div>

                      {/* Socials */}
                      <div className="flex flex-wrap gap-3">
                        {role.socials.map((social) => (
                          <a
                            key={social.name}
                            href={social.url}
                            aria-label={social.name}
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#F6F1EB] border border-[#E4D7CE] text-[#7B1E3A] hover:bg-[#7B1E3A] hover:text-white hover:border-[#7B1E3A] transition-transform duration-200 ease-out hover:-translate-y-2.5"
                          >
                            <social.icon className="w-4.5 h-4.5" />
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey section */}
      <section className="relative bg-background pt-12 pb-12 overflow-hidden grid-bg">
        <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary tracking-widest uppercase text-[10px] font-bold bg-primary/5 px-2 py-1">
              Timeline
            </span>
            <h2 className="font-heading text-3xl md:text-4xl text-dark mt-2 text-center">
              My Story <span className="text-primary italic">In Frames</span>
            </h2>
          </motion.div>
        </div>

        {/* Scrollable Container */}
        <div className="relative">
          <button
            type="button"
            onClick={() => scrollJourney(-1)}
            aria-label="Scroll journey left"
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-white/80 text-primary shadow-sm backdrop-blur hover:bg-primary hover:text-white transition"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            type="button"
            onClick={() => scrollJourney(1)}
            aria-label="Scroll journey right"
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-white/80 text-primary shadow-sm backdrop-blur hover:bg-primary hover:text-white transition"
          >
            <ChevronRight size={14} />
          </button>

          <div
            ref={journeyScrollRef}
            onPointerDown={handleJourneyPointerDown}
            onPointerMove={handleJourneyPointerMove}
            onPointerUp={handleJourneyPointerUp}
            onPointerLeave={handleJourneyPointerUp}
            className="relative overflow-x-auto no-scrollbar pb-10 cursor-grab active:cursor-grabbing"
          >
            {/* Visual Wire */}
            <div className="absolute top-[30px] left-0 w-full h-[1px] bg-muted/20 z-0" />

            {/* Flex Wrapper */}
            <div className="flex flex-nowrap gap-6 md:gap-10 px-4 sm:px-6 md:px-[10%] min-w-max pt-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  {/* THE CLIP */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30 w-3 h-10 bg-gradient-to-b from-[#e5e7eb] to-[#9ca3af] rounded-sm shadow-sm border-x border-white/30">
                    <div className="w-full h-[1px] bg-black/5 mt-2" />
                  </div>

                  {/* POLAROID CARD */}
                  <motion.div
                    whileHover={{
                      rotate: 8,
                    }}
                    transition={{ type: "spring", stiffness: 110, damping: 22 }}
                    className="relative bg-white p-2.5 pb-6 sm:p-3 sm:pb-8 shadow-soft border border-black/5 origin-top transition-transform duration-500 cursor-help will-change-transform"
                    style={{
                      width: "clamp(180px, 55vw, 220px)",
                      rotate: milestone.rotate || (index % 2 === 0 ? -3 : 3),
                    }}
                  >
                    {/* The Image */}
                    <div className="relative bg-muted/5 aspect-[4/5] overflow-hidden mb-3">
                      <ImageWithFallback
                        src={milestone.image}
                        alt={milestone.title}
                        className="w-full h-full object-cover  transition-all duration-700"
                      />

                      {/* HOVER OVERLAY*/}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#4A1020]/95 via-[#7B1E3A]/70 to-[#B8899B]/10 p-5 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <h4 className="text-white font-heading text-base mb-1 border-b border-white/20 pb-2 w-full ">
                          {milestone.title}
                        </h4>
                        <p className="text-white/90 text-[10px] leading-relaxed font-body mt-2 text-4xl">
                          {milestone.description}
                        </p>
                      </div>
                    </div>

                    {/* The Year */}
                    <div className="text-center font-heading text-xl text-dark group-hover:text-primary transition-colors lining-nums">
                      {milestone.year}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Centered Scroll Indicator instead of a bar */}
        {/* <div className="flex justify-center items-center gap-2 text-muted/40 text-[9px] uppercase tracking-[0.3em] mt-4">
          <div className="w-12 h-[1px] bg-muted/20"></div> 
          <span className="font-semibold">DRAG OR SCROOL TO NAVIGATE</span>
           <div className="w-12 h-[1px] bg-muted/20"></div> 
        </div> */}
      </section>

      {/* Gallery section */}
      <section className="home-section px-6 sm:px-10 lg:px-20 max-w-[1440px] mx-auto bg-[#FAFAF8]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="text-[#C9A24D] tracking-[0.3em] uppercase mb-4">
            Events & Moments
          </div>
          <h2 className="text-[#2A2A2A] text-3xl md:text-4xl sm:text-4xl lg:text-[3.5rem]">
            Captured <span className="text-[#7B1E3A]">Experiences</span>
          </h2>
        </motion.div>

        {/* Staggered masonry-style grid */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {galleryItems.map((item, index) => {
              const baseTilt = item.rotate || 0;
              const hoverTilt = baseTilt + (baseTilt >= 0 ? 3 : -3);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`${index === 1 || index === 4 ? "mt-6" : ""} ${
                    index === 2 || index === 5 ? "mt-12" : ""
                  }`}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      rotate: hoverTilt,
                      y: -12,
                      zIndex: 10,
                    }}
                    onHoverStart={() => setHoveredId(item.id)}
                    onHoverEnd={() => setHoveredId(null)}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 18,
                      mass: 0.8,
                    }}
                    className="relative cursor-pointer group"
                    style={{
                      rotate: baseTilt,
                      transformOrigin: "center",
                    }}
                  >
                    {/* Image container with organic shadow */}
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.title}
                        className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Gradient overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredId === item.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-t from-[#7B1E3A]/90 via-[#7B1E3A]/50 to-transparent flex flex-col justify-end p-6"
                      >
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{
                            y: hoveredId === item.id ? 0 : 20,
                            opacity: hoveredId === item.id ? 1 : 0,
                          }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          <h3 className="text-white mb-2">{item.title}</h3>
                          <p className="text-white/90">{item.location}</p>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Subtle paper texture effect */}
                    {/* <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        boxShadow:
                          hoveredId === item.id
                            ? "0 25px 50px -12px rgba(123, 30, 58, 0.3)"
                            : "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                        transition: "box-shadow 0.4s ease",
                      }}
                    /> */}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* View all events CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        ></motion.div>
      </section>

      {/* Great Achievements */}
      <section className="relative bg-background home-section overflow-hidden">
        {/* ambient flow accents */}
        <div className="pointer-events-none absolute top-20 left-0 w-[420px] h-[420px] rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 w-[520px] h-[520px] rounded-full bg-primary/5 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="max-w-2xl mx-auto mb-14 text-center">
            <p className="text-xs text-center uppercase tracking-[0.4em] text-[#C9A24D] mb-5">
              Great Achievements
            </p>
            <h2 className="font-heading  text-center text-3xl md:text-4xl text-dark leading-tight">
              Wins that fuel the journey forward
            </h2>
          </div>

          {/* FLOW WRAPPER */}
          <div className="grid grid-cols-1 gap-10 items-start lg:[grid-template-columns:1.15fr_0.85fr]">
            {/* Feature visual */}
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative overflow-hidden rounded-[28px] border border-primary/10 shadow-[0_30px_90px_rgba(0,0,0,0.08)] h-[320px] sm:h-[380px] lg:h-[420px] bg-gradient-to-br from-primary/8 via-transparent to-primary/5"
            >
              <img
                src={achievements[active].image}
                alt={achievements[active].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-[11px] uppercase tracking-[0.25em] mb-3">
                  {achievements[active].tag}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl leading-tight">
                  {achievements[active].title}
                </h3>
              </div>
            </motion.div>

            {/* Details + selectors */}
            <div className="flex flex-col gap-6">
              <motion.div
                key={`text-${active}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="rounded-[24px] bg-white/80 backdrop-blur border border-primary/10 shadow-[0_22px_70px_rgba(0,0,0,0.06)] p-8"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
                  Highlight
                </p>

                <h3 className="font-heading text-3xl md:text-4xl text-dark mb-3">
                  {achievements[active].title}
                </h3>

                <p className="text-primary font-medium mb-4">
                  {achievements[active].tag}
                </p>

                <p className="text-muted leading-[1.8]">
                  {achievements[active].description}
                </p>
              </motion.div>

              {/* Selector chips */}
              <div className="flex flex-wrap gap-3">
                {achievements.map((item, idx) => (
                  <button
                    key={item.title}
                    onClick={() => setActive(idx)}
                    className={`group relative flex items-center gap-3 rounded-full px-3 py-2 transition border bg-white/70 backdrop-blur
                    ${
                      active === idx
                        ? "border-primary/60 shadow-lg shadow-primary/10"
                        : "border-primary/10 hover:border-primary/40 hover:shadow-md"
                    }`}
                  >
                    <div className="h-12 w-12 rounded-full overflow-hidden border border-primary/10 shadow-sm">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-primary">
                        {item.tag}
                      </p>
                      <p className="text-sm font-medium text-dark leading-tight">
                        {item.title}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-background home-section px-4 grid-bg">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            {/* LEFT — FEATURED BLOG */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-lg"
            >
              <p className="text-[#C9A24D] text-sm font-medium mb-4">
                From the Journal
              </p>

              <h2 className="font-heading text-4xl md:text-5xl leading-tight text-dark mb-6">
                {featuredBlog.title}
              </h2>

              <p className="text-muted mb-8">{featuredBlog.excerpt}</p>

              <Link
                to={`/blog/${featuredBlog.slug}`}
                className="inline-flex items-center text-primary font-medium group"
              >
                Read the full article
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* RIGHT — SUPPORTING THOUGHTS */}
            <div className="space-y-12">
              {secondaryBlogs.map((blog, index) => (
                <motion.div
                  key={blog.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="max-w-md"
                >
                  <Link to={`/blog/${blog.slug}`} className="group block">
                    <p className="text-xs uppercase tracking-wide mb-2 text-[#C9A24D]">
                      {blog.category}
                    </p>

                    <h3 className="font-heading text-xl md:text-2xl text-dark leading-snug group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                  </Link>
                </motion.div>
              ))}

              <Link
                to="/blog"
                className="inline-flex items-center text-sm font-medium text-primary group mt-8"
              >
                View all writing
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Let's work together section */}
      <section className="relative bg-background py-16 md:py-24 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="cta-panel overflow-hidden group"
          >
            {/* ANIMATED RINGS */}
            <div className="cta-rings" aria-hidden="true">
              {[1, 2, 3, 4].map((num) => (
                <motion.span
                  key={num}
                  className={`cta-ring cta-ring-${num}`}
                  animate={{
                    rotate: num % 2 === 0 ? 360 : -360,
                    scale: [1.5, 1.05, 1.5],
                  }}
                  transition={{
                    rotate: {
                      duration: 20 + num * 5, // Each ring moves at a different speed
                      repeat: Infinity,
                      ease: "linear",
                    },
                    scale: {
                      duration: 4 + num,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                />
              ))}
            </div>

            {/* CONTENT WITH STAGGERED ENTRANCE */}
            <div className="cta-content relative z-10">
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="cta-eyebrow"
              >
                A gentle next step
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="cta-title"
              >
                Let's Work together.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="cta-sub"
              >
                Join a community of entrepreneurs building clarity, confidence,
                and sustainable businesses without burnout or noise.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="cta-actions"
              >
                <Link to="/register">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="cta-pill cta-pill-primary flex items-center gap-2"
                  >
                    Register Now
                    <ArrowRight className="cta-pill-icon" />
                  </motion.div>
                </Link>

                <motion.button
                  type="button"
                  onClick={() => onBookClick?.()}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="cta-pill cta-pill-secondary flex items-center gap-2"
                >
                  Book 1:1 coffee
                  <ArrowRight className="cta-pill-icon" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}



