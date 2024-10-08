// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Main Colors
        mainDark: '#282927',
        mainLight: '#383937',
        mainBorder: '#696A6B',
        mainRed: '#D0021B',
        mainBlue: '#3EBEF7',
        mainWhite: '#FFFFFF',
        lapTime: {
          green: '#00D369',
          purple: '#9B30FF'
        },
        // F1 Colors
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
      minWidth: {
        'card-lg': '800px'
      },
      maxWidth: {
        'card-lg': '1000px'
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
