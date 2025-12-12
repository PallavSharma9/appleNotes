/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app.vue",
    "./app/**/*.{vue,js,ts}",
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./composables/**/*.{js,ts}",
    "./plugins/**/*.{js,ts}",
    "./node_modules/@nuxtjs/tailwindcss/**/*.{js,ts,vue}",
    "./.nuxt/**/*.{vue,js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
