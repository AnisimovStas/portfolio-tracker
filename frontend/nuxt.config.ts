// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/stylelint-module",
    "nuxt-svgo",
    "vuetify-nuxt-module",
    "@nuxtjs/eslint-module",
    "nuxt-viewport",
  ],
  stylelint: {
    fix: true,
  },
});
