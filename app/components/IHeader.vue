<script setup lang="ts">
import IMenuMenu from "#imenu/components/ImenuMenu.vue";
import IContactSocial from "#icontact/components/IcontactSocial/IContactSocial.vue";

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
  <header class="bg-white py-3">
    <ClientOnly>
      <IContactSocial :filter-text="siteName"
                      class-social="fixed right-0 top-[30%] z-[1000]"
                      class-link-social="transition hover:text-[26px] hidden sm:flex shadow-lg bg-white h-[30px] w-[35px] text-[20px]  lg:h-[45px] lg:w-[50px] lg:text-[25px] rounded-l-lg my-1 items-center justify-center"/>
    </ClientOnly>
    <UContainer>
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center gap-4">
          <div class="logo">
            <ClientOnly>
             <IMediaRender
              @click="$router.push(`/${pageMatch?.slug}`)"
              :media="pageMatch?.files?.mainimage" :alt="pageMatch?.metaTitle"
              aspect-ratio="auto"
              :ui="{
                wrapper: 'cursor-pointer',
                container: 'h-[86px] ',
                media: 'object-contain h-[86px] py-2' }"
              />
            </ClientOnly>
          </div>
        </div>
        <div class="menus">
          <div class="flex items-center">
            <div class="menu">
              <ClientOnly>
                <IMenuMenu :system-name="siteName" :title="pageMatch?.metaTitle"/>
              </ClientOnly>
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
