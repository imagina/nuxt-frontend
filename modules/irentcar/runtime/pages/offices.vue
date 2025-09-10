<script setup lang="ts">
import {irentcarOfficeRepository} from '#irentcar/utils/repository'
import type {AccordionItem} from "@nuxt/ui";
const settingStore = useIsettingStore()

const {data: officesResponse} = await useAsyncData(`irentCar:offices`, () =>
  irentcarOfficeRepository.index({include: 'locatable'})
)
const officesData = officesResponse.value?.data ?? []

const armIframeSrc = (lat?: string, lng?: string) =>
  `https://www.google.com/maps?q=${lat},${lng}&z=14&hl=es&output=embed`

// Mapeo label = title, iframe = extraer el src
const items = computed<AccordionItem[]>(() =>
  officesData.map(o => ({
    label: o.title,
    summary: o.locatable.address,
    iframe: armIframeSrc(o.locatable.lat,o.locatable.lng),
    ...o,
  }))
)

type MapActive = AccordionItem & { summary: string; iframe: string }

// Item actual
const activeItem = computed<MapActive | null>(() => {
  const list = items.value
  if (!list.length) return null
  const i = Number(active.value) || 0
  return list[i] ?? list[0]
})

const iframeSrc = computed(() => activeItem.value?.iframe ?? '')
const summary   = computed(() => activeItem.value?.summary ?? '')

const active = ref("0")

const uiAccordion = {
  trigger: 'text-primary data-[state=open]:text-secondary capitalize'
}


useSeoMeta({
  title: () => `Oficinas | ${settingStore.get('isite::siteName')}`,
  ogTitle: () => `Oficinas | ${settingStore.get('isite::siteName')}`,
  description: () => `Oficinas | ${settingStore.get('isite::siteName')}`,
  ogDescription: () => `Oficinas | ${settingStore.get('isite::siteName')}`,
})

</script>

<template>
  <div>
    <!-- Oficinas -->
    <IBreadcrumb
      title="Oficinas"
      :ui="{ link: 'font-bold text-gray-3' }">
      <template #extraUp>
        <IsliderCarousel
          system-name="publi_oficinas"
          dots-position="inside-left-middle"
          item-theme="ItemTheme2"
          :carousel-props="{
          dots: true,
          autoplay: true,
          loop: true,
          ui: {
            item: 'h-[260px] sm:h-[360px] md:h-[400px]',
            dot: 'w-[16px] h-[16px] rounded-full bg-[#FFFFFF80] data-[state=active]:bg-secondary'
          }
        }"
        />
      </template>
    </IBreadcrumb>
    <div class="bg-gray-2">
      <section class=" container mx-auto py-10 px-4 sm:px-6 lg:px-10">
        <div class="grid gap-10 grid-cols-1 md:grid-cols-3">
          <!-- Columna izquierda: Filtros -->
          <aside class="col-span-1 md:col-span-1 filters">
            <UCard class="shadow-md">
              <h1 class="text-[24px]  text-primary font-semibold mb-3">Oficinas</h1>
              <UAccordion v-model="active" :items="items" :ui="uiAccordion">
                <template #body="{ item }">
                  <div class="border-t border-gray-200 pt-4"> {{ item.summary }} </div>
                </template>
              </UAccordion>
            </UCard>
          </aside>

          <!-- Columna derecha: Maps -->
          <div class="col-span-1 md:col-span-2 maps">
            <div class="sticky top-0 z-50 bg-white/80 backdrop-blur">
              <div class="relative">
                <iframe
                  :src="iframeSrc"
                  class="h-[600px] w-full rounded-lg"
                  style="border:0"
                  loading="lazy"
                  allowfullscreen
                  referrerpolicy="no-referrer-when-downgrade"
                />
                <!-- Texto  -->
                <div class="absolute z-50 bg-white px-3 py-1 text-map-name">
                  {{summary}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<style>
.text-map-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 500;
    font-size: 15px;
    color: black;
    width: 200px;
    top: 10px;
    left: 10px;
    border-radius: 2px;
}
</style>
