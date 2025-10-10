<script setup lang="ts">
import PostListItem from '#iblog/components/PostListItem.vue'
import { useBlogCategoryLoader } from '#iblog/composables/useBlogCategoryLoader'

const route = useRoute()
const slugCategory = route.params.slugCategory as string
setPageLayout((route.meta as any)?.layout || 'master')

// Carga categoría + posts (ya filtrados por categoryId en el composable)
const { category, posts, rawPosts, pending, error } = useBlogCategoryLoader(slugCategory)

const ITEMS_PER_PAGE = 8

// Inyecta el slugCategory a cada post para armar el link del item
const items = computed(() =>
  posts.value.map(p => ({ ...p, es: { ...(p.es || {}), slugCategory } }))
)

const title = computed(() => category.value?.title || category.value?.es?.title || slugCategory)
const description = computed(() => category.value?.description || category.value?.es?.description || '')
</script>

<template>
  <!-- SKELETON LINDO MIENTRAS CARGA -->
  <div v-if="pending" class="space-y-8 mb-20">
    <!-- Header -->
    <div class="text-center space-y-3">
      <div class="mx-auto h-3 w-64 rounded-full bg-gray-200 animate-pulse"></div>
      <div class="mx-auto h-3 w-96 rounded-full bg-gray-200 animate-pulse"></div>
    </div>

    <!-- Grid de 4 cards skeleton -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div v-for="n in 4" :key="n" class="rounded-2xl overflow-hidden bg-white">
        <div class="aspect-[4/3] bg-gray-200 animate-pulse"></div>
        <div class="p-4 space-y-3">
          <div class="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
          <div class="h-3 w-5/6 bg-gray-200 rounded animate-pulse"></div>
          <div class="pt-2">
            <div class="h-8 w-24 rounded-full bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- CONTENIDO  -->
  <section v-else :class="`iblog category category-${slugCategory}`">
    <IBreadcrumb
      :title="title"
      :ui="{ link: 'font-bold text-gray-3' }">
    </IBreadcrumb>
    <UContainer class="pt-20">

      <div>
        <h1 class="page-title text-center"> {{ title }} </h1>
        <div class="page-body text-justify mb-10" v-html="description"></div>
        <IList
          :items="items"
          :item-component="PostListItem"
          :loading="pending"
          class="mb-20"
          grid-cols="grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4"
          :paginate="{
            page: 1,
            itemsPerPage: ITEMS_PER_PAGE,
            total: rawPosts.length
          }"
        />
      </div>
    </UContainer>
  </section>
</template>
<style scoped>
:deep(.page-title) {
  position: relative;
    &:before {
    content: "";
    display: block;
    background-color: var(--color-tertiary);
    width: 96px;
    height: 4px;
    margin: 0 auto;
    position: absolute;
    left: 0; right: 0;
    bottom: -18px;
  }
}
</style>


