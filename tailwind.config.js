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
        headerPopLinkColor: "#999999",
        btnHoverGreen: "#C6FF00",
        btnHoverWhite: "#F7F7F7",
        btnActive: "#E9ECED",
        btnInactiveText: "#999999",
        btnInactiveBg: "#F7F7F7",
      },
      borderRadius: {
        small: "46px",
      },
      width: {
        btnWidth: "103px",
        contentWidth: "1160px",
        userPopWidth:"266px",
        btnUserPopWidth: "206px"
      },
      height: {
        btnHeight: "52px",
        userPopHeight:"258px",
        
      },
    },
  },
  plugins: [],
};
