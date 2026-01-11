import { motion } from "framer-motion";
import { Mail, MessageCircle, Clock, MapPin } from "lucide-react";
import ContactForm from "../forms/ContactForm";
import ContactIllustration from "../styles/images/contact-illustration.svg";

export default function Contact() {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <section className="relative bg-[rgb(var(--color-background))] min-h-screen flex items-center overflow-hidden">
      {/* 1. BACKGROUND DECORATION 
          Matches the "Split Wash" design of the Register page
      */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full lg:grid lg:grid-cols-2">
          <div className="relative">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[rgb(var(--color-primary))]/5 blur-[120px] rounded-full" />
          </div>
          <div className="hidden lg:block bg-gradient-to-l from-[rgb(var(--color-primary))]/5 to-transparent" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-24 lg:py-28 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* LEFT — FORM CARD 
              Polished with Glassmorphism and better typography
          */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-col gap-8"
          >
            <div className="max-w-xl">
              <motion.div
                variants={fadeInUp}
                className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgb(var(--color-primary))]/10 text-[rgb(var(--color-primary))] text-xs font-bold uppercase tracking-widest"
              >
                <MessageCircle size={14} /> Get in Touch
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="font-serif text-5xl md:text-6xl text-[rgb(var(--color-dark))] leading-tight mb-4"
              >
                Let’s start a <br />
                <span className="text-[rgb(var(--color-primary))] italic">
                  Conversation.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-[rgb(var(--color-muted))] leading-relaxed mb-8"
              >
                Whether you have a specific question about the Digital Biz
                Kickstarter or just want to say hello, we're here to help.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-2xl shadow-gray-200/40 p-8 md:p-10"
              >
                <ContactForm />
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT — VISUAL & INFO PANEL 
              Instead of just an image, we add contact metadata (Email, Response time)
          */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:flex flex-col items-center lg:items-start relative"
          >
            {/* Visual Illustration */}
            <div className="relative w-full mb-12">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[450px] h-[450px] rounded-full bg-[rgb(var(--color-primary))]/10 blur-[100px]" />
              <img
                src={ContactIllustration}
                alt="Contact illustration"
                className="w-full max-w-md mx-auto object-contain drop-shadow-2xl"
              />
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-2 gap-8 w-full">
              {[
                {
                  icon: <Mail className="text-[rgb(var(--color-primary))]" />,
                  label: "Email us",
                  val: "hello@digitalbiz.com",
                },
                {
                  icon: <Clock className="text-[rgb(var(--color-primary))]" />,
                  label: "Response time",
                  val: "Within 24 hours",
                },
                {
                  icon: <MapPin className="text-[rgb(var(--color-primary))]" />,
                  label: "Based in",
                  val: "Remote, Global",
                },
                {
                  icon: (
                    <MessageCircle className="text-[rgb(var(--color-primary))]" />
                  ),
                  label: "Support",
                  val: "Mon - Fri, 9am - 6pm",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="flex flex-col gap-2 p-4 rounded-2xl bg-white/40 border border-white/60 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[rgb(var(--color-muted))] uppercase tracking-tighter">
                      {item.label}
                    </p>
                    <p className="text-sm font-bold text-[rgb(var(--color-dark))]">
                      {item.val}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
