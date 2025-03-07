/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/preline/preline.js",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#1A237E', // Warna biru navy dari logo
          'light': '#4A5FD1', // Versi lebih terang
          'dark': '#121858', // Versi lebih gelap
        },
        'secondary': {
          DEFAULT: '#4285F4', // Warna biru lebih cerah
          'light': '#81B0FF',
          'dark': '#0D57D9',
        },
        'accent': '#E3F2FD', // Warna biru sangat terang (background)
        'success': '#4CAF50',
        'warning': '#FFC107',
        'danger': '#F44336',
        'neutral': {
          '50': '#F8FAFC',
          '100': '#F1F5F9',
          '200': '#E2E8F0',
          '300': '#CBD5E1',
          '400': '#94A3B8',
          '500': '#64748B',
          '600': '#475569',
          '700': '#334155',
          '800': '#1E293B',
          '900': '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('preline/plugin')
  ],
}

