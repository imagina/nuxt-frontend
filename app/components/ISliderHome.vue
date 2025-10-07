<script setup>
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
});
</script>
<template>
  <IsliderCarousel :system-name="name" dots-position="inside-left-middle"
  :carousel-props="{
    fade: true,
    dots: false,
    autoplay: true,
    loop: false,
    active: false,
  }">
    <template #item="{ item }">
      <div class="relative w-full overflow-hidden h-[clamp(320px,80vh,400px)]">
        <IMediaRender :media="item.files.slideimage" :alt="item.title" aspect-ratio="auto"
          :ui="{ media: 'absolute inset-0 w-full h-full object-cover' }" />
        <div class="absolute inset-0  bg-black/50"></div>
        <!-- Contenido -->
        <div class="relative mx-auto max-w-7xl px-6 lg:px-12 h-full">
          <div class="h-full flex items-center justify-center">
            <div class="max-w-9/10 text-center text-white">
              <h2 class="font-bold text-[30px] leading-[30px] lg:text-[40px] lg:leading-[40px]">
                {{ item.title }}
              </h2>
              <p v-if="item.summary" class="mt-4 mb-10 text-[20px] leading-[20px] lg:text-[30px] lg:leading-[30px]">
                {{ item.summary }}
              </p>
              <div v-else class="mt-4 mb-10 text-justify text-[20px] leading-[20px] lg:text-[30px] lg:leading-[30px] custom-html" v-html="item.customHtml" ></div>
              <UButton :label="item.caption" :to="item.uri ?? item.url"
                class="px-5 py-4 bg-tertiary rounded-full text-[18px] leading-[18px]" loading-auto />
            </div>
          </div>
        </div>
      </div>
    </template>
  </IsliderCarousel>
</template>
<style></style>
