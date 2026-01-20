import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { programs } from "../data/courses";

export default function Navbar({ onBookClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  // useRef to avoid re-render loops
  const lastScrollY = useRef(0);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About Ruchi", to: "/about" },
    { label: "Blog", to: "/blog" },
    { label: "Workshops", to: "http://localhost:5174/" },
  ];

  /* ---------------- SCROLL LOGIC ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{
        y: showHeader ? 0 : -120,
        opacity: showHeader ? 1 : 0,
        scale: showHeader ? 1 : 0.98,
      }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 flex justify-center"
    >
      {/* NAVBAR */}
      <nav
        className="
          mt-5
          w-[92%] max-w-7xl
          h-[72px]
          flex items-center justify-between
          px-8
          rounded-full
          bg-primary/10
          backdrop-blur-xl
          border border-primary/15
          shadow-[0_12px_35px_rgba(122,30,45,0.14)]
          transition-all duration-300
        "
      >
        {/* LOGO */}
        <Link
          to="/"
          className="font-heading text-xl md:text-2xl text-dark tracking-tight hover:text-primary transition-colors"
        >
          Ruchi Dorlikar
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            if (link.dropdown) {
              return (
                <div key={link.label} className="relative group">
                  <button
                    aria-haspopup="true"
                    aria-expanded="false"
                    className="flex items-center gap-1 text-sm font-medium text-dark/80 hover:text-dark transition"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute left-0 -bottom-1 h-[1px] w-full bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                  </button>
                </div>
              );
            }

            return (
              <Link
                key={link.label}
                to={link.to}
                className="relative text-sm font-medium text-dark/80 hover:text-dark transition"
              >
                <span className="relative">
                  {link.label}
                  <span className="absolute left-0 -bottom-1 h-[1px] w-full bg-primary/60 opacity-0 hover:opacity-100 transition-opacity" />
                </span>
              </Link>
            );
          })}

          {/* CTA */}
          <button
            type="button"
            onClick={() => onBookClick?.()}
            className="rounded-full bg-primary/90 px-6 py-2.5 text-sm font-medium text-white hover:bg-primary transition shine-button"
          >
            Let's Connect
          </button>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          aria-label="Toggle menu"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-dark"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="
              md:hidden
              fixed top-[96px] left-1/2 -translate-x-1/2
              w-[92%] max-w-7xl
              rounded-3xl
              bg-primary/95
              backdrop-blur-xl
              border border-primary/20
              shadow-[0_25px_45px_rgba(122,30,45,0.28)]
            "
          >
            <div className="px-6 py-6 flex flex-col gap-6">
              {navLinks.map((link) => {
                if (link.dropdown) {
                  return (
                    <div key={link.label} className="space-y-3">
                      <p className="text-white font-medium">Workshops</p>
                      {programs.map((program) => (
                        <Link
                          key={program.id}
                          to={`/programs/${program.slug}`}
                          className="block pl-3 text-white/80 hover:text-white transition"
                          onClick={() => setIsOpen(false)}
                        >
                          {program.title}
                        </Link>
                      ))}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-white/90 hover:text-white transition"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onBookClick?.();
                }}
                className="w-full text-center rounded-full bg-white px-6 py-3 text-sm font-medium text-primary hover:bg-white/90 transition"
              >
                Let's Connect
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
