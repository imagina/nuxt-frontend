<script setup lang="ts">
const route = useRoute()
const pageSlug = route.params.slug?.toString() || 'inicio'
const {page, PageComponent} = await usePageLoader(pageSlug)
const settingStore = useIsettingStore()



useSeoMeta({
  title: () => `${page.value?.title} | ${settingStore.get('isite::siteName')}`,
  ogTitle: () => page.value?.title,
  description: () => page.value?.ogDescription,
  ogDescription: () => page.value?.ogDescription,
  ogImage: ()=>page.value?.ogImage,
  ogType: ()=>page.value?.ogType,
  twitterTitle: () => page.value?.title,
  twitterDescription: () => page.value?.ogDescription,
  twitterImage: () => page.value?.ogImage,


})
</script>

<template>
  <component :is="PageComponent" :page="page"/>
</template>
