/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{html,js,jsx}',
    './src/components/**/*.{html,js,jsx}',
    './src/app/**/*.{html,js,jsx}',
    './src/**/*.{html,js,jsx}',
  ],
  darkMode: 'class',
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif', 'ui-sans-serif', 'system-ui'],
        montserrat: ['Montserrat', 'sans-serif', 'ui-sans-serif', 'system-ui'],
      },
      colors: {},
      screens: {
        sm: '640px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
      borderRadius: {
        xl: '0.7rem' /* 12px */,
      },
      padding: {
        2: '0.5rem',
      },
      borderWidth: {
        2.4: '2.4px',
        3: '3.7px',
      },
      backgroundSize: {
        '123.88%': '123.88%',
      },
      backgroundPosition: {
        '50-11.94': '50% 11.94%',
      },
      backgroundImage: {
        'radial-gradient':
          'radial-gradient(123.88% 123.88% at 50% 11.94%, #5855E8 5.73%, #1577FF 100%)',
      },
      margin: {
        headerh: '70px',
      },
      height: {
        headerh: '70px',
      },
    },
  },
  plugins: [],
};
