<script setup lang="ts">

const props = defineProps<{ siteName?: string }>()
const siteName = computed(() => props.siteName ?? 'colbitumen')

const { homes } = useHomePages()

// Busqueda
const pageMatch = computed(() => {
  const needle = siteName.value.toLowerCase()
  return homes.value.find(p => {
    const candidates = [
      p.metaTitle,
      p.es?.metaTitle,
      p.title
    ].filter(Boolean).map(s => s!.toLowerCase())
    return candidates.some(c => c.includes(needle))
  }) ?? null
})

</script>

<template>
  <ClientOnly>
  <header class="bg-white py-3">
    <UContainer>
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-4">
          <div class="logo">
             <IMediaRender
              @click="$router.push(`/${pageMatch.slug}`)"
              :media="pageMatch.files?.mainimage" :alt="pageMatch.metaTitle"
              aspect-ratio="auto"
              :ui="{
                wrapper: 'cursor-pointer',
                container: 'h-[86px] ',
                media: 'object-contain h-[86px] py-2' }"
              />
          </div>
        </div>
        <div class="menus">
          <div class="flex items-center">
            <div class="menu">
              <imenu-menu :system-name="siteName" :title="pageMatch.metaTitle"/>
            </div>
            <div class="search pl-3 pr-4 border-r border-[#D9D9D9]">
              <UButton
                icon="i-lucide-search"
                aria-label="Buscar"
                class="h-[36px] w-[36px] font-bold !p-0 rounded-full inline-flex items-center justify-center bg-tertiary text-white shadow ring-1 ring-black/10 hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-300"
               />
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </header>
  </ClientOnly>
</template>
<style scoped>
.menu > :deep(nav) a, .menu > :deep(nav) .iconify  {
  color: var(--color-primary);
  text-transform: uppercase;
  font-weight: 600;
  font-size: 14px;
}
.menu > :deep(nav) .iconify + .truncate {
  display: none;
}
.menu > :deep(nav) a:hover {
  color: var(--color-tertiary);
  background: transparent;
}
.menu > :deep(nav) a[data-active], .menu > :deep(nav) a[data-active] .iconify {
  color: var(--color-tertiary);
}
.menu > :deep(nav) a[data-active]:before, .menu > :deep(nav) a:hover:before {
  content: none !important;
}
</style>
