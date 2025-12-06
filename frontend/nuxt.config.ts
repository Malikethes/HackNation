// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', 'vuetify-nuxt-module'],
  vuetify: {
    vuetifyOptions: {
      theme: {
        defaultTheme: 'light',
        themes: {
          dark: {
            colors: {
              primary: '#307de8',
              secondary: '#424242',
              accent: '#82B1FF',
              error: '#FF5252',
              info: '#2196F3',
              success: '#4CAF50',
              warning: '#FFC107',
              background: '#111821',
              surface: '#1e293b',
            },
          },
          light: {
            colors: {
              primary: '#307de8',
              secondary: '#424242',
              background: '#f6f7f8',
              surface: '#ffffff',
            },
          },
        },
      },
      icons: {
        defaultSet: 'mdi',
      },
    },
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://03c45a0d90a3.ngrok-free.app/api'
    }
  }
})