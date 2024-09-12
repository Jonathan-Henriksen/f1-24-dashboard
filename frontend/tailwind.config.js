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
        // Team Colors
        mercedes: '#00D2BE',  // Mercedes - Teal Green
        ferrari: '#DC0000',   // Ferrari - Red
        redbull: '#1E41FF',   // Red Bull Racing - Navy Blue
        williams: '#005AFF',  // Williams - Light Blue
        astonmartin: '#006F62', // Aston Martin - British Racing Green
        alpine: '#0090FF',    // Alpine - Blue
        rb: '#1E41FF',        // RB (previously AlphaTauri) - Navy Blue
        haas: '#FFFFFF',      // Haas - White
        mclaren: '#FF8700',   // McLaren - Papaya Orange
        sauber: '#00A08C',    // Sauber (previously Alfa Romeo) - Green
      },
    },
  },
  plugins: [],
};
