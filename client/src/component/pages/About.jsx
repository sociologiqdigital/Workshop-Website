import FAQSection from "./FaqSection";
import { Testimonial } from "./Testimonial";
import AboutImg from "../styles/images/AboutImg.jpg";
import AboutHeroSection from "./AboutHeroSection"

export default function About() {
  return (
    <>
    <AboutHeroSection />
      <section className="bg-background py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* LEFT — CONTENT */}
          <div className="max-w-xl">
            <p className="text-sm tracking-widest text-primary uppercase mb-4">
              About Ruchi
            </p>

            <h2 className="font-heading text-4xl md:text-5xl text-dark leading-tight mb-8">
              Growth doesn’t come from doing more — it comes from doing what
              matters with clarity.
            </h2>

            <div className="space-y-6 text-muted leading-relaxed">
              <p>
                Over the years, I’ve seen talented women struggle not because
                they lack ability, but because they lack direction.
              </p>

              <p>
                My work is rooted in helping women simplify, align, and build
                clarity-led digital systems that support both their business and
                their life — without burnout or noise.
              </p>

              <p>
                I believe in intentional growth, thoughtful systems, and
                execution that feels sustainable.
              </p>
            </div>

            <div className="mt-10">
              <button className="btn btn-secondary">Contact Me</button>
            </div>
          </div>

          {/* RIGHT — IMAGE */}
          <div className="relative">
            <img
              src={AboutImg}
              alt="Ruchi Dorlikar"
              className="rounded-2xl object-cover w-90 max-w-md ml-auto "
            />

            {/* Optional soft accent */}
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary/10 rounded-full -z-10" />
          </div>
        </div>
      </section>
      <FAQSection />
      <Testimonial />
    </>
  );
}
