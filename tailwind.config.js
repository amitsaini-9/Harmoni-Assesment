/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FDB813", // Yellow color from the design
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  plugins: [],
};
