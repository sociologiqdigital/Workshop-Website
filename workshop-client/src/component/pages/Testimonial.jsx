import React from "react";
import { motion } from "framer-motion";
import { Twitter } from "lucide-react";

const testimonials = [
  {
    name: "Thomas Cruz",
    handle: "@thomasc",
    text: "ShowTrackr is a real gem! I started using it a couple months ago and it completely changed the way I track shows.",
    date: "Jan 18, 2024",
  },
  {
    name: "Patrick Martin",
    handle: "@patmart",
    text: "I use ShowTrackr every day, and it's awesome! I track all of my TV shows in it. :)",
    date: "Jan 18, 2024",
  },
  {
    name: "Bruce Murphy",
    handle: "@bmurphy",
    text: "The community is great and the features are exactly what I needed for my digital workflow.",
    date: "Jan 20, 2024",
  },
  {
    name: "Megan Walters",
    handle: "@megan_w",
    text: "Finally a tool that understands how I work. Highly recommend to everyone!",
    date: "Feb 02, 2024",
  },
  {
    name: "Crystal Perkins",
    handle: "@crystal_p",
    text: "Amazing experience so far. The support team is also very responsive.",
    date: "Feb 10, 2024",
  },
  {
    name: "Andrew Cook",
    handle: "@acook",
    text: "Clean UI and very intuitive. It's become a core part of my daily routine.",
    date: "Feb 12, 2024",
  },
];

const TestimonialColumn = ({ list, delay = 0, reverse = false }) => (
  <motion.div
    initial={{ y: reverse ? "-50%" : "0%" }}
    animate={{ y: reverse ? "0%" : "-50%" }}
    transition={{ duration: 35, repeat: Infinity, ease: "linear", delay }}
    className="flex flex-col gap-6"
  >
    {[...list, ...list].map((item, idx) => (
      <div
        key={idx}
        // Using var(--color-surface) and var(--color-primary) for the hover shadow
        className="bg-[rgb(var(--color-surface))] border border-[rgb(var(--color-accent))]/20 p-6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(var(--color-primary),0.15)] transition-all duration-300 group"
      >
        <div className="flex items-center gap-3 mb-4">
          {/* Avatar using your primary to accent gradient */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[rgb(var(--color-primary))] to-[rgb(var(--color-accent))] flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h4 className="text-[rgb(var(--color-dark))] font-bold text-sm truncate">
              {item.name}
            </h4>
            <p className="text-[rgb(var(--color-muted))] text-xs">
              {item.handle}
            </p>
          </div>
          <Twitter
            size={16}
            className="text-[#1DA1F2] opacity-40 group-hover:opacity-100 transition-opacity"
          />
        </div>
        <p className="text-[rgb(var(--color-dark))] text-sm leading-relaxed mb-4">
          "{item.text}"
        </p>
        <span className="text-[rgb(var(--color-muted))] text-[10px] font-semibold uppercase tracking-wider">
          {item.date}
        </span>
      </div>
    ))}
  </motion.div>
);

const TestimonialSection = () => {
  return (
    // Background matches your --color-background peach tone
    <section className="bg-background py-24 overflow-hidden relative">
      {/* Soft Decorative Blobs using your CSS class for consistency */}
      <div className="blob w-[400px] h-[400px] top-0 right-0 -translate-y-1/2 translate-x-1/4" />
      <div className="blob w-[300px] h-[300px] bottom-0 left-0 translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Branding Content */}
        <div className="lg:col-span-5 space-y-8 relative z-10">
          <div className="inline-block px-4 py-1.5 bg-[rgb(var(--color-accent))]/30 rounded-full">
            <span className="text-[rgb(var(--color-primary))] font-bold tracking-widest uppercase text-xs">
              Community
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold leading-[1.1] text-[rgb(var(--color-dark))]">
            We believe in the <br />
            <span className="text-[rgb(var(--color-primary))]">power of </span>
            <span className="italic font-serif">community</span>
          </h2>

          <p className="text-[rgb(var(--color-muted))] text-lg leading-relaxed max-w-md">
            Join hundreds of women and freelancers who have already started
            their digital journey. Real people, real results, every single day.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            // Replaces hardcoded hex with your --color-primary and your custom hover style
            className="hero-primary px-10 py-4 text-sm uppercase tracking-widest"
          >
            Read all testimonials
          </motion.button>
        </div>

        {/* Right Animated Wall */}
        <div className="lg:col-span-7 h-[650px] relative">
          {/* Gradient Fades: Fading from the peach background color to transparent */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[rgb(var(--color-background))] to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[rgb(var(--color-background))] to-transparent z-10 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full overflow-hidden">
            <TestimonialColumn list={testimonials.slice(0, 3)} />
            <div className="hidden md:block">
              <TestimonialColumn
                list={testimonials.slice(3, 6)}
                reverse
                delay={2}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
