import React, { useEffect, useState } from "react";
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

const initialData = {
  name: "",
  email: "",
  phone: "",
  city: "",
  topic: "",
  customTopic: "",
  date: "",
};

const initialTouched = {
  name: false,
  email: false,
  phone: false,
  city: false,
  topic: false,
  customTopic: false,
  date: false,
};

export default function BookingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(initialData);
  const [touched, setTouched] = useState(initialTouched);
  const [errors, setErrors] = useState({});
  const totalSteps = 6;

  const next = () => step < totalSteps && setStep((s) => s + 1);
  const back = () => step > 1 && setStep((s) => s - 1);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setData(initialData);
      setTouched(initialTouched);
      setErrors({});
    }
  }, [isOpen]);

  const validateField = (field, values) => {
    const value = String(values[field] || "").trim();

    switch (field) {
      case "name": {
        if (!value) return "Name is required.";
        if (!/^[a-zA-Z\s.'-]+$/.test(value))
          return "Use letters and basic punctuation only.";
        if (value.length < 2) return "Name is too short.";
        if (value.length > 60) return "Name is too long.";
        return "";
      }
      case "city": {
        if (!value) return "City is required.";
        if (!/^[a-zA-Z\s.'-]+$/.test(value))
          return "Use letters and basic punctuation only.";
        if (value.length < 2) return "City is too short.";
        if (value.length > 60) return "City is too long.";
        return "";
      }
      case "email": {
        if (!value) return "Email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Enter a valid email address.";
        if (value.length > 120) return "Email is too long.";
        return "";
      }
      case "phone": {
        if (!value) return "Phone number is required.";
        if (!/^\d+$/.test(value)) return "Use numbers only.";
        if (value.length < 10) return "Enter a ten digit phone number.";
        if (value.length > 15) return "Phone number is too long.";
        return "";
      }
      case "topic": {
        if (!value) return "Choose a service.";
        return "";
      }
      case "customTopic": {
        if (values.topic !== "Other") return "";
        if (!value) return "Please specify your requirement.";
        if (value.length < 3) return "Please add a little more detail.";
        if (value.length > 120) return "Please keep this under 120 characters.";
        return "";
      }
      case "date": {
        if (!value) return "Pick a date.";
        const candidate = new Date(`${value}T00:00:00`);
        if (Number.isNaN(candidate.getTime())) return "Invalid date.";
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (candidate < today) return "Date cannot be in the past.";
        return "";
      }
      default:
        return "";
    }
  };

  const validateStep = (currentStep, values) => {
    const fieldMap = {
      1: ["name"],
      2: ["email", "phone"],
      3: ["city"],
      4: ["topic", "customTopic"],
      5: ["date"],
    };
    const fields = fieldMap[currentStep] || [];
    const stepErrors = {};

    fields.forEach((field) => {
      const error = validateField(field, values);
      if (error) stepErrors[field] = error;
    });

    return stepErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep(step, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...stepErrors }));
      setTouched((prev) => {
        const nextTouched = { ...prev };
        Object.keys(stepErrors).forEach((field) => {
          nextTouched[field] = true;
        });
        return nextTouched;
      });
      return;
    }
    next();
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => {
      const nextErrors = { ...prev };
      const error = validateField(field, data);
      if (error) {
        nextErrors[field] = error;
      } else {
        delete nextErrors[field];
      }
      return nextErrors;
    });
  };

  const updateField = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => {
        const nextErrors = { ...prev };
        const error = validateField(field, {
          ...data,
          [field]: value,
        });
        if (error) {
          nextErrors[field] = error;
        } else {
          delete nextErrors[field];
        }
        return nextErrors;
      });
    }
  };

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
        <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-8 pb-6">
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
                  {/* ... STEP*/}
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
                        onChange={(e) => updateField("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                        aria-invalid={touched.name && Boolean(errors.name)}
                        aria-describedby="booking-name-error"
                      />
                      {touched.name && errors.name && (
                        <p
                          id="booking-name-error"
                          className="text-xs text-[#B42318] font-semibold"
                        >
                          {errors.name}
                        </p>
                      )}
                      <button
                        onClick={handleNext}
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
                        How can we{" "}
                        <span className="italic text-[#7A1E2D]">
                          reach you?
                        </span>
                      </h2>
                      <input
                        autoFocus
                        className="w-full bg-transparent border-b-2 border-slate-200 py-4 text-2xl outline-none focus:border-[#7A1E2D] transition-all placeholder:text-slate-200"
                        placeholder="Email ID"
                        type="email"
                        value={data.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        onBlur={() => handleBlur("email")}
                        aria-invalid={touched.email && Boolean(errors.email)}
                        aria-describedby="booking-email-error"
                      />
                      {touched.email && errors.email && (
                        <p
                          id="booking-email-error"
                          className="text-xs text-[#B42318] font-semibold"
                        >
                          {errors.email}
                        </p>
                      )}
                      <input
                        className="w-full bg-transparent border-b-2 border-slate-200 py-4 text-2xl outline-none focus:border-[#7A1E2D] transition-all placeholder:text-slate-200"
                        placeholder="Phone Number"
                        type="tel"
                        inputMode="numeric"
                        value={data.phone}
                        onChange={(e) =>
                          updateField(
                            "phone",
                            e.target.value.replace(/\D/g, ""),
                          )
                        }
                        onBlur={() => handleBlur("phone")}
                        aria-invalid={touched.phone && Boolean(errors.phone)}
                        aria-describedby="booking-phone-error"
                      />
                      {touched.phone && errors.phone && (
                        <p
                          id="booking-phone-error"
                          className="text-xs text-[#B42318] font-semibold"
                        >
                          {errors.phone}
                        </p>
                      )}
                      <button
                        onClick={handleNext}
                        disabled={!data.email || !data.phone}
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

                  {step === 3 && (
                    <div className="space-y-6 my-auto">
                      <h2 className="text-4xl font-serif text-slate-900 leading-tight">
                        Where are you{" "}
                        <span className=" text-[#7A1E2D]">from?</span>
                      </h2>
                      <input
                        autoFocus
                        className="w-full bg-transparent border-b-2 border-slate-200 py-4 text-2xl outline-none focus:border-[#7A1E2D] transition-all placeholder:text-slate-200"
                        placeholder="Your City"
                        value={data.city}
                        onChange={(e) => updateField("city", e.target.value)}
                        onBlur={() => handleBlur("city")}
                        aria-invalid={touched.city && Boolean(errors.city)}
                        aria-describedby="booking-city-error"
                      />
                      {touched.city && errors.city && (
                        <p
                          id="booking-city-error"
                          className="text-xs text-[#B42318] font-semibold"
                        >
                          {errors.city}
                        </p>
                      )}
                      <button
                        onClick={handleNext}
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

                  {/* STEP 4: PILL-STYLE SERVICE SELECTION */}
                  {step === 4 && (
                    <div className="space-y-6 flex flex-col h-full">
                      <div className="space-y-1 text-center">
                        <h2 className="text-3xl font-serif text-slate-900 leading-tight">
                          Service{" "}
                          <span className="italic text-primary">Portfolio</span>
                        </h2>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.25em]">
                          Choose the focus of our dialogue
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-3 max-w-[420px] mx-auto">
                        {SERVICES.map((service) => {
                          const isSelected = data.topic === service;
                          return (
                            <motion.button
                              key={service}
                              whileHover={{ scale: 1.03, y: -2 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => {
                                const nextData = {
                                  ...data,
                                  topic: service,
                                  customTopic:
                                    service === "Other" ? data.customTopic : "",
                                };
                                setData(nextData);
                                setTouched((prev) => ({
                                  ...prev,
                                  topic: true,
                                  customTopic:
                                    service === "Other"
                                      ? prev.customTopic
                                      : false,
                                }));
                                setErrors((prev) => {
                                  const nextErrors = { ...prev };
                                  const topicError = validateField(
                                    "topic",
                                    nextData,
                                  );
                                  const customError = validateField(
                                    "customTopic",
                                    nextData,
                                  );
                                  if (topicError) {
                                    nextErrors.topic = topicError;
                                  } else {
                                    delete nextErrors.topic;
                                  }
                                  if (customError) {
                                    nextErrors.customTopic = customError;
                                  } else {
                                    delete nextErrors.customTopic;
                                  }
                                  return nextErrors;
                                });
                              }}
                              className={`px-4 py-2.5 rounded-full border text-[14px] font-semibold leading-none tracking-wide transition-all duration-300 whitespace-nowrap w-full min-h-[44px] ${
                                isSelected
                                  ? "bg-[#7A1E2D] border-[#7A1E2D] text-white shadow-lg shadow-red-900/20"
                                  : "bg-white border-slate-200 text-slate-600 hover:border-[#7A1E2D]/30"
                              }`}
                            >
                              <div className="flex items-center justify-center gap-2">
                                {isSelected && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-1.5 h-1.5 rounded-full bg-white "
                                  />
                                )}
                                {service}
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                      {touched.topic && errors.topic && (
                        <p className="text-xs text-center text-[#B42318] font-semibold">
                          {errors.topic}
                        </p>
                      )}

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
                                  updateField("customTopic", e.target.value)
                                }
                                onBlur={() => handleBlur("customTopic")}
                                aria-invalid={
                                  touched.customTopic &&
                                  Boolean(errors.customTopic)
                                }
                                aria-describedby="booking-custom-topic-error"
                              />
                            </div>
                            {touched.customTopic && errors.customTopic && (
                              <p
                                id="booking-custom-topic-error"
                                className="mt-2 text-xs text-center text-[#B42318] font-semibold"
                              >
                                {errors.customTopic}
                              </p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Primary Action Button */}
                      <div className="mt-auto pt-4">
                        <button
                          onClick={handleNext}
                          disabled={
                            !data.topic ||
                            (data.topic === "Other" && !data.customTopic)
                          }
                          className="group w-full py-5 rounded-full bg-primary text-white flex items-center justify-center gap-6 text-xs font-black tracking-[0.3em] uppercase hover:bg-[#5F1623] transition-all disabled:opacity-20 shadow-xl shadow-[#7A1E2D]/25"
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
                  {step === 5 && (
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
                          onChange={(e) => updateField("date", e.target.value)}
                          onBlur={() => handleBlur("date")}
                          aria-invalid={touched.date && Boolean(errors.date)}
                          aria-describedby="booking-date-error"
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      {touched.date && errors.date && (
                        <p
                          id="booking-date-error"
                          className="text-xs text-[#B42318] font-semibold"
                        >
                          {errors.date}
                        </p>
                      )}
                      <button
                        onClick={handleNext}
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
                  {step === 6 && (
                    <div className="flex flex-col items-center justify-start pt-0 pb-3">
                      {/* 1. THE PRINTER MACHINE HEAD */}
                      <div className="relative z-20 w-64 h-8 -mt-4 printer-top printer-glow rounded-t-xl border-b-4 printer-glow">
                        {/* The actual slot hole */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-1 bg-printer-glow/40 rounded-full blur-[1px]" />
                      </div>

                      {/* 2. THE RECEIPT CONTAINER */}
                      <div className="overflow-hidden w-64 flex flex-col items-center receipt-glow">
                        <motion.div
                          initial={{ y: "-100%", opacity: 0.5 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 40,
                            damping: 12,
                            mass: 1,
                            restDelta: 0.001,
                          }}
                          className="receipt-paper w-56 shadow-2xl relative p-5 pt-8"
                        >
                          {/* Receipt Header */}
                          <div className="flex justify-between items-start mb-6">
                            <div className="space-y-1">
                              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">
                                ● Confirm your Slot
                              </p>
                              <p className="text-2xl font-black text-slate-800">
                                ₹{data.price || "99.00"}
                              </p>
                              <p className="text-[8px] text-slate-400 font-mono">
                                {new Date().toLocaleString()}
                              </p>
                            </div>
                            {/* Mock Logo like the Chaayos one */}
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                              <div className="w-6 h-6 rounded-full bg-[#7A1E2D]/20" />
                            </div>
                          </div>

                          {/* Dynamic Details from your code */}
                          <div className="space-y-3 border-t border-dashed border-slate-300 pt-4">
                            <div className="flex justify-between text-[11px] font-mono text-slate-500">
                              <span>Name</span>
                              <span className="text-slate-900 font-bold">
                                {data.name}
                              </span>
                            </div>
                            <div className="flex justify-between text-[11px] font-mono text-slate-500">
                              <span>TOPIC</span>
                              <span className="text-slate-900 font-bold">
                                {data.topic}
                              </span>
                            </div>
                            <div className="flex justify-between text-[11px] font-mono text-slate-500">
                              <span>SLOT</span>
                              <span className="text-slate-900 font-bold">
                                {data.date}
                              </span>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="mt-8 pt-4 border-t border-slate-100 text-center">
                            <p className="text-[9px] font-serif italic text-slate-400 tracking-widest">
                              HAVE A NICE DAY!
                            </p>
                            {/* Barcode effect */}
                            <div className="mt-4 h-6 w-full opacity-20 flex gap-[2px]">
                              {[...Array(20)].map((_, i) => (
                                <div
                                  key={i}
                                  className="bg-black flex-1"
                                  style={{ height: `${Math.random() * 100}%` }}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* 3. POST-ANIMATION ACTIONS */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8 }}
                        className="mt-1 flex flex-col gap-3 w-full max-w-[220px]"
                      >
                        <button className="py-3 px-6 bg-primary text-white rounded-xl text-xs font-bold shadow-lg hover:bg-primary/90 transition-all">
                          Make Payment{" "}
                          <span className="ml-2">₹{data.price || "99.00"}</span>
                        </button>
                        {/* <button
                          onClick={onClose}
                          className="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                        >
                          Dismiss
                        </button> */}
                      </motion.div>
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
