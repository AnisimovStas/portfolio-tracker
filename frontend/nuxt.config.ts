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
        target: `${process.env.BACKEND_BASE_URL}/api`,
      },
    },
  },
  runtimeConfig: {
    public: {
      backendBaseUrl: process.env.BACKEND_BASE_URL,
    },
  },
  stylelint: {
    fix: true,
  },
});
