<script setup lang="ts">
  import type {IsliderCarouselItemProps} from '../IsliderCarousel'

  defineProps<IsliderCarouselItemProps>();
</script>

<template>
  <div class="relative w-full h-full">
    <IMediaRender
      :media="item.files.slideimage"
      :alt="item.title"
      aspect-ratio="auto"
      :ui="{media: 'absolute inset-0 w-full h-full object-cover'}"
    />
    <div class="absolute inset-0 overlay-slide"/>
    <div class="relative h-full flex items-center justify-center w-full max-w-3/4 mx-auto px-6 md:px-10">
      <h2 class="text-white text-center font-bold leading-[28px] text-[28px] lg:text-[48px] lg:leading-[48px]">
        {{ item.title }}
      </h2>
    </div>
  </div>
</template>
