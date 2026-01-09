import { useState, useMemo } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "fullName") {
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

    if (!form.fullName) {
      errs.fullName = "Full name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(form.fullName)) {
      errs.fullName = "Full name can only contain letters and spaces";
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

    if (!form.message) {
      errs.message = "Message is required";
    } else if (form.message.length < 10) {
      errs.message = "Message must be at least 10 characters";
    }

    return errs;
  }, [form]);

  const isFormValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    // 🔗 API integration will go here later
    console.log("Contact Form Data:", form);

    // ✅ RESET FORM AFTER SUBMIT
    setForm({
      fullName: "",
      email: "",
      phone: "",
      message: "",
    });
    setTouched({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div className="flex flex-col">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          className="form-input"
          value={form.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.fullName && errors.fullName && (
          <p className="form-error">{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label className="form-label">Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          className="form-input"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email && (
          <p className="form-error">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div className="flex flex-col">
        <label className="form-label">Phone Number</label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter 10-digit phone number"
          maxLength="10"
          className="form-input"
          value={form.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.phone && errors.phone && (
          <p className="form-error">{errors.phone}</p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col">
        <label className="form-label">Query / Message</label>
        <textarea
          name="message"
          rows="4"
          placeholder="Enter your query or message (minimum 10 characters)"
          className="form-input"
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.message && errors.message && (
          <p className="form-error">{errors.message}</p>
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
        Submit
      </button>
    </form>
  );
}
