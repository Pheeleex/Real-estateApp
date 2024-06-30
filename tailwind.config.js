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
        red_primary: '#880808',
        red_secondary: '#D22B2B',
      },
      backgroundImage: {
        banner: "url('/About-Images/manor2.jpg')"
      }
    },
  },
  plugins: [],
};
