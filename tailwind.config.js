/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.js", "./global.css", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
    colors: {
      primary: "#EB278D",
      secondary: "#FFFAFD",
      pinklight: "#FDE9F4",
      success: "#34C759",
      pending: "#FF9500",
      faintDark: "#333333",
      faintDark2: "#616161",
      fadedDark: "#201E1F",
      notFocus: "#EBD1C1",
      lightgray: "#A5A5A5",
      white: "#FFFFFF",
    },
  },
  plugins: [],
};
