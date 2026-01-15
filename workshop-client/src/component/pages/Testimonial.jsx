import React from "react";
import { motion } from "framer-motion";
import { Twitter } from "lucide-react";
import { testimonials } from "../data/Testimonial";


const TestimonialCard = ({ item }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="
      bg-white/80
      backdrop-blur-lg
      p-6
      rounded-3xl
      border border-white/60
      shadow-[0_12px_40px_rgba(150,103,224,0.12)]
    "
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#9667E0]/20 flex items-center justify-center text-[#9667E0] font-semibold">
          {item.name[0]}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-dark">{item.name}</h4>
          <p className="text-[11px] text-primary tracking-wide">
            {item.handle}
          </p>
        </div>
      </div>
      <Twitter size={14} className="text-primary/40" />
    </div>

    <p className="text-sm text-muted leading-relaxed italic mb-4">
      “{item.text}”
    </p>

    <span className="text-[10px] uppercase tracking-widest text-muted/60">
      {item.date}
    </span>
  </motion.div>
);


const TestimonialColumn = ({ list, reverse, duration }) => (
  <motion.div
    initial={{ y: reverse ? "-50%" : "0%" }}
    animate={{ y: reverse ? "0%" : "-50%" }}
    transition={{ repeat: Infinity, duration, ease: "linear" }}
    className="flex flex-col gap-6"
  >
    {[...list, ...list].map((item, i) => (
      <TestimonialCard key={i} item={item} />
    ))}
  </motion.div>
);


const TestimonialSection = () => {
  return (
    <section className="relative section bg-[#F2EBFB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-accent text-xs tracking-widest uppercase font-semibold">
              Community Voices
            </span>

            <h2 className="font-heading text-5xl leading-tight text-dark">
              Built with care, <br />
              <span className=" text-accent font-bold">
                trusted by action-takers.
              </span>
            </h2>

            <p className="text-muted text-lg max-w-md mx-auto lg:mx-0">
              These aren’t testimonials. They’re reflections from people who
              chose clarity over confusion.
            </p>
          </div>

          {/* RIGHT MARQUEE */}
          <div className="lg:col-span-7 relative h-[640px]">
            {/* TOP MASK */}
            <div
              className="absolute top-0 left-0 right-0 h-32 z-20 pointer-events-none
          bg-gradient-to-b from-[#F7F5FB] via-[#F7F5FB]/70 to-transparent"
            />

            {/* BOTTOM MASK */}
            <div
              className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none
          bg-gradient-to-t from-[#F7F5FB] via-[#F7F5FB]/70 to-transparent"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full px-2">
              <TestimonialColumn
                list={testimonials.slice(0, 3)}
                duration={36}
              />
              <div className="hidden md:block">
                <TestimonialColumn
                  list={testimonials.slice(3, 6)}
                  reverse
                  duration={44}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
