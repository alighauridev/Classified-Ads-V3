/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#A2A2A2", //overall back
        secondary: "#C38BFF", //its pinkish
        dimblack: "#222222", //text color
        dimgrey: "#22222280", //dim text
        heading: "#101115",
        back: "#22222220", //real back
        subheading: "#1B1C21",
        toryblue: {
          50: "#f1f7fe",
          100: "#e2edfc",
          200: "#bfdaf8",
          300: "#86bcf3",
          400: "#469bea",
          500: "#1e7dd9",
          600: "#0f59a9",
          700: "#0f4e95",
          800: "#10437c",
          900: "#133967",
          950: "#0d2444",
        },
      },
      fontFamily: {
        Lexend: ["Lexend"],
      },
    },
    screens: {
      mobile: { max: "420px" },
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
