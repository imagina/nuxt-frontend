<script setup lang="ts">
const authStore = useIuserAuthStore()
authStore.logout()
</script>

<template>
  <ClientOnly>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white px-4">
      <div class="w-full max-w-md backdrop-blur-sm bg-white/70 shadow-xl rounded-2xl px-8 py-10 animate-fade-in">

        <div class="flex flex-col items-center mb-6">
          <span class="text-2xl font-semibold text-blue-500 uppercase">
            logout
          </span>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>
