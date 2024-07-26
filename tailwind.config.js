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
        inputModal: "#D0CECE",
      },
      borderRadius: {
        small: "46px",
        radiusModal: "30px",
      },
      width: {
        btnWidth: "103px",
        contentWidth: "1160px",
        userPopWidth: "266px",
        btnUserPopWidth: "206px",
        signinModalWidth: "360px",
        logosigninModalW: "220px",
        inputWidth: "280px",
      },
      height: {
        btnHeight: "52px",
        userPopHeight: "258px",
        signinModalHeight: "487px",
        logosigninModalH: "35px",
        inputHeight: "52px",
      },
      padding: {
        inputPadding: "18px",
      },
      margin: {
        btnModalMargin: "34px",
      },
      boxShadow: {
        customShadow: "0px 4px 67px -12px rgba(0, 0, 0, 0.13)",
      },
      lineHeight: {
        textHeight: "19.8px",
      },
    },
  },
  plugins: [],
};
