// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {enabled: true},
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    //Custom
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'pinia-plugin-persistedstate/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiBase: '',// can be overridden by NUXT_PUBLIC_API_BASE environment variable
    }
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: ''
  },
  css: [
    //keep this order
    '~/assets/css/libraries.css',
    '~/assets/css/main.css',
  ],
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'es',
    langDir: 'locales',
    locales: []
  },
  vite: {
    plugins: [tailwindcss()]
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'
        }
      ],
      script: [
        {
          src: 'https://kit.fontawesome.com/56d3d5dce0.js',
          crossorigin: 'anonymous',
          'data-auto-replace-svg': 'false'
        }
      ]
    }
  }
})
