import {useReCaptcha} from 'vue-recaptcha-v3'

export default () =>
{
  const nuxtApp = useNuxtApp()
  const recaptchaInstance = nuxtApp.$recaptchaEnabled ? useReCaptcha() : null

  const executeRecaptcha = async (action: string) =>
  {
    if (!recaptchaInstance)
    {
      return {
        token: null,
        headerOptions: {'google-recaptcha-token': 'no-token'}
      }
    }

    await recaptchaInstance.recaptchaLoaded()
    const token = await recaptchaInstance.executeRecaptcha(action)

    return {
      token,
      headerOptions: {'google-recaptcha-token': token ?? 'no-token'}
    }
  }

  return {executeRecaptcha}
}
