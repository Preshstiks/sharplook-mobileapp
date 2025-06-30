/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.js", "./global.css", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
