import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import RegistrationForm from "../forms/RegistrationForm";
import RegistrationImage from "../styles/images/registration-illustration.svg";

export default function RegisterLayout() {
  // Animation variants
  const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <section className="relative min-h-screen bg-[rgb(var(--color-background))] overflow-hidden">
      {/* INTERACTIVE BACKGROUND
          Moving blobs and a split-screen design that adapts to the brand palette.
      */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full lg:grid lg:grid-cols-2">
          <div className="relative">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[rgb(var(--color-primary))]/5 blur-[120px] rounded-full" />
          </div>
          <div className="hidden lg:block bg-gradient-to-b from-[rgb(var(--color-primary))]/5 to-transparent" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-24 lg:py-28 z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* LEFT COLUMN — CONTENT & FORM */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="w-full max-w-xl"
          >
            {/* Brand Breadcrumb */}
            <motion.div
              variants={fadeInRight}
              className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgb(var(--color-primary))]/10 border border-[rgb(var(--color-primary))]/20"
            >
              <span className="w-2 h-2 rounded-full bg-[rgb(var(--color-primary))] animate-pulse" />
              <p className="text-xs font-bold uppercase tracking-wider text-[rgb(var(--color-primary))]">
                Workshop Enrollment Open
              </p>
            </motion.div>

            <motion.h1
              variants={fadeInRight}
              className="font-serif text-5xl md:text-6xl text-[rgb(var(--color-dark))] leading-[1.1] mb-4"
            >
              Step into your <br />
              <span className="text-[rgb(var(--color-primary))] italic">
                New Future.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInRight}
              className="text-lg text-[rgb(var(--color-muted))] mb-10 leading-relaxed"
            >
              Join a community of builders. Fill in your details below to
              reserve your preferred session slot.
            </motion.p>

            {/* Glassmorphic Form Card */}
            <motion.div variants={fadeInRight} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[rgb(var(--color-primary))]/20 to-[rgb(var(--color-accent))]/20 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              <div className="relative bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-2xl shadow-gray-200/50 p-8 md:p-12">
                <RegistrationForm />
              </div>
            </motion.div>

            <motion.p
              variants={fadeInRight}
              className="text-center text-xs text-[rgb(var(--color-muted))] mt-8"
            >
              Secured with industry-standard encryption. By continuing, you
              agree to our
              <a
                href="#"
                className="underline ml-1 hover:text-[rgb(var(--color-primary))] transition-colors"
              >
                Privacy Policy
              </a>
              .
            </motion.p>
          </motion.div>

          {/* RIGHT COLUMN — VISUAL REINFORCEMENT */}
          <div className="hidden lg:sticky lg:top-24 lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              {/* Floating Decorative Elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-10 -left-10 w-20 h-20 bg-[rgb(var(--color-accent))]/20 rounded-2xl rotate-12 blur-xl"
              />

              <div className="relative rounded-[3rem] bg-gradient-to-br from-white to-[rgb(var(--color-background))] p-4 shadow-2xl border border-white">
                <img
                  src={RegistrationImage}
                  alt="Workshop preview"
                  className="w-full h-auto rounded-[2.5rem] object-cover shadow-inner"
                />

                {/* Floating Value Tag */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="text-green-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">Confirmed</p>
                    <p className="text-[10px] text-gray-500">
                      Instant Email Receipt
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-16 space-y-6 text-center lg:text-left">
                <h3 className="text-3xl font-serif text-[rgb(var(--color-dark))]">
                  Everything you need to <br /> scale, in one place.
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Slot Booking", icon: "🗓️" },
                    { label: "Live Support", icon: "💬" },
                    { label: "Resource Hub", icon: "📚" },
                    { label: "Certification", icon: "🎓" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm border border-gray-50"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm font-medium text-gray-600">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* MOBILE VALUE PROP (Redesigned) */}
          <div className="lg:hidden mt-12 px-2">
            <div className="p-8 rounded-[2rem] bg-[rgb(var(--color-primary))]/5 border border-[rgb(var(--color-primary))]/10">
              <h3 className="text-2xl font-serif text-[rgb(var(--color-dark))] mb-4">
                What happens next?
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-[rgb(var(--color-muted))]">
                  <span className="font-bold text-[rgb(var(--color-primary))]">
                    01.
                  </span>
                  Pick your date & time slot
                </li>
                <li className="flex gap-3 text-sm text-[rgb(var(--color-muted))]">
                  <span className="font-bold text-[rgb(var(--color-primary))]">
                    02.
                  </span>
                  Get instant confirmation via email
                </li>
                <li className="flex gap-3 text-sm text-[rgb(var(--color-muted))]">
                  <span className="font-bold text-[rgb(var(--color-primary))]">
                    03.
                  </span>
                  Unlock your workshop dashboard
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
