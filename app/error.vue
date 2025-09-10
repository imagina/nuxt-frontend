<script setup lang="ts">
import type {NuxtError} from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
console.error(props.error)
</script>

<template>
  <NuxtLayout name="master">
    <section class="min-h-[60vh] grid place-items-center px-6 py-16 text-center">
      <div>
        <h1 class="text-5xl font-extrabold tracking-tight">{{ error?.statusCode }}</h1>
        <p class="mt-3 text-lg text-gray-600">{{ error?.statusMessage }}</p>

        <div class="mt-8 flex items-center justify-center gap-3">
          <NuxtLink to="/">Ir al inicio</NuxtLink>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
