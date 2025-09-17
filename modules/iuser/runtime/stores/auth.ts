import {defineStore} from 'pinia'
import type {AuthToken, AuthUser} from '#iuser/types/auth'
import {iuserAuthRepository} from "#iuser/utils/repository";

export const useIuserAuthStore = defineStore(
  'iuser-auth',
  () =>
  {
    const user = ref<AuthUser | null>(null)
    const token = ref<AuthToken | null>(null)
    const refreshingPromise = ref<Promise<{ data: AuthToken }> | null>(null)
    const fetchedOnce = ref(false)
    // Computed property to check if the user is authenticated
    const isAuthenticated = computed(() => !!token.value)

    function setUserdata (data: AuthUser)
    {
      user.value = data
    }

    function setToken (data: AuthToken)
    {
      const now = Date.now(); // in milliseconds
      data.expiresAt = now + data.expiresIn * 1000; // future time in ms
      token.value = data
    }

    function clearAuth ()
    {
      user.value = null
      token.value = null
    }

    function fetchUser (): void
    {
      iuserAuthRepository.me().then(response => setUserdata(response.data))
    }

    async function login (email: string, password: string)
    {
      const {data} = await iuserAuthRepository.login(email, password)
      setUserdata(data.user)
      setToken(data.token)
    }

    async function logout ()
    {
      try
      {
        if (isAuthenticated.value) await iuserAuthRepository.logout()
      } finally
      {
        clearAuth()
        await navigateTo('/')
      }
    }

    function hasPermission (key: string): boolean
    {
      return !!user.value?.permissions?.[key]
    }

    async function refreshAccessTokenIfNeeded (): Promise<{ data: AuthToken } | undefined>
    {
      const now = Date.now()
      const buffer = 60000 // refresh if < 1 min to expiry

      if (!token.value || !token.value?.refreshToken || !token.value.expiresAt) return
      if (token.value.expiresAt - now > buffer) return // still valid
      if (refreshingPromise.value) return refreshingPromise.value // If there is a refresh already in progress, await it

      // Start the new refresh
      refreshingPromise.value = iuserAuthRepository.refreshToken(token.value.refreshToken);

      try{
        const response = await refreshingPromise.value
        setToken(response.data)
        return response
      }catch {
        clearAuth()
        return
      }finally
      {
        refreshingPromise.value = null
      }
    }

    return {
      user,
      token,
      isAuthenticated,
      fetchedOnce,
      login,
      logout,
      hasPermission,
      fetchUser,
      refreshAccessTokenIfNeeded
    }
  },
  {
    persist: [
      {
        pick: ['token'],
        afterHydrate: (ctx) =>
        {
          const store = ctx.store as ReturnType<typeof useIuserAuthStore>
          if (import.meta.client && store.token && !store.fetchedOnce)
          {
            store.fetchedOnce = true
            store.fetchUser()
          }
        }
      }
    ]
  })
