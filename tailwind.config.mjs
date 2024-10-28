/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      'sans': ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {},
    colors: {
      'background': "#FAF4EE",
'secondary': "#C1666B",
'primary-dark': "#02182B",
'primary': "#4F7CAC",
'black': "#020100"
    }
  },
  plugins: [], 
};
