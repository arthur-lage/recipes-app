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
        "not-found-gradient-start": "#8a97e4",
        "not-found-gradient-end": "#4d56a7",
        "header-gradient-start": "#546FB8",
        "header-gradient-end": "#677DDA",
        "submit-gradient-start": "#283853",
        "submit-gradient-end": "#3c5299",
        "app-bg": "#576cd6",
      },
    },
  },
  plugins: [],
};
