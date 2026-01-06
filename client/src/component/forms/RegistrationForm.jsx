import { useState, useMemo } from "react";
import "react-day-picker/dist/style.css";
import SlotPicker from "./SlotPicker";
import { Calendar } from "lucide-react";
export default function RegistrationForm() {
  const [form, setForm] = useState({
    name: "",
    registrationType: "",
    email: "",
    phone: "",
    address: "",
  });
  const [slot, setSlot] = useState({ date: null, time: "" });
  const [touched, setTouched] = useState({});
  const [showslotPicker, setShowSlotPicker] = useState(false);

  // ---------- HANDLERS ---------- //
  const handleChange = (e) => {
    const { name, value } = e.target;
if (name === "name") {
    if (!/^[a-zA-Z\s]*$/.test(value)) return;
  }

  // Phone: allow only numbers
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

    if (!form.name) {
      errs.name = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(form.name)){
        errs.name = "Name can only contain letters and spaces";
    }
      if (!form.registrationType) {
        errs.registrationType = "Please select a registration type";
      }

    if (!form.email) {
      errs.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      errs.email = "Enter a valid email address";
    }

    if (!form.phone) {
      errs.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      errs.phone = "Enter a valid 10-digit phone number";
    }

    if (!form.address) {
      errs.address = "Address is required";
    } else if (form.address.length < 10) {
      errs.address = "Address must be at least 10 characters";
    }
    if (!slot.date || !slot.time) {

      errs.slot = "Please select a session slot";
    }

    return errs;
  }, [form, slot]);
  const isFormValid = Object.keys(errors).length === 0;

  // ---------- SUBMIT HANDLER ---------- //
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    // Reset form after submission
    setForm({
      name: "",
      registrationType: "",
      email: "",
      phone: "",
      address: "",
    });
    // Reset slot and touched
    setSlot({ date: null, time: "" });
    setTouched({});
    // Close slot picker if open
    setShowSlotPicker(false);

    // 🔗 API call will go here later
    // console.log("Registration Data:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            inputMode="text"
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
        {/* Type of Registration */}
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
          inputMode="numeric"
          placeholder="Enter 10-digit phone number"
          maxLength="10"
          className="form-input"
          value={form.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.phone && errors.phone && (
          <p className="form-error mt-1">{errors.phone}</p>
        )}
      </div>
      {/* Session Slot */}
      <div className="flex flex-col gap-2 relative">
        <label className="form-label">Select Session Slot</label>
        <div className="relative">
          <input
            type="slot"
            placeholder="Select date & time"
            readOnly
            value={
              slot.date && slot.time
                ? `${slot.date.toLocaleDateString()} · ${slot.time}`
                : ""
            }
            onClick={() => setShowSlotPicker(true)}
            className="form-input pr-10 cursor-pointer"
          />

          {/* Calendar Icon */}
          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none" />
        </div>

        {errors.slot && <p className="form-error mt-1">{errors.slot}</p>}

        {showslotPicker && (
          <div className="absolute z-30 mt-2 bg-white rounded-xl shadow-lg p-4">
            <SlotPicker
              value={slot}
              onChange={(selectedSlot) => {
                setSlot(selectedSlot);
                setShowSlotPicker(false);
              }}
            />
          </div>
        )}
      </div>

      {/* Address */}
      <div className="md:col-span-2 flex flex-col gap-2">
        <label className="form-label">Address</label>
        <textarea
          name="address"
          rows="3"
          placeholder="Enter your complete address (minimum 10 characters)"
          className="form-input"
          value={form.address}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.address && errors.address && (
          <p className="form-error mt-1">{errors.address}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isFormValid}
        className={`btn btn-primary w-full ${
          !isFormValid ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Register for Workshop
      </button>
    </form>
  );
}
