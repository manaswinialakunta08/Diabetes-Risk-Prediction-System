/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#142B4A',
          primary: '#142B4A',
          deep: '#0B1F36',
          mist: '#EAF2FA',
          soft: '#D8E7F5',
        },
        slate: {
          main: '#1F2937',
          secondary: '#64748B',
          border: '#E2E8F0',
        },
        teal: {
          accent: '#2A9D8F',
          dark: '#21867a',
          light: '#E6F6F4',
        },
        amber: {
          warning: '#D97706',
          light: '#FEF3C7',
        },
        red: {
          danger: '#DC2626',
          light: '#FEE2E2',
        },
        emerald: {
          safe: '#059669',
          light: '#D1FAE5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(11, 31, 54, 0.05), 0 1px 2px -1px rgba(11, 31, 54, 0.05)',
        'card-hover': '0 10px 25px -5px rgba(20, 43, 74, 0.08), 0 8px 10px -6px rgba(20, 43, 74, 0.04)',
        subtle: '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
};

