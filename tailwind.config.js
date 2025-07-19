/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vigovia: {
          primary: '#541C9C',
          secondary: '#680099', 
          accent: '#936FE0',
          dark: '#321E5D',
          light: '#FBF4FF',
        },
        gradient: {
          blue: '#4A90E2',
          purple: '#936FE0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

