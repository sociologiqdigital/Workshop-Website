import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Globe,
  Fingerprint,
  Calendar as CalIcon,
  Clock,
  ShieldCheck,
} from "lucide-react";

const sessions = [
  { id: 1, title: "Brand Vision", price: 149, color: "122, 30, 45" },
  { id: 2, title: "Digital Growth", price: 199, color: "143, 48, 74" },
  { id: 3, title: "Custom Consulting", price: 299, color: "31, 31, 31" },
];

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: "",
    origin: "",
    topic: null,
    date: null,
    time: null,
  });

  // Mock data for senior UI feel
  const availableDates = ["Oct 12", "Oct 13", "Oct 15", "Oct 16"];
  const timeSlots = ["10:00 AM", "01:30 PM", "04:00 PM"];
  const stepMeta = [
    { id: 1, label: "Identity", hint: "Introduce yourself" },
    { id: 2, label: "Focus", hint: "Pick your session" },
    { id: 3, label: "Schedule", hint: "Choose date & time" },
    { id: 4, label: "Confirm", hint: "Review & pay" },
  ];

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  return (
    <div className="min-h-screen bg-background text-dark relative overflow-hidden flex items-center justify-center p-6 sm:p-8">
      {/* ENVIRONMENTAL BACKGROUND */}
      <motion.div
        animate={{
          scale: step >= 3 ? 1.8 : 1.2,
          rotate: step * 20,
          backgroundColor: data.topic
            ? `rgba(₹{data.topic.color}, 0.12)`
            : "rgba(var(--color-primary), 0.05)",
        }}
        className="absolute w-[120vw] h-[120vh] rounded-full blur-[140px] -z-10 transition-colors duration-1000"
      />

      <div className="max-w-5xl w-full">
        <AnimatePresence mode="wait">
          {/* STEP 1: IDENTITY */}
          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="space-y-12"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary/70">
                    Step 1 of 4
                  </p>
                  <p className="text-sm text-muted">Introduce yourself.</p>
                </div>
                <div className="flex items-center gap-2">
                  {stepMeta.map((s) => (
                    <span
                      key={s.id}
                      className={`h-2 w-6 sm:w-10 rounded-full transition-colors ₹{
                        s.id <= step ? "bg-primary" : "bg-dark/10"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <h2 className="font-heading text-4xl md:text-6xl tracking-tighter">
                I am <span className="text-primary/40 italic">...</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="border-b-2 border-dark/10 bg-transparent py-4 text-lg md:text-xl font-heading focus:outline-none focus:border-primary transition-all"
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="From (City)"
                  className="border-b-2 border-dark/10 bg-transparent py-4 text-lg md:text-xl font-heading focus:outline-none focus:border-primary transition-all"
                  onChange={(e) => setData({ ...data, origin: e.target.value })}
                />
              </div>
              <button
                onClick={next}
                disabled={!data.name}
                className="inline-flex items-center gap-3 rounded-full border border-dark/15 px-5 py-2.5 text-sm md:text-base font-bold uppercase tracking-widest text-dark/90 hover:text-dark hover:border-dark/30 hover:bg-dark/5 transition disabled:opacity-40"
              >
                Select Strategy <ArrowRight className="text-primary" />
              </button>
            </motion.div>
          )}

          {/* STEP 2: SESSION CHOICE */}
          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary/70">
                    Step 2 of 4
                  </p>
                  <p className="text-sm text-muted">Pick your session focus.</p>
                </div>
                <div className="flex items-center gap-2">
                  {stepMeta.map((s) => (
                    <span
                      key={s.id}
                      className={`h-2 w-6 sm:w-10 rounded-full transition-colors ${
                        s.id <= step ? "bg-primary" : "bg-dark/10"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                <h2 className="font-heading text-4xl md:text-5xl italic">
                  Choose Focus
                </h2>
                <button
                  onClick={back}
                  className="inline-flex items-center rounded-full border border-dark/15 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-dark/80 hover:text-dark hover:border-dark/30 hover:bg-dark/5 transition"
                >
                  Back
                </button>
              </div>
              <div className="flex flex-col border-t border-dark/5">
                {sessions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setData({ ...data, topic: s });
                      next();
                    }}
                    className="group py-7 sm:py-9 flex justify-between items-center border-b border-dark/5 hover:px-4 sm:hover:px-8 transition-all"
                  >
                    <span className="font-heading text-2xl md:text-3xl group-hover:text-primary transition-colors">
                      {s.title}
                    </span>
                    <span className="text-lg md:text-xl  text-muted group-hover:text-primary transition-colors">
                      ₹{s.price}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: SCHEDULING (Box-Free Calendar) */}
          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-16"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary/70">
                    Step 3 of 4
                  </p>
                  <p className="text-sm text-muted">Choose date and time.</p>
                </div>
                <div className="flex items-center gap-2">
                  {stepMeta.map((s) => (
                    <span
                      key={s.id}
                      className={`h-2 w-6 sm:w-10 rounded-full transition-colors ${
                        s.id <= step ? "bg-primary" : "bg-dark/10"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <h2 className="font-heading text-4xl md:text-5xl">
                  Reserve <span className="text-primary italic">Time</span>
                </h2>
                <button
                  onClick={back}
                  className="inline-flex items-center rounded-full border border-dark/15 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-dark/80 hover:text-dark hover:border-dark/30 hover:bg-dark/5 transition"
                >
                  Back
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                {/* Custom Floating Date Selector */}
                <div className="space-y-6">
                  <p className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-xs">
                    <CalIcon size={14} /> Available Dates
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {availableDates.map((d) => (
                      <button
                        key={d}
                        onClick={() => setData({ ...data, date: d })}
                        className={`px-6 py-3 rounded-full border text-sm md:text-base font-heading transition-all ${
                          data.date === d
                            ? "bg-dark text-white border-dark"
                            : "border-dark/10 hover:border-primary"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Floating Time Selector */}
                <div
                  className={`space-y-6 transition-opacity duration-500 ${
                    !data.date ? "opacity-10" : "opacity-100"
                  }`}
                >
                  <p className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-xs">
                    <Clock size={14} /> Preferred Slot
                  </p>
                  <div className="space-y-3">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setData({ ...data, time: t });
                          next();
                        }}
                        className="w-full text-left py-3 text-sm md:text-base font-heading border-b border-dark/5 hover:border-primary hover:pl-3 transition-all"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: SUMMARY & SECURE CHECKOUT */}
          {step === 4 && (
            <motion.div
              key="s4"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center space-y-12"
            >
              <div className="w-full max-w-3xl flex items-center justify-between">
                <div className="space-y-2 text-left">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary/70">
                    Step 4 of 4
                  </p>
                  <p className="text-sm text-muted">Review before checkout.</p>
                </div>
                <div className="flex items-center gap-2">
                  {stepMeta.map((s) => (
                    <span
                      key={s.id}
                      className={`h-2 w-6 sm:w-10 rounded-full transition-colors ${
                        s.id <= step ? "bg-primary" : "bg-dark/10"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <ShieldCheck size={60} className="mx-auto text-primary" />
                <h2 className="font-heading text-4xl md:text-5xl leading-none">
                  Finalize.
                </h2>
                <p className="text-base md:text-lg opacity-60">
                  Session for{" "}
                  <span className="text-dark font-bold">{data.name}</span> -{" "}
                  {data.date} at {data.time}
                </p>
              </div>

              {/* Dynamic Summary Panel - Borderless */}
              <div className="w-full max-w-md py-8 border-t border-b border-dark/5 space-y-4">
                <div className="flex justify-between text-muted">
                  <span>{data.topic?.title} Session</span>
                  <span>₹{data.topic?.price}</span>
                </div>
                <div className="flex justify-between text-2xl font-heading text-dark pt-4">
                  <span>Investment</span>
                  <span className="text-primary">₹{data.topic?.price}</span>
                </div>
              </div>

              <div className="relative group">
                <button className="relative z-10 bg-dark text-white px-8 py-4 rounded-full text-sm md:text-base font-bold flex w-full sm:w-auto items-center justify-center gap-3 hover:scale-105 transition-transform">
                  Proceed to Payment <ArrowRight size={20} />
                </button>
                <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full -z-10 group-hover:bg-primary/30 transition-colors" />
              </div>
              <button
                onClick={back}
                className="text-xs uppercase tracking-widest opacity-40 hover:opacity-100"
              >
                Adjust Details
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
