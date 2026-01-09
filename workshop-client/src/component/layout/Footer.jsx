import { Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

/* Small reusable column */
function FooterColumn({ title, children }) {
  return (
    <div>
      <h4 className="text-sm font-semibold tracking-wide text-white mb-4 uppercase">
        {title}
      </h4>
      <ul className="space-y-3 text-sm text-white/70">{children}</ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/">
              <h3 className="font-heading text-2xl mb-4 text-white">
               Ruchi Dorlikar
              </h3>
            </Link>

            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Launch your digital business in 30 days—step-by-step, no
              experience needed. Empowering entrepreneurs to transform ideas
              into thriving online businesses.
            </p>
          </div>

          {/* Programs */}
          <FooterColumn title="Programs">
            <li>
              <Link to="/workshops" className="hover:text-white transition">
                Workshops
              </Link>
            </li>
            <li>
              <Link to="/mentorship" className="hover:text-white transition">
                1:1 Mentorship
              </Link>
            </li>
            <li>
              <Link to="/resources" className="hover:text-white transition">
                Resources
              </Link>
            </li>
          </FooterColumn>

          {/* Resources */}
          <FooterColumn title="Resources">
            <li>
              <Link to="/blog" className="hover:text-white transition">
                Blog
              </Link>
            </li>
            <li>
                <Link to="/about/#faq" className="hover:text-white transition">
                  FAQs
                </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Support
              </Link>
            </li>
          </FooterColumn>

          {/* Company */}
          <FooterColumn title="Company">
            <li>
              <Link to="/about" className="hover:text-white transition">
                About Ruchi
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-white transition"
              >
                Privacy Policy
              </Link>
            </li>
          </FooterColumn>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row items-center justify-between text-xs text-white/60 gap-4 mt-10">
          <span>
            © 2025 Digital Biz Kickstarter. All rights reserved. | Powered by
            SociologiQ Digital Solutions
          </span>

          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
