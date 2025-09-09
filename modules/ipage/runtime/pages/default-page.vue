<script setup lang="ts">
import type {PageData} from '#ipage/types/pages'

defineProps<{ page: PageData }>()
</script>

<template>
  <UContainer class="py-10">
      <h1 class="page-title">{{ page.title }}</h1>
      <div class="page-body" v-html="page.body"></div>
  </UContainer>
</template>
