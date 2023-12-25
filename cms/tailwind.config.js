import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Archivo", "ui-sans-serif", "system-ui"],
    },
  },
  plugins: [daisyui],
};
