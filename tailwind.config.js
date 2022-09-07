/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins, sans-serif",
        inter: "Inter, sans-serif",
      },
      colors: {
        brand: {
          50: "#e7f7ff",
          100: "#b6e3ff",
          200: "#80ccff",
          300: "#54aeff",
          400: "#218bff",
          500: "#0969da",
          600: "#0550ae",
          700: "#033d8b",
          800: "#0a3069",
          900: "#002155",
        },
        "gray-light": "#f2f2f2",
        "black-primary": "#151B26",
        dark: "#151A23",
      },
      fontSize: {
        "big-header": "56px",
      },
    },
  },
  plugins: [],
};
