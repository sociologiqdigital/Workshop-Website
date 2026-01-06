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
import { bonusesData } from "../data/bonusesData";
import MarqueeNotice from "./MarqueeNotice";
import { programs, programStatusStyles } from "../data/courses";
import { milestones } from "../data/Journey";
import { upcomingEvents } from "../data/upcomingEvents";
import { ImageWithFallback } from "../common/ImageWithFallback";
// Images and Illustration imports
import BenefitImage from "../styles/images/whoBenefitImg.jpg";
import HeroImg from "../styles/images/HeroImg.png";
import AchievementImg from "../styles/images/achivementImg.jpg";

import {
  Calendar,
  Users,
  UserCheck,
  Video,
  Clock,
  ArrowRight,
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
  Briefcase
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
export default function Home() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const words = [
    "Founder",
    "CEO",
    "Coach",
    "Mentor",
    "Strategist",
    "Trainer",
    "IPP",
  ];
  const typedWord = useTypewriter(words);
  const [active, setActive] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);
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
        { name: "LinkedIn", icon: Linkedin, url: "#" },
        { name: "Instagram", icon: Instagram, url: "#" },
        { name: "Twitter", icon: Twitter, url: "#" },
        { name: "Facebook", icon: Facebook, url: "#" },
      ],
    },
    {
      title: "IPP",
      organization: "JCI Nagpur",
      description:
        "Actively contributing as an IPP at JCI Nagpur, supporting leadership, community development, and youth-driven initiatives.",
      icon: Users,
      socials: [
        { name: "Instagram", icon: Instagram, url: "#" },
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

  function useTypewriter(words, speed = 350, pause = 1500) {
    const [index, setIndex] = useState(0);
    const [text, setText] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
      const currentWord = words[index % words.length];

      const timeout = setTimeout(
        () => {
          if (!deleting) {
            setText(currentWord.slice(0, text.length + 1));
            if (text === currentWord) {
              setTimeout(() => setDeleting(true), pause);
            }
          } else {
            setText(currentWord.slice(0, text.length - 1));
            if (text === "") {
              setDeleting(false);
              setIndex((prev) => prev + 1);
            }
          }
        },
        deleting ? speed / 2 : speed
      );

      return () => clearTimeout(timeout);
    }, [text, deleting, index, speed, pause, words]);

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

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-background pt-[120px] pb-20 sm:pt-[140px] sm:pb-24 md:pt-[180px] md:pb-32 grid-bg">
        {/* Soft editorial background accents */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[360px] bg-primary/10 rounded-[50%] blur-3xl" />
        <div className="pointer-events-none absolute top-40 right-[-160px] hidden md:block w-[320px] h-[320px] bg-primary/8 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-24 items-center">
            {/* LEFT CONTENT */}
            <motion.div
              className="
          relative
          max-w-[560px]
          mx-auto
          md:mx-0
          text-center
          md:text-left
        "
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
              }}
            >
              {/* Greeting */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex justify-center md:justify-start items-center gap-2 text-[13px] md:text-[15px] text-muted mb-3"
              >
                <span className="font-medium text-dark">Hello</span>
                <span className="font-medium text-dark">, I’am</span>
              </motion.p>

              {/* Name */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="font-heading text-[40px] sm:text-[44px] md:text-[64px] text-dark leading-[1.1] mb-6"
              >
                Ruchi <span className="text-primary">Dorlikar</span>
              </motion.h1>

              {/* Editorial divider */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, width: 0 },
                  visible: { opacity: 1, width: "56px" },
                }}
                className="h-[2px] bg-primary/60 mb-7 mx-auto md:mx-0"
              />

              {/* Typewriter line */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-primary text-4xl sm:text-5xl md:text-5xl font-medium tracking-wide mb-7"
              >
                {" "}
                <span className="relative">
                  {typedWord}
                  <span className="inline-block ml-[2px] type-cursor"></span>
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="
            text-[16px] sm:text-[17px] md:text-[18px]
            text-muted
            leading-[1.75]
            mb-12
            max-w-[520px]
            mx-auto
            md:mx-0
          "
              >
                Creating digital paths with clarity,{" "}
                <span className="text-dark font-medium">
                  confidence, and conscious growth
                </span>{" "}
                for modern brands and leaders.
                <Link
                  to="/about"
                  className="
                    inline-flex items-center text-[12px] md:text-[13px]
                    font-medium text-primary ml-2 underline underline-offset-4
                  "
                >
                  Know your Coach
                  <ArrowRight className="ml-1 w-3 h-3" />
                </Link>
              </motion.p>
            </motion.div>
            {/* RIGHT IMAGE */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative hidden md:flex justify-center lg:justify-end items-center"
            >
              {/* image */}
              <ImageWithFallback
                src={HeroImg}
                alt="Ruchi Dorlikar"
                className="relative z-10 w-[360px] h-[460px] object-cover rounded-[32px]"
              />

              {/* floating badge - top left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="absolute top-6 left-32 z-20 flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-md"
              >
                <Compass className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-dark tracking-wide">
                  Clarity Coach
                </span>
              </motion.div>

              {/* floating badge - bottom left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="absolute bottom-6 left-32 z-20 flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-md"
              >
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-dark">
                  80+ workshops
                </span>
              </motion.div>

              {/* floating badge - bottom right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className="absolute bottom-4 -right-4 z-20 flex items-center gap-3 bg-white px-4 py-3 rounded-2xl shadow-md"
              >
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Layers size={16} />
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-dark">217+ builds</p>
                  <p className="text-[11px] text-muted">Digital systems</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Current Situation */}
      <section className="py-20 px-6 md:px-12 bg-[#F6F1EB]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[0.55fr_0.45fr] rounded-3xl overflow-hidden shadow-2xl bg-white">
          {/* Left Panel */}
          <div className="relative bg-gradient-to-br from-[#7B1E3A] via-[#8e2a48] to-[#6a182f] text-white">
            <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.12), transparent 26%)" }} />
            <div className="relative px-10 py-16 md:px-14 md:py-20 space-y-6 max-w-xl">
              <p className="text-xs tracking-[0.35em] uppercase opacity-80">Currently</p>
              <h2 className="font-heading text-4xl leading-tight">
                Where I'm currently
                <br />
                showing up
              </h2>
              <p className="text-white/85 leading-relaxed max-w-md">
                The spaces where my energy, leadership, and focus are actively
                shaping meaningful work right now.
              </p>
              <div className="mt-10 space-y-2">
                <div className="h-px w-24 bg-white/40" />
                <div className="h-px w-16 bg-white/20" />
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="relative bg-[#FBF5EF] px-8 md:px-12 py-12 flex items-center lg:-ml-16 lg:z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
              {roles.map((role, index) => (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                  className="rounded-2xl bg-white border border-[#E4D7CE] p-6 shadow-[0_10px_28px_rgba(0,0,0,0.05)] flex flex-col gap-4 h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7B1E3A] to-[#9B2E4A] flex items-center justify-center text-white shadow-md">
                    <role.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-dark mb-1">
                      {role.title}
                    </h3>
                    <p className="text-sm text-[#7B1E3A] font-semibold">
                      {role.organization}
                    </p>
                  </div>
                  <p className="text-[#4F4F4F] leading-relaxed text-sm flex-1">
                    {role.description}
                  </p>
                  <div className="flex flex-wrap gap-3 text-[13px] underline underline-offset-4">
                    {role.socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        className="text-[#7B1E3A] hover:text-[#9B2E4A] transition-colors"
                      >
                        {social.name}
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* What's new section */}
      <section className="relative bg-background py-28 overflow-hidden">
        {/* soft ambient glow */}
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-primary/10 blur-3xl rounded-full" />

        <div className="relative max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-20">
            <p className="text-xs uppercase tracking-[0.35em] text-primary mb-4">
              Upcoming
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-dark leading-tight">
              Events & Workshops
            </h2>
            <p className="mt-4 text-muted">
              Carefully curated spaces to learn, reflect, and grow.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative pl-8">
            {/* vertical line */}
            <span className="absolute left-0 top-0 bottom-0 w-px bg-primary/30" />

            <div className="space-y-16">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="relative">
                  {/* Date badge */}
                  <div className="absolute -left-[42px] top-1">
                    <span className="text-sm font-medium text-primary">
                      {new Date(event.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="group">
                    <p className="text-xs uppercase tracking-[0.25em] text-primary mb-2">
                      {event.type}
                    </p>

                    <h3 className="font-heading text-2xl md:text-3xl text-dark mb-3">
                      {event.title}
                    </h3>

                    <p className="text-muted mb-5">
                      {event.location} · {event.format || "Online"} ·{" "}
                      {event.duration}
                    </p>

                    {/* CTA */}
                    <button className="inline-flex items-center text-sm font-medium text-primary group-hover:underline underline-offset-4">
                      {event.cta}
                      <span className="ml-1 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Journey section */}
      <section className="py-32 px-6 lg:px-20 max-w-[1440px] mx-auto overflow-hidden grid-bg">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="text-[#C9A24D] tracking-[0.3em] uppercase mb-4 font-inter">
            My Journey
          </div>

          <h2 className="font-playfair text-[#2A2A2A] text-4xl md:text-[3.5rem] font-semibold mb-6">
            From Vision to <span className="text-[#7B1E3A]">Reality</span>
          </h2>

          <p className="text-[#6B6B6B] text-lg max-w-2xl mx-auto font-inter">
            A decade of transformation, growth, and impact—one milestone at a
            time.
          </p>
        </motion.div>

        {/* TIMELINE */}
        <div className="relative">
          {/* WAVY CONNECTING LINE */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
            viewBox="0 0 1400 1200"
            preserveAspectRatio="none"
          >
            <motion.path
              d="
          M 200 150
          C 450 220, 550 100, 750 180
          S 1050 260, 1200 160
          S 900 420, 700 380
          S 350 520, 200 460
          S 500 760, 900 720
          S 1200 900, 1100 1050
        "
              stroke="#C9A24D"
              strokeWidth="2"
              strokeDasharray="6 10"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.35 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
          </svg>

          {/* MILESTONES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-28 md:gap-y-40 relative z-10">
            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`flex flex-col items-start ${
                    isLeft ? "md:items-end md:pr-24" : "md:items-start md:pl-24"
                  }`}
                >
                  {/* POLAROID */}
                  <motion.div
                    whileHover={{
                      rotate: [0, 5, 0],
                      y: [0, -20, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="bg-white p-4 pb-8 shadow-[0_30px_60px_rgba(0,0,0,0.18)] mb-8 cursor-pointer"
                    style={{
                      transform: `rotate(${milestone.rotate}deg)`,
                      width: 320,
                    }}
                  >
                    <div className="overflow-hidden mb-4 ">
                      <ImageWithFallback
                        src={milestone.image}
                        alt={milestone.title}
                        className="w-full h-64 object-cover"
                      />
                    </div>

                    <div className="text-center font-playfair text-dark">
                      {milestone.year}
                    </div>
                  </motion.div>

                  {/* TEXT */}
                  <div
                    className={`max-w-md text-left ${
                      isLeft ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <h3 className="font-playfair text-[#7B1E3A] text-3xl font-semibold mb-3">
                      {milestone.title}
                    </h3>

                    <p className="text-[#6B6B6B] leading-relaxed font-inter">
                      {milestone.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery section */}
      <section className="py-32 px-20 max-w-[1440px] mx-auto bg-[#FAFAF8]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div
            className="text-dark tracking-[0.3em] uppercase mb-4"
            // style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Events & Moments
          </div>
          <h2
            className="text-[#2A2A2A]"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "3.5rem",
              fontWeight: 600,
            }}
          >
            Captured <span className="text-[#7B1E3A]">Experiences</span>
          </h2>
        </motion.div>

        {/* Staggered masonry-style grid */}
        <div className="relative">
          <div className="grid grid-cols-3 gap-8">
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
                  className={`${index === 1 || index === 4 ? "mt-12" : ""} ${
                    index === 2 || index === 5 ? "mt-24" : ""
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
                          <h3
                            className="text-white mb-2"
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              fontSize: "1.5rem",
                              fontWeight: 600,
                            }}
                          >
                            {item.title}
                          </h3>
                          <p
                            className="text-white/90"
                            // style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {item.location}
                          </p>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Subtle paper texture effect */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        boxShadow:
                          hoveredId === item.id
                            ? "0 25px 50px -12px rgba(123, 30, 58, 0.3)"
                            : "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                        transition: "box-shadow 0.4s ease",
                      }}
                    />
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
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="text-[#7B1E3A] border-2 border-[#7B1E3A] px-8 py-4 rounded-full transition-all duration-300 hover:bg-[#7B1E3A] hover:text-white"
            // style={{ fontFamily: "'Inter', sans-serif" }}
          >
            View All Events
          </motion.button>
        </motion.div>
      </section>
      {/* Great Achievements */}
      <section className="relative bg-background py-28 md:py-36 overflow-hidden">
        {/* ambient flow accents */}
        <div className="pointer-events-none absolute top-20 -left-20 w-[420px] h-[420px] rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-[-120px] w-[520px] h-[520px] rounded-full bg-primary/5 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="max-w-2xl mx-auto text-center mb-24">
            <p className="text-xs uppercase tracking-[0.4em] text-primary mb-5">
              Great Achievements
            </p>
            <h2 className="font-heading text-4xl md:text-5xl text-dark leading-tight">
              Wins that fuel the journey forward
            </h2>
          </div>

          {/* FLOW WRAPPER */}
          <div className="grid grid-cols-1 gap-12 items-center lg:[grid-template-columns:1.15fr_0.85fr]">
            {/* Feature visual */}
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative overflow-hidden rounded-[28px] border border-primary/10 shadow-[0_30px_90px_rgba(0,0,0,0.08)] min-h-[320px] bg-gradient-to-br from-primary/8 via-transparent to-primary/5"
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
            <div className="flex flex-col gap-8">
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

      {/* Refined Stats Section */}
      <section className="relative bg-background pt-16 md:pt-20 pb-20 md:pb-24 overflow-hidden">
        {/* soft ambient wash */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[220px] bg-primary/8 blur-3xl rounded-full" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* subtle baseline */}
          {/* <div className="hidden md:block absolute left-0 right-0 top-1/2 h-px bg-primary/20" /> */}

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

                {/* number */}
                <div className="font-heading text-[32px] md:text-[38px] text-dark tracking-tight leading-none">
                  {stat.value}
                  <span className="text-primary ml-1">+</span>
                </div>

                {/* label */}
                <p className="mt-2 text-[13px] md:text-[14px] italic text-muted max-w-[160px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-background py-8 px-4 grid-bg">
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
              <p className="text-primary text-sm font-medium mb-4">
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
                <motion.a
                  key={blog.slug}
                  href={blog.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group block max-w-md"
                >
                  <p className="text-xs uppercase tracking-wide text-muted mb-2">
                    {blog.category}
                  </p>

                  <h3 className="font-heading text-xl md:text-2xl text-dark leading-snug group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                </motion.a>
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
      {/* Closing CTA – Free Flow */}
      <section className="relative bg-background py-28 md:py-36 overflow-hidden">
        {/* subtle motion highlight */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-primary/10 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          {/* micro label */}
          <p className="text-xs uppercase tracking-[0.35em] text-primary mb-8">
            A gentle next step
          </p>

          {/* main statement */}
          <h2 className="font-heading text-4xl md:text-5xl text-dark leading-[1.2] mb-10">
            Ready to transform your journey?
          </h2>

          {/* divider */}
          <div className="mx-auto h-[2px] w-14 bg-primary/60 mb-10" />

          {/* supporting text */}
          <p className="text-[17px] md:text-[18px] leading-[1.75] text-muted max-w-2xl mx-auto mb-14">
            Join women who are building clarity, confidence, and sustainable
            businesses — without burnout or noise.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/register" className="btn btn-primary shine-button group">
              Register Now
            </a>

            <a href="/contact" className="btn btn-secondary">
              Contact Us
            </a>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      {/* <section className="bg-[#F6F1EB] py-20  grid-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
         
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#6B1F2B]">
              Get in Touch
            </h2>
            <p className="mt-4 text-[#7A6A6D]">
              Have questions about workshops or mentorship? We’d love to hear
              from you.
            </p>
          </div>

        
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 rounded-[32px] bg-[#EFE6DC] p-8 sm:p-10 md:p-14 shadow-sm">
            <div>
              <h3 className="text-xl font-semibold text-[#6B1F2B] mb-6">
                Contact Information
              </h3>

              <div className="space-y-6 text-sm text-[#7A6A6D]">
                <div className="flex gap-4">
                  <MapPin className="text-[#6B1F2B]" size={20} />
                  <span>
                    Uday Nagar, Nagpur, <br />
                    Maharashtra, India
                  </span>
                </div>

                <div className="flex gap-4">
                  <Phone className="text-[#6B1F2B]" size={20} />
                  <a href="tel:+91123456789" className="hover:underline">
                    +91 123456789
                  </a>
                </div>

                <div className="flex gap-4">
                  <Mail className="text-[#6B1F2B]" size={20} />
                  <a
                    href="mailto:sociologiqdigitalsolutions@gmail.com"
                    className="hover:underline"
                  >
                    sociologiqdigitalsolutions@gmail.com
                  </a>
                </div>
              </div>
              <p className="mt-8 text-xs text-[#7A6A6D]">
                We usually respond within 24–48 hours.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm text-[#6B1F2B] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 text-sm bg-transparent focus:outline-none focus:ring-2
        ${
          error.name
            ? "border-red-500 focus:ring-red-500"
            : "border-[#D8CFC5] focus:ring-[#6B1F2B]"
        }`}
                />
                {error.name && (
                  <p className="text-xs text-red-600 mt-1">{error.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-[#6B1F2B] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-3 text-sm bg-transparent focus:outline-none focus:ring-2
        ${
          error.email
            ? "border-red-500 focus:ring-red-500"
            : "border-[#D8CFC5] focus:ring-[#6B1F2B]"
        }`}
                />
                {error.email && (
                  <p className="text-xs text-red-600 mt-1">{error.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-[#6B1F2B] mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help"
                  className={`w-full rounded-lg border px-4 py-3 text-sm bg-transparent focus:outline-none focus:ring-2
        ${
          error.message
            ? "border-red-500 focus:ring-red-500"
            : "border-[#D8CFC5] focus:ring-[#6B1F2B]"
        }`}
                />
                {error.message && (
                  <p className="text-xs text-red-600 mt-1">{error.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-[#6B1F2B] px-8 py-3 text-sm font-medium text-[#F6F1EB] hover:bg-[#5A1823] transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section> */}
    </>
  );
}


