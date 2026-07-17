/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0F172A',     // Deep dark slate
          card: '#1E293B',   // Darker card background
          border: '#334155', // Slate border
          text: '#F8FAFC'    // Light text
        },
        primary: {
          DEFAULT: '#3B82F6', // Blue
          dark: '#1D4ED8',
          light: '#60A5FA',
        },
        accent: {
          DEFAULT: '#8B5CF6', // Purple
          neon: '#A78BFA',
          green: '#10B981',
          red: '#EF4444'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
