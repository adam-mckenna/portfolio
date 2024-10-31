/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "Helvetica", "Arial", "sans-serif"],
    },
    extend: {},
    letterSpacing: {
      tighter: "-0.04em",
      tight: "-.025em",
    },
    colors: {
      background: "#FAF4EE",
      secondary: "#C1666B",
      "primary-dark": "#02182B",
      "primary-dark-opaque": "#02182ccc",
      primary: "#4F7CAC",
      support: "#3E6186",
      "support-light": "#D9E3ED",
      black: "#020100",
    },
  },
  plugins: [],
};
