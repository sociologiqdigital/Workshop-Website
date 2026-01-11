import FAQSection from "./FaqSection";
import { motion } from "framer-motion";
import { Testimonial } from "./Testimonial";
import AboutImg from "../styles/images/AboutImg.jpg";
import { Link } from "react-router-dom";
import PremiumCarousel from "./PremiumCarousel";

export default function About() {
  const journey = [
    {
      year: "2018",
      title: "Tech Mahindra",
      text: "Database Administrator, gaining hands-on experience in systems and infrastructure.",
    },
    {
      year: "2019",
      title: "Capgemini",
      text: "Technical Support Head, sharpening leadership and problem-solving.",
    },
    {
      year: "The Shift",
      title: "Entrepreneurship",
      text: "A conscious choice to build something meaningful and own her journey.",
    },
    {
      year: "Upskilling",
      title: "Digital Strategy",
      text: "8-9 months of mastery in digital marketing and performance growth.",
    },
    {
      year: "June 2019",
      title: "First Milestone",
      text: "KIMS Hospital project marked the transition from freelancer to agency owner.",
    },
    {
      year: "2020",
      title: "SociologiQ",
      text: "Registered the agency and established the Nagpur headquarters.",
    },
  ];

  return (
    <div className="bg-background selection:bg-primary/20">
      <PremiumCarousel />

      <section className="relative pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
        {/* Ambient background wash - removing whitespace via depth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30 pointer-events-none grid-bg" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* TEXT CONTENT: STAGGERED & BOX-FREE */}
            <div className="lg:col-span-6 space-y-10">
              <header className="space-y-4">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="text-xs font-bold tracking-[0.4em] uppercase text-primary/60 block"
                >
                  The Visionary
                </motion.span>
                <h2 className="font-heading text-5xl md:text-7xl text-dark leading-[1.1]">
                  About <br />
                  <span className="text-primary italic">The Founder</span>
                </h2>
              </header>

              <div className="space-y-6 text-lg md:text-xl text-muted/90 max-w-lg">
                <p className="leading-relaxed">
                  Ruchi Dorlikar is a{" "}
                  <span className="text-dark font-semibold">
                    tech-driven digital strategist
                  </span>{" "}
                  who transitioned from corporate IT into entrepreneurship with
                  a bold creative leap.
                </p>
                <p className="text-base leading-relaxed opacity-80">
                  Her journey connects deep technical roots with human insight,
                  building a brand that thrives on data-led strategy and
                  purpose.
                </p>
              </div>

              <div className="pt-6">
                <button className="btn-primary px-10 py-5 text-base shadow-xl hover:shadow-primary/20 transition-all flex items-center gap-3">
                  Book 1 to 1 call
                  <span className="w-6 h-[1px] bg-white/50" />
                </button>
              </div>
            </div>

            {/* IMAGE: ASYMMETRIC MASK */}
            <div className="lg:col-span-6 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative z-10 aspect-[4/5] overflow-hidden group shadow-2xl"
                style={{ borderRadius: "100px 30px 100px 30px" }}
              >
                <img
                  src={AboutImg}
                  alt="Ruchi Dorlikar"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[inherit]" />
              </motion.div>
              {/* Soft decorative accent */}
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
            </div>
          </div>

          {/* TIMELINE: BOX-FREE HORIZONTAL SCROLL / WRAP */}
          <div className="mt-32">
            <h3 className="font-heading text-3xl text-dark mb-16 text-center lg:text-left">
              Her journey <span className="text-primary">at a glance</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
              {journey.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-10 border-l border-primary/10 group"
                >
                  <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-primary ring-4 ring-background group-hover:scale-150 transition-transform" />
                  <span className="text-sm font-bold text-primary tracking-tighter mb-2 block">
                    {item.year}
                  </span>
                  <h4 className="font-heading text-xl text-dark mb-3">
                    {item.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted group-hover:text-dark transition-colors">
                    {item.text}
                  </p>
                </motion.div>
              ))}
              <div className="flex items-center">
                <Link
                  to="https://sociologiq.in/"
                  target="blank"
                  className="text-primary font-bold hover:underline underline-offset-8 flex items-center gap-2"
                >
                  Explore SociologiQ →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection className="bg-background pt-6 md:pt-8 pb-16" />

      {/* NOTE SECTION: REFINED WITH BLOB */}
      <section className="relative py-20 md:py-24 overflow-hidden flex items-center justify-center">
        {/* Same blob animation preserved as per instruction */}
        <div
          aria-hidden="true"
          className="note-blob opacity-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block relative px-10">
            {/* Same vertical line animation preserved */}
            <motion.span
              animate={{ scaleY: [0.85, 1, 0.85] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 top-0 h-full w-[3px] bg-primary/30 origin-top rounded-full"
            />

            <p className="text-xs font-bold tracking-[0.5em] uppercase text-primary mb-10">
              A Note from the Founder
            </p>

            <blockquote className="font-heading text-3xl md:text-5xl text-dark leading-[1.2] mb-12">
              “Building a brand isn’t just about likes or logos — it’s about
              <span className="text-primary italic"> understanding people</span>
              , solving real problems, and staying consistent.”
            </blockquote>

            <div className="space-y-2">
              <p className="text-dark font-bold text-lg">Ruchi Dorlikar</p>
              <p className="text-primary text-sm tracking-widest uppercase">
                Founder & CEO
              </p>
            </div>
          </div>
        </div>
      </section>

      <Testimonial />
    </div>
  );
}
