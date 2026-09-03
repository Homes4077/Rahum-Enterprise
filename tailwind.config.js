/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#f59e0b",
          dark: "#090d16",
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}