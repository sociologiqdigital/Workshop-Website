import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { programs } from "../data/Workshop";
import FAQSection from "./FAQ";
import WorkshopIllustration from "../styles/images/registration-illustration.svg";

export default function WorkshopDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const program = programs.find((p) => p.slug === slug);

  if (!program) {
    return (
      <section className="min-h-screen bg-background py-24 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-heading mb-4">Program not found</h1>
          <p className="text-muted mb-6">
            The program you're looking for doesn't exist.
          </p>
          <button onClick={() => navigate("/")} className="btn btn-primary">
            Go back home
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-background overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />

      <div className="relative max-w-6xl xl:max-w-7xl mx-auto px-6 pt-20 pb-16 lg:pt-24 lg:pb-24">
        <div className="grid lg:grid-cols-[1.25fr_0.85fr] gap-12 lg:gap-16 items-start">
          {/* LEFT CONTENT */}
          <div className="space-y-10">
            <div className="space-y-6 max-w-3xl">
              <span
                className={`inline-flex items-center rounded-full px-4 py-1 text-sm border ${
                  program.status === "active"
                    ? "bg-primary/10 text-primary border-primary/30"
                    : program.status === "soon"
                    ? "bg-amber-100 text-amber-700 border-amber-300"
                    : "bg-gray-100 text-gray-500 border-gray-300"
                }`}
              >
                {program.statusLabel}
              </span>

              <div className="flex justify-center sm:justify-start">
                <div className="w-32 sm:w-36 md:w-40 rounded-2xl bg-white/80 border border-primary/10 p-3 shadow-soft">
                  <img
                    src={WorkshopIllustration}
                    alt={`${program.title} illustration`}
                    className="w-full h-auto"
                  />
                </div>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl leading-tight text-dark">
                {program.title}
              </h1>

              <p className="text-lg text-muted leading-relaxed">
                {program.description}
              </p>

              <div className="w-16 h-[2px] bg-primary/40" />
            </div>

            {/* WHAT YOU'LL GET */}
            <div className="space-y-5">
              <h2 className="font-heading text-2xl text-dark">
                What You'll Get
              </h2>
              <ul className="grid sm:grid-cols-2 gap-y-4 gap-x-8">
                {program.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-primary shrink-0" />
                    <span className="text-muted leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT CTA */}
          <div className="w-full lg:pl-4 lg:flex lg:justify-end md:mt-24">
            <div className="w-full max-w-md lg:sticky lg:top-20 rounded-3xl bg-white/90 backdrop-blur border border-primary/15 shadow-soft p-8 md:p-9 space-y-6">
              <div className="space-y-2">
                <h3 className="font-heading text-xl text-dark">Get Started</h3>
                <p className="text-sm text-muted leading-[1.6]">
                  Choose how you'd like to move forward with this program.
                </p>
              </div>

              {program.status === "active" && (
                <button
                  onClick={() => navigate("/register")}
                  className="w-full rounded-full bg-primary py-3 text-white font-medium hover:opacity-90 transition shine-button"
                >
                  Apply Now
                </button>
              )}

              {program.status === "soon" && (
                <button className="w-full rounded-full border border-primary text-primary py-3 hover:bg-primary/10 transition">
                  Join Waitlist
                </button>
              )}

              {program.status === "closed" && (
                <p className="text-center text-sm text-gray-500">
                  This program is currently closed.
                </p>
              )}

              <p className="text-xs text-muted text-center leading-relaxed">
                You'll be guided step-by-step before making any commitment.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="relative py-20 lg:py-24 bg-background overflow-hidden">
        <div className="absolute inset-0 flex justify-center -z-10">
          <div className="w-[420px] h-[420px] rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="space-y-3">
            <h2 className="font-heading text-4xl md:text-5xl text-dark">
              Limited Time Offer
            </h2>

            <p className="text-muted">
              Secure your seat before enrollment closes
            </p>
          </div>

          <div className="mx-auto max-w-2xl rounded-3xl bg-white/80 backdrop-blur-sm px-8 sm:px-10 py-12 shadow-soft border border-primary/10">
            <div className="flex flex-col items-center gap-4 mb-6">
              <p className="text-sm text-muted line-through">
                Regular price Rs. 7,499
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <span className="font-heading text-5xl sm:text-6xl text-primary">
                  Rs. 4,999
                </span>

                <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm">
                  Only 20 seats available
                </span>
              </div>

              <p className="text-sm text-muted">
                One-time payment - lifetime access
              </p>
            </div>

            <div className="h-px bg-border my-6" />

            <div className="text-sm text-muted space-y-1.5 mb-8">
              <p>Pay securely using UPI, Debit/Credit Card, or Razorpay.</p>
              <p>Enroll - choose payment method - get instant access.</p>
            </div>

            <div className="flex justify-center">
              {program.status === "active" && (
                <button
                  onClick={() => navigate("/register")}
                  className="w-full rounded-full bg-primary py-3 text-white font-medium hover:opacity-90 transition shine-button"
                >
                  Enroll Now
                </button>
              )}

              {program.status === "soon" && (
                <button className="w-full rounded-full border border-primary text-primary py-3 hover:bg-primary/10 transition">
                  Join Waitlist
                </button>
              )}

              {program.status === "closed" && (
                <p className="text-center text-sm text-gray-500">
                  This program is currently closed.
                </p>
              )}
            </div>

            <p className="mt-5 text-sm text-muted">
              Need help?{" "}
              <a href="/contact" className="text-primary font-medium">
                Contact support
              </a>
            </p>
          </div>
        </div>
      </section>
      <FAQSection />
    </section>
  );
}
