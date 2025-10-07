<script setup>
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
});
</script>
<template>
  <IsliderCarousel :system-name="name"
    dots-position="inside-left-middle"
    :carousel-props="{
      dots: true,
      autoplay: true,
      loop: true,
      ui: {
        dot: 'w-[16px] h-[16px] rounded-full bg-[#FFFFFF80] data-[state=active]:bg-tertiary'
      }
  }">
    <template #item="{ item }">
      <div class="relative w-full overflow-hidden h-[clamp(520px,90vh,740px)]">
        <IMediaRender :media="item.files.slideimage" :alt="item.title" aspect-ratio="auto"
          :ui="{ media: 'absolute inset-0 w-full h-full object-cover' }" />
        <div class="absolute inset-0  bg-black/50"></div>
        <!-- Contenido -->
        <div class="relative mx-auto max-w-7xl px-6 lg:px-12 h-full">
          <div class="h-full flex items-center">
            <div class="max-w-2xl text-white my-7">
              <h2
                class="text-[36px] leading-[36px] md:text-[46px] md:leading-[46px] lg:text-[56px] lg:leading-[56px] font-bold">
                {{ item.title }}
              </h2>
              <p class="my-4 text-[25px] leading-[25px] "> {{ item.summary }} </p>
              <UButton
                :label="item.caption"
                :to="item.uri ?? item.url"
                class="px-5 py-4 bg-tertiary rounded-full text-[18px] leading-[18px] " loading-auto
               />
            </div>
          </div>
        </div>

        <!-- Curva inferior: SLOT -->
        <slot name="curve"> </slot>
      </div>
    </template>
  </IsliderCarousel>
</template>
<style>
</style>
