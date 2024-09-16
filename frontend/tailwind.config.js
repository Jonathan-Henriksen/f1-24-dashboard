// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jetBlack: '#101010',
        jetBlackShadow: '#080808',
        darkGrapite: '#1A1A1A',
        darkGrapiteShadow: '#141414',
        steelGray: '#2E2E2E',
        steelGrayShadow: '#1F1F1F',
        softWhite: '#F2F2F2',
        softWhiteShadow: '#B8B8B8',
        // F1 Colors
        f1Grey: '#2E2E2E',
        f1Highlight: '#D0021B',
        f1Green: '#00D369',
        f1Purple: '#9B30FF',
        f1DeltaRed: '#FF0000',
        // Team Colors
        mercedes: '#27F4D2',
        ferrari: '#E7002D',
        redbull: '#3671C6',
        williams: '#64C4FF',
        astonmartin: '#229971',
        alpine: '#FF87BC',
        rb: '#6692FF',
        haas: '#B6BABD',
        mclaren: '#FF8000',
        sauber: '#52E252',
      },
      screens: {
        xl: { max: "1279px" },
        lg: { max: "1023px" },
        md: { max: "767px" },
        sm: { max: "639px" },
      }
    },
  },
  plugins: [],
};
