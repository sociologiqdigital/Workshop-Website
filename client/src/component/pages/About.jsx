import FAQSection from "./FaqSection";
import { Testimonial } from "./Testimonial";
import AboutImg from "../styles/images/AboutImg.jpg";
import AboutHeroSection from "./AboutHeroSection";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <>
      <AboutHeroSection />

      <section className="bg-background py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT CONTENT */}
          <div className="max-w-xl">
            {/* <h2 className="text-sm tracking-widest text-primary uppercase mb-4">
              About the Founder
            </h2> */}

            <h2 className="font-heading text-4xl md:text-5xl text-dark leading-tight mb-8">
              About <span className="text-primary">The Founder</span>
            </h2>

            <div className="space-y-5 md:space-y-6 text-muted leading-relaxed text-justify">
              <p>
                Ruchi Dorlikar is a tech-driven digital strategist who
                transitioned from the corporate IT world into entrepreneurship
                with a clear intention to build something meaningful,
                impactful, and her own.
              </p>

              <p>
                Her professional journey began in 2018 at{" "}
                <strong>Tech Mahindra, Pune</strong>, where she worked as a
                Database Administrator and explored systems, networks, and
                infrastructure. In 2019, she moved to <strong>Capgemini</strong>{" "}
                as a Technical Support Head, strengthening her technical
                expertise while developing leadership and problem-solving
                skills.
              </p>

              <p>
                Despite a stable corporate career, Ruchi felt drawn toward a
                more creative and independent path. Shortly after her marriage,
                she stepped away from the corporate world to invest in herself,
                spending the next 8-9 months upskilling in digital marketing,
                content strategy, and performance-driven growth.
              </p>

              <p>
                In June 2019, Ruchi officially began her freelance journey in
                Navi Mumbai. Her first project - building a complete digital
                presence for a local doctor - led to a major milestone client,{" "}
                <strong>KIMS Hospital, Pune</strong>, giving her the confidence
                to fully commit to entrepreneurship.
              </p>

              <p>
                As her client base grew, Ruchi collaborated with skilled
                freelancers, which soon evolved into her first agency unit,
                SocialBuzz. By March 2020, she registered{" "}
                <Link to="https://sociologiq.in/" target="blank">
                  <strong>SociologiQ Digital Solutions Pvt. Ltd.</strong>
                </Link>{" "}
                - a brand rooted in human insight and data-driven strategy. She
                later relocated the company to <strong>Nagpur</strong>,
                establishing its first physical office.
              </p>
            </div>

            <div className="mt-8 md:mt-10">
              <button className="btn btn-secondary">Book a Call</button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative w-full flex justify-center md:justify-end pt-4 md:pt-0">
            <img
              src={AboutImg}
              alt="Ruchi Dorlikar"
              className="rounded-2xl object-cover w-80 sm:w-96 max-w-md"
            />

            {/* Soft accent */}
            <div className="absolute -bottom-8 -left-8 w-32 sm:w-40 h-32 sm:h-40 bg-primary/10 rounded-full -z-10" />
          </div>
        </div>
      </section>

      <FAQSection />
      <Testimonial />
    </>
  );
}
