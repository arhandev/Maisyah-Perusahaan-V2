/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#31AAE0",
        secondary: "#FA8A00",
        "gray-custom": "#14445D",
        "font-dark": "#14445D",
        "green-custom": "#25B99E",
        "red-custom": "#FA8072",
        danger: "#EA4735",
      },
      spacing: {
        88: "22rem",
        104: "26rem",
        112: "28rem",
        120: "30rem",
        128: "32rem",
        136: "34rem",
        144: "36rem",
      },
      screens: {
        "2xl": "1600px",
      },
      backgroundImage: {
        "wave-big": "url('../../public/images/bg-big.png')",
        "wave-small": "url('../../public/images/bg-small.png')",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
