/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        custom: '2px 2px 2px rgba(0, 0, 0, .1);',
        'custom-big': '3px 3px 3px rgba(0, 0, 0, .2);',
      },
    },
  },
  plugins: [],
};
