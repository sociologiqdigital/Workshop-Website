import { motion } from "framer-motion";
import { Mail, MessageCircle, Clock, MapPin, Send } from "lucide-react";
import ContactForm from "../forms/ContactForm";
import ContactIllustration from "../styles/images/contact-illustration.svg";

export default function Contact() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  return (
    <section className="relative bg-[#F2EBFB] min-h-screen flex items-center overflow-hidden py-20">
      {/* --- ELITE BACKGROUND DECORATION --- */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-[rgb(var(--color-primary))]/10 blur-[120px] rounded-full"
        />
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-[rgb(var(--color-primary))]/5 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT PANEL — THE FORM CARD */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-col items-center lg:items-start"
          >
            <motion.div variants={fadeInUp} className="mb-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgb(var(--color-primary))]/10 text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                <MessageCircle size={14} /> Support Hub
              </span>
              <h1 className="font-serif text-5xl md:text-7xl text-[rgb(var(--color-dark))] leading-[1.1] mb-6">
                Let’s start a <br />
                <span className="text-accent">
                  Conversation.
                </span>
              </h1>
              <p className="text-lg text-[rgb(var(--color-muted))] max-w-md leading-relaxed mx-auto lg:mx-0">
                Have a question or just want to chat? Our team is ready to help
                you kickstart your digital journey.
              </p>
            </motion.div>

            {/* THE POPPING CARD */}
            <motion.div variants={fadeInUp} className="relative group w-full">
              {/* Decorative Card Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[rgb(var(--color-primary))]/20 to-transparent rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000" />

              <div className="relative bg-white/80 backdrop-blur-2xl rounded-[3rem] border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] p-8 md:p-12">
                <ContactForm />
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT PANEL — INFO & VISUALS */}
          <div className="hidden lg:flex flex-col gap-12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src={ContactIllustration}
                alt="Contact"
                className="w-full max-w-sm mx-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: <Mail />,
                  label: "Email us",
                  val: "hello@digitalbiz.com",
                },
                { icon: <Clock />, label: "Response", val: "Under 24h" },
                { icon: <MapPin />, label: "Location", val: "Remote, Global" },
                { icon: <Send />, label: "Support", val: "Mon-Fri / 9-6" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{
                    y: -8,
                    backgroundColor: "rgba(255,255,255,0.9)",
                  }}
                  className="p-6 rounded-[2rem] bg-white/40 border border-white/60 shadow-sm transition-all"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[rgb(var(--color-primary))] shadow-sm mb-4">
                    {item.icon}
                  </div>
                  <p className="text-[10px] font-bold text-[rgb(var(--color-muted))] uppercase tracking-widest mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm font-bold text-[rgb(var(--color-dark))]">
                    {item.val}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
