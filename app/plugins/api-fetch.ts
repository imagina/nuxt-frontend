export default defineNuxtPlugin({
  name: "api-fetch",
  async setup ()
  {
    const apiFetch = $fetch.create({
      baseURL: useRuntimeConfig().public.apiBase,
    })
    // Expose to useNuxtApp().$apiFetch
    return {
      provide: {apiFetch}
    }
  }
})
