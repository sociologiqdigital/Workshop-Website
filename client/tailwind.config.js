/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      /* ===============================
         BRAND COLORS (CSS VARIABLE DRIVEN)
         =============================== */
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)", // Maroon
        accent: "rgb(var(--color-accent) / <alpha-value>)", // Soft gold
        background: "rgb(var(--color-background) / <alpha-value>)", // Beige
        surface: "rgb(var(--color-surface) / <alpha-value>)", // White
        dark: "rgb(var(--color-dark) / <alpha-value>)", // Headings
        muted: "rgb(var(--color-muted) / <alpha-value>)", // Body text
      },
      /* ===============================
         BRAND GRADIENT
         =============================== */
      backgroundImage: {
        brandGradient:
          "linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))",
      },

      /* Typography */
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },

      /* Subtle UI Enhancements */
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.08)",
        hover: "0 15px 40px rgba(0,0,0,0.12)",
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
