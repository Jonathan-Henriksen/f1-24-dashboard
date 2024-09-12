// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        f1Red: '#FF1E00',
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
    },
  },
  plugins: [],
};
