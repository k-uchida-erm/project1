/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '14': '3.5rem',   // 56px
        '15': '3.75rem',  // 60px
        '18': '4.5rem',   // 72px
        '45': '11.25rem', // 180px
        '55': '13.75rem', // 220px
        '85': '21.25rem', // 340px
        '115': '28.75rem', // 460px
      },
      fontFamily: {
        'sans': ['Noto Sans', 'sans-serif'],
      },
      transitionDuration: {
        '180': '180ms',
      },
    },
  },
  plugins: [],
};