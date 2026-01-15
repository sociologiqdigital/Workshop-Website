import { Instagram, Facebook, Linkedin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function FooterColumn({ title, children }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-[10px] font-bold tracking-[0.22em] text-[rgb(var(--color-primary))] uppercase">
        {title}
      </h4>
      <ul className="flex flex-col gap-2 text-[13px] font-medium">
        {children}
      </ul>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[rgb(var(--color-dark))] text-white pt-10 pb-6 overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute bottom-0 right-0 w-[380px] h-[380px] bg-[rgb(var(--color-primary))]/5 blur-[110px] rounded-full -mb-52 -mr-24" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* TOP SECTION: Branding & Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8 border-b border-white/5">
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-block group">
              <h3 className="font-serif text-2xl md:text-3xl leading-none text-primary">
                Digi Biz Kickstart{" "}
              </h3>
            </Link>

            <p className="text-[13px] md:text-sm text-white/50 leading-relaxed max-w-md">
              Launch your digital business in 30 days. Empowering entrepreneurs
              to transform ideas into thriving online legacies through
              strategic, step-by-step guidance.
            </p>

            <div className="flex gap-3">
              {[
                {
                  target: "_blank",
                  icon: <Instagram size={18} />,
                  link: "https://www.instagram.com/thinkdigitalwithruchi/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D#",
                },
                {
                  target: "_blank",
                  icon: <Facebook size={18} />,
                  link: "https://www.facebook.com/ruchi.shegaonkar.7/",
                },
                {
                  target: "_blank",
                  icon: <Linkedin size={18} />,
                  link: "https://www.linkedin.com/in/sociologiq/",
                },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[rgb(var(--color-primary))] hover:border-[rgb(var(--color-primary))] transition-all duration-300 group"
                >
                  <span className="group-hover:scale-110 transition-transform">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-6">
            <FooterColumn title="Programs">
              <li>
                <Link
                  to="/workshops"
                  className="text-white/60 hover:text-[rgb(var(--color-primary))] flex items-center gap-1 group"
                >
                  Workshops{" "}
                  <ArrowUpRight
                    size={13}
                    className="opacity-0 group-hover:opacity-100 transition-all"
                  />
                </Link>
              </li>
              <li>
                <Link
                  to="/mentorship"
                  className="text-white/60 hover:text-[rgb(var(--color-primary))] transition-colors"
                >
                  1:1 Mentorship
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-white/60 hover:text-[rgb(var(--color-primary))] transition-colors"
                >
                  Digital Goods
                </Link>
              </li>
            </FooterColumn>

            <FooterColumn title="Company">
              <li>
                <Link
                  to="/about"
                  className="text-white/60 hover:text-[rgb(var(--color-primary))] transition-colors"
                >
                  The Story
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white/60 hover:text-[rgb(var(--color-primary))] transition-colors"
                >
                  Get in Touch
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-white/60 hover:text-[rgb(var(--color-primary))] transition-colors"
                >
                  Insights
                </Link>
              </li>
            </FooterColumn>

            <FooterColumn title="Legal">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-white/60 hover:text-[rgb(var(--color-primary))] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-white/60 hover:text-[rgb(var(--color-primary))] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/cookie-policy"
                  className="text-white/60 hover:text-[rgb(var(--color-primary))] transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </FooterColumn>
          </div>
        </div>

        {/* BOTTOM SECTION: Copyright & Credits */}
        <div className="pt-5 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] tracking-tight">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-white/40 text-center md:text-left">
            <span>© {currentYear} Digital Biz Kickstarter.</span>
            <span className="hidden md:block w-1 h-1 rounded-full bg-white/20" />
            <span>
              Designed with ❤️{" "}
              <Link to="https://sociologiq.in/">
                <span className="text-white/70 font-bold italic">
                  SociologiQ Digital Private Limited
                </span>
              </Link>
            </span>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[11px] flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for Q1 Mentorship
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
