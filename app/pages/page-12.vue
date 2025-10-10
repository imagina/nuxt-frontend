<script lang="ts">
export const pageMeta = {layout: 'master-comercializadora'}
</script>

<script setup lang="ts">
import type { PageData } from '#ipage/types/pages'
defineProps<{ page: PageData }>()
</script>

<template>
  <!-- Conocenos Comercializadora -->
  <IBreadcrumb
    variant="hero"
    homeLink="/inicio-comercializadora"
    :title="page?.title ?? '...'"
    height="h-[320px]"
    overlay="bg-black/50"
    align="center"
    :ui="{ link: 'text-white/90', divider: 'text-white/70' }"
  >
    <template #background>
      <IMediaRender
        :media="page.files?.mainimage"
        aspect-ratio="auto"
        :ui="{ media: 'absolute inset-0 w-full h-full object-cover' }"
      />
    </template>
  </IBreadcrumb>
  <UContainer :class="`page-${page?.id}`" class="py-20 conocenos">
    <h1 class="page-title hidden ">{{ page.title }}</h1>
    <div class="page-body mt-10 text-justify" v-html="page.body"></div>
  </UContainer>
</template>
<style scoped>
:deep(.page-body) {
  & h2 { position: relative; }
  & h2:before {
    content: "";
    display: block;
    background-color: var(--color-tertiary);
    width: 96px;
    height: 4px;
    position: absolute;
    bottom: -18px;
  }
  & .btn {
    background: var(--color-tertiary);
    border-radius: 50rem;
    color: #ffffff;
    font-size: 18px;
    padding: 10px 25px;
    font-weight: 600;
    &:hover {
      background-color:  color-mix(in oklab, var(--color-primary) 75%, transparent);
    }
  }
}

</style>
