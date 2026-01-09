import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { programs } from "../data/Workshop";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300 ease-out
        ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl shadow-soft"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand */}
        <Link
          to="/"
          className="font-heading text-xl text-primary tracking-tight"
        >
          Ruchi Dorlikar
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <div className="relative group">
            <button type="button" className="nav-link flex items-center gap-2">
              Courses
              <span className="text-[10px]">▾</span>
            </button>
            <div className="pointer-events-none absolute left-0 top-full pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
              <div className="min-w-[220px] rounded-2xl border border-primary/10 bg-white p-3 shadow-soft">
                {programs.map((program) => (
                  <Link
                    key={program.id}
                    to={`/programs/${program.slug}`}
                    className="block rounded-xl px-3 py-2 text-sm text-dark hover:bg-primary/10"
                  >
                    {program.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            to="/register"
            className="btn btn-primary shadow-soft hover:shadow-hover"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
