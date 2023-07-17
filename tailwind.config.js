/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background) ",
        btnclr: "var(--btnclr) ",
        btntxtclr: "var(--btntxtclr) ",
        cardColor:"var(--cardColor)",
        mainTextColor:"var(--mainTextColor)",
      },
      fontFamily: {
        'sfpro': [
          'SF-Bold',
          'SF-Regular',
        ]
      }
    },
  },
  plugins: [],
}