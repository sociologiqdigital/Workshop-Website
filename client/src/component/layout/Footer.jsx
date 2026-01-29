import { Instagram, Facebook, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/* Small reusable column with hover interaction */
function FooterColumn({ title, children }) {
  return (
    <div className="flex flex-col space-y-4">
      <h4 className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">
        {title}
      </h4>
      <ul className="space-y-2 text-sm font-medium">{children}</ul>
    </div>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#111] text-white pt-20 pb-8 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
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
        {/* TOP SECTION: Call to Action + Massive Type */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-24">
          <div>
            <h2 className="text-4xl md:text-6xl font-heading leading-tight tracking-tighter mb-8">
              Let's build your <br />
              <span className="text-primary italic text-3xl md:text-5xl">
                thriving online business
              </span>
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-dark px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-primary transition-colors group"
            >
              Get in Touch
              <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </Link>
          </div>

          <div className="hidden lg:block">
            <p className="text-white/60 text-lg leading-relaxed max-w-md ml-auto text-right font-light">
              Launch your digital business in 30 days—step-by-step, no
              experience needed. Transform ideas into reality.
            </p>
          </div>
        </div>

        {/* MIDDLE SECTION: Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-white/10 pt-12 pb-20">
          {/* Brand/Social */}
          <div className="col-span-2 md:col-span-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-heading mb-6 tracking-tight">
                Ruchi Dorlikar
              </h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-dark transition-all"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-dark transition-all"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </div>

          <FooterColumn title="Programs">
            <li>
              <Link
                to="/workshops"
                className="hover:text-primary transition-colors flex items-center gap-1 group"
              >
                Workshops{" "}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/mentorship"
                className="hover:text-primary transition-colors flex items-center gap-1 group"
              >
                1:1 Mentorship{" "}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/resources"
                className="hover:text-primary transition-colors flex items-center gap-1 group"
              >
                Resources{" "}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </Link>
            </li>
          </FooterColumn>

          <FooterColumn title="Resources">
            <li>
              <Link to="/blog" className="hover:text-primary transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-primary transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="/support"
                className="hover:text-primary transition-colors"
              >
                Support
              </Link>
            </li>
          </FooterColumn>

          <FooterColumn title="Company">
            <li>
              <Link
                to="/about"
                className="hover:text-primary transition-colors"
              >
                About Ruchi
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy
              </Link>
            </li>
          </FooterColumn>
        </div>

        {/* MASSIVE DECORATIVE TYPE (Inspired by Matre/Cline) */}
        <div className="absolute -bottom-10 left-0 w-full pointer-events-none select-none opacity-[0.03] overflow-hidden whitespace-nowrap">
          <span className="text-[25vw] font-heading font-black tracking-tighter uppercase leading-none">
            DORLIKAR
          </span>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] font-bold tracking-widest text-white/40 uppercase gap-4">
          <p>
            © 2025 Digital Biz Kickstarter. Powered by{" "}
            <Link
              to="https://sociologiq.com/"
              className="text-white/60 hover:text-primary transition-colors"
            >
              SociologiQ
            </Link>
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 hover:text-white transition-colors"
          >
            Back to Top
            <span className="p-2 border border-white/10 rounded-full group-hover:border-white transition-colors">
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
