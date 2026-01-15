import { useState, useMemo } from "react";
import { Send } from "lucide-react";
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

    //  RESET FORM AFTER SUBMIT
    setForm({
      fullName: "",
      email: "",
      phone: "",
      message: "",
    });
    setTouched({});
  };

 return (
  <form onSubmit={handleSubmit} className="space-y-5">
    {/* Common Wrapper for Inputs */}
    {[
      { label: "Full Name", name: "fullName", type: "text", placeholder: "John Doe" },
      { label: "Email Address", name: "email", type: "email", placeholder: "john@example.com" },
      { label: "Phone Number", name: "phone", type: "tel", placeholder: "1234567890" },
    ].map((field) => (
      <div key={field.name} className="flex flex-col gap-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-[rgb(var(--color-dark))]/60 ml-1">
          {field.label}
        </label>
        <input
          {...field}
          className={`px-6 py-4 rounded-2xl bg-[#F9F7FF] border-2 transition-all outline-none text-sm
            ${touched[field.name] && errors[field.name] 
              ? "border-red-100 focus:border-red-300" 
              : "border-transparent focus:border-[rgb(var(--color-primary))]/30 focus:bg-white focus:shadow-inner"}`}
          value={form[field.name]}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched[field.name] && errors[field.name] && (
          <span className="text-[10px] text-red-500 font-medium ml-1">{errors[field.name]}</span>
        )}
      </div>
    ))}

    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold uppercase tracking-wider text-[rgb(var(--color-dark))]/60 ml-1">Message</label>
      <textarea
        name="message"
        rows="4"
        placeholder="How can we help?"
        className="px-6 py-4 rounded-2xl bg-[#F9F7FF] border-2 border-transparent focus:border-[rgb(var(--color-primary))]/30 focus:bg-white transition-all outline-none text-sm resize-none"
        value={form.message}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {touched.message && errors.message && (
        <span className="text-[10px] text-red-500 font-medium ml-1">{errors.message}</span>
      )}
    </div>

    <button
      type="submit"
      disabled={!isFormValid}
      className={`group relative w-full py-4 rounded-2xl font-bold text-sm tracking-widest uppercase overflow-hidden transition-all duration-300
        ${!isFormValid 
          ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
          : "bg-[rgb(var(--color-primary))] text-white shadow-lg shadow-[rgb(var(--color-primary))]/25 hover:shadow-[rgb(var(--color-primary))]/40 hover:-translate-y-1 active:translate-y-0"
        }`}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        Send Message <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </span>
    </button>
  </form>
);
}