// plugins/recaptcha.ts
import {VueReCaptcha} from 'vue-recaptcha-v3'

export default defineNuxtPlugin(nuxtApp =>
{
  const settingStore = useIsettingStore()
  const siteKey = settingStore.get('icore::recaptchaSiteKey')

  if (siteKey)
  {
    nuxtApp.vueApp.use(VueReCaptcha, {
      siteKey,
      loaderOptions: {
        autoHideBadge: true,
        useRecaptchaNet: true,
        renderParameters: {hl: 'id'}
      }
    })
    console.log('[recaptcha plugin] active.')
    nuxtApp.provide('recaptchaEnabled', true)
  } else
  {
    nuxtApp.provide('recaptchaEnabled', false)
    console.warn('[recaptcha plugin] disabled.')
  }
})
