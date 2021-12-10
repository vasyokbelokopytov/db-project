module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      width: {
        18: '4.5rem',
        50: '12.5rem',
      },
      height: {
        50: '12.5rem',
      },
    },
  },
  plugins: [],
};
