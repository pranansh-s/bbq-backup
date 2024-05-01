/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'shake-fast': 'shake 0.2s linear 4'
      },
      keyframes: {
        shake: {
          '0%, 100%': { marginLeft: '0' },
          '33%': { marginLeft: '-5px', marginRight: '5px' },
          '66%': { marginLeft: '5px', marginRight: '-5px' }
        }
      },
      colors: {
        primary: "#000000",
        secondary: "#FC5C2C",
        tertiary: "#FFFFFF",
      },
      padding: {
        'margin-xl': '18rem',
        'margin-lg': '14rem',
        'margin-base': '6rem',
        'margin-sm': '3rem',
        'margin-xs': '1rem',
        'navbar': '6rem',
        'gap': '4rem'
      },
      margin: {
        'margin-xl': '18rem',
        'margin-lg': '14rem',
        'margin-base': '6rem',
        'margin-sm': '3rem',
        'margin-xs': '2rem',
        'navbar': '6rem',
        'gap': '9rem'
      },
      backgroundImage: {
        'flame': "url('/statics/flame.jpg')",
        'header': "url('/statics/header.png')",
      },
      fontFamily: {
        fontBold: ['Open Sans Bold', 'sans-serif'],
        fontRegular: ['Open Sans Regular', 'sans-serif'],
        fontLight: ['Open Sans Light', 'sans-serif'],
        fontSemi: ['Open Sans Semi-Bold', 'sans-serif'],
        fontExtra: ['Open Sans Extra Bold', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
