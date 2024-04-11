/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        spinner: "20px",
      },
      height: {
        spinner: "20px",
      },
      borderColor: {
        primary: "#00B796",
      },
      animation: {
        "spin-slow": "spin 2s linear infinite",
      },
      colors: {
        customGreen: "#00B796",
        customGray: "#F3F3F3",
        grayShade: "#E4E4E4",
      },
    },
  },
  plugins: [],
};
