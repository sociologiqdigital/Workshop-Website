import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion"; // For smooth modal transitions
import "react-day-picker/dist/style.css";
import SlotPicker from "./SlotPicker";
import { Calendar, CheckCircle, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function RegistrationForm({ submitLabel = "Pay & Register" }) {
  const [form, setForm] = useState({
    name: "",
    registrationType: "",
    email: "",
    phone: "",
    address: "",
  });
  const [slotDate, setSlotDate] = useState(null);
  const [touched, setTouched] = useState({});
  const [showslotPicker, setShowSlotPicker] = useState(false);

  // New state for Success Modal
  // const [showSuccessModal, setShowSuccessModal] = useState(false);

  // ---------- HANDLERS ---------- //
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
    }
    setForm({ ...form, [name]: value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  /* ---------- VALIDATION ---------- */
  const errors = useMemo(() => {
    const errs = {};
    if (!form.name) errs.name = "Name is required";
    if (!form.registrationType) errs.registrationType = "Please select a type";
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email))
      errs.email = "Valid email required";
    if (!form.phone || !/^\d{10}$/.test(form.phone))
      errs.phone = "10-digit number required";
    if (!form.address || form.address.length < 10)
      errs.address = "Min 10 characters required";
    if (!slotDate) errs.slot = "Session date required";
    return errs;
  }, [form, slotDate]);

  const isFormValid = Object.keys(errors).length === 0;

  // ---------- SUBMIT HANDLER ---------- //
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    // Show Success Modal first
    // setShowSuccessModal(true);

    // Form cleanup
    setForm({
      name: "",
      registrationType: "",
      email: "",
      phone: "",
      address: "",
    });
    setSlotDate(null);
    setTouched({});
    setShowSlotPicker(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="form-input"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && errors.name && (
              <p className="form-error mt-1">{errors.name}</p>
            )}
          </div>

          {/* Registration Type */}
          <div className="flex flex-col gap-2">
            <label className="form-label">Type of Registration</label>
            <select
              name="registrationType"
              className="form-input"
              value={form.registrationType}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select type</option>
              <option value="student">Student</option>
              <option value="employee">Employee</option>
              <option value="other">Other</option>
            </select>
            {touched.registrationType && errors.registrationType && (
              <p className="form-error mt-1">{errors.registrationType}</p>
            )}
          </div>

          {/* Email */}
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="form-input"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <p className="form-error mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            name="phone"
            maxLength="10"
            placeholder="Enter 10-digit phone number"
            className="form-input"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.phone && errors.phone && (
            <p className="form-error mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Slot Picker Input */}
        <div className="flex flex-col gap-2 relative">
          <label className="form-label">Select Session Date</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Select date"
              readOnly
              value={slotDate ? slotDate.toLocaleDateString() : ""}
              onClick={() => setShowSlotPicker(true)}
              className="form-input pr-10 cursor-pointer"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
          </div>
          {errors.slot && touched.name && (
            <p className="form-error mt-1">{errors.slot}</p>
          )}

          {showslotPicker && (
            <div className="absolute z-30 mt-2 bg-white rounded-xl shadow-lg p-4">
              <SlotPicker
                value={slotDate}
                onChange={(selectedDate) => {
                  setSlotDate(selectedDate);
                  setShowSlotPicker(false);
                }}
              />
            </div>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2">
          <label className="form-label">Address</label>
          <textarea
            name="address"
            rows="3"
            placeholder="Enter your complete address"
            className="form-input"
            value={form.address}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.address && errors.address && (
            <p className="form-error mt-1">{errors.address}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`btn btn-primary w-full ${
            !isFormValid ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {submitLabel}
        </button>
      </form>

      {/* SUCCESS MODAL */}
      {/* <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-8 text-center shadow-2xl"
            >
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 p-2 text-muted hover:text-dark transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle
                  size={40}
                  fill="currentColor"
                  className="text-white"
                />
              </div>

              <h2 className="text-3xl font-serif font-bold text-dark mb-4">
                Congratulations!
              </h2>

              <p className="text-muted leading-relaxed mb-8">
                Your registration is successful. You will receive your session
                details and workshop link over{" "}
                <span className="font-bold text-primary">email</span> shortly.
              </p>
              <Link to= "/">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="btn btn-primary w-full py-4 text-lg font-bold"
                >
                  Got it, thanks!
                </button>
              </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence> */}
    </>
  );
}
