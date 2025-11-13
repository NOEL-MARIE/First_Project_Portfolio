/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        RalewayRegular: ["RalewayRegular", "sans-serif"],
        RobotoSlab: ["RobotoSlab", "sans-serif"],
        RalewayMedium: ["RalewayMedium", "sans-serif"],
        Sacramento: ["Sacramento Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
