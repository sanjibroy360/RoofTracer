/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "80vh": "80vh",
      },
      boxShadow: {
        neumorphic: "5px 5px 15px #d0d0d0, -5px -5px 15px #ffffff inset",
      },
    },
  },
  plugins: [],
};
