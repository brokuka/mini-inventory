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

  modules: [
    '@nuxt/eslint',
    'template-copyright',
    '@nuxt/icon',
    '@vueuse/nuxt',
    "@nuxtjs/google-fonts"
  ],

  eslint: {
    config: {
      standalone: false,
    },
  },

  googleFonts: {
    families: {
      Inter: [400, 500],
    },
  },

  compatibilityDate: '2024-07-23',
})