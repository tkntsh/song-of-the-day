/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          500: '#1db954', // Spotify green
          600: '#1ed760',
        },
        dark: '#1a202c', // Custom dark theme
      },
    },
  },
  plugins: [],
}