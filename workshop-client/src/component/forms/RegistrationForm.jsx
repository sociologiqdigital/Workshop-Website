import { useState, useMemo } from "react";
import "react-day-picker/dist/style.css";
import SlotPicker from "./SlotPicker";
import { Calendar, X } from "lucide-react";

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

  // ---------- HANDLERS (UNCHANGED) ---------- //
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) return;
    if (name === "phone" && !/^\d*$/.test(value)) return;
    setForm({ ...form, [name]: value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  /* ---------- VALIDATION (UNCHANGED) ---------- */
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* NAME */}
        <div>
          <label className="form-label">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-input"
            placeholder="John Doe"
          />
          {touched.name && errors.name && (
            <p className="form-error">{errors.name}</p>
          )}
        </div>

        {/* TYPE */}
        <div>
          <label className="form-label">Registration Type</label>
          <select
            name="registrationType"
            value={form.registrationType}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-input"
          >
            <option value="">Select type</option>
            <option value="student">Student</option>
            <option value="employee">Employee</option>
            <option value="other">Other</option>
          </select>
          {touched.registrationType && errors.registrationType && (
            <p className="form-error">{errors.registrationType}</p>
          )}
        </div>

        {/* EMAIL */}
        <div className="md:col-span-2">
          <label className="form-label">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-input"
            placeholder="you@example.com"
          />
          {touched.email && errors.email && (
            <p className="form-error">{errors.email}</p>
          )}
        </div>
      </div>

      {/* PHONE */}
      <div>
        <label className="form-label">Phone</label>
        <input
          name="phone"
          maxLength="10"
          value={form.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-input"
          placeholder="9876543210"
        />
        {touched.phone && errors.phone && (
          <p className="form-error">{errors.phone}</p>
        )}
      </div>

      {/* DATE PICKER */}
      <div className="relative">
        <label className="form-label">Session Date</label>
        <div className="relative">
          <input
            readOnly
            onClick={() => setShowSlotPicker((prev) => !prev)}
            value={slotDate ? slotDate.toLocaleDateString() : ""}
            placeholder="Select date"
            className="form-input pr-12 cursor-pointer"
          />
          <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-muted" />
        </div>

        {showslotPicker && (
          <div className="absolute z-40 mt-3 bg-white rounded-2xl shadow-xl p-4">
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={() => setShowSlotPicker(false)}
                aria-label="Close calendar"
                className="p-1 rounded-full hover:bg-gray-100 text-muted"
              >
                <X size={16} />
              </button>
            </div>
            <SlotPicker
              value={slotDate}
              onChange={(date) => {
                setSlotDate(date);
                setShowSlotPicker(false);
              }}
            />
          </div>
        )}
      </div>

      {/* ADDRESS */}
      <div>
        <label className="form-label">Address</label>
        <textarea
          name="address"
          rows="3"
          value={form.address}
          onChange={handleChange}
          onBlur={handleBlur}
          className="form-input"
          placeholder="Street, City, ZIP"
        />
        {touched.address && errors.address && (
          <p className="form-error">{errors.address}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        className="btn btn-primary w-full"
      >
        {submitLabel}
      </button>
    </form>
  );
}
