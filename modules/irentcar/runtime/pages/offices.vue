<script setup lang="ts">
import {irentcarOfficeRepository} from '#irentcar/utils/repository'
import type {AccordionItem} from "@nuxt/ui";

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
    iframe: armIframeSrc(o.locatable.lat,o.locatable.lng),
    ...o,
  }))
)

const iframeSrc = computed(() =>
{
  const list = items.value
  if (!list.length) return ''
  const i = Number(active.value) || 0
  return list[i]?.iframe ?? list[0]?.iframe ?? ''
})

const active = ref("0")

const uiAccordion = {
  trigger: 'text-primary data-[state=open]:text-secondary capitalize'
}

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
          <aside class="md:col-span-1 filters">
            <UCard class="shadow-md">
              <h1 class="text-[24px]  text-primary font-semibold mb-3">Oficinas</h1>
              <UAccordion v-model="active" :items="items" :ui="uiAccordion">
                <template #body="{ item }">
                  <div class="border-t border-gray-200 pt-4" v-html="item.description" />
                </template>
              </UAccordion>
            </UCard>
          </aside>

          <!-- Columna derecha: Maps -->
          <div class="md:col-span-2 maps">
            <div class="sticky top-0 z-50 bg-white/80 backdrop-blur">
              <iframe
                :src="iframeSrc"
                class="h-[600px] w-full rounded-lg"
                style="border:0"
                loading="lazy"
                allowfullscreen
                referrerpolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

