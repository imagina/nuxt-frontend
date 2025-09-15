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
    <div class="absolute inset-0 overlay-slide"></div>
    <div class="relative h-full flex items-center flex-col justify-center max-w-3/4 mx-auto text-white text-center px-8">
      <h2 class="leading-[20px] text-[20px] md:leading-[28px] md:text-[28px] lg:text-[48px] lg:leading-[48px]">
        {{ item.title }}
      </h2>
      <p class="font-bold leading-[20px] text-[20px] md:leading-[28px] md:text-[28px] lg:text-[48px] lg:leading-[48px]">{{ item.summary }}</p>
    </div>
  </div>
</template>
