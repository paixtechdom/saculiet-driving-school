/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "jobBg": "linear-gradient(rgba(0,0,0,0.5) ,rgba(0,0,0,0.5)), url(./src/assets/images/gettyimages-1235245955-612x612.jpg)"
      }
    },
  },
  plugins: [],
}

