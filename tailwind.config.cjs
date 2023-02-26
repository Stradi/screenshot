/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["GeneralSans-Variable", "sans-serif"],
      },
      keyframes: {
        "fade-in-down": {
          from: {
            opacity: "0",
            transform: "translateY(-2px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-up": {
          from: {
            opacity: "0",
            transform: "translateY(2px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "fade-in-down": "fade-in-down 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
