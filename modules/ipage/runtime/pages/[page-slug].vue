<script setup lang="ts">
  const route = useRoute()
  const pageSlug = route.params.slug?.toString() || 'inicio'
  const {page, PageComponent} = await usePageLoader(pageSlug)
</script>

<template>
  <component :is="PageComponent" :page="page"/>
</template>
