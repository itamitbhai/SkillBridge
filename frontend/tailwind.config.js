/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      colors: {
        // Backgrounds
        surface: '#F7F8FA',
        'surface-alt': '#F1F3F6',
        card: '#FFFFFF',
        // Navy
        navy: {
          50: '#F2F4F7',
          100: '#E4E8EE',
          200: '#C7D0DC',
          300: '#9AA9BD',
          400: '#65778F',
          500: '#3F4F66',
          600: '#2C3A4E',
          700: '#1E293B',
          800: '#152238',
          900: '#0F1C2E',
          950: '#0A1526',
        },
        // Primary blue
        brand: {
          50: '#EEF4FF',
          100: '#DCE8FF',
          200: '#B8D0FF',
          300: '#8AB0FF',
          400: '#5A8CFF',
          500: '#3168F0',
          600: '#2050D6',
          700: '#1A3FAD',
          800: '#173588',
          900: '#152F6E',
        },
        success: {
          50: '#ECFDF3',
          100: '#D1FADF',
          400: '#32D583',
          500: '#12B76A',
          600: '#039855',
          700: '#027A48',
        },
        warning: {
          50: '#FFFAEB',
          100: '#FEF0C7',
          400: '#FDB022',
          500: '#F79009',
          600: '#DC6803',
          700: '#B54708',
        },
        critical: {
          50: '#FEF3F2',
          100: '#FEE4E2',
          400: '#F97066',
          500: '#F04438',
          600: '#D92D20',
          700: '#B42318',
        },
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(16, 24, 40, 0.05)',
        card: '0 1px 3px 0 rgba(16, 24, 40, 0.06), 0 1px 2px 0 rgba(16, 24, 40, 0.04)',
        'card-lg': '0 4px 8px -2px rgba(16, 24, 40, 0.06), 0 2px 4px -2px rgba(16, 24, 40, 0.04)',
        popover: '0 12px 24px -6px rgba(16, 24, 40, 0.12), 0 4px 8px -2px rgba(16, 24, 40, 0.06)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
      },
      spacing: {
        4.5: '1.125rem',
        18: '4.5rem',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(4px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.25s ease-out',
      },
    },
  },
  plugins: [],
}
