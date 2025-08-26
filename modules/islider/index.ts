import {createResolver, defineNuxtModule, addComponentsDir} from '@nuxt/kit'
//import pagesConfig from './config/pages'

export default defineNuxtModule({
  meta: {
    name: 'islider'
  },
  async setup (_, nuxt)
  {
    //Imports
    const {resolve} = createResolver(import.meta.url)
    const runtimeDir = resolve('runtime')
    // Alias for the module
    nuxt.options.alias['#islider'] = runtimeDir
    // Auto-imports
    //addImportsDir(resolve(runtimeDir, 'composables'))
    //addImportsDir(resolve(runtimeDir, 'stores'))
    //addImportsDir(resolve(runtimeDir, 'utils'))
    // Plugins
    //addPlugin(resolve(runtimeDir, 'plugins/fetch-user.client'))
    // Components (optional)
    addComponentsDir({path: resolve(runtimeDir, 'components')})
    //Extend pages
    //extendPages((pages) => pagesConfig.forEach(
    //  page => pages.push({...page, file: resolve(page.page)})
    //))
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
