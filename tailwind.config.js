/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // GitHub-like colors
        primary: {
          50: '#f6f8fa',
          100: '#f1f3f4',
          200: '#e1e4e8',
          300: '#d0d7de',
          400: '#8c959f',
          500: '#656d76',
          600: '#57606a',
          700: '#424a53',
          800: '#32383f',
          900: '#24292f',
        },
        accent: {
          50: '#f0f7ff',
          100: '#c2dbfe',
          200: '#a1c9fd',
          300: '#71a7fb',
          400: '#3b82f6',
          500: '#0969da',
          600: '#0858ba',
          700: '#0747a6',
          800: '#0c2d6b',
          900: '#0a1f4b',
        },
        success: {
          50: '#dafbe1',
          100: '#aceebb',
          200: '#6fdd8b',
          300: '#4ac26e',
          400: '#2da44e',
          500: '#1a7f37',
          600: '#116329',
          700: '#044f1e',
          800: '#003d16',
          900: '#002d11',
        },
        warning: {
          50: '#fff8c5',
          100: '#fae17d',
          200: '#eac54f',
          300: '#d4a72c',
          400: '#bf8700',
          500: '#9a6700',
          600: '#7d4e00',
          700: '#633c01',
          800: '#4d2c00',
          900: '#3b2300',
        },
        danger: {
          50: '#ffebe9',
          100: '#ff8182',
          200: '#fa4549',
          300: '#cf222e',
          400: '#a40e26',
          500: '#82071e',
          600: '#660018',
          700: '#4c0014',
          800: '#2d0a0f',
          900: '#1a0709',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'github': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'github-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
} 