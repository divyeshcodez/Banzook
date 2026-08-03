/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8F7F5',
        foreground: '#111111',
        primary: '#FF4D1A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        condensed: ['Oswald', 'Anton', 'Impact', 'sans-serif'], // Or similar for editorial
      }
    },
  },
  plugins: [],
}
