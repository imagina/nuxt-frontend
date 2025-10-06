import {createResolver, defineNuxtModule, addPlugin, addImportsDir} from '@nuxt/kit'

//import pagesConfig from './config/pages'

export default defineNuxtModule({
  meta: {
    name: 'icore'
  },
  async setup (_, nuxt)
  {
    //Imports
    const {resolve} = createResolver(import.meta.url)
    const runtimeDir = resolve('runtime')
    // Alias for the module
    nuxt.options.alias['#icore'] = runtimeDir
    // Plugins
    addPlugin({
      src: resolve(runtimeDir, 'plugins/recaptcha.client'),
      mode: 'client',
    })
    addPlugin({
      src: resolve(runtimeDir, 'plugins/router-loading.client'),
      mode: 'client',
    })
    // Auto-imports
    addImportsDir(resolve(runtimeDir, 'composables'))
    addImportsDir(resolve(runtimeDir, 'stores'))
    //addImportsDir(resolve(runtimeDir, 'utils'))
    // Components (optional)
    // addComponentsDir({path: resolve(runtimeDir, 'components') prefix:'icore', pathPrefix: false})
    //Extend pages
    /*extendPages((pages) => pagesConfig.forEach(
      page => pages.push({...page, file: resolve(page.page)})
    ))*/
    //Extend i18n
    nuxt.hook('i18n:registerModule', register => register({
      langDir: resolve('./i18n'),
      locales: [
        {code: 'en', file: 'en.json'},
        {code: 'es', file: 'es.json'}
      ]
    }))
  }
})
