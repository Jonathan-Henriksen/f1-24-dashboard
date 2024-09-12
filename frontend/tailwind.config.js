// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
