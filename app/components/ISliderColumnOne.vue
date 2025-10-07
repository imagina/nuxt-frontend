<script setup>
const props = defineProps({
  name: { type: String, default: '' },
  title: { type: String, default: '' }
});
</script>
<template>
  <UContainer class="py-10">
      <div class="text-center">
        <div class="text-primary text-[30px] leading-[30px] lg:text-[40px] lg:leading-[40px] font-bold mb-6">
          {{ title }}
        </div>
      </div>
        <IsliderCarousel :system-name="name"
          dots-position="outside-bottom-middle"
          :carousel-props="{
            dots: false,
            loop: true,
            autoplay: true,
            ui: {
              item: '',
              dot: 'w-[13px] h-[13px] rounded-full data-[state=active]:bg-tertiary',
            },
          }">
          <template #item="{ item, index }">
            <IMediaRender
              :media="item.files.slideimage" :alt="item.title"
              aspect-ratio="auto"
              :ui="{
                wrapper: '',
                container: 'w-5/6',
                media: ' object-contain ',
              }"
            />
          </template>
        </IsliderCarousel>
  </UContainer>
</template>
<style>
</style>
