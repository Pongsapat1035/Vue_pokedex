import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '1px 1px 10px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [
    daisyui
  ],
}