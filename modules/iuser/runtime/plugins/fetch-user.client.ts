// plugins/fetch-user.client.ts
export default defineNuxtPlugin({
  name: 'fetch-user',
  dependsOn: ["auth-api-fetch"],
  async setup ()
  {
    const authStore = useIuserAuthStore()
    if (authStore.isAuthenticated) await authStore.fetchUser()
  }
})
