import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import WaitingListImg from "../styles/images/WaitingListImg.png";

// --- VALIDATION SCHEMA ---
const waitlistSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[^0-9]*$/, "Name cannot contain numbers"), // Custom regex: No numbers allowed
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9]*$/, "Phone number can only contain numbers"), // Custom regex: Only digits allowed
});

export default function WaitlistForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API Call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Waitlist Data:", data);
      setIsSuccess(true);
      reset();
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-6">
        <img
          src={WaitingListImg}
          alt="Waiting list illustration"
          className="w-full h-auto rounded-2xl object-cover"
        />
      </div>
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* Full Name Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#5A506E]/60 ml-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  {...register("fullName")}
                  placeholder="John Doe"
                  className={`w-full px-5 py-3.5 bg-[#F9F7FF] border rounded-2xl text-sm outline-none transition-all ${
                    errors.fullName
                      ? "border-red-400 focus:border-red-500"
                      : "border-[#9667E0]/10 focus:border-[#9667E0] focus:bg-white"
                  }`}
                />
                {errors.fullName && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-1 mt-1 text-red-500 text-[10px] font-medium"
                  >
                    <AlertCircle size={12} /> {errors.fullName.message}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#5A506E]/60 ml-1">
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="john@example.com"
                className={`w-full px-5 py-3.5 bg-[#F9F7FF] border rounded-2xl text-sm outline-none transition-all ${
                  errors.email
                    ? "border-red-400 focus:border-red-500"
                    : "border-[#9667E0]/10 focus:border-[#9667E0] focus:bg-white"
                }`}
              />
              {errors.email && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-[10px] font-medium">
                  <AlertCircle size={12} /> {errors.email.message}
                </div>
              )}
            </div>

            {/* Phone Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-widest text-[#5A506E]/60 ml-1">
                Phone Number
              </label>
              <input
                {...register("phone")}
                placeholder="9876543210"
                className={`w-full px-5 py-3.5 bg-[#F9F7FF] border rounded-2xl text-sm outline-none transition-all ${
                  errors.phone
                    ? "border-red-400 focus:border-red-500"
                    : "border-[#9667E0]/10 focus:border-[#9667E0] focus:bg-white"
                }`}
              />
              {errors.phone && (
                <div className="flex items-center gap-1 mt-1 text-red-500 text-[10px] font-medium">
                  <AlertCircle size={12} /> {errors.phone.message}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              disabled={isSubmitting}
              type="submit"
              className="group relative w-full py-4 bg-[#9667E0] text-white font-bold rounded-2xl shadow-[0_15px_30px_rgba(150,103,224,0.25)] hover:shadow-[0_20px_40px_rgba(150,103,224,0.35)] active:scale-95 transition-all duration-300 flex items-center justify-center overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    Join the Waitlist{" "}
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </motion.form>
        ) : (
          /* Success State */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 bg-green-50 rounded-[2.5rem] border border-green-100"
          >
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-green-200">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-serif text-dark mb-2">
              You're on the list!
            </h3>
            <p className="text-[#5A506E] text-sm">
              We've sent a confirmation email. Stay tuned for updates on our
              next cohort.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9667E0] hover:underline"
            >
              Add another email
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
