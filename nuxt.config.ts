// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: [
    '~/assets/styles/index.scss',
    '@unocss/reset/tailwind.css',
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/_colors.scss" as *;',
        },
      },
    },
  },

  modules: ['@nuxt/eslint', 'template-copyright', '@nuxt/icon', "@vueuse/nuxt"],

  eslint: {
    config: {
      standalone: false,
    },
  },

  compatibilityDate: '2024-07-23',
})