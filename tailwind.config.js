module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      title: ['"Josefin Sans"'],
    },
    extend: {
      width: {
        18: '4.5rem',
      },
    },
  },
  plugins: [],
};
