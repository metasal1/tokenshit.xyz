module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      primary: "#9945FF",
      secondary: "#14F195",
      white: "#FFFFFF",
      black: "#000000",
    },
    extend: {
      fontFamily: {
        sans: ["sans-serif"],
        karma: ["Karmatic Arcade"]
      },
    },
  },
  plugins: [],
};
