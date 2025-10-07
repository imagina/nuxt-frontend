<script setup>
const props = defineProps({
  name: { type: String, default: '' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' }
});
</script>
<template>
  <UContainer class="py-10">
      <div class="text-center">
        <div v-if="title" class="text-tertiary tracking-[.25em] text-[16px] leading-[16px] lg:text-[18px] lg:leading-[18px] font-bold uppercase mb-2" >
          {{ title }}
        </div>
        <div v-if="subtitle" class="text-primary text-[25px] leading-[25px] lg:text-[35px] lg:leading-[35px] font-bold mb-10" >
          {{ subtitle }}
        </div>
      </div>
        <IsliderCarousel :system-name="name"
          dots-position="outside-bottom-middle"
          :carousel-props="{
            dots: true,
            loop: true,
            autoplay: true,
            ui: {
              item: '',
              dot: 'w-[13px] h-[13px] rounded-full data-[state=active]:bg-tertiary',
            },
          }">
          <template #item="{ item, index }">
            <div class="grid items-center gap-10 lg:grid-cols-12 pb-10">
              <div class="lg:col-span-6">
                <IMediaRender
                  :media="item.files.slideimage" :alt="item.title"
                  aspect-ratio="aspect-4/3"
                  :ui="{
                    wrapper: '',
                    container: 'rounded-2xl ',
                    media: 'object-cover rounded-2xl',
                  }"
                />
              </div>
              <div class="lg:col-span-6">
                <h2 class="font-bold text-[25px] leading-[25px] lg:text-[32px] lg:leading-[32px] mb-3">
                  {{ item.title }}
                </h2>
                <div
                  class="space-y-2 mb-4 text-justify text-[18px] leading-[22px] custom-html"
                  v-html="item.customHtml"
                ></div>
              </div>
            </div>
          </template>
        </IsliderCarousel>
  </UContainer>
</template>
<style>
</style>
