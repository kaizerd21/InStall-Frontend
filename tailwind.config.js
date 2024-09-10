/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8cc63f",
        primary_hover: "#9ee245",
        secondary: "#545649",
        background_color: "#128b31",
        header_color: "#128b31",
        inputfield_color: "#f4fad5",
        card_color: "#FEFEEB",
      }
    },
  },
  plugins: [],
}

