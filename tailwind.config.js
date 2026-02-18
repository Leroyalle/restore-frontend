/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0b0b10',
          900: '#111116',
          850: '#14141b',
          800: '#1a1a22',
          700: '#22222d',
        },
        brand: {
          500: '#7b61ff',
          400: '#8f75ff',
          300: '#a68fff',
        },
        stroke: {
          500: 'rgba(255,255,255,0.08)',
          600: 'rgba(255,255,255,0.12)',
        },
        text: {
          primary: '#e9e7f2',
          secondary: '#b7b2c7',
          muted: '#8a859a',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        card: '0 18px 45px rgba(0,0,0,0.45)',
        soft: '0 8px 30px rgba(0,0,0,0.35)',
      },
      backgroundImage: {
        hero: 'radial-gradient(1200px 600px at 10% 20%, rgba(123, 97, 255, 0.28), transparent 55%)',
        glow: 'radial-gradient(500px 300px at 50% 0%, rgba(123, 97, 255, 0.2), transparent 60%)',
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  corePlugins: {
    transition: false, // ← ОТКЛЮЧАЕМ ДЕФОЛТНЫЙ TRANSITION
  },
  plugins: [],
};
