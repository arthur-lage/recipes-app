/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx,html}"],
  theme: {
    extend: {
      screens: {
        xsm: [{ min: "425px", max: "768px" }],
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        "main-blue": "#285ca3",
        "input-gradient-start": "#c8cff1",
        "input-gradient-end": "#8897e2",
        "submit-gradient-start": "#283853",
        "submit-gradient-end": "#3c5299",
      },
    },
  },
  plugins: [],
};
