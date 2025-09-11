// plugins/fetch-user.client.ts
export default defineNuxtPlugin({
  name: 'fetch-user',
  dependsOn: ["auth-api-fetch"],
  async setup ()
  {
    console.log('[fetch-user plugin] active.')
    const authStore = useIuserAuthStore()
    if (authStore.isAuthenticated) await authStore.fetchUser()
  }
})
