// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  css: ["~/assets/css/tailwind.css"],
});
