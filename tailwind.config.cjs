/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      primary1: 'hsl(12, 88%, 59%)',
      secondary1: 'hsl(12, 88%, 69%)',
      light1: 'hsl(12, 88%, 95%)',
      primary2: 'hsl(228, 39%, 23%)',
      secondary2: 'hsl(227, 12%, 61%)',
      dark2: 'hsl(233, 12%, 13%)',
      option1: 'hsl(13, 100%, 96%)',
      option2: 'rgba(30, 20, 60)',
      green: "#10b981",
      red: "#b91c1c",
    },
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'aleo': ['Aleo', 'serif'],
        'muli': ['Mulish', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif']
      }
    },
  },
  plugins: [],
}
