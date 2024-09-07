// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        f1Red: '#FF1E00',  // Formula 1 inspired red
        f1Grey: '#2E2E2E', // Dark grey for background
        f1Highlight: '#D0021B', // Red for menu highlight
        f1Green: '#00D369', // Green for lap time improvements
        f1Purple: '#9B30FF', // Purple for fastest lap
        f1DeltaRed: '#FF0000', // Red for slower lap delta
      },
    },
  },
  plugins: [],
};
