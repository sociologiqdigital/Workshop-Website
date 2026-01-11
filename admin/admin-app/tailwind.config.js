/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep background colors
        brand: {
          dark: "#0f172a", // Slate 900
          card: "rgba(255, 255, 255, 0.7)",
          border: "rgba(255, 255, 255, 0.3)",
        },
        // Modern Accent Palette
        accent: {
          primary: "#6366f1", // Indigo 500
          success: "#10b981", // Emerald 500
          warning: "#f59e0b", // Amber 500
          danger: "#ef4444", // Red 500
          info: "#3b82f6", // Blue 500
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
