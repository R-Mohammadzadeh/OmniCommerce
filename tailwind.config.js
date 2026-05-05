/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class", 

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}", 
    "./store/**/*.{js,ts,jsx,tsx}",      
  ],

  theme: {
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Semantic colors for the whole app
        'app-bg': {
          light: '#F8FAFC', // Light Greyish White
          dark: '#191970',  // Ghost Blue
        },
        'card-bg': {
          light: '#FFFFFF',
          dark: '#000E78',  // Night Blue
        },
        'app-text': {
          light: '#333333', // Carbon Grey
          dark: '#A2D2FF',  // Frost Blue
        }
      },
    },
  },
  },

  plugins: [require("tailwindcss-animate"),],
};

export default config;