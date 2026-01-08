import FAQSection from "./FaqSection";
import { motion } from "framer-motion";
import { Testimonial } from "./Testimonial";
import AboutImg from "../styles/images/AboutImg.jpg";
import { Link } from "react-router-dom";
import PremiumCarousel from "./PremiumCarousel";


export default function About() {
  return (
    <>
      <PremiumCarousel />

      <section className="bg-background py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            {/* <h2 className="text-sm tracking-widest text-primary uppercase mb-4">
              About the Founder
            </h2> */}

            <h2 className="font-heading text-2xl md:text-5xl text-dark leading-tight mb-8">
              About <span className="text-primary">The Founder</span>
            </h2>

            <div className="space-y-5 md:space-y-6 text-muted leading-relaxed text-justify">
              <p>
                Ruchi Dorlikar is a tech-driven digital strategist who
                transitioned from the corporate IT world into entrepreneurship
                with a clear intention to build something meaningful, impactful,
                and her own.
              </p>

              <p>
                Her journey blends deep technical roots with a bold creative
                leap - building a brand that connects human insight with
                data-led strategy.
              </p>
            </div>

            <div className="mt-8 md:mt-10">
              <p className="font-semibold text-dark mb-4">
                Her journey at a glance
              </p>
              <ul className="space-y-3 text-muted">
                <li className="flex items-start gap-2">
                  <span aria-hidden="true">🎯</span>
                  <span>
                    <strong>2018 | Tech Mahindra, Pune:</strong> Began as a
                    Database Administrator, gaining hands-on experience in
                    systems, networks, and infrastructure.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true">🎯</span>
                  <span>
                    <strong>2019 | Capgemini:</strong> Stepped into a Technical
                    Support Head role, sharpening leadership and problem-solving
                    skills.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true">🎯</span>
                  <span>
                    <strong>A conscious shift:</strong> After marriage, she
                    stepped away from corporate life to invest in herself and
                    build something of her own.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true">🎯</span>
                  <span>
                    <strong>8-9 months of upskilling:</strong> Focused on
                    digital marketing, content strategy, and performance-driven
                    growth.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true">🎯</span>
                  <span>
                    <strong>June 2019 | Freelance journey begins:</strong> A
                    first project building a full digital presence for a local
                    doctor led to a milestone client:{" "}
                    <strong>KIMS Hospital, Pune</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true">🎯</span>
                  <span>
                    <strong>From freelancer to founder:</strong> Collaboration
                    with skilled freelancers grew into her first agency unit,
                    SocialBuzz.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true">🎯</span>
                  <span>
                    <strong>
                      March 2020 | SociologiQ Digital Solutions Pvt. Ltd.:
                    </strong>{" "}
                    Registered the agency and later relocated to{" "}
                    <strong>Nagpur</strong> to establish the first physical
                    office. Learn more at{" "}
                    <Link to="https://sociologiq.in/" target="blank">
                      <strong>SociologiQ</strong>
                    </Link>
                    .
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 md:mt-10">
              <button className="btn btn-secondary">Book 1 to 1 call</button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative w-full flex justify-center items-center pt-4 md:pt-0 translate-y-4 md:translate-y-6">
            <img
              src={AboutImg}
              alt="Ruchi Dorlikar"
              className="rounded-2xl object-cover w-80 sm:w-96 md:w-[420px] h-96 sm:h-[520px]"
            />

            {/* Soft accent */}
            <div className="absolute -bottom-8 -left-8 w-32 sm:w-40 h-32 sm:h-40 bg-primary/10 rounded-full -z-10" />
          </div>
        </div>
      </section>

      <FAQSection />

      {/* NOTE SECTION */}
      <section className="relative bg-gradient-to-b from-background via-primary/5 to-background py-20 overflow-hidden">
        <div
          aria-hidden="true"
          className="note-blob -top-24 right-[-6rem]"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="relative pl-6 overflow-hidden">
            <motion.span
              animate={{ scaleY: [0.85, 1, 0.85] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 top-0 h-full w-[2px] bg-primary/40 origin-top"
            />

            <p className="text-sm tracking-widest uppercase text-primary mb-4">
              A Note from the Founder
            </p>

            <p className="font-heading text-2xl md:text-3xl text-dark leading-snug mb-6">
              Building a brand isn’t just about likes or logos — it’s about
              understanding people, solving real problems, and staying
              consistent with purpose.
            </p>

            <p className="text-muted max-w-2xl leading-relaxed">
              At SociologiQ, we don’t just run campaigns — we craft journeys
              that connect, convert, and create long-term value.
            </p>

            <p className="mt-6 text-sm text-muted italic">
              — Ruchi Dorlikar, Founder & CEO
            </p>
          </div>
        </div>
      </section>

      <Testimonial />
    </>
  );
}


