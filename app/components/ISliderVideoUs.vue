<script setup>

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
});
</script>
<template>
<div>
  <IsliderCarousel
    :system-name="name"
    :carousel-props="{
      dots: false,
      autoplay: true,
      loop: false,
      active: false,
    }">
    <template #item="{ item }">
      <!-- Video -->
      <UContainer>
        <div class="grid items-center gap-10 lg:grid-cols-12 py-20">
          <!-- Texto -->
          <div class="lg:col-span-6">
            <div class="text-center">
              <div class="text-primary text-[30px] leading-[30px] lg:text-[40px] lg:leading-[40px] font-bold mb-5">
                {{ item.title }}
                <span class="mt-3 block h-1 w-24 mx-auto rounded bg-tertiary"></span>
              </div>
            </div>
            <IMediaRender
              :media="{youtubeId:item.externalImageUrl}" :alt="item.title"
              :ui="{
                wrapper: 'aspect-16/9',
                container: 'rounded-xl ',
                media: 'object-cover rounded-xl ',
              }"
            />
          </div>
        </div>
      </UContainer>
    </template>
  </IsliderCarousel>
  </div>
</template>
