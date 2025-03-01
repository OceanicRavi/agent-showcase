/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nebula: {
          900: '#0B0B2B', // Deep blue
          800: '#1A1A4A', // Dark blue
          700: '#2C2C6A', // Medium blue
          600: '#3D3D8A', // Blue
          500: '#5151AA', // Blue-purple
          400: '#7A5FB9', // Purple
          300: '#A36DC8', // Purple-magenta
          200: '#CC7BD7', // Magenta
          100: '#F589E6', // Pink
          50: '#FFF0FF',  // Soft white with pink tint
        }
      },
      backgroundImage: {
        'nebula-gradient': 'linear-gradient(to bottom right, #0B0B2B, #2C2C6A, #5151AA, #A36DC8, #F589E6, #FFF0FF)',
      }
    },
  },
  plugins: [],
};