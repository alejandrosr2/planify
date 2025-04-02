/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgColor: "#19191D",
        bgHeader: "#202024",
        borderColor: "#4A4A4C",
        hoverColor: "#414146",
        red: "#8B3046",
        green: "#3D8B4B",
        blue: "#4A3D8B",
        yellow: "#8B8B30",
        purple: "#7D3D8B",
      }
    },
  },
  plugins: [],
}