// modules/ipage/middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  if (['inicio','home'].includes(<string>to.params.slug)) {
    return navigateTo('/')
  }
})

