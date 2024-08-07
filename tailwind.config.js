/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#108BE9",
        // secondary: "#F2C94C",
        // success: "#4CD62B",
        // warning: "#FFC000",
        // danger: "#FF3B30",
        // info: "#007AFF",
        // light: "#F8F9FC",
        // dark: "#212121",
        primary: "#8cc63f",
        primary_hover: "#9ee245",
        primary_text: "#FFFFDE",
        secondary: "#545649",
        background_color: "#128b31",
        background_secondary: "#F4FAD5",
        inputfield_color: "#f4fad5",
        button_green: "#89C587",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
