import ContactForm from "../forms/ContactForm";
import ContactIllustration from "../styles/images/contact-illustration.svg";

export default function Contact() {
  return (
    <section className="bg-background min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT — FORM CARD */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-sm p-8 md:p-10">
              <h1 className="font-heading text-4xl md:text-5xl text-dark mb-3">
                Contact Us
              </h1>

              <p className="text-muted mb-8 leading-relaxed">
                Have a question or need guidance? Fill out the form and we’ll
                get back to you shortly.
              </p>

              <ContactForm />
            </div>
          </div>

          {/* RIGHT — VISUAL PANEL (same structure as Register) */}
          <div className="hidden lg:flex justify-center items-center relative">
            {/* soft glow */}
            <div className="absolute -z-10 w-[420px] h-[420px] rounded-full bg-primary/10 blur-3xl" />

            <img
              src={ContactIllustration}
              alt="Contact illustration"
              className="w-full max-w-md object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
