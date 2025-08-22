<script setup lang="ts">
  import type {IcarouselProps} from './Icarousel'
  import {DOTS_POSITIONS, ARRAY_POSITIONS} from './config'
  import {computed} from 'vue'
  import {defu} from 'defu'

  // DEFINE PROPS
  const props = withDefaults(defineProps<IcarouselProps>(), {
    carouselProps: () => ({}),
    dotsPosition: "inside-bottom-middle",
    arrowsPosition: "inside-between-middle",
  });

  // COMPUTED UI CONFIG
  const computedUiConfig = computed(() =>
  {
    const arrowConfig = ARRAY_POSITIONS[props.arrowsPosition]
    const defaults = {
      root: [
        props.dotsPosition?.startsWith('outside-') ? 'mb-10' : '',
        props.arrowsPosition?.startsWith('outside-') ? 'sm:px-14' : '',
      ],
      dots: DOTS_POSITIONS[props.dotsPosition],
      dot: 'w-3 h-3 rounded-full bg-gray-400 data-[active=true]:bg-primary',
      prev: arrowConfig.prev,
      next: arrowConfig.next
    }

    return defu(props.carouselProps?.ui, defaults)
  })
</script>

<template>
  <UCarousel v-slot="{ item, index }" v-bind="props.carouselProps" :items="props.items" :ui="computedUiConfig">
    <slot name="item" :item="item" :index="index"/>
  </UCarousel>
</template>
