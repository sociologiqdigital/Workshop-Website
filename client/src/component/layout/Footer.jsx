import { Link } from "react-router-dom";
import { ArrowRight, ArrowUp } from "lucide-react";

function FooterColumn({ title, children }) {
  return (
    <div className="flex flex-col items-start space-y-3 text-left">
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
    <footer className="w-full bg-primary text-white pt-12 pb-6 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 border-t border-white/10 pt-8 pb-12 items-start">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-heading mb-4 tracking-tight">
              Ruchi Dorlikar
            </h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-sm text-left font-light">
              Launch your digital business in 30 days-step-by-step, no
              experience needed. Transform ideas into reality.
            </p>
          </div>

          <FooterColumn title="Programs">
            <li>
              <Link
                to="/workshops"
                className="text-white/80 hover:text-white transition-colors flex items-center gap-1 group"
              >
                Workshops
                <span className="opacity-0 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-1">
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/mentorship"
                className="text-white/80 hover:text-white transition-colors flex items-center gap-1 group"
              >
                1:1 Mentorship
                <span className="opacity-0 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-1">
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/resources"
                className="text-white/80 hover:text-white transition-colors flex items-center gap-1 group"
              >
                Resources
                <span className="opacity-0 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-1">
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </span>
              </Link>
            </li>
          </FooterColumn>

          <FooterColumn title="Resources">
            <li>
              <Link to="/blog" className="text-white/80 hover:text-white transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-white/80 hover:text-white transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to="/support"
                className="text-white/80 hover:text-white transition-colors"
              >
                Support
              </Link>
            </li>
          </FooterColumn>

          <FooterColumn title="Company">
            <li>
              <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                About Ruchi
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-white/80 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="text-white/80 hover:text-white transition-colors"
              >
                Privacy
              </Link>
            </li>
          </FooterColumn>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row md:items-center justify-between text-[10px] font-bold tracking-widest text-white/40 uppercase gap-4">
          <p className="text-center md:text-left text-white/60">
            &copy; 2026 Digital Biz Kickstarter. Powered by{" "}
            <a
              href="https://sociologiq.com/"
              target="_blank"
              rel="noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              SociologiQ Digital Solutions
            </a>
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 hover:text-white transition-colors"
          >
            Back to Top
            <span className="p-2 border border-white/10 rounded-full group-hover:border-white transition-colors">
              <ArrowUp className="h-3 w-3" aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
