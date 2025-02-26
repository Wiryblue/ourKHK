/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ring: "rgba(0, 0, 0, 0.5)",  // Define the "ring" color
      },
    },
  },
  plugins: [],
};
