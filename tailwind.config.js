module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#F5F8FA',
          100: '#F2F2F2',
          200: '#DCE2E5',
          600: '#C4C4C4',
          700: '#828282',
          800: '#4F4F4F',
          900: '#333333',
        },
        white: '#FFFFFF',
        blue: {
          500: '#2F80ED'
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Montserrat', 'serif'],
      },
    },
  },
  plugins: [],
}
