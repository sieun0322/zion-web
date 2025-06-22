/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#fef7f0',
          text: '#2b1e12',
          accent: '#f97316',
          soft: '#ffe3ca',
          border: '#fbbf77',
        },
        dark: {
          bg: '#0a192f',
          text: '#ccd6f6',
          accent: '#64ffda',
        },
      },
    },
  },
  plugins: [],
};
