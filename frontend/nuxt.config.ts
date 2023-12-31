// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/stylelint-module",
    "nuxt-svgo",
    "@nuxtjs/eslint-module",
    "nuxt-viewport",
    "@nuxt/image",
    "@nuxt/ui",
  ],
  nitro: {
    devProxy: {
      "/api": {
        changeOrigin: true,
        target: "http://localhost:9229/api",
      },
    },
  },
  stylelint: {
    fix: true,
  },
});
