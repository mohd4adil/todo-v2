const { transform } = require('zod');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    extend: {
      width: {
        "sidebar": "150px",
        "sidebar-icon": "50px",
      },
      margin: {
        "sidebar": "150px",
        "sidebar-icon": "50px",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.8)' },
          '100%': { opacity: 1, transform: 'scale(1)' }
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out 0.2s forwards',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} 