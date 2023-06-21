/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-light": "#FFFFFF",
        "primary-dark": "#090D1F",
        "secondary-light": "#F8F9FC",
        "secondary-dark": "#121212",
        "text-primary-light": "#1A1A1A",
        "text-primary-dark": "#FFFFFF",
        "text-secondary-light": "#667085",
        "text-secondary-dark": "#C0C5D0",
      },
    },
  },
  plugins: [],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
};
