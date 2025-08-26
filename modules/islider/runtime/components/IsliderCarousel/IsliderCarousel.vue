<script setup lang="ts">
  import type {IsliderCarouselProps} from './IsliderCarousel'
  import {isliderSliderRepository} from '#islider/utils/repository'
  import {defineAsyncComponent, computed} from 'vue'

  const props = withDefaults(
    defineProps<IsliderCarouselProps>(),
    {itemTheme: 'ItemTheme1'}
  )
  const {systemName, itemTheme, ...carouselProps} = props

  const {data} = await useAsyncData(
    `slider:${props.systemName}`,
    () =>
      isliderSliderRepository.show(systemName, {
        include: 'slides.translations,slides.files',
        filter: {field: 'system_name'},
      })
  )

  const slides = computed(() => data.value?.data.slides ?? [])

  const ThemedItem = props.itemTheme
    ? defineAsyncComponent(() => import(`./items/${itemTheme}.vue`))
    : null
</script>

<template>
  <ICarousel :items="slides" v-bind="carouselProps">
    <!-- if consumer provides slot#item, it will override -->
    <template #item="{ item }">
      <slot name="item" :item="item">
        <!-- fallback: use themed item if defined -->
        <component :is="ThemedItem" v-if="ThemedItem" :item="item"/>
        <!-- ultimate fallback: just render JSON -->
        <div v-else> {{ item }}</div>
      </slot>
    </template>
  </ICarousel>
</template>
