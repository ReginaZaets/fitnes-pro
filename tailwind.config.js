/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        mainColor: "#FAFAFA",
        btnColor: "#BCEC30",
      },
      borderRadius: {
        small: "46px",
      },
      width: {
        btnWidth: "103px",
      },
      height: {
        btnHeight: "52px",
      },
    },
  },
  plugins: [],
};
