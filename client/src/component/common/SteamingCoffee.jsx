import React from "react";
import { motion } from "framer-motion";

export default function SteamingCoffee({ isHovered }) {
  const speed = isHovered ? 0.95 : 1.45;

  const steamAnim = (delay = 0) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: [0, 1, 0], opacity: [0, 0.9, 0] },
    transition: {
      duration: speed,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    },
  });

  return (
    <motion.span
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/12 ring-1 ring-white/15"
      animate={
        isHovered
          ? { scale: 1.05, rotate: [-2, 2, -2] }
          : { scale: 1, rotate: 0 }
      }
      transition={{ duration: 0.35, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        className="text-white"
      >
        {/* Steam (curvy + animated) */}
        <motion.path
          d="M9 3c1.1 1.2 1.1 2.5 0 3.7S7.9 9.3 9 10.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          {...steamAnim(0)}
        />
        <motion.path
          d="M12 2.5c1.1 1.2 1.1 2.5 0 3.7s-1.1 2.6 0 3.8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          {...steamAnim(0.18)}
        />
        <motion.path
          d="M15 3c1.1 1.2 1.1 2.5 0 3.7S13.9 9.3 15 10.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          {...steamAnim(0.36)}
        />

        {/* Cup */}
        <path
          d="M6.5 11.5h10v4.2a3.3 3.3 0 0 1-3.3 3.3H9.8a3.3 3.3 0 0 1-3.3-3.3v-4.2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Handle */}
        <path
          d="M16.5 12h1.1a2 2 0 1 1 0 4h-1.1"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Base */}
        <path
          d="M7.5 21h9"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </motion.span>
  );
}
