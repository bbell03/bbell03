module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js, ts, jsx, tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'xs':'500px',

      'sm': '700px',
      // => @media (min-width: 640px) { ... }

      'md': '1000px',
      // => @media (min-width: 768px) { ... }

      'lg': '1280px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1536px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '3000px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
],
};
