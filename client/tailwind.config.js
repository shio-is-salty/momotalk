/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "pink": "#FB98A7",
        "black": "#211D1D",
        "dark-blue": "#4C5B6F",
        "blue": "#4D89C8",
        "red": "#F34B30",
        "vanilla": "#F3F7F8",
        "vanilla-20": "#F3F7F840",
      }
    },
  },
  plugins: [],
}

