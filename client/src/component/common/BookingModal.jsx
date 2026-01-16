import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  X,
  Sparkles,
  CreditCard,
  ShieldCheck,
  Calendar as CalendarIcon,
  CheckCircle2,
  PenLine,
} from "lucide-react";

const BRAND_COLOR = "#7A1E2D";

const SERVICES = [
  "Clarity Session",
  "Digital Strategy",
  "Growth Roadmap",
  "Brand Audit",
  "1-on-1 Coaching",
  "Other", // Added Other option
];

export default function BookingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: "",
    city: "",
    topic: "",
    customTopic: "",
    date: "",
  });
  const totalSteps = 5;

  const next = () => step < totalSteps && setStep((s) => s + 1);
  const back = () => step > 1 && setStep((s) => s - 1);

  // Animation for the text field appearance
  const inputExpand = {
    initial: { height: 0, opacity: 0, marginTop: 0 },
    animate: { height: "auto", opacity: 1, marginTop: 16 },
    exit: { height: 0, opacity: 0, marginTop: 0 },
  };

  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 1.1,
      transition: {
        x: { duration: 0.5, ease: "easeInOut" },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          <div className="relative w-full max-w-lg h-[560px]">
            <motion.div
              animate={{ rotate: -4, scale: 0.98, y: -10 }}
              className="absolute inset-0 bg-white/10 border border-white/5 shadow-2xl"
            />
            <motion.div
              animate={{ rotate: 2, scale: 1, y: -5 }}
              className="absolute inset-0 bg-white/20 shadow-xl"
            />

            <div className="relative w-full h-full overflow-hidden bg-[#FCFBF9] shadow-[0_40px_120px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 left-0 w-full h-1 z-50 bg-slate-100">
                <motion.div
                  className="h-full bg-[#7A1E2D]"
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                />
              </div>

              <div className="absolute top-8 left-10 right-10 flex justify-between items-center z-50">
                <div className="w-12">
                  {step > 1 && (
                    <button
                      onClick={back}
                      className="flex items-center gap-1 text-slate-400 hover:text-[#7A1E2D] transition-colors text-[10px] font-bold uppercase tracking-widest"
                    >
                      <ArrowLeft size={14} /> Back
                    </button>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:rotate-90 transition-transform duration-300 text-slate-300"
                >
                  <X size={20} />
                </button>
              </div>

              <AnimatePresence initial={false} custom={step} mode="wait">
                <motion.div
                  key={step}
                  custom={step}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 px-10 pt-20 pb-8 flex flex-col"
                >
                  {/* ... STEP 1 & 2 remain same as previous code ... */}
                  {step === 1 && (
                    <div className="space-y-6 my-auto">
                      <h2 className="text-4xl font-serif text-slate-900 leading-tight">
                        Your{" "}
                        <span className="italic text-[#7A1E2D]">
                          good name?
                        </span>
                      </h2>
                      <input
                        autoFocus
                        className="w-full bg-transparent border-b-2 border-slate-200 py-4 text-2xl outline-none focus:border-[#7A1E2D] transition-all placeholder:text-slate-200"
                        placeholder="Your Name"
                        value={data.name}
                        onChange={(e) =>
                          setData({ ...data, name: e.target.value })
                        }
                      />
                      <button
                        onClick={next}
                        disabled={!data.name}
                        className="group w-full py-5 rounded-full bg-[#7A1E2D] text-white flex items-center justify-center gap-6 text-xs font-black tracking-[0.3em] uppercase hover:bg-[#5F1623] transition-all disabled:opacity-20 shadow-xl shadow-[#7A1E2D]/25"
                      >
                        Continue
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <ArrowRight size={16} />
                        </motion.div>
                      </button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6 my-auto">
                      <h2 className="text-4xl font-serif text-slate-900 leading-tight">
                        Where are you{" "}
                        <span className="italic text-[#7A1E2D]">from?</span>
                      </h2>
                      <input
                        autoFocus
                        className="w-full bg-transparent border-b-2 border-slate-200 py-4 text-2xl outline-none focus:border-[#7A1E2D] transition-all placeholder:text-slate-200"
                        placeholder="Your City"
                        value={data.city}
                        onChange={(e) =>
                          setData({ ...data, city: e.target.value })
                        }
                      />
                      <button
                        onClick={next}
                        disabled={!data.city}
                        className="group w-full py-5 rounded-full bg-[#7A1E2D] text-white flex items-center justify-center gap-6 text-xs font-black tracking-[0.3em] uppercase hover:bg-[#5F1623] transition-all disabled:opacity-20 shadow-xl shadow-[#7A1E2D]/25"
                      >
                        Next
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <ArrowRight size={16} />
                        </motion.div>
                      </button>
                    </div>
                  )}

                  {/* STEP 3: PILL-STYLE SERVICE SELECTION */}
                  {step === 3 && (
                    <div className="space-y-6 flex flex-col h-full">
                      <div className="space-y-1 text-center">
                        <h2 className="text-3xl font-serif text-slate-900 leading-tight">
                          Service{" "}
                          <span className="italic text-primary">
                            Portfolio
                          </span>
                        </h2>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.25em]">
                          Choose the focus of our dialogue
                        </p>
                      </div>

                      <div className="flex flex-wrap justify-center items-center gap-3 max-w-[420px] mx-auto">
                        {SERVICES.map((service) => {
                          const isSelected = data.topic === service;
                          return (
                            <motion.button
                              key={service}
                              whileHover={{ scale: 1.03, y: -2 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() =>
                                setData({ ...data, topic: service })
                              }
                              className={`px-6 py-3 rounded-full border-2 text-sm font-bold tracking-wide transition-all duration-300 ${
                                isSelected
                                  ? "bg-[#7A1E2D] border-[#7A1E2D] text-white shadow-lg shadow-red-900/20"
                                  : "bg-white border-slate-100 text-slate-600 hover:border-[#7A1E2D]/30"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {isSelected && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-1.5 h-1.5 rounded-full bg-white"
                                  />
                                )}
                                {service}
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Dynamic Input for "Other" with matching Pill design */}
                      <AnimatePresence>
                        {data.topic === "Other" && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative px-4"
                          >
                            <div className="relative">
                              <input
                                autoFocus
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-full py-4 px-8 text-base outline-none focus:border-[#7A1E2D] focus:bg-white transition-all placeholder:text-slate-300 font-serif italic text-center"
                                placeholder="Specify your requirement..."
                                value={data.customTopic}
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    customTopic: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Primary Action Button */}
                      <div className="mt-auto pt-4">
                        <button
                          onClick={next}
                          disabled={
                            !data.topic ||
                            (data.topic === "Other" && !data.customTopic)
                          }
                          className="group w-full py-5 rounded-full bg-[#7A1E2D] text-white flex items-center justify-center gap-6 text-xs font-black tracking-[0.3em] uppercase hover:bg-[#5F1623] transition-all disabled:opacity-20 shadow-xl shadow-[#7A1E2D]/25"
                        >
                          Select Date
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          >
                            <ArrowRight size={16} />
                          </motion.div>
                        </button>
                      </div>
                    </div>
                  )}
                  {/* STEP 4: DATE */}
                  {step === 4 && (
                    <div className="space-y-6 my-auto">
                      <h2 className="text-4xl font-serif text-slate-900 leading-tight">
                        When shall we{" "}
                        <span className="italic text-[#7A1E2D]">meet?</span>
                      </h2>
                      <div className="relative group">
                        <CalendarIcon
                          className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#7A1E2D] transition-colors"
                          size={24}
                        />
                        <input
                          type="date"
                          className="w-full bg-transparent border-b-2 border-slate-200 py-4 pl-10 text-xl outline-none focus:border-[#7A1E2D] transition-all"
                          value={data.date}
                          onChange={(e) =>
                            setData({ ...data, date: e.target.value })
                          }
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <button
                        onClick={next}
                        disabled={!data.date}
                        className="group w-full py-5 rounded-full bg-[#7A1E2D] text-white flex items-center justify-center gap-6 text-xs font-black tracking-[0.3em] uppercase hover:bg-[#5F1623] transition-all disabled:opacity-20 shadow-xl shadow-[#7A1E2D]/25"
                      >
                        Confirm
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <ArrowRight size={16} />
                        </motion.div>
                      </button>
                    </div>
                  )}

                  {/* STEP 5: FINAL */}
                  {step === 5 && (
                    <div className="space-y-6 text-center my-auto">
                      <Sparkles className="mx-auto text-[#7A1E2D]" size={32} />
                      <div className="p-6 bg-slate-50 border border-slate-100 text-left space-y-4">
                        <div className="flex justify-between border-b pb-2 border-slate-200">
                          <span className="text-[10px] uppercase font-black text-slate-400">
                            Total
                          </span>
                          <span className="text-2xl font-black text-slate-900">
                            ₹99
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          <strong>{data.name}</strong> • {data.city}
                          <br />
                          <span className="text-[#7A1E2D] font-bold">
                            {data.topic === "Other"
                              ? data.customTopic
                              : data.topic}
                          </span>
                          <br />
                          Scheduled:{" "}
                          {new Date(data.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <button className="group w-full py-5 rounded-full bg-[#7A1E2D] text-white flex items-center justify-center gap-6 text-xs font-black tracking-[0.3em] uppercase hover:bg-[#5F1623] transition-all shadow-xl shadow-[#7A1E2D]/25">
                        SECURE PAYMENT
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <CreditCard size={16} />
                        </motion.div>
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
