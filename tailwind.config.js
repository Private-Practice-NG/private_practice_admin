/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // fontSize: {
      //   heading: ['48px', '64px', '36px', '24px', '18px', '16px'] // h1 to h6
      // }
    },
    screens: {
      xsm: '450px',
      // => @media (min-width: 450px) { ... }

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 770px) { ... }

      lg: '1150px',
      // => @media (min-width: 1150px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: []
};
