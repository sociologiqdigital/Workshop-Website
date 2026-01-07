import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonialsData } from "../data/testimonial";
export const Testimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === testimonialsData.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const activeTestimonial = testimonialsData[activeIndex];

  return (
    <section className=" py-24 bg-background " id="testimonial">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-primary/10 rounded-3xl p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT — SLIDER */}
          <div className="relative min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="bg-white rounded-2xl p-8 shadow-soft relative max-w-md "
              >
                <span className="absolute -top-6 -left-9 text-8xl font-heading text-primary/20">
                  “
                </span>
                <p className="font-heading text-xl text-dark leading-relaxed mb-6">
                  {activeTestimonial.quote}
                </p>
                <div>
                  <p className="font-medium text-dark">
                    {activeTestimonial.name}
                  </p>
                  <p className="text-sm text-muted">
                    {activeTestimonial.role} · {activeTestimonial.location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination dots */}
            <div className="flex gap-2 mt-6">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 w-2 rounded-full transition ${
                    activeIndex === index ? "bg-primary w-6" : "bg-primary/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — CONTENT */}
          <div>
            <p className="text-sm uppercase tracking-widest text-primary mb-4">
              Testimonials
            </p>

            <h2 className="font-heading text-4xl md:text-5xl text-dark mb-6">
              What Our Clients Say About Us
            </h2>

            <p className="text-muted leading-relaxed mb-8 max-w-md">
              Hear directly from our satisfied clients about their experiences
              working with us. Their stories reflect clarity, confidence, and
              sustainable growth.
            </p>

            {/* <button className="btn btn-secondary">Read More Reviews</button> */}
          </div>
        </div>
      </div>
    </section>
  );
};
