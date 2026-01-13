import { motion } from "framer-motion";

export default function MarqueeNotice() {
  const messages = [
    "🚀 Hurry up! Limited seats left for the 4-Week Digital Business Workshop",
    "🔥 Free bonuses for early enrollment",
    "📢 No experience needed — step-by-step guidance included!",
    "✨ Build your brand live with direct mentorship",
  ];

  // We duplicate the array to ensure there's no gap during the loop
  const duplicatedMessages = [...messages, ...messages];

  return (
    <section className="relative overflow-hidden bg-[rgb(var(--color-primary))] py-3 border-y-2 border-white/20">
      <div className="flex items-center justify-center whitespace-nowrap">
        <motion.div
          className="flex items-center w-max"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            ease: "linear",
            duration: 30, // Adjust this for speed (higher = slower)
            repeat: Infinity,
          }}
        >
          {duplicatedMessages.map((text, idx) => (
            <div key={idx} className="flex items-center">
              <span className="mx-8 text-base md:text-lg font-bold uppercase tracking-widest text-white/90">
                {text}
              </span>
              {/* Decorative Separator */}
              <span className="w-2 h-2 rounded-full bg-[rgb(var(--color-wine))] opacity-50" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
