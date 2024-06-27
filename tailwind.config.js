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
        tRed: 'rgba(206, 22, 22, 0.5)'
      },
      backgroundImage: {
        banner: "url('/About-Images/manor2.jpg')"
      }
    },
  },
  plugins: [],
};
