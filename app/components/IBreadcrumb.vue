<script setup lang="ts">
import { computed } from 'vue'
import type { BreadcrumbItem } from '@nuxt/ui'

interface Props {
  title?: string
  ui?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Página',
  ui: () => ({})
})

const items = computed<BreadcrumbItem[]>(() => [
  { label: 'Inicio', to: '/' },
  { label: props.title }
])

</script>

<template>
  <section class="bg-gray-2 py-5">
      <div class="container mx-auto px-4 sm:px-6 lg:px-10">
        <UBreadcrumb :items="items" :ui="props.ui"/>
      </div>
    </section>
</template>
