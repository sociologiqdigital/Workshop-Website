/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      /* =====================================================
         COLOR SYSTEM (CSS VARIABLE DRIVEN)
         ===================================================== */
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)", // Coral
        accent: "rgb(var(--color-accent) / <alpha-value>)", // Blush
        background: "rgb(var(--color-background) / <alpha-value>)", // Peach
        surface: "rgb(var(--color-surface) / <alpha-value>)", // White
        dark: "rgb(var(--color-dark) / <alpha-value>)", // Headings
        muted: "rgb(var(--color-muted) / <alpha-value>)", // Body
        wine: "rgb(var(--color-wine) / <alpha-value>)", // Decorative
      },

      /* =====================================================
         BRAND GRADIENTS
         ===================================================== */
      backgroundImage: {
        brand:
          "linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))",
      },

      /* =====================================================
         TYPOGRAPHY
         ===================================================== */
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },

      /* =====================================================
         SHADOWS (SOFT & PREMIUM)
         ===================================================== */
      boxShadow: {
        soft: "0 10px 30px rgba(0, 0, 0, 0.06)",
        hover: "0 18px 45px rgba(228, 124, 116, 0.35)",
      },

      /* =====================================================
         BORDER RADIUS SCALE
         ===================================================== */
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.75rem", // for rounded image containers
      },

      /* =====================================================
         SPACING HELPERS (OPTIONAL BUT NICE)
         ===================================================== */
      spacing: {
        section: "7rem",
      },
    },
  },

  plugins: [],
};
