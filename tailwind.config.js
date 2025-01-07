/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
       brand: {
        100: '#D22B2B',
        transparent: 'rgb(136, 8, 8, 0.9)',
        DEFAULT:'#880808'
       }
      },
      backgroundImage: {
        banner: "url('/About-Images/manor2.jpg')"
      }
    },
  },
  plugins: [],
};
