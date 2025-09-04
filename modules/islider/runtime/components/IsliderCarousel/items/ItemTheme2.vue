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
    <div class="relative  h-full flex items-center flex-col justify-center max-w-3/4 mx-auto text-white text-center">
      <h2 class="text-[30px] lg:text-[45px]">
        {{ item.title }}
      </h2>
      <p class="font-bold text-[30px] lg:text-[45px] ">{{ item.summary }}</p>
    </div>
  </div>
</template>
