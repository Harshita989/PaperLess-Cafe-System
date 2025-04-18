/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Indigo-600
        secondary: '#6B7280', // Gray-500
      },
      fontFamily: {
        allura: ["Allura", "cursive"],
        sigmar: ["Sigmar One", "cursive"],
        playwrite: ["Playfair Display", "serif"], // Closest to Playwrite IT Moderna
        poppins: ["Poppins", "Inter", "Arial", "Helvetica", "sans-serif"],
        inter: ["Inter", "Arial", "Helvetica", "sans-serif"],
        roboto: ["Roboto", "Arial", "Helvetica", "sans-serif"],
        opensans: ["Open Sans", "Arial", "Helvetica", "sans-serif"],
        brand: ['"Cinzel Decorative"', 'serif'],

      },
    },
  },
  plugins: [],
}