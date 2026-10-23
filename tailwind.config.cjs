/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f7f4',
          100: '#e3eee7',
          200: '#c8ddd0',
          300: '#9fc4ae',
          400: '#6fa487',
          500: '#4b8668',
          600: '#376b52',
          700: '#2b5542',
          800: '#234437',
          900: '#123d2c',
          950: '#0a241b'
        },
        cream: '#f7f5ee',
        sage: '#e7efe8',
        gold: '#c7a45a',
        ink: '#202a25'
      },
      fontFamily: {
        sans: ['Inter', 'Cairo', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 60px rgba(18, 61, 44, 0.12)',
        card: '0 10px 35px rgba(21, 45, 34, 0.08)'
      },
      backgroundImage: {
        grain: "radial-gradient(circle at 1px 1px, rgba(18,61,44,.12) 1px, transparent 0)"
      }
    }
  },
  plugins: []
};
