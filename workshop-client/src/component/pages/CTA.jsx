import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTASection = () => {
  // Entrance animations for the section
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="py-20 px-6 bg-[rgb(var(--color-background))]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="cta-window mx-auto w-full max-w-5xl"
      >
        <div className="cta-window-bar">
          <div className="cta-window-controls">
            <span className="cta-window-dot cta-window-dot--primary" />
            <span className="cta-window-dot cta-window-dot--muted" />
            <span className="cta-window-dot cta-window-dot--dark" />
          </div>
          <div className="cta-window-address">digitalbizworkshop.com</div>
          <div className="cta-window-tabs" />
        </div>

        <div className="cta-window-body">
          <div className="cta-content">
            <motion.h2 variants={itemVariants} className="cta-title font-serif">
              Ready to Transform <br />
              Your Future?
            </motion.h2>

            <motion.p variants={itemVariants} className="cta-text font-sans">
              Secure your spot in the Digital Biz Kickstarter workshop and start
              building the business you've always dreamed of.
            </motion.p>

            <motion.div variants={itemVariants} className="cta-actions">
              <Link to={"/register"}>
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="cta-button cta-button--primary"
                >
                  Reserve My Seat Now
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="cta-button cta-button--ghost"
                >
                  Contact Us for More Info
                </motion.button>
              </Link>
            </motion.div>
          </div>

          <svg
            className="cta-graphic"
            viewBox="0 0 420 320"
            role="presentation"
          >
            <g className="cta-graphic-group cta-graphic-group--one">
              <polygon
                points="110,20 190,100 110,180 30,100"
                stroke="currentColor"
              />
              <line x1="110" y1="20" x2="110" y2="180" />
              <line x1="30" y1="100" x2="190" y2="100" />
              <line x1="55" y1="75" x2="165" y2="125" />
              <line x1="165" y1="75" x2="55" y2="125" />
            </g>
            <g className="cta-graphic-group cta-graphic-group--two">
              <polygon
                points="320,70 380,130 320,190 260,130"
                stroke="currentColor"
              />
              <line x1="320" y1="70" x2="320" y2="190" />
              <line x1="260" y1="130" x2="380" y2="130" />
              <line x1="275" y1="110" x2="365" y2="150" />
              <line x1="365" y1="110" x2="275" y2="150" />
            </g>
            <g className="cta-graphic-group cta-graphic-group--three">
              <polygon
                points="230,200 300,270 230,340 160,270"
                stroke="currentColor"
              />
              <line x1="230" y1="200" x2="230" y2="340" />
              <line x1="160" y1="270" x2="300" y2="270" />
              <line x1="175" y1="250" x2="285" y2="290" />
              <line x1="285" y1="250" x2="175" y2="290" />
            </g>
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
