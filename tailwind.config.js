/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bosque: '#204f24', // manual de marca
        hoja: '#4ead42',   // manual de marca
        grafito: '#3c3c36',// manual de marca
        papel: '#f5f0ea',
        noche: '#141a15',
        piedra: '#e8e4df',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
