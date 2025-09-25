<script setup lang="ts">
const route = useRoute()
const settingStore = useIsettingStore()
const logo = settingStore.get('isite::logo1')

function onLogin ()
{
  const redirectTo = route.query.redirectTo as string || '/'
  if (redirectTo && redirectTo.startsWith('/')) navigateTo(redirectTo)
  else navigateTo('/')
}
</script>

<template>
  <ClientOnly>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white px-4">
      <div class="w-full max-w-md backdrop-blur-sm bg-white/70 shadow-xl rounded-2xl px-8 py-10 animate-fade-in">
        <IMediaRender
          @click="$router.push('/')"
          :media="logo" alt="Logo"
          aspect-ratio="auto"
          :ui="{
                wrapper: 'cursor-pointer',
                container: 'h-[34px] w-[144px]',
                media: 'object-contain' }"
        />
        <IuserAuth @logged="onLogin"/>

        <div class="text-center mt-6">
          <UButton icon="i-lucide:key-round" to="/auth/request-token" variant="ghost" size="sm">
            ¿Olvidaste tu contraseña?
          </UButton>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
